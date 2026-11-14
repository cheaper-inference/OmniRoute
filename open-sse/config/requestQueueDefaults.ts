import { DEFAULT_API_LIMITS } from "./constants.ts";

export const DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS = (() => {
  const parsed = Number(process.env.RATE_LIMIT_MAX_WAIT_MS || "30000");
  return Number.isFinite(parsed) && parsed > 0 ? Math.trunc(parsed) : 30000;
})();

// Limiter-managed execution backstop (Bottleneck `expiration`). Deliberately
// separate from the queue-wait budget: non-incremental gateways (Console Go /
// Command Code) buffer whole generations before first bytes, so legitimate
// executions run minutes. Default 10 min; the backstop only catches executors
// without their own upstream timeout.
export const DEFAULT_REQUEST_QUEUE_EXECUTION_MAX_WAIT_MS = (() => {
  const parsed = Number(process.env.RATE_LIMIT_EXECUTION_MAX_WAIT_MS || "600000");
  return Number.isFinite(parsed) && parsed > 0 ? Math.trunc(parsed) : 600000;
})();

// Issue #6593: opt-in admission cap on the local rate-limit queue depth.
// Default 0 = disabled (unbounded queue, today's behavior unchanged).
export const DEFAULT_REQUEST_QUEUE_MAX_DEPTH = (() => {
  const parsed = Number(process.env.RATE_LIMIT_MAX_QUEUE_DEPTH || "0");
  return Number.isFinite(parsed) && parsed >= 0 ? Math.trunc(parsed) : 0;
})();

export const DEFAULT_REQUEST_QUEUE_SETTINGS = {
  autoEnableApiKeyProviders: true,
  requestsPerMinute: DEFAULT_API_LIMITS.requestsPerMinute,
  minTimeBetweenRequestsMs: DEFAULT_API_LIMITS.minTimeBetweenRequests,
  concurrentRequests: DEFAULT_API_LIMITS.concurrentRequests,
  globalConcurrentRequests: 0,
  maxWaitMs: DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS,
  executionMaxWaitMs: DEFAULT_REQUEST_QUEUE_EXECUTION_MAX_WAIT_MS,
  maxQueueDepth: DEFAULT_REQUEST_QUEUE_MAX_DEPTH,
};
