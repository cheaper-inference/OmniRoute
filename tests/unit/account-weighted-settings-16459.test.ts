import assert from "node:assert/strict";
import test from "node:test";
import {
  ACCOUNT_FALLBACK_STRATEGY_VALUES,
  ROUTING_STRATEGY_VALUES,
  SETTINGS_FALLBACK_STRATEGY_VALUES,
} from "../../src/shared/constants/routingStrategies.ts";
import { updateSettingsSchema } from "../../src/shared/validation/settingsSchemas.ts";

test("#16459 legacy global weighted input normalizes to fill-first", () => {
  const parsed = updateSettingsSchema.parse({ fallbackStrategy: "weighted", theme: "dark" });
  assert.equal(parsed.fallbackStrategy, "fill-first");
  assert.equal(parsed.theme, "dark");
});

test("#16459 re-sent legacy provider weighted input normalizes without losing other settings", () => {
  const parsed = updateSettingsSchema.parse({
    theme: "dark",
    providerStrategies: {
      claude: { fallbackStrategy: "weighted", stickyRoundRobinLimit: 5 },
      glm: { fallbackStrategy: "round-robin" },
    },
  });
  assert.deepEqual(parsed.providerStrategies, {
    claude: { fallbackStrategy: "fill-first", stickyRoundRobinLimit: 5 },
    glm: { fallbackStrategy: "round-robin" },
  });
  assert.equal(parsed.theme, "dark");
});

test("#16459 unknown account strategies are still rejected at both settings scopes", () => {
  for (const fallbackStrategy of ["bogus", "WEIGHTED", " weighted ", "quota-weighted", null, 1]) {
    assert.equal(updateSettingsSchema.safeParse({ fallbackStrategy }).success, false);
    assert.equal(
      updateSettingsSchema.safeParse({ providerStrategies: { claude: { fallbackStrategy } } })
        .success,
      false
    );
  }
});

test("#16459 omitted account strategies remain omitted on unrelated settings saves", () => {
  assert.deepEqual(
    updateSettingsSchema.parse({ theme: "dark", providerStrategies: { claude: {} } }),
    {
      theme: "dark",
      providerStrategies: { claude: {} },
    }
  );
});

test("#16459 weighted is a combo strategy, not an offered account strategy", () => {
  assert.equal(
    ACCOUNT_FALLBACK_STRATEGY_VALUES.some((value) => String(value) === "weighted"),
    false
  );
  assert.equal(
    SETTINGS_FALLBACK_STRATEGY_VALUES.some((value) => String(value) === "weighted"),
    false
  );
  assert.ok(ROUTING_STRATEGY_VALUES.includes("weighted"));
});
