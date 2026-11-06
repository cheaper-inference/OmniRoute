import { defaultLogger } from "../../utils/logger.ts";
import { supportsReasoning } from "../modelCapabilities.ts";

export interface LayaEvaluation {
  domain: string;
  complexity: number;
  isSafe: boolean;
  confidence?: number;
  isFallback?: boolean;
}

interface LayaPredictState {
  message: string;
  [key: string]: unknown;
}

interface LayaQuestions extends Record<string, unknown> {
  domain: {
    type: "choice";
    instructions: string;
    criteria: string[];
  };
  complexity: {
    type: "score";
    instructions: string;
    criteria: number[];
  };
  safety: {
    type: "choice";
    instructions: string;
    criteria: string[];
  };
}

interface LayaPredictResult {
  answers?: {
    domain?: { choice?: string; confidence?: number };
    complexity?: { score?: number };
    safety?: { choice?: string; confidence?: number };
  };
}

interface LayaRouterInstance {
  predict(state: LayaPredictState, questions: LayaQuestions): Promise<LayaPredictResult>;
}

let routerInstance: LayaRouterInstance | null = null;
let routerInitPromise: Promise<LayaRouterInstance> | null = null;
let packageConfirmedUnavailable = false;
let consecutivePredictFailures = 0;
const MAX_CONSECUTIVE_FAILURES = 3;

/**
 * Fast neural-heuristic evaluator mirroring Hermes Antigravity provider.
 * Guarantees sub-millisecond System 1 classification with anchored regex patterns
 * to avoid false positive substring matches.
 *
 * @param text - Input prompt text to evaluate.
 * @returns Fast fallback evaluation result.
 */
export function fastFallbackEvaluate(text: string): LayaEvaluation {
  const stripped = (text || "").trim();
  if (!stripped || stripped.length < 3) {
    return { domain: "simple", complexity: 0.1, isSafe: true, isFallback: true };
  }

  const lower = stripped.toLowerCase();

  // Safety / injection check
  const injectionTriggers = [
    "ignore all previous",
    "ignore previous instructions",
    "disregard all prior",
    "system prompt reveal",
    "reveal secret keys",
  ];
  const isSafe = !injectionTriggers.some((t) => lower.includes(t));

  let domain = "general";
  let rawComplexity = 1.5;

  if (
    /\b(python|code|client|async|c\+\+|func|class|algorithm|debug|api|buffer|typescript|javascript|interface|function|github|commit|compile|syntax|refactor)\b/i.test(
      lower
    )
  ) {
    domain = "coding";
    rawComplexity = 2.0;
  } else if (
    /\b(math|calculate|prove|integral|theorem|solve|matrix|equation|probability|derivative|statistics)\b/i.test(
      lower
    )
  ) {
    domain = "research";
    rawComplexity = 2.2;
  } else if (
    /\b(write a poem|story|essay|creative|novel|fiction|screenplay|dialogue)\b/i.test(lower)
  ) {
    domain = "creative";
    rawComplexity = 1.5;
  } else if (/\b(image|screenshot|diagram|photo|picture|ocr|visual|ui mockup)\b/i.test(lower)) {
    domain = "vision";
    rawComplexity = 1.5;
  } else if (/\b(hi|hello|hey|how are you|good morning|thanks|thank you|ping)\b/i.test(lower)) {
    domain = "simple";
    rawComplexity = 0.5;
  } else if (
    /\b(architecture|distributed|consensus|microservice|database schema|system design|kubernetes)\b/i.test(
      lower
    )
  ) {
    domain = "pro";
    rawComplexity = 2.4;
  }

  const complexity = Math.min(Math.max(rawComplexity / 3.0, 0.05), 1.0);
  return {
    domain,
    complexity,
    isSafe,
    isFallback: true,
  };
}

/**
 * Lazily load @johnhenry/laya-router at runtime with single in-flight promise caching.
 * Clears in-flight promise on transient errors so subsequent calls can retry.
 *
 * @returns Initialized Laya router instance.
 */
