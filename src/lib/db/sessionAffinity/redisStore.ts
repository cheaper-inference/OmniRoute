import { canonicalKimiProvider } from "@omniroute/open-sse/config/kimiProvider.ts";
import { matchesSessionAffinityIdentity } from "./accountIdentity";
import { createHash } from "node:crypto";
import { createRedisLogThrottle } from "@/shared/utils/rateLimiter";
import { parseRecord, type sqliteSessionAffinityStore } from "./sqliteStore";
import {
  COMPARE_AND_UPDATE,
  READ_WITH_TTL,
  READ_KIMI_WITH_TTL,
  COMPARE_KIMI_AND_UPDATE,
  type RedisObservation,
  liveRedisRecord,
  redisReadResult,
  redisMutationResult,
} from "./redisProtocol";
import type { SessionAccountAffinityRecord, SessionAffinityStore } from "./store";

export { COMPARE_AND_UPDATE, READ_WITH_TTL } from "./redisProtocol";

export interface AffinityRedisClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, mode: "PX", ttlMs: number): Promise<unknown>;
  del(key: string): Promise<number>;
  eval(
    script: string,
    numberOfKeys: number,
    key: string,
    ...args: Array<string | number>
  ): Promise<unknown>;
}

// Healthy affinity calls finish in a few ms with only a handful in flight; 8 caps stalled work.
const MAX_OUTSTANDING_REDIS_OPERATIONS = 8;

type LocalStore = Pick<
  typeof sqliteSessionAffinityStore,
  "get" | "upsert" | "touch" | "delete" | "deleteIfValue" | "getSerialized" | "evict"
>;
function keyFor(sessionKey: string, provider: string): string {
  const hash = createHash("sha256").update(`${provider}:${sessionKey}`).digest("hex");
  // getRedisClient applies REDIS_KEY_PREFIX itself; do not double-prefix.
  return `session_affinity:${provider}:${hash}`;
}
function enabled(sessionKey: string, provider: string, ttlMs: number): boolean {
  return Boolean(sessionKey && provider && Number.isFinite(ttlMs) && ttlMs > 0);
}

/**
 * Redis alone is authoritative while it answers. Confirmed shared mutations
 * never install SQLite pins: only error, timeout or admission-saturation
 * fallbacks write local decisions.
 *
 * Invalidation rules:
 * R1. Any in-time Redis reply for a session (accepted, rejected/lost CAS,
 * missing key, absent-key delete, evict hit or miss) synchronously clears that
 * session's local row; no await may occur between the reply and the clear.
 * R2. A timeout/error fallback records the exact serialized row it wrote. A
 * late Redis completion compare-deletes only that byte-identical row, never by
 * account or connection match.
 * R3. evict always removes the failed account's local pin, including outage
 * fallback; its in-time and late handling otherwise follows R1 and R2.
 *
 * Clearing is safe: the worst case is one re-selection during a later outage;
 * retaining a stale row can route to a losing or evicted account.
 */
export class RedisSessionAffinityStore implements SessionAffinityStore {
  readonly driver = "redis" as const;
  private readonly throttle = createRedisLogThrottle();
  private outstanding = 0;
  // Opaque provenance retains original Redis bytes across local deadline mapping.
  // SQLite fallback objects carry no shared authority and compare as a miss.
  private readonly observations = new WeakMap<
    SessionAccountAffinityRecord,
    RedisObservation & { key: string }
  >();

  constructor(
    private readonly getClient: () => Promise<AffinityRedisClient>,
    private readonly fallback: LocalStore,
    private readonly timeoutMs: number
  ) {}

  private async read(
    client: AffinityRedisClient,
    session: string,
    provider: string,
    rawOnly = false
  ): Promise<RedisObservation & { key: string }> {
    const key = keyFor(session, provider);
    if (provider === "kimi") {
      const reply = await client.eval(READ_KIMI_WITH_TTL, 2, key, keyFor(session, "moonshot"));
      return {
        ...redisReadResult(reply),
        key: Number((reply as unknown[])[2]) === 2 ? keyFor(session, "moonshot") : key,
      };
    }
    return rawOnly
      ? { raw: await client.get(key), pttl: -1, key }
      : { ...redisReadResult(await client.eval(READ_WITH_TTL, 1, key)), key };
  }

