import { getCallLogApiKeyContext } from "@/lib/usage/callLogApiKeyContext";
import { saveCallLog } from "@/lib/usageDb";
import { stringifyImageErrorForLog } from "./imageErrorLog.ts";

// imageGeneration.ts takes saveCallLog from here so this is the one image-result module
// that depends on the app's usage store.
export { saveCallLog };

function writeImageResultLog(entry: Record<string, unknown>, metadataOnly = false) {
  // Summary rows do not pick up connection IDs implicitly; preserve the selected
  // route attempt's attribution without passing any credential material.
  const { requestBody, responseBody, ...summary } = entry;
  const logEntry = metadataOnly
    ? { ...summary, connectionId: getCallLogApiKeyContext()?.connectionId }
    : { ...summary, requestBody, responseBody };
  saveCallLog(logEntry, metadataOnly).catch(() => {});
}

export function saveImageSuccessResult({
  provider,
  model,
  startTime,
  requestBody = null,
  responseBody = null,
  metadataOnly = false,
  created = null,
  images,
  outputFormat = undefined,
  path = "/v1/images/generations",
}) {
  writeImageResultLog(
    {
      method: "POST",
      path,
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      requestBody,
      responseBody,
    },
    metadataOnly
  );

  return {
    success: true,
    data: {
      created: created || Math.floor(Date.now() / 1000),
      data: images,
      ...(outputFormat ? { output_format: outputFormat } : {}),
    },
  };
}

export function saveImageErrorResult({
  provider,
  model,
  status,
  startTime,
  error,
  requestBody = null,
  metadataError,
  path = "/v1/images/generations",
  // #8307: opt-in signal for executeImageWithCredentialFallback — set by a
  // provider handler when the failure is account/session-specific (expired
  // or blocked credentials) rather than a generic request/provider error, so
  // the retry loop tries the next eligible account even when the upstream
  // status isn't a plain 401. Defaults to unset (existing 401-only behavior
  // for every other provider is unchanged).
  retryable = undefined,
}: {
  provider: string;
  model: string;
  status: number;
  startTime: number;
  error: unknown;
  requestBody?: unknown;
  /** Fixed diagnostic for a metadata-only row; never derived from provider payload. */
  metadataError?: string;
  path?: string;
  retryable?: boolean;
}) {
  writeImageResultLog(
    {
      method: "POST",
      path,
      status,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: metadataError ?? stringifyImageErrorForLog(error).slice(0, 500),
      requestBody,
    },
    metadataError !== undefined
  );

  return {
    success: false,
    status,
    error,
    ...(retryable !== undefined ? { retryable } : {}),
  };
}
