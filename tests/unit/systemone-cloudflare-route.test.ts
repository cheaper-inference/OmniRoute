/**
 * POST /v1/systemone served by a `cloudflare-ai` connection, end to end:
 * the stored connection's account id reaches the Workers AI URL, the
 * Cloudflare envelope is unwrapped, and the key's connection scope applies.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { useDecollidedMigrationsDir } from "./helpers/decollidedMigrationsDir.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-systemone-cloudflare-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "systemone-cloudflare-test-secret";
useDecollidedMigrationsDir();

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const systemOneRoute = await import("../../src/app/api/v1/systemone/route.ts");

const ACCOUNT = "fedcba9876543210fedcba9876543210";
const ANSWERS = { risk: { type: "choice", choice: "low", confidence: 1 } };
const BODY = {
  state: "The customer asks for a refund",
  questions: { risk: { type: "choice", choices: ["low", "high"] } },
};

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function postRequest(body: unknown, bearer: string) {
  return new Request("http://localhost/v1/systemone", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${bearer}` },
    body: JSON.stringify(body),
  });
}

function stubCloudflare() {
  const originalFetch = globalThis.fetch;
  const calls: Array<{ url: string; auth: string; body: Record<string, unknown> }> = [];
  globalThis.fetch = (async (url: RequestInfo | URL, init: RequestInit = {}) => {
    calls.push({
      url: String(url),
      auth: new Headers(init.headers).get("authorization") ?? "",
      body: JSON.parse(String(init.body)),
    });
    const isJev = !String(url).includes("/@cf/");
    const native = {
      model: isJev ? "jev-1.13.0" : "clef",
      answers: ANSWERS,
      usage: { input_tokens: 12, output_tokens: isJev ? 3 : 0 },
    };
    return new Response(
      JSON.stringify({
        success: true,
        errors: [],
        messages: [],
        result: isJev ? { state: "Completed", result: native } : native,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;
  return { calls, restore: () => (globalThis.fetch = originalFetch) };
}

test("cloudflare route: a cloudflare-ai connection serves Jev and Clef through /v1/systemone", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "cloudflare-ai",
    authType: "apikey",
    name: "cf-systemone",
    apiKey: "cf-route-token",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { accountId: ACCOUNT },
  });
  const key = await apiKeysDb.createApiKey("systemone-cf", "machine-cf", [], {
    allowedConnections: [String(conn.id)],
  });
  apiKeysDb.clearApiKeyCaches();

  const upstream = stubCloudflare();
  try {
    const jev = await systemOneRoute.POST(postRequest({ ...BODY, model: "cf/jev" }, key.key));
    assert.equal(jev.status, 200, await jev.clone().text());
    assert.deepEqual(await jev.json(), {
      model: "jev-1.13.0",
      answers: ANSWERS,
      usage: { input_tokens: 12, output_tokens: 3 },
    });

    const clef = await systemOneRoute.POST(
      postRequest({ ...BODY, model: "cloudflare-ai/clef" }, key.key)
    );
    assert.equal(clef.status, 200, await clef.clone().text());
    assert.equal(((await clef.json()) as { model: string }).model, "clef");

    assert.deepEqual(
      upstream.calls.map((c) => c.url),
      [
        `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT}/ai/run`,
        `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT}/ai/run/@cf/cloudflare/clef`,
      ]
    );
    assert.deepEqual([...new Set(upstream.calls.map((c) => c.auth))], ["Bearer cf-route-token"]);
    assert.deepEqual(upstream.calls[0].body, {
      model: "typesafe/jev",
      input: { state: BODY.state, questions: BODY.questions },
    });
  } finally {
    upstream.restore();
  }
});

test("cloudflare route: unknown Cloudflare models are refused before credential selection", async () => {
  const key = await apiKeysDb.createApiKey("systemone-cf-open", "machine-cf");
  apiKeysDb.clearApiKeyCaches();
  const upstream = stubCloudflare();
  try {
    const response = await systemOneRoute.POST(
      postRequest({ ...BODY, model: "cloudflare-ai/llama-3.1-8b" }, key.key)
    );
    assert.equal(response.status, 400);
    assert.match(await response.text(), /Unknown decisions model/);
    assert.equal(upstream.calls.length, 0);
  } finally {
    upstream.restore();
  }
});
