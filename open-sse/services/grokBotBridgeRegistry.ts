import { randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Grok Bot tool-bridge registry (frozen spec 2026-09-28, fable r20 PASS).
 *
 * In-process nonce registry backing the public route `/grok-bridge/<nonce>/mcp`.
 * The registry owns collection state, the sliding TTL, the 5-minute absolute
 * cap timer, and the reaper. The executor owns sockets, servers, abort
 * signals, and remote cleanup; it registers per-turn hooks here.
 *
 * All mutating operations are synchronous so check-and-act sequences are
 * atomic with respect to the cap timer and concurrent registrations
 * (spec: lifecycle step 3, registry cap bullet).
 */

export const BRIDGE_PROXY_TIMEOUT_MS = 30_000;
export const BRIDGE_IDLE_TTL_MS = 60_000;
export const BRIDGE_ABSOLUTE_CAP_MS = 5 * 60_000;
export const BRIDGE_MAX_ACTIVE_SESSIONS = 100;
export const BRIDGE_MAX_TOMBSTONES = 1000;
export const BRIDGE_MAX_REQUESTS_PER_NONCE_DEFAULT = 32;

/**
 * Requests one nonce accepts before further ones are refused. A Cursor
 * handshake is four requests and the model repeats it, which takes eight.
 * Tool calls share the same budget, so the default leaves room for them.
 * Override with GROK_BOT_BRIDGE_MAX_REQUESTS; a missing or unusable value
 * keeps the default.
 */
export function bridgeMaxRequestsPerNonce(): number {
  const raw = process.env.GROK_BOT_BRIDGE_MAX_REQUESTS;
  if (raw === undefined || raw.trim() === "") return BRIDGE_MAX_REQUESTS_PER_NONCE_DEFAULT;
  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed < 1) return BRIDGE_MAX_REQUESTS_PER_NONCE_DEFAULT;
  return parsed;
}

/**
 * 一轮的绝对上限，毫秒。等工具结果的窗口推到这里为止。
 * GROK_BOT_BRIDGE_ABSOLUTE_CAP_MS 覆盖；缺失或不是正整数时用默认 5 分钟。
 */
export function bridgeAbsoluteCapMs(): number {
  const raw = process.env.GROK_BOT_BRIDGE_ABSOLUTE_CAP_MS;
  if (raw === undefined || raw.trim() === "") return BRIDGE_ABSOLUTE_CAP_MS;
  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed < 1) return BRIDGE_ABSOLUTE_CAP_MS;
  return parsed;
}
export const BRIDGE_REAPER_INTERVAL_MS = 30_000;
export const BRIDGE_DRAIN_BUDGET_MS = 30_000;

/** Reserved infrastructure ports that must never be a bridge target. */
export const BRIDGE_RESERVED_PORTS: ReadonlySet<number> = new Set([20128, 20130]);

/** Compiled shape of `/grok-bridge/<nonce>/mcp`; the nonce is exactly 22 chars. */
export const BRIDGE_NONCE_PATTERN = /^[A-Za-z0-9_-]{22}$/;
export const BRIDGE_ROUTE_PATTERN = /^\/grok-bridge\/([A-Za-z0-9_-]{22})\/mcp$/;

export type BridgeCloseReason =
  | "normal"
  | "cancel"
  | "cap"
  | "reaper-expiry"
  | "forced";

export type BridgeNonceState = "active" | "closing" | "tombstone";

export interface BridgeTurnHooks {
  /**
   * Drain-strength teardown: accepted bridge requests get up to 30 seconds.
   * The executor tracks its accepted sockets; the registry only claims the
   * state transition. Escalation (cap/cancel/forced) preempts this via
   * onForcedAbort and runs at most once.
   */
  onDraining: (reason: BridgeCloseReason) => void;
  /**
   * Forced teardown: abort the turn signal, destroy accepted sockets, close
   * the local server now. Invoked at most once per turn regardless of how
   * many triggers raced (spec: abort/destroy each run at most once).
   */
  onForcedAbort: (reason: BridgeCloseReason) => void;
  /**
   * Called once local teardown has settled (drain finished, was escalated,
   * or there was nothing to drain) so the executor can run remote cleanup
   * under its own budget.
   */
  onLocallyClosed: (reason: BridgeCloseReason) => void;
}

