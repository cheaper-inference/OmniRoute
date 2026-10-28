/**
 * Custom JSON API nodes — configuration validation, request templating and response
 * extraction. Pure module (zod + constants only): it is shared by the API routes, the
 * executor and the dashboard schemas.
 *
 * Templates are plain JSON. A string value may contain `{{variable}}` placeholders that
 * are substituted from a fixed variable set; nothing is ever evaluated or executed, and
 * object keys are never substituted.
 */
import { z } from "zod";
import {
  CUSTOM_JSON_API_TYPE,
  CUSTOM_JSON_AUTH_TYPES,
  CUSTOM_JSON_BLOCKED_AUTH_HEADERS,
  CUSTOM_JSON_BLOCKED_KEYS,
  CUSTOM_JSON_DEFAULTS,
  CUSTOM_JSON_MAX_DEPTH,
  CUSTOM_JSON_MAX_PATH_LENGTH,
  CUSTOM_JSON_MAX_TEMPLATE_SIZE,
  CUSTOM_JSON_METHODS,
  CUSTOM_JSON_VARIABLES,
} from "../config/customJson.ts";
import { isForbiddenUpstreamHeaderName } from "@/shared/constants/upstreamHeaders";

type JsonRecord = Record<string, unknown>;

export type CustomJsonMethod = (typeof CUSTOM_JSON_METHODS)[number];
export type CustomJsonAuthType = (typeof CUSTOM_JSON_AUTH_TYPES)[number];

export type CustomJsonConfig = {
  method: CustomJsonMethod;
  authType: CustomJsonAuthType;
  authHeader: string;
  requestTemplate: JsonRecord;
  responsePath: string;
};

/** Raised for an invalid configuration or a request the template cannot be filled for. */
export class CustomJsonError extends Error {
  /** HTTP status the executor answers with (400 invalid config/request, 401 missing key). */
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "CustomJsonError";
    this.status = status;
  }
}

// Bounded, non-overlapping patterns (no nested quantifiers) — safe on untrusted input.
const TOKEN_PATTERN = /\{\{([^{}]{1,256})\}\}/g;
const EXACT_TOKEN_PATTERN = /^\{\{([^{}]{1,256})\}\}$/;
const PATH_SEGMENTS_PATTERN = /^[A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)*$/;
const HEADER_NAME_PATTERN = /^[A-Za-z0-9-]{1,128}$/;

const BLOCKED_KEYS: ReadonlySet<string> = new Set(CUSTOM_JSON_BLOCKED_KEYS);
const VARIABLES: ReadonlySet<string> = new Set(CUSTOM_JSON_VARIABLES);

function isPlainObject(value: unknown): value is JsonRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/** `data.items[0].text` → ["data", "items", "0", "text"]; `$` → [] (whole value). */
export function parseCustomJsonPath(path: string): string[] {
  const trimmed = String(path).trim();
  if (trimmed === "$") return [];
  if (!trimmed || trimmed.length > CUSTOM_JSON_MAX_PATH_LENGTH) {
    throw new CustomJsonError("Invalid field path");
  }
  const normalized = trimmed.replace(/^\$\./, "").replace(/\[(\d{1,9})\]/g, ".$1");
  if (!PATH_SEGMENTS_PATTERN.test(normalized)) {
    throw new CustomJsonError(`Invalid field path: ${trimmed}`);
  }
  const parts = normalized.split(".");
  if (parts.some((part) => BLOCKED_KEYS.has(part))) {
    throw new CustomJsonError("Unsafe field path");
  }
  return parts;
}

/** Own-property lookup only: a path never reaches inherited/prototype values. */
export function readJsonPath(value: unknown, path: string): unknown {
  let current: unknown = value;
  for (const key of parseCustomJsonPath(path)) {
    if (current === null || current === undefined || typeof current !== "object") return undefined;
    if (!Object.hasOwn(current, key)) return undefined;
    current = (current as JsonRecord)[key];
  }
  return current;
}

