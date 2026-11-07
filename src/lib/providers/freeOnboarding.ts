import { NOAUTH_PROVIDERS } from "@/shared/constants/providers";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry";

interface NoAuthOnboardingMetadata {
  id: string;
  name: string;
  website?: string;
  noAuth?: boolean;
  hasFree?: boolean;
  isLocalCli?: boolean;
  serviceKinds?: string[];
  authHint?: string;
  freeNote?: string;
  notice?: { text?: string };
  deprecated?: boolean;
  disabled?: boolean;
  unsafe?: boolean;
  hiddenFromDashboard?: boolean;
}

export interface FreeOnboardingProvider {
  id: string;
  name: string;
  website: string;
  caution: string;
  defaultModel?: string;
}

export interface ExistingProviderConnection {
  provider?: unknown;
}

export interface FreeProviderConnectionInput {
  provider: string;
  authType: "no-auth";
  name: string;
  isActive: true;
  testStatus: "unknown";
  defaultModel?: string;
}

export type FreeProviderSetupResult =
  | { providerId: string; status: "created"; connectionId: string }
  | { providerId: string; status: "skipped"; reason: "already-configured" }
  | { providerId: string; status: "failed"; reason: "Failed to create provider" };

function isEligibleProvider(provider: NoAuthOnboardingMetadata): boolean {
  return (
    provider.noAuth === true &&
    provider.hasFree === true &&
    provider.isLocalCli !== true &&
    provider.serviceKinds?.includes("llm") === true &&
    provider.deprecated !== true &&
    provider.disabled !== true &&
    provider.unsafe !== true &&
    provider.hiddenFromDashboard !== true
  );
}

function toOnboardingProvider(provider: NoAuthOnboardingMetadata): FreeOnboardingProvider {
  const defaultModel = REGISTRY[provider.id]?.models?.[0]?.id;
  return {
    id: provider.id,
    name: provider.name,
    website: provider.website || "",
    caution:
      provider.notice?.text ||
      provider.freeNote ||
      provider.authHint ||
      "This provider is operated by a third party and may enforce its own terms and limits.",
    ...(defaultModel ? { defaultModel } : {}),
  };
}

export function getEligibleFreeOnboardingProviders(): FreeOnboardingProvider[] {
  return Object.values(NOAUTH_PROVIDERS as Record<string, NoAuthOnboardingMetadata>)
    .filter(isEligibleProvider)
    .map(toOnboardingProvider)
    .sort((left, right) => left.id.localeCompare(right.id));
}

export function selectUnconfiguredFreeOnboardingProviders(
  candidates: FreeOnboardingProvider[],
  connections: ExistingProviderConnection[]
): FreeOnboardingProvider[] {
  const configured = new Set(
    connections
      .map((connection) => connection.provider)
      .filter((provider): provider is string => typeof provider === "string")
  );
  return candidates.filter((candidate) => !configured.has(candidate.id));
}

interface SetupFreeProviderConnectionsOptions {
  requestedIds: string[];
  candidates: FreeOnboardingProvider[];
  listExisting: () => Promise<ExistingProviderConnection[]>;
  create: (input: FreeProviderConnectionInput) => Promise<{ id?: unknown } | null>;
}

function validateRequestedIds(
  requestedIds: string[],
  candidates: FreeOnboardingProvider[]
): Map<string, FreeOnboardingProvider> {
  const candidatesById = new Map(candidates.map((candidate) => [candidate.id, candidate]));
  const invalidIds = [...new Set(requestedIds)]
    .filter((providerId) => !candidatesById.has(providerId))
    .sort((left, right) => left.localeCompare(right));
  if (invalidIds.length > 0) {
    throw new Error(`Ineligible free provider IDs: ${invalidIds.join(", ")}`);
  }
  return candidatesById;
}

export async function setupFreeProviderConnections(
  options: SetupFreeProviderConnectionsOptions
): Promise<{ results: FreeProviderSetupResult[] }> {
  const candidatesById = validateRequestedIds(options.requestedIds, options.candidates);
  const results: FreeProviderSetupResult[] = [];

  for (const providerId of [...new Set(options.requestedIds)]) {
    const existing = await options.listExisting();
    if (existing.some((connection) => connection.provider === providerId)) {
      results.push({ providerId, status: "skipped", reason: "already-configured" });
      continue;
    }

    const candidate = candidatesById.get(providerId)!;
    try {
      const connection = await options.create({
        provider: providerId,
        authType: "no-auth",
        name: candidate.name,
        isActive: true,
        testStatus: "unknown",
        ...(candidate.defaultModel ? { defaultModel: candidate.defaultModel } : {}),
      });
      if (!connection || typeof connection.id !== "string") {
        throw new Error("Provider connection was not persisted");
      }
      results.push({ providerId, status: "created", connectionId: connection.id });
    } catch {
      results.push({ providerId, status: "failed", reason: "Failed to create provider" });
    }
  }

  return { results };
}

let freeProviderSetupQueue: Promise<void> = Promise.resolve();

export async function withFreeProviderSetupLock<T>(operation: () => Promise<T>): Promise<T> {
  const previous = freeProviderSetupQueue;
  let release: () => void = () => {};
  freeProviderSetupQueue = new Promise<void>((resolve) => {
    release = resolve;
  });
  await previous;
  try {
    return await operation();
  } finally {
    release();
  }
}
