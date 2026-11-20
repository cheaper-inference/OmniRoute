import { defineConfig } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const STORAGE_STATE = path.join(HERE, ".auth", "admin.json");

export default defineConfig({
  testDir: ".",
  timeout: 60_000,
  retries: 1,
  // Without fullyParallel, the 98 tests from routes.spec.ts (same file) run
  // SERIALIZED in a single worker (~10min); with it, they distribute it among the workers.
  fullyParallel: true,
  workers: 8,
  reporter: [
    ["list"],
    [
      // outputDir ABSOLUTO: o reporter resolve paths relativos contra o CWD do
      // process (not against config) — a relative path escaped the worktree.
      "playwright-ctrf-json-reporter",
      {
        outputDir: path.resolve(HERE, "..", "..", "..", "homolog-report"),
        outputFile: "ui-ctrf.json",
      },
    ],
  ],
  use: {
    baseURL: process.env.HOMOLOG_BASE_URL || "http://192.168.0.15:20128",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "setup", testMatch: /auth\.setup\.ts/ },
    {
      name: "homolog",
      testMatch: /.*\.spec\.ts/,
      dependencies: ["setup"],
      use: { storageState: STORAGE_STATE },
    },
  ],
});
