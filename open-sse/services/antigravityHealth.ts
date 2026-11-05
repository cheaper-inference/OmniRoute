import { resolveAntigravityModelId } from "../config/antigravityModelAliases.ts";

export type AntigravityHealthOutcome = "success" | "timeout" | "transport" | "ignored";
type Sample = { at: number; outcome: Exclude<AntigravityHealthOutcome, "ignored"> };
type Entry = {
  connectionId: string;
  model: string;
  samples: Sample[];
  consecutiveTimeouts: number;
  until: number;
  backoff: number;
  recoverySuccesses: number;
  generation: number;
  probe: boolean;
  inflight: number;
  touched: number;
};

export const ANTIGRAVITY_HEALTH_POLICY = Object.freeze({
  minSamples: 8,
  maxSamples: 32,
  windowMs: 300_000,
  timeoutRatio: 0.5,
  consecutiveTimeouts: 3,
  baseCooldownMs: 30_000,
  maxCooldownMs: 300_000,
  recoverySuccesses: 2,
  maxEntries: 1000,
  idleTtlMs: 1_800_000,
});

export function normalizeAntigravityHealthModel(model: string): string {
  const id = model.trim().replace(/^(?:antigravity|agy)\//i, "").toLowerCase();
  // Never retain arbitrary request content in diagnostic state.
  return /^[a-z0-9_.:-]{1,160}$/.test(id) ? resolveAntigravityModelId(id) : "unknown";
}

export interface AntigravityHealthAttempt {
  readonly probe: boolean;
  finish(outcome: AntigravityHealthOutcome): void;
}

/** Process-local, bounded, demand-driven state. No background model calls. */
export class AntigravityHealthTracker {
  private entries = new Map<string, Entry>();
  constructor(private now: () => number = Date.now) {}

  private key(connectionId: string, model: string): string {
    return JSON.stringify([connectionId, normalizeAntigravityHealthModel(model)]);
  }

  private trim(entry: Entry): void {
    entry.samples = entry.samples.filter((sample) => sample.at > this.now() - ANTIGRAVITY_HEALTH_POLICY.windowMs);
    if (entry.samples.length === 0) entry.consecutiveTimeouts = 0;
  }

  private get(connectionId: string, model: string): Entry | null {
    const key = this.key(connectionId, model);
    const existing = this.entries.get(key);
    if (existing) {
      this.trim(existing);
      return existing;
    }
    for (const [id, entry] of this.entries) {
      if (entry.inflight === 0 && this.now() - entry.touched > ANTIGRAVITY_HEALTH_POLICY.idleTtlMs) {
        this.entries.delete(id);
      }
    }
    if (this.entries.size >= ANTIGRAVITY_HEALTH_POLICY.maxEntries) {
      // Never evict an in-flight probe: it would allow a second probe for the same pair.
      const idle = [...this.entries].filter(([, entry]) => entry.inflight === 0)
        .sort((a, b) => a[1].touched - b[1].touched)[0];
      if (!idle) return null;
      this.entries.delete(idle[0]);
    }
    const entry: Entry = {
      connectionId, model: normalizeAntigravityHealthModel(model), samples: [],
      consecutiveTimeouts: 0, until: 0, backoff: 0, recoverySuccesses: 0,
      generation: 0, probe: false, inflight: 0, touched: this.now(),
    };
    this.entries.set(key, entry);
    return entry;
  }

  /** Apply only to a pool that already passed quota, terminal, model and pin rules. */
  candidates<T extends { id: string }>(connections: T[], model: string, forced = false): T[] {
    const healthy: T[] = [];
    const due: T[] = [];
    const open: T[] = [];
    for (const connection of connections) {
      const entry = this.entries.get(this.key(connection.id, model));
      if (!entry || entry.backoff === 0) healthy.push(connection);
      else if (!entry.probe) (entry.until <= this.now() ? due : open).push(connection);
    }
    if (forced) return [...healthy, ...due, ...open].slice(0, 1);
    // Include due probes so priority/round-robin can eventually test recovery.
    if (healthy.length || due.length) return [...healthy, ...due];
    // Availability escape hatch: one real request to the earliest quarantined pair.
    // begin() enforces a single probe even when selectors race.
    return open.sort((a, b) => this.entries.get(this.key(a.id, model))!.until -
      this.entries.get(this.key(b.id, model))!.until).slice(0, 1);
  }

  remainingCooldownMs(connectionId: string, model: string): number {
    return Math.max(0, (this.entries.get(this.key(connectionId, model))?.until ?? 0) - this.now());
  }

  begin(connectionId: string, model: string, allowEarlyProbe = false): AntigravityHealthAttempt | null {
    const entry = this.get(connectionId, model);
    // Capacity overflow fails open without allocating unbounded state.
    if (!entry) return { probe: false, finish() {} };
    const probe = entry.backoff > 0;
    if (entry.probe) return null;
    if (probe && entry.until > this.now() && !allowEarlyProbe) return null;
    if (probe) entry.probe = true;
    entry.inflight++;
    entry.touched = this.now();
    const generation = entry.generation;
    let finished = false;
    return {
      probe,
      finish: (outcome) => {
        if (finished) return;
        finished = true;
        entry.inflight--;
        entry.touched = this.now();
        // An older concurrent success must not undo a newer quarantine.
        if (generation !== entry.generation) return;
        if (probe) entry.probe = false;
        if (outcome === "ignored") return; // 499, quota, auth, local rejection
        this.trim(entry);
        entry.samples.push({ at: this.now(), outcome });
        entry.samples = entry.samples.slice(-ANTIGRAVITY_HEALTH_POLICY.maxSamples);
        entry.consecutiveTimeouts = outcome === "timeout" ? entry.consecutiveTimeouts + 1 : 0;
        if (probe) {
          if (outcome === "success") {
            entry.recoverySuccesses++;
            if (entry.recoverySuccesses >= ANTIGRAVITY_HEALTH_POLICY.recoverySuccesses) {
              entry.backoff = 0;
              entry.until = 0;
              entry.samples = [];
              entry.consecutiveTimeouts = 0;
              entry.generation++;
            } else entry.until = this.now();
          } else this.quarantine(entry);
          return;
        }
        const timeouts = entry.samples.filter((sample) => sample.outcome === "timeout").length;
        if (entry.samples.length >= ANTIGRAVITY_HEALTH_POLICY.minSamples &&
          (timeouts / entry.samples.length >= ANTIGRAVITY_HEALTH_POLICY.timeoutRatio ||
            entry.consecutiveTimeouts >= ANTIGRAVITY_HEALTH_POLICY.consecutiveTimeouts)) {
          this.quarantine(entry);
        }
      },
    };
  }

  private quarantine(entry: Entry): void {
    entry.backoff = Math.min(5, entry.backoff + 1);
    entry.until = this.now() + Math.min(ANTIGRAVITY_HEALTH_POLICY.maxCooldownMs,
      ANTIGRAVITY_HEALTH_POLICY.baseCooldownMs * 2 ** (entry.backoff - 1));
    entry.recoverySuccesses = 0;
    entry.generation++;
    entry.probe = false;
  }

  snapshot(connectionId?: string) {
    return [...this.entries.values()].filter((entry) => !connectionId || entry.connectionId === connectionId)
      .filter((entry) => entry.inflight > 0 || this.now() - entry.touched <= ANTIGRAVITY_HEALTH_POLICY.idleTtlMs)
      .map((entry) => {
        this.trim(entry);
        const timeouts = entry.samples.filter((sample) => sample.outcome === "timeout").length;
        return {
          connectionId: entry.connectionId, model: entry.model,
          state: entry.probe ? "probing" : entry.backoff === 0 ? "healthy" : entry.until > this.now() ? "quarantined" : "half_open",
          reason: entry.backoff > 0 ? "pre_response_timeout_rate" : null,
          samples: entry.samples.length, timeouts,
          transportFailures: entry.samples.filter((sample) => sample.outcome === "transport").length,
          timeoutRatio: entry.samples.length ? timeouts / entry.samples.length : 0,
          consecutiveTimeouts: entry.consecutiveTimeouts,
          cooldownRemainingMs: Math.max(0, entry.until - this.now()),
          backoffLevel: entry.backoff, recoverySuccesses: entry.recoverySuccesses,
          inflight: entry.inflight,
        };
      });
  }
}

/** Opt-in until adaptive account/model quarantine has been validated on a production canary. */
export function isAntigravityAdaptiveHealthEnabled(provider: string): boolean {
  return (provider === "antigravity" || provider === "agy") &&
    process.env.OMNIROUTE_ANTIGRAVITY_ADAPTIVE_HEALTH_ENABLED === "true";
}

export const antigravityHealth = new AntigravityHealthTracker();
