import assert from "node:assert/strict";
import { after, test } from "node:test";
import { randomUUID } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
const dataDir = mkdtempSync(join(tmpdir(), "omni-http-accounting-"));
process.env.DATA_DIR = dataDir;
process.env.APP_LOG_TO_FILE = "false";
const core = await import("../../src/lib/db/core.ts");
const logs = await import("../../src/lib/usage/callLogs.ts");
const stats = await import("../../src/lib/db/callLogStats.ts");
const providerStats = await import("../../src/lib/db/providerStats.ts");
const auto = await import("../../src/lib/db/usageLogs.ts");
const forecast = await import("../../src/lib/db/comboForecast.ts");
const ledger = await import("../../src/lib/db/costLedger.ts");
const { buildComboHealthResponse } = await import("../../src/lib/usage/comboHealth.ts");
const history = await import("../../src/lib/usage/usageHistory.ts");
const resilience = await import("../../src/lib/usage/resilienceActionsContext.ts");
const { rowMatchesFilter } = await import("../../src/app/api/usage/call-logs/route.ts");
after(async () => {
  history.clearPendingRequests();
  await logs.closeCallLogSaves();
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
});
type Summary = import("../../src/shared/utils/upstreamHttp.ts").UpstreamHttpSummary;
function summary(
  status: number | null = 403,
  outcome: "response" | "transport_error" | "no_response_observed" = "response"
): Summary {
  return {
    version: 1,
    groupId: randomUUID(),
    role: "attempt",
    send: {
      id: randomUUID(),
      ordinal: 1,
      provider: "openai",
      model: "test-model",
      connectionId: null,
      method: "POST",
      endpoint: "chat_completions",
      startedAt: 1000,
      endedAt: outcome === "no_response_observed" ? null : 2000,
      cutoffAt: outcome === "no_response_observed" ? 2000 : null,
      durationMs: status ? 1000 : null,
      status,
      outcome,
      retryReason: "unknown",
    },
  };
}
async function metadata(upstreamHttp = summary(), extra = {}) {
  await logs.saveUpstreamHttpAttempt({
    timestamp: "2026-11-01T01:00:00Z",
    method: "POST",
    path: "chat_completions",
    status: upstreamHttp.send?.status ?? 0,
    model: "test-model",
    provider: "openai",
    connectionId: null,
    duration: 1,
    error: null,
    correlationId: "accounting-call",
    noLog: false,
    upstreamHttp,
    ...extra,
  });
}

test("wire rows do not change logical statistics, correlated last statuses or ledger charges", async () => {
  const db = core.getDbInstance();
  const stamp = "2026-11-01T00:00:00Z";
  db.prepare(
    "INSERT INTO provider_connections (id, provider, created_at, updated_at) VALUES (?, ?, ?, ?)"
  ).run("account", "openai", stamp, stamp);
  for (const [index, status, requestType] of [
    [0, 200, null],
    [1, 502, "legacy-chat"],
  ] as const) {
    await logs.saveCallLog({
      status,
      requestType,
      timestamp: `2026-11-01T00:00:0${index}Z`,
      provider: "openai",
      model: "test-model",
      requestedModel: "auto",
      duration: 20,
      correlationId: "accounting-call",
      comboName: "combo",
      comboStepId: "step",
      comboExecutionKey: "execution",
      sessionTag: "session",
    });
  }
  ledger.recordLedgerEntry({
    apiKeyId: "fixture",
    provider: "openai",
    model: "test-model",
    amountUsd: 0.25,
    requestId: "accounting-call",
  });
  const snapshot = () => ({
    metrics: stats.getProviderMetrics(),
    usage: stats.getProviderUsageSince("2026-01-01"),
    providers: providerStats.getProviderCallStats("2026-01-01"),
    models: providerStats.getModelCallStats("2026-01-01"),
    auto: [
      auto.getAutoRoutingTotalCount(),
      auto.getAutoRoutingVariantBreakdown(),
      auto.getAutoRoutingTopProviders(),
    ],
    forecast: forecast.getComboForecastUsageRows({ since: "2026-01-01" }),
    fallback: stats.getFallbackStats("WHERE provider = 'openai' OR provider = 'other'", {}),
    errors: stats.getErrorTypeBreakdown("", {}),
    cost: ledger.getCostBySessionTag("session"),
  });
  const health = () =>
    buildComboHealthResponse({
      range: "24h",
      now: Date.parse("2026-11-01T01:30:00Z"),
      combos: [
        {
          id: "combo",
          name: "combo",
          strategy: "priority",
          models: [{ kind: "model", model: "openai/test-model", id: "step" }],
        },
      ],
    });
  const { buildProviderHealthMatrix } =
    await import("../../src/lib/monitoring/providerHealthMatrix.ts");
  const matrixSnapshot = async () => {
    const report = await buildProviderHealthMatrix({ provider: "openai", range: "30d" });
    return report.providers.map((provider) => ({
      requests: provider.requests,
      accounts: provider.accounts.map((account) =>
        account.models.map((model) => ({
          requests: model.requests,
          lastStatus: model.lastStatus,
          lastErrorStatus: model.lastErrorStatus,
          successRate: model.successRate,
          status: model.status,
        }))
      ),
    }));
  };
  const before = snapshot();
  const healthBefore = await health();
  const matrixBefore = await matrixSnapshot();
  await metadata();
  await metadata(summary(200));
  db.prepare(
    "UPDATE call_logs SET session_tag = 'session', requested_model = 'auto', combo_name = CASE WHEN status = 403 THEN 'combo' ELSE NULL END, combo_step_id = 'step', combo_execution_key = 'execution' WHERE request_type = 'upstream_http_attempt'"
  ).run();
  core.resetDbInstance();
  assert.deepEqual(await matrixSnapshot(), matrixBefore);
  assert.deepEqual(snapshot(), before);
  assert.deepEqual(await health(), healthBefore);
  assert.equal((await logs.getCallLogs({ limit: 100 })).length, 4);
});

