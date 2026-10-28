import test from "node:test";
import assert from "node:assert/strict";

// Claude Code's built-in WebSearch on the Claude -> Codex (openai-responses) lane.
//
// Claude Code issues a Messages sub-request whose ONLY tool is the Anthropic server
// tool `{ type: "web_search_20250305", name: "web_search", max_uses: 8 }`, and reads
// results exclusively from Anthropic blocks: `server_tool_use` (name "web_search",
// input.query) followed by `web_search_tool_result` (tool_use_id, content[]).
//
// Two breaks on that lane:
//  1. REQUEST — webSearchFallback.ts rewrote the native server tool to the
//     omniroute_web_search function fallback (needs a configured /v1/search backend,
//     so Claude Code got empty results) even though claude-to-openai.ts already emits
//     the native `{ type: "web_search" }` for an OPENAI_RESPONSES target.
//  2. RESPONSE — the Responses→OpenAI hub dropped `web_search_call` items and
//     `url_citation` annotations, so no Anthropic block pair ever reached the CLI.

const { supportsNativeWebSearchFallbackBypass, prepareWebSearchFallbackBody } =
  await import("../../../open-sse/services/webSearchFallback.ts");
const { translateRequest, translateResponse, initState } =
  await import("../../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../../open-sse/translator/formats.ts");

const CLAUDE_SERVER_TOOL = { type: "web_search_20250305", name: "web_search", max_uses: 8 };

function claudeWebSearchBody(extraTools: unknown[] = []) {
  return {
    model: "gpt-5.5",
    max_tokens: 1024,
    messages: [{ role: "user", content: "what happened today?" }],
    tools: [CLAUDE_SERVER_TOOL, ...extraTools],
    stream: true,
  };
}

// ── 1. Request: bypass predicate ──────────────────────────────────────────

test("bypass predicate: true for codex + CLAUDE -> OPENAI_RESPONSES with the sole server tool", () => {
  assert.equal(
    supportsNativeWebSearchFallbackBypass({
      provider: "codex",
      sourceFormat: FORMATS.CLAUDE,
      targetFormat: FORMATS.OPENAI_RESPONSES,
      nativeCodexPassthrough: false,
      soleClaudeServerWebSearchTool: true,
    }),
    true
  );
});

test("bypass predicate: false for codex + CLAUDE -> OPENAI_RESPONSES when the server tool is NOT the sole tool", () => {
  assert.equal(
    supportsNativeWebSearchFallbackBypass({
      provider: "codex",
      sourceFormat: FORMATS.CLAUDE,
      targetFormat: FORMATS.OPENAI_RESPONSES,
      nativeCodexPassthrough: false,
      soleClaudeServerWebSearchTool: false,
    }),
    false
  );
});

test("bypass predicate: false for other Responses providers (chatgpt-web-codex, codex-app-server, openai)", () => {
  for (const provider of ["chatgpt-web-codex", "codex-app-server", "openai", null, undefined]) {
    assert.equal(
      supportsNativeWebSearchFallbackBypass({
        provider,
        sourceFormat: FORMATS.CLAUDE,
        targetFormat: FORMATS.OPENAI_RESPONSES,
        nativeCodexPassthrough: false,
        soleClaudeServerWebSearchTool: true,
      }),
      false,
      `provider ${String(provider)} must keep the existing fallback conversion`
    );
  }
});

test("bypass predicate: false when the source is not Claude (OpenAI-format client keeps the fallback)", () => {
  assert.equal(
    supportsNativeWebSearchFallbackBypass({
      provider: "codex",
      sourceFormat: FORMATS.OPENAI,
      targetFormat: FORMATS.OPENAI_RESPONSES,
      nativeCodexPassthrough: false,
      soleClaudeServerWebSearchTool: true,
    }),
    false
  );
});

// ── 2. Request: end-to-end body + translated upstream tools ───────────────

test("codex + sole server tool: body left native and upstream tools carry {type:web_search}", () => {
  const input = claudeWebSearchBody();
  const { body, fallback } = prepareWebSearchFallbackBody(input, {
    provider: "codex",
    sourceFormat: FORMATS.CLAUDE,
    targetFormat: FORMATS.OPENAI_RESPONSES,
    nativeCodexPassthrough: false,
  });

  assert.equal(fallback.enabled, false);
  assert.equal(fallback.convertedToolCount, 0);
  assert.deepEqual(body, input, "native server tool must be forwarded untouched");

  const translated = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI_RESPONSES,
    "gpt-5.5",
    body,
    true,
    null,
    "codex"
  ) as { tools?: Array<Record<string, unknown>> };
  assert.deepEqual(translated.tools, [{ type: "web_search" }]);
});

