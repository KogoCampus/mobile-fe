import { rest } from 'msw';
import schools from './schools.json';
import { mswApiUrl, sleep } from '../../utils';

export const handlers = [
    rest.get(mswApiUrl('/api/schools'), async (req, res, ctx) => {
        await sleep(200);
        return res(ctx.status(200), ctx.json(schools));
    }),
];
