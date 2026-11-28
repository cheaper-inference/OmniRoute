import {
  computeFreeModelTotals,
  computePublicFreeHeadline,
  computeRowSumMirror,
  type FreeModelBudget,
} from "@omniroute/open-sse/config/freeModelCatalog.ts";
import {
  FREE_CATALOG_CURATED_AT,
  FREE_MODEL_BUDGETS,
} from "@omniroute/open-sse/config/freeModelCatalog.data.ts";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";
import type { MergedEntry } from "@/lib/radar/applyFeed";
import type { RadarFeedRowSum } from "@/lib/radar/feedSchema";
import { getRadarCatalog } from "@/lib/radar";
import { sumUsageTokensThisMonth } from "@/lib/db/usageSummary";
import type { FreeTierSummary } from "@/shared/types/freeTierSummary";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { listNoCredentialProviders } from "@/shared/utils/providerCredentialRequirement";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const RELEASE_BY_KEY = new Map(
  FREE_MODEL_BUDGETS.map((entry) => [`${entry.provider}:${entry.modelId}`, entry])
);

type BudgetEntry = FreeModelBudget & { enabled?: boolean };

/** Project the overlay onto the existing budget fields. */
function toBudgetEntry(entry: MergedEntry): BudgetEntry {
  return {
    provider: entry.provider,
    modelId: entry.modelId,
    displayName: entry.displayName,
    monthlyTokens: entry.monthlyTokens,
    creditTokens: entry.creditTokens,
    freeType: entry.freeType,
    poolKey: entry.poolKey,
    tos: entry.tos,
    trainsOnPrompts: entry.trainsOnPrompts,
    eligibilityGate: entry.eligibilityGate,
    // The release catalog curates this fact about the upstream provider.
    hardStopGuaranteed: RELEASE_BY_KEY.get(`${entry.provider}:${entry.modelId}`)
      ?.hardStopGuaranteed,
    enabled: entry.enabled,
  };
}

function resolveRowSum(
  feedRowSum: RadarFeedRowSum | null | undefined,
  releaseEntries: BudgetEntry[] | undefined,
  asOf: Date
): Pick<FreeTierSummary, "rowSum" | "rowSumSource"> {
  if (feedRowSum?.method === "row-sum-v1") {
    const {
      liveTokensPerMonth: liveTokens,
      retiredTokensPerMonth: retiredTokens,
      totalTokensPerMonth: totalTokens,
    } = feedRowSum;
    return {
      rowSumSource: "radar",
      rowSum: {
        method: "row-sum-v1",
        liveTokens,
        retiredTokens,
        totalTokens,
        retiredShare: totalTokens > 0 ? retiredTokens / totalTokens : 0,
      },
    };
  }

  const { method, liveTokens, retiredTokens, totalTokens, retiredShare } = computeRowSumMirror({
    entries: releaseEntries,
    asOf,
  });
  return {
    rowSumSource: "release",
    rowSum: { method, liveTokens, retiredTokens, totalTokens, retiredShare },
  };
}

export function OPTIONS(): Response {
  return new Response(null, { status: 204, headers: CORS });
}

type RadarCatalog = ReturnType<typeof getRadarCatalog>;
type ServedOverlay = NonNullable<RadarCatalog["meta"]>;

/** D35: every caller can read a current overlay from the free public catalog. */
function resolveServedCatalog({ entries, meta }: RadarCatalog): {
  overlay: ServedOverlay | null;
  servedEntries: BudgetEntry[] | undefined;
} {
  const overlay = meta !== null && !meta.olderThanRelease ? meta : null;
  // The accessor has already applied local model state to the shipped catalog
  // when the feed is stale.
  const servedEntries = overlay || meta?.olderThanRelease ? entries.map(toBudgetEntry) : undefined;
  return { overlay, servedEntries };
}

/**
 * The public headline over the served entries. Release-curated counting gates are
 * applied to the new figures; the legacy totals keep the existing overlay projection.
 */
function computeServedHeadline(
  servedEntries: BudgetEntry[] | undefined
): Pick<FreeTierSummary, "realTokens" | "socialGatedTokens"> {
  const headline = computePublicFreeHeadline({
    entries: servedEntries?.map((entry) => ({
      ...entry,
      gates: RELEASE_BY_KEY.get(`${entry.provider}:${entry.modelId}`)?.gates,
    })),
  });
  return {
    realTokens: headline.steadyRecurringTokens,
    socialGatedTokens: headline.socialGatedRecurringTokens,
  };
}

/** Which source answered, and the date of what was actually served. */
function describeSource(
  overlay: ServedOverlay | null,
  servedAt: Date
): Pick<FreeTierSummary, "catalogUpdatedAt" | "catalogSource" | "source" | "priceReference"> {
  const catalogUpdatedAt = overlay ? overlay.generatedAt : FREE_CATALOG_CURATED_AT;
  return {
    catalogUpdatedAt,
    catalogSource: overlay ? "radar-overlay" : "baseline",
    source: {
      kind: overlay ? "radar" : "release",
      version: overlay?.version ?? null,
      generatedAt: catalogUpdatedAt,
      servedAt: servedAt.toISOString(),
    },
    priceReference: overlay?.priceReference ?? null,
  };
}

/**
 * #13679: usedThisMonth/remaining reveal the operator's own local usage —
 * unlike the catalog totals, that is not meant to be public. Withhold both
 * from unauthenticated callers instead of gating the whole route, so the
 * intentionally-public catalog fields stay served to everyone.
 */
function usageFields(
  authed: boolean,
  steadyRecurringTokens: number
): Pick<FreeTierSummary, "usedThisMonth" | "remaining"> {
  if (!authed) return { usedThisMonth: null, remaining: null };
  const usedThisMonth = sumUsageTokensThisMonth();
  return { usedThisMonth, remaining: Math.max(0, steadyRecurringTokens - usedThisMonth) };
}

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const excludeTosAvoid = url.searchParams.get("excludeTosAvoid") === "1";

  // Resolve feed age and local model state in the shared catalog accessor.
  const catalog = getRadarCatalog();

  // #13679: wildcard CORS serves the public catalog. Authentication controls
  // access to the operator's local usage and remaining tokens.
  const authed = await isAuthenticated(req);
  const { overlay, servedEntries } = resolveServedCatalog(catalog);
  const totals = computeFreeModelTotals({ excludeTosAvoid, entries: servedEntries });
  const servedAt = new Date();

  const body: FreeTierSummary = {
    ...totals,
    perModel: totals.perModel.map((row) => ({
      ...row,
      inRelease: RELEASE_BY_KEY.has(`${row.provider}:${row.modelId}`),
      routable: Object.hasOwn(REGISTRY, row.provider),
    })),
    ...usageFields(authed, totals.steadyRecurringTokens),
    ...describeSource(overlay, servedAt),
    // Computed here, not in the component: deriving it client-side would pull
    // the whole provider REGISTRY into the browser bundle.
    noCredentialProviders: listNoCredentialProviders(),
    ...resolveRowSum(overlay?.rowSum, overlay ? undefined : servedEntries, servedAt),
    ...computeServedHeadline(servedEntries),
    activePromotions: null,
  };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}
