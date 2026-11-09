import type {
  KeyTemplate,
  KeyTemplateAutoCandidateOverride,
  KeyTemplateCacheDefaultMode,
  KeyTemplateCatalogScope,
  KeyTemplateCodexServiceMode,
  KeyTemplateDomainBudget,
  KeyTemplateExpiry,
  KeyTemplatePolicy,
  KeyTemplateQuotaLimits,
  KeyTemplateRateLimitRule,
  KeyTemplateReasoningRule,
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
  KeyTemplateAutoCandidateOverride,
  KeyTemplateCacheDefaultMode,
  KeyTemplateCatalogScope,
  KeyTemplateCodexServiceMode,
  KeyTemplatePolicy,
  KeyTemplateRateLimitRule,
  KeyTemplateReasoningRule,
  KeyTemplateResetInterval,
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
  autoCandidateOverrides: (KeyTemplateAutoCandidateOverride & { clientRowId?: string })[];

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
  reasoningRules: (KeyTemplateReasoningRule & { clientRowId?: string })[];
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
  return {
    ...readGeneralForm(policy),
    ...readExpiryForm(policy),
    ...readModelsForm(policy),
    ...readCombosForm(policy),
    ...readConnectionsForm(policy),
    ...readRatesForm(policy),
    ...readScheduleForm(policy),
    ...readUsageForm(policy),
    ...readQuotaForm(policy),
    ...readBudgetForm(policy),
    ...readTokensForm(policy),
    ...readBehaviourForm(policy),
  };
}

function readGeneralForm(
  policyInput: KeyTemplatePolicy
): Pick<
  PolicyEditorFormState,
  | "isActive"
  | "isBanned"
  | "manageEnabled"
  | "selfUsageEnabled"
  | "selfAccountQuotaEnabled"
  | "bypassProviderQuotaPolicyEnabled"
  | "extraScopes"
  | "allowAllEndpoints"
  | "selectedEndpoints"
  | "ipAllowlist"
  | "proxyId"
> {
  const policy = policyInput;
  const key = policy.key;
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
  };
}

function readExpiryForm(
  policyInput: KeyTemplatePolicy
): Pick<PolicyEditorFormState, "expiryMode" | "expiryTtlValue" | "expiryTtlUnit"> {
  const policy = policyInput;
  const expiry = policy.expiry;
  const ttlDecomposed = decomposeTtlSeconds(
    expiry?.mode === "relative" ? expiry.ttlSeconds : undefined
  );
  return {
    expiryMode: expiry?.mode === "relative" ? "relative" : "none",
    expiryTtlValue: ttlDecomposed.value,
    expiryTtlUnit: ttlDecomposed.unit,
  };
}

function readModelsForm(
  policyInput: KeyTemplatePolicy
): Pick<
  PolicyEditorFormState,
  | "allowAllModels"
  | "selectedModels"
  | "blockedModels"
  | "catalogScope"
  | "disableNonPublicModels"
  | "forcedModel"
> {
  const policy = policyInput;
  const key = policy.key;
  const allowedModels = Array.isArray(key.allowedModels) ? [...key.allowedModels] : [];
  const blockedModels = Array.isArray(key.blockedModels) ? [...key.blockedModels] : [];
  return {
    allowAllModels: key.modelAccessMode === "restricted" ? false : allowedModels.length === 0,
    selectedModels: allowedModels,
    blockedModels,
    catalogScope: key.catalogScope ?? "all",
    disableNonPublicModels: key.disableNonPublicModels === true,
    forcedModel: key.forcedModel ?? "",
  };
}

function readCombosForm(
  policyInput: KeyTemplatePolicy
): Pick<
  PolicyEditorFormState,
  | "allowAllCombos"
  | "selectedCombos"
  | "allowAutoCombos"
  | "allowCcDiscoveryAliases"
  | "autoCandidateOverrides"
