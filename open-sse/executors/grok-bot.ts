import { randomUUID } from "node:crypto";
import fs from "node:fs";
import { BaseExecutor, type ExecuteInput, type ExecutorExecuteResult } from "./base.ts";
import { getAccessToken } from "../services/tokenRefresh.ts";
import {
  queueFile,
  readQueue,
  removeFromQueue,
  type PendingCleanup,
} from "./grok-bot-cleanup-queue.ts";
import { PROVIDERS, HTTP_STATUS } from "../config/constants.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import {
  createDefaultBridgeController,
  errResponse,
  getTransport,
  remoteMcpServers,
  setUnreadTimeout,
  type BridgeController,
} from "./grok-bot-protocol.ts";
import { GrokBotTurn } from "./grok-bot-turn.ts";
export {
  BRIDGE_UNREAD_TIMEOUT_MS,
  createDefaultBridgeController,
  getTransport,
  setGrokBotTransportForTests,
} from "./grok-bot-protocol.ts";

/**
 * Budget for the cleanup drain that runs before a conversation. The drain is a
 * best-effort reconciler, so it must not add unbounded latency to the request
 * that triggered it.
 */
const CLEANUP_BUDGET_MS = 3000;
const CLEANUP_MAX_PER_RUN = 5;

/**
 * Grok Bot executor -- single-account, plain-conversation path.
 *
 * Wire contract (spec: _tasks/superpowers/specs/2026-09-22-grok-bot-executor-integration.md):
 * - A fresh temporal agent is created per request via
 *   aiserver.v1.GrokBotService/CreateGrokBotTemporalAgent. The agentId is a
 *   locally generated nonce the server echoes back; a mismatched or
 *   non-temporal response fails BEFORE any user message is sent.
 * - The conversation turn runs against WatchGrokBotTranscripts with an empty
 *   sessionId (a client-invented session id is rejected by the server with 404;
 *   an empty string means "the agent's current turn").
 * - The turn is settled by the agent's running flag: once the watch has seen
 *   the flag true, it ends when the flag is false or absent. An absent flag
 *   counts as not running.
 * - The agent is deleted in a finally block by roster row id with an
 *   independent timeout, so cancellation of the turn cannot strand it.
 * - If creation times out or the delete fails, a pending-cleanup record is
 *   queued (persisted next to DATA_DIR) and reconciled before the next
 *   conversation on the same connection.
 *
 * Tool round-trips are out of scope for this executor: OmniRoute is a
 * stateless router, so a turn containing tool calls ends when the tool call
 * is surfaced; the caller replays full history on the next request
 * (stateless-full-history contract).
 */

export class GrokBotExecutor extends BaseExecutor {
  private readonly machineId = randomUUID();
  private bridgeController: BridgeController | (() => BridgeController) | null | undefined;
  private readonly bridgeLifecycle: string[] = [];
  private readonly usedBridgeNonces = new Set<string>();

  bridgeLifecycleForTests(): string[] {
    return [...this.bridgeLifecycle];
  }

  setBridgeControllerForTests(
    controller: BridgeController | (() => BridgeController) | null
  ): void {
    this.bridgeController = controller;
  }

  constructor() {
    super("grok-bot", PROVIDERS["grok-bot"]);
  }

  buildUrl(): string {
    return PROVIDERS["grok-bot"]?.baseUrl ?? "https://api2.cursor.sh";
  }

