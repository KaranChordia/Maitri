CREATE TABLE `waitlist_entries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`child_age` text NOT NULL,
	`segment` text NOT NULL,
	`interests` text NOT NULL,
	`story_preference` text NOT NULL,
	`beta_reader_interest` text NOT NULL,
	`school_interest` text NOT NULL,
	`preorder_signal` text NOT NULL,
	`objection` text NOT NULL,
	`source` text DEFAULT 'maitri-sites' NOT NULL,
	`created_at` integer NOT NULL
);
