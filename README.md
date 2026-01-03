# 🚀 Todo Hackathon Phase 2

A modern, full-stack Todo application with a stunning **Glassmorphism UI**, secure **JWT Authentication**, and a high-performance **FastAPI Backend**.

## 🌟 Overview

This project is a complete task management solution featuring a beautiful frontend built with Next.js and a robust backend built with FastAPI. It leverages **Better Auth** for seamless user authentication and **Neon PostgreSQL** for serverless data persistence.

---

## 🏗️ Architecture

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion.
- **Backend**: FastAPI, SQLModel, PyJWT.
- **Database**: Neon (Serverless PostgreSQL).
- **Authentication**: Better Auth (Custom JWT implementation).

---

## ✨ Features

### 🎨 Frontend (Next.js)
- **Glassmorphism UI**: Beautiful transparent cards with backdrop blur and neon glow.
- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **Animations**: Fluid transitions and micro-interactions powered by Framer Motion.
- **User Dashboard**: Visual summary of tasks and a clean task grid.

### ⚙️ Backend (FastAPI)
- **Secure API**: JWT-based authentication with shared secrets.
- **User Isolation**: Users only see and manage their own tasks.
- **Performance**: High-speed endpoints with SQLModel for data validation.
- **CRUD Operations**: Complete task lifecycle management (Create, Read, Update, Delete).

---

## 📂 Project Structure

```text
.
├── backend/            # FastAPI Backend
│   ├── main.py         # Entry point & CORS
│   ├── models/         # SQLModel database schemas
│   ├── api/            # API Route handlers
│   └── Dockerfile      # Backend containerization
├── frontend/           # Next.js Frontend
│   ├── app/            # App Router (Pages & Layouts)
│   ├── components/     # Reusable UI components
│   └── lib/api.ts      # API Client with auto-JWT
├── docker-compose.yml  # Local testing with Docker
└── README.md           # You are here!
```

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Python 3.13+
- Node.js 18+
- Neon PostgreSQL Account

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
# Create .env with BETTER_AUTH_SECRET, BETTER_AUTH_URL, and DATABASE_URL
uvicorn main:app --reload
```

### 3. Frontend Setup
```bash
cd frontend
npm install
# Create .env.local with NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
```

---

## 🌐 Deployment Guide

### Backend (Render.com)
1.  **Repo**: Push your code to GitHub.
2.  **Service**: Create a new **Web Service** on Render.
3.  **Config**: Select the `backend` folder as the root directory (or use the root `Dockerfile`).
4.  **Env**: Set `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `FRONTEND_URL`.

### Frontend (Vercel.com)
1.  **Repo**: Import your GitHub repository.
2.  **Settings**: Set "Next.js" as the preset and `frontend` as the root directory.
3.  **Env**: Set `NEXT_PUBLIC_API_URL` (to your Render URL) and `BETTER_AUTH_SECRET`.

---

## 🛠️ Environment Variables

### Backend (`backend/.env`)
- `DATABASE_URL`: Your Neon Postgres connection string.
- `BETTER_AUTH_SECRET`: Shared secret for JWT signing.
- `BETTER_AUTH_URL`: Your frontend URL.

### Frontend (`frontend/.env.local`)
- `NEXT_PUBLIC_API_URL`: Your backend API URL.
- `BETTER_AUTH_SECRET`: Same secret as backend.

---

## 🤝 Key Technologies
- **Frontend**: Next.js, Tailwind CSS, Framer Motion, Better Auth.
- **Backend**: FastAPI, SQLModel, Uvicorn, PyJWT.
- **Infrastructure**: Neon Postgres, Render, Vercel.

---

*Built with ❤️ for the Todo Hackathon.*
