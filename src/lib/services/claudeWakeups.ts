import {
  getClaudeUsage,
  observeClaudeUsageHeaders,
} from "@omniroute/open-sse/services/usage/claude";
import {
  claudeQuotaMatchesModel,
  isClaudeQuotaMetadata,
} from "@omniroute/open-sse/services/usage/claudeQuota";
import { getProviderModels } from "@omniroute/open-sse/config/providerModels";
import { isModelSelectable } from "@omniroute/open-sse/services/modelLifecycle";
import { logger } from "@omniroute/open-sse/utils/logger";
import { claimClaudeWakeup, recordClaudeWakeupReset } from "@/lib/db/claudeWakeups";
import { TERMINAL_CONNECTION_STATUSES } from "@/lib/quota/connectionRecovery";
import { refreshAndUpdateCredentialsWithResolver } from "@/lib/usage/providerLimits/credentialRefresh";
import { createDefaultQuotaAutoPingDeps, isQuotaExhausted } from "./quotaAutoPing";
import type { QuotaAutoPingConnection } from "./quotaAutoPing";

const log = logger("ClaudeWakeups");
const SESSION_KEY = "session (5h)";
const PROBE_INTERVAL_MS = 60_000;
const RETRY_INTERVAL_MS = 15 * 60_000;
const SESSION_MS = 5 * 60 * 60_000;

type WakeupResult = {
  status: "succeeded" | "failed" | "skipped";
  reason:
    | "completed"
    | "unavailable"
    | "no_model"
    | "no_token"
    | "busy"
    | "not_completed"
    | "window_active"
    | "quota_exhausted"
    | "quota_unavailable";
  nextProbeAt?: number;
};

export type ClaudeWakeupConnection = QuotaAutoPingConnection & {
  isActive?: boolean | null;
  testStatus?: string | null;
};

type ClaudeUsage = Awaited<ReturnType<typeof getClaudeUsage>>;

export function claudeWakeupWindow(
  usage: ClaudeUsage,
  now: number,
  model?: string
): "ready" | "window_active" | "quota_exhausted" | "quota_unavailable" {
  if (usage._stale || !usage.quotas || !usage.quotasComplete) return "quota_unavailable";
  const session = usage.quotas[SESSION_KEY] as Record<string, unknown> | undefined;
  if (session) {
    const resetAt = typeof session.resetAt === "string" ? Date.parse(session.resetAt) : NaN;
    if (!Number.isFinite(resetAt)) return "quota_unavailable";
    if (resetAt > now) return "window_active";
  } else if (
    usage._source === "response-headers" ||
    (typeof usage.plan === "string" && /ultra/i.test(usage.plan))
  ) {
    // An Ultra account with no session window may not have a five-hour limit at all.
    return "quota_unavailable";
  }
  const weekly = usage.quotas["weekly (7d)"] as Record<string, unknown> | undefined;
  if (isQuotaExhausted(weekly)) return "quota_exhausted";
  for (const value of Object.values(usage.modelQuotas ?? {})) {
    if (
      model &&
      isClaudeQuotaMetadata(value.claudeQuota) &&
      claudeQuotaMatchesModel(value.claudeQuota, model) &&
      isQuotaExhausted(value)
    ) {
      return "quota_exhausted";
    }
  }
  return "ready";
}

async function loadClaudeExecutor() {
  const { getExecutor } = await import("@omniroute/open-sse/executors/index");
  return getExecutor("claude");
}

export function createClaudeWakeupDeps() {
  const deps = createDefaultQuotaAutoPingDeps();
  return {
    ...deps,
    readUsage: getClaudeUsage,
    loadExecutor: loadClaudeExecutor,
    claim: claimClaudeWakeup,
    recordReset: recordClaudeWakeupReset,
    refresh: (connection: ClaudeWakeupConnection) =>
      refreshAndUpdateCredentialsWithResolver(connection, loadClaudeExecutor, {
        allowRotatingRefresh: true,
      }),
    now: Date.now,
  };
}

