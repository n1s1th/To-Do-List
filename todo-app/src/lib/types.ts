export interface Task {
  id: string;
  user_id: string;
  list_id?: string;
  title: string;
  description?: string;
  is_completed: boolean;
  is_important: boolean;
  due_at?: string;
  my_day_date?: string;
  priority: number;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  dueAt?: string;
  priority?: number;
  listId?: string;
}

export interface UpdateTaskRequest extends Partial<CreateTaskRequest> {
  is_completed?: boolean;
  is_important?: boolean;
}

export interface TaskFilters {
  listId?: string;
  completed?: boolean;
  important?: boolean;
  myDay?: boolean;
  dueBefore?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}