import { describe, expect, it } from "vitest";
import {
  codexOperationalQuota,
  codexOperationalWindows,
} from "@/app/(dashboard)/dashboard/providers/[id]/components/codexOperationalQuota";

describe("Codex operational quota values", () => {
  it("preserves a monthly window instead of presenting it as five-hour usage", () => {
    expect(
      codexOperationalQuota(
        {},
        {
          quotas: {
            session: {
              used: 40,
              total: 100,
              windowSeconds: 30 * 86400,
              displayName: "Monthly",
            },
          },
        },
        "5h"
      )
    ).toEqual({ usedPercent: 40, resetAt: null, period: "monthly" });
  });
  it("keeps missing, null and invalid usage unknown", () => {
    for (const session of [
      {},
      { used: null, total: 100 },
      { used: NaN, total: 100 },
      { used: 0, total: 0 },
    ]) {
      expect(codexOperationalQuota({}, { quotas: { session } }, "5h").usedPercent).toBeNull();
    }
    expect(codexOperationalQuota({}, undefined, "7d")).toEqual({
      usedPercent: null,
      resetAt: null,
    });
  });
  it("distinguishes an observed zero from missing usage and keeps windows independent", () => {
    const cache = {
      quotas: {
        session: { used: 0, total: 100 },
        weekly: { used: 75, total: 100, resetAt: "2030-01-01T12:00:00Z" },
      },
    };
    expect(codexOperationalQuota({}, cache, "5h").usedPercent).toBe(0);
    expect(codexOperationalQuota({}, cache, "7d")).toEqual({
      usedPercent: 75,
      resetAt: "2030-01-01T12:00:00Z",
    });
  });
  it("clamps observed percentages and drops invalid reset dates", () => {
    expect(
      codexOperationalQuota(
        {},
        { quotas: { session: { remainingPercentage: -20, resetAt: "invalid" } } },
        "5h"
      )
    ).toEqual({ usedPercent: 100, resetAt: null });
  });
});

describe("Codex reported quota windows", () => {
  it("shows only the weekly primary window for weekly-only accounts", () => {
    const cache = {
      quotas: { session: { used: 50, total: 100, windowSeconds: 604800, displayName: "Weekly" } },
    };
    expect(codexOperationalWindows(cache)).toEqual(["5h"]);
    expect(codexOperationalQuota({}, cache, "5h")).toEqual({
      usedPercent: 50,
      resetAt: null,
      period: "weekly",
    });
  });
  it("recognizes a weekly display name in older cached payloads", () => {
    expect(
      codexOperationalQuota(
        {},
        { quotas: { session: { used: 10, total: 100, displayName: "Weekly" } } },
        "5h"
      ).period
    ).toBe("weekly");
  });
  it("retains both reported windows, including observed zero usage", () => {
    expect(
      codexOperationalWindows({
        quotas: { session: { used: 0, total: 100 }, weekly: { used: 0, total: 100 } },
      })
    ).toEqual(["5h", "7d"]);
    expect(codexOperationalWindows({ quotas: { weekly: { used: 25, total: 100 } } })).toEqual([
      "7d",
    ]);
  });
  it("does not infer absent limits while quota data is unavailable", () => {
    expect(codexOperationalWindows(undefined)).toEqual(["5h", "7d"]);
    expect(codexOperationalWindows({ quotas: {} })).toEqual(["5h", "7d"]);
  });
});
