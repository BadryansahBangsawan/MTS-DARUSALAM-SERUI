const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mts_darrusalam'
  });

  try {
    // Check if blog_news table exists
    const [rows] = await connection.execute("SHOW TABLES LIKE 'blog_news'");

    if (rows.length === 0) {
      console.log('Creating blog_news table...');

      const sql = `
        CREATE TABLE \`blog_news\` (
          \`id\` int AUTO_INCREMENT NOT NULL,
          \`title\` varchar(255) NOT NULL,
          \`slug\` varchar(255) NOT NULL,
          \`content\` text NOT NULL,
          \`excerpt\` varchar(500),
          \`featured_image\` varchar(500),
          \`category\` enum('berita', 'pengumuman', 'artikel', 'kegiatan') NOT NULL,
          \`author_id\` int NOT NULL,
          \`is_published\` boolean DEFAULT false NOT NULL,
          \`published_at\` timestamp NULL,
          \`views\` int DEFAULT 0 NOT NULL,
          \`is_active\` boolean DEFAULT true NOT NULL,
          \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
          \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
          PRIMARY KEY(\`id\`),
          FOREIGN KEY (\`author_id\`) REFERENCES \`users\`(\`id\`) ON DELETE cascade ON UPDATE no action
        );

        CREATE UNIQUE INDEX \`slug_idx\` ON \`blog_news\` (\`slug\`);
        CREATE INDEX \`category_idx\` ON \`blog_news\` (\`category\`);
        CREATE INDEX \`author_idx\` ON \`blog_news\` (\`author_id\`);
        CREATE INDEX \`is_published_idx\` ON \`blog_news\` (\`is_published\`);
        CREATE INDEX \`is_active_idx\` ON \`blog_news\` (\`is_active\`);
      `;

      const statements = sql.split(';').filter(s => s.trim());

      for (const statement of statements) {
        if (statement.trim()) {
          await connection.execute(statement);
        }
      }

      console.log('✅ blog_news table created successfully!');
    } else {
      console.log('ℹ️  blog_news table already exists');
    }
  } catch (error) {
    console.error('Error running migration:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

runMigration().catch(console.error);
