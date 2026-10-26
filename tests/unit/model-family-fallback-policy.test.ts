import test from "node:test";
import assert from "node:assert/strict";
import {
  createRequestFamilyFallback,
  getNextRequestFamilyFallback,
  isSameModelVersion,
  modelAfterFamilyFallback,
} from "../../open-sse/services/modelFamilyFallbackPolicy.ts";

test("same-version effort recovery preserves Codex max/ultra and Gemini effort siblings", async () => {
  assert.equal(isSameModelVersion("gpt-6-astra-high", "gpt-6-astra-ultra", "codex"), true);
  assert.equal(
    isSameModelVersion("gemini-3.8-flash-high", "gemini-3.8-flash-medium", "antigravity"),
    true
  );
  assert.equal(
    await getNextRequestFamilyFallback(
      "codex/gpt-6-astra-high",
      new Set(["codex/gpt-6-astra-high"]),
      "codex"
    ),
    "codex/gpt-6-astra-max"
  );
});

test("different versions, families and unregistered effort-like names stay distinct", () => {
  assert.equal(isSameModelVersion("claude-opus-5-5", "claude-opus-5", "anthropic"), false);
  assert.equal(isSameModelVersion("claude-opus-5", "claude-sonnet-5", "anthropic"), false);
  assert.equal(isSameModelVersion("unknown-high", "unknown", "anthropic"), false);
  assert.equal(
    isSameModelVersion("claude-sonnet-4-5-20250929", "claude-sonnet-4-5-20251001", "anthropic"),
    false
  );
});

test("cross-version permission requires the explicit true header, including Headers and case-insensitive records", async () => {
  const current = "claude-opus-5-5";
  for (const value of [undefined, "false", "1", "yes"]) {
    assert.equal(
      await getNextRequestFamilyFallback(current, new Set([current]), "anthropic", {
        headers: value === undefined ? {} : { "x-omniroute-allow-cross-version-fallback": value },
      }),
      null
    );
  }
  for (const headers of [
    new Headers({ "x-omniroute-allow-cross-version-fallback": "true" }),
    { "X-OmniRoute-Allow-Cross-Version-Fallback": "true" },
  ]) {
    assert.equal(
      await getNextRequestFamilyFallback(current, new Set([current]), "anthropic", { headers }),
      "claude-opus-5"
    );
  }
});

test("a model change reports the observed wire id while no fallback preserves the requested alias", () => {
  assert.equal(
    modelAfterFamilyFallback("alias", "canonical", "canonical", { model: "canonical" }),
    "alias"
  );
  assert.equal(
    modelAfterFamilyFallback("old", "new.dot", "old", { model: "new-dash" }),
    "new-dash"
  );
  assert.equal(modelAfterFamilyFallback("old", "new", "old", undefined), "new");
});

for (const failure of ["model-unavailable", "context-overflow", "empty-content"] as const) {
  test(`nonstream ${failure}: default policy does not dispatch a different model version`, async () => {
    const { runNonStreamingProviderLeg } =
      await import("../../open-sse/handlers/chatCore/nonStreamingProviderLeg.ts");
    const { baseInput, makeExecutorResult } =
      await import("./_helpers/nonStreamingProviderLegFixtures.ts");
    let calls = 0;
    const result = await runNonStreamingProviderLeg(
      baseInput({
        provider: "gemini",
        model: "gemini-3-pro",
        allowModelFallback: true,
        executeProviderRequest: async () => {
          calls++;
          if (failure === "model-unavailable")
            return makeExecutorResult({ error: { message: "model_not_found" } }, 404);
          if (failure === "context-overflow")
            return makeExecutorResult(
              { error: { message: "maximum context length exceeded" } },
              400
            );
          return makeExecutorResult({
            choices: [{ message: { role: "assistant", content: "" }, finish_reason: "stop" }],
          });
        },
      })
    );
    assert.equal(result.kind, "error");
    assert.equal(calls, 1);
  });
}

test("context recovery composes request consent with the shared eligible selector", async () => {
  const current = "anthropic/claude-opus-5-5";
  assert.equal(
    await createRequestFamilyFallback("anthropic", {}).getForContextOverflow(
      current,
      new Set([current])
    ),
    null
  );
  assert.equal(
    await createRequestFamilyFallback("anthropic", {
      headers: { "x-omniroute-allow-cross-version-fallback": "true" },
    }).getForContextOverflow(current, new Set([current])),
    // Registry Sonnet 5 has 1,048,576 context versus Opus 5.5 at 1,000,000.
    "anthropic/claude-sonnet-5"
  );
});

test("alias-prefixed denied candidates terminate without escaping request policy", async () => {
  assert.equal(
    await getNextRequestFamilyFallback(
      "agy/gemini-3.8-flash-high",
      new Set(["agy/gemini-3.8-flash-high"]),
      "agy",
      {
        hasApiKeyMetadata: true,
      }
    ),
    null
  );
});