> {
  const policy = policyInput;
  const key = policy.key;
  const related = policy.related;
  const rawCombos = Array.isArray(key.allowedCombos) ? key.allowedCombos : [];
  const allowAllCombos = rawCombos.includes(KEY_TEMPLATE_ALL_COMBOS_RULE);
  const selectedCombos = rawCombos.filter((c) => c !== KEY_TEMPLATE_ALL_COMBOS_RULE);
  return {
    allowAllCombos,
    selectedCombos,
    allowAutoCombos: key.allowAutoCombos !== false,
    allowCcDiscoveryAliases: key.allowCcDiscoveryAliases !== false,
    autoCandidateOverrides: Array.isArray(related?.autoCandidateOverrides)
      ? related.autoCandidateOverrides.map((o, index) => ({ ...o, clientRowId: `aco-${index}` }))
      : [],
  };
}

function readConnectionsForm(
  policyInput: KeyTemplatePolicy
): Pick<
  PolicyEditorFormState,
  "allowAllConnections" | "selectedConnections" | "selectedPreferredConnections"
> {
  const policy = policyInput;
  const key = policy.key;
  const allowedConnections = Array.isArray(key.allowedConnections)
    ? [...key.allowedConnections]
    : [];
  const allowAllConnections = allowedConnections.length === 0;
  const preferredConnections = Array.isArray(key.preferredConnections)
    ? [...key.preferredConnections]
    : [];
  return {
    allowAllConnections,
    selectedConnections: allowedConnections,
    selectedPreferredConnections: prunePreferredConnections(
      preferredConnections,
      allowAllConnections,
      allowedConnections
    ),
  };
}

function readRatesForm(
  policyInput: KeyTemplatePolicy
): Pick<
  PolicyEditorFormState,
  "maxSessions" | "throttleDelayMs" | "maxRequestsPerDay" | "maxRequestsPerMinute" | "rateLimits"
> {
  const policy = policyInput;
  const key = policy.key;
  return {
    maxSessions: typeof key.maxSessions === "number" && key.maxSessions > 0 ? key.maxSessions : 0,
    throttleDelayMs:
      typeof key.throttleDelayMs === "number" && key.throttleDelayMs > 0 ? key.throttleDelayMs : 0,
    maxRequestsPerDay: numberToInputString(key.maxRequestsPerDay),
    maxRequestsPerMinute: numberToInputString(key.maxRequestsPerMinute),
    rateLimits: Array.isArray(key.rateLimits) ? key.rateLimits.map((r) => ({ ...r })) : [],
  };
}

function readScheduleForm(
  policyInput: KeyTemplatePolicy
): Pick<
  PolicyEditorFormState,
  "scheduleEnabled" | "scheduleFrom" | "scheduleUntil" | "scheduleDays" | "scheduleTz"
> {
  const policy = policyInput;
  const key = policy.key;
  const schedule = key.accessSchedule;
  return {
    scheduleEnabled: schedule?.enabled === true,
    scheduleFrom: schedule?.from ?? "08:00",
    scheduleUntil: schedule?.until ?? "18:00",
    scheduleDays: Array.isArray(schedule?.days) ? [...schedule.days] : [1, 2, 3, 4, 5],
    scheduleTz: schedule?.tz ?? defaultTimeZone(),
  };
}

function readUsageForm(
  policyInput: KeyTemplatePolicy
): Pick<
  PolicyEditorFormState,
  "usageLimitEnabled" | "dailyUsageLimitUsd" | "weeklyUsageLimitUsd" | "allowedQuotas"
> {
  const policy = policyInput;
  const key = policy.key;
  return {
    usageLimitEnabled: key.usageLimitEnabled === true,
    dailyUsageLimitUsd: numberToInputString(key.dailyUsageLimitUsd),
    weeklyUsageLimitUsd: numberToInputString(key.weeklyUsageLimitUsd),
    allowedQuotas: Array.isArray(key.allowedQuotas) ? [...key.allowedQuotas] : [],
  };
}

