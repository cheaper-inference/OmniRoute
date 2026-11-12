import assert from "node:assert/strict";
import { mock, test } from "node:test";
import { resolveSelfPingConfig, startSelfPinger } from "../../../scripts/build/runtime-env.mjs";

const BASE = "https://omni.example.test";

for (const value of [
  "/\\other.example.test/health",
  "/\t/other.example.test/health",
  "/\r/other.example.test/health",
  "/\n/other.example.test/health",
]) {
  test(`path normalization must preserve the configured origin: ${JSON.stringify(value)}`, () => {
    assert.deepEqual(resolveSelfPingConfig({ SELF_PING_URL: BASE, SELF_PING_PATH: value }), {
      status: "invalid",
    });
  });
}

test("normalizes relative path segments without rejecting the same origin", () => {
  const config = resolveSelfPingConfig({
    SELF_PING_URL: BASE,
    SELF_PING_PATH: "/api/../api/monitoring/health?probe=1",
  });
  assert.equal(config.status, "on");
  assert.equal(config.target.origin, BASE);
  assert.equal(config.target.pathname, "/api/monitoring/health");
  assert.equal(config.target.search, "?probe=1");
});

for (const value of ["2147484", "9007199254740993"]) {
  test(`interval overflow does not become a one millisecond polling loop: ${value}`, () => {
    const config = resolveSelfPingConfig({
      SELF_PING_URL: BASE,
      SELF_PING_INTERVAL_SECONDS: value,
    });
    assert.equal(config.status, "on");
    assert.equal(config.intervalSeconds, 180);
  });
}

test("accepts the largest interval representable by a Node timer", () => {
  const config = resolveSelfPingConfig({
    SELF_PING_URL: BASE,
    SELF_PING_INTERVAL_SECONDS: "2147483",
  });
  assert.equal(config.intervalSeconds, 2147483);
});

test("redirect responses remain at the configured service and release their body", async () => {
  const log = mock.method(console, "log", () => {});
  const warn = mock.method(console, "warn", () => {});
  mock.timers.enable({ apis: ["setTimeout", "setInterval"] });
  let cancelled = 0;
  const response = new Response(
    new ReadableStream({
      cancel() {
        cancelled += 1;
      },
    }),
    {
      status: 302,
      headers: { location: "https://other.example.test/health" },
    }
  );
  const fetchImpl = mock.fn(async () => response);
  try {
    startSelfPinger({ SELF_PING_URL: BASE }, fetchImpl);
    mock.timers.tick(60_000);
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal(fetchImpl.mock.callCount(), 1);
    const [target, options] = fetchImpl.mock.calls[0].arguments;
    assert.equal(target.origin, BASE);
    assert.equal(options.redirect, "manual", "fetch must not follow an external Location");
    assert.equal(cancelled, 1);
  } finally {
    mock.timers.reset();
    log.mock.restore();
    warn.mock.restore();
  }
});
