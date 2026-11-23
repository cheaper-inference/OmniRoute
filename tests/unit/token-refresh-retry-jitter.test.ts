import test from "node:test";
import assert from "node:assert/strict";

// Opt-in jitter for the retry delay inside refreshWithRetry. Delay base is
// attempt * 1000 ms. With TOKEN_REFRESH_RETRY_JITTER=1 each connection scales
// that delay by 75-125 %, derived from its id, so replicas spread their retries.

const { refreshWithRetry } = await import("../../open-sse/services/tokenRefresh/circuitBreaker.ts");

const FLAG = "TOKEN_REFRESH_RETRY_JITTER";

/** Run one failing attempt + one retry and return the delay the retry loop logged. */
async function firstRetryDelayMs(connectionId: string): Promise<number> {
  let delay = -1;
  const log = {
    debug(_scope: string, message: string) {
      const m = /after (\d+)ms/.exec(message);
      if (m) delay = Number(m[1]);
    },
    info() {},
    warn() {},
    error() {},
  };
  const provider = "jitter-" + connectionId;
  await refreshWithRetry(async () => null, 2, log, provider, {
    connectionId,
    scope: "connection",
  });
  return delay;
}

test("retry delay stays exactly attempt * 1000 ms when the flag is unset", async () => {
  delete process.env[FLAG];
  assert.equal(await firstRetryDelayMs("conn-a"), 1000);
});

test("flag on: delay is 75-125 % of the base, differs per connection, and is repeatable", async () => {
  process.env[FLAG] = "1";
  try {
    const ids = ["conn-a", "conn-b", "conn-c", "conn-d"];
    const delays = await Promise.all(ids.map(firstRetryDelayMs));
    for (const d of delays) assert.ok(d >= 750 && d <= 1250, `delay ${d} outside 750-1250`);
    assert.ok(new Set(delays).size > 1, `all connections got the same delay: ${delays}`);
    assert.equal(await firstRetryDelayMs("conn-a"), delays[0], "same id must give the same delay");
  } finally {
    delete process.env[FLAG];
  }
});
