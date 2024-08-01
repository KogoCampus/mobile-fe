import { rest } from 'msw';
import { mswApiUrl } from '../../utils';
import trendingdata from './trending.json';

export const handlers = [
    rest.get(mswApiUrl('/api/posts/trending'), async (req, res, ctx) => {
        const userId = req.url.searchParams.get('filters[users]');
        if (userId) {
            return res(ctx.status(200), ctx.json(trendingdata));
        }
        return res(ctx.status(200), ctx.json(trendingdata));
    }),
];
