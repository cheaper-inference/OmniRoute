/**
 * Opt-in observe-mode tool-call guard (OMNIROUTE_TOOL_CALL_GUARD_OBSERVE, default off). It reads a
 * finished non-streaming reply and reports tool calls that look like code execution or data
 * exfiltration. It only observes: the reply is never blocked, edited or delayed.
 *
 * Evidence is a rule id and an offset. Argument text and tool names the guard does not know are
 * never returned. Work is bounded: each argument is cut at SCAN_CHARS, a reply is read up to
 * MAX_CALLS calls, MAX_NODES argument nodes and MAX_REPLY_SCAN_CHARS scanned characters, and
 * every rule is a bounded scan (no unbounded backtracking), because the text is untrusted model
 * output.
 */

type Json = Record<string, unknown>;
export type ToolCallFinding = { rule: string; call: number; leaf: string; offset: number };

const SCAN_CHARS = 64 * 1024;
const MAX_CALLS = 64;
// Per reply, shared by every call: argument nodes visited and characters handed to the rules.
const MAX_NODES = 4096;
const MAX_REPLY_SCAN_CHARS = 16 * SCAN_CHARS;
const isRecord = (v: unknown): v is Json => !!v && typeof v === "object" && !Array.isArray(v);

// Tools that run code or touch the machine, matched on the last name segment, lower case.
const EXEC_TOOLS = new Set([
  "bash",
  "sh",
  "zsh",
  "shell",
  "cmd",
  "powershell",
  "pwsh",
  "exec",
  "execute",
  "run",
  "eval",
  "system",
  "terminal",
  "command",
  "spawn",
  "subprocess",
  "curl",
  "wget",
  "ssh",
  "scp",
  "rm",
  "sudo",
  "kill",
  "chmod",
  "chown",
]);

export function isToolCallGuardEnabled(env: Record<string, string | undefined> = process.env) {
  return ["1", "true", "yes"].includes((env.OMNIROUTE_TOOL_CALL_GUARD_OBSERVE ?? "").toLowerCase());
}

const leafName = (name: string) =>
  (
    name
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean)
      .pop() ?? ""
  ).slice(0, 40);

function allowed(env: Record<string, string | undefined>): Set<string> {
  return new Set(
    (env.OMNIROUTE_TOOL_CALL_GUARD_ALLOW ?? "")
      .split(",")
      .map((s) => leafName(s.trim()))
      .filter(Boolean)
  );
}

// ── bounded text rules: each returns the offset of the first match, or -1 ──

const WORD = /[A-Za-z0-9_.-]/;
/** Offset of `word` as a whole token (not part of a longer word), from `from`. */
function tokenAt(text: string, word: string, from = 0): number {
  for (let i = text.indexOf(word, from); i >= 0; i = text.indexOf(word, i + 1)) {
    const before = i === 0 ? "" : text[i - 1];
    const after = text[i + word.length] ?? "";
    if (!WORD.test(before) && !WORD.test(after)) return i;
  }
  return -1;
}
const SHELLS = ["sh", "bash", "zsh", "dash", "ksh", "python", "python3", "perl", "node"];
const SENDERS = ["curl", "wget", "nc", "ncat", "netcat", "socat"];
const ENV_DUMPS = ["printenv", "env", "set"];
const SECRET_PATHS = [
  ".ssh/",
  "id_rsa",
  "id_ed25519",
  ".env",
  ".aws/credentials",
  ".npmrc",
  ".netrc",
  "/etc/shadow",
  ".git-credentials",
];
const SECRET_WORDS = ["password", "passwd", "api_key", "apikey", "secret", "private key", "token"];

/** Text of one shell pipeline segment around a pipe. */
const around = (text: string, pipe: number) => ({
  left: text.slice(Math.max(0, pipe - 200), pipe),
  right: text.slice(pipe + 1, pipe + 120),
});
const pipes = (text: string) => {
  const out: number[] = [];
  for (let i = text.indexOf("|"); i >= 0 && out.length < 200; i = text.indexOf("|", i + 1)) {
    if (text[i + 1] !== "|" && text[i - 1] !== "|") out.push(i);
  }
  return out;
};
/** First command word of a pipeline segment, past wrappers such as `sudo` and `env`. */
const WRAPPERS = new Set(["sudo", "exec", "env", "command", "nohup", "-E", "-S"]);
const firstToken = (segment: string) =>
  segment.split(/[\s;&|]+/).filter((w) => w && !WRAPPERS.has(w))[0] ?? "";

const RULES: Array<{ id: string; find: (text: string) => number }> = [
  {
    id: "pipe_to_shell",
    find(text) {
      for (const p of pipes(text)) {
        const { left, right } = around(text, p);
        const fetcher = SENDERS.slice(0, 2).some((w) => tokenAt(left, w) >= 0);
        if (fetcher && SHELLS.includes(firstToken(right))) {
          const w = SENDERS.slice(0, 2)
            .map((s) => tokenAt(text, s))
            .filter((i) => i >= 0);
          return Math.min(...w);
        }
      }
      return -1;
    },
  },
  {
    id: "env_to_network",
    find(text) {
      for (const p of pipes(text)) {
        const { left, right } = around(text, p);
        const dump = ENV_DUMPS.find((w) => tokenAt(left, w) >= 0);
        const rest = text.slice(p, p + 200);
        if (dump && SENDERS.some((w) => tokenAt(rest, w) >= 0)) return tokenAt(text, dump);
        if (dump && firstToken(right) === "base64" && SENDERS.some((w) => tokenAt(rest, w) >= 0)) {
          return tokenAt(text, dump);
        }
      }
      return -1;
    },
  },
  {
    id: "credential_file_upload",
    find(text) {
      const sender = SENDERS.map((w) => tokenAt(text, w)).filter((i) => i >= 0);
      if (sender.length === 0) return -1;
      const start = Math.min(...sender);
      const tail = text.slice(start, start + 400);
      const upload = /(?:^|\s)(?:-F|--form|-d|--data|--data-binary|--upload-file|-T)\b/.test(tail);
      const at = tail.indexOf("@");
      const path = at >= 0 ? tail.slice(at, at + 120) : upload ? tail : "";
      return upload && SECRET_PATHS.some((s) => path.includes(s)) ? start : -1;
    },
  },
  {
    id: "secret_grep_recursive",
    find(text) {
      for (const tool of ["grep", "rg", "ag", "ack"]) {
        const i = tokenAt(text, tool);
        if (i < 0) continue;
        const tail = text.slice(i, i + 300);
        const recursive =
          tool !== "grep" || /(?:^|\s)-[A-Za-z]*[rR]/.test(tail) || tail.includes("--recursive");
        const lower = tail.toLowerCase();
        if (recursive && SECRET_WORDS.some((w) => lower.includes(w))) return i;
      }
      return -1;
    },
  },
];

