/**
 * muse-code-console-quota.test.ts — live `dev.meta.ai` console-cookie quota fetch
 * for Muse Code (portal teams + subscription-quota endpoints).
 *
 * All `fetch` calls are mocked with a fake cookie (`FAKE_SESSION_VALUE`); no
 * real credentials, accounts.json, DB, or live upstream are touched.
 */
import test, { afterEach, beforeEach } from "node:test";
import assert from "node:assert/strict";

import { getMuseUsage } from "../../open-sse/services/usage/museCode.ts";

process.env.OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS = "0";
process.env.OMNIROUTE_QUOTA_FETCH_JITTER_MS = "0";

const FAKE_SESSION = "FAKE_SESSION_VALUE";

const PORTAL = "https://dev.meta.ai/api/portal";

function teamsResponse(teams: Array<{ team_id: string; team_name: string }>) {
  return {
    status: 200,
    json: async () => ({ teams }),
  };
}

function quotaResponse(overrides: Record<string, unknown> = {}) {
  const base = {
    subscription_quota: {
      tier_id: "tier-1",
      tier: "Muse Code Everyday Usage",
      as_of: 1_700_000_000,
      window_weighted_limit: "20000000000",
      window_duration_secs: 18000,
      window_weighted_used: "4000000000",
      window_resets_at: 1_700_003_600,
      weekly_weighted_limit: "60000000000",
      weekly_weighted_used: "12000000000",
      weekly_resets_at: 1_700_060_400,
    },
  };
  return {
    status: 200,
    json: async () => ({
      ...base,
      subscription_quota: { ...base.subscription_quota, ...overrides },
    }),
  };
}

type FetchCall = { url: string; headers: Record<string, string>; signal?: AbortSignal };

// Install a fetch stub keyed by URL suffix. Returns the recorded calls.
function stubFetch(handler: (url: string) => Promise<unknown> | unknown): FetchCall[] {
  const calls: FetchCall[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    const headers: Record<string, string> = {};
    const rawHeaders = (init?.headers ?? {}) as Record<string, string>;
    for (const [k, v] of Object.entries(rawHeaders)) headers[k] = v;
    calls.push({ url, headers, signal: init?.signal as AbortSignal | undefined });
    return (await handler(url)) as Response;
  }) as typeof fetch;
  return calls;
}

const originalFetch = globalThis.fetch;
const originalEnvSession = process.env.MUSE_CONSOLE_SESSION;

// Start every test without an ambient env cookie, and put the developer's own value back after.
beforeEach(() => {
  delete process.env.MUSE_CONSOLE_SESSION;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalEnvSession === undefined) delete process.env.MUSE_CONSOLE_SESSION;
  else process.env.MUSE_CONSOLE_SESSION = originalEnvSession;
});

function assertResultHasNoLeak(result: unknown, consoleLines: string[] = []): void {
  const serialized = JSON.stringify(result);
  assert.equal(
    serialized.includes(FAKE_SESSION),
    false,
    "result must not contain the fake session cookie"
  );
  for (const line of consoleLines) {
    assert.equal(
      line.includes(FAKE_SESSION),
      false,
      "console output must not contain the fake session cookie"
    );
  }
}

test("missing cookie degrades to persisted metadata + acquisition hint", async () => {
  const calls: unknown[] = [];
  globalThis.fetch = (async (input: string) => {
    calls.push(input);
    return teamsResponse([{ team_id: "team-1", team_name: "Solo" }]);
  }) as typeof fetch;

  const result = (await getMuseUsage(undefined, {
    subsTierName: "Synthetic tier",
  })) as Record<string, unknown>;

  assert.equal(calls.length, 0, "no fetch without a cookie");
  assert.equal(result.provider, "muse-code");
  assert.equal(result.plan, "Synthetic tier");
  assert.equal("quotas" in result, false, "degraded result carries no live quotas");
  const message = String(result.message ?? "");
  assert.match(
    message,
    /DevTools > Application > Cookies > dev\.meta\.ai > llama_dev_sess/,
    "message names the exact acquisition path"
  );
  assert.match(message, /museConsoleSession|MUSE_CONSOLE_SESSION/, "message names the field/env");
});

test("401 and 403 return an expired-cookie hint, not a hard error", async () => {
  for (const status of [401, 403]) {
    stubFetch(() => ({ status, json: async () => ({ error: "Not authenticated" }) }));

    const result = (await getMuseUsage(undefined, {
      museConsoleSession: FAKE_SESSION,
    })) as Record<string, unknown>;

    const message = String(result.message ?? "");
    assert.match(
      message,
      /re-paste|expired/i,
      `HTTP ${status}: message tells the user to re-paste`
    );
    assert.equal("quotas" in result, false);
    assertResultHasNoLeak(result);
  }
});

