import { DefaultExecutor } from "./default.ts";
import { museCodeSessionHeaders } from "./museCodeIdentity.ts";

type JsonRecord = Record<string, unknown>;

/** Client attribution the generic executor forwards and the Muse Code client never sends. */
const FOREIGN_CLIENT_HEADER =
  /^(x-opencode-.+|x-session-id|x-session-affinity|x-title|http-referer)$/i;

/** Returns a non-array object as a JSON record, or null for other values. */
function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

/**
 * Muse Code uses the normal OpenAI-compatible executor for inference, sent with the Muse Code
 * client identity, plus one provider-specific behaviour: Muse's Responses API supports a 24h
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

  /**
   * Inference requests carry the Muse Code client identity: the registry supplies User-Agent
   * (so MUSE_CODE_USER_AGENT still overrides it) and X-Client-Id, and museCodeIdentity.ts the
   * session headers. The generic executor forwards other clients' attribution headers
   * (x-opencode-*, x-session-id, x-title, http-referer); the Muse Code client never sends them,
   * so they are dropped here. The caller's session still selects the Muse session id.
   */
  buildHeaders(...args: Parameters<DefaultExecutor["buildHeaders"]>): Record<string, string> {
    const [credentials, , clientHeaders, , , body] = args;
    const headers = super.buildHeaders(...args);
    for (const name of Object.keys(headers)) {
      if (FOREIGN_CLIENT_HEADER.test(name)) delete headers[name];
    }
    return { ...headers, ...museCodeSessionHeaders(clientHeaders, body, credentials.connectionId) };
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