function visitTemplate(value: unknown, onString: (text: string) => unknown, depth = 0): unknown {
  if (depth > CUSTOM_JSON_MAX_DEPTH) {
    throw new CustomJsonError("Request template is nested too deeply");
  }
  if (typeof value === "string") return onString(value);
  if (Array.isArray(value)) return value.map((item) => visitTemplate(item, onString, depth + 1));
  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.keys(value).map((key) => {
        if (BLOCKED_KEYS.has(key)) throw new CustomJsonError("Unsafe request template key");
        return [key, visitTemplate(value[key], onString, depth + 1)];
      })
    );
  }
  return value;
}

function assertPlaceholders(text: string): string {
  const remainder = text.replace(TOKEN_PATTERN, (_match, inner: string) => {
    const root = parseCustomJsonPath(inner)[0];
    if (!root || !VARIABLES.has(root)) {
      throw new CustomJsonError(`Unknown template variable: ${inner.trim()}`);
    }
    return "";
  });
  if (remainder.includes("{{") || remainder.includes("}}")) {
    throw new CustomJsonError("Invalid template placeholder");
  }
  return text;
}

function validateRequestTemplate(template: unknown): JsonRecord {
  if (!isPlainObject(template)) {
    throw new CustomJsonError("Request template must be a JSON object");
  }
  const serialized = JSON.stringify(template);
  if (new TextEncoder().encode(serialized).length > CUSTOM_JSON_MAX_TEMPLATE_SIZE) {
    throw new CustomJsonError("Request template exceeds 64 KB");
  }
  visitTemplate(template, assertPlaceholders);
  // JSON round-trip: keep only JSON values and detach from the caller's object.
  return JSON.parse(serialized) as JsonRecord;
}

function validateAuthHeader(name: string): void {
  const lower = name.toLowerCase();
  if (
    !HEADER_NAME_PATTERN.test(name) ||
    (CUSTOM_JSON_BLOCKED_AUTH_HEADERS as readonly string[]).includes(lower) ||
    isForbiddenUpstreamHeaderName(lower)
  ) {
    throw new CustomJsonError("Invalid API key header name");
  }
}

/**
 * Zod schema for the operator-supplied custom JSON configuration. Unknown keys are
 * rejected; omitted fields take the documented defaults. The output is the normalized
 * config (template detached and checked, response path trimmed).
 */
export const customJsonConfigSchema = z
  .object({
    method: z.enum(CUSTOM_JSON_METHODS).optional(),
    authType: z.enum(CUSTOM_JSON_AUTH_TYPES).optional(),
    authHeader: z.string().trim().min(1).max(128).optional(),
    requestTemplate: z.unknown().optional(),
    responsePath: z.string().trim().min(1).max(CUSTOM_JSON_MAX_PATH_LENGTH).optional(),
  })
  .strict()
  .transform((value, ctx): CustomJsonConfig => {
    const config = {
      method: value.method ?? CUSTOM_JSON_DEFAULTS.method,
      authType: value.authType ?? CUSTOM_JSON_DEFAULTS.authType,
      authHeader: value.authHeader ?? CUSTOM_JSON_DEFAULTS.authHeader,
      requestTemplate: { ...CUSTOM_JSON_DEFAULTS.requestTemplate } as JsonRecord,
      responsePath: value.responsePath ?? CUSTOM_JSON_DEFAULTS.responsePath,
    };
    const checks: Array<[string, () => void]> = [
      [
        "requestTemplate",
        () => {
          if (value.requestTemplate !== undefined) {
            config.requestTemplate = validateRequestTemplate(value.requestTemplate);
          }
        },
      ],
      ["responsePath", () => void parseCustomJsonPath(config.responsePath)],
      ["authHeader", () => config.authType === "api-key" && validateAuthHeader(config.authHeader)],
    ];
    for (const [field, check] of checks) {
      try {
        check();
      } catch (error) {
        ctx.addIssue({
          code: "custom",
          message: error instanceof Error ? error.message : "Invalid value",
          path: [field],
        });
      }
    }
    return config;
  });

