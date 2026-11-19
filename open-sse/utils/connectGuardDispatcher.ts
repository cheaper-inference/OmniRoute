import dns from "node:dns";
import { createRequire } from "node:module";
import { Agent, type Dispatcher } from "undici";
import * as undici from "undici";
import {
  isCloudMetadataHost,
  isPrivateHost,
  type OutboundUrlGuardMode,
} from "@/shared/network/outboundUrlGuard";
import { getDispatcherOptions } from "./proxyDispatcher.ts";
import { stampOwnListenerSelfHop } from "./selfHop.ts";

/**
 * Connect-time outbound guard (DNS-rebinding, GHSA-cmhj-wh2f-9cgx).
 *
 * The string-level URL guard judges a host NAME; the socket then resolves that name again, so an
 * attacker-controlled record can be public for the check and private/metadata for the connect.
 * The dispatcher built here validates the addresses of the very lookup the connection is made
 * with — there is no second lookup to race, and no address is remembered or pinned.
 */

export type ConnectGuardMode = Exclude<OutboundUrlGuardMode, "none">;

export const CONNECT_GUARD_BLOCKED_CODE = "ERR_OUTBOUND_HOST_BLOCKED";

/** True when a failed fetch was refused by the guarded lookup, not by the network. */
export function isConnectGuardRefusal(error: unknown): boolean {
  const failure = error as { code?: unknown; cause?: { code?: unknown } } | null;
  return (
    failure?.code === CONNECT_GUARD_BLOCKED_CODE ||
    failure?.cause?.code === CONNECT_GUARD_BLOCKED_CODE
  );
}

type LookupAddress = { address: string; family: number };
type LookupCallback = (
  err: NodeJS.ErrnoException | null,
  address?: string | LookupAddress[],
  family?: number
) => void;
type LookupImpl = (
  hostname: string,
  options: dns.LookupAllOptions,
  callback: (err: NodeJS.ErrnoException | null, addresses: LookupAddress[]) => void
) => void;

function blockedAddress(guard: ConnectGuardMode, address: string): boolean {
  return guard === "public-only" ? isPrivateHost(address) : isCloudMetadataHost(address);
}

/**
 * `net.connect` `lookup` that refuses to connect when ANY resolved address is blocked by `guard`.
 * Node calls it in one of two shapes (`options.all` set with Happy Eyeballs, or the single-address
 * form); both are honored. `resolve` is injectable so tests need no real DNS.
 */
export function createGuardedLookup(
  guard: ConnectGuardMode,
  // Late-bound so a test that replaces `dns.lookup` after the shared dispatcher exists still wins.
  resolve: LookupImpl = (hostname, options, callback) => dns.lookup(hostname, options, callback)
) {
  return (hostname: string, options: dns.LookupOptions | undefined, callback: LookupCallback) => {
    resolve(hostname, { ...options, all: true }, (err, addresses) => {
      if (err) return callback(err);
      const blocked = addresses.find(({ address }) => blockedAddress(guard, address));
      if (blocked || addresses.length === 0) {
        const reason = blocked
          ? `resolves to a blocked ${guard === "public-only" ? "private" : "cloud-metadata"} address (DNS rebinding)`
          : "could not be resolved";
        return callback(
          Object.assign(new Error(`Outbound host ${reason}: ${hostname}`), {
            code: CONNECT_GUARD_BLOCKED_CODE,
          })
        );
      }
      if (options?.all) return callback(null, addresses);
      callback(null, addresses[0].address, addresses[0].family);
    });
  };
}

const UNSUPPORTED_RUNTIME = "This runtime does not support guarded outbound dispatchers";

function assertDispatches(agent: Dispatcher): void {
  if (typeof agent.dispatch !== "function") throw new Error(UNSUPPORTED_RUNTIME);
}

