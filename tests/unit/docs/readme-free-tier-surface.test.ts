// The free-tier surfaces of the README and the reference page (Radar v2, plan 02).
//
// The free-token figures follow the owner's decisions of 2026-11-21 (D47: the big figure on top,
// with its label, the real one right below; D48: one-line surfaces carry the short pair; D49: the
// growth sentence; D50: the price sentence with its check date; D51: the top of the README keeps
// its tool line) and the texts approved on 2026-11-24 (option A in every group). Every number is
// read from the facts snapshot here, never typed: the release refresh moves them.
import test from "node:test";
import assert from "node:assert/strict";
import { PROMISE_PILLARS_COPY } from "../../../scripts/docs/gen-readme-promise-pillars.mjs";
import { TIER_CASCADE_TIERS } from "../../../scripts/docs/gen-readme-tier-cascade.mjs";
import { getProviderById } from "../../../src/shared/constants/providers.ts";
import { FREE_MODEL_BUDGETS } from "../../../open-sse/config/freeModelCatalog.data.ts";

const flat = (copy: Record<string, string[]>) => Object.values(copy).flat().join("\n");

// --- Task 9: free examples ------------------------------------------------------------------

// Every provider a free example names, by the name the copy prints. A new name in the copy must
// be added here, which forces the check below to run on it.
const FREE_EXAMPLE_IDS: Record<string, string> = {
  Gemini: "gemini",
  Groq: "groq",
  Cloudflare: "cloudflare-ai",
  Kiro: "kiro",
  Qoder: "qoder",
  Pollinations: "pollinations",
};

function pillarFreeExamples(): string[] {
  const text = PROMISE_PILLARS_COPY.bodies.join(" ");
  const m = /with a free offer[^—]*—\s*([^…]+)…/.exec(text);
  assert.ok(m, `no free-example list after "with a free offer" in the pillars: ${text}`);
  return m[1]
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

test("free examples name only providers that still give free access", () => {
  const free = TIER_CASCADE_TIERS.find((t: { kicker: string }) => /FREE/.test(t.kicker));
  assert.ok(free, "the cascade has no free tier");
  const names = [...pillarFreeExamples(), ...free.models.map((m: string) => m.trim())];
  assert.ok(names.length >= 4, names.join(", "));
  for (const name of names) {
    const id = FREE_EXAMPLE_IDS[name];
    assert.ok(id, `"${name}" is not in FREE_EXAMPLE_IDS — add it and check it`);
    assert.equal(getProviderById(id)?.hasFree, true, `${name} (${id}) is not flagged free`);
    const rows = FREE_MODEL_BUDGETS.filter((r) => r.provider === id);
    assert.ok(rows.length > 0, `${name} (${id}) has no free-catalog row`);
    assert.ok(
      rows.some((r) => r.freeType !== "discontinued"),
      `${name} (${id}): every free-catalog row is discontinued`
    );
  }
  assert.doesNotMatch(flat(PROMISE_PILLARS_COPY), /Mistral/);
  assert.doesNotMatch(JSON.stringify(TIER_CASCADE_TIERS), /Mistral/);
  // D51: "Antigravity" stays in the pillars.
  assert.match(flat(PROMISE_PILLARS_COPY), /Antigravity/);
});
