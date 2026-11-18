/**
 * Conversation-tail cache TTL (CLAUDE_CACHE_TAIL_TTL_1H, opt-in).
 *
 * OmniRoute anchors system + tools at ttl "1h" but marks the conversation tail
 * (second-to-last user turn, last assistant turn) with the default 5m TTL. A
 * pause longer than 5 minutes then rewrites the whole prefix at the write
 * premium. The opt-in flag gives the tail the same TTL as the head, through
 * createDefaultClaudeCacheControl (1h; Vertex keeps 5m). With the flag off the
 * tail markers must be byte-identical to before: { type: "ephemeral" }.
 */
import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  CLAUDE_CACHE_TAIL_TTL_1H_FLAG,
  createClaudeTailCacheControl,
  prepareClaudeRequest,
} from "../../open-sse/translator/helpers/claudeHelper.ts";
import { openaiToClaudeRequest } from "../../open-sse/translator/request/openai-to-claude.ts";
import "../../open-sse/translator/bootstrap.ts";
import { FEATURE_FLAG_DEFINITIONS } from "../../src/shared/constants/featureFlagDefinitions.ts";

type Block = Record<string, unknown>;
type Message = { role: string; content: Block[] };

const FLAG = "CLAUDE_CACHE_TAIL_TTL_1H";
const RESOLVER_KEY = Symbol.for("omniroute.featureFlagResolver");
const globalStore = globalThis as Record<symbol, unknown>;

let savedEnv: string | undefined;
let savedResolver: unknown;

beforeEach(() => {
  savedEnv = process.env[FLAG];
  savedResolver = globalStore[RESOLVER_KEY];
  // Read the flag from the environment only, so the test never depends on a
  // DB override left behind by another suite.
  delete globalStore[RESOLVER_KEY];
  delete process.env[FLAG];
});

afterEach(() => {
  if (savedEnv === undefined) delete process.env[FLAG];
  else process.env[FLAG] = savedEnv;
  if (savedResolver === undefined) delete globalStore[RESOLVER_KEY];
  else globalStore[RESOLVER_KEY] = savedResolver;
});

function threeTurnBody(): Record<string, unknown> {
  return {
    model: "claude-sonnet-5",
    system: [{ type: "text", text: "You are a helpful assistant." }],
    tools: [
      {
        name: "get_weather",
        description: "Weather lookup",
        input_schema: { type: "object", properties: {} },
      },
    ],
    messages: [
      { role: "user", content: [{ type: "text", text: "First question" }] },
      { role: "assistant", content: [{ type: "text", text: "First answer" }] },
      { role: "user", content: [{ type: "text", text: "Second question" }] },
      { role: "assistant", content: [{ type: "text", text: "Second answer" }] },
      { role: "user", content: [{ type: "text", text: "Third question" }] },
    ],
    max_tokens: 128,
  };
}

function tailMarkers(body: Record<string, unknown>) {
  const messages = body.messages as Message[];
  return {
    secondToLastUser: messages[2].content.at(-1)?.cache_control,
    lastAssistant: messages[3].content.at(-1)?.cache_control,
  };
}

function headMarkers(body: Record<string, unknown>) {
  return {
    system: (body.system as Block[]).at(-1)?.cache_control,
    tool: (body.tools as Block[]).at(-1)?.cache_control,
  };
}

function openaiBody(): Record<string, unknown> {
  return {
    model: "claude-opus-5",
    messages: [
      { role: "system", content: "Be brief." },
      { role: "user", content: "Hello" },
      { role: "assistant", content: "Hi there" },
      { role: "user", content: "How are you?" },
    ],
  };
}

function openaiAssistantAnchor(provider: string): unknown {
  const out = openaiToClaudeRequest("claude-opus-5", openaiBody(), false, {
    _provider: provider,
  }) as { messages: Message[] };
  const assistant = out.messages.filter((m) => m.role === "assistant").at(-1);
  return assistant?.content.at(-1)?.cache_control;
}

