// bin/cli/launch/core/pipeline/gateway-session.mjs: acquireGateway -> capabilities + mint
// (started together; capabilities consumed first, so its error wins).

import { createSessionClient, DEFAULT_SESSION_TTL_SEC } from "../session.mjs";
import { launchRoot } from "../state.mjs";
import { normalizeRootUrl, publicTarget } from "../target.mjs";
import { trace } from "../trace.mjs";
import { settle, unwrap } from "./settle.mjs";

async function defaultAcquireGateway(args) {
  const mod = await import("../gateway.mjs");
  return mod.acquireGateway(args);
}

function gatewayOrigin(target, gateway) {
  if (target.kind === "remote") return "remote";
  return gateway.owned ? "auto-started" : "external-local";
}

/** Acquire (or auto-start) the gateway into `run.gateway`; emits gateway.ready. */
async function acquireStep(L, run) {
  run.gateway = await (L.deps.acquireGateway ?? defaultAcquireGateway)({
    target: publicTarget(L.target),
    flags: L.flags,
    stateDir: launchRoot(L.dataDir),
    log: (message) => L.stderr.write(`omnirouter: ${message}\n`),
  });
  trace("gateway acquire");
  const rootUrl = normalizeRootUrl(run.gateway.baseUrl);
  const origin = gatewayOrigin(L.target, run.gateway);
  await L.bus.emit({ type: "gateway.ready", origin, rootUrl });
  return { rootUrl, origin };
}

/** Capabilities and mint, concurrently; the session lands in `run.session`. */
async function sessionStep(L, run, rootUrl) {
  run.client = (L.deps.createSessionClient ?? createSessionClient)({
    rootUrl,
    credential: L.target.credential.value,
    fetch: L.doFetch,
  });
  const client = run.client;
  const capabilitiesResult = settle(() => client.capabilities());
  // --tag goes to the gateway as sessionTag; without it the gateway derives launch:<tool>:<id>.
  const mintResult = settle(() =>
    client.mint({
      tool: L.tool,
      tag: L.settings.tag,
      ttlSec: L.deps.sessionTtlSec ?? DEFAULT_SESSION_TTL_SEC,
    })
  );
  const capabilitiesOutcome = await capabilitiesResult;
  if (!capabilitiesOutcome.ok) {
    run.orphanMint = mintResult;
    throw capabilitiesOutcome.error;
  }
  trace("capabilities");
  run.session = unwrap(await mintResult);
  trace("session mint");
  await L.bus.emit({ type: "session.minted", sessionId: run.session.sessionId });
  return capabilitiesOutcome.value;
}

/**
 * Gateway, then session.
 * @returns {Promise<{ rootUrl: string, origin: string, capabilities: object }>}
 */
export async function gatewaySessionStep(L, run) {
  const { rootUrl, origin } = await acquireStep(L, run);
  const capabilities = await sessionStep(L, run, rootUrl);
  return { rootUrl, origin, capabilities };
}
