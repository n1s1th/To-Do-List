
import { User } from '@/lib/types';

type HeaderProps = {
  user: User;
};

export default function Header({ user }: HeaderProps) {
  return (
    <header className="bg-white border-b p-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold">My Tasks</h1>
      <div className="flex items-center gap-3">
        <span className="text-gray-700">{user.displayName || user.email}</span>
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          {user.displayName?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}