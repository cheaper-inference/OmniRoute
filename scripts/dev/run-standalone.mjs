#!/usr/bin/env node

import { existsSync } from "node:fs";
import { totalmem } from "node:os";
import {
  resolveRuntimePorts,
  withRuntimePortEnv,
  resolveMaxOldSpaceMb,
  calibrateHeapFallbackMb,
  warnConflictingHeapLimits,
  buildStandaloneNodeOptions,
  spawnWithForwardedSignals,
} from "../build/runtime-env.mjs";
import { bootstrapEnv } from "../build/bootstrap-env.mjs";

const env = bootstrapEnv();
const runtimePorts = resolveRuntimePorts(env);
const childEnv = withRuntimePortEnv(env, runtimePorts);

// #2939 / #10353: OMNIROUTE_MEMORY_MB is the Docker/standalone heap knob.
// When it is set, we append --max-old-space-size last (V8 last-flag wins).
// When it is unset and NODE_OPTIONS already pins the heap, keep NODE_OPTIONS
// (#5238). Warn when both are set and the numbers disagree.
const maxOldSpaceMb = resolveMaxOldSpaceMb(
  childEnv.OMNIROUTE_MEMORY_MB,
  calibrateHeapFallbackMb(totalmem())
);
warnConflictingHeapLimits(childEnv, maxOldSpaceMb);
childEnv.NODE_OPTIONS = buildStandaloneNodeOptions(childEnv, maxOldSpaceMb);

// Prefer the WS-aware wrapper (server-ws.mjs) over the bare Next standalone
// server.js: it installs the trusted peer-IP stamp (scripts/dev/peer-stamp.mjs)
// that the authz middleware needs to allow loopback/LAN access to LOCAL_ONLY
// routes. Falling back to server.js fails CLOSED (every LOCAL_ONLY request 403s)
// rather than trusting the spoofable Host header.
const entry = existsSync("server-ws.mjs") ? "server-ws.mjs" : "server.js";

spawnWithForwardedSignals(process.execPath, [entry], {
  stdio: "inherit",
  env: childEnv,
});

// ── Self-pinger (Render free-tier keep-alive) ───────────────────────────────
// Render's free web services spin down after ~15 minutes without INBOUND
// traffic. Pinging localhost would not count, so this requests the service's
// own PUBLIC URL (RENDER_EXTERNAL_URL, set automatically by Render) so the
// request travels through Render's edge and registers as real traffic.
//
// Lives in this launcher (not a separate file) because the standalone bundle
// only ships allow-listed scripts (assembleStandalone.mjs EXTRA_MODULE_ENTRIES).
// Runs in the launcher process, never in the Next server, and is inert unless a
// public URL is available — local, docker-compose and npm installs are unchanged.
//
// Env knobs (all optional):
//   SELF_PING_ENABLED=false           disable entirely
//   SELF_PING_URL=https://host        override the target base URL
//   SELF_PING_PATH=/api/...           override the path (default health endpoint)
//   SELF_PING_INTERVAL_SECONDS=180    interval in seconds (default 180, minimum 30)
const SELF_PING_DEFAULT_INTERVAL_SECONDS = 180;
const SELF_PING_MIN_INTERVAL_SECONDS = 30;
const SELF_PING_FIRST_DELAY_MS = 60_000; // give the server time to boot
const SELF_PING_TIMEOUT_MS = 15_000;

function startSelfPinger(sourceEnv) {
  const flag = String(sourceEnv.SELF_PING_ENABLED ?? "")
    .trim()
    .toLowerCase();
  if (["0", "false", "off", "no"].includes(flag)) return;

  const baseUrl = String(sourceEnv.SELF_PING_URL || sourceEnv.RENDER_EXTERNAL_URL || "").trim();
  if (!baseUrl) return; // no public URL (not on Render): nothing to keep awake

  let target;
  try {
    target = new URL(String(sourceEnv.SELF_PING_PATH || "/api/monitoring/health"), baseUrl);
    if (target.protocol !== "https:" && target.protocol !== "http:") throw new Error("protocol");
  } catch {
    console.warn("[self-pinger] invalid SELF_PING_URL/RENDER_EXTERNAL_URL or path; disabled");
    return;
  }

  const requested = Number.parseInt(String(sourceEnv.SELF_PING_INTERVAL_SECONDS ?? ""), 10);
  const intervalSeconds =
    Number.isFinite(requested) && requested >= SELF_PING_MIN_INTERVAL_SECONDS
      ? requested
      : SELF_PING_DEFAULT_INTERVAL_SECONDS;

  const ping = async () => {
    try {
      const res = await fetch(target, {
        method: "GET",
        headers: { "user-agent": "omniroute-self-pinger" },
        signal: AbortSignal.timeout(SELF_PING_TIMEOUT_MS),
      });
      await res.body?.cancel();
      // Any HTTP status means the request reached the service through Render's edge.
      console.log(`[self-pinger] GET ${target.pathname} -> ${res.status}`);
    } catch (err) {
      const reason = err?.name === "TimeoutError" ? "timeout" : (err?.message ?? String(err));
      console.warn(`[self-pinger] ping failed: ${reason}`);
    }
  };

  console.log(`[self-pinger] enabled: ${target.origin}${target.pathname} every ${intervalSeconds}s`);
  // unref() so the timers never keep the launcher alive on their own; the
  // spawned server child does that and process.exit()s when it ends.
  setTimeout(() => {
    void ping();
    setInterval(ping, intervalSeconds * 1000).unref();
  }, SELF_PING_FIRST_DELAY_MS).unref();
}

startSelfPinger(childEnv);
