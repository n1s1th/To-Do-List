import { User } from '@/lib/types';

interface HeaderProps {
  user: User | null;
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">My Day</h1>
        {user && (
          <div className="text-sm text-gray-600">
            Welcome, {user.displayName || user.email}
          </div>
        )}
      </div>
    </header>
  );
}
