import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Xoá sạch dữ liệu cũ
  await prisma.notification.deleteMany();
  await prisma.vote.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.postHashtag.deleteMany();
  await prisma.hashtag.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Tạo user
  const user_admin_example = await prisma.user.create({
    data: {
      email: 'admin@tea.com',
      username: 'trgn312',
      password: '12345678',
      bio: 'I love coding!',
    },
  });

  const user_tester = await prisma.user.create({
    data: {
      email: 'test@tea.com',
      username: 'bob',
      password: '12345678',
      bio: 'Frontend engineer',
    },
  });

  // Tạo hashtag
  const hashtag = await prisma.hashtag.create({
    data: {
      name: 'nestjs',
    },
  });

  // Tạo post
  const post = await prisma.post.create({
    data: {
      title: 'NestJS with Prisma',
      content: 'This is a post about NestJS and Prisma integration.',
      authorId: user_admin_example.id,
      hashtags: {
        create: {
          hashtagId: hashtag.id,
        },
      },
    },
  });

  // Tạo comment
  const comment = await prisma.comment.create({
    data: {
      content: 'Great post!',
      postId: post.id,
      authorId: user_tester.id,
    },
  });

  // Tạo vote
  await prisma.vote.create({
    data: {
      value: 1,
      postId: post.id,
      userId: user_tester.id,
    },
  });

  // Tạo notification
  await prisma.notification.create({
    data: {
      type: 'comment',
      message: `${user_tester.username} commented on your post.`,
      userId: user_tester.id, // người thực hiện hành động
      recipientId: user_admin_example.id, // người nhận thông báo
    },
  });

  console.log('✅ Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
