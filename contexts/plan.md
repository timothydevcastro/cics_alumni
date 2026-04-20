# CICS Alumni Recording System — Technical Plan

## 1. Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | Vercel-native, file-based routing, server components |
| **Styling** | Tailwind CSS | Utility-first, mobile-first out of the box |
| **UI Components** | shadcn/ui | Beautiful, accessible components, free |
| **Form Handling** | React Hook Form + Zod | Validation, multi-step state management |
| **Backend Bridge** | Google Apps Script | Free, native Sheets + Gmail access |
| **Database** | Google Sheets | Faculty-familiar, no DB setup needed |
| **Email** | GmailApp via Apps Script | Free, no SMTP config needed |
| **Hosting** | Vercel (Free Tier) | Auto-deploy from GitHub, global CDN |
| **Local Sync** | Excel Power Query | Auto-pulls from Google Sheets, no manual export |
| **Auth (Admin)** | Environment variable password + Next.js middleware | Simple, no third-party auth service needed |

---

## 2. Project Structure

```
cics-alumni/
├── app/
│   ├── page.tsx                  # Landing / redirect to /form
│   ├── form/
│   │   └── page.tsx              # Alumni multi-step form
│   ├── admin/
│   │   ├── page.tsx              # Admin dashboard (protected)
│   │   └── login/
│   │       └── page.tsx          # Admin login page
│   └── api/
│       └── submit/
│           └── route.ts          # Next.js API route → calls Apps Script
├── components/
│   ├── form/
│   │   ├── StepPersonal.tsx
│   │   ├── StepAcademic.tsx
│   │   ├── StepEmployment.tsx
│   │   ├── StepOFW.tsx           # Conditional
│   │   ├── StepFurtherStudies.tsx
│   │   ├── StepSocial.tsx
│   │   ├── ProgressBar.tsx
│   │   └── SuccessScreen.tsx
│   ├── admin/
│   │   ├── AlumniTable.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FilterPanel.tsx
│   │   └── ExportButton.tsx
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── schema.ts                 # Zod validation schemas
│   ├── constants.ts              # Dropdown options, course list
│   └── utils.ts
├── middleware.ts                 # Admin route protection
├── .env.local                    # ADMIN_PASSWORD, APPS_SCRIPT_URL
└── public/
    └── cics-logo.png
```

---

## 3. Data Flow & Architecture

```
[Alumni Mobile Browser]
        │
        │  Fills multi-step form
        ▼
[Next.js /form page]
        │
        │  React Hook Form + Zod validation
        │  On submit → POST to /api/submit
        ▼
[Next.js API Route /api/submit]
        │
        │  Sanitizes data
        │  POST → Google Apps Script Web App URL
        ▼
[Google Apps Script doPost()]
        │
        ├──▶ Appends row to Google Sheets
        └──▶ Sends confirmation email via GmailApp
                        │
                        ▼
              [Alumni receives email receipt]

[Faculty / Admin Browser]
        │
        │  Logs in at /admin/login
        ▼
[Next.js /admin page]
        │
        │  GET → Google Apps Script (read endpoint)
        ▼
[Google Sheets data rendered as table]

[Faculty Local Machine]
        │
        │  Opens Excel file
        ▼
[Power Query auto-refreshes from Google Sheets CSV export URL]
```

---

## 4. Multi-Step Form Logic

### Step Flow
```
Step 1: Personal Info
    → Step 2: Academic Info
        → Step 3: Employment Info
            → [if OFW] Step 4: OFW Details
            → Step 5: Further Studies
                → [if Yes] show Degree + School fields
                → Step 6: Social & Extras
                    → Submit → Success Screen
```

### Conditional Logic Algorithm
```
IF employmentStatus === "OFW"
    SHOW Step 4 (OFW fields)
ELSE
    SKIP Step 4

IF pursuedFurtherEducation === "Yes"
    SHOW degreeCourseTaken + schoolAttended fields
ELSE
    HIDE those fields
```

### State Management
- All form state lives in a single `useForm()` instance (React Hook Form)
- Step index tracked via `useState`
- On each "Next" click, validate only the current step's fields using Zod `.pick()`
- On final submit, send the complete merged form data

---

## 5. Google Apps Script Plan

### Web App Setup
- Deploy as Web App
- Execute as: Me (faculty Google account)
- Access: Anyone (required for external POST from Vercel)

### `doPost()` Function Logic
```javascript
function doPost(e) {
  // 1. Parse incoming JSON data
  // 2. Open target Google Sheet by ID
  // 3. Append new row with all 29 fields + timestamp
  // 4. Send confirmation email to alumni's personal email
  // 5. Return JSON success response
}
```

### Sheet Columns (30 total)
Timestamp + all 29 fields in submission order

### Email Receipt Content
- Subject: "Thank you for registering, [Name]!"
- Body: Summary of submitted info + CICS branding

---

## 6. Admin Panel Plan

### Authentication
- Password stored in Vercel environment variable (`ADMIN_PASSWORD`)
- On login, set a secure HTTP-only cookie (`admin_session`)
- `middleware.ts` checks cookie on every `/admin/*` request
- If no valid cookie → redirect to `/admin/login`

### Dashboard Features
| Feature | Implementation |
|---|---|
| View all records | Fetch from Apps Script read endpoint, render with TanStack Table |
| Search | Client-side filter on name, ID, course |
| Filter | Dropdown filters for employment status, course, batch year |
| CSV Export | Client-side generate + download using `papaparse` |
| View record | Modal or side panel with full alumni details |

---

## 7. Environment Variables

```env
# .env.local
APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
ADMIN_PASSWORD=your_secure_password_here
```

---

## 8. Deployment Plan

### Step-by-Step
1. Push project to GitHub repository
2. Connect GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy — Vercel auto-builds on every `git push`
5. Set custom domain (optional) or use `*.vercel.app` URL
6. Generate QR code pointing to `https://your-app.vercel.app/form`
7. Print QR and place at faculty office

---

## 9. Build Order

| Phase | Task |
|---|---|
| **Phase 1** | Set up Next.js project + Tailwind + shadcn/ui |
| **Phase 2** | Build Zod schemas for all 29 fields |
| **Phase 3** | Build multi-step alumni form UI (Steps 1–6) |
| **Phase 4** | Write Google Apps Script (doPost + email + sheet logging) |
| **Phase 5** | Connect form to Apps Script via `/api/submit` route |
| **Phase 6** | Build admin login + session middleware |
| **Phase 7** | Build admin dashboard (table, search, filter, export) |
| **Phase 8** | Set up Excel Power Query sync |
| **Phase 9** | Deploy to Vercel + generate QR code |
| **Phase 10** | Test full flow end-to-end |
