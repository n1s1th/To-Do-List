
import { Task } from '@/lib/types';
import { api } from '@/lib/api';
import { useState } from 'react';

type TaskItemProps = {
  task: Task;
  onToggleComplete: () => void;
  onToggleImportant: () => void;
  onAddToMyDay: () => void;
  onRemoveFromMyDay: () => void;
  onUpdate: (updates: Partial<Task>) => void;
  onDelete: () => void;
};

export default function TaskItem({
  task,
  onToggleComplete,
  onToggleImportant,
  onAddToMyDay,
  onRemoveFromMyDay,
  onUpdate,
  onDelete,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const today = new Date().toISOString().split('T')[0];

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onUpdate({ title: editTitle });
    }
    setIsEditing(false);
  };

  return (
    <div className={`flex items-start p-3 rounded hover:bg-gray-50 ${task.isCompleted ? 'opacity-70' : ''}`}>
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={onToggleComplete}
        className="mt-1 mr-3 h-5 w-5"
      />

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              className="flex-1 border-b focus:outline-none focus:border-blue-500"
              autoFocus
              onKeyDown={e => e.key === 'Enter' && handleSaveEdit()}
            />
            <button onClick={handleSaveEdit} className="text-blue-600">Save</button>
            <button onClick={() => setIsEditing(false)} className="text-gray-500">Cancel</button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span
              onClick={() => setIsEditing(true)}
              className={`cursor-pointer ${task.isCompleted ? 'line-through text-gray-500' : ''}`}
            >
              {task.title}
            </span>
            {task.isImportant && <span className="text-red-500">❗</span>}
            {task.dueAt && (
              <span className="text-xs text-gray-500 ml-2">
                Due: {new Date(task.dueAt).toLocaleDateString()}
              </span>
            )}
            {task.myDayDate && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded ml-2">
                {task.myDayDate === today ? 'Today' : task.myDayDate}
              </span>
            )}
          </div>
        )}

        {task.description && !isEditing && (
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        )}
      </div>

      <div className="flex gap-2 ml-2">
        {!isEditing && (
          <>
            <button onClick={onToggleImportant} className="text-gray-400 hover:text-red-500">
              {task.isImportant ? '⭐' : '✩'}
            </button>
            {task.myDayDate ? (
              <button onClick={onRemoveFromMyDay} className="text-gray-400 hover:text-blue-600">
                🌞
              </button>
            ) : (
              <button onClick={onAddToMyDay} className="text-gray-400 hover:text-blue-600">
                🌙
              </button>
            )}
            <button onClick={onDelete} className="text-gray-400 hover:text-red-500">
              🗑️
            </button>
          </>
        )}
      </div>
    </div>
  );
}