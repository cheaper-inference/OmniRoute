/**
 * Local interception state for Agent Bridge and the Traffic Inspector:
 * per-agent bridge flags, the bypass pattern list and operator-added custom
 * capture hosts. This state describes the local machine (DNS entries, trusted
 * certificate, intercepted hosts) and is read by the MITM manager, DNS
 * provisioning and the intercept hook as well as the management routes.
 *
 * Record shapes keep the existing snake_case field names that the routes
 * already return; booleans are real booleans at this boundary.
 */

export interface AgentBridgeStateRow {
  agent_id: string;
  dns_enabled: boolean;
  cert_trusted: boolean;
  setup_completed: boolean;
  last_started_at: string | null;
  last_error: string | null;
}

export type AgentBridgeStatePatch = Partial<AgentBridgeStateRow> & { agent_id: string };

export interface AgentBridgeBypassRow {
  pattern: string;
  source: "default" | "user";
  created_at: string;
}

export type InspectorCustomHostKind = "llm" | "app" | "custom";

export interface InspectorCustomHostRow {
  host: string;
  enabled: boolean;
  label: string | null;
  kind: InspectorCustomHostKind;
  added_at: string;
  last_seen_at: string | null;
}

export interface AgentBridgeStateRepository {
  /** Every agent row, ordered by agent ID ascending. */
  list(): Promise<AgentBridgeStateRow[]>;
  get(agentId: string): Promise<AgentBridgeStateRow | null>;
  /**
   * Creates the row when missing (omitted flags default to false, omitted text
   * to null). For an existing row only the provided fields change; `undefined`
   * means "not provided", `null` clears a text field, an empty patch is a no-op.
   */
  upsert(patch: AgentBridgeStatePatch): Promise<void>;
  /** Upserts only `last_started_at`; other columns keep their value or default. */
  setLastStarted(agentId: string, timestamp: string): Promise<void>;
  /** Upserts only `last_error`; `null` clears it. */
  setLastError(agentId: string, error: string | null): Promise<void>;
}

export interface AgentBridgeBypassRepository {
  /** Default rows before user rows, each group ordered by pattern. */
  listAll(): Promise<AgentBridgeBypassRow[]>;
  /** User-owned patterns only, ordered by pattern. */
  listUserPatterns(): Promise<string[]>;
  /**
   * Atomically replaces every user row with `patterns`, all stamped with one
   * timestamp. Default rows are untouched; a collision rolls the whole
   * replacement back and leaves the previous user rows in place.
   */
  replaceUserPatterns(patterns: string[]): Promise<void>;
  /** Inserts missing defaults only; an existing pattern (any source) is kept. */
  seedDefaults(defaults: string[]): Promise<void>;
}

export interface InspectorCustomHostRepository {
  /** Ordered by host ascending; `enabledOnly: true` hides disabled hosts. */
  list(options?: { enabledOnly?: boolean }): Promise<InspectorCustomHostRow[]>;
  /**
   * Adds an enabled host. An existing host (or a row the table rejects) is
   * silently ignored and the existing row is left unchanged.
   */
  add(host: string, kind?: InspectorCustomHostKind, label?: string): Promise<void>;
  remove(host: string): Promise<void>;
  setEnabled(host: string, enabled: boolean): Promise<void>;
  touchLastSeen(host: string): Promise<void>;
  /** True only for an exact host match that is currently enabled. */
  isEnabledCustomHost(host: string): Promise<boolean>;
}
