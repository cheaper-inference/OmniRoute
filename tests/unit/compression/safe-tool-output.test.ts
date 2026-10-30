import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import {
  applyCompression,
  applyCompressionAsync,
  selectCompressionPlan,
} from "../../../open-sse/services/compression/strategySelector.ts";
import { SAFE_DEFAULT_PIPELINE } from "../../../open-sse/services/compression/lossyRequestPolicy.ts";
import type {
  CompressionConfig,
  CompressionMode,
} from "../../../open-sse/services/compression/types.ts";

const baseConfig: CompressionConfig = {
  enabled: true,
  defaultMode: "lite",
  autoTriggerTokens: 0,
  cacheMinutes: 5,
  preserveSystemPrompt: true,
  comboOverrides: {},
  engines: { lite: { enabled: true } },
  enginesExplicit: false,
};
const configs: Record<string, CompressionConfig> = {
  "RTK downgrade": { ...baseConfig, defaultMode: "rtk" },
  "single lite": { ...baseConfig },
  "retained stacked lite": {
    ...baseConfig,
    defaultMode: "stacked",
    lite: { compressToolResults: true, maxToolLength: 768 },
    stackedPipeline: [
      { engine: "rtk" },
      { engine: "lite", config: { compressToolResults: true, maxToolLength: 512 } },
    ],
  },
};

const TOOL_WHITESPACE = "\t  first  \n\n\n\nsecond\t \r\n  third\t  \n";
const NORMALIZED_WHITESPACE = "\t  first\n\nsecond\r\n  third\n";

function toolText(bytes: number): string {
  const tail = `\nTOOL_TAIL_${bytes}`;
  const rows = Array.from({ length: Math.ceil(bytes / 65) }, (_, i) =>
    createHash("sha256").update(`tool-output-${i}`).digest("hex")
  ).join("\n");
  return TOOL_WHITESPACE + rows.slice(0, bytes - TOOL_WHITESPACE.length - tail.length) + tail;
}

function bodyWithTool(text: string, layout: string): Record<string, unknown> {
  if (layout.startsWith("Responses")) {
    return {
      input: [
        { type: "function_call_output", call_id: "call_251", output: text },
        ...(layout === "Responses historical"
          ? [{ role: "assistant", content: "The file was read." }]
          : []),
      ],
    };
  }
  return {
    messages: [
      { role: "user", content: "Read the synthetic file." },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          { id: "call_251", type: "function", function: { name: "read", arguments: "{}" } },
        ],
      },
      { role: "tool", tool_call_id: "call_251", content: text },
      ...(layout === "historical tool"
        ? [
            { role: "assistant", content: "The file was read." },
            { role: "user", content: "Find the tail in that output." },
          ]
        : []),
    ],
  };
}

function outputText(body: Record<string, unknown>): string {
  if (Array.isArray(body.input)) return body.input[0].output;
  const messages = body.messages as Array<{ role: string; content: string }>;
  return messages.find((message) => message.role === "tool")!.content;
}

async function compress(
  config: CompressionConfig,
  body: Record<string, unknown>,
  header: string | null = null,
  asyncMode = false
) {
  const plan = selectCompressionPlan(config, null, 0, undefined, undefined, {}, header);
  const options = { config: { ...config, stackedPipeline: plan.stackedPipeline } };
  const apply = asyncMode ? applyCompressionAsync : applyCompression;
  return apply(body, plan.mode as CompressionMode, options);
}

for (const [name, config] of Object.entries(configs)) {
  for (const bytes of [10_800, 16_000, 100_000]) {
    for (const layout of [
      "current tool",
      "historical tool",
      "Responses output-only",
      "Responses historical",
    ]) {
      for (const asyncMode of [false, true]) {
        test(`${name} preserves all ${bytes} tool bytes: ${layout} (${asyncMode ? "async" : "sync"})`, async () => {
          const text = toolText(bytes);
          assert.equal(Buffer.byteLength(text), bytes);
          const body = bodyWithTool(text, layout);
          const before = structuredClone(body);
          const result = await compress(config, body, null, asyncMode);
          const output = outputText(result.body);
          assert.equal(Buffer.byteLength(output), bytes, "tool byte length must be preserved");
          assert.equal(output, text, "the complete tool text, including its tail, must survive");
          assert.deepEqual(body, before, "compression must not mutate the request");
        });
      }
    }
  }
}

test("safe and opted-in requests do not change stored steps or shared defaults", async () => {
  const config = configs["retained stacked lite"];
  const before = structuredClone(config);
  const defaultsBefore = structuredClone(SAFE_DEFAULT_PIPELINE);
  Object.freeze(config.lite);
  for (const step of config.stackedPipeline!) {
    if (step.config) Object.freeze(step.config);
    Object.freeze(step);
  }
  Object.freeze(config.stackedPipeline);
  for (const step of SAFE_DEFAULT_PIPELINE) {
    if ("config" in step) Object.freeze(step.config);
    Object.freeze(step);
  }
  Object.freeze(SAFE_DEFAULT_PIPELINE);
  const text = toolText(16_000);
  for (const header of [null, "allow-lossy", "safe", "engine:lite", "default", null]) {
    const result = await compress(config, bodyWithTool(text, "historical tool"), header);
    const output = outputText(result.body);
    if (header === "allow-lossy" || header === "engine:lite") {
      assert.ok(output.length < text.length, `${header} still opts into clipping`);
      assert.match(output, /\.\.\.\[truncated\]/);
    } else {
      assert.equal(output.length, text.length);
      assert.equal(output, text);
    }
    assert.deepEqual(config, before);
    assert.deepEqual(SAFE_DEFAULT_PIPELINE, defaultsBefore);
  }
});

