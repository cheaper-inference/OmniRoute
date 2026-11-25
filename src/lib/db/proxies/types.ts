export type JsonRecord = Record<string, unknown>;
export type ProxyScope = "global" | "provider" | "account" | "combo";

// Rotation strategy applied when a scope has a POOL of proxies (#6365). Defaults
// to `round-robin` (monotonic persisted cursor — never Math.random). `random`
// picks uniformly from the alive set; `sticky` holds the same member for a
// configurable window before advancing the cursor. `session` keeps one conversation on
// one member (rendezvous hash of the session key; round-robin when there is no key).
export type ProxyRotationStrategy = "round-robin" | "random" | "sticky" | "latency" | "session";
export const PROXY_ROTATION_STRATEGIES: readonly ProxyRotationStrategy[] = [
  "round-robin",
  "random",
  "sticky",
  "latency",
  "session",
];
export const DEFAULT_PROXY_ROTATION_STRATEGY: ProxyRotationStrategy = "round-robin";

export interface ProxyRegistryRecord {
  id: string;
  name: string;
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  region: string | null;
  notes: string | null;
  status: string;
  source: string;
  family: string;
  /** Set when this registry row was synced from a proxy subscription (#subscription-feature). */
  subscriptionId: string | null;
  /**
   * Rotating endpoint: the gateway hands out a new exit address per connection, so a
   * per-IP quota refusal through it is never set aside and it never shares an address.
   */
  rotatingEgress: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProxyAssignmentRecord {
  id: number;
  proxyId: string;
  scope: ProxyScope;
  scopeId: string | null;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProxyPayload {
  name: string;
  type: string;
  host: string;
  port: number;
  username?: string;
  password?: string;
  region?: string | null;
  notes?: string | null;
  status?: string;
  source?: string;
  family?: string;
  /** Optional link to a proxy subscription that created this row (#subscription-feature). */
  subscriptionId?: string | null;
  /** Rotating endpoint mark; omitted on update keeps the stored value. */
  rotatingEgress?: boolean;
}

export interface ProxyAssignmentPayload {
  scope: string;
  scopeId?: string | null;
}

export interface ProxyMutationResult {
  proxy: ProxyRegistryRecord;
  assignment: ProxyAssignmentRecord | null;
}

export type LegacyProxyClearStatus = "cleared" | "absent";

export interface ProxyTransactionResult extends ProxyMutationResult {
  legacyClearStatus: LegacyProxyClearStatus;
}

export interface LegacyProxyConfig {
  global?: unknown;
  providers?: Record<string, unknown>;
  combos?: Record<string, unknown>;
  keys?: Record<string, unknown>;
}
