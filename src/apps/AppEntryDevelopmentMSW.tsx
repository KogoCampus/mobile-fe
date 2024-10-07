import Log from '@lib/logger';
import AppEntry from './AppEntry';
import server from '../../msw/server';

Log.info('Initializing MSW');
server.listen({
    onUnhandledRequest: ({ method, url }) => {
        Log.error(`Unhandled ${method} request to ${url}.`);
    },
});

export default AppEntry;
