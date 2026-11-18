import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

import { baseInput } from "./_helpers/nonStreamingProviderLegFixtures.ts";

// Set every storage/home boundary before loading the real provider leg. Retain the
// synthetic fixture directory for failure diagnostics; never use an operator's data.
const fixtureRoot = mkdtempSync(join(tmpdir(), "omniroute-public-stream-codes-"));
const fixtureEnv = {
  DATA_DIR: join(fixtureRoot, "data"),
  HOME: fixtureRoot,
  TMPDIR: fixtureRoot,
  OMNIROUTE_PLUGINS_DIR: join(fixtureRoot, "plugins"),
  APP_LOG_TO_FILE: "false",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK: "true",
};
const originalEnv = Object.fromEntries(
  Object.keys(fixtureEnv).map((key) => [key, process.env[key]])
);
Object.assign(process.env, fixtureEnv);

const { runNonStreamingProviderLeg } =
  await import("../../open-sse/handlers/chatCore/nonStreamingProviderLeg.ts");
const { buildErrorBody, createErrorResult } = await import("../../open-sse/utils/error.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { shouldSkipConnDisable } = await import("../../open-sse/services/combo/comboPredicates.ts");

test.after(() => {
  resetDbInstance();
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

for (const { label, contentType, payload, code } of [
  {
    label: "malformed SSE",
    contentType: "text/event-stream",
    payload: "data: {not-json\n\n",
    code: "invalid_sse_payload",
  },
  {
    label: "malformed JSON",
    contentType: "application/json",
    payload: '{"access_token":"synthetic-private-token",',
    code: "invalid_json_payload",
  },
  {
    label: "non-object JSON",
    contentType: "application/json",
    payload: '["synthetic-private-token"]',
    code: "invalid_json_payload",
  },
  {
    label: "error-only SSE with private provider fields",
    contentType: "text/event-stream",
    payload: `data: ${JSON.stringify({
      error: {
        message:
          "Provider failed access_token=synthetic-private-token\n    at read (/srv/private/provider.ts:1:2)",
        code: "private-provider-request-id",
        type: "private-provider-error-type",
        session_id: "synthetic-private-session",
      },
    })}\n\n`,
    code: "invalid_sse_payload",
  },
]) {
  test(`${label}: real provider leg preserves its classification in the public 502 response`, async (t) => {
    t.mock.method(globalThis, "fetch", async () => {
      assert.fail("the provider leg fixture must not make network requests");
    });
    let sends = 0;
    const result = await runNonStreamingProviderLeg(
      baseInput({
        // Keep the normal policy: parse failures must not trigger an extra send.
        executeProviderRequest: async () => {
          sends++;
          return {
            response: new Response(payload, {
              status: 200,
              headers: { "content-type": contentType, "x-request-id": "private-header-id" },
            }),
            url: "https://provider.example/v1/chat/completions",
            headers: {},
            transformedBody: null,
          };
        },
      })
    );

    assert.equal(sends, 1);
    assert.equal(result.kind, "error");
    assert.ok(result.kind === "error");
    assert.equal(result.receipt.httpStatus, 502);
    assert.equal(result.receipt.errorType, code);
    assert.equal(result.receipt.termination, "provider_error");
    assert.equal(result.result.status, 502);
    assert.equal(result.result.errorCode, code);
    assert.equal(result.result.errorType, code);
    assert.equal(
      shouldSkipConnDisable(result.result, false, false, "openai"),
      false,
      "public projection must not exempt a provider parse failure from existing health accounting"
    );
    assert.equal(result.result.retryAfterMs, undefined);
    assert.equal(result.result.response.status, 502);
    assert.equal(result.result.response.headers.get("retry-after"), null);
    assert.equal(result.result.response.headers.get("x-request-id"), null);
    const text = await result.result.response.text();
    assert.doesNotMatch(
      text,
      /synthetic-private|private-provider|private-header-id|srv\/private|provider\.ts|at read|session_id/
    );
    const body = JSON.parse(text);
    assert.deepEqual(body, {
      error: { message: result.result.error, code, type: code },
    });
  });
}

test("unrecognized provider identifiers still fall back without exposing private IDs", async () => {
  for (const identifier of [
    "private-provider-request-id",
    "invalid_sse_payload_private_suffix",
    "invalid_json_payload\nX-Private: value",
  ]) {
    const result = createErrorResult(502, "Provider failed", null, identifier, identifier);
    assert.equal(result.errorCode, identifier, "internal classification must remain unchanged");
    assert.equal(result.response.status, 502);
    assert.deepEqual(await result.response.json(), {
      error: { message: "Provider failed", code: "bad_gateway", type: "server_error" },
    });
  }
  assert.deepEqual(buildErrorBody(502, "Provider failed"), {
    error: {
      message: "Provider failed",
      code: "bad_gateway",
      type: "server_error",
      reason: undefined,
    },
  });
});

test("existing public safety codes keep their original code, type, and status", async () => {
  for (const code of ["cyber_policy", "content_policy_violation"]) {
    const result = createErrorResult(403, "Request refused", null, code, "invalid_request_error");
    assert.equal(result.response.status, 403);
    assert.deepEqual(await result.response.json(), {
      error: { message: "Request refused", code, type: "invalid_request_error" },
    });
  }
});
