import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  FREE_MODEL_BUDGETS,
  RETIRED_FREE_ROWS,
  grantsFreeAccess,
} from "@omniroute/open-sse/config/freeModelCatalog.ts";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";
import { isValidModel } from "@/shared/constants/models.ts";

import {
  assertCatalogWave,
  assertContributionsMatch,
  assertRiskNoticeWave,
} from "./_helpers/freeProviderWave.ts";
import { PROVIDER_EXPECTATIONS } from "./free-provider-coverage.expectations.ts";

const WAVE = [
  "glm-cn",
  "doubao",
  "longcat",
  "hyperbolic",
  "nscale",
  "deepseek",
  "deepinfra",
  "scaleway",
  "qoder",
  "novita",
  "vertex",
  "ai21",
  "fireworks",
  "nebius",
];
const VERTEX_EXPRESS = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.5-pro",
  "gemini-3-flash-preview",
  "gemini-3.1-pro-preview",
].sort();
const VERTEX_DISCONTINUED = [
  "claude-opus-4-7",
  "claude-sonnet-4-6",
  "deepseek-ai/deepseek-v3.1-maas",
  "deepseek-ai/deepseek-v3.2-maas",
  "gemini-3.1-flash-lite",
  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-3.6-flash",
  "gemini-3.7-flash",
  "qwen/qwen3-next-80b-a3b-instruct-maas",
  "zai-org/glm-5-maas",
].sort();

const policy = JSON.parse(
  readFileSync(new URL("../../config/quality/free-catalog-evidence.json", import.meta.url), "utf8")
) as {
  debt: string[];
  evidence: Array<{
    provider: string;
    modelId: string;
    claim: string;
    checkedAt: string;
    excerpt: string;
  }>;
};

test("E2 rows match the per-provider expectations", () => assertCatalogWave(WAVE));

test("E2 signup offers contribute zero to the public real and first-month totals", () => {
  assertContributionsMatch(WAVE);
});

test("Vertex keeps only the five zero-credit Express chat models for new Google Cloud users", () => {
  const rows = FREE_MODEL_BUDGETS.filter((row) => row.provider === "vertex");
  const express = rows.filter((row) => row.freeType === "one-time-initial");
  assert.deepEqual(express.map((row) => row.modelId).sort(), VERTEX_EXPRESS);
  assert.deepEqual(
    rows
      .filter((row) => row.freeType === "discontinued")
      .map((row) => row.modelId)
      .sort(),
    VERTEX_DISCONTINUED
  );
  // Express signup does not need billing information. The separate Cloud trial no longer covers it.
  for (const row of express) {
    assert.equal(row.creditTokens, 0, row.modelId);
    assert.deepEqual(row.gates, ["new-accounts-only"], row.modelId);
  }
});

test("E2 gives every live row dated evidence for its actual offer and clears its legacy debt", () => {
  for (const provider of WAVE) {
    assert.ok(!policy.debt.some((key) => key.startsWith(`${provider}/`)), provider);
    for (const row of PROVIDER_EXPECTATIONS[provider].live) {
      const matches = policy.evidence.filter(
        (entry) => entry.provider === provider && entry.modelId === row.modelId
      );
      const key = `${provider}/${row.modelId}`;
      assert.equal(matches.length, 1, key);
      const [entry] = matches;
      assert.equal(
        entry.claim,
        (row.creditTokens ?? 0) > 0 ? "signup-credit" : "recurring-free-access",
        key
      );
      assert.ok(entry.checkedAt >= "2026-11-27", key);
      assert.ok(entry.excerpt && entry.excerpt.length <= 300, key);
    }
  }
});

test("E2 does not move signup credits into the retired recurring-quota ledger", () => {
  assert.deepEqual(
    RETIRED_FREE_ROWS.filter((row) => WAVE.includes(row.provider)),
    []
  );
});

test("E2 live identities are routable models of their registered provider", () => {
  for (const provider of WAVE) {
    for (const row of PROVIDER_EXPECTATIONS[provider].live) {
      const config = REGISTRY[provider];
      assert.ok(config, provider);
      assert.ok(
        config.passthroughModels || config.models.some((model) => model.id === row.modelId),
        `${provider}/${row.modelId}`
      );
      assert.ok(isValidModel(config.alias ?? provider, row.modelId), `${provider}/${row.modelId}`);
    }
  }
});

test("unverified signup balances and tool-only promotions do not make paid API models free", () => {
  for (const provider of ["deepseek", "hyperbolic", "nebius", "novita"]) {
    assert.deepEqual(
      FREE_MODEL_BUDGETS.filter(
        (row) => row.provider === provider && grantsFreeAccess(row.freeType)
      ),
      [],
      provider
    );
  }
});

test("Qoder keeps its tool-account risk notice", () => {
  assertRiskNoticeWave([{ id: "qoder", tos: "caution", riskNotice: "oauth" }]);
});
