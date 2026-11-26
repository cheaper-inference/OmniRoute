import {
  parseApiKeyCodexServiceMode,
  type ApiKeyCodexServiceMode,
} from "@/shared/constants/codexServiceMode";

import { setNoLog } from "../../compliance/noLog";
import { rowToCamel } from "../caseMapping";
import { parseApiKeyUsageLimitFields } from "../apiKeyUsageLimitFields";
import type { ModelAccessMode } from "./modelAccessMode";
import {
  parseAccessSchedule,
  parseAllowAutoCombos,
  parseAllowCcDiscoveryAliases,
  parseAllowedCombos,
  parseAllowedConnections,
  parseAllowedModels,
  parseAllowedQuotas,
  parseAllowUsageCommand,
  parseAutoResolve,
  parseCacheDefaultMode,
  parseCatalogScope,
  parseChaosModeEnabled,
  parseCompressionEnabled,
  parseDisableNonPublicModels,
  parseForcedModel,
  parseIsActive,
  parseIsBanned,
  parseModelAccessMode,
  parseNoLog,
  parseRateLimits,
  parseStreamDefaultMode,
  parseStringList,
} from "./rowParsers";
import { decryptApiKeySecret } from "./secretAtRest";
import { SYSTEM_API_KEY_SOURCE } from "./systemKey";
import type { AccessSchedule, RateLimitRule } from "./types";

interface ApiKeyView extends Record<string, unknown> {
  id?: string;
  modelAccessMode: ModelAccessMode;
  allowedModels: string[];
  blockedModels: string[];
  allowedCombos: string[];
  allowedConnections: string[];
  preferredConnections: string[];
  allowedQuotas: string[];
  noLog: boolean;
  autoResolve: boolean;
  isActive: boolean;
  accessSchedule: AccessSchedule | null;
  throttleDelayMs?: number | null;
  rateLimits: RateLimitRule[] | null;
  scopes: string[];
  proxyId?: string | null;
  isBanned?: boolean;
  expiresAt?: string | null;
  allowedEndpoints: string[];
  streamDefaultMode: "legacy" | "json";
  codexServiceMode: ApiKeyCodexServiceMode;
  cacheDefaultMode: "legacy" | "bypass";
  disableNonPublicModels?: boolean;
  allowUsageCommand?: boolean;
  usageLimitEnabled?: boolean;
  dailyUsageLimitUsd?: number | null;
  weeklyUsageLimitUsd?: number | null;
  fiveHourUsageLimitUsd?: number | null;
  chaosModeEnabled?: boolean;
  compressionEnabled: boolean;
  allowAutoCombos: boolean;
  allowCcDiscoveryAliases: boolean;
  catalogScope: "all" | "combos" | "models";
  forcedModel: string | null;
}

export function projectApiKey(row: Record<string, unknown>): ApiKeyView {
  const camelRow = rowToCamel(row) as ApiKeyView;
  // SSO users authenticate with their identity provider. System keys belong to server code.
  // Both keep their stored secret out of generic key projections.
  const systemKey = camelRow.source === SYSTEM_API_KEY_SOURCE;
  camelRow.key = systemKey || camelRow.source === "sso" ? "" : decryptApiKeySecret(camelRow.key);
  if (systemKey) {
    delete camelRow.keyPrefix;
    delete camelRow.keyHash;
  }
  camelRow.modelAccessMode = parseModelAccessMode(camelRow.modelAccessMode, camelRow.allowedModels);
  camelRow.allowedModels = parseAllowedModels(camelRow.allowedModels);
  camelRow.blockedModels = parseAllowedModels(camelRow.blockedModels);
  camelRow.allowedCombos = parseAllowedCombos(camelRow.allowedCombos);
  camelRow.allowedConnections = parseAllowedConnections(camelRow.allowedConnections);
  camelRow.preferredConnections = parseAllowedConnections(camelRow.preferredConnections);
  camelRow.allowedQuotas = parseAllowedQuotas(camelRow.allowedQuotas);
  camelRow.noLog = parseNoLog(camelRow.noLog);
  camelRow.autoResolve = parseAutoResolve(camelRow.autoResolve);
  camelRow.isActive = parseIsActive(camelRow.isActive);
  camelRow.accessSchedule = parseAccessSchedule(camelRow.accessSchedule);
  camelRow.rateLimits = parseRateLimits(camelRow.rateLimits);
  camelRow.isBanned = parseIsBanned(camelRow.isBanned);
  camelRow.scopes = parseStringList(camelRow.scopes);
  camelRow.allowedEndpoints = parseStringList(camelRow.allowedEndpoints);
  camelRow.streamDefaultMode = parseStreamDefaultMode(camelRow.streamDefaultMode);
  camelRow.codexServiceMode = parseApiKeyCodexServiceMode(camelRow.codexServiceMode);
  camelRow.cacheDefaultMode = parseCacheDefaultMode(camelRow.cacheDefaultMode);
  camelRow.disableNonPublicModels = parseDisableNonPublicModels(camelRow.disableNonPublicModels);
  camelRow.allowUsageCommand = parseAllowUsageCommand(camelRow.allowUsageCommand);
  camelRow.chaosModeEnabled = parseChaosModeEnabled(camelRow.chaosModeEnabled);
  camelRow.compressionEnabled = parseCompressionEnabled(camelRow.compressionEnabled);
  camelRow.allowAutoCombos = parseAllowAutoCombos(camelRow.allowAutoCombos);
  camelRow.allowCcDiscoveryAliases = parseAllowCcDiscoveryAliases(camelRow.allowCcDiscoveryAliases);
  camelRow.catalogScope = parseCatalogScope(camelRow.catalogScope);
  camelRow.forcedModel = parseForcedModel(camelRow.forcedModel);
  Object.assign(camelRow, parseApiKeyUsageLimitFields(camelRow));
  if (typeof camelRow.id === "string" && camelRow.id.length > 0) {
    setNoLog(camelRow.id, camelRow.noLog === true);
  }
  return camelRow;
}