export async function runClaudeWakeup(
  connection: ClaudeWakeupConnection,
  signal: AbortSignal,
  deps = createClaudeWakeupDeps()
): Promise<WakeupResult> {
  const unavailable =
    TERMINAL_CONNECTION_STATUSES.has(connection.testStatus?.toLowerCase() ?? "") ||
    (connection.rateLimitedUntil && Date.parse(connection.rateLimitedUntil) > deps.now()) ||
    !deps.canExecuteProvider("claude") ||
    (await deps.isConnectionUnavailableToAuxiliaryActivity(connection.id));
  if (unavailable) return { status: "skipped", reason: "unavailable" };

  const model = getProviderModels("claude").find(
    ({ id }) => id.startsWith("claude-haiku-") && isModelSelectable("claude", id)
  )?.id;
  if (!model) return { status: "skipped", reason: "no_model" };

  const proxy = await deps.resolveProxyForConnection(connection.id);
  return deps.runWithProxyContext(proxy?.proxy ?? null, async () => {
    const { connection: current } = await deps.refresh(connection);
    if (!current.accessToken) return { status: "skipped", reason: "no_token" };
    await deps.throttleQuotaFetch();
    signal.throwIfAborted();
    const usage = await deps.readUsage(current.accessToken, current.id, { forceRefresh: true });
    const now = deps.now();
    const window = claudeWakeupWindow(usage, now, model);
    if (window !== "ready") {
      const session = usage.quotas?.[SESSION_KEY] as { resetAt?: string } | undefined;
      return {
        status: "skipped",
        reason: window,
        ...(window === "window_active" && session?.resetAt
          ? { nextProbeAt: Date.parse(session.resetAt) }
          : {}),
      };
    }

    signal.throwIfAborted();
    const executor = await deps.loadExecutor();
    signal.throwIfAborted();
    if (!deps.claim(current.id, now)) return { status: "skipped", reason: "busy" };
    const { response } = await executor.execute({
      model,
      stream: false,
      signal,
      skipIntraUrl429Retry: true,
      credentials: {
        accessToken: current.accessToken,
        connectionId: current.id,
        providerSpecificData: current.providerSpecificData,
      },
      log: null,
      body: {
        model,
        max_tokens: 1,
        stream: false,
        messages: [{ role: "user", content: "Reply OK." }],
      },
    });
    if (!response.ok) {
      await response.body?.cancel();
      return { status: "failed", reason: "not_completed" };
    }
    const message = (await response.json()) as { type?: string; stop_reason?: string };
    if (message.type !== "message" || !message.stop_reason) {
      return { status: "failed", reason: "not_completed" };
    }
    const resetHeader = Number(response.headers.get("anthropic-ratelimit-unified-5h-reset"));
    const resetAt = resetHeader * 1000 > now ? resetHeader * 1000 : now + SESSION_MS;
    deps.recordReset(current.id, now, resetAt);
    observeClaudeUsageHeaders(current.accessToken, response.headers);
    log.info("Quota wakeup succeeded", { connectionId: current.id });
    return { status: "succeeded", reason: "completed", nextProbeAt: resetAt };
  });
}

export function createClaudeAutoPingTick(
  ping: (id: string) => Promise<{ nextProbeAt?: number }>,
  readSettings = createDefaultQuotaAutoPingDeps().getSettings,
  now = Date.now
) {
  const nextAccountProbe = new Map<string, number>();
  let running = false;
  let nextProbeAt = 0;
  return async () => {
    if (running || now() < nextProbeAt) return;
    running = true;
    nextProbeAt = now() + PROBE_INTERVAL_MS;
    try {
      const settings = (await readSettings())?.claudeQuotaAutoPing as
        { connections?: Record<string, boolean> } | undefined;
      const connections = settings?.connections ?? {};
      for (const id of nextAccountProbe.keys()) {
        if (connections[id] !== true) nextAccountProbe.delete(id);
      }
      for (const [id, enabled] of Object.entries(connections)) {
        if (enabled !== true || (nextAccountProbe.get(id) ?? 0) > now()) continue;
        const result = await ping(id);
        nextAccountProbe.set(id, result.nextProbeAt ?? now() + RETRY_INTERVAL_MS);
      }
    } finally {
      running = false;
    }
  };
}
