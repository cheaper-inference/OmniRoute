type JsonRecord = Record<string, unknown>;

const CODEX_SOL_MODEL_RE =
  /^(?:codex\/|cx\/)?gpt-(?:5\.6|6(?:\.1)?)-sol(?:-(?:ultra|max|xhigh|high|medium|low|none)|\((?:ultra|max|xhigh|high|medium|low|none)\))?$/i;
const CODEX_ASTRA_MODEL_RE =
  /^(?:codex\/|cx\/)?gpt-6(?:\.1)?-astra(?:-(?:ultra|max|xhigh|high|medium|low|none)|\((?:ultra|max|xhigh|high|medium|low|none)\))?$/i;

const CODEX_SOL_PAID_PLANS = new Set([
  "plus",
  "pro",
  "prolite",
  "promax",
  "team",
  "chatgptteam",
  "business",
  "enterprise",
  "edu",
  "education",
]);

function normalizePlan(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");
  return normalized || null;
}

export function getCodexPlanType(providerSpecificData: unknown): string | null {
  if (!providerSpecificData || typeof providerSpecificData !== "object") return null;
  const data = providerSpecificData as JsonRecord;
  const candidates = [
    data.workspacePlanType,
    data.chatgptPlanType,
    data.workspace_plan_type,
    data.chatgpt_plan_type,
    data.planType,
    data.plan_type,
  ];
  for (const candidate of candidates) {
    const normalized = normalizePlan(candidate);
    if (normalized) return normalized;
  }
  return null;
}

export function isCodexSolModel(model: string | null | undefined): boolean {
  if (typeof model !== "string") return false;
  return CODEX_SOL_MODEL_RE.test(model.trim());
}

/** Sol and Astra on Codex OAuth require a paid ChatGPT plan. */
export function isCodexPaidOnlyModel(model: string | null | undefined): boolean {
  if (typeof model !== "string") return false;
  return isCodexSolModel(model) || CODEX_ASTRA_MODEL_RE.test(model.trim());
}

export function isCodexPaidPlan(providerSpecificData: unknown): boolean {
  const plan = getCodexPlanType(providerSpecificData);
  return plan !== null && CODEX_SOL_PAID_PLANS.has(plan);
}

/**
 * Codex Sol (5.6, 6, 6.1) and Astra (6, 6.1) require a paid ChatGPT
 * subscription. Connections with a recorded non-paid plan (Free/Go) must not
 * enter their credential rotation; other Codex model families retain the full
 * account pool. A connection without a recorded plan (older or imported
 * accounts) fails open, so a paid account never loses these models just because
 * its plan was not stored.
 */
export function isCodexPlanEligibleForModel(
  providerSpecificData: unknown,
  requestedModel: string | null | undefined
): boolean {
  if (!isCodexPaidOnlyModel(requestedModel)) return true;
  const plan = getCodexPlanType(providerSpecificData);
  if (plan === null || plan === "unknown") return true;
  return CODEX_SOL_PAID_PLANS.has(plan);
}

/** Plan gate for one connection of `provider`; only Codex connections are ever gated. */
export function isConnectionPlanEligible(
  provider: string | null | undefined,
  providerSpecificData: unknown,
  requestedModel: string | null | undefined
): boolean {
  return provider !== "codex" || isCodexPlanEligibleForModel(providerSpecificData, requestedModel);
}

/**
 * Keep only the connections whose Codex plan may serve `requestedModel`. Other
 * providers, and requests without a paid-only model, keep the full list.
 */
export function filterCodexPlanEligible<T extends { providerSpecificData?: unknown }>(
  provider: string | null | undefined,
  connections: T[],
  requestedModel: string | null | undefined
): T[] {
  return connections.filter((connection) =>
    isConnectionPlanEligible(provider, connection.providerSpecificData, requestedModel)
  );
}
