/**
 * #18019: an unset or unsafe DEVIN_AGENTIC_HOME is operator configuration, not a transient
 * upstream fault. The executor answers 503 with a stable code, and the resilience layer
 * must not cool the shared no-auth connection, trip the provider breaker, replay the
 * request on the same account, or wait before the next combo target.
 */
import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";

const { buildDevinChildEnv, DevinCliAgenticExecutor } =
  await import("../../open-sse/executors/devin-cli-agentic.ts");
const { DevinAgenticBridgeError } = await import("../../open-sse/executors/devin-agentic/types.ts");
const { DEVIN_MODEL_CATALOG } =
  await import("../../open-sse/config/providers/registry/devin/catalog.ts");
const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");
const { isRequestScopedUpstreamFailure, shouldSkipConnDisable } =
  await import("../../open-sse/services/combo/comboPredicates.ts");
const { shouldRetrySameAccountTransport } =
  await import("../../src/sse/services/sameAccountTransportRetry.ts");
const { shouldTripProviderBreakerForResult } =
  await import("../../src/sse/handlers/chatPredicates.ts");
const { projectPublicErrorIdentifier } =
  await import("../../open-sse/utils/publicErrorIdentifiers.ts");

const NOT_CONFIGURED = "devin_bridge_not_configured";
const UNSAFE = "unsafe_devin_home";
const PROVIDER = "devin-cli-agentic";

function bridgeErrorFrom(source: NodeJS.ProcessEnv) {
  try {
    buildDevinChildEnv({}, source);
  } catch (error) {
    assert.ok(error instanceof DevinAgenticBridgeError, "throws a bridge error");
    return error as InstanceType<typeof DevinAgenticBridgeError>;
  }
  assert.fail("expected buildDevinChildEnv to throw");
}

test("unset DEVIN_AGENTIC_HOME is a 503 not-configured error that names the variable", () => {
  for (const value of [undefined, "", "   "]) {
    const source: NodeJS.ProcessEnv = { PATH: "/usr/bin" };
    if (value !== undefined) source.DEVIN_AGENTIC_HOME = value;
    const error = bridgeErrorFrom(source);
    assert.equal(error.code, NOT_CONFIGURED, `code for ${JSON.stringify(value)}`);
    assert.equal(error.status, 503);
    assert.match(error.message, /DEVIN_AGENTIC_HOME/);
    assert.match(error.message, /not configured/);
  }
});

test("a set but unsafe DEVIN_AGENTIC_HOME keeps unsafe_devin_home, now as a 503", () => {
  for (const value of ["/tmp/outside", "relative/.sandbox/home", "/home/bridge2"]) {
    const error = bridgeErrorFrom({ PATH: "/usr/bin", DEVIN_AGENTIC_HOME: value });
    assert.equal(error.code, UNSAFE, `code for ${value}`);
    assert.equal(error.status, 503);
    assert.match(error.message, /DEVIN_AGENTIC_HOME must be an absolute path/);
  }
  const ok = path.join(process.cwd(), ".sandbox", "unit-home-18019");
  assert.equal(buildDevinChildEnv({}, { PATH: "/usr/bin", DEVIN_AGENTIC_HOME: ok }).HOME, ok);
});

test("the executor answers the not-configured case as a 503 with a public code", async () => {
  const previous = process.env.DEVIN_AGENTIC_HOME;
  delete process.env.DEVIN_AGENTIC_HOME;
  try {
    const executor = new DevinCliAgenticExecutor();
    const result = await executor.execute({
      model: DEVIN_MODEL_CATALOG[0].id,
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {},
    } as never);
    assert.equal(result.response.status, 503);
    const body = await result.response.json();
    assert.equal(body.error.code, NOT_CONFIGURED);
    assert.match(body.error.message, /DEVIN_AGENTIC_HOME/);
  } finally {
    if (previous === undefined) delete process.env.DEVIN_AGENTIC_HOME;
    else process.env.DEVIN_AGENTIC_HOME = previous;
  }
  assert.equal(projectPublicErrorIdentifier(NOT_CONFIGURED, "upstream_error"), NOT_CONFIGURED);
  assert.equal(projectPublicErrorIdentifier(UNSAFE, "upstream_error"), UNSAFE);
});

test("checkFallbackError gives a config error no cooldown, no fallback and no breaker", () => {
  // Baseline: the same status without the code is a backoff-cooled server error.
  const plain = checkFallbackError(503, "boom", 0, null, PROVIDER);
  assert.equal(plain.shouldFallback, true);
  assert.ok(plain.cooldownMs > 0, "plain 503 cools down");

  for (const code of [NOT_CONFIGURED, UNSAFE]) {
    for (const status of [503, 500]) {
      const decision = checkFallbackError(status, "cfg", 0, null, PROVIDER, null, null, {
        code,
      });
      assert.equal(decision.shouldFallback, false, `${code}/${status} shouldFallback`);
      assert.equal(decision.cooldownMs, 0, `${code}/${status} cooldownMs`);
      assert.equal(decision.skipProviderBreaker, true, `${code}/${status} breaker`);
      assert.equal(decision.reason, code);
    }
  }
});

test("chat and combo predicates treat a config error as local, not connection health", () => {
  for (const code of [NOT_CONFIGURED, UNSAFE]) {
    assert.equal(isRequestScopedUpstreamFailure({ code }), true, `${code} request-scoped`);
    assert.equal(
      shouldSkipConnDisable({ status: 503, errorCode: code, error: "cfg" }, false, false, PROVIDER),
      true,
      `${code} skips connection cooldown`
    );
    assert.equal(
      shouldTripProviderBreakerForResult({ status: 503, errorCode: code }, false, false),
      false,
      `${code} does not trip the breaker`
    );
    assert.equal(
      shouldRetrySameAccountTransport({
        provider: PROVIDER,
        status: 503,
        errorCode: code,
        attempt: 0,
      }),
      false,
      `${code} is not replayed on the same account`
    );
  }
  // Baselines: an uncoded 503 is still retried once and still trips the breaker.
  assert.equal(
    shouldRetrySameAccountTransport({ provider: PROVIDER, status: 503, attempt: 0 }),
    true
  );
  assert.equal(shouldTripProviderBreakerForResult({ status: 503 }, false, false), true);
  assert.equal(
    shouldSkipConnDisable({ status: 503, error: "boom" }, false, false, PROVIDER),
    false
  );
});