  /**
   * Drain pending cleanups for this connection before a new conversation.
   *
   * Bounded on purpose: this runs on the request path, so an upstream that
   * stalls must not hold the request. Each RPC carries the same deadline, and
   * only a few items are attempted per turn; whatever is left stays on disk for
   * the next one.
   */
  private async drainPendingCleanups(
    connectionId: string | null | undefined,
    accessToken: string,
    log: { warn?: (...a: unknown[]) => void } | null
  ): Promise<void> {
    if (!connectionId) return;
    const q = readQueue();
    const mine = q.filter((i) => i.connectionId === connectionId);
    if (mine.length === 0) return;
    const t = getTransport(accessToken);
    const deadline = AbortSignal.timeout(CLEANUP_BUDGET_MS);
    const remaining: PendingCleanup[] = [];
    let attempted = 0;
    for (const item of q) {
      if (item.connectionId !== connectionId) {
        remaining.push(item);
        continue;
      }
      if (attempted >= CLEANUP_MAX_PER_RUN || deadline.aborted) {
        remaining.push(item);
        continue;
      }
      attempted += 1;
      try {
        let rowId = item.rowId;
        if (!rowId && item.agentId) {
          const roster = (await t.rpc("ListGrokBotAgents", {}, { signal: deadline })) as {
            agents?: { id?: string; agentId?: string }[];
          };
          const row = roster?.agents?.find((a) => a.agentId === item.agentId);
          if (!row?.id) {
            // A roster miss and a roster failure look the same here, so the item
            // stays queued rather than being dropped on a guess.
            remaining.push(item);
            continue;
          }
          rowId = row.id;
        }
        if (rowId) {
          await t.rpc("DeleteGrokBotAgent", { id: rowId }, { signal: deadline });
        }
        // Remove this item from the on-disk queue immediately, inside one
        // synchronous read-filter-write section. The previous shape wrote the
        // whole `remaining` snapshot after the loop, so a concurrent
        // enqueueCleanup during the awaited deletes was silently overwritten
        // (review finding r8).
        removeFromQueue(item);
      } catch (err) {
        log?.warn?.("GROK_BOT", `cleanup reconcile failed: ${sanitizeErrorMessage(err)}`);
        remaining.push(item);
      }
    }
    // Items that survived (roster failure or delete error) were already kept
    // on disk; `remaining` is retained for callers/tests that inspect it.
    void remaining;
  }

  private async ensureAccessToken(input: {
    credentials?: { accessToken?: string; refreshToken?: string; connectionId?: string };
    log?: { warn?: (...a: unknown[]) => void } | null;
  }): Promise<string | null> {
    const creds = input.credentials;
    if (creds?.accessToken) return creds.accessToken;
    const refreshed = await this.refreshCredentials(creds as never, input.log ?? undefined);
    return refreshed?.accessToken ?? null;
  }

  /**
   * @executorRecovery native
   * @executorRecoveryReason Cursor Connect-RPC sends temporal-agent text/tool messages, not JSON inference payloads; reasoning enum, known-field and Gemini budget recovery do not apply.
   * @executorRecoveryTest tests/unit/grok-bot-executor.test.ts
   */
  async execute(input: ExecuteInput): Promise<ExecutorExecuteResult> {
    const accessToken = await this.ensureAccessToken(input);
    if (!accessToken) return errResponse(HTTP_STATUS.UNAUTHORIZED ?? 401, "missing access token");
    await this.drainPendingCleanups(
      input.credentials?.connectionId ?? null,
      accessToken,
      input.log ?? null
    );
    return new GrokBotTurn(input, getTransport(accessToken), {
      machineId: this.machineId,
      bridgeController:
        this.bridgeController === undefined
          ? createDefaultBridgeController()
          : typeof this.bridgeController === "function"
            ? this.bridgeController()
            : this.bridgeController,
      bridgeLifecycle: this.bridgeLifecycle,
      usedBridgeNonces: this.usedBridgeNonces,
    }).run();
  }

  async refreshCredentials(
    credentials: { refreshToken?: string } | null | undefined,
    log?: { warn?: (...a: unknown[]) => void }
  ): Promise<{ accessToken: string } | null> {
    if (!credentials?.refreshToken) {
      log?.warn?.("TOKEN_REFRESH", "Grok Bot: no refresh token -- re-authentication required");
      return null;
    }
    const result = await getAccessToken("grok-bot", credentials, log);
    if (!result || result.error) {
      log?.warn?.(
        "TOKEN_REFRESH",
        `Grok Bot: token refresh failed${result?.error ? ` (${result.error})` : ""}`
      );
      return null;
    }
    return result;
  }
}

export default GrokBotExecutor;

/** Test/introspection hooks for the pending-cleanup queue. */
export const _grokBotInternals = {
  remoteMcpServers,
  setUnreadTimeoutForTests(ms: number | null): void {
    setUnreadTimeout(ms);
  },
  pendingCleanupCount(): number {
    return readQueue().length;
  },
  resetPendingCleanupsForTests(): void {
    try {
      fs.unlinkSync(queueFile());
    } catch {
      /* nothing to reset */
    }
  },
};
