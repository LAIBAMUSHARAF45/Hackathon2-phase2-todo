---
id: 4
title: Backend API Implementation Plan
stage: plan
date_iso: 2026-01-02
surface: agent
model: Qwen
feature: backend-api
branch: 2-backend-api
user: user
command: /sp.plan
labels:
  - backend
  - api
  - plan
  - fastapi
files_yaml:
  - specs/2-backend-api/plan.md
  - specs/2-backend-api/research.md
  - specs/2-backend-api/data-model.md
  - specs/2-backend-api/quickstart.md
  - specs/2-backend-api/contracts/task-api-contracts.md
  - QWEN.md
tests_yaml: []
links:
  spec: specs/2-backend-api/spec.md
  ticket: null
  adr: null
  pr: null
---

# Backend API Implementation Plan

## Prompt Text

```
Backend Implementation Plan - Phase II Todo Full-Stack Web App

Project: Todo
Phase: II - Basic Level
Focus: Complete FastAPI Backend with Neon PostgreSQL, JWT Auth (Better Auth), SQLModel & Full Frontend Integration
Estimated effort: 10–18 hours (due to auth, DB setup & security)

Goal: Build a secure, multi-user backend that persists tasks in Neon DB, verifies JWT from frontend, enforces user isolation, and integrates perfectly with Next.js frontend.

Implementation Order (recommended sequence):

1. Project Setup & Dependencies (1–2h)
   - Initialize FastAPI project with UV: uv init, uv add fastapi sqlmodel uvicorn python-dotenv pyjwt python-jose[cryptography]
   - Create .env file with provided values:
     - BETTER_AUTH_SECRET=0ptqlUaq8uCH7lQPVd0Bl5ryd6VtLdOX
     - BETTER_AUTH_URL=http://localhost:3000
     - DATABASE_URL=postgresql://neondb_owner:npg_hJvC09KfQFab@ep-dry-smoke-a4zvp08s-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
   - Set up main.py with FastAPI app, CORS middleware (allow http://localhost:3000)
   - Create db.py for SQLModel engine & session

2. Database Models & Connection (2–3h)
   - Define SQLModel models in models.py:
     - User (id: str PK, email: str, name: str, created_at: datetime)
     - Task (id: int PK, user_id: str FK, title: str, description: str, completed: bool, created_at/updated_at)
   - Add indexes: Task.user_id, Task.completed
   - Implement db engine with DATABASE_URL (async if possible)
   - Startup event: metadata.create_all() to auto-create tables
   - Dependency: get_db() for session

3. JWT Authentication & Current User Dependency (2–3h)
   - Create dependencies.py
   - Implement get_current_user:
     - Extract token from Authorization: Bearer header
     - Decode & verify with BETTER_AUTH_SECRET (PyJWT or jose)
     - Return user_id (or full payload)
     - Raise 401 if invalid/expired/missing
   - Optional: Auto-create user in DB if first login (query users table)

4. Task Router & Endpoints (4–6h)
   - Create routers/tasks.py with APIRouter(prefix="/api/tasks")
   - Implement all 6 endpoints with Depends(get_current_user) and Depends(get_db):
     - GET /api/tasks (list with ?status & ?sort)
     - POST /api/tasks (create)
     - GET /api/tasks/{task_id} (get one)
     - PUT /api/tasks/{task_id} (update partial)
     - DELETE /api/tasks/{task_id} (delete)
     - PATCH /api/tasks/{task_id}/complete (toggle)
   - Every endpoint: Filter queries by current_user.id (WHERE user_id = current_user)
   - Use Pydantic models: TaskCreate, TaskRead, TaskUpdate
   - Proper HTTP status: 201 create, 204 delete, 404 not found, 403 ownership violation

5. Error Handling & Validation (1–2h)
   - Use HTTPException for all errors
   - Validate inputs: title required, lengths, etc.
   - Ownership check: if task.user_id != current_user.id → 403 Forbidden
   - Global exception handler for 500 errors (optional logging)

6. Integration with Frontend (1–2h)
   - Ensure JSON responses match frontend expectations (camelCase or snake_case)
   - Test with Postman/curl: 
     - Get JWT from frontend (after login)
     - Call endpoints with Bearer token
   - CORS configured for http://localhost:3000
   - Run backend + frontend together (docker-compose or separate terminals)

7. Testing & Final Polish (1–2h)
   - Manual tests: Create tasks as User A → login as User B → no tasks visible
   - Verify persistence: Restart backend → tasks still in Neon DB
   - Check all endpoints with invalid token → 401
   - Add basic logging for debug
   - Update README: backend setup, .env vars, curl examples

Constraints & Notes:
- Async DB if possible (SQLModel supports)
- No extra deps beyond FastAPI, SQLModel, PyJWT
- Keep code modular: routers/, models/, dependencies/, db.py
- Use os.getenv for env vars (no pydantic-settings)
- Docker-ready: uvicorn main:app --host 0.0.0.0 --port 8000

Success Checklist:
☐ Backend runs: uvicorn main:app --reload
☐ Neon DB connects & tables created
☐ JWT verification works with provided BETTER_AUTH_SECRET
☐ All 6 endpoints work with user isolation
☐ Frontend can call APIs (add task → shows in list after refresh)
☐ No data leaks between users
☐ No crashes on invalid inputs/tokens
☐ Full CRUD flow persists across restarts
```

## Response Text

Created a comprehensive implementation plan for the Backend API feature, including technical context, project structure, research findings, data models, API contracts, and quickstart guide. The plan details the technologies to be used (FastAPI, SQLModel, Neon PostgreSQL, PyJWT) and the implementation approach for creating a secure backend with user isolation.

## Outcome

Successfully created the implementation plan with all required components:
- Implementation plan document (plan.md)
- Research findings (research.md)
- Data models (data-model.md)
- API contracts (contracts/task-api-contracts.md)
- Quickstart guide (quickstart.md)
- Updated agent context (QWEN.md)

## Evaluation

The implementation plan aligns with the feature specification and project constitution, focusing on creating a secure, multi-user backend with FastAPI and SQLModel. All technical requirements from the feature specification have been incorporated into the plan.