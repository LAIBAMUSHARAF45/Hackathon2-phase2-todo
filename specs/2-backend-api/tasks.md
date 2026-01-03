---

description: "Task list for Backend API implementation"
---

# Tasks: Backend API

**Input**: Design documents from `/specs/2-backend-api/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/` at repository root
- Paths shown below assume web app structure - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create backend directory structure per implementation plan
- [x] T002 Initialize FastAPI project with UV: uv init, uv add fastapi sqlmodel uvicorn python-dotenv pyjwt python-jose[cryptography]
- [x] T003 [P] Create .env file with provided values in backend/.env
- [x] T004 [P] Create .env.example file with example environment variables in backend/.env.example
- [x] T005 Create requirements.txt with dependencies in backend/requirements.txt
- [x] T006 Create main.py with FastAPI app and CORS configuration in backend/main.py

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [x] T007 Create SQLModel models for User and Task in backend/models/database.py
- [x] T008 [P] Create database connection and session in backend/core/database.py
- [x] T009 [P] Create JWT verification and authentication in backend/core/security.py
- [x] T010 Create Pydantic schemas for User in backend/schemas/user.py
- [x] T011 Create Pydantic schemas for Task in backend/schemas/task.py
- [x] T012 Create dependencies with get_current_user and get_db in backend/dependencies.py
- [x] T013 Configure startup event to auto-create tables in backend/main.py

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - User Authentication & Token Verification (Priority: P1) 🎯 MVP

**Goal**: Implement JWT token verification on all /api/* routes to ensure users are authenticated and their identity is established

**Independent Test**: Can be fully tested by making API requests with valid and invalid JWT tokens, verifying that valid tokens allow access while invalid tokens result in 401 Unauthorized responses.

### Implementation for User Story 1

- [x] T014 [P] [US1] Create API router for tasks in backend/api/tasks.py
- [x] T015 [US1] Implement JWT token verification middleware in backend/api/tasks.py
- [x] T016 [US1] Add authentication dependency to all task endpoints
- [ ] T017 [US1] Test JWT verification with valid/invalid tokens
- [x] T018 [US1] Implement auto-create user in DB on first API call

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Task Management (Priority: P1)

**Goal**: Implement all CRUD operations for tasks (create, read, update, delete, toggle completion) with proper user isolation

**Independent Test**: Can be fully tested by creating, reading, updating, and deleting tasks with proper authentication, verifying that users only see their own tasks and cannot access others' tasks.

### Implementation for User Story 2

- [x] T019 [P] [US2] Implement GET /api/tasks endpoint in backend/api/tasks.py
- [x] T020 [P] [US2] Implement POST /api/tasks endpoint in backend/api/tasks.py
- [x] T021 [P] [US2] Implement GET /api/tasks/{task_id} endpoint in backend/api/tasks.py
- [x] T022 [US2] Implement PUT /api/tasks/{task_id} endpoint in backend/api/tasks.py
- [x] T023 [US2] Implement DELETE /api/tasks/{task_id} endpoint in backend/api/tasks.py
- [x] T024 [US2] Implement PATCH /api/tasks/{task_id}/complete endpoint in backend/api/tasks.py
- [x] T025 [US2] Add user isolation (WHERE user_id = current_user.id) to all queries
- [x] T026 [US2] Add input validation for task creation/update
- [ ] T027 [US2] Test full CRUD flow with proper user isolation

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Task Filtering & Sorting (Priority: P2)

**Goal**: Add filtering and sorting capabilities to the GET /api/tasks endpoint

**Independent Test**: Can be fully tested by making requests to GET /api/tasks with different query parameters for filtering and sorting, verifying that the returned tasks match the specified criteria.

### Implementation for User Story 3

- [x] T028 [P] [US3] Add status filtering (all|pending|completed) to GET /api/tasks in backend/api/tasks.py
- [x] T029 [US3] Add sorting options (created|title|due_date) to GET /api/tasks in backend/api/tasks.py
- [ ] T030 [US3] Test filtering and sorting functionality
- [x] T031 [US3] Update Pydantic schemas to support query parameters in backend/schemas/task.py

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Data Persistence & Isolation (Priority: P1)

**Goal**: Ensure tasks are properly stored in Neon PostgreSQL database and users can only access their own tasks

**Independent Test**: Can be fully tested by creating tasks as one user, logging in as another user, and verifying that the second user cannot see the first user's tasks.

### Implementation for User Story 4

- [x] T032 [P] [US4] Add indexes to Task model (user_id, completed) in backend/models/database.py
- [x] T033 [US4] Implement proper error handling (404 for non-existent tasks) in backend/api/tasks.py
- [ ] T034 [US4] Test user isolation between different accounts
- [ ] T035 [US4] Test data persistence after backend restart
- [ ] T036 [US4] Add comprehensive validation based on requirements

**Checkpoint**: All user stories should now be independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T037 [P] Add comprehensive error handling and HTTPException responses in backend/core/exceptions.py
- [x] T038 [P] Add logging for debug in backend/core/logging.py
- [x] T039 [P] Add Docker configuration in backend/Dockerfile
- [x] T040 [P] Add docker-compose.yml for backend + Neon DB integration in docker-compose.yml
- [x] T041 [P] Update README with backend setup instructions in backend/README.md
- [x] T042 [P] Add example curl tests for endpoints in backend/tests/examples.md
- [x] T043 Run quickstart.md validation to ensure all features work as expected

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Depends on US1 (auth) - Requires authentication to access task endpoints
- **User Story 3 (P2)**: Depends on US2 (task endpoints) - Requires task endpoints to add filtering
- **User Story 4 (P1)**: Depends on US1 and US2 (auth and task endpoints) - Requires both for proper isolation

### Within Each User Story

- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all components for User Story 1 together:
Task: "Create API router for tasks in backend/api/tasks.py"
Task: "Implement JWT token verification middleware in backend/api/tasks.py"
Task: "Add authentication dependency to all task endpoints"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence