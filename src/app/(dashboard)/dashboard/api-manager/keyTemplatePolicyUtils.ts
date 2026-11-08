import type {
  KeyTemplate,
  KeyTemplateAccessSchedule,
  KeyTemplateAutoCandidateOverride,
  KeyTemplateCacheDefaultMode,
  KeyTemplateCatalogScope,
  KeyTemplateCodexServiceMode,
  KeyTemplateDomainBudget,
  KeyTemplateExpiry,
  KeyTemplateKeyPolicy,
  KeyTemplateModelAccessMode,
  KeyTemplatePolicy,
  KeyTemplateQuotaLimits,
  KeyTemplateRateLimitRule,
  KeyTemplateReasoningRule,
  KeyTemplateRelatedPolicy,
  KeyTemplateResetInterval,
  KeyTemplateStreamDefaultMode,
  KeyTemplateTokenLimit,
  TemplateReferenceIssue,
  TemplateWarning,
  TemplateWarningCode,
} from "@/shared/types/keyTemplates";

export const KEY_TEMPLATE_SCHEMA_VERSION = 1 as const;
export const KEY_TEMPLATE_ALL_COMBOS_RULE = "combo/*" as const;
const SELF_USAGE_SCOPE = "self:usage";
const SELF_ACCOUNT_QUOTA_SCOPE = "self:account-quota";
const API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE = "policy:bypass-provider-quota";
const MANAGEMENT_SCOPE = "manage";

export type AccessEditorTab =
  "general" | "models" | "combos" | "connections" | "limits" | "behaviour";

function hasProviderQuotaBypassScope(scopes: readonly string[] | null | undefined): boolean {
  return Array.isArray(scopes) && scopes.includes(API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE);
}

function mergeApiKeyPermissionScopes(
  currentScopes: readonly string[] | null | undefined,
  options: {
    manageEnabled: boolean;
    selfUsageEnabled: boolean;
    selfAccountQuotaEnabled: boolean;
    bypassProviderQuotaPolicyEnabled: boolean;
  }
): string[] {
  const scopes = new Set<string>();
  if (options.manageEnabled) scopes.add(MANAGEMENT_SCOPE);
  if (options.selfUsageEnabled) scopes.add(SELF_USAGE_SCOPE);
  if (options.selfUsageEnabled && options.selfAccountQuotaEnabled) {
    scopes.add(SELF_ACCOUNT_QUOTA_SCOPE);
  }
  if (options.bypassProviderQuotaPolicyEnabled) {
    scopes.add(API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE);
  }
  for (const s of currentScopes ?? []) {
    if (
      typeof s === "string" &&
      s !== MANAGEMENT_SCOPE &&
      s !== SELF_USAGE_SCOPE &&
      s !== SELF_ACCOUNT_QUOTA_SCOPE &&
      s !== API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE
    ) {
      scopes.add(s);
    }
  }
  return [...scopes];
}

export function buildModelAccessSavePayload(input: {
  allowAll: boolean;
  selectedModels: readonly string[];
}): { modelAccessMode: "all" | "restricted"; allowedModels: string[] } {
  if (input.allowAll) {
    return { modelAccessMode: "all", allowedModels: [] };
  }
  return {
    modelAccessMode: "restricted",
    allowedModels: Array.from(new Set(input.selectedModels.map((m) => m.trim()).filter(Boolean))),
  };
}

export function prunePreferredConnections(
  selectedPreferredConnections: readonly string[],
  allowAllConnections: boolean,
  selectedConnections: readonly string[]
): string[] {
  if (allowAllConnections || selectedConnections.length === 0) {
    return Array.from(new Set(selectedPreferredConnections.filter(Boolean)));
  }
  const allowedSet = new Set(selectedConnections);
  return Array.from(
    new Set(selectedPreferredConnections.filter((id) => Boolean(id) && allowedSet.has(id)))
  );
}

export function validateKeyName(
  name: string,
  t: (key: string, values?: Record<string, unknown>) => string
): { valid: boolean; error?: string } {
  const max = 200;
  if (!name || !name.trim()) {
    return { valid: false, error: t("keyNameRequired") };
  }
  if (name.length > max) {
    return { valid: false, error: t("keyNameTooLong", { max }) };
  }
  if (!/^[\p{L}\p{N}_\-\s]+$/u.test(name)) {
    return { valid: false, error: t("keyNameInvalid") };
  }
  return { valid: true };
}

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
      scopes: [SELF_USAGE_SCOPE],
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

export type {
  KeyTemplate,
  KeyTemplateAccessSchedule,
  KeyTemplateAutoCandidateOverride,
  KeyTemplateCacheDefaultMode,
  KeyTemplateCatalogScope,
  KeyTemplateCodexServiceMode,
  KeyTemplateDomainBudget,
  KeyTemplateExpiry,
  KeyTemplateKeyPolicy,
  KeyTemplateModelAccessMode,
  KeyTemplatePolicy,
  KeyTemplateQuotaLimits,
  KeyTemplateRateLimitRule,
  KeyTemplateReasoningRule,
  KeyTemplateRelatedPolicy,
  KeyTemplateResetInterval,
  KeyTemplateStreamDefaultMode,
  KeyTemplateTokenLimit,
  TemplateReferenceIssue,
  TemplateWarning,
  TemplateWarningCode,
};

