import {
  evaluateQuotaCutoff,
  groupQuotaWindowsByBase,
  windowsForScope,
  type QuotaInfo,
  type QuotaCutoffScope,
  type PreflightQuotaThresholds,
} from "@omniroute/open-sse/services/quotaPreflight.ts";
import { selectAntigravityQuotaWindowNames } from "@omniroute/open-sse/services/antigravityQuotaFamily.ts";
import { getCodexQuotaWindowFilterForModel } from "@omniroute/open-sse/config/codexQuotaScopes.ts";
import { claudeQuotaMatchesModel } from "@omniroute/open-sse/services/usage/claudeQuota.ts";
import { getQuotaCache, isExhausted, isQuotaExhaustedForRequest } from "@/domain/quotaCache";
import { getRequestQuotaCacheState } from "@/domain/quotaCacheReadView";

/** Enumerate constraints with the router's grouping, scope selection and cutoff evaluator. */
export function cutoffBlockingWindows(
  quota: QuotaInfo | null,
  thresholds: PreflightQuotaThresholds,
  scope: QuotaCutoffScope
) {
  if (!quota?.windows) return [];
  const groups = groupQuotaWindowsByBase(windowsForScope(quota.windows, scope));
  return [...groups.values()].flatMap((entries) => {
    const result = evaluateQuotaCutoff(
      { ...quota, limitReached: false, windows: Object.fromEntries(entries) },
      thresholds,
      scope
    );
    if (result.proceed) return [];
    // A group is an alternative budget: service resumes when its first known route resets.
    // An unknown alternative reset cannot shorten a known recovery promise.
    const first = [...entries].sort(
      (a, b) => Date.parse(a[1].resetAt || "") - Date.parse(b[1].resetAt || "")
    )[0];
    return [
      {
        ...result,
        windowName: first[0],
        resetAt: first[1].resetAt ?? null,
        quotaPercent: first[1].percentUsed,
      },
    ];
  });
}

/** Explanation only: eligibility is determined once from the complete request cache. */
export function exhaustedBlockingWindows(
  id: string,
  provider: string,
  requestedModel: string | null,
  providerSpecificData: unknown
) {
  const cached = getQuotaCache(id);
  if (!cached) return [];
  let names = Object.keys(cached.quotas);
  if (requestedModel && (provider === "agy" || provider === "antigravity"))
    names = selectAntigravityQuotaWindowNames(names, requestedModel);
  if (provider === "codex") {
    const filter = getCodexQuotaWindowFilterForModel(requestedModel);
    if (filter) names = names.filter(filter);
  }
  const modelNames = Object.keys(cached.modelQuotas).filter((name) => {
    const metadata = cached.modelQuotas[name].claudeQuota;
    return !metadata || (!!requestedModel && claudeQuotaMatchesModel(metadata, requestedModel));
  });
  const state = getRequestQuotaCacheState();
  const groups = groupQuotaWindowsByBase(
    Object.fromEntries([...names, ...modelNames].map((name) => [name, { percentUsed: 0 }]))
  );
  try {
    // Ask the same request predicate about each applicable constraint, including Claude's
    // active/critical metadata. Alternative budgets stay together in this private cache.
    return [...groups.values()].flatMap((entries) => {
      const keys = entries.map(([name]) => name);
      const quotas = Object.fromEntries(
        keys.filter((name) => cached.quotas[name]).map((name) => [name, cached.quotas[name]])
      );
      const modelQuotas = Object.fromEntries(
        keys
          .filter((name) => cached.modelQuotas[name])
          .map((name) => [name, cached.modelQuotas[name]])
      );
      state.cache.set(id, { ...cached, quotas, modelQuotas, exhausted: isExhausted(quotas) });
      if (!isQuotaExhaustedForRequest(id, provider, requestedModel, providerSpecificData))
        return [];
      const name = [...keys].sort(
        (a, b) =>
          Date.parse((cached.quotas[a] || cached.modelQuotas[a]).resetAt || "") -
          Date.parse((cached.quotas[b] || cached.modelQuotas[b]).resetAt || "")
      )[0];
      return [{ name, ...(cached.quotas[name] || cached.modelQuotas[name]) }];
    });
  } finally {
    state.cache.set(id, cached);
  }
}
