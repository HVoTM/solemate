/*
 * Data layer — currently serves mock data from src/data/*.json.
 * Pages only call `api.*`, so switching to a real backend later means changing
 * this file only (e.g. `listMeasurements: () => fetch("/api/measurements").then((r) => r.json())`).
 */
import measurements from "@/data/measurements.json";

export type Measurement = { id: number; label: string; value: number; createdAt: string };

export const api = {
  listMeasurements: async (): Promise<Measurement[]> => measurements,
};
