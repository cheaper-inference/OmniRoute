import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

const {
  GrokBotBridgeRegistry,
  generateBridgeNonce,
  generateBridgeChallenge,
  extractBridgeNonce,
  validateBridgeTarget,
  challengeMatches,
  BRIDGE_ABSOLUTE_CAP_MS,
  BRIDGE_IDLE_TTL_MS,
  BRIDGE_MAX_ACTIVE_SESSIONS,
  bridgeMaxRequestsPerNonce,
  BRIDGE_MAX_TOMBSTONES,
  BRIDGE_NONCE_PATTERN,
} = await import("../../open-sse/services/grokBotBridgeRegistry.ts");

type TimerFn = () => void;

type FakeClock = {
  now: () => number;
  advance: (ms: number) => void;
  setTimeout: (fn: TimerFn, ms: number) => number;
  clearTimeout: (id: number) => void;
  pendingTimers: () => number;
};

function makeFakeClock(start = 1_000_000_000): FakeClock {
  let now = start;
  let nextId = 1;
  const timers = new Map<number, { due: number; fn: TimerFn }>();
  const runDue = () => {
    let guard = 0;
    for (;;) {
      let earliest: { id: number; due: number; fn: TimerFn } | null = null;
      for (const [id, t] of timers) {
        if (t.due <= now && (!earliest || t.due < earliest.due)) {
          earliest = { id, ...t };
        }
      }
      if (!earliest) return;
      timers.delete(earliest.id);
      earliest.fn();
      guard += 1;
      assert.ok(guard < 10_000, "runaway timer loop");
    }
  };
  return {
    now: () => now,
    advance: (ms: number) => {
      now += ms;
      runDue();
    },
    setTimeout: (fn: TimerFn, ms: number) => {
      const id = nextId++;
      timers.set(id, { due: now + ms, fn });
      return id;
    },
    clearTimeout: (id: number) => {
      timers.delete(id);
    },
    pendingTimers: () => timers.size,
  };
}

type HookLog = {
  draining: string[];
  forced: string[];
  closed: string[];
};

function makeHooks(log: HookLog) {
  return {
    onDraining: (reason: string) => log.draining.push(reason),
    onForcedAbort: (reason: string) => log.forced.push(reason),
    onLocallyClosed: (reason: string) => log.closed.push(reason),
  };
}

let nextRegPort = 40000;

function reserveRegPort(): number {
  // Registry tests never bind the port; it is data, not a socket. A plain
  // deterministic counter avoids the released-port reuse race that a
  // bind-and-release reservation leaves behind under parallel CI.
  nextRegPort += 1;
  return nextRegPort;
}

function regInput(clock: FakeClock, overrides: Record<string, unknown> = {}) {
  return {
    nonce: generateBridgeNonce(),
    port: reserveRegPort(),
    createdAt: clock.now(),
    challenge: generateBridgeChallenge(),
    hooks: makeHooks({ draining: [], forced: [], closed: [] }),
    ...overrides,
  };
}

