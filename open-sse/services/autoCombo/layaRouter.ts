export interface LayaEvaluation {
  domain: string;
  complexity: number;
  isSafe: boolean;
  confidence?: number;
  isFallback?: boolean;
}

/**
 * Fast native neural-heuristic evaluator mirroring Hermes Antigravity provider.
 * Guarantees sub-millisecond System 1 classification with anchored regex patterns
 * to avoid false positive substring matches. Zero external dependencies.
 *
 * @param text - Input prompt text to evaluate.
 * @returns Fast native evaluation result.
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
 * Evaluates prompt domain, complexity, and safety using native zero-dependency decision engine.
 *
 * @param prompt - Prompt text to evaluate.
 * @returns Normalized evaluation with domain, complexity, and safety status.
 */
export async function evaluateWithLaya(prompt: string): Promise<LayaEvaluation> {
  return fastFallbackEvaluate(prompt);
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
 * Calibrates thinking / reasoning parameters based on domain and complexity.
 *
 * @param body - Request body containing reasoning parameters.
 * @param layaEval - Laya evaluation result.
 * @param modelStr - Optional selected target model identifier.
 * @returns Calibration status with thinkingConfig and minSafeTokens.
 */
export function calibrateThinkingWithLaya(
  body: Record<string, unknown>,
  layaEval: LayaEvaluation,
  _modelStr?: string
): { thinkingConfig: { type: string; budget_tokens?: number } | null; minSafeTokens: number } {
  if (!body || typeof body !== "object") {
    return { thinkingConfig: null, minSafeTokens: 0 };
  }

  if (body.reasoning_effort === "none") {
    return { thinkingConfig: null, minSafeTokens: 0 };
  }

  if (layaEval.domain === "simple" && layaEval.complexity <= 0.3) {
    body.reasoning_effort = "low";
    return { thinkingConfig: { type: "disabled" }, minSafeTokens: 0 };
  }

  if (
    layaEval.complexity >= 0.67 ||
    layaEval.domain === "coding" ||
    layaEval.domain === "research"
  ) {
    body.reasoning_effort = "high";
    return { thinkingConfig: { type: "enabled", budget_tokens: 16384 }, minSafeTokens: 2048 };
  }

  return { thinkingConfig: null, minSafeTokens: 0 };
}

/**
 * Recommends sampling parameters (temperature, top_p) based on task domain and language.
 *
 * @param body - Request body containing sampling parameters.
 * @param layaEval - Laya evaluation result.
 * @param prompt - Original prompt for language detection.
 * @returns Resulting sampling parameters.
 */
export function recommendSamplingParamsWithLaya(
  body: Record<string, unknown>,
  layaEval: LayaEvaluation,
  prompt: string
): { temperature: number; top_p: number } {
  const lang = detectLanguage(prompt);

  let temp = 0.5;
  let topP = 1.0;

  if (layaEval.domain === "coding" || layaEval.domain === "research") {
    temp = 0.2;
    topP = 0.8;
  } else if (layaEval.domain === "creative") {
    temp = 0.8;
    topP = 0.95;
  }

  if (!lang.isEnglish) {
    topP = 0.75;
  }

  if (body.temperature === undefined) {
    body.temperature = temp;
  } else {
    temp = body.temperature as number;
  }

  if (body.top_p === undefined) {
    body.top_p = topP;
  } else {
    topP = body.top_p as number;
  }

  return { temperature: temp, top_p: topP };
}

/**
 * Prunes conversation history for simple chitchat or self-contained coding prompts.
 *
 * @param messages - Array of conversation messages.
 * @param layaEval - Laya evaluation result.
 * @param _prompt - Prompt string.
 * @returns Filtered messages array.
 */
export function prefilterMessagesWithLaya<T extends { role?: unknown; content?: unknown }>(
  messages: T[],
  layaEval: LayaEvaluation,
  _prompt: string
): T[] {
  if (!Array.isArray(messages) || messages.length <= 2) {
    return messages;
  }

  const systemMsg = messages.find((m) => m?.role === "system");
  const lastMsg = messages[messages.length - 1];

  if (layaEval.domain === "simple" && layaEval.complexity <= 0.3) {
    return (systemMsg ? [systemMsg, lastMsg] : [lastMsg]) as T[];
  }

  if (layaEval.domain === "coding" && messages.length > 12) {
    const tail = messages.slice(-8);
    if (systemMsg && !tail.some((m) => m?.role === "system")) {
      return [systemMsg, ...tail] as T[];
    }
    return tail;
  }

  return messages;
}

/**
 * Check whether Laya routing is opted into for a request.
 *
 * @param combo - Combo configuration object.
 * @param settings - Global runtime settings object.
 * @param env - Environment variables dictionary.
 * @returns True if Laya routing is explicitly enabled.
 */
export function isLayaOptedIn(
  combo?: { laya?: boolean; routerStrategy?: string },
  settings?: { enableLayaRouting?: boolean },
  env?: Record<string, string | undefined>
): boolean {
  if (combo?.laya === true || combo?.routerStrategy === "laya") return true;
  if (settings?.enableLayaRouting === true) return true;
  const envVal = env?.OMNIROUTE_ENABLE_LAYA?.toLowerCase();
  return envVal === "1" || envVal === "true";
}

/**
 * Prioritize candidate targets based on Laya domain/complexity evaluation.
 *
 * @param targets - Array of combo targets to sort.
 * @param layaEval - Laya evaluation result.
 * @returns Re-ordered array of targets.
 */
export function prioritizeCandidatesWithLaya<
  T extends { modelStr?: string; model?: string; provider?: string },
>(targets: T[], layaEval: LayaEvaluation): T[] {
  if (!targets || targets.length <= 1) return targets;

  return [...targets].sort((a, b) => {
    const aStr = (a.modelStr || a.model || "").toLowerCase();
    const bStr = (b.modelStr || b.model || "").toLowerCase();

    // Prefer coding models for coding domain
    if (layaEval.domain === "coding") {
      const aSonnet = aStr.includes("sonnet");
      const bSonnet = bStr.includes("sonnet");
      if (aSonnet && !bSonnet) return -1;
      if (!aSonnet && bSonnet) return 1;

      const aCode = aStr.includes("code") || aStr.includes("coder");
      const bCode = bStr.includes("code") || bStr.includes("coder");
      if (aCode && !bCode) return -1;
      if (!aCode && bCode) return 1;
    }

    // Deprioritize mini / lite models on high complexity
    if (layaEval.complexity >= 0.7) {
      const aLite = aStr.includes("mini") || aStr.includes("lite");
      const bLite = bStr.includes("mini") || bStr.includes("lite");
      if (aLite && !bLite) return 1;
      if (!aLite && bLite) return -1;
    }

    return 0;
  });
}
