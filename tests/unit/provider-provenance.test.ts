import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  FREE_MODEL_BUDGETS,
  grantsFreeAccess,
} from "@omniroute/open-sse/config/freeModelCatalog.ts";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";

import {
  assertProviderFactCoverage,
  parseProviderFactEvidence,
  parseProviderProvenance,
  providerDefinitions,
  type ProviderFactEvidence,
  type ProviderFactRef,
} from "../../scripts/quality/providerProvenance.ts";
import { PROVIDER_EXPECTATIONS } from "./free-provider-coverage.expectations.ts";

const readJson = (path: string): unknown =>
  JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
const provenance = parseProviderProvenance(
  readJson("../../config/quality/provider-provenance.json")
);
const catalogEvidence = JSON.parse(
  readFileSync(new URL("../../config/quality/free-catalog-evidence.json", import.meta.url), "utf8")
).evidence as Array<{ provider: string; checkedAt: string }>;

const currentIds = new Set([
  ...providerDefinitions().map((provider) => provider.id),
  ...Object.keys(REGISTRY),
]);
const baseline = new Set(provenance.baselineIds);
const added = new Map(provenance.added.map((record) => [record.providerId, record]));
const pending = new Set(provenance.contributorPending);

test("every provider outside the baseline has a public provenance record or a pending contribution", () => {
  for (const id of currentIds) {
    assert.ok(baseline.has(id) || added.has(id) || pending.has(id), id);
  }
});

test("provenance records belong to registered providers and precede their catalog evidence", () => {
  for (const [id, record] of added) {
    assert.ok(currentIds.has(id), `${id} is not in the registry`);
    assert.ok(!baseline.has(id), `${id} was already in the baseline`);
    for (const row of catalogEvidence.filter((entry) => entry.provider === id)) {
      assert.ok(row.checkedAt >= record.addedOn, id);
    }
  }
});

test("baseline and pending ids are unique, and contributors are pending or added", () => {
  assert.ok(baseline.size > 0);
  assert.deepEqual(provenance.baselineIds, [...baseline].sort());
  assert.equal(pending.size, provenance.contributorPending.length);
  assert.equal(added.size, provenance.added.length);
  for (const id of pending) assert.ok(!added.has(id), id);
});

const documentedFact: ProviderFactEvidence = {
  fact: { scope: "model", modelId: "fixture/model", field: "contextWindow" },
  source: "official-doc",
  sourceUrl: "https://docs.example.com/models",
  checkedAt: "2026-02-28",
};
const observedFact: ProviderFactEvidence = {
  ...documentedFact,
  source: "live-test",
  sourceUrl: "https://api.example.com/v1/models",
  checkedAt: "2026-03-01",
  evidenceRef: "fixtures/provider-model-list.json",
};

test("fact evidence keeps observations of the same fact with their own dates", () => {
  assert.deepEqual(parseProviderFactEvidence([documentedFact, observedFact]), [
    documentedFact,
    observedFact,
  ]);
});

test("fact evidence rejects nonexistent dates and live tests without a safe evidence reference", () => {
  assert.throws(() => parseProviderFactEvidence([{ ...documentedFact, checkedAt: "2026-02-31" }]));
  assert.throws(() => parseProviderFactEvidence([{ ...observedFact, evidenceRef: undefined }]));
  assert.throws(() =>
    parseProviderFactEvidence([{ ...observedFact, evidenceRef: "../response.json" }])
  );
  assert.throws(() =>
    parseProviderFactEvidence([{ ...observedFact, evidenceRef: "log?token=secret" }])
  );
});

test("fact sources must be public HTTPS URLs without credentials or tracking parameters", () => {
  for (const sourceUrl of [
    "http://docs.example.com",
    "https://user:secret@docs.example.com",
    "https://docs.example.com/?api_key=secret",
    "https://docs.example.com/?utm_medium=affiliate",
  ]) {
    assert.throws(() => parseProviderFactEvidence([{ ...documentedFact, sourceUrl }]));
  }
});

