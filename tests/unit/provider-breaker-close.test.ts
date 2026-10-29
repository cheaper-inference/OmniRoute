import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getCircuitBreaker,
  resetAllCircuitBreakers,
} from "../../src/shared/utils/circuitBreaker.ts";
import { recordProviderSuccess } from "../../open-sse/services/accountFallback.ts";
import { connectionCircuitBreakerName } from "../../open-sse/services/connectionCircuitBreaker.ts";

const unique = (suffix: string) =>
  `breaker-close-${suffix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

test("closing a half-open connection breaker emits one close line", async () => {
  const provider = unique("close");
  const connectionId = "conn-1";
  const connectionBreaker = getCircuitBreaker(
    connectionCircuitBreakerName(provider, connectionId),
    { failureThreshold: 1, resetTimeout: 80 }
  );
  connectionBreaker._onFailure();
  assert.equal(connectionBreaker.state, "OPEN");
  await new Promise((r) => setTimeout(r, 120));
  connectionBreaker.canExecute();
  assert.equal(connectionBreaker.state, "HALF_OPEN");

  const logged: unknown[][] = [];
  try {
    recordProviderSuccess(provider, connectionId, undefined, {
      info: (...args: unknown[]) => {
        logged.push(args);
      },
    });
    assert.equal(connectionBreaker.state, "CLOSED");
    assert.equal(logged.length, 1);
    assert.match(String(logged[0][0]), /circuit breaker closed/);
    assert.ok(String(logged[0][0]).includes(`${provider}/${connectionId}`), "names the connection");
  } finally {
    resetAllCircuitBreakers();
  }
});

test("provider OPEN without a probe lease stays silent", () => {
  const provider = unique("open");
  const breaker = getCircuitBreaker(provider, { failureThreshold: 1, resetTimeout: 60_000 });
  breaker._onFailure();
  assert.equal(breaker.state, "OPEN");
  const logged: unknown[][] = [];
  try {
    recordProviderSuccess(provider, undefined, undefined, {
      info: (...args: unknown[]) => {
        logged.push(args);
      },
    });
    assert.equal(breaker.state, "OPEN");
    assert.equal(logged.length, 0);
  } finally {
    resetAllCircuitBreakers();
  }
});

test("provider-level HALF_OPEN is not settled here and logs nothing (connection-only close log)", async () => {
  const provider = unique("provider-half-open");
  const breaker = getCircuitBreaker(provider, { failureThreshold: 1, resetTimeout: 80 });
  breaker._onFailure();
  await new Promise((r) => setTimeout(r, 120));
  breaker.canExecute();
  assert.equal(breaker.state, "HALF_OPEN");
  const logged: unknown[][] = [];
  try {
    recordProviderSuccess(provider, undefined, undefined, {
      info: (...args: unknown[]) => {
        logged.push(args);
      },
    });
    // The provider breaker closes in its own execute() probe or the chat success settle;
    // recordProviderSuccess must neither close it nor claim it closed.
    assert.equal(breaker.state, "HALF_OPEN");
    assert.equal(logged.length, 0);
  } finally {
    resetAllCircuitBreakers();
  }
});

test("a success on an already CLOSED connection breaker logs nothing", () => {
  const provider = unique("closed");
  const connectionId = "conn-closed";
  const connectionBreaker = getCircuitBreaker(
    connectionCircuitBreakerName(provider, connectionId),
    { failureThreshold: 5, resetTimeout: 60_000 }
  );
  assert.equal(connectionBreaker.state, "CLOSED");
  const logged: unknown[][] = [];
  try {
    recordProviderSuccess(provider, connectionId, undefined, {
      info: (...args: unknown[]) => {
        logged.push(args);
      },
    });
    assert.equal(connectionBreaker.state, "CLOSED");
    assert.equal(logged.length, 0);
  } finally {
    resetAllCircuitBreakers();
  }
});
