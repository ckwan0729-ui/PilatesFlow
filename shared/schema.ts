import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const movements = pgTable("movements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(),
  level: text("level").notNull(),
  description: text("description"),
  instructions: text("instructions").array(),
  precautions: text("precautions").array(),
  precautionLevel: text("precaution_level").notNull(),
  duration: text("duration"),
  thumbnailUrl: text("thumbnail_url"),
  isPolestar: integer("is_polestar").default(0),
  // Enhanced fields
  tags: text("tags").array(),
  benefits: text("benefits").array(),
  contraindications: text("contraindications").array(),
  modifications: text("modifications").array(),
  equipment: text("equipment").array(),
  muscleGroups: text("muscle_groups").array(),
  breathingPattern: text("breathing_pattern"),
});

export const classes = pgTable("classes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  date: text("date").notNull(),
  startTime: text("start_time").notNull(),
  duration: integer("duration").notNull(),
  level: text("level").notNull(),
  notes: text("notes"),
  sequence: jsonb("sequence").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMovementSchema = createInsertSchema(movements).omit({
  id: true,
  isPolestar: true,
});

export const insertClassSchema = createInsertSchema(classes).omit({
  id: true,
  createdAt: true,
});

export type InsertMovement = z.infer<typeof insertMovementSchema>;
export type Movement = typeof movements.$inferSelect;
export type InsertClass = z.infer<typeof insertClassSchema>;
export type Class = typeof classes.$inferSelect;
