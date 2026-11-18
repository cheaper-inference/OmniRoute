/**
 * Self-test for tests/_setup/egressGuard.ts.
 *
 * The guard is what lets a test drive an executor with a stubbed `fetch` and be sure nothing
 * else dials out, so it has to prove two things: every transport it names really throws while
 * the guard is active, and every original is back afterwards (also when the guarded function
 * throws). The guard throws before any socket, process or request exists, so this file makes
 * no real network call; the 127.0.0.1:9 targets below are never contacted.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import childProcess, { spawn as namedSpawn } from "node:child_process";
import { createRequire } from "node:module";
import http2 from "node:http2";
import Module from "node:module";
import net from "node:net";
import tls from "node:tls";
import {
  EGRESS_BLOCKED,
  clearEgressHits,
  egressHits,
  installEgressGuard,
  loadedWreqBindings,
  withEgressGuard,
} from "../_setup/egressGuard.ts";

type Json = Record<string, unknown>;
type Cache = Record<string, { exports?: unknown } | undefined>;
const loader = Module as unknown as { _cache: Cache };
const BLOCKED = new RegExp(EGRESS_BLOCKED);
const require = createRequire(import.meta.url);

const CHILD_PROCESS_FUNCTIONS = [
  "spawn",
  "spawnSync",
  "exec",
  "execSync",
  "execFile",
  "execFileSync",
  "fork",
] as const;

/** Every patched export with its label, to compare before and after. */
function patchedExports(): Array<[string, unknown]> {
  return [
    ...CHILD_PROCESS_FUNCTIONS.map((key): [string, unknown] => [
      `child_process.${key}`,
      (childProcess as unknown as Json)[key],
    ]),
    ["net.connect", net.connect],
    ["net.createConnection", net.createConnection],
    ["tls.connect", tls.connect],
    ["http2.connect", http2.connect],
    ["globalThis.WebSocket", globalThis.WebSocket],
    ["Module._load", (Module as unknown as Json)._load],
  ];
}

function assertAllRestored(before: Array<[string, unknown]>): void {
  const after = patchedExports();
  for (const [index, [label, original]] of before.entries()) {
    assert.equal(after[index][1], original, `${label} must be the original again`);
  }
}

/** A wreq-js layout in a fake module cache: wrapper plus native binding. */
function fakeWreqCache(binding: Json, withBinding = true): Cache {
  const cache: Cache = { "/repo/node_modules/wreq-js/dist/index.js": { exports: {} } };
  if (withBinding)
    cache["/repo/node_modules/wreq-js/rust/wreq-js.win32-x64-msvc.node"] = { exports: binding };
  return cache;
}

/** Swap Module._cache for a fake one while `run` executes synchronously. */
function withModuleCache<T>(fake: Cache, run: () => T): T {
  const internals = Module as unknown as { _cache: Cache };
  const real = internals._cache;
  internals._cache = fake;
  try {
    return run();
  } finally {
    internals._cache = real;
  }
}

test("egress guard: every child_process function throws inside the guard", async () => {
  clearEgressHits();
  await withEgressGuard(() => {
    for (const key of CHILD_PROCESS_FUNCTIONS) {
      const fn = (childProcess as unknown as Record<string, (...args: unknown[]) => unknown>)[key];
      assert.throws(() => fn("node", ["-v"]), BLOCKED, key);
    }
    // A named ESM import is a live binding, refreshed by syncBuiltinESMExports().
    assert.throws(() => namedSpawn("node", ["-v"]), BLOCKED, "named import of spawn");
  });
  assert.ok(egressHits.includes("child_process.spawn"));
  assert.ok(egressHits.includes("child_process.execFileSync"));
});

test("egress guard: net, tls, http2 and WebSocket throw inside the guard", async () => {
  clearEgressHits();
  await withEgressGuard(() => {
    assert.throws(() => net.connect(9, "127.0.0.1"), BLOCKED, "net.connect");
    assert.throws(() => net.createConnection(9, "127.0.0.1"), BLOCKED, "net.createConnection");
    assert.throws(() => tls.connect(9, "127.0.0.1"), BLOCKED, "tls.connect");
    assert.throws(() => http2.connect("http://127.0.0.1:9"), BLOCKED, "http2.connect");
    assert.throws(() => new WebSocket("ws://127.0.0.1:9"), BLOCKED, "WebSocket");
  });
  assert.deepEqual(
    [...new Set(egressHits)].sort(),
    ["WebSocket", "http2.connect", "net.connect", "net.createConnection", "tls.connect"].sort()
  );
});

