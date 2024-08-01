import { handlers as loginHandlers } from './auth/login';
import { handlers as signUpHandlers } from './auth/signup';
import { handlers as schoolsHandlers } from './school';
import { handlers as postHandlers } from './post';
import { handlers as groupHandlers } from './group';
import { handlers as userHandlers } from './user';
import { handlers as scheduleHandlers } from './schedule';
import { handlers as trendingHandlers } from './trending';
import { handlers as friendsHandlers } from './friends';
import { handlers as postDetailHandlers } from './postDetail';

export default [
    ...loginHandlers,
    ...signUpHandlers,
    ...schoolsHandlers,
    ...postHandlers,
    ...groupHandlers,
    ...userHandlers,
    ...scheduleHandlers,
    ...trendingHandlers,
    ...friendsHandlers,
    ...postDetailHandlers,
];
