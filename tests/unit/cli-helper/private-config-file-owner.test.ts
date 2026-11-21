import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { writePrivateConfigFile } from "../../../src/lib/cli-helper/privateConfigFile.ts";

function fixture(t: test.TestContext) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "relay-private-config-owner-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  return dir;
}

const skip = process.platform === "win32" || typeof process.geteuid !== "function";

test("a write over a file owned by another uid is refused and names both uids", { skip }, (t) => {
  const dir = fixture(t);
  const target = path.join(dir, "config.json");
  fs.writeFileSync(target, "host-user-data", { mode: 0o600 });
  const owner = fs.statSync(target).uid;
  const caller = owner + 1;
  t.mock.method(process, "geteuid", () => caller);

  assert.throws(
    () => writePrivateConfigFile(target, "container-write"),
    (error: Error) =>
      error.message.includes(`uid ${owner}`) && error.message.includes(`uid ${caller}`)
  );
  assert.equal(fs.readFileSync(target, "utf8"), "host-user-data");
  assert.deepEqual(fs.readdirSync(dir), ["config.json"], "no temporary file may be left behind");
});

test("a write over a file owned by the same uid still works", { skip }, (t) => {
  const dir = fixture(t);
  const target = path.join(dir, "config.json");
  fs.writeFileSync(target, "old", { mode: 0o600 });
  writePrivateConfigFile(target, "new");
  assert.equal(fs.readFileSync(target, "utf8"), "new");
});

test("a new file is created even when no owner can be compared", { skip }, (t) => {
  const dir = fixture(t);
  const target = path.join(dir, "config.json");
  t.mock.method(process, "geteuid", () => 4242);
  writePrivateConfigFile(target, "fresh");
  assert.equal(fs.readFileSync(target, "utf8"), "fresh");
});
