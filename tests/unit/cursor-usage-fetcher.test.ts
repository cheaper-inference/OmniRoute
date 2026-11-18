import test from "node:test";
import assert from "node:assert/strict";

const usageService = await import("../../open-sse/services/usage.ts");

const CURSOR_PERIOD_URL =
  "https://api2.cursor.sh/aiserver.v1.DashboardService/GetCurrentPeriodUsage";
const CURSOR_SUMMARY_URL = "https://api2.cursor.sh/api/usage/summary";
const CURSOR_AUTH_USAGE_URL = "https://api2.cursor.sh/auth/usage";
const CURSOR_COOKIE_USAGE_URL = "https://cursor.com/api/dashboard/get-current-period-usage";
const CURSOR_AGGREGATED_URL =
  "https://api2.cursor.sh/aiserver.v1.DashboardService/GetAggregatedUsageEvents";

function makeJwt(payload: Record<string, unknown>): string {
  const b64url = (input: string) =>
    Buffer.from(input)
      .toString("base64")
      .replace(/=+$/, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = b64url(JSON.stringify(payload));
  return `${header}.${body}.signature`;
}

const SAMPLE_RESPONSE = {
  billingCycleStart: "1776672371000",
  billingCycleEnd: "1779264371000",
  planUsage: {
    totalSpend: 1529,
    includedSpend: 1529,
    remaining: 471,
    limit: 2000,
    autoPercentUsed: 13.20952380952381,
    apiPercentUsed: 3.155555555555556,
    totalPercentUsed: 10.193333333333333,
  },
  spendLimitUsage: { limitType: "user" },
  enabled: true,
};

interface CapturedRequest {
  url: string;
  init: RequestInit;
}

function installFetchMock(
  responder: (url: string, init: RequestInit) => Response | Promise<Response>
): { restore: () => void; calls: CapturedRequest[] } {
  const calls: CapturedRequest[] = [];
  const original = globalThis.fetch;
  globalThis.fetch = (async (input: any, init: RequestInit = {}) => {
    const url = typeof input === "string" ? input : (input as Request).url;
    calls.push({ url, init });
    return await responder(url, init);
  }) as typeof fetch;
  return {
    restore: () => {
      globalThis.fetch = original;
    },
    calls,
  };
}

function assertThreeWindows(usage: {
  plan?: string;
  quotas?: Record<
    string,
    {
      total: number;
      used: number;
      remaining: number;
      remainingPercentage?: number;
      unlimited: boolean;
      resetAt: string | null;
    }
  >;
}) {
  assert.equal(usage.plan, "Cursor Pro");
  assert.ok(usage.quotas);
  assert.deepEqual(Object.keys(usage.quotas!), ["Total", "Auto + Composer", "API"]);

  const total = usage.quotas!.Total;
  assert.equal(total.total, 20);
  assert.equal(total.used, 15.29);
  assert.equal(total.remaining, 4.71);
  assert.ok(Math.abs((total.remainingPercentage ?? 0) - (100 - 10.193333333333333)) < 1e-6);
  assert.equal(total.unlimited, false);
  assert.equal(total.resetAt, new Date(Number("1779264371000")).toISOString());

  const auto = usage.quotas!["Auto + Composer"];
  assert.equal(auto.total, 20);
  assert.equal(auto.used, 2.64);
  assert.ok(Math.abs((auto.remainingPercentage ?? 0) - (100 - 13.20952380952381)) < 1e-6);

  const api = usage.quotas!.API;
  assert.equal(api.total, 20);
  assert.equal(api.used, 0.63);
  assert.ok(Math.abs((api.remainingPercentage ?? 0) - (100 - 3.155555555555556)) < 1e-6);
}

test("cursor usage: Bearer period-usage happy path returns three windows", async () => {
  const accessToken = makeJwt({ sub: "user_01BEARER" });

  const mock = installFetchMock(async (url) => {
    if (url === CURSOR_PERIOD_URL) {
      return new Response(JSON.stringify(SAMPLE_RESPONSE), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response("unexpected", { status: 500 });
  });

  try {
    const usage = await usageService.getUsageForProvider({
      provider: "cursor",
      accessToken,
      providerSpecificData: {},
    });
    assertThreeWindows(usage);
    // Period usage + the fail-open per-model aggregate call (500 here → no table).
    assert.equal(mock.calls.length, 2);
    assert.equal(mock.calls[0].url, CURSOR_PERIOD_URL);
    assert.equal(mock.calls[1].url, CURSOR_AGGREGATED_URL);
    assert.equal(usage.modelUsage, undefined);
    const headers = mock.calls[0].init.headers as Record<string, string>;
    assert.equal(headers.Authorization, `Bearer ${accessToken}`);
    assert.equal(headers["Connect-Protocol-Version"], "1");
    assert.equal(mock.calls[0].init.method, "POST");
  } finally {
    mock.restore();
  }
});

test("cursor usage: falls back to summary when period-usage fails", async () => {
  const accessToken = makeJwt({ sub: "user_01SUMMARY" });
  const summaryBody = {
    billingCycleEnd: "1779264371000",
    individualUsage: {
      plan: { used: 1529, limit: 2000, totalPercentUsed: 10.193333333333333 },
    },
  };

  const mock = installFetchMock(async (url) => {
    if (url === CURSOR_PERIOD_URL) return new Response("nope", { status: 401 });
    if (url === CURSOR_SUMMARY_URL) {
      return new Response(JSON.stringify(summaryBody), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response("unexpected", { status: 500 });
  });

  try {
    const usage = await usageService.getUsageForProvider({
      provider: "cursor",
      accessToken,
    });
    assert.equal(usage.plan, "Cursor Pro");
    assert.ok(usage.quotas?.Total);
    assert.equal(usage.quotas!.Total.total, 20);
    assert.deepEqual(
      mock.calls.map((c) => c.url),
      [CURSOR_PERIOD_URL, CURSOR_SUMMARY_URL]
    );
    const headers = mock.calls[1].init.headers as Record<string, string>;
    assert.equal(headers.Authorization, `Bearer ${accessToken}`);
  } finally {
    mock.restore();
  }
});

test("cursor usage: falls back to auth/usage when period and summary fail", async () => {
  const accessToken = makeJwt({ sub: "user_01AUTHUSAGE" });
  const authBody = {
    startOfMonth: "1776672371000",
    "gpt-4": { numRequests: 40, maxRequestUsage: 500 },
  };

  const mock = installFetchMock(async (url) => {
    if (url === CURSOR_PERIOD_URL || url === CURSOR_SUMMARY_URL) {
      return new Response("fail", { status: 503 });
    }
    if (url === CURSOR_AUTH_USAGE_URL) {
      return new Response(JSON.stringify(authBody), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response("unexpected", { status: 500 });
  });

  try {
    const usage = await usageService.getUsageForProvider({
      provider: "cursor",
      accessToken,
    });
    assert.equal(usage.plan, "Cursor Pro");
    assert.equal(usage.quotas?.Total.used, 40);
    assert.equal(usage.quotas?.Total.total, 500);
    assert.equal(usage.quotas?.Total.remaining, 460);
    assert.ok(!JSON.stringify(usage).includes(accessToken));
  } finally {
    mock.restore();
  }
});

test("cursor usage: cookie dashboard is last fallback after Bearer APIs fail", async () => {
  const userId = "user_01COOKIE";
  const accessToken = makeJwt({ sub: userId });

  const mock = installFetchMock(async (url) => {
    if (url === CURSOR_PERIOD_URL || url === CURSOR_SUMMARY_URL || url === CURSOR_AUTH_USAGE_URL) {
      return new Response("fail", { status: 401 });
    }
    if (url === CURSOR_COOKIE_USAGE_URL) {
      return new Response(JSON.stringify(SAMPLE_RESPONSE), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response("unexpected", { status: 500 });
  });

  try {
    const usage = await usageService.getUsageForProvider({
      provider: "cursor",
      accessToken,
      providerSpecificData: { userId },
    });
    assertThreeWindows(usage);
    assert.equal(mock.calls.length, 4);
    assert.equal(mock.calls[3].url, CURSOR_COOKIE_USAGE_URL);
    const headers = mock.calls[3].init.headers as Record<string, string>;
    assert.equal(headers.Cookie, `WorkosCursorSessionToken=${userId}::${accessToken}`);
    assert.equal(headers.Origin, "https://cursor.com");
  } finally {
    mock.restore();
  }
});

test("cursor usage: JWT sub used for cookie fallback when providerSpecificData.userId missing", async () => {
  const userId = "user_01JWTFALLBACK";
  const accessToken = makeJwt({ sub: `google-oauth2|${userId}` });

  const mock = installFetchMock(async (url) => {
    if (url === CURSOR_PERIOD_URL || url === CURSOR_SUMMARY_URL || url === CURSOR_AUTH_USAGE_URL) {
      return new Response("fail", { status: 500 });
    }
    if (url === CURSOR_COOKIE_USAGE_URL) {
      return new Response(JSON.stringify(SAMPLE_RESPONSE), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response("unexpected", { status: 500 });
  });

  try {
    const usage = await usageService.getUsageForProvider({
      provider: "cursor",
      accessToken,
      providerSpecificData: {},
    });
    assert.equal(usage.plan, "Cursor Pro");
    const headers = mock.calls[3].init.headers as Record<string, string>;
    assert.equal(
      headers.Cookie,
      `WorkosCursorSessionToken=google-oauth2|${userId}::${accessToken}`
    );
  } finally {
    mock.restore();
  }
});

test("cursor usage: Bearer-only token without userId still works via period API", async () => {
  const accessToken = "not-a-jwt-and-too-short-but-usable-as-bearer";
  const mock = installFetchMock(async (url) => {
    if (url === CURSOR_PERIOD_URL) {
      return new Response(JSON.stringify(SAMPLE_RESPONSE), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response("unexpected", { status: 500 });
  });

  try {
    const usage = await usageService.getUsageForProvider({
      provider: "cursor",
      accessToken,
      providerSpecificData: {},
    });
    assertThreeWindows(usage);
    assert.equal(mock.calls.length, 2);
    assert.equal(mock.calls[1].url, CURSOR_AGGREGATED_URL);
  } finally {
    mock.restore();
  }
});

test("cursor usage: all Bearer fail and no userId returns reauth message without cookie call", async () => {
  const mock = installFetchMock(async () => new Response("fail", { status: 401 }));

  try {
    const usage = await usageService.getUsageForProvider({
      provider: "cursor",
      accessToken: "not-a-jwt",
      providerSpecificData: {},
    });
    assert.equal(mock.calls.length, 3);
    assert.match(usage.message ?? "", /Login \(PKCE\)|re-import/i);
    assert.equal(usage.quotas, undefined);
    assert.ok(!JSON.stringify(usage).includes("not-a-jwt"));
  } finally {
    mock.restore();
  }
});

test("cursor usage: cookie 307 redirect surfaces expired session with PKCE hint", async () => {
  const accessToken = makeJwt({ sub: "user_01EXPIRED" });
  const mock = installFetchMock(async (url) => {
    if (url === CURSOR_PERIOD_URL || url === CURSOR_SUMMARY_URL || url === CURSOR_AUTH_USAGE_URL) {
      return new Response("fail", { status: 401 });
    }
    return new Response("", {
      status: 307,
      headers: { Location: "https://api.workos.com/user_management/authorize?..." },
    });
  });

  try {
    const usage = await usageService.getUsageForProvider({
      provider: "cursor",
      accessToken,
      providerSpecificData: { userId: "user_01EXPIRED" },
    });
    assert.equal(usage.plan, "Cursor");
    assert.match(usage.message ?? "", /session expired/i);
    assert.match(usage.message ?? "", /Login \(PKCE\)|re-import/i);
  } finally {
    mock.restore();
  }
});

test("cursor usage: empty planUsage on period falls through to cookie empty message", async () => {
  const accessToken = makeJwt({ sub: "user_01EMPTY" });
  const mock = installFetchMock(async (url) => {
    if (url === CURSOR_PERIOD_URL) {
      return new Response(
        JSON.stringify({ billingCycleStart: "0", billingCycleEnd: "0", planUsage: {} }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    if (url === CURSOR_SUMMARY_URL || url === CURSOR_AUTH_USAGE_URL) {
      return new Response("fail", { status: 404 });
    }
    if (url === CURSOR_COOKIE_USAGE_URL) {
      return new Response(
        JSON.stringify({ billingCycleStart: "0", billingCycleEnd: "0", planUsage: {} }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    return new Response("unexpected", { status: 500 });
  });

  try {
    const usage = await usageService.getUsageForProvider({
      provider: "cursor",
      accessToken,
      providerSpecificData: { userId: "user_01EMPTY" },
    });
    assert.equal(usage.plan, "Cursor");
    assert.match(usage.message ?? "", /No active plan usage/i);
  } finally {
    mock.restore();
  }
});

const AGGREGATED_RESPONSE = {
  aggregations: [
    {
      modelIntent: "claude-4.6-sonnet-medium-thinking",
      inputTokens: "1000",
      outputTokens: "500",
      cacheReadTokens: "2000",
      cacheWriteTokens: "100",
      totalCents: 50.5,
      tier: 1,
    },
    {
      modelIntent: "  composer-2.5  ",
      inputTokens: "4861279",
      outputTokens: "726233",
      cacheReadTokens: "87013884",
      cacheWriteTokens: "0",
      totalCents: 2167.68593,
      tier: 2,
    },
    { inputTokens: "10", totalCents: 99999 },
    { modelIntent: "   ", totalCents: 1 },
    null,
    "garbage",
  ],
};

test("cursor usage: mapAggregatedUsageEvents parses token strings and billed cents", async () => {
  const { mapAggregatedUsageEvents } = await import("../../open-sse/services/usage/cursor.ts");
  const rows = mapAggregatedUsageEvents(AGGREGATED_RESPONSE);
  assert.deepEqual(rows, [
    {
      model: "composer-2.5",
      inputTokens: 4861279,
      outputTokens: 726233,
      cacheReadTokens: 87013884,
      cacheWriteTokens: 0,
      costUsd: 21.6769,
    },
    {
      model: "claude-4.6-sonnet-medium-thinking",
      inputTokens: 1000,
      outputTokens: 500,
      cacheReadTokens: 2000,
      cacheWriteTokens: 100,
      costUsd: 0.505,
    },
  ]);
});

test("cursor usage: mapAggregatedUsageEvents tolerates malformed payloads", async () => {
  const { mapAggregatedUsageEvents } = await import("../../open-sse/services/usage/cursor.ts");
  assert.deepEqual(mapAggregatedUsageEvents({}), []);
  assert.deepEqual(mapAggregatedUsageEvents(null), []);
  assert.deepEqual(mapAggregatedUsageEvents({ aggregations: "nope" }), []);
  const [row] = mapAggregatedUsageEvents({
    aggregations: [
      {
        modelIntent: "gpt-5",
        inputTokens: "-5",
        outputTokens: "abc",
        cacheReadTokens: 12.9,
        totalCents: "not-a-number",
      },
    ],
  });
  assert.deepEqual(row, {
    model: "gpt-5",
    inputTokens: 0,
    outputTokens: 0,
    cacheReadTokens: 12,
    cacheWriteTokens: 0,
    costUsd: 0,
  });
});

test("cursor usage: mapAggregatedUsageEvents caps the number of rows", async () => {
  const { mapAggregatedUsageEvents } = await import("../../open-sse/services/usage/cursor.ts");
  const aggregations = Array.from({ length: 80 }, (_, i) => ({
    modelIntent: `model-${String(i).padStart(2, "0")}`,
    totalCents: i,
  }));
  const rows = mapAggregatedUsageEvents({ aggregations });
  assert.equal(rows.length, 50);
  assert.equal(rows[0].model, "model-79");
});

test("cursor usage: period OK + aggregated OK returns quotas and per-model usage", async () => {
  const accessToken = makeJwt({ sub: "user_01AGG" });
  const mock = installFetchMock(async (url) => {
    if (url === CURSOR_PERIOD_URL) {
      return new Response(JSON.stringify(SAMPLE_RESPONSE), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (url === CURSOR_AGGREGATED_URL) {
      return new Response(JSON.stringify(AGGREGATED_RESPONSE), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response("unexpected", { status: 500 });
  });

  try {
    const usage = await usageService.getUsageForProvider({
      provider: "cursor",
      accessToken,
      providerSpecificData: {},
    });
    assertThreeWindows(usage);
    assert.equal(usage.message, undefined);
    assert.deepEqual(
      usage.modelUsage?.map((row: { model: string; costUsd: number }) => [row.model, row.costUsd]),
      [
        ["composer-2.5", 21.6769],
        ["claude-4.6-sonnet-medium-thinking", 0.505],
      ]
    );
    assert.deepEqual(
      mock.calls.map((c) => c.url),
      [CURSOR_PERIOD_URL, CURSOR_AGGREGATED_URL]
    );
    const aggregateCall = mock.calls[1];
    const headers = aggregateCall.init.headers as Record<string, string>;
    assert.equal(aggregateCall.init.method, "POST");
    assert.equal(aggregateCall.init.body, "{}");
    assert.equal(headers.Authorization, `Bearer ${accessToken}`);
    assert.equal(headers["Connect-Protocol-Version"], "1");
    assert.equal(headers["Content-Type"], "application/json");
  } finally {
    mock.restore();
  }
});

for (const [label, aggregateResponder] of [
  ["HTTP 500", () => new Response(JSON.stringify({ error: "unavailable" }), { status: 500 })],
  [
    "network error",
    () => {
      throw new TypeError("fetch failed");
    },
  ],
  ["non-JSON body", () => new Response("<html>oops</html>", { status: 200 })],
  [
    "empty aggregations",
    () =>
      new Response(JSON.stringify({ aggregations: [] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
  ],
] as const) {
  test(`cursor usage: aggregated ${label} is fail-open (quotas unchanged, no table)`, async () => {
    const accessToken = makeJwt({ sub: "user_01FAILOPEN" });
    const mock = installFetchMock(async (url) => {
      if (url === CURSOR_PERIOD_URL) {
        return new Response(JSON.stringify(SAMPLE_RESPONSE), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }
      if (url === CURSOR_AGGREGATED_URL) return aggregateResponder();
      return new Response("unexpected", { status: 500 });
    });

    try {
      const usage = await usageService.getUsageForProvider({
        provider: "cursor",
        accessToken,
        providerSpecificData: {},
      });
      assertThreeWindows(usage);
      assert.equal(usage.message, undefined);
      assert.equal(usage.modelUsage, undefined);
      assert.ok(!("modelUsage" in usage));
      assert.deepEqual(
        mock.calls.map((c) => c.url),
        [CURSOR_PERIOD_URL, CURSOR_AGGREGATED_URL]
      );
    } finally {
      mock.restore();
    }
  });
}

test("cursor usage: aggregated usage is not requested on the fallback paths", async () => {
  const accessToken = makeJwt({ sub: "user_01NOAGG" });
  const summaryBody = {
    billingCycleEnd: "1779264371000",
    individualUsage: {
      plan: { used: 1529, limit: 2000, totalPercentUsed: 10.193333333333333 },
    },
  };
  const mock = installFetchMock(async (url) => {
    if (url === CURSOR_PERIOD_URL) return new Response("nope", { status: 401 });
    if (url === CURSOR_SUMMARY_URL) {
      return new Response(JSON.stringify(summaryBody), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response("unexpected", { status: 500 });
  });

  try {
    const usage = await usageService.getUsageForProvider({
      provider: "cursor",
      accessToken,
    });
    assert.ok(usage.quotas?.Total);
    assert.equal(usage.modelUsage, undefined);
    assert.ok(!mock.calls.some((c) => c.url === CURSOR_AGGREGATED_URL));
  } finally {
    mock.restore();
  }
});
