/**
 * Provider safety stops delivered INSIDE a committed stream must stay terminal.
 *
 * Two live-observed leaks (PROVIDER_SAFETY_STOPS_TERMINAL on):
 *  1. A combo target whose 200 stream carries a pre-content safety failure was rejected
 *     by quality validation and the combo dispatched the next model — routing around the
 *     provider's stop. The safety latch only inspected 400/403 JSON responses.
 *  2. After `/v1/responses` committed to an early-keepalive 200, a 403 safety JSON became
 *     a `type:"error"` frame. Codex reads `misalignment_policy_violation` only from
 *     `response.failed`, so it treated the frame as a disconnect and retried 5 times.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { mock } from "node:test";
import type { HandleComboChatOptions } from "../../open-sse/services/combo/types.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-safety-stop-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "stream-safety-stop-offline-test-only";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.PROVIDER_SAFETY_STOPS_TERMINAL = "true";
const network = mock.method(globalThis, "fetch", async () => {
  throw new Error("Unexpected network call in offline stream safety tests");
});

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { getComboTrace } = await import("../../open-sse/services/combo/decisionTrace.ts");
const { withEarlyStreamKeepalive, OPENAI_RESPONSES_ERROR_FRAME } =
  await import("../../open-sse/utils/earlyStreamKeepalive.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };
const SAFETY_MESSAGE =
  "This request was blocked by our safety systems. Reason: Potentially unintended activity.";
const encoder = new TextEncoder();
let invocation = 0;

function sse(frames: Record<string, unknown>[]): Response {
  const body = frames.map((f) => `event: ${f.type}\ndata: ${JSON.stringify(f)}\n\n`).join("");
  return new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode(body));
        controller.close();
      },
    }),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
}

const safetyFailedFrames = (code: string | undefined) => [
  {
    type: "response.created",
    sequence_number: 0,
    response: { id: "resp_s", status: "in_progress" },
  },
  {
    type: "response.failed",
    sequence_number: 1,
    response: {
      id: "resp_s",
      object: "response",
      status: "failed",
      error: {
        type: "invalid_request_error",
        ...(code ? { code } : {}),
        message: SAFETY_MESSAGE,
      },
    },
  },
];

const okFrames = [
  {
    type: "response.created",
    sequence_number: 0,
    response: { id: "resp_ok", status: "in_progress" },
  },
  { type: "response.output_text.delta", sequence_number: 1, delta: "OK" },
  {
    type: "response.completed",
    sequence_number: 2,
    response: { id: "resp_ok", status: "completed" },
  },
];

function options(strategy: string): HandleComboChatOptions {
  return {
    invocationId: `offline-stream-safety-${++invocation}`,
    body: { stream: true, input: [{ role: "user", content: "offline test" }] },
    combo: {
      name: `offline-stream-safety-combo-${invocation}`,
      strategy,
      models: ["codex/gpt-6-astra", "opencode-go/deepseek-v4.1-flash"],
      config: { maxRetries: 2, maxSetRetries: 2, retryDelayMs: 0, setRetryDelayMs: 0 },
    },
    settings: {},
    allCombos: [],
    handleSingleModel: async () => sse(okFrames),
    log,
    sourceFormat: "openai-responses",
  } as HandleComboChatOptions;
}

for (const strategy of ["priority", "round-robin"]) {
  for (const code of ["misalignment_policy_violation", undefined]) {
    test(`${strategy}: in-stream safety failure (${code ?? "legacy no-code"}) is terminal, no sibling dispatch`, async () => {
      const opts = options(strategy);
      const calls: string[] = [];
      opts.handleSingleModel = async (_body, model) => {
        calls.push(model);
        return calls.length === 1 ? sse(safetyFailedFrames(code)) : sse(okFrames);
      };
      const response = await handleComboChat(opts);
      assert.deepEqual(
        calls,
        ["codex/gpt-6-astra"],
        "no retry or alternate model after a safety stop"
      );
      assert.ok(response.status === 403 || response.status === 400, `status ${response.status}`);
      const body = (await response.json()) as { error: { code: string; type: string } };
      assert.equal(body.error.type, "invalid_request_error");
      assert.equal(
        body.error.code,
        code ?? "provider_safety_rejection",
        "the explicit safety code survives to the client"
      );
      const trace = getComboTrace(opts.invocationId as string);
      assert.equal(
        (trace?.terminal as { errorClass?: string } | undefined)?.errorClass,
        "safety_rejection"
      );
      assert.ok(
        !JSON.stringify(trace).includes(SAFETY_MESSAGE),
        "trace must not contain upstream text"
      );
    });
  }
}

for (const strategy of ["priority", "round-robin"]) {
  test(`${strategy}: nested execute in-stream safety failure stops children and parent siblings`, async () => {
    const opts = options(strategy);
    const child = {
      name: `${opts.combo.name}-child`,
      strategy: "priority",
      models: ["codex/gpt-6-astra", "codex/gpt-6.1-sol"],
      config: { maxRetries: 2, maxSetRetries: 2, retryDelayMs: 0, setRetryDelayMs: 0 },
    };
    opts.combo.models = [
      { kind: "combo-ref", comboName: child.name },
      "opencode-go/deepseek-v4.1-flash",
    ];
    opts.combo.config = { ...opts.combo.config, nestedComboMode: "execute" };
    opts.allCombos = [opts.combo, child];
    const calls: string[] = [];
    opts.handleSingleModel = async (_body, model) => {
      calls.push(model);
      return calls.length === 1
        ? sse(safetyFailedFrames("misalignment_policy_violation"))
        : sse(okFrames);
    };
    const response = await handleComboChat(opts);
    assert.deepEqual(
      calls,
      ["codex/gpt-6-astra"],
      "no child sibling or parent sibling after a stop"
    );
    const body = (await response.json()) as { error: { code: string } };
    assert.equal(body.error.code, "misalignment_policy_violation");
  });
}

test("PROVIDER_SAFETY_STOPS_TERMINAL off (default): an in-stream safety failure keeps release routing", async () => {
  const previous = process.env.PROVIDER_SAFETY_STOPS_TERMINAL;
  delete process.env.PROVIDER_SAFETY_STOPS_TERMINAL;
  try {
    const opts = options("priority");
    const calls: string[] = [];
    opts.handleSingleModel = async (_body, model) => {
      calls.push(model);
      return calls.length === 1
        ? sse(safetyFailedFrames("misalignment_policy_violation"))
        : sse(okFrames);
    };
    const response = await handleComboChat(opts);
    assert.equal(response.status, 200);
    assert.ok(calls.length >= 2, "default-off keeps the pre-#17049 failover");
  } finally {
    if (previous === undefined) delete process.env.PROVIDER_SAFETY_STOPS_TERMINAL;
    else process.env.PROVIDER_SAFETY_STOPS_TERMINAL = previous;
  }
});

test("ordinary in-stream server failure still falls back (scope guard)", async () => {
  const opts = options("priority");
  const calls: string[] = [];
  opts.handleSingleModel = async (_body, model) => {
    calls.push(model);
    return calls.length === 1
      ? sse([
          {
            type: "response.failed",
            sequence_number: 1,
            response: {
              status: "failed",
              error: { code: "no_capacity", type: "server_error", message: "peak capacity" },
            },
          },
        ])
      : sse(okFrames);
  };
  const response = await handleComboChat(opts);
  assert.equal(response.status, 200);
  assert.ok(calls.length >= 2, "non-safety stream failures keep ordinary failover");
});

function slowJson(body: unknown, status: number): Promise<Response> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          new Response(JSON.stringify(body), {
            status,
            headers: { "Content-Type": "application/json" },
          })
        ),
      60
    )
  );
}

async function frames(response: Response): Promise<Record<string, unknown>[]> {
  const text = await response.text();
  return [...text.matchAll(/^data: (.+)$/gm)].map((m) => JSON.parse(m[1]));
}

test("keepalive-committed 403 safety JSON is a terminal response.failed with the explicit code", async () => {
  const res = await withEarlyStreamKeepalive(
    slowJson(
      {
        error: {
          message: SAFETY_MESSAGE,
          type: "invalid_request_error",
          code: "misalignment_policy_violation",
        },
      },
      403
    ),
    { thresholdMs: 10, intervalMs: 1000, errorFrame: OPENAI_RESPONSES_ERROR_FRAME }
  );
  assert.equal(res.status, 200, "slow path committed before the refusal");
  const last = (await frames(res)).at(-1)!;
  assert.equal(
    last.type,
    "response.failed",
    "Codex only reads a fatal policy code from response.failed"
  );
  const response = last.response as { status: string; error: Record<string, unknown> };
  assert.equal(response.status, "failed");
  assert.equal(response.error.code, "misalignment_policy_violation");
  assert.equal(response.error.type, "invalid_request_error");
  assert.equal(response.error.status_code, 403);
});

test("keepalive-committed non-safety error keeps the existing error frame contract", async () => {
  const res = await withEarlyStreamKeepalive(
    slowJson(
      { error: { message: "boom", type: "permission_error", code: "permission_denied" } },
      403
    ),
    { thresholdMs: 10, intervalMs: 1000, errorFrame: OPENAI_RESPONSES_ERROR_FRAME }
  );
  const last = (await frames(res)).at(-1)!;
  assert.equal(last.type, "error");
  assert.equal(last.code, "permission_denied");
  assert.equal(last.status_code, 403);
});

test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  assert.equal(network.mock.callCount(), 0, "all stream safety tests must remain offline");
  network.mock.restore();
});
