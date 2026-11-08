import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { NextRequest } from "next/server";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "console-history-"));
process.env.DATA_DIR = dir;
process.env.API_KEY_SECRET = "console-history-fixture-secret";
const logPath = path.join(dir, "logs", "app.log");
process.env.APP_LOG_FILE_PATH = logPath;
const core = await import("../../src/lib/db/core.ts");
const { createApiKey, resetApiKeyState } = await import("../../src/lib/db/apiKeys.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const route = await import("../../src/app/api/logs/console/route.ts");
let token: string;
const line = (message: string, ago = 0, level = 30, extra: Record<string, unknown> = {}) =>
  JSON.stringify({ time: Date.now() - ago, level, msg: message, component: "fixture", ...extra }) +
  "\n";
const get = (query = "", auth = token) =>
  route.GET(
    new NextRequest("http://localhost/api/logs/console?" + query, {
      headers: auth ? { authorization: `Bearer ${auth}` } : {},
    })
  );
const messages = async (response: Response) =>
  ((await response.json()) as Array<{ msg: string }>).map((entry) => entry.msg);

test.beforeEach(async () => {
  core.resetDbInstance();
  resetApiKeyState();
  fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  await updateSettings({ requireLogin: true, password: "fixture-password-hash" });
  token = (await createApiKey("console fixture", "fixture", ["manage"])).key;
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("default view preserves entries older than one hour instead of silently clearing the console", async () => {
  fs.writeFileSync(logPath, line("old", 90 * 60_000) + line("new"));
  const response = await get();
  assert.equal(response.status, 200);
  assert.deepEqual(await messages(response), ["old", "new"]);
  assert.match(response.headers.get("cache-control") || "", /no-store/);
  assert.deepEqual(await messages(await get("range=1h")), ["new"]);
});

test("a rotation with a temporarily missing or empty active file retains the previous entries", async () => {
  fs.writeFileSync(logPath, line("before rotation"));
  fs.renameSync(logPath, path.join(path.dirname(logPath), "app.2026-10-27_100000.log"));
  assert.deepEqual(await messages(await get()), ["before rotation"]);
  fs.writeFileSync(logPath, line("after rotation"));
  assert.deepEqual(await messages(await get()), ["before rotation", "after rotation"]);
});

test("history pages traverse retained files without duplicate or skipped entries, including after rename", async () => {
  const archive = path.join(path.dirname(logPath), "app.2026-10-27_090000.log");
  fs.writeFileSync(archive, line("one", 4_000) + line("two", 3_000));
  fs.writeFileSync(logPath, line("three", 2_000) + line("four", 1_000));
  const first = await get("range=all&limit=1");
  assert.deepEqual(await messages(first), ["four"]);
  let cursor = first.headers.get("x-console-next-cursor");
  assert.ok(cursor);
  fs.renameSync(logPath, path.join(path.dirname(logPath), "app.2026-10-27_100000.log"));
  fs.writeFileSync(logPath, line("five"));
  const seen = ["four"];
  for (let page = 0; cursor && page < 10; page++) {
    const response = await get("range=all&limit=1&cursor=" + encodeURIComponent(cursor));
    assert.equal(response.status, 200);
    seen.push(...(await messages(response)));
    cursor = response.headers.get("x-console-next-cursor");
  }
  assert.equal(cursor, null);
  assert.deepEqual(seen, ["four", "three", "two", "one"]);
});

test("history filters levels/components, tolerates corrupt JSON, and ignores unrelated log names", async () => {
  fs.writeFileSync(logPath, "garbage\nnull\n[]\n" + line("info") + line("error", 0, 50));
  fs.writeFileSync(path.join(path.dirname(logPath), "app.private.log"), line("not a rotation"));
  assert.deepEqual(await messages(await get("level=warn&component=fixture&range=all")), ["error"]);
  assert.deepEqual(await messages(await get("component=missing")), []);
});

test("history rejects path/cursor abuse and requires management auth before disk access", async () => {
  fs.writeFileSync(logPath, line("private console data"));
  assert.ok([401, 403].includes((await get("", "")).status));
  const client = await createApiKey("inference fixture", "fixture", []);
  assert.equal((await get("", client.key)).status, 403);
  for (const query of ["range=../../", "cursor=../../outside.log", "cursor=" + "a".repeat(3000)]) {
    const response = await get(query);
    assert.equal(response.status, 400);
    assert.doesNotMatch(await response.text(), /private console data|at \/|storage\.sqlite/);
  }
});

test("history never reads symlink rotations or leaks old credential strings", async () => {
  const elsewhere = path.join(dir, "not-a-log.json");
  fs.writeFileSync(elsewhere, line("outside marker"));
  try {
    fs.symlinkSync(elsewhere, path.join(path.dirname(logPath), "app.2026-10-27_100000.log"));
  } catch (error: unknown) {
    if (!error || typeof error !== "object" || !("code" in error) || error.code !== "EPERM")
      throw error;
  }
  fs.writeFileSync(logPath, line("Authorization: Bearer abcdefghijklmnopqrstuvwxyz"));
  const raw = await (await get()).text();
  assert.doesNotMatch(raw, /outside marker|abcdefghijklmnopqrstuvwxyz/);
});
