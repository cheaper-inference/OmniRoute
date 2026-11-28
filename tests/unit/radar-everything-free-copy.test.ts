import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import en from "../../src/i18n/messages/en.json" with { type: "json" };

const REMOVED_KEYS = {
  radarPage: [
    "accessCommunityRule",
    "accessSingleUseRule",
    "accessContributorRule",
    "accessSupporterRule",
    "accessUseTitle",
    "accessInstallationRule",
    "accessAbuseRule",
    "keySectionTitle",
    "keyInvalidFormatError",
    "activateWithKeyButton",
    "changeKeyButton",
    "claimSectionTitle",
    "contributorButton",
    "contributorHint",
    "supporterButton",
    "supporterHint",
    "campaignsUpsellCommunity",
    "feedTier",
    "tierLive",
    "tierCommunity",
  ],
  radarOffersPage: [
    "keyRequiredTitle",
    "keyRequiredDescription",
    "contributorButton",
    "supporterButton",
  ],
  radarIntelPage: ["supporterBadge"],
};

function leaves(value: object): string[] {
  return Object.values(value).flatMap((entry) =>
    typeof entry === "object" && entry !== null ? leaves(entry) : [String(entry)]
  );
}

test("Radar and free-tier English copy no longer advertises key-based access", () => {
  const forbidden =
    /30-day|supporter key|supporter offers|one-time purchase|lifetime|star \+ follow|star to unlock|Community \(/i;
  for (const namespace of [
    "radarPage",
    "radarOffersPage",
    "radarIntelPage",
    "radarSetupPage",
    "radarCombosPage",
    "freeBudget",
  ] as const) {
    for (const text of leaves(en[namespace])) {
      assert.doesNotMatch(text, forbidden, `${namespace}: ${text}`);
    }
  }
  for (const text of leaves(en.gamification.badges["radar-supporter"])) {
    assert.doesNotMatch(text, /verify|live .*feed/i, text);
  }
});

test("English messages retire the keys for the removed access tiers", () => {
  for (const [namespace, keys] of Object.entries(REMOVED_KEYS)) {
    const messages: Record<string, unknown> = en[namespace as keyof typeof REMOVED_KEYS];
    for (const key of keys) {
      assert.equal(messages[key], undefined, `${namespace}.${key}`);
    }
  }
});

test("the Radar page removes the key form, claim and plan buttons, and tier upsell", () => {
  const page = readFileSync("src/app/(dashboard)/dashboard/radar/page.tsx", "utf8");
  for (const removed of [
    "supporterKey",
    "contributorClaimUrl",
    "supporterPlansUrl",
    "tierCommunity",
    "campaignsUpsellCommunity",
    "contributorButton",
    "supporterButton",
  ]) {
    assert.ok(!page.includes(removed), removed);
  }
});
