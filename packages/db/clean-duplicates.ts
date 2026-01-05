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

async function findAndRemoveDuplicates() {
  console.log("🔍 Mencari data double di database...\n");

  try {
    // Cek duplikat di testimonials berdasarkan authorName dan content
    console.log("--- testimonials ---");
    const duplicateTestimonials = await db.execute(sql`
      SELECT author_name, content, COUNT(*) as count
      FROM testimonials
      GROUP BY author_name, content
      HAVING COUNT(*) > 1
    `);
    
    if (duplicateTestimonials.length > 0) {
      console.log("Data double ditemukan:");
      console.table(duplicateTestimonials);
      
      for (const dup of duplicateTestimonials) {
        const row = dup as any;
        const author_name = row.author_name || null;
        const content = row.content || null;
        
        const toDelete = await db.execute(sql`
          SELECT id
          FROM testimonials
          WHERE author_name = ${author_name} AND content = ${content}
          ORDER BY id DESC
          LIMIT 1 OFFSET 0
        `);
        
        const keepId = (toDelete[0] as any).id;
        
        const result = await db.execute(sql`
          DELETE FROM testimonials
          WHERE author_name = ${author_name} AND content = ${content} AND id != ${keepId}
        `);
        
        console.log(`✓ Dihapus ${result.length} duplikat untuk "${author_name || '(no author)'}"`);
      }
    } else {
      console.log("✓ Tidak ada data double");
    }

    // Cek duplikat di blogNews berdasarkan title
    console.log("\n--- blog_news ---");
    const duplicateBlog = await db.execute(sql`
      SELECT title, slug, COUNT(*) as count
      FROM blog_news
      GROUP BY title, slug
      HAVING COUNT(*) > 1
    `);
    
    if (duplicateBlog.length > 0) {
      console.log("Data double ditemukan:");
      console.table(duplicateBlog);
      
      for (const dup of duplicateBlog) {
        const row = dup as any;
        const title = row.title || null;
        const slug = row.slug || null;
        
        const toDelete = await db.execute(sql`
          SELECT id
          FROM blog_news
          WHERE title = ${title} AND slug = ${slug}
          ORDER BY id DESC
          LIMIT 1 OFFSET 0
        `);
        
        const keepId = (toDelete[0] as any).id;
        
        const result = await db.execute(sql`
          DELETE FROM blog_news
          WHERE title = ${title} AND slug = ${slug} AND id != ${keepId}
        `);
        
        console.log(`✓ Dihapus ${result.length} duplikat untuk "${title || '(no title)'}"`);
      }
    } else {
      console.log("✓ Tidak ada data double");
    }

    // Cek duplikat di features berdasarkan title
    console.log("\n--- features ---");
    const duplicateFeatures = await db.execute(sql`
      SELECT title, COUNT(*) as count
      FROM features
      GROUP BY title
      HAVING COUNT(*) > 1
    `);
    
    if (duplicateFeatures.length > 0) {
      console.log("Data double ditemukan:");
      console.table(duplicateFeatures);
      
      for (const dup of duplicateFeatures) {
        const { title } = dup as any;
        const toDelete = await db.execute(sql`
          SELECT id
          FROM features
          WHERE title = ${title}
          ORDER BY id DESC
          LIMIT 1 OFFSET 0
        `);
        
        const keepId = (toDelete[0] as any).id;
        
        const result = await db.execute(sql`
          DELETE FROM features
          WHERE title = ${title} AND id != ${keepId}
        `);
        
        console.log(`✓ Dihapus ${result.length} duplikat untuk "${title}"`);
      }
    } else {
      console.log("✓ Tidak ada data double");
    }

    // Cek duplikat di ekstrakurikuler berdasarkan name
    console.log("\n--- ekstrakurikuler ---");
    const duplicateEkstra = await db.execute(sql`
      SELECT name, COUNT(*) as count
      FROM ekstrakurikuler
      GROUP BY name
      HAVING COUNT(*) > 1
    `);
    
    if (duplicateEkstra.length > 0) {
      console.log("Data double ditemukan:");
      console.table(duplicateEkstra);
      
      for (const dup of duplicateEkstra) {
        const { name } = dup as any;
        const toDelete = await db.execute(sql`
          SELECT id
          FROM ekstrakurikuler
          WHERE name = ${name}
          ORDER BY id DESC
          LIMIT 1 OFFSET 0
        `);
        
        const keepId = (toDelete[0] as any).id;
        
        const result = await db.execute(sql`
          DELETE FROM ekstrakurikuler
          WHERE name = ${name} AND id != ${keepId}
        `);
        
        console.log(`✓ Dihapus ${result.length} duplikat untuk "${name}"`);
      }
    } else {
      console.log("✓ Tidak ada data double");
    }

    // Cek duplikat di organizationPositions berdasarkan title
    console.log("\n--- organization_positions ---");
    const duplicatePositions = await db.execute(sql`
      SELECT title, COUNT(*) as count
      FROM organization_positions
      GROUP BY title
      HAVING COUNT(*) > 1
    `);
    
    if (duplicatePositions.length > 0) {
      console.log("Data double ditemukan:");
      console.table(duplicatePositions);
      
      for (const dup of duplicatePositions) {
        const { title } = dup as any;
        const toDelete = await db.execute(sql`
          SELECT id
          FROM organization_positions
          WHERE title = ${title}
          ORDER BY id DESC
          LIMIT 1 OFFSET 0
        `);
        
        const keepId = (toDelete[0] as any).id;
        
        const result = await db.execute(sql`
          DELETE FROM organization_positions
          WHERE title = ${title} AND id != ${keepId}
        `);
        
        console.log(`✓ Dihapus ${result.length} duplikat untuk "${title}"`);
      }
    } else {
      console.log("✓ Tidak ada data double");
    }

    // Cek duplikat di mataPelajaran berdasarkan name
    console.log("\n--- mata_pelajaran ---");
    const duplicatePelajaran = await db.execute(sql`
      SELECT name, COUNT(*) as count
      FROM mata_pelajaran
      GROUP BY name
      HAVING COUNT(*) > 1
    `);
    
    if (duplicatePelajaran.length > 0) {
      console.log("Data double ditemukan:");
      console.table(duplicatePelajaran);
      
      for (const dup of duplicatePelajaran) {
        const { name } = dup as any;
        const toDelete = await db.execute(sql`
          SELECT id
          FROM mata_pelajaran
          WHERE name = ${name}
          ORDER BY id DESC
          LIMIT 1 OFFSET 0
        `);
        
        const keepId = (toDelete[0] as any).id;
        
        const result = await db.execute(sql`
          DELETE FROM mata_pelajaran
          WHERE name = ${name} AND id != ${keepId}
        `);
        
        console.log(`✓ Dihapus ${result.length} duplikat untuk "${name}"`);
      }
    } else {
      console.log("✓ Tidak ada data double");
    }

    console.log("\n✅ Selesai! Data double telah dihapus.");
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  } finally {
    await connection.end();
  }
}

findAndRemoveDuplicates()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
