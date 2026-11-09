/**
 * Key Templates — shared contract between the API layer and the dashboard.
 *
 * A template is an editable, secret-free snapshot of a complete API key policy.
 * Selecting a template prefills a draft key; the operator may edit every field and
 * the submitted policy is final (`POST /api/keys` with `policy`). Editing or deleting
 * a template never changes keys that were created from it.
 *
 * Never part of a policy: the secret, key hash/prefix, id, name, machine binding,
 * SSO identity, usage counters, cost/usage history, last-used timestamps, revocation
 * events, weighted pool allocations, context-source credentials and billing history.
 *
 * Empty-list semantics are the same as on a key:
 *   - `modelAccessMode: "restricted"` + `allowedModels: []` denies every raw model;
 *   - `allowedCombos: []` denies every combo, `["combo/*"]` explicitly allows all;
 *   - empty `allowedConnections` / `preferredConnections` / `allowedQuotas` /
 *     `allowedEndpoints` / `ipAllowlist` mean "no restriction".
 * `catalogScope` only shapes the `/v1/models` listing; it does not restrict execution.
 * `disableNonPublicModels` hides non-public models from the listing AND blocks them
 * at dispatch.
 */

export const KEY_TEMPLATE_SCHEMA_VERSION = 1 as const;
export type KeyTemplateSchemaVersion = typeof KEY_TEMPLATE_SCHEMA_VERSION;

/** The `combo/*` rule that grants every combo (an empty list grants none). */
export const KEY_TEMPLATE_ALL_COMBOS_RULE = "combo/*";

export type KeyTemplateModelAccessMode = "all" | "restricted";
export type KeyTemplateCatalogScope = "all" | "combos" | "models";
export type KeyTemplateStreamDefaultMode = "legacy" | "json";
export type KeyTemplateCacheDefaultMode = "legacy" | "bypass";
export type KeyTemplateCodexServiceMode = "inherit" | "default" | "priority" | "flex";
export type KeyTemplateResetInterval = "daily" | "weekly" | "monthly";

export interface KeyTemplateAccessSchedule {
  enabled: boolean;
  /** HH:MM */
  from: string;
  /** HH:MM */
  until: string;
  /** 0 (Sunday) … 6 (Saturday) */
  days: number[];
  /** IANA time zone */
  tz: string;
}

export interface KeyTemplateRateLimitRule {
  /** Requests allowed in the window. */
  limit: number;
  /** Window length in seconds. */
  window: number;
}

/**
 * Every persisted `api_keys` policy column, camelCase. All fields are required so a
 * policy is always complete and never depends on server-side defaults.
 */
export interface KeyTemplateKeyPolicy {
  modelAccessMode: KeyTemplateModelAccessMode;
  /** Exact ids, wildcards and dynamic patterns are kept verbatim. */
  allowedModels: string[];
  /** Deny-list patterns; always win over allow rules. */
  blockedModels: string[];
  allowedCombos: string[];
  /** Provider connection ids; empty = every connection. */
  allowedConnections: string[];
  /** Ordered preference; must be a subset of `allowedConnections` when that is non-empty. */
  preferredConnections: string[];
  /** Quota pool ids; empty = no pool restriction. */
  allowedQuotas: string[];
  noLog: boolean;
  autoResolve: boolean;
  /** Lifecycle: a created key starts disabled when false. */
  isActive: boolean;
  /** Lifecycle: a created key starts banned when true. */
  isBanned: boolean;
  accessSchedule: KeyTemplateAccessSchedule | null;
  maxRequestsPerDay: number | null;
  maxRequestsPerMinute: number | null;
  throttleDelayMs: number | null;
  rateLimits: KeyTemplateRateLimitRule[] | null;
  /** 0 = unlimited. */
  maxSessions: number;
  /** Stored allow-list of client IPs/CIDRs; empty = unrestricted. */
  ipAllowlist: string[];
  scopes: string[];
  proxyId: string | null;
  /** Endpoint allow-list; empty = every endpoint. */
  allowedEndpoints: string[];
  streamDefaultMode: KeyTemplateStreamDefaultMode;
  codexServiceMode: KeyTemplateCodexServiceMode;
  cacheDefaultMode: KeyTemplateCacheDefaultMode;
  /** Restricts listing AND dispatch to public models. */
  disableNonPublicModels: boolean;
  allowUsageCommand: boolean;
  usageLimitEnabled: boolean;
  dailyUsageLimitUsd: number | null;
  weeklyUsageLimitUsd: number | null;
  fiveHourUsageLimitUsd: number | null;
  chaosModeEnabled: boolean;
  compressionEnabled: boolean;
  allowAutoCombos: boolean;
  allowCcDiscoveryAliases: boolean;
  /** Listing only (`/v1/models`); never an execution restriction. */
  catalogScope: KeyTemplateCatalogScope;
  /** Enforced routing target; null = not pinned. */
  forcedModel: string | null;
}

