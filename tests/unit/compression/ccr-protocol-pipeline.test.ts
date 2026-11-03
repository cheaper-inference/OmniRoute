/**
 * Pipeline-level tests for the CCR marker-protocol instruction.
 *
 * The instruction is a pipeline post-pass: after every compression engine has
 * run, the stacked pipeline injects a single leading system message when the
 * message history carries a `[CCR retrieve hash=...]` or `[dedup:ref sha=...]`
 * marker. The engines themselves never inject it.
 *
 * Run: node --import tsx/esm --test tests/unit/compression/ccr-protocol-pipeline.test.ts
 */
import { describe, it, before } from "node:test";
import assert from "node:assert/strict";

import {
  applyStackedCompression,
  applyStackedCompressionAsync,
} from "../../../open-sse/services/compression/index.ts";
import { resetCcrStore } from "../../../open-sse/services/compression/engines/ccr/index.ts";
import { CCR_PROTOCOL_MARKER_SENTINEL } from "../../../open-sse/services/compression/engines/ccr/protocolInstruction.ts";
import type { CompressionPipelineStep } from "../../../open-sse/services/compression/types.ts";

// Sized so that replacing the block with a retrieve marker is a NET token
// saving — the stacked pipeline's inflation guard reverts any pipeline whose
// final body did not shrink, and a marker only wins on blocks well above its
// own ~50-token cost.
const LARGE_USER_TEXT =
  `This is a large block of content that should trigger CCR compression.
It contains multiple lines and substantial text.
The CCR engine compresses large contiguous blocks of text.
Replacing them with a content-addressed retrieve marker.
This allows the model to retrieve the verbatim content on demand.
Using the retrieve MCP tool with the hash from the marker.
The block must be large enough to exceed the minimum threshold.
Default minimum is 600 characters, so this block is crafted accordingly.
We need to be thorough and ensure the block is truly large enough.
This is line ten and still counting to make the block big enough.` +
  "\n" +
  "data ".repeat(450);

const DEDUP_MARKER = "[dedup:ref sha=deadbeef]";

const RETRIEVE_TOOL = { type: "function", function: { name: "omniroute_ccr_retrieve" } };

type Msg = { role: string; content: unknown };

const ccrOnly: CompressionPipelineStep[] = [{ engine: "ccr" }];
const dedupThenCcr: CompressionPipelineStep[] = [{ engine: "session-dedup" }, { engine: "ccr" }];

function systemMessages(messages: Array<Msg>): Array<Msg> {
  return messages.filter((m) => m.role === "system");
}

// A REAL marker the engine writes (`hash=<24hex> chars=<n>`), as opposed to the
// literal shape the instruction text shows as an example
// (`[CCR retrieve hash=<24hex> chars=N]`) — the `<24hex>` / `N` placeholders are
// not hex digits / digits, so this regex never matches the note itself.
const REAL_CCR_MARKER = /\[CCR retrieve hash=[0-9a-f]{24} chars=\d+\]/;
const REAL_DEDUP_MARKER = /\[dedup:ref sha=[0-9a-f]{8}\]/;

function sentinelOccurrences(messages: Array<Msg>): number {
  return messages.filter(
    (m) => typeof m.content === "string" && m.content.includes(CCR_PROTOCOL_MARKER_SENTINEL)
  ).length;
}

