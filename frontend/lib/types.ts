// /lib/types.ts

export type User = {
  id: string;
  email: string;
  displayName: string | null;
};

export type List = {
  id: string;
  userId: string;
  name: string;
  createdAt: string; // ISO string
};

export type Task = {
  id: string;
  userId: string;
  listId: string | null;
  title: string;
  description: string | null;
  isCompleted: boolean;
  isImportant: boolean;
  dueAt: string | null; // ISO string or null
  myDayDate: string | null; // "YYYY-MM-DD" or null
  priority: number;
  createdAt: string;
  updatedAt: string;
};

// Request payloads
export type RegisterPayload = {
  email: string;
  password: string;
  displayName: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type CreateListPayload = {
  name: string;
};

export type CreateTaskPayload = {
  title: string;
  description?: string;
  dueAt?: string | null;
  priority?: number;
  listId?: string | null;
};

export type UpdateTaskPayload = Partial<Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>;

// Query params for GET /api/tasks
export type TaskQueryParams = {
  listId?: string;
  completed?: boolean;
  important?: boolean;
  myDay?: boolean;
  dueBefore?: string; // ISO date
  search?: string;
  page?: number;
  pageSize?: number;
};