function readQuotaForm(
  policyInput: KeyTemplatePolicy
): Pick<
  PolicyEditorFormState,
  "quotaLimitsEnabled" | "quotaTpmLimit" | "quotaRpmLimit" | "quotaMonthlyUsd"
> {
  const policy = policyInput;
  const related = policy.related;
  const quotaLimits = related?.quotaLimits;
  return {
    quotaLimitsEnabled:
      quotaLimits !== null &&
      quotaLimits !== undefined &&
      ((quotaLimits.tpmLimit ?? 0) > 0 ||
        (quotaLimits.rpmLimit ?? 0) > 0 ||
        (quotaLimits.monthlyAmountUsd ?? 0) > 0),
    quotaTpmLimit: numberToInputString(quotaLimits?.tpmLimit),
    quotaRpmLimit: numberToInputString(quotaLimits?.rpmLimit),
    quotaMonthlyUsd: numberToInputString(quotaLimits?.monthlyAmountUsd),
  };
}

function readBudgetForm(
  policyInput: KeyTemplatePolicy
): Pick<
  PolicyEditorFormState,
  | "domainBudgetEnabled"
  | "domainDailyLimitUsd"
  | "domainWeeklyLimitUsd"
  | "domainMonthlyLimitUsd"
  | "domainWarningThresholdPct"
  | "domainResetInterval"
  | "domainResetTime"
> {
  const policy = policyInput;
  const related = policy.related;
  const domainBudget = related?.domainBudget;
  return {
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
  };
}

function readTokensForm(
  policyInput: KeyTemplatePolicy
): Pick<PolicyEditorFormState, "tokenLimits"> {
  const policy = policyInput;
  const related = policy.related;
  return {
    tokenLimits: Array.isArray(related?.tokenLimits)
      ? related.tokenLimits.map((tl) => ({ ...tl }))
      : [],
  };
}

function readBehaviourForm(
  policyInput: KeyTemplatePolicy
): Pick<
  PolicyEditorFormState,
  | "noLog"
  | "autoResolve"
  | "streamDefaultMode"
  | "cacheDefaultMode"
  | "codexServiceMode"
  | "compressionEnabled"
  | "chaosModeEnabled"
  | "allowUsageCommand"
  | "groupIds"
  | "reasoningRules"
> {
  const policy = policyInput ?? createDefaultClientKeyTemplatePolicy();
  const key = policy.key;
  const related = policy.related;
  return {
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
      ? related.reasoningRules.map((r, index) => ({
          clientRowId: `rr-${index}`,
          ...r,
          requestTags: Array.isArray(r.requestTags) ? [...r.requestTags] : [],
        }))
      : [],
  };
}

export function editorFormStateToPolicy(state: PolicyEditorFormState): KeyTemplatePolicy {
  return {
    schemaVersion: 1,
    key: {
      ...writeModelsPolicy(state),
      ...writeConnectionsPolicy(state),
      ...writeLifecyclePolicy(state),
      ...writeSchedulePolicy(state),
      ...writeRatesPolicy(state),
      ...writePermissionsPolicy(state),
      ...writeProtocolPolicy(state),
      ...writeUsagePolicy(state),
      ...writeDiscoveryPolicy(state),
    },
    related: {
      ...writeGroupIds(state),
      ...writeDomainBudget(state),
      ...writeQuotaLimits(state),
      ...writeTokenLimits(state),
      ...writeAutoCandidateOverrides(state),
      ...writeReasoningRules(state),
    },
    expiry: writeExpiry(state),
  };
}

function writeModelsPolicy(
  state: PolicyEditorFormState
): Pick<
  KeyTemplatePolicy["key"],
  "modelAccessMode" | "allowedModels" | "blockedModels" | "allowedCombos"
