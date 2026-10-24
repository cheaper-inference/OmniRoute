/**
 * Task-Aware Smart Router — T05
 *
 * Detects the semantic type of an incoming chat request and routes it to a routing
 * INTENT, letting the auto-combo scorer pick the concrete model from whatever the
 * operator has connected. Defaults never name a provider/model id (#8602).
 *
 * Task types → default intent:
 *   - coding        → auto/coding
 *   - analysis      → auto/reasoning
 *   - vision        → auto/vision
 *   - summarization → auto/chat:fast
 *   - background    → auto/chat:cheap
 *   - creative      → no override (use requested model)
 *   - chat          → no override (use requested model)
 *
 * Operators can still point any task type at a specific model via
 * PUT /api/settings/task-routing — the defaults just stop shipping stale ones.
 *
 * Two opt-in refinements for agent traffic: `detectionAnchor: "first-user"` keeps one
 * decision per conversation (see DetectionAnchor), and `complexityRouting` escalates hard
 * prompts to a stronger model (see ComplexityRoutingConfig).
 */

import { analyzeSpecificity } from "./specificityDetector";

// ── Types ───────────────────────────────────────────────────────────────────

export type TaskType =
  "coding" | "creative" | "analysis" | "vision" | "summarization" | "background" | "chat";

interface TaskPattern {
  patterns: string[];
  userPatterns?: string[]; // in user message content
}

/**
 * Per-task-type replacement for the built-in detection patterns (same config surface as
 * taskModelMap). A provided `patterns`/`userPatterns` array replaces the built-in list for
 * that task type — no merge. Omitting a task type, or a field within it, falls back to
 * TASK_PATTERNS.
 */
export type TaskPatternOverrides = Partial<Record<TaskType, Partial<TaskPattern>>>;

/**
 * Which user message drives detection.
 *
 *  - "latest-user" (default): the most recent user message — the original behavior.
 *  - "first-user": the first user message that carries human-written text. Agent CLIs
 *    (Claude Code, Codex, …) resend the whole conversation on every turn, so this anchor
 *    gives every turn of a conversation the same decision: the model never flips
 *    mid-conversation, and the upstream prompt cache — which is per model — stays warm.
 *    Each subagent conversation starts with its own first message, so it is classified
 *    on its own.
 */
export type DetectionAnchor = "latest-user" | "first-user";

/**
 * Opt-in escalation by prompt complexity. The anchor prompt is scored with the existing
 * specificity detector (`specificityDetector.ts`, 0..100); when the score is at least
 * `minScore`, the request goes to `model` instead of the task-type mapping. Background
 * and vision requests never escalate.
 */
export interface ComplexityRoutingConfig {
  enabled: boolean;
  minScore: number;
  /** provider/model, combo name or `auto/` id. Required when enabled. */
  model: string;
}

export interface TaskRoutingConfig {
  enabled: boolean;
  /**
   * Map from task type to preferred model (provider/model format).
   * Empty string = use whatever was requested (no override).
   */
  taskModelMap: Record<TaskType, string>;
  /** Operator-configurable detection patterns — see TaskPatternOverrides. */
  patternOverrides?: TaskPatternOverrides;
  detectionEnabled: boolean;
  /** See DetectionAnchor. Missing = "latest-user". */
  detectionAnchor?: DetectionAnchor;
  /** See ComplexityRoutingConfig. Missing or disabled = no escalation. */
  complexityRouting?: ComplexityRoutingConfig;
  stats: { detected: number; routed: number };
}

// ── Default detection patterns ───────────────────────────────────────────────

