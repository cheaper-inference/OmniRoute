import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// Sync fs in a route handler blocks the Node event loop for every queued
// request. These GET routes read files on the hot dashboard/health paths, so
// they must use node:fs/promises instead.
//
// logs/console and cli-tools/logs are intentionally not listed: they serve a
// bounded tail read (#16301) whose fd-based reader is covered by its own tests.
const ROUTE_FILES = [
  "src/app/api/openapi/spec/route.ts",
  "src/app/api/settings/mitm/route.ts",
  "src/app/api/storage/health/route.ts",
];

const SYNC_FS_CALL = /\w+Sync\s*\(/;

for (const file of ROUTE_FILES) {
  test(`${file}: no synchronous fs calls`, () => {
    const source = fs.readFileSync(path.resolve(process.cwd(), file), "utf8");
    const match = source.match(SYNC_FS_CALL);
    assert.equal(
      match,
      null,
      `${file} still calls \`${match?.[0]}\` — use node:fs/promises so the handler does not block the event loop`
    );
  });
}
