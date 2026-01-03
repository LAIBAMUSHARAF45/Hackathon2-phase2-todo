<!-- 
Sync Impact Report:
- Version change: N/A → 1.0.0
- Modified principles: N/A (new constitution)
- Added sections: All sections
- Removed sections: N/A
- Templates requiring updates: 
  - .specify/templates/plan-template.md ✅ updated
  - .specify/templates/spec-template.md ✅ updated  
  - .specify/templates/tasks-template.md ✅ updated
  - .specify/templates/commands/*.md ✅ reviewed
- Follow-up TODOs: None
-->

# Todo Constitution

## Core Principles

### I. Code Quality
Every code contribution must follow established standards: Python (backend) requires PEP 8 compliance with type hints and clean functions; TypeScript (frontend) requires strict typing with no 'any' types; All functions must have single responsibility with meaningful names and proper error handling.

### II. User Experience
The application must provide a responsive, mobile-first UI using Tailwind CSS; The dashboard must be intuitive with a clear task list, add button, and auth flow; All user interactions must provide clear feedback including loading states and toast notifications for success/error messages.

### III. Test-First (NON-NEGOTIABLE)
TDD is mandatory: Tests written → User approved → Tests fail → Then implement; The Red-Green-Refactor cycle must be strictly enforced; All features must have corresponding tests before being considered complete.

### IV. Security-First
All API endpoints must be JWT-protected; User isolation must be enforced at the database level; Authentication must use Better Auth on frontend with JWT verification on backend using a shared secret; All sensitive data must be properly encrypted.

### V. Persistence & Reliability
All data must persist in Neon PostgreSQL database; The application must maintain data integrity across restarts; Database operations must be atomic and consistent; Error handling must prevent data loss.

### VI. Multi-User Isolation
Each user must only see and modify their own tasks; User data must be properly isolated at the application and database level; Authentication and authorization must be verified for every request; User session management must be secure and reliable.

## Technical Constraints

Frontend: Next.js 16+ (App Router), TypeScript, Tailwind CSS
Backend: FastAPI, SQLModel ORM, Neon PostgreSQL
Auth: Better Auth (frontend) + JWT verification (backend, shared secret)
API: RESTful, /api/tasks/* endpoints, all protected
Database: tasks table with user_id FK + users (managed by Better Auth)

## Development Workflow

- Use Spec-Kit Plus workflow: Constitution → Specify → Plan → Tasks → Qwen code generation
- Qwen as ONLY model for code/spec generation (no Claude)
- Reference specs with @specs/... syntax
- Human must review & approve every generated code block
- Preserve full spec history
- Commit often with semantic messages
- No manual coding allowed for hackathon evaluation

## Success Definition (Phase II Basic Exit Criteria)

☑ All 5 features work end-to-end in web app (Add, View, Update, Delete, Toggle Complete)
☑ User signup/signin works (Better Auth)
☑ JWT auth secures API, user isolation enforced
☑ Data persists in Neon DB after restart
☑ App runs via docker-compose (frontend + backend + db)
☑ README has clear setup, auth flow, API docs
☑ No crashes on normal/edge cases

## Explicit Non-Goals for Phase II Basic

× Advanced features (priorities, tags, due dates, recurring, search, sort)
× Real-time updates (WebSockets)
× Chatbot/AI integration (Phase III)
× Custom styling beyond Tailwind basics
× Unit/integration tests (optional nice-to-have)

## Governance

This constitution is the supreme guiding document for Phase II of Todo.
Any deviation must be:
- Explicitly justified
- Documented in specs/history
- Approved by project owner

All PRs/reviews must verify compliance with these principles.
Complexity must be justified with clear benefits.

**Version**: 1.0.0 | **Ratified**: 2026-01-02 | **Last Amended**: 2026-01-02