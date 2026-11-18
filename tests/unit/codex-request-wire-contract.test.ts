import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// Only request transformation, never a real upstream/account. Close transitive DB imports.
const directory = fs.mkdtempSync(path.join(os.tmpdir(), "codex-wire-contract-"));
process.env.DATA_DIR = directory;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { CodexExecutor } = await import("../../open-sse/executors/codex.ts");
const { applyCodexReasoningSelection } =
  await import("../../open-sse/executors/codex/reasoningPolicy.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

type JsonRecord = Record<string, unknown>;
const model = "fixture-codex-preview";
const executor = new CodexExecutor();

test.after(() => {
  resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

function transform(body: JsonRecord, native: boolean, endpoint = "/responses"): JsonRecord {
  const input = { model, input: [], _nativeCodexPassthrough: native, ...body };
  const before = structuredClone(input);
  const result = executor.transformRequest(model, input, true, {
    requestEndpointPath: endpoint,
    providerSpecificData: {},
  });
  assert.deepEqual(input, before, "transformRequest must not mutate a fallback caller's payload");
  // Verify JSON value types, not only an in-memory helper result.
  return JSON.parse(JSON.stringify(result)) as JsonRecord;
}

function selected(
  body: JsonRecord,
  metadata: JsonRecord = {},
  forced?: string,
  allowDefaults = true
): JsonRecord {
  applyCodexReasoningSelection(model, body, metadata, "medium", allowDefaults, forced);
  return body.reasoning as JsonRecord;
}

// Official request serializer, not the general config enum, emits custom u64 budgets
// as JSON numbers: openai/codex@6aaac694, codex-api/src/common.rs:173-183.
// These tests preserve the safe JS integer subset; they do not claim model acceptance.
for (const native of [true, false]) {
  for (const effort of [0, 32768, Number.MAX_SAFE_INTEGER]) {
    test(`numeric reasoning.effort ${effort} survives JSON serialization, native=${native}`, () => {
      const result = transform({ reasoning: { effort } }, native);
      assert.equal((result.reasoning as JsonRecord).effort, effort);
      assert.equal(typeof (result.reasoning as JsonRecord).effort, "number");
    });
    test(`numeric reasoning_effort ${effort} reaches Responses, native=${native}`, () => {
      const result = transform({ reasoning_effort: effort }, native);
      assert.equal((result.reasoning as JsonRecord).effort, effort);
      assert.equal(Object.hasOwn(result, "reasoning_effort"), false);
    });
  }

  for (const effort of ["disabled", "FutureTier-V2"]) {
    test(`explicit wire effort ${effort} is not rewritten, native=${native}`, () => {
      const result = transform({ reasoning: { effort } }, native);
      assert.equal((result.reasoning as JsonRecord).effort, effort);
    });
  }

  test(`known string tier normalization remains compatible, native=${native}`, () => {
    const result = transform({ reasoning: { effort: " HIGH " } }, native);
    assert.equal((result.reasoning as JsonRecord).effort, "high");
  });

  test(`explicit summary delivery survives without Chat-only siblings, native=${native}`, () => {
    const result = transform(
      {
        reasoning: { effort: "high", summary: "auto" },
        stream_options: {
          reasoning_summary_delivery: "sequential_cutoff",
          include_usage: true,
          include_obfuscation: true,
          unrelated_option: "do not forward",
        },
      },
      native
    );
    assert.deepEqual(result.stream_options, {
      reasoning_summary_delivery: "sequential_cutoff",
    });
  });

  test(`summary delivery is never invented for absent/invalid options, native=${native}`, () => {
    assert.equal(transform({}, native).stream_options, undefined);
    for (const stream_options of [
      { include_usage: true },
      { reasoning_summary_delivery: "" },
      { reasoning_summary_delivery: false },
      { reasoning_summary_delivery: 42 },
      null,
      [],
      "malformed",
    ]) {
      assert.equal(transform({ stream_options }, native).stream_options, undefined);
    }
  });

  test(`compact keeps rejecting stream and stream_options, native=${native}`, () => {
    const result = transform(
      {
        stream: true,
        stream_options: { reasoning_summary_delivery: "sequential_cutoff" },
      },
      native,
      "/responses/compact"
    );
    assert.equal(Object.hasOwn(result, "stream"), false);
    assert.equal(Object.hasOwn(result, "stream_options"), false);
  });

  for (const nested of [false, true]) {
    for (const defer_loading of [true, false]) {
      test(`function defer_loading=${defer_loading}, nested=${nested}, native=${native}`, () => {
        const definition = {
          name: "fixture",
          description: "Synthetic test tool",
          parameters: { type: "object", properties: {} },
          strict: false,
          defer_loading,
        };
        const tool = nested
          ? { type: "function", function: definition }
          : { type: "function", ...definition };
        const result = transform({ tools: [tool] }, native);
        assert.deepEqual(result.tools, [{ type: "function", ...definition }]);
      });
    }
  }

  test(`defer_loading does not regress strict:null or schema coercion, native=${native}`, () => {
    const result = transform(
      {
        tools: [
          {
            type: "function",
            name: "fixture",
            strict: null,
            defer_loading: true,
            parameters: { type: "object", properties: { value: "string" } },
          },
        ],
      },
      native
    );
    const tool = (result.tools as JsonRecord[])[0];
    assert.equal(tool.defer_loading, true);
    assert.equal(tool.strict, null);
    assert.deepEqual(tool.parameters, {
      type: "object",
      properties: { value: { type: "string" } },
    });
  });

  test(`invalid defer_loading values stay undeclared, native=${native}`, () => {
    for (const defer_loading of [undefined, null, "true", 1, {}]) {
      const result = transform(
        {
          tools: [
            {
              type: "function",
              name: "fixture",
              defer_loading,
            },
          ],
        },
        native
      );
      assert.equal(Object.hasOwn((result.tools as JsonRecord[])[0], "defer_loading"), false);
    }
  });

  test(`flat boolean defer_loading wins over nested value, native=${native}`, () => {
    const result = transform(
      {
        tools: [
          {
            type: "function",
            defer_loading: false,
            function: { name: "fixture", defer_loading: true },
          },
        ],
      },
      native
    );
    assert.equal((result.tools as JsonRecord[])[0].defer_loading, false);
  });
}

test("numeric zero wins over ordinary defaults and a legacy reasoning_effort carrier", () => {
  assert.equal(selected({ model, reasoning: { effort: 0 }, reasoning_effort: "high" }).effort, 0);
  assert.equal(selected({ model, reasoning_effort: 0 }).effort, 0);
  assert.equal(selected({ model, reasoning: { effort: 0 } }, {}, undefined, false).effort, 0);
});

test("server force and an unparsed model suffix still outrank numeric effort", () => {
  assert.equal(selected({ model, reasoning: { effort: 0 } }, {}, "high").effort, "high");
  const body: JsonRecord = { model: "gpt-5.5-xhigh", reasoning: { effort: 0 } };
  applyCodexReasoningSelection("gpt-5.5-xhigh", body, {}, undefined, true);
  assert.equal((body.reasoning as JsonRecord).effort, "xhigh");
  assert.equal(body.model, "gpt-5.5");
});

test("a catalog-resolved model suffix is not mistaken for an ordinary default", () => {
  const metadata = {
    model,
    supportedThinkingEfforts: ["low", "high"],
    resolvedThinkingEffort: "high",
    requestedThinkingEffort: 0,
  };
  assert.equal(selected({ model, reasoning: { effort: 0 } }, metadata).effort, "high");
  assert.equal(selected({ model, reasoning: { effort: 0 } }, metadata, "low").effort, "low");
});

test("original numeric effort is restored for a translated catalog-backed request", () => {
  for (const requestedThinkingEffort of [0, 32768]) {
    const metadata = { model, supportedThinkingEfforts: ["low", "high"], requestedThinkingEffort };
    assert.equal(
      selected({ model, reasoning: { effort: "xhigh" } }, metadata).effort,
      requestedThinkingEffort
    );
  }
});

test("Chat max restoration and non-passthrough policy retain their precedence", () => {
  const metadata = {
    model,
    supportedThinkingEfforts: ["high", "max"],
    requestedThinkingEffort: "max",
  };
  assert.equal(selected({ model, reasoning: { effort: "xhigh" } }, metadata).effort, "max");
  assert.equal(
    selected({ model, reasoning: { effort: "high" } }, metadata, undefined, false).effort,
    "high"
  );
});

test("literal catalog IDs ending in high are not stripped a second time", () => {
  const id = "fixture-codex-high";
  const body: JsonRecord = { model: id, reasoning: { effort: 0 } };
  applyCodexReasoningSelection(
    id,
    body,
    {
      model: id,
      supportedThinkingEfforts: ["low", "high"],
    },
    undefined,
    true
  );
  assert.equal(body.model, id);
  assert.equal((body.reasoning as JsonRecord).effort, 0);
});

test("legacy string caps and the reasoning whitelist survive numeric support", () => {
  const body: JsonRecord = {
    model: "gpt-5.3-codex",
    reasoning: { effort: "max", max_tokens: 64, enabled: true },
  };
  applyCodexReasoningSelection("gpt-5.3-codex", body, {}, undefined, true);
  assert.deepEqual(body.reasoning, { effort: "xhigh" });
});

test("invalid numeric selections are not accepted as safe integer budgets", () => {
  for (const effort of [-1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, 2 ** 53]) {
    assert.equal(selected({ model, reasoning: { effort } }).effort, "medium");
  }
});
