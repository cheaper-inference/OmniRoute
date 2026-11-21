import { getProviderConnectionById } from "@/lib/db/providers";
import { shouldMarkAccountExhaustedFrom429 } from "@omniroute/open-sse/services/accountFallback.ts";
import {
  getCachedClaudeQuotaScopeDecision,
  markAccountExhaustedFrom429,
} from "@/domain/quotaCache";
import type { FailureKind } from "@/shared/utils/classify429";
import { shouldIsolateProbeFailures } from "@/shared/utils/probeOrigin";

export async function maybeMarkChatAccountExhaustedFrom429(input: {
  connectionId: string;
  provider: string;
  model: string;
  status: number;
  errorText: string;
  failureKind: FailureKind | undefined;
  passthroughModels: boolean | undefined;
}): Promise<void> {
  // Mark account as quota-exhausted only for explicit long-window quota signals.
  // A plain 429/high-traffic response should trigger fallback/cooldown, not poison
  // quotaCache as exhausted for 5 minutes while usage quota may still be available.
  // Z-code tariff isolation (handoff 05-astra-plan.md, step 3): the quota
  // cache is shared across tariffs over the same OAuth connection — a 429 on
  // one tariff must not mark the connection exhausted for the other. Start
  // quota state is read from the provider's own billing/balance instead.
  if (
    [
      "zcode",
      "zc",
      "zc-start",
      "zc-individual",
      "zcode-start",
      "zcode-individual",
      "zcode-cn-start",
      "zcode-cn-individual",
    ].includes(input.provider) &&
    (await getProviderConnectionById(input.connectionId))?.authType === "oauth"
  ) {
    return;
  }
  if (
    input.status !== 429 ||
    !shouldMarkAccountExhaustedFrom429(
      input.provider,
      input.model,
      input.passthroughModels,
      input.failureKind,
      input.errorText
    ) ||
    getCachedClaudeQuotaScopeDecision({
      connectionId: input.connectionId,
      provider: input.provider,
      status: input.status,
      errorText: input.errorText,
      model: input.model,
    }).evidence !== "none"
  ) {
    return;
  }

  // T-PROBE: a probe must not poison the 5min quotaCache for real traffic (#9817).
  if (await shouldIsolateProbeFailures()) return;
  markAccountExhaustedFrom429(input.connectionId, input.provider);
}
