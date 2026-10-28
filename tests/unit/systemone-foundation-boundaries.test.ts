import { test, after } from "node:test";
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

// Allows the same regressions to challenge the preserved original head.
const root = process.env.SYSTEMONE_TEST_ROOT
  ? pathToFileURL(process.env.SYSTEMONE_TEST_ROOT + "/")
  : new URL("../../", import.meta.url);
const registry = await import(new URL("open-sse/config/systemOneRegistry.ts", root).href);
const answers = await import(new URL("open-sse/services/typesafe/systemOneAnswers.ts", root).href);
const { dispatchSystemOne } = await import(
  new URL("src/app/api/v1/systemone/dispatch.ts", root).href
);
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
after(() => resetDbInstance());

const body = {
  model: "jev",
  state: "synthetic task",
  questions: { safe: { type: "noul", instructions: "Is the task safe?" } },
};

test("OpenCode uses the documented native URL and a pinned alias stays versioned on Vercel", () => {
  assert.equal(
    registry.SYSTEMONE_BACKENDS["opencode-zen"].decisionUrl,
    "https://opencode.ai/inference/systemone/v1/systemone"
  );
  const vercel = registry
    .resolveSystemOneCandidates("jev-1.13")
    .find((candidate: { provider: string }) => candidate.provider === "vercel-ai-gateway");
  assert.equal(vercel.model, "typesafe-ai/jev-1.13.0");
});

test("native calls reject hidden LLM fallbacks before credential selection", async () => {
  let selections = 0;
  const response = await dispatchSystemOne(
    {
      candidates: registry.resolveSystemOneCandidates("jev"),
      requestedModel: "jev",
      body: { ...body, providerOptions: { gateway: { models: ["openai/unauthorized-model"] } } },
    },
    {
      selectCredentials: async () => {
        selections++;
        return null;
      },
    }
  );
  assert.equal(response.status, 400);
  assert.equal(selections, 0);
});

test("pre-aborted and mid-selection cancellation never dispatch a provider call", async () => {
  for (const preaborted of [true, false]) {
    const controller = new AbortController();
    if (preaborted) controller.abort();
    let selections = 0,
      calls = 0;
    const response = await dispatchSystemOne(
      {
        candidates: registry.resolveSystemOneCandidates("jev"),
        requestedModel: "jev",
        body,
        signal: controller.signal,
      },
      {
        selectCredentials: async () => {
          selections++;
          controller.abort();
          return { apiKey: "fixture", connectionId: "fixture" };
        },
        dispatch: async () => {
          calls++;
          return new Response(null, { status: 503 });
        },
      }
    );
    assert.equal(response.status, 499);
    assert.equal(selections, preaborted ? 0 : 1);
    assert.equal(calls, 0);
  }
});

test("cancellation between attempts does not select another account or backend", async () => {
  const controller = new AbortController();
  let selections = 0;
  const response = await dispatchSystemOne(
    {
      candidates: registry.resolveSystemOneCandidates("jev"),
      requestedModel: "jev",
      body,
      signal: controller.signal,
    },
    {
      selectCredentials: async () => ({
        apiKey: "fixture",
        connectionId: `fixture-${++selections}`,
      }),
      dispatch: async () => {
        controller.abort();
        return new Response(null, { status: 503 });
      },
    }
  );
  assert.equal(response.status, 499);
  assert.equal(selections, 1);
});

test("a whole-request deadline aborts the active dispatch and stops all fallback", async () => {
  let selections = 0,
    observedAbort = false;
  const keepAlive = setTimeout(() => {}, 2000);
  try {
    const response = await dispatchSystemOne(
      {
        candidates: registry.resolveSystemOneCandidates("jev"),
        requestedModel: "jev",
        body,
        timeoutMs: 15,
      },
      {
        selectCredentials: async () => ({
          apiKey: "fixture",
          connectionId: `fixture-${++selections}`,
        }),
        dispatch: async (options: { signal: AbortSignal }) =>
          new Promise<Response>((resolve) => {
            options.signal.addEventListener(
              "abort",
              () => {
                observedAbort = true;
                resolve(new Response(null, { status: 504 }));
              },
              { once: true }
            );
          }),
      }
    );
    assert.equal(response.status, 504);
    assert.equal(observedAbort, true);
    assert.equal(selections, 1);
  } finally {
    clearTimeout(keepAlive);
  }
});

for (const status of [401, 402, 403]) {
  test(`authentication/entitlement ${status} stops without spending another identity`, async () => {
    let selections = 0;
    const response = await dispatchSystemOne(
      {
        candidates: registry.resolveSystemOneCandidates("jev"),
        requestedModel: "jev",
        body,
      },
      {
        selectCredentials: async () => ({
          apiKey: "fixture",
          connectionId: `fixture-${++selections}`,
        }),
        dispatch: async () => new Response(null, { status }),
      }
    );
    assert.equal(response.status, status);
    assert.equal(selections, 1);
  });
}

test("pending selection is bounded and pending recovery cannot delay a success", async () => {
  const keepAlive = setTimeout(() => {}, 2000);
  try {
    const input = {
      candidates: registry.resolveSystemOneCandidates("jev"),
      requestedModel: "jev",
      body,
      timeoutMs: 15,
    };
    let calls = 0;
    const pending = await dispatchSystemOne(input, {
      selectCredentials: async () => new Promise(() => {}),
      dispatch: async () => {
        calls++;
        return new Response();
      },
    });
    assert.equal(pending.status, 504);
    assert.equal(calls, 0);
    const response = await dispatchSystemOne(input, {
      selectCredentials: async () => ({ apiKey: "fixture", connectionId: "fixture" }),
      dispatch: async () => new Response(),
      clearRecoveredProviderState: async () => new Promise(() => {}),
    });
    assert.equal(response.status, 200);
  } finally {
    clearTimeout(keepAlive);
  }
});