describe("Claude cache tail TTL: flag off (default)", () => {
  test("the flag is registered and defaults to off", () => {
    assert.equal(CLAUDE_CACHE_TAIL_TTL_1H_FLAG, FLAG);
    const def = FEATURE_FLAG_DEFINITIONS.find((d) => d.key === FLAG);
    assert.ok(def, `${FLAG} must be defined in featureFlagDefinitions.ts`);
    assert.equal(def.category, "runtime");
    assert.equal(def.type, "boolean");
    assert.equal(def.defaultValue, "false");
    assert.equal(def.requiresRestart, false);
    assert.deepEqual(createClaudeTailCacheControl("claude"), { type: "ephemeral" });
  });

  test("prepareClaudeRequest keeps the 5m tail and the 1h head exactly as before", () => {
    const out = prepareClaudeRequest(threeTurnBody(), "claude");
    assert.deepEqual(tailMarkers(out), {
      secondToLastUser: { type: "ephemeral" },
      lastAssistant: { type: "ephemeral" },
    });
    assert.deepEqual(headMarkers(out), {
      system: { type: "ephemeral", ttl: "1h" },
      tool: { type: "ephemeral", ttl: "1h" },
    });
  });

  test("anthropic-compatible relays keep the 5m tail", () => {
    const out = prepareClaudeRequest(threeTurnBody(), "anthropic-compatible-relay");
    assert.deepEqual(tailMarkers(out), {
      secondToLastUser: { type: "ephemeral" },
      lastAssistant: { type: "ephemeral" },
    });
  });

  test("an explicit false value keeps the 5m tail", () => {
    process.env[FLAG] = "false";
    const out = prepareClaudeRequest(threeTurnBody(), "claude");
    assert.deepEqual(tailMarkers(out).lastAssistant, { type: "ephemeral" });
  });

  test("openai-to-claude keeps the 5m assistant anchor", () => {
    assert.deepEqual(openaiAssistantAnchor("claude"), { type: "ephemeral" });
  });
});

describe("Claude cache tail TTL: flag on", () => {
  test("prepareClaudeRequest gives the tail the same 1h TTL as the head", () => {
    process.env[FLAG] = "true";
    const out = prepareClaudeRequest(threeTurnBody(), "claude");
    assert.deepEqual(tailMarkers(out), {
      secondToLastUser: { type: "ephemeral", ttl: "1h" },
      lastAssistant: { type: "ephemeral", ttl: "1h" },
    });
    assert.deepEqual(headMarkers(out), {
      system: { type: "ephemeral", ttl: "1h" },
      tool: { type: "ephemeral", ttl: "1h" },
    });
  });

  test("anthropic-compatible relays get the 1h tail", () => {
    process.env[FLAG] = "1";
    const out = prepareClaudeRequest(threeTurnBody(), "anthropic-compatible-relay");
    assert.deepEqual(tailMarkers(out), {
      secondToLastUser: { type: "ephemeral", ttl: "1h" },
      lastAssistant: { type: "ephemeral", ttl: "1h" },
    });
  });

  test("Vertex keeps the 5m tail (and 5m head)", () => {
    process.env[FLAG] = "true";
    for (const provider of ["vertex", "vertex-partner"]) {
      const out = prepareClaudeRequest(threeTurnBody(), provider);
      assert.deepEqual(tailMarkers(out), {
        secondToLastUser: { type: "ephemeral" },
        lastAssistant: { type: "ephemeral" },
      });
      assert.deepEqual(headMarkers(out), {
        system: { type: "ephemeral" },
        tool: { type: "ephemeral" },
      });
    }
  });

  test("a DB override read through the registered resolver turns it on", () => {
    globalStore[RESOLVER_KEY] = (key: string) => key === FLAG;
    const out = prepareClaudeRequest(threeTurnBody(), "claude");
    assert.deepEqual(tailMarkers(out).lastAssistant, { type: "ephemeral", ttl: "1h" });
  });

  test("openai-to-claude anchors the last assistant turn at 1h", () => {
    process.env[FLAG] = "true";
    assert.deepEqual(openaiAssistantAnchor("claude"), { type: "ephemeral", ttl: "1h" });
  });

  test("openai-to-claude keeps the 5m assistant anchor on Vertex", () => {
    process.env[FLAG] = "true";
    assert.deepEqual(openaiAssistantAnchor("vertex"), { type: "ephemeral" });
  });

  test("preserve mode leaves the client's own tail markers untouched", () => {
    process.env[FLAG] = "true";
    const body = threeTurnBody();
    const messages = body.messages as Message[];
    messages[3].content[0].cache_control = { type: "ephemeral" };
    const out = prepareClaudeRequest(body, "claude", true);
    assert.deepEqual(tailMarkers(out), {
      secondToLastUser: undefined,
      lastAssistant: { type: "ephemeral" },
    });
  });
});