test("single team auto-selects and returns session + weekly quotas", async () => {
  const calls = stubFetch((url) => {
    if (url === `${PORTAL}/teams`) {
      return teamsResponse([{ team_id: "team-1", team_name: "Solo" }]);
    }
    if (url === `${PORTAL}/teams/team-1/subscription-quota`) return quotaResponse();
    throw new Error(`unexpected url ${String(url).includes(FAKE_SESSION) ? "LEAK" : url}`);
  });

  const result = (await getMuseUsage(undefined, {
    museConsoleSession: FAKE_SESSION,
  })) as Record<string, unknown>;

  const quotas = result.quotas as Record<string, Record<string, unknown>>;
  assert.ok(quotas.session, "session quota present");
  assert.ok(quotas.weekly, "weekly quota present");

  // String numbers parsed safely: 4B / 20B = 20% used → 80% remaining.
  assert.equal(quotas.session.used, 4_000_000_000);
  assert.equal(quotas.session.total, 20_000_000_000);
  assert.equal(quotas.session.remaining, 16_000_000_000);
  assert.equal(quotas.session.remainingPercentage, 80);
  assert.equal(quotas.session.unlimited, false);
  assert.equal(
    quotas.session.resetAt,
    new Date(1_700_003_600 * 1000).toISOString(),
    "session resetAt is ISO from unix seconds"
  );

  assert.equal(quotas.weekly.used, 12_000_000_000);
  assert.equal(quotas.weekly.total, 60_000_000_000);
  assert.equal(quotas.weekly.remainingPercentage, 80);
  assert.equal(
    quotas.weekly.resetAt,
    new Date(1_700_060_400 * 1000).toISOString(),
    "weekly resetAt is ISO from unix seconds"
  );

  assert.match(String(result.plan ?? ""), /Muse Code Everyday Usage/, "plan from tier label");
  assert.equal(quotas.session.displayName?.includes("exhausted"), false);

  // Cookie sent only as header, never in the URL.
  for (const call of calls) {
    assert.equal(
      call.url.includes(FAKE_SESSION),
      false,
      "cookie must never appear in the request URL"
    );
    assert.equal(call.headers.Cookie, `llama_dev_sess=${FAKE_SESSION}`);
    assert.ok(call.signal, "fetch carries an AbortSignal (8s timeout)");
  }
  assertResultHasNoLeak(result);
});

test("string numbers parsed: non-numeric junk falls back without throwing", async () => {
  stubFetch((url) => {
    if (url === `${PORTAL}/teams`) {
      return teamsResponse([{ team_id: "team-1", team_name: "Solo" }]);
    }
    return quotaResponse({
      window_weighted_limit: "not-a-number",
      window_weighted_used: "also-junk",
    });
  });

  const result = (await getMuseUsage(undefined, {
    museConsoleSession: FAKE_SESSION,
  })) as Record<string, unknown>;
  // Junk numerics must degrade instead of fabricating a 0/0 exhausted window.
  assert.equal("quotas" in result, false, "no quotas for unrecognized payload");
  assert.match(String(result.message ?? ""), /payload unrecognized/, "degraded message");
  assertResultHasNoLeak(result);
});

test("empty or null used values degrade instead of reading as 0 used", async () => {
  for (const used of [null, "", " ", []]) {
    stubFetch((url) => {
      if (url === `${PORTAL}/teams`) {
        return teamsResponse([{ team_id: "team-1", team_name: "Solo" }]);
      }
      return quotaResponse({ window_weighted_used: used, weekly_weighted_used: used });
    });

    const result = (await getMuseUsage(undefined, {
      museConsoleSession: FAKE_SESSION,
    })) as Record<string, unknown>;
    assert.equal("quotas" in result, false, `no quotas for used=${JSON.stringify(used)}`);
    assert.match(String(result.message ?? ""), /payload unrecognized/);
  }
});

test("a Cookie header without llama_dev_sess is rejected, not sent as the session", async () => {
  for (const header of [
    "Cookie: other_session=SECRET; theme=dark",
    "other_session=SECRET; theme=dark",
    "Cookie: other_session=SECRET",
  ]) {
    const calls = stubFetch(() => teamsResponse([{ team_id: "team-1", team_name: "Solo" }]));
    const result = (await getMuseUsage(undefined, {
      museConsoleSession: header,
    })) as Record<string, unknown>;

    assert.equal(calls.length, 0, `no request for header ${JSON.stringify(header)}`);
    assert.equal("quotas" in result, false);
    assert.match(String(result.message ?? ""), /llama_dev_sess/);
    assert.equal(JSON.stringify(result).includes("SECRET"), false, "unrelated cookie not echoed");
  }
});

