'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Tasks', href: '/tasks', icon: '📝' },
  { name: 'My Day', href: '/my-day', icon: '☀️' },
  { name: 'Important', href: '/important', icon: '⭐' },
  { name: 'Planned', href: '/planned', icon: '📅' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-screen p-4">
      <h1 className="text-2xl font-bold mb-8 text-blue-600">Todo App</h1>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
