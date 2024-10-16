import { seedDb } from 'msw/db';
import Log from '@lib/logger';
import AppEntry from './AppEntry';
import server from '../../msw/server';

seedDb();

Log.info('Initializing MSW');
server.listen({
    onUnhandledRequest: ({ method, url }) => {
        Log.error(`Unhandled ${method} request to ${url}.`);
    },
});

export default AppEntry;
