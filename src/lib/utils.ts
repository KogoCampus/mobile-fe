import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import createLogger from './logger/index';
import consoleTransport from './logger/transports/consoleTransport';

/**
 * Logger
 */
const logger = createLogger({
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

/**
 * Tailwind Merge
 */
function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

export { logger as log, cn };
