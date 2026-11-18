import { saveCallLog } from "@/lib/usageDb";
import { recordUnpricedBudgetUsage } from "@/domain/costRules";
import { runWithCallLogApiKeyContext } from "@/lib/usage/callLogApiKeyContext";
import type { FalJob } from "@/lib/db/fal";

/** Catalog presence is not a price. Unknown metered costs follow the existing fail-closed policy. */
export async function recordFalDispatch(job: FalJob, apiKeyId: string | null, status: number) {
  if (apiKeyId) recordUnpricedBudgetUsage(apiKeyId, { provider: "fal-ai", model: job.endpoint });
  await runWithCallLogApiKeyContext(
    { apiKeyId, apiKeyName: null, connectionId: job.connectionId },
    () =>
      saveCallLog({
        method: "POST",
        path: "/v1/fal/run",
        status,
        model: `fal-ai/${job.endpoint}`,
        provider: "fal-ai",
        connectionId: job.connectionId,
        duration: Date.now() - job.createdAt,
        requestId: job.id,
      })
  );
}
