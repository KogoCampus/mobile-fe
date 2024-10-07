import axios from 'axios';
import AppEntry from './AppEntry';

const baseURL = 'https://api.staging.kogocampus.com';
axios.defaults.baseURL = baseURL;

export default AppEntry;
