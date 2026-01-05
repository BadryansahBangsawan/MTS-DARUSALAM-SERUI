import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { sql } from "drizzle-orm";

const envPath = new URL("../../apps/web/.env", import.meta.url);
dotenv.config({ path: envPath.pathname });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DATABASE_URL tidak ditemukan di environment variables");
  process.exit(1);
}

const connection = mysql.createPool(connectionString);
const db = drizzle(connection);

async function listTables() {
  try {
    const tables = await db.execute(sql`SHOW TABLES`);
    console.log("📋 Tabel yang ada di database:");
    console.table(tables);
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

listTables()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
