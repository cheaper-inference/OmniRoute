import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import net from "node:net";
import os from "node:os";
import path from "node:path";

import {
  assertPreflight,
  compareVersions,
  evaluatePreflight,
  parseVersion,
  satisfiesRange,
} from "../../../../bin/cli/launch/core/preflight.mjs";

const dirs: string[] = [];
async function tempDir() {
  const dir = await mkdtemp(path.join(os.tmpdir(), "omniroute-preflight-"));
  dirs.push(dir);
  return dir;
}
test.after(async () => {
  for (const dir of dirs) await rm(dir, { recursive: true, force: true });
});

test("parseVersion extracts the first semver or a custom capture", () => {
  assert.equal(parseVersion("v24.16.0\n"), "24.16.0");
  assert.equal(parseVersion("tool 1.2.3 (build 4.5.6)"), "1.2.3");
  assert.equal(parseVersion("no version here"), undefined);
  assert.equal(parseVersion("codex-cli 0.48", "codex-cli (\\d+\\.\\d+)"), "0.48");
  assert.equal(parseVersion("x", "(["), undefined);
});

test("compareVersions table", () => {
  const rows: Array<[string, string, number]> = [
    ["1.2.3", "1.2.3", 0],
    ["1.2.3", "1.2.4", -1],
    ["1.10.0", "1.9.9", 1],
    ["2", "2.0.0", 0],
    ["24.16", "24.15.9", 1],
    ["1.2.3-beta.1", "1.2.3", 0],
    ["v3.0.0", "2.99.99", 1],
    ["0.0.1", "0.1", -1],
  ];
  for (const [a, b, expected] of rows) {
    assert.equal(compareVersions(a, b), expected, `${a} vs ${b}`);
  }
});

const OPENCLAW_RANGE = ">=24.16.0 <25 || >=26.1.0";

test("satisfiesRange table", () => {
  const rows: Array<[string, string, boolean]> = [
    ["24.16.0", ">=24.16", true],
    ["24.15.9", ">=24.16", false],
    ["22.22.2", ">=22.22.2 <23", true],
    ["23.0.0", ">=22.22.2 <23", false],
    ["20.0.0", ">20", false],
    ["20.0.1", ">20", true],
    ["25.0.0", "<=25", true],
    ["25.0.1", "<=25", false],
    ["18.0.0", "=18", true],
    ["18.0.0", "18", true],
    ["18.1.0", "18", false],
    ["garbage", ">=1", false],
    ["1.0.0", "", false],
    ["1.0.0", "~1", false],
    ["24.15.9", OPENCLAW_RANGE, false],
    ["24.16.0", OPENCLAW_RANGE, true],
    ["24.99.0", OPENCLAW_RANGE, true],
    ["25.0.0", OPENCLAW_RANGE, false],
    ["26.0.5", OPENCLAW_RANGE, false],
    ["26.1.0", OPENCLAW_RANGE, true],
    ["27.0.0", OPENCLAW_RANGE, true],
    ["1.0.0", ">=1 ||", false],
    ["1.0.0", "|| >=1", false],
    ["1.0.0", ">=2 || ~1", false],
  ];
  for (const [version, range, expected] of rows) {
    assert.equal(satisfiesRange(version, range), expected, `${version} in ${range}`);
  }
});

test("node-version uses nodeVersion or the binary output", async () => {
  const results = await evaluatePreflight(
    [
      { kind: "node-version", range: ">=22", why: "needs node 22" },
      { kind: "node-version", range: ">=99", why: "needs node 99" },
      { kind: "node-version", range: ">=1", binary: "/fake/node", why: "binary" },
      { kind: "node-version", range: ">=1", binary: "/fake/broken", why: "broken" },
    ],
    {
      nodeVersion: "24.1.0",
      execFile: async (cmd: string, args: string[]) => {
        assert.deepEqual(args, ["--version"]);
        if (cmd === "/fake/node") return "v20.1.2\n";
        return "not a version";
      },
    }
  );
  assert.deepEqual(
    results.map((r) => r.status),
    ["pass", "fail", "pass", "fail"]
  );
  assert.match(results[1].message, /needs node 99/);
  assert.match(results[1].message, /24\.1\.0/);
  assert.match(results[2].message, /20\.1\.2/);
});

