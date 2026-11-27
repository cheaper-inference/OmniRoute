import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-fmt-19252-"));
process.env.DATA_DIR = DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "codex-fmt-19252-secret";

const core = await import("../../src/lib/db/core.ts");
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");

const originalFetch = globalThis.fetch;
const PNG_B64 = "iVBORw0KGgo=";

function pngResponse() {
  return new Response(
    JSON.stringify({ created: 1, data: [{ b64_json: PNG_B64 }], output_format: "png" }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(DIR, { recursive: true, force: true });
});

async function run(extra: Record<string, unknown>) {
  const calls: Record<string, unknown>[] = [];
  globalThis.fetch = async (_u, o: RequestInit = {}) => {
    calls.push(JSON.parse(String(o.body)));
    return pngResponse();
  };
  const result = (await handleImageGeneration({
    body: { model: "codex/gpt-image-2.5-flare", prompt: "blue circle", ...extra },
    credentials: { accessToken: "t" },
    log: null,
  })) as {
    success: boolean;
    status?: number;
    error?: unknown;
    data: { data: Array<{ url: string }> };
  };
  return { result, calls };
}

for (const fmt of ["webp", "jpeg", "JPG"]) {
  test(`#19252 output_format=${fmt} is rejected with a clear 400, no upstream call`, async () => {
    const { result, calls } = await run({ output_format: fmt, output_compression: 80 });
    assert.equal(result.success, false);
    assert.equal(result.status, 400);
    assert.match(String(result.error), /PNG/);
    assert.equal(calls.length, 0);
  });
}

test("#19252 output_format=png is accepted and forwarded", async () => {
  const { result, calls } = await run({ output_format: "PNG", response_format: "url" });
  assert.equal(result.success, true);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].output_format, "png");
  assert.match(result.data.data[0].url, /^data:image\/png;base64,/);
});

test("#19252 request without output_format keeps the upstream body unchanged", async () => {
  const { result, calls } = await run({});
  assert.equal(result.success, true);
  assert.equal("output_format" in calls[0], false);
});