const TASK_PATTERNS: Record<TaskType, TaskPattern> = {
  coding: {
    patterns: [
      "write code",
      "write a function",
      "implement",
      "debug",
      "fix this",
      "fix the",
      "refactor",
      "unit test",
      "write test",
      "write a script",
      "code review",
      "complete this function",
      "add a feature",
      "javascript",
      "typescript",
      "python",
      "sql query",
      "api endpoint",
    ],
    userPatterns: [
      "```",
      "def ",
      "function ",
      "class ",
      "import ",
      "const ",
      "let ",
      "var ",
      "SELECT ",
      "INSERT ",
      "<html",
      "<div",
    ],
  },
  creative: {
    patterns: [
      "write a story",
      "write a poem",
      "write a song",
      "creative writing",
      "write a blog",
      "write an article",
      "write a script",
      "write an essay",
      "imagine",
      "roleplay",
      "brainstorm",
      "creative",
    ],
  },
  analysis: {
    patterns: [
      "analyze",
      "analyse",
      "analysis",
      "compare",
      "evaluate",
      "assess",
      "explain",
      "reasoning",
      "pros and cons",
      "advantages and disadvantages",
      "what are the implications",
      "in-depth",
      "comprehensive",
    ],
  },
  vision: {
    patterns: [
      "look at this image",
      "in this image",
      "what do you see",
      "describe this image",
      "analyze this image",
      "read this screenshot",
    ],
    userPatterns: ["image_url", "data:image"],
  },
  summarization: {
    patterns: [
      "summarize",
      "summary",
      "tldr",
      "tl;dr",
      "brief overview",
      "key points",
      "main points",
      "what did",
      "highlights from",
    ],
  },
  background: {
    patterns: [
      "generate a title",
      "generate title",
      "create a title",
      "name this",
      "short description",
      "brief description",
      "one-line summary",
      "conversation title",
    ],
  },
  chat: {
    patterns: [],
  },
};

// ── Default task → routing-intent map ────────────────────────────────────────

/**
 * Defaults route by INTENT (`auto/<category>[:<tier>]`), never to a concrete
 * provider/model id (#8602).
 *
 * The previous defaults named literal models (`openai/gpt-4o`,
 * `gemini/gemini-2.5-flash-lite`, …). That was wrong twice over:
 *
 *  - The list rotted. Those ids aged out by a generation or two, and every model
 *    release made them staler. Naming an intent instead removes the maintenance.
 *  - It bypassed the router. `applyTaskAwareRouting` overwrites `body.model`, so a
 *    literal target skipped auto-combo's 16-factor scoring (quota, circuit-breaker
 *    health, cost, latency, stability), connection cooldown and model lockout — and
 *    hard-failed for any operator who simply had no connection for that provider.
 *
 * `auto/*` ids resolve on demand against the operator's actually-connected backends
 * (`autoCombo/suffixComposition.ts` → `autoCombo/virtualFactory.ts`) and degrade
 * gracefully as backends rotate. Keep every entry here an `auto/` id.
 */
const DEFAULT_TASK_MODEL_MAP: Record<TaskType, string> = {
  coding: "auto/coding", // Best-scoring connected coding model
  creative: "", // No override — use requested model
  analysis: "auto/reasoning", // Reasoning-capable candidates only
  vision: "auto/vision", // Vision-capable candidates only
  summarization: "auto/chat:fast", // Latency-weighted pack
  background: "auto/chat:cheap", // Cost-weighted pack for utility traffic
  chat: "", // No override — use requested model
};

// ── State ────────────────────────────────────────────────────────────────────

// #8601: the config MUST live on globalThis, NOT in a module-level `let`. A plain
// module-level binding is DUPLICATED per module graph, so the boot hydration in
// src/instrumentation-node.ts would land on the instrumentation graph's copy and
// never reach the copy src/sse/handlers/chat.ts reads — exactly the #5312 fix-A
// break proven on the VPS. Mirrors thinkingBudget.ts (#5312) and systemPrompt.ts (#2470).
const GLOBAL_KEY = "__omniroute_taskRouting_config__";
const _store = globalThis as unknown as Record<string, TaskRoutingConfig | undefined>;

/**
 * Default `complexityRouting.minScore`. Measured on coding-agent prompts: one-line asks
 * ("rename X", "add a delete button that calls …", "write unit tests for …") score 1–3,
 * while multi-step design/debugging prompts (race conditions, cross-service refactors,
 * migrations) score 9+. The detector's named levels put both groups in trivial/simple, so
 * the threshold is a raw score rather than a level name.
 */
