import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// The open-sse -> src boundary ratchet (quality-baseline.json) counts one edge per importing file.
// open-sse/handlers/imageResult.ts is the one image-result module that depends on the app's usage
// store and re-exports its saveCallLog. The image provider adapters and the upscale helper take
// saveCallLog from it instead of each importing @/lib/usageDb, so they add no edge of their own.

const VIA_IMAGE_RESULT: Array<[file: string, specifier: string]> = [
  ["open-sse/handlers/imageGeneration/providers/aihorde.ts", "../../imageResult.ts"],
  ["open-sse/handlers/imageGeneration/providers/cloudflareAi.ts", "../../imageResult.ts"],
  ["open-sse/handlers/imageGeneration/providers/comfyUI.ts", "../../imageResult.ts"],
  ["open-sse/handlers/imageGeneration/providers/haiper.ts", "../../imageResult.ts"],
  ["open-sse/handlers/imageGeneration/providers/huggingface.ts", "../../imageResult.ts"],
  ["open-sse/handlers/imageGeneration/providers/hyperbolic.ts", "../../imageResult.ts"],
  ["open-sse/handlers/imageGeneration/providers/ideogram.ts", "../../imageResult.ts"],
  ["open-sse/handlers/imageGeneration/providers/imagen3.ts", "../../imageResult.ts"],
  ["open-sse/handlers/imageGeneration/providers/leonardo.ts", "../../imageResult.ts"],
  ["open-sse/handlers/imageGeneration/providers/magnific.ts", "../../imageResult.ts"],
  ["open-sse/handlers/imageGeneration/providers/minimax.ts", "../../imageResult.ts"],
  ["open-sse/handlers/imageGeneration/providers/nvidiaNim.ts", "../../imageResult.ts"],
  ["open-sse/handlers/imageGeneration/providers/sdWebUI.ts", "../../imageResult.ts"],
  ["open-sse/handlers/imageGeneration/providers/zenmux.ts", "../../imageResult.ts"],
  ["open-sse/handlers/imageUpscale/shared.ts", "../imageResult.ts"],
];

test("imageResult.saveCallLog is the same function object as the usage store's", async () => {
  const funnel = await import("../../open-sse/handlers/imageResult.ts");
  const usageDb = await import("../../src/lib/usageDb.ts");
  const callLogs = await import("../../src/lib/usage/callLogs.ts");
  assert.equal(typeof funnel.saveCallLog, "function");
  assert.equal(funnel.saveCallLog, usageDb.saveCallLog);
  assert.equal(funnel.saveCallLog, callLogs.saveCallLog);
});

for (const [file, specifier] of VIA_IMAGE_RESULT) {
  test(`${file} takes saveCallLog from imageResult, not @/lib/usageDb`, () => {
    const s = readFileSync(file, "utf8");
    assert.doesNotMatch(s, /from ["'](?:@\/|(?:\.\.\/)+src\/)lib\/usageDb/);
    assert.match(
      s,
      new RegExp(`import \\{ saveCallLog \\} from "${specifier.replace(/[./]/g, "\\$&")}";`)
    );
  });
}