test("explicit lossy requests retain global and step clipping precedence", async () => {
  const text = toolText(16_000);
  for (const compressToolResults of [true, false]) {
    const config = { ...baseConfig, lite: { compressToolResults, maxToolLength: 512 } };
    for (const header of ["allow-lossy", "engine:lite"]) {
      for (const asyncMode of [false, true]) {
        for (const layout of ["historical tool", "Responses historical"]) {
          const body = bodyWithTool(text, layout);
          const before = structuredClone(body);
          const result = await compress(config, body, header, asyncMode);
          const output = outputText(result.body);
          if (compressToolResults) {
            assert.ok(output.length <= 512);
            assert.match(output, /\.\.\.\[truncated\]/);
          } else {
            assert.equal(output, text.replace(TOOL_WHITESPACE, NORMALIZED_WHITESPACE));
          }
          assert.deepEqual(body, before);
        }
      }
    }
  }
  const config: CompressionConfig = {
    ...baseConfig,
    defaultMode: "stacked",
    lite: { compressToolResults: false },
    stackedPipeline: [
      { engine: "lite", config: { compressToolResults: true, maxToolLength: 512 } },
    ],
  };
  const result = await compress(config, bodyWithTool(text, "historical tool"), "allow-lossy");
  assert.ok(outputText(result.body).length <= 512);
  assert.match(outputText(result.body), /\.\.\.\[truncated\]/);
});

test("opted-in Lite with step clipping disabled still normalizes tool whitespace", async () => {
  const config: CompressionConfig = {
    ...baseConfig,
    defaultMode: "stacked",
    lite: { compressToolResults: true, maxToolLength: 512 },
    stackedPipeline: [{ engine: "lite", config: { compressToolResults: false } }],
  };
  const stored = structuredClone(config);
  const text = toolText(16_000);
  for (const asyncMode of [false, true]) {
    for (const layout of ["historical tool", "Responses historical"]) {
      const body = bodyWithTool(text, layout);
      const before = structuredClone(body);
      const result = await compress(config, body, "allow-lossy", asyncMode);
      assert.equal(outputText(result.body), text.replace(TOOL_WHITESPACE, NORMALIZED_WHITESPACE));
      assert.deepEqual(body, before);
    }
  }
  assert.deepEqual(config, stored);
});

test("a raw opted-in Lite step honors its explicit tool-whitespace option", async () => {
  // An internal step option, not a public/global setting or an implication of clipping=false.
  const config: CompressionConfig = {
    ...baseConfig,
    defaultMode: "stacked",
    stackedPipeline: [
      { engine: "lite", config: { compressToolResults: false, preserveToolWhitespace: true } },
    ],
  };
  const stored = structuredClone(config);
  const text = toolText(16_000);
  for (const asyncMode of [false, true]) {
    const body = bodyWithTool(text, "Responses historical");
    const before = structuredClone(body);
    const result = await compress(config, body, "allow-lossy", asyncMode);
    assert.equal(outputText(result.body), text);
    assert.deepEqual(body, before);
  }
  assert.deepEqual(config, stored);
});

test("safe Lite still normalizes non-tool whitespace", async () => {
  const body = {
    messages: [
      { role: "user", content: TOOL_WHITESPACE + "USER_251" },
      { role: "assistant", content: TOOL_WHITESPACE + "ASSISTANT_251" },
    ],
  };
  const before = structuredClone(body);
  const expected = {
    messages: [
      { role: "user", content: NORMALIZED_WHITESPACE + "USER_251" },
      { role: "assistant", content: NORMALIZED_WHITESPACE + "ASSISTANT_251" },
    ],
  };
  for (const config of Object.values(configs)) {
    for (const asyncMode of [false, true]) {
      const result = await compress(config, body, null, asyncMode);
      assert.deepEqual(result.body, expected);
      assert.deepEqual(body, before);
    }
  }
});

test("safe Lite leaves unique non-tool text intact", async () => {
  const body = {
    messages: [{ role: "user", content: toolText(16_000).slice(TOOL_WHITESPACE.length) }],
  };
  for (const config of Object.values(configs)) {
    const result = await compress(config, body);
    assert.deepEqual(result.body, body);
  }
});

test("header off bypasses tool compression", async () => {
  const body = bodyWithTool(toolText(16_000), "Responses output-only");
  const result = await compress(configs["RTK downgrade"], body, "off");
  assert.deepEqual(result.body, body);
  assert.equal(result.compressed, false);
});
