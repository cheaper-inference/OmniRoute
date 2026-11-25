/**
 * Keep Codex subscription metadata in sync with the authoritative usage endpoint.
 *
 * OAuth id_token claims reflect the plan at login time. Token refresh normally
 * rotates only access/refresh tokens, so a Free -> Plus (or Plus -> Free) change
 * otherwise leaves providerSpecificData stale indefinitely. The quota API
 * already returns plan_type; reuse that observation for routing and dashboard.
 */
interface CodexPlanConnection {
  id: string;
  provider?: string;
  providerSpecificData?: unknown;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export function codexPlanFromUsage(usage: unknown): string | null {
  const data = asRecord(usage);
  // An error or cached/stale fallback must not change the account's plan.
  if (data._stale === true || (typeof data.message === "string" && data.message.trim())) {
    return null;
  }
  if (typeof data.plan !== "string") return null;
  const plan = data.plan.trim().toLowerCase();
  // Allow new provider plan variants without claiming "unknown" as a tier.
  return plan !== "unknown" && /^[a-z][a-z0-9_-]{0,63}$/.test(plan) ? plan : null;
}

export async function syncCodexPlanFromUsage<T extends CodexPlanConnection>(
  connection: T,
  usage: unknown,
  persist: (connectionId: string, planFields: Record<string, unknown>) => Promise<unknown>
): Promise<T> {
  if (connection.provider !== "codex") return connection;
  const plan = codexPlanFromUsage(usage);
  if (!plan) return connection;

  const psd = asRecord(connection.providerSpecificData);
  const fields: Record<string, unknown> = {};
  const storedPlan = (value: unknown) =>
    typeof value === "string" ? value.trim().toLowerCase() : "";

  if (storedPlan(psd.chatgptPlanType) !== plan) fields.chatgptPlanType = plan;
  // The routing eligibility helper reads workspacePlanType first. Keep an
  // existing OAuth workspace claim aligned with the live plan as well.
  if (
    typeof psd.workspacePlanType === "string" &&
    psd.workspacePlanType.trim() &&
    storedPlan(psd.workspacePlanType) !== plan
  ) {
    fields.workspacePlanType = plan;
  }
  if (Object.keys(fields).length === 0) return connection;

  try {
    // Persist only changed keys; the DB helper merges them into the latest row
    // instead of clobbering concurrent quota/cooldown or operator settings.
    await persist(connection.id, fields);
  } catch (error) {
    // Plan sync is best effort: a transient DB error must not hide valid quotas.
    console.warn(
      "[ProviderLimits] Could not sync Codex subscription plan for %s: %s",
      connection.id,
      error instanceof Error ? error.message : String(error)
    );
    return connection;
  }

  return { ...connection, providerSpecificData: { ...psd, ...fields } };
}
