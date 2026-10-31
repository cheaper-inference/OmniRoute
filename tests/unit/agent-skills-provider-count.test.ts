import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { CURATED_SKILLS } from "../../src/shared/constants/agentSkills.ts";
import * as PROV from "../../src/shared/constants/providers.ts";

const ROOT = path.resolve(import.meta.dirname, "../..");

// The same union `scripts/check/check-docs-counts-sync.mjs` takes, so this test and
// the docs gate cannot disagree about what "a provider" is.
const PROVIDER_COLLECTIONS = [
  PROV.FREE_PROVIDERS,
  PROV.NOAUTH_PROVIDERS,
  PROV.OAUTH_PROVIDERS,
  PROV.WEB_COOKIE_PROVIDERS,
  PROV.APIKEY_PROVIDERS,
  PROV.LOCAL_PROVIDERS,
  PROV.SEARCH_PROVIDERS,
  PROV.AUDIO_ONLY_PROVIDERS,
  PROV.UPSTREAM_PROXY_PROVIDERS,
  PROV.CLOUD_AGENT_PROVIDERS,
  PROV.SYSTEM_PROVIDERS,
];

function liveProviderCount(): number {
  const ids = new Set<string>();
  for (const collection of PROVIDER_COLLECTIONS) {
    for (const provider of Object.values(collection ?? {}) as Array<{ id?: string }>) {
      if (provider?.id) ids.add(provider.id);
    }
  }
  return ids.size;
}

function providerClaims(text: string): string[] {
  const claims: string[] = [];
  for (const match of text.matchAll(/\b(\d+)-(?:provider|providers)\b/gi)) claims.push(match[0]);
  for (const match of text.matchAll(/\b(\d+)\s+providers\b/gi)) claims.push(match[0]);
  return claims;
}

test("every agent-skill description states the live provider count", () => {
  const live = liveProviderCount();
  assert.ok(live > 0, "the provider collections must not be empty, or this test proves nothing");

  const offenders: string[] = [];
  for (const skill of CURATED_SKILLS) {
    for (const claim of providerClaims(skill.description ?? "")) {
      if (Number(claim.match(/\d+/)?.[0]) !== live) offenders.push(`${skill.id}: "${claim}"`);
    }
  }

  assert.deepEqual(offenders, [], `description must say ${live} providers, found: ${offenders.join(", ")}`);
});

test("the generated skill files state the live provider count", () => {
  const live = liveProviderCount();
  // These are generated from CURATED_SKILLS, but the count also appears in body text
  // the generator templates out, which the description test above cannot see.
  const generated = ["skills/omni-providers/SKILL.md", "skills/omni-auth/SKILL.md"];

  const offenders: string[] = [];
  for (const rel of generated) {
    const text = readFileSync(path.join(ROOT, rel), "utf8");
    for (const claim of providerClaims(text)) {
      if (Number(claim.match(/\d+/)?.[0]) !== live) offenders.push(`${rel}: "${claim}"`);
    }
  }

  assert.deepEqual(offenders, [], `generated skills must say ${live} providers, found: ${offenders.join(", ")}`);
});
