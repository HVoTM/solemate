import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq, asc } from "drizzle-orm";
import { db } from "../db/index.js";
import { measurements } from "../db/schema.js";

const measurementInput = z.object({
  label: z.string().min(1).max(200),
  value: z.number().finite(),
});

const idParam = z.object({ id: z.coerce.number().int().positive() });

export const measurementsRoute = new Hono()
  .get("/", async (c) => {
    const rows = await db.select().from(measurements).orderBy(asc(measurements.id));
    return c.json(rows);
  })
  .get("/:id", zValidator("param", idParam), async (c) => {
    const { id } = c.req.valid("param");
    const [row] = await db.select().from(measurements).where(eq(measurements.id, id));
    return row ? c.json(row) : c.json({ error: "Not found" }, 404);
  })
  .post("/", zValidator("json", measurementInput), async (c) => {
    const [row] = await db.insert(measurements).values(c.req.valid("json")).returning();
    return c.json(row, 201);
  })
  .put("/:id", zValidator("param", idParam), zValidator("json", measurementInput.partial()), async (c) => {
    const { id } = c.req.valid("param");
    const [row] = await db
      .update(measurements)
      .set(c.req.valid("json"))
      .where(eq(measurements.id, id))
      .returning();
    return row ? c.json(row) : c.json({ error: "Not found" }, 404);
  })
  .delete("/:id", zValidator("param", idParam), async (c) => {
    const { id } = c.req.valid("param");
    const [row] = await db.delete(measurements).where(eq(measurements.id, id)).returning();
    return row ? c.body(null, 204) : c.json({ error: "Not found" }, 404);
  });