// ── 3. Mixed requests keep the pre-existing behavior ──────────────────────

test("mixed tools on codex: existing fallback conversion is unchanged", () => {
  const custom = {
    name: "get_weather",
    description: "weather",
    input_schema: { type: "object", properties: {} },
  };
  const input = claudeWebSearchBody([custom]);
  const { body, fallback } = prepareWebSearchFallbackBody(input, {
    provider: "codex",
    sourceFormat: FORMATS.CLAUDE,
    targetFormat: FORMATS.OPENAI_RESPONSES,
    nativeCodexPassthrough: false,
  });

  assert.equal(fallback.enabled, true);
  assert.equal(fallback.convertedToolCount, 1);
  const tools = body.tools as Array<Record<string, unknown>>;
  // Since #16448 the fallback tool is injected in the client's own (Claude flat)
  // shape `{ name, input_schema }` so the normal translator converts it like any
  // other client tool; the client's own function survives.
  assert.deepEqual(tools[0], {
    name: "omniroute_web_search",
    description: (tools[0] as Record<string, unknown>).description,
    input_schema: (tools[0] as Record<string, unknown>).input_schema,
  });
  assert.equal(tools[1], custom);
  assert.equal(
    tools.some((tool) => tool.type === "web_search"),
    false,
    "native server tool must have been converted away"
  );

  // End-to-end: after the CLAUDE -> OPENAI_RESPONSES translation the injected
  // tool reaches the upstream as the flat Responses function tool.
  const translated = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI_RESPONSES,
    "gpt-5.5",
    body,
    true,
    null,
    "codex"
  ) as { tools?: Array<Record<string, unknown>> };
  const upstreamTools = translated.tools ?? [];
  assert.deepEqual(upstreamTools[0], {
    type: "function",
    name: "omniroute_web_search",
    description: upstreamTools[0].description,
    parameters: upstreamTools[0].parameters,
    // chatStrictFrom stamps the provider default on converted function tools.
    strict: false,
  });
  assert.deepEqual(upstreamTools[1], {
    type: "function",
    name: "get_weather",
    description: "weather",
    parameters: { type: "object", properties: {}, additionalProperties: true },
    strict: false,
  });
});

// ── 4. interceptSearchOverride still wins ─────────────────────────────────

test("interceptSearchOverride=true forces the fallback even for the sole-tool codex shape", () => {
  assert.equal(
    supportsNativeWebSearchFallbackBypass({
      provider: "codex",
      sourceFormat: FORMATS.CLAUDE,
      targetFormat: FORMATS.OPENAI_RESPONSES,
      nativeCodexPassthrough: false,
      soleClaudeServerWebSearchTool: true,
      interceptSearchOverride: true,
    }),
    false
  );

  const { fallback } = prepareWebSearchFallbackBody(claudeWebSearchBody(), {
    provider: "codex",
    sourceFormat: FORMATS.CLAUDE,
    targetFormat: FORMATS.OPENAI_RESPONSES,
    nativeCodexPassthrough: false,
    interceptSearchOverride: true,
  });
  assert.equal(fallback.enabled, true);
  assert.equal(fallback.toolName, "omniroute_web_search");
});

// ── Response: the pure per-chunk extractor ────────────────────────────────

const { extractResponsesWebSearchEvidence } =
  await import("../../../open-sse/translator/response/openai-responses/pureHelpers.ts");

test("extractor: output_item.added web_search_call yields the call with no items yet", () => {
  const evidence = extractResponsesWebSearchEvidence({
    type: "response.output_item.added",
    item: { type: "web_search_call", id: "ws_1", status: "in_progress" },
  });
  assert.deepEqual(evidence.call, { id: "ws_1", query: "", items: [] });
  assert.deepEqual(evidence.citations, []);
});

