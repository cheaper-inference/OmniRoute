// #16935: classify Playwright failures so a closed browser/context is not reported as a
// terminal selector failure (400) just because the method name contains "Timeout".

export function isBrowserClosedError(message: string): boolean {
  return /(?:page|context|browser) has been closed|browser has been closed/i.test(message);
}

export function isSelectorFailure(error: Error): boolean {
  const message = error.message;
  return (
    error.name === "TimeoutError" ||
    message.includes("waitForSelector") ||
    message.includes("actionability") ||
    message.includes("interception")
  );
}

export function abortStatus(signal: AbortSignal | undefined): 499 | 504 | null {
  if (!signal?.aborted) return null;
  const reason = signal.reason as { name?: string } | undefined;
  return reason?.name === "TimeoutError" ? 504 : 499;
}

const DEFAULT_RESPONSE_TIMEOUT_MS = 30_000;
const ARGON_RESPONSE_TIMEOUT_MS = 180_000;

export function resolveResponseTimeoutMs(
  modelId: string,
  env: NodeJS.ProcessEnv = process.env
): number {
  const parsed = Number(env.GEMINI_WEB_RESPONSE_TIMEOUT_MS);
  if (Number.isInteger(parsed) && parsed >= 1000 && parsed <= 600_000) return parsed;
  return /argon/i.test(modelId) ? ARGON_RESPONSE_TIMEOUT_MS : DEFAULT_RESPONSE_TIMEOUT_MS;
}
