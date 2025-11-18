
'use client';

import { Task } from '@/lib/types';
import { api } from '@/lib/api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { useState } from 'react';

type TaskViewProps = {
  tasks: Task[];
  title: string;
  onTaskUpdate: () => void;
};

export default function TaskView({ tasks, title, onTaskUpdate }: TaskViewProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleToggleComplete = async (taskId: string) => {
    await api.tasks.toggleComplete(taskId);
    onTaskUpdate();
  };

  const handleToggleImportant = async (taskId: string) => {
    await api.tasks.toggleImportant(taskId);
    onTaskUpdate();
  };

  const handleAddToMyDay = async (taskId: string) => {
    const today = new Date().toISOString().split('T')[0]; 
    await api.tasks.addToMyDay(taskId, today);
    onTaskUpdate();
  };

  const handleRemoveFromMyDay = async (taskId: string) => {
    await api.tasks.removeFromMyDay(taskId);
    onTaskUpdate();
  };

  const handleUpdate = async (taskId: string, updates: Partial<Task>) => {
    await api.tasks.update(taskId, updates);
    onTaskUpdate();
  };

  const handleDelete = async (taskId: string) => {
    await api.tasks.delete(taskId);
    onTaskUpdate();
  };

  const handleCreate = async (data: { title: string }) => {
    await api.tasks.create(data);
    onTaskUpdate();
    setIsAdding(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add task
        </button>
      </div>

      {isAdding && (
        <div className="mb-6 p-4 bg-white rounded shadow-sm border">
          <TaskForm
            onSubmit={handleCreate}
            onCancel={() => setIsAdding(false)}
            defaultListId={null}
          />
        </div>
      )}

      <div className="space-y-2">
        {tasks.length === 0 ? (
          <p className="text-gray-500 italic">No tasks yet</p>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={() => handleToggleComplete(task.id)}
              onToggleImportant={() => handleToggleImportant(task.id)}
              onAddToMyDay={() => handleAddToMyDay(task.id)}
              onRemoveFromMyDay={() => handleRemoveFromMyDay(task.id)}
              onUpdate={updates => handleUpdate(task.id, updates)}
              onDelete={() => handleDelete(task.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}