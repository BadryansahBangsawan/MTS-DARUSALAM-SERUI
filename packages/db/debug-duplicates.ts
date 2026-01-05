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

async function checkTestimonials() {
  try {
    console.log("📋 Data di tabel testimonials (10 rows):");
    const result = await db.execute(sql`SELECT id, author_name, role, content FROM testimonials LIMIT 10`);
    console.log("Result type:", typeof result);
    console.log("Result length:", Array.isArray(result) ? result.length : "not array");
    console.log("Result:", JSON.stringify(result, null, 2).substring(0, 1000));
    
    console.log("\n\n📋 Cari duplikat:");
    const dupResult = await db.execute(sql`
      SELECT author_name, content, COUNT(*) as count
      FROM testimonials
      GROUP BY author_name, content
      HAVING COUNT(*) > 1
    `);
    console.log("Duplicates result:", JSON.stringify(dupResult, null, 2).substring(0, 1000));
    
    // Coba pakai drizzle select langsung
    console.log("\n\n📋 Total rows in testimonials:");
    const [count] = await db.execute(sql`SELECT COUNT(*) as total FROM testimonials`);
    console.log("Count:", count);
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

checkTestimonials()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
