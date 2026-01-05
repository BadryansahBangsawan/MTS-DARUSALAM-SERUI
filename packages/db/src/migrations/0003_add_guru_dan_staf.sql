CREATE TABLE `guru_dan_staf` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nama` varchar(255) NOT NULL,
	`kategori` enum('pimpinan', 'wakamad', 'unit_penunjang', 'pembina_ekstra', 'wali_kelas', 'tenaga_kependidikan') NOT NULL,
	`jabatan` varchar(255) NOT NULL,
	`mata_pelajaran` varchar(255),
	`kelas` json,
	`jam_mengajar` int,
	`total_beban_kerja` decimal(5,2),
	`sort_order` int DEFAULT 0 NOT NULL,
	`color_theme` varchar(100),
	`background_style` varchar(255),
	`is_active` boolean DEFAULT true NOT NULL,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT `guru_dan_staf_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `kategori_idx` ON `guru_dan_staf` (`kategori`);
--> statement-breakpoint
CREATE INDEX `is_active_idx` ON `guru_dan_staf` (`is_active`);
--> statement-breakpoint
CREATE INDEX `sort_order_idx` ON `guru_dan_staf` (`sort_order`);
