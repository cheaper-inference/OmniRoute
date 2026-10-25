import { beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  appendPreservingCcrEngine,
  resetCcrStore,
  retrieveBlock,
} from "../../../open-sse/services/compression/engines/appendPreservingCcr/index.ts";

const OLD_CONVERSATION = "old conversation ".repeat(80);

function restoreArchiveSections(messages: Array<{ content: string }>, principalId: string): string {
  return messages
    .filter((message) => message.content.startsWith("[CCR retrieve hash="))
    .map((message) => message.content.match(/hash=([0-9a-f]{24})/)?.[1])
    .map((hash) => retrieveBlock(hash!, principalId))
    .map((block) => {
      try {
        const parsed = JSON.parse(block) as { messages?: Array<{ content?: unknown }> };
        return Array.isArray(parsed.messages)
          ? parsed.messages.map((message) => String(message.content ?? "")).join("")
          : block;
      } catch {
        return block;
      }
    })
    .join("");
}

describe("append-preserving CCR engine", () => {
  beforeEach(() => resetCcrStore());

  it("archives old system and tool blocks separately while keeping the live tail verbatim", () => {
    const body = {
      messages: [
        { role: "system", content: "Keep this system instruction unchanged." },
        { role: "user", content: OLD_CONVERSATION },
        { role: "assistant", content: "Earlier response" },
        { role: "tool", tool_call_id: "call_1", content: "tool result must remain direct" },
        { role: "user", content: "This is the current live request." },
      ],
    };

    const result = appendPreservingCcrEngine.apply(body, {
      principalId: "test-principal",
      modelContextLimit: 100,
      stepConfig: { preserveRecentPercent: 1, minRetainedMessages: 1, minArchiveChars: 1 },
    });

    assert.equal(result.compressed, true);
    const messages = result.body.messages as Array<{ role: string; content: string }>;
    assert.ok(
      messages.some((message) => message.content.includes("Preview: system: Keep this system"))
    );
    assert.ok(messages.some((message) => message.content.includes("Preview: tool: tool result")));
    assert.equal(messages.at(-1)?.content, "This is the current live request.");

    const archive = messages.find((message) => {
      const hash = message.content.match(/hash=([0-9a-f]{24})/)?.[1];
      return (
        hash && retrieveBlock(hash, "test-principal") === `${OLD_CONVERSATION}\n\nEarlier response`
      );
    });
    assert.ok(archive, "the old eligible history should become one archive marker");
    const hash = archive.content.match(/hash=([0-9a-f]{24})/)?.[1];
    assert.ok(hash);
    assert.equal(retrieveBlock(hash, "test-principal"), `${OLD_CONVERSATION}\n\nEarlier response`);
    assert.ok(
      messages.some((message) => message.content.includes("[CCR context rollover]")),
      "rollover adds the CCR handling instruction to the prompt"
    );
    const instruction = messages.find((message) =>
      message.content.includes("[CCR context rollover]")
    )?.content;
    assert.ok(instruction);
    assert.match(instruction, /preview and hash are only an index/i);
    assert.match(instruction, /make an actual omniroute_ccr_retrieve tool call/i);
    assert.match(instruction, /proposing a tool call is not retrieval/i);
    assert.match(instruction, /do not answer.*from a preview, hash, or marker/i);
    assert.match(instruction, /After the tool returns, inspect its result/i);
    assert.match(instruction, /only metadata\/a preview/i);
    assert.match(instruction, /exact names, numbers, or phrases/i);
    assert.match(instruction, /rather than guessing/i);
  });

  it("preserves existing archive markers in chronological order", () => {
    const existingArchive = "[CCR retrieve hash=111111111111111111111111 chars=900]";
    const body = {
      messages: [
        { role: "system", content: "System" },
        { role: "assistant", content: existingArchive },
        { role: "user", content: OLD_CONVERSATION },
        { role: "assistant", content: "Recent answer" },
        { role: "user", content: "Current request" },
      ],
      tools: [{ type: "function", function: { name: "omniroute_ccr_retrieve" } }],
    };

    const result = appendPreservingCcrEngine.apply(body, {
      principalId: "test-principal",
      modelContextLimit: 100,
      stepConfig: { preserveRecentPercent: 1, minRetainedMessages: 1 },
    });

    const messages = result.body.messages as Array<{ content: string }>;
    const existingArchiveIndex = messages.findIndex(
      (message) => message.content === existingArchive
    );
    const newArchiveIndex = messages.findIndex(
      (message) =>
        message.content.startsWith("[CCR retrieve hash=") && message.content !== existingArchive
    );
    assert.ok(existingArchiveIndex >= 0);
    assert.ok(newArchiveIndex > existingArchiveIndex);
    assert.equal(messages.at(-1)?.content, "Current request");
  });

  it("archives each complete old user-assistant exchange as its own ordered tag", () => {
    const firstUser = "first user exchange ".repeat(80);
    const firstAssistant = "first assistant exchange ".repeat(80);
    const secondUser = "second user exchange ".repeat(80);
    const secondAssistant = "second assistant exchange ".repeat(80);
    const result = appendPreservingCcrEngine.apply(
      {
        messages: [
          { role: "user", content: firstUser },
          { role: "assistant", content: firstAssistant },
          { role: "user", content: secondUser },
          { role: "assistant", content: secondAssistant },
          { role: "user", content: "Current request stays direct" },
        ],
      },
      {
        principalId: "pair-principal",
        modelContextLimit: 100,
        stepConfig: { preserveRecentPercent: 1, minRetainedMessages: 1 },
      }
    );

    assert.equal(result.compressed, true);
    const messages = result.body.messages as Array<{ content: string }>;
    const markers = messages.filter((message) => message.content.startsWith("[CCR retrieve hash="));
    assert.equal(markers.length, 2);
    const hashes = markers.map((marker) => marker.content.match(/hash=([0-9a-f]{24})/)?.[1]);
    assert.equal(retrieveBlock(hashes[0]!, "pair-principal"), `${firstUser}\n\n${firstAssistant}`);
    assert.equal(
      retrieveBlock(hashes[1]!, "pair-principal"),
      `${secondUser}\n\n${secondAssistant}`
    );
    assert.equal(messages.at(-1)?.content, "Current request stays direct");
  });

  it("splits at system and tool interactions while preserving every block in chronological order", () => {
    const systemText = "System policy block ".repeat(50);
    const userText = "Earlier user exchange ".repeat(40);
    const assistantText = "Earlier assistant response ".repeat(40);
    const toolOutput = "Tool output with recoverable state ".repeat(40);
    const body = {
      messages: [
        { role: "system", content: systemText },
        { role: "user", content: userText },
        { role: "assistant", content: assistantText },
        {
          role: "assistant",
          content: "",
          tool_calls: [
            {
              id: "call_weather",
              type: "function",
              function: { name: "get_weather", arguments: "{}" },
            },
          ],
        },
        { role: "tool", tool_call_id: "call_weather", content: toolOutput },
        { role: "user", content: "Current question stays direct" },
      ],
    };
    const result = appendPreservingCcrEngine.apply(body, {
      principalId: "special-block-principal",
      modelContextLimit: 100,
      stepConfig: { preserveRecentPercent: 1, minRetainedMessages: 1, minArchiveChars: 1 },
    });

    assert.equal(result.compressed, true);
    const messages = result.body.messages as Array<{ role: string; content: string }>;
    const markers = messages.filter((message) => message.content.startsWith("[CCR retrieve hash="));
    assert.equal(markers.length, 3, "system, exchange, and tool interaction each get one tag");
    assert.match(markers[0].content, /Preview: system: System policy block/);
    assert.match(markers[1].content, /Preview: Earlier user exchange/);
    assert.match(markers[2].content, /Preview: assistant\(get_weather\): \| tool: Tool output/);

    const toolMarker = markers[2];
    const toolHash = toolMarker.content.match(/hash=([0-9a-f]{24})/)?.[1];
    assert.ok(toolHash);
    const archivedToolBlock = JSON.parse(retrieveBlock(toolHash, "special-block-principal")) as {
      messages: Array<{
        role: string;
        tool_call_id?: string;
        tool_calls?: unknown[];
        content: string;
      }>;
    };
    assert.deepEqual(
      archivedToolBlock.messages.map((message) => message.role),
      ["assistant", "tool"]
    );
    assert.equal(archivedToolBlock.messages[1].tool_call_id, "call_weather");
    assert.equal(messages.at(-1)?.content, "Current question stays direct");
  });

  it("keeps legacy function_call and function-result messages in one retrievable block", () => {
    const functionResult = "Legacy function output ".repeat(40);
    const result = appendPreservingCcrEngine.apply(
      {
        messages: [
          {
            role: "assistant",
            content: null,
            function_call: { name: "lookup_record", arguments: "{}" },
          },
          { role: "function", name: "lookup_record", content: functionResult },
          { role: "user", content: "Current turn" },
        ],
      },
      {
        principalId: "legacy-tool-principal",
        modelContextLimit: 100,
        stepConfig: { minArchiveChars: 1, minRetainedMessages: 1, preserveRecentPercent: 1 },
      }
    );

    assert.equal(result.compressed, true);
    const messages = result.body.messages as Array<{ content: string }>;
    const marker = messages.find((message) => message.content.startsWith("[CCR retrieve hash="));
    assert.ok(marker);
    assert.match(
      marker.content,
      /Preview: assistant\(lookup_record\): \| function: Legacy function output/
    );
    const hash = marker.content.match(/hash=([0-9a-f]{24})/)?.[1];
    assert.ok(hash);
    const stored = JSON.parse(retrieveBlock(hash, "legacy-tool-principal")) as {
      messages: Array<{ role: string; function_call?: { name: string }; name?: string }>;
    };
    assert.deepEqual(
      stored.messages.map((message) => message.role),
      ["assistant", "function"]
    );
    assert.equal(stored.messages[0].function_call?.name, "lookup_record");
    assert.equal(stored.messages[1].name, "lookup_record");
  });

  it("splits one oversized exchange into ordered, previewed retrieval sections", () => {
    const oversizedUser = "alpha context ".repeat(900);
    const oversizedAssistant = "beta response ".repeat(900);
    const result = appendPreservingCcrEngine.apply(
      {
        messages: [
          { role: "user", content: oversizedUser },
          { role: "assistant", content: oversizedAssistant },
          { role: "system", content: "Current direct state" },
          { role: "user", content: "Current request stays direct" },
        ],
      },
      {
        principalId: "section-principal",
        modelContextLimit: 100,
        stepConfig: {
          preserveRecentPercent: 1,
          minRetainedMessages: 1,
          maxArchiveSectionChars: 4_000,
        },
      }
    );

    const messages = result.body.messages as Array<{ content: string }>;
    const markers = messages.filter((message) => message.content.startsWith("[CCR retrieve hash="));
    assert.ok(markers.length > 2, "oversized exchange must become several independent sections");
    assert.ok(markers.every((marker, index) => marker.content.includes(`Section ${index + 1}/`)));
    const restored = markers
      .map((marker) => marker.content.match(/hash=([0-9a-f]{24})/)?.[1])
      .map((hash) => retrieveBlock(hash!, "section-principal"))
      .join("");
    assert.equal(restored, `${oversizedUser}\n\n${oversizedAssistant}`);
    assert.equal(messages.at(-1)?.content, "Current request stays direct");
  });

  it("waits for the configured context threshold before creating an archive", () => {
    const body = {
      messages: [
        { role: "user", content: OLD_CONVERSATION },
        { role: "assistant", content: "Earlier response" },
        { role: "user", content: "Current request" },
      ],
    };

    const underThreshold = appendPreservingCcrEngine.apply(body, { modelContextLimit: 10_000 });
    assert.equal(underThreshold.compressed, false);

    const atThreshold = appendPreservingCcrEngine.apply(body, {
      modelContextLimit: 100,
      stepConfig: { preserveRecentPercent: 1, minRetainedMessages: 1 },
    });
    assert.equal(atThreshold.compressed, true);
    const messages = atThreshold.body.messages as Array<{ content: string }>;
    assert.equal(messages.at(-1)?.content, "Current request");
    assert.ok(messages.some((message) => message.content.startsWith("[CCR retrieve hash=")));
  });

  it("runs rollover without requiring a per-request advertised CCR tool", () => {
    const body = {
      messages: [
        { role: "user", content: OLD_CONVERSATION },
        { role: "assistant", content: "Earlier response" },
        { role: "user", content: "Current request" },
      ],
    };

    const result = appendPreservingCcrEngine.apply(body, {
      modelContextLimit: 100,
      stepConfig: { preserveRecentPercent: 1, minRetainedMessages: 1 },
    });
    assert.equal(result.compressed, true);
    const messages = result.body.messages as Array<{ content: string }>;
    assert.ok(messages.some((message) => message.content.startsWith("[CCR retrieve hash=")));
    assert.ok(messages.some((message) => message.content.includes("[CCR context rollover]")));
  });

  it("honors the archive-size and direct-tail configuration", () => {
    const body = {
      messages: [
        { role: "user", content: OLD_CONVERSATION },
        { role: "assistant", content: "Older answer" },
        { role: "user", content: "Recent question" },
        { role: "assistant", content: "Recent answer" },
        { role: "user", content: "Current request" },
      ],
    };

    const tooSmall = appendPreservingCcrEngine.apply(body, {
      modelContextLimit: 100,
      stepConfig: { minArchiveChars: 10_000 },
    });
    assert.equal(tooSmall.compressed, false);

    const result = appendPreservingCcrEngine.apply(body, {
      modelContextLimit: 100,
      stepConfig: { minArchiveChars: 1, preserveRecentPercent: 1, minRetainedMessages: 3 },
    });
    assert.equal(result.compressed, true);
    const messages = result.body.messages as Array<{ content: string }>;
    assert.equal(messages.at(-3)?.content, "Recent question");
    assert.equal(messages.at(-2)?.content, "Recent answer");
    assert.equal(messages.at(-1)?.content, "Current request");
  });

  it("archives a 64k conversation only after it crosses 90%, preserving retrieval order", () => {
    // The token estimator is deliberately approximate, so use character payloads
    // comfortably either side of the 57,600-token threshold: about 45k tokens,
    // followed by roughly 14k more. This mirrors a real request history replay.
    const initialDump = "a".repeat(180_000);
    const continuationDump = "b".repeat(56_000);
    const toolState = "Tool state is archivable and remains in order. ".repeat(40);
    const baseBody = {
      messages: [
        { role: "system", content: "Stable system prefix" },
        { role: "user", content: initialDump },
        { role: "assistant", content: "Acknowledged the initial dump." },
        { role: "tool", tool_call_id: "keep_direct", content: toolState },
      ],
    };

    const beforeThreshold = appendPreservingCcrEngine.apply(baseBody, {
      principalId: "64k-principal",
      modelContextLimit: 64_000,
    });
    assert.equal(beforeThreshold.compressed, false, "45k history must remain byte-stable");

    const afterThreshold = appendPreservingCcrEngine.apply(
      {
        ...baseBody,
        messages: [...baseBody.messages, { role: "user", content: continuationDump }],
      },
      {
        principalId: "64k-principal",
        modelContextLimit: 64_000,
        stepConfig: { minArchiveChars: 1, minRetainedMessages: 1 },
      }
    );
    assert.equal(afterThreshold.compressed, true, "the added ~14k must trigger archival");

    const messages = afterThreshold.body.messages as Array<{ role: string; content: string }>;
    const archiveIndex = messages.findIndex((message) =>
      message.content.startsWith("[CCR retrieve hash=")
    );
    assert.ok(archiveIndex >= 0, "the replacement must be a syntactically valid CCR tag");
    const restored = restoreArchiveSections(messages, "64k-principal");
    assert.ok(restored.startsWith("Stable system prefix"));
    assert.ok(restored.includes(`${initialDump}\n\nAcknowledged the initial dump.`));
    assert.ok(
      restored.endsWith(toolState),
      "the later tool block must follow the earlier exchange"
    );

    const toolIndex = messages.findIndex((message) =>
      message.content.includes("Preview: tool: Tool state is archivable")
    );
    const continuationIndex = messages.findIndex((message) => message.content === continuationDump);
    assert.ok(toolIndex > archiveIndex, "special tool block retains its chronological position");
    assert.ok(continuationIndex > toolIndex, "fresh conversation remains at the live tail");
    assert.ok(messages[toolIndex].content.startsWith("[CCR retrieve hash="));
    assert.equal(messages[continuationIndex].content, continuationDump);
  });

  it("archives a 131k MiniCPM-sized context only after it crosses its 90% threshold", () => {
    // MiniCPM5's configured window is 131,072 tokens. Keep the initial history
    // below its 117,965-token archive point, then append enough new text to cross it.
    const initialDump = "a".repeat(400_000);
    const continuationDump = "b".repeat(80_000);
    const toolState = "Tool state remains retrievable in its own ordered block. ".repeat(40);
    const baseBody = {
      messages: [
        { role: "system", content: "Stable system prefix" },
        { role: "user", content: initialDump },
        { role: "assistant", content: "Acknowledged the initial dump." },
        { role: "tool", tool_call_id: "keep_direct", content: toolState },
      ],
    };

    const beforeThreshold = appendPreservingCcrEngine.apply(baseBody, {
      principalId: "minicpm-131k-principal",
      modelContextLimit: 131_072,
    });
    assert.equal(beforeThreshold.compressed, false);

    const afterThreshold = appendPreservingCcrEngine.apply(
      {
        ...baseBody,
        messages: [...baseBody.messages, { role: "user", content: continuationDump }],
      },
      {
        principalId: "minicpm-131k-principal",
        modelContextLimit: 131_072,
        stepConfig: { minArchiveChars: 1, minRetainedMessages: 1 },
      }
    );
    assert.equal(afterThreshold.compressed, true);

    const messages = afterThreshold.body.messages as Array<{ role: string; content: string }>;
    const archive = messages.find((message) => message.content.startsWith("[CCR retrieve hash="));
    assert.ok(archive);
    const restored = restoreArchiveSections(messages, "minicpm-131k-principal");
    assert.ok(restored.startsWith("Stable system prefix"));
    assert.ok(restored.includes(`${initialDump}\n\nAcknowledged the initial dump.`));
    assert.ok(restored.endsWith(toolState));
    assert.ok(
      messages.some((message) => message.content.includes("Preview: tool: Tool state remains"))
    );
    assert.equal(messages.at(-1)?.content, continuationDump);
  });
});