export const DEFAULT_COMPLEXITY_MIN_SCORE = 6;

function freshConfig(): TaskRoutingConfig {
  return {
    enabled: false, // User must explicitly enable
    taskModelMap: { ...DEFAULT_TASK_MODEL_MAP },
    detectionEnabled: true,
    detectionAnchor: "latest-user",
    complexityRouting: { enabled: false, minScore: DEFAULT_COMPLEXITY_MIN_SCORE, model: "" },
    stats: { detected: 0, routed: 0 },
  };
}

function getConfig(): TaskRoutingConfig {
  if (!_store[GLOBAL_KEY]) {
    _store[GLOBAL_KEY] = freshConfig();
  }
  return _store[GLOBAL_KEY]!;
}

// ── Config Management ────────────────────────────────────────────────────────

export function setTaskRoutingConfig(config: Partial<TaskRoutingConfig>): void {
  const current = getConfig();
  _store[GLOBAL_KEY] = {
    ...current,
    ...config,
    stats: current.stats, // preserve stats across config changes
  };
}

export function getTaskRoutingConfig(): TaskRoutingConfig {
  const current = getConfig();
  return {
    ...current,
    taskModelMap: { ...current.taskModelMap },
    ...(current.complexityRouting ? { complexityRouting: { ...current.complexityRouting } } : {}),
    stats: { ...current.stats },
  };
}

export function resetTaskRoutingStats(): void {
  getConfig().stats = { detected: 0, routed: 0 };
}

/**
 * Restore the persisted Task-Aware Routing config at boot (#8601).
 *
 * `PUT /api/settings/task-routing` writes the config to `settings.taskRouting` as a
 * JSON string, but nothing ever read it back — so the feature silently reverted to
 * `enabled: false` + the default model map on every restart. `applyRuntimeSettings`
 * does not cover this key, so it needs an explicit hydration step, same as the
 * Global System Prompt (#2470) and the Thinking-Budget config (#5312).
 *
 * Accepts either the JSON string the route persists or an already-parsed object.
 * Returns true when a config was applied, false for missing/malformed values
 * (fail-open: the in-memory defaults stay in place).
 */
export function hydrateTaskRoutingConfig(settings: unknown): boolean {
  const raw =
    settings && typeof settings === "object" && !Array.isArray(settings)
      ? (settings as Record<string, unknown>).taskRouting
      : undefined;
  if (raw === undefined || raw === null) return false;

  let parsed: unknown = raw;
  if (typeof raw === "string") {
    if (raw.trim().length === 0) return false;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return false;
    }
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return false;

  // `stats` is runtime telemetry, never restored from the persisted blob — the route
  // already strips it on write, but a hand-edited settings row must not resurrect it.
  const { stats: _ignoredStats, ...persisted } = parsed as Partial<TaskRoutingConfig>;
  setTaskRoutingConfig(persisted);
  return true;
}

export function getDefaultTaskModelMap(): Record<TaskType, string> {
  return { ...DEFAULT_TASK_MODEL_MAP };
}

/** Built-in detection patterns, before any operator patternOverrides — for the settings UI. */
export function getDefaultTaskPatterns(): Record<TaskType, TaskPattern> {
  return Object.fromEntries(
    Object.entries(TASK_PATTERNS).map(([taskType, { patterns, userPatterns }]) => [
      taskType,
      { patterns: [...patterns], ...(userPatterns ? { userPatterns: [...userPatterns] } : {}) },
    ])
  ) as Record<TaskType, TaskPattern>;
}

// ── Detection ────────────────────────────────────────────────────────────────

interface RequestMessage {
  role?: string;
  content?: unknown;
}

/**
 * Blocks that agent harnesses inject into user turns — Claude Code wraps project
 * instructions, skill/tool listings and reminders in `<system-reminder>`. They are not the
 * user's request, and their boilerplate ("implement", code fences, …) would otherwise drive
 * detection.
 */
const HARNESS_INJECTED_TAGS = ["system-reminder"];