test("extractor: output_item.done web_search_call yields query + action.sources", () => {
  const evidence = extractResponsesWebSearchEvidence({
    type: "response.output_item.done",
    item: {
      type: "web_search_call",
      id: "ws_1",
      status: "completed",
      action: { type: "search", query: "q", sources: [{ type: "url", url: "https://a/1" }] },
    },
  });
  assert.deepEqual(evidence.call, {
    id: "ws_1",
    query: "q",
    items: [{ url: "https://a/1" }],
  });
});

test("extractor: an incomplete web_search_call is not evidence", () => {
  const evidence = extractResponsesWebSearchEvidence({
    type: "response.output_item.done",
    item: { type: "web_search_call", id: "ws_1", status: "in_progress" },
  });
  assert.equal(evidence.call, undefined);
  // The `output_item.added` event already recorded the call, so the failed `done`
  // has to revoke it — otherwise the pair is emitted for a search that never ran.
  assert.equal(evidence.revokeCallId, "ws_1");
});

test("extractor: annotation.added yields url_citation hits and ignores other annotations", () => {
  assert.deepEqual(
    extractResponsesWebSearchEvidence({
      type: "response.output_text.annotation.added",
      annotation: { type: "url_citation", url: "https://b/2", title: "B" },
    }).citations,
    [{ url: "https://b/2", title: "B" }]
  );
  assert.deepEqual(
    extractResponsesWebSearchEvidence({
      type: "response.output_text.annotation.added",
      annotation: { type: "file_citation", url: "https://ignored/3" },
    }).citations,
    []
  );
});

test("extractor: response.completed snapshot fallback reads output[] calls + citations", () => {
  const evidence = extractResponsesWebSearchEvidence({
    type: "response.completed",
    response: {
      output: [
        {
          type: "web_search_call",
          id: "ws_9",
          status: "completed",
          action: { query: "snap", sources: [{ url: "https://s/1" }] },
        },
        {
          type: "message",
          content: [
            {
              type: "output_text",
              text: "t",
              annotations: [{ type: "url_citation", url: "https://c/2" }],
            },
          ],
        },
      ],
    },
  });
  assert.deepEqual(evidence.call, { id: "ws_9", query: "snap", items: [{ url: "https://s/1" }] });
  assert.deepEqual(evidence.citations, [{ url: "https://c/2" }]);
});

test("extractor: unrelated events yield an empty result", () => {
  assert.deepEqual(
    extractResponsesWebSearchEvidence({ type: "response.output_text.delta", delta: "x" }),
    {
      citations: [],
    }
  );
  assert.deepEqual(extractResponsesWebSearchEvidence(null), { citations: [] });
});

// ── Response stream fixtures ──────────────────────────────────────────────

function feed(events: unknown[]) {
  const state = initState(FORMATS.CLAUDE);
  const out: Array<Record<string, unknown>> = [];
  for (const event of events) {
    const translated = translateResponse(FORMATS.OPENAI_RESPONSES, FORMATS.CLAUDE, event, state);
    if (translated) out.push(...(translated as Array<Record<string, unknown>>));
  }
  const flushed = translateResponse(FORMATS.OPENAI_RESPONSES, FORMATS.CLAUDE, null, state);
  if (flushed) out.push(...(flushed as Array<Record<string, unknown>>));
  return out;
}

function webSearchCall(query: string, sources: Array<{ url: string; title?: string }> = []) {
  return {
    type: "web_search_call",
    id: "ws_1",
    status: "completed",
    action: { type: "search", query, sources: sources.map((s) => ({ type: "url", ...s })) },
  };
}

function urlCitation(url: string, title?: string) {
  return { type: "url_citation", url, title, start_index: 0, end_index: 5 };
}

