import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  applyCompression,
  applyCompressionAsync,
} from "../../../open-sse/services/compression/strategySelector.ts";
import { registerCompressionEngine } from "../../../open-sse/services/compression/index.ts";
import { createCompressionStats } from "../../../open-sse/services/compression/stats.ts";
import type { CompressionEngine } from "../../../open-sse/services/compression/engines/types.ts";
import type { CompressionConfig } from "../../../open-sse/services/compression/types.ts";

const FLAG = "GEMINI_TOOL_OUTPUT_COMPRESSION_ENABLED";

// Deterministic shrinker: drops every other character of tool-message text. It changes only
// the text it is given, so the test checks projection and write-back, not an engine's output.
function shrinkMessages(body: Record<string, unknown>): Record<string, unknown> {
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const next = messages.map((msg) => {
    const m = msg as Record<string, unknown>;
    if (m.role === "tool" && typeof m.content === "string") {
      return {
        ...m,
        content: m.content
          .split("")
          .filter((_, i) => i % 2 === 0)
          .join(""),
      };
    }
    return m;
  });
  return { ...body, messages: next };
}

const SHRINK_ENGINE: CompressionEngine = {
  id: "gemini-tool-output-shrink",
  name: "Gemini Tool Output Shrink (test)",
  description: "test fixture",
  icon: "",
  targets: ["messages"],
  stackable: true,
  stackPriority: 1,
  metadata: {
    id: "gemini-tool-output-shrink",
    name: "Gemini Tool Output Shrink (test)",
    description: "test",
    inputScope: "messages",
    targetLatencyMs: 1,
    supportsPreview: false,
    stable: false,
  },
  apply(body: Record<string, unknown>) {
    const compressedBody = shrinkMessages(body);
    const stats = createCompressionStats(body, compressedBody, "stacked", [
      "gemini-tool-output-shrink",
    ]);
    return { body: compressedBody, compressed: true, stats };
  },
  compress(body: Record<string, unknown>) {
    return this.apply(body);
  },
  getConfigSchema() {
    return [];
  },
  validateConfig() {
    return { valid: true, errors: [] };
  },
} as unknown as CompressionEngine;

function stackedConfig(): CompressionConfig {
  return {
    stackedPipeline: [{ engine: "gemini-tool-output-shrink" }],
  } as unknown as CompressionConfig;
}

function geminiBody() {
  const longRows = Array.from({ length: 12 }, (_, i) => ({ id: i, name: `row-${i}` }));
  return {
    contents: [
      { role: "user", parts: [{ text: "list the rows" }] },
      {
        role: "function",
        parts: [
          {
            functionResponse: {
              name: "list_rows",
              response: {
                result: { rows: longRows },
                output:
                  "row 0 ok, row 1 ok, row 2 ok, row 3 ok, row 4 ok, row 5 ok, row 6 ok, row 7 ok, row 8 ok, row 9 ok, row 10 ok, row 11 ok",
              },
            },
          },
          { inlineData: { mimeType: "image/png", data: "AAAA" } },
        ],
      },
    ],
  };
}

describe("Gemini/Antigravity tool-output compression (opt-in)", () => {
  it("flag on shrinks the string tool-output leaf and leaves the object and inlineData intact", () => {
    registerCompressionEngine(SHRINK_ENGINE);
    const previous = process.env[FLAG];
    process.env[FLAG] = "true";
    try {
      const body = geminiBody();
      const originalOutput = body.contents[1].parts[0].functionResponse.response.output;
      const result = applyCompression(body as Record<string, unknown>, "stacked", {
        config: stackedConfig(),
      }) as { body: Record<string, unknown> };
      const out = result.body as typeof body;
      const response = out.contents[1].parts[0].functionResponse.response;

      assert.ok(
        response.output.length < originalOutput.length,
        "the string tool-output leaf must shrink"
      );
      assert.equal(typeof response.result, "object", "functionResponse.response stays an object");
      assert.deepEqual(out.contents[1].parts[1], {
        inlineData: { mimeType: "image/png", data: "AAAA" },
      });
    } finally {
      if (previous === undefined) delete process.env[FLAG];
      else process.env[FLAG] = previous;
    }
  });

  it("flag off leaves the Gemini body byte-identical", () => {
    registerCompressionEngine(SHRINK_ENGINE);
    const previous = process.env[FLAG];
    delete process.env[FLAG];
    try {
      const body = geminiBody();
      const before = JSON.stringify(body);
      const result = applyCompression(body as Record<string, unknown>, "stacked", {
        config: stackedConfig(),
      }) as { body: Record<string, unknown> };
      assert.equal(JSON.stringify(result.body), before);
    } finally {
      if (previous !== undefined) process.env[FLAG] = previous;
    }
  });

  it("async entry point shrinks the same string leaf (flag on)", async () => {
    registerCompressionEngine(SHRINK_ENGINE);
    const previous = process.env[FLAG];
    process.env[FLAG] = "true";
    try {
      const body = geminiBody();
      const originalOutput = body.contents[1].parts[0].functionResponse.response.output;
      const result = (await applyCompressionAsync(body as Record<string, unknown>, "stacked", {
        config: stackedConfig(),
      })) as { body: Record<string, unknown> };
      const out = result.body as typeof body;
      const response = out.contents[1].parts[0].functionResponse.response;
      assert.ok(
        response.output.length < originalOutput.length,
        "the async path must shrink the string tool-output leaf too"
      );
      assert.equal(typeof response.result, "object");
    } finally {
      if (previous === undefined) delete process.env[FLAG];
      else process.env[FLAG] = previous;
    }
  });

  it("projects request.contents (the Antigravity envelope) as well as contents", () => {
    registerCompressionEngine(SHRINK_ENGINE);
    const previous = process.env[FLAG];
    process.env[FLAG] = "true";
    try {
      const inner = geminiBody();
      const body = { request: { contents: inner.contents } };
      const originalOutput = inner.contents[1].parts[0].functionResponse.response.output;
      const result = applyCompression(body as Record<string, unknown>, "stacked", {
        config: stackedConfig(),
      }) as { body: Record<string, unknown> };
      const out = result.body as { request: { contents: typeof inner.contents } };
      const output = out.request.contents[1].parts[0].functionResponse.response.output;
      assert.ok(output.length < originalOutput.length, "request.contents leaf must shrink");
    } finally {
      if (previous === undefined) delete process.env[FLAG];
      else process.env[FLAG] = previous;
    }
  });
});
