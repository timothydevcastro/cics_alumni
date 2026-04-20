# CICS Alumni Recording System — Research & Requirements

## 1. Project Overview

A custom-built alumni information recording system for the College of Information and Computing Sciences (CICS). The system replaces a basic Google Form with a branded, professional mini-website that allows alumni to submit their information via QR code, while giving faculty a dedicated admin panel to manage records.

---

## 2. Problem Statement

- Google Forms is functional but lacks branding, multi-step UX, and conditional logic
- Faculty manually downloads CSV exports from Google Forms — no live sync
- No admin dashboard to search, filter, or manage alumni records
- No automated email confirmation sent to alumni after submission

---

## 3. Goals

- Provide a clean, mobile-first form experience for alumni (accessed via QR code)
- Automatically store submissions to Google Sheets (faculty's existing workflow)
- Send an automated email receipt to the alumni after successful submission
- Give faculty a password-protected admin panel to view and manage records
- Sync data to a local Excel file automatically via Power Query (no manual CSV export)
- Align with CHED Graduate Tracer Study data requirements

---

## 4. Target Users

| User | Description |
|---|---|
| **Alumni** | Former CICS students filling out their info on mobile via QR code |
| **Admin / Faculty** | One faculty member managing and viewing all alumni records |

---

## 5. Final Field List (29 Fields, 6 Steps)

### Step 1 — Personal Information
1. Full Name
2. Middle Name
3. Sex / Gender *(Dropdown)*
4. Date of Birth *(Date Picker)*
5. Civil Status *(Dropdown: Single / Married / Widowed / Separated)*
6. Home Address
7. Personal Email
8. Contact Number

### Step 2 — Academic Information
9. Student ID Number
10. Course *(Dropdown)*
11. Batch / Year Graduated *(Number)*
12. Latin Honors *(Dropdown: Summa Cum Laude / Magna Cum Laude / Cum Laude / None)*

### Step 3 — Employment Information
13. Employment Status *(Dropdown: Employed / Self-Employed / Unemployed / OFW)*
14. Employment Type *(Dropdown: Full-time / Part-time / Freelance / Business Owner)*
15. Is your job related to your course? *(Yes / No)*
16. Current Company
17. Company Location
18. Position / Job Title
19. Years in Company *(Number)*
20. Office Email
21. Office Contact Number

### Step 4 — OFW Section *(Conditional: shown only if Employment Status = OFW)*
22. Country Currently Based
23. Visa Type *(Dropdown: Work / Permanent Resident / Other)*

### Step 5 — Further Studies
24. Pursued Further Education? *(Yes / No)*
25. Degree / Course Taken *(Conditional: shown if Yes)*
26. School Attended *(Conditional: shown if Yes)*

### Step 6 — Social & Extras
27. LinkedIn Profile URL
28. Facebook Profile URL
29. Willing to be a Resource Speaker? *(Yes / No)*

---

## 6. Feature Requirements

### Alumni Form (`/form`)
- Mobile-first, responsive design
- Multi-step form with progress indicator
- Conditional fields (OFW section, Further Studies details)
- Client-side validation before submission
- Success screen with confirmation message after submit
- QR code entry point from faculty office

### Admin Panel (`/admin`)
- Password-protected access (single admin)
- Table view of all alumni submissions
- Search by name, course, batch
- Filter by employment status, course
- CSV export button
- View individual alumni record in detail

### Backend / Automation
- Google Apps Script Web App endpoint (`doPost()`)
- Appends each submission as a new row in Google Sheets
- Sends automated "Thank You" email to alumni via GmailApp
- Excel Power Query link to Google Sheets for local faculty sync

---

## 7. CHED Tracer Study Alignment

The following fields directly satisfy CHED Graduate Tracer Study requirements:

- Employment Status
- Employment Type
- Job relatedness to course
- Company and position details
- Further education pursuit
- OFW status and country

---

## 8. Constraints & Assumptions

- Budget: Free tier only (no paid services)
- Admin: Only one admin user (no multi-user auth needed)
- Device: Alumni primarily use mobile phones
- Faculty uses Microsoft Excel locally
- Faculty office already has Google account (for Sheets + GmailApp)
- Internet connection required for form submission
