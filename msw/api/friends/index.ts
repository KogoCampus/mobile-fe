import { rest } from 'msw';
import { mswApiUrl, sleep } from '../../utils';
import friends from './friends.json';

export const handlers = [
    rest.get(mswApiUrl('/api/friends'), async (req, res, ctx) => {
        await sleep(200);
        const userId = req.url.searchParams.get('filters[user]');
        if (userId) {
            return res(ctx.status(200), ctx.json(friends));
        }

        return res(ctx.status(404), ctx.json({ message: 'User ID not provided' }));
    }),
];
