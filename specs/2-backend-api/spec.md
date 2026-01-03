# Feature Specification: Backend API

**Feature Branch**: `2-backend-api`
**Created**: 2026-01-02
**Status**: Draft
**Input**: User description: "Backend Specification - Phase II Todo Full-Stack Web Application Project: Todo (Multi-User Full-Stack Todo App) Phase: II - Basic Level Focus: Complete FastAPI Backend with SQLModel, Neon PostgreSQL, JWT Auth & Full Frontend Integration Target model: Qwen (Qwen2.5-Coder or similar recommended) Goal: Build a secure, efficient FastAPI backend that: - Handles persistent storage in Neon Serverless PostgreSQL via SQLModel ORM - Implements RESTful API endpoints for the 5 basic features - Integrates authentication with Better Auth via JWT tokens (shared secret for verification) - Enforces multi-user isolation (each user sees/modifies only their own tasks) - Fully integrates with the Next.js frontend (JWT token passing, JSON responses, error handling) - Uses provided .env variables for configuration Core Technical Stack & Guidelines (must follow exactly) - FastAPI for API framework - SQLModel for ORM & Pydantic models (task/user schemas) - Neon Serverless PostgreSQL for database (connection via provided DB URL) - JWT verification using PyJWT or fastapi-jwt-auth (decode & validate with shared secret) - Environment Variables (use exactly as provided): - BETTER_AUTH_SECRET=0ptqlUaq8uCH7lQPVd0Bl5ryd6VtLdOX (for JWT signing/verification) - BETTER_AUTH_URL=http://localhost:3000 (frontend URL, for CORS if needed) - DATABASE_URL=postgresql://neondb_owner:npg_hJvC09KfQFab@ep-dry-smoke-a4zvp08s-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require (Neon DB connection; note: channel_binding=require optional, ensure SSL is enabled) - CORS: Allow origins from frontend[](http://localhost:3000) - Logging: Basic FastAPI logging for errors/debug Mandatory Features & API Endpoints (implement all with user isolation) 1. Authentication Integration - No direct auth endpoints (handled by Better Auth on frontend) - Middleware: Verify JWT on all /api/* routes (extract user_id from decoded token) - If invalid/expired token: Return 401 Unauthorized - User model: Sync with Better Auth (id, email, etc.; auto-create user in DB on first API call if needed) 2. Task CRUD Endpoints (all filtered by authenticated user_id) - GET /api/tasks → List user's tasks (query params: ?status=all|pending|completed, ?sort=created|title|due_date) - Response: Array of tasks [{id, title, description, completed, created_at, updated_at}] - POST /api/tasks → Create new task - Body: { title: str (required, 1-200 chars), description: str (optional, max 1000) } - Response: 201 + created task object - GET /api/tasks/{task_id} → Get single task (if owned by user, else 404) - Response: Task object - PUT /api/tasks/{task_id} → Update task (partial) - Body: { title?, description?, completed? } - Response: Updated task - DELETE /api/tasks/{task_id} → Delete task (if owned, else 404) - Response: 204 No Content - PATCH /api/tasks/{task_id}/complete → Toggle completion - Response: Updated task with flipped completed Database Schema (SQLModel models) - Users Table (managed partially by Better Auth): - id: str (PK, from Better Auth) - email: str (unique) - name: str (optional) - created_at: datetime - Tasks Table: - id: int (PK, auto-increment) - user_id: str (FK to users.id) - title: str (not null) - description: text (nullable) - completed: bool (default false) - created_at: datetime (default now) - updated_at: datetime (default now, on update now) - Indexes: tasks.user_id, tasks.completed Security & Integration Rules - JWT Middleware: Extract from Authorization: Bearer <token>, verify with BETTER_AUTH_SECRET, get user_id - User Isolation: Every DB query MUST include WHERE user_id = current_user.id - Error Handling: HTTPException with clear messages (e.g., 400 for validation, 403 for ownership violation) - Frontend Integration: Responses in JSON (Pydantic models), status codes match frontend expectations - DB Connection: Use SQLModel Session, async if possible (FastAPI supports async) - Startup: Auto-create tables on app start (SQLModel metadata.create_all) Constraints & Must-Haves - Python 3.13+, UV for deps (fastapi, sqlmodel, psycopg2-binary, pyjwt) - Pydantic for request/response models - Dependencies: get_current_user (JWT decode + user query) - No external deps beyond stack (e.g., no pydantic-settings, use os.getenv for env) - Clean code: Type hints, PEP 8, short functions - Docker-Ready: Work with docker-compose (backend container + Neon DB) Success Criteria - Backend runs standalone: uvicorn main:app --reload - Integrates with frontend: Frontend can signup (Better Auth), then call APIs with JWT → tasks persist in Neon DB - User A creates tasks → User B logs in → sees empty list (isolation) - All endpoints tested: Postman/curl with JWT → correct responses, no leaks - No crashes: Invalid token → 401, wrong id → 404, bad input → 400 - Full flow: Add task → persists after restart → toggle → update → delete Not in Scope for Backend (Phase II Basic) - Advanced features (priorities, tags, search, sort beyond basics) - WebSockets/real-time - Custom error pages (just JSON errors) - Rate limiting/logging (optional nice-to-have) Qwen Output Expectations Generate: - Full backend project structure (main.py, models.py, routers/tasks.py, dependencies.py, db.py) - SQLModel models for users & tasks - JWT middleware & get_current_user dependency - All API routers with endpoints, Pydantic schemas - .env.example with provided vars - docker-compose.yml snippet for backend + Neon DB integration - Startup script to create tables - Example curl tests for endpoints Make the backend robust, secure, and perfectly integrated with frontend – no errors in auth or data flow!"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - User Authentication & Token Verification (Priority: P1)

