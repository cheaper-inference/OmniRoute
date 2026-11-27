/**
 * What a decider is shown: the menu of model ids, one description per entry, and the
 * bounded text of the last user message. Nothing else of the request leaves the process:
 * no system prompt, tools, assistant turns, tool output, headers or account data.
 *
 * Menu and descriptions ported from #18555 (decisionModelStrategy.ts).
 */
import type { ProviderCandidate } from "../autoCombo/scoring.ts";

/** Menu cap shared by every decider (and by the `descriptions` schema). */
export const MAX_DECISION_MENU_ITEMS = 50;
/** Cap on the user text sent to a decider. */
export const MAX_DECISION_STATE_CHARS = 8_000;

type Part = { type?: unknown; text?: unknown } | null;

/** Joined text parts (`text` / `input_text`) of one message content; `null` when empty. */
function readContentText(content: unknown): string | null {
  if (typeof content === "string") return content.trim() || null;
  if (!Array.isArray(content)) return null;
  const text = content
    .map((part: unknown) => {
      const item = part as Part;
      const isText = item?.type === "text" || item?.type === "input_text";
      return isText && typeof item?.text === "string" ? item.text : "";
    })
    .filter(Boolean)
    .join("\n")
    .trim();
  return text || null;
}

/** Text of the last `role: "user"` item of a messages / Responses input array. */
function lastUserText(items: unknown): string | null {
  if (!Array.isArray(items)) return null;
  for (let index = items.length - 1; index >= 0; index -= 1) {
    const item = items[index] as { role?: unknown; type?: unknown; content?: unknown } | null;
    if (!item || item.role !== "user") continue;
    if (item.type !== undefined && item.type !== "message") continue;
    return readContentText(item.content);
  }
  return null;
}

/**
 * Bounded text of the last user message: chat/Claude `messages`, else Responses `input`
 * (a string or message items). Claude's top-level `system` and Responses `instructions`
 * are never read. `null` when the request carries no user text.
 */
export function extractDecisionUserText(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const record = body as { messages?: unknown; input?: unknown };
  const text =
    lastUserText(record.messages) ??
    (typeof record.input === "string" ? record.input.trim() || null : lastUserText(record.input));
  return text ? text.slice(0, MAX_DECISION_STATE_CHARS) : null;
}

/** Unique pool models in pool order, capped at `MAX_DECISION_MENU_ITEMS`. */
export function buildDecisionMenu(candidates: Pick<ProviderCandidate, "model">[]): string[] {
  return [...new Set(candidates.map((item) => item.model))].slice(0, MAX_DECISION_MENU_ITEMS);
}

/**
 * One description per menu entry. An operator description (by model id, else by
 * `provider/model`) wins; otherwise the text carries the pool's cost ranking, but only
 * when costs differ — unpriced models are left out of the ranking.
 */
export function describeDecisionMenu(
  menu: string[],
  candidates: Pick<ProviderCandidate, "provider" | "model" | "costPer1MTokens">[],
  descriptions: Record<string, string> | undefined
): Record<string, string> {
  const costs = new Map<string, number>();
  for (const item of candidates) {
    const cost = item.costPer1MTokens;
    if (!Number.isFinite(cost) || cost < 0) continue;
    costs.set(item.model, Math.min(costs.get(item.model) ?? Infinity, cost));
  }
  const ranked = [...new Set(menu.map((id) => costs.get(id)).filter((c) => c !== undefined))].sort(
    (a, b) => a - b
  );
  return Object.fromEntries(
    menu.map((id) => {
      const operator =
        descriptions?.[id] ??
        candidates
          .filter((item) => item.model === id)
          .map((item) => descriptions?.[`${item.provider}/${id}`])
          .find(Boolean);
      if (operator) return [id, operator];
      const cost = costs.get(id);
      if (cost === undefined || ranked.length < 2) return [id, `Model ${id}`];
      return [
        id,
        `Model ${id}; estimated cost $${Number(cost.toPrecision(3))} per 1M tokens (cost rank ${
          ranked.indexOf(cost) + 1
        } of ${ranked.length}, 1 = cheapest)`,
      ];
    })
  );
}