/** Per-key spend budget configuration (counters and reset state are excluded). */
export interface KeyTemplateDomainBudget {
  /** 0 = no limit for the period. */
  dailyLimitUsd: number;
  weeklyLimitUsd: number;
  monthlyLimitUsd: number;
  /** 0 … 1 */
  warningThreshold: number;
  resetInterval: KeyTemplateResetInterval;
  /** HH:MM */
  resetTime: string;
}

/** Per-key TPM/RPM/monthly quota (null = unlimited for that dimension). */
export interface KeyTemplateQuotaLimits {
  tpmLimit: number | null;
  rpmLimit: number | null;
  monthlyAmountUsd: number | null;
}

export interface KeyTemplateTokenLimit {
  scopeType: "model" | "provider" | "global";
  /** Empty only for `global`. */
  scopeValue: string;
  tokenLimit: number;
  resetInterval: KeyTemplateResetInterval;
  resetTime: string | null;
  enabled: boolean;
}

export interface KeyTemplateAutoCandidateOverride {
  autoChannel: string;
  connectionId: string;
  excluded: boolean;
}

/** A reasoning routing rule bound to the key; the key id is assigned at creation. */
export interface KeyTemplateReasoningRule {
  name: string;
  description: string;
  scope: "apiKey";
  comboId: string | null;
  connectionId: string | null;
  modelPattern: string | null;
  sourceEffort: "any" | "missing" | "none" | "low" | "medium" | "high" | "xhigh" | "max" | "ultra";
  requestTags: string[];
  tagMatchMode: "any" | "all";
  effortMode: "inherit" | "default" | "force";
  targetEffort: "none" | "low" | "medium" | "high" | "xhigh" | "max" | "ultra" | null;
  targetKind: "keep" | "model" | "combo";
  targetModel: string | null;
  targetComboId: string | null;
  budgetAction: "preserve" | "remove" | "set";
  budgetTokens: number | null;
  priority: number;
  enabled: boolean;
}

export interface KeyTemplateRelatedPolicy {
  /** Key group memberships. Group permissions are shared by every member. */
  groupIds: string[];
  domainBudget: KeyTemplateDomainBudget | null;
  quotaLimits: KeyTemplateQuotaLimits | null;
  tokenLimits: KeyTemplateTokenLimit[];
  autoCandidateOverrides: KeyTemplateAutoCandidateOverride[];
  reasoningRules: KeyTemplateReasoningRule[];
}

export type KeyTemplateExpiry =
  | { mode: "none" }
  | {
      mode: "relative";
      /** Positive integer; the key expires this many seconds after creation. */
      ttlSeconds: number;
    };

export interface KeyTemplatePolicy {
  schemaVersion: KeyTemplateSchemaVersion;
  key: KeyTemplateKeyPolicy;
  related: KeyTemplateRelatedPolicy;
  expiry: KeyTemplateExpiry;
}

export interface KeyTemplate {
  id: string;
  name: string;
  description: string;
  /** Starts at 1 and increments on every successful update. */
  revision: number;
  schemaVersion: KeyTemplateSchemaVersion;
  policy: KeyTemplatePolicy;
  createdAt: string;
  updatedAt: string;
}

export type TemplateWarningCode =
  | "KEY_REVOKED"
  | "KEY_DISABLED"
  | "KEY_BANNED"
  | "KEY_EXPIRED"
  | "EXPIRY_NOT_DERIVABLE"
  | "EXPIRY_CONVERTED_TO_RELATIVE"
  | "SSO_IDENTITY_EXCLUDED"
  | "WEIGHTED_ALLOCATION_EXCLUDED"
  | "CONTEXT_SOURCES_EXCLUDED"
  | "BILLING_TEAM_EXCLUDED"
  | "GROUP_POLICY_SHARED";

export interface TemplateWarning {
  code: TemplateWarningCode;
  message: string;
  /** When true, `POST /api/key-templates` with `fromKeyId` must list `code` in `acknowledge`. */
  requiresAcknowledgement: boolean;
}