export interface BridgeTurnInput {
  nonce: string;
  port: number;
  /** Turn creation time; the absolute cap is createdAt + 5 minutes.
   * Must share the registry clock's time domain: production passes
   * Date.now() against the default clock, tests pass clock.now() against
   * the injected fake clock (see regInput). A cross-domain createdAt makes
   * the cap delay meaningless; Math.max(0, ...) fails closed (fires now). */
  createdAt: number;
  /** Bearer challenge, memory-only, never logged or returned. */
  challenge: string;
  hooks: BridgeTurnHooks;
}

export interface BridgeTurnEntry {
  nonce: string;
  port: number;
  createdAt: number;
  /** Sliding expiry; each accepted request extends it by 60 seconds. */
  expiryAt: number;
  challenge: string;
  state: BridgeNonceState;
  hooks: BridgeTurnHooks;
  slotsUsed: number;
  /** Internal: one-shot cap timer handle. */
  capTimer: ReturnType<SetTimeoutFn> | null;
  /** Internal: true between entering closing and forced teardown. */
  draining: boolean;
  /** Internal: forced teardown has run. */
  forcedRan: boolean;
  /** Internal: the settled notification has fired; exactly once per turn. */
  settledRan: boolean;
  /**
   * In-flight public-to-loopback request controllers. The proxy registers
   * each fetch here so a forced close (cancel, cap, escalation) aborts both
   * phases of in-flight requests, not just new admissions.
   */
  inflight: Set<AbortController>;
}

export type BridgeRegisterResult =
  | { ok: true; entry: BridgeTurnEntry }
  | { ok: false; reason: "invalid-nonce" | "duplicate" | "invalid-target" | "at-cap" | "capacity" };

export type SetTimeoutFn = (fn: () => void, ms: number) => ReturnType<typeof setTimeout>;
export type ClearTimeoutFn = typeof clearTimeout;

export interface BridgeRegistryClock {
  now: () => number;
  setTimeout: SetTimeoutFn;
  clearTimeout: ClearTimeoutFn;
}

export interface BridgeRegistryOptions {
  clock?: BridgeRegistryClock;
  /** Test hook: reaper interval override. */
  reaperIntervalMs?: number;
}

function defaultClock(): BridgeRegistryClock {
  // Unref'd timers: a registry timer must never hold the process open during
  // teardown (the reaper is recursive); production is long-lived regardless.
  return {
    now: () => Date.now(),
    setTimeout: (fn, ms) => {
      const timer = setTimeout(fn, ms);
      timer.unref?.();
      return timer;
    },
    clearTimeout,
  };
}

/** 128 bits from a CSPRNG, URL-safe base64, exactly 22 characters. */
export function generateBridgeNonce(): string {
  return randomBytes(16).toString("base64url");
}

/** Independent random bearer challenge; format is not constrained by the wire. */
export function generateBridgeChallenge(): string {
  return randomBytes(32).toString("base64url");
}

export function extractBridgeNonce(pathname: string): string | null {
  const match = BRIDGE_ROUTE_PATTERN.exec(pathname);
  return match ? match[1] : null;
}

/**
 * Registration-time target validation (spec registry rules and test 7/8).
 * The target is the executor-supplied loopback URL; anything that is not
 * exactly `http://127.0.0.1:<ephemeral>` is refused.
 */
export function validateBridgeTarget(rawUrl: string): { ok: true; port: number } | { ok: false } {
  // Canonical-form gate first: the spec refuses anything that is not exactly
  // `http://127.0.0.1:<port>`. WHATWG URL parsing would canonicalize
  // non-canonical spellings (127.1, 127.0.0.01) to 127.0.0.1, so the raw
  // string must be gated before parsing to keep the target set exact.
  if (!/^http:\/\/127\.0\.0\.1:[0-9]+$/.test(rawUrl)) return { ok: false };
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return { ok: false };
  }
  if (parsed.protocol !== "http:") return { ok: false };
  // URL#hostname strips brackets; an IPv6 literal therefore does not equal
  // the dotted-quad loopback and is rejected here.
  if (parsed.hostname !== "127.0.0.1") return { ok: false };
  const port = Number(parsed.port);
  if (!Number.isInteger(port) || port < 1 || port > 65535) return { ok: false };
  if (BRIDGE_RESERVED_PORTS.has(port)) return { ok: false };
  if (parsed.username || parsed.password) return { ok: false };
  if (parsed.search || parsed.hash) return { ok: false };
  return { ok: true, port };
}

