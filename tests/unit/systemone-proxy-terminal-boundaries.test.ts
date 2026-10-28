import { after, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "systemone-terminal-"));
process.env.DATA_DIR = directory;
process.env.API_KEY_SECRET = "synthetic-systemone-terminal-secret";
const { handleSystemOneProxy } = await import("../../open-sse/handlers/systemOne.ts");
const { dispatchSystemOne } = await import("../../src/app/api/v1/systemone/dispatch.ts");
const { resolveSystemOneCandidates } = await import("../../open-sse/config/systemOneRegistry.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
after(() => {
  resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

type ProxyDependencies = import("../../open-sse/handlers/systemOne.ts").SystemOneProxyDeps;
const body = {
  model: "typesafe/jev-1.14",
  state: "synthetic red lamp",
  questions: { lamp: { type: "noul", instructions: "Is the lamp red?" } },
};
const options = {
  provider: "openrouter",
  canonicalModel: "openrouter/typesafe/jev-1.14",
  body,
  credentials: { connectionId: "synthetic-one", apiKey: "synthetic-provider-key" },
};
const answer = () =>
  Response.json({
    answers: { lamp: { type: "noul", noul: 1 } },
    usage: { input_tokens: 2, output_tokens: 1 },
  });
function harness(overrides: Partial<ProxyDependencies> = {}) {
  const counts = { physical: 0, logs: 0, usage: 0, cooldowns: 0, selections: 0 };
  const rows: Record<string, unknown>[] = [];
  const deps: Partial<ProxyDependencies> = {
    withCapacity: async (_options, _signal, run) => run(),
    fetchSystemOne: async () => {
      counts.physical++;
      return answer();
    },
    saveCallLog: async () => {
      counts.logs++;
    },
    saveRequestUsage: async (row) => {
      counts.usage++;
      rows.push(row);
    },
    recordCost: () => {},
    calculateCost: async () => ({ costUsd: 0, priced: false }),
    markAccountUnavailable: async () => {
      counts.cooldowns++;
    },
    ...overrides,
  };
  return { counts, rows, deps };
}
async function throughDispatch(h: ReturnType<typeof harness>, apiKeyInfo?: { id: string }) {
  return dispatchSystemOne(
    {
      candidates: resolveSystemOneCandidates(options.canonicalModel),
      body,
      requestedModel: options.canonicalModel,
      apiKeyInfo,
    },
    {
      authorizeAttempt: async () => null,
      selectCredentials: async () => {
        h.counts.selections++;
        return {
          apiKey: "synthetic-provider-key",
          connectionId: `synthetic-${h.counts.selections}`,
        };
      },
      dispatch: (attempt) => handleSystemOneProxy(attempt, h.deps),
      clearRecoveredProviderState: async () => {},
    }
  );
}

for (const shape of ["valid", "malformed"] as const) {
  for (const writer of ["usage", "log"] as const) {
    test(`${shape} billed HTTP200 plus ${writer} writer failure never rotates or replays`, async () => {
      const h = harness();
      h.deps.fetchSystemOne = async () => {
        h.counts.physical++;
        return shape === "valid"
          ? answer()
          : Response.json({
              answers: {},
              usage: { input_tokens: 2, output_tokens: 1, cost: 0.01 },
            });
      };
      if (writer === "usage")
        h.deps.saveRequestUsage = async () => {
          h.counts.usage++;
          throw new Error("synthetic storage error");
        };
      else
        h.deps.saveCallLog = async () => {
          h.counts.logs++;
          throw new Error("synthetic log error");
        };
      const response = await throughDispatch(h);
      assert.equal(h.counts.physical, 1);
      assert.equal(response.status, 503);
      assert.equal(h.counts.selections, 1);
      assert.equal(h.counts.cooldowns, 0);
      assert.equal(writer === "usage" ? h.counts.usage : h.counts.logs, 1);
      assert.equal(response.headers.get("x-omniroute-accounting-status"), "failed");
      assert.doesNotMatch(await response.text(), /synthetic storage error|synthetic log error/);
    });
  }
}

function boundedStream(chunks: Uint8Array[], onCancel: () => void) {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(chunk);
    },
    cancel() {
      onCancel();
    },
  });
}
for (const status of [200, 403]) {
  for (const declared of [false, true]) {
    test(`HTTP${status} ${declared ? "declared-large" : "chunked"} response is bounded and terminal`, async () => {
      const h = harness();
      let cancelled = 0;
      const stream = boundedStream(
        [new Uint8Array(524_288), new Uint8Array(524_288), new Uint8Array(1)],
        () => {
          cancelled++;
        }
      );
      h.deps.fetchSystemOne = async () => {
        h.counts.physical++;
        return new Response(stream, {
          status,
          headers: declared ? { "content-length": "1048577" } : {},
        });
      };
      const response = await throughDispatch(h);
      assert.equal(response.status, 502);
      assert.equal((await response.json()).error.code, "upstream_protocol_error");
      assert.equal(h.counts.physical, 1);
      assert.equal(h.counts.selections, 1);
      assert.equal(h.counts.cooldowns, 0);
      assert.equal(h.counts.logs, 1);
      assert.equal(h.counts.usage, 1);
      assert.deepEqual(h.rows[0].tokens, {
        prompt_tokens: null,
        completion_tokens: null,
        cost_usd: undefined,
      });
      assert.equal(cancelled, 1);
      assert.equal(stream.locked, false);
      assert.equal(response.headers.get("x-omniroute-cost-status"), "unknown");
    });
  }
}