describe("bridge nonce and target validation", () => {
  it("generates 22-char URL-safe nonces with CSPRNG diversity", () => {
    const seen = new Set<string>();
    for (let i = 0; i < 200; i++) {
      const nonce = generateBridgeNonce();
      assert.match(nonce, BRIDGE_NONCE_PATTERN);
      seen.add(nonce);
    }
    assert.equal(seen.size, 200);
  });

  it("extracts the nonce only for the exact two-segment bridge path", () => {
    const nonce = generateBridgeNonce();
    assert.equal(extractBridgeNonce(`/grok-bridge/${nonce}/mcp`), nonce);
    assert.equal(extractBridgeNonce("/grok-bridge/short/mcp"), null);
    assert.equal(extractBridgeNonce(`/grok-bridge/${nonce}`), null);
    assert.equal(extractBridgeNonce(`/grok-bridge/${nonce}/mcp/extra`), null);
    assert.equal(extractBridgeNonce(`/api/grok-bridge/${nonce}/mcp`), null);
  });

  it("accepts exactly http://127.0.0.1:<port>", () => {
    const ok = validateBridgeTarget("http://127.0.0.1:52345");
    assert.deepEqual(ok, { ok: true, port: 52345 });
  });

  it("rejects non-canonical IPv4 spellings that WHATWG would normalize (127.1, 127.0.0.01)", () => {
    // Spec: refuse anything that is not exactly http://127.0.0.1:<port>.
    // WHATWG URL canonicalizes these forms to 127.0.0.1; the raw-form gate
    // runs before parsing so canonicalization cannot widen the target set.
    assert.equal(validateBridgeTarget("http://127.1:52345").ok, false);
    assert.equal(validateBridgeTarget("http://127.0.0.01:52345").ok, false);
  });

  it("rejects non-HTTP, non-loopback, metadata, private, IPv6, userinfo, and query targets", () => {
    for (const bad of [
      "https://127.0.0.1:52345",
      "http://localhost:52345",
      "http://0.0.0.0:52345",
      "http://10.0.0.5:52345",
      "http://172.16.0.1:52345",
      "http://192.168.1.1:52345",
      "http://169.254.169.254:52345",
      "http://[::1]:52345",
      "http://127.0.0.1:52345?x=1",
      "http://user@127.0.0.1:52345",
      "ftp://127.0.0.1:52345",
      "not-a-url",
    ]) {
      assert.equal(validateBridgeTarget(bad).ok, false, `should reject ${bad}`);
    }
  });

  it("rejects reserved ports 20128 and 20130", () => {
    assert.equal(validateBridgeTarget("http://127.0.0.1:20128").ok, false);
    assert.equal(validateBridgeTarget("http://127.0.0.1:20130").ok, false);
  });

  it("compares challenges in constant-time shape: mismatch and length leak are plain misses", () => {
    const challenge = generateBridgeChallenge();
    const entry = { challenge } as never;
    assert.equal(challengeMatches(entry, challenge), true);
    assert.equal(challengeMatches(entry, challenge.slice(0, -1) + "X"), false);
    assert.equal(challengeMatches(entry, challenge.slice(0, -1)), false);
    assert.equal(challengeMatches(entry, null), false);
    assert.equal(challengeMatches(entry, ""), false);
  });
});

