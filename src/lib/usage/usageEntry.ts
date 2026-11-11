/**
 * DB-entity-mapped shape accepted by {@link saveRequestUsage}, mirroring the
 * `usage_history` table columns 1:1 (see `src/lib/db/migrations/`). Convention
 * (#3512): every `usage_history` writer should type its entry against this
 * interface instead of an inline anonymous object or `any` — call sites are
 * intentionally permissive (fields optional/nullable) because rows are built
 * incrementally across several extraction points (chatCore success/failure
 * paths, rejected-request accounting, the Codex Responses WS bridge).
 *
 * `tokens` stays `unknown` on purpose: callers pass either the raw
 * provider-shaped usage object (OpenAI `prompt_tokens`/`completion_tokens`,
 * Anthropic `input_tokens`/`cache_read_input_tokens`, …) or the already
 * normalized `{ input, output, cacheRead, cacheCreation, reasoning }` shape —
 * `getLoggedInputTokens`/`getLoggedOutputTokens`/`getPromptCache*Tokens` in
 * `./tokenAccounting` accept both and extract the right fields.
 */
import type { AgentContext } from "./usageHistory/agentSessionUsage";
import type { AgentSessionTurn } from "@omniroute/open-sse/handlers/chatCore/agentSessionTurn.ts";

export interface UsageEntry {
  provider?: string | null;
  model?: string | null;
  /** Raw or normalized token usage — see the interface doc above. */
  tokens?: unknown;
  /** Catalogue-priced usage snapshot, not an exact provider-reported bill. */
  calculatedCostUsd?: number | null;
  billingUnit?: string | null;
  billingQuantity?: number | null;
  billingUnitPriceUsd?: number | null;
  status?: string | null;
  success?: boolean;
  latencyMs?: number;
  timeToFirstTokenMs?: number;
  errorCode?: string | null;
  /** ISO timestamp; defaults to `new Date().toISOString()` when omitted. */
  timestamp?: string;
  connectionId?: string | null;
  apiKeyId?: string | null;
  apiKeyName?: string | null;
  serviceTier?: string | null;
  /** @deprecated legacy snake_case fallback, read only if `serviceTier` is unset. */
  service_tier?: string | null;
  comboStrategy?: string | null;
  /** @deprecated legacy snake_case fallback, read only if `comboStrategy` is unset. */
  combo_strategy?: string | null;
  endpoint?: string | null;
  /** Opaque CLIProxyAPI auth_index. Never a label, path, token, or email. */
  cpaAuthIndex?: string | null;
  /** Coding-agent session/project; recorded atomically with this usage row. */
  agentContext?: AgentContext | null;
  sessionTurn?: AgentSessionTurn | null; // stored only for keyed, non-noLog requests
}
