import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  attachCodexImageQuotaHeaders,
  canExposeCodexImageQuota,
  parseCodexImageQuotaSnapshot,
  CODEX_IMAGE_QUOTA_REQUEST_HEADER,
} from "../../open-sse/services/codexImageQuotaTelemetry.ts";

// DATA_DIR must be set before the DB core loads, and the image handler must be imported
// before a test swaps globalThis.fetch: importing it pulls in open-sse/utils/proxyFetch.ts,
// which installs its own patched globalThis.fetch at module load and would otherwise
// replace the test's mock, sending the fixture request to the real Codex backend.
const previousDataDir = process.env.DATA_DIR;
const dataDir = mkdtempSync(join(tmpdir(), "omniroute-codex-quota-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");

test.after(() => {
  core.resetDbInstance();
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
  rmSync(dataDir, { recursive: true, force: true });
});

function quotaHeaders(): Headers {
  return new Headers({
    "x-codex-5h-usage": "32",
    "x-codex-5h-limit": "80",
    "x-codex-5h-reset-at": "2026-11-05T17:00:00.000Z",
    "x-codex-7d-usage": "10",
    "x-codex-7d-limit": "100",
    "x-codex-7d-reset-at": "2026-11-10T12:00:00.000Z",
    "chatgpt-account-id": "do-not-expose",
  });
}

test("the completed upstream response provides bounded account quota percentages", () => {
  const quota = parseCodexImageQuotaSnapshot(quotaHeaders(), "gpt-5.5");
  assert.ok(quota);
  assert.equal(quota.fiveHourRemainingPercent, 60);
  assert.equal(quota.sevenDayRemainingPercent, 90);
  assert.equal(quota.fiveHourResetAt, "2026-11-05T17:00:00.000Z");
  const headers = new Headers();
  attachCodexImageQuotaHeaders(headers, quota, true);
  assert.equal(headers.get("x-omniroute-codex-5h-remaining"), "60");
  assert.equal(headers.get("x-omniroute-codex-7d-remaining"), "90");
  assert.equal(headers.get("chatgpt-account-id"), null);
  assert.equal(headers.get("x-omniroute-codex-connection-id"), null);
  assert.equal(headers.get("x-omniroute-codex-5h-delta-used"), null);
});

test("non-admin API keys cannot request provider account quota", () => {
  const requestHeaders = new Headers({ [CODEX_IMAGE_QUOTA_REQUEST_HEADER]: "1" });
  assert.equal(canExposeCodexImageQuota("codex", requestHeaders, undefined), false);
  assert.equal(canExposeCodexImageQuota("codex", requestHeaders, ["read"]), false);
  assert.equal(canExposeCodexImageQuota("codex", requestHeaders, ["manage"]), false);
  assert.equal(canExposeCodexImageQuota("openai", requestHeaders, ["admin"]), false);
  assert.equal(canExposeCodexImageQuota("codex", new Headers(), ["admin"]), false);
  assert.equal(canExposeCodexImageQuota("codex", requestHeaders, ["admin"]), true);

  const response = new Headers();
  attachCodexImageQuotaHeaders(
    response,
    parseCodexImageQuotaSnapshot(quotaHeaders(), "gpt-5.5"),
    false
  );
  assert.equal(Array.from(response.keys()).length, 0);
});

test("missing or malformed upstream quota remains absent rather than inventing a balance", () => {
  assert.equal(parseCodexImageQuotaSnapshot(new Headers(), "gpt-5.5"), null);
  assert.equal(
    parseCodexImageQuotaSnapshot(
      new Headers({
        "x-codex-5h-usage": "NaN",
        "x-codex-5h-limit": "100",
      }),
      "gpt-5.5"
    ),
    null
  );
  assert.equal(
    parseCodexImageQuotaSnapshot(
      new Headers({
        "x-codex-5h-usage": "2",
        "x-codex-5h-limit": "0",
      }),
      "gpt-5.5"
    ),
    null
  );
  const response = new Headers();
  attachCodexImageQuotaHeaders(response, { fiveHourRemainingPercent: Number.NaN }, true);
  assert.equal(response.has("x-omniroute-codex-5h-remaining"), false);
});

test("single Codex hosted image uses its serving response; fanout omits quota", async () => {
  const originalFetch = globalThis.fetch;
  const sse =
    "event: response.output_item.done\ndata: " +
    JSON.stringify({
      type: "response.output_item.done",
      item: { type: "image_generation_call", id: "img_1", status: "completed", result: "YWJj" },
    }) +
    "\n\n";
  let sends = 0;
  globalThis.fetch = async () => {
    sends += 1;
    return new Response(sse, { status: 200, headers: quotaHeaders() });
  };
  try {
    const credentials = { accessToken: "test-token", connectionId: "private-account-id" };
    const single = await handleImageGeneration({
      body: { model: "codex/gpt-5.6-sol", prompt: "one cat", n: 1 },
      credentials,
      log: null,
    });
    assert.equal(single.success, true, `single Codex image response: ${JSON.stringify(single)}`);
    assert.equal(single.telemetry?.codexQuota?.fiveHourRemainingPercent, 60);
    assert.equal(sends, 1);
    const parallel = await handleImageGeneration({
      body: { model: "codex/gpt-5.6-sol", prompt: "two cats", n: 2 },
      credentials,
      log: null,
    });
    assert.equal(
      parallel.success,
      true,
      `fanout Codex image response: ${JSON.stringify(parallel)}`
    );
    assert.equal(parallel.telemetry?.codexQuota, undefined);
    assert.equal(sends, 3);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
