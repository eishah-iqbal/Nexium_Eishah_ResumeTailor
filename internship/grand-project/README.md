# CV Crafter

CV Crafter is an AI-powered web application that helps users generate or customize their resumes for specific job descriptions. Built as the final project for my Full Stack Web Development Internship at Nexium, the app streamlines resume editing by integrating Supabase for auth & MongoDB Atlas for storage, and AI logic via n8n.

## 📁 Project Structure

```bash
/internship/grand-project/
│
├── /docs/ → PRD and wireframes
├── /src/app/api/ → Backend logic, AI workflows and logic via n8n
├── /src/app/ → Frontend (Next.js 15 + ShadCN UI)
├── /src/lib/ → Supabase and MongoDB setup
└── README.md → This file
```

---

## 🔧 Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, ShadCN UI, Tailwind CSS
- **Backend**: Supabase (PostgreSQL), MongoDB Atlas
- **Authentication**: Magic link email auth via Supabase
- **AI Logic**: n8n (Low-code workflow automation)
- **Deployment**: Vercel (CI/CD enabled)
- **Package Manager**: pnpm

---

## ✨ Key Features

- 📤 **Magic Link Login** via Supabase
- ✍️ **Input your resume and job description**
- 🤖 **AI tailoring of resume to job post** using n8n
- 🌐 **Store results** in Supabase (user credentials) & MongoDB (resumes)
- 🧪 Fully tested end-to-end
- 🎨 Clean UI with mobile responsiveness

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR-USERNAME/Nexium_Eishah_ResumeTailor.git
cd Nexium_Eishah_ResumeTailor/internship/grand-project
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a .env.local file using the provided .env.example and add:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
MONGODB_URI=your_mongodb_connection_string
N8N_RESUME_TAILOR_URL=https://n8n.<your-domain>.com/webhook/resume-tailor
N8N_TAILOR_RESUME_URL=https://n8n.<your-domain>.com/webhook/tailor-resume
```

### 4. Run the dev server

```bash
pnpm dev
```
App should be running at http://localhost:3000.

--- 

## 🧪 Testing

- Manual test cases done
- Verified auth, AI logic, DB insertions

---

## 📹 Demo

Live Demo: https://nexium-eishah-resume-tailor.vercel.app/

---

## 📁 Docs

- Product Requirement Document (PRD)
- Wireframes and flow diagrams
- Available inside /docs/ folder

---

## 🙋‍♀️ Author

Eishah Iqbal Malik
- Full Stack intern at Nexium
- Software Engineering Junior @ FAST-NUCES
- https://www.linkedin.com/in/eishah-iqbal-02967a317/

---

## 📜 License

This project is open-sourced for educational purposes under the MIT License.