test("cancellation while a response body is pending cancels/releases it and records one unknown attempt", async () => {
  const controller = new AbortController();
  const h = harness();
  let cancelled = 0;
  const stream = boundedStream([], () => {
    cancelled++;
  });
  h.deps.fetchSystemOne = async () => {
    h.counts.physical++;
    setTimeout(() => controller.abort(), 10);
    return new Response(stream);
  };
  const response = await handleSystemOneProxy({ ...options, signal: controller.signal }, h.deps);
  assert.equal(response.status, 499);
  assert.equal(h.counts.physical, 1);
  assert.equal(h.counts.logs, 1);
  assert.equal(h.counts.usage, 1);
  assert.equal(h.counts.cooldowns, 0);
  assert.equal(cancelled, 1);
  assert.equal(stream.locked, false);
  assert.equal((h.rows[0].tokens as { prompt_tokens: unknown }).prompt_tokens, null);
});

for (const mode of ["reject", "throw", "cancel"] as const) {
  test(`postqueue authorization ${mode} makes zero physical calls`, async () => {
    const h = harness();
    const controller = new AbortController();
    let authorizations = 0;
    const response = await handleSystemOneProxy(
      {
        ...options,
        signal: controller.signal,
        authorizeDispatch: async () => {
          authorizations++;
          if (mode === "throw") throw new Error("synthetic-private-policy-error");
          if (mode === "cancel") {
            controller.abort();
            return null;
          }
          return Response.json(
            { error: { message: "synthetic policy rejected" } },
            { status: 503 }
          );
        },
      },
      h.deps
    );
    assert.equal(authorizations, 1);
    assert.equal(response.status, mode === "cancel" ? 499 : 503);
    assert.equal(h.counts.physical, 0);
    assert.equal(h.counts.usage, 0);
    assert.equal(h.counts.cooldowns, 0);
    assert.doesNotMatch(await response.text(), /synthetic-private-policy-error/);
  });
}

test("reported cost survives a terminal cost-writer failure without another provider call", async () => {
  const h = harness();
  let costWrites = 0;
  h.deps.fetchSystemOne = async () => {
    h.counts.physical++;
    return Response.json({
      answers: { lamp: { type: "noul", noul: 1 } },
      usage: { input_tokens: 2, output_tokens: 1, cost: 0.01 },
    });
  };
  h.deps.recordCost = () => {
    costWrites++;
    throw new Error("synthetic-cost-writer-error");
  };
  const response = await throughDispatch(h, { id: "synthetic-capped-key" });
  assert.equal(response.status, 503);
  assert.equal(h.counts.physical, 1);
  assert.equal(h.counts.selections, 1);
  assert.equal(costWrites, 1);
  assert.equal(h.counts.usage, 1);
  assert.equal(h.counts.logs, 1);
  assert.equal(h.counts.cooldowns, 0);
  assert.equal(response.headers.get("x-omniroute-cost-status"), "known");
  assert.equal(response.headers.get("x-omniroute-response-cost"), "0.01");
  assert.equal((h.rows[0].tokens as { cost_usd: unknown }).cost_usd, 0.01);
  assert.doesNotMatch(await response.text(), /synthetic-cost-writer-error/);
});

test("bounded chunked JSON accepts split UTF8 and releases a successful reader", async () => {
  const h = harness();
  const bytes = new TextEncoder().encode(
    JSON.stringify({
      answers: { lamp: { type: "noul", noul: 1 } },
      note: "synthetic é",
      usage: { input_tokens: 2, output_tokens: 1 },
    })
  );
  const split = bytes.indexOf(0xc3) + 1;
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(bytes.slice(0, split));
      controller.enqueue(bytes.slice(split));
      controller.close();
    },
  });
  h.deps.fetchSystemOne = async () => {
    h.counts.physical++;
    return new Response(stream);
  };
  const response = await throughDispatch(h);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).note, "synthetic é");
  assert.equal(stream.locked, false);
  assert.equal(h.counts.physical, 1);
  assert.equal(h.counts.logs, 1);
  assert.equal(h.counts.usage, 1);
});

for (const window of ["cold", "warm"] as const) {
  for (const outcome of ["valid", "malformed", "error"] as const) {
    test(`${window} token window counts one ${outcome} provider receipt before history insertion`, async () => {
      const { createApiKey } = await import("../../src/lib/db/apiKeys.ts");
      const { upsertTokenLimit } = await import("../../src/lib/db/tokenLimits.ts");
      const { checkTokenLimits, recordTokenUsage } =
        await import("../../open-sse/services/tokenLimitCounter.ts");
      const key = await createApiKey(
        `Synthetic ${window} ${outcome} counter`,
        `synthetic-counter-${window}-${outcome}`
      );
      upsertTokenLimit({ apiKeyId: key.id, scopeType: "global", tokenLimit: 1 });
      if (window === "warm") {
        recordTokenUsage(key.id, "openrouter", "typesafe/jev-1.14", 3);
        await Promise.resolve();
        assert.equal(checkTokenLimits(key.id)?.tokensUsed, 3);
      }
      const response = await handleSystemOneProxy(
        { ...options, apiKeyInfo: { id: key.id } },
        {
          withCapacity: async (_options, _signal, run) => run(),
          fetchSystemOne: async () =>
            Response.json(
              {
                answers: outcome === "valid" ? { lamp: { type: "noul", noul: 1 } } : {},
                usage: { input_tokens: 10, output_tokens: 1 },
              },
              { status: outcome === "error" ? 429 : 200 }
            ),
          recordCost: () => {},
          markAccountUnavailable: async () => {},
        }
      );
      assert.equal(response.status, outcome === "valid" ? 200 : outcome === "error" ? 429 : 502);
      assert.equal(checkTokenLimits(key.id)?.tokensUsed, window === "warm" ? 14 : 11);
    });
  }
}
