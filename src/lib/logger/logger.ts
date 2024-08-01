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
            auth: 'magenta',
        },
    },
    enabledContexts: ['api', 'auth'],
});

export default log;