function responsesStream({
  call,
  citations = [],
  text = "Answer text",
}: {
  call?: unknown;
  citations?: unknown[];
  text?: string;
}) {
  const events: unknown[] = [
    { type: "response.created", response: { id: "resp_1", model: "gpt-5.5" } },
  ];
  if (call) {
    events.push(
      {
        type: "response.output_item.added",
        output_index: 0,
        item: { type: "web_search_call", id: "ws_1", status: "in_progress" },
      },
      { type: "response.output_item.done", output_index: 0, item: call }
    );
  }
  events.push(
    {
      type: "response.output_item.added",
      output_index: 1,
      item: { type: "message", id: "msg_1", role: "assistant", content: [] },
    },
    { type: "response.output_text.delta", item_id: "msg_1", output_index: 1, delta: text }
  );
  for (const [index, annotation] of citations.entries()) {
    events.push({
      type: "response.output_text.annotation.added",
      item_id: "msg_1",
      output_index: 1,
      annotation_index: index,
      annotation,
    });
  }
  events.push(
    {
      type: "response.output_item.done",
      output_index: 1,
      item: {
        type: "message",
        id: "msg_1",
        role: "assistant",
        status: "completed",
        content: [{ type: "output_text", text, annotations: citations }],
      },
    },
    {
      type: "response.completed",
      response: {
        id: "resp_1",
        status: "completed",
        output: [],
        usage: { input_tokens: 10, output_tokens: 5 },
      },
    }
  );
  return events;
}

function blockIndexes(events: Array<Record<string, unknown>>) {
  const starts = new Map<number, string>();
  const stops = new Set<number>();
  for (const event of events) {
    const index = event.index as number | undefined;
    if (index === undefined) continue;
    if (event.type === "content_block_start") {
      starts.set(index, (event.content_block as Record<string, unknown>).type as string);
    } else if (event.type === "content_block_stop") {
      stops.add(index);
    }
  }
  return { starts, stops };
}

// ── 5. Response: web_search_call + text + url_citation ────────────────────

test("responses web_search_call + url_citation become server_tool_use then web_search_tool_result", () => {
  const events = feed(
    responsesStream({
      call: webSearchCall("claude code websearch", [{ url: "https://a.example/1", title: "A" }]),
      citations: [urlCitation("https://b.example/2", "B")],
    })
  );

  const types = events.map((event) => event.type);
  assert.equal(types[0], "message_start");

  const { starts, stops } = blockIndexes(events);
  assert.equal(starts.get(0), "text");
  const toolIndex = [...starts.entries()].find(([, type]) => type === "server_tool_use")?.[0];
  const resultIndex = [...starts.entries()].find(
    ([, type]) => type === "web_search_tool_result"
  )?.[0];
  assert.equal(typeof toolIndex, "number");
  assert.equal(resultIndex, (toolIndex as number) + 1);
  assert.deepEqual(
    [...starts.keys()].sort((a, b) => a - b),
    [...starts.keys()],
    "indices strictly increase"
  );
  assert.deepEqual(
    [...starts.keys()].sort((a, b) => a - b),
    [...stops].sort((a, b) => a - b)
  );

  const toolStart = events.find(
    (event) => event.type === "content_block_start" && event.index === toolIndex
  ) as { content_block: Record<string, unknown> };
  assert.equal(toolStart.content_block.name, "web_search");
  assert.deepEqual(toolStart.content_block.input, {});
  assert.match(String(toolStart.content_block.id), /^srvtoolu_/);

  const queryDelta = events.find(
    (event) => event.type === "content_block_delta" && event.index === toolIndex
  ) as { delta: Record<string, unknown> };
  assert.equal(queryDelta.delta.type, "input_json_delta");
  assert.deepEqual(JSON.parse(String(queryDelta.delta.partial_json)), {
    query: "claude code websearch",
  });

  const resultStart = events.find(
    (event) => event.type === "content_block_start" && event.index === resultIndex
  ) as { content_block: Record<string, unknown> };
  assert.equal(resultStart.content_block.tool_use_id, toolStart.content_block.id);
  assert.deepEqual(resultStart.content_block.content, [
    {
      type: "web_search_result",
      url: "https://a.example/1",
      title: "A",
      encrypted_content: "",
      page_age: null,
    },
  ]);

  // message_delta / message_stop stay last, and the text block closed first.
  assert.equal(types.at(-2), "message_delta");
  assert.equal(types.at(-1), "message_stop");
});

// ── 6. Dedupe + title fallback + citations-only + no results ──────────────

