import test from "node:test";
import assert from "node:assert/strict";
import { createTranslator } from "use-intl";
import en from "../../src/i18n/messages/en.json" with { type: "json" };
import { countCatalogVisibility } from "../../src/app/(dashboard)/dashboard/models/catalogVisibility.ts";
import { boundedMap } from "../../src/lib/quota/boundedMap.ts";
import { LimiterWedgeWatchdog } from "../../open-sse/services/rateLimitManager/wedgeWatchdog.ts";

// Two type regressions red on release/v3.8.53 (#17219), both fixed without behavior change:
// the Models catalog passes its visibility counts straight to t(), and the rate-limit watchdog
// receives the production LRU boundedMap whose set() returns void.

test("catalog visibility counts render through the real modelCatalog.visibilityCounts message", () => {
  const counts = countCatalogVisibility([
    { hidden: false },
    { hidden: true },
    { hidden: false },
    { hidden: false },
  ] as Parameters<typeof countCatalogVisibility>[0]);
  assert.deepEqual(counts, { visible: 3, hidden: 1, total: 4 });
  const t = createTranslator({ locale: "en", messages: en, namespace: "modelCatalog" });
  assert.equal(t("visibilityCounts", counts), "3 visible · 1 hidden · 4 total");
});

test("the wedge watchdog accepts the production boundedMap for preserved limiter settings", () => {
  const preserved = boundedMap<Record<string, unknown>>(
    "test-preserved-limiter-settings",
    4,
    "lru"
  );
  const watchdog = new LimiterWedgeWatchdog({
    limiters: new Map(),
    limiterLastUsed: new Map(),
    limiterEffectiveSettings: new WeakMap(),
    preservedReplacementSettings: preserved,
    trackBackground: () => {},
    log: () => {},
    warn: () => {},
  });
  assert.ok(watchdog);
  assert.equal(preserved.set("k", { id: "k" }), undefined);
  assert.deepEqual(preserved.get("k"), { id: "k" });
});
