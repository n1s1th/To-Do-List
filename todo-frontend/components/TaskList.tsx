'use client';

import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import {
  Task,
  getTasks,
  createTask,
  deleteTask as deleteTaskApi,
  toggleComplete,
  toggleImportant,
  addToMyDay,
  removeFromMyDay,
} from '@/lib/api';

interface TaskListProps {
  view: string;
  title: string;
  showDueDateInput?: boolean;
}

export default function TaskList({ view, title, showDueDateInput = false }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks(view);
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [view]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const payload: any = { title: newTaskTitle.trim() };
      if (showDueDateInput && newTaskDueDate) {
        payload.dueAt = new Date(newTaskDueDate).toISOString();
      }
      await createTask(payload);
      setNewTaskTitle('');
      setNewTaskDueDate('');
      loadTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
    }
  };

  const handleToggleComplete = async (id: string) => {
    try {
      await toggleComplete(id);
      loadTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const handleToggleImportant = async (id: string) => {
    try {
      await toggleImportant(id);
      loadTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const handleAddToMyDay = async (id: string) => {
    try {
      await addToMyDay(id);
      loadTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const handleRemoveFromMyDay = async (id: string) => {
    try {
      await removeFromMyDay(id);
      loadTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTaskApi(id);
      loadTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    }
  };

  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">{title}</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleCreateTask} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a task"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {showDueDateInput && (
            <input
              type="date"
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
      </form>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No tasks yet. Create one above!
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onToggleImportant={handleToggleImportant}
              onAddToMyDay={handleAddToMyDay}
              onRemoveFromMyDay={handleRemoveFromMyDay}
              onDelete={handleDelete}
              showMyDayButton={view !== 'myday'}
            />
          ))}
        </div>
      )}
    </div>
  );
}
