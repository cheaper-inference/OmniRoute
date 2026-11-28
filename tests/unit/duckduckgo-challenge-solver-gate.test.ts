import { test } from "node:test";
import assert from "node:assert/strict";

import {
  DDG_UNSAFE_NODE_SOLVER_ENV,
  DuckDuckGoNodeSolverDisabledError,
  canSolveDuckDuckGoChallenge,
  isDuckDuckGoBrowserBackedEnabled,
  isDuckDuckGoNodeSolverEnabled,
} from "../../open-sse/executors/duckduckgo-web/solverGate.ts";
import { solveDuckDuckGoChallenge } from "../../open-sse/executors/duckduckgo-web/challenge.ts";
import { DuckDuckGoWebExecutor } from "../../open-sse/executors/duckduckgo-web.ts";

const GATE_ENV = [DDG_UNSAFE_NODE_SOLVER_ENV, "OMNIROUTE_BROWSER_POOL", "WEB_COOKIE_USE_BROWSER"];
const saved = Object.fromEntries(GATE_ENV.map((key) => [key, process.env[key]]));

test.beforeEach(() => {
  for (const key of GATE_ENV) delete process.env[key];
});

test.after(() => {
  for (const key of GATE_ENV) {
    if (saved[key] === undefined) delete process.env[key];
    else process.env[key] = saved[key];
  }
});

test("the in-process solver is off unless the operator opts in", () => {
  assert.equal(isDuckDuckGoNodeSolverEnabled({}), false);
  assert.equal(isDuckDuckGoNodeSolverEnabled({ [DDG_UNSAFE_NODE_SOLVER_ENV]: "0" }), false);
  assert.equal(isDuckDuckGoNodeSolverEnabled({ [DDG_UNSAFE_NODE_SOLVER_ENV]: "1" }), true);
  assert.equal(isDuckDuckGoNodeSolverEnabled({ [DDG_UNSAFE_NODE_SOLVER_ENV]: "true" }), true);
});

test("a challenge is solvable through the browser pool or the opted-in solver only", () => {
  assert.equal(canSolveDuckDuckGoChallenge({}), false);
  assert.equal(canSolveDuckDuckGoChallenge({ OMNIROUTE_BROWSER_POOL: "on" }), true);
  assert.equal(canSolveDuckDuckGoChallenge({ WEB_COOKIE_USE_BROWSER: "1" }), true);
  assert.equal(canSolveDuckDuckGoChallenge({ OMNIROUTE_BROWSER_POOL: "off" }), false);
  assert.equal(canSolveDuckDuckGoChallenge({ [DDG_UNSAFE_NODE_SOLVER_ENV]: "on" }), true);
  assert.equal(isDuckDuckGoBrowserBackedEnabled({ [DDG_UNSAFE_NODE_SOLVER_ENV]: "1" }), false);
});

test("solveDuckDuckGoChallenge refuses by default without evaluating the program", async () => {
  let evaluated = false;
  const marker = "__ddgSolverGateEvaluated";
  Object.defineProperty(globalThis, marker, {
    configurable: true,
    set() {
      evaluated = true;
    },
  });
  try {
    const program = Buffer.from(`globalThis.${marker} = 1; ({ client_hashes: ["x"] })`).toString(
      "base64"
    );
    await assert.rejects(
      solveDuckDuckGoChallenge(program, "ua"),
      (error: unknown) => error instanceof DuckDuckGoNodeSolverDisabledError
    );
    assert.equal(evaluated, false);
  } finally {
    delete (globalThis as Record<string, unknown>)[marker];
  }
});

test("the executor answers 503 before any upstream call when no solver is allowed", async () => {
  const originalFetch = globalThis.fetch;
  let fetchCalls = 0;
  globalThis.fetch = (async () => {
    fetchCalls++;
    throw new Error("no network in this test");
  }) as typeof fetch;
  try {
    const executor = new DuckDuckGoWebExecutor();
    const response = await executor.execute({
      model: "gpt-5.4-mini",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      credentials: {},
    } as unknown as Parameters<DuckDuckGoWebExecutor["execute"]>[0]);
    assert.equal(response.status, 503);
    const body = (await response.json()) as { error?: { message?: string } };
    assert.match(String(body.error?.message), /browser pool/);
    assert.equal(fetchCalls, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
