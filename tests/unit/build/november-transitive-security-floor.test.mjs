import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const lock = JSON.parse(
  readFileSync(new URL("../../../package-lock.json", import.meta.url), "utf8")
);

// Security floors for the supported dependency lines, including nested copies.
// GHSA-474x-hrwr-fgx4: malformed stop-node XML can cause quadratic parsing.
// Mongoose 9.11.4 fixes GHSA-6972-9mcm-vhwj, GHSA-8332-j7wj-wjw4,
// GHSA-gg4r-jv3p-qx3c, GHSA-pcrw-h46h-c93h and GHSA-wr5m-5jph-8m96.
for (const [name, floor] of [
  ["fast-xml-parser", [5, 12, 0]],
  ["mongoose", [9, 11, 4]],
]) {
  test(`every locked ${name} copy includes the November security fixes`, () => {
    const suffix = `node_modules/${name}`;
    const copies = Object.entries(lock.packages).filter(
      ([location]) => location === suffix || location.endsWith(`/${suffix}`)
    );
    assert.ok(copies.length > 0, `${name} must remain visible to the security contract`);
    for (const [location, entry] of copies) {
      const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(entry.version);
      assert.ok(match, `${location}: a stable resolved version is required`);
      const actual = match.slice(1).map(Number);
      const firstDifference = actual.findIndex((part, index) => part !== floor[index]);
      assert.ok(
        firstDifference === -1 || actual[firstDifference] > floor[firstDifference],
        `${location}: ${entry.version} is below the fixed version ${floor.join(".")}`
      );
    }
  });
}
