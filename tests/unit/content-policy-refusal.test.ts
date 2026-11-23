import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const testDataDir = mkdtempSync(join(tmpdir(), "omniroute-policy-refusal-"));
process.env.DATA_DIR = testDataDir;
process.env.API_KEY_SECRET = "synthetic-policy-test-secret";

const { normalizeStreamFailurePayload } = await import("../../open-sse/utils/streamErrorFormat.ts");
const { isContentPolicyRefusal } = await import("../../open-sse/utils/contentPolicyError.ts");
const { buildErrorBody } = await import("../../open-sse/utils/error.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");
const { shouldSkipConnDisable } = await import("../../open-sse/services/combo/comboPredicates.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  resetDbInstance();
  rmSync(testDataDir, { recursive: true, force: true });
});

const message = "Synthetic request refused by content policy";
const noop = () => {};
const dbg = process.env.POLICY_DEBUG ? (...a: unknown[]) => console.error(...a) : noop;
const log = { info: dbg, warn: dbg, debug: noop, error: dbg };

test("policy classification uses exact structured identifiers, not message text", () => {
  for (const code of ["cyber_policy", "content_policy_violation"]) {
    assert.equal(isContentPolicyRefusal({ code: code.toUpperCase() }), true);
    assert.equal(isContentPolicyRefusal({ type: code }), true);
    assert.equal(isContentPolicyRefusal({ code: `${code}_unrelated` }), false);
  }
  for (const error of [undefined, null, {}, { code: 400 }, { code: "server_error" }]) {
    assert.equal(isContentPolicyRefusal(error), false);
  }
  const failure = normalizeStreamFailurePayload({
    error: { code: "server_error", message: "Synthetic cyber_policy service failure" },
  });
  assert.equal(failure?.status, 502);
  const fallback = checkFallbackError(
    502,
    failure!.message,
    0,
    "test-model",
    "codex",
    null,
    null,
    failure
  );
  assert.equal(fallback.shouldFallback, true);
});

test("public refusal codes remain bounded and messages still use the sanitizer", () => {
  const body = buildErrorBody(
    400,
    "Synthetic refusal\n    at handler (/srv/private.ts:1:2)",
    undefined,
    {
      code: "cyber_policy",
      type: "invalid_request_error",
    }
  );
  assert.equal(body.error.code, "cyber_policy");
  assert.doesNotMatch(JSON.stringify(body), /private\.ts|at handler/);
  assert.equal(
    buildErrorBody(400, message, undefined, { code: "cyber_policy_secret_suffix" }).error.code,
    "bad_request"
  );
});

function failedEvent(code: string) {
  return {
    type: "response.failed",
    response: { object: "response", status: "failed", output: [], error: { code, message } },
  };
}

// #15917 — CONTENT_POLICY_REFUSAL_COMBO_STOP_ENABLED (default off) gates stopping a combo on a
// content-policy refusal (heterogeneous or not); the no-cooldown / no-breaker classification
// and the public identifiers are on by default.
const COMBO_STOP_FLAG = "CONTENT_POLICY_REFUSAL_COMBO_STOP_ENABLED";
function setComboStop(enabled: boolean | null) {
  if (enabled === null) delete process.env[COMBO_STOP_FLAG];
  else process.env[COMBO_STOP_FLAG] = enabled ? "true" : "false";
}
test.afterEach(() => setComboStop(null));

