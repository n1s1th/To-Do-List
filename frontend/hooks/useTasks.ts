// /hooks/useTasks.ts

import { useState, useEffect } from 'react';
import { Task, TaskQueryParams } from '@/lib/types';
import { api } from '@/lib/api';

export function useTasks(params: TaskQueryParams = {}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.tasks.getAll(params);
      setTasks(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [JSON.stringify(params)]); // safe for simple objects

  return { tasks, loading, error, refetch };
}