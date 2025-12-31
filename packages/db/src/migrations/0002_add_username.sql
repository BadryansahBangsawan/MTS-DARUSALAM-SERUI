ALTER TABLE `users` ADD COLUMN `username` varchar(255) NOT NULL;
--> statement-breakpoint
CREATE UNIQUE INDEX `username_idx` ON `users` (`username`);
