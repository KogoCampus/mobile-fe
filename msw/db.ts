import { factory, primaryKey, manyOf, oneOf } from '@mswjs/data';
import { faker } from '@faker-js/faker';

export const db = factory({
  attachment: {
    attachmentId: primaryKey(faker.string.uuid),
    fileName: () => faker.system.fileName(),
    size: () => faker.number.int(),
    contentType: () => faker.system.mimeType(),
    url: () => faker.image.url(),
  },
  comment: {
    id: primaryKey(faker.string.uuid),
    authorId: () => faker.string.uuid(),
    content: () => faker.lorem.sentence(),
    replyCount: () => faker.number.int(10),
    postId: () => faker.string.uuid(),
    parentId: () => '',
    likes: () => faker.number.int(10),
    createdAt: () => faker.date.past().toISOString(),
  },
  profileImage: {
    attachmentId: primaryKey(faker.string.uuid),
    fileName: () => faker.system.fileName(),
    size: () => faker.number.int(),
    contentType: () => faker.system.mimeType(),
    url: () => faker.image.url(),
  },
  post: {
    id: primaryKey(faker.string.uuid),
    authorUserId: () => faker.string.uuid(),
    topicId: () => '999',
    title: () => faker.lorem.sentence(),
    content: () => faker.lorem.paragraph(),
    viewcount: () => faker.number.int(100),
    likes: () => faker.number.int(100),
    viewed: () => faker.datatype.boolean(),
    liked: () => faker.datatype.boolean(),
    attachments: manyOf('attachment'),
    comments: manyOf('comment'),
  },
  group: {
    id: primaryKey(faker.string.uuid),
    ownerUserId: () => faker.string.uuid(),
    topicName: () => faker.company.name(),
    description: () => faker.lorem.sentence(),
    tags: () => [faker.lorem.word(), faker.lorem.word()],
    profileImage: oneOf('profileImage'),
    userCount: () => faker.number.int({ min: 10, max: 1000 }),
  },
});

export const seedDb = () => {
  //Group ID '999'
  const group = db.group.create({
    id: '999',
    ownerUserId: faker.string.uuid(),
    topicName: faker.company.name(),
    description: faker.lorem.sentence(),
    tags: [faker.lorem.word(), faker.lorem.word()],
    userCount: faker.number.int({ min: 10, max: 1000 }),
    profileImage: db.profileImage.create(),
  });

  //Groups
  for (let i = 0; i < 5; i++) {
    db.group.create({
      ownerUserId: faker.string.uuid(),
      topicName: faker.company.name(),
      description: faker.lorem.sentence(),
      tags: [faker.lorem.word(), faker.lorem.word()],
      userCount: faker.number.int({ min: 10, max: 1000 }),
      profileImage: db.profileImage.create(),
    });
  }

  const attachments = Array.from({ length: 2 }).map(() =>
    db.attachment.create()
  );

  //Post
  for (let i = 0; i < 10; i++) {
    const post = db.post.create({
      topicId: '999', 
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      viewcount: faker.number.int(100),
      likes: faker.number.int(100),
      viewed: faker.datatype.boolean(),
      liked: faker.datatype.boolean(),
      attachments,
      authorUserId: faker.string.uuid(),
    });

    //Comments
    for (let j = 0; j < 5; j++) {
      db.comment.create({
        postId: post.id,
        content: faker.lorem.sentence(),
        replyCount: faker.number.int(5),
        likes: faker.number.int(10),
        parentId: '', // Top-level comment
        createdAt: faker.date.past().toISOString(),
        authorId: faker.string.uuid(),
      });
    }

    //Parent Comment
    const parentComment = db.comment.create({
      postId: post.id,
      content: faker.lorem.sentence(),
      replyCount: 3,
      likes: faker.number.int(10),
      parentId: '', // Top-level comment
      createdAt: faker.date.past().toISOString(),
      authorId: faker.string.uuid(),
    });

    //Replies
    for (let k = 0; k < 3; k++) {
      db.comment.create({
        postId: post.id,
        content: faker.lorem.sentence(),
        replyCount: 0,
        likes: faker.number.int(10),
        parentId: parentComment.id, 
        createdAt: faker.date.past().toISOString(),
        authorId: faker.string.uuid(),
      });
    }
  }

  //Trending
  for (let i = 0; i < 5; i++) {
    db.post.create({
      topicId: '999',
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      viewcount: faker.number.int(100),
      likes: faker.number.int({ min: 50, max: 200 }),
      viewed: faker.datatype.boolean(),
      liked: faker.datatype.boolean(),
      attachments,
      authorUserId: faker.string.uuid(),
    });
  }
};