> {
  const modelAccess = buildModelAccessSavePayload({
    allowAll: state.allowAllModels,
    selectedModels: state.selectedModels,
  });
  const allowedCombos = state.allowAllCombos
    ? [KEY_TEMPLATE_ALL_COMBOS_RULE]
    : [...state.selectedCombos];
  return {
    modelAccessMode: modelAccess.modelAccessMode,
    allowedModels: modelAccess.allowedModels,
    blockedModels: [...state.blockedModels],
    allowedCombos,
  };
}

function writeConnectionsPolicy(
  state: PolicyEditorFormState
): Pick<KeyTemplatePolicy["key"], "allowedConnections" | "preferredConnections" | "allowedQuotas"> {
  const allowedConnections = state.allowAllConnections
    ? []
    : state.selectedConnections.filter((id) => typeof id === "string" && id.trim().length > 0);
  const preferredConnections = prunePreferredConnections(
    state.selectedPreferredConnections,
    state.allowAllConnections,
    allowedConnections
  );
  return {
    allowedConnections,
    preferredConnections,
    allowedQuotas: state.allowedQuotas.filter(
      (id) => typeof id === "string" && id.trim().length > 0
    ),
  };
}

function writeLifecyclePolicy(
  state: PolicyEditorFormState
): Pick<KeyTemplatePolicy["key"], "noLog" | "autoResolve" | "isActive" | "isBanned"> {
  return {
    noLog: state.noLog,
    autoResolve: state.autoResolve,
    isActive: state.isActive,
    isBanned: state.isBanned,
  };
}

function writeSchedulePolicy(
  state: PolicyEditorFormState
): Pick<KeyTemplatePolicy["key"], "accessSchedule"> {
  return {
    accessSchedule: state.scheduleEnabled
      ? {
          enabled: true,
          from: state.scheduleFrom || "08:00",
          until: state.scheduleUntil || "18:00",
          days: state.scheduleDays,
          tz: state.scheduleTz || "UTC",
        }
      : null,
  };
}

function writeRatesPolicy(
  state: PolicyEditorFormState
): Pick<
  KeyTemplatePolicy["key"],
  "maxRequestsPerDay" | "maxRequestsPerMinute" | "throttleDelayMs" | "rateLimits" | "maxSessions"
> {
  const throttle = Math.max(0, Math.min(300000, Math.floor(Number(state.throttleDelayMs) || 0)));
  const maxSessions = Math.max(0, Math.floor(Number(state.maxSessions) || 0));
  return {
    maxRequestsPerDay: parseOptionalPositiveInt(state.maxRequestsPerDay),
    maxRequestsPerMinute: parseOptionalPositiveInt(state.maxRequestsPerMinute),
    throttleDelayMs: throttle > 0 ? throttle : null,
    rateLimits: state.rateLimits.length > 0 ? state.rateLimits : null,
    maxSessions,
  };
}

function writePermissionsPolicy(
  state: PolicyEditorFormState
): Pick<KeyTemplatePolicy["key"], "ipAllowlist" | "scopes" | "proxyId" | "allowedEndpoints"> {
  const scopes = mergeApiKeyPermissionScopes(state.extraScopes, {
    manageEnabled: state.manageEnabled,
    selfUsageEnabled: state.selfUsageEnabled,
    selfAccountQuotaEnabled: state.selfAccountQuotaEnabled,
    bypassProviderQuotaPolicyEnabled: state.bypassProviderQuotaPolicyEnabled,
  });
  return {
    ipAllowlist: state.ipAllowlist.filter((ip) => typeof ip === "string" && ip.trim().length > 0),
    scopes,
    proxyId: state.proxyId.trim() || null,
    allowedEndpoints: state.allowAllEndpoints ? [] : state.selectedEndpoints,
  };
}

function writeProtocolPolicy(
  state: PolicyEditorFormState
): Pick<
  KeyTemplatePolicy["key"],
  | "streamDefaultMode"
  | "codexServiceMode"
  | "cacheDefaultMode"
  | "disableNonPublicModels"
  | "allowUsageCommand"
