import assert from "node:assert/strict";
import test from "node:test";

/**
 * The reason a model discovery fell back to a built-in catalog must be shown
 * to the operator, and it must not carry anything the upstream sent: no API
 * key, no token, no raw body, no connection id, no account id, no email.
 *
 * A sanitized free-text message is not enough — the sanitizer keeps a JSON
 * body, an account id inside an URL and an email. The reason is therefore
 * built from a closed vocabulary: a known code, else an HTTP status, else a
 * generic marker. There is no other channel.
 */

/**
 * The module is imported dynamically and a missing module is not fatal for the
 * file: every case then fails on its own assertion, and the failing output
 * names the case instead of the whole file.
 */
type CauseModule = typeof import("../../src/shared/discovery/degradedCause");

const causeModule: CauseModule | null =
  await import("../../src/shared/discovery/degradedCause").catch(() => null);

const {
  applyDiscoveryDegradation,
  buildDegradedCause,
  readDiscoveryDegradation,
  toDiscoveryFailure,
} = causeModule ?? ({} as CauseModule);

test("the discovery reason module is available", () => {
  assert.ok(causeModule, "the discovery reason module must be importable");
});

test("an HTTP status is the reported reason", () => {
  assert.equal(buildDegradedCause({ status: 500 }), "HTTP 500");
  assert.equal(buildDegradedCause({ status: 401 }), "HTTP 401");
  assert.equal(buildDegradedCause({ status: 429 }), "HTTP 429");
});

test("a known code wins over the HTTP status", () => {
  assert.equal(buildDegradedCause({ status: 401, code: "TIMEOUT" }), "TIMEOUT");
  assert.equal(buildDegradedCause({ code: "REDIRECT_BLOCKED" }), "REDIRECT_BLOCKED");
  assert.equal(buildDegradedCause({ code: "URL_GUARD_BLOCKED" }), "URL_GUARD_BLOCKED");
  assert.equal(buildDegradedCause({ code: "INVALID_URL" }), "INVALID_URL");
  assert.equal(buildDegradedCause({ code: "NETWORK_ERROR" }), "NETWORK_ERROR");
});

test("the local reasons are reported as they are", () => {
  assert.equal(buildDegradedCause({ code: "NO_CREDENTIAL" }), "NO_CREDENTIAL");
  assert.equal(buildDegradedCause({ code: "NO_ENDPOINT" }), "NO_ENDPOINT");
  assert.equal(buildDegradedCause({ code: "LOCALITY_REFUSED" }), "LOCALITY_REFUSED");
  assert.equal(buildDegradedCause({ code: "EMPTY_CATALOG" }), "EMPTY_CATALOG");
  assert.equal(buildDegradedCause({ code: "CLIENT_TOO_OLD" }), "CLIENT_TOO_OLD");
});

test("a failure without any readable detail is reported as an upstream error", () => {
  assert.equal(buildDegradedCause({}), "UPSTREAM_ERROR");
  assert.equal(buildDegradedCause([]), "UPSTREAM_ERROR");
});

test("no observed failure means no reason at all", () => {
  assert.equal(buildDegradedCause(null), null);
  assert.equal(buildDegradedCause(undefined), null);
  assert.equal(buildDegradedCause(""), null);
  assert.equal(buildDegradedCause(0), null);
});

test("an unknown code is ignored", () => {
  assert.equal(buildDegradedCause({ code: "SOMETHING_ELSE" }), "UPSTREAM_ERROR");
  assert.equal(buildDegradedCause({ code: "ECONNREFUSED" }), "UPSTREAM_ERROR");
});

test("a status outside the HTTP range is ignored", () => {
  assert.equal(buildDegradedCause({ status: 0 }), "UPSTREAM_ERROR");
  assert.equal(buildDegradedCause({ status: 999 }), "UPSTREAM_ERROR");
  assert.equal(buildDegradedCause({ status: 42 }), "UPSTREAM_ERROR");
});

test("the reason keeps nothing the upstream sent", () => {
  const leakyFailure = {
    message: 'request failed: {"key":"sk-abc"}',
    body: '{"key":"sk-abc","token":"gho_secret"}',
    apiKey: "sk-abc",
    token: "gho_secret",
    url: "https://api.example.com/v1/users/acc_9f8e7d6c5b4a/models",
    connectionId: "conn-77aa11bb22cc",
    accountId: "acct-99zz88",
    email: "operator@example.com",
  };

  const cause = buildDegradedCause(leakyFailure as never);

  assert.equal(cause, "UPSTREAM_ERROR");
  assert.ok(
    !String(cause).includes("sk-abc") &&
      !String(cause).includes("gho_secret") &&
      !String(cause).includes("acc_9f8e7d6c5b4a") &&
      !String(cause).includes("conn-77aa11bb22cc") &&
      !String(cause).includes("acct-99zz88") &&
      !String(cause).includes("operator@example.com"),
    "the reported reason must not carry any upstream secret"
  );
});

