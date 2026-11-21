import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, test } from "node:test";
const root = fs.mkdtempSync(path.join(os.tmpdir(), "managed-unsaved-"));
process.env.DATA_DIR = root;
const { testManagedSource } = await import("../../src/lib/services/managedProxy/testSource.ts");
import type { SourceTestDependencies } from "../../src/lib/services/managedProxy/testSource.ts";
after(() => fs.rmSync(root, { recursive: true, force: true }));
const source = "vless://11111111-1111-4111-8111-111111111111@example.invalid:443?security=tls";
const calls: string[] = [];
const deps: SourceTestDependencies = {
  install: async () => {
    calls.push("install");
    return "synthetic-never-executed";
  },
  allocate: async () => 25000,
  check: async (_core, _binary, config) => {
    assert.equal(JSON.parse(fs.readFileSync(config, "utf8")).inbounds[0].listen, "127.0.0.1");
    calls.push("check");
  },
  start: async () => {
    calls.push("start");
    return async () => {
      calls.push("stop");
    };
  },
  probe: async () => {
    calls.push("probe");
    return { success: true, publicIp: "203.0.113.1", latencyMs: 2 };
  },
};
test("unsaved probe uses isolated process and removes plaintext without persisting source or assignment", async () => {
  const result = await testManagedSource("xray", source, root, deps);
  assert.equal(result.publicIp, "203.0.113.1");
  assert.deepEqual(calls, ["install", "check", "start", "probe", "stop"]);
  assert.deepEqual(fs.readdirSync(path.join(root, "tests")), []);
  assert.ok(!fs.existsSync(path.join(root, "xray", "sources.json")));
});
test("failed probe still stops only temporary process and cleans plaintext", async () => {
  calls.length = 0;
  await assert.rejects(
    testManagedSource("xray", source, root, {
      ...deps,
      probe: async () => {
        throw new Error(source);
      },
    }),
    /Managed proxy test failed/
  );
  assert.deepEqual(calls, ["install", "check", "start", "stop"]);
  assert.deepEqual(fs.readdirSync(path.join(root, "tests")), []);
});
test("invalid source does not install or start anything", async () => {
  calls.length = 0;
  await assert.rejects(testManagedSource("xray", "not a proxy", root, deps));
  assert.deepEqual(calls, []);
});