> {
  return {
    streamDefaultMode: state.streamDefaultMode,
    codexServiceMode: state.codexServiceMode,
    cacheDefaultMode: state.cacheDefaultMode,
    disableNonPublicModels: state.disableNonPublicModels,
    allowUsageCommand: state.allowUsageCommand,
  };
}

function writeUsagePolicy(
  state: PolicyEditorFormState
): Pick<
  KeyTemplatePolicy["key"],
  "usageLimitEnabled" | "dailyUsageLimitUsd" | "weeklyUsageLimitUsd"
> {
  return {
    usageLimitEnabled: state.usageLimitEnabled,
    dailyUsageLimitUsd: parseOptionalPositiveNumber(state.dailyUsageLimitUsd),
    weeklyUsageLimitUsd: parseOptionalPositiveNumber(state.weeklyUsageLimitUsd),
  };
}

function writeDiscoveryPolicy(
  state: PolicyEditorFormState
): Pick<
  KeyTemplatePolicy["key"],
  | "chaosModeEnabled"
  | "compressionEnabled"
  | "allowAutoCombos"
  | "allowCcDiscoveryAliases"
  | "catalogScope"
  | "forcedModel"
> {
  return {
    chaosModeEnabled: state.chaosModeEnabled,
    compressionEnabled: state.compressionEnabled,
    allowAutoCombos: state.allowAutoCombos,
    allowCcDiscoveryAliases: state.allowCcDiscoveryAliases,
    catalogScope: state.catalogScope,
    forcedModel: state.forcedModel.trim() || null,
  };
}

function writeGroupIds(
  state: PolicyEditorFormState
): Pick<KeyTemplatePolicy["related"], "groupIds"> {
  return {
    groupIds: state.groupIds.filter((id) => typeof id === "string" && id.trim().length > 0),
  };
}

function writeDomainBudget(
  state: PolicyEditorFormState
): Pick<KeyTemplatePolicy["related"], "domainBudget"> {
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
  return {
    domainBudget,
  };
}

function writeQuotaLimits(
  state: PolicyEditorFormState
): Pick<KeyTemplatePolicy["related"], "quotaLimits"> {
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
  return {
    quotaLimits,
  };
}

function writeTokenLimits(
  state: PolicyEditorFormState
): Pick<KeyTemplatePolicy["related"], "tokenLimits"> {
  return {
    tokenLimits: state.tokenLimits.map((tl) => ({
      ...tl,
      scopeValue: tl.scopeType === "global" ? "" : tl.scopeValue.trim(),
    })),
  };
}

function writeAutoCandidateOverrides(
  state: PolicyEditorFormState
): Pick<KeyTemplatePolicy["related"], "autoCandidateOverrides"> {
  return {
    autoCandidateOverrides: state.autoCandidateOverrides
      .filter((o) => o.autoChannel.trim().length > 0 && o.connectionId.trim().length > 0)
      .map(withoutClientRowId),
  };
}

function writeReasoningRules(
  state: PolicyEditorFormState
): Pick<KeyTemplatePolicy["related"], "reasoningRules"> {
  return {
    reasoningRules: state.reasoningRules.map((r) => ({
      ...withoutClientRowId(r),
      name: r.name.trim(),
      description: r.description.trim(),
    })),
  };
}

function writeExpiry(state: PolicyEditorFormState): KeyTemplateExpiry {
  const ttlSeconds =
    state.expiryMode === "relative"
      ? (composeTtlSeconds(state.expiryTtlValue, state.expiryTtlUnit) ?? 86400)
      : undefined;
  const expiry: KeyTemplateExpiry =
    state.expiryMode === "relative" && ttlSeconds
      ? { mode: "relative", ttlSeconds }
      : { mode: "none" };
  return expiry;
}

