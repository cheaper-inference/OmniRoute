import { DefaultExecutor } from "./default.ts";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : null;
}

/**
 * Muse Code uses the normal OpenAI-compatible executor for inference, plus one
 * provider-specific behaviour: Muse's Responses API supports a 24h
 * prompt-cache retention window. The generic executor intentionally strips this
 * field for strict upstreams, so restore it only on the Muse Code route after
 * generic sanitisation (#13634).
 *
 * Credential remint stays on the centralized path: DefaultExecutor
 * refreshCredentials → getAccessToken → refreshMuseCodeToken (remint from the
 * durable `dca:` token, with race dedup). No override here on purpose.
 */
export class MuseCodeExecutor extends DefaultExecutor {
  constructor() {
    super("muse-code");
  }

  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: Parameters<DefaultExecutor["transformRequest"]>[3]
  ): unknown {
    const original = asRecord(body);
    const requestedRetention =
      typeof original?.prompt_cache_retention === "string"
        ? original.prompt_cache_retention
        : "24h";
    const cleaned = super.transformRequest(model, body, stream, credentials);
    const record = asRecord(cleaned);
    if (!record) return cleaned;

    return {
      ...record,
      prompt_cache_retention: requestedRetention,
    };
  }
}

export default MuseCodeExecutor;
