import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { createManagedNativeFixture } from "../../scripts/test/managed-proxy-native-fixture.ts";
import { readCoreSelection } from "../../src/lib/services/managedProxy/selection.ts";

test("native fixture selection stays inside the explicit DATA_DIR on every platform", () => {
  const owner = fs.mkdtempSync(path.join(os.tmpdir(), "managed-native-owner-"));
  const dataDir = path.join(owner, "data");
  const previousDataDir = process.env.DATA_DIR;
  let root: string | undefined;
  try {
    process.env.DATA_DIR = dataDir;
    root = createManagedNativeFixture({ CI: "true", DATA_DIR: dataDir });
    const relative = path.relative(dataDir, root);
    assert.ok(relative && !relative.startsWith("..") && !path.isAbsolute(relative));
    for (const core of ["singbox", "xray"] as const) {
      assert.equal(readCoreSelection(core, root), null);
    }
    fs.writeFileSync(path.join(dataDir, "keep.txt"), "outside the owned fixture");
    fs.rmSync(root, { recursive: true, force: true });
    assert.equal(
      fs.readFileSync(path.join(dataDir, "keep.txt"), "utf8"),
      "outside the owned fixture"
    );
  } finally {
    if (previousDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previousDataDir;
    if (root) fs.rmSync(root, { recursive: true, force: true });
    fs.rmSync(owner, { recursive: true, force: true });
  }
});

test("native fixture refuses missing, blank, or relative DATA_DIR and non-CI callers", () => {
  for (const DATA_DIR of [undefined, "", " ", "relative-data"]) {
    assert.throws(() => createManagedNativeFixture({ CI: "true", DATA_DIR }), /absolute DATA_DIR/);
  }
  assert.throws(
    () => createManagedNativeFixture({ CI: "false", DATA_DIR: os.tmpdir() }),
    /only in CI/
  );
});
