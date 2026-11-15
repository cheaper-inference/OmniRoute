import assert from "node:assert/strict";
import test from "node:test";
import { createSSEStream } from "../../open-sse/utils/stream.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import type { UsageLike } from "../../open-sse/utils/usageTracking.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

test.after(() => resetDbInstance());
const body = { messages: [{ role: "user", content: "A short synthetic request" }] };
const endings = [
  ["blank-line terminated", "\n\n"],
  ["newline only", "\n"],
  ["unterminated", ""],
] as const;

async function runTail(
  mode: "translate" | "passthrough",
  initial: UsageLike,
  tail: UsageLike,
  ending: string
) {
  let receipt: UsageLike = {};
  const stream = createSSEStream({
    mode,
    targetFormat: FORMATS.OPENAI,
    sourceFormat: FORMATS.OPENAI,
    clientResponseFormat: FORMATS.OPENAI,
    provider: "openai",
    body,
    onComplete(result) {
      receipt = result.usage as UsageLike;
    },
  });
  const first = {
    choices: [{ index: 0, delta: { content: "answer" }, finish_reason: "stop" }],
    usage: initial,
  };
  const last = { choices: [], usage: tail };
  const input = `data: ${JSON.stringify(first)}\n\n` + `data: ${JSON.stringify(last)}${ending}`;
  const wire = await new Response(new Response(input).body!.pipeThrough(stream)).text();
  const summaries = wire
    .split("\n")
    .filter((line) => line.startsWith("data: {"))
    .map((line) => JSON.parse(line.slice(6)) as { choices?: unknown[]; usage?: UsageLike })
    .filter((frame) => frame.choices?.length === 0 && frame.usage)
    .map((frame) => frame.usage!);
  return { receipt, summaries };
}

