

import { User, List, Task, RegisterPayload, LoginPayload, CreateListPayload, CreateTaskPayload, UpdateTaskPayload, TaskQueryParams } from './types';

const API_BASE = '/api'; 

// Mock data — simulates DB. Replace with real fetch() when backend ready.
const MOCK_USER: User = {
  id: 'usr-001',
  email: 'test@example.com',
  displayName: 'Chandu',
};

const MOCK_LISTS: List[] = [
  { id: 'lst-inbox', userId: MOCK_USER.id, name: 'Tasks', createdAt: '2025-11-10T08:00:00Z' },
  { id: 'lst-grocery', userId: MOCK_USER.id, name: 'Groceries', createdAt: '2025-11-11T10:30:00Z' },
];

const MOCK_TASKS: Task[] = [
  {
    id: 'tsk-001',
    userId: MOCK_USER.id,
    listId: 'lst-inbox',
    title: 'Finish Next.js Todo App',
    description: 'Implement frontend with mocked API',
    isCompleted: false,
    isImportant: true,
    dueAt: '2025-11-20T18:00:00Z',
    myDayDate: '2025-11-17',
    priority: 1,
    createdAt: '2025-11-15T09:00:00Z',
    updatedAt: '2025-11-16T14:20:00Z',
  },
  {
    id: 'tsk-002',
    userId: MOCK_USER.id,
    listId: 'lst-grocery',
    title: 'Buy milk',
    description: null,
    isCompleted: true,
    isImportant: false,
    dueAt: null,
    myDayDate: null,
    priority: 0,
    createdAt: '2025-11-12T11:15:00Z',
    updatedAt: '2025-11-12T11:15:00Z',
  },
  {
    id: 'tsk-003',
    userId: MOCK_USER.id,
    listId: null, // Inbox
    title: 'Call mom',
    description: 'Ask about dinner plans',
    isCompleted: false,
    isImportant: true,
    dueAt: '2025-11-18T12:00:00Z',
    myDayDate: '2025-11-17',
    priority: 2,
    createdAt: '2025-11-14T16:30:00Z',
    updatedAt: '2025-11-17T08:10:00Z',
  },
];


