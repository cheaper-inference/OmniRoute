// Provider tab status pills: the existing All/Active/Error/Banned/Credits filters plus
// "Needs verification" — the Antigravity accounts holding a stored Google verify-account
// link — so an operator can work through the blocked accounts one by one.

import { describe, it, expect } from "vitest";
import {
  matchesHealthFilter,
  countVerificationRequired,
  VERIFICATION_REQUIRED_FILTER,
} from "../../../src/app/(dashboard)/dashboard/providers/[id]/connectionHealthFilter";
import type { ConnectionRowConnection } from "../../../src/app/(dashboard)/dashboard/providers/[id]/components/ConnectionRow";

const LINK =
  "https://accounts.google.com/v3/signin/continue?plt=AKgnsbtTEST&flowName=GlifWebSignIn";

function conn(overrides: Partial<ConnectionRowConnection> = {}): ConnectionRowConnection {
  return {
    id: "c1",
    isActive: true,
    testStatus: "active",
    ...overrides,
  } as ConnectionRowConnection;
}

const healthy = conn({ id: "ok" });
const pending = conn({ id: "pending", providerSpecificData: { verificationUrl: LINK } });
const notGoogle = conn({
  id: "not-google",
  providerSpecificData: { verificationUrl: "https://example.com/verify" },
});
const failing = conn({ id: "err", testStatus: "error" });
const banned = conn({ id: "ban", testStatus: "banned" });
const credits = conn({ id: "cred", testStatus: "credits_exhausted" });
const all = [healthy, pending, notGoogle, failing, banned, credits];

const pick = (filter: string) => all.filter((c) => matchesHealthFilter(c, filter)).map((c) => c.id);

describe("matchesHealthFilter", () => {
  it("keeps the existing pills unchanged", () => {
    expect(pick("all")).toEqual(all.map((c) => c.id));
    expect(pick("active")).toEqual(["ok", "pending", "not-google"]);
    expect(pick("error")).toEqual(["err"]);
    expect(pick("banned")).toEqual(["ban"]);
    expect(pick("credits_exhausted")).toEqual(["cred"]);
  });

  it("lists only connections holding a Google verification link", () => {
    expect(pick(VERIFICATION_REQUIRED_FILTER)).toEqual(["pending"]);
  });

  it("treats a prefix-shadowed connection as an error, not active (#17339)", () => {
    const shadowed = conn({
      id: "shadowed",
      prefixShadowed: { code: "prefix_shadowed", message: "Prefix routes to the builtin" },
    });
    expect(matchesHealthFilter(shadowed, "active")).toBe(false);
    expect(matchesHealthFilter(shadowed, "error")).toBe(true);
  });

  // #19266: Google's ToS suspension is persisted as "banned" by the account-fallback
  // path but as "deactivated" (or only lastErrorType "account_deactivated") by others,
  // so one banned Antigravity account showed under "Error" instead of "Banned".
  it("lists provider account bans under Banned whatever path persisted them (#19266)", () => {
    const tos = "This service has been disabled in this account for violation of Terms of Service.";
    const deactivated = conn({
      id: "deact",
      isActive: false,
      testStatus: "deactivated",
      lastErrorType: "account_deactivated",
      lastError: tos,
    });
    const errorTyped = conn({
      id: "err-typed",
      testStatus: "error",
      lastErrorType: "account_deactivated",
      lastError: tos,
    });
    for (const c of [deactivated, errorTyped]) {
      expect(matchesHealthFilter(c, "banned")).toBe(true);
      expect(matchesHealthFilter(c, "error")).toBe(false);
      expect(matchesHealthFilter(c, "active")).toBe(false);
    }
  });

  it("does not list a recovered connection as banned from a stale lastErrorType", () => {
    const recovered = conn({ id: "recovered", lastErrorType: "account_deactivated" });
    expect(matchesHealthFilter(recovered, "active")).toBe(true);
    expect(matchesHealthFilter(recovered, "banned")).toBe(false);
  });

  it("counts the connections that still need verification", () => {
    expect(countVerificationRequired(all)).toBe(1);
    expect(countVerificationRequired([healthy, failing])).toBe(0);
  });
});