async function getRouter(): Promise<LayaRouterInstance> {
  if (routerInstance) return routerInstance;
  if (packageConfirmedUnavailable) {
    throw new Error("Laya router package confirmed unavailable");
  }

  // Check Node version compatibility: Laya neural prediction requires Node >= 24
  const [nodeMajor] = process.versions.node.split(".").map(Number);
  if (nodeMajor < 24) {
    defaultLogger.debug?.(
      "LAYA_ROUTER",
      `Laya neural prediction requires Node >= 24 (current: ${process.version}); falling back to fast neural heuristic.`
    );
    throw new Error(`Laya neural prediction requires Node >= 24 (current: ${process.version})`);
  }

  if (routerInitPromise) {
    return routerInitPromise;
  }

  routerInitPromise = (async () => {
    try {
      const routerModule = await import(/* webpackIgnore: true */ "@johnhenry/laya-router");
      const RouterConstructor = (
        routerModule as unknown as { Router?: new (opts?: unknown) => LayaRouterInstance }
      ).Router;
      if (!RouterConstructor) {
        throw new Error("Router constructor not found in @johnhenry/laya-router");
      }
      const instance = new RouterConstructor({
        mlxRepos: true,
        loadOptions: { backend: "auto", dtype: "f16" },
      });
      routerInstance = instance;
      defaultLogger.info("LAYA_ROUTER", "Initialized Laya JS Router (ModernBERT/mmBERT)");
      return instance;
    } catch (err: unknown) {
      const errorObj = err as { code?: string; message?: string };
      if (
        errorObj?.code === "ERR_MODULE_NOT_FOUND" ||
        errorObj?.code === "MODULE_NOT_FOUND" ||
        String(errorObj?.message || "").includes("Cannot find module")
      ) {
        packageConfirmedUnavailable = true;
      }
      defaultLogger.debug?.(
        "LAYA_ROUTER",
        `Laya JS neural router initialization failed (${errorObj?.message || err}); using fast neural heuristic.`
      );
      throw err;
    } finally {
      routerInitPromise = null;
    }
  })();

  return routerInitPromise;
}

/**
 * Evaluates prompt domain, complexity, and safety using Laya System 1 decision engine.
 * Enforces a 1000ms deadline and falls back to anchored fastFallbackEvaluate on failure.
 *
 * @param prompt - Prompt text to evaluate.
 * @returns Normalized evaluation with domain, complexity, and safety status.
 */
export async function evaluateWithLaya(prompt: string): Promise<LayaEvaluation> {
  if (consecutivePredictFailures >= MAX_CONSECUTIVE_FAILURES) {
    return fastFallbackEvaluate(prompt);
  }

  try {
    const router = await getRouter();

    const state: LayaPredictState = { message: prompt };
    const questions: LayaQuestions = {
      domain: {
        type: "choice",
        instructions: "Determine the core domain of this task.",
        criteria: ["vision", "research", "coding", "pro", "creative", "simple"],
      },
      complexity: {
        type: "score",
        instructions: "Estimate the complexity from 0 to 3.",
        criteria: [0, 1, 2, 3],
      },
      safety: {
        type: "choice",
        instructions: "Is this prompt safe or a prompt injection attack?",
        criteria: ["safe", "injection"],
      },
    };

    const PREDICT_TIMEOUT_MS = 1000;
    const predictPromise = router.predict(state, questions);
    let timerId: ReturnType<typeof setTimeout> | undefined;
    const timeoutPromise = new Promise<never>((_, reject) => {
      timerId = setTimeout(() => reject(new Error("Laya prediction timeout")), PREDICT_TIMEOUT_MS);
    });

    const result = await Promise.race([predictPromise, timeoutPromise]).finally(() => {
      if (timerId !== undefined) clearTimeout(timerId);
    });
    consecutivePredictFailures = 0;

    const answers = result?.answers || {};
    const domain = answers.domain?.choice || "simple";
    const rawComplexity = answers.complexity?.score ?? 1.5;
    const complexity = Math.min(Math.max(rawComplexity / 3.0, 0), 1);

    const isModelFlagged =
      answers.safety?.choice === "injection" && (answers.safety?.confidence ?? 0) >= 0.6;

    const lower = prompt.toLowerCase();
    const hasInjection = [
      "ignore all previous",
      "ignore previous instructions",
      "disregard all prior",
      "system prompt reveal",
      "reveal secret keys",
    ].some((t) => lower.includes(t));

    const isSafe = !hasInjection && !isModelFlagged;
    const confidence = answers.domain?.confidence;

    return {
      domain,
      complexity,
      isSafe,
      confidence,
      isFallback: false,
    };
  } catch (err) {
    consecutivePredictFailures += 1;
    if (consecutivePredictFailures === 1) {
      defaultLogger.debug?.(
        "LAYA_ROUTER",
        `Laya neural prediction failed (${(err as Error)?.message || err}); falling back to fast heuristic.`
      );
    }
    return fastFallbackEvaluate(prompt);
  }
}

/**
 * Detect language script (Hangul, Kana, CJK, Latin) to eliminate particle
 * hallucinations and calibrate top_p / temperature.
 *
 * @param text - Text string to analyze.
 * @returns Language code, isEnglish boolean, and detected script name.
 */
