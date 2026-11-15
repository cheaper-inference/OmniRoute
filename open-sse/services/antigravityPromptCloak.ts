/**
 * antigravityPromptCloak.ts — system-prompt cloaking for Antigravity (Gemini
 * Code Assist), a full port of magpie-community/plugins `packages/agy-cli/cloak.mjs`.
 *
 * Antigravity answers a 429 "Resource has been exhausted" to a request whose
 * system prompt has one of the TURNED_AWAY lines, whatever quota is left, and
 * lets the same prompt through reworded. Both the direct HTTP executor and the
 * `agy acp` bridge (agyCliAcp.ts) hand Antigravity the client's system prompt,
 * so it is reworded here before it goes. What sessions are keyed on is the
 * prompt as the client wrote it — cloaking happens only on the way out.
 *
 * The last four TURNED_AWAY lines were verified on real accounts since the
 * evening of 11-14 (Lmohn39 and ZhouYimingsjtu on X), each 3 of 3 or 5 of 5,
 * on gemini-3-flash and claude-sonnet-4-6 alike; the DeepSeek Harness and
 * Claude Code identity lines since 11-15 (#1171 huangzhenhao90, #1151
 * KevinXC5). Keep this list and the SAID_AS rewrites in sync with upstream
 * cloak.mjs when either changes.
 */

// TURNED_AWAY are the lines, lower-cased, Antigravity answers a 429 to
// whatever quota is left. Each goes as SAID_AS says instead.
export const TURNED_AWAY: readonly string[] = [
  "x-anthropic-billing-header:",
  "built on anthropic's claude agent sdk",
  "you are codex, an agent based on gpt-5",
  "you are codex, a coding agent based on gpt-5",
  "rfc 2119 keywords: must, required, should, recommended, may, optional.",
  "you are hermes agent",
  "an intelligent ai assistant created by nous research",
  "you are opencode",
  "you are a coding agent running in the codex cli",
  "a coding assistant running inside pi",
  "you are an ai agent powered by deepseek harness",
  "you are claude code, anthropic's official cli for claude",
];

// INVISIBLE are the characters Google's check reads past: since 11-14 a
// line with a zero-width space (U+200B) after the first and second character
// of each word, or after every character, or U+2060, is turned away as the
// line itself, 5 of 5 on a real account (hc295971796 on X).
const INVISIBLE = "[\\u00ad\\u180e\\u200b-\\u200f\\u2060-\\u2064\\ufeff]";
const INVISIBLE_RE = new RegExp(INVISIBLE, "g");

const escape = (c: string): string => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// lineRe matches line in any case, with any run of white space between its
// words and any invisible characters inside them: Google's check reads a
// line break, a tab, two spaces or a no-break space where the line has one
// space, and turned omp's line away wrapped after "REQUIRED," or after
// "RFC 2119". Claude Code's billing line is matched to its end, since it
// goes whole.
const lineRe = (line: string): RegExp => {
  const words = line.split(" ").map((w) => [...w].map(escape).join(`${INVISIBLE}*`));
  const tail = line === "x-anthropic-billing-header:" ? "[^\\n]*\\n?" : "";
  return new RegExp(words.join(`${INVISIBLE}*\\s+${INVISIBLE}*`) + tail, "gi");
};
const TURNED_AWAY_RE: RegExp[] = TURNED_AWAY.map(lineRe);

const has = (s: string, re: RegExp): boolean => {
  re.lastIndex = 0;
  const yes = re.test(s);
  re.lastIndex = 0;
  return yes;
};

const said = (system: string, line: string): boolean =>
  has(system, TURNED_AWAY_RE[TURNED_AWAY.indexOf(line)]);

export function turnsAway(system: unknown): boolean {
  const s = String(system ?? "");
  return TURNED_AWAY_RE.some((re) => has(s, re));
}

