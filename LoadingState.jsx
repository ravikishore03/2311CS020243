import { Skeleton, Stack } from '@mui/material';

export default function LoadingState({ count = 5 }) {
  return (
    <Stack spacing={1.5}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} variant="rounded" height={80} />
      ))}
    </Stack>
  );
}