test("results dedupe by url and fall back to the url as title", () => {
  const events = feed(
    responsesStream({
      call: webSearchCall("q", [
        { url: "https://dup.example/x", title: "First wins" },
        { url: "https://dup.example/x", title: "Second loses" },
        { url: "https://untitled.example/y" },
      ]),
      citations: [urlCitation("https://ignored.example/z", "Sources win")],
    })
  );

  const resultStart = events.find(
    (event) =>
      event.type === "content_block_start" &&
      (event.content_block as Record<string, unknown>).type === "web_search_tool_result"
  ) as { content_block: { content: Array<Record<string, unknown>> } };
  // `action.sources` present → used as-is (the spec's preference); citations are
  // the fallback only when the call reported no sources.
  assert.deepEqual(resultStart.content_block.content, [
    {
      type: "web_search_result",
      url: "https://dup.example/x",
      title: "First wins",
      encrypted_content: "",
      page_age: null,
    },
    {
      type: "web_search_result",
      url: "https://untitled.example/y",
      title: "https://untitled.example/y",
      encrypted_content: "",
      page_age: null,
    },
  ]);
});

test("web_search_call without sources falls back to the citations, deduplicated", () => {
  const events = feed(
    responsesStream({
      call: webSearchCall("q"),
      citations: [
        urlCitation("https://only-citation.example/1", "Only"),
        urlCitation("https://only-citation.example/1", "Duplicate"),
        urlCitation("https://untitled.example/2"),
      ],
    })
  );
  const resultStart = events.find(
    (event) =>
      event.type === "content_block_start" &&
      (event.content_block as Record<string, unknown>).type === "web_search_tool_result"
  ) as { content_block: { content: Array<Record<string, unknown>> } };
  assert.deepEqual(resultStart.content_block.content, [
    {
      type: "web_search_result",
      url: "https://only-citation.example/1",
      title: "Only",
      encrypted_content: "",
      page_age: null,
    },
    {
      type: "web_search_result",
      url: "https://untitled.example/2",
      title: "https://untitled.example/2",
      encrypted_content: "",
      page_age: null,
    },
  ]);
});

// Event sequence captured from a real Codex (gpt-6-luna) web_search stream, ids
// replaced: the done call carries `action: { type: "search", query, queries }`
// with NO `sources`, so the hits arrive only as url_citation annotations.
test("captured Codex stream: citation-only web_search_call becomes the Claude block pair", () => {
  const url = "https://nodejs.org/en/blog/release?utm_source=openai";
  const query = "site:nodejs.org/en/blog/release latest Node.js release stable current LTS";
  const citation = { type: "url_citation", start_index: 46, end_index: 114, title: "Node.js", url };
  const text = `The latest stable Node.js release is v26.12.0. ([nodejs.org](${url}))`;
  const message = { id: "msg_codex", type: "message", role: "assistant", phase: "final_answer" };
  const events = feed([
    { type: "response.created", response: { id: "resp_codex", model: "gpt-6-luna", output: [] } },
    {
      type: "response.output_item.added",
      output_index: 0,
      item: { id: "ws_codex", type: "web_search_call", status: "in_progress" },
    },
    { type: "response.web_search_call.in_progress", item_id: "ws_codex", output_index: 0 },
    { type: "response.web_search_call.searching", item_id: "ws_codex", output_index: 0 },
    { type: "response.web_search_call.completed", item_id: "ws_codex", output_index: 0 },
    {
      type: "response.output_item.done",
      output_index: 0,
      item: {
        id: "ws_codex",
        type: "web_search_call",
        status: "completed",
        action: { type: "search", queries: [query, "site:nodejs.org previous releases"], query },
      },
    },
    {
      type: "response.output_item.added",
      output_index: 1,
      item: { ...message, status: "in_progress", content: [] },
    },
    {
      type: "response.content_part.added",
      item_id: "msg_codex",
      output_index: 1,
      content_index: 0,
      part: { type: "output_text", annotations: [], text: "" },
    },
    { type: "response.output_text.delta", item_id: "msg_codex", output_index: 1, delta: text },
    {
      type: "response.output_text.annotation.added",
      item_id: "msg_codex",
      output_index: 1,
      content_index: 0,
      annotation_index: 0,
      annotation: citation,
    },
    { type: "response.output_text.done", item_id: "msg_codex", output_index: 1, text },
    {
      type: "response.output_item.done",
      output_index: 1,
      item: {
        ...message,
        status: "completed",
        content: [{ type: "output_text", annotations: [citation], text }],
      },
    },
    {
      type: "response.completed",
      response: { id: "resp_codex", model: "gpt-6-luna", status: "completed" },
    },
  ]);

  const toolStart = events.find(
    (event) =>
      event.type === "content_block_start" &&
      (event.content_block as Record<string, unknown>).type === "server_tool_use"
  ) as { index: number; content_block: Record<string, unknown> };
  assert.ok(toolStart, "server_tool_use block emitted");
  const queryDelta = events.find(
    (event) => event.type === "content_block_delta" && event.index === toolStart.index
  ) as { delta: Record<string, unknown> };
  assert.deepEqual(JSON.parse(String(queryDelta.delta.partial_json)), { query });

  const resultStart = events.find(
    (event) =>
      event.type === "content_block_start" &&
      (event.content_block as Record<string, unknown>).type === "web_search_tool_result"
  ) as { content_block: Record<string, unknown> };
  assert.equal(resultStart.content_block.tool_use_id, toolStart.content_block.id);
  assert.deepEqual(resultStart.content_block.content, [
    { type: "web_search_result", url, title: "Node.js", encrypted_content: "", page_age: null },
  ]);
});

