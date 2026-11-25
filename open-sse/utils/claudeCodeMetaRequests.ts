// Tools whose meaningful prefix is two words (verb + subcommand).
const TWO_WORD_TOOLS = new Set([
  "git",
  "npm",
  "docker",
  "kubectl",
  "cargo",
  "go",
  "pip",
  "yarn",
  "pnpm",
  "bun",
]);

const ENV_ASSIGNMENT_RE = /^[A-Za-z_][A-Za-z0-9_]*=/;
// Command-injection signals: ; | & ` $(   (newline handled separately)
const INJECTION_RE = /[;|&`]|\$\(/;

/** Tokenize a shell command on whitespace, respecting simple single/double quotes. */
function tokenize(command: string): string[] {
  const tokens: string[] = [];
  let current = "";
  let quote: string | null = null;
  for (const ch of command) {
    if (quote) {
      if (ch === quote) quote = null;
      else current += ch;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
    } else if (/\s/.test(ch)) {
      if (current) {
        tokens.push(current);
        current = "";
      }
    } else {
      current += ch;
    }
  }
  if (current) tokens.push(current);
  return tokens;
}

export function extractCommandPrefix(command: string): string {
  if (typeof command !== "string" || !command.trim()) return "";
  if (INJECTION_RE.test(command) || command.includes("\n")) {
    return "command_injection_detected";
  }
  let tokens = tokenize(command);
  // Strip leading FOO=bar env assignments.
  while (tokens.length && ENV_ASSIGNMENT_RE.test(tokens[0])) tokens = tokens.slice(1);
  if (!tokens.length) return "";
  const head = tokens[0];
  // Only form a two-word prefix when the second token is an actual subcommand,
  // not a flag. We intentionally do not parse flag-arguments (e.g. `git -C <path>`);
  // for those we fall back to the single-word head (conservative, never wrong).
  if (TWO_WORD_TOOLS.has(head) && tokens.length > 1 && !tokens[1].startsWith("-")) {
    return `${head} ${tokens[1]}`;
  }
  return head;
}

const READ_COMMANDS = new Set(["cat", "head", "tail", "less", "more", "bat", "type"]);
const LISTING_COMMANDS = new Set(["ls", "dir", "find", "tree"]);
// grep flags that consume the NEXT arg (so it is not a filepath).
const GREP_ARG_FLAGS = new Set(["-e", "-f", "-m", "-A", "-B", "-C"]);

function extractGrepFilepaths(tokens: string[]): string[] {
  const files: string[] = [];
  let patternConsumed = false;
  for (let i = 1; i < tokens.length; i++) {
    const tok = tokens[i];
    if (tok.startsWith("-")) {
      if (GREP_ARG_FLAGS.has(tok)) {
        i++; // skip this flag's argument
        // -e/-f supply the pattern itself, so the positional pattern is already consumed.
        if (tok === "-e" || tok === "-f") patternConsumed = true;
      }
      continue;
    }
    if (!patternConsumed) {
      patternConsumed = true;
      continue;
    } // first non-flag = pattern
    files.push(tok);
  }
  return files;
}

export function extractFilepathsFromCommand(command: string, _output = ""): string[] {
  if (typeof command !== "string" || !command.trim()) return [];
  const tokens = tokenize(command);
  if (!tokens.length) return [];
  const head = tokens[0];

  if (LISTING_COMMANDS.has(head)) return [];
  if (head === "grep") return extractGrepFilepaths(tokens);

  if (READ_COMMANDS.has(head)) {
    return tokens.slice(1).filter((t) => !t.startsWith("-"));
  }

  return [];
}

// ── Local replies for Claude Code helper requests ──────────────────────────────
// Each detector answers only a strict request shape (single user turn, no tools,
// last message only, commands understood without reading their output). The
// shape picks the detector; the toggle only decides whether it answers, so a
// recognised shape with its toggle off returns null instead of falling through.

// Named constants so the boundary scan (tests/unit/boundary-engine-feature-flags.test.ts)
// can resolve each key read through isRegisteredFeatureFlagEnabled.
export const CLAUDE_CODE_LOCAL_COMMAND_PREFIX_FLAG = "CLAUDE_CODE_LOCAL_COMMAND_PREFIX_ENABLED";
export const CLAUDE_CODE_LOCAL_SUGGESTION_FLAG = "CLAUDE_CODE_LOCAL_SUGGESTION_ENABLED";
export const CLAUDE_CODE_LOCAL_FILEPATHS_FLAG = "CLAUDE_CODE_LOCAL_FILEPATHS_ENABLED";

export const CLAUDE_CODE_META_FLAGS = {
  commandPrefix: CLAUDE_CODE_LOCAL_COMMAND_PREFIX_FLAG,
  suggestion: CLAUDE_CODE_LOCAL_SUGGESTION_FLAG,
  filepaths: CLAUDE_CODE_LOCAL_FILEPATHS_FLAG,
} as const;

export type ClaudeCodeMetaKind = "command-prefix" | "suggestion" | "filepaths";

export interface ClaudeCodeMetaToggles {
  commandPrefix: boolean;
  suggestion: boolean;
  filepaths: boolean;
}

export interface ClaudeCodeMetaReply {
  kind: ClaudeCodeMetaKind;
  text: string;
}

type MetaMessage = { role?: unknown; content?: unknown };

const SUGGESTION_MARKER = "[SUGGESTION MODE:";
// Shell metacharacters that make a command depend on expansion, chaining or redirection.
const FILEPATHS_UNSAFE_RE = /[;|&`<>\n*?[\]{}$~\\]/;
const SIMPLE_GREP_FLAGS_RE = /^-[nilHhwvcsoEFx]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/** Text blocks of a content value (string content counts as one block). */
function textBlocks(content: unknown): string[] {
  if (typeof content === "string") return [content];
  if (!Array.isArray(content)) return [];
  return content
    .filter((block) => isRecord(block) && block.type === "text" && typeof block.text === "string")
    .map((block) => (block as { text: string }).text);
}

