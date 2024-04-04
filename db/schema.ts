import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";

export const CourseTable = pgTable("course", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
});
