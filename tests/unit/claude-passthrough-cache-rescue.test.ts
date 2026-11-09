/**
 * ensurePassthroughCacheBreakpoints — prompt-cache rescue for the pure
 * claude→claude passthrough branch (chatCore #1359 passthrough-trust).
 *
 * Marker-less Anthropic-format clients (e.g. Cursor) ship zero cache
 * breakpoints through passthrough, re-billing the full prefix every turn
 * (678M uncached prompt tokens/week observed on provider=claude). The
 * rescue injects breakpoints ONLY when none exist anywhere; a client that
 * manages its own markers (Claude Code) must be byte-untouched.
 */
import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import { buildClaudePassthroughBody } from "../../open-sse/handlers/chatCore/claudePassthroughBody.ts";
import { ensurePassthroughCacheBreakpoints } from "../../open-sse/translator/helpers/claudeHelper.ts";

type Block = Record<string, unknown>;

function markerlessBody(): Record<string, unknown> {
  return {
    model: "claude-sonnet-5",
    system: [
      { type: "text", text: "You are a helpful assistant." },
      { type: "text", text: "Project context goes here." },
    ],
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: "u1" }],
      },
      {
        role: "assistant",
        content: [{ type: "text", text: "a1" }],
      },
      {
        role: "user",
        content: [{ type: "text", text: "u2" }],
      },
      {
        role: "assistant",
        content: [{ type: "text", text: "a2" }],
      },
      { role: "user", content: [{ type: "text", text: "u3" }] },
    ],
  };
}

function cacheControlledBlocks(body: Record<string, unknown>): Block[] {
  const blocks: Block[] = [];
  if (Array.isArray(body.system)) {
    for (const block of body.system) {
      if ((block as Block)?.cache_control) blocks.push(block as Block);
    }
  }
  if (Array.isArray(body.messages)) {
    for (const message of body.messages as Array<{ role: string; content: unknown }>) {
      if (Array.isArray(message.content)) {
        for (const block of message.content as Block[]) {
          if ((block as Block)?.cache_control) blocks.push(block as Block);
        }
      }
    }
  }
  return blocks;
}

