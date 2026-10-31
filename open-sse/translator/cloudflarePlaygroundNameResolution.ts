/**
 * Tool-name resolution for the Cloudflare Playground emulated tool calling.
 *
 * The model writes the tool name in a dozen dialects and sometimes not at all.
 * This module answers one question — *which declared tool does this block
 * mean?* — and is deliberately conservative: a name the text does not justify
 * is never invented. A wrong name executes the wrong tool, which is worse than
 * no call at all (no call triggers the executor's repair retry).
 *
 * Split out of cloudflarePlaygroundTools.ts to keep that file under the
 * file-size ratchet.
 */
import { parseLooseJsonObject } from "./webTools.ts";
import type { CfToolDef } from "./cloudflarePlaygroundTools.ts";

/**
 * Wrapper tags that carry no tool name of their own. A block using one of these
 * is a *container*: the call it holds (if any) is the tag inside it.
 *
 * `function_call` is included because the OpenAI-shaped envelope
 * `<function_call>{"name":..., "arguments":...}</function_call>` shows up in
 * playground output too, and there is no reason to lose it.
 */
export const CF_GENERIC_TOOL_TAGS = new Set([
  "tool",
  "tool_call",
  "toolcall",
  "tool-call",
  "function_call",
  "functioncall",
  "function-call",
]);

/** `tool(?:call)?` plus the `function_call` spelling, for the wrapper regexes. */
export const CF_WRAPPER_TAG_SOURCE = "(?:tool(?:[_-]?call)?|function[_-]?call)";

/**
 * Keys models use to smuggle the intended tool name into the argument object
 * when they copy the contract's example tag. See `applyToolNameHint`.
 */
const CF_TOOL_NAME_HINT_KEYS = [
  "arg",
  "args",
  "argument",
  "arguments",
  "tool",
  "tool_name",
  "toolName",
  "toolname",
  "name",
  "function",
  "function_name",
  "functionName",
];

/**
 * Case-insensitive lookup of a declared tool, returning its declared spelling.
 * Models capitalise tags (`<Read>`); the client's tool name is case-sensitive.
 */
export function resolveDeclaredToolName(name: string, availableTools: CfToolDef[]): string | null {
  const needle = name.trim().toLowerCase();
  if (!needle) return null;
  const hit = availableTools.find((tool) => tool.name.toLowerCase() === needle);
  return hit ? hit.name : null;
}

/** Declared properties / required keys of a tool, as far as we can trust them. */
function toolSchema(def: CfToolDef | undefined): {
  properties: Record<string, unknown>;
  required: string[];
  additionalProperties?: boolean;
} {
  const raw = (def?.parameters ?? {}) as Record<string, unknown>;
  const properties =
    raw.properties && typeof raw.properties === "object"
      ? (raw.properties as Record<string, unknown>)
      : {};
  const required = Array.isArray(raw.required) ? (raw.required as string[]) : [];
  return {
    properties,
    required,
    additionalProperties:
      typeof raw.additionalProperties === "boolean" ? raw.additionalProperties : undefined,
  };
}

/**
 * Whether `args` could plausibly be a call to `def`. This is the cheap,
 * dependency-free half of `validateToolArguments`: it only checks the declared
 * required keys and, when the schema is closed, that no unknown key is present.
 * `_nonce` is ignored because finalize strips it before the real validation.
 */
function argsSatisfySchema(args: Record<string, unknown>, def: CfToolDef | undefined): boolean {
  if (!def) return false;
  const { properties, required, additionalProperties } = toolSchema(def);
  if (!required.every((key) => key === "_nonce" || key in args)) return false;
  if (
    additionalProperties === false &&
    Object.keys(args).some((key) => key !== "_nonce" && !(key in properties))
  ) {
    return false;
  }
  return true;
}

/**
 * Whether a wrapper body holds a nested tool tag, i.e. the wrapper is a
 * container and not the call itself.
 *
 * Deliberately narrow: only a generic wrapper tag (`<tool_call>`, `<function_call>`)
 * or a *declared* tool tag counts. A JSON payload that happens to contain
 * `<div>`/`<a>` — or even `<read>` inside a string — is not a container, which
 * is why callers also require the body to start with markup rather than `{`/`[`.
 */
