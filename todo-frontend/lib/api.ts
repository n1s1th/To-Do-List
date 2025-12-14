const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080/api';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
  isImportant: boolean;
  dueAt: string | null;
  myDayDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  dueAt?: string;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  dueAt?: string | null;
  isCompleted?: boolean;
  isImportant?: boolean;
  myDayDate?: string | null;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  if (response.status === 204) {
    return null as T;
  }
  return response.json();
}

export async function getTasks(view: string = 'inbox', search?: string): Promise<Task[]> {
  const params = new URLSearchParams({ view });
  if (search) {
    params.append('search', search);
  }
  const response = await fetch(`${API_BASE_URL}/tasks?${params}`);
  return handleResponse<Task[]>(response);
}

export async function createTask(payload: CreateTaskPayload): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse<Task>(response);
}

export async function updateTask(id: string, payload: UpdateTaskPayload): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse<Task>(response);
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  return handleResponse<void>(response);
}

export async function toggleImportant(id: string): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}/toggleImportant`, {
    method: 'POST',
  });
  return handleResponse<Task>(response);
}

export async function toggleComplete(id: string): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}/toggleComplete`, {
    method: 'POST',
  });
  return handleResponse<Task>(response);
}

export async function addToMyDay(id: string): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}/addToMyDay`, {
    method: 'POST',
  });
  return handleResponse<Task>(response);
}

export async function removeFromMyDay(id: string): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}/removeFromMyDay`, {
    method: 'POST',
  });
  return handleResponse<Task>(response);
}
