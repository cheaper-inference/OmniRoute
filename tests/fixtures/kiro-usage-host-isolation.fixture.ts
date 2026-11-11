/**
 * Fixture for tests/unit/kiro-version-gate-19607.test.ts — runs in an isolated
 * child process so the parent runner's shared module cache (test:unit:fast uses
 * --test-isolation=none) and any operator-exported
 * OMNIROUTE_CODEWHISPERER_BASE_URL cannot freeze the usage module's load-time
 * env capture before this assertion runs.
 *
 * The env override is deleted BEFORE importing the usage module, so the capture
 * resolves the default — exactly the routing this fixture pins (#19607).
 */
import assert from "node:assert/strict";

// Defensive: the spawning test builds a minimal env, but make the fixture's
// contract explicit — the load-time capture below must see the variable unset.
delete process.env.OMNIROUTE_CODEWHISPERER_BASE_URL;

const { __testing } = await import("@omniroute/open-sse/services/usage.ts");
const { getKiroUsage } = __testing as {
  getKiroUsage: typeof import("../../open-sse/services/usage/kiro.ts").getKiroUsage;
};

const captured: string[] = [];
globalThis.fetch = (async (url: URL | string) => {
  captured.push(String(url));
  // Valid usage payload so the attempt chain stops on the first success.
  return new Response(
    JSON.stringify({
      usageBreakdownList: [
        {
          resourceType: "AGENTIC_REQUEST",
          currentUsageWithPrecision: 1,
          usageLimitWithPrecision: 50,
        },
      ],
      nextDateReset: "2026-12-01T00:00:00Z",
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}) as typeof fetch;

try {
  await getKiroUsage("idc-token", {
    authMethod: "idc",
    region: "us-east-1",
    profileArn: "arn:aws:codewhisperer:us-east-1:111111111111:profile/X",
  });
} finally {
  // @ts-expect-error test teardown of a stubbed global
  delete globalThis.fetch;
}

assert.ok(captured.length > 0, "usage fetcher must have issued at least one request");
assert.ok(
  captured.every((u) => !u.includes("codewhisperer.")),
  `default usage routing must avoid the legacy codewhisperer host; got ${JSON.stringify(captured)}`
);
assert.ok(
  captured.some((u) => u.startsWith("https://q.us-east-1.amazonaws.com")),
  `default usage routing must ride the regional Amazon Q host; got ${JSON.stringify(captured)}`
);
