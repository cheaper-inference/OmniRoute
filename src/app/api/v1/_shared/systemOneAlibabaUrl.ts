/**
 * Alibaba DashScope System One URL: the `alibaba` connection's base URL (the
 * general `dashscope.aliyuncs.com`, a dedicated `ws-….maas.aliyuncs.com`
 * business space, or an already `/compatible-mode/v1` URL published by the
 * upstream credential flow across `compatible-mode`, `coding`, or `coding-intl`
 * surfaces) becomes its `/compatible-mode/v1/systemone` URL.
 *
 * Alibaba decision models live on the OpenAI-compatible surface
 * (`/compatible-mode/v1/systemone`), so every known base-URL shape has to
 * normalize to that one path. A regionless bare host keeps its own region
 * segment when one is present (`ws-x.cn-beijing.maas.aliyuncs.com`).
 *
 * Lives on the src side because it needs the shared outbound URL guard.
 */

import { parseAndValidateNonMetadataUrl } from "@/shared/network/outboundUrlGuard";

export const ALIBABA_SYSTEMONE_DEFAULT_BASE_URL = "https://dashscope.aliyuncs.com";

/** Trailing paths that a connection base URL may carry; all are replaced by the systemone path. */
const ALIBABA_BASE_PATH_SUFFIXES = [
  /\/compatible-mode\/v1(?:\/(?:chat\/completions|models|systemone))?$/i,
  /\/compatible-mode$/i,
  /\/chat\/completions$/i,
  /\/models$/i,
  /\/systemone$/i,
  /\/v1$/i,
];

/**
 * Throws on an unparseable URL, embedded credentials, or a cloud-metadata host.
 * `baseUrl` is typically `providerSpecificData.baseUrl`; a missing value falls
 * back to the general DashScope host.
 */
export function buildAlibabaSystemOneUrl(baseUrl: unknown): string {
  const base =
    typeof baseUrl === "string" && baseUrl.trim()
      ? baseUrl.trim()
      : ALIBABA_SYSTEMONE_DEFAULT_BASE_URL;
  const url = parseAndValidateNonMetadataUrl(base);
  url.search = "";
  url.hash = "";
  let pathname = url.pathname.replace(/\/+$/, "");
  for (const suffix of ALIBABA_BASE_PATH_SUFFIXES) {
    const next = pathname.replace(suffix, "");
    if (next !== pathname) {
      pathname = next;
      break;
    }
  }
  url.pathname = `${pathname}/compatible-mode/v1/systemone`;
  return url.toString();
}
