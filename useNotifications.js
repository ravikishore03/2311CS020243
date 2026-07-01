import { useEffect, useState, useCallback } from 'react';
import { fetchNotifications } from '../api/notificationService';

export function useNotifications({ limit = 10, priorityOnly = false } = {}) {
  const [page, setPage] = useState(1);
  const [type, setType] = useState('');
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNotifications({
        page,
        limit,
        notification_type: type || undefined,
      });
      let list = data.notifications || data.items || data.data || [];
      if (priorityOnly) list = list.filter((n) => n.priority === true || n.isPriority);
      setItems(list);
      setTotal(data.total ?? list.length);
    } catch (err) {
      setError(err.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, type, priorityOnly]);

  useEffect(() => {
    load();
  }, [load]);

  return { items, total, page, setPage, type, setType, loading, error, reload: load };
}