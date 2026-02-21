import { pgTable, varchar, text, integer, timestamp, boolean, numeric, jsonb, index, uniqueIndex } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  role: text('role').notNull().default('admin'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  lastLogin: timestamp('last_login'),
}, (table) => ({
  emailIdx: uniqueIndex('email_idx').on(table.email),
  usernameIdx: uniqueIndex('username_idx').on(table.username),
}));

export const sessions = pgTable('sessions', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 500 }).notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index('user_id_idx').on(table.userId),
  tokenIdx: uniqueIndex('token_idx').on(table.token),
}));

export const auditLogs = pgTable('audit_logs', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  actorUserId: integer('actor_user_id'),
  action: varchar('action', { length: 120 }).notNull(),
  module: varchar('module', { length: 120 }).notNull(),
  targetType: varchar('target_type', { length: 120 }),
  targetId: varchar('target_id', { length: 120 }),
  details: jsonb('details').$type<Record<string, unknown> | null>(),
  ipAddress: varchar('ip_address', { length: 100 }),
  userAgent: varchar('user_agent', { length: 500 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  actionIdx: index('audit_logs_action_idx').on(table.action),
  moduleIdx: index('audit_logs_module_idx').on(table.module),
  actorIdx: index('audit_logs_actor_user_id_idx').on(table.actorUserId),
  createdAtIdx: index('audit_logs_created_at_idx').on(table.createdAt),
}));

export const schoolInformation = pgTable('school_information', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
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
  operatingHours: jsonb('operating_hours').$type<{ weekdays: string; saturday: string }>(),
  socialMedia: jsonb('social_media').$type<{ facebook?: string; instagram?: string; youtube?: string }>(),
  youtubeVideoUrl: varchar('youtube_video_url', { length: 500 }),
  totalStudents: integer('total_students').default(190),
  averageApplicantsPerYear: integer('average_applicants_per_year').default(63),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const ekstrakurikuler = pgTable('ekstrakurikuler', {
  id: varchar('id', { length: 50 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  subtitle: varchar('subtitle', { length: 255 }),
  icon: varchar('icon', { length: 50 }),
  color: varchar('color', { length: 50 }),
  description: text('description'),
  features: jsonb('features').$type<Array<{ icon: string; text: string }>>(),
  schedule: jsonb('schedule').$type<Array<{ day: string; time: string }>>(),
  rating: numeric('rating', { precision: 3, scale: 1 }),
  whatsappContact: varchar('whatsapp_contact', { length: 50 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  isActiveIdx: index('is_active_idx').on(table.isActive),
}));

export const organizationPositions = pgTable('organization_positions', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  title: varchar('title', { length: 255 }).notNull(),
  personName: varchar('person_name', { length: 255 }),
  roleCategory: text('role_category'),
  parentPositionId: integer('parent_position_id'),
  sortOrder: integer('sort_order').default(0),
  colorTheme: varchar('color_theme', { length: 100 }),
  backgroundStyle: varchar('background_style', { length: 255 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  roleCategoryIdx: index('role_category_idx').on(table.roleCategory),
  parentIdx: index('parent_idx').on(table.parentPositionId),
}));

export const mataPelajaran = pgTable('mata_pelajaran', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  category: text('category'),
  gradeLevels: jsonb('grade_levels').$type<string[]>(),
  hoursPerWeek: integer('hours_per_week'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  categoryIdx: index('category_idx').on(table.category),
  isActiveIdx: index('is_active_idx').on(table.isActive),
}));

export const testimonials = pgTable('testimonials', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  authorName: varchar('author_name', { length: 255 }).notNull(),
  role: varchar('role', { length: 100 }),
  content: text('content').notNull(),
  rating: integer('rating'),
  imageUrl: varchar('image_url', { length: 500 }),
  isApproved: boolean('is_approved').default(false),
  isFeatured: boolean('is_featured').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  isApprovedIdx: index('is_approved_idx').on(table.isApproved),
  isFeaturedIdx: index('is_featured_idx').on(table.isFeatured),
}));

export const features = pgTable('features', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }),
  category: text('category'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  categoryIdx: index('category_idx').on(table.category),
  isActiveIdx: index('is_active_idx').on(table.isActive),
}));

export const hero = pgTable('hero', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  title: varchar('title', { length: 500 }),
  subtitle: text('subtitle'),
  backgroundImage: varchar('background_image', { length: 500 }),
  ctaText: varchar('cta_text', { length: 100 }),
  ctaLink: varchar('cta_link', { length: 500 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const visiMisi = pgTable('visi_misi', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  vision: text('vision'),
  mission: jsonb('mission').$type<string[]>(),
  description: text('description'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const environmentFeatures = pgTable('environment_features', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  title: varchar('title', { length: 255 }),
  description: text('description'),
  image: varchar('image', { length: 500 }),
  features: jsonb('features').$type<Array<{ icon: string; title: string; description: string }>>(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const principalWelcome = pgTable('principal_welcome', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  title: varchar('title', { length: 255 }),
  message: text('message'),
  signature: varchar('signature', { length: 255 }),
  image: varchar('image', { length: 500 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const personalApproach = pgTable('personal_approach', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  title: varchar('title', { length: 255 }),
  description: text('description'),
  image: varchar('image', { length: 500 }),
  points: jsonb('points').$type<Array<{ title: string; description: string; icon: string }>>(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const osis = pgTable('osis', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  title: varchar('title', { length: 255 }),
  description: text('description'),
  image: varchar('image', { length: 500 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const guruDanStaf = pgTable('guru_dan_staf', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  nama: varchar('nama', { length: 255 }).notNull(),
  kategori: text('kategori').notNull(),
  jabatan: varchar('jabatan', { length: 255 }).notNull(),
  mataPelajaran: varchar('mata_pelajaran', { length: 255 }),
  kelas: jsonb('kelas').$type<string[]>(),
  jamMengajar: integer('jam_mengajar'),
  totalBebanKerja: numeric('total_beban_kerja', { precision: 5, scale: 2 }),
  sortOrder: integer('sort_order').default(0),
  colorTheme: varchar('color_theme', { length: 100 }),
  backgroundStyle: varchar('background_style', { length: 255 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  kategoriIdx: index('kategori_idx').on(table.kategori),
  isActiveIdx: index('is_active_idx').on(table.isActive),
  sortOrderIdx: index('sort_order_idx').on(table.sortOrder),
}));

export const blogNews = pgTable('blog_news', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  content: text('content').notNull(),
  excerpt: varchar('excerpt', { length: 500 }),
  featuredImage: varchar('featured_image', { length: 500 }),
  category: text('category').notNull(),
  authorId: integer('author_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  isPublished: boolean('is_published').default(false),
  publishedAt: timestamp('published_at'),
  views: integer('views').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  slugIdx: uniqueIndex('slug_idx').on(table.slug),
  categoryIdx: index('category_idx').on(table.category),
  authorIdx: index('author_idx').on(table.authorId),
  isPublishedIdx: index('is_published_idx').on(table.isPublished),
  isActiveIdx: index('is_active_idx').on(table.isActive),
}));
