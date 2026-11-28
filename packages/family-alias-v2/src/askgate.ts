/**
 * Runtime fallback gate. Alias generation does not use this. Both the
 * OmniRoute path and the CPA path call `nextFallback` before every step.
 * The tier map is injected; this file owns no ladder of its own.
 */

export type TierMap = ReadonlyMap<string, number>;

export type AskAnswer = "allow" | "deny";

export type FallbackCandidate = {
  modelId: string;
  /** Same model id as the request, any provider. */
  sameModel?: boolean;
  /** A different product line. Requires the consent header. */
  crossFamily?: boolean;
};

export type FallbackRequest = {
  requestedModelId: string;
  candidates: readonly FallbackCandidate[];
  tiers: TierMap;
  headers?: Readonly<Record<string, string | undefined>>;
  ask: (candidate: FallbackCandidate) => AskAnswer | Promise<AskAnswer>;
};

export type FallbackStop = {
  modelId: null;
  stopped: true;
  cross_family_consent: boolean;
  reason: string;
  line: string;
};

const PREFIX = /^(?:cpa-base|cpa-fast|cpa-deep)[/:]/;

/** Strip the CPA run prefix before any family or tier lookup. */
export function stripRunPrefix(modelId: string): string {
  return modelId.replace(PREFIX, "");
}

function consent(headers: FallbackRequest["headers"]): boolean {
  const value = Object.entries(headers ?? {}).find(
    ([key]) => key.toLowerCase() === "x-open-design-cross-family"
  )?.[1];
  return value === "1";
}

function lineFor(modelId: string, reason: string): string {
  return `No confirmed lower-tier model in the same family. Stopped on ${modelId}. ${reason}`.trim();
}

/**
 * Decide the next card. Returns the candidate only after a real Ask allows
 * it. No candidate, a missing tier, an upward step, or a deny all stop on
 * the requested model.
 */
export async function nextFallback(
  request: FallbackRequest
): Promise<FallbackCandidate | FallbackStop> {
  const requested = stripRunPrefix(request.requestedModelId);
  const allowed = consent(request.headers);
  const requestedTier = request.tiers.get(requested);
  // A missing tier entry for the requested model stops every step, same-model
  // retries included.
  if (requestedTier === undefined) {
    return stop(requested, allowed, "requested model has no tier entry");
  }

  // Tier eligibility is checked before the pool is chosen, so an upward or
  // untiered in-family candidate cannot hide an eligible same-model retry.
  const withinTier = (candidate: FallbackCandidate): boolean => {
    if (candidate.sameModel) return true;
    const tier = request.tiers.get(stripRunPrefix(candidate.modelId));
    return tier !== undefined && tier <= requestedTier;
  };
  const usable = request.candidates.filter((candidate) => {
    if (candidate.crossFamily && !allowed) return false;
    return withinTier(candidate);
  });

  const inFamily = usable.filter((candidate) => !candidate.sameModel && !candidate.crossFamily);
  const cross = usable.filter((candidate) => candidate.crossFamily);
  const same = usable.filter((candidate) => candidate.sameModel).slice(0, 1);
  const pool = inFamily.length > 0 ? inFamily : cross.length > 0 ? cross : same;

  const candidate = pool[0];
  if (candidate) {
    const answer = await request.ask(candidate);
    if (answer === "allow") return candidate;
    return stop(requested, allowed, "ask denied");
  }

  return stop(requested, allowed, allowed ? "" : "cross_family_consent false");
}

function stop(modelId: string, cross_family_consent: boolean, reason: string): FallbackStop {
  return {
    modelId: null,
    stopped: true,
    cross_family_consent,
    reason,
    line: `No confirmed lower-tier model in the same family. Stopped on ${modelId}.`,
  };
}
