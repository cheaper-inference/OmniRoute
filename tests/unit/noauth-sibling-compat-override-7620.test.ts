// Keep raw-key persistence isolated; paid OpenCode no longer hydrates retired Free overrides.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7620-sibling-compat-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "compat-sibling-test-secret";

const { mergeModelCompatOverride, getModelCompatOverrides } =
  await import("../../src/lib/db/models/compat.ts");
const { getNoAuthHydrationProviderIds } =
  await import("../../src/sse/services/noAuthProviderSiblings.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");

test("#7620: isHidden override written under raw 'opencode' stays on the raw key, not the 'opencode-zen' sibling", () => {
  mergeModelCompatOverride("opencode", "grok-code-fast-1", { isHidden: true });

  const rawOverrides = getModelCompatOverrides("opencode");
  const rawEntry = rawOverrides.find((m) => m.id === "grok-code-fast-1");
  assert.ok(rawEntry, "override must be stored on the raw 'opencode' key");
  assert.equal(rawEntry.isHidden, true);

  // #10898 regression guard: the write must NOT have been canonicalized onto the
  // APIKEY gateway id. If it had, the raw-keyed hidden reader would miss it.
  const siblingOverrides = getModelCompatOverrides("opencode-zen");
  const leaked = siblingOverrides.find((m) => m.id === "grok-code-fast-1");
  assert.equal(
    leaked,
    undefined,
    "override must NOT leak onto the 'opencode-zen' key (that was the #10898 regression)"
  );
});

test("getNoAuthHydrationProviderIds never hydrates the retired OpenCode Free sibling", () => {
  // Paid providers hydrate only their own overrides after Free retirement.
  assert.deepEqual(getNoAuthHydrationProviderIds("opencode-zen"), ["opencode-zen"]);
  assert.deepEqual(getNoAuthHydrationProviderIds("opencode-go"), ["opencode-go"]);
  // A provider with no siblings resolves to just itself (requested id first).
  assert.deepEqual(getNoAuthHydrationProviderIds("opencode"), ["opencode"]);

  // Raw legacy overrides remain readable without leaking to paid resolution.
  mergeModelCompatOverride("opencode", "claude-sonnet-5", {
    apiFormat: "responses",
    targetFormat: "claude",
    isHidden: true,
  });
  const merged = getNoAuthHydrationProviderIds("opencode-zen").flatMap((id) =>
    getModelCompatOverrides(id)
  );
  const resolved = merged.find((m) => m.id === "claude-sonnet-5");
  assert.equal(resolved, undefined, "retired Free overrides must not leak into Zen");
  const raw = getModelCompatOverrides("opencode").find((m) => m.id === "claude-sonnet-5");
  assert.equal(raw?.isHidden, true);
  assert.equal(raw?.apiFormat, "responses");
  assert.equal(raw?.targetFormat, "claude");
});

test("getModelInfo('opencode/<model>') still resolves to authenticated Zen and its own overrides", async () => {
  mergeModelCompatOverride("opencode-zen", "claude-opus-5", {
    apiFormat: "responses",
    targetFormat: "claude",
    supportsVision: true,
  });

  const info = await getModelInfo("opencode/claude-opus-5");

  assert.equal(info.provider, "opencode-zen");
  assert.equal(info.apiFormat, "responses");
  assert.equal(info.targetFormat, "claude");
  assert.equal(info.supportsVision, true);
});