  private async mutate(
    client: AffinityRedisClient,
    session: string,
    provider: string,
    observed: RedisObservation & { key: string },
    replacement: string,
    ttl: number
  ): Promise<RedisObservation & { key: string; updated: number }> {
    const key = keyFor(session, provider);
    if (provider === "kimi") {
      const reply = await client.eval(
        COMPARE_KIMI_AND_UPDATE,
        2,
        key,
        keyFor(session, "moonshot"),
        observed.key === key ? 1 : observed.key === keyFor(session, "moonshot") ? 2 : 0,
        observed.raw ?? "",
        replacement,
        ttl
      );
      return {
        ...redisMutationResult(reply),
        key: Number((reply as unknown[])[3]) === 2 ? keyFor(session, "moonshot") : key,
      };
    }
    return {
      ...redisMutationResult(
        await client.eval(COMPARE_AND_UPDATE, 1, key, observed.raw ?? "", replacement, ttl)
      ),
      key,
    };
  }

  private observed(session: string, provider: string, value: SessionAccountAffinityRecord | null) {
    return (
      (value && this.observations.get(value)) || {
        key: keyFor(session, provider),
        raw: null,
        pttl: -2,
      }
    );
  }

  private async run<T>(
    operation: (client: AffinityRedisClient, signal: AbortSignal) => Promise<T>,
    fallback: () => T | Promise<T>,
    late?: () => void
  ): Promise<T> {
    if (this.outstanding >= MAX_OUTSTANDING_REDIS_OPERATIONS) {
      if (this.throttle.shouldLog("capacity")) {
        console.warn("[SESSION_AFFINITY] Redis capacity reached; falling back to SQLite.");
      }
      return await fallback();
    }
    this.outstanding++;
    const controller = new AbortController();
    let commandSettled = false;
    let callSettled = false;
    const cleanLate = () => {
      // A sent command can settle after the deadline, before OR after fallback.
      // Clean only once both have settled, including late rejection/error replies.
      if (controller.signal.aborted && commandSettled && callSettled) late?.();
    };
    let timer: ReturnType<typeof setTimeout>;
    const deadline = new Promise<never>((_resolve, reject) => {
      timer = setTimeout(() => {
        controller.abort();
        reject(new Error("affinity Redis timeout"));
      }, this.timeoutMs);
    });
    try {
      const result = await Promise.race([
        (async () => {
          try {
            const client = await this.getClient();
            controller.signal.throwIfAborted();
            return await operation(client, controller.signal);
          } finally {
            // A caller deadline cannot cancel sent commands or release their admission slot.
            this.outstanding--;
            commandSettled = true;
            cleanLate();
          }
        })(),
        deadline,
      ]);
      this.throttle.reset();
      return result;
    } catch {
      // Never log raw Redis errors: they can contain credentials or command payloads.
      const state = controller.signal.aborted ? "timeout" : "error";
      if (this.throttle.shouldLog(state)) {
        console.warn(`[SESSION_AFFINITY] Redis ${state}; falling back to SQLite.`);
      }
      return await fallback();
    } finally {
      callSettled = true;
      cleanLate();
      clearTimeout(timer!);
    }
  }

  get(
    sessionKey: string,
    provider: string,
    ttlMs = 0,
    now = Date.now()
  ): Promise<SessionAccountAffinityRecord | null> {
    provider = canonicalKimiProvider(provider);
    if (!enabled(sessionKey, provider, ttlMs)) return Promise.resolve(null);
    return this.run(
      async (client, signal) => {
        const result = await this.read(client, sessionKey, provider);
        const record = liveRedisRecord(result, now);
        if (!signal.aborted) this.fallback.delete(sessionKey, provider);
        if (record) this.observations.set(record, result);
        return record;
      },
      () => this.fallback.get(sessionKey, provider, ttlMs, now)
    );
  }