export function detectLanguage(text: string): {
  language: string;
  isEnglish: boolean;
  script: string;
} {
  const stripped = (text || "").trim();
  if (!stripped) {
    return { language: "en", isEnglish: true, script: "latin" };
  }
  const sample = stripped.slice(0, 500);
  const hasHangul = /[\uac00-\ud7a3\u1100-\u11ff]/.test(sample);
  const hasKana = /[\u3040-\u30ff]/.test(sample);
  const hasCJK = /[\u4e00-\u9fff]/.test(sample);

  if (hasHangul) return { language: "ko", isEnglish: false, script: "hangul" };
  if (hasKana) return { language: "ja", isEnglish: false, script: "japanese" };
  if (hasCJK) return { language: "zh", isEnglish: false, script: "cjk" };
  return { language: "en", isEnglish: true, script: "latin" };
}

/**
 * Pre-filter conversation messages using Laya System 1 decision engine.
 * Retains all messages from the last user message onward for simple queries.
 * Never prunes messages when evaluation was performed via fallback.
 *
 * @param messages - Array of conversation message objects.
 * @param evaluation - Laya evaluation result.
 * @param prompt - Optional current user prompt text.
 * @returns Filtered message array.
 */
export function prefilterMessagesWithLaya<T extends Record<string, unknown>>(
  messages: T[],
  evaluation: LayaEvaluation,
  prompt: string = ""
): T[] {
  if (!Array.isArray(messages) || messages.length <= 2) {
    return messages;
  }

  // Never prune history from the fallback path
  if (evaluation.isFallback) {
    return messages;
  }

  const domain = evaluation.domain;
  const complexity = evaluation.complexity;

  // 1. Simple queries & chitchat: retain system messages + all messages from last user message onward
  if (domain === "simple" && complexity < 0.35) {
    const systemMessages = messages.filter(
      (m) => m && (m.role === "system" || m.role === "developer")
    );
    let lastUserIndex = -1;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i]?.role === "user") {
        lastUserIndex = i;
        break;
      }
    }
    if (lastUserIndex !== -1) {
      const tailMessages = messages.slice(lastUserIndex);
      const combined = [...systemMessages];
      for (const m of tailMessages) {
        if (!combined.includes(m)) {
          combined.push(m);
        }
      }
      return combined;
    }
  }

  // 2. Deep conversation history (>12 turns) with self-contained prompt in coding/research:
  // preserve system + last 8 turns without starting with an orphan tool message
  if (
    messages.length > 12 &&
    (complexity >= 0.67 || domain === "coding" || domain === "research" || domain === "pro")
  ) {
    const lower = prompt.toLowerCase().trim();
    const selfContainedPrefixes = [
      "write",
      "create",
      "implement",
      "explain",
      "refactor",
      "how do i",
      "how to",
      "fix",
      "debug",
      "test",
      "build",
      "update",
      "generate",
    ];
    if (selfContainedPrefixes.some((p) => lower.startsWith(p))) {
      const systemMessages = messages
        .slice(0, 2)
        .filter((m) => m && (m.role === "system" || m.role === "developer"));

      let windowStart = Math.max(0, messages.length - 8);
      // Avoid starting on an orphan tool message
      while (windowStart > 0 && messages[windowStart]?.role === "tool") {
        windowStart -= 1;
      }
      const recent = messages.slice(windowStart);
      const combined = [...systemMessages];
      for (const m of recent) {
        if (!combined.includes(m)) {
          combined.push(m);
        }
      }
      return combined;
    }
  }

  return messages;
}

/**
 * Dynamically calibrate thinking budget, reasoning effort, and safe headroom via Laya.
 * Uses provider capability tables (supportsReasoning) instead of substring checks.
 *
 * @param body - Request payload object to calibrate.
 * @param evaluation - Laya evaluation result.
 * @param targetModel - The model identifier of the selected target.
 * @returns Thinking configuration object and minimum safe tokens.
 */
