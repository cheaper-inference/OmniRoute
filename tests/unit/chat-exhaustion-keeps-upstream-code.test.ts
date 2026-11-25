/**
 * #21119 review: when every account of a provider fails, the client got the last
 * upstream message with the status table's default code (401 → invalid_api_key),
 * which reads as "your OmniRoute key is invalid". The upstream's own code
 * (e.g. gemini_web_signed_out) is now kept.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-exhaustion-code-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleNoCredentials } = await import("../../src/sse/handlers/chatHelpers.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

const exhaust = (code?: string | null) =>
  handleNoCredentials(
    { allRateLimited: false },
    "conn-1",
    "gemini-web",
    "gemini-4-hydrogen",
    "Gemini Web session is signed out",
    401,
    undefined,
    false,
    null,
    null,
    code
  );

test("credential exhaustion keeps the upstream error code", async () => {
  const res = exhaust("gemini_web_signed_out") as Response;
  assert.equal(res.status, 401);
  const body = await res.json();
  assert.equal(body.error.code, "gemini_web_signed_out");
  assert.match(body.error.message, /signed out/);
});

test("without an upstream code the status default is unchanged", async () => {
  const body = await (exhaust(undefined) as Response).json();
  assert.equal(body.error.code, "invalid_api_key");
});

test("chat.ts passes the last upstream error code to handleNoCredentials", () => {
  const src = fs.readFileSync(new URL("../../src/sse/handlers/chat.ts", import.meta.url), "utf8");
  assert.match(src, /lastErrorCode = upstreamErrorCodeOf\(result\);/);
  assert.match(src, /runtimeOptions\?\.correlationId \?\? null,\s*lastErrorCode\s*\)/);
});