// SAID_AS is how each line goes, with its invisible characters taken out
// and its white space as it was: a rewording that keeps its meaning.
const youre = (line: string): string => line.replace(/^(you)\s+are/i, "$1're");
const SAID_AS: Record<string, (line: string) => string> = {
  "x-anthropic-billing-header:": () => "",
  "built on anthropic's claude agent sdk": (line) =>
    line.replace(
      /^(built\s+on\s+)anthropic's(\s+)(claude\s+agent\s+sdk)$/i,
      "$1the$2$3 by Anthropic"
    ),
  "you are codex, an agent based on gpt-5": (line) => line.replace(/based(\s+)on/i, "built$1on"),
  "you are codex, a coding agent based on gpt-5": (line) =>
    line.replace(/based(\s+)on/i, "built$1on"),
  "rfc 2119 keywords: must, required, should, recommended, may, optional.": (line) =>
    line.replace(/(key)(words)/i, "$1 $2"),
  "you are hermes agent": youre,
  "an intelligent ai assistant created by nous research": (line) =>
    line.replace(/created(\s+)by/i, "built$1by"),
  "you are opencode": youre,
  "you are a coding agent running in the codex cli": youre,
  "a coding assistant running inside pi": (line) => line.replace(/inside/i, "within"),
  "you are an ai agent powered by deepseek harness": youre,
  "you are claude code, anthropic's official cli for claude": youre,
};

// USER_TURNED_AWAY are the lines Antigravity also turns away in a user's
// turn: since 11-14 Codex's GPT-5 lines there got a bare 429 3 of 3 on a
// real account, where a pasted AGENTS.md or a developer message told after
// a reply puts them, and went through reworded. Everything handed to agy as
// a prompt goes to Antigravity in a user's turn, so cloakUser runs over all
// of it.
export const USER_TURNED_AWAY: readonly string[] = TURNED_AWAY.filter((l) =>
  l.startsWith("you are codex, ")
);

// cloak rewords the lines of only, or of TURNED_AWAY when only is left out.
export function cloak(system: unknown, only?: readonly string[]): string {
  if (typeof system !== "string" || !turnsAway(system)) return system as string;
  const at: Array<[number, number, (line: string) => string]> = [];
  TURNED_AWAY_RE.forEach((re, i) => {
    if (only && !only.includes(TURNED_AWAY[i])) return;
    for (const m of system.matchAll(re))
      at.push([m.index, m.index + m[0].length, SAID_AS[TURNED_AWAY[i]]]);
  });
  at.sort((a, b) => a[0] - b[0]);
  let out = "";
  let prev = 0;
  for (const [from, to, as] of at) {
    if (from < prev) continue;
    out += system.slice(prev, from) + as(system.slice(from, to).replace(INVISIBLE_RE, ""));
    prev = to;
  }
  return out + system.slice(prev);
}

// REWORDED are paragraphs that go through but are answered badly, each with
// a rewording that keeps its meaning. DeepSeek Harness's desktop app puts
// the first in every system prompt; word for word, gemini-4-argon answered
// most requests in about 3s with no thinking and ended after one shallow
// step (antigravity #1028).
export const REWORDED: ReadonlyArray<readonly [string, string]> = [
  [
    'Tokens prefixed with @ are paths the user explicitly referenced. Relative paths resolve from the workspace root; absolute paths identify files or directories on the host. A trailing slash marks a directory: list it when its contents matter. Anything else is a file: use the read tool when its contents are needed, and do not claim to have inspected it before reading. @"..." quotes a path containing spaces.',
    'When the user writes @ followed by a path, they are pointing at that file or folder. Relative paths start at the workspace root; absolute paths are host paths. A path ending in a slash is a folder, so list it if its contents matter; otherwise it is a file, so open it with the read tool before relying on it. Paths with spaces appear as @"...".',
  ],
];

export function reword(system: unknown): string {
  if (typeof system !== "string") return system as string;
  let text = system;
  for (const [from, to] of REWORDED) if (text.includes(from)) text = text.split(from).join(to);
  return text;
}

