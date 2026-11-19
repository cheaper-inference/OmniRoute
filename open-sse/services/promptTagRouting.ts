/**
 * Prompt-level combo tags.
 *
 * A leading `[tag]` on the newest user message that carries one selects the routing
 * combo for the request, so a client can keep a single default combo and switch modes
 * per task (`[audit] …`, `[fast] …`) without touching its model picker.
 *
 * Semantics, in order of importance:
 *
 *  1. The tag is read from the freshest user message that has one, not from the last
 *     message. Agent clients replay the whole thread on every step and usually end with
 *     `role: "tool"`, while the tag was typed several turns earlier; reading only the
 *     last user message would switch a single step and then flip back.
 *  2. An explicit model id wins over the tag. A request naming a concrete model means
 *     "route exactly here"; only a combo (or a virtual `auto/...` target) means "you
 *     decide", and that is the only case where a tag may intervene.
 *  3. A tag may only select a combo the API key is already allowed to use. The tag is
 *     prompt text, so it must never widen permissions.
 *  4. An unknown tag changes nothing and leaves the text intact, so prose such as
 *     `[see the docs]` passes through untouched.
 *
 * Pure functions only: no DB, no settings, no logging. The caller resolves the combo
 * list, the alias map and the key's allowed combos, then applies the returned body.
 */

export type PromptTagBody = {
  messages?: unknown;
  input?: unknown;
  model?: unknown;
};

export type PromptTagSlot = {
  read: () => string;
  write: (value: string) => void;
};

export type PromptTagWhere = {
  list: "messages" | "input";
  /** Index of the message inside that list. */
  index: number;
  /** Index of the text part when the message content is an array, otherwise null. */
  partIndex: number | null;
};

export type PromptTagHit = {
  /** Tag text without its brackets, e.g. `audit`. */
  tag: string;
  /** Characters occupied by the brackets and the tag, for stripping. */
  length: number;
  slot: PromptTagSlot;
  where: PromptTagWhere;
};

export type PromptTagResolution = {
  combo: string | null;
  reason: "ok" | "unknown" | "forbidden";
};

export type PromptTagRoutingOptions = {
  combos: readonly string[];
  aliases?: Readonly<Record<string, string>> | null;
  /** Mirrors the API key permission list: null/undefined means unrestricted. */
  allowedCombos?: readonly string[] | null;
  /**
   * The model the client admitted, captured before task/web-search/reasoning routing
   * rewrites `body.model`. Eligibility must be decided on that value: a later rewrite
   * to a combo would otherwise let a tag override an explicit model choice.
   */
  eligibleModel?: unknown;
};

const LEADING_TAG = /^\s*\[([^[\]\n]{1,64})\]/;
const IDENTIFIER = /^[A-Za-z0-9][A-Za-z0-9._/:-]*$/;

/** Reads a leading `[tag]` from a message body. */
export function readPromptTag(text: string | null | undefined): { tag: string; length: number } | null {
  const match = LEADING_TAG.exec(String(text ?? ""));
  if (!match) return null;
  return { tag: match[1].trim(), length: match[0].length };
}

/** True for a tag that looks like an identifier (worth warning about when unknown). */
export function isIdentifierTag(tag: string): boolean {
  return IDENTIFIER.test(String(tag ?? ""));
}

function slotOf(message: unknown): { slot: PromptTagSlot; partIndex: number | null } | null {
  if (!message || typeof message !== "object") return null;
  const content = (message as { content?: unknown }).content;
  if (typeof content === "string") {
    const holder = message as { content: string };
    return {
      partIndex: null,
      slot: {
        read: () => holder.content,
        write: (value: string) => {
          holder.content = value;
        },
      },
    };
  }
  if (Array.isArray(content)) {
    for (let partIndex = 0; partIndex < content.length; partIndex += 1) {
      const part = content[partIndex];
      if (part && typeof part === "object" && typeof (part as { text?: unknown }).text === "string") {
        const holder = part as { text: string };
        return {
          partIndex,
          slot: {
            read: () => holder.text,
            write: (value: string) => {
              holder.text = value;
            },
          },
        };
      }
    }
  }
  return null;
}