test("egress guard: every function of an already-loaded wreq-js binding throws inside the guard", async () => {
  const bindings = loadedWreqBindings(loader._cache);
  await withEgressGuard(() => {
    for (const binding of bindings) {
      for (const key of Object.getOwnPropertyNames(binding)) {
        if (typeof binding[key] !== "function") continue;
        assert.throws(() => (binding[key] as () => void)(), BLOCKED, `wreq ${key}`);
      }
    }
  });
});

test("egress guard: a fake wreq-js binding is blocked inside the guard and restored afterwards", () => {
  const original = () => "real";
  const binding: Json = { fetch: original, createTransport: original, version: "1.0.0" };
  withModuleCache(fakeWreqCache(binding), () => {
    const restore = installEgressGuard();
    try {
      assert.throws(() => (binding.fetch as () => void)(), BLOCKED, "wreq fetch");
      assert.throws(
        () => (binding.createTransport as () => void)(),
        BLOCKED,
        "wreq createTransport"
      );
      assert.equal(binding.version, "1.0.0", "non-function exports are left alone");
    } finally {
      restore();
    }
    assert.equal(binding.fetch, original);
    assert.equal(binding.createTransport, original);
  });
});

test("egress guard: require('wreq-js') is refused inside the guard", async () => {
  await withEgressGuard(() => {
    assert.throws(() => require("wreq-js"), BLOCKED, "wreq-js");
    assert.throws(() => require("@wreq-js/linux-x64-gnu"), BLOCKED, "scoped binding package");
  });
});

test("egress guard: it fails closed when wreq-js is loaded but its binding is not in the cache", () => {
  const before = patchedExports();
  withModuleCache(fakeWreqCache({}, false), () => {
    assert.throws(() => loadedWreqBindings(loader._cache), /native binding is not in the cache/);
    assert.throws(() => installEgressGuard(), BLOCKED);
  });
  // Nothing was patched on the way to the failure.
  assertAllRestored(before);
});

test("egress guard: every original is restored after the guarded function returns", async () => {
  const before = patchedExports();
  const fetchBefore = globalThis.fetch;
  await withEgressGuard(async () => {
    assert.notEqual(childProcess.spawn, before[0][1], "patched while active");
  });
  assertAllRestored(before);
  assert.equal(globalThis.fetch, fetchBefore, "the guard never touches fetch");
});

test("egress guard: every original is restored when the guarded function throws", async () => {
  const before = patchedExports();
  const failure = new Error("boom from the guarded function");
  await assert.rejects(
    withEgressGuard(async () => {
      assert.throws(() => net.connect(9, "127.0.0.1"), BLOCKED);
      throw failure;
    }),
    (error) => error === failure
  );
  assertAllRestored(before);
  // A synchronous throw is restored too.
  await assert.rejects(
    withEgressGuard(() => {
      throw failure;
    }),
    (error) => error === failure
  );
  assertAllRestored(before);
});

test("egress guard: the restore function from installEgressGuard is idempotent", () => {
  const before = patchedExports();
  const restore = installEgressGuard();
  assert.throws(() => tls.connect(9, "127.0.0.1"), BLOCKED);
  restore();
  const afterFirst = patchedExports();
  restore();
  assertAllRestored(before);
  assertAllRestored(afterFirst);
});

test("egress guard: nested guards restore to the outer guard, then to the originals", async () => {
  const before = patchedExports();
  await withEgressGuard(async () => {
    const outer = patchedExports();
    await withEgressGuard(() => {
      assert.throws(() => net.connect(9, "127.0.0.1"), BLOCKED);
    });
    assertAllRestored(outer);
    assert.throws(() => net.connect(9, "127.0.0.1"), BLOCKED, "still guarded by the outer guard");
  });
  assertAllRestored(before);
});