export function mapReferenceIssueToTab(path: string): AccessEditorTab {
  const groups: Array<[AccessEditorTab, string[]]> = [
    ["models", ["key.allowedModels", "key.blockedModels", "key.forcedModel"]],
    ["combos", ["key.allowedCombos", "related.autoCandidateOverrides"]],
    ["connections", ["key.allowedConnections", "key.preferredConnections"]],
    [
      "limits",
      [
        "key.allowedQuotas",
        "related.domainBudget",
        "related.quotaLimits",
        "related.tokenLimits",
        "key.rateLimits",
        "key.accessSchedule",
      ],
    ],
    ["behaviour", ["related.groupIds", "related.reasoningRules"]],
  ];
  const clean = path.replace(/^policy\./, "");
  return (
    groups.find(([, prefixes]) => prefixes.some((prefix) => clean.startsWith(prefix)))?.[0] ??
    "general"
  );
}

export { resolveActiveReferenceIssues } from "./keyTemplateReferenceIssues.ts";

export function validatePolicyEditorState(
  state: PolicyEditorFormState,
  t?: (key: string, values?: Record<string, unknown>) => string
): Record<AccessEditorTab, string[]> {
  const tr = t ?? ((key: string) => key);
  return {
    general: [...validateExpiryFields(state, tr)],
    models: [],
    combos: [],
    connections: [
      ...validateConnectionsFields(state, tr),
      ...validateExclusiveLeaseFields(state, tr),
    ],
    limits: [
      ...validateThrottleFields(state, tr),
      ...validateSessionsFields(state, tr),
      ...validateRatesFields(state, tr),
      ...validateTokensFields(state, tr),
    ],
    behaviour: [...validateReasoningFields(state, tr)],
  };
}

function validateExpiryFields(state: PolicyEditorFormState, tr: (key: string) => string): string[] {
  const errors: string[] = [];
  if (state.expiryMode === "relative") {
    const ttl = composeTtlSeconds(state.expiryTtlValue, state.expiryTtlUnit);
    if (ttl === null || ttl <= 0) {
      errors.push(tr("templateInvalidRelativeExpiry"));
    }
  }
  return errors;
}

function validateConnectionsFields(
  state: PolicyEditorFormState,
  tr: (key: string) => string
): string[] {
  const errors: string[] = [];
  if (!state.allowAllConnections && state.selectedConnections.length === 0) {
    errors.push(tr("selectAtLeastOneConnection"));
  }
  return errors;
}

function validateExclusiveLeaseFields(
  state: PolicyEditorFormState,
  tr: (key: string) => string
): string[] {
  const errors: string[] = [];
  if (state.extraScopes.includes("lease:exclusive")) {
    if (state.allowAllConnections || state.selectedConnections.length === 0) {
      errors.push(tr("selectAtLeastOneConnection"));
    }
  }
  return errors;
}

function validateThrottleFields(
  state: PolicyEditorFormState,
  tr: (key: string) => string
): string[] {
  const errors: string[] = [];
  if (state.throttleDelayMs < 0 || state.throttleDelayMs > 300000) {
    errors.push(tr("throttleDelayRangeError"));
  }
  return errors;
}

function validateSessionsFields(
  state: PolicyEditorFormState,
  tr: (key: string) => string
): string[] {
  const errors: string[] = [];
  if (state.maxSessions < 0) {
    errors.push(tr("maxSessionsNegativeError"));
  }
  return errors;
}

function validateRatesFields(state: PolicyEditorFormState, tr: (key: string) => string): string[] {
  const errors: string[] = [];
  for (const rl of state.rateLimits) {
    if (!rl.limit || rl.limit < 1 || !rl.window || rl.window < 1) {
      errors.push(tr("rateLimitPositiveError"));
      break;
    }
  }
  return errors;
}

