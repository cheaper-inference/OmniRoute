/**
 * #18481 — a policy refusal must happen before anything is sent upstream.
 *
 * The request goes through the real route handler against a stubbed upstream,
 * and the assertions count outbound fetches. The refusal here is produced by
 * the entry policy (enforceApiKeyPolicy), which rejects the blocked model
 * before handleSingleModelChat resolves a target; flipping the resolved-model
 * gate to always allow leaves this test green, so it guards the order of
 * enforcement rather than that gate. The gate's own decisions are covered by
 * resolved-model-gate-playground-key-18471.test.ts.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { cleanupTempDataDir } from "../_setup/tempDataDir.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-gate-zero-dispatch-18481-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "gate-18481-zero-secret";

const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const completionsRoute = await import("../../src/app/api/v1/chat/completions/route.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

test.after(async () => {
  apiKeysDb.resetApiKeyState();
  await cleanupTempDataDir(TEST_DATA_DIR);
});

type FetchCall = { url: string };

/** Counts every outbound request the chat path attempts. */
function countUpstream(): { calls: FetchCall[]; restore: () => void } {
  const calls: FetchCall[] = [];
  const original = globalThis.fetch;
  globalThis.fetch = (async (input: unknown) => {
    calls.push({ url: String((input as { url?: string })?.url ?? input) });
    return new Response(JSON.stringify({ id: "stub", choices: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;
  return { calls, restore: () => (globalThis.fetch = original) };
}

function chatRequest(bearer: string, model: string): Request {
  return new Request("http://localhost/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${bearer}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      stream: false,
      messages: [{ role: "user", content: "hi" }],
    }),
  });
}

test("#18481 — a blocked model is refused before any upstream call", async () => {
  const created = await apiKeysDb.createApiKey("gate-18481-zero", "machine-18481");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    blockedModels: ["openai/gpt-4o-mini"],
  });
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "gate 18481 stub",
    apiKey: "sk-gate-18481-stub",
  });
  apiKeysDb.resetApiKeyState();

  const upstream = countUpstream();
  try {
    const res = await completionsRoute.POST(chatRequest(created.key, "openai/gpt-4o-mini"));
    assert.equal(res.status, 403, "the blocked model is refused with 403");
    assert.equal(
      upstream.calls.length,
      0,
      `a refused target must not dispatch: ${JSON.stringify(upstream.calls)}`
    );
  } finally {
    upstream.restore();
  }
});

test("#18481 — the same key dispatches once the model is not blocked", async () => {
  const created = await apiKeysDb.createApiKey("gate-18481-open", "machine-18481");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    blockedModels: ["openai/gpt-4o-mini"],
  });
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "gate 18481 stub",
    apiKey: "sk-gate-18481-stub",
  });
  apiKeysDb.resetApiKeyState();

  const upstream = countUpstream();
  try {
    const res = await completionsRoute.POST(chatRequest(created.key, "openai/gpt-4.1"));
    assert.notEqual(res.status, 403, "an unblocked model must clear the policy gate");
    assert.ok(
      upstream.calls.length > 0,
      "the unblocked request reaches the provider, so the zero-dispatch case above is a real difference"
    );
  } finally {
    upstream.restore();
  }
});
