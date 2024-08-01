import { rest } from 'msw';
import { mswApiUrl, sleep } from '../../../utils';
import PostDetail from './postDetail.json';

export const handlers = [
    rest.get(mswApiUrl('/api/posts/post'), async (req, res, ctx) => {
        await sleep(200);
        const postID = req.url.searchParams.get('filters[post]');
        if (postID) {
            return res(ctx.status(200), ctx.json(PostDetail));
        }
        return res(ctx.status(200), ctx.json(PostDetail));
    }),
];
