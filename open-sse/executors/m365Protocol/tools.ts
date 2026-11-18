/** Single-generation fenced tools. No router turn and no external parser dependency. */
import {
  parseFencedToolCalls,
  type M365ParsedToolCall,
  type M365ToolDecl,
} from "../copilot-m365-frames.ts";
import { validateSchema } from "../../utils/toolArgumentSchema.ts";
import { M365_MAX_TEXT_LENGTH } from "./composer.ts";
export interface M365ToolOptions {
  toolChoice?: unknown;
  parallelToolCalls?: boolean;
  maxTextLength?: number;
}
export interface M365ToolOutput {
  calls: M365ParsedToolCall[];
  text: string;
  constraintViolation?:
    "tool_required" | "forced_tool_missing" | "text_limit" | "invalid_tool_arguments";
  documentGuarded?: boolean;
}
const SHELL_ALIASES = new Set([
  "bash",
  "sh",
  "shell",
  "zsh",
  "powershell",
  "pwsh",
  "ps1",
  "cmd",
  "bat",
]);
const FENCE = /```([A-Za-z0-9_-]+)[ \t]*\r?\n([\s\S]*?)\r?\n```/g;
function commandKey(tool: M365ToolDecl): string | null {
  const properties = tool.parameters?.properties;
  if (!properties || typeof properties !== "object" || Array.isArray(properties)) return null;
  for (const key of ["command", "cmd", "script"]) {
    const schema = (properties as Record<string, unknown>)[key];
    if (
      schema &&
      typeof schema === "object" &&
      !Array.isArray(schema) &&
      (schema as Record<string, unknown>).type === "string"
    )
      return key;
  }
  return null;
}
function forcedName(choice: unknown): string | null {
  if (typeof choice === "string")
    return ["none", "auto", "required"].includes(choice) ? null : choice;
  if (!choice || typeof choice !== "object" || Array.isArray(choice)) return null;
  const fn = (choice as Record<string, unknown>).function;
  return fn && typeof fn === "object" && typeof (fn as Record<string, unknown>).name === "string"
    ? (fn as { name: string }).name
    : null;
}
function permits(choice: unknown, name: string): boolean {
  if (choice == null || choice === "auto" || choice === "required") return true;
  if (choice === "none") return false;
  return forcedName(choice) === name;
}
/** Only one accepted call after a long, structured preamble is a document example. */
export function isM365ToolDocument(
  text: string,
  acceptedOffsets = [...text.matchAll(FENCE)].map((match) => match.index)
): boolean {
  if (acceptedOffsets.length !== 1) return false;
  const preamble = text.slice(0, acceptedOffsets[0]).trim();
  return preamble.length >= 1500 && /(^|\n)\s*(?:#{1,6}\s|\|.*\|)/.test(preamble);
}
/** Share the interpreted schema subset directly, without Devin envelopes or hashes. */
function validArguments(tool: M365ToolDecl, args: Record<string, unknown>): boolean {
  return validateSchema(args, tool.parameters ?? {}, "arguments", true).length === 0;
}
/** Teach only declared tools, one inert JSON example; the runtime remains enforcement authority. */
export function buildM365ToolInstructions(
  tools: M365ToolDecl[],
  options: M365ToolOptions = {}
): string {
  if (!tools.length || options.toolChoice === "none") return "";
  const eligible = tools.filter((t) => permits(options.toolChoice, t.name));
  if (!eligible.length) return "";
  const example = eligible.find((t) => !commandKey(t)) ?? eligible[0];
  const shell = eligible.find((t) => commandKey(t));
  return [
    "Tool protocol: emit a fenced block named for a declared tool, containing a JSON object of arguments. A call requests an action; do not invent tool results or claim commands have executed.",
    options.parallelToolCalls === false
      ? "Emit at most one call per turn."
      : "Multiple independent calls are permitted.",
    options.toolChoice === "required" || forcedName(options.toolChoice)
      ? "A permitted tool call is required."
      : "Answer normally when tools are unnecessary.",
    shell
      ? `Shell-language fences may target ${shell.name} using its ${commandKey(shell)} string argument. Do not emit example/sample commands: shell blocks are actions, not illustrations.`
      : "No shell tool is declared.",
    "Declared tools (JSON schemas):",
    JSON.stringify(eligible),
    `Format example only; never execute this example:\n\`\`\`${example.name}\n{}\n\`\`\``,
  ].join("\n");
}
function shellTarget(tools: M365ToolDecl[], choice: unknown): M365ToolDecl | undefined {
  return tools.find((tool) => commandKey(tool) && permits(choice, tool.name));
}

function hasMalformedOpener(text: string, tools: M365ToolDecl[], choice: unknown): boolean {
  // A declared/alias opener left outside a complete fence is detectable malformed intent.
  const remainder = text.replace(FENCE, "");
  for (const opener of remainder.matchAll(/```([A-Za-z0-9_-]+)[ \t]*(?:\r?\n|$)/g)) {
    if (tools.some((tool) => tool.name === opener[1] && permits(choice, tool.name))) return true;
    if (SHELL_ALIASES.has(opener[1]) && shellTarget(tools, choice)) return true;
  }
  return false;
}

function parseFenceBody(body: string): { json: boolean; value?: unknown } {
  try {
    return { json: true, value: JSON.parse(body) };
  } catch {
    // Only shell aliases permit a non-JSON command body; declared JSON tools fail below.
    return { json: false };
  }
}

function hasUnknownCallable(value: unknown, tools: M365ToolDecl[]): boolean {
  // Undeclared fence names are ambiguous, not authoritative call detection.
  // Only an explicit callable envelope naming an unknown tool rejects a batch;
  // ordinary JSON/YAML/source examples (including malformed JSON) stay text.
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const envelope = value as Record<string, unknown>;
  return (
    typeof envelope.name === "string" &&
    Object.hasOwn(envelope, "arguments") &&
    !tools.some((tool) => tool.name === envelope.name)
  );
}

function fenceArguments(
  name: string,
  body: string,
  parsed: { json: boolean; value?: unknown },
  target: M365ToolDecl
): Record<string, unknown> | null {
  if (parsed.json) {
    const value = parsed.value;
    return value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : null;
  }
  const key = SHELL_ALIASES.has(name) ? commandKey(target) : null;
  if (!key || /^[{[]/.test(body)) return null;
  return { [key]: body };
}

/** Null rejects the batch; undefined leaves an unrelated fence as prose. */
function parseFenceCandidate(
  match: RegExpMatchArray,
  tools: M365ToolDecl[],
  choice: unknown
): M365ParsedToolCall[] | null | undefined {
  const name = match[1];
  const body = match[2].trim();
  const exact = tools.find((tool) => tool.name === name);
  if (exact && !permits(choice, exact.name)) return undefined;
  const parsed = parseFenceBody(body);
  const target = exact ?? (SHELL_ALIASES.has(name) ? shellTarget(tools, choice) : undefined);
  if (!target) return parsed.json && hasUnknownCallable(parsed.value, tools) ? null : undefined;
  const args = fenceArguments(name, body, parsed, target);
  if (!args || !validArguments(target, args)) return null;
  const normalized = "```" + target.name + "\n" + JSON.stringify(args) + "\n```";
  const calls = parseFencedToolCalls(normalized, [target], choice);
  // Legacy shell tools normalize to `command`; retain the validated schema-shaped
  // object for cmd/script tools rather than letting that compatibility branch rewrite it.
  return calls.map((call) => ({ ...call, arguments: JSON.stringify(args) }));
}

function collectFenceCalls(
  text: string,
  tools: M365ToolDecl[],
  choice: unknown
): { calls: M365ParsedToolCall[]; acceptedOffsets: number[] } | null {
  const calls: M365ParsedToolCall[] = [];
  const acceptedOffsets: number[] = [];
  const matches = [...text.matchAll(FENCE)];
  if (hasMalformedOpener(text, tools, choice)) return null;
  for (const match of matches) {
    const candidate = parseFenceCandidate(match, tools, choice);
    if (candidate === null) return null;
    if (candidate === undefined) continue;
    calls.push(...candidate);
    acceptedOffsets.push(match.index);
  }
  return { calls, acceptedOffsets };
}

function missingCallConstraint(choice: unknown): M365ToolOutput["constraintViolation"] {
  if (choice === "required") return "tool_required";
  return forcedName(choice) ? "forced_tool_missing" : undefined;
}

function constrainedToolResult(
  text: string,
  collected: { calls: M365ParsedToolCall[]; acceptedOffsets: number[] },
  options: M365ToolOptions
): M365ToolOutput {
  const { calls, acceptedOffsets } = collected;
  const documentGuarded = isM365ToolDocument(text, acceptedOffsets);
  if (documentGuarded) calls.length = 0;
  const selected = options.parallelToolCalls === false ? calls.slice(0, 1) : calls;
  const constraintViolation = selected.length
    ? undefined
    : missingCallConstraint(options.toolChoice);
  return {
    text,
    calls: selected,
    ...(documentGuarded ? { documentGuarded: true } : {}),
    ...(constraintViolation ? { constraintViolation } : {}),
  };
}

export function parseM365ToolOutput(
  text: string,
  tools: M365ToolDecl[],
  options: M365ToolOptions = {}
): M365ToolOutput {
  const limit = options.maxTextLength ?? M365_MAX_TEXT_LENGTH;
  if (!Number.isSafeInteger(limit) || limit <= 0 || text.length > limit)
    return { text: "", calls: [], constraintViolation: "text_limit" };
  if (!tools.length || options.toolChoice === "none") return { text, calls: [] };
  const collected = collectFenceCalls(text, tools, options.toolChoice);
  if (!collected) return { text, calls: [], constraintViolation: "invalid_tool_arguments" };
  return constrainedToolResult(text, collected, options);
}
