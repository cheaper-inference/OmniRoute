/**
 * OpenCode free tier via the Bun relay: with OPENCODE_FREE_TIER_RELAY_URL set, gated requests
 * are sent to the relay and carry the canonical OpenCode CLI prompt as messages[0] plus the
 * CLI tool set; calls to CLI tools the caller never declared are dropped from the reply.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import {
  canonicalOpencodeSystemPrompt,
  freeTierRelayUrl,
  attemptFor,
} from "../../open-sse/executors/opencodeFreeTierContract.ts";
import { OPENCODE_CLI_TOOLS } from "../../open-sse/executors/opencodeCliPrompt.ts";
import { filterInjectedToolCalls } from "../../open-sse/executors/opencodeInjectedToolFilter.ts";

const FREE = "deepseek-v4.1-flash-free";
const RELAY = "http://127.0.0.1:20199";

function withRelay<T>(value: string | undefined, fn: () => T): T {
  const prev = process.env.OPENCODE_FREE_TIER_RELAY_URL;
  if (value === undefined) delete process.env.OPENCODE_FREE_TIER_RELAY_URL;
  else process.env.OPENCODE_FREE_TIER_RELAY_URL = value;
  try {
    return fn();
  } finally {
    if (prev === undefined) delete process.env.OPENCODE_FREE_TIER_RELAY_URL;
    else process.env.OPENCODE_FREE_TIER_RELAY_URL = prev;
  }
}

test("freeTierRelayUrl: unset, junk and non-http values are ignored", () => {
  assert.equal(withRelay(undefined, freeTierRelayUrl), null);
  assert.equal(withRelay("not a url", freeTierRelayUrl), null);
  assert.equal(withRelay("ftp://x", freeTierRelayUrl), null);
  assert.equal(withRelay(`${RELAY}/`, freeTierRelayUrl), RELAY);
});

test("buildUrl: gated free requests go to the relay, paid/go/unset do not", () => {
  const zen = new OpencodeExecutor("opencode-zen");
  const go = new OpencodeExecutor("opencode-go");
  withRelay(RELAY, () => {
    assert.equal(zen.buildUrl(FREE, true), `${RELAY}/inference/v1/chat/completions`);
    assert.equal(zen.buildUrl("gpt-5.6-luna", true).startsWith("https://opencode.ai/zen/v1"), true);
    assert.equal(go.buildUrl("kimi-k2.6", true).startsWith("https://opencode.ai/zen/go/v1"), true);
  });
  withRelay(undefined, () => {
    assert.equal(zen.buildUrl(FREE, true), "https://opencode.ai/inference/v1/chat/completions");
  });
});

test("transformRequest: canonical prompt first, client system text after it, CLI tools declared", () => {
  const zen = new OpencodeExecutor("opencode-zen");
  const body = {
    model: FREE,
    messages: [
      { role: "system", content: "You are a helpful assistant" },
      { role: "user", content: "reply with exactly: ok" },
    ],
  };
  const out = withRelay(RELAY, () => zen.transformRequest(FREE, body, true, null as never)) as {
    messages: Array<{ role: string; content: string }>;
    tools: Array<{ function: { name: string } }>;
    stream: boolean;
  };
  assert.equal(out.stream, true);
  assert.equal(out.messages[0].role, "system");
  assert.equal(out.messages[0].content, canonicalOpencodeSystemPrompt(FREE));
  assert.match(out.messages[0].content, /^You are opencode, an interactive CLI tool/);
  assert.equal(out.messages[1].content, "You are a helpful assistant");
  assert.equal(out.messages[2].content, "reply with exactly: ok");
  assert.deepEqual(
    out.tools.map((t) => t.function.name),
    [
      "bash",
      "edit",
      "glob",
      "grep",
      "read",
      "skill",
      "task",
      "todowrite",
      "webfetch",
      "websearch",
      "write",
    ]
  );
  assert.equal(attemptFor(body)?.injectedToolNames?.length, 11);
  assert.doesNotMatch(out.messages[0].content, /Administrator|\{\{/);
});

test("transformRequest: client tools are kept and win name clashes; paid models and no-relay untouched", () => {
  const zen = new OpencodeExecutor("opencode-zen");
  const weather = {
    type: "function",
    function: {
      name: "get_weather",
      description: "w",
      parameters: { type: "object", properties: {} },
    },
  };
  const clientRead = {
    type: "function",
    function: {
      name: "read",
      description: "mine",
      parameters: { type: "object", properties: { p: { type: "string" } } },
    },
  };
  const body = {
    model: FREE,
    messages: [{ role: "user", content: "hi" }],
    tools: [weather, clientRead],
  };
  const out = withRelay(RELAY, () => zen.transformRequest(FREE, body, true, null as never)) as {
    tools: Array<{ function: { name: string; description: string } }>;
  };
  const names = out.tools.map((t) => t.function.name);
  assert.equal(names.filter((n) => n === "read").length, 1);
  assert.equal(out.tools.find((t) => t.function.name === "read")?.function.description, "mine");
  assert.ok(names.includes("get_weather"));
  assert.equal(names.length, 12);
  const injected = attemptFor(body)?.injectedToolNames ?? [];
  assert.equal(injected.includes("read"), false);
  assert.equal(injected.includes("get_weather"), false);
  assert.equal(injected.length, OPENCODE_CLI_TOOLS.length - 1);

  const paid = withRelay(RELAY, () =>
    zen.transformRequest(
      "gpt-5.6-luna",
      { model: "gpt-5.6-luna", messages: [{ role: "user", content: "hi" }] },
      false,
      null as never
    )
  ) as Record<string, unknown>;
  assert.equal("tools" in paid, false);

  const plain = withRelay(undefined, () =>
    zen.transformRequest(
      FREE,
      { model: FREE, messages: [{ role: "user", content: "hi" }] },
      true,
      null as never
    )
  ) as { messages: unknown[]; tools: unknown[] };
  assert.equal(plain.messages.length, 1);
  assert.equal(plain.tools.length, 1);
});

function sse(events: unknown[]): Response {
  const text = events
    .map((e) => `data: ${typeof e === "string" ? e : JSON.stringify(e)}\n\n`)
    .join("");
  return new Response(text, { status: 200, headers: { "content-type": "text/event-stream" } });
}

test("filterInjectedToolCalls: drops injected tool calls, keeps client ones, fixes finish_reason", async () => {
  const chunk = (delta: unknown, finish: string | null = null) => ({
    choices: [{ index: 0, delta, finish_reason: finish }],
  });
  const onlyInjected = sse([
    chunk({ content: "hi" }),
    chunk({
      tool_calls: [
        { index: 0, id: "a", type: "function", function: { name: "bash", arguments: "" } },
      ],
    }),
    chunk({ tool_calls: [{ index: 0, function: { arguments: '{"command":"ls"}' } }] }),
    chunk({}, "tool_calls"),
    "[DONE]",
  ]);
  const a = await filterInjectedToolCalls(onlyInjected, ["bash", "read"]).text();
  assert.doesNotMatch(a, /bash|command/);
  assert.match(a, /"finish_reason":"stop"/);
  assert.doesNotMatch(a, /"finish_reason":"tool_calls"/);
  assert.match(a, /"content":"hi"/);
  assert.match(a, /\[DONE\]/);

  const mixed = sse([
    chunk({
      tool_calls: [
        { index: 0, id: "a", type: "function", function: { name: "bash", arguments: "{}" } },
      ],
    }),
    chunk({
      tool_calls: [
        {
          index: 1,
          id: "b",
          type: "function",
          function: { name: "get_weather", arguments: '{"c":1}' },
        },
      ],
    }),
    chunk({}, "tool_calls"),
  ]);
  const b = await filterInjectedToolCalls(mixed, ["bash"]).text();
  assert.doesNotMatch(b, /bash/);
  assert.match(b, /get_weather/);
  assert.match(b, /"finish_reason":"tool_calls"/);
});

test("buildHeaders: relay mode mints a session whose time part is recent and stable per day", () => {
  const zen = new OpencodeExecutor("opencode-zen");
  const body = { model: FREE, messages: [{ role: "user", content: "hi" }] };
  const one = withRelay(RELAY, () => zen.buildHeaders(null, true, null, FREE, undefined, body));
  const two = withRelay(RELAY, () => zen.buildHeaders(null, true, null, FREE, undefined, body));
  const session = one["x-opencode-session"];
  assert.equal(session, two["x-opencode-session"]);
  const decoded = ~BigInt(`0x${session.slice(4, 16)}`) & 0xffffffffffffn;
  assert.equal(decoded & 0xfffn, 1n);
  const ts = decoded >> 12n;
  const now = BigInt(Date.now()) & 0xfffffffffn;
  const age = (now - ts + (1n << 36n)) & 0xfffffffffn;
  assert.ok(age >= 0n && age < 2n * 86_400_000n, `session age ${age}ms`);
});
