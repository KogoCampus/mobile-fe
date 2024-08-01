/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import { rest } from 'msw';
import { mswApiUrl, sleep } from '../../../utils';
import emailCodes from './email-code.json';
import errorResponse from './error.json';

export const handlers = [
    rest.post(mswApiUrl('/api/auth/local/register'), async (req, res, ctx) => {
        await sleep(200);
        const { username, password, email } = await req.json();
        return res(
            ctx.status(200),
            ctx.json({
                jwt: 'abcd1234',
                user: {
                    id: 1,
                    username,
                    email,
                    provider: 'local',
                    confirmed: false,
                    blocked: false,
                    createdAt: '2024-02-13T16:38:50.442Z',
                    updatedAt: '2024-02-13T16:38:50.442Z',
                },
                email_verification: {
                    message: `verification code is sent to ${email}`,
                    expiry: new Date(Date.now() + 5 * 60 * 1000).toString(),
                },
            }),
        );
    }),
    rest.post(mswApiUrl('/api/auth/local/email-verification'), async (req, res, ctx) => {
        await sleep(200);
        const { email, verification_code } = await req.json();
        const matchUser = emailCodes.filter(emailCode => emailCode.email === email);
        if (matchUser.length > 0 && matchUser[0].verification_code === verification_code) {
            return res(
                ctx.status(200),
                ctx.json({
                    jwt: 'abcd1234',
                    user: {
                        id: 1,
                        username: matchUser[0].username,
                        email,
                        provider: 'local',
                        confirmed: true,
                        blocked: false,
                        createdAt: '2024-02-13T16:38:50.442Z',
                        updatedAt: '2024-02-13T16:38:50.442Z',
                    },
                }),
            );
        }
        return res(ctx.status(400), ctx.json(errorResponse));
    }),
    rest.post(mswApiUrl('/api/auth/local/resend-email-verification'), async (req, res, ctx) => {
        await sleep(200);
        const { email } = await req.json();
        return res(
            ctx.status(200),
            ctx.json({
                message: `verification code is sent to ${email}`,
                expiry: new Date(Date.now() + 5 * 60 * 1000).toString(),
            }),
        );
    }),
];