/**
 * Remove every complete `<tag>…</tag>` block for the injected tags. Plain indexOf scanning,
 * linear in the input — no regex, so no ReDoS surface. An unterminated opening tag is kept
 * as-is: only text that is provably injected is dropped.
 */
export function stripHarnessInjectedBlocks(text: string): string {
  let out = text;
  for (const tag of HARNESS_INJECTED_TAGS) {
    const open = `<${tag}>`;
    const close = `</${tag}>`;
    let kept = "";
    let cursor = 0;
    for (;;) {
      const start = out.indexOf(open, cursor);
      const end = start === -1 ? -1 : out.indexOf(close, start + open.length);
      if (end === -1) {
        kept += out.slice(cursor);
        break;
      }
      kept += out.slice(cursor, start);
      cursor = end + close.length;
    }
    out = kept;
  }
  return out;
}

function extractRawText(content: unknown): string {
  if (typeof content === "string") return stripHarnessInjectedBlocks(content);
  if (Array.isArray(content)) {
    return content
      .map((part: any) =>
        stripHarnessInjectedBlocks(
          typeof part === "string" ? part : typeof part?.text === "string" ? part.text : ""
        )
      )
      .join(" ");
  }
  return "";
}

function extractText(content: unknown): string {
  return extractRawText(content).toLowerCase();
}

function getRequestMessages(body: unknown): RequestMessage[] {
  if (!body || typeof body !== "object") return [];
  const { messages, input } = body as { messages?: unknown; input?: unknown };
  if (Array.isArray(messages)) return messages as RequestMessage[];
  if (Array.isArray(input)) return input as RequestMessage[];
  return [];
}

function getDetectionAnchor(): DetectionAnchor {
  return getConfig().detectionAnchor === "first-user" ? "first-user" : "latest-user";
}

/**
 * The user message detection reads. "first-user" skips leading user turns that carry no
 * human-written text (only injected blocks or tool results), falling back to the first
 * user message when none has any.
 */
function selectAnchorMessage(
  messages: RequestMessage[],
  anchor: DetectionAnchor
): RequestMessage | undefined {
  const userMessages = messages.filter((m) => m.role === "user");
  if (anchor === "first-user") {
    return userMessages.find((m) => extractRawText(m.content).trim().length > 0) ?? userMessages[0];
  }
  return userMessages[userMessages.length - 1];
}

function hasImages(messages: RequestMessage[]): boolean {
  for (const msg of messages) {
    if (Array.isArray(msg.content)) {
      for (const part of msg.content as any[]) {
        if (part?.type === "image_url" || part?.type === "image") return true;
      }
    }
  }
  return false;
}

/**
 * Detect the task type for a given request body.
 * Returns 'chat' (no-op) if nothing specific is detected.
 */
export function detectTaskType(body: any): TaskType {
  const messages = getRequestMessages(body);
  if (messages.length === 0) return "chat";

  const anchor = getDetectionAnchor();
  const anchorMsg = selectAnchorMessage(messages, anchor);

  // 1. Vision — check for image_url in any message ("first-user": only in the anchor
  // message, so a screenshot pasted mid-conversation does not flip the decision)
  const imageScope = anchor === "first-user" ? (anchorMsg ? [anchorMsg] : []) : messages;
  if (hasImages(imageScope)) return "vision";

  // 2. System prompt patterns (background first — most specific)
  const systemMsg = messages.find((m) => m.role === "system" || m.role === "developer");
  const systemText = systemMsg ? extractText(systemMsg.content) : "";
  const userText = anchorMsg ? extractText(anchorMsg.content) : "";

  // Check ALL task patterns in priority order
  const priorityOrder: TaskType[] = [
    "background",
    "coding",
    "vision",
    "summarization",
    "analysis",
    "creative",
  ];

  const overrides = getConfig().patternOverrides;

  for (const taskType of priorityOrder) {
    const defaults = TASK_PATTERNS[taskType];
    const override = overrides?.[taskType];
    const patterns = override?.patterns ?? defaults.patterns;
    const userPatterns = override?.userPatterns ?? defaults.userPatterns;

    // Check system prompt
    if (patterns.some((p) => systemText.includes(p.toLowerCase()))) {
      return taskType;
    }

    // Check user message for this task's patterns
    if (patterns.some((p) => userText.includes(p.toLowerCase()))) {
      return taskType;
    }

    // Check user message for code-specific patterns (userPatterns)
    if (userPatterns?.some((p) => userText.includes(p.toLowerCase()))) {
      return taskType;
    }
  }

  return "chat";
}