function compatibleGuardedDispatcher(agent: Dispatcher): Dispatcher {
  assertDispatches(agent);
  const Bridge = undici.Dispatcher1Wrapper;
  if (typeof Bridge !== "function") return agent;
  return new (class extends Bridge {
    dispatch(options: Dispatcher.DispatchOptions, handler: Dispatcher.DispatchHandler): boolean {
      return typeof handler?.onRequestStart === "function"
        ? agent.dispatch(options, handler)
        : super.dispatch(options, handler);
    }
  })(agent);
}

function createGuardedAgent(AgentClass: typeof Agent, guard: ConnectGuardMode): Dispatcher {
  const options = getDispatcherOptions();
  return new AgentClass({
    ...options,
    keepAliveTimeout: 1,
    keepAliveMaxTimeout: 1,
    pipelining: 0,
    connect: {
      ...(options.connect as object),
      lookup: createGuardedLookup(guard),
    } as never,
  });
}

const guardedDispatchers = new Map<ConnectGuardMode, Dispatcher>();

/**
 * Shared direct-egress dispatcher whose connections are validated by {@link createGuardedLookup}.
 * One instance per guard mode (the validation is per connect, so hosts can share it). Sockets are
 * not kept alive: this dispatcher bypasses the patched fetch's stale-socket retry, and a socket
 * that is never reused cannot be stale.
 *
 * Throws under Bun: Bun's fetch (the global one and its built-in `undici` shim) ignores
 * `dispatcher`, so a caller would connect unguarded. Use {@link fetchWithConnectGuard} there.
 */
export function getGuardedDispatcher(guard: ConnectGuardMode): Dispatcher {
  if (process.versions.bun) throw new Error(UNSUPPORTED_RUNTIME);
  let dispatcher = guardedDispatchers.get(guard);
  if (!dispatcher) {
    dispatcher = compatibleGuardedDispatcher(createGuardedAgent(Agent, guard));
    guardedDispatchers.set(guard, dispatcher);
  }
  return dispatcher;
}

type BunGuardedTransport = {
  fetch: typeof undici.fetch;
  agents: Map<ConnectGuardMode, Dispatcher>;
};
let bunTransport: BunGuardedTransport | null = null;

/**
 * Bun resolves the bare `undici` specifier to its built-in shim (an Agent without `dispatch`, a
 * fetch that ignores `dispatcher`). The package's own entry file is the real undici: it runs on
 * Bun and opens its sockets through `node:net` with the guarded `lookup`.
 */
function getBunGuardedTransport(): BunGuardedTransport {
  if (!bunTransport) {
    const real = createRequire(import.meta.url)("undici/index.js") as typeof undici;
    const agents = new Map<ConnectGuardMode, Dispatcher>();
    for (const mode of ["public-only", "block-metadata"] as const) {
      const agent = createGuardedAgent(real.Agent, mode);
      assertDispatches(agent); // got the shim after all: fail closed, never connect unguarded
      agents.set(mode, agent);
    }
    bunTransport = { fetch: real.fetch, agents };
  }
  return bunTransport;
}

/**
 * `fetch(url, init)` whose connection is validated by {@link createGuardedLookup}. On Node the
 * guarded dispatcher rides the ambient (proxy-patched) fetch, as before. On Bun, whose fetch
 * ignores dispatchers, the request goes through the real undici package's fetch and a guarded
 * agent; if that cannot be loaded the call throws instead of connecting unguarded.
 */
export function fetchWithConnectGuard(
  url: string,
  init: RequestInit,
  guard: ConnectGuardMode
): Promise<Response> {
  if (!process.versions.bun) {
    return fetch(url, { ...init, dispatcher: getGuardedDispatcher(guard) } as RequestInit);
  }
  const transport = getBunGuardedTransport();
  // The patched ambient fetch stamps own-listener requests (admission bypass); this path skips it.
  const options: RequestInit = { ...init };
  stampOwnListenerSelfHop(url, options);
  return transport.fetch(url, {
    ...options,
    dispatcher: transport.agents.get(guard),
  } as never) as unknown as Promise<Response>;
}
