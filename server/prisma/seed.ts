import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'alice@prisma.io',
    nickname: 'Alice',
    phone: '010-1234-1234',
  },
  {
    email: 'nilu@prisma.io',
    nickname: 'Nilu',
    phone: '010-1234-1234',
  },
  {
    email: 'mahmoud@prisma.io',
    nickname: 'Mahmoud',
    phone: '010-1234-1234',
    // posts: {
    //   create: [
    //     {
    //       title: 'Ask a question about Prisma on GitHub',
    //       content: 'https://www.github.com/prisma/prisma/discussions',
    //       published: true,
    //       viewCount: 128,
    //     },
    //     {
    //       title: 'Prisma on YouTube',
    //       content: 'https://pris.ly/youtube',
    //     },
    //   ],
    // },
  },
];

async function main(): Promise<void> {
  console.log('Start seeding ...');
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log('Seeding finished.');
}

main()
  .catch((e: any) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
