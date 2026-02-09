DROP TABLE IF EXISTS "blog_news" CASCADE;
DROP TABLE IF EXISTS "ekstrakurikuler" CASCADE;
DROP TABLE IF EXISTS "environment_features" CASCADE;
DROP TABLE IF EXISTS "features" CASCADE;
DROP TABLE IF EXISTS "hero" CASCADE;
DROP TABLE IF EXISTS "mata_pelajaran" CASCADE;
DROP TABLE IF EXISTS "media_assets" CASCADE;
DROP TABLE IF EXISTS "organization_nodes" CASCADE;
DROP TABLE IF EXISTS "organization_positions" CASCADE;
DROP TABLE IF EXISTS "osis" CASCADE;
DROP TABLE IF EXISTS "page_sections" CASCADE;
DROP TABLE IF EXISTS "personal_approach" CASCADE;
DROP TABLE IF EXISTS "principal_welcome" CASCADE;
DROP TABLE IF EXISTS "school_information" CASCADE;
DROP TABLE IF EXISTS "sessions" CASCADE;
DROP TABLE IF EXISTS "testimonials" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "video_section" CASCADE;
DROP TABLE IF EXISTS "visi_misi" CASCADE;
DROP TABLE IF EXISTS "__drizzle_migrations" CASCADE;



CREATE TABLE "blog_news" (
  "id" integer NOT NULL,
  "title" varchar(255) NOT NULL,
  "slug" varchar(255) NOT NULL,
  "content" text NOT NULL,
  "excerpt" varchar(500) DEFAULT NULL,
  "featured_image" varchar(500) DEFAULT NULL,
  "category" text NOT NULL,
  "author_id" integer NOT NULL,
  "is_published" smallint NOT NULL DEFAULT 0,
  "published_at" timestamp NULL,
  "views" integer NOT NULL DEFAULT 0,
  "is_active" smallint NOT NULL DEFAULT 1,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
) ;

INSERT INTO "blog_news" ("id", "title", "slug", "content", "excerpt", "featured_image", "category", "author_id", "is_published", "published_at", "views", "is_active", "created_at", "updated_at") VALUES
(12, 'teasldmovjio', 'teasldmovjio', 'dsa', 'sdad', '/uploads/1767569255253-7qm7g2ct0j7.png', 'pengumuman', 1, 1, '2026-01-04 15:28:10', 0, 1, '2026-01-04 23:27:45', '2026-01-04 15:28:10');

CREATE TABLE "ekstrakurikuler" (
  "id" varchar(50) NOT NULL,
  "name" varchar(255) NOT NULL,
  "subtitle" varchar(255) DEFAULT NULL,
  "icon" varchar(50) DEFAULT NULL,
  "color" varchar(50) DEFAULT NULL,
  "description" text DEFAULT NULL,
  "features" text DEFAULT NULL ,
  "schedule" text DEFAULT NULL ,
  "rating" decimal(3,1) DEFAULT NULL,
  "whatsapp_contact" varchar(50) DEFAULT NULL,
  "is_active" smallint DEFAULT 1,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT current_timestamp
) ;

INSERT INTO "ekstrakurikuler" ("id", "name", "subtitle", "icon", "color", "description", "features", "schedule", "rating", "whatsapp_contact", "is_active", "created_at", "updated_at") VALUES
('drumband', 'Drumband', 'Marching Band & Musik', 'Drum', 'red', 'Drumband adalah kegiatan musik ensemble yang melatih kekompakan, disiplin, dan kepemimpinan melalui pertunjukan musik yang memukau. Siswa belajar berbagai alat musik tiup dan perkusi.', '[{\"icon\":\"Drum\",\"text\":\"Teknik bermain drum dan perkusi\"},{\"icon\":\"Wind\",\"text\":\"Alat musik tiup (trumpet, trombone)\"},{\"icon\":\"Flag\",\"text\":\"Choreography dan formasi marching\"},{\"icon\":\"Award\",\"text\":\"Persiapan lomba dan pertunjukan\"}]', '[{\"day\":\"Selasa\",\"time\":\"15:30 - 17:30 WIT\"}]', 4.6, '6281382175517', 1, '2025-12-30 21:43:24', '2025-12-31 21:45:24'),
('hadrah', 'Hadrah', 'Seni Musik Islam', 'Mosque', 'purple', 'Hadrah adalah seni musik tradisional Islam yang memadukan vokal, rebana, dan instrumen musik lainnya untuk menyampaikan pesan-pesan keagamaan dengan cara yang indah dan menyentuh hati.', '[{\"icon\":\"Mic\",\"text\":\"Teknik vokal dan harmonisasi\"},{\"icon\":\"Drum\",\"text\":\"Bermain rebana dan marawis\"},{\"icon\":\"BookOpen\",\"text\":\"Shalawat dan lagu-lagu Islami\"},{\"icon\":\"Mic\",\"text\":\"Performance dan panggung\"}]', '[{\"day\":\"Rabu & Jumat\",\"time\":\"15:30 - 17:00 WIT\"},{\"day\":\"Sabtu\",\"time\":\"19:00 - 21:00 WIT\"}]', 4.8, '6281382175517', 1, '2025-12-30 21:43:24', '2025-12-31 21:45:24'),
('osim', 'OSIM', 'Organisasi Intera Madrasah', 'BookOpen', 'green', 'Organisasi Siswa Intra Madrasah (OSIM) adalah organisasi resmi yang dibentuk di lingkungan madrasah sebagai wadah bagi siswa untuk belajar berorganisasi, mengembangkan kepemimpinan, dan menyalurkan aspirasi serta kreativitas dalam berbagai kegiatan kesiswaan.', '[{\"icon\":\"Brain\",\"text\":\"Melatih kepemimpinan dan tanggung jawab siswa sejak dini.\"},{\"icon\":\"Trophy\",\"text\":\"Meningkatkan keterampilan komunikasi dan public speaking.\"},{\"icon\":\"BookOpen\",\"text\":\"Menanamkan nilai-nilai Islam dalam sikap dan perilaku.\"},{\"icon\":\"BookOpen\",\"text\":\"Menanamkan nilai-nilai Islam dalam sikap dan perilaku.\"},{\"icon\":\"Users\",\"text\":\"Menjadi wadah aspirasi dan kreativitas siswa.\"}]', '[{\"day\":\"Senin - Jumat\",\"time\":\"07:00 - 17:00 WIT\"}]', 4.8, '6281382175517', 1, '2025-12-30 21:43:24', '2025-12-31 21:45:24'),
('pramuka', 'Pramuka', 'Gerakan Pramuka Indonesia', 'Hiking', 'green', 'Pramuka mengembangkan karakter kepemimpinan, kemandirian, dan cinta alam. Siswa belajar berbagai keterampilan hidup dan kepedulian sosial melalui kegiatan yang menyenangkan.', '[{\"icon\":\"Compass\",\"text\":\"Navigasi dan orienteering\"},{\"icon\":\"Flame\",\"text\":\"Survival dan kemah\"},{\"icon\":\"HeartHandshake\",\"text\":\"Kegiatan bakti sosial\"},{\"icon\":\"Leaf\",\"text\":\"Pendidikan lingkungan hidup\"}]', '[{\"day\":\"Jumat\",\"time\":\"15:30 - 17:00 WIT\"}]', 4.9, '6285398844389', 1, '2025-12-30 21:43:24', '2025-12-31 21:45:24'),
('tapak-suci', 'Tapak Suci', 'Putera Muhammadiyah', 'FistRaised', 'blue', 'Tapak Suci adalah seni bela diri tradisional Indonesia yang mengembangkan fisik, mental, dan spiritual siswa. Menggabungkan teknik bertarung dengan nilai-nilai akhlak mulia.', '[{\"icon\":\"Hand\",\"text\":\"Teknik dasar bela diri\"},{\"icon\":\"Activity\",\"text\":\"Kondisi fisik dan flexibility\"},{\"icon\":\"Heart\",\"text\":\"Pembentukan karakter dan akhlak\"},{\"icon\":\"ShieldAlert\",\"text\":\"Self defense dan kepercayaan diri\"}]', '[{\"day\":\"Jumat\",\"time\":\"15:30 - 17:00 WIT\"}]', 4.7, '6281382175517', 1, '2025-12-30 21:43:24', '2025-12-31 21:45:24');

CREATE TABLE "environment_features" (
  "id" integer NOT NULL,
  "title" varchar(255) DEFAULT NULL,
  "description" text DEFAULT NULL,
  "features" text DEFAULT NULL ,
  "is_active" smallint DEFAULT 1,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT current_timestamp,
  "image" varchar(500) DEFAULT NULL
) ;

INSERT INTO "environment_features" ("id", "title", "description", "features", "is_active", "created_at", "updated_at", "image") VALUES
(1, 'lingkungan Belajar Nyaman & Interaktif', 'MTs Darussalam menyediakan lingkungan belajar yang kondusif, modern, dan mendukung perkembangan siswa.', '[{\"icon\":\"Grid2x2\",\"title\":\"Guru Berpengalaman\",\"description\":\"Guru-guru berpengalaman siap membimbing siswa secara langsung di kelas\"},{\"icon\":\"Layers\",\"title\":\"Metode Interaktif\",\"description\":\"Metode pengajaran interaktif untuk meningkatkan pemahaman siswa\"},{\"icon\":\"Users\",\"title\":\"Perhatian Penuh\",\"description\":\"Setiap siswa diperhatikan perkembangan akademik dan akhlaknya\"}]', 1, '2025-12-31 21:50:24', '2025-12-31 15:06:48', '/uploads/1767222406646-y8bxffty3ka.png');

CREATE TABLE "features" (
  "id" integer NOT NULL,
  "title" varchar(255) NOT NULL,
  "description" text DEFAULT NULL,
  "icon" varchar(50) DEFAULT NULL,
  "category" text DEFAULT NULL,
  "sort_order" integer DEFAULT 0,
  "is_active" smallint DEFAULT 1,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT current_timestamp
) ;

