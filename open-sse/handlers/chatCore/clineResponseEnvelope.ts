import { isRecord } from "../../utils/recordHelpers.ts";
type JsonRecord = Record<string, unknown>;


function hasOpenAIChoices(value: unknown): value is JsonRecord & { choices: unknown[] } {
  return isRecord(value) && Array.isArray(value.choices);
}

export function unwrapClineNonStreamingEnvelope(
  provider: string,
  responseBody: JsonRecord
): JsonRecord;
export function unwrapClineNonStreamingEnvelope(provider: string, responseBody: unknown): unknown;
export function unwrapClineNonStreamingEnvelope(provider: string, responseBody: unknown): unknown {
  if (provider !== "cline" || !isRecord(responseBody)) {
    return responseBody;
  }

  const data = responseBody.data;
  if (!hasOpenAIChoices(data)) {
    return responseBody;
  }

  return {
    ...data,
    usage: isRecord(data) && data.usage !== undefined ? data.usage : responseBody.usage,
  };
}