export interface PolicyEditorFormState {
  // General & Scopes
  isActive: boolean;
  isBanned: boolean;
  manageEnabled: boolean;
  selfUsageEnabled: boolean;
  selfAccountQuotaEnabled: boolean;
  bypassProviderQuotaPolicyEnabled: boolean;
  extraScopes: string[];
  allowAllEndpoints: boolean;
  selectedEndpoints: string[];
  ipAllowlist: string[];
  proxyId: string;

  // Expiry
  expiryMode: "none" | "relative";
  expiryTtlValue: string;
  expiryTtlUnit: "seconds" | "minutes" | "hours" | "days";

  // Models & Catalog
  allowAllModels: boolean;
  selectedModels: string[];
  blockedModels: string[];
  catalogScope: KeyTemplateCatalogScope;
  disableNonPublicModels: boolean;
  forcedModel: string;

  // Combos
  allowAllCombos: boolean;
  selectedCombos: string[];
  allowAutoCombos: boolean;
  allowCcDiscoveryAliases: boolean;
  autoCandidateOverrides: KeyTemplateAutoCandidateOverride[];

  // Connections
  allowAllConnections: boolean;
  selectedConnections: string[];
  selectedPreferredConnections: string[];

  // Limits & Quotas
  maxSessions: number;
  throttleDelayMs: number;
  maxRequestsPerDay: string;
  maxRequestsPerMinute: string;
  rateLimits: KeyTemplateRateLimitRule[];
  scheduleEnabled: boolean;
  scheduleFrom: string;
  scheduleUntil: string;
  scheduleDays: number[];
  scheduleTz: string;
  usageLimitEnabled: boolean;
  dailyUsageLimitUsd: string;
  weeklyUsageLimitUsd: string;
  allowedQuotas: string[];
  quotaLimitsEnabled: boolean;
  quotaTpmLimit: string;
  quotaRpmLimit: string;
  quotaMonthlyUsd: string;
  domainBudgetEnabled: boolean;
  domainDailyLimitUsd: string;
  domainWeeklyLimitUsd: string;
  domainMonthlyLimitUsd: string;
  domainWarningThresholdPct: string;
  domainResetInterval: KeyTemplateResetInterval;
  domainResetTime: string;
  tokenLimits: KeyTemplateTokenLimit[];

  // Behaviour & Related
  noLog: boolean;
  autoResolve: boolean;
  streamDefaultMode: KeyTemplateStreamDefaultMode;
  cacheDefaultMode: KeyTemplateCacheDefaultMode;
  codexServiceMode: KeyTemplateCodexServiceMode;
  compressionEnabled: boolean;
  chaosModeEnabled: boolean;
  allowUsageCommand: boolean;
  groupIds: string[];
  reasoningRules: KeyTemplateReasoningRule[];
}

function defaultTimeZone(): string {
  return typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC";
}

export function decomposeTtlSeconds(ttlSeconds: number | undefined): {
  value: string;
  unit: "seconds" | "minutes" | "hours" | "days";
} {
  if (!ttlSeconds || !Number.isFinite(ttlSeconds) || ttlSeconds <= 0) {
    return { value: "30", unit: "days" };
  }
  const sec = Math.floor(ttlSeconds);
  if (sec % 86400 === 0) {
    return { value: String(sec / 86400), unit: "days" };
  }
  if (sec % 3600 === 0) {
    return { value: String(sec / 3600), unit: "hours" };
  }
  if (sec % 60 === 0) return { value: String(sec / 60), unit: "minutes" };
  return { value: String(sec), unit: "seconds" };
}

export const decomposeRelativeTtlSeconds = decomposeTtlSeconds;

export function composeTtlSeconds(
  valueStr: string,
  unit: "seconds" | "minutes" | "hours" | "days"
): number | null {
  const num = Number(valueStr);
  if (!Number.isFinite(num) || num <= 0) return null;
  const multiplier =
    unit === "days" ? 86400 : unit === "hours" ? 3600 : unit === "minutes" ? 60 : 1;
  return Math.max(1, Math.round(num * multiplier));
}

export const composeRelativeTtlSeconds = composeTtlSeconds;

function numberToInputString(val: number | null | undefined): string {
  return typeof val === "number" && Number.isFinite(val) && val > 0 ? String(val) : "";
}