/** Constant-time challenge token comparison; length mismatch is a plain miss. */
export function challengeTokenConstantTimeEqual(
  presented: string | null | undefined,
  challenge: string
): boolean {
  if (!presented || presented.length !== challenge.length) return false;
  const a = Buffer.from(presented, "utf8");
  const b = Buffer.from(challenge, "utf8");
  const ok = timingSafeEqual(a, b);
  // Best-effort zeroization of the comparison copies. The source strings
  // themselves live as long as the entry and the request headers do; a
  // runtime with true secret strings would need a different challenge
  // representation altogether.
  a.fill(0);
  b.fill(0);
  return ok;
}

/** Constant-time bearer challenge comparison; length mismatch is a plain miss. */
export function challengeMatches(entry: BridgeTurnEntry, presented: string | null | undefined): boolean {
  return challengeTokenConstantTimeEqual(presented, entry.challenge);
}

export type BridgeLookup =
  | { kind: "active"; entry: BridgeTurnEntry }
  | { kind: "closed-replay"; entry: BridgeTurnEntry }
  | { kind: "unknown" };

export class GrokBotBridgeRegistry {
  private readonly clock: BridgeRegistryClock;
  private readonly reaperIntervalMs: number;
  private readonly active = new Map<string, BridgeTurnEntry>();
  private readonly activeClose = new Map<string, BridgeTurnEntry>();
  private readonly tombstones = new Map<string, BridgeTurnEntry>();
  private reaperTimer: ReturnType<SetTimeoutFn> | null = null;

  constructor(options: BridgeRegistryOptions = {}) {
    this.clock = options.clock ?? defaultClock();
    this.reaperIntervalMs = options.reaperIntervalMs ?? BRIDGE_REAPER_INTERVAL_MS;
  }

  /** Combined live-entry count; the 100-session budget counts both maps. */
  get combinedCount(): number {
    return this.active.size + this.activeClose.size;
  }

  get activeCount(): number {
    return this.active.size;
  }

  get activeCloseCount(): number {
    return this.activeClose.size;
  }

  get tombstoneCount(): number {
    return this.tombstones.size;
  }

  /**
   * Synchronous critical section: nonce validation, absolute-cap re-check
   * against createdAt, combined-capacity check, insert, cap-timer schedule.
   * A refusal returns the reason; the caller closes the just-started local
   * server before surfacing the refusal (lifecycle step 3).
   */
  register(input: BridgeTurnInput): BridgeRegisterResult {
    if (!BRIDGE_NONCE_PATTERN.test(input.nonce)) {
      return { ok: false, reason: "invalid-nonce" };
    }
    const target = validateBridgeTarget(`http://127.0.0.1:${input.port}`);
    if (!target.ok || target.port !== input.port) {
      return { ok: false, reason: "invalid-target" };
    }
    const now = this.clock.now();
    // Registration-time cap re-check: a turn whose bind was slow can never
    // outlive its cap through a late registration.
    if (now >= input.createdAt + bridgeAbsoluteCapMs()) {
      return { ok: false, reason: "at-cap" };
    }
    if (this.combinedCount >= BRIDGE_MAX_ACTIVE_SESSIONS) {
      return { ok: false, reason: "capacity" };
    }
    if (this.active.has(input.nonce) || this.activeClose.has(input.nonce)) {
      return { ok: false, reason: "duplicate" };
    }
    const entry: BridgeTurnEntry = {
      nonce: input.nonce,
      port: input.port,
      createdAt: input.createdAt,
      expiryAt: now + BRIDGE_IDLE_TTL_MS,
      challenge: input.challenge,
      state: "active",
      hooks: input.hooks,
      slotsUsed: 0,
      capTimer: null,
      draining: false,
      forcedRan: false,
      settledRan: false,
      inflight: new Set(),
    };
    this.active.set(entry.nonce, entry);
    const capDelay = Math.max(0, input.createdAt + bridgeAbsoluteCapMs() - now);
    entry.capTimer = this.clock.setTimeout(() => {
      try {
        this.close(entry.nonce, "cap");
      } catch {
        // A throwing hook must not escape the cap-timer callback (an uncaught
        // timer exception takes down the process). The cap is a best-effort
        // escalation trigger; the sweep re-attempts expiry paths on its own
        // schedule.
      }
    }, capDelay);
    return { ok: true, entry };
  }

