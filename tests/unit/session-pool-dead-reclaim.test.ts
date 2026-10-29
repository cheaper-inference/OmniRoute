import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { SessionPool } from "../../open-sse/services/sessionPool/sessionPool.ts";
import { DEFAULT_POOL_CONFIG } from "../../open-sse/services/sessionPool/types.ts";
import type { PoolConfig } from "../../open-sse/services/sessionPool/types.ts";

const RECLAIM_CONFIG: PoolConfig = {
  ...DEFAULT_POOL_CONFIG,
  cooldownBase: 50,
  cooldownMax: 200,
  cooldownJitter: 10,
  minSessions: 0,
  maxSessions: 5,
};

function killReleased(pool: SessionPool, count: number): void {
  for (let i = 0; i < count; i++) {
    const s = pool.acquire();
    assert.notEqual(s, null);
    pool.reportDead(s!);
    s!.release();
  }
}

describe("dead session reclaim on acquire", () => {
  it("serves a fresh session when every session is dead at the ceiling", async (t) => {
    const pool = new SessionPool("test-provider", RECLAIM_CONFIG);
    t.after(() => {
      for (const s of (pool as unknown as { sessions: { inflight: number; release(): void }[] })
        .sessions ?? []) {
        while (s.inflight > 0) s.release();
      }
    });
    await pool.warmUp(5);
    killReleased(pool, 5);
    assert.equal(pool.deadCount, 5);

    const fresh = pool.acquire();
    try {
      assert.notEqual(fresh, null);
      assert.equal(pool.deadCount, 0);
      assert.equal(pool.totalCount, 5 - 5 + 1);
      assert.ok(pool.totalCount <= RECLAIM_CONFIG.maxSessions);
    } finally {
      fresh?.release();
    }

    const poolB = new SessionPool("test-provider", { ...RECLAIM_CONFIG, maxSessions: 1 });
    t.after(() => {
      for (const s of (poolB as unknown as { sessions: { inflight: number; release(): void }[] })
        .sessions ?? []) {
        while (s.inflight > 0) s.release();
      }
    });
    await poolB.warmUp(5);
    killReleased(poolB, 1);
    const freshB = poolB.acquire();
    try {
      assert.notEqual(freshB, null);
      assert.equal(poolB.deadCount, 0);
      assert.equal(poolB.totalCount, 1 - 1 + 1);
    } finally {
      freshB?.release();
    }
  });

  it("drops dead sessions below the ceiling on acquire", async (t) => {
    const pool = new SessionPool("test-provider", RECLAIM_CONFIG);
    t.after(() => {
      for (const s of (pool as unknown as { sessions: { inflight: number; release(): void }[] })
        .sessions ?? []) {
        while (s.inflight > 0) s.release();
      }
    });
    await pool.warmUp(2);
    killReleased(pool, 2);
    assert.equal(pool.deadCount, 2);

    const fresh = pool.acquire();
    try {
      assert.notEqual(fresh, null);
      assert.equal(pool.deadCount, 0);
    } finally {
      fresh?.release();
    }
  });

  it("never reclaims a dead session with inflight requests", async (t) => {
    const pool = new SessionPool("test-provider", RECLAIM_CONFIG);
    t.after(() => {
      for (const s of (pool as unknown as { sessions: { inflight: number; release(): void }[] })
        .sessions ?? []) {
        while (s.inflight > 0) s.release();
      }
    });
    await pool.warmUp(5);
    const loaned = [];
    for (let i = 0; i < 5; i++) {
      const s = pool.acquire();
      assert.notEqual(s, null);
      loaned.push(s!);
    }
    for (const s of loaned) pool.reportDead(s);

    try {
      const blocked = pool.acquire();
      assert.equal(blocked, null);
      assert.equal(pool.deadCount, 5);
      assert.equal(pool.totalCount, 5);
    } finally {
      for (const s of loaned) s.release();
    }

    const fresh = pool.acquire();
    try {
      assert.notEqual(fresh, null);
      assert.equal(pool.deadCount, 0);
      assert.equal(pool.totalCount, 5 - 5 + 1);
      assert.ok(pool.totalCount <= RECLAIM_CONFIG.maxSessions);
    } finally {
      fresh?.release();
    }
  });

  it("pruneDeadSessions keeps loaned dead sessions and drops released ones", async (t) => {
    const pool = new SessionPool("test-provider", RECLAIM_CONFIG);
    t.after(() => {
      for (const s of (pool as unknown as { sessions: { inflight: number; release(): void }[] })
        .sessions ?? []) {
        while (s.inflight > 0) s.release();
      }
    });
    await pool.warmUp(3);
    const loaned = pool.acquire()!;
    pool.reportDead(loaned);
    const released = pool.acquire()!;
    pool.reportDead(released);
    released.release();
    const healthy = pool.acquire()!;
    pool.reportSuccess(healthy);
    healthy.release();

    try {
      pool.pruneDeadSessions();
      assert.equal(pool.totalCount, 2);
      assert.equal(pool.deadCount, 1);
    } finally {
      loaned.release();
    }

    pool.pruneDeadSessions();
    assert.equal(pool.deadCount, 0);
    assert.equal(pool.totalCount, 1);
  });
});
