
'use client';

import { List, Task } from '@/lib/types';
import { api } from '@/lib/api';
import TaskItem from '@/components/tasks/TaskItem';
import TaskForm from '@/components/tasks/TaskForm';
import { useState } from 'react';

type ListSectionProps = {
  list: List;
  tasks: Task[];
  onTaskUpdate: () => void;
};

export default function ListSection({ list, tasks, onTaskUpdate }: ListSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditingList, setIsEditingList] = useState(false);
  const [editName, setEditName] = useState(list.name);

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
    await api.tasks.create({ ...data, listId: list.id });
    onTaskUpdate();
    setIsAdding(false);
  };

  const handleListUpdate = async () => {
    if (editName.trim()) {
      await api.lists.update(list.id, { name: editName });
      setIsEditingList(false);
    }
  };

  const handleListDelete = async () => {
    if (confirm(`Delete list "${list.name}" and its tasks?`)) {
      await api.lists.delete(list.id);
      onTaskUpdate();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {isEditingList ? (
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={editName}
              onChange={e => setEditName(e.target.value)}
              className="border px-3 py-1 rounded focus:ring-2 focus:ring-blue-500"
              autoFocus
              onKeyDown={e => e.key === 'Enter' && handleListUpdate()}
            />
            <button onClick={handleListUpdate} className="text-blue-600">Save</button>
            <button onClick={() => setIsEditingList(false)} className="text-gray-500">
              Cancel
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold">{list.name}</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditingList(true)}
                className="text-gray-600 hover:text-gray-900"
              >
                ✏️ Edit
              </button>
              <button
                onClick={handleListDelete}
                className="text-gray-600 hover:text-red-600"
              >
                🗑️ Delete
              </button>
            </div>
          </>
        )}
      </div>

      <button
        onClick={() => setIsAdding(true)}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Add task to "{list.name}"
      </button>

      {isAdding && (
        <div className="mb-6 p-4 bg-white rounded shadow-sm border">
          <TaskForm
            onSubmit={handleCreate}
            onCancel={() => setIsAdding(false)}
            defaultListId={list.id}
          />
        </div>
      )}

      <div className="space-y-2">
        {tasks.length === 0 ? (
          <p className="text-gray-500 italic">List is empty</p>
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
