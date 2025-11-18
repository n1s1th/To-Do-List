// User types
export interface User {
  id: string;
  email: string;
  displayName: string;
}

// List types
export interface List {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
}

// Task types
export interface Task {
  id: string;
  userId: string;
  listId: string | null;
  title: string;
  description: string | null;
  isCompleted: boolean;
  isImportant: boolean;
  dueAt: string | null;
  myDayDate: string | null;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

// Auth payload types
export interface RegisterPayload {
  email: string;
  password: string;
  displayName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// List payload types
export interface CreateListPayload {
  name: string;
}

// Task payload types
export interface CreateTaskPayload {
  title: string;
  description?: string;
  listId?: string;
  dueAt?: string;
  priority?: number;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string | null;
  listId?: string | null;
  isCompleted?: boolean;
  isImportant?: boolean;
  dueAt?: string | null;
  myDayDate?: string | null;
  priority?: number;
}

export interface TaskQueryParams {
  listId?: string | null;
  completed?: boolean;
  important?: boolean;
  myDay?: boolean;
  dueBefore?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}
