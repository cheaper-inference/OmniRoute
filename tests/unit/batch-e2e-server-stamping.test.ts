/**
 * The batch E2E suite (tests/integration/batch-e2e-rate-limit.test.ts) seeds a provider node and
 * mints an API key through the management API in open bootstrap mode. That window only stays open
 * for a loopback peer, and locality is derived from the TCP-peer stamp that only the custom server
 * in scripts/dev/run-next.mjs writes. Booted through run-next-playwright.mjs (bare `next dev`), the
 * suite got `401` on `POST /api/provider-nodes` before a single assertion ran. Integration runs
 * only on the release PR, so pin the boot target here where every PR sees it (#11535, #14403).
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import assert from "node:assert/strict";

const here = dirname(fileURLToPath(import.meta.url));
const suiteSource = readFileSync(
  join(here, "..", "integration", "batch-e2e-rate-limit.test.ts"),
  "utf8"
);

test("batch E2E boots the peer-stamped custom server, not the bare next CLI", () => {
  assert.deepEqual(serverLaunchArgs().slice(-2), ["scripts/dev/run-next.mjs", "dev"]);
  assert.doesNotMatch(suiteSource, /spawn\([^)]*run-next-playwright\.mjs/);
});

test("batch E2E pins the loopback host and open bootstrap the management calls rely on", () => {
  assert.match(suiteSource, /HOST: "127\.0\.0\.1"/);
  assert.match(suiteSource, /OMNIROUTE_E2E_BOOTSTRAP_MODE: "open"/);
});

function serverLaunchArgs(): string[] {
  const launch = suiteSource.match(/spawn\(\s*process\.execPath,\s*\[([\s\S]*?)\],\s*\{/);
  assert.ok(launch, "Batch suite must spawn the custom server directly");
  return [...launch[1].matchAll(/"(?:[^"\\]|\\.)*"/g)].map(([literal]) => JSON.parse(literal));
}

test("batch E2E gives the dev server the same heap budget as npm run dev", () => {
  const packageJson = JSON.parse(readFileSync(join(here, "..", "..", "package.json"), "utf8"));
  const heapOption = packageJson.scripts.dev.match(/--max-old-space-size=\d+/)?.[0];
  assert.ok(heapOption, "The canonical dev command must declare its heap budget");
  assert.ok(
    serverLaunchArgs().includes(heapOption),
    "spawn(process.execPath) does not inherit the test runner's V8 flags; preserve the dev server budget"
  );
});