function contentText(content: unknown): string {
  return textBlocks(content).join("\n");
}

function filepathsForCommand(command: string): string[] | null {
  if (!command || FILEPATHS_UNSAFE_RE.test(command)) return null;
  const tokens = tokenize(command);
  if (!tokens.length) return null;
  const [head, ...rest] = tokens;
  if (LISTING_COMMANDS.has(head)) return [];
  if (READ_COMMANDS.has(head)) {
    if (rest.some((t) => t.startsWith("-") || t.startsWith("+"))) return null;
    return extractFilepathsFromCommand(command);
  }
  if (head === "grep") {
    if (rest.some((t) => t.startsWith("-") && !SIMPLE_GREP_FLAGS_RE.test(t))) return null;
    return extractFilepathsFromCommand(command);
  }
  return null;
}

/** The single user turn (no tools) the prefix and filepaths shapes require. */
interface SingleTurnPrompt {
  turnText: string;
  /** System text (top-level `system` plus system/developer messages) followed by the turn. */
  promptText: string;
}

/**
 * Result of one shape detector: `undefined` means the request is not this shape (try the
 * next one); `null` means it is this shape but gets no local reply (stop, send upstream).
 */
type ShapeResult = ClaudeCodeMetaReply | null | undefined;

function isSystemRole(m: MetaMessage): boolean {
  return m.role === "system" || m.role === "developer";
}

function singleTurnPrompt(
  body: Record<string, unknown>,
  messages: MetaMessage[]
): SingleTurnPrompt | null {
  const conversation = messages.filter((m) => !isSystemRole(m));
  if (conversation.length !== 1 || conversation[0].role !== "user") return null;
  if (Array.isArray(body.tools) && body.tools.length > 0) return null;
  const systemText = [
    contentText(body.system),
    ...messages.filter(isSystemRole).map((m) => contentText(m.content)),
  ].join("\n");
  const turnText = contentText(conversation[0].content);
  return { turnText, promptText: `${systemText}\n${turnText}` };
}

/** Shape "filepaths": the turn is `Command: <cmd>\nOutput: <out>` and someone asked for <filepaths>. */
function detectFilepathsShape(prompt: SingleTurnPrompt | null, enabled: boolean): ShapeResult {
  if (!prompt) return undefined;
  const trimmed = prompt.turnText.trimStart();
  const outputIdx = trimmed.indexOf("\nOutput:");
  if (!trimmed.startsWith("Command:") || outputIdx <= 0) return undefined;
  if (!prompt.promptText.includes("<filepaths>")) return undefined;
  if (!enabled) return null;
  const paths = filepathsForCommand(trimmed.slice("Command:".length, outputIdx).trim());
  if (!paths) return null;
  return { kind: "filepaths", text: ["<filepaths>", ...paths, "</filepaths>"].join("\n") };
}

/** Shape "command prefix": a <policy_spec> plus a `Command:` line in the turn. */
function detectPrefixShape(prompt: SingleTurnPrompt | null, enabled: boolean): ShapeResult {
  if (!prompt) return undefined;
  const { turnText, promptText } = prompt;
  if (!promptText.includes("<policy_spec>") || !turnText.includes("Command:")) return undefined;
  if (!enabled) return null;
  const command = turnText.slice(turnText.lastIndexOf("Command:") + "Command:".length).trim();
  const prefix = command ? extractCommandPrefix(command) : "";
  return prefix ? { kind: "command-prefix", text: prefix } : null;
}

/** Shape "suggestion": the last message is the user's and one of its text blocks opens with the marker. */
function detectSuggestionShape(messages: MetaMessage[], enabled: boolean): ShapeResult {
  const last = messages[messages.length - 1];
  if (last?.role !== "user") return undefined;
  const marked = textBlocks(last.content).some((t) => t.trimStart().startsWith(SUGGESTION_MARKER));
  if (!marked) return undefined;
  return enabled ? { kind: "suggestion", text: "" } : null;
}

export function detectClaudeCodeMetaReply(
  body: unknown,
  toggles: ClaudeCodeMetaToggles
): ClaudeCodeMetaReply | null {
  if (!isRecord(body) || !Array.isArray(body.messages)) return null;
  const messages = body.messages.filter(isRecord) as MetaMessage[];
  const prompt = singleTurnPrompt(body, messages);
  // Order matters: a filepaths turn also carries `Command:`, so it is checked before the prefix shape.
  const detectors: Array<() => ShapeResult> = [
    () => detectFilepathsShape(prompt, toggles.filepaths),
    () => detectPrefixShape(prompt, toggles.commandPrefix),
    () => detectSuggestionShape(messages, toggles.suggestion),
  ];
  for (const detect of detectors) {
    const result = detect();
    if (result !== undefined) return result;
  }
  return null;
}
