import { rest } from 'msw';
import { mswApiUrl, sleep } from '../../utils';
import errorResponse from './error.json';
import groups from './groups.json';

export const handlers = [
    /**
     * Return a group feed data based on the group name
     * Return error response if there's no post with that group name
     */
    rest.get(mswApiUrl('/api/posts?populate=group'), async (req, res, ctx) => {
        await sleep(200);
        const groupName = req.url.searchParams.get('groupName');

        const matchingPosts = groups.data.filter(post => post.attributes.group.data.attributes.name === groupName);

        if (matchingPosts.length > 0) {
            return res(ctx.status(200), ctx.json({ data: matchingPosts }));
        }
        return res(ctx.status(404), ctx.json(errorResponse));
    }),
];
