/**
 * Dashboard listing must reflect the runtime live-catalog gate
 * (src/sse/services/model.ts::lookupModelMeta): with an authoritative, non-empty
 * synced catalog, a built-in model missing from it is rejected at request time, so the
 * row is flagged `liveCatalogMissing` (it stays listed - registry-first merge is an
 * upstream contract, see cursor-exclusive-listing-merge.test.ts).
 * Repro: DeepSeek synced only deepseek-flash + deepseek-v4-pro, yet the registry
 * still listed deepseek-v4-flash, which then failed with "not available in the active
 * live catalog" and gave no hint why.
 */
import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { mergeProviderModelListing } from "@/lib/providers/mergeProviderModelListing";

const registry = [
  { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro (0813)" },
  { id: "deepseek-v4-flash", name: "DeepSeek V4 Flash (0731)" },
  { id: "deepseek-flash", name: "DeepSeek V4.1 Flash" },
];
const synced = [{ id: "deepseek-flash" }, { id: "deepseek-v4-pro" }];

const missingIds = (models: Array<{ id: string; liveCatalogMissing?: unknown }>) =>
  models
    .filter((m) => m.liveCatalogMissing === true)
    .map((m) => m.id)
    .sort();

describe("mergeProviderModelListing (authoritative live catalog)", () => {
  it("flags only the built-in model that the synced catalog does not contain", () => {
    const models = mergeProviderModelListing({
      providerId: "deepseek",
      registryModels: registry,
      syncedModels: synced,
      customModels: [],
    });
    assert.equal(models.length, 3, "row stays listed");
    assert.deepEqual(missingIds(models), ["deepseek-v4-flash"]);
  });

  it("negative control: with no synced catalog nothing is flagged", () => {
    const models = mergeProviderModelListing({
      providerId: "deepseek",
      registryModels: registry,
      syncedModels: [],
      customModels: [],
    });
    assert.deepEqual(missingIds(models), []);
  });

  it("does not flag a model the operator added as a custom model", () => {
    const models = mergeProviderModelListing({
      providerId: "deepseek",
      registryModels: registry,
      syncedModels: synced,
      customModels: [{ id: "deepseek-v4-flash", name: "Mine", source: "custom" }],
    });
    assert.deepEqual(missingIds(models), []);
  });

  it("still lists synced models that are not in the registry, unflagged", () => {
    const models = mergeProviderModelListing({
      providerId: "deepseek",
      registryModels: registry,
      syncedModels: [...synced, { id: "deepseek-new" }],
      customModels: [],
    });
    const extra = models.find((m) => m.id === "deepseek-new");
    assert.ok(extra);
    assert.notEqual(extra.liveCatalogMissing, true);
  });
});
