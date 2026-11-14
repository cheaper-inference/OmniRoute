// resolveUnder containment semantics (core/tempfiles.mjs).
import { test } from "node:test";
import assert from "node:assert/strict";
import { join, resolve } from "node:path";
import { resolveUnder } from "../../../../bin/cli/launch/core/tempfiles.mjs";

const ROOT = resolve("/tmp-root-for-test/base");

test("resolveUnder returns the target for safe relative paths", () => {
  assert.equal(resolveUnder(ROOT, "a/b.txt"), join(ROOT, "a", "b.txt"));
  assert.equal(resolveUnder(ROOT, "./a..b"), join(ROOT, "a..b"));
});

test("resolveUnder rejects bad roots", () => {
  for (const root of ["", undefined, 5]) {
    assert.throws(() => resolveUnder(root as never, "a"), /root directory is not available/);
  }
});

test("resolveUnder rejects empty, non-string, absolute, drive and dotdot paths", () => {
  for (const rel of ["", undefined, "/etc/passwd", "C:foo", "a/../b", "..\\x", "a\\..\\b", ".."]) {
    assert.throws(() => resolveUnder(ROOT, rel as never), /invalid temp file path/);
  }
});

test("resolveUnder rejects a path that resolves to the root itself", () => {
  assert.throws(() => resolveUnder(ROOT, "."), /escapes its root/);
  assert.throws(() => resolveUnder(ROOT, "a/.."), /invalid temp file path/);
});
