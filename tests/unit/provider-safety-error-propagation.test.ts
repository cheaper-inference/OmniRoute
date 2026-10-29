import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-safety-error-boundary-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "safety-error-boundary-fixture-only";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
// These cases exercise the opt-in behavior (default off; see the default-off case).
process.env.PROVIDER_SAFETY_STOPS_TERMINAL = "true";
const { buildErrorBody, createErrorResult, parseUpstreamError } =
  await import("../../open-sse/utils/error.ts");
const { normalizeStreamFailurePayload, projectCompletedStreamError } =
  await import("../../open-sse/utils/streamErrorFormat.ts");
const { projectCodexPublicError } = await import("../../open-sse/utils/codexPublicError.ts");
const { encodeResponseSseEvent } = await import("../../open-sse/executors/codex.ts");
const { isRequestScopedUpstreamFailure } =
  await import("../../open-sse/services/combo/comboPredicates.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const legacyMessage =
  "This request was blocked by our safety systems. Reason: Potentially unintended activity.";

for (const [code, status] of [
  ["misalignment_policy_violation", 403],
  ["content_policy_violation", 400],
  ["provider_safety_rejection", 400],
] as const) {
  test(`${code}: canonical HTTP preserves the recognized public code`, () => {
    const body = buildErrorBody(status, "Upstream safety rejection", undefined, {
      code,
      type: "invalid_request_error",
    });
    assert.equal(body.error.code, code);
    assert.equal(body.error.type, "invalid_request_error");
  });

  test(`${code}: streamed status inference and public projection preserve safety semantics`, () => {
    const error = { code, type: "invalid_request_error", message: "Upstream safety rejection" };
    const normalized = normalizeStreamFailurePayload({ error });
    assert.equal(normalized?.code, code);
    assert.equal(normalized?.status, status);
    const projected = projectCodexPublicError({ ...error, status: null });
    assert.equal(projected.code, code);
    assert.equal(projected.type, "invalid_request_error");
    const ws = encodeResponseSseEvent(JSON.stringify({ type: "error", error }));
    assert.equal(ws.terminal, true);
    const frame = JSON.parse(ws.sse.split("data: ")[1].trim());
    assert.equal(frame.response.error.code, code);
    assert.equal(normalizeStreamFailurePayload(frame)?.status, status);
  });

  test(`${code}: stream classification stays request-scoped without a provider request-error type`, () => {
    for (const type of [undefined, "permission_error", "server_error"]) {
      const normalized = normalizeStreamFailurePayload({
        type: "response.failed",
        response: { status: "failed", error: { code, type, message: "Upstream safety rejection" } },
      });
      assert.equal(normalized?.status, status);
      assert.equal(normalized?.type, "invalid_request_error");
      assert.equal(isRequestScopedUpstreamFailure(normalized ?? undefined), true);
    }
  });

  test(`${code}: root and nested HTTP safety errors stay request-scoped without a provider request-error type`, async () => {
    for (const type of [undefined, "permission_error", "server_error"]) {
      const error = { code, type, message: "Upstream safety rejection" };
      for (const body of [{ error }, { response: { error } }]) {
        const parsed = await parseUpstreamError(
          new Response(JSON.stringify(body), { status }),
          "codex"
        );
        assert.equal(parsed.errorCode, code);
        assert.equal(parsed.errorType, "invalid_request_error");
        assert.equal(
          isRequestScopedUpstreamFailure({ code: parsed.errorCode, type: parsed.errorType }),
          true
        );
      }
    }
  });
}

test("WS legacy rejection receives a local label without exposing or inventing a detector", () => {
  const ws = encodeResponseSseEvent(
    JSON.stringify({
      type: "error",
      status: 400,
      error: { code: "bad_request", type: "invalid_request_error", message: legacyMessage },
    })
  );
  const frame = JSON.parse(ws.sse.split("data: ")[1].trim());
  assert.equal(frame.response.error.code, "provider_safety_rejection");
  assert.equal(frame.response.error.type, "invalid_request_error");
  assert.equal(normalizeStreamFailurePayload(frame)?.status, 400);
});

test("nested HTTP Responses envelope preserves its explicit error code and type", async () => {
  const error = {
    code: "misalignment_policy_violation",
    type: "invalid_request_error",
    message: "Upstream safety rejection",
  };
  const parsed = await parseUpstreamError(
    new Response(JSON.stringify({ response: { error } }), {
      status: 403,
      headers: { "content-type": "application/json" },
    }),
    "codex"
  );
  assert.equal(parsed.errorCode, error.code);
  assert.equal(parsed.errorType, error.type);
  assert.equal(parsed.message, error.message);
});

test("an explicit root HTTP error retains precedence over a nested error", async () => {
  const parsed = await parseUpstreamError(
    new Response(
      JSON.stringify({
        error: {
          code: "invalid_api_key",
          type: "authentication_error",
          message: "Invalid API key",
        },
        response: {
          error: { code: "misalignment_policy_violation", type: "invalid_request_error" },
        },
      }),
      { status: 401 }
    ),
    "codex"
  );
  assert.equal(parsed.errorCode, "invalid_api_key");
  assert.equal(parsed.errorType, "authentication_error");
});

test("unrelated and status-conflicting errors are not promoted to request-scoped safety failures", async () => {
  for (const error of [
    { status: 403, code: "permission_denied", type: "permission_error", message: "Forbidden" },
    {
      status: 429,
      code: "misalignment_policy_violation",
      type: "rate_limit_error",
      message: "Rate limit",
    },
  ]) {
    const normalized = normalizeStreamFailurePayload({ error });
    assert.equal(normalized?.type, error.type);
    assert.equal(isRequestScopedUpstreamFailure(normalized ?? undefined), false);
    const parsed = await parseUpstreamError(
      new Response(JSON.stringify({ error }), { status: error.status }),
      "codex"
    );
    assert.equal(parsed.errorType, error.type);
    assert.equal(
      isRequestScopedUpstreamFailure({ code: parsed.errorCode, type: parsed.errorType }),
      false
    );
  }

  // A status-conflicting content-policy code is not promoted to a safety stop either: its
  // type and 502 status survive. (Its request-scoped verdict comes from #15917, which
  // treats a content_policy_violation code as request-scoped by itself.)
  const serverError = {
    status: 502,
    code: "content_policy_violation",
    type: "server_error",
    message: "Upstream error",
  };
  const normalized = normalizeStreamFailurePayload({ error: serverError });
  assert.equal(normalized?.type, "server_error");
  assert.equal(normalized?.status, 502);
  const parsed = await parseUpstreamError(
    new Response(JSON.stringify({ error: serverError }), { status: 502 }),
    "codex"
  );
  assert.equal(parsed.errorType, "server_error");
  assert.equal(parsed.statusCode, 502);
});

test("unknown identifiers and status-conflicting safety-shaped errors remain sanitized", () => {
  const raw = "not_a_public_safety_code";
  assert.notEqual(buildErrorBody(403, "Denied", undefined, { code: raw }).error.code, raw);
  assert.notEqual(
    projectCodexPublicError({ status: 502, code: "misalignment_policy_violation" }).code,
    "misalignment_policy_violation"
  );
  assert.equal(
    normalizeStreamFailurePayload({
      error: {
        status: 429,
        code: "rate_limit_exceeded",
        type: "rate_limit_error",
        message: "Rate limit",
      },
    })?.status,
    429
  );
});

for (const [code, status] of [
  ["misalignment_policy_violation", 403],
  ["content_policy_violation", 400],
  ["provider_safety_rejection", 400],
] as const) {
  test(`${code}: completed stream diagnostics preserve the named failure code`, () => {
    const failure = normalizeStreamFailurePayload({
      error: { code, message: "Upstream rejection" },
    });
    assert.equal(failure?.status, status);
    const projected = projectCompletedStreamError(failure);
    assert.equal(projected?.code, code);
    assert.equal(projected?.type, "invalid_request_error");
  });
}

for (const code of ["", null, undefined]) {
  test(`legacy ${String(code)} code: exact explicit rejection remains terminal without inventing a detector`, () => {
    const error = { code, type: "invalid_request_error", message: legacyMessage, status: 403 };
    const failure = normalizeStreamFailurePayload({ error });
    assert.equal(failure?.code, "provider_safety_rejection");
    assert.equal(failure?.status, 403);
    const ws = encodeResponseSseEvent(JSON.stringify({ type: "error", error, status: 403 }));
    const frame = JSON.parse(ws.sse.split("data: ")[1].trim());
    assert.equal(frame.response.error.code, "provider_safety_rejection");
  });
}

for (const [code, status] of [
  ["misalignment_policy_violation", 403],
  ["content_policy_violation", 400],
  ["provider_safety_rejection", 400],
] as const) {
  test(`${code}: passthrough chain preserves only safe identifiers and sanitized details`, async () => {
    const upstream = {
      error: {
        code,
        type: "invalid_request_error",
        message: "Policy rejection: /srv/private/file.ts",
        reason: "unknown_private_identifier",
        stack: "private-stack-fixture",
        marker: "passthrough-fixture",
      },
    };
    const parsed = await parseUpstreamError(Response.json(upstream, { status: 400 }), "codex");
    const result = createErrorResult(
      parsed.statusCode,
      parsed.message,
      parsed.retryAfterMs,
      parsed.errorCode,
      parsed.errorType,
      parsed.responseBody,
      { passthrough: true }
    );
    const body = await result.response.json();
    assert.equal(body.error.marker, "passthrough-fixture");
    assert.equal(body.error.code, code);
    assert.equal(body.error.type, "invalid_request_error");
    assert.equal(body.error.reason, undefined);
    assert.equal(body.error.stack, undefined);
    assert.ok(!JSON.stringify(body).includes("/srv/private"));
    const unknown = createErrorResult(
      400,
      "Denied",
      null,
      undefined,
      undefined,
      { error: { code: "unknown_private_identifier", type: "unknown_private_type" } },
      { passthrough: true }
    );
    const unknownBody = await unknown.response.json();
    assert.equal(unknownBody.error.code, "");
    assert.equal(unknownBody.error.type, "upstream_error");
  });

  test(`${code}: WS safety beats quota prose but not explicit conflicting statuses`, () => {
    for (const explicitStatus of [undefined, 429, 502]) {
      const ws = encodeResponseSseEvent(
        JSON.stringify({
          type: "error",
          status: explicitStatus,
          error: {
            code,
            type: "invalid_request_error",
            message: "Safety policy rejected this quota-related request",
          },
        })
      );
      assert.equal(ws.terminal, true);
      const frame = JSON.parse(ws.sse.split("data: ")[1].trim());
      assert.equal(
        frame.response.error.code,
        explicitStatus === undefined
          ? code
          : explicitStatus === 429
            ? "rate_limit_exceeded"
            : "upstream_server_error"
      );
      assert.equal(normalizeStreamFailurePayload(frame)?.status, explicitStatus ?? status);
      assert.equal(
        frame.response.error.type,
        explicitStatus === undefined
          ? "invalid_request_error"
          : explicitStatus === 429
            ? "rate_limit_error"
            : "server_error"
      );
    }
  });
}

test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});
