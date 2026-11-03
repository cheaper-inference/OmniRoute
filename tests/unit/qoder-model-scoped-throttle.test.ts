// Qoder's queue throttle (#18572) is a MODEL-scoped, temporary condition: a
// `503 upstream_busy` whose body names the model that was queued. Parking the
// whole connection on it makes every sibling model of that Qoder account look
// dead, even though only the queued model was throttled.
//
// The mechanism to keep 500/429 failures model-scoped already exists
// (open-sse/services/combo/executeTargetAttempt.ts skips the connection
// cooldown for providers where hasPerModelQuota() is true). Qoder simply was
// not on that allowlist, so this suite pins the allowlist entry and the
// behaviour a throttled Qoder account must have.
import test from "node:test";
import assert from "node:assert/strict";

import {
  checkFallbackError,
  hasPerModelQuota,
  lockModelIfPerModelQuota,
  isModelLocked,
  clearAllModelLockouts,
} from "../../open-sse/services/accountFallback.ts";
import { isQoderUpstreamBusy } from "../../open-sse/services/qoderCli.ts";

const PROVIDER = "qoder";
const MODEL = "qwen3.8-max-preview";
const SIBLING_MODEL = "kimi-k3";
const CONNECTION = "qoder-conn-3213";

/**
 * The envelope Qoder really answers a queued request with.
 *
 * Captured live from the inference endpoint: the HTTP status is 200 and the
 * real refusal rides inside the SSE `data:` frame, where `body` is itself a
 * JSON string carrying upstream code `10605` and its `retryAfterSeconds`.
 * `parseQoderCliFailure()` unwraps that envelope before `isQoderUpstreamBusy()`
 * ever sees it.
 */
const QUEUED_BODY = JSON.stringify({
  headers: { "Content-Type": ["application/json"] },
  body: JSON.stringify({
    code: "10605",
    message: "Model is queued, retryAfterSeconds: 30",
  }),
  statusCodeValue: 403,
  statusCode: "FORBIDDEN",
});

/** The normalized shape `parseQoderCliFailure()` reduces the envelope to. */
const QUEUED_BODY_NORMALIZED = JSON.stringify({
  error: {
    message: "Qoder queued the request for qwen3.8-max-preview — retry after 30s",
    type: "provider_error",
    code: "upstream_busy",
  },
});

test("#18572: qoder is a per-model-quota provider", () => {
  assert.equal(
    hasPerModelQuota(PROVIDER, MODEL),
    true,
    "qoder multiplexes every model behind one connection; a model-level 503 must not cool the account"
  );
});

test("#18572: a 503 naming the requested model is model-scoped, not connection-wide", () => {
  assert.equal(
    isQoderUpstreamBusy(QUEUED_BODY),
    true,
    "the captured upstream envelope (code 10605) must classify as a queue throttle"
  );
  assert.equal(
    isQoderUpstreamBusy(QUEUED_BODY_NORMALIZED),
    true,
    "the normalized body parseQoderCliFailure() emits must classify the same way"
  );

  const result = checkFallbackError(503, QUEUED_BODY, 0, MODEL, PROVIDER);
  assert.equal(result.shouldFallback, true, "a queued request must still fail over");
  assert.notEqual(
    result.reason,
    "auth_error",
    "a queue throttle is never an authentication failure"
  );
});

test("#18572: locking the queued model leaves the connection and its siblings usable", () => {
  clearAllModelLockouts();

  const locked = lockModelIfPerModelQuota(PROVIDER, CONNECTION, MODEL, "model_capacity", 30_000);
  assert.equal(locked, true, "qoder must lock the throttled model instead of the connection");

  assert.equal(
    isModelLocked(PROVIDER, CONNECTION, MODEL),
    true,
    "the queued model is out of rotation for the cooldown"
  );
  assert.equal(
    isModelLocked(PROVIDER, CONNECTION, SIBLING_MODEL),
    false,
    "a sibling model on the same Qoder connection was never queued and must stay routable"
  );

  clearAllModelLockouts();
});

test("#18572: an unrelated provider is unaffected by the allowlist entry", () => {
  assert.equal(
    hasPerModelQuota("openai", MODEL),
    false,
    "the qoder entry must not widen per-model semantics for single-model connections"
  );
});
