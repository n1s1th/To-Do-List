// /components/myday/MyDaySection.tsx

'use client';

import { Task } from '@/lib/types';
import { api } from '@/lib/api';
import TaskItem from '@/components/tasks/TaskItem';
import TaskForm from '@/components/tasks/TaskForm';
import { useState, useEffect } from 'react';

type MyDaySectionProps = {
  tasks: Task[];
  onTaskUpdate: () => void;
};

export default function MyDaySection({ tasks, onTaskUpdate }: MyDaySectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

  // Filter tasks for today
  const myDayTasks = tasks.filter(t => t.myDayDate === today);
  const completedCount = myDayTasks.filter(t => t.isCompleted).length;

  const handleToggleComplete = async (taskId: string) => {
    await api.tasks.toggleComplete(taskId);
    onTaskUpdate();
  };

  const handleToggleImportant = async (taskId: string) => {
    await api.tasks.toggleImportant(taskId);
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
    // Add to My Day by default
    await api.tasks.create(data);
    const newTask = (await api.tasks.getAll({ search: data.title, myDay: false }))[0];
    if (newTask) {
      await api.tasks.addToMyDay(newTask.id, today);
    }
    onTaskUpdate();
    setIsAdding(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Day</h1>
        <p className="text-gray-600">
          {completedCount} of {myDayTasks.length} done
        </p>
      </div>

      <button
        onClick={() => setIsAdding(true)}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Add task for today
      </button>

      {isAdding && (
        <div className="mb-6 p-4 bg-white rounded shadow-sm border">
          <TaskForm
            onSubmit={handleCreate}
            onCancel={() => setIsAdding(false)}
          />
        </div>
      )}

      <div className="space-y-2">
        {myDayTasks.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">☀️</div>
            <p className="text-gray-500">No tasks scheduled for today</p>
            <button
              onClick={() => setIsAdding(true)}
              className="mt-4 text-blue-600 hover:underline"
            >
              Add one now
            </button>
          </div>
        ) : (
          myDayTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={() => handleToggleComplete(task.id)}
              onToggleImportant={() => handleToggleImportant(task.id)}
              onAddToMyDay={() => {}} // noop — already in My Day
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