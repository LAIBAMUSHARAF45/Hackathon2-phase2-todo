---
id: 3
title: Backend API Spec Creation
stage: spec
date_iso: 2026-01-02
surface: agent
model: Qwen
feature: backend-api
branch: 2-backend-api
user: user
command: /sp.specify
labels:
  - backend
  - api
  - specification
  - fastapi
files_yaml:
  - specs/2-backend-api/spec.md
  - specs/2-backend-api/checklists/requirements.md
tests_yaml: []
links:
  spec: specs/2-backend-api/spec.md
  ticket: null
  adr: null
  pr: null
---

# Backend API Spec Creation

## Prompt Text

```
Backend Specification - Phase II Todo Full-Stack Web Application Project: Todo (Multi-User Full-Stack Todo App) Phase: II - Basic Level Focus: Complete FastAPI Backend with SQLModel, Neon PostgreSQL, JWT Auth & Full Frontend Integration Target model: Qwen (Qwen2.5-Coder or similar recommended) Goal: Build a secure, efficient FastAPI backend that: - Handles persistent storage in Neon Serverless PostgreSQL via SQLModel ORM - Implements RESTful API endpoints for the 5 basic features - Integrates authentication with Better Auth via JWT tokens (shared secret for verification) - Enforces multi-user isolation (each user sees/modifies only their own tasks) - Fully integrates with the Next.js frontend (JWT token passing, JSON responses, error handling) - Uses provided .env variables for configuration Core Technical Stack & Guidelines (must follow exactly) - FastAPI for API framework - SQLModel for ORM & Pydantic models (task/user schemas) - Neon Serverless PostgreSQL for database (connection via provided DB URL) - JWT verification using PyJWT or fastapi-jwt-auth (decode & validate with shared secret) - Environment Variables (use exactly as provided): - BETTER_AUTH_SECRET=0ptqlUaq8uCH7lQPVd0Bl5ryd6VtLdOX (for JWT signing/verification) - BETTER_AUTH_URL=http://localhost:3000 (frontend URL, for CORS if needed) - DATABASE_URL=postgresql://neondb_owner:npg_hJvC09KfQFab@ep-dry-smoke-a4zvp08s-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require (Neon DB connection; note: channel_binding=require optional, ensure SSL is enabled) - CORS: Allow origins from frontend[](http://localhost:3000) - Logging: Basic FastAPI logging for errors/debug Mandatory Features & API Endpoints (implement all with user isolation) 1. Authentication Integration - No direct auth endpoints (handled by Better Auth on frontend) - Middleware: Verify JWT on all /api/* routes (extract user_id from decoded token) - If invalid/expired token: Return 401 Unauthorized - User model: Sync with Better Auth (id, email, etc.; auto-create user in DB on first API call if needed) 2. Task CRUD Endpoints (all filtered by authenticated user_id) - GET /api/tasks → List user's tasks (query params: ?status=all|pending|completed, ?sort=created|title|due_date) - Response: Array of tasks [{id, title, description, completed, created_at, updated_at}] - POST /api/tasks → Create new task - Body: { title: str (required, 1-200 chars), description: str (optional, max 1000) } - Response: 201 + created task object - GET /api/tasks/{task_id} → Get single task (if owned by user, else 404) - Response: Task object - PUT /api/tasks/{task_id} → Update task (partial) - Body: { title?, description?, completed? } - Response: Updated task - DELETE /api/tasks/{task_id} → Delete task (if owned, else 404) - Response: 204 No Content - PATCH /api/tasks/{task_id}/complete → Toggle completion - Response: Updated task with flipped completed Database Schema (SQLModel models) - Users Table (managed partially by Better Auth): - id: str (PK, from Better Auth) - email: str (unique) - name: str (optional) - created_at: datetime - Tasks Table: - id: int (PK, auto-increment) - user_id: str (FK to users.id) - title: str (not null) - description: text (nullable) - completed: bool (default false) - created_at: datetime (default now) - updated_at: datetime (default now, on update now) - Indexes: tasks.user_id, tasks.completed Security & Integration Rules - JWT Middleware: Extract from Authorization: Bearer <token>, verify with BETTER_AUTH_SECRET, get user_id - User Isolation: Every DB query MUST include WHERE user_id = current_user.id - Error Handling: HTTPException with clear messages (e.g., 400 for validation, 403 for ownership violation) - Frontend Integration: Responses in JSON (Pydantic models), status codes match frontend expectations - DB Connection: Use SQLModel Session, async if possible (FastAPI supports async) - Startup: Auto-create tables on app start (SQLModel metadata.create_all) Constraints & Must-Haves - Python 3.13+, UV for deps (fastapi, sqlmodel, psycopg2-binary, pyjwt) - Pydantic for request/response models - Dependencies: get_current_user (JWT decode + user query) - No external deps beyond stack (e.g., no pydantic-settings, use os.getenv for env) - Clean code: Type hints, PEP 8, short functions - Docker-Ready: Work with docker-compose (backend container + Neon DB) Success Criteria - Backend runs standalone: uvicorn main:app --reload - Integrates with frontend: Frontend can signup (Better Auth), then call APIs with JWT → tasks persist in Neon DB - User A creates tasks → User B logs in → sees empty list (isolation) - All endpoints tested: Postman/curl with JWT → correct responses, no leaks - No crashes: Invalid token → 401, wrong id → 404, bad input → 400 - Full flow: Add task → persists after restart → toggle → update → delete Not in Scope for Backend (Phase II Basic) - Advanced features (priorities, tags, search, sort beyond basics) - WebSockets/real-time - Custom error pages (just JSON errors) - Rate limiting/logging (optional nice-to-have) Qwen Output Expectations Generate: - Full backend project structure (main.py, models.py, routers/tasks.py, dependencies.py, db.py) - SQLModel models for users & tasks - JWT middleware & get_current_user dependency - All API routers with endpoints, Pydantic schemas - .env.example with provided vars - docker-compose.yml snippet for backend + Neon DB integration - Startup script to create tables - Example curl tests for endpoints Make the backend robust, secure, and perfectly integrated with frontend – no errors in auth or data flow!
```

## Response Text

Created a comprehensive feature specification for the Backend API with detailed user stories, functional requirements, and success criteria. The specification covers all aspects of the FastAPI backend with SQLModel, Neon PostgreSQL, JWT Auth, and frontend integration as specified in the requirements.

## Outcome

Successfully created the feature specification at specs/2-backend-api/spec.md with all required sections including user scenarios, functional requirements, and success criteria. Also created a quality checklist at specs/2-backend-api/checklists/requirements.md to validate the specification.

## Evaluation

The specification aligns with the project requirements, focusing on creating a secure, efficient FastAPI backend that handles persistent storage in Neon PostgreSQL via SQLModel ORM, implements RESTful API endpoints, integrates with Better Auth via JWT tokens, and enforces multi-user isolation. All mandatory features and API endpoints are specified with proper authentication and user isolation requirements.