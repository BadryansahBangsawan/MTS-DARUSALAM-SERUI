CREATE TABLE `environment_features` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255),
	`description` text,
	`features` json,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `environment_features_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hero` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(500),
	`subtitle` text,
	`background_image` varchar(500),
	`cta_text` varchar(100),
	`cta_link` varchar(500),
	`is_active` boolean DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hero_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `personal_approach` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255),
	`description` text,
	`points` json,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `personal_approach_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `principal_welcome` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255),
	`message` text,
	`signature` varchar(255),
	`image` varchar(500),
	`is_active` boolean DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `principal_welcome_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `video_section` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255),
	`description` text,
	`video_url` varchar(500),
	`thumbnail` varchar(500),
	`is_active` boolean DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `video_section_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `visi_misi` (
	`id` int AUTO_INCREMENT NOT NULL,
	`vision` text,
	`mission` json,
	`description` text,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `visi_misi_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `school_information` ADD `hero_image` varchar(500);