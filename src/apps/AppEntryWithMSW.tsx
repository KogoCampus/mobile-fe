import { log } from '@lib/utils';
import AppEntry from './AppEntry';
import server from '../../msw/server';

log.info('Initializing MSW');
server.listen({
    onUnhandledRequest: ({ method, url }) => {
        log.error(`Unhandled ${method} request to ${url}.`);
    },
});

export default AppEntry;