export type TemplateReferenceIssueCode =
  | "CONNECTION_NOT_FOUND"
  | "COMBO_NOT_FOUND"
  | "QUOTA_POOL_NOT_FOUND"
  | "PROXY_NOT_FOUND"
  | "GROUP_NOT_FOUND"
  | "GROUP_INACTIVE"
  | "REASONING_COMBO_NOT_FOUND"
  | "REASONING_CONNECTION_NOT_FOUND"
  | "INVALID_FIELD"
  | "UNREADABLE_SOURCE_FIELD"
  | "UNCLASSIFIED_SOURCE_FIELD";

export interface TemplateReferenceIssue {
  /** Dotted path into the policy, e.g. `key.allowedConnections.0` or `related.groupIds.1`. */
  path: string;
  /** Concrete reference identity, stable after an array item before it is removed. */
  value?: string;
  code: TemplateReferenceIssueCode;
  message: string;
  /**
   * True when a key cannot be created until the operator edits the reference: the stale
   * entry cannot be preserved faithfully or dropping it could broaden access. False for
   * narrowing references (allow-list entries, stale exclusions) that stay in place.
   * Stale entries are never pruned automatically.
   */
  blocking: boolean;
}

export type KeyTemplateErrorCode =
  | "UNAUTHORIZED"
  | "INVALID_JSON"
  | "VALIDATION_FAILED"
  | "TEMPLATE_NOT_FOUND"
  | "KEY_NOT_FOUND"
  | "TEMPLATE_NAME_CONFLICT"
  | "REVISION_CONFLICT"
  | "ACKNOWLEDGEMENT_REQUIRED"
  | "SOURCE_POLICY_UNREADABLE"
  | "REFERENCE_INVALID"
  | "POLICY_INVARIANT"
  | "INTERNAL_ERROR";

export interface KeyTemplateApiError {
  error: string;
  code: KeyTemplateErrorCode;
  issues?: TemplateReferenceIssue[];
  /** Present on ACKNOWLEDGEMENT_REQUIRED: every warning still awaiting acknowledgement. */
  warnings?: TemplateWarning[];
}

// ──── Request / response shapes ────

export interface ListKeyTemplatesResponse {
  templates: KeyTemplate[];
  /** Corrupt rows remain visible by identity and can be deleted without reading their policy. */
  unreadable: UnreadableKeyTemplate[];
}

export interface UnreadableKeyTemplate {
  id: string;
  name: string;
  revision: number;
  code: KeyTemplateErrorCode;
}

export type KeyTemplateRefStatus = "current" | "stale" | "missing";

/** One-time response: `key` is the only time the new secret is returned. */
export interface CreateKeyFromPolicyResponse {
  key: string;
  id: string;
  name: string;
  machineId: string;
  /** The effective stored policy (self-service usage scope is always added on create). */
  policy: KeyTemplatePolicy;
  expiresAt: string | null;
  templateRef?: { id: string; revision: number; status: KeyTemplateRefStatus };
}

/** Defaults identical to a key created through the normal form with no options set. */
export function createDefaultKeyTemplatePolicy(): KeyTemplatePolicy {
  return {
    schemaVersion: KEY_TEMPLATE_SCHEMA_VERSION,
    key: {
      modelAccessMode: "all",
      allowedModels: [],
      blockedModels: [],
      allowedCombos: [KEY_TEMPLATE_ALL_COMBOS_RULE],
      allowedConnections: [],
      preferredConnections: [],
      allowedQuotas: [],
      noLog: false,
      autoResolve: false,
      isActive: true,
      isBanned: false,
      accessSchedule: null,
      maxRequestsPerDay: null,
      maxRequestsPerMinute: null,
      throttleDelayMs: null,
      rateLimits: null,
      maxSessions: 0,
      ipAllowlist: [],
      scopes: [],
      proxyId: null,
      allowedEndpoints: [],
      streamDefaultMode: "legacy",
      codexServiceMode: "inherit",
      cacheDefaultMode: "legacy",
      disableNonPublicModels: false,
      allowUsageCommand: false,
      usageLimitEnabled: false,
      dailyUsageLimitUsd: null,
      weeklyUsageLimitUsd: null,
      fiveHourUsageLimitUsd: null,
      chaosModeEnabled: false,
      compressionEnabled: true,
      allowAutoCombos: true,
      allowCcDiscoveryAliases: true,
      catalogScope: "all",
      forcedModel: null,
    },
    related: {
      groupIds: [],
      domainBudget: null,
      quotaLimits: null,
      tokenLimits: [],
      autoCandidateOverrides: [],
      reasoningRules: [],
    },
    expiry: { mode: "none" },
  };
}
