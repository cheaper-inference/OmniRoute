/**
 * Local Ollama System One URL (#14667): the `ollama-local` connection's base URL
 * (`…/v1`, `…/v1/chat/completions`, `…/api/chat`, a bare host; default
 * `http://localhost:11434/v1`) becomes its `/v1/systemone` URL. Lives on the src
 * side because it needs the provider catalog and the shared outbound URL guard.
 */

import { LOCAL_PROVIDERS } from "@/shared/constants/providers/local";
import { parseAndValidateNonMetadataUrl } from "@/shared/network/outboundUrlGuard";

export const OLLAMA_LOCAL_SYSTEMONE_DEFAULT_BASE_URL =
  LOCAL_PROVIDERS["ollama-local"]?.localDefault || "http://localhost:11434/v1";

/**
 * Throws on an unparseable URL, embedded credentials, a cloud-metadata host, or
 * Ollama cloud, which does not serve System One.
 */
export function buildOllamaSystemOneUrl(baseUrl: unknown): string {
  const base =
    typeof baseUrl === "string" && baseUrl.trim()
      ? baseUrl.trim()
      : OLLAMA_LOCAL_SYSTEMONE_DEFAULT_BASE_URL;
  const url = parseAndValidateNonMetadataUrl(base);
  const host = url.hostname.toLowerCase();
  if (host === "ollama.com" || host.endsWith(".ollama.com")) {
    throw new Error(
      "Ollama cloud does not support System One; configure a local Ollama connection"
    );
  }
  url.search = "";
  url.hash = "";
  url.pathname =
    url.pathname
      .replace(/\/+$/, "")
      .replace(/\/(?:chat\/completions|completions|embeddings|systemone)$/i, "")
      .replace(/\/api\/chat$/i, "")
      .replace(/\/v1$/i, "") + "/v1/systemone";
  return url.toString();
}
