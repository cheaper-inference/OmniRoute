import assert from "node:assert/strict";
import { test } from "node:test";
import { resolveMinRemainingPercent } from "../../src/sse/services/quotaPreflightPolicy.ts";
import {
  buildFixtureHealthAccount as buildHealthAccount,
  type FixtureAvailabilityEvidence,
} from "./quota-overview-projection-fixtures.ts";
import { availability, decision } from "./quota-availability-fixtures.ts";
import {
  buildHealthAccount as buildServerHealthAccount,
  buildHealthGroups,
  normalizeHealthWindow,
  resolveQuotaLayout,
  type HealthConnection,
  type HealthData,
  type AvailabilityEvidence,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview.ts";

const fetchedAt = "2099-01-01T00:00:00Z";
const now = Date.parse(fetchedAt);
const connection = { id: "a", provider: "claude", email: "account@example.test", isActive: true };
const policy = { enabled: false, defaultThresholdPercent: 2, providerWindowDefaults: {} };
const evidence: FixtureAvailabilityEvidence = {
  policy,
  observedAt: fetchedAt,
  cooldown: { id: "a", status: "healthy", testStatus: "active", lockouts: [] },
};
const quota = (name: string, remainingPercentage: number, extra = {}) => ({
  name,
  remainingPercentage,
  ...extra,
});
const data = (five = 80, weekly = 80): HealthData => ({
  raw: { fetchedAt },
  quotas: [quota("session (5h)", five), quota("weekly (7d)", weekly)],
});
const project = (
  d: HealthData | undefined = data(),
  c: HealthConnection = connection,
  e: FixtureAvailabilityEvidence = evidence,
  clock = now
) => buildHealthAccount(c, d, {}, clock, e);
const future = (ms: number) => new Date(now + ms).toISOString();

test("10% is available; either exhausted account-wide constraint blocks", () => {
  assert.equal(project(data(10, 10)).status, "ok");
  for (const [five, weekly] of [
    [0, 80],
    [80, 0],
  ])
    assert.equal(project(data(five, weekly)).status, "critical");
});
test("cutoff activation, exact overrides, provider defaults and missing policy fallback", () => {
  assert.equal(project(data(1)).status, "ok");
  assert.equal(
    project(data(1), connection, { ...evidence, policy: { ...policy, enabled: true } }).status,
    "critical"
  );
  const c = { ...connection, quotaWindowThresholds: { "session (5h)": 15 } };
  assert.equal(project(data(10), c).status, "critical");
  assert.equal(
    project(data(10), { ...c, providerSpecificData: { quotaPreflightEnabled: false } }).status,
    "ok"
  );
  const e = {
    ...evidence,
    policy: { ...policy, providerWindowDefaults: { claude: { "session (5h)": 15 } } },
  };
  assert.equal(project(data(10), connection, e).status, "critical");
  assert.equal(
    project(data(10), { ...connection, quotaWindowThresholds: { "session (5h)": 5 } }, e).status,
    "ok"
  );
  assert.equal(project(data(10), connection, { ...evidence, policy: undefined }).status, "ok");
  assert.equal(project(data(0), connection, { ...evidence, policy: undefined }).status, "critical");
});

const verdictEvidence = (usable: boolean | null = true): AvailabilityEvidence => ({
  observedAt: fetchedAt,
  cooldown: evidence.cooldown,
  availability: availability(connection.id, decision(usable)),
  availabilityObservedAt: now,
});
const serverProject = (e: AvailabilityEvidence, c: HealthConnection = connection) =>
  buildServerHealthAccount(c, data(), {}, now, e);

test("missing availability verdict warns and shows only quota meters", () => {
  const account = serverProject({ observedAt: fetchedAt, cooldown: evidence.cooldown });
  assert.ok(account.reasons.some((r) => r.type === "verdictUnavailable"));
  assert.equal(account.status, "empty");
  assert.equal(account.cells.length, 2);
});
test("availability verdict older than 90 seconds warns and becomes empty", () => {
  const account = serverProject({ ...verdictEvidence(), availabilityObservedAt: now - 90_001 });
  assert.ok(account.reasons.some((r) => r.type === "verdictUnavailable"));
  assert.equal(account.status, "empty");
});
test("valid availability verdict has no unavailable warning through 90 seconds", () => {
  for (const age of [0, 90_000]) {
    const account = serverProject({ ...verdictEvidence(), availabilityObservedAt: now - age });
    assert.equal(
      account.reasons.some((r) => r.type === "verdictUnavailable"),
      false
    );
    assert.equal(account.status, "ok");
  }
});
test("unknown account verdict warns even when freshly observed", () => {
  const account = serverProject(verdictEvidence(null));
  assert.ok(account.reasons.some((r) => r.type === "verdictUnavailable"));
  assert.equal(account.status, "empty");
});
test("cooldown and terminal states outrank missing or expired availability verdicts", () => {
  for (const e of [
    {},
    { ...verdictEvidence(), availabilityObservedAt: now - 90_001 },
    verdictEvidence(null),
  ]) {
    for (const runtime of [
      { rateLimitedUntil: future(1000) },
      { testStatus: "banned" },
      { testStatus: "expired" },
      { testStatus: "credits_exhausted" },
    ]) {
      const account = serverProject({ ...e, cooldown: undefined }, { ...connection, ...runtime });
      assert.ok(account.reasons.some((r) => r.type === "verdictUnavailable"));
      assert.equal(account.status, "critical");
    }
  }
});
test("Codex cutoff aliases retain exact-key then base-key precedence", () => {
  const c = {
    ...connection,
    provider: "codex",
    quotaWindowThresholds: { session: 12, weekly: 13 },
  };
  assert.equal(resolveMinRemainingPercent("codex", c, policy, "gpt_5_3_codex_spark_session"), 12);
  assert.equal(resolveMinRemainingPercent("codex", c, policy, "codex-spark-weekly"), 13);
  assert.equal(resolveMinRemainingPercent("codex", c, policy, "unrelated"), 2);
  assert.equal(
    resolveMinRemainingPercent(
      "codex",
      c,
      {
        ...policy,
        providerWindowDefaults: { codex: { gpt_5_3_codex_spark_session: 3 } },
      },
      "gpt_5_3_codex_spark_session"
    ),
    3
  );
});
test("paused wins; terminal reasons retain all three subtypes", () => {
  assert.equal(
    project(data(), { ...connection, isActive: false, testStatus: "banned" }).status,
    "paused"
  );
  for (const terminal of ["banned", "expired", "credits_exhausted"]) {
    const a = project(data(), { ...connection, testStatus: terminal }, { policy });
    assert.equal(a.status, "critical");
    assert.ok(a.reasons.some((r) => r.type === "terminal" && r.terminal === terminal));
    assert.equal(a.recoverAt, undefined);
  }
});
test("newer runtime testStatus wins rather than a permanent union of terminal history", () => {
  assert.equal(
    project(data(), { ...connection, testStatus: "banned", updatedAt: future(-1000) }).status,
    "ok"
  );
  assert.equal(
    project(data(), { ...connection, testStatus: "banned", updatedAt: future(1000) }).status,
    "critical"
  );
});
test("fresh summary explicit deadline wins; remaining time is only a fallback", () => {
  const e = {
    ...evidence,
    cooldown: { ...evidence.cooldown!, rateLimitedUntil: future(3000), cooldownRemainingMs: 2000 },
  };
  const c = { ...connection, rateLimitedUntil: future(4000) };
  assert.equal(project(data(), c, e).recoverAt, future(3000));
  assert.equal(project(data(), c, e, now + 5000).status, "ok");
  const remaining = { ...evidence, cooldown: { ...evidence.cooldown!, cooldownRemainingMs: 2000 } };
  assert.equal(project(data(), connection, remaining).recoverAt, future(2000));
  assert.equal(project(data(), connection, remaining, now + 3000).status, "ok");
});
test("unavailable after cooldown is lazy recovery, not red", () => {
  const a = project(
    data(),
    { ...connection, testStatus: "unavailable", rateLimitedUntil: future(-1) },
    { policy }
  );
  assert.equal(a.status, "ok");
  assert.ok(a.reasons.some((r) => r.type === "previousFailure"));
  assert.equal(
    project(data(), connection, {
      ...evidence,
      cooldown: { ...evidence.cooldown!, status: "unavailable", testStatus: "unavailable" },
    }).status,
    "ok"
  );
});
test("active lockouts restrict and expire locally", () => {
  const e = {
    ...evidence,
    cooldown: {
      ...evidence.cooldown!,
      lockouts: [{ model: "model@example.test", remainingMs: 2000, reason: "429" }],
    },
  };
  const a = project(data(), connection, e);
  assert.equal(a.status, "alert");
  assert.equal(a.recoverAt, future(2000));
  assert.equal(a.reasons.find((r) => r.type === "lockout")?.window, "model@example.test");
  assert.equal(project(data(), connection, e, now + 3000).status, "ok");
});
test("Claude scoped sonnet is partial, account-wide weekly is critical, one account row", () => {
  const d = data();
  d.quotas!.push(quota("weekly sonnet (7d)", 0, { modelScoped: true }));
  const a = project(d);
  assert.equal(a.status, "alert");
  assert.equal(a.reasons.find((r) => r.type === "quota")?.scope, "scoped");
  assert.equal(buildHealthGroups([a])[0].accounts.length, 1);
  d.quotas!.push(quota("overall", 0));
  assert.equal(project(d).status, "critical");
});
test("GLM and unmarked model-looking names remain account-wide without routing proof", () => {
  assert.equal(
    project({ quotas: [quota("5 Hours Quota", 0)] }, { ...connection, provider: "glm" }).status,
    "critical"
  );
  for (const name of ["mcp_monthly", "claude-sonnet-4"]) {
    const a = project({ quotas: [quota(name, 0)] });
    assert.equal(a.status, "critical");
  }
});
const agyData = (first = 0, second = 80): HealthData => ({
  raw: {
    fetchedAt,
    quotaGroups: [
      {
        id: "gemini",
        windows: { session: { remainingPercentage: 100 }, weekly: { remainingPercentage: first } },
      },
      {
        id: "claude_gpt",
        windows: { session: { remainingPercentage: 80 }, weekly: { remainingPercentage: second } },
      },
    ],
  },
  quotas: [],
});
test("AGY group scopes restrict partly or fully, never duplicate an account; hiding has no effect", () => {
  const c = { ...connection, provider: "agy" };
  const a = buildHealthAccount(c, agyData(), { agy: { hidden: ["gemini_weekly"] } }, now, evidence);
  assert.equal(a.status, "alert");
  assert.equal(buildHealthGroups([a])[0].accounts.length, 1);
  assert.equal(project(agyData(0, 0), c).status, "critical");
});
test("raw exhausted constraints cannot be hidden by parsed display values", () => {
  assert.equal(
    project({ ...data(), raw: { fetchedAt, quotas: { overall: { remainingPercentage: 0 } } } })
      .status,
    "critical"
  );
});
test("no telemetry and error without snapshot are unknown, stale snapshots never age to unknown", () => {
  assert.equal(project({ quotas: [] }).status, "empty");
  const failed = project({ quotas: [] }, connection, { ...evidence, error: "synthetic error" });
  assert.equal(failed.status, "empty");
  assert.equal(failed.reasons.find((r) => r.type === "quotaError")?.error, "synthetic error");
  for (const old of [
    { ...data(0), raw: { fetchedAt: "2000-01-01T00:00:00Z", _stale: true } },
    { ...data(0), stale: true },
  ]) {
    const a = project(old);
    assert.equal(a.status, "critical");
    assert.ok(a.reasons.some((r) => r.type === "previousSnapshot"));
  }
  assert.equal(project(data(), connection, { ...evidence, error: "synthetic" }).status, "ok");
  assert.equal(project(data(), connection, evidence, now + 999999999).status, "ok");
});
test("past reset and staleAfterReset no longer block, but expose awaiting-sync reason", () => {
  for (const extra of [{ resetAt: fetchedAt }, { staleAfterReset: true }]) {
    const a = project({ quotas: [quota("weekly", 0, extra)] });
    assert.equal(a.status, "ok");
    assert.ok(a.reasons.some((r) => r.type === "awaitingSync"));
  }
});
test("missing summary uses connection runtime fields, missing both is unknown", () => {
  assert.equal(project(data(), connection, { policy }).status, "ok");
  assert.equal(project(data(), { ...connection, isActive: false }, { policy }).status, "paused");
  assert.equal(
    project(data(), { ...connection, testStatus: "expired" }, { policy }).status,
    "critical"
  );
  assert.equal(
    project(data(), { ...connection, rateLimitedUntil: future(1000) }, { policy }).status,
    "critical"
  );
  assert.equal(
    project(data(), { id: "unknown@example.test", provider: "claude" }, { policy }).status,
    "empty"
  );
});
test("recoverAt waits for every blocked constraint; unknown reset means unknown recovery", () => {
  const e = { ...evidence, cooldown: { ...evidence.cooldown!, rateLimitedUntil: future(2000) } };
  const d = {
    quotas: [
      quota("session", 0, { resetAt: future(5000) }),
      quota("weekly", 0, { resetAt: future(10000) }),
    ],
  };
  assert.equal(project(d, connection, e).recoverAt, future(10000));
  assert.equal(project({ quotas: [quota("weekly", 0)] }, connection, e).recoverAt, undefined);
  assert.equal(project({ quotas: [quota("weekly sonnet", 0)] }).recoverAt, undefined);
});
test("Codex session displayName Weekly and 604800s is weekly, not a new block", () => {
  const q = quota("session", 0, { displayName: "Weekly", windowSeconds: 604800 });
  assert.equal(normalizeHealthWindow(q, fetchedAt), "overall");
  assert.equal(project({ quotas: [q] }, { ...connection, provider: "codex" }).status, "critical");
});
test("credit and non-reported fractions never block", () => {
  const d = data();
  d.quotas!.push(
    quota("credits", 0),
    quota("extra_usage", 0),
    quota("banked_reset_credits", 0),
    quota("weekly_model", 0, { fractionReported: false }),
    quota("weekly_credits", 0, { isCredits: true }),
    quota("weekly_reset", 0, { isResetCredits: true })
  );
  assert.equal(project(d).status, "ok");
});
test("1/2/40/200 counts and deterministic rows use unique accounts, no buckets", () => {
  for (const size of [1, 2, 40, 200]) {
    const accounts = Array.from({ length: size }, (_, i) =>
      project(data(), { ...connection, id: `id-${i}`, name: `Account ${i}` })
    );
    const group = buildHealthGroups(accounts)[0];
    assert.equal(group.total, size);
    assert.equal(group.counts.ok, size);
    assert.equal(group.accounts.length, size);
    assert.equal("buckets" in group, false);
    assert.deepEqual(buildHealthGroups([...accounts].reverse()), [group]);
  }
});
test("status sorting puts paused before empty", () => {
  const group = buildHealthGroups([
    project({ quotas: [] }),
    project(data(), { ...connection, id: "paused", isActive: false }),
  ])[0];
  assert.deepEqual(
    group.accounts.map((a) => a.status),
    ["paused", "empty"]
  );
});
test("all terminal summary subtypes are used when connection has no status", () => {
  for (const testStatus of ["banned", "expired", "credits_exhausted"]) {
    const a = project(
      data(),
      { ...connection, runtimeObservedAt: future(-1000) },
      { ...evidence, cooldown: { ...evidence.cooldown!, testStatus } }
    );
    assert.equal(a.status, "critical");
    assert.equal(a.reasons[0].terminal, testStatus);
  }
});
test("window and filler words normalize across spaces, underscores and parentheses", () => {
  for (const name of [
    "5 Hours Quota",
    "weekly_quota",
    "five_hour_limits",
    "seven_day_usage_window",
    "(5h)",
    "(7d)",
    "total",
  ]) {
    assert.equal(project({ quotas: [quota(name, 0)] }).status, "critical", name);
  }
});

test("persisted legacy layouts remain valid", () => {
  for (const value of [null, "", "invalid"]) assert.equal(resolveQuotaLayout(value), "overview");
  for (const value of ["full", "compact", "overview"])
    assert.equal(resolveQuotaLayout(value), value);
});