export function calibrateThinkingWithLaya(
  body: Record<string, unknown>,
  evaluation: LayaEvaluation,
  targetModel: string = ""
): { thinkingConfig: Record<string, unknown> | null; minSafeTokens: number } {
  if (!body || typeof body !== "object") {
    return { thinkingConfig: null, minSafeTokens: 0 };
  }

  // 1. If caller explicitly configured reasoning/thinking, respect it directly without override
  const explicitEffort =
    typeof body.reasoning_effort === "string" ? body.reasoning_effort.toLowerCase() : "";
  if (explicitEffort === "none" || explicitEffort === "0") {
    return { thinkingConfig: null, minSafeTokens: 0 };
  }
  const thinkingObj = body.thinking as Record<string, unknown> | undefined;
  if (thinkingObj && thinkingObj.type === "disabled") {
    return { thinkingConfig: null, minSafeTokens: 0 };
  }
  if (
    thinkingObj &&
    typeof thinkingObj.budget_tokens === "number" &&
    thinkingObj.budget_tokens > 0
  ) {
    return { thinkingConfig: thinkingObj, minSafeTokens: 1024 };
  }

  // 2. Check model capabilities using provider capability table
  const modelToTest = targetModel || (typeof body.model === "string" ? body.model : "");
  if (!modelToTest || !supportsReasoning(modelToTest)) {
    return { thinkingConfig: null, minSafeTokens: 0 };
  }

  const domain = evaluation.domain;
  const complexity = evaluation.complexity;

  // 3. Simple queries & chitchat: disable thinking to eliminate latency
  if (domain === "simple" && complexity < 0.35) {
    body.thinking = { type: "disabled", budget_tokens: 0 };
    body.reasoning_effort = "low";
    const genConfig = (body.generationConfig || {}) as Record<string, unknown>;
    body.generationConfig = {
      ...genConfig,
      thinking_config: { thinking_budget: 0 },
    };
    return { thinkingConfig: { type: "disabled", budget_tokens: 0 }, minSafeTokens: 0 };
  }

  // 4. High-complexity coding / research / pro tasks: boost thinking budget
  if ((domain === "coding" || domain === "research" || domain === "pro") && complexity >= 0.67) {
    const budget = 16384;
    body.thinking = { type: "enabled", budget_tokens: budget };
    body.reasoning_effort = "high";
    const genConfig = (body.generationConfig || {}) as Record<string, unknown>;
    body.generationConfig = {
      ...genConfig,
      thinking_config: { thinking_budget: budget },
    };
    return { thinkingConfig: { type: "enabled", budget_tokens: budget }, minSafeTokens: 2048 };
  }

  // 5. Moderate complexity default
  const budget = 8192;
  body.thinking = { type: "enabled", budget_tokens: budget };
  body.reasoning_effort = "medium";
  const genConfig = (body.generationConfig || {}) as Record<string, unknown>;
  body.generationConfig = {
    ...genConfig,
    thinking_config: { thinking_budget: budget },
  };
  return { thinkingConfig: { type: "enabled", budget_tokens: budget }, minSafeTokens: 1024 };
}

/**
 * Recommend optimal sampling parameters (temperature, top_p) tailored to prompt domain,
 * difficulty, and language script. Preserves caller-supplied values.
 *
 * @param body - Request payload object.
 * @param evaluation - Laya evaluation result.
 * @param prompt - Prompt text for language detection.
 * @returns Recommended temperature and top_p values.
 */
export function recommendSamplingParamsWithLaya(
  body: Record<string, unknown>,
  evaluation: LayaEvaluation,
  prompt: string = ""
): { temperature: number; top_p: number } {
  const langInfo = detectLanguage(prompt);
  const isCjk = !langInfo.isEnglish;
  const domain = evaluation.domain;

  let temp = 0.4;
  let topP = isCjk ? 0.8 : 0.9;

  if (domain === "coding" || domain === "research" || domain === "pro") {
    temp = 0.2;
    topP = isCjk ? 0.75 : 0.8;
  } else if (domain === "creative") {
    temp = 0.7;
    topP = isCjk ? 0.85 : 0.95;
  } else {
    temp = 0.4;
    topP = isCjk ? 0.8 : 0.9;
  }

  if (body && typeof body === "object") {
    // Only apply recommended defaults if caller hasn't explicitly supplied custom sampling params
    if (body.temperature === undefined) {
      body.temperature = temp;
    }
    if (body.top_p === undefined) {
      body.top_p = topP;
    }
  }

  return { temperature: temp, top_p: topP };
}

/**
 * Automatically update and rank the candidate models based on domain and complexity.
 * Unmatched models use a consistent rank after all matching patterns.
 *
 * @param candidates - List of candidate targets.
 * @param evaluation - Laya evaluation result.
 * @returns Sorted array of candidate targets.
 */
export function prioritizeCandidatesWithLaya<
  T extends { model?: string; provider: string; modelStr?: string; connectionId?: string | null },