function scanList(list: unknown, listName: "messages" | "input"): PromptTagHit | null {
  if (!Array.isArray(list)) return null;
  for (let index = list.length - 1; index >= 0; index -= 1) {
    const message = list[index];
    if (!message || typeof message !== "object") continue;
    if ((message as { role?: unknown }).role !== "user") continue;
    const located = slotOf(message);
    if (!located) continue;
    const tag = readPromptTag(located.slot.read());
    if (tag) {
      return { ...tag, slot: located.slot, where: { list: listName, index, partIndex: located.partIndex } };
    }
  }
  return null;
}

/**
 * Locates the tag in a request body: chat-completions (`messages[]`), responses
 * (`input[]` or a bare `input` string).
 */
export function findPromptTag(body: PromptTagBody | null | undefined): PromptTagHit | null {
  if (!body) return null;
  const fromMessages = scanList(body.messages, "messages");
  if (fromMessages) return fromMessages;
  const fromInput = scanList(body.input, "input");
  if (fromInput) return fromInput;
  if (typeof body.input === "string") {
    const tag = readPromptTag(body.input);
    if (tag) {
      return {
        ...tag,
        slot: {
          read: () => String(body.input ?? ""),
          write: (value: string) => {
            body.input = value;
          },
        },
        where: { list: "input", index: -1, partIndex: null },
      };
    }
  }
  return null;
}

/** Removes the tag from its message in place and returns the remaining text. */
export function stripPromptTag(hit: PromptTagHit): string {
  const text = hit.slot.read();
  const rest = text.slice(hit.length).replace(/^[ \t]+/, "");
  hit.slot.write(rest);
  return rest;
}

/**
 * Returns a copy of the body whose tagged message no longer carries the tag.
 *
 * The caller's body is left untouched on purpose: handlers keep the same message objects
 * in the history persisted for `previous_response_id` continuations, and a continuation
 * that carries only a tool result has nothing else to read the tag from. Only the upstream
 * request may lose it.
 */
export function bodyWithoutPromptTag(body: PromptTagBody, hit: PromptTagHit): PromptTagBody {
  const rest = hit.slot.read().slice(hit.length).replace(/^[ \t]+/, "");
  if (hit.where.index < 0) return { ...body, input: rest };

  const rewrite = (list: unknown): unknown => {
    if (!Array.isArray(list)) return list;
    return list.map((message, index) => {
      if (index !== hit.where.index || !message || typeof message !== "object") return message;
      const content = (message as { content?: unknown }).content;
      if (typeof content === "string") return { ...(message as object), content: rest };
      if (Array.isArray(content) && hit.where.partIndex !== null) {
        return {
          ...(message as object),
          content: content.map((part, partIndex) =>
            partIndex === hit.where.partIndex ? { ...(part as object), text: rest } : part
          ),
        };
      }
      return message;
    });
  };

  if (hit.where.list === "messages") return { ...body, messages: rewrite(body.messages) };
  return { ...body, input: rewrite(body.input) };
}

/**
 * Resolves a tag to a combo name, honouring the key's allowances.
 *
 * Exact-case matches win. When several combos differ only by case the tag is ambiguous
 * and is treated as unknown rather than guessed — a routing surprise is worse than a
 * no-op.
 *
 * `allowedCombos` mirrors the API key permission list: `null` or `undefined` means the
 * key is unrestricted, an empty array means "no combos allowed".
 */
