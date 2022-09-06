import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const defaultAdmin = [
  {
    user_lastname: 'Admin',
    user_email: 'admin@admin.com',
    user_password: 'password',
    user_actived: 1,
  },
];

export const seedDefaultAdmin = async () => {
  const prisma = new PrismaClient();
  await Promise.all(
    defaultAdmin.map(async (item) => {
      const user = await prisma.user.findFirst({
        where: {
          user_email: item.user_email,
        },
      });
      if (user) {
        console.info(
          `User ${user.user_email} alredy exist with id ${user.user_id}`,
        );
        return;
      }
      try {
        console.info(`Creating user with email ${item.user_email}...`);
        const hasedPassword = await bcrypt.hash(
          item.user_password,
          await bcrypt.genSalt(10),
        );
        const createdUser = await prisma.user.create({
          data: {
            ...item,
            user_password: hasedPassword,
          },
        });
        if (createdUser) {
          console.info(
            `User with email ${createdUser.user_email} created... ok`,
          );
        }
      } catch (error) {
        console.log(error);
      }
    }),
  );
  return true;
};