export function hasNestedToolTag(body: string, availableTools: CfToolDef[]): boolean {
  const tagRegex = /<\s*([A-Za-z_][\w.:-]*)\b/g;
  let match: RegExpExecArray | null;
  while ((match = tagRegex.exec(body)) !== null) {
    const raw = match[1].toLowerCase();
    const base = raw.split(":")[0];
    if (CF_GENERIC_TOOL_TAGS.has(raw) || CF_GENERIC_TOOL_TAGS.has(base)) return true;
    if (base === "shell") return true;
    if (availableTools.some((tool) => tool.name.toLowerCase() === base)) return true;
  }
  return false;
}

/**
 * Honour a tool name the model wrote inside the argument object instead of in
 * the tag:
 *
 *   <edit>{"arg": "read", "path": "/repo/NODES.md", "_nonce": "…"}</edit>
 *
 * This is the contract's own example being copied: the model replaces the
 * placeholder *body* with the name of the tool it means. If the real arguments
 * are present and satisfy the named tool, use that tool — the tag is simply
 * wrong. Returns `null` when the hint names a tool but the remaining body cannot
 * satisfy it, so the reply is treated as unreadable tool intent and the caller
 * retries, rather than executing a tool with made-up arguments.
 *
 * A key that the tag's own schema declares is a real argument, not a hint, so
 * `skill`'s `{"name": "pdf"}` keeps working.
 */
export function applyToolNameHint(
  tagName: string | null,
  argsJson: string,
  availableTools: CfToolDef[]
): { name: string | null; argsJson: string } | null {
  const args = parseLooseJsonObject(argsJson);
  if (!args) return { name: tagName, argsJson };

  const tag = tagName ? resolveDeclaredToolName(tagName, availableTools) : null;
  const tagProps = tag
    ? toolSchema(availableTools.find((tool) => tool.name === tag)).properties
    : {};

  for (const key of CF_TOOL_NAME_HINT_KEYS) {
    const value = args[key];
    if (typeof value !== "string") continue;
    const hinted = resolveDeclaredToolName(value, availableTools);
    if (!hinted) continue;
    if (key in tagProps) continue; // a declared argument that happens to look like a tool
    const rest = { ...args };
    delete rest[key];
    if (
      !argsSatisfySchema(
        rest,
        availableTools.find((tool) => tool.name === hinted)
      )
    ) {
      return null;
    }
    // The tag's own schema already explains the body: keep the tag.
    if (
      tag &&
      tag !== hinted &&
      argsSatisfySchema(
        args,
        availableTools.find((tool) => tool.name === tag)
      )
    ) {
      return { name: tag, argsJson };
    }
    return { name: hinted, argsJson: JSON.stringify(rest) };
  }
  return { name: tagName, argsJson };
}

/**
 * Infer the tool name when the model omits it.
 *
 * Strategy:
 *   1. A hint (e.g. the tag the model used) wins when it names a declared tool.
 *   2. A single declared tool is unambiguous.
 *   3. Otherwise infer from the argument object: the call must satisfy exactly
 *      one tool's declared `required` keys (and, for a closed schema, carry no
 *      unknown key). Two candidates, or none, means no call.
 *
 * Never fall back to array position. The caller's first tool is an accident of
 * their `tools[]` order, and returning it turns an unreadable payload into a
 * *wrong* tool call that passes validation and executes.
 */
export function inferToolName(
  content: string,
  availableTools: CfToolDef[],
  hint?: string
): string | null {
  if (availableTools.length === 0) return null;

  // If hint provided and matches a tool, use it
  if (hint) {
    const hintTool = resolveDeclaredToolName(hint, availableTools);
    if (hintTool) return hintTool;
  }

  // Single tool available — infer it
  if (availableTools.length === 1) {
    return availableTools[0].name;
  }

  const args = parseLooseJsonObject(content);
  if (!args) return null;
  const keys = Object.keys(args).filter((key) => key !== "_nonce");
  if (keys.length === 0) return null;

  const candidates = availableTools.filter((tool) => {
    const { properties, required, additionalProperties } = toolSchema(tool);
    // A tool that declares no properties cannot be identified from arguments.
    if (Object.keys(properties).length === 0) return false;
    if (!required.every((key) => keys.includes(key))) return false;
    if (additionalProperties === false && keys.some((key) => !(key in properties))) return false;
    return true;
  });

  return candidates.length === 1 ? candidates[0].name : null;
}
