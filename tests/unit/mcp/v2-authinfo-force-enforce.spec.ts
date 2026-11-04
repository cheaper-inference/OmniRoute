/**
 * Regression: a per-key HTTP caller (authInfo) holding only the narrow `mcp:connect`
 * scope must not reach tools when OMNIROUTE_MCP_ENFORCE_SCOPES is off. The v2 server
 * must apply the same forced enforcement as v1 (shouldForceScopeEnforcement).
 */
import { describe, it, expect } from "vitest";
import {
  evaluateToolScopes,
  resolveCallerScopeContext,
  shouldForceScopeEnforcement,
} from "../../../open-sse/mcp-server/scopeEnforcement.ts";

describe("v2 authInfo caller with only mcp:connect", () => {
  const extra = {
    authInfo: { clientId: "key-1", scopes: ["mcp:connect"] },
  } as const;

  it("is forced into enforcement even when the env switch is off", () => {
    const ctx = resolveCallerScopeContext(extra as never, []);
    expect(ctx.source).toBe("authInfo");
    expect(shouldForceScopeEnforcement(ctx)).toBe(true);

    const enforce = false || shouldForceScopeEnforcement(ctx);
    const check = evaluateToolScopes("omniroute_list_combos", ctx.scopes, enforce);
    expect(check.allowed).toBe(false);
  });

  it("is not forced for a caller that holds manage scope", () => {
    const ctx = resolveCallerScopeContext(
      { authInfo: { clientId: "key-2", scopes: ["manage"] } } as never,
      []
    );
    expect(shouldForceScopeEnforcement(ctx)).toBe(false);
  });
});