// ── Complexity escalation ────────────────────────────────────────────────────

/** Utility traffic stays cheap, and the escalation model may not accept images. */
const NEVER_ESCALATE: ReadonlySet<TaskType> = new Set<TaskType>(["background", "vision"]);

export interface ComplexityEscalation {
  /** Specificity score (0..100) of the anchor prompt. */
  score: number;
  /** The model to escalate to, or null when the request stays on the task-type mapping. */
  model: string | null;
}

/** The persisted complexityRouting block when it is enabled and well-formed, else null. */
function getActiveComplexityRouting(): ComplexityRoutingConfig | null {
  const routing = getConfig().complexityRouting;
  if (!routing || routing.enabled !== true) return null;
  const model = typeof routing.model === "string" ? routing.model.trim() : "";
  const minScore = Number(routing.minScore);
  if (!model || !Number.isFinite(minScore)) return null;
  return { enabled: true, minScore, model };
}

/**
 * Score the anchor prompt and decide whether it escalates. Only the anchor user text is
 * scored — never tool schemas, the system prompt or the rest of the history — so an agent
 * request carrying dozens of tools and a long transcript is judged by what was asked.
 * Returns null when complexityRouting is off.
 */
export function resolveComplexityEscalation(
  taskType: TaskType,
  body: unknown
): ComplexityEscalation | null {
  const routing = getActiveComplexityRouting();
  if (!routing) return null;

  const anchorMsg = selectAnchorMessage(getRequestMessages(body), getDetectionAnchor());
  const text = anchorMsg ? extractRawText(anchorMsg.content) : "";
  const { score } = analyzeSpecificity({ messages: [{ role: "user", content: text }] });
  const escalates = !NEVER_ESCALATE.has(taskType) && score >= routing.minScore;
  return { score, model: escalates ? routing.model : null };
}

// ── Routing ──────────────────────────────────────────────────────────────────

export interface TaskRouteResult {
  model: string;
  taskType: TaskType;
  wasRouted: boolean;
  /** Present when complexityRouting is enabled: the anchor prompt's specificity score. */
  complexityScore?: number;
  /** True when the model came from complexityRouting rather than the task-type map. */
  escalated?: boolean;
}

/**
 * Apply task-aware model override.
 * Returns the original model if routing is disabled or no override found.
 *
 * @param originalModel - The model from the request (e.g. "openai/gpt-4o")
 * @param body - The raw request body to detect task type from
 * @returns { model, taskType, wasRouted, complexityScore?, escalated? }
 */
export function applyTaskAwareRouting(originalModel: string, body: any): TaskRouteResult {
  const config = getConfig();
  if (!config.enabled || !config.detectionEnabled) {
    return { model: originalModel, taskType: "chat", wasRouted: false };
  }

  const taskType = detectTaskType(body);
  config.stats.detected++;

  const escalation = resolveComplexityEscalation(taskType, body);
  const complexity = escalation
    ? { complexityScore: escalation.score, escalated: escalation.model !== null }
    : {};
  const preferred = escalation?.model ?? config.taskModelMap[taskType];

  // No override configured for this task type
  if (!preferred || preferred === "") {
    return { model: originalModel, taskType, wasRouted: false, ...complexity };
  }

  // Don't override if the model is already "better" (e.g. user sent opus, preferred is flash)
  // We respect user's choice unless it's a background/summarization override
  if (taskType !== "background" && taskType !== "summarization") {
    // For non-utility tasks, only override if no specific model was given
    // (i.e., model came from a combo default, not user-selected)
    // This is a conservative heuristic — full override can be enabled via settting
  }

  config.stats.routed++;
  return { model: preferred, taskType, wasRouted: true, ...complexity };
}