>(candidates: T[], evaluation: LayaEvaluation): T[] {
  if (!candidates || candidates.length <= 1) return candidates;

  const domain = evaluation.domain;
  const complexity = evaluation.complexity;

  // Domain capability matcher rules (in descending preference order)
  const domainPatterns: Record<string, RegExp[]> = {
    coding: [
      /\bsonnet-4-6\b/i,
      /\bclaude-3-7-sonnet\b/i,
      /\bclaude-3-5-sonnet\b/i,
      /\bgpt-5-codex\b/i,
      /\bcodex\b/i,
      /\bdeepseek-coder\b/i,
      /\bdeepseek-v3\b/i,
      /\bqwen.*coder\b/i,
      /\bcode\b/i,
    ],
    research: [
      /\bopus-4-6\b/i,
      /\bclaude-3-opus\b/i,
      /\bo3\b/i,
      /\bo1\b/i,
      /\bgpt-5.*pro\b/i,
      /\bgemini-3.1-pro\b/i,
      /\bgemini-2.5-pro\b/i,
      /\bthinking\b/i,
    ],
    pro: [
      /\bgemini-3.1-pro\b/i,
      /\bgemini-2.5-pro\b/i,
      /\bgpt-5\b/i,
      /\bclaude-sonnet\b/i,
      /\bpro\b/i,
    ],
    creative: [/\bclaude-sonnet\b/i, /\bgpt-4o\b/i, /\bgemini-3.8-flash\b/i],
    vision: [
      /\bflash-high\b/i,
      /\bgemini-3.6-flash\b/i,
      /\bgemini-3.8-flash\b/i,
      /\bclaude-3-7\b/i,
      /\bgpt-4o\b/i,
      /\bvision\b/i,
    ],
    simple: [
      /\bflash-medium\b/i,
      /\bflash-lite\b/i,
      /\bgemini-3.5-flash\b/i,
      /\bgpt-4o-mini\b/i,
      /\bdeepseek-chat\b/i,
      /\bflash\b/i,
    ],
  };

  const patterns = domainPatterns[domain] || domainPatterns.simple;
  const unmatchedBaseRank = patterns.length;

  const rankMap = new Map<T, number>();
  for (const c of candidates) {
    const modelStr = c.model || c.modelStr || "";
    let rank = unmatchedBaseRank;
    for (let i = 0; i < patterns.length; i++) {
      if (patterns[i].test(modelStr)) {
        rank = i;
        break;
      }
    }
    // High complexity penalty for lightweight models in coding / research
    if (complexity >= 0.7 && (domain === "coding" || domain === "research")) {
      if (/\b(mini|lite|flash-low)\b/i.test(modelStr)) {
        rank += 1000;
      }
    }
    rankMap.set(c, rank);
  }

  return [...candidates].sort((a, b) => {
    const aRank = rankMap.get(a) ?? unmatchedBaseRank;
    const bRank = rankMap.get(b) ?? unmatchedBaseRank;
    return aRank - bRank;
  });
}

/**
 * Determines whether Laya System 1 routing is opted in for a combo request.
 * Defaults to false (opt-in only). Returns false immediately if
 * OMNIROUTE_ENABLE_LAYA is explicitly set to "false" or "0".
 *
 * @param combo - The combo definition object.
 * @param settings - Optional system/runtime settings.
 * @param env - Optional environment variables (defaults to process.env).
 * @returns True if Laya routing is explicitly enabled, false otherwise.
 */
export function isLayaOptedIn(
  combo?: unknown,
  settings?: unknown,
  env: NodeJS.ProcessEnv = process.env
): boolean {
  if (env.OMNIROUTE_ENABLE_LAYA === "false" || env.OMNIROUTE_ENABLE_LAYA === "0") {
    return false;
  }
  if (env.OMNIROUTE_ENABLE_LAYA === "true" || env.OMNIROUTE_ENABLE_LAYA === "1") {
    return true;
  }
  if (settings && typeof settings === "object") {
    const s = settings as Record<string, unknown>;
    if (s.enableLayaRouting === true || s.enableLaya === true || s.laya === true) {
      return true;
    }
  }
  if (combo && typeof combo === "object") {
    const c = combo as Record<string, unknown>;
    if (c.laya === true || c.enableLaya === true || c.enableLayaRouting === true) {
      return true;
    }
    const auto =
      c.autoConfig && typeof c.autoConfig === "object"
        ? (c.autoConfig as Record<string, unknown>)
        : c.config && typeof c.config === "object"
          ? ((c.config as Record<string, unknown>).auto as Record<string, unknown> | undefined)
          : undefined;
    if (auto && typeof auto === "object") {
      if (
        auto.laya === true ||
        auto.enableLaya === true ||
        auto.routerStrategy === "laya" ||
        auto.routingStrategy === "laya" ||
        auto.strategyName === "laya"
      ) {
        return true;
      }
    }
  }
  return false;
}
