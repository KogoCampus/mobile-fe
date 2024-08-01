import { rest } from 'msw';
import { mswApiUrl, sleep } from '../../../utils';
import errorResponse from './error.json';
import users from './users.json';

export const handlers = [
    /**
     * Return a mock user data if the given identifier has a matching user email, regardless of the value of the password field
     * Return error response if there's none
     */
    rest.post(mswApiUrl('/api/auth/local'), async (req, res, ctx) => {
        await sleep(200);
        const { identifier } = await req.json();
        const matchUser = users.filter(userData => userData.user.email === identifier);
        if (matchUser.length > 0) {
            return res(ctx.status(200), ctx.json(matchUser[0]));
        }

        return res(ctx.status(400), ctx.json(errorResponse));
    }),
];
