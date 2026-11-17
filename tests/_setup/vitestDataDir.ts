// Vitest: a throwaway DATA_DIR for the whole run.
//
// The node:test runner gets one from tests/_setup/isolateDataDir.ts, but Vitest never loaded an
// equivalent. Code that resolves its own database path (the MCP audit did: DATA_DIR, else
// ~/.omniroute/storage.sqlite) then wrote into the developer's real database on every
// `npm run test:vitest` (202 audit rows of one test fixture had piled up in a developer's
// database).
//
// Wiring, in both Vitest configs:
// - `test.env: isolatedDataDirEnv()` hands the variables to every worker (a change to
//   process.env inside a global setup does not reach the worker threads);
// - `test.globalSetup: ["./tests/_setup/vitestDataDir.ts"]` removes the directory at the end.
// A DATA_DIR chosen by the caller always wins, and is never removed.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Set only when this file created the directory, so teardown never deletes a caller's DATA_DIR.
const CREATED_KEY = "OMNIROUTE_VITEST_DATA_DIR";

export function isolatedDataDirEnv(): Record<string, string> {
  if (!process.env[CREATED_KEY]) {
    if (process.env.DATA_DIR?.trim()) return {};
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-vitest-"));
    process.env[CREATED_KEY] = dir;
    process.env.DATA_DIR = dir;
  }
  const dir = process.env[CREATED_KEY] as string;
  return {
    DATA_DIR: dir,
    // Same guard as isolateDataDir.ts: the plugin scanner would otherwise read ~/.omniroute/plugins.
    OMNIROUTE_PLUGINS_DIR: process.env.OMNIROUTE_PLUGINS_DIR?.trim() || path.join(dir, "plugins"),
  };
}

export default function setup(): () => void {
  return () => {
    const dir = process.env[CREATED_KEY];
    if (!dir) return;
    try {
      fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    } catch {
      // The OS reaps its temp dir eventually.
    }
  };
}
