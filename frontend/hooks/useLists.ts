// /hooks/useLists.ts

import { useState, useEffect } from 'react';
import { List } from '@/lib/types';
import { api } from '@/lib/api';

export function useLists() {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.lists.getAll();
      setLists(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { lists, loading, error, refetch };
}