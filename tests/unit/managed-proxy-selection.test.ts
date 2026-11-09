import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { after, test } from "node:test";
const root = fs.mkdtempSync(path.join(os.tmpdir(), "managed-selection-"));
process.env.DATA_DIR = root;
const { importCustomBinary, readCoreSelection, writeCoreSelection, verifyCustomBinary } =
  await import("../../src/lib/services/managedProxy/selection.ts");
after(() => fs.rmSync(root, { recursive: true, force: true }));
const bytes = Buffer.from("synthetic test content, never executed");
const hash = createHash("sha256").update(bytes).digest("hex");
const source = path.join(root, "source");
fs.writeFileSync(source, bytes);

test("custom binary is copied, verified independently, and does not select itself", async () => {
  const selected = await importCustomBinary("xray", source, hash, true, root);
  assert.equal(readCoreSelection("xray", root), null);
  assert.equal(selected.source, "custom");
  const executable = await verifyCustomBinary("xray", selected, root);
  assert.notEqual(executable, source);
  assert.deepEqual(fs.readFileSync(executable), bytes);
  writeCoreSelection("xray", selected, root);
  assert.deepEqual(readCoreSelection("xray", root), selected);
  fs.writeFileSync(source, "changed external source");
  assert.deepEqual(fs.readFileSync(await verifyCustomBinary("xray", selected, root)), bytes);
});

test("custom installation requires acknowledgement and the exact expected hash", async () => {
  await assert.rejects(importCustomBinary("xray", source, hash, false, root), /acknowledgement/);
  await assert.rejects(importCustomBinary("xray", source, hash, true, root), /SHA-256/);
});

test("tampering with an imported binary fails closed without consulting official hashes", async () => {
  fs.writeFileSync(source, bytes);
  const selected = await importCustomBinary("singbox", source, hash, true, root);
  const executable = await verifyCustomBinary("singbox", selected, root);
  fs.writeFileSync(executable, "tampered");
  await assert.rejects(verifyCustomBinary("singbox", selected, root), /verification/);
});

test("custom source must be absolute and must not be a symbolic link", async () => {
  await assert.rejects(importCustomBinary("xray", "relative", hash, true, root), /absolute/);
  const link = path.join(root, "source-link");
  fs.symlinkSync(source, link);
  await assert.rejects(importCustomBinary("xray", link, hash, true, root), /regular|link/);
});

test("persisted selection rejects arbitrary URL, traversal and unknown fields", () => {
  assert.throws(() =>
    writeCoreSelection("xray", { source: "custom", sha256: "../../secret" }, root)
  );
  assert.throws(() =>
    writeCoreSelection("xray", { source: "custom", sha256: hash, path: source }, root)
  );
});

test("managed destination ancestors cannot redirect imported binaries through a symlink", async () => {
  const caseRoot = fs.mkdtempSync(path.join(root, "linked-"));
  const outside = fs.mkdtempSync(path.join(root, "outside-"));
  fs.mkdirSync(path.join(caseRoot, "binaries"));
  fs.symlinkSync(outside, path.join(caseRoot, "binaries", "xray"));
  fs.writeFileSync(source, bytes);
  await assert.rejects(importCustomBinary("xray", source, hash, true, caseRoot), /not links/);
  assert.deepEqual(fs.readdirSync(outside), []);
});

test(
  "nonregular custom paths are rejected before opening",
  { skip: process.platform === "win32" },
  async () => {
    const fifo = path.join(root, "nonregular-source");
    execFileSync("mkfifo", [fifo]);
    await assert.rejects(importCustomBinary("xray", fifo, hash, true, root), /regular/);
  }
);
