export interface User {
  id: string;
  email: string;
  displayName: string;
}

export interface List {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
}

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

export interface RegisterPayload {
  email: string;
  password: string;
  displayName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface CreateListPayload {
  name: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  listId?: string | null;
  dueAt?: string | null;
  isImportant?: boolean;
  priority?: number;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  isCompleted?: boolean;
  isImportant?: boolean;
  dueAt?: string | null;
  myDayDate?: string | null;
  priority?: number;
  listId?: string | null;
}

export interface TaskQueryParams {
  myDay?: boolean;
  listId?: string;
  isCompleted?: boolean;
}
