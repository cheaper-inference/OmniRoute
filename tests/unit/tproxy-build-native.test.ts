/**
 * Best-effort build of the TPROXY IP_TRANSPARENT native addon (build 4e/N). It
 * runs at production-build time so assembleStandalone can copy transparent.node
 * into the standalone bundle. IP_TRANSPARENT is Linux-only and a missing toolchain
 * is NOT fatal (the capture mode degrades gracefully), so the decision logic must
 * skip cleanly off-Linux / when sources are absent / when node-gyp fails. All
 * effectful seams (platform/run/exists) are injected.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import {
  buildTproxyNative,
  resolveBundledNodeGyp,
} from "../../scripts/build/build-tproxy-native.mjs";

const ROOT = "/repo";
const NATIVE = path.join(ROOT, "src", "mitm", "tproxy", "native");
const GYP = path.join(NATIVE, "binding.gyp");
const OUT = path.join(NATIVE, "build", "Release", "transparent.node");
const BUNDLED_GYP = "/usr/local/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js";

test("skips (no-op) on non-Linux hosts and runs nothing", () => {
  let ran = false;
  const res = buildTproxyNative(ROOT, {
    platform: "darwin",
    run: () => {
      ran = true;
    },
    exists: () => true,
  });
  assert.equal(res.built, false);
  assert.match(res.reason ?? "", /linux/i);
  assert.equal(ran, false);
});

test("skips when the native sources are absent (binding.gyp missing)", () => {
  let ran = false;
  const res = buildTproxyNative(ROOT, {
    platform: "linux",
    run: () => {
      ran = true;
    },
    exists: (p) => p !== GYP,
  });
  assert.equal(res.built, false);
  assert.match(res.reason ?? "", /sources absent|binding\.gyp/i);
  assert.equal(ran, false);
});

test("builds via npm's bundled node-gyp without `npx --yes` and reports success (#21014)", () => {
  const calls: Array<{ cmd: string; args: string[]; cwd: string }> = [];
  const res = buildTproxyNative(ROOT, {
    platform: "linux",
    nodeGypScript: BUNDLED_GYP,
    run: (cmd, args, cwd) => calls.push({ cmd, args, cwd }),
    exists: (p) => p === GYP || p === OUT,
  });
  assert.equal(res.built, true);
  assert.deepEqual(calls, [{ cmd: process.execPath, args: [BUNDLED_GYP, "rebuild"], cwd: NATIVE }]);
});

test("falls back to local PATH `node-gyp` (never `npx --yes`) when bundled script is absent (#21014)", () => {
  const calls: Array<{ cmd: string; args: string[]; cwd: string }> = [];
  const res = buildTproxyNative(ROOT, {
    platform: "linux",
    nodeGypScript: null,
    run: (cmd, args, cwd) => calls.push({ cmd, args, cwd }),
    exists: (p) => p === GYP || p === OUT,
  });
  assert.equal(res.built, true);
  assert.deepEqual(calls, [{ cmd: "node-gyp", args: ["rebuild"], cwd: NATIVE }]);
});

test("resolveBundledNodeGyp locates node-gyp relative to realpath(npm)", () => {
  const expectedGyp = path.resolve(
    "/opt/node/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js"
  );
  const found = resolveBundledNodeGyp({
    whichNpm: () => "/usr/local/bin/npm",
    realpath: () => "/opt/node/lib/node_modules/npm/bin/npm-cli.js",
    exists: (p) => p === expectedGyp,
  });
  assert.equal(found, expectedGyp);
});

test("a node-gyp / toolchain failure is non-fatal (built:false with a reason)", () => {
  const res = buildTproxyNative(ROOT, {
    platform: "linux",
    nodeGypScript: BUNDLED_GYP,
    run: () => {
      throw new Error("gyp ERR! not found: make");
    },
    exists: (p) => p === GYP,
  });
  assert.equal(res.built, false);
  assert.match(res.reason ?? "", /toolchain|build failed|make/i);
});

test("reports failure when node-gyp produced no transparent.node", () => {
  const res = buildTproxyNative(ROOT, {
    platform: "linux",
    nodeGypScript: BUNDLED_GYP,
    run: () => {},
    exists: (p) => p === GYP, // OUT never appears
  });
  assert.equal(res.built, false);
  assert.match(res.reason ?? "", /no transparent\.node|produced/i);
});