test("metadata writer leaves pending usage and final resilience untouched and creates no artifacts", async () => {
  const id = history.trackPendingRequest("test-model", "openai", "account", true);
  history.updateRequestTokensById(id, { in: 41, out: 7 });
  await resilience.runWithResilienceActionsContext(async () => {
    resilience.noteResilienceAction({ rotations: 2, continued: 1 });
    const before = resilience.readResilienceActions();
    await metadata(summary(null, "transport_error"), {
      correlationId: "neutrality",
      error: "Upstream transport error",
    });
    assert.deepEqual(resilience.readResilienceActions(), before);
    assert.deepEqual(history.getPendingById().get(id)?.tokens, { in: 41, out: 7 });
    await logs.saveCallLog({
      status: 200,
      provider: "openai",
      model: "test-model",
      correlationId: "neutrality",
      pendingRequestId: id,
      tokens: { input_tokens: 45, output_tokens: 9 },
    });
  });
  const rows = await logs.getCallLogs({ correlationId: "neutrality" });
  const wire = rows.find((row) => row.requestType === "upstream_http_attempt");
  const final = rows.find((row) => row.requestType !== "upstream_http_attempt");
  assert.equal(wire?.detailState, "none");
  assert.equal(wire?.resilienceActions, null);
  assert.deepEqual(final?.resilienceActions, { rotations: 2, continued: 1 });
  assert.deepEqual(history.getPendingById().get(id)?.tokens, {
    in: 45,
    out: 9,
    cacheRead: null,
    cacheCreation: null,
    reasoning: null,
    compressed: null,
  });
});

test("validated summaries merge search members, reject unknown payloads and respect noLog", async () => {
  const send = summary().send;
  const upstreamHttp = {
    version: 1,
    groupId: randomUUID(),
    role: "logical",
    send,
    total: 1,
    failed: 1,
    omitted: 0,
    logicalOutcome: "failure",
    headers: { authorization: "SECRET_CANARY" },
  };
  await logs.saveCallLog({
    status: 502,
    requestType: "search",
    requestBody: { query: "retained search" },
    upstreamHttp,
    correlationId: "summary-merge",
  });
  await logs.saveCallLog({
    status: 502,
    upstreamHttp: { ...upstreamHttp, version: 2 },
    correlationId: "invalid-summary",
  });
  await logs.saveCallLog({
    status: 502,
    upstreamHttp,
    noLog: true,
    correlationId: "nolog-summary",
  });
  const [merged] = await logs.getCallLogs({ correlationId: "summary-merge" });
  assert.equal((merged.requestSummary as { query: string }).query, "retained search");
  assert.ok(merged.upstreamHttp);
  assert.doesNotMatch(JSON.stringify(merged.requestSummary), /SECRET_CANARY|authorization/);
  const detail = await logs.getCallLogById(merged.id);
  assert.deepEqual(detail?.upstreamHttp, merged.upstreamHttp);
  assert.equal(
    (await logs.getCallLogs({ correlationId: "invalid-summary" }))[0].upstreamHttp,
    null
  );
  assert.equal(
    (await logs.getCallLogs({ correlationId: "nolog-summary" }))[0].requestSummary,
    null
  );
});

