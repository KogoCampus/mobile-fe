import { createLogger, LoggerConfig } from '@KogoCampus/logger';

const env = process.env.EXPO_PUBLIC_APP_ENTRY;

const config: LoggerConfig = {
    severity: env === 'production' ? 'info' : 'debug',
};

const logger = createLogger(config);

export default logger;
