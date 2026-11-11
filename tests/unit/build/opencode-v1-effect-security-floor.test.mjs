import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const lock = JSON.parse(
  readFileSync(
    new URL("../../../@omniroute/opencode-plugin/package-lock.json", import.meta.url),
    "utf8"
  )
);

// GHSA-chp3-j5qr-2vfr: the Effect v4 cookie validators were fixed in beta.103.
// Include nested copies, so dependency layout changes cannot hide an older copy.
test("the OpenCode v1 toolchain includes the Effect cookie validation fix", () => {
  const suffix = "node_modules/effect";
  const copies = Object.entries(lock.packages).filter(
    ([location]) => location === suffix || location.endsWith(`/${suffix}`)
  );
  assert.ok(copies.length > 0, "the Effect dependency must remain visible to this contract");
  for (const [location, entry] of copies) {
    const match = /^(\d+)\.(\d+)\.(\d+)(?:-beta\.(\d+))?$/.exec(entry.version);
    assert.ok(match, `${location}: review an unsupported version form`);
    const [, major, minor, patch, beta] = match;
    const fixed =
      Number(major) > 4 ||
      (Number(major) === 4 &&
        (Number(minor) > 0 || Number(patch) > 0 || beta === undefined || Number(beta) >= 103));
    assert.ok(fixed, `${location}: ${entry.version} lacks the Effect v4 cookie fix`);
  }
});
