import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { hashFileSync } from "../../src/lib/db/backupFileHash.ts";

for (const size of [0, 17, 1024 * 1024, 2 * 1024 * 1024 + 13]) {
  test(`hashes all ${size} bytes without changing the file`, () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "backup-hash-"));
    try {
      const file = path.join(dir, "snapshot.sqlite");
      const bytes = Buffer.alloc(size);
      for (let i = 0; i < size; i++) bytes[i] = i % 251;
      fs.writeFileSync(file, bytes);
      assert.equal(hashFileSync(file), createHash("sha256").update(bytes).digest("hex"));
      assert.deepEqual(fs.readFileSync(file), bytes);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
}

test("propagates read failures and closes the file descriptor", (t) => {
  const failure = new Error("read failed");
  const open = t.mock.method(fs, "openSync", () => 42);
  const close = t.mock.method(fs, "closeSync", () => undefined);
  t.mock.method(fs, "readSync", () => {
    throw failure;
  });
  assert.throws(
    () => hashFileSync("snapshot.sqlite"),
    (error) => error === failure
  );
  assert.deepEqual(open.mock.calls[0].arguments, ["snapshot.sqlite", "r"]);
  assert.deepEqual(close.mock.calls[0].arguments, [42]);
});