test("server and browser filters agree on settled transport and unknown no-response with noLog", async () => {
  await metadata(summary(null, "transport_error"), {
    correlationId: "transport-nolog",
    noLog: true,
    error: "Upstream transport error",
  });
  await metadata(summary(null, "no_response_observed"), {
    correlationId: "cutoff-nolog",
    noLog: true,
    error: "No HTTP response observed",
  });
  const errors = await logs.getCallLogs({ status: "error", limit: 100 });
  const [transport] = await logs.getCallLogs({ correlationId: "transport-nolog" });
  const [cutoff] = await logs.getCallLogs({ correlationId: "cutoff-nolog" });
  assert.equal(transport.upstreamHttp, null);
  assert.equal(cutoff.upstreamHttp, null);
  assert.equal(
    errors.some((row) => row.id === transport.id),
    true
  );
  assert.equal(
    errors.some((row) => row.id === cutoff.id),
    false
  );
  assert.equal(rowMatchesFilter(transport, { status: "error" }), true);
  assert.equal(rowMatchesFilter(cutoff, { status: "error" }), false);
});

test("health, failure-family attribution and canonical links use only logical rows", async () => {
  const { buildProviderHealthMatrix } =
    await import("../../src/lib/monitoring/providerHealthMatrix.ts");
  const { resolveCallLogIdsByCorrelationIds } =
    await import("../../src/lib/db/agenticConversations.ts");
  const { getPoolEgressFailureBreakdown } = await import("../../src/lib/db/proxyLogs.ts");
  const proxies = await import("../../src/lib/db/proxies.ts");
  const db = core.getDbInstance();
  const now = Date.now();
  const stamp = new Date(now).toISOString();
  const insert = db.prepare(
    "INSERT INTO call_logs (id, timestamp, method, path, status, model, provider, correlation_id, request_type, error_type) VALUES (?, ?, 'POST', '/v1/chat/completions', ?, 'health-model', 'feature-health', ?, ?, ?)"
  );
  for (const [id, status, cid, type, family, delta] of [
    ["health-wire", 403, "canonical-known", "upstream_http_attempt", "quota_exhausted", 5000],
    ["health-logical", 200, "canonical-known", null, "server_error", 0],
    ["health-legacy", 502, "canonical-legacy", "legacy-chat", "legacy_error", 1000],
    [
      "health-wire-only",
      500,
      "canonical-wire-only",
      "upstream_http_attempt",
      "upstream_error",
      6000,
    ],
  ] as const)
    insert.run(id, new Date(now + delta).toISOString(), status, cid, type, family);
  const proxy = await proxies.createProxy({
    name: "HTTP observation fixture",
    type: "http",
    host: "10.99.0.1",
    port: 35999,
  });
  await proxies.addProxyToScopePool("provider", "feature-health", proxy.id);
  for (const cid of ["canonical-known", "canonical-legacy", "canonical-wire-only"]) {
    db.prepare(
      "INSERT INTO proxy_logs (id, timestamp, status, proxy_type, proxy_host, proxy_port, level, connection_id, egress_ip, correlation_id) VALUES (?, ?, 'error', 'http', '10.99.0.1', 35999, 'provider', 'account', '203.0.113.99', ?)"
    ).run(randomUUID(), stamp, cid);
  }
  const report = await buildProviderHealthMatrix({ provider: "feature-health", range: "1h" });
  const model = report.providers[0]?.accounts[0]?.models[0];
  assert.deepEqual(
    {
      requests: model?.requests,
      lastStatus: model?.lastStatus,
      links: [
        ...resolveCallLogIdsByCorrelationIds([
          "canonical-known",
          "canonical-legacy",
          "canonical-wire-only",
        ]),
      ],
      families: getPoolEgressFailureBreakdown(
        "provider",
        "feature-health",
        new Date(now - 1000).toISOString()
      ).byFamily,
    },
    {
      requests: 2,
      lastStatus: 502,
      links: [
        ["canonical-known", "health-logical"],
        ["canonical-legacy", "health-legacy"],
      ],
      families: [
        { family: "legacy_error", count: 1 },
        { family: "server_error", count: 1 },
        { family: "unattributed", count: 1 },
      ],
    }
  );
});
