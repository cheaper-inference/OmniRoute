/**
 * getModelTimeoutMs / getProviderModel fall back to getGlobalModel for every model that is
 * not listed under its own provider (passthrough, custom and OpenAI-compatible models).
 * That fallback walked the whole provider registry up to three times per call and had no
 * memo. Repeat lookups of one id must not walk the registry again, and a registry change
 * must still be seen.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-global-model-memo-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { PROVIDER_MODELS, getProviderModel, getModelTimeoutMs } =
  await import("../../open-sse/config/providerModels.ts");

function countRegistryWalks<T>(fn: () => T): { result: T; walks: number } {
  let walks = 0;
  const realValues = Object.values;
  (Object as { values: unknown }).values = (o: unknown) => {
    if (o === PROVIDER_MODELS) walks++;
    return realValues(o as object);
  };
  try {
    return { result: fn(), walks };
  } finally {
    (Object as { values: unknown }).values = realValues;
  }
}

test.after(() => fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true }));

const anyListed = () => {
  for (const [alias, models] of Object.entries(PROVIDER_MODELS)) {
    const model = models.find((m) => !m.id.includes("/"));
    if (model) return { alias, id: model.id };
  }
  throw new Error("registry is empty");
};

test("repeat getProviderModel misses for one id do not walk the registry again", () => {
  const { id } = anyListed();
  // Unknown provider key: always takes the getGlobalModel path.
  getProviderModel("not-a-provider", id);
  const { walks } = countRegistryWalks(() => {
    for (let i = 0; i < 50; i++) getProviderModel("not-a-provider", id);
  });
  assert.equal(walks, 0, `50 repeat lookups walked the registry ${walks} times`);
});

test("repeat lookups of an id that is not in the registry are memoized too", () => {
  const id = "zz-memo-probe/zz-memo-probe-missing";
  assert.equal(getProviderModel("not-a-provider", id), undefined);
  const { walks } = countRegistryWalks(() => {
    for (let i = 0; i < 50; i++) getModelTimeoutMs("not-a-provider", id);
  });
  assert.equal(walks, 0, `50 repeat misses walked the registry ${walks} times`);
});

test("the memo is dropped when the registry changes", () => {
  const id = "zz-memo-probe-added-later";
  assert.equal(getProviderModel("not-a-provider", id), undefined);
  PROVIDER_MODELS["zz-memo-test"] = [{ id, name: "Added", timeoutMs: 1234 } as never];
  try {
    assert.equal(getProviderModel("not-a-provider", id)?.name, "Added");
    assert.equal(getModelTimeoutMs("not-a-provider", id), 1234);
  } finally {
    delete PROVIDER_MODELS["zz-memo-test"];
  }
  assert.equal(getProviderModel("not-a-provider", id), undefined);
});

test("the vendor-prefix and base-model fallbacks keep resolving", () => {
  const { id } = anyListed();
  assert.equal(getProviderModel("not-a-provider", `vendor/${id}`)?.id, id);
  const suffixedId = `${id}-zz-suffix`;
  const suffixed = getProviderModel("not-a-provider", suffixedId);
  assert.ok(suffixed, "startsWith fallback must still find a base model");
  assert.ok(suffixedId.startsWith(suffixed.id));
});
