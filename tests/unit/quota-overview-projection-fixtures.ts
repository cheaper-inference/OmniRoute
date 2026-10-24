import {
  buildHealthAccount,
  normalizeHealthWindow,
  type HealthQuota,
  type AvailabilityEvidence,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview.ts";
import {
  shouldApplyQuotaCutoff,
  resolveMinRemainingPercent,
  type QuotaPreflightPolicy,
} from "../../src/sse/services/quotaPreflightPolicy.ts";

export type FixtureAvailabilityEvidence = AvailabilityEvidence & { policy?: QuotaPreflightPolicy };
import { availability, blocker, decision, scope } from "./quota-availability-fixtures.ts";

/** UI-only sample adapter: encodes the synthetic blocked/healthy windows in API DTOs.
 * This is not a routing control. Server/routing parity tests use the real server evaluator.
 */
export function buildFixtureHealthAccount(
  connection: Parameters<typeof buildHealthAccount>[0],
  data: Parameters<typeof buildHealthAccount>[1],
  visibility: Parameters<typeof buildHealthAccount>[2] = {},
  now = Date.now(),
  evidence: FixtureAvailabilityEvidence = {}
) {
  const quotas = new Map<string, HealthQuota>();
  for (const q of data?.quotas || []) quotas.set(q.name, q);
  for (const [name, q] of Object.entries(data?.raw?.quotas || {}))
    quotas.set(name, { ...quotas.get(name), ...q, name });
  for (const group of data?.raw?.quotaGroups || [])
    for (const [window, q] of Object.entries(group.windows || {})) {
      const name = `${group.id}_${window}`;
      quotas.set(name, { ...q, name, quotaGroupId: group.id });
    }
  const accountBlockers = [];
  const scopes = new Map<string, ReturnType<typeof scope>>();
  let measured = false;
  for (const q of quotas.values()) {
    if (
      q.fractionReported === false ||
      q.isCredits ||
      q.isResetCredits ||
      /^(credits|extra_usage|banked_reset_credits|reserve_session|reserve_weekly)$/.test(q.name)
    )
      continue;
    measured = true;
    const id =
      q.quotaGroupId ||
      (q.modelScoped
        ? q.name
        : connection.provider === "codex" && /^(gpt_5_3_codex_spark_|code_review)/.test(q.name)
          ? q.name
          : connection.provider === "openrouter" && /^free_(daily|rpm)$/.test(q.name)
            ? ":free"
            : ["agy", "antigravity"].includes(connection.provider) && q.modelKey
              ? q.modelKey
              : undefined);
    if (id && !scopes.has(id))
      scopes.set(id, { ...scope(id, []), kind: q.quotaGroupId ? "group" : "scoped" });
    const selected = id ? scopes.get(id)! : undefined;
    selected?.windows.push(q.name);
    const percent = q.remainingPercentage ?? (q.total ? (1 - (q.used || 0) / q.total) * 100 : 100);
    const policy = evidence.policy ?? {
      enabled: false,
      defaultThresholdPercent: 2,
      providerWindowDefaults: {},
    };
    const cutoff = shouldApplyQuotaCutoff(connection.provider, connection, policy)
      ? resolveMinRemainingPercent(connection.provider, connection, policy, q.name)
      : 0;
    const blocked =
      percent <= cutoff && !q.staleAfterReset && !(Date.parse(q.resetAt || "") <= now);
    if (blocked) {
      const row = blocker(
        q.name,
        q.resetAt || null,
        normalizeHealthWindow(q, data?.raw?.fetchedAt) === "fiveHour" ? "fiveHour" : "overall"
      );
      row.remainingPercent = percent;
      row.cutoffPercent = cutoff;
      if (selected) {
        selected.decision.usable = false;
        selected.decision.blockers.push(row);
      } else accountBlockers.push(row);
    }
  }
  const groups = [...scopes.values()].filter((s) => s.kind === "group");
  const allGroupsBlocked = groups.length > 0 && groups.every((s) => s.decision.usable === false);
  const account = decision(
    !measured ? null : !accountBlockers.length && !allGroupsBlocked,
    allGroupsBlocked
      ? [...accountBlockers, ...groups.flatMap((s) => s.decision.blockers)]
      : accountBlockers
  );
  return buildHealthAccount(connection, data, visibility, now, {
    availability: availability(connection.id, account, [...scopes.values()]),
    availabilityObservedAt: now,
    ...evidence,
  });
}
