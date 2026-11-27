import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { getProviderById } from "../../src/shared/constants/providers.ts";

// Free-offer flags re-checked on the providers' own pages on 2026-11-23.
// Rule: hasFree is true when the provider offers some API access today without
// paying for usage (recurring quota, uncapped access or a signup credit, with or
// without a card). It is false when the free plan ended, the free access is for
// paying members only, the product is gone, or the id is a duplicate.

const ENDED = [
  "mistral",
  "nara",
  "navy",
  "huggingface",
  "bluesminds",
  "arcee-ai",
  "huggingchat",
  "ollama-cloud",
  "stepfun",
  "ainative",
  "poolside",
  "amazon-q",
];
// Registry fixes: dead host, duplicate id, no published quota, bonus with no usable model.
const NOT_FREE_TODAY = ["chat-oripe", "naga-ai", "llm7", "dxnt"];

test("ended free offers are no longer flagged as free", () => {
  for (const id of [...ENDED, ...NOT_FREE_TODAY]) {
    assert.equal(getProviderById(id)?.hasFree, false, id);
  }
});

test("every provider that lost the flag says why, with the check date", () => {
  for (const id of [...ENDED, ...NOT_FREE_TODAY]) {
    const note = getProviderById(id)?.freeNote ?? "";
    assert.ok(note.length > 0, `${id} needs a freeNote with the reason`);
    assert.match(note, /20\d\d-\d\d-\d\d/, `${id} freeNote needs a date`);
    assert.doesNotMatch(note, /—/, `${id} freeNote uses plain punctuation`);
  }
  assert.match(getProviderById("amazon-q")?.freeNote ?? "", /2026-05-15/);
  assert.doesNotMatch(getProviderById("llm7")?.freeNote ?? "", /unverifiable/i);
  assert.doesNotMatch(getProviderById("dxnt")?.freeNote ?? "", /100 calls\/day/i);
});

test("duplicate and dead registry entries are deprecated", () => {
  assert.equal(getProviderById("naga-ac")?.hasFree, true);
  const naga = getProviderById("naga-ai");
  assert.equal(naga?.deprecated, true);
  assert.match(naga?.deprecationReason ?? "", /naga-ac/);
  const clarifai = getProviderById("clarifai");
  assert.equal(clarifai?.deprecated, true);
  assert.match(clarifai?.deprecationReason ?? "", /no longer resolves/i);
});

test("credit offers that need a card stay free and say so", () => {
  for (const id of ["cerebras", "vertex", "nebius", "aion"]) {
    assert.equal(getProviderById(id)?.hasFree, true, id);
    assert.match(getProviderById(id)?.freeNote ?? "", /card|payment method/i, id);
  }
  const aion = getProviderById("aion");
  assert.doesNotMatch(aion?.authHint ?? "", /no card/i);
});

test("gated free offers name their gate", () => {
  assert.match(getProviderById("fastrouter")?.freeNote ?? "", /paid balance above \$1/);
  assert.doesNotMatch(getProviderById("predibase")?.freeNote ?? "", /\$25 free trial/i);
});

test("AgentRouter stays free with the amounts its own status page publishes", () => {
  const agentrouter = getProviderById("agentrouter");
  assert.equal(agentrouter?.hasFree, true);
  assert.doesNotMatch(agentrouter?.freeNote ?? "", /\$200|\$100/);
  assert.match(agentrouter?.freeNote ?? "", /\$25/);
  assert.match(agentrouter?.freeNote ?? "", /2026-11-23/);
});

// What the provider onboarding wizard shows: the en.json key wins, then
// apiHint || authHint || freeNote (providerOnboardingCatalog.ts).
const EN = JSON.parse(
  readFileSync(new URL("../../src/i18n/messages/en.json", import.meta.url), "utf8")
);
const DESC: Record<string, string> = EN.providers.onboardingProviderDescriptions;
const shown = (id: string) => {
  const p = getProviderById(id);
  return DESC[id] || p?.apiHint || p?.authHint || p?.freeNote || "";
};
const OLD_PROMISE: Record<string, RegExp> = {
  mistral: /Free Experiment tier/i,
  bluesminds: /free daily credits/i,
  huggingface: /Free Inference API/i,
  agentrouter: /\$200|\$100/,
  predibase: /\$25 free trial/i,
  nara: /Free-tier models are pinned|free NaraRouter account/i,
  ainative: /free API key/i,
  navy: /free API key/i,
  llm7: /free token|without API key/i,
  aion: /no card/i,
};

test("the onboarding wizard stops promising ended offers", () => {
  for (const [id, old] of Object.entries(OLD_PROMISE)) {
    const p = getProviderById(id);
    for (const text of [shown(id), p?.apiHint ?? "", p?.authHint ?? ""]) {
      assert.doesNotMatch(text, old, id);
    }
  }
  assert.match(DESC.nebius, /card|payment method/i);
  assert.match(DESC.cerebras, /payment method/i);
});
