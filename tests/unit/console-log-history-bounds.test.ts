import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "console-history-bounds-"));
process.env.DATA_DIR = dir;
process.env.APP_LOG_FILE_PATH = path.join(dir, "app.log");
const { readConsoleLogHistory, consoleLogQuerySchema } =
  await import("../../src/lib/consoleLogHistory.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const line = (message: string, level = 30) =>
  JSON.stringify({ time: 1_000_000, msg: message, level }) + "\n";
const query = (input: Record<string, unknown> = {}) => consoleLogQuerySchema.parse(input);
test.after(() => {
  resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("identical timestamps and UTF-8 spanning blocks retain physical order through every page", async () => {
  const input = Array.from({ length: 1200 }, (_, index) => `${index}:` + "界😀".repeat(index % 13));
  fs.writeFileSync(process.env.APP_LOG_FILE_PATH!, input.map((value) => line(value)).join(""));
  const seen: string[] = [];
  let cursor: string | undefined;
  for (let page = 0; page < 20; page++) {
    const result = await readConsoleLogHistory(query({ limit: 83, ...(cursor ? { cursor } : {}) }));
    seen.unshift(...result.entries.map((entry) => entry.msg));
    cursor = result.nextCursor;
    if (!cursor) break;
  }
  assert.equal(cursor, undefined);
  assert.deepEqual(seen, input);
});

test("scan byte budget yields a resumable cursor even when no records match the first page", async () => {
  fs.writeFileSync(
    process.env.APP_LOG_FILE_PATH!,
    line("old error", 50) + line("x".repeat(1500)).repeat(6500)
  );
  const first = await readConsoleLogHistory(query({ level: "error" }));
  assert.deepEqual(first.entries, []);
  assert.equal(first.truncated, true);
  assert.ok(first.nextCursor);
  const second = await readConsoleLogHistory(query({ level: "error", cursor: first.nextCursor }));
  assert.deepEqual(
    second.entries.map((entry) => entry.msg),
    ["old error"]
  );
  assert.equal(second.nextCursor, undefined);
});

test("oversized lines cannot exhaust memory or prevent reaching older valid history", async () => {
  fs.writeFileSync(
    process.env.APP_LOG_FILE_PATH!,
    line("old valid") + line("界".repeat(300_000)) + line("new valid")
  );
  const result = await readConsoleLogHistory(query());
  assert.deepEqual(
    result.entries.map((entry) => entry.msg),
    ["old valid", "new valid"]
  );
  assert.equal(result.truncated, true);
});

test("expired or filter-mismatched cursors fail explicitly rather than reading a supplied path", async () => {
  fs.writeFileSync(process.env.APP_LOG_FILE_PATH!, line("one") + line("two"));
  const first = await readConsoleLogHistory(query({ limit: 1 }));
  assert.ok(first.nextCursor);
  await assert.rejects(readConsoleLogHistory(query({ cursor: first.nextCursor, level: "error" })), {
    status: 400,
  });
  fs.unlinkSync(process.env.APP_LOG_FILE_PATH!);
  await assert.rejects(readConsoleLogHistory(query({ cursor: first.nextCursor })), { status: 410 });
});
