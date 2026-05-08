// Task interface - defines the structure of a task object
export interface Task {
  id: string;           // Unique identifier for the task
  title: string;        // Task title/name
  desc: string;         // Task description
  priority: string;     // Priority level: Low, Medium, High
  date: string;         // Due date for the task
  category: string;     // Task category (e.g., Work, Personal, Shopping)
  state: 'Done' | 'NotDone';  // Task completion status
}

// User interface - defines the structure of a user object
export interface User {
  id: string;           // Unique identifier for the user
  username: string;     // User's display name
  email: string;        // User's email (used for login)
  password: string;     // User's password (in real app, this would be hashed)
}

// Made with Bob
