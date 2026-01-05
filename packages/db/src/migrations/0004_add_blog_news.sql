CREATE TABLE `blog_news` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`excerpt` varchar(500),
	`featured_image` varchar(500),
	`category` enum('berita', 'pengumuman', 'artikel', 'kegiatan') NOT NULL,
	`author_id` int NOT NULL,
	`is_published` boolean DEFAULT false NOT NULL,
	`published_at` timestamp,
	`views` int DEFAULT 0 NOT NULL,
	`is_active` boolean DEFAULT true NOT NULL,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT `blog_news_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_news_author_id_users_id_fk` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `slug_idx` ON `blog_news` (`slug`);
--> statement-breakpoint
CREATE INDEX `category_idx` ON `blog_news` (`category`);
--> statement-breakpoint
CREATE INDEX `author_idx` ON `blog_news` (`author_id`);
--> statement-breakpoint
CREATE INDEX `is_published_idx` ON `blog_news` (`is_published`);
--> statement-breakpoint
CREATE INDEX `is_active_idx` ON `blog_news` (`is_active`);
