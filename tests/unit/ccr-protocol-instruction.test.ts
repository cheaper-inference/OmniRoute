/**
 * TDD tests for the CCR retrieve-protocol instruction injection (#8033).
 * Run: node --import tsx/esm --test tests/unit/ccr-protocol-instruction.test.ts
 *
 * The CCR engine replaces large blocks of text with a bare
 * `[CCR retrieve hash=<24hex> chars=N]` marker that the model has never been
 * taught to act on. This suite verifies the injected system-note instruction:
 * present exactly once for MCP-capable callers, absent for plain callers.
 */

import { describe, it, before } from "node:test";
import assert from "node:assert/strict";

import { ccrEngine, resetCcrStore } from "../../open-sse/services/compression/engines/ccr/index.ts";
import {
  CCR_PROTOCOL_MARKER_SENTINEL,
  callerSupportsCcrRetrieve,
  injectCcrProtocolInstruction,
  resolveCcrRetrieveToolName,
} from "../../open-sse/services/compression/engines/ccr/protocolInstruction.ts";
import {
  registerBuiltinCompressionEngines,
  getCompressionEngine,
} from "../../open-sse/services/compression/index.ts";

// ─── helpers ──────────────────────────────────────────────────────────────────

const LARGE_TEXT = `This is a large block of content that should trigger CCR compression.
It contains multiple lines and substantial text.
The CCR engine compresses large contiguous blocks of text.
Replacing them with a content-addressed retrieve marker.
This allows the model to retrieve the verbatim content on demand.
Using the retrieve MCP tool with the hash from the marker.
The block must be large enough to exceed the minimum threshold.
Default minimum is 600 characters, so this block is crafted accordingly.
We need to be thorough and ensure the block is truly large enough.
This is line ten and still counting to make the block big enough.`;

const SMALL_TEXT = "Short content that should NOT be compressed.";

const RETRIEVE_TOOL_OPENAI = { type: "function", function: { name: "omniroute_ccr_retrieve" } };
const RETRIEVE_TOOL_FLAT = { name: "omniroute_ccr_retrieve" };
const RETRIEVE_TOOL_CLAUDE = { name: "omniroute_ccr_retrieve", input_schema: {} };

type Msg = { role: string; content: string };

function makeBody(messages: Msg[], tools?: unknown[]): Record<string, unknown> {
  const body: Record<string, unknown> = { model: "gpt-4", messages };
  if (tools) body["tools"] = tools;
  return body;
}

// ─── tests ────────────────────────────────────────────────────────────────────

