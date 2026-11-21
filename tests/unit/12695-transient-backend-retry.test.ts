import * as retry from "../../open-sse/services/transientBackendRetry";
import assert from "node:assert/strict";
import test from "node:test";

const { isResponseStatusRetryable, runWithTransientBackendRetry, TRANSIENT_BACKEND_STATUS_CODES } =
  retry;

const sleepImpl = async (_ms: number, _signal?: AbortSignal): Promise<void> => {
  // no-op
};

test("transientBackendRetry: classify 502/503/504 as retryable, others not", () => {
  for (const code of [502, 503, 504]) {
    assert.equal(isResponseStatusRetryable(code), true, `${code} should be retryable`);
  }
  for (const code of [400, 401, 403, 404, 409, 422, 429, 500, 501, 505, 507, 510]) {
    assert.equal(isResponseStatusRetryable(code), false, `${code} should NOT be retryable`);
  }
  assert.equal(
    TRANSIENT_BACKEND_STATUS_CODES.has(429),
    false,
    "429 is intentionally not retryable here — the upstream proxy treats 429 as a permanent policy signal"
  );
});

test("transientBackendRetry: returns the first success without retrying", async () => {
  let calls = 0;
  const result = await runWithTransientBackendRetry(
    async () => {
      calls++;
      return { ok: true, status: 200, body: "hello" };
    },
    { sleep: sleepImpl }
  );
  assert.equal(calls, 1);
  assert.deepEqual(result, { ok: true, status: 200, body: "hello" });
});

test("transientBackendRetry: retries on 502/503/504 then returns success", async () => {
  let calls = 0;
  const result = await runWithTransientBackendRetry(
    async () => {
      calls++;
      if (calls < 3) {
        return { ok: false, status: 503, body: null };
      }
      return { ok: true, status: 200, body: "ok" };
    },
    { sleep: sleepImpl, maxAttempts: 5, baseMs: 1, capMs: 4 }
  );
  assert.equal(calls, 3, "should have tried exactly 3 times");
  assert.equal(result.ok, true);
  assert.equal(result.status, 200);
});

test("transientBackendRetry: returns last error when budget exhausted", async () => {
  let calls = 0;
  const result = await runWithTransientBackendRetry(
    async () => {
      calls++;
      return { ok: false, status: 502, body: null };
    },
    { sleep: sleepImpl, maxAttempts: 3, baseMs: 1, capMs: 4 }
  );
  assert.equal(calls, 3, "should have tried exactly 3 times");
  assert.equal(result.ok, false);
  assert.equal(result.status, 502);
});

test("transientBackendRetry: bubbles non-retryable errors immediately", async () => {
  let calls = 0;
  // 401 is NOT transient — should NOT retry (would mean classify failed)
  const result = await runWithTransientBackendRetry(
    async () => {
      calls++;
      return { ok: false, status: 401, body: "nope" };
    },
    { sleep: sleepImpl, maxAttempts: 5, baseMs: 1, capMs: 4 }
  );
  assert.equal(calls, 1, "non-retryable must not retry");
  assert.equal(result.status, 401);
});

test("transientBackendRetry: throws on exhausted attempts for thrown errors", async () => {
  let calls = 0;
  await assert.rejects(async () => {
    await runWithTransientBackendRetry(
      async () => {
        calls++;
        throw new Error("network down");
      },
      { sleep: sleepImpl, maxAttempts: 2, baseMs: 1, capMs: 4 }
    );
  }, /network down/);
  assert.equal(calls, 2, "should retry transient-thrown errors until budget");
});

test("transientBackendRetry: honours AbortSignal mid-flight", async () => {
  const ac = new AbortController();
  let calls = 0;
  const promise = runWithTransientBackendRetry(
    async () => {
      calls++;
      return { ok: false, status: 503, body: null };
    },
    {
      sleep: async (_ms) => {
        // Wait a tick so the test can abort during the sleep
        await new Promise((resolve) => setTimeout(resolve, 5));
        // Simulate the helper aborting the sleep
        if (ac.signal.aborted) {
          throw Object.assign(new Error("aborted"), { name: "AbortError" });
        }
      },
      maxAttempts: 3,
      baseMs: 1,
      capMs: 4,
      signal: ac.signal,
    }
  );
  setTimeout(() => ac.abort(), 10);
  await assert.rejects(promise, /aborted|cancelled/i);
  assert.ok(calls >= 1, "should have called the action at least once before abort");
});