test("negative used values degrade instead of reporting a full quota", async () => {
  for (const field of ["window_weighted_used", "weekly_weighted_used"]) {
    stubFetch((url) => {
      if (url === `${PORTAL}/teams`) {
        return teamsResponse([{ team_id: "team-1", team_name: "Solo" }]);
      }
      return quotaResponse({ [field]: "-1" });
    });

    const result = (await getMuseUsage(undefined, {
      museConsoleSession: FAKE_SESSION,
    })) as Record<string, unknown>;
    assert.equal("quotas" in result, false, `no quotas for negative ${field}`);
    assert.match(String(result.message ?? ""), /payload unrecognized/);
  }
});

test("a non-2xx portal answer with a valid-looking body is not live quota", async () => {
  for (const failing of ["/teams", "/subscription-quota"]) {
    stubFetch((url) => {
      const ok =
        url === `${PORTAL}/teams`
          ? teamsResponse([{ team_id: "team-1", team_name: "Solo" }])
          : quotaResponse();
      return url.endsWith(failing) ? { status: 500, json: ok.json } : ok;
    });

    const result = (await getMuseUsage(undefined, {
      museConsoleSession: FAKE_SESSION,
    })) as Record<string, unknown>;
    assert.equal("quotas" in result, false, `HTTP 500 on ${failing} must not produce quotas`);
    assert.match(String(result.message ?? ""), /HTTP 500/);
    assertResultHasNoLeak(result);
  }
});

test("Cookie: single-pair header emits exactly one cookie pair", async () => {
  const calls = stubFetch((url) => {
    if (url === `${PORTAL}/teams`) {
      return teamsResponse([{ team_id: "team-1", team_name: "Solo" }]);
    }
    return quotaResponse();
  });

  const result = (await getMuseUsage(undefined, {
    museConsoleSession: `Cookie: llama_dev_sess=${FAKE_SESSION}`,
  })) as Record<string, unknown>;

  assert.equal(calls[0].headers.Cookie, `llama_dev_sess=${FAKE_SESSION}`);
  assert.ok(result.quotas, "live quotas returned");
  assertResultHasNoLeak(result);
});

test("schema-changed quota payload degrades without quotas and without leaking cookie", async () => {
  stubFetch((url) => {
    if (url === `${PORTAL}/teams`) {
      return teamsResponse([{ team_id: "team-1", team_name: "Solo" }]);
    }
    return quotaResponse({
      window_weighted_limit: "SCHEMA_CHANGED",
      window_weighted_used: "UNKNOWN",
    });
  });

  const result = (await getMuseUsage(undefined, {
    museConsoleSession: FAKE_SESSION,
  })) as Record<string, unknown>;

  assert.equal("quotas" in result, false, "no quotas when payload unrecognized");
  assert.match(String(result.message ?? ""), /payload unrecognized/, "unrecognized hint");
  assertResultHasNoLeak(result);
});

test("used > limit clamps to exhausted (remaining 0, percentage 0)", async () => {
  stubFetch((url) => {
    if (url === `${PORTAL}/teams`) {
      return teamsResponse([{ team_id: "team-1", team_name: "Solo" }]);
    }
    return quotaResponse({
      window_weighted_used: "20751196760", // > 20B limit
      weekly_weighted_used: "99999999999", // > 60B limit
    });
  });

  const result = (await getMuseUsage(undefined, {
    museConsoleSession: FAKE_SESSION,
  })) as Record<string, unknown>;

  const quotas = result.quotas as Record<string, Record<string, unknown>>;
  assert.equal(quotas.session.used, 20_000_000_000, "session used clamped to total");
  assert.equal(quotas.session.remaining, 0);
  assert.equal(quotas.session.remainingPercentage, 0);
  assert.match(
    String(quotas.session.displayName ?? result.message ?? ""),
    /exhausted/i,
    "exhaustion is indicated"
  );
  assert.equal(quotas.weekly.remaining, 0);
  assert.equal(quotas.weekly.remainingPercentage, 0);
  assertResultHasNoLeak(result);
});