describe("stacked pipeline — marker-protocol instruction post-pass", () => {
  before(() => {
    resetCcrStore();
  });

  it("CCR marker produced by the engine → one leading system message with the announced tool name", () => {
    resetCcrStore();
    const body: Record<string, unknown> = {
      model: "gpt-4",
      messages: [{ role: "user", content: LARGE_USER_TEXT }],
      tools: [RETRIEVE_TOOL],
    };
    const result = applyStackedCompression(body, ccrOnly);

    assert.equal(result.compressed, true, "large block should compress");
    const messages = result.body["messages"] as Array<Msg>;
    assert.ok(
      messages.some((m) => typeof m.content === "string" && REAL_CCR_MARKER.test(m.content)),
      "a message must carry the CCR retrieve marker"
    );
    const systems = systemMessages(messages);
    assert.equal(systems.length, 1, "exactly one system message for a CCR marker");
    assert.equal(messages[0].role, "system", "instruction is a leading system message");
    assert.match(
      systems[0].content as string,
      /omniroute_ccr_retrieve/,
      "instruction must teach the announced tool name"
    );
    assert.equal(sentinelOccurrences(messages), 1, "sentinel present exactly once");
  });

  it("CCR marker, namespaced announced tool → the real namespaced name is taught", () => {
    resetCcrStore();
    const body: Record<string, unknown> = {
      model: "gpt-4",
      messages: [{ role: "user", content: LARGE_USER_TEXT }],
      tools: [{ type: "function", function: { name: "omniroute_omniroute_ccr_retrieve" } }],
    };
    const result = applyStackedCompression(body, ccrOnly);
    const messages = result.body["messages"] as Array<Msg>;
    const systems = systemMessages(messages);
    assert.equal(systems.length, 1, "exactly one system message");
    assert.ok(
      (systems[0].content as string).includes("omniroute_omniroute_ccr_retrieve"),
      "the announced (namespaced) name must be taught, not the canonical one"
    );
  });

  it("dedup marker only, tool advertised → look-back note with the real name, no CCR block", () => {
    resetCcrStore();
    const body: Record<string, unknown> = {
      model: "gpt-4",
      messages: [{ role: "user", content: "earlier text\n" + DEDUP_MARKER }],
      tools: [RETRIEVE_TOOL],
    };
    const result = applyStackedCompression(body, dedupThenCcr);

    const messages = result.body["messages"] as Array<Msg>;
    const systems = systemMessages(messages);
    assert.equal(systems.length, 1, "dedup marker alone must be explained");
    assert.ok(
      (systems[0].content as string).includes("omniroute_ccr_retrieve"),
      "real tool name present when advertised"
    );
    assert.match(systems[0].content as string, /look back/i, "look-back clause present");
    assert.ok(
      !messages.some((m) => typeof m.content === "string" && REAL_CCR_MARKER.test(m.content)),
      "no CCR marker was produced (text below the engine threshold)"
    );
  });

  it("dedup marker only, no tool → look-back note WITHOUT any tool name", () => {
    resetCcrStore();
    const body: Record<string, unknown> = {
      model: "gpt-4",
      messages: [{ role: "user", content: "earlier text\n" + DEDUP_MARKER }],
    };
    const result = applyStackedCompression(body, dedupThenCcr);

    const messages = result.body["messages"] as Array<Msg>;
    const systems = systemMessages(messages);
    assert.equal(systems.length, 1, "dedup marker explained even without a tool");
    assert.ok(
      !(systems[0].content as string).includes("omniroute_ccr_retrieve"),
      "no tool name may be announced when none is advertised"
    );
  });

  it("dedup marker AND CCR marker in one request → exactly one system message", () => {
    resetCcrStore();
    const body: Record<string, unknown> = {
      model: "gpt-4",
      messages: [
        { role: "user", content: "shared\n" + DEDUP_MARKER },
        { role: "user", content: LARGE_USER_TEXT },
      ],
      tools: [RETRIEVE_TOOL],
    };
    const result = applyStackedCompression(body, dedupThenCcr);
    const messages = result.body["messages"] as Array<Msg>;

    assert.ok(
      messages.some((m) => typeof m.content === "string" && REAL_CCR_MARKER.test(m.content)),
      "CCR marker present"
    );
    assert.ok(
      messages.some((m) => typeof m.content === "string" && REAL_DEDUP_MARKER.test(m.content)),
      "dedup marker present"
    );
    const systems = systemMessages(messages);
    assert.equal(systems.length, 1, "one note explains both markers");
    assert.equal(sentinelOccurrences(messages), 1, "sentinel present exactly once");
  });

  it("no marker produced → no system message, body untouched by the post-pass", () => {
    resetCcrStore();
    const body: Record<string, unknown> = {
      model: "gpt-4",
      messages: [{ role: "user", content: "a short message" }],
      tools: [RETRIEVE_TOOL],
    };
    const result = applyStackedCompression(body, ccrOnly);

    assert.equal(result.compressed, false, "nothing to compress");
    const messages = result.body["messages"] as Array<Msg>;
    assert.equal(systemMessages(messages).length, 0, "no marker, no instruction");
  });

  it("second turn replays the prior instruction → no second injection (sentinel idempotency)", () => {
    resetCcrStore();
    const turnOne: Record<string, unknown> = {
      model: "gpt-4",
      messages: [{ role: "user", content: LARGE_USER_TEXT }],
      tools: [RETRIEVE_TOOL],
    };
    const first = applyStackedCompression(turnOne, ccrOnly);
    const firstMessages = first.body["messages"] as Array<Msg>;
    assert.equal(systemMessages(firstMessages).length, 1, "turn one gets the instruction");

    // The client replays the whole history (instruction included) plus a new turn.
    const turnTwo: Record<string, unknown> = {
      model: "gpt-4",
      messages: [
        ...firstMessages,
        { role: "assistant", content: "ok" },
        {
          role: "user",
          content: "and here is more large content to trigger the marker " + "x".repeat(700),
        },
      ],
      tools: [RETRIEVE_TOOL],
    };
    const second = applyStackedCompression(turnTwo, ccrOnly);
    const messages = second.body["messages"] as Array<Msg>;
    assert.equal(sentinelOccurrences(messages), 1, "the note must not stack across turns");
    assert.equal(systemMessages(messages).length, 1, "still exactly one system message");
  });

  it("async pipeline: CCR marker → one leading system message", async () => {
    resetCcrStore();
    const body: Record<string, unknown> = {
      model: "gpt-4",
      messages: [{ role: "user", content: LARGE_USER_TEXT }],
      tools: [RETRIEVE_TOOL],
    };
    const result = await applyStackedCompressionAsync(body, ccrOnly);

    const messages = result.body["messages"] as Array<Msg>;
    assert.ok(
      messages.some((m) => typeof m.content === "string" && REAL_CCR_MARKER.test(m.content)),
      "CCR marker present"
    );
    assert.equal(systemMessages(messages).length, 1, "one instruction on the async path too");
    assert.equal(messages[0].role, "system", "instruction is leading");
  });
});
