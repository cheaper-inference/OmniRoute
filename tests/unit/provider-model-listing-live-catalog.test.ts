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
import { liveCatalogAdmitsModel, readLiveCatalogGate } from "@/lib/providers/liveCatalogAdmission";

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

// #20065 review: the flag decides authority from the runtime gate (custom rows included),
// the same `liveCatalogAdmitsModel` rule dispatch uses — never from the listing catalog.
describe("mergeProviderModelListing (runtime live-catalog gate)", () => {
  const listedIds = (models: Array<{ id: string }>) => models.map((m) => m.id).sort();

  it("custom-only runtime catalog: flags the built-ins the runtime gate rejects", () => {
    const customModels = [{ id: "deepseek-v4-pro", name: "Mine", source: "custom" }];
    const liveCatalog = { authoritative: true, modelIds: ["deepseek-v4-pro"] };
    const models = mergeProviderModelListing({
      providerId: "deepseek",
      registryModels: registry,
      // The listing catalog excludes custom rows, so it is empty and non-authoritative.
      syncedModels: [],
      syncedCatalogAuthoritative: false,
      customModels,
      liveCatalog,
    });
    assert.deepEqual(missingIds(models), ["deepseek-flash", "deepseek-v4-flash"]);
    for (const model of models.filter((m) => m.source === "system")) {
      const admitted = liveCatalogAdmitsModel({
        providerId: "deepseek",
        modelId: model.id,
        authoritative: liveCatalog.authoritative,
        catalogContains: (id) => liveCatalog.modelIds.includes(id),
        customMatch: customModels.some((m) => m.id === model.id),
      });
      assert.equal(model.liveCatalogMissing === true, !admitted, model.id);
    }
  });

  it("normal authoritative catalog with built-ins: same flags as before", () => {
    const models = mergeProviderModelListing({
      providerId: "deepseek",
      registryModels: registry,
      syncedModels: synced,
      customModels: [],
      liveCatalog: { authoritative: true, modelIds: synced.map((m) => m.id) },
    });
    assert.equal(models.length, 3);
    assert.deepEqual(missingIds(models), ["deepseek-v4-flash"]);
  });

  it("non-authoritative catalog: no missing flags", () => {
    for (const extra of [
      { syncedCatalogAuthoritative: false },
      { liveCatalog: { authoritative: false, modelIds: ["deepseek-flash"] } },
      { syncedCatalogAuthoritative: false, liveCatalog: { authoritative: false, modelIds: [] } },
    ]) {
      const models = mergeProviderModelListing({
        providerId: "deepseek",
        registryModels: registry,
        syncedModels: synced,
        customModels: [],
        ...extra,
      });
      assert.deepEqual(missingIds(models), [], JSON.stringify(extra));
    }
  });

  it("the runtime gate never changes which models are listed", () => {
    for (const syncedCatalogAuthoritative of [true, false, undefined]) {
      const base = {
        providerId: "deepseek",
        registryModels: registry,
        syncedModels: synced,
        customModels: [{ id: "manual", source: "custom" }],
        syncedCatalogAuthoritative,
      };
      const without = listedIds(mergeProviderModelListing(base));
      for (const liveCatalog of [
        { authoritative: true, modelIds: ["manual"] },
        { authoritative: false, modelIds: [] },
      ]) {
        assert.deepEqual(listedIds(mergeProviderModelListing({ ...base, liveCatalog })), without);
      }
    }
  });
});

describe("liveCatalogAdmitsModel (shared dispatch/dashboard rule)", () => {
  const base = {
    providerId: "deepseek",
    modelId: "deepseek-v4-flash",
    catalogContains: (id: string) => id === "deepseek-v4-pro",
    customMatch: false,
  };

  it("a non-authoritative catalog admits everything", () => {
    assert.equal(liveCatalogAdmitsModel({ ...base, authoritative: false }), true);
  });

  it("an authoritative catalog admits only custom, catalog or explicit synced matches", () => {
    assert.equal(liveCatalogAdmitsModel({ ...base, authoritative: true }), false);
    assert.equal(liveCatalogAdmitsModel({ ...base, authoritative: true, customMatch: true }), true);
    assert.equal(
      liveCatalogAdmitsModel({ ...base, authoritative: true, modelId: "deepseek-v4-pro" }),
      true
    );
    // Dispatch passes its alias-aware match explicitly; it wins over plain membership.
    assert.equal(liveCatalogAdmitsModel({ ...base, authoritative: true, syncedMatch: true }), true);
  });

  it("readLiveCatalogGate keeps only a well-formed gate", () => {
    assert.deepEqual(readLiveCatalogGate({ authoritative: true, modelIds: ["a", 1, "b"] }), {
      authoritative: true,
      modelIds: ["a", "b"],
    });
    for (const bad of [undefined, null, "x", { authoritative: "yes", modelIds: [] }, {}]) {
      assert.equal(readLiveCatalogGate(bad), undefined);
    }
  });
});
