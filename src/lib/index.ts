import { Level, LogLevelConfig, LogTransport, LoggerConfig } from './loggerTypes';
import consoleTransport from './transports/consoleTransport';

const defaultConfig: LoggerConfig = {
    levels: {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3,
    },
    severity: 'debug',
    transport: consoleTransport,
};

const asyncFunc = (cb: Function) => setTimeout(cb, 0);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stringifyFunc = (msg: any): string => {
    if (typeof msg === 'string') return msg;
    if (typeof msg === 'function') return `[function ${msg.name}]`;
    if (msg?.stack && msg?.message) return msg.message;
    try {
        return JSON.stringify(msg, null, 1);
    } catch {
        return 'Undefined Message';
    }
};

class Logger {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;

    private levels: LogLevelConfig;

    private severity: number;

    private transport: LogTransport | LogTransport[] | undefined;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private transportOptions: any;

    private async: boolean;

    private asyncFunc: Function;

    private enabledContexts: string[] = [];

    private context: string | null;

    private event: string | null;

    constructor(config: LoggerConfig, context: string | null = null, event: string | null = null) {
        this.levels = config.levels ?? defaultConfig.levels!;
        this.severity = this.levels[config.severity ?? 'debug'];
        if (!config.transport) {
            throw Error('transport is required.');
        }
        this.transport = config.transport;
        this.transportOptions = config.transportOptions;
        this.async = config.async ?? false;
        this.asyncFunc = config.asyncFunc ?? asyncFunc;
        this.enabledContexts = config.enabledContexts ?? [];
        this.context = context;
        this.event = event;

        this.setupMethods();
    }

    private setupMethods() {
        Object.keys(this.levels).forEach(level => {
            this[level] = this.log.bind(this, level);
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private log(level: Level, ...messages: any[]) {
        if (this.levels[level] < this.levels[this.severity]) return;

        const date = new Date();
        const formattedMessage = messages.map(stringifyFunc).join(' ');
        const message = formattedMessage;
        const options = this.transportOptions;

        if (typeof this.transport === 'function') {
            this.transport({ level, message, date, options, context: this.context });
        } else if (Array.isArray(this.transport)) {
            this.transport.forEach(t => t({ level, message, date, options, context: this.context }));
        }
    }

    public extend(context: string, event: string | null = null): Logger {
        if (!context) {
            throw new Error('Context is required.');
        }

        if (!this.enabledContexts || !this.enabledContexts.includes(context)) {
            throw new Error(`Context ${context} is not enabled.`);
        }

        return new Logger(
            {
                levels: this.levels,
                severity: Object.keys(this.levels).find(key => this.levels[key] === this.severity) as Level,
                transport: this.transport,
                transportOptions: this.transportOptions,
                async: this.async,
                asyncFunc: this.asyncFunc,
                enabledContexts: this.enabledContexts,
            },
            context,
            event,
        );
    }
}

const createLogger = (config: LoggerConfig): Logger => new Logger(config);

export default createLogger;