  /** Registry lookup order: active map, then active-close map, then tombstones. */
  lookup(nonce: string): BridgeLookup {
    const live = this.active.get(nonce);
    if (live) return { kind: "active", entry: live };
    const closing = this.activeClose.get(nonce);
    if (closing) return { kind: "closed-replay", entry: closing };
    const tomb = this.tombstones.get(nonce);
    if (tomb) return { kind: "closed-replay", entry: tomb };
    return { kind: "unknown" };
  }

  /** True at or after the absolute cap; replay of such a nonce is `404`. */
  isOverCap(entry: BridgeTurnEntry): boolean {
    return this.clock.now() >= entry.createdAt + bridgeAbsoluteCapMs();
  }

  /** True at or after the sliding expiry; new requests after expiry are `410`. */
  isExpired(entry: BridgeTurnEntry): boolean {
    return this.clock.now() >= entry.expiryAt;
  }

  /**
   * 等工具结果的期间没有新请求进来，reserveSlot 不会被调，空闲窗口
   * 会在 60 秒到期。这个续期不消耗请求额度，把窗口推到绝对上限，
   * 不超过。已经到上限或已经关闭的不续。
   */
  holdUntilCap(entry: BridgeTurnEntry): boolean {
    if (entry.state !== "active") return false;
    const capAt = entry.createdAt + bridgeAbsoluteCapMs();
    if (this.clock.now() >= capAt) return false;
    entry.expiryAt = capAt;
    return true;
  }

  /**
   * Atomic slot reservation after the challenge check and before the body
   * is read. Successful reservations extend the sliding TTL by 60 seconds.
   * Slots are consumed exactly once and never refunded.
   */
  reserveSlot(entry: BridgeTurnEntry): boolean {
    if (entry.state !== "active") return false;
    if (entry.slotsUsed >= bridgeMaxRequestsPerNonce()) return false;
    entry.slotsUsed += 1;
    entry.expiryAt = this.clock.now() + BRIDGE_IDLE_TTL_MS;
    return true;
  }

  /**
   * Idempotent close; the first trigger claims the closing transition.
   * `normal` and `reaper-expiry` drain first (30-second budget, executor
   * owned); `cap`, `cancel`, and `forced` tear down immediately and
   * preempt an in-progress drain. Returns true for the claimer.
   */
  close(nonce: string, reason: BridgeCloseReason): boolean {
    const entry = this.active.get(nonce);
    if (!entry) {
      // Already closing: only an escalation to forced while draining is new work.
      const closing = this.activeClose.get(nonce) ?? this.tombstones.get(nonce);
      if (closing?.draining && !closing.forcedRan && this.isForcedReason(reason)) {
        this.runForced(closing, reason);
        this.settleClosed(closing, reason);
        return true;
      }
      return false;
    }
    // The cap timer stays armed on a normal close: if the cap fires while
    // the executor is still draining, the escalation path must run.
    entry.state = "closing";
    entry.draining = true;
    // Atomic move out of the active map. Tombstone when there is room,
    // otherwise the active-close map; either way the combined count is
    // unchanged, so a close is never rejected (registry rule).
    this.active.delete(nonce);
    if (this.tombstones.size < BRIDGE_MAX_TOMBSTONES) {
      entry.state = "tombstone";
      this.tombstones.set(nonce, entry);
    } else {
      this.activeClose.set(nonce, entry);
    }
    if (this.isForcedReason(reason)) {
      this.runForced(entry, reason);
      this.settleClosed(entry, reason);
    } else {
      entry.hooks.onDraining(reason);
    }
    return true;
  }

  private isForcedReason(reason: BridgeCloseReason): boolean {
    return reason === "cap" || reason === "cancel" || reason === "forced";
  }

  /** Forced teardown runs at most once per turn (spec: abort/destroy once). */
  private runForced(entry: BridgeTurnEntry, reason: BridgeCloseReason): void {
    if (entry.forcedRan) return;
    entry.forcedRan = true;
    entry.draining = false;
    if (entry.capTimer) {
      this.clock.clearTimeout(entry.capTimer);
      entry.capTimer = null;
    }
    for (const controller of entry.inflight) controller.abort();
    entry.inflight.clear();
    entry.hooks.onForcedAbort(reason);
  }

