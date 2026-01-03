# Data Model: Backend API

## User Entity
- **Fields**:
  - id: string (unique identifier from Better Auth)
  - email: string (user's email address, unique)
  - name: string (optional, user's display name)
  - created_at: datetime (when the user record was created in our DB)
- **Relationships**:
  - owns: Task[] (one-to-many relationship to tasks)
- **Validation**:
  - id: required, string from Better Auth
  - email: must be a valid email format, unique
  - name: optional, max 100 characters if provided
  - created_at: automatically set on creation

## Task Entity
- **Fields**:
  - id: integer (auto-increment primary key)
  - user_id: string (foreign key to User.id)
  - title: string (task title)
  - description: string (optional task description)
  - completed: boolean (completion status, defaults to false)
  - created_at: datetime (when the task was created)
  - updated_at: datetime (when the task was last updated)
- **Relationships**:
  - belongsTo: User (many-to-one relationship to user)
- **Validation**:
  - title: required, minimum 1 character, maximum 200 characters
  - description: optional, maximum 1000 characters if provided
  - completed: boolean, defaults to false
  - user_id: required, must reference an existing user
  - created_at: automatically set on creation
  - updated_at: automatically updated on modification

## State Transitions

### Task State Transitions
- **Initial State**: {completed: false}
- **Toggle Complete**: {completed: false} → {completed: true}
- **Toggle Incomplete**: {completed: true} → {completed: false}

## Indexes
- Task.user_id: Index on user_id for efficient filtering by user
- Task.completed: Index on completed for efficient filtering by completion status

## Constraints
- All tasks must belong to a valid user (foreign key constraint)
- User email must be unique
- Task title must be between 1 and 200 characters
- Task description must be less than 1000 characters if provided