test("multi-team with museTeamId selects the requested team", async () => {
  const calls = stubFetch((url) => {
    if (url === `${PORTAL}/teams`) {
      return teamsResponse([
        { team_id: "team-1", team_name: "Alpha" },
        { team_id: "team-2", team_name: "Beta" },
      ]);
    }
    if (url === `${PORTAL}/teams/team-2/subscription-quota`) return quotaResponse();
    throw new Error("team-1 quota must not be fetched");
  });

  const result = (await getMuseUsage(undefined, {
    museConsoleSession: FAKE_SESSION,
    museTeamId: "team-2",
  })) as Record<string, unknown>;

  assert.equal(calls.length, 2, "teams + one quota fetch only");
  assert.equal(calls[1].url, `${PORTAL}/teams/team-2/subscription-quota`);
  assert.ok(result.quotas, "quotas returned for the selected team");
  assertResultHasNoLeak(result);
});

test("multi-team without teamId returns an actionable hint, no hard failure", async () => {
  stubFetch((url) => {
    if (url === `${PORTAL}/teams`) {
      return teamsResponse([
        { team_id: "team-1", team_name: "Alpha" },
        { team_id: "team-2", team_name: "Beta" },
      ]);
    }
    throw new Error("quota must not be fetched without a team selection");
  });

  const result = (await getMuseUsage(undefined, {
    museConsoleSession: FAKE_SESSION,
  })) as Record<string, unknown>;

  const message = String(result.message ?? "");
  assert.match(message, /museTeamId/, "hint names the selection field");
  assert.equal("quotas" in result, false);
  assertResultHasNoLeak(result);
});

test("full Cookie header input extracts llama_dev_sess only", async () => {
  const calls = stubFetch((url) => {
    if (url === `${PORTAL}/teams`) {
      return teamsResponse([{ team_id: "team-1", team_name: "Solo" }]);
    }
    return quotaResponse();
  });

  const result = (await getMuseUsage(undefined, {
    museConsoleSession: `other=x; llama_dev_sess=${FAKE_SESSION}; theme=dark`,
  })) as Record<string, unknown>;

  assert.equal(calls[0].headers.Cookie, `llama_dev_sess=${FAKE_SESSION}`);
  assert.ok(result.quotas, "live quotas returned");
  // The companion cookies (other/theme) must not be echoed anywhere.
  const serialized = JSON.stringify(result);
  assert.equal(serialized.includes("other=x"), false);
  assertResultHasNoLeak(result);
});

test("env fallback MUSE_CONSOLE_SESSION is used when field absent", async () => {
  process.env.MUSE_CONSOLE_SESSION = FAKE_SESSION;
  const calls = stubFetch((url) => {
    if (url === `${PORTAL}/teams`) {
      return teamsResponse([{ team_id: "team-1", team_name: "Solo" }]);
    }
    return quotaResponse();
  });

  const result = (await getMuseUsage(undefined, {})) as Record<string, unknown>;
  assert.equal(calls[0].headers.Cookie, `llama_dev_sess=${FAKE_SESSION}`);
  assert.ok(result.quotas, "live quotas via env cookie");
  assertResultHasNoLeak(result);
});

test("timeout / rejected fetch degrades with a sanitized message", async () => {
  stubFetch(() => {
    throw new Error(`boom ${FAKE_SESSION}`);
  });

  const result = (await getMuseUsage(undefined, {
    museConsoleSession: FAKE_SESSION,
  })) as Record<string, unknown>;

  const message = String(result.message ?? "");
  assert.equal(message.includes(FAKE_SESSION), false, "sanitized message carries no cookie");
  assert.equal(message.includes("boom"), false, "raw upstream error is not echoed");
  assert.equal("quotas" in result, false);
  assertResultHasNoLeak(result);
});

test("cookie absent from logs, responses, and errors", async () => {
  const lines: string[] = [];
  const orig = { log: console.log, warn: console.warn, error: console.error, info: console.info };
  console.log = (...args: unknown[]) => lines.push(args.map(String).join(" "));
  console.warn = (...args: unknown[]) => lines.push(args.map(String).join(" "));
  console.error = (...args: unknown[]) => lines.push(args.map(String).join(" "));
  console.info = (...args: unknown[]) => lines.push(args.map(String).join(" "));
  try {
    stubFetch((url) => {
      if (url === `${PORTAL}/teams`) {
        return teamsResponse([{ team_id: "team-1", team_name: "Solo" }]);
      }
      return quotaResponse();
    });
    const result = await getMuseUsage(undefined, { museConsoleSession: FAKE_SESSION });
    assertResultHasNoLeak(result, lines);
  } finally {
    console.log = orig.log;
    console.warn = orig.warn;
    console.error = orig.error;
    console.info = orig.info;
  }
});