test("legacy gaps are explicit and do not substitute for observed evidence", () => {
  const legacy = parseProviderProvenance({
    schemaVersion: 1,
    baselineRef: "fixture",
    baselineIds: ["legacy"],
    added: [],
    contributorPending: [],
    factsByProvider: {
      legacy: {
        evidence: [],
        historicalGaps: [{ fact: documentedFact.fact, reason: "No archived evidence." }],
      },
    },
  });
  assert.equal(legacy.factsByProvider.legacy.historicalGaps.length, 1);
  assert.throws(
    () => assertProviderFactCoverage(legacy, "legacy", [documentedFact.fact]),
    /contextWindow/
  );
  assert.deepEqual(
    parseProviderProvenance({
      schemaVersion: 1,
      baselineRef: "fixture",
      baselineIds: [],
      contributorPending: [],
      added: [
        {
          providerId: "new",
          addedOn: "2026-02-28",
          discoveredVia: "provider-page",
          sourceUrl: documentedFact.sourceUrl,
          checkedAt: "2026-02-28",
          checkedExcerpt: "A provider's public documentation.",
        },
      ],
    }).factsByProvider,
    {}
  );
});

test("E1a has evidence by fact for each new or changed free eligibility and Twigpine's route", () => {
  for (const [id, expectation] of Object.entries(PROVIDER_EXPECTATIONS)) {
    if (expectation.lastWave !== "E1a") continue;
    const modelIds = expectation.live.map((row) => row.modelId);
    const changedEligibility =
      id === "requesty"
        ? [...modelIds, "mistral/leanstral-1-5", "nvidia/nemotron-3-nano-30b-a3b"]
        : modelIds;
    assertProviderFactCoverage(
      provenance,
      id,
      changedEligibility.map((modelId) => ({
        scope: "model",
        field: "freeEligibility",
        modelId,
      }))
    );
    assertProviderFactCoverage(
      provenance,
      id,
      modelIds.map((modelId) => ({
        scope: "model",
        field: "id",
        modelId,
      }))
    );
  }
  assertProviderFactCoverage(provenance, "gitlawb", [
    { scope: "provider", field: "baseUrl" },
    { scope: "provider", field: "modelsUrl" },
    { scope: "provider", field: "authType" },
    ...registryModelFacts(REGISTRY.gitlawb),
  ]);
});

function registryModelFacts(entry: (typeof REGISTRY)[string]): ProviderFactRef[] {
  return entry.models.flatMap((model): ProviderFactRef[] => {
    const fact = { scope: "model", modelId: model.id } as const;
    return [
      { ...fact, field: "id" },
      ...(model.contextLength === undefined ? [] : [{ ...fact, field: "contextWindow" } as const]),
      ...(model.maxOutputTokens === undefined ? [] : [{ ...fact, field: "maxOutput" } as const]),
      ...(["toolCalling", "supportsVision", "supportsReasoning"].some((key) =>
        Object.hasOwn(model, key)
      )
        ? [{ ...fact, field: "capabilities" } as const]
        : []),
    ];
  });
}

test("new providers document free eligibility and their declared runtime facts", () => {
  for (const record of provenance.added) {
    const id = record.providerId;
    const free: ProviderFactRef[] = FREE_MODEL_BUDGETS.filter(
      (row) => row.provider === id && grantsFreeAccess(row.freeType)
    ).flatMap((row) => [
      { scope: "model", modelId: row.modelId, field: "id" },
      { scope: "model", modelId: row.modelId, field: "freeEligibility" },
    ]);
    assertProviderFactCoverage(provenance, id, [
      ...free,
      ...(record.tos ? [{ scope: "provider", field: "terms" } as const] : []),
    ]);

    const entry = REGISTRY[id];
    if (entry) {
      assertProviderFactCoverage(provenance, id, [
        ...(entry.baseUrl ? [{ scope: "provider", field: "baseUrl" } as const] : []),
        ...(entry.modelsUrl ? [{ scope: "provider", field: "modelsUrl" } as const] : []),
        { scope: "provider", field: "authType" },
        ...registryModelFacts(entry),
      ]);
    }
    for (const fact of provenance.factsByProvider[id]?.evidence ?? []) {
      assert.ok(fact.checkedAt >= record.addedOn, `${id}: fact evidence precedes the addition`);
    }
  }
});
