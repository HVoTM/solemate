import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

// Example table — rename/extend to fit your project's data.
export const measurements = sqliteTable("measurements", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  label: text("label").notNull(),
  value: real("value").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type Measurement = typeof measurements.$inferSelect;
export type NewMeasurement = typeof measurements.$inferInsert;
