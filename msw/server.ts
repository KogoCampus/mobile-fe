import { setupServer } from 'msw/native';
// import handlers from './api/handlers';

import 'fast-text-encoding';
import 'react-native-url-polyfill/auto';

// const server = setupServer(...handlers);
const server = setupServer();

export default server;
