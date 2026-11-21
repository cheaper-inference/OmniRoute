// A catalog row of type "image" is not a chat model. Codex image ids such as
// cx/gpt-6.1-sol-image start with their chat sibling's id, so the capability resolver matched the
// chat spec and GET /v1/models listed chat tools, reasoning, vision, effort tiers and token
// limits for them. Image rows now carry none of those; chat rows keep them.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-image-caps-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const { enrichCatalogModelEntry } = await import("../../src/lib/modelMetadataRegistry.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

type Row = Record<string, unknown> & { capabilities?: Record<string, unknown> };

function imageRow(id: string, ownedBy: string): Row {
  return enrichCatalogModelEntry({
    id,
    object: "model",
    owned_by: ownedBy,
    type: "image",
    input_modalities: ["text"],
    output_modalities: ["image"],
  }) as Row;
}

for (const id of [
  "cx/gpt-6.1-sol-image",
  "cx/gpt-5.6-sol-image",
  "cx/gpt-5.6-terra-image",
  "cx/gpt-image-2",
]) {
  test(`${id}: an image row lists no chat capabilities`, () => {
    const row = imageRow(id, "codex");
    const caps = row.capabilities ?? {};
    assert.equal(caps.tool_calling, false);
    assert.equal(caps.reasoning, false);
    assert.notEqual(caps.thinking, true);
    assert.notEqual(caps.supportsThinking, true);
    assert.equal("effort_tiers" in caps, false);
    assert.notEqual(caps.vision, true);
    assert.equal("max_output_tokens" in row, false);
    assert.equal("max_input_tokens" in row, false);
    assert.deepEqual(row.output_modalities, ["image"], "the row's own modalities stay");
  });
}

test("the chat sibling keeps its chat capabilities", () => {
  const row = enrichCatalogModelEntry({
    id: "cx/gpt-6.1-sol",
    object: "model",
    owned_by: "codex",
  }) as Row;
  const caps = row.capabilities ?? {};
  assert.equal(caps.tool_calling, true);
  assert.equal(caps.reasoning, true);
  assert.equal(caps.vision, true);
  assert.ok(Array.isArray(caps.effort_tiers) && caps.effort_tiers.length > 0);
  assert.equal(typeof row.max_output_tokens, "number");
});

test("a capability the image row declares itself is kept", () => {
  const row = enrichCatalogModelEntry({
    id: "cx/gpt-6.1-sol-image",
    object: "model",
    owned_by: "codex",
    type: "image",
    capabilities: { image_edit: true },
  }) as Row;
  assert.equal(row.capabilities?.image_edit, true);
  assert.equal(row.capabilities?.tool_calling, false);
});
