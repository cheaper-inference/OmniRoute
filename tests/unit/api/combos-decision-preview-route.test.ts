/**
 * Decision routing, step 9 (route): POST /api/combos/decision-preview — management auth
 * (401 before any work), JSON + strict schema validation (400, a stored apiKey included),
 * and a 200 without a prompt that builds only the menu. With a prompt and the flag off,
 * nothing is fetched.
 *
 * Self-isolating: DATA_DIR points at a fresh temp dir before any db module loads.
 */
import { after, before, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-decision-preview-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "decision-preview-route-secret";

const core = await import("../../../src/lib/db/core.ts");
const routeModule = await import("../../../src/app/api/combos/decision-preview/route.ts");

const ENV_KEYS = [
  "OMNIROUTE_DISABLE_AUTH",
  "INITIAL_PASSWORD",
  "REQUIRE_API_KEY",
  "COMBO_DECISION_ROUTER_ENABLED",
] as const;
const savedEnv = new Map<string, string | undefined>(ENV_KEYS.map((k) => [k, process.env[k]]));

const VALID_BODY = { models: ["openai/gpt-4o-mini", "openai/gpt-4o"] };

function post(body: unknown, rawBody?: string): Request {
  return new Request("http://localhost/api/combos/decision-preview", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: rawBody ?? JSON.stringify(body),
  });
}

function openAuth() {
  delete process.env.INITIAL_PASSWORD;
  delete process.env.REQUIRE_API_KEY;
  process.env.OMNIROUTE_DISABLE_AUTH = "1";
}

function lockedAuth() {
  delete process.env.OMNIROUTE_DISABLE_AUTH;
  delete process.env.REQUIRE_API_KEY;
  process.env.INITIAL_PASSWORD = "decision-preview-route-password";
}

before(() => {
  core.resetDbInstance();
  core.getDbInstance();
});

after(() => {
  for (const [key, value] of savedEnv) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

describe("POST /api/combos/decision-preview", () => {
  test("200 without a prompt: the generated menu only", async () => {
    openAuth();
    const res = await routeModule.POST(post(VALID_BODY));
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.deepEqual(body.menu, ["gpt-4o-mini", "gpt-4o"]);
    assert.equal(body.test, undefined, "no prompt means no decision call");
  });

  test("401 without credentials, before any preview work", async () => {
    lockedAuth();
    // The same body is a 200 with open auth (above), so a 401 here proves the gate ran first.
    const res = await routeModule.POST(post(VALID_BODY));
    assert.equal(res.status, 401);
  });

  test("400 for invalid JSON, a stored apiKey, or an unknown decider", async () => {
    openAuth();
    assert.equal((await routeModule.POST(post(null, "{not json"))).status, 400);
    const withKey = await routeModule.POST(
      post({ ...VALID_BODY, decision: { decider: "systemone", apiKey: "sk-plain" } })
    );
    assert.equal(withKey.status, 400);
    assert.doesNotMatch(await withKey.text(), /sk-plain/);
    const unknown = await routeModule.POST(post({ ...VALID_BODY, decision: { decider: "x" } }));
    assert.equal(unknown.status, 400);
  });

  test("with a prompt and the flag off: skipped (disabled), nothing fetched", async () => {
    openAuth();
    delete process.env.COMBO_DECISION_ROUTER_ENABLED;
    const originalFetch = globalThis.fetch;
    let fetches = 0;
    globalThis.fetch = (async () => {
      fetches += 1;
      return Response.json({});
    }) as typeof fetch;
    try {
      const res = await routeModule.POST(
        post({
          ...VALID_BODY,
          decision: { decider: "http", baseUrl: "https://decider.invalid", model: "m" },
          prompt: "route this",
        })
      );
      assert.equal(res.status, 200);
      const body = await res.json();
      assert.deepEqual(body.test, { status: "skipped", reason: "disabled" });
      assert.equal(fetches, 0);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
