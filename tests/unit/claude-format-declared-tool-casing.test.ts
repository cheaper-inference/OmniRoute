/**
 * Anthropic-format clients that declare lowercase tools (OpenCode's
 * `@ai-sdk/anthropic` provider, pi) must get their OWN spelling back from every
 * provider, not Claude Code's canonical PascalCase.
 *
 * Before this fix the three translators that assemble a Claude-format response
 * (`openai-to-claude`, `gemini-to-claude`, the non-streaming responseTranslator)
 * ended in `restoreClaudeToolName()`, whose canonical upgrade (`read` -> `Read`,
 * #7926 / #9008 / #10392 / #11085) assumes the client is Claude Code. A combo
 * whose native `claude` step 429s and falls back to Antigravity, Codex or Gemini
 * therefore answered OpenCode with `tool_use.name = "Read"` for a tool it
 * declared as `read` ("No tool named Read"). The Claude SSE passthrough already
 * restores the request's DECLARED casing (#12721); this applies the same rule
 * to the translate paths. Genuine Claude Code clients (declared `Read`) keep
 * getting `Read` back when an upstream downcases it.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

const { restoreDeclaredToolName, findDeclaredToolName } =
  await import("../../open-sse/services/declaredToolCasing.ts");
const { restoreClaudeToolName } = await import("../../open-sse/services/claudeCodeToolRemapper.ts");
const { openaiToClaudeResponse } =
  await import("../../open-sse/translator/response/openai-to-claude.ts");
const { geminiToClaudeResponse } =
  await import("../../open-sse/translator/response/gemini-to-claude.ts");
const { translateNonStreamingResponse } =
  await import("../../open-sse/handlers/responseTranslator.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

type JsonRecord = Record<string, unknown>;

const anthropicTools = (names: string[]) =>
  names.map((name) => ({
    name,
    description: "d",
    input_schema: { type: "object", properties: {} },
  }));
const openaiTools = (names: string[]) =>
  names.map((name) => ({ type: "function", function: { name, parameters: { type: "object" } } }));

function toolUseNames(events: Array<JsonRecord> | null | undefined): string[] {
  return (events || [])
    .filter((e) => e.type === "content_block_start")
    .map((e) => (e.content_block as JsonRecord | undefined) ?? {})
    .filter((b) => b.type === "tool_use")
    .map((b) => String(b.name));
}

describe("restoreDeclaredToolName - the request decides the casing", () => {
  it("baseline: the legacy helper still upgrades read -> Read with no map (what broke OpenCode)", () => {
    assert.equal(restoreClaudeToolName("read", null), "Read");
    assert.equal(restoreClaudeToolName("Read", null), "Read");
  });

  it("keeps a lowercase name the client declared lowercase, with or without a map", () => {
    for (const name of ["read", "bash", "edit", "write", "grep", "glob"]) {
      assert.equal(restoreDeclaredToolName(name, null, anthropicTools([name])), name);
      assert.equal(restoreDeclaredToolName(name, new Map(), anthropicTools([name])), name);
    }
  });

  it("downcases an upstream PascalCase echo to the declared lowercase spelling", () => {
    assert.equal(restoreDeclaredToolName("Read", null, anthropicTools(["read"])), "read");
    assert.equal(restoreDeclaredToolName("Bash", null, openaiTools(["bash"])), "bash");
  });

  it("keeps Claude Code working: declared PascalCase wins over an upstream downcase (#7926)", () => {
    assert.equal(restoreDeclaredToolName("read", null, anthropicTools(["Read"])), "Read");
    assert.equal(
      restoreDeclaredToolName("croncreate", null, anthropicTools(["CronCreate"])),
      "CronCreate"
    );
  });

  it("an identity echo in the alias ledger never pins a declared name below its own casing (#11085 shape)", () => {
    const ledger = new Map([["croncreate", "croncreate"]]);
    assert.equal(
      restoreDeclaredToolName("croncreate", ledger, anthropicTools(["CronCreate"])),
      "CronCreate"
    );
    const ledger2 = new Map([["read", "read"]]);
    assert.equal(restoreDeclaredToolName("read", ledger2, anthropicTools(["read"])), "read");
  });

  it("a non-identity alias ledger hit still wins (sanitized Gemini name -> original)", () => {
    const ledger = new Map([["mcp_srv_tool_ab12", "mcp__srv__tool"]]);
    assert.equal(
      restoreDeclaredToolName("mcp_srv_tool_ab12", ledger, anthropicTools(["mcp__srv__tool"])),
      "mcp__srv__tool"
    );
  });

  it("falls back to the legacy canonical upgrade only for names the client never declared", () => {
    assert.equal(restoreDeclaredToolName("read", null, anthropicTools(["zz_fetch_doc"])), "Read");
    assert.equal(restoreDeclaredToolName("read", null, null), "Read");
    assert.equal(restoreDeclaredToolName("read", null, []), "Read");
    assert.equal(restoreDeclaredToolName("zz_fetch_doc", null, null), "zz_fetch_doc");
  });

  it("findDeclaredToolName reads both Anthropic and OpenAI tool shapes", () => {
    assert.equal(findDeclaredToolName(anthropicTools(["read"]), "Read"), "read");
    assert.equal(findDeclaredToolName(openaiTools(["read"]), "Read"), "read");
    assert.equal(findDeclaredToolName(openaiTools(["read"]), "read"), "read");
    assert.equal(findDeclaredToolName(anthropicTools(["read"]), "write"), null);
    assert.equal(findDeclaredToolName("nope", "read"), null);
  });
});

describe("openai-to-claude streaming (Codex / OpenAI-compatible fallback behind a Claude-format client)", () => {
  const chunk = (name: string) => ({
    id: "chatcmpl-1",
    choices: [
      {
        index: 0,
        delta: {
          tool_calls: [
            { index: 0, id: "call_1", type: "function", function: { name, arguments: "{}" } },
          ],
        },
        finish_reason: null,
      },
    ],
  });

  it("OpenCode declared `read`: an upstream `read` echo stays `read`", () => {
    const state = { ...initState(FORMATS.CLAUDE), clientTools: anthropicTools(["read"]) };
    const events = openaiToClaudeResponse(chunk("read"), state) as Array<JsonRecord>;
    assert.deepEqual(toolUseNames(events), ["read"]);
  });

  it("OpenCode declared `read`: an upstream `Read` echo comes back as `read`", () => {
    const state = { ...initState(FORMATS.CLAUDE), clientTools: anthropicTools(["read"]) };
    const events = openaiToClaudeResponse(chunk("Read"), state) as Array<JsonRecord>;
    assert.deepEqual(toolUseNames(events), ["read"]);
  });

  it("Claude Code declared `Read`: an upstream `read` echo comes back as `Read`", () => {
    const state = { ...initState(FORMATS.CLAUDE), clientTools: anthropicTools(["Read"]) };
    const events = openaiToClaudeResponse(chunk("read"), state) as Array<JsonRecord>;
    assert.deepEqual(toolUseNames(events), ["Read"]);
  });

  it("no client tools on the state: legacy canonical behaviour is unchanged", () => {
    const state = initState(FORMATS.CLAUDE);
    const events = openaiToClaudeResponse(chunk("read"), state) as Array<JsonRecord>;
    assert.deepEqual(toolUseNames(events), ["Read"]);
  });
});

describe("gemini-to-claude streaming (Antigravity / Gemini fallback behind a Claude-format client)", () => {
  const chunk = (name: string) => ({
    candidates: [
      {
        content: { role: "model", parts: [{ functionCall: { name, args: { path: "a.ts" } } }] },
        index: 0,
      },
    ],
  });

  it("OpenCode declared `read`: Gemini `Read` comes back as `read`", () => {
    const state = { ...initState(FORMATS.CLAUDE), clientTools: anthropicTools(["read"]) };
    const events = geminiToClaudeResponse(chunk("Read"), state) as Array<JsonRecord>;
    assert.deepEqual(toolUseNames(events), ["read"]);
  });

  it("Claude Code declared `Read`: Gemini `read` comes back as `Read` (#9008)", () => {
    const state = { ...initState(FORMATS.CLAUDE), clientTools: anthropicTools(["Read"]) };
    const events = geminiToClaudeResponse(chunk("read"), state) as Array<JsonRecord>;
    assert.deepEqual(toolUseNames(events), ["Read"]);
  });
});

describe("non-streaming OpenAI -> Claude (the JSON path OpenCode hits with stream:false)", () => {
  const openaiResponse = (name: string) => ({
    id: "chatcmpl-1",
    object: "chat.completion",
    model: "gpt-5.6-luna",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: null,
          tool_calls: [
            { id: "call_1", type: "function", function: { name, arguments: '{"path":"a.ts"}' } },
          ],
        },
        finish_reason: "tool_calls",
      },
    ],
    usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
  });
  const names = (body: unknown) =>
    ((body as JsonRecord).content as Array<JsonRecord>)
      .filter((b) => b.type === "tool_use")
      .map((b) => String(b.name));

  it("OpenCode declared `read`: upstream `read` stays `read`, upstream `Read` becomes `read`", () => {
    for (const echoed of ["read", "Read"]) {
      const out = translateNonStreamingResponse(
        openaiResponse(echoed),
        FORMATS.OPENAI,
        FORMATS.CLAUDE,
        null,
        null,
        false,
        anthropicTools(["read"])
      );
      assert.deepEqual(names(out), ["read"], `echoed ${echoed}`);
    }
  });

  it("Claude Code declared `Read`: upstream `read` becomes `Read`", () => {
    const out = translateNonStreamingResponse(
      openaiResponse("read"),
      FORMATS.OPENAI,
      FORMATS.CLAUDE,
      null,
      null,
      false,
      anthropicTools(["Read"])
    );
    assert.deepEqual(names(out), ["Read"]);
  });

  it("without client tools the legacy upgrade still applies (callers that pass nothing)", () => {
    const out = translateNonStreamingResponse(
      openaiResponse("read"),
      FORMATS.OPENAI,
      FORMATS.CLAUDE
    );
    assert.deepEqual(names(out), ["Read"]);
  });
});
