
import { List, User } from '@/lib/types';

type SidebarProps = {
  activeView: 'myday' | 'tasks' | 'list';
  activeListId: string | null;
  lists: List[];
  onNavigate: (view: 'myday' | 'tasks' | 'list', listId?: string | null) => void;
  onLogout: () => void;
  user: User;
};

export default function Sidebar({
  activeView,
  activeListId,
  lists,
  onNavigate,
  onLogout,
  user,
}: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg">{user.displayName || 'My Tasks'}</h2>
      </div>

      <nav className="flex-1 py-2">
        <button
          onClick={() => onNavigate('myday')}
          className={`w-full text-left px-6 py-3 flex items-center gap-3 ${
            activeView === 'myday' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span>☀️</span> My Day
        </button>

        <button
          onClick={() => onNavigate('tasks')}
          className={`w-full text-left px-6 py-3 flex items-center gap-3 ${
            activeView === 'tasks' && !activeListId
              ? 'bg-blue-50 text-blue-700 font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span>✅</span> Tasks
        </button>

        <div className="mt-4 px-4 text-xs text-gray-500 uppercase tracking-wider">Lists</div>
        {lists.map(list => (
          <button
            key={list.id}
            onClick={() => onNavigate('list', list.id)}
            className={`w-full text-left px-6 py-2 flex items-center gap-3 ${
              activeView === 'list' && activeListId === list.id
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>📁</span> {list.name}
          </button>
        ))}

        <button
          onClick={() => onNavigate('tasks')}
          className="w-full text-left px-6 py-2 text-gray-500 hover:text-gray-700 flex items-center gap-3"
        >
          <span>➕</span> New list...
        </button>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={onLogout}
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          <span>🚪</span> Sign out
        </button>
      </div>
    </div>
  );
}