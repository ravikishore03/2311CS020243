import { useState } from 'react';
import { Container, Typography, Stack } from '@mui/material';
import { useNotifications } from '../hooks/useNotifications';
import { useReadStatus } from '../hooks/useReadStatus';
import NotificationCard from '../components/NotificationCard';
import FilterBar from '../components/FilterBar';
import TopNSelector from '../components/TopNSelector';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function PriorityNotificationsPage() {
  const [n, setN] = useState(5);
  const { items, type, setType, loading, error, reload } = useNotifications({
    limit: n,
    priorityOnly: true,
  });
  const { isViewed, markAsViewed } = useReadStatus();

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Priority Notifications
      </Typography>
      <Stack direction="row" spacing={2} mb={1}>
        <FilterBar type={type} onTypeChange={setType} />
        <TopNSelector n={n} onChange={setN} />
      </Stack>

      {loading && <LoadingState count={n} />}
      {error && <ErrorState message={error} onRetry={reload} />}
      {!loading && !error && items.length === 0 && (
        <Typography color="text.secondary">No priority notifications right now.</Typography>
      )}
      {!loading && !error && items.map((notif) => (
        <NotificationCard
          key={notif.id}
          notification={notif}
          isNew={!isViewed(notif.id)}
          onView={markAsViewed}
        />
      ))}
    </Container>
  );
}