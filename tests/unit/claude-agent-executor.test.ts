// Unit tests for the claude-agent executor's pure helpers.
// The executor itself needs the vendored Claude Code CLI + host login, so only
// request-shaping / name-mapping logic is covered here.
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  connectionEnv,
  effortFrom,
  historyPrompt,
  sanitizeToolName,
  systemToPrompt,
  toToolShape,
  unmangleContent,
} from "../../open-sse/executors/claude-agent.ts";

describe("claude-agent executor helpers", () => {
  describe("systemToPrompt", () => {
    it("passes strings through", () => {
      assert.equal(systemToPrompt("be terse"), "be terse");
      assert.equal(systemToPrompt("   "), undefined);
    });

    it("joins text blocks", () => {
      assert.equal(
        systemToPrompt([
          { type: "text", text: "first" },
          { type: "text", text: "second" },
          { type: "image_url" },
        ]),
        "first\nsecond"
      );
    });

    it("returns undefined for other shapes", () => {
      assert.equal(systemToPrompt(undefined), undefined);
      assert.equal(systemToPrompt(42), undefined);
    });
  });

  describe("sanitizeToolName", () => {
    it("keeps valid MCP names", () => {
      assert.equal(sanitizeToolName("get_weather"), "get_weather");
      assert.equal(sanitizeToolName("Web-Search-2"), "Web-Search-2");
    });

    it("replaces characters MCP forbids", () => {
      assert.equal(sanitizeToolName("my.tool"), "my_tool");
      assert.equal(sanitizeToolName("dot/name"), "dot_name");
    });
  });

  describe("toToolShape", () => {
    it("converts a JSON Schema object into a zod raw shape", () => {
      const shape = toToolShape({
        type: "object",
        properties: { q: { type: "string" }, n: { type: "number" } },
        required: ["q"],
      });
      assert.ok(shape.q);
      assert.ok(shape.n);
    });

    it("falls back on garbage input without throwing", () => {
      assert.deepEqual(Object.keys(toToolShape(null)), []);
      assert.ok(toToolShape({ type: "definitely-not-real" }));
    });
  });

  describe("effortFrom", () => {
    it("maps valid output_config.effort", () => {
      assert.equal(effortFrom({ output_config: { effort: "high" } }), "high");
      assert.equal(effortFrom({ output_config: { effort: "max" } }), "max");
    });

    it("ignores unknown or missing effort", () => {
      assert.equal(effortFrom({ output_config: { effort: "turbo" } }), undefined);
      assert.equal(effortFrom({}), undefined);
    });
  });

  describe("unmangleContent", () => {
    it("strips the omniroute MCP prefix from tool_use names", () => {
      const rename = (name: string) =>
        name.startsWith("mcp__omniroute__") ? name.replace("mcp__omniroute__", "") : name;
      const content = unmangleContent(
        [
          { type: "text", text: "hi" },
          { type: "tool_use", id: "t1", name: "mcp__omniroute__get_weather", input: {} },
        ],
        rename
      );
      assert.deepEqual(content[0], { type: "text", text: "hi" });
      assert.equal((content[1] as { name: string }).name, "get_weather");
    });
  });

  describe("historyPrompt", () => {
    it("marks the last user message as the turn trigger", async () => {
      const messages = [
        { role: "user", content: "q1" },
        { role: "assistant", content: "a1" },
        { role: "user", content: "q2" },
      ];
      const yielded: Array<{ shouldQuery: boolean; message: { role: string } }> = [];
      for await (const message of historyPrompt({ messages })) {
        yielded.push({
          shouldQuery: Boolean(message.shouldQuery),
          message: message.message as { role: string },
        });
      }
      assert.deepEqual(
        yielded.map((entry) => entry.shouldQuery),
        [false, false, true]
      );
      assert.deepEqual(
        yielded.map((entry) => entry.message.role),
        ["user", "assistant", "user"]
      );
    });

    it("adds a synthetic trigger for trailing assistant prefill", async () => {
      const yielded: Array<{ shouldQuery: boolean; message: { role: string; content: string } }> =
        [];
      for await (const message of historyPrompt({
        messages: [
          { role: "user", content: "hi" },
          { role: "assistant", content: "partial" },
        ],
      })) {
        yielded.push({
          shouldQuery: Boolean(message.shouldQuery),
          message: message.message as { role: string; content: string },
        });
      }
      assert.equal(yielded.length, 3);
      assert.equal(yielded[2].shouldQuery, true);
      assert.equal(yielded[2].message.role, "user");
    });

    it("drops non-conversation roles", async () => {
      const yielded: Array<{ message: { role: string } }> = [];
      for await (const message of historyPrompt({
        messages: [
          { role: "system", content: "x" },
          { role: "user", content: "q" },
        ],
      })) {
        yielded.push({ message: message.message as { role: string } });
      }
      assert.deepEqual(
        yielded.map((entry) => entry.message.role),
        ["user"]
      );
    });
  });
});

// ──── connectionEnv: multi-account credential → CLI env mapping ──────────────
describe("connectionEnv", () => {
  it("returns null without credentials (keep host ~/.claude login)", () => {
    assert.equal(connectionEnv({}), null);
    assert.equal(connectionEnv({ apiKey: null }), null);
  });

  it("ignores empty-string credentials", () => {
    assert.equal(connectionEnv({ accessToken: "", apiKey: "" }), null);
  });

  it("maps accessToken to CLAUDE_CODE_OAUTH_TOKEN", () => {
    assert.deepEqual(connectionEnv({ accessToken: "sk-ant-oat01-x" }), {
      CLAUDE_CODE_OAUTH_TOKEN: "sk-ant-oat01-x",
    });
  });

  it("maps apiKey to ANTHROPIC_API_KEY", () => {
    assert.deepEqual(connectionEnv({ apiKey: "sk-ant-api01-y" }), {
      ANTHROPIC_API_KEY: "sk-ant-api01-y",
    });
  });

  it("maps both credentials at once", () => {
    assert.deepEqual(connectionEnv({ accessToken: "tok", apiKey: "key" }), {
      CLAUDE_CODE_OAUTH_TOKEN: "tok",
      ANTHROPIC_API_KEY: "key",
    });
  });
});
