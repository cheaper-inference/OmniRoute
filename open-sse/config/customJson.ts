/**
 * Custom JSON API provider nodes.
 *
 * An OpenAI-compatible node with `apiType: "custom-json"` talks to an arbitrary JSON
 * business endpoint: the router fills a JSON request template and reads the reply from
 * a response path. Business calls can have side effects, so they are never replayed —
 * not by transport retries, another connection, nor a combo fallback target.
 */

export const CUSTOM_JSON_API_TYPE = "custom-json";

export const CUSTOM_JSON_METHODS = ["POST", "PUT", "PATCH"] as const;
export const CUSTOM_JSON_AUTH_TYPES = ["bearer", "api-key", "none"] as const;

/** Root names a `{{...}}` placeholder may start with. */
export const CUSTOM_JSON_VARIABLES = ["prompt", "messages", "model", "stream", "request"] as const;

export const CUSTOM_JSON_DEFAULT_REQUEST_TEMPLATE = Object.freeze({
  model: "{{model}}",
  messages: "{{messages}}",
});

export const CUSTOM_JSON_DEFAULTS = Object.freeze({
  method: "POST" as const,
  authType: "bearer" as const,
  authHeader: "X-API-Key",
  requestTemplate: CUSTOM_JSON_DEFAULT_REQUEST_TEMPLATE,
  responsePath: "choices[0].message.content",
});

/** Serialized request template size cap (bytes of JSON text). */
export const CUSTOM_JSON_MAX_TEMPLATE_SIZE = 65_536;
/** Max nesting depth of the request template. */
export const CUSTOM_JSON_MAX_DEPTH = 32;
/** Max length of a field path (`{{request.a.b}}`, response path). */
export const CUSTOM_JSON_MAX_PATH_LENGTH = 256;

/** Keys that could reach an object prototype; rejected in templates and paths. */
export const CUSTOM_JSON_BLOCKED_KEYS = ["__proto__", "prototype", "constructor"] as const;

/**
 * Header names the API-key auth header may not use: framing/body headers the executor
 * owns, plus credentials that belong to other auth modes. Hop-by-hop names are rejected
 * separately through the canonical upstream-header denylist.
 */
export const CUSTOM_JSON_BLOCKED_AUTH_HEADERS = [
  "host",
  "content-length",
  "content-type",
  "connection",
  "transfer-encoding",
  "authorization",
  "cookie",
] as const;
