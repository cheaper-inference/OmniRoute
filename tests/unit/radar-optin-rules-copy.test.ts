import assert from "node:assert/strict";
import test from "node:test";

import en from "../../src/i18n/messages/en.json" with { type: "json" };

const RADAR_COPY = {
  activateDescription:
    "Radar downloads the signed free-tier catalog, offers and Intel about once a day, and referral links every few hours. It's free for everyone and sends nothing about you, your keys or your traffic.",
  accessScaleTitle: "What Radar gives you",
  accessScaleIntro:
    "Radar makes no network calls until you turn it on. After that, every installation gets the same data.",
  accessEveryoneRule:
    "Everyone gets the live signed catalog, offers and Intel. No key, no paid tier, no delay.",
  accessOffersRule:
    "A person checks each offer before it appears. Offers disappear when they expire.",
  privacyTitle: "What Radar exchanges",
  privacyDownloadsRule:
    "Downloads: signed catalog, referral, offer and Intel files. Your installation checks every signature before using them.",
  privacySendsRule: "Sends: a plain HTTPS request, with no key, account or identifier.",
  privacyNeverRule:
    "Never collected — prompts, responses, conversations, provider credentials, model traffic, uptime, latency, and local provider configuration are never sent to Radar.",
  activateButton: "Keep the catalog updated",
};

test("English Radar opt-in copy explains public access and the privacy boundary", () => {
  const copy: Record<string, unknown> = en.radarPage;
  for (const [key, expected] of Object.entries(RADAR_COPY)) {
    assert.equal(copy[key], expected, `radarPage.${key}`);
  }
});

test("English offers copy describes the reviewed public feed", () => {
  assert.equal(en.radarOffersPage.title, "Offers");
  assert.equal(
    en.radarOffersPage.subtitle,
    "Official discounts, credits and trials, checked by a person before they appear."
  );
});

test("the English supporter badge recognizes past support", () => {
  const badge = en.gamification.badges["radar-supporter"];
  assert.equal(badge.description, "Early supporter of OmniRoute Radar");
  assert.equal(badge.criteria, "Awarded to early Radar supporters.");
});
