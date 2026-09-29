// Load .env if present (Node >= 20.12). Real env vars take precedence.
try {
  process.loadEnvFile();
} catch {}

export const config = {
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: process.env.DATABASE_URL ?? "file:local.db",
  corsOrigins: (process.env.CORS_ORIGIN ?? "http://localhost:5173").split(",").map((s) => s.trim()),
};
