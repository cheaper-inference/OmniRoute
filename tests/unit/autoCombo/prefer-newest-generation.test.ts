/**
 * Opt-in newest-generation preference for built-in `auto` / `auto/*` routes.
 *
 * Covers the `auto-newest-generation-routing` spec scenarios that live ABOVE the
 * pure parser:
 *   - the promotion pass (`newestGenerationPromotion.ts`): rung/health bucketing,
 *     price-jump guard (paid, unpriced and null-baseline jumps held back, zero-cost
 *     subscription pairs passing), thrifty clamping, unrecognized preservation;
 *   - the `resolveAutoStrategyOrder` gate: off by default, built-in-auto only, and
 *     the observable primary-target + `selectionReason` update when it fires.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { promoteNewestGenerationTargets } from "@omniroute/open-sse/services/combo/newestGenerationPromotion.ts";
import { resolveAutoStrategyOrder } from "@omniroute/open-sse/services/combo/resolveAutoStrategy.ts";

import { resetDbInstance } from "@/lib/db/core.ts";
import { setLKGP, updatePricing, resetAllPricing } from "@/lib/db/settings.ts";

afterAll(() => {
  // Release the SQLite handle so the runner does not hang on teardown.
  resetDbInstance();
});

function target(provider: string, modelStr: string, ladderRung?: string): never {
  return {
    kind: "model",
    stepId: "s1",
    executionKey: `${provider}>${modelStr}`,
    modelStr,
    provider,
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
    ...(ladderRung ? { ladderRung } : {}),
  } as never;
}

function candidate(
  provider: string,
  modelStr: string,
  overrides: Record<string, unknown> = {}
): Record<string, unknown> {
  return {
    kind: "model",
    stepId: "s1",
    executionKey: `${provider}>${modelStr}`,
    modelStr,
    provider,
    model: modelStr.includes("/") ? modelStr.slice(modelStr.indexOf("/") + 1) : modelStr,
    quotaRemaining: 100,
    quotaTotal: 100,
    circuitBreakerState: "CLOSED",
    costPer1MTokens: 2,
    p95LatencyMs: 100,
    latencyStdDev: 10,
    errorRate: 0,
    ...overrides,
  };
}

/**
 * Pricing lookup stub keyed by `provider/model`. A model absent from the table is
 * UNPRICED (`null`) — the fail-closed case the guard must refuse to promote over.
 */
function pricingFrom(table: Record<string, { input: number; output: number }>) {
  return async (provider: string, model: string) => table[`${provider}/${model}`] ?? null;
}

async function promote(options: {
  orderedTargets: unknown[];
  candidates: unknown[];
  pricing?: Record<string, { input: number; output: number }>;
  maxPriceMultiplier?: unknown;
  clampPriceMultiplierToOne?: boolean;
  accountPreferences?: Record<string, "preferred" | "normal" | "reserve" | "excluded">;
}) {
  return promoteNewestGenerationTargets({
    orderedTargets: options.orderedTargets as never,
    candidates: options.candidates as never,
    maxPriceMultiplier: options.maxPriceMultiplier,
    clampPriceMultiplierToOne: options.clampPriceMultiplierToOne ?? false,
    accountPreferences: options.accountPreferences,
    getPricing: pricingFrom(options.pricing ?? {}),
  });
}

const FLAT_PRICING = {
  "codex/gpt-6-sol": { input: 2, output: 2 },
  "codex/gpt-6.2-sol": { input: 2, output: 2 },
  "openrouter/gpt-6-sol": { input: 2, output: 2 },
  "openrouter/gpt-6.2-sol": { input: 2, output: 2 },
  "claude/claude-opus-5-5": { input: 2, output: 2 },
  "claude/claude-fable-5-2": { input: 2, output: 2 },
};