function parseOptionalPositiveNumber(val: string): number | null {
  if (!val || !val.trim()) return null;
  const parsed = Number(val);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function parseOptionalPositiveInt(val: string): number | null {
  const num = parseOptionalPositiveNumber(val);
  return num !== null ? Math.floor(num) : null;
}

export function createDefaultClientKeyTemplatePolicy(): KeyTemplatePolicy {
  return createDefaultKeyTemplatePolicy();
}

export function createDefaultPolicyEditorFormState(): PolicyEditorFormState {
  return policyToEditorFormState(createDefaultClientKeyTemplatePolicy());
}

export function policyToEditorFormState(
  policyInput?: KeyTemplatePolicy | null
): PolicyEditorFormState {
  const policy = policyInput ?? createDefaultClientKeyTemplatePolicy();
  const key = policy.key;
  const related = policy.related;
  const expiry = policy.expiry;

  const allowedModels = Array.isArray(key.allowedModels) ? [...key.allowedModels] : [];
  const blockedModels = Array.isArray(key.blockedModels) ? [...key.blockedModels] : [];
  const rawCombos = Array.isArray(key.allowedCombos) ? key.allowedCombos : [];
  const allowAllCombos = rawCombos.includes(KEY_TEMPLATE_ALL_COMBOS_RULE);
  const selectedCombos = rawCombos.filter((c) => c !== KEY_TEMPLATE_ALL_COMBOS_RULE);

  const allowedConnections = Array.isArray(key.allowedConnections)
    ? [...key.allowedConnections]
    : [];
  const allowAllConnections = allowedConnections.length === 0;
  const preferredConnections = Array.isArray(key.preferredConnections)
    ? [...key.preferredConnections]
    : [];

  const allowedEndpoints = Array.isArray(key.allowedEndpoints) ? [...key.allowedEndpoints] : [];
  const allowAllEndpoints = allowedEndpoints.length === 0;

  const scopes = Array.isArray(key.scopes) ? key.scopes : [];
  const manageEnabled = scopes.includes("manage");
  const selfUsageEnabled = scopes.includes(SELF_USAGE_SCOPE);
  const selfAccountQuotaEnabled = scopes.includes(SELF_ACCOUNT_QUOTA_SCOPE);
  const bypassProviderQuotaPolicyEnabled = hasProviderQuotaBypassScope(scopes);
  const managedScopeSet = new Set([
    "manage",
    SELF_USAGE_SCOPE,
    SELF_ACCOUNT_QUOTA_SCOPE,
    API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE,
  ]);
  const extraScopes = scopes.filter((s) => !managedScopeSet.has(s));

  const ttlDecomposed = decomposeTtlSeconds(
    expiry?.mode === "relative" ? expiry.ttlSeconds : undefined
  );

  const schedule = key.accessSchedule;
  const domainBudget = related?.domainBudget;
  const quotaLimits = related?.quotaLimits;

  return {
    isActive: key.isActive !== false,
    isBanned: key.isBanned === true,
    manageEnabled,
    selfUsageEnabled,
    selfAccountQuotaEnabled,
    bypassProviderQuotaPolicyEnabled,
    extraScopes,
    allowAllEndpoints,
    selectedEndpoints: allowedEndpoints,
    ipAllowlist: Array.isArray(key.ipAllowlist) ? [...key.ipAllowlist] : [],
    proxyId: key.proxyId ?? "",

    expiryMode: expiry?.mode === "relative" ? "relative" : "none",
    expiryTtlValue: ttlDecomposed.value,
    expiryTtlUnit: ttlDecomposed.unit,

    allowAllModels: key.modelAccessMode === "restricted" ? false : allowedModels.length === 0,
    selectedModels: allowedModels,
    blockedModels,
    catalogScope: key.catalogScope ?? "all",
    disableNonPublicModels: key.disableNonPublicModels === true,
    forcedModel: key.forcedModel ?? "",

    allowAllCombos,
    selectedCombos,
    allowAutoCombos: key.allowAutoCombos !== false,
    allowCcDiscoveryAliases: key.allowCcDiscoveryAliases !== false,
    autoCandidateOverrides: Array.isArray(related?.autoCandidateOverrides)
      ? related.autoCandidateOverrides.map((o) => ({ ...o }))
      : [],

    allowAllConnections,
    selectedConnections: allowedConnections,
    selectedPreferredConnections: prunePreferredConnections(
      preferredConnections,
      allowAllConnections,
      allowedConnections
    ),

    maxSessions: typeof key.maxSessions === "number" && key.maxSessions > 0 ? key.maxSessions : 0,
    throttleDelayMs:
      typeof key.throttleDelayMs === "number" && key.throttleDelayMs > 0 ? key.throttleDelayMs : 0,
    maxRequestsPerDay: numberToInputString(key.maxRequestsPerDay),
    maxRequestsPerMinute: numberToInputString(key.maxRequestsPerMinute),
    rateLimits: Array.isArray(key.rateLimits) ? key.rateLimits.map((r) => ({ ...r })) : [],
    scheduleEnabled: schedule?.enabled === true,
    scheduleFrom: schedule?.from ?? "08:00",
    scheduleUntil: schedule?.until ?? "18:00",
    scheduleDays: Array.isArray(schedule?.days) ? [...schedule.days] : [1, 2, 3, 4, 5],
    scheduleTz: schedule?.tz ?? defaultTimeZone(),
    usageLimitEnabled: key.usageLimitEnabled === true,
    dailyUsageLimitUsd: numberToInputString(key.dailyUsageLimitUsd),
    weeklyUsageLimitUsd: numberToInputString(key.weeklyUsageLimitUsd),
    allowedQuotas: Array.isArray(key.allowedQuotas) ? [...key.allowedQuotas] : [],

    quotaLimitsEnabled:
      quotaLimits !== null &&
      quotaLimits !== undefined &&
      ((quotaLimits.tpmLimit ?? 0) > 0 ||
        (quotaLimits.rpmLimit ?? 0) > 0 ||
        (quotaLimits.monthlyAmountUsd ?? 0) > 0),
    quotaTpmLimit: numberToInputString(quotaLimits?.tpmLimit),
    quotaRpmLimit: numberToInputString(quotaLimits?.rpmLimit),
    quotaMonthlyUsd: numberToInputString(quotaLimits?.monthlyAmountUsd),

    domainBudgetEnabled: domainBudget !== null && domainBudget !== undefined,
    domainDailyLimitUsd:
      domainBudget && domainBudget.dailyLimitUsd > 0 ? String(domainBudget.dailyLimitUsd) : "",
    domainWeeklyLimitUsd:
      domainBudget && domainBudget.weeklyLimitUsd > 0 ? String(domainBudget.weeklyLimitUsd) : "",
    domainMonthlyLimitUsd:
      domainBudget && domainBudget.monthlyLimitUsd > 0 ? String(domainBudget.monthlyLimitUsd) : "",
    domainWarningThresholdPct: domainBudget
      ? String((domainBudget.warningThreshold ?? 0.8) * 100)
      : "80",
    domainResetInterval: domainBudget?.resetInterval ?? "daily",
    domainResetTime: domainBudget?.resetTime ?? "00:00",

    tokenLimits: Array.isArray(related?.tokenLimits)
      ? related.tokenLimits.map((tl) => ({ ...tl }))
      : [],

    noLog: key.noLog === true,
    autoResolve: key.autoResolve === true,
    streamDefaultMode: key.streamDefaultMode === "json" ? "json" : "legacy",
    cacheDefaultMode: key.cacheDefaultMode === "bypass" ? "bypass" : "legacy",
    codexServiceMode: key.codexServiceMode ?? "inherit",
    compressionEnabled: key.compressionEnabled !== false,
    chaosModeEnabled: key.chaosModeEnabled === true,
    allowUsageCommand: key.allowUsageCommand === true,
    groupIds: Array.isArray(related?.groupIds) ? [...related.groupIds] : [],
    reasoningRules: Array.isArray(related?.reasoningRules)
      ? related.reasoningRules.map((r) => ({
          ...r,
          requestTags: Array.isArray(r.requestTags) ? [...r.requestTags] : [],
        }))
      : [],
  };
}

export function editorFormStateToPolicy(state: PolicyEditorFormState): KeyTemplatePolicy {
  const modelAccess = buildModelAccessSavePayload({
    allowAll: state.allowAllModels,
    selectedModels: state.selectedModels,
  });

  // Preserve exact combo semantics: allowAllCombos -> ["combo/*"], otherwise exact selectedCombos (even if [] = deny-all)
  const allowedCombos = state.allowAllCombos
    ? [KEY_TEMPLATE_ALL_COMBOS_RULE]
    : [...state.selectedCombos];

  // Preserve connection semantics without dropping stale reference IDs unless user switched to allowAllConnections
  const allowedConnections = state.allowAllConnections
    ? []
    : state.selectedConnections.filter((id) => typeof id === "string" && id.trim().length > 0);

  const preferredConnections = prunePreferredConnections(
    state.selectedPreferredConnections,
    state.allowAllConnections,
    allowedConnections
  );

  const scopes = mergeApiKeyPermissionScopes(state.extraScopes, {
    manageEnabled: state.manageEnabled,
    selfUsageEnabled: state.selfUsageEnabled,
    selfAccountQuotaEnabled: state.selfAccountQuotaEnabled,
    bypassProviderQuotaPolicyEnabled: state.bypassProviderQuotaPolicyEnabled,
  });

  const ttlSeconds =
    state.expiryMode === "relative"
      ? (composeTtlSeconds(state.expiryTtlValue, state.expiryTtlUnit) ?? 86400)
      : undefined;

  const expiry: KeyTemplateExpiry =
    state.expiryMode === "relative" && ttlSeconds
      ? { mode: "relative", ttlSeconds }
      : { mode: "none" };

  const quotaTpm = parseOptionalPositiveNumber(state.quotaTpmLimit);
  const quotaRpm = parseOptionalPositiveNumber(state.quotaRpmLimit);
  const quotaMonthly = parseOptionalPositiveNumber(state.quotaMonthlyUsd);
  const quotaLimits: KeyTemplateQuotaLimits | null =
    state.quotaLimitsEnabled && (quotaTpm !== null || quotaRpm !== null || quotaMonthly !== null)
      ? {
          tpmLimit: quotaTpm,
          rpmLimit: quotaRpm,
          monthlyAmountUsd: quotaMonthly,
        }
      : null;

  const domainDaily = parseOptionalPositiveNumber(state.domainDailyLimitUsd) ?? 0;
  const domainWeekly = parseOptionalPositiveNumber(state.domainWeeklyLimitUsd) ?? 0;
  const domainMonthly = parseOptionalPositiveNumber(state.domainMonthlyLimitUsd) ?? 0;
  const warnPct = Number(state.domainWarningThresholdPct);
  const warningThreshold =
    Number.isFinite(warnPct) && warnPct >= 0 && warnPct <= 100 ? warnPct / 100 : 0.8;

  const domainBudget: KeyTemplateDomainBudget | null = state.domainBudgetEnabled
    ? {
        dailyLimitUsd: domainDaily,
        weeklyLimitUsd: domainWeekly,
        monthlyLimitUsd: domainMonthly,
        warningThreshold,
        resetInterval: state.domainResetInterval,
        resetTime: state.domainResetTime || "00:00",
      }
    : null;

  const throttle = Math.max(0, Math.min(300000, Math.floor(Number(state.throttleDelayMs) || 0)));
  const maxSessions = Math.max(0, Math.floor(Number(state.maxSessions) || 0));

  return {
    schemaVersion: 1,
    key: {
      modelAccessMode: modelAccess.modelAccessMode,
      allowedModels: modelAccess.allowedModels,
      blockedModels: [...state.blockedModels],
      allowedCombos,
      allowedConnections,
      preferredConnections,
      allowedQuotas: state.allowedQuotas.filter(
        (id) => typeof id === "string" && id.trim().length > 0
      ),
      noLog: state.noLog,
      autoResolve: state.autoResolve,
      isActive: state.isActive,
      isBanned: state.isBanned,
      accessSchedule: state.scheduleEnabled
        ? {
            enabled: true,
            from: state.scheduleFrom || "08:00",
            until: state.scheduleUntil || "18:00",
            days: state.scheduleDays,
            tz: state.scheduleTz || "UTC",
          }
        : null,
      maxRequestsPerDay: parseOptionalPositiveInt(state.maxRequestsPerDay),
      maxRequestsPerMinute: parseOptionalPositiveInt(state.maxRequestsPerMinute),
      throttleDelayMs: throttle > 0 ? throttle : null,
      rateLimits: state.rateLimits.length > 0 ? state.rateLimits : null,
      maxSessions,
      ipAllowlist: state.ipAllowlist.filter((ip) => typeof ip === "string" && ip.trim().length > 0),
      scopes,
      proxyId: state.proxyId.trim() || null,
      allowedEndpoints: state.allowAllEndpoints ? [] : state.selectedEndpoints,
      streamDefaultMode: state.streamDefaultMode,
      codexServiceMode: state.codexServiceMode,
      cacheDefaultMode: state.cacheDefaultMode,
      disableNonPublicModels: state.disableNonPublicModels,
      allowUsageCommand: state.allowUsageCommand,
      usageLimitEnabled: state.usageLimitEnabled,
      dailyUsageLimitUsd: parseOptionalPositiveNumber(state.dailyUsageLimitUsd),
      weeklyUsageLimitUsd: parseOptionalPositiveNumber(state.weeklyUsageLimitUsd),
      chaosModeEnabled: state.chaosModeEnabled,
      compressionEnabled: state.compressionEnabled,
      allowAutoCombos: state.allowAutoCombos,
      allowCcDiscoveryAliases: state.allowCcDiscoveryAliases,
      catalogScope: state.catalogScope,
      forcedModel: state.forcedModel.trim() || null,
    },
    related: {
      groupIds: state.groupIds.filter((id) => typeof id === "string" && id.trim().length > 0),
      domainBudget,
      quotaLimits,
      tokenLimits: state.tokenLimits.map((tl) => ({
        ...tl,
        scopeValue: tl.scopeType === "global" ? "" : tl.scopeValue.trim(),
      })),
      autoCandidateOverrides: state.autoCandidateOverrides.filter(
        (o) => o.autoChannel.trim().length > 0 && o.connectionId.trim().length > 0
      ),
      reasoningRules: state.reasoningRules.map((r) => ({
        ...r,
        name: r.name.trim(),
        description: r.description.trim(),
      })),
    },
    expiry,
  };
}

export function mapReferenceIssueToTab(path: string): AccessEditorTab {
  if (
    path.startsWith("key.allowedModels") ||
    path.startsWith("key.blockedModels") ||
    path.startsWith("key.forcedModel")
  ) {
    return "models";
  }
  if (path.startsWith("key.allowedCombos") || path.startsWith("related.autoCandidateOverrides")) {
    return "combos";
  }
  if (path.startsWith("key.allowedConnections") || path.startsWith("key.preferredConnections")) {
    return "connections";
  }
  if (
    path.startsWith("key.allowedQuotas") ||
    path.startsWith("related.domainBudget") ||
    path.startsWith("related.quotaLimits") ||
    path.startsWith("related.tokenLimits") ||
    path.startsWith("key.rateLimits") ||
    path.startsWith("key.accessSchedule")
  ) {
    return "limits";
  }
  if (path.startsWith("related.groupIds") || path.startsWith("related.reasoningRules")) {
    return "behaviour";
  }
  return "general";
}

/**
 * Compute active reference issues given both server-reported `referenceIssues` and
 * current local `formState` so that when the operator removes a stale ID or switches
 * to unrestricted mode, the corresponding issue is resolved immediately in the UI.
 */
export function resolveActiveReferenceIssues(
  state: PolicyEditorFormState,
  serverIssues: readonly TemplateReferenceIssue[],
  catalog?: {
    connectionIds?: ReadonlySet<string>;
    comboNames?: ReadonlySet<string>;
    comboIds?: ReadonlySet<string>;
    quotaPoolIds?: ReadonlySet<string>;
    proxyIds?: ReadonlySet<string>;
    groupIds?: ReadonlySet<string>;
  }
): TemplateReferenceIssue[] {
  const active: TemplateReferenceIssue[] = [];
  const seenKey = new Set<string>();

  const pushIssue = (issue: TemplateReferenceIssue) => {
    const k = `${issue.path}::${issue.code}`;
    if (!seenKey.has(k)) {
      seenKey.add(k);
      active.push(issue);
    }
  };

  for (const issue of serverIssues) {
    if (isServerIssueStillPresent(state, issue, catalog)) {
      pushIssue(issue);
    }
  }

  if (catalog) {
    if (catalog.connectionIds && catalog.connectionIds.size > 0 && !state.allowAllConnections) {
      state.selectedConnections.forEach((id, idx) => {
        if (!catalog.connectionIds!.has(id)) {
          pushIssue({
            path: `key.allowedConnections.${idx}`,
            code: "CONNECTION_NOT_FOUND",
            message: `Connection "${id}" no longer exists.`,
            blocking: state.selectedConnections.length <= 1,
          });
        }
      });
    }
    if (catalog.comboNames && catalog.comboNames.size > 0 && !state.allowAllCombos) {
      state.selectedCombos.forEach((name, idx) => {
        if (!name.startsWith("rt-") && !catalog.comboNames!.has(name)) {
          pushIssue({
            path: `key.allowedCombos.${idx}`,
            code: "COMBO_NOT_FOUND",
            message: `Combo "${name}" no longer exists.`,
            blocking: false,
          });
        }
      });
    }
    if (catalog.quotaPoolIds && catalog.quotaPoolIds.size > 0) {
      state.allowedQuotas.forEach((poolId, idx) => {
        if (!catalog.quotaPoolIds!.has(poolId)) {
          pushIssue({
            path: `key.allowedQuotas.${idx}`,
            code: "QUOTA_POOL_NOT_FOUND",
            message: `Quota pool "${poolId}" no longer exists.`,
            blocking: state.allowedQuotas.length <= 1,
          });
        }
      });
    }
    if (catalog.proxyIds && catalog.proxyIds.size > 0 && state.proxyId.trim()) {
      if (!catalog.proxyIds.has(state.proxyId.trim())) {
        pushIssue({
          path: "key.proxyId",
          code: "PROXY_NOT_FOUND",
          message: `Proxy "${state.proxyId.trim()}" no longer exists.`,
          blocking: true,
        });
      }
    }
    if (catalog.groupIds && catalog.groupIds.size > 0) {
      state.groupIds.forEach((gid, idx) => {
        if (!catalog.groupIds!.has(gid)) {
          pushIssue({
            path: `related.groupIds.${idx}`,
            code: "GROUP_NOT_FOUND",
            message: `Key group "${gid}" is missing or inactive.`,
            blocking: true,
          });
        }
      });
    }
  }

  return active;
}

function isServerIssueStillPresent(
  state: PolicyEditorFormState,
  issue: TemplateReferenceIssue,
  catalog?: Parameters<typeof resolveActiveReferenceIssues>[2]
): boolean {
  const currentPolicy = editorFormStateToPolicy(state);
  const current = issue.path
    .replace(/^policy\./, "")
    .split(".")
    .reduce<unknown>(
      (value, part) =>
        value && typeof value === "object" ? (value as Record<string, unknown>)[part] : undefined,
      currentPolicy
    );
  const known =
    issue.code === "PROXY_NOT_FOUND"
      ? catalog?.proxyIds
      : issue.code === "GROUP_NOT_FOUND"
        ? catalog?.groupIds
        : issue.code === "QUOTA_POOL_NOT_FOUND"
          ? catalog?.quotaPoolIds
          : issue.code === "CONNECTION_NOT_FOUND" || issue.code === "REASONING_CONNECTION_NOT_FOUND"
            ? catalog?.connectionIds
            : issue.code === "COMBO_NOT_FOUND"
              ? catalog?.comboNames
              : issue.code === "REASONING_COMBO_NOT_FOUND"
                ? catalog?.comboIds
                : undefined;
  if (known && (current === undefined || current === null || current === "")) return false;
  if (known && typeof current === "string") return !known.has(current);
  const parts = issue.path.split(".");
  if (issue.path.startsWith("key.allowedConnections")) {
    if (state.allowAllConnections) return false;
    const idx = Number(parts[2]);
    if (Number.isInteger(idx)) {
      return idx < state.selectedConnections.length;
    }
    return state.selectedConnections.length > 0;
  }
  if (issue.path.startsWith("key.preferredConnections")) {
    const idx = Number(parts[2]);
    if (Number.isInteger(idx)) {
      return idx < state.selectedPreferredConnections.length;
    }
    return state.selectedPreferredConnections.length > 0;
  }
  if (issue.path.startsWith("key.allowedCombos")) {
    if (state.allowAllCombos) return false;
    const idx = Number(parts[2]);
    if (Number.isInteger(idx)) {
      return idx < state.selectedCombos.length;
    }
    return state.selectedCombos.length > 0;
  }
  if (issue.path.startsWith("key.allowedQuotas")) {
    const idx = Number(parts[2]);
    if (Number.isInteger(idx)) {
      return idx < state.allowedQuotas.length;
    }
    return state.allowedQuotas.length > 0;
  }
  if (issue.path === "key.proxyId") {
    return state.proxyId.trim().length > 0;
  }
  if (issue.path.startsWith("related.groupIds")) {
    const idx = Number(parts[2]);
    if (Number.isInteger(idx)) {
      return idx < state.groupIds.length;
    }
    return state.groupIds.length > 0;
  }
  if (issue.path.startsWith("related.autoCandidateOverrides")) {
    const idx = Number(parts[2]);
    if (Number.isInteger(idx)) {
      return idx < state.autoCandidateOverrides.length;
    }
    return state.autoCandidateOverrides.length > 0;
  }
  if (issue.path.startsWith("related.reasoningRules")) {
    const idx = Number(parts[2]);
    if (Number.isInteger(idx)) {
      return idx < state.reasoningRules.length;
    }
    return state.reasoningRules.length > 0;
  }
  return true;
}

export function validatePolicyEditorState(
  state: PolicyEditorFormState,
  t?: (key: string, values?: Record<string, unknown>) => string
): Record<AccessEditorTab, string[]> {
  const tr = t ?? ((k: string) => k);
  const errors: Record<AccessEditorTab, string[]> = {
    general: [],
    models: [],
    combos: [],
    connections: [],
    limits: [],
    behaviour: [],
  };

  if (state.expiryMode === "relative") {
    const ttl = composeTtlSeconds(state.expiryTtlValue, state.expiryTtlUnit);
    if (ttl === null || ttl <= 0) {
      errors.general.push(tr("templateInvalidRelativeExpiry"));
    }
  }

  if (!state.allowAllConnections && state.selectedConnections.length === 0) {
    errors.connections.push(tr("selectAtLeastOneConnection"));
  }

  if (state.extraScopes.includes("lease:exclusive")) {
    if (state.allowAllConnections || state.selectedConnections.length === 0) {
      errors.connections.push(tr("selectAtLeastOneConnection"));
    }
  }

  if (state.throttleDelayMs < 0 || state.throttleDelayMs > 300000) {
    errors.limits.push(tr("throttleDelayRangeError"));
  }
  if (state.maxSessions < 0) {
    errors.limits.push(tr("maxSessionsNegativeError"));
  }
  for (const rl of state.rateLimits) {
    if (!rl.limit || rl.limit < 1 || !rl.window || rl.window < 1) {
      errors.limits.push(tr("rateLimitPositiveError"));
      break;
    }
  }
  for (const tl of state.tokenLimits) {
    if (tl.resetTime !== null && !/^([01]\d|2[0-3]):[0-5]\d$/.test(tl.resetTime)) {
      errors.limits.push(tr("templateInvalidResetTime"));
      break;
    }
    if (!tl.tokenLimit || tl.tokenLimit < 1 || !Number.isInteger(Number(tl.tokenLimit))) {
      errors.limits.push(tr("templateInvalidTokenLimit"));
      break;
    }
    if (tl.scopeType !== "global" && !tl.scopeValue.trim()) {
      errors.limits.push(tr("templateTokenLimitScopeRequired"));
      break;
    }
  }
  for (const rule of state.reasoningRules) {
    if (
      (rule.targetKind === "model" && !rule.targetModel?.trim()) ||
      (rule.targetKind === "combo" && !rule.targetComboId?.trim())
    ) {
      errors.behaviour.push(tr("templateReasoningTargetRequired"));
      break;
    }
    if (rule.requestTags.some((tag) => !tag.trim())) {
      errors.behaviour.push(tr("templateReasoningTagsInvalid"));
      break;
    }
    if (!rule.name.trim()) {
      errors.behaviour.push(tr("templateReasoningRuleNameRequired"));
      break;
    }
    if (rule.budgetAction === "set" && (!rule.budgetTokens || rule.budgetTokens <= 0)) {
      errors.behaviour.push(tr("templateReasoningRuleBudgetInvalid"));
      break;
    }
    if (rule.targetEffort === "none" && rule.budgetAction === "set") {
      errors.behaviour.push(tr("templateReasoningRuleEffortBudgetConflict"));
      break;
    }
  }

  return errors;
}

export interface PolicySummaryBadge {
  id: string;
  label: string;
  tone: "default" | "success" | "warning" | "error" | "info";
  icon: string;
}

export function summarizeKeyTemplatePolicy(
  policy: KeyTemplatePolicy,
  t: (key: string, values?: Record<string, unknown>) => string
): PolicySummaryBadge[] {
  const badges: PolicySummaryBadge[] = [];
  const k = policy.key;
  const r = policy.related;

  // 1. Execution access: Models
  if (k.modelAccessMode === "restricted") {
    if (k.allowedModels.length === 0) {
      badges.push({
        id: "models-deny-all",
        label: t("templateSummaryModelsDenyAll"),
        tone: "error",
        icon: "block",
      });
    } else {
      badges.push({
        id: "models-restricted",
        label: t("templateSummaryModelsRestricted", { count: k.allowedModels.length }),
        tone: "warning",
        icon: "lock",
      });
    }
  } else {
    badges.push({
      id: "models-all",
      label: t("allModels"),
      tone: "success",
      icon: "lock_open",
    });
  }

  if (k.blockedModels.length > 0) {
    badges.push({
      id: "models-blocked",
      label: t("templateSummaryBlockedModels", { count: k.blockedModels.length }),
      tone: "warning",
      icon: "gpp_bad",
    });
  }

  // 2. Execution access: Combos
  if (k.allowedCombos.includes(KEY_TEMPLATE_ALL_COMBOS_RULE)) {
    badges.push({
      id: "combos-all",
      label: t("templateSummaryAllCombos"),
      tone: "info",
      icon: "hub",
    });
  } else if (k.allowedCombos.length === 0) {
    badges.push({
      id: "combos-none",
      label: t("templateSummaryCombosDenyAll"),
      tone: "warning",
      icon: "hub",
    });
  } else {
    badges.push({
      id: "combos-restricted",
      label: t("templateSummaryCombosCount", { count: k.allowedCombos.length }),
      tone: "info",
      icon: "hub",
    });
  }

  // 3. Connections
  if (k.allowedConnections.length > 0) {
    badges.push({
      id: "connections",
      label: t("templateSummaryConnectionsCount", { count: k.allowedConnections.length }),
      tone: "info",
      icon: "cable",
    });
  }

  // 4. Listing vs Execution
  if (k.catalogScope && k.catalogScope !== "all") {
    badges.push({
      id: "catalog-scope",
      label: t("templateSummaryCatalogListingOnly", { scope: k.catalogScope }),
      tone: "default",
      icon: "list",
    });
  }
  if (k.disableNonPublicModels) {
    badges.push({
      id: "public-only",
      label: t("templateSummaryPublicModelsExecAndList"),
      tone: "warning",
      icon: "verified_user",
    });
  }

  // 5. Scopes / Lifecycle / Expiry
  if (k.scopes.includes("manage")) {
    badges.push({
      id: "scope-manage",
      label: "manage",
      tone: "error",
      icon: "admin_panel_settings",
    });
  }
  if (!k.isActive) {
    badges.push({
      id: "inactive",
      label: t("disabled"),
      tone: "error",
      icon: "pause_circle",
    });
  }
  if (k.isBanned) {
    badges.push({
      id: "banned",
      label: "BANNED",
      tone: "error",
      icon: "gavel",
    });
  }
  if (policy.expiry.mode === "relative") {
    const ttl = decomposeTtlSeconds(policy.expiry.ttlSeconds);
    badges.push({
      id: "expiry-relative",
      label: `TTL: ${ttl.value} ${ttl.unit}`,
      tone: "default",
      icon: "timer",
    });
  }

  // 6. Related & Limits
  if (k.usageLimitEnabled || r.domainBudget || r.quotaLimits || r.tokenLimits.length > 0) {
    badges.push({
      id: "budgets",
      label: t("templateSummaryBudgetsConfigured"),
      tone: "success",
      icon: "paid",
    });
  }
  if (r.groupIds.length > 0) {
    badges.push({
      id: "groups",
      label: t("templateSummaryGroupsCount", { count: r.groupIds.length }),
      tone: "info",
      icon: "groups",
    });
  }
  if (r.reasoningRules.length > 0) {
    badges.push({
      id: "reasoning",
      label: t("templateSummaryReasoningRulesCount", { count: r.reasoningRules.length }),
      tone: "info",
      icon: "psychology",
    });
  }

  return badges;
}
