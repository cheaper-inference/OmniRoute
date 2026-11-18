// #18360: when every combo target fails authentication, the terminal diagnostics
// must not tell the client to retry. Drives the real handleComboChat loop with a
// stubbed handleSingleModel so the terminalReason selection is covered end to end.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auth-rejected-18360-"));
const previousDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = dataDir;
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { buildRecoveryHint } = await import("../../open-sse/services/combo/pinRecovery.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.beforeEach(() => {
  resetAllCircuitBreakers();
});
test.after(() => {
  resetAllCircuitBreakers();
  resetDbInstance();
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type Failure = { status: number; message: string };

async function runCombo(name: string, failures: Record<string, Failure>) {
  const response = await handleComboChat({
    body: {},
    combo: {
      name,
      strategy: "priority",
      models: Object.keys(failures).map((model) => ({ model })),
      config: { maxRetries: 0, maxSetRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    isModelAvailable: () => true,
    handleSingleModel: async (_body: unknown, model: string) => {
      const failure = failures[model];
      return new Response(
        JSON.stringify({ error: { message: failure.message, type: "upstream_error" } }),
        { status: failure.status, headers: { "content-type": "application/json" } }
      );
    },
    log: { info() {}, warn() {}, debug() {}, error() {} },
    settings: null,
    allCombos: null,
  });
  const body = (await response.json()) as {
    error?: { diagnostics?: { terminalReason?: string; recovery?: { action?: string } } };
    diagnostics?: { terminalReason?: string; recovery?: { action?: string } };
    recovery_hint?: { action?: string; next_step?: string };
  };
  const diagnostics = body.error?.diagnostics ?? body.diagnostics;
  return { response, diagnostics, recoveryHint: body.recovery_hint };
}

const AUTH = "Upstream rejected token: Authorization Failed (invalid token)";

test("all-auth combo failure reports authentication_rejected and does not recommend retry", async () => {
  const { response, diagnostics, recoveryHint } = await runCombo("auth-18360-all", {
    "openai/a": { status: 502, message: AUTH },
    "claude/b": { status: 401, message: "Invalid API key" },
  });
  assert.ok(response.status >= 400);
  assert.equal(
    response.headers.get("x-omniroute-combo-terminal-reason"),
    "authentication_rejected"
  );
  assert.equal(diagnostics?.terminalReason, "authentication_rejected");
  assert.equal(diagnostics?.recovery?.action, "switch-combo");

  // The sanitized response keeps 200 chars in the body and 128 in the header. The
  // hint must survive both whole, including the /dashboard/providers pointer.
  const fullHint = buildRecoveryHint("authentication_rejected").next_step;
  const headerHint = response.headers.get("x-omniroute-recovery-next-step") ?? "";
  assert.match(headerHint, /\/dashboard\/providers/);
  assert.equal(headerHint, fullHint, "header hint must not be truncated");
  assert.equal(recoveryHint?.action, "switch-combo");
  assert.equal(recoveryHint?.next_step, fullHint, "body hint must not be cut mid-word");
});

test("mixed auth and provider failures keep the transient retry hint", async () => {
  const { response, diagnostics } = await runCombo("auth-18360-mixed", {
    "openai/a": { status: 401, message: "Invalid API key" },
    "claude/b": { status: 503, message: "Service unavailable" },
  });
  assert.notEqual(
    response.headers.get("x-omniroute-combo-terminal-reason"),
    "authentication_rejected"
  );
  assert.notEqual(diagnostics?.terminalReason, "authentication_rejected");
  assert.equal(diagnostics?.recovery?.action, "retry");
});