describe("promoteNewestGenerationTargets", () => {
  it("promotes the newer generation and reports before/after model, cost and bucket", async () => {
    const result = await promote({
      orderedTargets: [target("codex", "codex/gpt-6-sol"), target("codex", "codex/gpt-6.2-sol")],
      candidates: [candidate("codex", "codex/gpt-6-sol"), candidate("codex", "codex/gpt-6.2-sol")],
      pricing: FLAT_PRICING,
    });

    expect(result.promoted).toBe(true);
    expect(result.orderedTargets.map((entry) => entry.modelStr)).toEqual([
      "codex/gpt-6.2-sol",
      "codex/gpt-6-sol",
    ]);
    expect(result.reason).toContain("codex/gpt-6-sol → codex/gpt-6.2-sol");
    expect(result.reason).toContain("bucket=");
    expect(result.reason).toContain("cost 2 → 2");
    expect(result.reason).toContain("multiplier=1");
  });

  it("promotes two distinct families independently and leaves a third untouched", async () => {
    const result = await promote({
      orderedTargets: [
        target("codex", "codex/gpt-6-sol"),
        target("claude", "claude/claude-opus-5-5"),
        target("codex", "codex/gpt-6.2-sol"),
        target("claude", "claude/claude-fable-5-2"),
      ],
      candidates: [
        candidate("codex", "codex/gpt-6-sol"),
        candidate("claude", "claude/claude-opus-5-5"),
        candidate("codex", "codex/gpt-6.2-sol"),
        candidate("claude", "claude/claude-fable-5-2"),
      ],
      pricing: {
        ...FLAT_PRICING,
        "claude/claude-opus-5-5": { input: 2, output: 2 },
        "claude/claude-fable-5-2": { input: 2, output: 2 },
      },
    });

    // gpt-sol group (slots 0, 2) newest-first; claude-opus and claude-fable are
    // DIFFERENT tier families, so they keep their relative slots.
    expect(result.orderedTargets.map((entry) => entry.modelStr)).toEqual([
      "codex/gpt-6.2-sol",
      "claude/claude-opus-5-5",
      "codex/gpt-6-sol",
      "claude/claude-fable-5-2",
    ]);
  });

  it("keeps a penalised or quota-blocked newer generation behind a healthy older one", async () => {
    for (const penalty of [
      { statusPenalty: true },
      { quotaSoftPenalty: true },
      { quotaUnreadable: true },
      { quotaCutoffBlocked: true },
    ]) {
      const result = await promote({
        orderedTargets: [target("codex", "codex/gpt-6-sol"), target("codex", "codex/gpt-6.2-sol")],
        candidates: [
          candidate("codex", "codex/gpt-6-sol"),
          candidate("codex", "codex/gpt-6.2-sol", penalty),
        ],
        pricing: FLAT_PRICING,
        maxPriceMultiplier: 100,
      });
      expect(result.promoted).toBe(false);
      expect(result.orderedTargets.map((entry) => entry.modelStr)).toEqual([
        "codex/gpt-6-sol",
        "codex/gpt-6.2-sol",
      ]);
    }
  });

  it("never promotes across ladder rungs: subscription older beats premium newer", async () => {
    const result = await promote({
      orderedTargets: [
        target("codex", "codex/gpt-6-sol", "subscription"),
        target("openrouter", "openrouter/gpt-6.2-sol", "premium"),
      ],
      candidates: [
        candidate("codex", "codex/gpt-6-sol"),
        candidate("openrouter", "openrouter/gpt-6.2-sol"),
      ],
      pricing: FLAT_PRICING,
      maxPriceMultiplier: 100,
    });

    expect(result.promoted).toBe(false);
    expect(result.orderedTargets.map((entry) => entry.modelStr)).toEqual([
      "codex/gpt-6-sol",
      "openrouter/gpt-6.2-sol",
    ]);
  });

  it("never promotes a reserve account ahead of a preferred account", async () => {
    const tPreferred = {
      ...(target("codex", "codex/gpt-6-sol") as Record<string, unknown>),
      connectionId: "conn-pref",
      executionKey: "codex/gpt-6-sol@conn-pref",
    };
    const tReserve = {
      ...(target("codex", "codex/gpt-6.2-sol") as Record<string, unknown>),
      connectionId: "conn-res",
      executionKey: "codex/gpt-6.2-sol@conn-res",
    };
    const result = await promote({
      orderedTargets: [tPreferred, tReserve],
      candidates: [
        candidate("codex", "codex/gpt-6-sol", { executionKey: "codex/gpt-6-sol@conn-pref" }),
        candidate("codex", "codex/gpt-6.2-sol", { executionKey: "codex/gpt-6.2-sol@conn-res" }),
      ],
      pricing: FLAT_PRICING,
      maxPriceMultiplier: 100,
      accountPreferences: { "conn-pref": "preferred", "conn-res": "reserve" },
    });

    expect(result.promoted).toBe(false);
    expect(result.orderedTargets.map((entry) => entry.modelStr)).toEqual([
      "codex/gpt-6-sol",
      "codex/gpt-6.2-sol",
    ]);
  });

  it("clamps the multiplier to 1.0 on a rung-ordered (:thrifty) pool", async () => {
    const pricing = {
      "codex/gpt-6-sol": { input: 1, output: 1 },
      "codex/gpt-6.2-sol": { input: 2, output: 2 },
    };
    // Without the clamp the configured 10x would allow the $1 jump.
    const unclamped = await promote({
      orderedTargets: [target("codex", "codex/gpt-6-sol"), target("codex", "codex/gpt-6.2-sol")],
      candidates: [candidate("codex", "codex/gpt-6-sol"), candidate("codex", "codex/gpt-6.2-sol")],
      pricing,
      maxPriceMultiplier: 10,
    });
    expect(unclamped.promoted).toBe(true);

    const clamped = await promote({
      orderedTargets: [target("codex", "codex/gpt-6-sol"), target("codex", "codex/gpt-6.2-sol")],
      candidates: [candidate("codex", "codex/gpt-6-sol"), candidate("codex", "codex/gpt-6.2-sol")],
      pricing,
      maxPriceMultiplier: 10,
      clampPriceMultiplierToOne: true,
    });
    expect(clamped.promoted).toBe(false);
  });

  it("holds back a paid or unpriced newer generation over a zero-cost baseline", async () => {
    const zeroBaseline = {
      "codex/gpt-6-sol": { input: 0, output: 0 },
      "codex/gpt-6.2-sol": { input: 1, output: 1 },
    };
    const paid = await promote({
      orderedTargets: [target("codex", "codex/gpt-6-sol"), target("codex", "codex/gpt-6.2-sol")],
      candidates: [candidate("codex", "codex/gpt-6-sol"), candidate("codex", "codex/gpt-6.2-sol")],
      pricing: zeroBaseline,
    });
    expect(paid.promoted).toBe(false);

    const unpriced = await promote({
      orderedTargets: [target("codex", "codex/gpt-6-sol"), target("codex", "codex/gpt-6.2-sol")],
      candidates: [candidate("codex", "codex/gpt-6-sol"), candidate("codex", "codex/gpt-6.2-sol")],
      pricing: { "codex/gpt-6-sol": { input: 0, output: 0 } },
    });
    expect(unpriced.promoted).toBe(false);
  });

  it("promotes two zero-cost subscription candidates normally", async () => {
    const result = await promote({
      orderedTargets: [
        target("codex", "codex/gpt-6-sol", "subscription"),
        target("codex", "codex/gpt-6.2-sol", "subscription"),
      ],
      candidates: [candidate("codex", "codex/gpt-6-sol"), candidate("codex", "codex/gpt-6.2-sol")],
      pricing: {
        "codex/gpt-6-sol": { input: 0, output: 0 },
        "codex/gpt-6.2-sol": { input: 0, output: 0 },
      },
    });
    expect(result.promoted).toBe(true);
    expect(result.orderedTargets[0].modelStr).toBe("codex/gpt-6.2-sol");
  });

  it("leaves unrecognized models in their existing positions", async () => {
    const result = await promote({
      orderedTargets: [
        target("opencode", "opencode/aion-3.0"),
        target("codex", "codex/gpt-6-sol"),
        target("codex", "codex/gpt-6.2-sol"),
      ],
      candidates: [
        candidate("opencode", "opencode/aion-3.0"),
        candidate("codex", "codex/gpt-6-sol"),
        candidate("codex", "codex/gpt-6.2-sol"),
      ],
      pricing: { ...FLAT_PRICING, "opencode/aion-3.0": { input: 1, output: 1 } },
    });
    expect(result.orderedTargets.map((entry) => entry.modelStr)).toEqual([
      "opencode/aion-3.0",
      "codex/gpt-6.2-sol",
      "codex/gpt-6-sol",
    ]);
  });
});

