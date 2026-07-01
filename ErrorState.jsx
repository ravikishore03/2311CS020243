import { Alert, Button, Stack } from '@mui/material';

export default function ErrorState({ message, onRetry }) {
  return (
    <Stack alignItems="flex-start" spacing={1}>
      <Alert severity="error">{message}</Alert>
      {onRetry && (
        <Button size="small" variant="outlined" onClick={onRetry}>
          Retry
        </Button>
      )}
    </Stack>
  );
}