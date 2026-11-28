import {
  isAntigravityClientEffortModel,
  planAntigravityClientEffortRoute,
} from "@omniroute/open-sse/config/antigravityClientEffort.ts";
import {
  getCustomModels,
  getFreshAntigravityModelsForConnection,
  getModelIsHidden,
} from "@/lib/db/models";
import { getRawProviderConnections } from "@/lib/db/providers";
import {
  admitConnectionModels,
  readConnectionAdmissionRef,
} from "@/lib/db/models/freeOnlyAdmission";
import { constrainConnectionsToQuota, resolveQuotaKeyScope } from "@/lib/quota/quotaKey";
import { resolveConnectionRestrictions } from "./connectionRestrictions.ts";

type RestrictionKey = { allowedConnections?: unknown; allowedQuotas?: unknown };
type Target = {
  connectionId?: string | null;
  allowedConnectionIds?: string[] | null;
  providerId?: string | null;
};
type Plan =
  { kind: "route"; address: string; connectionIds: string[] } | { kind: "error"; error: string };

function readEffortAddress(address: string, target: Target | null | undefined) {
  const [provider, model, extra] = address.split("/");
  if (
    (provider !== "antigravity" && provider !== "agy") ||
    extra !== undefined ||
    !model ||
    !isAntigravityClientEffortModel(model) ||
    (target?.providerId && target.providerId !== "antigravity" && target.providerId !== "agy")
  ) {
    return null;
  }

  return { provider, model };
}

async function loadFreshNativeAccounts(provider: string) {
  const connections = await getRawProviderConnections({ isActive: true }, undefined, undefined, [
    "id",
    "provider",
    "provider_specific_data",
  ]);
  return Promise.all(
    connections.flatMap((connection) => {
      const { id, provider: storedProvider } = connection;
      if (typeof id !== "string" || (storedProvider !== "antigravity" && storedProvider !== "agy"))
        return [];
      return getFreshAntigravityModelsForConnection(id).then((models) => ({
        connectionId: id,
        models: admitConnectionModels(
          storedProvider,
          models,
          readConnectionAdmissionRef(connection)?.freeOnly === true
        ).filter(
          (row) => !getModelIsHidden(provider, row.id) && !getModelIsHidden(storedProvider, row.id)
        ),
      }));
    })
  );
}

async function readAllowedAccounts(
  key: RestrictionKey | null | undefined,
  target: Target | null | undefined,
  isCombo: boolean
) {
  const restrictions = resolveConnectionRestrictions(key, target, isCombo);
  let allowed = restrictions.allowedConnections;
  if (target?.connectionId) {
    allowed = allowed ? allowed.filter((id) => id === target.connectionId) : [target.connectionId];
  }
  if (Array.isArray(key?.allowedQuotas) && key.allowedQuotas.length > 0 && allowed?.length !== 0) {
    const quota = await resolveQuotaKeyScope(key.allowedQuotas);
    allowed = constrainConnectionsToQuota(allowed ?? [], quota.connectionIds);
  }
  return allowed;
}

export async function resolveAntigravityClientEffortRoute(
  address: string,
  body: { output_config?: unknown },
  sourceFormat: string,
  key: RestrictionKey | null | undefined,
  target: Target | null | undefined,
  isCombo: boolean
): Promise<Plan | null> {
  const parsed = readEffortAddress(address, target);
  if (!parsed) return null;
  const { provider, model } = parsed;
  // An existing explicit model remains authoritative over the optional virtual alias.
  const custom = await getCustomModels(provider);
  if (Array.isArray(custom) && custom.some((row) => row?.id === model)) return null;
  const accounts = await loadFreshNativeAccounts(provider);

  // Only apply new routing semantics when the alias really exists in fresh native
  // inventory; preserve release's static bare Gemini fallback otherwise.
  if (!planAntigravityClientEffortRoute(model, {}, accounts, null)) return null;
  if (getModelIsHidden(provider, model))
    return { kind: "error", error: "The requested model is hidden" };
  const allowed = await readAllowedAccounts(key, target, isCombo);
  const plan = planAntigravityClientEffortRoute(
    model,
    sourceFormat === "claude" ? body : {},
    accounts,
    allowed
  );
  if (plan && "connectionIds" in plan) {
    return {
      kind: "route",
      address: `${provider}/${plan.model}`,
      connectionIds: plan.connectionIds,
    };
  }
  return {
    kind: "error",
    error: "No eligible Antigravity account advertises the requested reasoning tier",
  };
}
