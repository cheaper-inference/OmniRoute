/**
 * Settings surface + persistence sanitization for the newest-generation preference.
 *
 * Two things are pinned here:
 *   1. `updateSettingsSchema` actually carries `autoPreferNewestInFamily` and
 *      `autoNewestMaxPriceMultiplier`. A plain `z.object` silently STRIPS unknown
 *      keys, so a missing entry means PATCH /api/settings answers 200 while the
 *      value never reaches the DB — the exact failure #9418/#13562 hit.
 *   2. `stripTransientAutoFlags` removes the two transient built-in-auto routing
 *      flags from a persisted/duplicated combo, so a static snapshot cannot keep
 *      routing under built-in-auto semantics with a frozen ladder rung.
 */
import { describe, expect, it } from "vitest";

import { updateSettingsSchema } from "@/shared/validation/settingsSchemas";
import { stripTransientAutoFlags } from "@omniroute/open-sse/services/autoCombo/transientAutoFlags.ts";

describe("newest-generation settings schema", () => {
  it("accepts the opt-in flag and a positive price multiplier", () => {
    const parsed = updateSettingsSchema.parse({
      autoPreferNewestInFamily: true,
      autoNewestMaxPriceMultiplier: 1.5,
    });
    expect(parsed.autoPreferNewestInFamily).toBe(true);
    expect(parsed.autoNewestMaxPriceMultiplier).toBe(1.5);
  });

  it("leaves both unset by default (opt-in, never on by default)", () => {
    const parsed = updateSettingsSchema.parse({});
    expect(parsed.autoPreferNewestInFamily).toBeUndefined();
    expect(parsed.autoNewestMaxPriceMultiplier).toBeUndefined();
  });

  it("rejects a non-positive or absurd multiplier", () => {
    for (const value of [0, -1, 1000]) {
      expect(updateSettingsSchema.safeParse({ autoNewestMaxPriceMultiplier: value }).success).toBe(
        false
      );
    }
  });
});

describe("stripTransientAutoFlags", () => {
  it("drops isBuiltinAuto and per-step ladderRung from a persisted snapshot", () => {
    const combo = {
      name: "static-gpt-sol",
      models: [
        {
          id: "m1",
          kind: "model",
          model: "codex/gpt-6.1-sol",
          weight: 1,
          ladderRung: "subscription",
        },
        { id: "m2", kind: "model", model: "openrouter/gpt-6.2-sol", weight: 1 },
      ],
      autoConfig: { candidatePool: ["codex"], isBuiltinAuto: true, routerStrategy: "lkgp" },
      config: { auto: { isBuiltinAuto: true, routerStrategy: "lkgp" } },
    };

    const stripped = stripTransientAutoFlags(combo);

    expect(stripped.models[0]).not.toHaveProperty("ladderRung");
    expect(stripped.models[0]).toMatchObject({ model: "codex/gpt-6.1-sol", weight: 1 });
    expect(stripped.autoConfig).not.toHaveProperty("isBuiltinAuto");
    expect(stripped.autoConfig).toMatchObject({ candidatePool: ["codex"] });
    expect(stripped.config.auto).not.toHaveProperty("isBuiltinAuto");
    expect(stripped.config.auto).toMatchObject({ routerStrategy: "lkgp" });
  });

  it("returns the same reference when there is nothing to strip", () => {
    const combo = { name: "plain", models: [{ id: "m1", model: "openai/gpt-4o" }] };
    expect(stripTransientAutoFlags(combo)).toBe(combo);
  });

  it("passes non-object input through untouched", () => {
    expect(stripTransientAutoFlags(null)).toBeNull();
    expect(stripTransientAutoFlags("combo")).toBe("combo");
  });
});