describe("bridge registry lifecycle", () => {
  let clock: FakeClock;
  let registry: InstanceType<typeof GrokBotBridgeRegistry>;

  beforeEach(() => {
    clock = makeFakeClock();
    registry = new GrokBotBridgeRegistry({ clock });
  });

  it("registers, looks up active, and rejects an unknown nonce", () => {
    const input = regInput(clock);
    const result = registry.register(input);
    assert.equal(result.ok, true);
    const lookup = registry.lookup(input.nonce);
    assert.equal(lookup.kind, "active");
    if (lookup.kind === "active") {
      assert.equal(lookup.entry.port, input.port);
      assert.equal(lookup.entry.challenge, input.challenge);
    }
    assert.equal(registry.lookup("A".repeat(22)).kind, "unknown");
  });

  it("reports a duplicate nonce with its own reason, not invalid-nonce", () => {
    const input = regInput(clock);
    assert.equal(registry.register(input).ok, true);
    const again = registry.register(input);
    assert.equal(again.ok, false);
    if (!again.ok) {
      assert.equal(again.reason, "duplicate");
    }
  });

  it("rejects a malformed nonce at registration", () => {
    const result = registry.register(regInput(clock, { nonce: "too-short" }));
    assert.deepEqual(result, { ok: false, reason: "invalid-nonce" });
  });

  it("refuses registration at or after the absolute cap (late-bind race)", () => {
    const result = registry.register(
      regInput(clock, { createdAt: clock.now() - BRIDGE_ABSOLUTE_CAP_MS - 1 })
    );
    assert.deepEqual(result, { ok: false, reason: "at-cap" });
    assert.equal(registry.combinedCount, 0);
  });

  it("the cap timer forcibly closes an active turn exactly at createdAt+5min, once", () => {
    const log = { draining: [], forced: [], closed: [] };
    const input = regInput(clock, { hooks: makeHooks(log) });
    const result = registry.register(input);
    assert.equal(result.ok, true);
    clock.advance(BRIDGE_ABSOLUTE_CAP_MS - 1);
    assert.equal(registry.lookup(input.nonce).kind, "active");
    clock.advance(1);
    assert.deepEqual(log.forced, ["cap"]);
    assert.equal(log.forced.length, 1);
    assert.equal(registry.activeCount, 0);
    assert.equal(registry.lookup(input.nonce).kind, "closed-replay");
    // A second close attempt claims nothing new.
    assert.equal(registry.close(input.nonce, "cap"), false);
    assert.equal(log.forced.length, 1);
  });

  it("rejects session 101 while keeping sessions 1-100 registered", () => {
    for (let i = 0; i < BRIDGE_MAX_ACTIVE_SESSIONS; i++) {
      assert.equal(registry.register(regInput(clock)).ok, true);
    }
    assert.equal(registry.combinedCount, 100);
    const rejected = registry.register(regInput(clock));
    assert.deepEqual(rejected, { ok: false, reason: "capacity" });
    assert.equal(registry.combinedCount, 100);
    assert.equal(registry.activeCount, 100);
  });

  it("capacity counts active-close entries too", () => {
    // Fill the tombstone table so subsequent closes land in active-close.
    for (let i = 0; i < 1000; i++) {
      const input = regInput(clock);
      registry.register(input);
      registry.close(input.nonce, "normal");
      clock.advance(1);
    }
    assert.equal(registry.tombstoneCount, 1000);
    assert.equal(registry.activeCloseCount, 0);
    // 50 active + 50 closed-into-active-close fill the 100-session budget;
    // the rejection below must come from the combined count, not active alone.
    for (let i = 0; i < 50; i++) {
      assert.equal(registry.register(regInput(clock)).ok, true);
    }
    for (let i = 0; i < 50; i++) {
      const input = regInput(clock);
      assert.equal(registry.register(input).ok, true);
      assert.equal(registry.close(input.nonce, "normal"), true);
    }
    assert.equal(registry.activeCount, 50);
    assert.equal(registry.activeCloseCount, 50);
    assert.equal(registry.register(regInput(clock)).ok, false, "combined budget exhausted");
  });

  it("closing is never rejected and lands in active-close when tombstones are full", () => {
    for (let i = 0; i < 1000; i++) {
      const input = regInput(clock);
      registry.register(input);
      registry.close(input.nonce, "normal");
      clock.advance(1);
    }
    const input = regInput(clock);
    registry.register(input);
    assert.equal(registry.close(input.nonce, "normal"), true);
    assert.equal(registry.tombstoneCount, 1000);
    assert.equal(registry.activeCloseCount, 1);
    assert.equal(registry.lookup(input.nonce).kind, "closed-replay");
    // Replay is a 410 window before the cap.
    const lookup = registry.lookup(input.nonce);
    if (lookup.kind === "closed-replay") {
      assert.equal(registry.isOverCap(lookup.entry), false);
    }
  });

  it("atomic slot reservation: fills the budget, consumed once, extends sliding TTL", () => {
    const input = regInput(clock);
    registry.register(input);
    const entry = (registry.lookup(input.nonce) as { entry: { slotsUsed: number; expiryAt: number } }).entry;
    const expiry0 = entry.expiryAt;
    clock.advance(1000);
    for (let i = 0; i < bridgeMaxRequestsPerNonce(); i++) {
      assert.equal(registry.reserveSlot(entry as never), true);
    }
    assert.equal(entry.slotsUsed, bridgeMaxRequestsPerNonce());
    assert.equal(registry.reserveSlot(entry as never), false);
    assert.equal(entry.slotsUsed, bridgeMaxRequestsPerNonce(), "slots are never refunded");
    assert.ok(entry.expiryAt > expiry0, "successful reservation renews sliding TTL");
  });

  it("holds the idle window to the absolute cap without consuming a slot", () => {
    const input = regInput(clock);
    registry.register(input);
    const entry = (registry.lookup(input.nonce) as { entry: { slotsUsed: number; expiryAt: number; createdAt: number } }).entry;
    const slots = entry.slotsUsed;
    assert.equal(registry.holdUntilCap(entry as never), true);
    assert.equal(entry.slotsUsed, slots, "holding consumes no request slot");
    assert.equal(entry.expiryAt, entry.createdAt + 5 * 60_000);
    registry.close(input.nonce, "normal");
    const closed = registry.lookup(input.nonce);
    if (closed.kind === "closed-replay") {
      assert.equal(registry.holdUntilCap(closed.entry as never), false);
    }
  });

  it("reads the absolute cap from the environment", async () => {
    const { bridgeAbsoluteCapMs } = await import("../../open-sse/services/grokBotBridgeRegistry.ts");
    const previous = process.env.GROK_BOT_BRIDGE_ABSOLUTE_CAP_MS;
    try {
      delete process.env.GROK_BOT_BRIDGE_ABSOLUTE_CAP_MS;
      assert.equal(bridgeAbsoluteCapMs(), 5 * 60_000);
      process.env.GROK_BOT_BRIDGE_ABSOLUTE_CAP_MS = "120000";
      assert.equal(bridgeAbsoluteCapMs(), 120_000);
      process.env.GROK_BOT_BRIDGE_ABSOLUTE_CAP_MS = "not-a-number";
      assert.equal(bridgeAbsoluteCapMs(), 5 * 60_000);
    } finally {
      if (previous === undefined) delete process.env.GROK_BOT_BRIDGE_ABSOLUTE_CAP_MS;
      else process.env.GROK_BOT_BRIDGE_ABSOLUTE_CAP_MS = previous;
    }
  });

  it("reservation fails once the turn is closing", () => {
    const input = regInput(clock);
    registry.register(input);
    registry.close(input.nonce, "normal");
    const lookup = registry.lookup(input.nonce);
    if (lookup.kind === "closed-replay") {
      assert.equal(registry.reserveSlot(lookup.entry), false);
    }
  });

  it("sliding TTL: renewal keeps the turn alive past 61s; without it the reaper closes it", () => {
    // No-renewal turn dies at its first 60-second boundary.
    const idle = regInput(clock);
    registry.register(idle);
    clock.advance(BRIDGE_IDLE_TTL_MS + 1000);
    registry.sweep();
    assert.equal(registry.lookup(idle.nonce).kind, "closed-replay");

    // Renewed turn survives four 59-second hops (spec test 15's cadence).
    const renew = regInput(clock);
    registry.register(renew);
    const renewEntry = (registry.lookup(renew.nonce) as { entry: never }).entry;
    for (let i = 0; i < 4; i++) {
      clock.advance(BRIDGE_IDLE_TTL_MS - 1000);
      assert.equal(registry.reserveSlot(renewEntry), true);
    }
    assert.equal(registry.lookup(renew.nonce).kind, "active");
    assert.equal(registry.activeCount, 1, "only the renewed turn survives");
  });

  it("reaper drops registry size to zero after all entries expire", () => {
    for (let i = 0; i < 10; i++) {
      registry.register(regInput(clock));
    }
    clock.advance(BRIDGE_IDLE_TTL_MS + 1);
    registry.sweep();
    assert.equal(registry.activeCount, 0);
    assert.equal(registry.combinedCount, 0);
    assert.equal(registry.tombstoneCount, 10);
  });

  it("replay is 410 before the cap and 404 at/after it, including exactly at cap", () => {
    const input = regInput(clock);
    registry.register(input);
    registry.close(input.nonce, "normal");
    clock.advance(BRIDGE_ABSOLUTE_CAP_MS - 1);
    let lookup = registry.lookup(input.nonce);
    assert.equal(lookup.kind, "closed-replay");
    if (lookup.kind === "closed-replay") {
      assert.equal(registry.isOverCap(lookup.entry), false);
    }
    clock.advance(1);
    lookup = registry.lookup(input.nonce);
    if (lookup.kind === "closed-replay") {
      assert.equal(registry.isOverCap(lookup.entry), true);
    }
    // The reaper then removes the capped tombstone entirely: replay is 404
    // because the nonce is unknown, which is observationally identical.
    registry.sweep();
    assert.equal(registry.lookup(input.nonce).kind, "unknown");
  });

  it("cap wins the race against a registration attempt in the same tick", () => {
    const input = regInput(clock);
    registry.register(input);
    // Fire the cap timer exactly at the boundary, then attempt a late
    // registration with an old createdAt in the same instant.
    clock.advance(BRIDGE_ABSOLUTE_CAP_MS);
    const late = registry.register(
      regInput(clock, { createdAt: clock.now() - BRIDGE_ABSOLUTE_CAP_MS })
    );
    assert.deepEqual(late, { ok: false, reason: "at-cap" });
    assert.equal(registry.activeCount, 0);
  });

  it("forced escalation preempts a drain in progress and runs teardown once", () => {
    const log = { draining: [], forced: [], closed: [] };
    const input = regInput(clock, { hooks: makeHooks(log) });
    registry.register(input);
    registry.close(input.nonce, "normal");
    assert.deepEqual(log.draining, ["normal"]);
    assert.equal(log.forced.length, 0);
    assert.deepEqual(log.closed, [], "no settled notification while draining");
    // Cap arrives mid-drain: forced teardown runs, then the settled
    // notification fires exactly once so the executor can start remote
    // cleanup under its own budget.
    clock.advance(BRIDGE_ABSOLUTE_CAP_MS);
    assert.deepEqual(log.forced, ["cap"]);
    assert.equal(log.forced.length, 1);
    assert.deepEqual(log.closed, ["cap"], "escalation must settle the close");
    assert.equal(registry.escalate(input.nonce, "forced"), false, "no double teardown");
    assert.equal(log.forced.length, 1);
    assert.equal(log.closed.length, 1, "settled notification fires once");
    // The executor's drain finishes after the escalation and settles late:
    // the notification must NOT fire a second time.
    const late = registry.lookup(input.nonce);
    assert.equal(late.kind, "closed-replay");
    if (late.kind === "closed-replay") {
      registry.settleClosed(late.entry, "normal");
    }
    assert.equal(log.closed.length, 1, "late executor settle after escalation is a no-op");
  });

  it("reaper converts capped active-close entries to tombstones after removing capped tombstones", () => {
    // One turn closes into the tombstone list, then ages past the cap.
    const old = regInput(clock);
    registry.register(old);
    registry.close(old.nonce, "normal");
    clock.advance(BRIDGE_ABSOLUTE_CAP_MS + 1);
    // Fill the tombstone list with fresh entries so the old capped tombstone
    // must be evicted by the sweep before any conversion needs room.
    for (let i = 0; i < BRIDGE_MAX_TOMBSTONES; i++) {
      const input = regInput(clock);
      registry.register(input);
      registry.close(input.nonce, "normal");
      clock.advance(1);
    }
    assert.equal(registry.tombstoneCount, BRIDGE_MAX_TOMBSTONES);
    registry.sweep();
    assert.equal(registry.lookup(old.nonce).kind, "unknown", "capped tombstone swept after removal pass");
  });

  it("stop switch clears all timers and state", () => {
    const input = regInput(clock);
    registry.register(input);
    registry.startReaper();
    assert.ok(clock.pendingTimers() >= 2);
    registry.reset();
    assert.equal(clock.pendingTimers(), 0);
    assert.equal(registry.combinedCount, 0);
    assert.equal(registry.tombstoneCount, 0);
  });

  it("a throwing forced hook inside the cap timer does not escape the callback", () => {
    const hooks = {
      onDraining: () => {},
      onForcedAbort: () => {
        throw new Error("forced hook exploded");
      },
      onLocallyClosed: () => {},
    };
    const input = regInput(clock, { hooks });
    registry.register(input);
    // The cap timer fires inside the fake clock's runDue; the throw must be
    // contained there, not propagate to the caller of advance().
    clock.advance(BRIDGE_ABSOLUTE_CAP_MS);
    assert.equal(registry.activeCount, 0, "the close claim still ran");
    // The registry keeps working afterwards.
    const other = regInput(clock);
    assert.equal(registry.register(other).ok, true);
  });

  it("startReaper drives periodic sweeps", () => {
    const idle = regInput(clock);
    registry.register(idle);
    registry.startReaper();
    clock.advance(BRIDGE_IDLE_TTL_MS + 31_000);
    assert.equal(registry.lookup(idle.nonce).kind, "closed-replay");
    registry.stopReaper();
  });

  it("a throwing drain hook during sweep does not kill the reaper or the process", () => {
    const log = { draining: [], forced: [], closed: [] };
    const hooks = {
      ...makeHooks(log),
      onDraining: () => {
        throw new Error("executor hook exploded");
      },
    };
    const input = regInput(clock, { hooks });
    registry.register(input);
    registry.startReaper();
    // Idle expiry fires inside the reaper timer callback; the throwing hook
    // must be contained there.
    clock.advance(BRIDGE_IDLE_TTL_MS + 31_000);
    // The reaper survived and keeps rescheduling.
    assert.ok((registry as unknown as { reaperTimer: unknown }).reaperTimer !== null);
    // A later sweep still closes other entries normally.
    const other = regInput(clock);
    registry.register(other);
    clock.advance(BRIDGE_IDLE_TTL_MS + 31_000);
    assert.equal(registry.lookup(other.nonce).kind, "closed-replay");
    registry.stopReaper();
  });

  it("force-close aborts in-flight request controllers registered on the entry", () => {
    const f = regInput(clock);
    registry.register(f);
    const found = registry.lookup(f.nonce);
    assert.ok(found.kind === "active");
    const controller = new AbortController();
    found.entry.inflight.add(controller);
    registry.close(f.nonce, "cancel");
    assert.equal(controller.signal.aborted, true);
  });
});
