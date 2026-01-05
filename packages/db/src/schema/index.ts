import { mysqlTable, varchar, text, int, timestamp, boolean, decimal, json, mysqlEnum, index, uniqueIndex } from "drizzle-orm/mysql-core";

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  role: mysqlEnum('role', ['admin', 'staff']).notNull().default('admin'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  lastLogin: timestamp('last_login'),
}, (table) => ({
  emailIdx: uniqueIndex('email_idx').on(table.email),
  usernameIdx: uniqueIndex('username_idx').on(table.username),
}));

export const sessions = mysqlTable('sessions', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 500 }).notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index('user_id_idx').on(table.userId),
  tokenIdx: uniqueIndex('token_idx').on(table.token),
}));

export const schoolInformation = mysqlTable('school_information', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  heroImage: varchar('hero_image', { length: 500 }),
  principalName: varchar('principal_name', { length: 255 }),
  principalTitle: varchar('principal_title', { length: 255 }),
  principalImage: varchar('principal_image', { length: 500 }),
  vision: text('vision'),
  mission: text('mission'),
  address: text('address'),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  whatsappRegistration: varchar('whatsapp_registration', { length: 50 }),
  operatingHours: json('operating_hours').$type<{ weekdays: string; saturday: string }>(),
  socialMedia: json('social_media').$type<{ facebook?: string; instagram?: string; youtube?: string }>(),
  youtubeVideoUrl: varchar('youtube_video_url', { length: 500 }),
  totalStudents: int('total_students').default(190),
  averageApplicantsPerYear: int('average_applicants_per_year').default(63),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const ekstrakurikuler = mysqlTable('ekstrakurikuler', {
  id: varchar('id', { length: 50 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  subtitle: varchar('subtitle', { length: 255 }),
  icon: varchar('icon', { length: 50 }),
  color: varchar('color', { length: 50 }),
  description: text('description'),
  features: json('features').$type<Array<{ icon: string; text: string }>>(),
  schedule: json('schedule').$type<Array<{ day: string; time: string }>>(),
  rating: decimal('rating', { precision: 3, scale: 1 }),
  whatsappContact: varchar('whatsapp_contact', { length: 50 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
}, (table) => ({
  isActiveIdx: index('is_active_idx').on(table.isActive),
}));

export const organizationPositions = mysqlTable('organization_positions', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  personName: varchar('person_name', { length: 255 }),
  roleCategory: mysqlEnum('role_category', ['supervisory', 'leadership', 'staff', 'teaching', 'lab_manager']),
  parentPositionId: int('parent_position_id'),
  sortOrder: int('sort_order').default(0),
  colorTheme: varchar('color_theme', { length: 100 }),
  backgroundStyle: varchar('background_style', { length: 255 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
}, (table) => ({
  roleCategoryIdx: index('role_category_idx').on(table.roleCategory),
  parentIdx: index('parent_idx').on(table.parentPositionId),
}));

export const mataPelajaran = mysqlTable('mata_pelajaran', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  category: mysqlEnum('category', ['religious', 'language', 'science', 'social', 'skills']),
  gradeLevels: json('grade_levels').$type<string[]>(),
  hoursPerWeek: int('hours_per_week'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
}, (table) => ({
  categoryIdx: index('category_idx').on(table.category),
  isActiveIdx: index('is_active_idx').on(table.isActive),
}));

export const testimonials = mysqlTable('testimonials', {
  id: int('id').primaryKey().autoincrement(),
  authorName: varchar('author_name', { length: 255 }).notNull(),
  role: varchar('role', { length: 100 }),
  content: text('content').notNull(),
  rating: int('rating'),
  imageUrl: varchar('image_url', { length: 500 }),
  isApproved: boolean('is_approved').default(false),
  isFeatured: boolean('is_featured').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
}, (table) => ({
  isApprovedIdx: index('is_approved_idx').on(table.isApproved),
  isFeaturedIdx: index('is_featured_idx').on(table.isFeatured),
}));

export const features = mysqlTable('features', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }),
  category: mysqlEnum('category', ['teaching', 'methodology', 'student_care']),
  sortOrder: int('sort_order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
}, (table) => ({
  categoryIdx: index('category_idx').on(table.category),
  isActiveIdx: index('is_active_idx').on(table.isActive),
}));

export const hero = mysqlTable('hero', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 500 }),
  subtitle: text('subtitle'),
  backgroundImage: varchar('background_image', { length: 500 }),
  ctaText: varchar('cta_text', { length: 100 }),
  ctaLink: varchar('cta_link', { length: 500 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const visiMisi = mysqlTable('visi_misi', {
  id: int('id').primaryKey().autoincrement(),
  vision: text('vision'),
  mission: json('mission').$type<string[]>(),
  description: text('description'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const environmentFeatures = mysqlTable('environment_features', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }),
  description: text('description'),
  image: varchar('image', { length: 500 }),
  features: json('features').$type<Array<{ icon: string; title: string; description: string }>>(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const principalWelcome = mysqlTable('principal_welcome', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }),
  message: text('message'),
  signature: varchar('signature', { length: 255 }),
  image: varchar('image', { length: 500 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const personalApproach = mysqlTable('personal_approach', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }),
  description: text('description'),
  image: varchar('image', { length: 500 }),
  points: json('points').$type<Array<{ title: string; description: string; icon: string }>>(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const osis = mysqlTable('osis', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }),
  description: text('description'),
  image: varchar('image', { length: 500 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const guruDanStaf = mysqlTable('guru_dan_staf', {
  id: int('id').primaryKey().autoincrement(),
  nama: varchar('nama', { length: 255 }).notNull(),
  kategori: mysqlEnum('kategori', ['pimpinan', 'wakamad', 'unit_penunjang', 'pembina_ekstra', 'wali_kelas', 'tenaga_kependidikan']).notNull(),
  jabatan: varchar('jabatan', { length: 255 }).notNull(),
  mataPelajaran: varchar('mata_pelajaran', { length: 255 }),
  kelas: json('kelas').$type<string[]>(),
  jamMengajar: int('jam_mengajar'),
  totalBebanKerja: decimal('total_beban_kerja', { precision: 5, scale: 2 }),
  sortOrder: int('sort_order').default(0),
  colorTheme: varchar('color_theme', { length: 100 }),
  backgroundStyle: varchar('background_style', { length: 255 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
}, (table) => ({
  kategoriIdx: index('kategori_idx').on(table.kategori),
  isActiveIdx: index('is_active_idx').on(table.isActive),
  sortOrderIdx: index('sort_order_idx').on(table.sortOrder),
}));

export const blogNews = mysqlTable('blog_news', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  content: text('content').notNull(),
  excerpt: varchar('excerpt', { length: 500 }),
  featuredImage: varchar('featured_image', { length: 500 }),
  category: mysqlEnum('category', ['berita', 'pengumuman', 'artikel', 'kegiatan']).notNull(),
  authorId: int('author_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  isPublished: boolean('is_published').default(false),
  publishedAt: timestamp('published_at'),
  views: int('views').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
}, (table) => ({
  slugIdx: uniqueIndex('slug_idx').on(table.slug),
  categoryIdx: index('category_idx').on(table.category),
  authorIdx: index('author_idx').on(table.authorId),
  isPublishedIdx: index('is_published_idx').on(table.isPublished),
  isActiveIdx: index('is_active_idx').on(table.isActive),
}));