A user signs up or logs in via the frontend using Better Auth. When they make API requests to the backend, their JWT token is verified to ensure they are authenticated and to identify which user is making the request.

**Why this priority**: This is the foundational security layer that all other functionality depends on. Without proper authentication and user identification, the backend cannot enforce user isolation.

**Independent Test**: Can be fully tested by making API requests with valid and invalid JWT tokens, verifying that valid tokens allow access while invalid tokens result in 401 Unauthorized responses.

**Acceptance Scenarios**:

1. **Given** a valid JWT token from Better Auth, **When** a user makes an API request to any /api/* endpoint, **Then** the request is processed with the user's identity established.
2. **Given** an invalid or expired JWT token, **When** a user makes an API request, **Then** a 401 Unauthorized response is returned.
3. **Given** a missing JWT token, **When** a user makes an API request, **Then** a 401 Unauthorized response is returned.

---

### User Story 2 - Task Management (Priority: P1)

An authenticated user can perform all CRUD operations on their tasks: create new tasks, view their existing tasks, update task details, mark tasks as complete/incomplete, and delete tasks. Users can only see and modify their own tasks.

**Why this priority**: This is the core functionality of the Todo application that users interact with most frequently.

**Independent Test**: Can be fully tested by creating, reading, updating, and deleting tasks with proper authentication, verifying that users only see their own tasks and cannot access others' tasks.

**Acceptance Scenarios**:

1. **Given** an authenticated user, **When** they POST to /api/tasks with valid task data, **Then** a new task is created and returned with a 201 status.
2. **Given** an authenticated user with tasks, **When** they GET /api/tasks, **Then** they receive a list of only their own tasks.
3. **Given** an authenticated user with a task, **When** they PUT /api/tasks/{id} with updated data, **Then** the task is updated and returned.
4. **Given** an authenticated user with a task, **When** they DELETE /api/tasks/{id}, **Then** the task is deleted and a 204 response is returned.
5. **Given** an authenticated user with a task, **When** they PATCH /api/tasks/{id}/complete, **Then** the task's completion status is toggled and the updated task is returned.

---

### User Story 3 - Task Filtering & Sorting (Priority: P2)

An authenticated user can filter their tasks by status (all, pending, completed) and sort them by creation date, title, or due date.

**Why this priority**: Enhances the user experience by allowing them to organize and find their tasks more efficiently.

**Independent Test**: Can be fully tested by making requests to GET /api/tasks with different query parameters for filtering and sorting, verifying that the returned tasks match the specified criteria.

**Acceptance Scenarios**:

1. **Given** an authenticated user with tasks, **When** they GET /api/tasks?status=pending, **Then** only pending tasks are returned.
2. **Given** an authenticated user with tasks, **When** they GET /api/tasks?sort=title, **Then** tasks are returned sorted by title alphabetically.

---

### User Story 4 - Data Persistence & Isolation (Priority: P1)

Tasks created by one user are securely stored in the database and are only accessible to that user. When the backend restarts, all tasks persist in the database.

**Why this priority**: Data persistence and security are fundamental requirements that must work reliably for the application to be useful.

**Independent Test**: Can be fully tested by creating tasks as one user, logging in as another user, and verifying that the second user cannot see the first user's tasks.

**Acceptance Scenarios**:

1. **Given** User A has created tasks, **When** User B requests their tasks, **Then** User B only sees their own tasks, not User A's tasks.
2. **Given** tasks exist in the database, **When** the backend is restarted and tasks are requested, **Then** all tasks are still available.

---

### Edge Cases

- What happens when a user tries to access a task that doesn't exist?
- How does the system handle requests with malformed JWT tokens?
- What happens when a user tries to update a task that belongs to another user?
- How does the system handle very long task titles or descriptions?
- What happens when database connection fails during an API request?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST verify JWT tokens on all /api/* routes using BETTER_AUTH_SECRET
- **FR-002**: System MUST extract user_id from valid JWT tokens to identify the authenticated user
- **FR-003**: System MUST return 401 Unauthorized for requests with invalid/expired JWT tokens
- **FR-004**: System MUST store user information in the database when first API call is made
- **FR-005**: System MUST allow users to create tasks via POST /api/tasks with title and optional description
- **FR-006**: System MUST validate task title length (1-200 characters) and description length (max 1000 characters)
- **FR-007**: System MUST return 201 Created with the created task when a task is successfully created
- **FR-008**: System MUST allow users to retrieve all their tasks via GET /api/tasks
- **FR-009**: System MUST support filtering tasks by status (all, pending, completed) via query parameters
- **FR-010**: System MUST support sorting tasks by creation date, title, or due date via query parameters
- **FR-011**: System MUST allow users to retrieve a specific task via GET /api/tasks/{id}
- **FR-012**: System MUST return 404 Not Found when requesting a non-existent task
- **FR-013**: System MUST allow users to update tasks via PUT /api/tasks/{id} with partial updates
- **FR-014**: System MUST allow users to delete tasks via DELETE /api/tasks/{id}
- **FR-015**: System MUST return 204 No Content when a task is successfully deleted
- **FR-016**: System MUST allow users to toggle task completion via PATCH /api/tasks/{id}/complete
- **FR-017**: System MUST enforce user isolation - users can only access their own tasks
- **FR-018**: System MUST store all tasks in Neon PostgreSQL database using SQLModel ORM
- **FR-019**: System MUST automatically create database tables on startup
- **FR-020**: System MUST return appropriate HTTP status codes and error messages for all error conditions

### Key Entities

- **User**: Represents an authenticated user from Better Auth with id, email, and optional name; related to tasks they own
- **Task**: Represents a user's task with title, description, completion status, and ownership relationship to a user

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Backend runs successfully with `uvicorn main:app --reload` command without errors
- **SC-002**: Frontend can successfully make authenticated API calls to backend and tasks persist in Neon DB
- **SC-003**: When User A creates tasks and User B logs in, User B sees only their own tasks (none of User A's tasks)
- **SC-004**: All API endpoints return correct responses when tested with valid JWT tokens
- **SC-005**: Invalid tokens result in 401 responses, wrong task IDs result in 404 responses, bad input results in 400 responses
- **SC-006**: Full task flow works: Add task → persists after restart → toggle completion → update → delete
- **SC-007**: All API responses follow JSON format with appropriate HTTP status codes
- **SC-008**: Database tables are automatically created on application startup