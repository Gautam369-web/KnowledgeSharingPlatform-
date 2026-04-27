# SolveHub: AI-First Solarpunk Knowledge Ecosystem

SolveHub is a high-fidelity, gamified knowledge-sharing platform for engineers. It combines real-time AI assistance, interactive relational visualizations, and an "Architect" evolution system to transform technical documentation into a dynamic community experience.

![SolveHub Aero Design](https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200)

## ✨ Phase 2: The Evolution Features

- **🧠 Drafting Sentinel (AI Co-Pilot):** Real-time technical audit powered by **Groq Cloud (Llama-3.3)**. Provides structural feedback, Solarpunk alignment scores, and critical fixes during the article creation process.
- **🗺️ IQ Web (Interactive Knowledge Topology):** A 2D force-directed graph built on a custom Canvas engine, allowing users to explore relationships between categories and technical tags visually.
- **🏗️ Architect Evolution (Gamification):** A prestige-based reputation system. Users evolve through 5 stages (*Dormant Seed -> Solar Architect*) earning unique glowing visual badges and specialized titles like *Neural Architect*.
- **🛡️ Security Sentinel:** Automated AI content moderation that scans for malicious or inappropriate content while protecting technical jargon through fine-tuned semantic analysis.

## 🚀 Tech Stack

- **Frontend:** Next.js 14 (App Router), React, Tailwind CSS, Framer Motion.
- **Backend:** Node.js, Express, Mongoose (MongoDB).
- **AI Engine:** Groq Cloud API (Llama-3.3 / Llama-3.1 SDK).
- **Visualization:** React-Force-Graph-2D.
- **Deployment:** Vercel (Edge Functions).

## 🛠️ Installation & Setup

### 1. Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Groq Cloud API Key

### 2. Backend Setup
```bash
cd backend
npm install
# Create a .env file with:
# PORT=5000
# MONGODB_URI=your_mongodb_uri
# JWT_SECRET=your_secret
# GROQ_API_KEY=your_groq_key
# EMAIL_SERVER_USER=...
# EMAIL_SERVER_PASSWORD=...
# EMAIL_SERVER_HOST=...
# EMAIL_SERVER_PORT=...
# EMAIL_FROM=...
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
# Create a .env.local file with:
# NEXT_PUBLIC_API_URL=http://localhost:5000
npm run dev
```

## 📐 Project Structure

```bash
├── backend
│   ├── controllers/   # Logic for users, articles, and problems
│   ├── models/        # Mongoose schemas (Architect models)
│   ├── utils/         # AI Sentinel & Gamification logic
│   └── server.js      # Express entry point
└── frontend
    ├── app/           # Next.js App Router (Dashboards, IQ Web)
    ├── components/    # Reusable Solarpunk UI components
    └── public/        # Asset repository
```

## 📄 License
This project is for educational and community development purposes. Developed as part of the INT219 Web Development Project.

---
*Built with focus by the SolveHub Developmental Team.*
