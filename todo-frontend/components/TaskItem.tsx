'use client';

import { Task } from '@/lib/api';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onToggleImportant: (id: string) => void;
  onAddToMyDay: (id: string) => void;
  onRemoveFromMyDay: (id: string) => void;
  onDelete: (id: string) => void;
  showMyDayButton?: boolean;
}

export default function TaskItem({
  task,
  onToggleComplete,
  onToggleImportant,
  onAddToMyDay,
  onRemoveFromMyDay,
  onDelete,
  showMyDayButton = true,
}: TaskItemProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggleComplete(task.id)}
        className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3
              className={`text-sm font-medium ${
                task.isCompleted ? 'line-through text-gray-400' : 'text-gray-900'
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-gray-500 mt-1">{task.description}</p>
            )}
            {task.dueAt && (
              <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                📅 {formatDate(task.dueAt)}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleImportant(task.id)}
              className={`text-xl hover:scale-110 transition-transform ${
                task.isImportant ? 'text-yellow-500' : 'text-gray-300'
              }`}
              title={task.isImportant ? 'Remove from Important' : 'Mark as Important'}
            >
              ⭐
            </button>
            
            {showMyDayButton && (
              <button
                onClick={() =>
                  task.myDayDate ? onRemoveFromMyDay(task.id) : onAddToMyDay(task.id)
                }
                className={`text-sm px-2 py-1 rounded transition-colors ${
                  task.myDayDate
                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={task.myDayDate ? 'Remove from My Day' : 'Add to My Day'}
              >
                {task.myDayDate ? '☀️ My Day' : '+ My Day'}
              </button>
            )}
            
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
              title="Delete task"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