  /**
   * Executor notification that local teardown settled (drain finished or
   * escalation consumed). Fires onLocallyClosed exactly once per turn:
   * a late executor settle after an escalation, or any double-settle, is
   * a no-op.
   */
  settleClosed(entry: BridgeTurnEntry, reason: BridgeCloseReason): void {
    if (entry.settledRan) return;
    entry.settledRan = true;
    entry.draining = false;
    entry.hooks.onLocallyClosed(reason);
  }

  /**
   * Escalate a draining close to forced (cap timer, cancel, or forced abort
   * arriving mid-drain). Preempts the drain budget.
   */
  escalate(nonce: string, reason: BridgeCloseReason): boolean {
    const entry = this.activeClose.get(nonce) ?? this.tombstones.get(nonce);
    if (!entry || entry.forcedRan) return false;
    this.runForced(entry, reason);
    this.settleClosed(entry, reason);
    return true;
  }

  /**
   * One reaper sweep (spec registry rule). Removes capped tombstones before
   * converting capped active-close entries; closes expired active entries
   * through the normal close path; never evicts an unexpired tombstone and
   * never evicts an active-close entry before the cap.
   */
  sweep(): void {
    const now = this.clock.now();
    for (const [nonce, entry] of this.tombstones) {
      if (now >= entry.createdAt + bridgeAbsoluteCapMs()) {
        if (entry.capTimer) {
          this.clock.clearTimeout(entry.capTimer);
          entry.capTimer = null;
        }
        this.tombstones.delete(nonce);
      }
    }
    for (const [nonce, entry] of this.activeClose) {
      if (now >= entry.createdAt + bridgeAbsoluteCapMs()) {
        this.activeClose.delete(nonce);
        // The registration-time cap timer must not outlive the promotion;
        // a dangling ref'd timer would hold the process up to the remainder
        // of the 5-minute window after teardown.
        if (entry.capTimer) {
          this.clock.clearTimeout(entry.capTimer);
          entry.capTimer = null;
        }
        if (this.tombstones.size < BRIDGE_MAX_TOMBSTONES) {
          entry.state = "tombstone";
          this.tombstones.set(nonce, entry);
        }
        // Tombstone list full: drop; replay at/after cap is `404` either way.
      }
    }
    for (const [nonce, entry] of this.active) {
      if (now >= entry.expiryAt) {
        try {
          this.close(nonce, "reaper-expiry");
        } catch {
          // A throwing hook must not kill the reaper timer callback (an
          // uncaught timer exception takes down the process) or stall the
          // reaper. The close claim itself is idempotent, so the entry is
          // retried on the next sweep.
        }
      }
    }
  }

  startReaper(): void {
    if (this.reaperTimer) return;
    this.reaperTimer = this.clock.setTimeout(() => {
      this.sweep();
      this.reaperTimer = null;
      this.startReaper();
    }, this.reaperIntervalMs);
  }

  stopReaper(): void {
    if (this.reaperTimer) {
      this.clock.clearTimeout(this.reaperTimer);
      this.reaperTimer = null;
    }
  }

  /** Test support: drop all state and cancel timers. */
  reset(): void {
    this.stopReaper();
    for (const collection of [this.active, this.activeClose, this.tombstones]) {
      for (const entry of collection.values()) {
        if (entry.capTimer) this.clock.clearTimeout(entry.capTimer);
      }
    }
    this.active.clear();
    this.activeClose.clear();
    this.tombstones.clear();
  }
}

type GlobalWithRegistry = typeof globalThis & {
  __omnirouteGrokBotBridgeRegistry?: GrokBotBridgeRegistry;
};

/**
 * Process-wide singleton. Hung on globalThis so the executor bundle and the
 * app-route bundle share one registry inside the single production process
 * (deployment limit: single instance; spec non-goals).
 */
export function getGrokBotBridgeRegistry(): GrokBotBridgeRegistry {
  const g = globalThis as GlobalWithRegistry;
  if (!g.__omnirouteGrokBotBridgeRegistry) {
    g.__omnirouteGrokBotBridgeRegistry = new GrokBotBridgeRegistry();
    g.__omnirouteGrokBotBridgeRegistry.startReaper();
  }
  return g.__omnirouteGrokBotBridgeRegistry;
}
