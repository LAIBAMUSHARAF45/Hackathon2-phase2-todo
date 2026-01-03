# API Contracts: Frontend UI

## Authentication Endpoints

### POST /api/auth/signup
**Description**: Create a new user account
**Request**:
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "User Name"
}
```
**Response (200)**:
```json
{
  "user_id": "user_abc123",
  "email": "user@example.com",
  "name": "User Name"
}
```
**Response (400)**:
```json
{
  "error": "Invalid input",
  "details": ["email must be valid", "password must be at least 8 characters"]
}
```

### POST /api/auth/signin
**Description**: Authenticate a user and return session information
**Request**:
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
**Response (200)**:
```json
{
  "user_id": "user_abc123",
  "email": "user@example.com",
  "name": "User Name",
  "token": "jwt_token_here"
}
```
**Response (401)**:
```json
{
  "error": "Invalid credentials"
}
```

### GET /api/auth/me
**Description**: Get current user's profile information
**Headers**: Authorization: Bearer {token}
**Response (200)**:
```json
{
  "user_id": "user_abc123",
  "email": "user@example.com",
  "name": "User Name",
  "is_authenticated": true
}
```
**Response (401)**:
```json
{
  "error": "Unauthorized"
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
    "id": "task_123",
    "title": "Sample task",
    "description": "Task description",
    "completed": false,
    "created_at": "2026-01-02T10:00:00Z",
    "updated_at": "2026-01-02T10:00:00Z",
    "user_id": "user_abc123"
  }
]
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
  "id": "task_456",
  "title": "New task",
  "description": "Task description",
  "completed": false,
  "created_at": "2026-01-02T10:00:00Z",
  "updated_at": "2026-01-02T10:00:00Z",
  "user_id": "user_abc123"
}
```

### GET /api/tasks/{id}
**Description**: Get a specific task for the authenticated user
**Headers**: Authorization: Bearer {token}
**Response (200)**:
```json
{
  "id": "task_456",
  "title": "New task",
  "description": "Task description",
  "completed": false,
  "created_at": "2026-01-02T10:00:00Z",
  "updated_at": "2026-01-02T10:00:00Z",
  "user_id": "user_abc123"
}
```

### PUT /api/tasks/{id}
**Description**: Update a specific task for the authenticated user
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
  "id": "task_456",
  "title": "Updated task title",
  "description": "Updated description",
  "completed": true,
  "created_at": "2026-01-02T10:00:00Z",
  "updated_at": "2026-01-02T11:00:00Z",
  "user_id": "user_abc123"
}
```

### DELETE /api/tasks/{id}
**Description**: Delete a specific task for the authenticated user
**Headers**: Authorization: Bearer {token}
**Response (204)**: No content

### PATCH /api/tasks/{id}/complete
**Description**: Toggle the completion status of a task
**Headers**: Authorization: Bearer {token}
**Response (200)**:
```json
{
  "id": "task_456",
  "title": "Updated task title",
  "description": "Updated description",
  "completed": true,  // or false, depending on previous state
  "created_at": "2026-01-02T10:00:00Z",
  "updated_at": "2026-01-02T11:30:00Z",
  "user_id": "user_abc123"
}
```

## Task Summary Endpoint

### GET /api/tasks/summary
**Description**: Get a summary of the user's tasks
**Headers**: Authorization: Bearer {token}
**Response (200)**:
```json
{
  "total": 14,
  "pending": 9,
  "completed": 5,
  "overdue": 2,
  "message": "9 tasks pending, 2 overdue"
}
```