import {
  PrismaClient,
  Prisma,
  User,
  Performance,
  Artist,
  Category,
  ReservationTime,
  Story,
  StoryType,
  UsersBoughtPerformances,
  UsersCheeredPerformances,
} from '@prisma/client';

const prisma = new PrismaClient();

const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);
const getRandomDate = (min: number, max: number): Date => {
  const year = getRandomInt(min, max);
  const month = getRandomInt(1, 12);
  const date = getRandomInt(1, 28);
  return new Date(`${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`);
};

const userData: Prisma.UserCreateInput[] = Array(10)
  .fill({})
  .map((_: User, index: number) => ({
    id: index.toString(),
    email: `dummy${index}@prisma.id`,
    nickname: `dummy${index}`,
  }));

const artistData: Prisma.ArtistCreateInput[] = Array(10)
  .fill({})
  .map((_: Artist, index: number) => ({
    id: index.toString(),
    name: `dummyArtist${index}`,
    agency: `dummyAgency${index}`,
    profileUrl: `dsafafdasdfaf`,
    description: `hihihi`,
  }));

const performanceData = Array(20)
  .fill({})
  .map((_: Performance, index: number) => ({
    id: index.toString(),
    title: `title${index}`,
    description: `description${index}`,
    place: `place${index}`,
    runningTime: getRandomInt(100, 200),
    showTime: `showTime${index}`,
    posterUrl: `posterUrl${index}`,
    category: Object.keys(Category)[getRandomInt(0, 3)] as Category,
    cheerCount: getRandomInt(0, 999),
    price: getRandomInt(0, 999) * 100,
    totalTicketCount: getRandomInt(50, 100),
    toEndAt: getRandomDate(2022, 2022),
    artistId: getRandomInt(0, artistData.length - 1).toString(),
  }));

const reservationTimeData = Array(50)
  .fill({})
  .map((_: ReservationTime, index: number) => ({
    id: index.toString(),
    toReserveAt: getRandomDate(2022, 2022),
    totalTicketCount: getRandomInt(10, 20),
    performanceId: getRandomInt(0, performanceData.length - 1).toString(),
  }));

const storyData = Array(200)
  .fill({})
  .map((_: Story, index: number) => ({
    id: index.toString(),
    backgroundUrl: `backgroundUrl${index}`,
    description: `description${index}`,
    cheerCount: getRandomInt(0, 50),
    type: Object.keys(StoryType)[getRandomInt(0, 1)] as StoryType,
    performanceId: getRandomInt(0, performanceData.length - 1).toString(),
  }));

const UsersBoughtPerformancesData = Array(10)
  .fill({})
  .map((_: UsersBoughtPerformances, index: number) => {
    const reservationTimeId = getRandomInt(0, reservationTimeData.length - 1).toString();
    return {
      id: index.toString(),
      ticketCount: getRandomInt(1, 5),
      donation: getRandomInt(1, 100) * 1000,
      bank: 'bank',
      paymentKey: 'paymentKey',
      orderId: 'orderId',
      receiptUrl: 'receipt',
      amount: getRandomInt(1, 100) * 1000,
      userId: getRandomInt(0, userData.length - 1).toString(),
      reservationTimeId,
      performanceId: reservationTimeData[+reservationTimeId].performanceId,
    };
  });

const userCheeredPerformancesData = Array(10)
  .fill({})
  .map((_: UsersCheeredPerformances, index: number) => {
    const storyId = getRandomInt(0, storyData.length - 1).toString();

    return {
      id: index.toString(),
      userId: getRandomInt(0, userData.length - 1).toString(),
      storyId,
      performanceId: storyData[+storyId].performanceId,
    };
  });

async function main(): Promise<void> {
  console.log('Start seeding ...');
  await Promise.all(userData.map(async (elem: Prisma.UserCreateInput) => prisma.user.create({ data: elem })));
  await Promise.all(artistData.map(async (elem: Prisma.ArtistCreateInput) => prisma.artist.create({ data: elem })));
  await Promise.all(performanceData.map(async (elem) => prisma.performance.create({ data: elem })));
  await Promise.all(reservationTimeData.map(async (elem) => prisma.reservationTime.create({ data: elem })));
  await Promise.all(storyData.map(async (elem) => prisma.story.create({ data: elem })));
  await Promise.all(UsersBoughtPerformancesData.map(async (elem) => prisma.usersBoughtPerformances.create({ data: elem })));
  await Promise.all(userCheeredPerformancesData.map(async (elem) => prisma.usersCheeredPerformances.create({ data: elem })));
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
