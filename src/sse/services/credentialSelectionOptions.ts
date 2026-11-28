import type { ProviderConnectionView } from "@/lib/db/providers/lazyConnectionView";
import type {
  ModelAvailabilityConnection,
  ModelAvailabilityObserver,
} from "@omniroute/open-sse/utils/modelAvailabilityTypes.ts";
import type { CredentialLeaseSelectionContext } from "./exclusiveConnectionLeasePolicy";
import type { ConnectionRestrictionSource } from "./credentialSelectionDiagnostics.ts";

export const MODEL_UNAVAILABLE_SELECTION: {
  modelUnavailable: true;
  connectionId?: never;
  allRateLimited?: never;
  allExpired?: never;
} = { modelUnavailable: true };

/** Supplied by the chat entry point so generic credential selection can stay executor-independent. */
export interface ModelAvailabilitySelectionHooks {
  probe: boolean;
  shouldFilter(): boolean;
  stampCredentials(connection: ProviderConnectionView): {
    modelAvailabilityConnection?: ModelAvailabilityConnection;
    modelAvailabilityProbe?: boolean;
    createModelAvailabilityObserver?: ModelAvailabilityObserver;
  };
  filterConnections(input: {
    connections: ProviderConnectionView[];
    excludedIds: Set<string>;
    provider: string;
    model: string;
  }): Promise<{ connections: ProviderConnectionView[]; exhausted: boolean }>;
}

export interface CredentialSelectionOptions {
  modelAvailability?: ModelAvailabilitySelectionHooks;
  /** Provenance of the effective allowlist; does not alter authorization. */
  connectionRestrictionSources?: readonly ConnectionRestrictionSource[];
  /** Exclude credential-specific transports that cannot serve caller tools or image input. */
  requireToolCalling?: boolean;
  allowSuppressedConnections?: boolean;
  allowRateLimitedConnections?: boolean;
  bypassQuotaPolicy?: boolean;
  /** Image operations on Codex require a paid workspace; do not choose a free plan first. */
  requirePaidCodexPlan?: boolean;
  forcedConnectionId?: string | null;
  /** API-key-scoped ordered preference. Only ranks connections that survived eligibility gates. */
  preferredConnectionIds?: string[] | null;
  /** The pin was chosen by the operator for this request (x-omniroute-connection), not derived by a combo. */
  explicitConnectionPin?: boolean;
  excludeConnectionIds?: string[] | null;
  sessionKey?: string | null;
  sessionAffinityTtlMs?: number | null;
  reserveOAuthSession?: boolean;
  lease?: CredentialLeaseSelectionContext;
  materializeCredentials?: boolean;
  deferLeaseClaim?: boolean;
  /** Internal: a same-call UNIQUE retry already holds the provider/owner selection lock. */
  _leaseRetryWithLockHeld?: boolean;
  /** Internal: freeze the original policy-valid candidate set across lease race/preflight retry. */
  _leaseCandidateIds?: string[];
  /** Antigravity account lease (#10011): only the final chat dispatch opts in. */
  reserveAntigravityLease?: boolean;
  routingRequestId?: string | null;
}
