import createLogger from './index';
import consoleTransport from './transports/consoleTransport';

const log = createLogger({
    levels: {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3,
        custom: 4,
    },
    severity: 'debug',
    transport: [consoleTransport],
    transportOptions: {
        colors: {
            info: 'blueBright',
            warn: 'yellowBright',
            error: 'redBright',
        },
        contextColors: {
            api: 'grey',
            db: 'magenta',
        },
    },
    enabledContexts: ['api', 'db'],
});

export default log;

// create any logger instance
const apiLogger = log.extend('api');
const dbLogger = log.extend('db');

export { log, apiLogger, dbLogger };
