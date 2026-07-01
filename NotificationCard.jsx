import { Card, CardContent, Typography, Chip, Stack, Box } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const typeColors = {
  Event: 'info',
  Result: 'success',
  Placement: 'warning',
};

export default function NotificationCard({ notification, isNew, onView }) {
  return (
    <Card
      onClick={() => onView(notification.id)}
      sx={{
        mb: 1.5,
        cursor: 'pointer',
        borderLeft: isNew ? '4px solid #1976d2' : '4px solid transparent',
        backgroundColor: isNew ? 'rgba(25,118,210,0.05)' : 'background.paper',
        transition: 'background-color 0.2s',
      }}
    >
      <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="subtitle1" fontWeight={isNew ? 600 : 400}>
              {notification.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {notification.message || notification.description}
            </Typography>
          </Box>
          {isNew && <FiberManualRecordIcon color="primary" sx={{ fontSize: 12, mt: 0.5 }} />}
        </Stack>
        <Stack direction="row" spacing={1} mt={1}>
          <Chip
            size="small"
            label={notification.notification_type || notification.type}
            color={typeColors[notification.notification_type || notification.type] || 'default'}
          />
          <Typography variant="caption" color="text.secondary" alignSelf="center">
            {notification.created_at &&
              new Date(notification.created_at).toLocaleString()}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}