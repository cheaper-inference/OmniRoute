import assert from "node:assert/strict";
import test from "node:test";
import { createSSEStream } from "../../open-sse/utils/stream.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import type { UsageLike } from "../../open-sse/utils/usageTracking.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

// Exercise the two adapters as well as the direct createSSEStream translation path.
const { createResponsesApiTransformStream } =
  await import("../../open-sse/transformer/responsesTransformer.ts");
const { openaiToClaudeResponse } =
  await import("../../open-sse/translator/response/openai-to-claude.ts");
const { openaiToOpenAIResponsesResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { initState } = await import("../../open-sse/translator/index.ts");

test.after(() => resetDbInstance());
const body = { messages: [{ role: "user", content: "A short synthetic request" }] };
const initial = {
  prompt_tokens: 100,
  completion_tokens: 1,
  total_tokens: 101,
  prompt_tokens_details: { cached_tokens: 8, cache_creation_tokens: 5 },
};
const endings = [
  ["blank line", "\n\n"],
  ["newline", "\n"],
  ["unterminated", ""],
] as const;
type WireEvent = {
  type?: string;
  usage?: UsageLike;
  response?: { usage?: UsageLike };
  delta?: { text?: string };
};

async function runStream(
  format: string,
  tail: UsageLike | undefined,
  ending = "\n\n",
  firstUsage: UsageLike = initial
) {
  let receipt: UsageLike = {};
  const chunks: Record<string, unknown>[] = [
    {
      choices: [{ index: 0, delta: { content: "answer" }, finish_reason: null }],
      usage: firstUsage,
    },
    { choices: [{ index: 0, delta: {}, finish_reason: "stop" }] },
  ];
  if (tail) chunks.push({ choices: [], usage: tail });
  const input = chunks
    .map(
      (chunk, index) =>
        `data: ${JSON.stringify(chunk)}${index === chunks.length - 1 ? ending : "\n\n"}`
    )
    .join("");
  const stream = createSSEStream({
    mode: "translate",
    targetFormat: FORMATS.OPENAI,
    sourceFormat: format,
    clientResponseFormat: format,
    provider: "openai",
    body,
    onComplete(result) {
      receipt = result.usage as UsageLike;
    },
  });
  const wire = await new Response(new Response(input).body!.pipeThrough(stream)).text();
  const events = wire
    .split("\n")
    .filter((line) => line.startsWith("data: {"))
    .map((line) => JSON.parse(line.slice(6)) as WireEvent);
  const terminals = events.filter(
    (event) => event.type === "message_delta" || event.type === "response.completed"
  );
  return {
    receipt,
    events,
    terminals,
    terminalUsage: terminals[0]?.usage ?? terminals[0]?.response?.usage,
  };
}

for (const format of [FORMATS.CLAUDE, FORMATS.OPENAI_RESPONSES]) {
  for (const [label, ending] of endings) {
    for (const partial of [false, true]) {
      const tail = {
        ...(partial ? {} : { prompt_tokens: 100 }),
        completion_tokens: 7,
        total_tokens: 113,
      };
      const name = `${format}: ${label} ${partial ? "partial" : "full"} final receipt`;
      test(`${name} retains canonical accounting and evidence`, async () => {
        const { receipt } = await runStream(format, tail, ending);
        assert.equal(receipt.prompt_tokens, 100);
        assert.equal(receipt.completion_tokens, 7);
        assert.equal(receipt.total_tokens, 113);
        assert.equal(receipt.cached_tokens, 8);
        assert.equal(receipt.cache_creation_input_tokens, 5);
        assert.equal(receipt.usage_evidence?.input.source, "reported");
        assert.equal(receipt.usage_evidence?.output.source, "reported");
      });
      test(`${name} reaches the single terminal client event`, async () => {
        const { terminals, terminalUsage } = await runStream(format, tail, ending);
        assert.equal(terminals.length, 1);
        assert.equal(terminalUsage?.output_tokens, 7);
        assert.equal(terminalUsage?.input_tokens, format === FORMATS.CLAUDE ? 87 : 100);
        if (format === FORMATS.OPENAI_RESPONSES) assert.equal(terminalUsage?.total_tokens, 113);
      });
    }
  }
  test(`${format}: EOF without a receipt flushes the prior usage once`, async () => {
    const { terminals, terminalUsage } = await runStream(format, undefined);
    assert.equal(terminals.length, 1);
    assert.equal(terminalUsage?.output_tokens, 1);
  });
}

for (const viaPassthrough of [false, true]) {
  test(`Responses adapter ${viaPassthrough ? "after passthrough" : "direct"} waits for a later receipt`, async () => {
    const chunks = [
      {
        choices: [{ index: 0, delta: { content: "answer" }, finish_reason: null }],
        usage: initial,
      },
      { choices: [{ index: 0, delta: {}, finish_reason: "stop" }] },
      { choices: [] },
      { choices: [], usage: { completion_tokens: 7, total_tokens: 113 } },
    ];
    let stream = new Response(chunks.map((chunk) => `data: ${JSON.stringify(chunk)}\n\n`).join(""))
      .body!;
    if (viaPassthrough)
      stream = stream.pipeThrough(
        createSSEStream({
          mode: "passthrough",
          targetFormat: FORMATS.OPENAI,
          sourceFormat: FORMATS.OPENAI,
          provider: "openai",
          body,
        })
      );
    const wire = await new Response(
      stream.pipeThrough(createResponsesApiTransformStream(null, 60000))
    ).text();
    const events = wire
      .split("\n")
      .filter((line) => line.startsWith("data: {"))
      .map((line) => JSON.parse(line.slice(6)) as WireEvent);
    const terminal = events.filter((event) => event.type === "response.completed");
    assert.equal(terminal.length, 1);
    assert.equal(terminal[0].response?.usage?.output_tokens, 7);
    assert.equal(terminal[0].response?.usage?.input_tokens, 100);
    assert.equal(terminal[0].response?.usage?.total_tokens, 113);
  });
}

for (const [format, translate] of [
  [FORMATS.CLAUDE, openaiToClaudeResponse],
  [FORMATS.OPENAI_RESPONSES, openaiToOpenAIResponsesResponse],
] as const) {
  for (const placeholder of [
    undefined,
    {},
    { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
  ]) {
    test(`${format}: a placeholder does not release the pending terminal`, () => {
      const state = initState(format);
      translate(
        {
          choices: [{ index: 0, delta: { content: "answer" }, finish_reason: null }],
          usage: initial,
        },
        state
      );
      const finish =
        translate({ choices: [{ index: 0, delta: {}, finish_reason: "stop" }] }, state) ?? [];
      const empty =
        translate(
          { choices: [], ...(placeholder === undefined ? {} : { usage: placeholder }) },
          state
        ) ?? [];
      const events = [...finish, ...empty] as Array<{ type?: string; event?: string }>;
      assert.equal(
        events.filter(
          (event) => event.type === "message_delta" || event.event === "response.completed"
        ).length,
        0
      );
      const final =
        translate({ choices: [], usage: { completion_tokens: 7, total_tokens: 113 } }, state) ?? [];
      const terminal = final.find(
        (event) => event.type === "message_delta" || event.event === "response.completed"
      );
      const usage = terminal?.usage ?? terminal?.data?.response?.usage;
      assert.equal(usage?.input_tokens, format === FORMATS.CLAUDE ? 87 : 100);
      assert.equal(usage?.output_tokens, 7);
    });
  }
}

for (const output of [undefined, 0]) {
  test(`Claude finalizes ${output === undefined ? "omitted" : "zero"} output without losing native cache split`, async () => {
    const { receipt, terminalUsage } = await runStream(FORMATS.CLAUDE, undefined, "\n\n", {
      ...initial,
      completion_tokens: output,
    });
    assert.ok((receipt.completion_tokens ?? 0) > 0);
    assert.equal(terminalUsage?.output_tokens, receipt.completion_tokens);
    assert.equal(terminalUsage?.input_tokens, 87);
    assert.equal(terminalUsage?.estimated, true);
    assert.equal(receipt.usage_evidence?.output.source, "estimated");
  });
}
test("standalone Claude preserves a first output-only receipt", () => {
  const state = initState(FORMATS.CLAUDE);
  openaiToClaudeResponse({ choices: [], usage: { completion_tokens: 7 } }, state);
  assert.equal(state.usage.output_tokens, 7);
});

for (const [format, translate] of [
  [FORMATS.CLAUDE, openaiToClaudeResponse],
  [FORMATS.OPENAI_RESPONSES, openaiToOpenAIResponsesResponse],
] as const) {
  for (const [name, tail, output, cached, created] of [
    ["output zero", { completion_tokens: 0 }, 0, 8, 5],
    ["cache read zero", { prompt_tokens_details: { cached_tokens: 0 } }, 1, 0, 5],
    ["cache write zero", { cache_write_tokens: 0 }, 1, 8, 0],
    ["total only", { total_tokens: 113 }, 1, 8, 5],
  ] as const) {
    test(`${format}: standalone ${name} partial receipt retains omitted counters`, () => {
      const state = initState(format);
      translate(
        {
          choices: [{ index: 0, delta: { content: "answer" }, finish_reason: null }],
          usage: initial,
        },
        state
      );
      translate({ choices: [{ index: 0, delta: {}, finish_reason: "stop" }] }, state);
      const events = translate({ choices: [], usage: tail }, state) ?? [];
      const terminal = events.find(
        (event) => event.type === "message_delta" || event.event === "response.completed"
      );
      const usage = terminal?.usage ?? terminal?.data?.response?.usage;
      assert.equal(usage?.input_tokens, format === FORMATS.CLAUDE ? 100 - cached - created : 100);
      assert.equal(usage?.output_tokens, output);
      if (format === FORMATS.CLAUDE) {
        assert.equal(usage?.cache_read_input_tokens, cached);
        assert.equal(usage?.cache_creation_input_tokens, created);
      } else {
        assert.equal(usage?.input_tokens_details?.cached_tokens, cached);
        assert.equal(usage?.input_tokens_details?.cache_creation_tokens, created);
      }
    });
  }
}

test("Responses adapter ignores an all-zero placeholder before EOF", async () => {
  const chunks = [
    { choices: [{ index: 0, delta: { content: "answer" }, finish_reason: null }], usage: initial },
    { choices: [{ index: 0, delta: {}, finish_reason: "stop" }] },
    { choices: [], usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 } },
  ];
  const stream = new Response(chunks.map((chunk) => `data: ${JSON.stringify(chunk)}\n\n`).join(""))
    .body!;
  const wire = await new Response(
    stream.pipeThrough(createResponsesApiTransformStream(null, 60000))
  ).text();
  const events = wire
    .split("\n")
    .filter((line) => line.startsWith("data: {"))
    .map((line) => JSON.parse(line.slice(6)) as WireEvent);
  const terminals = events.filter((event) => event.type === "response.completed");
  assert.equal(terminals.length, 1);
  assert.equal(terminals[0].response?.usage?.input_tokens, 100);
  assert.equal(terminals[0].response?.usage?.output_tokens, 1);
});

for (const [format, translate] of [
  [FORMATS.CLAUDE, openaiToClaudeResponse],
  [FORMATS.OPENAI_RESPONSES, openaiToOpenAIResponsesResponse],
] as const) {
  test(`${format}: duplicate finishing text is emitted only once`, () => {
    const state = initState(format);
    const first = {
      choices: [{ index: 0, delta: { content: "hello" }, finish_reason: null }],
      usage: initial,
    };
    const finish = { choices: [{ index: 0, delta: { content: "world" }, finish_reason: "stop" }] };
    const chunks = [
      first,
      finish,
      finish,
      { choices: [], usage: { prompt_tokens: 100, completion_tokens: 7, total_tokens: 113 } },
      null,
    ];
    const events = chunks.flatMap((chunk) => translate(chunk, state) ?? []);
    const text = events
      .map((event) =>
        event.type === "content_block_delta"
          ? (event.delta?.text ?? "")
          : event.event === "response.output_text.delta"
            ? (event.data?.delta ?? "")
            : ""
      )
      .join("");
    assert.equal(text, "helloworld");
    assert.equal(
      events.filter(
        (event) => event.type === "message_delta" || event.event === "response.completed"
      ).length,
      1
    );
  });
}

for (const format of [FORMATS.CLAUDE, FORMATS.OPENAI_RESPONSES]) {
  for (const [label, ending] of endings) {
    test(`${format}: ${label} reported output zero replaces a prior positive count before finalization`, async () => {
      const { receipt, terminalUsage } = await runStream(format, { completion_tokens: 0 }, ending);
      assert.notEqual(receipt.completion_tokens, 1, "do not retain the stale prior output");
      assert.equal(receipt.usage_evidence?.output.source, "estimated");
      if (format === FORMATS.CLAUDE)
        assert.equal(terminalUsage?.output_tokens, receipt.completion_tokens);
      else assert.equal(terminalUsage?.output_tokens, 0);
    });
  }
}

for (const format of [FORMATS.CLAUDE, FORMATS.OPENAI_RESPONSES]) {
  for (const [label, ending] of endings) {
    for (const placeholder of [{}, { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }]) {
      test(`${format}: ${label} placeholder cannot replace a prior reported receipt`, async () => {
        const { receipt, terminalUsage } = await runStream(format, placeholder, ending, {
          ...initial,
          completion_tokens: 7,
          total_tokens: 107,
        });
        assert.equal(receipt.prompt_tokens, 100);
        assert.equal(receipt.completion_tokens, 7);
        assert.equal(receipt.total_tokens, 107);
        assert.equal(receipt.estimated, undefined);
        assert.equal(terminalUsage?.output_tokens, 7);
        assert.equal(terminalUsage?.input_tokens, format === FORMATS.CLAUDE ? 87 : 100);
      });
    }
  }
}