// ───────────────────────── resolveAutoStrategy gate ─────────────────────────

function capturingLog() {
  const entries: string[] = [];
  const push = (_tag: unknown, message: unknown) => entries.push(String(message));
  return { entries, info: push, warn: push, error: push, debug: push };
}

async function runAuto(options: {
  comboName: string;
  settings: Record<string, unknown> | null;
  isBuiltinAuto?: boolean;
  withPricing: boolean;
}) {
  if (options.withPricing) {
    await updatePricing({
      codex: {
        "gpt-6-sol": { input: 2, output: 2 },
        "gpt-6.2-sol": { input: 2, output: 2 },
      },
    });
  } else {
    // Start from an empty pricing table so "unpriced" really means unpriced.
    await resetAllPricing();
  }
  const log = capturingLog();
  const result = await resolveAutoStrategyOrder({
    orderedTargets: [target("codex", "codex/gpt-6-sol"), target("codex", "codex/gpt-6.2-sol")],
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: {
      id: options.comboName,
      name: options.comboName,
      autoConfig: {
        routerStrategy: "rules",
        candidatePool: ["codex"],
        explorationRate: 0,
        ...(options.isBuiltinAuto === false ? {} : { isBuiltinAuto: true }),
      },
    },
    settings: options.settings,
    config: {},
    relayOptions: null,
    resilienceSettings: { quotaPreflight: { enabled: false } },
    log,
    buildAutoCandidates: (async () => [
      // The OLDER generation is deliberately the faster/lower-error one, so the
      // scorer ranks it first — exactly the "historical telemetry outranks a newer
      // release" situation the preference exists to correct.
      candidate("codex", "codex/gpt-6-sol", { p95LatencyMs: 10, latencyStdDev: 1 }),
      candidate("codex", "codex/gpt-6.2-sol", { p95LatencyMs: 900, latencyStdDev: 90 }),
    ]) as never,
  } as never);

  expect(result).not.toHaveProperty("earlyResponse");
  const ordered = (result as { orderedTargets: Array<{ modelStr: string }> }).orderedTargets;
  return {
    ordered: ordered.map((entry) => entry.modelStr),
    selection: log.entries.find((entry) => entry.startsWith("Auto selection:")) ?? "",
    logs: log.entries,
  };
}

