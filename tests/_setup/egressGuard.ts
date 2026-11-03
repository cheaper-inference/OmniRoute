// Test-only egress guard: opt-in, NOT loaded by any --import.
//
// A test that drives code which is supposed to stay in-process (an executor with a stubbed
// `globalThis.fetch`, say) can import this and run inside `withEgressGuard`. While it runs,
// every way out of the process other than `fetch` throws instead of dialing out:
//   - child_process: spawn, spawnSync, exec, execSync, execFile, execFileSync, fork
//   - node:net connect / createConnection, node:tls connect, node:http2 connect
//   - globalThis.WebSocket
//   - the wreq-js native TLS-impersonation client (see below)
// The guard never touches `fetch`: the test stubs that itself.
//
// wreq-js needs two locks. open-sse/utils/tlsClient.ts loads it at import time, and the
// `--import ./open-sse/utils/setupPolyfill.ts` preload imports that module, so when the native
// binding exists for the platform it is already loaded before a test file runs and does its own
// networking in Rust, out of reach of the socket patches. Every function its binding exports is
// replaced for the duration instead, and a `require("wreq-js")` that has not happened yet is
// refused through Module._load. If the wreq-js wrapper is loaded but its binding cannot be found
// in the module cache, the guard throws instead of running unguarded (fail closed).
//
// Everything is restored when `run` settles, including when it throws. The patched exports are
// pushed into the ESM named exports with `syncBuiltinESMExports()` both ways, so
// `import { spawn } from "node:child_process"` sees the guard too.
import childProcess from "node:child_process";
import http2 from "node:http2";
import Module, { syncBuiltinESMExports } from "node:module";
import net from "node:net";
import tls from "node:tls";

/** Marker carried by every error the guard throws. */
export const EGRESS_BLOCKED = "EGRESS_GUARD_BLOCKED";

/** Transports blocked since the last `clearEgressHits()`, as `module.function`. */
export const egressHits: string[] = [];

export function clearEgressHits(): void {
  egressHits.length = 0;
}

type Json = Record<string, unknown>;
type ModuleInternals = {
  _load: (request: string, ...rest: unknown[]) => unknown;
  _cache: Record<string, { exports?: unknown } | undefined>;
};
type Target = readonly [owner: Json, key: string, label: string];

const CHILD_PROCESS_FUNCTIONS = [
  "spawn",
  "spawnSync",
  "exec",
  "execSync",
  "execFile",
  "execFileSync",
  "fork",
];

function blocker(label: string): () => never {
  return () => {
    egressHits.push(label);
    throw new Error(`${EGRESS_BLOCKED}: ${label}`);
  };
}

/**
 * The exports of every loaded wreq-js native binding (`.node` file). Throws when the wrapper
 * is loaded without its binding, because the guard could not cover it.
 */
export function loadedWreqBindings(cache: ModuleInternals["_cache"]): Json[] {
  const files = Object.keys(cache).filter((file) => /[\\/]@?wreq-js[\\/]/i.test(file));
  const bindings = files
    .filter((file) => file.endsWith(".node"))
    .map((file) => cache[file]?.exports)
    .filter((exports): exports is Json => typeof exports === "object" && exports !== null);
  if (files.length > 0 && bindings.length === 0) {
    throw new Error(
      `${EGRESS_BLOCKED}: wreq-js is loaded but its native binding is not in the cache`
    );
  }
  return bindings;
}

function wreqTargets(loader: ModuleInternals): Target[] {
  return loadedWreqBindings(loader._cache).flatMap((binding) =>
    Object.getOwnPropertyNames(binding)
      .filter((key) => typeof binding[key] === "function")
      .map((key): Target => [binding, key, "wreq-js native"])
  );
}

function transportTargets(loader: ModuleInternals): Target[] {
  return [
    ...CHILD_PROCESS_FUNCTIONS.map((key): Target => [
      childProcess as unknown as Json,
      key,
      "child_process",
    ]),
    [net as unknown as Json, "connect", "net"],
    [net as unknown as Json, "createConnection", "net"],
    [tls as unknown as Json, "connect", "tls"],
    [http2 as unknown as Json, "connect", "http2"],
    ...wreqTargets(loader),
  ];
}

/**
 * Block every transport and return the function that puts everything back. Prefer
 * `withEgressGuard`; use this pair when the guarded region spans hooks (before/after).
 * Calling the restore function twice is harmless.
 */
export function installEgressGuard(): () => void {
  const loader = Module as unknown as ModuleInternals;
  // Resolve the targets first: this is the step that can throw (fail closed), and nothing has
  // been patched yet when it does.
  const targets = transportTargets(loader);
  const saved = targets.map(([owner, key]) => [owner, key, owner[key]] as const);
  const originalLoad = loader._load;
  const originalWebSocket = globalThis.WebSocket;

  for (const [owner, key, label] of targets) owner[key] = blocker(`${label}.${key}`);
  loader._load = function (this: unknown, request: string, ...rest: unknown[]) {
    if (/^@?wreq-js(\/|$)/.test(request)) blocker(`require(${request})`)();
    return originalLoad.call(this, request, ...rest);
  };
  globalThis.WebSocket = class {
    constructor() {
      blocker("WebSocket")();
    }
  } as unknown as typeof WebSocket;
  syncBuiltinESMExports();

  let restored = false;
  return () => {
    if (restored) return;
    restored = true;
    for (const [owner, key, value] of saved) owner[key] = value;
    loader._load = originalLoad;
    globalThis.WebSocket = originalWebSocket;
    syncBuiltinESMExports();
  };
}

/** Run `run` with every transport blocked; restore them when it settles or throws. */
export async function withEgressGuard<T>(run: () => Promise<T> | T): Promise<T> {
  const restore = installEgressGuard();
  try {
    return await run();
  } finally {
    restore();
  }
}
