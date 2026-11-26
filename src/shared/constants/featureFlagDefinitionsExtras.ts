import type { FeatureFlagDefinition } from "./featureFlagTypes";
import { CLAUDE_CODE_META_FEATURE_FLAG_DEFINITIONS } from "./featureFlagDefinitionsClaudeCodeMeta";
import { QUOTA_SELF_PANEL_FLAG } from "./featureFlagDefinitionsQuotaSelf";
import { PROXY_REEGRESS_ON_QUOTA_429_FLAG } from "./featureFlagDefinitionsProxyEgress";
import { QUOTA_DAILY_REVALIDATION_FLAG } from "./featureFlagDefinitionsQuotaRevalidation";
import { CODEBUDDY_TELEMETRY_ENABLED_FLAG } from "./featureFlagDefinitionsCodebuddy";
import { AGENT_SESSION_MESSAGES_ENABLED_FLAG } from "./agentSessionFeatureFlagDefinitions";

/**
 * Flags kept out of featureFlagDefinitions.ts because that file sits at its file-size cap.
 * New flag modules join this list, so the registry file grows by one import and one spread
 * in total, however many modules land. Spread at the end of FEATURE_FLAG_DEFINITIONS.
 */
export const EXTRA_FEATURE_FLAG_DEFINITIONS: FeatureFlagDefinition[] = [
  QUOTA_SELF_PANEL_FLAG,
  ...CLAUDE_CODE_META_FEATURE_FLAG_DEFINITIONS,
  PROXY_REEGRESS_ON_QUOTA_429_FLAG,
  QUOTA_DAILY_REVALIDATION_FLAG,
  CODEBUDDY_TELEMETRY_ENABLED_FLAG,
  AGENT_SESSION_MESSAGES_ENABLED_FLAG,
  {
    key: "NONSTREAM_REFUSED_REPLY_FAILURE_ACCOUNTING_ENABLED",
    label: "Non-Streaming: Refused Reply Accounting",
    description:
      "Record refused non-streaming replies as a single failure with billed tokens, count them toward key quotas, and retain the prior account error.",
    descriptionI18nKey: "featureFlagNonstreamRefusedReplyFailureAccountingEnabledDescription",
    type: "boolean",
    defaultValue: "false",
    category: "runtime",
    requiresRestart: false,
  },
  {
    key: "NONSTREAM_UPSTREAM_FAILURE_BILLED_USAGE_ENABLED",
    label: "Non-Streaming: Upstream Failure Usage",
    description:
      "Include provider-reported billed tokens in usage history for failed non-streaming upstream requests.",
    descriptionI18nKey: "featureFlagNonstreamUpstreamFailureBilledUsageEnabledDescription",
    type: "boolean",
    defaultValue: "false",
    category: "runtime",
    requiresRestart: false,
  },
  {
    key: "CLAUDE_NONSTREAM_EXTRA_USAGE_BACKGROUND_SYNC_ENABLED",
    label: "Claude Non-Streaming: Background Extra-Usage Sync",
    description: "Sync Claude extra-usage state in the background for non-streaming replies.",
    descriptionI18nKey: "featureFlagClaudeNonstreamExtraUsageBackgroundSyncEnabledDescription",
    type: "boolean",
    defaultValue: "false",
    category: "runtime",
    requiresRestart: false,
  },
  {
    key: "NONSTREAM_USAGE_NULL_TTFT_ENABLED",
    label: "Non-Streaming: Null Time to First Token",
    description:
      "Store a null time to first token for successful non-streaming replies so they are excluded from TTFT averages.",
    descriptionI18nKey: "featureFlagNonstreamUsageNullTtftEnabledDescription",
    type: "boolean",
    defaultValue: "false",
    category: "runtime",
    requiresRestart: false,
  },
];
