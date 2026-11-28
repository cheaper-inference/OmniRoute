import { parseVideoModel } from "@omniroute/open-sse/config/videoRegistry.ts";
import { handleVideoGeneration } from "@omniroute/open-sse/handlers/videoGeneration.ts";
import { getCallLogApiKeyContext, trackMediaWrites } from "./callLogApiKeyContext";
import { recordSpecialtyCallLog, recordSpecialtyRequestUsage } from "./specialtyRequestAccounting";

/** One provider attempt, including each target dispatched by a video combo. */
export async function runVideoRequestWithAccounting(
  input: Parameters<typeof handleVideoGeneration>[0]
) {
  const key = getCallLogApiKeyContext();
  if (!key?.apiKeyId) return handleVideoGeneration(input);

  const endpoint = "/v1/videos/generations";
  const startTime = Date.now();
  const identity = { ...key, connectionId: input.credentials?.connectionId ?? key.connectionId };
  const { result, mediaWrites } = await trackMediaWrites(identity, endpoint, () =>
    handleVideoGeneration(input)
  );
  if (!result.success) return result;

  const parsed = parseVideoModel(input.body.model);
  const provider = input.resolvedProvider || parsed.provider;
  if (!provider) return result;
  const accounting = {
    ...identity,
    provider,
    model: parsed.model || input.body.model,
    endpoint,
    startTime,
  };
  if (!mediaWrites.usage) await recordSpecialtyRequestUsage(accounting);
  if (!mediaWrites.callLog) await recordSpecialtyCallLog(accounting);
  return result;
}