export const api = {
  auth: {
    register: async (data: RegisterPayload): Promise<User> => {
      console.log('[MOCK] Register:', data);
      // Simulate network delay
      await new Promise(r => setTimeout(r, 300));
      return { ...MOCK_USER, displayName: data.displayName, email: data.email };
    },

    login: async (data: LoginPayload): Promise<User> => {
      console.log('[MOCK] Login:', data);
      await new Promise(r => setTimeout(r, 300));
      if (data.email === 'test@example.com') return MOCK_USER;
      throw new Error('Invalid credentials');
    },

    logout: async (): Promise<void> => {
      console.log('[MOCK] Logout');
      await new Promise(r => setTimeout(r, 200));
    },

    me: async (): Promise<User | null> => {
      console.log('[MOCK] GET /me →', MOCK_USER);
      await new Promise(r => setTimeout(r, 150));
      return MOCK_USER; // In real app: return null if 401
    },
  },

  lists: {
    getAll: async (): Promise<List[]> => {
      console.log('[MOCK] GET /lists →', MOCK_LISTS);
      await new Promise(r => setTimeout(r, 200));
      return MOCK_LISTS;
    },

    create: async (data: CreateListPayload): Promise<List> => {
      console.log('[MOCK] POST /lists:', data);
      const newList: List = {
        id: `lst-${Date.now()}`,
        userId: MOCK_USER.id,
        name: data.name,
        createdAt: new Date().toISOString(),
      };
      MOCK_LISTS.push(newList);
      return newList;
    },

    update: async (id: string, data: { name: string }): Promise<List> => {
      console.log(`[MOCK] PUT /lists/${id}:`, data);
      const list = MOCK_LISTS.find(l => l.id === id);
      if (!list) throw new Error('List not found');
      list.name = data.name;
      return list;
    },

    delete: async (id: string): Promise<void> => {
      console.log(`[MOCK] DELETE /lists/${id}`);
      const idx = MOCK_LISTS.findIndex(l => l.id === id);
      if (idx !== -1) MOCK_LISTS.splice(idx, 1);
    },
  },

  tasks: {
    getAll: async (params: TaskQueryParams = {}): Promise<Task[]> => {
      console.log('[MOCK] GET /tasks with params:', params);
      await new Promise(r => setTimeout(r, 250));

      let filtered = MOCK_TASKS;

      if (params.listId !== undefined) {
        filtered = filtered.filter(t => t.listId === params.listId);
      }
      if (params.completed !== undefined) {
        filtered = filtered.filter(t => t.isCompleted === params.completed);
      }
      if (params.important !== undefined) {
        filtered = filtered.filter(t => t.isImportant === params.important);
      }
      if (params.myDay) {
        const today = new Date().toISOString().split('T')[0]; // "2025-11-17"
        filtered = filtered.filter(t => t.myDayDate === today);
      }
      if (params.search) {
        const term = params.search.toLowerCase();
        filtered = filtered.filter(
          t => t.title.toLowerCase().includes(term) || t.description?.toLowerCase().includes(term)
        );
      }

      return filtered;
    },

    create: async (data: CreateTaskPayload): Promise<Task> => {
      console.log('[MOCK] POST /tasks:', data);
      const newTask: Task = {
        id: `tsk-${Date.now()}`,
        userId: MOCK_USER.id,
        listId: data.listId ?? null,
        title: data.title,
        description: data.description ?? null,
        isCompleted: false,
        isImportant: false,
        dueAt: data.dueAt ?? null,
        myDayDate: null,
        priority: data.priority ?? 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      MOCK_TASKS.push(newTask);
      return newTask;
    },

    get: async (id: string): Promise<Task> => {
      const task = MOCK_TASKS.find(t => t.id === id);
      if (!task) throw new Error('Task not found');
      return task;
    },

    update: async (id: string, data: UpdateTaskPayload): Promise<Task> => {
      console.log(`[MOCK] PUT /tasks/${id}:`, data);
      const task = MOCK_TASKS.find(t => t.id === id);
      if (!task) throw new Error('Task not found');
      Object.assign(task, data, { updatedAt: new Date().toISOString() });
      return task;
    },

    delete: async (id: string): Promise<void> => {
      console.log(`[MOCK] DELETE /tasks/${id}`);
      const idx = MOCK_TASKS.findIndex(t => t.id === id);
      if (idx !== -1) MOCK_TASKS.splice(idx, 1);
    },

    toggleComplete: async (id: string): Promise<Task> => {
      const task = MOCK_TASKS.find(t => t.id === id);
      if (!task) throw new Error('Task not found');
      task.isCompleted = !task.isCompleted;
      task.updatedAt = new Date().toISOString();
      return task;
    },

    toggleImportant: async (id: string): Promise<Task> => {
      const task = MOCK_TASKS.find(t => t.id === id);
      if (!task) throw new Error('Task not found');
      task.isImportant = !task.isImportant;
      task.updatedAt = new Date().toISOString();
      return task;
    },

    addToMyDay: async (id: string, date: string): Promise<Task> => {
      const task = MOCK_TASKS.find(t => t.id === id);
      if (!task) throw new Error('Task not found');
      task.myDayDate = date;
      task.updatedAt = new Date().toISOString();
      return task;
    },

    removeFromMyDay: async (id: string): Promise<Task> => {
      const task = MOCK_TASKS.find(t => t.id === id);
      if (!task) throw new Error('Task not found');
      task.myDayDate = null;
      task.updatedAt = new Date().toISOString();
      return task;
    },

    moveToList: async (taskId: string, listId: string | null): Promise<Task> => {
      const task = MOCK_TASKS.find(t => t.id === taskId);
      if (!task) throw new Error('Task not found');
      task.listId = listId;
      task.updatedAt = new Date().toISOString();
      return task;
    },
  },
};






