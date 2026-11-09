import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, test } from "node:test";
const root = fs.mkdtempSync(path.join(os.tmpdir(), "managed-update-"));
process.env.DATA_DIR = root;
process.env.STORAGE_ENCRYPTION_KEY = "synthetic-selection-test";
const { changeManagedCore } = await import("../../src/lib/services/managedProxy/update.ts");
const { readCoreSelection } = await import("../../src/lib/services/managedProxy/selection.ts");
const { encrypt } = await import("../../src/lib/db/encryption.ts");
import type { ActivationDependencies } from "../../src/lib/services/managedProxy/manager.ts";
after(() => fs.rmSync(root, { recursive: true, force: true }));
const selection = { source: "custom" as const, sha256: "b".repeat(64) };
function fixture() {
  const directory = fs.mkdtempSync(path.join(root, "case-"));
  fs.mkdirSync(path.join(directory, "xray"));
  fs.writeFileSync(
    path.join(directory, "xray", "sources.json"),
    JSON.stringify({
      version: 1,
      entries: [
        {
          id: "11111111-1111-4111-8111-111111111111",
          name: "test",
          port: 29999,
          sourceEnc: encrypt(
            "vless://11111111-1111-4111-8111-111111111111@example.invalid:443?security=tls"
          ),
        },
      ],
    })
  );
  fs.writeFileSync(path.join(directory, "xray", "config.json"), "synthetic-config");
  fs.writeFileSync(path.join(directory, "xray", "activation.json"), '{"enabled":true}');
  const calls: string[] = [];
  const deps: ActivationDependencies = {
    install: async (_core, _root, _download, selected) => (selected ? "new" : "old"),
    check: async () => {
      calls.push("check");
    },
    stop: async () => {
      calls.push("stop");
    },
    start: async (_core, binary, _config, listeners) => {
      calls.push(`start-${binary}`);
      assert.equal(listeners[0].port, 29999);
    },
    allocate: async () => {
      throw new Error("must preserve port");
    },
    running: () => true,
  };
  return { directory, deps, calls };
}
test("core replacement validates first, preserves identity, and switches only after readiness", async () => {
  const { directory, deps, calls } = fixture();
  const before = fs.readFileSync(path.join(directory, "xray", "sources.json"), "utf8");
  await changeManagedCore("xray", selection, directory, deps);
  assert.deepEqual(calls, ["check", "stop", "start-new"]);
  assert.deepEqual(readCoreSelection("xray", directory), selection);
  assert.equal(fs.readFileSync(path.join(directory, "xray", "sources.json"), "utf8"), before);
  assert.equal(
    fs.readFileSync(path.join(directory, "xray", "activation.json"), "utf8"),
    '{"enabled":true}'
  );
});
test("failed replacement restores previous binary and leaves source/activation untouched", async () => {
  const { directory, deps, calls } = fixture();
  const start = deps.start;
  deps.start = async (...args) => {
    await start(...args);
    if (args[1] === "new") throw new Error("synthetic failure");
  };
  await assert.rejects(
    changeManagedCore("xray", selection, directory, deps),
    /previous selection was restored/
  );
  assert.deepEqual(calls, ["check", "stop", "start-new", "stop", "start-old"]);
  assert.equal(readCoreSelection("xray", directory), null);
});
test("native validation failure never stops the existing core", async () => {
  const { directory, deps, calls } = fixture();
  deps.check = async () => {
    throw new Error("synthetic validation failure");
  };
  await assert.rejects(changeManagedCore("xray", selection, directory, deps), /validation/);
  assert.deepEqual(calls, []);
  assert.equal(readCoreSelection("xray", directory), null);
});
test("changing a stopped core does not enable it", async () => {
  const { directory, deps, calls } = fixture();
  deps.running = () => false;
  await changeManagedCore("xray", selection, directory, deps);
  assert.deepEqual(calls, ["check"]);
});

test("partial stop failure attempts to restore the prior runtime", async () => {
  const { directory, deps, calls } = fixture();
  let attempts = 0;
  deps.stop = async () => {
    calls.push("stop");
    if (++attempts === 1) throw new Error("synthetic status write failed after stop");
  };
  await assert.rejects(
    changeManagedCore("xray", selection, directory, deps),
    /previous selection was restored/
  );
  assert.deepEqual(calls, ["check", "stop", "stop", "start-old"]);
  assert.equal(readCoreSelection("xray", directory), null);
});
