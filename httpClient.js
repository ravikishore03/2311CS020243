import axios from 'axios';

const BASE_URL = 'http://4.224.186.213/evaluation-service';

const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Simple logger — swap console for a real logging service later
const logger = {
  info: (...args) => console.log('[INFO]', new Date().toISOString(), ...args),
  warn: (...args) => console.warn('[WARN]', new Date().toISOString(), ...args),
  error: (...args) => console.error('[ERROR]', new Date().toISOString(), ...args),
};

// REQUEST middleware
httpClient.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: performance.now() };
    logger.info(`→ ${config.method?.toUpperCase()} ${config.url}`, {
      params: config.params,
    });
    return config;
  },
  (error) => {
    logger.error('Request setup failed', error);
    return Promise.reject(error);
  }
);

// RESPONSE middleware
httpClient.interceptors.response.use(
  (response) => {
    const duration = performance.now() - response.config.metadata.startTime;
    logger.info(
      `← ${response.status} ${response.config.url} (${duration.toFixed(0)}ms)`
    );
    return response;
  },
  (error) => {
    const cfg = error.config || {};
    const duration = cfg.metadata
      ? performance.now() - cfg.metadata.startTime
      : 'n/a';
    logger.error(
      `✗ ${cfg.url} failed (${duration}ms)`,
      error.response?.status,
      error.message
    );
    return Promise.reject(error);
  }
);

export { logger };
export default httpClient;