function scanText(text: string): Array<{ rule: string; offset: number }> {
  const head = text.length > SCAN_CHARS ? text.slice(0, SCAN_CHARS) : text;
  const found: Array<{ rule: string; offset: number }> = [];
  for (const rule of RULES) {
    const offset = rule.find(head);
    if (offset >= 0) found.push({ rule: rule.id, offset });
  }
  return found;
}

type ScanBudget = { nodes: number; chars: number };

/** Every string leaf of an arguments value: depth, width and the reply's node budget bounded. */
function* leaves(value: unknown, budget: ScanBudget, depth = 0): Generator<string> {
  if (budget.nodes <= 0) return;
  budget.nodes -= 1;
  if (typeof value === "string") yield value;
  else if (depth < 4 && Array.isArray(value)) {
    const width = Math.min(value.length, 32);
    for (let i = 0; i < width && budget.nodes > 0; i += 1)
      yield* leaves(value[i], budget, depth + 1);
  } else if (depth < 4 && isRecord(value)) {
    let width = 0;
    for (const key in value) {
      if (!Object.hasOwn(value, key)) continue;
      if (width++ >= 32 || budget.nodes <= 0) break;
      yield* leaves(value[key], budget, depth + 1);
    }
  }
}

function parsedArgs(raw: unknown): unknown {
  if (typeof raw !== "string") return raw;
  try {
    return JSON.parse(raw.length > 4 * SCAN_CHARS ? raw.slice(0, 4 * SCAN_CHARS) : raw);
  } catch {
    return raw; // not JSON: scan the raw text
  }
}

type Call = [string, unknown];
const list = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
const nameOf = (v: unknown): string => {
  try {
    return String(v ?? "");
  } catch {
    return ""; // a name that cannot become a string (e.g. {"toString": null}) is an unknown name
  }
};

const chatCalls = (reply: Json): Call[] =>
  list(reply.choices).flatMap((choice) => {
    const message = isRecord(choice) && isRecord(choice.message) ? choice.message : {};
    return list(message.tool_calls).flatMap((c): Call[] => {
      const fn = isRecord(c) && isRecord(c.function) ? c.function : null;
      return fn ? [[nameOf(fn.name), fn.arguments]] : [];
    });
  });

const responsesCalls = (reply: Json): Call[] =>
  list(reply.output).flatMap((item): Call[] =>
    isRecord(item) && item.type === "function_call" ? [[nameOf(item.name), item.arguments]] : []
  );

const claudeCalls = (reply: Json): Call[] =>
  list(reply.content).flatMap((block): Call[] =>
    isRecord(block) && block.type === "tool_use" ? [[nameOf(block.name), block.input]] : []
  );

const geminiCalls = (reply: Json): Call[] =>
  list(reply.candidates).flatMap((cand) => {
    const content = isRecord(cand) && isRecord(cand.content) ? cand.content : {};
    return list(content.parts).flatMap((part): Call[] => {
      const fc = isRecord(part) && isRecord(part.functionCall) ? part.functionCall : null;
      return fc ? [[nameOf(fc.name), fc.args]] : [];
    });
  });

/** The tool calls of a finished reply in any of the four client shapes: [name, arguments]. */
function toolCallsOf(reply: unknown): Call[] {
  if (!isRecord(reply)) return [];
  const readers = [chatCalls, responsesCalls, claudeCalls, geminiCalls];
  // The call cap applies before any argument string is parsed: calls past it are never parsed.
  return readers
    .flatMap((read) => read(reply))
    .slice(0, MAX_CALLS)
    .map(([name, raw]): Call => [name, parsedArgs(raw)]);
}

/** Findings for one reply: rule id, call index, tool leaf (known names only) and offset. */
export function scanToolCalls(
  reply: unknown,
  env: Record<string, string | undefined> = process.env
): ToolCallFinding[] {
  const allow = allowed(env);
  const findings: ToolCallFinding[] = [];
  const budget: ScanBudget = { nodes: MAX_NODES, chars: MAX_REPLY_SCAN_CHARS };
  toolCallsOf(reply).forEach(([name, args], call) => {
    const leaf = leafName(name);
    const known = EXEC_TOOLS.has(leaf);
    const shown = known ? leaf : "other";
    if (known && !allow.has(leaf))
      findings.push({ rule: "blacklisted_tool", call, leaf: shown, offset: 0 });
    for (const text of leaves(args, budget)) {
      if (budget.chars <= 0) break;
      const head = text.slice(0, Math.min(SCAN_CHARS, budget.chars));
      budget.chars -= head.length;
      for (const { rule, offset } of scanText(head))
        findings.push({ rule, call, leaf: shown, offset });
    }
  });
  return findings;
}