async function runPolicyCombo(
  code: string,
  stream: boolean,
  shape: "heterogeneous" | "homogeneous"
) {
  const attempted: string[] = [];
  const second = shape === "heterogeneous" ? "openai/other-model" : "codex/test-model";
  const result = await handleComboChat({
    body: { model: "policy-test", stream, messages: [{ role: "user", content: "synthetic" }] },
    combo: {
      name: `policy-${code}-${stream}-${shape}-${Math.random().toString(36).slice(2)}`,
      strategy: "priority",
      models: [{ model: "codex/test-model" }, { model: second }],
      config: { maxRetries: 1, retryDelayMs: 0 },
    },
    handleSingleModel: async (_body: unknown, model: string) => {
      attempted.push(model);
      if (model === "openai/other-model") {
        return stream
          ? new Response(
              `data: ${JSON.stringify({ id: "x", object: "chat.completion.chunk", choices: [{ index: 0, delta: { content: "served by the next model" }, finish_reason: "stop" }] })}\n\ndata: [DONE]\n\n`,
              { headers: { "Content-Type": "text/event-stream" } }
            )
          : new Response(
              JSON.stringify({
                id: "x",
                object: "chat.completion",
                choices: [
                  {
                    index: 0,
                    message: { role: "assistant", content: "served by the next model" },
                    finish_reason: "stop",
                  },
                ],
              }),
              { status: 200, headers: { "Content-Type": "application/json" } }
            );
      }
      return stream
        ? new Response(`event: response.failed\ndata: ${JSON.stringify(failedEvent(code))}\n\n`, {
            headers: { "Content-Type": "text/event-stream" },
          })
        : new Response(JSON.stringify({ error: { code, message } }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
    },
    log,
    settings: {},
    allCombos: [],
  });
  return { attempted, result };
}

for (const code of ["cyber_policy", "content_policy_violation"]) {
  test(`${code}: root errors and failed snapshots normalize to 400 without a type`, () => {
    for (const payload of [
      { error: { code, message } },
      failedEvent(code),
      { response: failedEvent(code).response },
      { response: { status: "failed", last_error: { code, message } } },
    ]) {
      const failure = normalizeStreamFailurePayload(payload);
      assert.equal(failure?.status, 400);
      assert.equal(failure?.code, code);
      assert.equal(failure?.message, message);
    }
  });

  test(`${code}: explicit HTTP status is preserved but never penalizes the account`, () => {
    for (const status of [400, 403, 502]) {
      const failure = normalizeStreamFailurePayload({ error: { code, message, status } });
      assert.equal(failure?.status, status);
      const fallback = checkFallbackError(status, message, 0, "test-model", "codex", null, null, {
        code,
      });
      assert.equal(fallback.shouldFallback, false);
      assert.equal(fallback.cooldownMs, 0);
      assert.equal(fallback.skipProviderBreaker, true);
      assert.equal(
        shouldSkipConnDisable({ status, errorCode: code, error: message }, false, false, "codex"),
        true
      );
    }
  });

  for (const mode of ["passthrough", "translate"] as const) {
    test(`${code}: ${mode} stream retains the refusal and reports request-scoped status`, async () => {
      const frame = `event: response.failed\ndata: ${JSON.stringify(failedEvent(code))}\n\n`;
      const failures: { status: number; code?: string }[] = [];
      const source = new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(frame));
          controller.close();
        },
      });
      const reader = source
        .pipeThrough(
          createSSEStream({
            mode,
            sourceFormat: mode === "translate" ? "claude" : "openai-responses",
            targetFormat: "openai-responses",
            clientResponseFormat: mode === "translate" ? "claude" : "openai-responses",
            provider: "codex",
            model: "test-model",
            body: { input: "synthetic input" },
            onFailure(failure) {
              failures.push(failure);
              return true;
            },
          })
        )
        .getReader();
      let output = "";
      let streamError: unknown;
      try {
        while (true) {
          const chunk = await reader.read();
          if (chunk.done) break;
          output += new TextDecoder().decode(chunk.value);
        }
      } catch (error) {
        streamError = error;
      }
      assert.ok(streamError, "the refused stream must fail, not become a success");
      assert.equal(failures.length, 1);
      assert.equal(failures[0].status, 400);
      assert.equal(failures[0].code, code);
      assert.ok(output.includes(message));
      assert.ok(output.includes(code));
    });
  }

  for (const stream of [false, true]) {
    test(`${code}: [flag on] heterogeneous combo stops without retrying or falling back (stream=${stream})`, async () => {
      setComboStop(true);
      const { attempted, result } = await runPolicyCombo(code, stream, "heterogeneous");
      assert.deepEqual(attempted, ["codex/test-model"]);
      assert.equal(result.status, 400);
      const body = await result.json();
      assert.equal(body.error.code, code);
      assert.ok(body.error.message.includes(message));
    });

    test(`${code}: [flag off] heterogeneous combo still advances to the next model (stream=${stream})`, async () => {
      const { attempted, result } = await runPolicyCombo(code, stream, "heterogeneous");
      assert.deepEqual(attempted, ["codex/test-model", "openai/other-model"]);
      assert.equal(result.status, 200);
      assert.ok((await result.text()).includes("served by the next model"));
    });
  }

  test(`${code}: [flag on] same-model remainder stops on the refusal (stream=false)`, async () => {
    setComboStop(true);
    const { attempted, result } = await runPolicyCombo(code, false, "homogeneous");
    assert.deepEqual(attempted, ["codex/test-model"]);
    assert.equal(result.status, 400);
    const body = await result.json();
    assert.equal(body.error.code, code);
  });

  test(`${code}: [flag off] same-model remainder keeps the release routing (stream=false)`, async () => {
    const { attempted, result } = await runPolicyCombo(code, false, "homogeneous");
    assert.deepEqual(attempted, ["codex/test-model", "codex/test-model"]);
    assert.equal(result.status, 400);
    const body = await result.json();
    assert.equal(body.error.code, code);
  });
}

test("real rate limits and server errors retain retry/cooldown behavior", () => {
  for (const [code, status] of [
    ["rate_limit_exceeded", 429],
    ["server_error", 502],
  ] as const) {
    const failure = normalizeStreamFailurePayload({
      error: { code, message: "Synthetic failure" },
    });
    assert.equal(failure?.status, status);
    const fallback = checkFallbackError(
      status,
      "Synthetic failure",
      0,
      "test-model",
      "codex",
      null,
      null,
      { code }
    );
    assert.equal(fallback.shouldFallback, true);
    assert.ok(fallback.cooldownMs > 0);
  }
});
