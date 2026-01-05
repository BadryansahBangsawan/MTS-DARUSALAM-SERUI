const mysql = require('mysql2/promise');

async function checkUser() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mts_darrusalam'
  });

  try {
    const [rows] = await connection.execute("SELECT id, email, name FROM users LIMIT 1");
    console.log('Users in database:', rows);

    if (rows.length === 0) {
      console.log('No users found. Creating default admin user...');

      const bcrypt = require('bcrypt');
      const password = await bcrypt.hash('admin123', 10);

      await connection.execute(
        "INSERT INTO users (email, username, password_hash, name, role) VALUES (?, ?, ?, ?, ?)",
        ['admin@mtsdarussalam.sch.id', 'admin', password, 'Admin MTs', 'admin']
      );

      console.log('✅ Default admin user created');
      console.log('Email: admin@mtsdarussalam.sch.id');
      console.log('Password: admin123');
    } else {
      console.log('✅ User found with ID:', rows[0].id);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await connection.end();
  }
}

checkUser().catch(console.error);
