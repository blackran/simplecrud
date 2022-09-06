import { seedDefaultAdmin } from './seeds/defaultAdmin.seed';

async function main() {
  console.log('Start database seeding...');
  await seedDefaultAdmin();
}

main();
