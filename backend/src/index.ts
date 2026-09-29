import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { config } from "./config.js";
import { measurementsRoute } from "./routes/measurements.js";

const app = new Hono().basePath("/api");

app.use("*", logger());
app.use("*", cors({ origin: config.corsOrigins }));

app.get("/health", (c) => c.json({ status: "ok" }));
app.route("/measurements", measurementsRoute);

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal server error" }, 500);
});

serve({ fetch: app.fetch, port: config.port }, (info) => {
  console.log(`API listening on http://localhost:${info.port}/api`);
});
