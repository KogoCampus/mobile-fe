import { handlers as myGroupHandlers } from './mygroup';
import { handlers as groupSearchHandlers } from './groupsearch';
import { handlers as myGroupPostsHandlers } from './mygrouppost';

export const handlers = [...myGroupHandlers, ...groupSearchHandlers, ...myGroupPostsHandlers];
