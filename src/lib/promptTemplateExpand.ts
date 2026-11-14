/**
 * Prompt template expansion (opt-in, OMNIROUTE_PROMPT_TEMPLATES=1).
 *
 * A chat message whose whole content is `template://<slug>` is replaced by the stored template
 * (src/lib/db/prompts.ts) with its `{{var}}` slots filled from the body's `template_params`.
 * Values are inserted as data in one pass (never re-scanned for slots), and a slot with no
 * value is an error instead of being sent upstream as literal `{{var}}`.
 */

import { getActivePrompt } from "@/lib/db/prompts";

const TRUTHY = new Set(["1", "true", "yes", "on"]);
const TEMPLATE_REF = /^template:\/\/([A-Za-z0-9][A-Za-z0-9._-]*)$/;
const SLOT = /\{\{\s*([A-Za-z_][A-Za-z0-9_]*)\s*\}\}/g;

type Message = { role?: unknown; content?: unknown };
type Body = { messages?: Message[]; template_params?: unknown; [key: string]: unknown };

export type ExpandResult<T> = { ok: true; body: T } | { ok: false; status: 400; message: string };

export function isPromptTemplatesEnabled(
  env: Readonly<Record<string, string | undefined>> = process.env
): boolean {
  return TRUTHY.has((env.OMNIROUTE_PROMPT_TEMPLATES ?? "").trim().toLowerCase());
}

const refuse = (message: string): { ok: false; status: 400; message: string } => ({
  ok: false,
  status: 400,
  message,
});

function readParams(raw: unknown): Record<string, string> | string {
  if (raw === undefined) return {};
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return "template_params: Expected an object of string values";
  }
  const params: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value !== "string") return `template_params.${key}: Expected a string`;
    params[key] = value;
  }
  return params;
}

/**
 * Expand every `template://slug` message of `body`. Returns the same `body` object when nothing
 * matched, and a copy otherwise (the input is never mutated). `lookup` returns the active
 * template content for a slug, or null.
 */
export function expandPromptTemplates<T extends Body>(
  body: T,
  lookup: (slug: string) => string | null
): ExpandResult<T> {
  const messages = body.messages;
  if (!Array.isArray(messages)) return { ok: true, body };
  const hit = (m: Message) => typeof m?.content === "string" && TEMPLATE_REF.test(m.content);
  if (!messages.some(hit)) return { ok: true, body };

  const params = readParams(body.template_params);
  if (typeof params === "string") return refuse(params);

  const expanded: Message[] = [];
  for (const message of messages) {
    const slug = hit(message) ? TEMPLATE_REF.exec(message.content as string)?.[1] : undefined;
    if (!slug) {
      expanded.push(message);
      continue;
    }
    const template = lookup(slug);
    if (template === null) return refuse(`Unknown template: ${slug}`);
    const missing = new Set<string>();
    const content = template.replace(SLOT, (_slot, name: string) => {
      if (!Object.hasOwn(params, name)) {
        missing.add(name);
        return "";
      }
      return params[name];
    });
    if (missing.size > 0) {
      return refuse(`Missing template parameters: ${[...missing].join(", ")}`);
    }
    expanded.push({ ...message, content });
  }

  const { template_params: _consumed, ...rest } = body;
  return { ok: true, body: { ...rest, messages: expanded } as unknown as T };
}

/**
 * Chat-handler glue: a no-op unless the flag is on. Returns the (possibly expanded) body, or a
 * 400 Response when a template is unknown or a slot has no value.
 */
export function expandChatPromptTemplates<T extends Body>(body: T): T | Response {
  if (!isPromptTemplatesEnabled()) return body;
  const result = expandPromptTemplates(body, (slug) => getActivePrompt(slug)?.content ?? null);
  if (result.ok === true) return result.body;
  return Response.json(
    { error: { message: result.message, type: "invalid_request_error", code: "invalid_template" } },
    { status: result.status }
  );
}