export function resolvePromptTagCombo(
  tag: string,
  options: PromptTagRoutingOptions
): PromptTagResolution {
  const raw = String(tag ?? "").trim();
  const key = raw.toLowerCase();
  if (!key) return { combo: null, reason: "unknown" };

  const listed = (options.combos ?? []).map((combo) => combo.trim()).filter(Boolean);
  const bare = key.startsWith("combo/") ? key.slice("combo/".length) : key;
  const rawBare = raw.startsWith("combo/") ? raw.slice("combo/".length) : raw;

  const exactCase =
    listed.find((combo) => combo === raw) ?? listed.find((combo) => combo === rawBare) ?? null;
  const caseInsensitiveMatches = listed.filter(
    (combo) => combo.toLowerCase() === key || combo.toLowerCase() === bare
  );
  if (!exactCase && caseInsensitiveMatches.length > 1) return { combo: null, reason: "unknown" };

  const aliases = options.aliases ?? null;
  const aliasTarget = aliases?.[key] ?? (bare !== key ? aliases?.[bare] : undefined) ?? null;

  let comboName: string | null = null;
  if (aliasTarget) comboName = String(aliasTarget).trim();
  else if (exactCase) comboName = exactCase;
  else if (caseInsensitiveMatches.length === 1) comboName = caseInsensitiveMatches[0];
  else if (bare !== key && listed.some((combo) => combo.toLowerCase() === bare)) {
    comboName = listed.find((combo) => combo.toLowerCase() === bare) ?? null;
  }
  if (!comboName) return { combo: null, reason: "unknown" };

  if (options.allowedCombos == null) return { combo: comboName, reason: "ok" };

  const allowed = (options.allowedCombos ?? []).map((entry) => {
    const value = entry.trim().toLowerCase();
    return value.startsWith("combo/") ? value.slice("combo/".length) : value;
  });
  const allowedSet = new Set(allowed);
  const target = comboName.toLowerCase();
  const targetBare = target.startsWith("combo/") ? target.slice("combo/".length) : target;
  if (allowedSet.has("*") || allowedSet.has(target) || allowedSet.has(targetBare)) {
    return { combo: comboName, reason: "ok" };
  }
  return { combo: null, reason: "forbidden" };
}

/** True when the request already names a concrete model and must not be re-routed. */
export function requestNamesExplicitModel(model: unknown, combos: readonly string[]): boolean {
  const value = String(model ?? "").trim().toLowerCase();
  if (!value) return false;
  if (value.startsWith("combo/") || value.startsWith("auto/")) return false;
  return !(combos ?? []).some((combo) => combo.trim().toLowerCase() === value);
}

export type PromptTagRoutingResult =
  | { combo: string; tag: string; body: PromptTagBody }
  | { combo: null; reason: "explicit-model" | "unknown" | "forbidden"; tag: string | null };

/**
 * Applies prompt-tag routing to a request body.
 *
 * Returns the combo to route to plus the body with the tag stripped, or a `combo: null`
 * verdict the caller may log. Never mutates the caller's model: that decision stays with
 * the handler.
 */
export function applyPromptTagRouting(
  body: PromptTagBody | null | undefined,
  options: PromptTagRoutingOptions
): PromptTagRoutingResult {
  if (!body) return { combo: null, reason: "unknown", tag: null };
  const hit = findPromptTag(body);
  if (!hit) return { combo: null, reason: "unknown", tag: null };

  const eligibilityModel = options.eligibleModel ?? body.model;
  if (requestNamesExplicitModel(eligibilityModel, options.combos)) {
    return { combo: null, reason: "explicit-model", tag: hit.tag };
  }

  const resolved = resolvePromptTagCombo(hit.tag, options);
  if (!resolved.combo) {
    // resolvePromptTagCombo only reports "ok" together with a combo, so narrow explicitly
    // instead of widening the caller's verdict union with a reason it cannot produce.
    return { combo: null, reason: resolved.reason === "forbidden" ? "forbidden" : "unknown", tag: hit.tag };
  }

  return { combo: resolved.combo, tag: hit.tag, body: bodyWithoutPromptTag(body, hit) };
}
