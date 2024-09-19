import { rest } from 'msw';
import { db } from './db';

export const handlers = [
  // GET posts by group
  rest.get('http://localhost:3000/kogo/media/groups/:groupId/posts', (req, res, ctx) => {
    const groupId = '999'

    const posts = db.post.findMany({
      where: {
        topicId: {
          equals: groupId,
        },
      },
    });

    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        data: posts,
        message: 'Posts fetched successfully',
      })
    );
  }),

  // GET following group
  rest.get('http://localhost:3000/kogo/me/following', (req, res, ctx) => {
    const groups = db.group.getAll(); 

    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        data: groups,
        message: 'Groups fetched successfully',
      })
    );
  }),
  rest.get('http://localhost:3000/kogo/media/me/ownership/posts', (req, res, ctx) => {
    const myposts = db.post.getAll(); 

    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        data: myposts,
        message: 'Groups fetched successfully',
      })
    );
  }),

  // GET trending posts
  rest.get('http://localhost:3000/kogo/media/feeds/trending', (req, res, ctx) => {
    const trendingPosts = db.post.findMany({
      where: {
        likes: {
          gte: 50, 
        },
      },
      orderBy: {
        likes: 'desc',
      },
    });

    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        data: trendingPosts,
        message: 'Trending posts fetched successfully',
      })
    );
  }),
 

  // GET group by its ID
  rest.get('http://localhost/kogo/media/groups/:groupId', (req, res, ctx) => {
    const groupId ='999'

    const group = db.group.findFirst({
      where: {
        id: {
          equals: groupId,
        },
      },
    });

    if (!group) {
      return res(
        ctx.status(404),
        ctx.json({
          status: 404,
          message: `Group with id ${groupId} not found`,
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        data: group,
        message: 'Group fetched successfully',
      })
    );
  }),
];
