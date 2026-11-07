import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { DEFAULT_COMPRESSION_CONFIG } from "../../../open-sse/services/compression/types.ts";

const originalDataDir = process.env.DATA_DIR;
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ws-safe-tool-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../../src/lib/db/core.ts");
const compressionDb = await import("../../../src/lib/db/compression.ts");
const readCache = await import("../../../src/lib/db/readCache.ts");
const { applyResponsesWsCompression } =
  await import("../../../src/app/api/internal/codex-responses-ws/compression.ts");

test.after(async () => {
  // Analytics writes are deliberately fire-and-forget in the WS helper.
  await new Promise((resolve) => setTimeout(resolve, 50));
  readCache.invalidateDbCache();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

test("Responses WS uses the scoped safe Lite plan instead of the stored clipping step", async () => {
  await compressionDb.updateCompressionSettings({
    enabled: true,
    defaultMode: "lite",
    autoTriggerTokens: 0,
    activeComboId: null,
    engines: {
      ...Object.fromEntries(
        Object.keys(DEFAULT_COMPRESSION_CONFIG.engines ?? {}).map((id) => [id, { enabled: false }])
      ),
      lite: { enabled: true },
    },
    lite: { compressToolResults: true, maxToolLength: 512 },
    stackedPipeline: [
      { engine: "lite", config: { compressToolResults: true, maxToolLength: 512 } },
    ],
  });
  const text =
    "\t  first  \n\n\n\nsecond\t \r\n  third\t  \n" +
    Array.from(
      { length: 400 },
      (_, i) => `unique-tool-line-${i}: ${i.toString(16).padStart(32, "0")}`
    ).join("\n") +
    "\nWS_TOOL_TAIL_251";
  const body = {
    input: [
      { type: "function_call_output", call_id: "call_251", output: text },
      { role: "assistant", content: "The file was read." },
      { role: "user", content: "Find the tail in the preceding tool output." },
    ],
  };
  const before = structuredClone(body);
  const result = await applyResponsesWsCompression(body, {
    provider: "openai",
    model: "gpt-4o",
    requestId: "ws-safe-tool-251",
  });
  const input = result.input as Array<{ output?: string }>;
  assert.equal(Buffer.byteLength(input[0].output!), Buffer.byteLength(text));
  assert.equal(input[0].output, text);
  assert.deepEqual(body, before);
  const stored = await compressionDb.getCompressionSettings();
  assert.equal(stored.lite?.compressToolResults, true);
  assert.equal(stored.stackedPipeline?.[0].config?.compressToolResults, true);
});
