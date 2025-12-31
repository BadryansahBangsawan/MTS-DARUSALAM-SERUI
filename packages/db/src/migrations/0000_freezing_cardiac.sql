CREATE TABLE `ekstrakurikuler` (
	`id` varchar(50) NOT NULL,
	`name` varchar(255) NOT NULL,
	`subtitle` varchar(255),
	`icon` varchar(50),
	`color` varchar(50),
	`description` text,
	`features` json,
	`schedule` json,
	`rating` decimal(3,1),
	`whatsapp_contact` varchar(50),
	`is_active` boolean DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ekstrakurikuler_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `features` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`icon` varchar(50),
	`category` enum('teaching','methodology','student_care'),
	`sort_order` int DEFAULT 0,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `features_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mata_pelajaran` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`category` enum('religious','language','science','social','skills'),
	`grade_levels` json,
	`hours_per_week` int,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `mata_pelajaran_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `organization_positions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`person_name` varchar(255),
	`role_category` enum('supervisory','leadership','staff','teaching','lab_manager'),
	`parent_position_id` int,
	`sort_order` int DEFAULT 0,
	`color_theme` varchar(100),
	`background_style` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `organization_positions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `school_information` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`principal_name` varchar(255),
	`principal_title` varchar(255),
	`principal_image` varchar(500),
	`vision` text,
	`mission` text,
	`address` text,
	`email` varchar(255),
	`phone` varchar(50),
	`whatsapp_registration` varchar(50),
	`operating_hours` json,
	`social_media` json,
	`youtube_video_url` varchar(500),
	`total_students` int DEFAULT 190,
	`average_applicants_per_year` int DEFAULT 63,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `school_information_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`token` varchar(500) NOT NULL,
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `sessions_token_unique` UNIQUE(`token`),
	CONSTRAINT `token_idx` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`author_name` varchar(255) NOT NULL,
	`role` varchar(100),
	`content` text NOT NULL,
	`rating` int,
	`image_url` varchar(500),
	`is_approved` boolean DEFAULT false,
	`is_featured` boolean DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`role` enum('admin','staff') NOT NULL DEFAULT 'admin',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`last_login` timestamp,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `email_idx` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `is_active_idx` ON `ekstrakurikuler` (`is_active`);--> statement-breakpoint
CREATE INDEX `category_idx` ON `features` (`category`);--> statement-breakpoint
CREATE INDEX `is_active_idx` ON `features` (`is_active`);--> statement-breakpoint
CREATE INDEX `category_idx` ON `mata_pelajaran` (`category`);--> statement-breakpoint
CREATE INDEX `is_active_idx` ON `mata_pelajaran` (`is_active`);--> statement-breakpoint
CREATE INDEX `role_category_idx` ON `organization_positions` (`role_category`);--> statement-breakpoint
CREATE INDEX `parent_idx` ON `organization_positions` (`parent_position_id`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE INDEX `is_approved_idx` ON `testimonials` (`is_approved`);--> statement-breakpoint
CREATE INDEX `is_featured_idx` ON `testimonials` (`is_featured`);