import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);

test("news.json ships Radar inactive in the localized v2 feed without commercial details", async () => {
  const source = await readFile(new URL("news.json", root), "utf8");
  const payload = JSON.parse(source);
  const radar = payload.items.find((item: { id?: string }) => item.id === "radar-launch-2026-08");

  assert.equal(payload.schemaVersion, 2);
  assert.equal(radar.active, false);
  assert.equal(radar.link, "https://radar.omniroute.online/");
  assert.match(radar.text.en.message, /opt-in/i);
  assert.match(radar.text.en.message, /GET-only/i);
  assert.match(radar.text.en.message, /no telemetry/i);
  assert.doesNotMatch(source, /R\$|US\$|coupon|cupom|discount|desconto/i);
});

test("news.json ships the free-Radar item inactive, linking the Radar home", async () => {
  const source = await readFile(new URL("news.json", root), "utf8");
  const payload = JSON.parse(source);
  const item = payload.items.find((entry: { id?: string }) => entry.id === "radar-free-2026-11");

  assert.ok(item, "the radar-free-2026-11 item must exist");
  assert.equal(item.active, false);
  assert.equal(item.icon, "radar");
  assert.equal(item.link, "https://radar.omniroute.online/");
  assert.ok(item.text["pt-BR"], "the item ships a pt-BR copy");

  const en = item.text.en;
  assert.match(en.message, /free/i);
  assert.match(en.message, /opt-in/i);
  assert.match(en.message, /GET-only/i);
  assert.match(en.message, /no telemetry/i);
  // The feed is read from `main` by every client since 3.8.50: the copy must hold for versions
  // that do not have the in-app switch.
  assert.doesNotMatch(JSON.stringify(item.text), /one click|Free Tiers page|turn it on from/i);

  const copy = JSON.stringify(item.text);
  // No number at all: a token count here would go stale without a recount.
  assert.doesNotMatch(copy, /\d/);
  assert.doesNotMatch(copy, /R\$|US\$|coupon|cupom|discount|desconto|10[.,]1/i);

  // No third-party name: every capitalized word that does not open a sentence is our own.
  const ownNames = new Set(["OmniRoute", "Radar", "GET"]);
  for (const locale of Object.values(item.text) as Array<Record<string, string>>) {
    for (const field of Object.values(locale)) {
      for (const sentence of field.split(/[.!?]\s+/)) {
        const words = sentence.match(/[\p{L}]+/gu) ?? [];
        for (const word of words.slice(1)) {
          if (/^\p{Lu}/u.test(word)) {
            assert.ok(ownNames.has(word), `unexpected proper noun "${word}" in "${field}"`);
          }
        }
      }
    }
  }
});

test("the generic banner is ID-dismissable and independent from the Radar feature flag", async () => {
  const source = await readFile(
    new URL("src/app/(dashboard)/dashboard/NewsBanner.tsx", root),
    "utf8"
  );

  assert.match(source, /selectVisibleNews/);
  assert.match(source, /parseDismissedNewsIds/);
  assert.match(source, /localStorage/);
  assert.match(source, /announcement\.id/);
  assert.doesNotMatch(source, /RADAR_ENABLED/);
  assert.doesNotMatch(source, /method:\s*["']POST["']/);
});

test("public/announcements/v3.json mirrors the v2 ids and activation state, Radar still inactive", async () => {
  const releaseNotes = await import("../../src/shared/utils/releaseNotes.ts");
  const v2 = JSON.parse(await readFile(new URL("news.json", root), "utf8"));
  const source = await readFile(new URL("public/announcements/v3.json", root), "utf8");
  const v3 = JSON.parse(source);

  assert.equal(v3.schemaVersion, 3);
  assert.deepEqual(
    v3.items.map((item: { id: string; active: boolean }) => [item.id, item.active]),
    v2.items.map((item: { id: string; active: boolean }) => [item.id, item.active])
  );
  for (const item of v3.items) {
    assert.equal(item.severity, "info");
    assert.equal(item.expiresAt, undefined);
  }
  for (const id of ["radar-free-2026-11", "radar-launch-2026-08"]) {
    assert.equal(v3.items.find((item: { id: string }) => item.id === id)?.active, false);
  }
  assert.doesNotMatch(source, /R\$|US\$|coupon|cupom|discount|desconto/i);

  // Closed schema: the file parses as a v3 feed (an invalid one would read as no announcements
  // and the distribution fixture would pass vacuously), and nothing in it is active.
  assert.equal(releaseNotes.parseSeverityNewsPayload(v3)?.length, v2.items.length);
  const now = new Date("2026-12-01T00:00:00.000Z");
  assert.deepEqual(releaseNotes.listVisibleNews(v3, "en", { severityEnabled: true, now }), []);
});

test("the announcement severity flag is registered off and the readers share one clock hook", async () => {
  const flags = await import("../../src/shared/constants/featureFlagDefinitionsExtras.ts");
  const flag = flags.EXTRA_FEATURE_FLAG_DEFINITIONS.find(
    (entry: { key: string }) => entry.key === "ANNOUNCEMENT_SEVERITY_ENABLED"
  );
  assert.equal(flag?.defaultValue, "false");
  assert.equal(flag?.type, "boolean");

  for (const file of [
    "src/app/(dashboard)/dashboard/NewsBanner.tsx",
    "src/app/(dashboard)/dashboard/changelog/components/NewsViewer.tsx",
  ]) {
    const source = await readFile(new URL(file, root), "utf8");
    assert.match(source, /useNewsFeed/);
    assert.doesNotMatch(source, /dangerouslySetInnerHTML/);
    assert.doesNotMatch(source, /method:\s*["']POST["']/);
  }
});
