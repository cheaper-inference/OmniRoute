import test from "node:test";
import assert from "node:assert/strict";

const m = await import("../../scripts/check/check-ui-kit-upstream.mjs");

test("latestTag picks the highest vX.Y.Z and the peeled commit of annotated tags", () => {
  const out = [
    "1111111111111111111111111111111111111111\trefs/tags/v0.0.9",
    "2222222222222222222222222222222222222222\trefs/tags/v0.0.76",
    "3333333333333333333333333333333333333333\trefs/tags/v0.0.76^{}",
    "4444444444444444444444444444444444444444\trefs/tags/v0.0.66",
    "5555555555555555555555555555555555555555\trefs/tags/not-a-release",
  ].join("\n");
  assert.deepEqual(m.latestTag(out), {
    version: "0.0.76",
    commit: "3333333333333333333333333333333333333333",
  });
  assert.equal(m.latestTag(""), null);
});

test("compareVersions orders numerically, not lexically", () => {
  assert.equal(m.compareVersions("0.0.76", "0.0.9"), 1);
  assert.equal(m.compareVersions("0.0.66", "0.0.76"), -1);
  assert.equal(m.compareVersions("0.1.0", "0.1.0"), 0);
});

test("pinnedVersion reads UPSTREAM.md, and the vendored kit is not behind the pin it records", async () => {
  const fs = await import("node:fs");
  const md = fs.readFileSync("packages/ui-kit/UPSTREAM.md", "utf8");
  const pinned = m.pinnedVersion(md);
  assert.match(pinned.version, /^\d+\.\d+\.\d+$/);
  assert.match(pinned.commit, /^[0-9a-f]{40}$/);
  const pkg = JSON.parse(fs.readFileSync("packages/ui-kit/package.json", "utf8"));
  assert.equal(pkg.version, pinned.version);
});