test("an observed error is reduced to the closed vocabulary", () => {
  const timeoutError = Object.assign(new Error("timed out"), {
    code: "TIMEOUT",
    status: 504,
  });
  assert.deepEqual(toDiscoveryFailure(timeoutError), { code: "TIMEOUT" });

  const httpError = Object.assign(new Error("request failed"), { status: 401 });
  assert.deepEqual(toDiscoveryFailure(httpError), { status: 401 });

  const leakyError = Object.assign(new Error('{"key":"sk-abc"}'), {
    status: 500,
    apiKey: "sk-abc",
  });
  assert.deepEqual(toDiscoveryFailure(leakyError), { status: 500 });

  const unknownCodeError = Object.assign(new Error("connection refused"), {
    code: "ECONNREFUSED",
  });
  assert.deepEqual(toDiscoveryFailure(unknownCodeError), {});

  assert.deepEqual(toDiscoveryFailure(new Error("boom")), {});
  assert.deepEqual(toDiscoveryFailure(undefined), {});
});

test("a degraded payload is flagged and reports the reason", () => {
  const payload = applyDiscoveryDegradation({
    provider: "aimlapi",
    source: "local_catalog",
    warning: "API unavailable — using local catalog",
    failure: { status: 500 },
  });

  assert.equal(payload.degraded, true);
  assert.equal(payload.error, "HTTP 500");
  assert.equal(
    "failure" in payload,
    false,
    "the internal failure must not reach the response body"
  );
  assert.equal(payload.source, "local_catalog");
  assert.equal(payload.warning, "API unavailable — using local catalog");
});

test("a degraded payload without an observed reason is flagged without a reason", () => {
  const payload = applyDiscoveryDegradation({
    provider: "aimlapi",
    source: "local_catalog",
    warning: "API unavailable — using local catalog",
  });

  assert.equal(payload.degraded, true);
  assert.equal("error" in payload, false);
  assert.equal("failure" in payload, false);
});

test("a healthy payload carries neither the flag nor a reason", () => {
  const payload = applyDiscoveryDegradation({
    provider: "aimlapi",
    source: "api",
    models: [{ id: "a" }],
  });

  assert.equal("degraded" in payload, false);
  assert.equal("error" in payload, false);
  assert.equal("failure" in payload, false);
  assert.equal(payload.source, "api");
});

test("an intentional catalog is not degraded", () => {
  const payload = applyDiscoveryDegradation({
    provider: "reka",
    source: "local_catalog",
    intentional: true,
    failure: { status: 500 },
  });

  assert.equal("degraded" in payload, false);
  assert.equal("error" in payload, false);
  assert.equal("failure" in payload, false);
  assert.equal(payload.intentional, true);
});

test("a degraded payload keeps the reason out of reach of the body", () => {
  const payload = applyDiscoveryDegradation({
    source: "cache",
    warning: "API unavailable — using cached catalog",
    failure: { code: "NO_CREDENTIAL" },
  });

  assert.equal(payload.degraded, true);
  assert.equal(payload.error, "NO_CREDENTIAL");
  assert.equal(JSON.stringify(payload).includes("failure"), false);
});

test("the reader tells a degraded discovery from a healthy one", () => {
  assert.deepEqual(
    readDiscoveryDegradation({
      source: "local_catalog",
      warning: "API unavailable — using local catalog",
      degraded: true,
      error: "HTTP 500",
    }),
    { degraded: true, cause: "HTTP 500" }
  );
  assert.deepEqual(readDiscoveryDegradation({ source: "api", models: [] }), {
    degraded: false,
  });
  assert.deepEqual(
    readDiscoveryDegradation({
      source: "local_catalog",
      intentional: true,
      warning: "Model discovery is not configured for this provider — using local catalog",
    }),
    { degraded: false }
  );
  const withoutReason = readDiscoveryDegradation({
    source: "local_catalog",
    warning: "API unavailable — using local catalog",
    degraded: true,
  });
  assert.equal(withoutReason.degraded, true);
  assert.equal(withoutReason.cause, undefined);
});
