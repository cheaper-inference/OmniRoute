import assert from "node:assert/strict";
import test from "node:test";
import {
  mergeProviderModelListing,
  filterUnavailableModelRows,
} from "../../src/lib/providers/mergeProviderModelListing.ts";

test("OpenRouter and compatible/passthrough aliases cannot resurrect unavailable models", () => {
  const rows = ["live", "retired-fallback", "retired-alias", "manual", "old-import"].map(
    (modelId) => ({ modelId })
  );
  const live = [{ id: "live" }];
  const custom = [
    { id: "manual", source: "custom" },
    { id: "old-import", source: "imported" },
  ];
  assert.deepEqual(
    filterUnavailableModelRows(rows, live, custom, true).map((row) => row.modelId),
    ["live", "manual"]
  );
  assert.deepEqual(filterUnavailableModelRows(rows, live, custom, false), rows);
});

const input = {
  providerId: "nvidia",
  registryModels: [
    { id: "retired", name: "Retired model" },
    { id: "live", name: "Live model", supportsVision: true },
  ],
  syncedModels: [{ id: "live", contextWindow: 128000 }],
  customModels: [
    { id: "retired-import", source: "imported" },
    { id: "manual", name: "My endpoint", source: "custom" },
    { id: "live", name: "My live model", supportsVision: false },
  ],
};

test("authoritative catalog removes retired built-ins and legacy imports, retaining manual overlays", () => {
  const models = mergeProviderModelListing({ ...input, syncedCatalogAuthoritative: true });
  assert.deepEqual(
    models.map((m) => m.id),
    ["live", "manual"]
  );
  assert.equal(models[0].contextWindow, 128000);
  assert.equal(models[0].supportsVision, false);
  assert.equal(models[0].name, "My live model");
  assert.equal(
    models.some((m) => m.id.startsWith("auto")),
    false
  );
});

test("partial or unconfirmed catalogs retain static coverage", () => {
  for (const flag of [false, undefined]) {
    const ids = mergeProviderModelListing({ ...input, syncedCatalogAuthoritative: flag }).map(
      (m) => m.id
    );
    assert.ok(ids.includes("retired"));
    assert.ok(ids.includes("retired-import"));
    assert.ok(ids.includes("manual"));
  }
});

test("a new successful catalog removes only models absent from the active union", () => {
  const ids = mergeProviderModelListing({
    ...input,
    syncedCatalogAuthoritative: true,
    syncedModels: [{ id: "other-connection" }],
    customModels: [{ id: "manual", source: "custom" }],
  }).map((m) => m.id);
  assert.deepEqual(ids, ["other-connection", "manual"]);
});

test("confirmed empty catalog preserves custom models without inventing Cursor auto rows", () => {
  const ids = mergeProviderModelListing({
    ...input,
    providerId: "cursor",
    syncedCatalogAuthoritative: true,
    syncedModels: [],
    customModels: [{ id: "manual", source: "custom" }],
  }).map((m) => m.id);
  assert.deepEqual(ids, ["manual"]);
});

test("explicit non-authoritative state overrides Cursor's legacy implicit exclusivity", () => {
  const ids = mergeProviderModelListing({
    ...input,
    providerId: "cursor",
    syncedCatalogAuthoritative: false,
  }).map((m) => m.id);
  assert.ok(ids.includes("retired"));
});

test("authoritative membership and manual metadata precedence are provider-independent", () => {
  for (const providerId of ["nvidia", "openai", "openrouter", "anthropic", "vertex"]) {
    const snapshot = JSON.stringify(input);
    const models = mergeProviderModelListing({
      ...input,
      providerId,
      syncedCatalogAuthoritative: true,
    });
    assert.deepEqual(
      models.map((m) => m.id),
      ["live", "manual"],
      providerId
    );
    assert.equal(models[0].owned_by, providerId);
    assert.equal(models[0].contextWindow, 128000);
    assert.equal(models[0].supportsVision, false);
    assert.equal(JSON.stringify(input), snapshot, "must not mutate inputs");
  }
});

test("CodeBuddy CN's synced roster hides static models removed upstream", () => {
  const models = mergeProviderModelListing({
    providerId: "codebuddy-cn",
    registryModels: [
      { id: "minimax-m3", name: "MiniMax-M3" },
      { id: "minimax-m3-pay", name: "MiniMax-M3" },
    ],
    syncedModels: [{ id: "minimax-m3-pay", name: "MiniMax-M3" }],
    customModels: [{ id: "minimax-m3", source: "imported" }],
  });

  assert.deepEqual(
    models.map((model) => model.id),
    ["minimax-m3-pay"]
  );
});

test("curated-only catalogs cannot be emptied or extended by a live-catalog flag", () => {
  for (const providerId of ["kimi-web", "zai-web", "chatgpt-web"]) {
    const models = mergeProviderModelListing({
      ...input,
      providerId,
      syncedCatalogAuthoritative: true,
      customModels: [],
    });
    assert.deepEqual(
      models.map((m) => m.id),
      ["retired", "live"]
    );
    assert.ok(models.every((m) => m.source === "system"));
  }
});

test("curated-only providers still accept operator-defined custom models", () => {
  // "Curated" describes the upstream discovery surface (there is none), not a ban on
  // hand-added ids: without this a curated provider can never route a model the
  // registry does not ship, and the row saved in the dashboard is silently dropped.
  for (const providerId of ["kimi-web", "zai-web", "chatgpt-web", "codebuddy-intl"]) {
    const models = mergeProviderModelListing({
      ...input,
      providerId,
      syncedCatalogAuthoritative: true,
      syncedModels: [],
      customModels: [{ id: "manual", name: "My model", source: "custom" }],
    });
    assert.deepEqual(
      models.map((m) => m.id),
      ["retired", "live", "manual"],
      providerId
    );
    const manual = models.find((m) => m.id === "manual");
    assert.equal(manual?.source, "custom");
    assert.equal(manual?.name, "My model");
  }
});

test("curated-only providers drop custom rows a discovery sync imported", () => {
  // #18018 keeps operator rows; a curated provider has no upstream catalog, so a row
  // with an import source is a stale leftover of a retired discovery path (#8451).
  for (const providerId of ["kimi-web", "zai-web", "chatgpt-web", "codebuddy-intl"]) {
    const models = mergeProviderModelListing({
      ...input,
      providerId,
      customModels: [
        { id: "retired-import", source: "imported" },
        { id: "api-synced", source: "api-sync" },
        { id: "auto-synced", source: "auto-sync" },
        { id: "manual", name: "My model", source: "manual" },
      ],
    });
    assert.deepEqual(
      models.map((m) => m.id),
      ["retired", "live", "manual"],
      providerId
    );
  }
});

test("Cursor legacy listing retains its synthetic auto entry without affecting other providers", () => {
  const models = mergeProviderModelListing({
    ...input,
    providerId: "cursor",
    customModels: [],
    syncedModels: [{ id: "live" }],
  });
  assert.ok(models.some((m) => m.id === "auto"));
  assert.ok(models.some((m) => m.id === "live"));
  assert.ok(!models.some((m) => m.id === "retired"));
});
