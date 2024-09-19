import { setupServer } from 'msw/native';
import { handlers } from './handlers';
import axios from 'axios';
import { Platform } from 'react-native';

import 'fast-text-encoding'; 
import 'react-native-url-polyfill/auto';  

const server = setupServer(...handlers);

const baseURL = Platform.OS === 'android' 
    ? 'http://10.0.2.2:3000' 
    : 'http://localhost:3000'; 

axios.defaults.baseURL = baseURL;

server.listen({
  onUnhandledRequest: 'warn',  
});


export default server;
