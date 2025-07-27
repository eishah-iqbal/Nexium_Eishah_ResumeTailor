# CV Crafter - Resume Tailor App


**CV Crafter** is an AI-powered web app that generates a new resume or tailors your resume based on a given job description. Built using Next.js 15, Supabase, MongoDB, and n8n, the app helps job seekers increase their chances of landing interviews by customizing their resumes in a smart and efficient way.

## ✨ Features

- ✍ Generate new resume
- 📝 Input your current resume and job description
- ⚙️ AI-generated tailored resume using n8n prompt logic
- 🌐 Email-based magic link login
- 💾 Credentials stored in Supabase, resume stored in MongoDB
- 🚀 Responsive, modern UI built with ShadCN and Tailwind CSS

## 🧰 Tech Stack

- **Frontend:** Next.js 15 (App Router), Tailwind CSS, ShadCN UI
- **Backend:** Supabase (PostgreSQL), MongoDB Atlas
- **AI Workflow:** n8n (self-hosted)
- **Deployment:** Vercel (CI/CD)

## 📁 Folder Structure

/internship/grand-project/
├── /src/app/        # Frontend (Next.js)
├── /src/app/api/    # Backend logic, AI workflows and logic via n8n
├── /src/lib/        # Supabase and MongoDB setup
└── /docs/           # PRD and wireframes

## 📦 Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/YOUR-USERNAME/Nexium_Eishah_ResumeTailor.git
cd Nexium_Eishah_ResumeTailor/internship/grand-project
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up .env.local

See the .env.example for required environment variables.

### 4. Run the app locally

```bash
pnpm dev
```

## 🌐 Live Demo

https://nexium-eishah-resume-tailor.vercel.app/

## 📜 License

MIT License

## 📧 Contact
For inquiries, please contact eishahiqbal@gmail.com