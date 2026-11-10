import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import {
  ownsFixtureChild,
  sweepFixtureChildren,
} from "../../scripts/test/managed-proxy-fixture-children.mjs";
const record = { pid: 12345, startedAt: "2026-11-10T12:00:00.000Z" };
for (const [platform, inspected] of [
  ["linux", { status: 1, stdout: "" }],
  ["linux", { status: 0, stdout: "unrelated-process" }],
  ["win32", { status: 0, stdout: "" }],
  ["win32", { status: 0, stdout: "managedProxyChild.mjs\n2026-11-10T12:01:00.000Z" }],
] as const) {
  test(`gone or recycled PID on ${platform} never terminates another process (${inspected.stdout})`, async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "fixture-child-"));
    try {
      fs.writeFileSync(path.join(root, "child-12345.json"), JSON.stringify(record));
      await sweepFixtureChildren(
        root,
        {},
        {
          platform,
          exists: () => true,
          inspect: () => inspected,
          terminate: () => {
            throw new Error("must not terminate unrelated process");
          },
        }
      );
      assert.deepEqual(fs.readdirSync(root), []);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
}
test("inspection failures remain blocking rather than being treated as exited", () => {
  assert.throws(
    () => ownsFixtureChild(record, { status: null, error: new Error("unavailable") }, "linux"),
    /inspect/
  );
  assert.throws(() => ownsFixtureChild(record, { status: 2, stdout: "" }, "linux"), /verify/);
});
test("a verified surviving child is terminated but still fails the leak gate", async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "fixture-survivor-"));
  let killed = 0;
  try {
    fs.writeFileSync(path.join(root, "child-12345.json"), JSON.stringify(record));
    await assert.rejects(
      sweepFixtureChildren(
        root,
        {},
        {
          platform: "linux",
          exists: () => true,
          inspect: () => ({ status: 0, stdout: "node managedProxyChild.mjs" }),
          terminate: (pid: number) => {
            assert.equal(pid, record.pid);
            killed++;
          },
          wait: async () => {},
        }
      ),
      /survived test cleanup/
    );
    assert.equal(killed, 1);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
