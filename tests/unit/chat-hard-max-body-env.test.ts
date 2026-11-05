// OMNIROUTE_CHAT_HARD_MAX_BODY_BYTES is read at import, so this needs its own process.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const MIB = 1024 * 1024;
const directory = fs.mkdtempSync(path.join(os.tmpdir(), "omni-chat-hard-max-env-"));
process.env.DATA_DIR = directory;
process.env.OMNIROUTE_CHAT_HARD_MAX_BODY_BYTES = String(2 * MIB);
process.env.APP_LOG_TO_FILE = "false";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { admitChatRequest, ChatAdmissionController } =
  await import("../../src/shared/middleware/chatBodyAdmission.ts");

async function admit(bytes: number) {
  const controller = new ChatAdmissionController(1);
  const result = await admitChatRequest(
    new Request("http://localhost/v1/responses", {
      method: "POST",
      headers: { "content-type": "application/json", "content-length": String(bytes) },
      body: new Uint8Array(bytes).fill(120),
    }),
    { controller }
  );
  if (result.admit) result.lease?.release();
  return result;
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
});

test("the env variable keeps setting the chat cap when no limit is saved", async () => {
  assert.equal((await admit(2 * MIB)).admit, true);
  const rejected = await admit(2 * MIB + 1);
  assert.equal(rejected.admit, false);
  if (!rejected.admit) assert.equal(rejected.response.status, 413);
});

test("a saved limit lowers the chat cap below the env variable", async () => {
  await updateSettings({ maxBodySizeMb: 1 });
  assert.equal((await admit(MIB + 1)).admit, false);
  assert.equal((await admit(MIB)).admit, true);
});

test("a saved limit cannot raise the chat cap above an explicit env variable", async () => {
  await updateSettings({ maxBodySizeMb: 100 });
  assert.equal((await admit(2 * MIB)).admit, true);
  assert.equal((await admit(2 * MIB + 1)).admit, false);
});
