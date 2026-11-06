import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// F4 (KEA-7886, lote 6 pendência 18): four Playwright specs navigated to the absolute
// http://localhost:20128/... and failed with ERR_CONNECTION_REFUSED whenever the suite ran
// against another port (DASHBOARD_PORT/PORT feed playwright.config.ts baseURL). Specs navigate
// with paths so page.goto/request.get resolve against the configured baseURL.
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const E2E = path.join(ROOT, "tests/e2e");

test("Playwright specs do not hard-code the dashboard origin", () => {
  const offenders: string[] = [];
  for (const name of fs.readdirSync(E2E)) {
    if (!name.endsWith(".spec.ts")) continue;
    fs.readFileSync(path.join(E2E, name), "utf8")
      .split("\n")
      .forEach((line, i) => {
        if (/^\s*(\/\/|\*|\/\*)/.test(line)) return; // comments may mention the default port
        if (/["'`]https?:\/\/(localhost|127\.0\.0\.1):\d+/.test(line))
          offenders.push(`tests/e2e/${name}:${i + 1}`);
      });
  }
  assert.deepEqual(offenders, []);
});