test("transientBackendRetry: default sleep respects AbortSignal without custom sleep", async () => {
  const ac = new AbortController();
  let calls = 0;
  const promise = runWithTransientBackendRetry(
    async () => {
      calls++;
      return { ok: false, status: 503, body: null };
    },
    { maxAttempts: 5, baseMs: 50, capMs: 100, signal: ac.signal }
  );
  // Abort during the first sleep — should reject quickly, not after 50-100ms
  setTimeout(() => ac.abort(), 10);
  const start = Date.now();
  await assert.rejects(promise, /aborted/i);
  const elapsed = Date.now() - start;
  assert.ok(
    elapsed < 80,
    `should abort quickly (elapsed ${elapsed}ms), not wait for the full sleep`
  );
  assert.ok(calls >= 1);
});

test("transientBackendRetry: onRetry receives source label", async () => {
  let calls = 0;
  const retries: Array<{ attempt: number; status?: number; source?: string }> = [];
  await runWithTransientBackendRetry(
    async () => {
      calls++;
      if (calls < 2) return { ok: false, status: 503, body: null };
      return { ok: true, status: 200, body: "ok" };
    },
    {
      sleep: sleepImpl,
      maxAttempts: 3,
      baseMs: 1,
      capMs: 4,
      source: "global-fallback",
      onRetry: (info) => {
        retries.push(info);
      },
    }
  );
  assert.equal(retries.length, 1);
  assert.equal(retries[0].source, "global-fallback");
  assert.equal(retries[0].status, 503);
});

test("transientBackendRetry: decorrelated jitter is bounded by capMs", async () => {
  let calls = 0;
  await runWithTransientBackendRetry(
    async () => {
      calls++;
      return { ok: false, status: 503, body: null };
    },
    { sleep: sleepImpl, maxAttempts: 5, baseMs: 1, capMs: 4 }
  );
  assert.equal(calls, 5);
});

test("transientBackendRetry: retries a thrown TypeError with a readable network cause code", async () => {
  let calls = 0;
  let sleeps = 0;
  const maxAttempts = 3;
  const cause = Object.assign(new Error("fetch failed"), { code: "ECONNREFUSED" });
  await assert.rejects(async () => {
    await runWithTransientBackendRetry(
      async () => {
        calls++;
        throw Object.assign(new TypeError("fetch failed"), { cause });
      },
      {
        sleep: async () => {
          sleeps++;
        },
        maxAttempts,
        baseMs: 1,
        capMs: 4,
      }
    );
  }, /fetch failed/);
  assert.equal(
    calls,
    maxAttempts,
    "a network-rooted TypeError is retried until the budget is spent"
  );
  assert.equal(sleeps, maxAttempts - 1, "one sleep between each retry");
});

test("transientBackendRetry: propagates a plain TypeError without retrying or sleeping", async () => {
  let calls = 0;
  let sleeps = 0;
  const thrown = new TypeError("cannot read property of undefined");
  await assert.rejects(
    async () => {
      await runWithTransientBackendRetry(
        async () => {
          calls++;
          throw thrown;
        },
        {
          sleep: async () => {
            sleeps++;
          },
          maxAttempts: 3,
          baseMs: 1,
          capMs: 4,
        }
      );
    },
    (error: unknown) => error === thrown
  );
  assert.equal(calls, 1, "a plain TypeError surfaces on the first attempt");
  assert.equal(sleeps, 0, "no backoff sleep for a programming error");
});