describe("resolveAutoStrategyOrder newest-generation gate", () => {
  beforeAll(async () => {
    // No LKGP pin: the rules scorer must own the baseline ordering.
    await setLKGP("newest-default", "newest-default", "codex");
  });

  it("is off by default — legacy score order is untouched", async () => {
    const { ordered, selection } = await runAuto({
      comboName: "newest-default",
      settings: null,
      withPricing: true,
    });
    expect(ordered[0]).toBe("codex/gpt-6-sol");
    expect(selection).not.toContain("newest-generation");
  });

  it("does not rewrite a user-created combo that merely uses the auto strategy", async () => {
    const { ordered, selection } = await runAuto({
      comboName: "newest-user-combo",
      settings: { autoPreferNewestInFamily: true },
      isBuiltinAuto: false,
      withPricing: true,
    });
    expect(ordered[0]).toBe("codex/gpt-6-sol");
    expect(selection).not.toContain("newest-generation");
  });

  it("promotes the newer generation for a built-in auto route when enabled", async () => {
    const { ordered, selection } = await runAuto({
      comboName: "newest-enabled",
      settings: { autoPreferNewestInFamily: true },
      withPricing: true,
    });
    expect(ordered[0]).toBe("codex/gpt-6.2-sol");
    expect(selection).toContain("Auto selection: codex/gpt-6.2-sol");
    expect(selection).toContain("newest-generation");
    expect(selection).toContain("codex/gpt-6-sol → codex/gpt-6.2-sol");
  });

  it("fails closed when the newer generation has no pricing row and logs the skip reason", async () => {
    const { ordered, selection, logs } = await runAuto({
      comboName: "newest-unpriced",
      settings: { autoPreferNewestInFamily: true },
      withPricing: false,
    });
    expect(ordered[0]).toBe("codex/gpt-6-sol");
    expect(selection).not.toContain("newest-generation");
    expect(
      logs.some(
        (entry) =>
          entry.includes("newest-generation skipped:") &&
          entry.includes("codex/gpt-6.2-sol") &&
          entry.includes("null-cost")
      )
    ).toBe(true);
  });
});
