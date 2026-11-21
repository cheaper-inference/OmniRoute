// Infomaniak AI Tools endpoints carry the account's product id in the path, so there
// is no fixed host to preset. The validator and the add-connection placeholder share
// this shape.
export const INFOMANIAK_BASE_URL_EXAMPLE = "https://api.infomaniak.com/2/ai/<product_id>/openai/v1";
export const INFOMANIAK_DEFAULT_VALIDATION_MODEL_ID = "google/gemma-4-31B-it";

export const INFOMANIAK_HTTPS_REQUIRED_MESSAGE =
  "Infomaniak requires https:// URLs (Base URL and models URL); the API key is sent as a Bearer token.";

/** True when `baseUrl` parses as an https URL. The API key travels in every request to it. */
export function isHttpsBaseUrl(baseUrl: string): boolean {
  try {
    return new URL(baseUrl).protocol === "https:";
  } catch {
    return false;
  }
}
