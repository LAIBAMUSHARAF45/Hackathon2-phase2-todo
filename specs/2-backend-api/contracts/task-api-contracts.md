# API Contracts: Backend API

## Authentication Integration

### JWT Token Verification
**Description**: All /api/* routes require a valid JWT token in the Authorization header
**Header**: Authorization: Bearer {jwt_token}
**Response (401)**:
```json
{
  "detail": "Not authenticated"
}
```

## Task Management Endpoints

### GET /api/tasks
**Description**: Get all tasks for the authenticated user
**Headers**: Authorization: Bearer {token}
**Query Parameters**:
- status: all|pending|completed (default: all)
- sort: created|title|due_date (default: created)
**Response (200)**:
```json
[
  {
    "id": 1,
    "user_id": "user_abc123",
    "title": "Sample task",
    "description": "Task description",
    "completed": false,
    "created_at": "2026-01-02T10:00:00Z",
    "updated_at": "2026-01-02T10:00:00Z"
  }
]
```
**Response (401)**:
```json
{
  "detail": "Not authenticated"
}
```

### POST /api/tasks
**Description**: Create a new task for the authenticated user
**Headers**: Authorization: Bearer {token}
**Request**:
```json
{
  "title": "New task",
  "description": "Task description"
}
```
**Response (201)**:
```json
{
  "id": 2,
  "user_id": "user_abc123",
  "title": "New task",
  "description": "Task description",
  "completed": false,
  "created_at": "2026-01-02T10:00:00Z",
  "updated_at": "2026-01-02T10:00:00Z"
}
```
**Response (400)**:
```json
{
  "detail": "Validation error"
}
```
**Response (401)**:
```json
{
  "detail": "Not authenticated"
}
```

### GET /api/tasks/{task_id}
**Description**: Get a specific task for the authenticated user
**Headers**: Authorization: Bearer {token}
**Response (200)**:
```json
{
  "id": 2,
  "user_id": "user_abc123",
  "title": "New task",
  "description": "Task description",
  "completed": false,
  "created_at": "2026-01-02T10:00:00Z",
  "updated_at": "2026-01-02T10:00:00Z"
}
```
**Response (401)**:
```json
{
  "detail": "Not authenticated"
}
```
**Response (404)**:
```json
{
  "detail": "Task not found"
}
```

### PUT /api/tasks/{task_id}
**Description**: Update a specific task for the authenticated user (partial update)
**Headers**: Authorization: Bearer {token}
**Request**:
```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "completed": true
}
```
**Response (200)**:
```json
{
  "id": 2,
  "user_id": "user_abc123",
  "title": "Updated task title",
  "description": "Updated description",
  "completed": true,
  "created_at": "2026-01-02T10:00:00Z",
  "updated_at": "2026-01-02T11:00:00Z"
}
```
**Response (401)**:
```json
{
  "detail": "Not authenticated"
}
```
**Response (404)**:
```json
{
  "detail": "Task not found"
}
```

### DELETE /api/tasks/{task_id}
**Description**: Delete a specific task for the authenticated user
**Headers**: Authorization: Bearer {token}
**Response (204)**: No content

**Response (401)**:
```json
{
  "detail": "Not authenticated"
}
```
**Response (404)**:
```json
{
  "detail": "Task not found"
}
```

### PATCH /api/tasks/{task_id}/complete
**Description**: Toggle the completion status of a task
**Headers**: Authorization: Bearer {token}
**Response (200)**:
```json
{
  "id": 2,
  "user_id": "user_abc123",
  "title": "Updated task title",
  "description": "Updated description",
  "completed": true,  // or false, depending on previous state
  "created_at": "2026-01-02T10:00:00Z",
  "updated_at": "2026-01-02T11:30:00Z"
}
```
**Response (401)**:
```json
{
  "detail": "Not authenticated"
}
```
**Response (404)**:
```json
{
  "detail": "Task not found"
}
```