test("invalid token counts stay unknown without changing fractional decision values", () => {
  for (const value of [-10, 1.5, Number.MAX_SAFE_INTEGER + 1]) {
    const result = answers.parseSystemOneAnswers({
      answers: { safe: { type: "noul", noul: 0.75 } },
      usage: { input_tokens: value, output_tokens: value },
    });
    assert.equal(result.ok, true);
    assert.equal(result.usage.inputTokens, null);
    assert.equal(result.usage.outputTokens, null);
    assert.equal(result.answers.safe.noul, 0.75);
  }
});

test("an explicit refusal remains a named outcome, including mixed responses", () => {
  const request = {
    ...body,
    questions: {
      safe: body.questions.safe,
      route: { type: "choice", instructions: "Choose", criteria: { a: "A", b: "B" } },
    },
  };
  const result = answers.parseSystemOneAnswers(
    {
      answers: {
        safe: { type: "noul", noul: 0.75 },
        route: { type: "refusal", refusal: "Cannot decide" },
      },
    },
    request
  );
  assert.equal(result.ok, true);
  assert.equal(result.answers.route.type, "refusal");
  assert.equal(result.answers.safe.noul, 0.75);
});

test("prototype-like question names remain own named answers", () => {
  const questions = JSON.parse(
    '{"__proto__":{"type":"noul","instructions":"yes?"},"constructor":{"type":"noul","instructions":"yes?"}}'
  );
  const response = JSON.parse(
    '{"answers":{"__proto__":{"type":"noul","noul":0.5},"constructor":{"type":"noul","noul":0.75}}}'
  );
  const result = answers.parseSystemOneAnswers(response, { ...body, questions });
  assert.equal(result.ok, true);
  assert.deepEqual(Object.keys(result.answers), ["__proto__", "constructor"]);
  assert.equal(Object.hasOwn(result.answers, "__proto__"), true);
  assert.equal(result.answers.__proto__.noul, 0.5);
});

test("explicit decision-only metadata blocks chat even on a custom provider", async () => {
  const { decisionOnlyChatRejection } = await import(
    new URL("src/lib/providerModels/decisionOnlyChatGuard.ts", root).href
  );
  let catalogReads = 0;
  const rejection = await decisionOnlyChatRejection(
    { provider: "custom-fixture", model: "decider", supportedEndpoints: ["systemone"] },
    async () => {
      catalogReads++;
      return [];
    }
  );
  assert.equal(rejection?.status, 400);
  assert.equal(catalogReads, 0);
  const mixed = await decisionOnlyChatRejection(
    { provider: "custom-fixture", model: "mixed", supportedEndpoints: ["systemone", "chat"] },
    async () => []
  );
  assert.equal(mixed, null);
});

test("the total dispatch deadline is logged as timeout without blaming account health", async () => {
  const { handleSystemOneProxy } = await import(
    new URL("open-sse/handlers/systemOne.ts", root).href
  );
  const logs: Array<Record<string, unknown>> = [];
  let cooldowns = 0;
  const keepAlive = setTimeout(() => {}, 2000);
  try {
    const response = await dispatchSystemOne(
      {
        candidates: registry.resolveSystemOneCandidates("openrouter/typesafe/jev-1.13"),
        requestedModel: "openrouter/typesafe/jev-1.13",
        body,
        timeoutMs: 15,
      },
      {
        selectCredentials: async () => ({ apiKey: "fixture", connectionId: "fixture" }),
        dispatch: (options: Record<string, unknown>) =>
          handleSystemOneProxy(options, {
            withCapacity: async (
              _options: unknown,
              _signal: AbortSignal,
              run: () => Promise<Response>
            ) => run(),
            fetchSystemOne: async (_url: string, _credentials: unknown, init: RequestInit) =>
              new Promise((_resolve, reject) => {
                init.signal!.addEventListener("abort", () => reject(init.signal!.reason), {
                  once: true,
                });
              }),
            saveCallLog: async (entry: Record<string, unknown>) => {
              logs.push(entry);
            },
            markAccountUnavailable: async () => {
              cooldowns++;
            },
          }),
      }
    );
    assert.equal(response.status, 504);
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal(logs[0].status, 504);
    assert.equal(cooldowns, 0);
  } finally {
    clearTimeout(keepAlive);
  }
});

test("already-running ancillary selector finishes after caller abort without later inference or fallback", async () => {
  const controller = new AbortController();
  let finishSelection;
  let signalSelectionStarted;
  const started = new Promise((resolve) => {
    signalSelectionStarted = resolve;
  });
  let selections = 0,
    ancillaryCompleted = 0,
    dispatches = 0;
  const pending = dispatchSystemOne(
    {
      candidates: registry.resolveSystemOneCandidates("jev"),
      requestedModel: "jev",
      body: {
        model: "jev",
        state: "fixture",
        questions: { safe: { type: "noul", instructions: "safe?" } },
      },
      signal: controller.signal,
    },
    {
      selectCredentials: async () => {
        selections++;
        signalSelectionStarted();
        await new Promise((resolve) => {
          finishSelection = resolve;
        });
        ancillaryCompleted++;
        return { apiKey: "synthetic-only", connectionId: "fixture" };
      },
      dispatch: async () => {
        dispatches++;
        return new Response(null, { status: 503 });
      },
    }
  );
  await started;
  controller.abort();
  const response = await pending;
  assert.equal(response.status, 499);
  assert.equal(ancillaryCompleted, 0);
  finishSelection();
  await new Promise((resolve) => setImmediate(resolve));
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(ancillaryCompleted, 1);
  assert.equal(dispatches, 0);
  assert.equal(selections, 1);
});
