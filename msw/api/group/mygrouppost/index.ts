import { rest } from 'msw';
import { mswApiUrl, sleep } from '../../../utils';
import grouppostdata from './groupposts.json';
import data from './data.json';

export const handlers = [
    rest.get(mswApiUrl('/api/posts/allPosts'), async (req, res, ctx) => {
        await sleep(200);
        return res(ctx.status(200), ctx.json(data));
    }),
];
