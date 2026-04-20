# CICS Alumni Management System

A modern, high-fidelity web application for tracking and managing alumni records for the College of Information and Computing Sciences (CICS).

## 🚀 Tech Stack

- **Frontend:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Backend/Database:** Google Sheets via [Google Apps Script API](https://developers.google.com/apps-script)
- **Deployment:** Vercel / GitHub

## ✨ Key Features

- **Multi-step Registration:** A seamless, user-friendly form for alumni to provide personal, academic, and employment details.
- **Admin Dashboard:** A secure portal for faculty to view, filter, and search alumni records in real-time.
- **Google Sheets Integration:** Automatic synchronization of form submissions to a centralized Google Spreadsheet.
- **Advanced Filtering:** Filter records by employment status, course (IT/CS), and batch year.
- **Secure Access:** Cookie-based authentication for the administrative portal.

## 🛠️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/timothydevcastro/cics_alumni.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   APPS_SCRIPT_URL=your_google_apps_script_exec_url
   ADMIN_PASSWORD=your_admin_password
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## 📄 Google Apps Script Setup

The system requires a Google Apps Script bound to a Google Sheet with the following functions:
- `doPost(e)`: To record new entries.
- `doGet(e)`: To fetch existing records for the Admin Dashboard.

Ensure the script is deployed as a Web App with access set to "Anyone".