describe("ensurePassthroughCacheBreakpoints", () => {
  test("injects markers into a marker-less body", () => {
    const body = markerlessBody();
    const result = ensurePassthroughCacheBreakpoints(body as never) as Record<string, unknown>;

    const marked = cacheControlledBlocks(result);
    assert.ok(marked.length > 0, "expected at least one injected marker");

    // system tail gets the 1h breakpoint
    const system = result.system as Block[];
    assert.deepEqual(system[system.length - 1].cache_control, { type: "ephemeral", ttl: "1h" });
    assert.equal(system[0].cache_control, undefined);

    // second-to-last user turn (u2) gets a marker
    const messages = result.messages as Array<{ role: string; content: Block[] }>;
    const userContents = messages.filter((m) => m.role === "user").map((m) => m.content);
    assert.deepEqual(userContents[1][0].cache_control, { type: "ephemeral" });
    assert.equal(userContents[0][0].cache_control, undefined);
    assert.equal(userContents[2][0].cache_control, undefined);

    // last assistant turn (a2) gets a marker
    const assistantContents = messages.filter((m) => m.role === "assistant").map((m) => m.content);
    assert.deepEqual(assistantContents[1][0].cache_control, { type: "ephemeral" });
    assert.equal(assistantContents[0][0].cache_control, undefined);
  });

  test("no-op when the client already manages markers (Claude Code)", () => {
    const body = markerlessBody();
    const clientMarker = { type: "ephemeral", ttl: "5m" };
    const system = body.system as Block[];
    system[system.length - 1].cache_control = clientMarker;

    const result = ensurePassthroughCacheBreakpoints(body as never) as Record<string, unknown>;

    // exactly the client's marker, unchanged
    assert.deepEqual(
      (result.system as Block[])[(result.system as Block[]).length - 1].cache_control,
      clientMarker
    );
    const marked = cacheControlledBlocks(result);
    assert.equal(marked.length, 1, "no extra markers may be injected");
    const messages = result.messages as Array<{ role: string; content: Block[] }>;
    for (const message of messages) {
      for (const block of message.content) {
        assert.equal(block.cache_control, undefined);
      }
    }
  });

  test("marker in any message content block counts as client-managed", () => {
    const body = markerlessBody();
    const messages = body.messages as Array<{ role: string; content: Block[] }>;
    messages[0].content[0].cache_control = { type: "ephemeral" };

    const result = ensurePassthroughCacheBreakpoints(body as never) as Record<string, unknown>;
    assert.equal(cacheControlledBlocks(result).length, 1);
    assert.equal((result.system as Block[])[1].cache_control, undefined);
  });

  test("string content is normalized to blocks before marking", () => {
    const body = markerlessBody();
    (body.messages as Array<{ role: string; content: unknown }>)[0].content = "plain u1 text";

    const result = ensurePassthroughCacheBreakpoints(body as never) as Record<string, unknown>;
    const messages = result.messages as Array<{ role: string; content: Block[] }>;
    assert.ok(Array.isArray(messages[0].content), "string content becomes a block array");
    assert.deepEqual(messages[0].content[0], {
      type: "text",
      text: "plain u1 text",
    });
  });

  test("empty conversation and missing system are safe no-ops", () => {
    const empty = ensurePassthroughCacheBreakpoints({ messages: [] } as never);
    assert.deepEqual(empty, { messages: [] });

    const noSystem = ensurePassthroughCacheBreakpoints({
      messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
    } as never) as Record<string, unknown>;
    const messages = noSystem.messages as Array<{ role: string; content: Block[] }>;
    assert.equal(messages[0].content[0].cache_control, undefined);
  });

  test("mutates in place and returns the same object reference", () => {
    const body = markerlessBody();
    const result = ensurePassthroughCacheBreakpoints(body as never);
    assert.equal(result, body);
  });
});

describe("ensurePassthroughCacheBreakpoints block eligibility", () => {
  const signedThinking = { type: "thinking", thinking: "plan", signature: "sig" };
  const redactedThinking = { type: "redacted_thinking", data: "opaque" };

  function withLastAssistant(content: Block[]): Record<string, unknown> {
    const body = markerlessBody();
    (body.messages as Array<{ role: string; content: Block[] }>)[3].content = content;
    return body;
  }

  for (const trailing of [signedThinking, redactedThinking]) {
    test(`a trailing ${trailing.type} block stays unmarked`, () => {
      const body = withLastAssistant([{ type: "text", text: "a2" }, { ...trailing }]);
      ensurePassthroughCacheBreakpoints(body as never);

      const content = (body.messages as Array<{ content: Block[] }>)[3].content;
      assert.equal(content[1].cache_control, undefined);
      assert.deepEqual(content[0].cache_control, { type: "ephemeral" });
    });
  }

  test("a thinking-only last assistant turn falls back to the previous one", () => {
    const body = withLastAssistant([{ ...signedThinking }]);
    ensurePassthroughCacheBreakpoints(body as never);

    const messages = body.messages as Array<{ content: Block[] }>;
    assert.equal(messages[3].content[0].cache_control, undefined);
    assert.deepEqual(messages[1].content[0].cache_control, { type: "ephemeral" });
  });

  for (const text of ["", "  \n"]) {
    test(`a blank text block (${JSON.stringify(text)}) stays unmarked`, () => {
      const body = withLastAssistant([
        { type: "text", text: "a2" },
        { type: "text", text },
      ]);
      ensurePassthroughCacheBreakpoints(body as never);

      const content = (body.messages as Array<{ content: Block[] }>)[3].content;
      assert.equal(content[1].cache_control, undefined);
      assert.deepEqual(content[0].cache_control, { type: "ephemeral" });
    });
  }

  test("a blank block at the end of the second-to-last user turn stays unmarked", () => {
    const body = markerlessBody();
    const messages = body.messages as Array<{ content: Block[] }>;
    messages[2].content.push({ type: "text", text: "" });
    ensurePassthroughCacheBreakpoints(body as never);

    assert.equal(messages[2].content[1].cache_control, undefined);
    assert.deepEqual(messages[2].content[0].cache_control, { type: "ephemeral" });
  });

  test("a blank system tail moves the 1h breakpoint to the last real block", () => {
    const body = markerlessBody();
    const system = body.system as Block[];
    system.push({ type: "text", text: "" });
    ensurePassthroughCacheBreakpoints(body as never);

    assert.equal(system[2].cache_control, undefined);
    assert.deepEqual(system[1].cache_control, { type: "ephemeral", ttl: "1h" });
  });
});

