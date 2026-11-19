/**
 * Opt-in Prometheus scrape endpoint (OMNIROUTE_PROMETHEUS_METRICS, default off): request
 * latency, time to first token and upstream retries as histograms, with a bounded label set.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-prom-metrics-"));
process.env.DATA_DIR = dir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.OMNIROUTE_PROMETHEUS_METRICS;
const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const metrics = await import("../../src/lib/metrics/prometheus.ts");
const route = await import("../../src/app/api/metrics/route.ts");

const URL = "http://localhost:20128/api/metrics";
const row = (over: Record<string, unknown> = {}) => ({
  provider: "openai",
  model: "gpt-x",
  status: 200,
  duration: 1500,
  ...over,
});
const line = (text: string, start: string) => text.split("\n").find((l) => l.startsWith(start));

test.beforeEach(() => {
  delete process.env.OMNIROUTE_PROMETHEUS_METRICS;
  metrics.resetMetricsForTests();
});
test.after(async () => {
  await callLogs.closeCallLogSaves();
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});

test("off by default: nothing is recorded and the endpoint answers 404", async () => {
  metrics.recordRequestMetrics(row());
  assert.equal(metrics.renderMetrics(), "");
  const res = await route.GET(await makeManagementSessionRequest(URL));
  assert.equal(res.status, 404);
});

test("on: a request lands in the latency histogram with cumulative buckets", () => {
  process.env.OMNIROUTE_PROMETHEUS_METRICS = "true";
  metrics.recordRequestMetrics(row({ duration: 1500 }));
  metrics.recordRequestMetrics(row({ duration: 300 }));
  const text = metrics.renderMetrics();
  const base =
    'omniroute_request_duration_seconds_bucket{provider="openai",model="gpt-x",status_class="2xx",le=';
  assert.match(text, /# TYPE omniroute_request_duration_seconds histogram/);
  assert.match(line(text, `${base}"0.25"}`) ?? "", / 0$/);
  assert.match(line(text, `${base}"0.5"}`) ?? "", / 1$/);
  assert.match(line(text, `${base}"2.5"}`) ?? "", / 2$/);
  assert.match(line(text, `${base}"900"}`) ?? "", / 2$/);
  assert.match(line(text, `${base}"+Inf"}`) ?? "", / 2$/);
  assert.match(text, /omniroute_request_duration_seconds_sum\{[^}]*\} 1\.8\n/);
  assert.match(text, /omniroute_request_duration_seconds_count\{[^}]*\} 2\n/);
});

test("TTFT is recorded only when measured, and retries come from the upstream attempt count", () => {
  process.env.OMNIROUTE_PROMETHEUS_METRICS = "true";
  metrics.recordRequestMetrics(row({ ttftMs: 250, upstreamHttp: { total: 3 } }));
  metrics.recordRequestMetrics(row());
  const text = metrics.renderMetrics();
  assert.match(text, /omniroute_ttft_seconds_count\{[^}]*\} 1\n/);
  assert.match(text, /omniroute_request_retries_count\{[^}]*\} 2\n/);
  assert.match(text, /omniroute_request_retries_sum\{[^}]*\} 2\n/);
  assert.match(text, /omniroute_request_duration_seconds_count\{[^}]*\} 2\n/);
});

test("status maps to a class label; an odd status does not break the output", () => {
  process.env.OMNIROUTE_PROMETHEUS_METRICS = "true";
  metrics.recordRequestMetrics(row({ status: 429 }));
  metrics.recordRequestMetrics(row({ status: 503 }));
  metrics.recordRequestMetrics(row({ status: 0 }));
  const text = metrics.renderMetrics();
  assert.match(text, /status_class="4xx"/);
  assert.match(text, /status_class="5xx"/);
  assert.match(text, /status_class="other"/);
});

test("label values are escaped and capped in length", () => {
  process.env.OMNIROUTE_PROMETHEUS_METRICS = "true";
  metrics.recordRequestMetrics(row({ model: 'a"b\\c\nd' + "z".repeat(200) }));
  const text = metrics.renderMetrics();
  assert.match(text, /model="a\\"b\\\\c\\nd/);
  assert.ok(!/z{100}/.test(text), "long model names are cut");
});

test("distinct label sets are bounded: the overflow folds into one 'other' series", () => {
  process.env.OMNIROUTE_PROMETHEUS_METRICS = "true";
  for (let i = 0; i < 700; i += 1) metrics.recordRequestMetrics(row({ model: `m-${i}` }));
  const text = metrics.renderMetrics();
  const series = text
    .split("\n")
    .filter((l) => l.startsWith("omniroute_request_duration_seconds_count{"));
  assert.ok(series.length <= 501, `series ${series.length}`);
  assert.ok(series.some((l) => l.includes('model="other"')));
  const total = series.reduce((n, l) => n + Number(l.split(" ").pop()), 0);
  assert.equal(total, 700);
});

test("the overflow stays bounded when providers and status classes vary too", () => {
  process.env.OMNIROUTE_PROMETHEUS_METRICS = "true";
  const statuses = [200, 302, 404, 503, 0];
  for (let i = 0; i < 700; i += 1) {
    for (const status of statuses) {
      metrics.recordRequestMetrics(row({ provider: `p-${i}`, model: "m", status }));
    }
  }
  const series = metrics
    .renderMetrics()
    .split("\n")
    .filter((l) => l.startsWith("omniroute_request_duration_seconds_count{"));
  assert.ok(series.length <= 500 + statuses.length, `series ${series.length}`);
  assert.ok(series.some((l) => l.includes('provider="other",model="other"')));
  const total = series.reduce((n, l) => n + Number(l.split(" ").pop()), 0);
  assert.equal(total, 700 * statuses.length);
});

test("saveCallLog feeds the metrics once, and skips upstream attempt rows", async () => {
  process.env.OMNIROUTE_PROMETHEUS_METRICS = "true";
  await callLogs.saveCallLog(row({ duration: 900, ttftMs: 120, upstreamHttp: { total: 2 } }));
  await callLogs.saveUpstreamHttpAttempt({
    timestamp: new Date().toISOString(),
    method: "POST",
    path: "chat_completions",
    status: 500,
    model: "gpt-x",
    provider: "openai",
    connectionId: null,
    duration: 50,
    error: null,
    correlationId: "c-1",
    noLog: false,
    upstreamHttp: {
      version: 1,
      groupId: "00000000-0000-4000-8000-000000000000",
      role: "attempt",
    } as never,
  });
  const text = metrics.renderMetrics();
  assert.match(text, /omniroute_request_duration_seconds_count\{[^}]*\} 1\n/);
  assert.match(text, /omniroute_request_retries_sum\{[^}]*\} 1\n/);
});

test("endpoint: management caller gets the text format, anonymous caller is refused", async () => {
  process.env.OMNIROUTE_PROMETHEUS_METRICS = "true";
  metrics.recordRequestMetrics(row());
  const anon = await route.GET(new Request(URL));
  assert.equal(anon.status, 401);
  const res = await route.GET(await makeManagementSessionRequest(URL));
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type") ?? "", /^text\/plain; version=0\.0\.4/);
  assert.match(await res.text(), /# HELP omniroute_request_duration_seconds /);
});
