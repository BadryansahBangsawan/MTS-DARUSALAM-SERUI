import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

dotenv.config({ path: '../../apps/web/.env' });

const DATABASE_URL = process.env.DATABASE_URL || '';

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function seed() {
  console.log('🌱 Starting database seeding...\n');

  const connection = await mysql.createConnection(DATABASE_URL);

  // Add username column if not exists
  console.log('📝 Adding username column to users table...');
  try {
    await connection.execute(`ALTER TABLE users ADD COLUMN IF NOT EXISTS username varchar(255) NOT NULL`);
  } catch (err) {
    console.log('   (Column may already exist, continuing...)');
  }

  // Seed Admin User
  console.log('📝 Seeding admin user...');
  const adminPassword = await hashPassword('Semangat Guruku');
  await connection.execute(
    `INSERT INTO users (email, username, password_hash, name, role) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE username = VALUES(username), password_hash = VALUES(password_hash), name = VALUES(name)`,
    ['admin@mtsdarussalam.sch.id', 'GURUHEBAT', adminPassword, 'Super Admin', 'admin']
  );
  console.log('✅ Admin user created: GURUHEBAT\n');

  // Seed School Information
  console.log('📝 Seeding school information...');
  await connection.execute(
    `INSERT INTO school_information (name, description, principal_name, principal_title, principal_image, vision, mission, address, email, phone, whatsapp_registration, operating_hours, social_media, youtube_video_url, total_students, average_applicants_per_year) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
     ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description)`,
    [
      'MTs Darussalam',
      'MTs Darussalam adalah sekolah Islam setingkat SMP yang siap membimbing kamu dengan metode pembelajaran modern dan islami',
      'Drs. H. Muchtar',
      'Kepala Sekolah',
      '/Muhktar.png',
      'Menjadi lembaga pendidikan Islam yang unggul, berkarakter, dan berdaya saing global.',
      '1. Menyelenggarakan pendidikan berkualitas yang mengintegrasikan ilmu pengetahuan umum dan agama Islam.\n2. Membentuk karakter siswa yang berakhlak mulia dan berwawasan luas.\n3. Mengembangkan potensi siswa melalui kegiatan ekstrakurikuler yang bervariasi.',
      'Jln. Dr. Samratulangi\nKabupaten Kepulauan Yapen, Yapen Selatan, Serui',
      'info@mtsdarussalam.sch.id',
      '+62 13-8217-5517',
      '6281354155066',
      JSON.stringify({ weekdays: '07:00 - 14:00 WIT', saturday: '07:00 - 12:00 WIT' }),
      JSON.stringify({ facebook: 'https://facebook.com/mtsdarussalam', instagram: 'https://instagram.com/mtsdarussalam', youtube: 'https://youtube.com/@mtsdarussalam' }),
      'https://youtu.be/84rxYQ-JbS4',
      190,
      63,
    ]
  );
  console.log('✅ School information created: MTs Darussalam\n');

  // Seed Ekstrakurikuler
  console.log('📝 Seeding ekstrakurikuler...');
  const ekstrakurikulerData = [
    {
      id: 'osim',
      name: 'OSIM',
      subtitle: 'Organisasi Intera Madrasah',
      icon: 'BookOpen',
      color: 'green',
      description: 'Organisasi Siswa Intra Madrasah (OSIM) adalah organisasi resmi yang dibentuk di lingkungan madrasah sebagai wadah bagi siswa untuk belajar berorganisasi, mengembangkan kepemimpinan, dan menyalurkan aspirasi serta kreativitas dalam berbagai kegiatan kesiswaan.',
      features: [
        { icon: 'Brain', text: 'Melatih kepemimpinan dan tanggung jawab siswa sejak dini.' },
        { icon: 'Trophy', text: 'Meningkatkan keterampilan komunikasi dan public speaking.' },
        { icon: 'BookOpen', text: 'Menanamkan nilai-nilai Islam dalam sikap dan perilaku.' },
        { icon: 'BookOpen', text: 'Menanamkan nilai-nilai Islam dalam sikap dan perilaku.' },
        { icon: 'Users', text: 'Menjadi wadah aspirasi dan kreativitas siswa.' },
      ],
      schedule: [{ day: 'Senin - Jumat', time: '07:00 - 17:00 WIT' }],
      rating: 4.8,
      whatsappContact: '6281382175517',
    },
    {
      id: 'drumband',
      name: 'Drumband',
      subtitle: 'Marching Band & Musik',
      icon: 'Drum',
      color: 'red',
      description: 'Drumband adalah kegiatan musik ensemble yang melatih kekompakan, disiplin, dan kepemimpinan melalui pertunjukan musik yang memukau. Siswa belajar berbagai alat musik tiup dan perkusi.',
      features: [
        { icon: 'Drum', text: 'Teknik bermain drum dan perkusi' },
        { icon: 'Wind', text: 'Alat musik tiup (trumpet, trombone)' },
        { icon: 'Flag', text: 'Choreography dan formasi marching' },
        { icon: 'Award', text: 'Persiapan lomba dan pertunjukan' },
      ],
      schedule: [{ day: 'Selasa', time: '15:30 - 17:30 WIT' }],
      rating: 4.6,
      whatsappContact: '6281382175517',
    },
    {
      id: 'pramuka',
      name: 'Pramuka',
      subtitle: 'Gerakan Pramuka Indonesia',
      icon: 'Hiking',
      color: 'yellow',
      description: 'Pramuka mengembangkan karakter kepemimpinan, kemandirian, dan cinta alam. Siswa belajar berbagai keterampilan hidup dan kepedulian sosial melalui kegiatan yang menyenangkan.',
      features: [
        { icon: 'Compass', text: 'Navigasi dan orienteering' },
        { icon: 'Flame', text: 'Survival dan kemah' },
        { icon: 'HeartHandshake', text: 'Kegiatan bakti sosial' },
        { icon: 'Leaf', text: 'Pendidikan lingkungan hidup' },
      ],
      schedule: [{ day: 'Jumat', time: '15:30 - 17:00 WIT' }],
      rating: 4.9,
      whatsappContact: '6285398844389',
    },
    {
      id: 'tapak-suci',
      name: 'Tapak Suci',
      subtitle: 'Putera Muhammadiyah',
      icon: 'FistRaised',
      color: 'blue',
      description: 'Tapak Suci adalah seni bela diri tradisional Indonesia yang mengembangkan fisik, mental, dan spiritual siswa. Menggabungkan teknik bertarung dengan nilai-nilai akhlak mulia.',
      features: [
        { icon: 'Hand', text: 'Teknik dasar bela diri' },
        { icon: 'Activity', text: 'Kondisi fisik dan flexibility' },
        { icon: 'Heart', text: 'Pembentukan karakter dan akhlak' },
        { icon: 'ShieldAlert', text: 'Self defense dan kepercayaan diri' },
      ],
      schedule: [{ day: 'Jumat', time: '15:30 - 17:00 WIT' }],
      rating: 4.7,
      whatsappContact: '6281382175517',
    },
    {
      id: 'hadrah',
      name: 'Hadrah',
      subtitle: 'Seni Musik Islam',
      icon: 'Mosque',
      color: 'purple',
      description: 'Hadrah adalah seni musik tradisional Islam yang memadukan vokal, rebana, dan instrumen musik lainnya untuk menyampaikan pesan-pesan keagamaan dengan cara yang indah dan menyentuh hati.',
      features: [
        { icon: 'Mic', text: 'Teknik vokal dan harmonisasi' },
        { icon: 'Drum', text: 'Bermain rebana dan marawis' },
        { icon: 'BookOpen', text: 'Shalawat dan lagu-lagu Islami' },
        { icon: 'Mic', text: 'Performance dan panggung' },
      ],
      schedule: [
        { day: 'Rabu & Jumat', time: '15:30 - 17:00 WIT' },
        { day: 'Sabtu', time: '19:00 - 21:00 WIT' },
      ],
      rating: 4.8,
      whatsappContact: '6281382175517',
    },
  ];

  for (const ekstra of ekstrakurikulerData) {
    await connection.execute(
      `INSERT INTO ekstrakurikuler (id, name, subtitle, icon, color, description, features, schedule, rating, whatsapp_contact) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description)`,
      [
        ekstra.id, ekstra.name, ekstra.subtitle, ekstra.icon, ekstra.color, ekstra.description,
        JSON.stringify(ekstra.features), JSON.stringify(ekstra.schedule), ekstra.rating, ekstra.whatsappContact,
      ]
    );
    console.log(`✅ Ekstrakurikuler created: ${ekstra.name}`);
  }
  console.log('');

  // Seed Organization Positions
  console.log('📝 Seeding organization positions...');
  const organizationData = [
    { title: 'KEMENAG', personName: null, roleCategory: 'supervisory', sortOrder: 1, colorTheme: 'border-green-400' },
    { title: 'KOMITE MADRASAH', personName: 'Achmad Nur Bennu', roleCategory: 'supervisory', sortOrder: 2, colorTheme: 'border-green-400' },
    { title: 'DINAS DIKPORA', personName: null, roleCategory: 'supervisory', sortOrder: 3, colorTheme: 'border-green-400' },
    { title: 'KETUA YAYASAN', personName: 'H. Najamuddin Yusuf', roleCategory: 'leadership', sortOrder: 4, colorTheme: 'border-green-400', backgroundStyle: 'bg-gradient-to-r from-green-600 to-green-400 text-white' },
    { title: 'KEPALA MADRASAH', personName: 'Drs. H. Muchtar', roleCategory: 'leadership', sortOrder: 5 },
    { title: 'KEPALA TATA USAHA', personName: 'Hanifah, S.Pd', roleCategory: 'staff', sortOrder: 6, colorTheme: 'border-green-300' },
    { title: 'BENDAHARA', personName: 'Drs. Sunardja, M.Pd', roleCategory: 'staff', sortOrder: 7, colorTheme: 'border-green-300' },
    { title: 'STAF TATA USAHA', personName: null, roleCategory: 'staff', sortOrder: 8, colorTheme: 'border-green-300' },
    { title: 'WAKAMAD HUMAS', personName: 'Marsyanti, S.Hum', roleCategory: 'staff', sortOrder: 9, colorTheme: 'border-green-300' },
    { title: 'WAKAMAD KESISWAAN', personName: 'Manfud Fauzi, S.Pd.I', roleCategory: 'staff', sortOrder: 10, colorTheme: 'border-green-300' },
    { title: 'WAKAMAD SARPRAS', personName: 'Arum Pawening, S.Pd', roleCategory: 'staff', sortOrder: 11, colorTheme: 'border-green-300' },
    { title: 'PENGELOLA PERPUSTAKAAN', personName: 'Reni Iriani, S.Pd.I', roleCategory: 'staff', sortOrder: 12, colorTheme: 'border-green-300' },
    { title: 'GURU BP / BK', personName: 'Irwan, S.Pd', roleCategory: 'staff', sortOrder: 13, colorTheme: 'border-green-300' },
    { title: 'PENGELOLA LAB. IPA', personName: 'Kurniawan Ramadan, S.Pd', roleCategory: 'lab_manager', sortOrder: 14, colorTheme: 'border-green-300' },
    { title: 'PENGELOLA LAB. KOMP', personName: 'Fatmawati Ruyatomi, S.Hum', roleCategory: 'lab_manager', sortOrder: 15, colorTheme: 'border-green-300' },
    { title: 'WALI KELAS VII A', personName: 'Marhani, S.Pd', roleCategory: 'teaching', sortOrder: 16, colorTheme: 'border-green-300' },
    { title: 'WALI KELAS VII B', personName: 'Benediktus Nupab', roleCategory: 'teaching', sortOrder: 17, colorTheme: 'border-green-300' },
    { title: 'WALI KELAS VIII A', personName: 'Marhani, S.Pd.I', roleCategory: 'teaching', sortOrder: 18, colorTheme: 'border-green-300' },
    { title: 'WALI KELAS VIII B', personName: 'Benediktus Nupab', roleCategory: 'teaching', sortOrder: 19, colorTheme: 'border-green-300' },
    { title: 'WALI KELAS IX A', personName: 'Arisnawaty, S.Pd', roleCategory: 'teaching', sortOrder: 20, colorTheme: 'border-green-300' },
    { title: 'WALI KELAS IX B', personName: 'Irwan, S.Pd', roleCategory: 'teaching', sortOrder: 21, colorTheme: 'border-green-300' },
  ];

  for (const org of organizationData) {
    const values = [org.title, org.personName ?? null, org.roleCategory, org.sortOrder, org.colorTheme ?? null, org.backgroundStyle ?? null];
    await connection.execute(
      `INSERT INTO organization_positions (title, person_name, role_category, sort_order, color_theme, background_style) 
       VALUES (?, ?, ?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE title = VALUES(title), person_name = VALUES(person_name)`,
      values
    );
    console.log(`✅ Position created: ${org.title}`);
  }
  console.log('');

  // Seed Mata Pelajaran
  console.log('📝 Seeding mata pelajaran...');
  const mataPelajaranData = [
    { name: 'Pendidikan Agama Islam', description: 'Pendidikan agama Islam dan nilai-nilai keislaman', category: 'religious', gradeLevels: ['VII', 'VIII', 'IX'], hoursPerWeek: 4 },
    { name: 'Bahasa Indonesia', description: 'Bahasa dan sastra Indonesia', category: 'language', gradeLevels: ['VII', 'VIII', 'IX'], hoursPerWeek: 4 },
    { name: 'Bahasa Inggris', description: 'Bahasa Inggris sebagai bahasa asing', category: 'language', gradeLevels: ['VII', 'VIII', 'IX'], hoursPerWeek: 3 },
    { name: 'Matematika', description: 'Matematika dan logika berpikir', category: 'science', gradeLevels: ['VII', 'VIII', 'IX'], hoursPerWeek: 4 },
    { name: 'IPA', description: 'Ilmu Pengetahuan Alam', category: 'science', gradeLevels: ['VII', 'VIII', 'IX'], hoursPerWeek: 4 },
    { name: 'IPS', description: 'Ilmu Pengetahuan Sosial', category: 'social', gradeLevels: ['VII', 'VIII', 'IX'], hoursPerWeek: 3 },
    { name: 'PKN', description: 'Pendidikan Kewarganegaraan', category: 'social', gradeLevels: ['VII', 'VIII', 'IX'], hoursPerWeek: 2 },
    { name: 'Seni Budaya', description: 'Seni dan budaya', category: 'skills', gradeLevels: ['VII', 'VIII', 'IX'], hoursPerWeek: 2 },
    { name: 'PJOK', description: 'Pendidikan Jasmani, Olahraga, dan Kesehatan', category: 'skills', gradeLevels: ['VII', 'VIII', 'IX'], hoursPerWeek: 3 },
    { name: 'Bahasa Arab', description: 'Bahasa Arab dasar', category: 'language', gradeLevels: ['VII', 'VIII', 'IX'], hoursPerWeek: 2 },
    { name: 'Akidah Akhlak', description: 'Akidah dan akhlak Islam', category: 'religious', gradeLevels: ['VII', 'VIII', 'IX'], hoursPerWeek: 2 },
    { name: 'Fiqih', description: 'Hukum-hukum Islam', category: 'religious', gradeLevels: ['VII', 'VIII', 'IX'], hoursPerWeek: 2 },
    { name: 'SKI', description: 'Sejarah Kebudayaan Islam', category: 'religious', gradeLevels: ['VII', 'VIII', 'IX'], hoursPerWeek: 2 },
    { name: 'TIK', description: 'Teknologi Informasi dan Komunikasi', category: 'skills', gradeLevels: ['VII', 'VIII', 'IX'], hoursPerWeek: 2 },
  ];

  for (const mp of mataPelajaranData) {
    await connection.execute(
      `INSERT INTO mata_pelajaran (name, description, category, grade_levels, hours_per_week) 
       VALUES (?, ?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description)`,
      [mp.name, mp.description, mp.category, JSON.stringify(mp.gradeLevels), mp.hoursPerWeek]
    );
    console.log(`✅ Mata Pelajaran created: ${mp.name}`);
  }
  console.log('');

  // Seed Features
  console.log('📝 Seeding features...');
  const featuresData = [
    { title: 'Metode Pembelajaran Modern', description: 'Menggunakan metode pembelajaran yang interaktif dan berbasis teknologi', icon: 'Laptop', category: 'teaching', sortOrder: 1 },
    { title: 'Guru Berpengalaman', description: 'Didukung oleh guru-guru yang kompeten dan berpengalaman di bidangnya', icon: 'GraduationCap', category: 'teaching', sortOrder: 2 },
    { title: 'Pendekatan Personal', description: 'Setiap siswa mendapatkan perhatian dan bimbingan yang personal', icon: 'HeartHandshake', category: 'student_care', sortOrder: 3 },
    { title: 'Fasilitas Lengkap', description: 'Fasilitas penunjang pembelajaran yang modern dan memadai', icon: 'Building', category: 'methodology', sortOrder: 4 },
    { title: 'Ekstrakurikuler Beragam', description: 'Banyak pilihan kegiatan ekstrakurikuler untuk mengembangkan bakat', icon: 'Star', category: 'methodology', sortOrder: 5 },
  ];

  for (const feature of featuresData) {
    await connection.execute(
      `INSERT INTO features (title, description, icon, category, sort_order) 
       VALUES (?, ?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description)`,
      [feature.title, feature.description, feature.icon, feature.category, feature.sortOrder]
    );
    console.log(`✅ Feature created: ${feature.title}`);
  }
  console.log('');

  // Seed Testimonials
  console.log('📝 Seeding testimonials...');
  const testimonialsData = [
    {
      authorName: 'Ahmad',
      role: 'Siswa Kelas VIII',
      content: 'MTs Darussalam memberikan pengalaman belajar yang menyenangkan. Guru-gurunya sangat membantu dan fasilitasnya lengkap.',
      rating: 5,
      isApproved: true,
      isFeatured: true,
    },
    {
      authorName: 'Ibu Siti',
      role: 'Orang Tua Siswa',
      content: 'Sangat puas dengan perkembangan anak saya. Nilai akademik dan akhlaknya semakin baik berkat bimbingan dari MTs Darussalam.',
      rating: 5,
      isApproved: true,
      isFeatured: true,
    },
    {
      authorName: 'Pak Budi',
      role: 'Guru',
      content: 'Lingkungan belajar yang kondusif membuat proses pengajaran menjadi lebih efektif. Siswa-siswanya sangat antusias.',
      rating: 4,
      isApproved: true,
      isFeatured: false,
    },
  ];

  for (const testimonial of testimonialsData) {
    await connection.execute(
      `INSERT INTO testimonials (author_name, role, content, rating, is_approved, is_featured) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [testimonial.authorName, testimonial.role, testimonial.content, testimonial.rating, testimonial.isApproved, testimonial.isFeatured]
    );
    console.log(`✅ Testimonial created: ${testimonial.authorName}`);
  }
  console.log('');

  await connection.end();
  console.log('🎉 Database seeding completed successfully!\n');
  console.log('📊 Summary:');
  console.log('   - 1 Admin user (admin@mtsdarussalam.sch.id / admin123)');
  console.log('   - 1 School Information');
  console.log('   - 5 Ekstrakurikuler');
  console.log('   - 21 Organization Positions');
  console.log('   - 14 Mata Pelajaran');
  console.log('   - 5 Features');
  console.log('   - 3 Testimonials\n');
  process.exit(0);
}

seed().catch((error) => {
  console.error('❌ Error seeding database:', error);
  process.exit(1);
});
