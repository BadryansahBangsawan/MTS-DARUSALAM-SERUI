import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: '../../apps/web/.env' });

const DATABASE_URL = process.env.DATABASE_URL || '';

const connection = await mysql.createConnection(DATABASE_URL);

// Drop all tables in reverse order of foreign key dependencies
const tables = [
  'sessions',
  'ekstrakurikuler',
  'features',
  'mata_pelajaran',
  'organization_positions',
  'testimonials',
  'users',
  'school_information'
];

for (const table of tables) {
  try {
    await connection.execute(`DROP TABLE IF EXISTS \`${table}\``);
    console.log(`Dropped table: ${table}`);
  } catch (error) {
    console.error(`Error dropping table ${table}:`, error);
  }
}

await connection.end();
console.log('All tables dropped successfully!');
process.exit(0);
