CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`author_name` varchar(255) NOT NULL,
	`role` varchar(100),
	`content` text NOT NULL,
	`rating` int DEFAULT 5 NOT NULL,
	`image_url` varchar(500),
	`is_approved` boolean DEFAULT false NOT NULL,
	`is_featured` boolean DEFAULT false NOT NULL,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `is_approved_idx` ON `testimonials` (`is_approved`);
--> statement-breakpoint
CREATE INDEX `is_featured_idx` ON `testimonials` (`is_featured`);