for (const mode of ["translate", "passthrough"] as const) {
  for (const [label, ending] of endings) {
    test(`${mode}: ${label} final receipt replaces stale output and explicit cache zeros`, async () => {
      const { receipt, summaries } = await runTail(
        mode,
        {
          prompt_tokens: 100,
          completion_tokens: 1,
          total_tokens: 101,
          prompt_tokens_details: { cached_tokens: 8 },
          cache_creation_input_tokens: 5,
        },
        {
          prompt_tokens: 100,
          completion_tokens: 7,
          total_tokens: 113,
          prompt_tokens_details: { cached_tokens: 0 },
          cache_creation_input_tokens: 0,
        },
        ending
      );
      assert.equal(receipt.prompt_tokens, 100);
      assert.equal(receipt.completion_tokens, 7);
      assert.equal(receipt.total_tokens, 113);
      assert.equal(receipt.cached_tokens, 0);
      assert.equal(receipt.cache_creation_input_tokens, 0);
      assert.equal(receipt.usage_evidence?.cacheRead.source, "reported");
      assert.equal(receipt.usage_evidence?.cacheCreation.source, "reported");
      assert.equal(summaries.length, 1, "forward one terminal usage summary");
      assert.equal(summaries[0].completion_tokens, 7);
      assert.equal(summaries[0].prompt_tokens_details?.cached_tokens, 0);
    });

    for (const outputField of ["completion_tokens", "output_tokens"] as const) {
      test(`${mode}: ${label} output-only ${outputField} retains prior reported input`, async () => {
        const { receipt, summaries } = await runTail(
          mode,
          { prompt_tokens: 100, completion_tokens: 1, total_tokens: 101 },
          { [outputField]: 7, total_tokens: 113 },
          ending
        );
        assert.equal(receipt.prompt_tokens, 100);
        assert.equal(receipt.completion_tokens, 7);
        assert.equal(receipt.total_tokens, 113);
        assert.notEqual(receipt.estimated, true);
        assert.deepEqual(receipt.usage_evidence, {
          input: { source: "reported" },
          output: { source: "reported" },
          cacheRead: { source: "unknown" },
          cacheCreation: { source: "unknown" },
        });
        assert.equal(summaries.length, 1, "forward one terminal usage summary");
        assert.equal(summaries[0].prompt_tokens, 100);
        assert.equal(summaries[0].completion_tokens, 7);
        assert.equal(summaries[0].total_tokens, 113);
      });
    }

    for (const [alias, fields, cacheRead, cacheCreation] of [
      ["flat cache write", { cache_write_tokens: 0 }, 8, 0],
      ["nested cache write", { prompt_tokens_details: { cache_write_tokens: 0 } }, 8, 0],
      ["cache read", { cache_read_input_tokens: 0 }, 0, 5],
    ] as const) {
      test(`${mode}: ${label} output-only ${alias} zero replaces prior canonical value`, async () => {
        const { receipt, summaries } = await runTail(
          mode,
          {
            prompt_tokens: 100,
            completion_tokens: 1,
            total_tokens: 101,
            prompt_tokens_details: { cached_tokens: 8 },
            cache_creation_input_tokens: 5,
          },
          { completion_tokens: 7, total_tokens: 113, ...fields },
          ending
        );
        assert.equal(receipt.cached_tokens, cacheRead);
        assert.equal(receipt.cache_creation_input_tokens, cacheCreation);
        assert.equal(receipt.usage_evidence?.cacheRead.source, "reported");
        assert.equal(receipt.usage_evidence?.cacheCreation.source, "reported");
        assert.equal(summaries.length, 1);
        assert.equal(summaries[0].prompt_tokens_details?.cached_tokens, cacheRead);
        assert.equal(summaries[0].cache_creation_input_tokens, cacheCreation);
      });
    }

    for (const [label, fields, cacheCreation] of [
      ["cache-only", { cache_write_tokens: 0, total_tokens: 113 }, 0],
      ["total-only", { total_tokens: 113 }, 5],
    ] as const) {
      test(`${mode}: ${ending.length}-newline ${label} tail retains prior reported output`, async () => {
        const { receipt, summaries } = await runTail(
          mode,
          {
            prompt_tokens: 100,
            completion_tokens: 9,
            total_tokens: 109,
            cache_creation_input_tokens: 5,
          },
          fields,
          ending
        );
        assert.equal(receipt.prompt_tokens, 100);
        assert.equal(receipt.completion_tokens, 9);
        assert.equal(receipt.total_tokens, 113);
        assert.equal(receipt.cache_creation_input_tokens, cacheCreation);
        assert.equal(receipt.usage_evidence?.output.source, "reported");
        assert.equal(summaries.length, 1);
        assert.equal(summaries[0].completion_tokens, 9);
      });
    }
  }
}

for (const [label, ending] of endings) {
  test(`translate: ${label} invalid Gemini cache receipt clears a previous hit`, async () => {
    let receipt: UsageLike = {};
    let cacheEvidence: string | undefined;
    const stream = createSSEStream({
      mode: "translate",
      targetFormat: FORMATS.GEMINI,
      sourceFormat: FORMATS.OPENAI,
      clientResponseFormat: FORMATS.OPENAI,
      provider: "gemini",
      body,
      onComplete(result) {
        receipt = result.usage as UsageLike;
        cacheEvidence = result.cacheEvidence;
      },
    });
    const first = {
      candidates: [{ content: { role: "model", parts: [{ text: "answer" }] } }],
      usageMetadata: {
        promptTokenCount: 100,
        candidatesTokenCount: 1,
        totalTokenCount: 101,
        cachedContentTokenCount: 8,
      },
    };
    const last = {
      candidates: [{ content: { role: "model", parts: [] }, finishReason: "STOP" }],
      usageMetadata: {
        promptTokenCount: 100,
        candidatesTokenCount: 7,
        totalTokenCount: 107,
        cachedContentTokenCount: 120,
      },
    };
    const input = `data: ${JSON.stringify(first)}\n\n` + `data: ${JSON.stringify(last)}${ending}`;
    await new Response(new Response(input).body!.pipeThrough(stream)).text();
    assert.equal(receipt.prompt_tokens, 100);
    assert.equal(receipt.completion_tokens, 7);
    assert.equal(receipt.cached_tokens, undefined);
    assert.equal(cacheEvidence, "invalid");
    assert.equal(receipt.usage_evidence?.cacheRead.source, "unknown");
  });
}
