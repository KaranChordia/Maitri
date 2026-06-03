import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const waitlistEntries = sqliteTable("waitlist_entries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  childAge: text("child_age").notNull(),
  segment: text("segment").notNull(),
  interests: text("interests").notNull(),
  storyPreference: text("story_preference").notNull(),
  betaReaderInterest: text("beta_reader_interest").notNull(),
  schoolInterest: text("school_interest").notNull(),
  preorderSignal: text("preorder_signal").notNull(),
  objection: text("objection").notNull(),
  source: text("source").notNull().default("maitri-sites"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});
