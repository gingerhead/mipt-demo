import { PrismaClient, VisitStatus } from '@prisma/client';
import { fakerRU as faker } from '@faker-js/faker';

/**
 *  Important: do use deps with care
 *  inner deps will be stripped with next build
 *  outer deps should be installed in Docker in separate step
 */

export {};

const prisma = new PrismaClient();

async function main() {
  try {
    const patients = await Promise.all(
      Array.from({ length: 30 }).map(() => {
        return prisma.patient.create({
          data: {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            dateOfBirth: faker.date.birthdate({
              mode: 'age',
              min: 18,
              max: 65,
            }),
            phoneNumber: faker.phone.number({ style: 'international' }),
            email: Math.round(Math.random()) ? faker.internet.email() : null,
          },
        });
      }),
    );
    console.log(patients);

    const patientIds = patients.map((p) => p.id);

    const visits = await Promise.all(
      Array.from({ length: 50 }).map(() => {
        return prisma.visit.create({
          data: {
            visitDate: faker.date.between({
              from: '2025-01-01T00:00:00.000Z',
              to: '2026-01-01T00:00:00.000Z',
            }),
            status: Object.keys(VisitStatus)[
              Math.round(Math.random() * 2)
            ] as VisitStatus,
            diagnosis: faker.lorem.paragraph(2),
            treatment: faker.lorem.paragraph(2),
            notes: Math.round(Math.random()) ? faker.lorem.paragraph(2) : null,
            patientId: patientIds[Math.round(Math.random() * 29)],
          },
        });
      }),
    );

    console.log(visits);
  } catch (err) {
    console.log(err);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
