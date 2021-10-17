import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    id: 123456789,
    userName: 'Alice',
    userFullName: 'Alice Pereira',
    signName: 'gêmeos',
    birthdate: '2001-10-09',
    signSymbol: '♊',
  },
  {
    id: 234567890,
    userName: 'Nilu',
    userFullName: 'Nilu Gomes',
    signName: 'touro',
    birthdate: '1998-02-17',
    signSymbol: '♉',
  },
  {
    id: 345678901,
    userName: 'Lenê',
    userFullName: 'Lenê Arruda',
    signName: 'peixes',
    birthdate: '1995-11-11',
    signSymbol: '♓',
  },
];

async function main() {
  console.log(`Start seeding ...`);
  userData.forEach(async (u) => {
    const user = await prisma.user.create({
      data: u,
    });

    console.log(`Created user with id: ${user.id}`);
  });

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
