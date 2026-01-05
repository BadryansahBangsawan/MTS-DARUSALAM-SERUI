import { seedGuruDanStaf } from './src/seed-guru-dan-staf';

async function main() {
  await seedGuruDanStaf();
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
