import { saveCallLog } from "@/lib/usageDb";
import { recordUnpricedBudgetUsage } from "@/domain/costRules";
import { recordSpecialtyRequestUsage } from "@/lib/usage/specialtyRequestAccounting";
import type { ApiKeyPolicyResult } from "@/shared/utils/apiKeyPolicy";
import type { FalJob } from "@/lib/db/fal";

/** Catalog presence is not a price. Unknown metered costs follow the existing fail-closed policy. */
export async function recordFalDispatch(
  job: FalJob,
  apiKeyInfo: ApiKeyPolicyResult["apiKeyInfo"],
  status: number
) {
  const input = {
    apiKeyId: apiKeyInfo?.id,
    apiKeyName: apiKeyInfo?.name,
    connectionId: job.connectionId,
    provider: "fal-ai",
    model: job.endpoint,
  };
  if (apiKeyInfo) recordUnpricedBudgetUsage(apiKeyInfo.id, input);
  if (status >= 200 && status < 300) {
    await recordSpecialtyRequestUsage({
      ...input,
      endpoint: "/v1/fal/run",
      status: String(status),
      startTime: job.createdAt,
      requestId: job.id,
    });
  }
  await saveCallLog({
    ...input,
    method: "POST",
    path: "/v1/fal/run",
    status,
    model: `fal-ai/${job.endpoint}`,
    duration: Date.now() - job.createdAt,
    requestId: job.id,
  });
}