  async upsert(
    sessionKey: string,
    provider: string,
    connectionId: string,
    now = Date.now(),
    ttlMs = 0,
    accountIdentity?: string,
    observed?: SessionAccountAffinityRecord | null
  ): Promise<void | SessionAccountAffinityRecord | null> {
    provider = canonicalKimiProvider(provider);
    if (!enabled(sessionKey, provider, ttlMs) || !connectionId) return;
    let commandStarted = false;
    let fallbackValue: string | null = null;
    return this.run<void | SessionAccountAffinityRecord | null>(
      async (client, signal) => {
        let observation: RedisObservation & { key: string };
        if (observed === undefined) {
          commandStarted = true;
          observation = await this.read(client, sessionKey, provider);
          if (!signal.aborted) this.fallback.delete(sessionKey, provider);
        } else {
          observation = this.observed(sessionKey, provider, observed);
        }
        signal.throwIfAborted();
        const existing = parseRecord(observation.raw);
        const timestamp = new Date(now).toISOString();
        const record: SessionAccountAffinityRecord = {
          connectionId,
          ...(accountIdentity && /^[a-f0-9]{64}$/.test(accountIdentity) ? { accountIdentity } : {}),
          createdAt: existing?.createdAt ?? timestamp,
          lastUsedAt: timestamp,
          expiresAt: new Date(now + ttlMs).toISOString(),
        };
        commandStarted = true;
        const result = await this.mutate(
          client,
          sessionKey,
          provider,
          observation,
          JSON.stringify(record),
          ttlMs
        );
        if (signal.aborted) return;
        this.fallback.delete(sessionKey, provider);
        if (result.updated <= 0) {
          const winner = liveRedisRecord(result, now);
          if (winner) this.observations.set(winner, result);
          return winner;
        }
      },
      () => {
        const result = this.fallback.upsert(
          sessionKey,
          provider,
          connectionId,
          now,
          ttlMs,
          accountIdentity
        );
        fallbackValue = this.fallback.getSerialized(sessionKey, provider);
        return result;
      },
      () => {
        // SQLite's exact-value compare+delete is synchronous, with no await.
        if (commandStarted && fallbackValue !== null)
          this.fallback.deleteIfValue(sessionKey, provider, fallbackValue);
      }
    );
  }

  async touch(sessionKey: string, provider: string, now = Date.now(), ttlMs = 0): Promise<void> {
    provider = canonicalKimiProvider(provider);
    if (!enabled(sessionKey, provider, ttlMs)) return;
    let commandStarted = false;
    let fallbackValue: string | null = null;
    await this.run(
      async (client, signal) => {
        commandStarted = true;
        const result = await this.read(client, sessionKey, provider);
        signal.throwIfAborted();
        this.fallback.delete(sessionKey, provider);
        const existing = liveRedisRecord(result, now);
        if (!existing) return;
        const record = {
          ...existing,
          lastUsedAt: new Date(now).toISOString(),
          expiresAt: new Date(now + ttlMs).toISOString(),
        };
        await this.mutate(client, sessionKey, provider, result, JSON.stringify(record), ttlMs);
        if (!signal.aborted) this.fallback.delete(sessionKey, provider);
      },
      () => {
        const result = this.fallback.touch(sessionKey, provider, now, ttlMs);
        fallbackValue = this.fallback.getSerialized(sessionKey, provider);
        return result;
      },
      () => {
        if (commandStarted && fallbackValue !== null)
          this.fallback.deleteIfValue(sessionKey, provider, fallbackValue);
      }
    );
  }

  async delete(
    sessionKey: string,
    provider: string,
    observed?: SessionAccountAffinityRecord | null
  ): Promise<void> {
    provider = canonicalKimiProvider(provider);
    if (!sessionKey || !provider) return;
    await this.run(
      async (client, signal) => {
        let observation: RedisObservation & { key: string };
        if (observed === undefined) {
          observation = await this.read(client, sessionKey, provider, true);
          if (!signal.aborted) this.fallback.delete(sessionKey, provider);
        } else {
          observation = this.observed(sessionKey, provider, observed);
        }
        signal.throwIfAborted();
        await this.mutate(client, sessionKey, provider, observation, "", 0);
        if (!signal.aborted) this.fallback.delete(sessionKey, provider);
      },
      () => this.fallback.delete(sessionKey, provider)
    );
  }

  async evict(
    sessionKey: string,
    provider: string,
    connectionId: string,
    accountIdentity?: string
  ): Promise<boolean> {
    provider = canonicalKimiProvider(provider);
    if (!sessionKey || !provider || !connectionId) return false;
    // Remove this failed account locally even when Redis is down. No shared reply
    // can reinstall it; a later outage fallback is the only possible local writer.
    const localEvicted = this.fallback.evict(sessionKey, provider, connectionId, accountIdentity);
    return this.run(
      async (client, signal) => {
        const observation = await this.read(client, sessionKey, provider, true);
        signal.throwIfAborted();
        const record = parseRecord(observation.raw);
        this.fallback.delete(sessionKey, provider);
        if (
          !record ||
          (provider === "kimi" && record.accountIdentity && !accountIdentity) ||
          (record.accountIdentity && accountIdentity
            ? !matchesSessionAffinityIdentity(record.accountIdentity, accountIdentity, provider)
            : record.connectionId !== connectionId)
        )
          return localEvicted;
        const reply = await this.mutate(client, sessionKey, provider, observation, "", 0);
        const deleted = reply.updated;
        if (!signal.aborted) this.fallback.delete(sessionKey, provider);
        return deleted > 0 || localEvicted;
      },
      () => localEvicted
    );
  }
}
