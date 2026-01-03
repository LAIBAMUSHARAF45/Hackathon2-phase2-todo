# Data Model: Frontend UI

## User Entity
- **Fields**:
  - id: string (unique identifier)
  - email: string (user's email address)
  - name: string (optional, user's display name)
  - createdAt: Date (when the account was created)
  - updatedAt: Date (when the account was last updated)
- **Relationships**:
  - owns: Task[] (one-to-many relationship to tasks)
- **Validation**:
  - email: must be a valid email format
  - email: must be unique
  - name: optional, max 100 characters if provided

## Task Entity
- **Fields**:
  - id: string (unique identifier)
  - title: string (task title)
  - description: string (optional task description)
  - completed: boolean (completion status)
  - createdAt: Date (when the task was created)
  - updatedAt: Date (when the task was last updated)
  - userId: string (foreign key to User)
- **Relationships**:
  - belongsTo: User (many-to-one relationship to user)
- **Validation**:
  - title: required, minimum 1 character, maximum 200 characters
  - description: optional, maximum 1000 characters if provided
  - completed: boolean, defaults to false
  - userId: required, must reference an existing user

## State Transitions

### Task State Transitions
- **Initial State**: {completed: false}
- **Toggle Complete**: {completed: false} → {completed: true}
- **Toggle Incomplete**: {completed: true} → {completed: false}

## UI-Specific Data Models

### Task Form Data
- **Fields**:
  - title: string (required)
  - description: string (optional)
- **Validation**:
  - title: required, minimum 1 character, maximum 200 characters
  - description: optional, maximum 1000 characters if provided

### Auth Form Data
- **Signup Fields**:
  - email: string (required)
  - password: string (required, minimum 8 characters)
  - name: string (optional)
- **Signin Fields**:
  - email: string (required)
  - password: string (required)
- **Validation**:
  - email: must be valid email format
  - password: minimum 8 characters for signup
  - name: optional, maximum 100 characters if provided