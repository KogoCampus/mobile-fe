import { registerRootComponent } from 'expo';
// eslint-disable-next-line import/no-unresolved
import AppEntry from '@kogo/AppEntry';
import 'fast-text-encoding';
import 'react-native-url-polyfill/auto';

import '../theme/tailwind.css';
import server from 'msw/server';

import { seedDb } from 'msw/db';

seedDb();

server.listen({
    onUnhandledRequest: 'bypass',
});

registerRootComponent(AppEntry);