function validateTokensFields(state: PolicyEditorFormState, tr: (key: string) => string): string[] {
  const errors: string[] = [];
  for (const tl of state.tokenLimits) {
    if (tl.resetTime !== null && !/^([01]\d|2[0-3]):[0-5]\d$/.test(tl.resetTime)) {
      errors.push(tr("templateInvalidResetTime"));
      break;
    }
    if (!tl.tokenLimit || tl.tokenLimit < 1 || !Number.isInteger(Number(tl.tokenLimit))) {
      errors.push(tr("templateInvalidTokenLimit"));
      break;
    }
    if (tl.scopeType !== "global" && !tl.scopeValue.trim()) {
      errors.push(tr("templateTokenLimitScopeRequired"));
      break;
    }
  }
  return errors;
}

function validateReasoningFields(
  state: PolicyEditorFormState,
  tr: (key: string) => string
): string[] {
  const errors: string[] = [];
  for (const rule of state.reasoningRules) {
    if (
      (rule.targetKind === "model" && !rule.targetModel?.trim()) ||
      (rule.targetKind === "combo" && !rule.targetComboId?.trim())
    ) {
      errors.push(tr("templateReasoningTargetRequired"));
      break;
    }
    if (rule.requestTags.some((tag) => !tag.trim())) {
      errors.push(tr("templateReasoningTagsInvalid"));
      break;
    }
    if (!rule.name.trim()) {
      errors.push(tr("templateReasoningRuleNameRequired"));
      break;
    }
    if (rule.budgetAction === "set" && (!rule.budgetTokens || rule.budgetTokens <= 0)) {
      errors.push(tr("templateReasoningRuleBudgetInvalid"));
      break;
    }
    if (rule.targetEffort === "none" && rule.budgetAction === "set") {
      errors.push(tr("templateReasoningRuleEffortBudgetConflict"));
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
  return [
    ...summarizeModels(policy, t),
    ...summarizeCombos(policy, t),
    ...summarizeConnections(policy, t),
    ...summarizeCatalog(policy, t),
    ...summarizeLifecycle(policy, t),
    ...summarizeLimits(policy, t),
  ];
}

function summarizeModels(
  policy: KeyTemplatePolicy,
  t: (key: string, values?: Record<string, unknown>) => string
): PolicySummaryBadge[] {
  const badges: PolicySummaryBadge[] = [];
  const k = policy.key;
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

  return badges;
}

function summarizeCombos(
  policy: KeyTemplatePolicy,
  t: (key: string, values?: Record<string, unknown>) => string
): PolicySummaryBadge[] {
  const badges: PolicySummaryBadge[] = [];
  const k = policy.key;
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

  return badges;
}

function summarizeConnections(
  policy: KeyTemplatePolicy,
  t: (key: string, values?: Record<string, unknown>) => string
): PolicySummaryBadge[] {
  const badges: PolicySummaryBadge[] = [];
  const k = policy.key;
  if (k.allowedConnections.length > 0) {
    badges.push({
      id: "connections",
      label: t("templateSummaryConnectionsCount", { count: k.allowedConnections.length }),
      tone: "info",
      icon: "cable",
    });
  }

  return badges;
}

function summarizeCatalog(
  policy: KeyTemplatePolicy,
  t: (key: string, values?: Record<string, unknown>) => string
): PolicySummaryBadge[] {
  const badges: PolicySummaryBadge[] = [];
  const k = policy.key;
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

  return badges;
}

function summarizeLifecycle(
  policy: KeyTemplatePolicy,
  t: (key: string, values?: Record<string, unknown>) => string
): PolicySummaryBadge[] {
  const badges: PolicySummaryBadge[] = [];
  const k = policy.key;
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

  return badges;
}

function summarizeLimits(
  policy: KeyTemplatePolicy,
  t: (key: string, values?: Record<string, unknown>) => string
): PolicySummaryBadge[] {
  const badges: PolicySummaryBadge[] = [];
  const k = policy.key;
  const r = policy.related;
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

/** Client-only identities must never become a persisted or submitted key policy. */
function withoutClientRowId<T extends object>(row: T): Omit<T, "clientRowId"> {
  const policy = { ...row };
  delete (policy as { clientRowId?: string }).clientRowId;
  return policy;
}