test("web_search_call with no hits at all still emits the pair with an empty content list", () => {
  const events = feed(responsesStream({ call: webSearchCall("q") }));
  const resultStart = events.find(
    (event) =>
      event.type === "content_block_start" &&
      (event.content_block as Record<string, unknown>).type === "web_search_tool_result"
  ) as { content_block: { content: unknown[] } };
  assert.ok(resultStart, "the search ran — its (empty) result block is the honest signal");
  assert.deepEqual(resultStart.content_block.content, []);
});

// ── 7. Regression guards ──────────────────────────────────────────────────

test("regression: a Responses stream with no web_search_call produces the base event sequence", () => {
  const events = feed(responsesStream({ text: "just text" }));
  assert.deepEqual(
    events.map((event) => event.type),
    [
      "message_start",
      "content_block_start",
      "content_block_delta",
      "content_block_stop",
      "message_delta",
      "message_stop",
    ]
  );
  assert.equal(
    events.some((event) =>
      ["server_tool_use", "web_search_tool_result"].includes(
        (event.content_block as Record<string, unknown> | undefined)?.type as string
      )
    ),
    false
  );
});

test("regression: an OpenAI Chat client stream WITH web_search_call is unchanged", () => {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  const events = responsesStream({
    call: webSearchCall("q", [{ url: "https://a.example/1", title: "A" }]),
    citations: [urlCitation("https://b.example/2", "B")],
  });
  const out: Array<Record<string, unknown>> = [];
  for (const event of events) {
    const translated = translateResponse(FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, event, state);
    if (translated) out.push(...(translated as Array<Record<string, unknown>>));
  }
  const flushed = translateResponse(FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, null, state);
  if (flushed) out.push(...(flushed as Array<Record<string, unknown>>));

  // The hub emits no web-search artifact of its own — the recording half is silent.
  const serialized = JSON.stringify(out);
  assert.equal(serialized.includes("server_tool_use"), false);
  assert.equal(serialized.includes("web_search_tool_result"), false);
  const deltas = out.flatMap((chunk) =>
    Array.isArray((chunk.choices as Array<{ delta?: Record<string, unknown> }>)?.[0]?.delta)
      ? []
      : [(chunk.choices as Array<{ delta?: Record<string, unknown> }>)?.[0]?.delta ?? {}]
  );
  assert.equal(
    deltas.some((delta) => "annotations" in delta),
    false
  );
});

// ── 8. A failed web search must not produce a search block pair ───────────

test("a web_search_call that failed (done status != completed) emits no search block pair", () => {
  const events = feed(
    responsesStream({
      // `output_item.added` announces ws_1, then the `done` reports it failed:
      // no action, no sources — the search produced no evidence.
      call: { type: "web_search_call", id: "ws_1", status: "failed" },
    })
  );

  const { starts } = blockIndexes(events);
  assert.equal(
    [...starts.values()].includes("server_tool_use"),
    false,
    "a failed search must not report a server_tool_use block"
  );
  assert.equal(
    [...starts.values()].includes("web_search_tool_result"),
    false,
    "a failed search must not report an (empty) web_search_tool_result block"
  );
  assert.equal(
    JSON.stringify(events).includes("srvtoolu_"),
    false,
    "no web-search tool_use id may leak for a failed search"
  );
});