test("node-version supports || ranges", async () => {
  const check = { kind: "node-version", range: OPENCLAW_RANGE, why: "openclaw node" };
  const [ok] = await evaluatePreflight([check], { nodeVersion: "26.1.0" });
  const [bad] = await evaluatePreflight([check], { nodeVersion: "25.2.0" });
  assert.equal(ok.status, "pass");
  assert.equal(bad.status, "fail");
  assert.match(bad.message, /25\.2\.0/);
});

test("node-version with a real binary", async () => {
  const [result] = await evaluatePreflight([
    { kind: "node-version", range: ">=18", binary: process.execPath, why: "real node" },
  ]);
  assert.equal(result.status, "pass");
});

test("tool-version: below min fails, unknown warns", async () => {
  const checks = [{ kind: "tool-version", min: "1.5.0", why: "tool too old" }];
  assert.equal((await evaluatePreflight(checks, { toolVersion: "1.5.0" }))[0].status, "pass");
  assert.equal((await evaluatePreflight(checks, { toolVersion: "1.4.9" }))[0].status, "fail");
  assert.equal((await evaluatePreflight(checks, {}))[0].status, "warn");
});

test("env-absent severities and env-equals", async () => {
  const env = { SET_KEY: "x", EMPTY_KEY: "", WANT: "yes" };
  const results = await evaluatePreflight(
    [
      { kind: "env-absent", key: "SET_KEY", why: "e", severity: "error" },
      { kind: "env-absent", key: "SET_KEY", why: "w", severity: "warn" },
      { kind: "env-absent", key: "EMPTY_KEY", why: "empty", severity: "error" },
      { kind: "env-absent", key: "MISSING", why: "missing", severity: "error" },
      { kind: "env-equals", key: "WANT", value: "yes", why: "eq" },
      { kind: "env-equals", key: "WANT", value: "no", why: "neq" },
      { kind: "env-equals", key: "MISSING", value: "no", why: "missing" },
    ],
    { env }
  );
  assert.deepEqual(
    results.map((r) => r.status),
    ["fail", "warn", "pass", "pass", "pass", "fail", "fail"]
  );
});

test("file-json-key warns only when the dotted key exists", async () => {
  const dir = await tempDir();
  const good = path.join(dir, "settings.json");
  const bad = path.join(dir, "bad.json");
  await writeFile(good, JSON.stringify({ security: { auth: { selectedType: "x" } } }));
  await writeFile(bad, "{not json");
  const results = await evaluatePreflight([
    {
      kind: "file-json-key",
      path: good,
      key: "security.auth.selectedType",
      why: "a",
      severity: "warn",
    },
    { kind: "file-json-key", path: good, key: "security.other", why: "b", severity: "warn" },
    { kind: "file-json-key", path: bad, key: "x", why: "c", severity: "warn" },
    {
      kind: "file-json-key",
      path: path.join(dir, "nope.json"),
      key: "x",
      why: "d",
      severity: "warn",
    },
  ]);
  assert.deepEqual(
    results.map((r) => r.status),
    ["warn", "pass", "pass", "pass"]
  );
});

test("port-free with a real bound port", async () => {
  const server = net.createServer();
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  const port = (server.address() as net.AddressInfo).port;
  try {
    const [busy] = await evaluatePreflight([{ kind: "port-free", port, why: "busy port" }]);
    assert.equal(busy.status, "fail");
    assert.match(busy.message, new RegExp(String(port)));
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
  const [free] = await evaluatePreflight([{ kind: "port-free", port, why: "free now" }]);
  assert.equal(free.status, "pass");
});

test("unknown kind fails; assertPreflight throws PreflightFailed or returns warns", async () => {
  const results = await evaluatePreflight(
    [
      { kind: "mystery", why: "odd" } as never,
      { kind: "env-absent", key: "K", why: "warned", severity: "warn" },
    ],
    { env: { K: "1" } }
  );
  assert.equal(results[0].status, "fail");
  assert.match(results[0].message, /unknown preflight check/);
  assert.throws(
    () => assertPreflight(results),
    (error: { code?: string; message?: string }) =>
      error.code === "PreflightFailed" &&
      /1 preflight check\(s\) failed: odd/.test(error.message ?? "")
  );
  assert.deepEqual(assertPreflight([results[1]]), [results[1].message]);
  assert.deepEqual(assertPreflight([]), []);
});
