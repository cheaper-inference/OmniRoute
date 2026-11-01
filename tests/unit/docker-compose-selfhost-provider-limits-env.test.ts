import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const compose = fs.readFileSync(path.join(root, "docker-compose.selfhost.yml"), "utf8");
const lines = compose.split("\n");

/** Active (uncommented) YAML lines only. */
const activeLines = lines.filter((line) => !/^\s*#/.test(line));

test("self-host compose declares PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES in omniroute service environment", () => {
  const envLines = activeLines.filter((line) =>
    line.includes("PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES=${PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES:-70}")
  );
  assert.equal(
    envLines.length,
    1,
    "omniroute service must declare PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES with default fallback 70"
  );
  assert.equal(
    envLines[0].trim(),
    "- PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES=${PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES:-70}"
  );
});
