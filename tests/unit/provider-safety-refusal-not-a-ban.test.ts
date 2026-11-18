/**
 * A provider safety refusal refuses ONE request; it never says anything about the account.
 *
 * Incident: one Codex 403 `misalignment_policy_violation` ("This request was blocked by our
 * safety systems. Reason: Potentially unintended activity.") was classified FORBIDDEN, so
 * chatCore wrote `testStatus: banned, isActive: false` ("banned (403) -- disabling
 * permanently"). The account was healthy; every later request queued on the one remaining
 * account until its concurrency semaphore timed out. Blocks are per-request and can repeat
 * several times a day, so they must not feed the REQUEST_REJECTED streak either (it escalates
 * to a ban after 3 refusals). Detection is by structured code and independent of the
 * PROVIDER_SAFETY_STOPS_TERMINAL routing flag (default off).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { classifyProviderError, PROVIDER_ERROR_TYPES } =
  await import("../../open-sse/services/errorClassifier.ts");
const { resolveTerminalConnectionStatus } =
  await import("../../src/sse/services/authTerminalStatus.ts");

const MESSAGE =
  "This request was blocked by our safety systems. Reason: Potentially unintended activity.";
const codexBlock = JSON.stringify({
  error: { message: MESSAGE, type: "invalid_request_error", code: "misalignment_policy_violation" },
});

test("codex 403 misalignment_policy_violation is a safety refusal, not FORBIDDEN (flag off)", () => {
  delete process.env.PROVIDER_SAFETY_STOPS_TERMINAL;
  const type = classifyProviderError(403, codexBlock, "codex");
  assert.equal(type, PROVIDER_ERROR_TYPES.PROVIDER_SAFETY_REFUSAL);
  assert.notEqual(type, PROVIDER_ERROR_TYPES.REQUEST_REJECTED, "must not feed the ban streak");
});

test("a safety refusal never resolves to a terminal connection status, even when `permanent`", () => {
  const type = classifyProviderError(403, codexBlock, "codex");
  assert.equal(resolveTerminalConnectionStatus(403, { permanent: false }, type, "codex"), null);
  assert.equal(resolveTerminalConnectionStatus(403, { permanent: true }, type, "codex"), null);
});

test("content_policy_violation and the legacy code-less shape are safety refusals too", () => {
  const contentPolicy = {
    error: { message: "blocked", type: "invalid_request_error", code: "content_policy_violation" },
  };
  assert.equal(
    classifyProviderError(400, contentPolicy, "openai"),
    PROVIDER_ERROR_TYPES.PROVIDER_SAFETY_REFUSAL
  );
  const legacy = { error: { message: MESSAGE, type: "invalid_request_error" } };
  assert.equal(
    classifyProviderError(403, legacy, "codex"),
    PROVIDER_ERROR_TYPES.PROVIDER_SAFETY_REFUSAL
  );
});

test("regression guards: real account signals are unchanged; prose alone is not a safety code", () => {
  assert.equal(
    classifyProviderError(403, { error: { message: "you do not have permission" } }, "codex"),
    PROVIDER_ERROR_TYPES.FORBIDDEN
  );
  assert.equal(
    classifyProviderError(
      403,
      { error: { message: `upstream said: ${MESSAGE}`, code: "forbidden" } },
      "codex"
    ),
    PROVIDER_ERROR_TYPES.FORBIDDEN
  );
  assert.equal(
    resolveTerminalConnectionStatus(
      403,
      { permanent: false },
      PROVIDER_ERROR_TYPES.FORBIDDEN,
      "codex"
    ),
    "banned"
  );
});
