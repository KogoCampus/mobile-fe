import { rest } from 'msw';
import { mswApiUrl, sleep } from '../../../utils';
import allGroupsData from './all_groups.json';
import filtertedGroupsData from './filtered_groups.json';

export const handlers = [
    // Get all groups
    rest.get(mswApiUrl('/api/groups?populate=icon'), async (req, res, ctx) => {
        await sleep(200);
        const userId = req.url.searchParams.get('filters[users]');
        if (userId) {
            return res(ctx.status(200), ctx.json(filtertedGroupsData));
        }
        return res(ctx.status(200), ctx.json(allGroupsData));
    }),
];
