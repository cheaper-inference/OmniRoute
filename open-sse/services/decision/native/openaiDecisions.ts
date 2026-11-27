/**
 * Native OpenAI Decisions (`POST /v1/decisions`, #18838) — pure parts: the model ids it
 * serves, the wire schema, the upstream URL and the decision-catalog projection.
 *
 * Decisions is its own wire format (`input` + an ordered `questions` array answered in an
 * ordered `answers` array); it is never translated to or from chat, and never to the System
 * One `state`/`questions` map. The outbound call itself goes through the guarded decision
 * transport (`../transport.ts`), the same path the `decision` auto-router uses.
 */
import { z } from "zod";

import { isSelfGatewayUrl, normalizeDecisionBaseUrl } from "../config.ts";

export const OPENAI_DECISIONS_PROVIDER_ID = "openai";
export const OPENAI_DECISIONS_DEFAULT_API_ROOT = "https://api.openai.com/v1";
/** Models the Decisions API accepts (developers.openai.com: gpt-6-luna is the only one). */
export const OPENAI_DECISION_MODEL_IDS: ReadonlySet<string> = new Set(["gpt-6-luna"]);

/** Inbound body cap of `POST /v1/decisions`; the upstream answer keeps the 64 KB transport cap. */
export const MAX_DECISIONS_REQUEST_BYTES = 4 * 1024 * 1024;

export type NativeDecisionModel = {
  /** Qualified id used for key policy and logs (`openai/gpt-6-luna`). */
  qualified: string;
  /** Id sent upstream (`gpt-6-luna`). */
  upstream: string;
};

/** `openai/gpt-6-luna` or the bare `gpt-6-luna`; anything else is not a Decisions model. */
export function resolveOpenAiDecisionModel(model: unknown): NativeDecisionModel | null {
  if (typeof model !== "string") return null;
  const trimmed = model.trim();
  const prefix = `${OPENAI_DECISIONS_PROVIDER_ID}/`;
  const bare = trimmed.startsWith(prefix) ? trimmed.slice(prefix.length) : trimmed;
  if (!OPENAI_DECISION_MODEL_IDS.has(bare)) return null;
  return { qualified: `${prefix}${bare}`, upstream: bare };
}

const KNOWN_ENDPOINT_SUFFIXES = /\/(?:chat\/completions|chat|responses)$/;

/**
 * The Decisions URL for an `openai` connection. A connection without a base URL uses
 * api.openai.com; one with a base URL (the same field the chat executor honours) must be an
 * absolute http(s) URL without credentials, query or fragment and must not point at this
 * OmniRoute. Returns null when the configured base URL is not usable (fail closed: the key is
 * never sent to a URL the validation refused).
 */
export function resolveOpenAiDecisionsUrl(providerSpecificData: unknown): string | null {
  const raw = (providerSpecificData as { baseUrl?: unknown } | null | undefined)?.baseUrl;
  if (raw === undefined || raw === null || (typeof raw === "string" && !raw.trim())) {
    return `${OPENAI_DECISIONS_DEFAULT_API_ROOT}/decisions`;
  }
  const normalized = normalizeDecisionBaseUrl(raw);
  if (!normalized || isSelfGatewayUrl(normalized)) return null;
  const base = normalized.replace(KNOWN_ENDPOINT_SUFFIXES, "");
  const apiRoot = base.endsWith("/v1") ? base : `${base}/v1`;
  return `${apiRoot}/decisions`;
}

const objectPart = z.record(z.string(), z.unknown());
const instructions = z.union([z.string().min(1), z.array(objectPart).min(1).max(16_384)]);
const named = { name: z.string().min(1).max(256).optional(), instructions };

const choiceOption = z
  .object({ value: z.union([z.string(), z.boolean()]), description: z.string().optional() })
  .passthrough();

const question = z.discriminatedUnion("type", [
  z.object({ ...named, type: z.literal("predicate") }).passthrough(),
  z
    .object({
      ...named,
      type: z.literal("choice"),
      choices: z
        .array(choiceOption)
        .min(2)
        .max(255)
        .refine(
          (values) => new Set(values.map((v) => JSON.stringify(v.value))).size === values.length,
          "Choice values must be unique"
        ),
    })
    .passthrough(),
  z
    .object({
      ...named,
      type: z.literal("score"),
      levels: z
        .array(
          z.object({ label: z.string().min(1), description: z.string().optional() }).passthrough()
        )
        .min(2)
        .max(10),
    })
    .passthrough(),
]);

/**
 * `POST /v1/decisions` body. The top level is strict (a System One `state` or any unknown
 * field is refused instead of being forwarded); message, tool and question parts pass through
 * because the upstream stays authoritative for their content.
 */
export const openAiDecisionsRequestSchema = z
  .object({
    model: z.string().trim().min(1).max(200),
    input: z.union([z.string().min(1), z.array(objectPart).min(1)]),
    questions: z
      .array(question)
      .min(1)
      .max(400)
      .refine((questions) => {
        const names = questions.map((q) => q.name).filter((name) => name !== undefined);
        return new Set(names).size === names.length;
      }, "Question names must be unique"),
    prompt_cache_key: z.string().max(64).optional(),
    prompt_cache_options: z.record(z.string(), z.unknown()).nullable().optional(),
    safety_identifier: z.string().max(128).nullable().optional(),
  })
  .strict();

export type OpenAiDecisionsRequest = z.infer<typeof openAiDecisionsRequestSchema>;

type CatalogRow = Record<string, unknown>;

/**
 * Decision-catalog rows for the native Decisions models already present in the caller's
 * authorized model catalog (key allowlist and connection scope applied by that catalog).
 * Only the canonical `openai/<model>` row is emitted, once.
 */
export function projectOpenAiDecisionRows(rows: readonly CatalogRow[]): CatalogRow[] {
  const out = new Map<string, CatalogRow>();
  for (const row of rows) {
    if (row.owned_by !== OPENAI_DECISIONS_PROVIDER_ID) continue;
    const resolved = resolveOpenAiDecisionModel(row.root ?? row.id);
    if (!resolved || out.has(resolved.qualified)) continue;
    out.set(resolved.qualified, {
      id: resolved.qualified,
      object: "model",
      owned_by: OPENAI_DECISIONS_PROVIDER_ID,
      type: "decisions",
      api_format: "decisions",
      supported_endpoints: ["decisions"],
      capabilities: { decision: true },
      // Unknown here; the chat price of the same model is not the decision price.
      pricing: null,
    });
  }
  return [...out.values()];
}