/** Full endpoint URL check: http(s), no embedded credentials, no fragment. */
export function assertCustomJsonEndpoint(endpoint: unknown): string {
  let url: URL;
  try {
    url = new URL(String(endpoint ?? "").trim());
  } catch {
    throw new CustomJsonError("A complete HTTP(S) endpoint URL is required");
  }
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.hash) {
    throw new CustomJsonError("Use an HTTP(S) endpoint without URL credentials or a fragment");
  }
  return url.toString();
}

/** Validate + normalize a stored or submitted config. Throws CustomJsonError. */
export function normalizeCustomJsonConfig(input: unknown, endpoint: unknown): CustomJsonConfig {
  assertCustomJsonEndpoint(endpoint);
  const parsed = customJsonConfigSchema.safeParse(input ?? {});
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const field = issue?.path?.length ? `${issue.path.join(".")}: ` : "";
    throw new CustomJsonError(`Invalid custom JSON configuration — ${field}${issue?.message}`);
  }
  return parsed.data;
}

export function isCustomJsonProviderData(providerSpecificData: unknown): boolean {
  return (
    isPlainObject(providerSpecificData) && providerSpecificData.apiType === CUSTOM_JSON_API_TYPE
  );
}

function latestUserText(messages: unknown[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i];
    if (!isPlainObject(message) || message.role !== "user") continue;
    if (typeof message.content === "string") return message.content;
    if (!Array.isArray(message.content)) return "";
    return message.content
      .filter((part) => isPlainObject(part) && part.type === "text")
      .map((part) =>
        typeof (part as JsonRecord).text === "string" ? (part as JsonRecord).text : ""
      )
      .join("\n");
  }
  return "";
}

/**
 * Fill the request template from the (OpenAI chat format) request body. An exact
 * placeholder (`"{{messages}}"`) keeps the value's JSON type; an embedded one is
 * stringified. A placeholder that resolves to nothing is an error, never silently empty.
 */
export function buildCustomJsonRequest(
  config: CustomJsonConfig,
  model: string,
  body: unknown
): JsonRecord {
  const request = isPlainObject(body) ? body : {};
  const messages = Array.isArray(request.messages) ? request.messages : [];
  const variables = { prompt: latestUserText(messages), messages, model, stream: false, request };
  const resolve = (inner: string) => {
    const value = readJsonPath(variables, inner);
    if (value === undefined) throw new CustomJsonError(`Missing template value: ${inner.trim()}`);
    return value;
  };
  return visitTemplate(config.requestTemplate, (text) => {
    const exact = EXACT_TOKEN_PATTERN.exec(text);
    if (exact) return resolve(exact[1]);
    return text.replace(TOKEN_PATTERN, (_match, inner: string) => {
      const value = resolve(inner);
      return typeof value === "string" ? value : JSON.stringify(value);
    });
  }) as JsonRecord;
}

/** Base + auth headers. Operator custom headers are merged by the executor in between. */
export function buildCustomJsonHeaders(
  config: CustomJsonConfig,
  apiKey: unknown
): { base: Record<string, string>; auth: Record<string, string> } {
  const key = typeof apiKey === "string" ? apiKey.trim() : "";
  if (config.authType !== "none" && !key) {
    throw new CustomJsonError("API key is required for this custom JSON endpoint", 401);
  }
  const base = { "Content-Type": "application/json", Accept: "application/json" };
  if (config.authType === "bearer") return { base, auth: { Authorization: `Bearer ${key}` } };
  if (config.authType === "api-key") return { base, auth: { [config.authHeader]: key } };
  return { base, auth: {} };
}

/** Read the reply text. Strings pass through; other JSON values are serialized. */
export function extractCustomJsonText(
  config: Pick<CustomJsonConfig, "responsePath">,
  data: unknown
) {
  const value = readJsonPath(data, config.responsePath);
  if (value === undefined || value === null) {
    throw new CustomJsonError(`Response field not found: ${config.responsePath}`);
  }
  return typeof value === "string" ? value : JSON.stringify(value);
}
