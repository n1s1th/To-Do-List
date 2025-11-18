
import { useState } from 'react';
import { List } from '@/lib/types';
import { api } from '@/lib/api';

type TaskFormProps = {
  onSubmit: (data: { title: string; listId?: string | null }) => void;
  onCancel?: () => void;
  defaultListId?: string | null;
};

export default function TaskForm({ onSubmit, onCancel, defaultListId }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [listId, setListId] = useState<string | null>(defaultListId ?? null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [mockLists] = useState<List[]>([
    { id: 'lst-inbox', userId: 'usr-001', name: 'Tasks', createdAt: '' },
    { id: 'lst-grocery', userId: 'usr-001', name: 'Groceries', createdAt: '' },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsSubmitting(true);
    try {
      onSubmit({ title, listId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Task name"
        className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        autoFocus
        disabled={isSubmitting}
      />

      {defaultListId === undefined && (
        <div>
          <label className="block text-sm font-medium mb-1">List</label>
          <select
            value={listId ?? ''}
            onChange={e => setListId(e.target.value || null)}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Inbox (no list)</option>
            {mockLists.map(list => (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!title.trim() || isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isSubmitting ? 'Adding...' : 'Add'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}