describe("ccr protocol instruction (#8033)", () => {
  before(() => {
    resetCcrStore();
    registerBuiltinCompressionEngines();
  });

  it("is registered and retrievable by id", () => {
    const engine = getCompressionEngine("ccr");
    assert.ok(engine, "getCompressionEngine('ccr') must return the engine");
  });

  it("MCP-capable caller + a replaced block → marker present, engine does not self-inject the instruction", () => {
    resetCcrStore();
    const body = makeBody([{ role: "user", content: LARGE_TEXT }], [RETRIEVE_TOOL_OPENAI]);
    const result = ccrEngine.apply(body);

    assert.equal(result.compressed, true, "large block should compress");
    const messages = result.body["messages"] as Array<{ role: string; content: unknown }>;

    assert.ok(
      messages.some(
        (m) =>
          typeof m.content === "string" &&
          /\[CCR retrieve hash=[0-9a-f]{24} chars=\d+\]/.test(m.content)
      ),
      "a message must carry the CCR retrieve marker"
    );
    const occurrences = messages.filter(
      (m) => typeof m.content === "string" && m.content.includes(CCR_PROTOCOL_MARKER_SENTINEL)
    );
    assert.equal(
      occurrences.length,
      0,
      "the engine must not self-inject the protocol instruction (pipeline post-pass does)"
    );
  });

  it("plain OpenAI-compatible caller (no tools) → NO instruction at all", () => {
    resetCcrStore();
    const body = makeBody([{ role: "user", content: LARGE_TEXT }]);
    const result = ccrEngine.apply(body);

    // #7746 follow-up: a caller whose tools[] does not advertise
    // omniroute_ccr_retrieve can never resolve a content-addressed marker, so
    // replacing its text would strand it behind an unresolvable hash. The engine
    // therefore now SKIPS entirely for such callers (callerSupportsCcrRetrieve →
    // false ⇒ compressed:false), which is a strictly safer outcome than the old
    // "compress the block but withhold the instruction" behavior. Either way the
    // guarantee this test pins holds: no CCR marker/instruction reaches a caller
    // that cannot use it.
    assert.equal(result.compressed, false, "no-retrieve-tool caller must not be compressed");
    const messages = result.body["messages"] as Array<{ role: string; content: unknown }>;

    assert.equal(messages.length, 1, "no system message should be injected");
    assert.ok(
      messages.every(
        (m) => typeof m.content !== "string" || !m.content.includes(CCR_PROTOCOL_MARKER_SENTINEL)
      ),
      "no message may contain the CCR protocol sentinel"
    );
  });

  it("caller with tools[] not advertising the retrieve tool → NO instruction", () => {
    resetCcrStore();
    const otherTool = { type: "function", function: { name: "some_other_tool" } };
    const body = makeBody([{ role: "user", content: LARGE_TEXT }], [otherTool]);
    const result = ccrEngine.apply(body);

    const messages = result.body["messages"] as Array<{ role: string; content: unknown }>;
    assert.equal(messages.length, 1, "no system message should be injected");
  });

  it("replacedCount === 0 → body untouched (no instruction, compressed:false)", () => {
    resetCcrStore();
    const body = makeBody([{ role: "user", content: SMALL_TEXT }], [RETRIEVE_TOOL_OPENAI]);
    const result = ccrEngine.apply(body);

    assert.equal(result.compressed, false, "small text should not compress");
    assert.equal(result.body, body, "body must be returned unchanged when nothing was replaced");
  });

  it("idempotency: a body whose history already carries the sentinel is left untouched", () => {
    resetCcrStore();
    const alreadyInstructed: Msg = {
      role: "system",
      content: `${CCR_PROTOCOL_MARKER_SENTINEL} already told once`,
    };
    const body = makeBody(
      [alreadyInstructed, { role: "user", content: LARGE_TEXT }],
      [RETRIEVE_TOOL_OPENAI]
    );
    const result = ccrEngine.apply(body);

    const messages = result.body["messages"] as Array<{ role: string; content: unknown }>;
    const occurrences = messages.filter(
      (m) => typeof m.content === "string" && m.content.includes(CCR_PROTOCOL_MARKER_SENTINEL)
    );
    assert.equal(occurrences.length, 1, "sentinel must not be injected a second time");
  });

  it("instruction text contains the tool name, the marker shape, and the verbatim-24-char warning", () => {
    const instruction = injectCcrProtocolInstruction(
      [{ role: "user", content: `[CCR retrieve hash=abcdefabcdefabcdefabcdef chars=900]` }],
      { tools: [RETRIEVE_TOOL_OPENAI] }
    );
    const text = instruction[0].content as string;
    assert.ok(text.includes("omniroute_ccr_retrieve"), "must mention the announced tool name");
    assert.ok(text.includes("[CCR retrieve hash=<24hex> chars=N]"), "must show the marker shape");
    assert.match(text, /verbatim|exact/i, "must stress verbatim/exact copying of the hash");
    assert.match(text, /24/, "must mention the 24-character length of the hash");
    assert.ok(text.includes("dedup:ref"), "must mention the dedup:ref contract");
  });

  it("injectCcrProtocolInstruction is a pure helper usable directly", () => {
    const messages: Msg[] = [{ role: "user", content: "[dedup:ref sha=12345678]" }];
    const withInstruction = injectCcrProtocolInstruction(messages, { tools: [RETRIEVE_TOOL_FLAT] });
    assert.equal(withInstruction.length, 2);
    assert.equal(withInstruction[0].role, "system");

    const withoutInstruction = injectCcrProtocolInstruction(messages, {});
    assert.equal(withoutInstruction.length, 2);
    assert.equal(
      withoutInstruction[0].role,
      "system",
      "dedup marker alone still explains look-back"
    );
    assert.ok(
      !(withoutInstruction[0].content as string).includes("omniroute_ccr_retrieve"),
      "no tool name may be announced when none is advertised"
    );

    const noMarkers = injectCcrProtocolInstruction([{ role: "user", content: "hi" }], {
      tools: [RETRIEVE_TOOL_FLAT],
    });
    assert.equal(noMarkers.length, 1, "no marker, no injection");
  });

  it("dedup marker only, no tool advertised → look-back note without any tool name", () => {
    const result = injectCcrProtocolInstruction(
      [{ role: "user", content: "earlier text\n[dedup:ref sha=deadbeef]" }],
      {}
    );
    assert.equal(result.length, 2, "instruction injected for the dedup marker");
    assert.equal(result[0].role, "system");
    const text = result[0].content as string;
    assert.ok(text.startsWith(CCR_PROTOCOL_MARKER_SENTINEL), "sentinel-led note");
    assert.ok(text.includes("dedup:ref"), "explains the dedup marker");
    assert.match(text, /look back/i, "teaches looking back in history");
    assert.ok(
      !text.includes("omniroute_ccr_retrieve"),
      "no tool name when the caller cannot reach one"
    );
  });

  it("dedup marker only, tool advertised → real name + look-back clause", () => {
    const result = injectCcrProtocolInstruction(
      [{ role: "user", content: "earlier text\n[dedup:ref sha=deadbeef]" }],
      { tools: [{ name: "omniroute_omniroute_ccr_retrieve" }] }
    );
    assert.equal(result.length, 2);
    const text = result[0].content as string;
    assert.ok(
      text.includes("omniroute_omniroute_ccr_retrieve"),
      "the actually-announced (namespaced) name must be taught, not the canonical one"
    );
    assert.ok(
      !text.includes("`omniroute_ccr_retrieve`"),
      "canonical name must not replace the real one"
    );
    assert.ok(text.includes("dedup:ref"), "look-back clause still present");
  });

  it("CCR marker only, tool advertised → full instruction with the real name", () => {
    const result = injectCcrProtocolInstruction(
      [{ role: "user", content: "[CCR retrieve hash=abcdefabcdefabcdefabcdef chars=900]" }],
      { tools: [{ name: "mcp__docker__omniroute__omniroute_ccr_retrieve" }] }
    );
    assert.equal(result.length, 2);
    const text = result[0].content as string;
    assert.ok(text.includes("mcp__docker__omniroute__omniroute_ccr_retrieve"), "announced name");
    assert.ok(text.includes("[CCR retrieve hash=<24hex> chars=N]"), "marker shape");
  });

  it("CCR marker only, no tool advertised → no injection (engine would have been skipped)", () => {
    const messages: Msg[] = [
      { role: "user", content: "[CCR retrieve hash=abcdefabcdefabcdefabcdef chars=900]" },
    ];
    const result = injectCcrProtocolInstruction(messages, {});
    assert.equal(result.length, 1, "no instruction: the caller cannot retrieve");
  });

  it("no marker at all → no injection even for a capable caller", () => {
    const messages: Msg[] = [{ role: "user", content: "plain message, no markers" }];
    const result = injectCcrProtocolInstruction(messages, { tools: [RETRIEVE_TOOL_OPENAI] });
    assert.equal(result.length, 1, "no marker, no injection");
    assert.equal(result, messages, "unchanged reference when nothing to explain");
  });

  it("sentinel already present → no second injection, even with markers", () => {
    const result = injectCcrProtocolInstruction(
      [
        { role: "system", content: `${CCR_PROTOCOL_MARKER_SENTINEL} already told once` },
        { role: "user", content: "[dedup:ref sha=deadbeef]" },
      ],
      { tools: [RETRIEVE_TOOL_OPENAI] }
    );
    const occurrences = result.filter(
      (m) => typeof m.content === "string" && m.content.includes(CCR_PROTOCOL_MARKER_SENTINEL)
    );
    assert.equal(occurrences.length, 1, "sentinel stays single across turns");
  });

  it("recognizes all three tools[] shapes: OpenAI nested, flat, Claude", () => {
    assert.equal(
      callerSupportsCcrRetrieve({ tools: [RETRIEVE_TOOL_OPENAI] }),
      true,
      "OpenAI nested shape"
    );
    assert.equal(callerSupportsCcrRetrieve({ tools: [RETRIEVE_TOOL_FLAT] }), true, "flat shape");
    assert.equal(
      callerSupportsCcrRetrieve({ tools: [RETRIEVE_TOOL_CLAUDE] }),
      true,
      "Claude shape"
    );
    assert.equal(callerSupportsCcrRetrieve({ tools: [] }), false, "empty tools array");
    assert.equal(callerSupportsCcrRetrieve({}), false, "absent tools field");
    assert.equal(
      callerSupportsCcrRetrieve({ tools: "not-an-array" }),
      false,
      "non-array tools field"
    );
  });

  it("resolveCcrRetrieveToolName returns the announced name, verbatim", () => {
    assert.equal(
      resolveCcrRetrieveToolName({ tools: [RETRIEVE_TOOL_OPENAI] }),
      "omniroute_ccr_retrieve",
      "exact canonical name, OpenAI nested shape"
    );
    assert.equal(
      resolveCcrRetrieveToolName({ tools: [{ name: "omniroute_ccr_retrieve" }] }),
      "omniroute_ccr_retrieve",
      "exact canonical name, flat shape"
    );
    assert.equal(
      resolveCcrRetrieveToolName({ tools: [RETRIEVE_TOOL_CLAUDE] }),
      "omniroute_ccr_retrieve",
      "exact canonical name, Claude shape"
    );
  });

  it("resolveCcrRetrieveToolName matches namespaced names via separator-bounded suffix", () => {
    assert.equal(
      resolveCcrRetrieveToolName({
        tools: [{ type: "function", function: { name: "omniroute__omniroute_ccr_retrieve" } }],
      }),
      "omniroute__omniroute_ccr_retrieve",
      "double-underscore prefix"
    );
    assert.equal(
      resolveCcrRetrieveToolName({
        tools: [{ type: "function", function: { name: "omniroute_omniroute_ccr_retrieve" } }],
      }),
      "omniroute_omniroute_ccr_retrieve",
      "single-underscore prefix (OpenCode style)"
    );
    assert.equal(
      resolveCcrRetrieveToolName({
        tools: [
          {
            type: "function",
            function: { name: "mcp__docker__omniroute__omniroute_ccr_retrieve" },
          },
        ],
      }),
      "mcp__docker__omniroute__omniroute_ccr_retrieve",
      "gateway namespaced prefix"
    );
    assert.equal(
      resolveCcrRetrieveToolName({
        tools: [{ type: "function", function: { name: "omniroute.omniroute_ccr_retrieve" } }],
      }),
      "omniroute.omniroute_ccr_retrieve",
      "dotted prefix"
    );
    assert.equal(
      resolveCcrRetrieveToolName({
        tools: [{ type: "function", function: { name: "omniroute/omniroute_ccr_retrieve" } }],
      }),
      "omniroute/omniroute_ccr_retrieve",
      "slashed prefix"
    );
    assert.equal(
      resolveCcrRetrieveToolName({
        tools: [{ type: "function", function: { name: "omniroute:omniroute_ccr_retrieve" } }],
      }),
      "omniroute:omniroute_ccr_retrieve",
      "colon prefix"
    );
    assert.equal(
      resolveCcrRetrieveToolName({
        tools: [{ name: "other_tool", other: "omniroute_ccr_retrieve" }],
      }),
      null,
      "unrelated tool with the canonical name in another field"
    );
  });

  it("resolveCcrRetrieveToolName rejects near-miss names (no bare endsWith)", () => {
    assert.equal(
      resolveCcrRetrieveToolName({ tools: [{ name: "omniroute_ccr_retrieve_v2" }] }),
      null,
      "versioned near-miss"
    );
    assert.equal(
      resolveCcrRetrieveToolName({ tools: [{ name: "xomniroute_ccr_retrieve" }] }),
      null,
      "glued prefix without a separator"
    );
    assert.equal(
      resolveCcrRetrieveToolName({ tools: [{ name: "x_omniroute_ccr_retrieve" }] }),
      "x_omniroute_ccr_retrieve",
      "arbitrary single-underscore prefix is separator-bounded, not glued"
    );
  });

  it("resolveCcrRetrieveToolName fails closed on malformed tools", () => {
    assert.equal(resolveCcrRetrieveToolName({ tools: [] }), null, "empty tools array");
    assert.equal(resolveCcrRetrieveToolName({}), null, "absent tools field");
    assert.equal(
      resolveCcrRetrieveToolName({ tools: "not-an-array" }),
      null,
      "non-array tools field"
    );
    assert.equal(
      resolveCcrRetrieveToolName({ tools: [null, 42, { type: "function" }, { name: 7 }] }),
      null,
      "malformed entries"
    );
  });

  it("recognizes MCP-gateway-namespaced tool names (#13781, #13897)", () => {
    assert.equal(
      callerSupportsCcrRetrieve({
        tools: [
          {
            type: "function",
            function: { name: "mcp__docker__omniroute__omniroute_ccr_retrieve" },
          },
        ],
      }),
      true,
      "Docker MCP Toolkit style double-prefix name"
    );
    assert.equal(
      callerSupportsCcrRetrieve({ tools: [{ name: "mcp__docker__omniroute_ccr_retrieve" }] }),
      true,
      "single mcp__<server>__<tool> namespace prefix"
    );
    assert.equal(
      callerSupportsCcrRetrieve({ tools: [{ name: "omniroute.omniroute_ccr_retrieve" }] }),
      true,
      "dotted namespace prefix"
    );
    assert.equal(
      callerSupportsCcrRetrieve({ tools: [{ name: "omniroute/omniroute_ccr_retrieve" }] }),
      true,
      "slashed namespace prefix"
    );
  });

  it("does NOT loosen matching into a plain substring test", () => {
    assert.equal(
      callerSupportsCcrRetrieve({ tools: [{ name: "omniroute_ccr_retrieve_v2" }] }),
      false,
      "near-miss suffix must not match"
    );
    assert.equal(
      callerSupportsCcrRetrieve({ tools: [{ name: "xomniroute_ccr_retrieve" }] }),
      false,
      "no separator boundary before the suffix must not match"
    );
  });
});
