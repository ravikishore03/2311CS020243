import httpClient, { logger } from './httpClient';

export async function fetchNotifications({ page = 1, limit = 10, notification_type } = {}) {
  try {
    const params = { page, limit };
    if (notification_type) params.notification_type = notification_type;

    const { data } = await httpClient.get('/notifications', { params });
    return data;
  } catch (err) {
    logger.error('fetchNotifications failed', err);
    // Normalize error so the UI layer has one shape to handle
    throw new Error(
      err.response?.data?.message || 'Unable to fetch notifications. Please try again.'
    );
  }
}