describe("ensurePassthroughCacheBreakpoints conversation-tail TTL", () => {
  const FLAG = "CLAUDE_CACHE_TAIL_TTL_1H";
  const RESOLVER_KEY = Symbol.for("omniroute.featureFlagResolver");
  const globalStore = globalThis as Record<symbol, unknown>;
  let savedEnv: string | undefined;
  let savedResolver: unknown;

  beforeEach(() => {
    savedEnv = process.env[FLAG];
    savedResolver = globalStore[RESOLVER_KEY];
    delete globalStore[RESOLVER_KEY];
  });

  afterEach(() => {
    if (savedEnv === undefined) delete process.env[FLAG];
    else process.env[FLAG] = savedEnv;
    if (savedResolver !== undefined) globalStore[RESOLVER_KEY] = savedResolver;
  });

  test("the injected tail follows the opt-in 1h flag", () => {
    process.env[FLAG] = "true";
    const body = markerlessBody();
    ensurePassthroughCacheBreakpoints(body as never, "claude");

    const messages = body.messages as Array<{ content: Block[] }>;
    assert.deepEqual(messages[2].content[0].cache_control, { type: "ephemeral", ttl: "1h" });
    assert.deepEqual(messages[3].content[0].cache_control, { type: "ephemeral", ttl: "1h" });
  });
});

describe("buildClaudePassthroughBody cache breakpoint gate", () => {
  function build(
    body: Record<string, unknown>,
    provider: string,
    connectionCacheOverride?: Record<string, unknown> | null
  ): Record<string, unknown> {
    return buildClaudePassthroughBody({
      body,
      provider,
      clientHeaders: null,
      isClaudeCodeSemanticPassthrough: false,
      effectiveModel: "claude-sonnet-5",
      targetFormat: "claude",
      preserveCacheControl: false,
      connectionCacheOverride,
      normalizeClaudeUpstreamMessages: () => {},
      applyReasoningRuleDirective: (b) => b,
      log: null,
    } as never);
  }

  test("markers never reach the caller's body, which a combo replays on its next step", () => {
    const body = markerlessBody();
    (body.messages as Array<{ content: unknown }>)[0].content = "plain u1 text";
    const original = structuredClone(body);

    const out = build(body, "claude");

    assert.ok(cacheControlledBlocks(out).length > 0, "the dispatched body carries the markers");
    assert.deepEqual(body, original);
  });

  test("anthropic-compatible connections get the breakpoints", () => {
    const out = build(markerlessBody(), "anthropic-compatible-acme");
    assert.equal(cacheControlledBlocks(out).length, 3);
  });

  test("third-party Claude-shape providers get none", () => {
    const out = build(markerlessBody(), "kimi-coding");
    assert.equal(cacheControlledBlocks(out).length, 0);
  });

  for (const override of [{ supportsPromptCaching: false }, { cacheControlPassthrough: "strip" }]) {
    test(`a connection with ${JSON.stringify(override)} opts out`, () => {
      const out = build(markerlessBody(), "anthropic-compatible-acme", override);
      assert.equal(cacheControlledBlocks(out).length, 0);
    });
  }
});
