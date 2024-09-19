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
    commentId: primaryKey(faker.string.uuid),
    authorId: () => faker.string.uuid(),
    replyCount: () => faker.number.int(10),
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
  
    const group = db.group.create({
      id: '999',
      ownerUserId: faker.string.uuid(),
      topicName: faker.company.name(),
      description: faker.lorem.sentence(),
      tags: [faker.lorem.word(), faker.lorem.word()],
      profileImage: db.profileImage.create(),
      userCount: faker.number.int({ min: 10, max: 1000 }),
    });
  
    for (let i = 0; i < 5; i++) {
      db.group.create({
        ownerUserId: faker.string.uuid(),
        topicName: faker.company.name(),
        description: faker.lorem.sentence(),
        tags: [faker.lorem.word(), faker.lorem.word()],
        profileImage: db.profileImage.create(),
        userCount: faker.number.int({ min: 10, max: 1000 }),
      });
    }
  
    const attachments = Array.from({ length: 2 }).map(() => db.attachment.create());
    const comments = Array.from({ length: 3 }).map(() => db.comment.create());
  
    for (let i = 0; i < 10; i++) {
      db.post.create({
        topicId: '999',  
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        viewcount: faker.number.int(100),
        likes: faker.number.int(100),
        viewed: faker.datatype.boolean(),
        liked: faker.datatype.boolean(),
        attachments,  
        comments,    
        authorUserId: faker.string.uuid(),
      });
    }
    for (let i = 0; i < 10; i++) {
        db.post.create({
          topicId: '999',
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraph(),
          viewcount: faker.number.int(100),
          likes: i < 5 ? faker.number.int(50) : faker.number.int({ min: 50, max: 200 }), 
          viewed: faker.datatype.boolean(),
          liked: faker.datatype.boolean(),
          attachments,
          comments,
          authorUserId: faker.string.uuid(),
        });
      }
  };
