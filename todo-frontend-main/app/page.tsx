
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import TaskView from '@/components/tasks/TaskView';
import MyDaySection from '@/components/myday/MyDaySection';
import ListSection from '@/components/lists/ListSection';
import { List, Task } from '@/lib/types';
import { api } from '@/lib/api';

export default function HomePage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [lists, setLists] = useState<List[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeView, setActiveView] = useState<'myday' | 'tasks' | 'list'>('myday');
  const [activeListId, setActiveListId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);
 
  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [listsData, tasksData] = await Promise.all([
          api.lists.getAll(),
          api.tasks.getAll(),
        ]);
        setLists(listsData);
        setTasks(tasksData);
      } catch (err) {
        console.error('Failed to load data', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const refetchTasks = async () => {
    let params: any = {};
    if (activeView === 'myday') {
      params.myDay = true;
    } else if (activeView === 'list' && activeListId) {
      params.listId = activeListId;
    }
    const updatedTasks = await api.tasks.getAll(params);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    if (user) refetchTasks();
  }, [activeView, activeListId, user]);

  if (authLoading || isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeView={activeView}
        activeListId={activeListId}
        lists={lists}
        onNavigate={(view, listId = null) => {
          setActiveView(view);
          setActiveListId(listId);
        }}
        onLogout={logout}
        user={user}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeView === 'myday' && (
            <MyDaySection tasks={tasks} onTaskUpdate={refetchTasks} />
          )}

          {activeView === 'tasks' && (
            <TaskView
              tasks={tasks}
              title="Tasks"
              onTaskUpdate={refetchTasks}
            />
          )}

          {activeView === 'list' && activeListId && (
            <ListSection
              list={lists.find(l => l.id === activeListId)!}
              tasks={tasks}
              onTaskUpdate={refetchTasks}
            />
          )}
        </main>
      </div>
    </div>
  );
}