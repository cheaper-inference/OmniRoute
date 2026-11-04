// #14910: the self-host compose file must keep the ./data bind mount as the
// ACTIVE data volume. Switching the default to a named volume would make every
// existing self-host install boot on an empty volume after pulling the new
// compose file (looks like data loss), and bin/snapshot-data.sh /
// bin/restore-data.sh only operate on ./data. The named volume stays available
// as a commented, opt-in alternative for platforms that hit EACCES.
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

test("self-host compose keeps the ./data bind mount as the active /app/data volume", () => {
  const dataMounts = activeLines.filter((line) => /:\/app\/data\s*$/.test(line));
  assert.deepEqual(
    dataMounts.map((line) => line.trim()),
    ["- ./data:/app/data"],
    "exactly one active /app/data mount, and it must be the ./data bind mount"
  );
});

test("the named-volume alternative is documented but stays opt-in (commented)", () => {
  assert.ok(
    lines.some((line) => /^\s*#\s*-\s*omniroute-data:\/app\/data\s*$/.test(line)),
    "the commented omniroute-data alternative must stay discoverable in the compose file"
  );
  assert.ok(
    !activeLines.some((line) => /^\s*omniroute-data:\s*$/.test(line)),
    "the top-level omniroute-data volume must not be declared by default"
  );
});

test("the self-host guide documents the EACCES workaround for /app/data", () => {
  const guide = fs.readFileSync(path.join(root, "docs/getting-started/SELF_HOST_GUIDE.md"), "utf8");
  assert.match(guide, /EACCES: permission denied<\/code> writing to <code>\/app\/data/);
  assert.match(guide, /chown -R 1000:1000 \.\/data/);
  assert.match(guide, /named volume starts \*\*empty\*\*/);
});
