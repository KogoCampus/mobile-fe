import { rest } from 'msw';
import { mswApiUrl } from '../../utils';
import springCourses from './spring.json';
import summerCourses from './summer.json';

export const handlers = [
    rest.get(mswApiUrl('/api/schedule'), async (req, res, ctx) => {
        const semester = req.url.searchParams.get('semester');
        if (semester === 'summer_2024') {
            return res(ctx.status(200), ctx.json(summerCourses));
        }
        return res(ctx.status(200), ctx.json(springCourses));
    }),
];
