import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const dataDir = mkdtempSync(join(tmpdir(), "omniroute-translator-send-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { GET } = await import("../../src/app/api/translator/history/route.ts");
const { POST } = await import("../../src/app/api/translator/send/route.ts");

test.after(() => {
  resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
});

function send(sourceFormat?: string) {
  return POST(
    new Request("http://omniroute.local/api/translator/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider: "openai",
        body: { model: "gpt-4.1-mini", messages: [{ role: "user", content: "test" }] },
        sourceFormat,
      }),
    })
  );
}

async function readHistory() {
  const response = await GET(new Request("http://omniroute.local/api/translator/history"));
  assert.equal(response.status, 200);
  return response.json();
}

test("a send without a connection records one error with the original source format", async () => {
  const { total: previousTotal } = await readHistory();
  const response = await send("claude");
  assert.equal(response.status, 400);

  const { events, total } = await readHistory();
  assert.equal(total, previousTotal + 1);
  const [event] = events;
  assert.equal(event.sourceFormat, "claude");
  assert.equal(event.targetFormat, "openai");
  assert.equal(event.status, "error");
  assert.equal(event.statusCode, 400);
  assert.equal(event.endpoint, "/api/translator/send");
  assert.ok(Number.isFinite(event.latency));
});

test("an unknown source format is rejected by validation without recording an event", async () => {
  const { total: previousTotal } = await readHistory();
  const response = await send("unknown-format");
  assert.equal(response.status, 400);

  const { success, error } = await response.json();
  assert.equal(success, false);
  assert.equal(error.message, "Invalid request");
  assert.equal(error.details[0].field, "sourceFormat");
  assert.equal((await readHistory()).total, previousTotal);
});

test("a send without sourceFormat still detects the format of the body", async () => {
  const { total: previousTotal } = await readHistory();
  const response = await send();
  assert.equal(response.status, 400);

  const { events, total } = await readHistory();
  assert.equal(total, previousTotal + 1);
  assert.equal(events[0].sourceFormat, "openai");
  assert.equal(events[0].targetFormat, "openai");
});