INSERT INTO "features" ("id", "title", "description", "icon", "category", "sort_order", "is_active", "created_at", "updated_at") VALUES
(1, 'Metode Pembelajaran Modern', 'Menggunakan metode pembelajaran yang interaktif dan berbasis teknologi', 'Laptop', 'teaching', 1, 1, '2025-12-30 21:49:36', '2025-12-30 21:49:36'),
(2, 'Guru Berpengalaman', 'Didukung oleh guru-guru yang kompeten dan berpengalaman di bidangnya', 'GraduationCap', 'teaching', 2, 1, '2025-12-30 21:49:36', '2025-12-30 21:49:36'),
(3, 'Pendekatan Personal', 'Setiap siswa mendapatkan perhatian dan bimbingan yang personal', 'HeartHandshake', 'student_care', 3, 1, '2025-12-30 21:49:36', '2025-12-30 21:49:36'),
(4, 'Fasilitas Lengkap', 'Fasilitas penunjang pembelajaran yang modern dan memadai', 'Building', 'methodology', 4, 1, '2025-12-30 21:49:36', '2025-12-30 21:49:36'),
(5, 'Ekstrakurikuler Beragam', 'Banyak pilihan kegiatan ekstrakurikuler untuk mengembangkan bakat', 'Star', 'methodology', 5, 1, '2025-12-30 21:49:36', '2025-12-30 21:49:36'),
(6, 'Metode Pembelajaran Modern', 'Menggunakan metode pembelajaran yang interaktif dan berbasis teknologi', 'Laptop', 'teaching', 1, 1, '2025-12-31 17:37:12', '2025-12-31 17:37:12'),
(7, 'Guru Berpengalaman', 'Didukung oleh guru-guru yang kompeten dan berpengalaman di bidangnya', 'GraduationCap', 'teaching', 2, 1, '2025-12-31 17:37:12', '2025-12-31 17:37:12'),
(8, 'Pendekatan Personal', 'Setiap siswa mendapatkan perhatian dan bimbingan yang personal', 'HeartHandshake', 'student_care', 3, 1, '2025-12-31 17:37:12', '2025-12-31 17:37:12'),
(9, 'Fasilitas Lengkap', 'Fasilitas penunjang pembelajaran yang modern dan memadai', 'Building', 'methodology', 4, 1, '2025-12-31 17:37:12', '2025-12-31 17:37:12'),
(10, 'Ekstrakurikuler Beragam', 'Banyak pilihan kegiatan ekstrakurikuler untuk mengembangkan bakat', 'Star', 'methodology', 5, 1, '2025-12-31 17:37:12', '2025-12-31 17:37:12'),
(11, 'Metode Pembelajaran Modern', 'Menggunakan metode pembelajaran yang interaktif dan berbasis teknologi', 'Laptop', 'teaching', 1, 1, '2025-12-31 20:44:05', '2025-12-31 20:44:05'),
(12, 'Guru Berpengalaman', 'Didukung oleh guru-guru yang kompeten dan berpengalaman di bidangnya', 'GraduationCap', 'teaching', 2, 1, '2025-12-31 20:44:05', '2025-12-31 20:44:05'),
(13, 'Pendekatan Personal', 'Setiap siswa mendapatkan perhatian dan bimbingan yang personal', 'HeartHandshake', 'student_care', 3, 1, '2025-12-31 20:44:05', '2025-12-31 20:44:05'),
(14, 'Fasilitas Lengkap', 'Fasilitas penunjang pembelajaran yang modern dan memadai', 'Building', 'methodology', 4, 1, '2025-12-31 20:44:05', '2025-12-31 20:44:05'),
(15, 'Ekstrakurikuler Beragam', 'Banyak pilihan kegiatan ekstrakurikuler untuk mengembangkan bakat', 'Star', 'methodology', 5, 1, '2025-12-31 20:44:05', '2025-12-31 20:44:05'),
(16, 'Metode Pembelajaran Modern', 'Menggunakan metode pembelajaran yang interaktif dan berbasis teknologi', 'Laptop', 'teaching', 1, 1, '2025-12-31 21:45:24', '2025-12-31 21:45:24'),
(17, 'Guru Berpengalaman', 'Didukung oleh guru-guru yang kompeten dan berpengalaman di bidangnya', 'GraduationCap', 'teaching', 2, 1, '2025-12-31 21:45:24', '2025-12-31 21:45:24'),
(18, 'Pendekatan Personal', 'Setiap siswa mendapatkan perhatian dan bimbingan yang personal', 'HeartHandshake', 'student_care', 3, 1, '2025-12-31 21:45:24', '2025-12-31 21:45:24'),
(19, 'Fasilitas Lengkap', 'Fasilitas penunjang pembelajaran yang modern dan memadai', 'Building', 'methodology', 4, 1, '2025-12-31 21:45:24', '2025-12-31 21:45:24'),
(20, 'Ekstrakurikuler Beragam', 'Banyak pilihan kegiatan ekstrakurikuler untuk mengembangkan bakat', 'Star', 'methodology', 5, 1, '2025-12-31 21:45:24', '2025-12-31 21:45:24'),
(21, 'Metode Pembelajaran Modern', 'Menggunakan metode pembelajaran yang interaktif dan berbasis teknologi', 'Laptop', 'teaching', 1, 1, '2025-12-31 21:50:24', '2025-12-31 21:50:24'),
(22, 'Guru Berpengalaman', 'Didukung oleh guru-guru yang kompeten dan berpengalaman di bidangnya', 'GraduationCap', 'teaching', 2, 1, '2025-12-31 21:50:24', '2025-12-31 21:50:24'),
(23, 'Pendekatan Personal', 'Setiap siswa mendapatkan perhatian dan bimbingan yang personal', 'HeartHandshake', 'student_care', 3, 1, '2025-12-31 21:50:24', '2025-12-31 21:50:24'),
(24, 'Fasilitas Lengkap', 'Fasilitas penunjang pembelajaran yang modern dan memadai', 'Building', 'methodology', 4, 1, '2025-12-31 21:50:24', '2025-12-31 21:50:24'),
(25, 'Ekstrakurikuler Beragam', 'Banyak pilihan kegiatan ekstrakurikuler untuk mengembangkan bakat', 'Star', 'methodology', 5, 1, '2025-12-31 21:50:24', '2025-12-31 21:50:24'),
(26, 'Metode Pembelajaran Modern', 'Menggunakan metode pembelajaran yang interaktif dan berbasis teknologi', 'Laptop', 'teaching', 1, 1, '2025-12-31 22:07:46', '2025-12-31 22:07:46'),
(27, 'Guru Berpengalaman', 'Didukung oleh guru-guru yang kompeten dan berpengalaman di bidangnya', 'GraduationCap', 'teaching', 2, 1, '2025-12-31 22:07:46', '2025-12-31 22:07:46'),
(28, 'Pendekatan Personal', 'Setiap siswa mendapatkan perhatian dan bimbingan yang personal', 'HeartHandshake', 'student_care', 3, 1, '2025-12-31 22:07:46', '2025-12-31 22:07:46'),
(29, 'Fasilitas Lengkap', 'Fasilitas penunjang pembelajaran yang modern dan memadai', 'Building', 'methodology', 4, 1, '2025-12-31 22:07:46', '2025-12-31 22:07:46'),
(30, 'Ekstrakurikuler Beragam', 'Banyak pilihan kegiatan ekstrakurikuler untuk mengembangkan bakat', 'Star', 'methodology', 5, 1, '2025-12-31 22:07:46', '2025-12-31 22:07:46'),
(31, 'Metode Pembelajaran Modern', 'Menggunakan metode pembelajaran yang interaktif dan berbasis teknologi', 'Laptop', 'teaching', 1, 1, '2025-12-31 22:15:09', '2025-12-31 22:15:09'),
(32, 'Guru Berpengalaman', 'Didukung oleh guru-guru yang kompeten dan berpengalaman di bidangnya', 'GraduationCap', 'teaching', 2, 1, '2025-12-31 22:15:09', '2025-12-31 22:15:09'),
(33, 'Pendekatan Personal', 'Setiap siswa mendapatkan perhatian dan bimbingan yang personal', 'HeartHandshake', 'student_care', 3, 1, '2025-12-31 22:15:09', '2025-12-31 22:15:09'),
(34, 'Fasilitas Lengkap', 'Fasilitas penunjang pembelajaran yang modern dan memadai', 'Building', 'methodology', 4, 1, '2025-12-31 22:15:09', '2025-12-31 22:15:09'),
(35, 'Ekstrakurikuler Beragam', 'Banyak pilihan kegiatan ekstrakurikuler untuk mengembangkan bakat', 'Star', 'methodology', 5, 1, '2025-12-31 22:15:09', '2025-12-31 22:15:09'),
(36, 'Metode Pembelajaran Modern', 'Menggunakan metode pembelajaran yang interaktif dan berbasis teknologi', 'Laptop', 'teaching', 1, 1, '2025-12-31 22:20:44', '2025-12-31 22:20:44'),
(37, 'Guru Berpengalaman', 'Didukung oleh guru-guru yang kompeten dan berpengalaman di bidangnya', 'GraduationCap', 'teaching', 2, 1, '2025-12-31 22:20:44', '2025-12-31 22:20:44'),
(38, 'Pendekatan Personal', 'Setiap siswa mendapatkan perhatian dan bimbingan yang personal', 'HeartHandshake', 'student_care', 3, 1, '2025-12-31 22:20:44', '2025-12-31 22:20:44'),
(39, 'Fasilitas Lengkap', 'Fasilitas penunjang pembelajaran yang modern dan memadai', 'Building', 'methodology', 4, 1, '2025-12-31 22:20:44', '2025-12-31 22:20:44'),
(40, 'Ekstrakurikuler Beragam', 'Banyak pilihan kegiatan ekstrakurikuler untuk mengembangkan bakat', 'Star', 'methodology', 5, 1, '2025-12-31 22:20:44', '2025-12-31 22:20:44'),
(41, 'Metode Pembelajaran Modern', 'Menggunakan metode pembelajaran yang interaktif dan berbasis teknologi', 'Laptop', 'teaching', 1, 1, '2025-12-31 22:28:34', '2025-12-31 22:28:34'),
(42, 'Guru Berpengalaman', 'Didukung oleh guru-guru yang kompeten dan berpengalaman di bidangnya', 'GraduationCap', 'teaching', 2, 1, '2025-12-31 22:28:34', '2025-12-31 22:28:34'),
(43, 'Pendekatan Personal', 'Setiap siswa mendapatkan perhatian dan bimbingan yang personal', 'HeartHandshake', 'student_care', 3, 1, '2025-12-31 22:28:34', '2025-12-31 22:28:34'),
(44, 'Fasilitas Lengkap', 'Fasilitas penunjang pembelajaran yang modern dan memadai', 'Building', 'methodology', 4, 1, '2025-12-31 22:28:34', '2025-12-31 22:28:34'),
(45, 'Ekstrakurikuler Beragam', 'Banyak pilihan kegiatan ekstrakurikuler untuk mengembangkan bakat', 'Star', 'methodology', 5, 1, '2025-12-31 22:28:34', '2025-12-31 22:28:34'),
(46, 'Metode Pembelajaran Modern', 'Menggunakan metode pembelajaran yang interaktif dan berbasis teknologi', 'Laptop', 'teaching', 1, 1, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(47, 'Guru Berpengalaman', 'Didukung oleh guru-guru yang kompeten dan berpengalaman di bidangnya', 'GraduationCap', 'teaching', 2, 1, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(48, 'Pendekatan Personal', 'Setiap siswa mendapatkan perhatian dan bimbingan yang personal', 'HeartHandshake', 'student_care', 3, 1, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(49, 'Fasilitas Lengkap', 'Fasilitas penunjang pembelajaran yang modern dan memadai', 'Building', 'methodology', 4, 1, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(50, 'Ekstrakurikuler Beragam', 'Banyak pilihan kegiatan ekstrakurikuler untuk mengembangkan bakat', 'Star', 'methodology', 5, 1, '2025-12-31 22:35:50', '2025-12-31 22:35:50');

CREATE TABLE "hero" (
  "id" integer NOT NULL,
  "title" varchar(500) DEFAULT NULL,
  "subtitle" text DEFAULT NULL,
  "background_image" varchar(500) DEFAULT NULL,
  "cta_text" varchar(100) DEFAULT NULL,
  "cta_link" varchar(500) DEFAULT NULL,
  "is_active" smallint DEFAULT 1,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT current_timestamp
) ;

CREATE TABLE "mata_pelajaran" (
  "id" integer NOT NULL,
  "name" varchar(255) NOT NULL,
  "description" text DEFAULT NULL,
  "category" text DEFAULT NULL,
  "grade_levels" text DEFAULT NULL ,
  "hours_per_week" integer DEFAULT NULL,
  "is_active" smallint DEFAULT 1,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT current_timestamp
) ;

INSERT INTO "mata_pelajaran" ("id", "name", "description", "category", "grade_levels", "hours_per_week", "is_active", "created_at", "updated_at") VALUES
(1, 'Pendidikan Agama Islam', 'Pendidikan agama Islam dan nilai-nilai keislaman', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-30 21:49:36', '2025-12-30 21:49:36'),
(2, 'Bahasa Indonesia', 'Bahasa dan sastra Indonesia', 'language', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-30 21:49:36', '2025-12-30 21:49:36'),
(3, 'Bahasa Inggris', 'Bahasa Inggris sebagai bahasa asing', 'language', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-30 21:49:36', '2025-12-30 21:49:36'),
(4, 'Matematika', 'Matematika dan logika berpikir', 'science', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-30 21:49:36', '2025-12-30 21:49:36'),
(5, 'IPA', 'Ilmu Pengetahuan Alam', 'science', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-30 21:49:36', '2025-12-30 21:49:36'),
(6, 'IPS', 'Ilmu Pengetahuan Sosial', 'social', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-30 21:49:36', '2025-12-30 21:49:36'),
(7, 'PKN', 'Pendidikan Kewarganegaraan', 'social', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-30 21:49:36', '2025-12-30 21:49:36'),
(8, 'Seni Budaya', 'Seni dan budaya', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-30 21:49:36', '2025-12-30 21:49:36'),
(9, 'PJOK', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-30 21:49:36', '2025-12-30 21:49:36'),
(10, 'Bahasa Arab', 'Bahasa Arab dasar', 'language', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-30 21:49:36', '2025-12-30 21:49:36'),
(11, 'Akidah Akhlak', 'Akidah dan akhlak Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-30 21:49:36', '2025-12-30 21:49:36'),
(12, 'Fiqih', 'Hukum-hukum Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-30 21:49:36', '2025-12-30 21:49:36'),
(13, 'SKI', 'Sejarah Kebudayaan Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-30 21:49:36', '2025-12-30 21:49:36'),
(14, 'TIK', 'Teknologi Informasi dan Komunikasi', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-30 21:49:36', '2025-12-30 21:49:36'),
(15, 'Pendidikan Agama Islam', 'Pendidikan agama Islam dan nilai-nilai keislaman', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 17:37:12', '2025-12-31 10:32:10'),
(16, 'Bahasa Indonesia', 'Bahasa dan sastra Indonesia', 'language', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 17:37:12', '2025-12-31 17:37:12'),
(17, 'Bahasa Inggris', 'Bahasa Inggris sebagai bahasa asing', 'language', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 17:37:12', '2025-12-31 17:37:12'),
(18, 'Matematika', 'Matematika dan logika berpikir', 'science', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 17:37:12', '2025-12-31 17:37:12'),
(19, 'IPA', 'Ilmu Pengetahuan Alam', 'science', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 17:37:12', '2025-12-31 17:37:12'),
(20, 'IPS', 'Ilmu Pengetahuan Sosial', 'social', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 17:37:12', '2025-12-31 17:37:12'),
(21, 'PKN', 'Pendidikan Kewarganegaraan', 'social', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 17:37:12', '2025-12-31 17:37:12'),
(22, 'Seni Budaya', 'Seni dan budaya', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 17:37:12', '2025-12-31 17:37:12'),
(23, 'PJOK', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 17:37:12', '2025-12-31 17:37:12'),
(24, 'Bahasa Arab', 'Bahasa Arab dasar', 'language', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 17:37:12', '2025-12-31 17:37:12'),
(25, 'Akidah Akhlak', 'Akidah dan akhlak Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 17:37:12', '2025-12-31 17:37:12'),
(26, 'Fiqih', 'Hukum-hukum Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 17:37:12', '2025-12-31 17:37:12'),
(27, 'SKI', 'Sejarah Kebudayaan Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 17:37:12', '2025-12-31 17:37:12'),
(28, 'TIK', 'Teknologi Informasi dan Komunikasi', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 17:37:12', '2025-12-31 17:37:12'),
(29, 'Pendidikan Agama Islam', 'Pendidikan agama Islam dan nilai-nilai keislaman', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 20:44:05', '2025-12-31 20:44:05'),
(30, 'Bahasa Indonesia', 'Bahasa dan sastra Indonesia', 'language', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 20:44:05', '2025-12-31 20:44:05'),
(31, 'Bahasa Inggris', 'Bahasa Inggris sebagai bahasa asing', 'language', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 20:44:05', '2025-12-31 20:44:05'),
(32, 'Matematika', 'Matematika dan logika berpikir', 'science', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 20:44:05', '2025-12-31 20:44:05'),
(33, 'IPA', 'Ilmu Pengetahuan Alam', 'science', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 20:44:05', '2025-12-31 20:44:05'),
(34, 'IPS', 'Ilmu Pengetahuan Sosial', 'social', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 20:44:05', '2025-12-31 20:44:05'),
(35, 'PKN', 'Pendidikan Kewarganegaraan', 'social', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 20:44:05', '2025-12-31 20:44:05'),
(36, 'Seni Budaya', 'Seni dan budaya', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 20:44:05', '2025-12-31 20:44:05'),
(37, 'PJOK', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 20:44:05', '2025-12-31 20:44:05'),
(38, 'Bahasa Arab', 'Bahasa Arab dasar', 'language', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 20:44:05', '2025-12-31 20:44:05'),
(39, 'Akidah Akhlak', 'Akidah dan akhlak Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 20:44:05', '2025-12-31 20:44:05'),
(40, 'Fiqih', 'Hukum-hukum Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 20:44:05', '2025-12-31 20:44:05'),
(41, 'SKI', 'Sejarah Kebudayaan Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 20:44:05', '2025-12-31 20:44:05'),
(42, 'TIK', 'Teknologi Informasi dan Komunikasi', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 20:44:05', '2025-12-31 20:44:05'),
(43, 'Pendidikan Agama Islam', 'Pendidikan agama Islam dan nilai-nilai keislaman', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 21:45:24', '2025-12-31 21:45:24'),
(44, 'Bahasa Indonesia', 'Bahasa dan sastra Indonesia', 'language', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 21:45:24', '2025-12-31 21:45:24'),
(45, 'Bahasa Inggris', 'Bahasa Inggris sebagai bahasa asing', 'language', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 21:45:24', '2025-12-31 21:45:24'),
(46, 'Matematika', 'Matematika dan logika berpikir', 'science', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 21:45:24', '2025-12-31 21:45:24'),
(47, 'IPA', 'Ilmu Pengetahuan Alam', 'science', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 21:45:24', '2025-12-31 21:45:24'),
(48, 'IPS', 'Ilmu Pengetahuan Sosial', 'social', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 21:45:24', '2025-12-31 21:45:24'),
(49, 'PKN', 'Pendidikan Kewarganegaraan', 'social', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 21:45:24', '2025-12-31 21:45:24'),
(50, 'Seni Budaya', 'Seni dan budaya', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 21:45:24', '2025-12-31 21:45:24'),
(51, 'PJOK', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 21:45:24', '2025-12-31 21:45:24'),
(52, 'Bahasa Arab', 'Bahasa Arab dasar', 'language', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 21:45:24', '2025-12-31 21:45:24'),
(53, 'Akidah Akhlak', 'Akidah dan akhlak Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 21:45:24', '2025-12-31 21:45:24'),
(54, 'Fiqih', 'Hukum-hukum Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 21:45:24', '2025-12-31 21:45:24'),
(55, 'SKI', 'Sejarah Kebudayaan Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 21:45:24', '2025-12-31 21:45:24'),
(56, 'TIK', 'Teknologi Informasi dan Komunikasi', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 21:45:24', '2025-12-31 21:45:24'),
(57, 'Pendidikan Agama Islam', 'Pendidikan agama Islam dan nilai-nilai keislaman', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 21:50:24', '2025-12-31 21:50:24'),
(58, 'Bahasa Indonesia', 'Bahasa dan sastra Indonesia', 'language', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 21:50:24', '2025-12-31 21:50:24'),
(59, 'Bahasa Inggris', 'Bahasa Inggris sebagai bahasa asing', 'language', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 21:50:24', '2025-12-31 21:50:24'),
(60, 'Matematika', 'Matematika dan logika berpikir', 'science', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 21:50:24', '2025-12-31 21:50:24'),
(61, 'IPA', 'Ilmu Pengetahuan Alam', 'science', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 21:50:24', '2025-12-31 21:50:24'),
(62, 'IPS', 'Ilmu Pengetahuan Sosial', 'social', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 21:50:24', '2025-12-31 21:50:24'),
(63, 'PKN', 'Pendidikan Kewarganegaraan', 'social', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 21:50:24', '2025-12-31 21:50:24'),
(64, 'Seni Budaya', 'Seni dan budaya', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 21:50:24', '2025-12-31 21:50:24'),
(65, 'PJOK', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 21:50:24', '2025-12-31 21:50:24'),
(66, 'Bahasa Arab', 'Bahasa Arab dasar', 'language', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 21:50:24', '2025-12-31 21:50:24'),
(67, 'Akidah Akhlak', 'Akidah dan akhlak Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 21:50:24', '2025-12-31 21:50:24'),
(68, 'Fiqih', 'Hukum-hukum Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 21:50:24', '2025-12-31 21:50:24'),
(69, 'SKI', 'Sejarah Kebudayaan Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 21:50:24', '2025-12-31 21:50:24'),
(70, 'TIK', 'Teknologi Informasi dan Komunikasi', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 21:50:24', '2025-12-31 21:50:24'),
(71, 'Pendidikan Agama Islam', 'Pendidikan agama Islam dan nilai-nilai keislaman', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 22:07:46', '2025-12-31 22:07:46'),
(72, 'Bahasa Indonesia', 'Bahasa dan sastra Indonesia', 'language', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 22:07:46', '2025-12-31 22:07:46'),
(73, 'Bahasa Inggris', 'Bahasa Inggris sebagai bahasa asing', 'language', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 22:07:46', '2025-12-31 22:07:46'),
(74, 'Matematika', 'Matematika dan logika berpikir', 'science', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 22:07:46', '2025-12-31 22:07:46'),
(75, 'IPA', 'Ilmu Pengetahuan Alam', 'science', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 22:07:46', '2025-12-31 22:07:46'),
(76, 'IPS', 'Ilmu Pengetahuan Sosial', 'social', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 22:07:46', '2025-12-31 22:07:46'),
(77, 'PKN', 'Pendidikan Kewarganegaraan', 'social', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:07:46', '2025-12-31 22:07:46'),
(78, 'Seni Budaya', 'Seni dan budaya', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:07:46', '2025-12-31 22:07:46'),
(79, 'PJOK', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 22:07:46', '2025-12-31 22:07:46'),
(80, 'Bahasa Arab', 'Bahasa Arab dasar', 'language', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:07:46', '2025-12-31 22:07:46'),
(81, 'Akidah Akhlak', 'Akidah dan akhlak Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:07:46', '2025-12-31 22:07:46'),
(82, 'Fiqih', 'Hukum-hukum Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:07:46', '2025-12-31 22:07:46'),
(83, 'SKI', 'Sejarah Kebudayaan Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:07:46', '2025-12-31 22:07:46'),
(84, 'TIK', 'Teknologi Informasi dan Komunikasi', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:07:46', '2025-12-31 22:07:46'),
(85, 'Pendidikan Agama Islam', 'Pendidikan agama Islam dan nilai-nilai keislaman', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 22:15:09', '2025-12-31 22:15:09'),
(86, 'Bahasa Indonesia', 'Bahasa dan sastra Indonesia', 'language', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 22:15:09', '2025-12-31 22:15:09'),
(87, 'Bahasa Inggris', 'Bahasa Inggris sebagai bahasa asing', 'language', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 22:15:09', '2025-12-31 22:15:09'),
(88, 'Matematika', 'Matematika dan logika berpikir', 'science', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 22:15:09', '2025-12-31 22:15:09'),
(89, 'IPA', 'Ilmu Pengetahuan Alam', 'science', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 22:15:09', '2025-12-31 22:15:09'),
(90, 'IPS', 'Ilmu Pengetahuan Sosial', 'social', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 22:15:09', '2025-12-31 22:15:09'),
(91, 'PKN', 'Pendidikan Kewarganegaraan', 'social', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:15:09', '2025-12-31 22:15:09'),
(92, 'Seni Budaya', 'Seni dan budaya', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:15:09', '2025-12-31 22:15:09'),
(93, 'PJOK', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 22:15:09', '2025-12-31 22:15:09'),
(94, 'Bahasa Arab', 'Bahasa Arab dasar', 'language', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:15:09', '2025-12-31 22:15:09'),
(95, 'Akidah Akhlak', 'Akidah dan akhlak Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:15:09', '2025-12-31 22:15:09'),
(96, 'Fiqih', 'Hukum-hukum Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:15:09', '2025-12-31 22:15:09'),
(97, 'SKI', 'Sejarah Kebudayaan Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:15:09', '2025-12-31 22:15:09'),
(98, 'TIK', 'Teknologi Informasi dan Komunikasi', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:15:09', '2025-12-31 22:15:09'),
(99, 'Pendidikan Agama Islam', 'Pendidikan agama Islam dan nilai-nilai keislaman', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 22:20:44', '2025-12-31 22:20:44'),
(100, 'Bahasa Indonesia', 'Bahasa dan sastra Indonesia', 'language', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 22:20:44', '2025-12-31 22:20:44'),
(101, 'Bahasa Inggris', 'Bahasa Inggris sebagai bahasa asing', 'language', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 22:20:44', '2025-12-31 22:20:44'),
(102, 'Matematika', 'Matematika dan logika berpikir', 'science', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 22:20:44', '2025-12-31 22:20:44'),
(103, 'IPA', 'Ilmu Pengetahuan Alam', 'science', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 22:20:44', '2025-12-31 22:20:44'),
(104, 'IPS', 'Ilmu Pengetahuan Sosial', 'social', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 22:20:44', '2025-12-31 22:20:44'),
(105, 'PKN', 'Pendidikan Kewarganegaraan', 'social', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:20:44', '2025-12-31 22:20:44'),
(106, 'Seni Budaya', 'Seni dan budaya', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:20:44', '2025-12-31 22:20:44'),
(107, 'PJOK', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 22:20:44', '2025-12-31 22:20:44'),
(108, 'Bahasa Arab', 'Bahasa Arab dasar', 'language', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:20:44', '2025-12-31 22:20:44'),
(109, 'Akidah Akhlak', 'Akidah dan akhlak Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:20:44', '2025-12-31 22:20:44'),
(110, 'Fiqih', 'Hukum-hukum Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:20:44', '2025-12-31 22:20:44'),
(111, 'SKI', 'Sejarah Kebudayaan Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:20:44', '2025-12-31 22:20:44'),
(112, 'TIK', 'Teknologi Informasi dan Komunikasi', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:20:44', '2025-12-31 22:20:44'),
(113, 'Pendidikan Agama Islam', 'Pendidikan agama Islam dan nilai-nilai keislaman', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 22:28:34', '2025-12-31 22:28:34'),
(114, 'Bahasa Indonesia', 'Bahasa dan sastra Indonesia', 'language', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 22:28:34', '2025-12-31 22:28:34'),
(115, 'Bahasa Inggris', 'Bahasa Inggris sebagai bahasa asing', 'language', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 22:28:34', '2025-12-31 22:28:34'),
(116, 'Matematika', 'Matematika dan logika berpikir', 'science', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 22:28:34', '2025-12-31 22:28:34'),
(117, 'IPA', 'Ilmu Pengetahuan Alam', 'science', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 22:28:34', '2025-12-31 22:28:34'),
(118, 'IPS', 'Ilmu Pengetahuan Sosial', 'social', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 22:28:34', '2025-12-31 22:28:34'),
(119, 'PKN', 'Pendidikan Kewarganegaraan', 'social', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:28:34', '2025-12-31 22:28:34'),
(120, 'Seni Budaya', 'Seni dan budaya', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:28:34', '2025-12-31 22:28:34'),
(121, 'PJOK', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 22:28:34', '2025-12-31 22:28:34'),
(122, 'Bahasa Arab', 'Bahasa Arab dasar', 'language', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:28:34', '2025-12-31 22:28:34'),
(123, 'Akidah Akhlak', 'Akidah dan akhlak Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:28:34', '2025-12-31 22:28:34'),
(124, 'Fiqih', 'Hukum-hukum Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:28:34', '2025-12-31 22:28:34'),
(125, 'SKI', 'Sejarah Kebudayaan Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:28:34', '2025-12-31 22:28:34'),
(126, 'TIK', 'Teknologi Informasi dan Komunikasi', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:28:34', '2025-12-31 22:28:34'),
(127, 'Pendidikan Agama Islam', 'Pendidikan agama Islam dan nilai-nilai keislaman', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(128, 'Bahasa Indonesia', 'Bahasa dan sastra Indonesia', 'language', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(129, 'Bahasa Inggris', 'Bahasa Inggris sebagai bahasa asing', 'language', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(130, 'Matematika', 'Matematika dan logika berpikir', 'science', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(131, 'IPA', 'Ilmu Pengetahuan Alam', 'science', '[\"VII\",\"VIII\",\"IX\"]', 4, 1, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(132, 'IPS', 'Ilmu Pengetahuan Sosial', 'social', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(133, 'PKN', 'Pendidikan Kewarganegaraan', 'social', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(134, 'Seni Budaya', 'Seni dan budaya', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(135, 'PJOK', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 3, 1, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(136, 'Bahasa Arab', 'Bahasa Arab dasar', 'language', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(137, 'Akidah Akhlak', 'Akidah dan akhlak Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(138, 'Fiqih', 'Hukum-hukum Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(139, 'SKI', 'Sejarah Kebudayaan Islam', 'religious', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(140, 'TIK', 'Teknologi Informasi dan Komunikasi', 'skills', '[\"VII\",\"VIII\",\"IX\"]', 2, 1, '2025-12-31 22:35:50', '2025-12-31 22:35:50');

CREATE TABLE "media_assets" (
  "id" integer NOT NULL,
  "filename" varchar(255) NOT NULL,
  "original_name" varchar(255) NOT NULL,
  "url" varchar(500) NOT NULL,
  "size" integer NOT NULL,
  "mime_type" varchar(100) NOT NULL,
  "category" varchar(100) DEFAULT NULL,
  "created_at" timestamp NOT NULL DEFAULT now()
) ;

CREATE TABLE "organization_nodes" (
  "id" integer NOT NULL,
  "category" varchar(100) NOT NULL,
  "title" varchar(255) NOT NULL,
  "subtitle" varchar(255) DEFAULT NULL,
  "color" varchar(255) DEFAULT NULL,
  "border" varchar(100) DEFAULT NULL,
  "sort_order" integer NOT NULL DEFAULT 0,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT current_timestamp
) ;

INSERT INTO "organization_nodes" ("id", "category", "title", "subtitle", "color", "border", "sort_order", "created_at", "updated_at") VALUES
(1, 'nodes', 'KEMENAG', NULL, NULL, 'border-green-400', 0, '2025-12-30 20:32:37', '2025-12-30 20:32:37'),
(2, 'nodes', 'KOMITE MADRASAH', 'Achmad Nur Bennu', NULL, 'border-green-400', 1, '2025-12-30 20:32:37', '2025-12-30 20:32:37'),
(3, 'nodes', 'DINAS DIKPORA', NULL, NULL, 'border-green-400', 2, '2025-12-30 20:32:37', '2025-12-30 20:32:37'),
(4, 'ketuaYayasan', 'KETUA YAYASAN', 'H. Najamuddin Yusuf', 'bg-gradient-to-r from-green-600 to-green-400 text-white', NULL, 0, '2025-12-30 20:32:37', '2025-12-30 20:32:37'),
(5, 'kepalaMadrasah', 'KEPALA MADRASAH', 'Drs. H. Muchtar', NULL, NULL, 0, '2025-12-30 20:32:37', '2025-12-30 20:32:37');

CREATE TABLE "organization_positions" (
  "id" integer NOT NULL,
  "title" varchar(255) NOT NULL,
  "person_name" varchar(255) DEFAULT NULL,
  "role_category" text DEFAULT NULL,
  "parent_position_id" integer DEFAULT NULL,
  "sort_order" integer DEFAULT 0,
  "color_theme" varchar(100) DEFAULT NULL,
  "background_style" varchar(255) DEFAULT NULL,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT current_timestamp
) ;

INSERT INTO "organization_positions" ("id", "title", "person_name", "role_category", "parent_position_id", "sort_order", "color_theme", "background_style", "created_at", "updated_at") VALUES
(245, 'KEMENAG', NULL, 'supervisory', NULL, 1, 'border-green-400', NULL, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(246, 'KOMITE MADRASAH', 'Achmad Nur Bennu', 'supervisory', NULL, 2, 'border-green-400', NULL, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(247, 'DINAS DIKPORA', NULL, 'supervisory', NULL, 3, 'border-green-400', NULL, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(248, 'KETUA YAYASAN', 'Drs. H. Muchtar', 'leadership', NULL, 4, 'border-green-400', 'bg-gradient-to-r from-green-600 to-green-400 text-white', '2025-12-31 22:35:50', '2026-01-02 16:46:16'),
(250, 'KEPALA TATA USAHA', 'Hanifah, S.Pd', 'staff', NULL, 6, 'border-green-300', NULL, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(251, 'BENDAHARA', 'Drs. Sunardja, M.Pd', 'staff', NULL, 7, 'border-green-300', NULL, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(252, 'STAF TATA USAHA', NULL, 'staff', NULL, 8, 'border-green-300', NULL, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(253, 'WAKAMAD HUMAS', 'Marsyanti, S.Hum', 'staff', NULL, 9, 'border-green-300', NULL, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(254, 'WAKAMAD KESISWAAN', 'Manfud Fauzi, S.Pd.I', 'staff', NULL, 10, 'border-green-300', NULL, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(255, 'WAKAMAD SARPRAS', 'Arum Pawening, S.Pd', 'staff', NULL, 11, 'border-green-300', NULL, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(256, 'PENGELOLA PERPUSTAKAAN', 'Reni Iriani, S.Pd.I', 'staff', NULL, 12, 'border-green-300', NULL, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(257, 'GURU BP / BK', 'Irwan, S.Pd', 'staff', NULL, 13, 'border-green-300', NULL, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(258, 'PENGELOLA LAB. IPA', 'Kurniawan Ramadan, S.Pd', 'lab_manager', NULL, 14, 'border-green-300', NULL, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(259, 'PENGELOLA LAB. KOMP', 'Fatmawati Ruyatomi, S.Hum', 'lab_manager', NULL, 15, 'border-green-300', NULL, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(260, 'WALI KELAS VII A', 'Marhani, S.Pd', 'teaching', NULL, 16, 'border-green-300', NULL, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(261, 'WALI KELAS VII B', 'Benediktus Nupab', 'teaching', NULL, 17, 'border-green-300', NULL, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(262, 'WALI KELAS VIII A', 'Marhani, S.Pd.I', 'teaching', NULL, 18, 'border-green-300', NULL, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(263, 'WALI KELAS VIII B', 'Benediktus Nupab', 'teaching', NULL, 19, 'border-green-300', NULL, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(264, 'WALI KELAS IX A', 'Arisnawaty, S.Pd', 'teaching', NULL, 20, 'border-green-300', NULL, '2025-12-31 22:35:50', '2025-12-31 22:35:50'),
(265, 'WALI KELAS IX B', 'Irwan, S.Pd', 'teaching', NULL, 21, 'border-green-300', NULL, '2025-12-31 22:35:50', '2025-12-31 22:35:50');

CREATE TABLE "osis" (
  "id" integer NOT NULL,
  "title" varchar(255) DEFAULT NULL,
  "description" text DEFAULT NULL,
  "image" varchar(500) DEFAULT NULL,
  "is_active" smallint DEFAULT 1,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT current_timestamp
) ;

INSERT INTO "osis" ("id", "title", "description", "image", "is_active", "created_at", "updated_at") VALUES
(1, 'OSIS', 'OSIS MTs Darussalam adalah wadah kepemimpinan siswa yang aktif, kreatif, dan bertanggung jawab dalam menyelenggarakan kegiatan sekolah serta menumbuhkan jiwa organisasi sejak dini.', '/osis.png', 1, '2025-12-31 21:45:24', '2025-12-31 14:10:55'),
(2, 'OSIS', 'OSIS MTs Darussalam adalah wadah kepemimpinan siswa yang aktif, kreatif, dan bertanggung jawab dalam menyelenggarakan kegiatan sekolah serta menumbuhkan jiwa organisasi sejak dini.', '/osis.png', 1, '2025-12-31 21:50:24', '2025-12-31 21:50:24'),
(3, 'OSIS', 'OSIS MTs Darussalam adalah wadah kepemimpinan siswa yang aktif, kreatif, dan bertanggung jawab dalam menyelenggarakan kegiatan sekolah serta menumbuhkan jiwa organisasi sejak dini.', '/osis.png', 1, '2025-12-31 22:07:46', '2025-12-31 22:07:46'),
(4, 'OSIS', 'OSIS MTs Darussalam adalah wadah kepemimpinan siswa yang aktif, kreatif, dan bertanggung jawab dalam menyelenggarakan kegiatan sekolah serta menumbuhkan jiwa organisasi sejak dini.', '/osis.png', 1, '2025-12-31 22:15:09', '2025-12-31 22:15:09'),
(5, 'OSIS', 'OSIS MTs Darussalam adalah wadah kepemimpinan siswa yang aktif, kreatif, dan bertanggung jawab dalam menyelenggarakan kegiatan sekolah serta menumbuhkan jiwa organisasi sejak dini.', '/osis.png', 1, '2025-12-31 22:20:44', '2025-12-31 22:20:44'),
(6, 'OSIS', 'OSIS MTs Darussalam adalah wadah kepemimpinan siswa yang aktif, kreatif, dan bertanggung jawab dalam menyelenggarakan kegiatan sekolah serta menumbuhkan jiwa organisasi sejak dini.', '/osis.png', 1, '2025-12-31 22:28:34', '2025-12-31 22:28:34'),
(7, 'OSIS', 'OSIS MTs Darussalam adalah wadah kepemimpinan siswa yang aktif, kreatif, dan bertanggung jawab dalam menyelenggarakan kegiatan sekolah serta menumbuhkan jiwa organisasi sejak dini.', '/osis.png', 1, '2025-12-31 22:35:50', '2025-12-31 22:35:50');

CREATE TABLE "page_sections" (
  "id" integer NOT NULL,
  "page" varchar(100) NOT NULL,
  "section_name" varchar(100) NOT NULL,
  "field_name" varchar(100) NOT NULL,
  "content" text NOT NULL ,
  "updated_at" timestamp NOT NULL DEFAULT current_timestamp
) ;

CREATE TABLE "personal_approach" (
  "id" integer NOT NULL,
  "title" varchar(255) DEFAULT NULL,
  "description" text DEFAULT NULL,
  "points" text DEFAULT NULL ,
  "is_active" smallint DEFAULT 1,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT current_timestamp,
  "image" varchar(500) DEFAULT NULL
) ;

INSERT INTO "personal_approach" ("id", "title", "description", "points", "is_active", "created_at", "updated_at", "image") VALUES
(1, 'Pendekatan Personal untuk Setiap Siswa', 'Guru di MTs Darussalam memberikan perhatian khusus kepada setiap siswa melalui bimbingan pribadi.', '[{\"icon\":\"HeartHandshake\",\"title\":\"Bimbingan Pribadi\",\"description\":\"Guru memberikan perhatian khusus kepada setiap siswa melalui bimbingan pribadi\"},{\"icon\":\"BookOpen\",\"title\":\"Perkembangan Akademik\",\"description\":\"Membantu perkembangan akademik siswa secara menyeluruh\"},{\"icon\":\"Star\",\"title\":\"Perkembangan Karakter\",\"description\":\"Membangun karakter siswa yang berkualitas dan berintegritas\"}]', 1, '2025-12-31 21:50:24', '2025-12-31 15:05:44', '/uploads/1767222343220-plcqo8bw74.png'),
(2, 'Pendekatan Personal untuk Setiap Siswa', 'Guru di MTs Darussalam memberikan perhatian khusus kepada setiap siswa melalui bimbingan pribadi.', '[{\"icon\":\"HeartHandshake\",\"title\":\"Bimbingan Pribadi\",\"description\":\"Guru memberikan perhatian khusus kepada setiap siswa melalui bimbingan pribadi\"},{\"icon\":\"BookOpen\",\"title\":\"Perkembangan Akademik\",\"description\":\"Membantu perkembangan akademik siswa secara menyeluruh\"},{\"icon\":\"Star\",\"title\":\"Perkembangan Karakter\",\"description\":\"Membangun karakter siswa yang berkualitas dan berintegritas\"}]', 1, '2025-12-31 22:07:46', '2025-12-31 22:07:46', '/Guru.png'),
(3, 'Pendekatan Personal untuk Setiap Siswa', 'Guru di MTs Darussalam memberikan perhatian khusus kepada setiap siswa melalui bimbingan pribadi.', '[{\"icon\":\"HeartHandshake\",\"title\":\"Bimbingan Pribadi\",\"description\":\"Guru memberikan perhatian khusus kepada setiap siswa melalui bimbingan pribadi\"},{\"icon\":\"BookOpen\",\"title\":\"Perkembangan Akademik\",\"description\":\"Membantu perkembangan akademik siswa secara menyeluruh\"},{\"icon\":\"Star\",\"title\":\"Perkembangan Karakter\",\"description\":\"Membangun karakter siswa yang berkualitas dan berintegritas\"}]', 1, '2025-12-31 22:15:09', '2025-12-31 22:15:09', '/Guru.png'),
(4, 'Pendekatan Personal untuk Setiap Siswa', 'Guru di MTs Darussalam memberikan perhatian khusus kepada setiap siswa melalui bimbingan pribadi.', '[{\"icon\":\"HeartHandshake\",\"title\":\"Bimbingan Pribadi\",\"description\":\"Guru memberikan perhatian khusus kepada setiap siswa melalui bimbingan pribadi\"},{\"icon\":\"BookOpen\",\"title\":\"Perkembangan Akademik\",\"description\":\"Membantu perkembangan akademik siswa secara menyeluruh\"},{\"icon\":\"Star\",\"title\":\"Perkembangan Karakter\",\"description\":\"Membangun karakter siswa yang berkualitas dan berintegritas\"}]', 1, '2025-12-31 22:20:44', '2025-12-31 22:20:44', '/Guru.png'),
(5, 'Pendekatan Personal untuk Setiap Siswa', 'Guru di MTs Darussalam memberikan perhatian khusus kepada setiap siswa melalui bimbingan pribadi.', '[{\"icon\":\"HeartHandshake\",\"title\":\"Bimbingan Pribadi\",\"description\":\"Guru memberikan perhatian khusus kepada setiap siswa melalui bimbingan pribadi\"},{\"icon\":\"BookOpen\",\"title\":\"Perkembangan Akademik\",\"description\":\"Membantu perkembangan akademik siswa secara menyeluruh\"},{\"icon\":\"Star\",\"title\":\"Perkembangan Karakter\",\"description\":\"Membangun karakter siswa yang berkualitas dan berintegritas\"}]', 1, '2025-12-31 22:28:34', '2025-12-31 22:28:34', '/Guru.png'),
(6, 'Pendekatan Personal untuk Setiap Siswa', 'Guru di MTs Darussalam memberikan perhatian khusus kepada setiap siswa melalui bimbingan pribadi.', '[{\"icon\":\"HeartHandshake\",\"title\":\"Bimbingan Pribadi\",\"description\":\"Guru memberikan perhatian khusus kepada setiap siswa melalui bimbingan pribadi\"},{\"icon\":\"BookOpen\",\"title\":\"Perkembangan Akademik\",\"description\":\"Membantu perkembangan akademik siswa secara menyeluruh\"},{\"icon\":\"Star\",\"title\":\"Perkembangan Karakter\",\"description\":\"Membangun karakter siswa yang berkualitas dan berintegritas\"}]', 1, '2025-12-31 22:35:50', '2025-12-31 22:35:50', '/Guru.png');

CREATE TABLE "principal_welcome" (
  "id" integer NOT NULL,
  "title" varchar(255) DEFAULT NULL,
  "message" text DEFAULT NULL,
  "signature" varchar(255) DEFAULT NULL,
  "image" varchar(500) DEFAULT NULL,
  "is_active" smallint DEFAULT 1,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT current_timestamp
) ;

CREATE TABLE "school_information" (
  "id" integer NOT NULL,
  "name" varchar(255) NOT NULL,
  "description" text DEFAULT NULL,
  "principal_name" varchar(255) DEFAULT NULL,
  "principal_title" varchar(255) DEFAULT NULL,
  "principal_image" varchar(500) DEFAULT NULL,
  "vision" text DEFAULT NULL,
  "mission" text DEFAULT NULL,
  "address" text DEFAULT NULL,
  "email" varchar(255) DEFAULT NULL,
  "phone" varchar(50) DEFAULT NULL,
  "whatsapp_registration" varchar(50) DEFAULT NULL,
  "operating_hours" text DEFAULT NULL ,
  "social_media" text DEFAULT NULL ,
  "youtube_video_url" varchar(500) DEFAULT NULL,
  "total_students" integer DEFAULT 190,
  "average_applicants_per_year" integer DEFAULT 63,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT current_timestamp,
  "hero_image" varchar(500) DEFAULT NULL
) ;

INSERT INTO "school_information" ("id", "name", "description", "principal_name", "principal_title", "principal_image", "vision", "mission", "address", "email", "phone", "whatsapp_registration", "operating_hours", "social_media", "youtube_video_url", "total_students", "average_applicants_per_year", "created_at", "updated_at", "hero_image") VALUES
(1, 'MTs Darussalam', 'MTs Darussalam adalah sekolah Islam setingkat SMP yang siap membimbing kamu dengan metode pembelajaran modern dan islami', 'Drs. H. Muchtar', 'Kepala Sekolah', '/Muhktar.png', 'Menjadi lembaga pendidikan Islam yang unggul, berkarakter, dan berdaya saing global.', 'Menyelenggarakan pendidikan Islam yang berkualitas, membentuk siswa yang beriman, bertakwa, berakhlak mulia, dan mampu bersaing di era global.', 'Jln. Dr. Samratulangi\nKabupaten Kepulauan Yapen, Yapen Selatan, Serui', 'Badryansah99@gmail.com', '+62 13-8217-5517', '6281354155066', '{\"weekdays\":\"07:00 - 17:00 WIT\",\"saturday\":\"07:00 - 17:00 WIT\"}', '{\"facebook\":\"\",\"instagram\":\"\",\"youtube\":\"\"}', 'https://youtu.be/84rxYQ-JbS4', 170, 30, '2025-12-30 21:43:24', '2025-12-31 15:42:59', '/uploads/1767216937856-plibjrr7m6l.png'),
(7, 'MTs Darussalam', 'MTs Darussalam adalah sekolah Islam setingkat SMP yang siap membimbing kamu dengan metode pembelajaran modern dan islami', 'Drs. H. Muchtar', 'Kepala Sekolah', '/Muhktar.png', 'Menjadi lembaga pendidikan Islam yang unggul, berkarakter, dan berdaya saing global.', '1. Menyelenggarakan pendidikan berkualitas yang mengintegrasikan ilmu pengetahuan umum dan agama Islam.\n2. Membentuk karakter siswa yang berakhlak mulia dan berwawasan luas.\n3. Mengembangkan potensi siswa melalui kegiatan ekstrakurikuler yang bervariasi.', 'Jln. Dr. Samratulangi\nKabupaten Kepulauan Yapen, Yapen Selatan, Serui', 'info@mtsdarussalam.sch.id', '+62 13-8217-5517', '6281354155066', '{\"weekdays\":\"07:00 - 14:00 WIT\",\"saturday\":\"07:00 - 12:00 WIT\"}', '{\"facebook\":\"https://facebook.com/mtsdarussalam\",\"instagram\":\"https://instagram.com/mtsdarussalam\",\"youtube\":\"https://youtube.com/@mtsdarussalam\"}', 'https://youtu.be/84rxYQ-JbS4', 190, 63, '2025-12-31 20:44:05', '2025-12-31 20:44:05', NULL),
(8, 'MTs Darussalam', 'MTs Darussalam adalah sekolah Islam setingkat SMP yang siap membimbing kamu dengan metode pembelajaran modern dan islami', 'Drs. H. Muchtar', 'Kepala Sekolah', '/Muhktar.png', 'Menjadi lembaga pendidikan Islam yang unggul, berkarakter, dan berdaya saing global.', '1. Menyelenggarakan pendidikan berkualitas yang mengintegrasikan ilmu pengetahuan umum dan agama Islam.\n2. Membentuk karakter siswa yang berakhlak mulia dan berwawasan luas.\n3. Mengembangkan potensi siswa melalui kegiatan ekstrakurikuler yang bervariasi.', 'Jln. Dr. Samratulangi\nKabupaten Kepulauan Yapen, Yapen Selatan, Serui', 'info@mtsdarussalam.sch.id', '+62 13-8217-5517', '6281354155066', '{\"weekdays\":\"07:00 - 14:00 WIT\",\"saturday\":\"07:00 - 12:00 WIT\"}', '{\"facebook\":\"https://facebook.com/mtsdarussalam\",\"instagram\":\"https://instagram.com/mtsdarussalam\",\"youtube\":\"https://youtube.com/@mtsdarussalam\"}', 'https://youtu.be/84rxYQ-JbS4', 190, 63, '2025-12-31 21:45:24', '2025-12-31 21:45:24', NULL),
(9, 'MTs Darussalam', 'MTs Darussalam adalah sekolah Islam setingkat SMP yang siap membimbing kamu dengan metode pembelajaran modern dan islami', 'Drs. H. Muchtar', 'Kepala Sekolah', '/Muhktar.png', 'Menjadi lembaga pendidikan Islam yang unggul, berkarakter, dan berdaya saing global.', '1. Menyelenggarakan pendidikan berkualitas yang mengintegrasikan ilmu pengetahuan umum dan agama Islam.\n2. Membentuk karakter siswa yang berakhlak mulia dan berwawasan luas.\n3. Mengembangkan potensi siswa melalui kegiatan ekstrakurikuler yang bervariasi.', 'Jln. Dr. Samratulangi\nKabupaten Kepulauan Yapen, Yapen Selatan, Serui', 'info@mtsdarussalam.sch.id', '+62 13-8217-5517', '6281354155066', '{\"weekdays\":\"07:00 - 14:00 WIT\",\"saturday\":\"07:00 - 12:00 WIT\"}', '{\"facebook\":\"https://facebook.com/mtsdarussalam\",\"instagram\":\"https://instagram.com/mtsdarussalam\",\"youtube\":\"https://youtube.com/@mtsdarussalam\"}', 'https://youtu.be/84rxYQ-JbS4', 190, 63, '2025-12-31 21:50:24', '2025-12-31 21:50:24', NULL),
(10, 'MTs Darussalam', 'MTs Darussalam adalah sekolah Islam setingkat SMP yang siap membimbing kamu dengan metode pembelajaran modern dan islami', 'Drs. H. Muchtar', 'Kepala Sekolah', '/Muhktar.png', 'Menjadi lembaga pendidikan Islam yang unggul, berkarakter, dan berdaya saing global.', '1. Menyelenggarakan pendidikan berkualitas yang mengintegrasikan ilmu pengetahuan umum dan agama Islam.\n2. Membentuk karakter siswa yang berakhlak mulia dan berwawasan luas.\n3. Mengembangkan potensi siswa melalui kegiatan ekstrakurikuler yang bervariasi.', 'Jln. Dr. Samratulangi\nKabupaten Kepulauan Yapen, Yapen Selatan, Serui', 'info@mtsdarussalam.sch.id', '+62 13-8217-5517', '6281354155066', '{\"weekdays\":\"07:00 - 14:00 WIT\",\"saturday\":\"07:00 - 12:00 WIT\"}', '{\"facebook\":\"https://facebook.com/mtsdarussalam\",\"instagram\":\"https://instagram.com/mtsdarussalam\",\"youtube\":\"https://youtube.com/@mtsdarussalam\"}', 'https://youtu.be/84rxYQ-JbS4', 190, 63, '2025-12-31 22:07:46', '2025-12-31 22:07:46', NULL),
(11, 'MTs Darussalam', 'MTs Darussalam adalah sekolah Islam setingkat SMP yang siap membimbing kamu dengan metode pembelajaran modern dan islami', 'Drs. H. Muchtar', 'Kepala Sekolah', '/Muhktar.png', 'Menjadi lembaga pendidikan Islam yang unggul, berkarakter, dan berdaya saing global.', '1. Menyelenggarakan pendidikan berkualitas yang mengintegrasikan ilmu pengetahuan umum dan agama Islam.\n2. Membentuk karakter siswa yang berakhlak mulia dan berwawasan luas.\n3. Mengembangkan potensi siswa melalui kegiatan ekstrakurikuler yang bervariasi.', 'Jln. Dr. Samratulangi\nKabupaten Kepulauan Yapen, Yapen Selatan, Serui', 'info@mtsdarussalam.sch.id', '+62 13-8217-5517', '6281354155066', '{\"weekdays\":\"07:00 - 14:00 WIT\",\"saturday\":\"07:00 - 12:00 WIT\"}', '{\"facebook\":\"https://facebook.com/mtsdarussalam\",\"instagram\":\"https://instagram.com/mtsdarussalam\",\"youtube\":\"https://youtube.com/@mtsdarussalam\"}', 'https://youtu.be/84rxYQ-JbS4', 190, 63, '2025-12-31 22:15:09', '2025-12-31 22:15:09', NULL),
(12, 'MTs Darussalam', 'MTs Darussalam adalah sekolah Islam setingkat SMP yang siap membimbing kamu dengan metode pembelajaran modern dan islami', 'Drs. H. Muchtar', 'Kepala Sekolah', '/Muhktar.png', 'Menjadi lembaga pendidikan Islam yang unggul, berkarakter, dan berdaya saing global.', '1. Menyelenggarakan pendidikan berkualitas yang mengintegrasikan ilmu pengetahuan umum dan agama Islam.\n2. Membentuk karakter siswa yang berakhlak mulia dan berwawasan luas.\n3. Mengembangkan potensi siswa melalui kegiatan ekstrakurikuler yang bervariasi.', 'Jln. Dr. Samratulangi\nKabupaten Kepulauan Yapen, Yapen Selatan, Serui', 'info@mtsdarussalam.sch.id', '+62 13-8217-5517', '6281354155066', '{\"weekdays\":\"07:00 - 14:00 WIT\",\"saturday\":\"07:00 - 12:00 WIT\"}', '{\"facebook\":\"https://facebook.com/mtsdarussalam\",\"instagram\":\"https://instagram.com/mtsdarussalam\",\"youtube\":\"https://youtube.com/@mtsdarussalam\"}', 'https://youtu.be/84rxYQ-JbS4', 190, 63, '2025-12-31 22:20:44', '2025-12-31 22:20:44', NULL),
(13, 'MTs Darussalam', 'MTs Darussalam adalah sekolah Islam setingkat SMP yang siap membimbing kamu dengan metode pembelajaran modern dan islami', 'Drs. H. Muchtar', 'Kepala Sekolah', '/Muhktar.png', 'Menjadi lembaga pendidikan Islam yang unggul, berkarakter, dan berdaya saing global.', '1. Menyelenggarakan pendidikan berkualitas yang mengintegrasikan ilmu pengetahuan umum dan agama Islam.\n2. Membentuk karakter siswa yang berakhlak mulia dan berwawasan luas.\n3. Mengembangkan potensi siswa melalui kegiatan ekstrakurikuler yang bervariasi.', 'Jln. Dr. Samratulangi\nKabupaten Kepulauan Yapen, Yapen Selatan, Serui', 'info@mtsdarussalam.sch.id', '+62 13-8217-5517', '6281354155066', '{\"weekdays\":\"07:00 - 14:00 WIT\",\"saturday\":\"07:00 - 12:00 WIT\"}', '{\"facebook\":\"https://facebook.com/mtsdarussalam\",\"instagram\":\"https://instagram.com/mtsdarussalam\",\"youtube\":\"https://youtube.com/@mtsdarussalam\"}', 'https://youtu.be/84rxYQ-JbS4', 190, 63, '2025-12-31 22:28:34', '2025-12-31 22:28:34', NULL),
(14, 'MTs Darussalam', 'MTs Darussalam adalah sekolah Islam setingkat SMP yang siap membimbing kamu dengan metode pembelajaran modern dan islami', 'Drs. H. Muchtar', 'Kepala Sekolah', '/Muhktar.png', 'Menjadi lembaga pendidikan Islam yang unggul, berkarakter, dan berdaya saing global.', '1. Menyelenggarakan pendidikan berkualitas yang mengintegrasikan ilmu pengetahuan umum dan agama Islam.\n2. Membentuk karakter siswa yang berakhlak mulia dan berwawasan luas.\n3. Mengembangkan potensi siswa melalui kegiatan ekstrakurikuler yang bervariasi.', 'Jln. Dr. Samratulangi\nKabupaten Kepulauan Yapen, Yapen Selatan, Serui', 'info@mtsdarussalam.sch.id', '+62 13-8217-5517', '6281354155066', '{\"weekdays\":\"07:00 - 14:00 WIT\",\"saturday\":\"07:00 - 12:00 WIT\"}', '{\"facebook\":\"https://facebook.com/mtsdarussalam\",\"instagram\":\"https://instagram.com/mtsdarussalam\",\"youtube\":\"https://youtube.com/@mtsdarussalam\"}', 'https://youtu.be/84rxYQ-JbS4', 190, 63, '2025-12-31 22:35:50', '2025-12-31 22:35:50', NULL);

CREATE TABLE "sessions" (
  "id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "token" varchar(500) NOT NULL,
  "expires_at" timestamp NOT NULL DEFAULT current_timestamp,
  "created_at" timestamp NOT NULL DEFAULT now()
) ;

INSERT INTO "sessions" ("id", "user_id", "token", "expires_at", "created_at") VALUES
(1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzIwMjgsImV4cCI6MTc2NzczNjgyOH0.6jMuT244gNfEJhM-RFJu0NMhLErv1g0uBr1J9FL9OoE', '2026-01-06 14:00:28', '2025-12-30 22:00:28'),
(2, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzIwNjEsImV4cCI6MTc2NzczNjg2MX0.s2AkvYkadz5c33OBLT8iarobBud_tjAuD57LXZ3FBWc', '2026-01-06 14:01:01', '2025-12-30 22:01:01'),
(3, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzIxODgsImV4cCI6MTc2NzczNjk4OH0.nEq4Ys67uQCqiGUEb51vIMB9kXhORBQHbamIqIo4Nno', '2026-01-06 14:03:08', '2025-12-30 22:03:08'),
(4, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzIzNTIsImV4cCI6MTc2NzczNzE1Mn0.I5oqLbu5LzXTWG3aT1JHpo17Ocgeab3Mz5ggunZt1n0', '2026-01-06 14:05:52', '2025-12-30 22:05:52'),
(5, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzIzNTUsImV4cCI6MTc2NzczNzE1NX0.A8gNcg9hUoDypYFv-04VuAlmINBOfd3XHYKZkYt4ens', '2026-01-06 14:05:55', '2025-12-30 22:05:55'),
(6, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI0MTMsImV4cCI6MTc2NzczNzIxM30.Nokryf8QW8SvunZUA5r9Mi6BwiMW92RupaCoi-1wkok', '2026-01-06 14:06:53', '2025-12-30 22:06:53'),
(7, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI0MjAsImV4cCI6MTc2NzczNzIyMH0.FIFcKfVal9m890Hok7Cd4IlnAd4wO_dCVqy7k0UhhLU', '2026-01-06 14:07:00', '2025-12-30 22:07:00'),
(8, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI0NzAsImV4cCI6MTc2NzczNzI3MH0.fEs7lG6PgVuezoOTORPyCHQIyRdYEy2a_XQWeoShDxc', '2026-01-06 14:07:50', '2025-12-30 22:07:50'),
(9, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI1MjMsImV4cCI6MTc2NzczNzMyM30.jcxt_JHh_vnLytKb-ee9trmyiGkjqwThuSkuBukOIN0', '2026-01-06 14:08:43', '2025-12-30 22:08:43'),
(10, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI1MzMsImV4cCI6MTc2NzczNzMzM30.F1OZPWj1z0EDcTLum9uNc5vizLirCUIktBWaAzi75_E', '2026-01-06 14:08:53', '2025-12-30 22:08:53'),
(11, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI1ODMsImV4cCI6MTc2NzczNzM4M30.PJMAvF6uEaRQSqHTAhSlcPXkOLBlWuXBWAKgpaoxlRM', '2026-01-06 14:09:43', '2025-12-30 22:09:43'),
(12, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI2MjYsImV4cCI6MTc2NzczNzQyNn0.Di11_4sVpeygS5oHoP1XL7Oo0j6hqIU63MtTwZI6MnE', '2026-01-06 14:10:26', '2025-12-30 22:10:26'),
(13, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI2MzIsImV4cCI6MTc2NzczNzQzMn0.72aoHFQdwR3nrYq1ORQNsMHG-20UoGtUUW0yz8fGJC8', '2026-01-06 14:10:32', '2025-12-30 22:10:32'),
(14, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI2OTEsImV4cCI6MTc2NzczNzQ5MX0.YfX_hfixifBudCA_raih3xpnGv4baXkXvG4w4x5VWlM', '2026-01-06 14:11:31', '2025-12-30 22:11:31'),
(15, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI3MzQsImV4cCI6MTc2NzczNzUzNH0.91L-KjiDixXX7rHLEgpZaZKKafKW54DgILzfaenycBc', '2026-01-06 14:12:14', '2025-12-30 22:12:14'),
(16, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI3NTgsImV4cCI6MTc2NzczNzU1OH0.pktw-PPDr0FoOaOuj970Ze-8nxzdhI_f85pCZ6KTJfs', '2026-01-06 14:12:38', '2025-12-30 22:12:38'),
(17, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI3ODYsImV4cCI6MTc2NzczNzU4Nn0.49yD6xzn1mFbtSsbP3FCnPPv99AG5TlM0V4Jp_g-dSo', '2026-01-06 14:13:06', '2025-12-30 22:13:06'),
(18, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI3ODgsImV4cCI6MTc2NzczNzU4OH0.4f8dTvJW5WDd1a8dhjhTdPQzzlIQ2-2EIYGRiKNlgnM', '2026-01-06 14:13:08', '2025-12-30 22:13:08'),
(19, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI3OTAsImV4cCI6MTc2NzczNzU5MH0.8lJhO29AiCZpTjnO9Yg9bXJiRWQ5tpNSEw3D8a_1rQI', '2026-01-06 14:13:10', '2025-12-30 22:13:10'),
(20, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI3OTIsImV4cCI6MTc2NzczNzU5Mn0.vhD-WNGPk-8mQWxLA7n_-UA-QCO-XpyA2FHgWJzRHf0', '2026-01-06 14:13:12', '2025-12-30 22:13:12'),
(22, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI4MDEsImV4cCI6MTc2NzczNzYwMX0._9w8eF1n9mwKItLAIvlE05ae-fm98EqZRrsCTLpHpd0', '2026-01-06 14:13:21', '2025-12-30 22:13:21'),
(23, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI4MjEsImV4cCI6MTc2NzczNzYyMX0.YVVtyppbfC9-F836CsHwXNdDEV_s2Sy8oGqGSLTuB-I', '2026-01-06 14:13:41', '2025-12-30 22:13:41'),
(24, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI4MjMsImV4cCI6MTc2NzczNzYyM30.nHjihbQp9PQgrRuMUeZODVJAd37Ro4i581lqO8kfaf0', '2026-01-06 14:13:43', '2025-12-30 22:13:43'),
(25, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI4MjQsImV4cCI6MTc2NzczNzYyNH0._e2QpLx44Pmrhef9DtSC0euC4meKBFscvvXO0RqQXJk', '2026-01-06 14:13:44', '2025-12-30 22:13:44'),
(26, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI4NDAsImV4cCI6MTc2NzczNzY0MH0.-f_7iALN12Qi8NIN1urwU5SM2UA66GfQoAXiZVwdra4', '2026-01-06 14:14:00', '2025-12-30 22:14:00'),
(27, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI4NzQsImV4cCI6MTc2NzczNzY3NH0.YQT2H0CWXzcInrNlchEfiPvMGHawy8WUkVWeOrWaWVw', '2026-01-06 14:14:34', '2025-12-30 22:14:34'),
(28, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI4NzUsImV4cCI6MTc2NzczNzY3NX0.Zt2wMUVhKPhKyj3kRyd7PKsKwJHerBqOttLucZmyrpY', '2026-01-06 14:14:35', '2025-12-30 22:14:35'),
(29, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI4NzYsImV4cCI6MTc2NzczNzY3Nn0.tjOYHv5nGUtUs-siDLekpdGdRWlJvoqReHvUfsCHtzw', '2026-01-06 14:14:36', '2025-12-30 22:14:36'),
(31, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI4NzgsImV4cCI6MTc2NzczNzY3OH0.lzn8oNZ9i62cTEQjwUnS6KuIo-gDMdPm5WA27_6_tKI', '2026-01-06 14:14:38', '2025-12-30 22:14:38'),
(32, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI4OTgsImV4cCI6MTc2NzczNzY5OH0.M0CbNk4KTXDTfaCaHMdqQ1SYJ_xDJmLEoi-QBilX5Mc', '2026-01-06 14:14:58', '2025-12-30 22:14:58'),
(33, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI5NTMsImV4cCI6MTc2NzczNzc1M30.iZxpAwbC-TK3aDZl4Ub3s7D3csNt3G9GjBNRTCldsNM', '2026-01-06 14:15:53', '2025-12-30 22:15:53'),
(34, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzI5NzAsImV4cCI6MTc2NzczNzc3MH0.oH-jqbMQFU2Lg4YBeWqIMdpFEetWZUX9a9yRM4HM6gI', '2026-01-06 14:16:10', '2025-12-30 22:16:10'),
(35, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzMxNTAsImV4cCI6MTc2NzczNzk1MH0.ver3G97iTjxEZ7ZM83gd3uX67FXO62ks7uOI8HHX40o', '2026-01-06 14:19:10', '2025-12-30 22:19:10'),
(36, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzMxNzcsImV4cCI6MTc2NzczNzk3N30.4kB3pw7f72TF1iH69NmsKPJ1M5NYxhLh8ryrOBJTmsM', '2026-01-06 14:19:37', '2025-12-30 22:19:37'),
(37, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxMzMxODcsImV4cCI6MTc2NzczNzk4N30.mXSBHVK7dJmPbxCtgh_7KPP10TwwFQJjxKiEsrhAz7I', '2026-01-06 14:19:47', '2025-12-30 22:19:47'),
(38, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxNzYzNDYsImV4cCI6MTc2Nzc4MTE0Nn0.P1AXKnoiXcTXSamagqg4naVrlUuFy0X7iIa7MHFTibI', '2026-01-07 02:19:06', '2025-12-31 10:19:06'),
(39, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcxNzYzNTIsImV4cCI6MTc2Nzc4MTE1Mn0.td1rR92TcrLELNqhYyY0l1fAW6l8GBCwxmH5R1IeXiE', '2026-01-07 02:19:12', '2025-12-31 10:19:12'),
(43, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcyMTI5ODcsImV4cCI6MTc2NzgxNzc4N30.g2kIy1_AAGM6PyC-JZrLAmUbb6cfqvTsr2T8E_7z-zc', '2026-01-07 12:29:47', '2025-12-31 20:29:47'),
(48, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcyMjIyNTEsImV4cCI6MTc2NzgyNzA1MX0.57pIV3xsls7ecPebvUqUdJzVDE17wJ-pdtwNZdENvjo', '2026-01-07 15:04:11', '2025-12-31 23:04:11'),
(49, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcyMjI5NDIsImV4cCI6MTc2NzgyNzc0Mn0.1iAqJt_rwV0_Xgz9Q-FYmR2UPHhgNLJLFcRcjf0ace4', '2026-01-07 15:15:42', '2025-12-31 23:15:42'),
(55, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjczNzczNjEsImV4cCI6MTc2Nzk4MjE2MX0.FBUi2z_hKerKfM3nQiCoXN2vmk6cwT-CzYSV-8S5Kbs', '2026-01-09 10:09:21', '2026-01-02 18:09:21'),
(57, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Njc0MDEwODgsImV4cCI6MTc2ODAwNTg4OH0.OwqG3HgMkCA1trYABbOgjvnsWQ7b1s3zWDuIlYkSego', '2026-01-09 16:44:48', '2026-01-03 00:44:48'),
(59, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Njc0MDQwMTgsImV4cCI6MTc2ODAwODgxOH0.HOa0vqRXJNhTD8RTy6uZWCqgoNxvUFBUQRyoLvJSkz0', '2026-01-09 17:33:38', '2026-01-03 01:33:38'),
(61, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Njc1NjkxNjUsImV4cCI6MTc2ODE3Mzk2NX0.ESuzrK_NOVWtH-_aCpvJzMd6N50NDIRb23nC1nQPjAA', '2026-01-11 15:26:05', '2026-01-04 23:26:05'),
(62, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXRzZGFydXNzYWxhbS5zY2guaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Njc1NzYxMjcsImV4cCI6MTc2ODE4MDkyN30.7jVrxEpo9FpquDOU6SyDmy4QsoPyDesdpJ7o7QZ_J58', '2026-01-11 17:22:07', '2026-01-05 01:22:07');

CREATE TABLE "testimonials" (
  "id" integer NOT NULL,
  "author_name" varchar(255) NOT NULL,
  "role" varchar(100) DEFAULT NULL,
  "content" text NOT NULL,
  "rating" integer DEFAULT NULL,
  "image_url" varchar(500) DEFAULT NULL,
  "is_approved" smallint DEFAULT 0,
  "is_featured" smallint DEFAULT 0,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT current_timestamp
) ;

CREATE TABLE "users" (
  "id" integer NOT NULL,
  "email" varchar(255) NOT NULL,
  "password_hash" varchar(255) NOT NULL,
  "name" varchar(255) NOT NULL,
  "role" text NOT NULL DEFAULT 'admin',
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT current_timestamp,
  "last_login" timestamp NOT NULL DEFAULT NULL,
  "username" varchar(255) NOT NULL
) ;

INSERT INTO "users" ("id", "email", "password_hash", "name", "role", "created_at", "updated_at", "last_login", "username") VALUES
(1, 'admin@mtsdarussalam.sch.id', '$2b$10$y738w.jg0eZ0yQtkJi/y4O0WviJn7t/nphOrnTW7vwCmohjOB8WQa', 'Super Admin', 'admin', '2025-12-30 21:43:24', '2026-01-05 01:22:07', '2026-01-04 17:22:07', 'GURUHEBAT');

CREATE TABLE "video_section" (
  "id" integer NOT NULL,
  "title" varchar(255) DEFAULT NULL,
  "description" text DEFAULT NULL,
  "video_url" varchar(500) DEFAULT NULL,
  "thumbnail" varchar(500) DEFAULT NULL,
  "is_active" smallint DEFAULT 1,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT current_timestamp
) ;

INSERT INTO "video_section" ("id", "title", "description", "video_url", "thumbnail", "is_active", "created_at", "updated_at") VALUES
(1, 'Video Profil Sekolah', 'Kenali lebih dekat MTs Darussalam melalui video profil kami.', 'https://www.youtube.com/embed/84rxYQ-JbS4', NULL, 1, '2025-12-31 22:20:44', '2025-12-31 22:20:44'),
(2, 'Video Profil Sekolah', 'Kenali lebih dekat MTs Darussalam melalui video profil kami.', 'https://www.youtube.com/embed/84rxYQ-JbS4', NULL, 1, '2025-12-31 22:28:34', '2025-12-31 22:28:34'),
(3, 'Video Profil Sekolah', 'Kenali lebih dekat MTs Darussalam melalui video profil kami.', 'https://www.youtube.com/embed/84rxYQ-JbS4', NULL, 1, '2025-12-31 22:35:50', '2025-12-31 22:35:50');

CREATE TABLE "visi_misi" (
  "id" integer NOT NULL,
  "vision" text DEFAULT NULL,
  "mission" text DEFAULT NULL ,
  "description" text DEFAULT NULL,
  "is_active" smallint DEFAULT 1,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT current_timestamp
) ;

CREATE TABLE "__drizzle_migrations" (
  "id" bigint  NOT NULL,
  "hash" text NOT NULL,
  "created_at" bigint DEFAULT NULL
) ;

INSERT INTO "__drizzle_migrations" ("id", "hash", "created_at") VALUES
(1, '093d728110a3aa6e09a86d2926dd6ec3434ca754fbc3ebd949c106146c5f51f5', 1767130673273),
(2, 'e8f602d8d487523bdc067b47a98dd4ed6595afce2cf082ab10b808b5c898b9e5', 1767212160497);

