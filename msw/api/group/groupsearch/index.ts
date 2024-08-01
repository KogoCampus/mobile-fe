import { rest } from 'msw';
import { mswApiUrl, sleep } from '../../../utils';
import groups from './groups.json';

export const handlers = [
    rest.get(mswApiUrl('/api/group'), async (req, res, ctx) => {
        await sleep(200);
        return res(ctx.json(groups));
    }),
];
