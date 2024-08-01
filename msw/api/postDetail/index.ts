import { handlers as postDetailHandlers } from './post';
import { handlers as commentsHandlers } from './comments';

export const handlers = [...postDetailHandlers, ...commentsHandlers];