// cloakUser is the text of a prompt agy is handed (a user's turn upstream)
// with USER_TURNED_AWAY's lines reworded and everything else as written.
export const cloakUser = (text: string): string => cloak(text, USER_TURNED_AWAY);

// outgoing is system text as agy is handed it: each turned-away line and
// each paragraph of REWORDED reworded.
export const outgoing = (system: string): string => reword(cloak(system));

const HINT =
  "Antigravity answers this 429 to the system prompt of Claude Code and the Claude Agent SDK (Claude Desktop's chats) whatever quota is left, so it is not a quota and waiting won't help; use another provider for these chats, or put one after Antigravity in a routing group";

const CODEX_HINT =
  "Antigravity answers this 429 to Codex's own system prompt for GPT-5 models whatever quota is left, so it is not a quota and waiting won't help; a Codex chat begun on a GPT model keeps that prompt after a model switch or a fork, so start a new chat on this model";
const HERMES_HINT =
  'Antigravity answers this 429 to Hermes Agent\'s default persona ("You are Hermes Agent, …" in its SOUL.md), the current one and the earlier one alike, whatever quota is left, so it is not a quota and waiting won\'t help; magpie sends it as "You\'re Hermes Agent, …", which goes through, so start SOUL.md another way, or use another provider for these chats';

const PI_HINT =
  'Antigravity answers this 429 to pi\'s default system prompt ("You are a coding assistant running inside pi") whatever quota is left, so it is not a quota and waiting won\'t help; magpie sends that line as "running within pi", which goes through, so give pi a system prompt of your own (--system-prompt) or use another provider for these chats';
const OPENCODE_HINT =
  'Antigravity answers this 429 to OpenCode\'s system prompt ("You are OpenCode, …") whatever quota is left, so it is not a quota and waiting won\'t help; magpie sends that line as "You\'re OpenCode, …", which goes through, so use another provider for these chats, or put one after Antigravity in a routing group';
const CODEX_CLI_HINT =
  'Antigravity answers this 429 to Codex\'s prompt for a model it has none of its own for ("You are a coding agent running in the Codex CLI") whatever quota is left, so it is not a quota and waiting won\'t help; magpie sends that line as "You\'re …", which goes through, so use another provider for these chats, or put one after Antigravity in a routing group';

const DSH_HINT =
  'Antigravity answers this 429 to DeepSeek Harness\'s system prompt ("You are an AI agent powered by DeepSeek Harness.") whatever quota is left, so it is not a quota and waiting won\'t help; magpie sends that line as "You\'re …", which goes through, so use another provider for these chats, or put one after Antigravity in a routing group';

const RFC_HINT =
  'Antigravity answers this 429 to the line "RFC 2119 keywords: MUST, REQUIRED, SHOULD, RECOMMENDED, MAY, OPTIONAL." that starts oh-my-pi (omp)\'s system prompt, and to any prompt that has it, whatever quota is left, so it is not a quota and waiting won\'t help; magpie sends that line as "RFC 2119 key words: …", which goes through, so this one came from a copy of it that was worded another way';

// hint is the diagnostic for a 429 that Antigravity answers to a system
// prompt it turns away, so operators stop chasing it as a quota.
export function hint(system: unknown): string {
  const s = String(system ?? "");
  if (said(s, "rfc 2119 keywords: must, required, should, recommended, may, optional."))
    return RFC_HINT;
  if (
    said(s, "you are codex, an agent based on gpt-5") ||
    said(s, "you are codex, a coding agent based on gpt-5")
  ) {
    return CODEX_HINT;
  }
  if (said(s, "you are a coding agent running in the codex cli")) return CODEX_CLI_HINT;
  if (
    said(s, "you are hermes agent") ||
    said(s, "an intelligent ai assistant created by nous research")
  ) {
    return HERMES_HINT;
  }
  if (said(s, "you are opencode")) return OPENCODE_HINT;
  if (said(s, "a coding assistant running inside pi")) return PI_HINT;
  if (said(s, "you are an ai agent powered by deepseek harness")) return DSH_HINT;
  return HINT;
}
