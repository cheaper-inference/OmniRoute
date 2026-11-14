import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { runShadowReplay } from "../../../scripts/ad-hoc/typesafe-shadow.mjs";
import { buildShadowRequest } from "../../../open-sse/services/typesafe/shadow.ts";

const cli = fileURLToPath(new URL("../../../scripts/ad-hoc/typesafe-shadow.mjs", import.meta.url));
const fixture = fileURLToPath(
  new URL("../../fixtures/typesafe-shadow/replay.json", import.meta.url)
);

test("offline CLI emits a persisted-report-ready recommendation and comparison", () => {
  const run = spawnSync(process.execPath, [cli, "--input", fixture], { encoding: "utf8" });
  assert.equal(run.status, 0, run.stderr);
  const report = JSON.parse(run.stdout);
  assert.equal(report.mode, "shadow");
  assert.equal(report.records[0].status, "recommended");
  assert.equal(report.records[0].profileId, "review");
  assert.equal(report.synthetic.completedTasks, 1);
  assert.equal(report.recorded.completedTasks, 0);
  assert.equal(report.records[0].routeChanged, false);
  assert.equal(report.records[0].agentLaunched, false);
  assert.equal(report.comparisons[0].recommendedProfileSucceeded, null);
  assert.ok(!run.stdout.includes("Review a parser change"));
});

test("CLI rejects invalid arguments without exposing input or reading secrets", () => {
  const run = spawnSync(process.execPath, [cli, "--live"], { encoding: "utf8" });
  assert.equal(run.status, 1);
  assert.equal(run.stdout, "");
  assert.match(run.stderr, /Shadow replay failed/);
});

test("pending observations are retained and duplicate boundaries are rejected", () => {
  const bundle = JSON.parse(readFileSync(fixture, "utf8"));
  delete bundle.events[0].outcome;
  const report = runShadowReplay(bundle);
  assert.equal(report.pendingOutcomes, 1);
  assert.equal(report.records.length, 1);
  bundle.events.push(structuredClone(bundle.events[0]));
  assert.throws(() => runShadowReplay(bundle), /Duplicate boundary/);
});

test("the help explicitly describes the no-network no-execution contract", () => {
  const run = spawnSync(process.execPath, [cli, "--help"], { encoding: "utf8" });
  assert.equal(run.status, 0);
  assert.match(run.stdout, /Offline only/);
  assert.match(run.stdout, /No routes change, no agents launch/);
});

test("synthetic recommendations are not counted as measured routing performance", () => {
  const bundle = JSON.parse(readFileSync(fixture, "utf8"));
  bundle.policy.maxEvaluationCostUsd = 0.1;
  bundle.events[0].recording.costUsd = 0.1;
  bundle.events[0].recording.requestSha256 = buildShadowRequest({
    task: bundle.events[0].task,
    profiles: bundle.profiles,
    policy: bundle.policy,
  }).requestSha256;
  bundle.events[0].outcome.source = "recorded";
  const report = runShadowReplay(bundle);
  assert.equal(report.recorded.completedTasks, 1);
  assert.equal(report.recorded.measuredRecommendationComparisons, 0);
  assert.equal(report.recorded.totalObservedCostUsd, 0.3);
  assert.equal(report.recorded.totalObservedLatencyMs, 100);
  assert.equal(report.comparisons[0].scenarioTotalCostUsd, 0.4);
  assert.equal(report.comparisons[0].scenarioTotalLatencyMs, 112);
});
