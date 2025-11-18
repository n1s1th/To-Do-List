// /app/layout.tsx

import { AuthProvider } from '@/components/providers/AuthProvider'; // ✅ .tsx now
import './globals.css';

export const metadata = {
  title: 'My Tasks',
  description: 'A Microsoft To Do inspired task manager',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}