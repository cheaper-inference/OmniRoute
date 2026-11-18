import { describe, it, beforeEach } from "node:test";
import { strict as assert } from "node:assert";

import {
  _resetClaudeOauthUsageCooldown,
  isClaudeOauthUsageCoolingDown,
  markClaudeOauthUsage429,
} from "../../open-sse/services/claudeUsageCooldown.ts";
import { fetchClaudeResetCreditUsage } from "../../open-sse/services/claudeResetCreditCount.ts";
import { fetchClaudeLimitResetStatus } from "../../open-sse/services/claudeLimitReset.ts";

// The reset-credit and at-wall reads hit the same /api/oauth/usage endpoint as the quota
// poll. A call inside Anthropic's 429 window is refused and restarts that window, so they
// must honour, and feed, the same per-credential cooldown.

function countingFetch(respond: () => Response) {
  const calls: string[] = [];
  const impl = (async (input: RequestInfo | URL) => {
    calls.push(String(input));
    return respond();
  }) as typeof fetch;
  return { impl, calls };
}

describe("Claude reset-credit usage reads share the OAuth usage 429 cooldown", () => {
  beforeEach(() => {
    _resetClaudeOauthUsageCooldown();
  });

  it("a 429 on the reset-credit read starts the cooldown from its Retry-After", async () => {
    const { impl, calls } = countingFetch(
      () =>
        new Response(JSON.stringify({ error: { type: "rate_limit_error" } }), {
          status: 429,
          headers: { "retry-after": "3529" },
        })
    );
    const first = await fetchClaudeResetCreditUsage("tok-credits", { fetchImpl: impl });
    assert.deepEqual(
      { ok: first.ok, status: (first as { status: number }).status },
      {
        ok: false,
        status: 429,
      }
    );
    assert.equal(calls.length, 1);
    assert.equal(isClaudeOauthUsageCoolingDown("tok-credits", Date.now() + 3_500_000), true);

    const second = await fetchClaudeResetCreditUsage("tok-credits", { fetchImpl: impl });
    assert.equal((second as { status: number }).status, 429);
    assert.equal(calls.length, 1, "no request may be sent while the credential is cooling down");
  });

  it("the at-wall status read sends nothing while the credential is cooling down", async () => {
    markClaudeOauthUsage429("tok-wall", Date.now(), 3_600_000);
    const { impl, calls } = countingFetch(() => Response.json({ juniper_tide: {} }));
    assert.equal(await fetchClaudeLimitResetStatus("tok-wall", impl), null);
    assert.equal(calls.length, 0);
  });

  it("the at-wall status read records a 429 for the other readers", async () => {
    const { impl } = countingFetch(
      () => new Response("rate limited", { status: 429, headers: { "retry-after": "1200" } })
    );
    assert.equal(await fetchClaudeLimitResetStatus("tok-wall-429", impl), null);
    assert.equal(isClaudeOauthUsageCoolingDown("tok-wall-429", Date.now() + 1_100_000), true);
  });

  it("a successful read leaves the credential uncooled", async () => {
    const { impl } = countingFetch(() => Response.json({ cedar_ember: { grants: [] } }));
    const res = await fetchClaudeResetCreditUsage("tok-ok", { fetchImpl: impl });
    assert.equal(res.ok, true);
    assert.equal(isClaudeOauthUsageCoolingDown("tok-ok"), false);
  });
});