test("transientBackendRetry: propagates a TypeError that names a network property", async () => {
  let calls = 0;
  let sleeps = 0;
  const thrown = new TypeError("Cannot read properties of undefined (reading 'network')");
  await assert.rejects(
    async () => {
      await runWithTransientBackendRetry(
        async () => {
          calls++;
          throw thrown;
        },
        {
          sleep: async () => {
            sleeps++;
          },
          maxAttempts: 3,
          baseMs: 1,
          capMs: 4,
        }
      );
    },
    (error: unknown) => error === thrown
  );
  assert.equal(calls, 1, "a TypeError naming a network property surfaces on the first attempt");
  assert.equal(sleeps, 0, "no backoff sleep for a programming error mentioning network");
});

test("transientBackendRetry: propagates an AbortError thrown by the action without retrying", async () => {
  let calls = 0;
  let sleeps = 0;
  const ac = new AbortController();
  const thrown = Object.assign(new Error("operation aborted"), { name: "AbortError" });
  await assert.rejects(
    async () => {
      await runWithTransientBackendRetry(
        async () => {
          calls++;
          throw thrown;
        },
        {
          sleep: async () => {
            sleeps++;
          },
          maxAttempts: 3,
          baseMs: 1,
          capMs: 4,
          signal: ac.signal,
        }
      );
    },
    (error: unknown) => error === thrown
  );
  assert.equal(calls, 1, "an AbortError from the action surfaces immediately");
  assert.equal(sleeps, 0, "no retry sleep after an AbortError");
});

test("transientBackendRetry: retries an error carrying a retryable network code", async () => {
  let calls = 0;
  let sleeps = 0;
  const maxAttempts = 2;
  await assert.rejects(async () => {
    await runWithTransientBackendRetry(
      async () => {
        calls++;
        throw Object.assign(new Error("connection refused"), { code: "ECONNREFUSED" });
      },
      {
        sleep: async () => {
          sleeps++;
        },
        maxAttempts,
        baseMs: 1,
        capMs: 4,
      }
    );
  }, /connection refused/);
  assert.equal(calls, maxAttempts, "a coded network error is retried");
  assert.equal(sleeps, maxAttempts - 1);
});

test("transientBackendRetry: classifies thrown errors through the predicate", () => {
  const cases: Array<{ label: string; error: unknown; expected: boolean }> = [
    { label: "null", error: null, expected: true },
    {
      label: "AbortError",
      error: Object.assign(new Error("aborted"), { name: "AbortError" }),
      expected: false,
    },
    { label: "plain TypeError", error: new TypeError("bad type"), expected: false },
    {
      label: "TypeError naming a network property",
      error: new TypeError("Cannot read properties of undefined (reading 'network')"),
      expected: false,
    },
    { label: "SyntaxError", error: new SyntaxError("bad syntax"), expected: false },
    {
      label: "coded network error",
      error: Object.assign(new Error("refused"), { code: "ECONNREFUSED" }),
      expected: true,
    },
    {
      label: "TimeoutError",
      error: Object.assign(new Error("timed out"), { name: "TimeoutError" }),
      expected: true,
    },
    {
      label: "fetch failed with cause",
      error: Object.assign(new TypeError("fetch failed"), { cause: { code: "ECONNREFUSED" } }),
      expected: true,
    },
    { label: "opaque error", error: new Error("opaque"), expected: true },
  ];
  for (const { label, error, expected } of cases) {
    assert.equal(
      retry.isRetryableThrownError(error),
      expected,
      `classification mismatch for ${label}`
    );
  }
});

test("transientBackendRetry: keeps retrying an undecidable error with no code or cause", async () => {
  let calls = 0;
  let sleeps = 0;
  const maxAttempts = 2;
  await assert.rejects(async () => {
    await runWithTransientBackendRetry(
      async () => {
        calls++;
        throw new Error("opaque");
      },
      {
        sleep: async () => {
          sleeps++;
        },
        maxAttempts,
        baseMs: 1,
        capMs: 4,
      }
    );
  }, /opaque/);
  assert.equal(calls, maxAttempts, "an undecidable error stays retryable (fail-open)");
  assert.equal(sleeps, maxAttempts - 1);
});
