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
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  description: text("description"),
  maxParticipants: integer("max_participants"),
  // Recurrence fields
  isRecurring: integer("is_recurring").default(0),
  recurrencePattern: text("recurrence_pattern"), // weekly, monthly, etc.
  recurrenceDays: integer("recurrence_days").array(), // [1,3,5] for Mon,Wed,Fri
  recurrenceEndDate: timestamp("recurrence_end_date"),
  // Class details
  instructorId: varchar("instructor_id"),
  level: text("level").notNull(),
  category: text("category").default("Regular"),
  roomLocation: text("room_location"),
  equipment: text("equipment").array(),
  notes: text("notes"),
  sequence: jsonb("sequence").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const templates = pgTable("templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  level: text("level").notNull(),
  duration: integer("duration").notNull(),
  sequence: jsonb("sequence").$type<string[]>(),
  tags: text("tags").array(),
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

export const insertTemplateSchema = createInsertSchema(templates).omit({
  id: true,
  createdAt: true,
});

export type InsertMovement = z.infer<typeof insertMovementSchema>;
export type Movement = typeof movements.$inferSelect;
export type InsertClass = z.infer<typeof insertClassSchema>;
export type Class = typeof classes.$inferSelect;
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type Template = typeof templates.$inferSelect;

// Update the `Class` type to include `duration`.
export interface Class {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  level: string;
  equipment: string[] | null;
  startTime: Date;
  endTime: Date;
  maxParticipants: number | null;
  isRecurring: number | null;
  recurrencePattern: string | null;
  recurrenceDays: number[] | null;
  recurrenceEndDate: Date | null;
  createdAt: Date | null;
  duration?: number; // Added optional duration property
}

// Rename the extended type to avoid conflicts.
export type ExtendedClass = typeof classes.$inferSelect & {
  duration?: number; // Added optional duration property
};
