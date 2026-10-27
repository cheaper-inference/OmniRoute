/**
 * Hardening (GHSA-35fw-cv32-2373 class, GHSA-jmq6-8j86-8xqj pattern): status routes
 * that stay reachable from remote dashboards must not run their host-side binary
 * probes for a remote peer.
 *
 *   GET /api/headroom/status       -> findHeadroomBinary() / findPython310()
 *   GET /api/tunnels/tailscale     -> resolveBinary() + `tailscale status/funnel --json`
 *   GET /api/tunnels/tailscale/check
 *   GET /api/tunnels/cloudflared   -> resolveBinary() (PATH lookup)
 *
 * None of these paths is LOCAL_ONLY for GET (the dashboard polls them through a
 * tunnel too), so the probe is gated at its call site on the trusted peer-locality
 * verdict: loopback/LAN callers keep the exact probed response, remote callers get the
 * same shape built only from non-spawning sources, flagged `probed: false`.
 *
 * "Did a probe spawn?" is observed by replacing the `node:child_process` exports
 * before the route modules load (they capture `promisify(execFile)` at import time).
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { createRequire, syncBuiltinESMExports } from "node:module";

const require = createRequire(import.meta.url);
const childProcess = require("node:child_process");

type SpawnCall = { fn: string; command: string; args: unknown };
const spawnCalls: SpawnCall[] = [];

const originals = {
  execFile: childProcess.execFile,
  execFileSync: childProcess.execFileSync,
  spawn: childProcess.spawn,
  spawnSync: childProcess.spawnSync,
  exec: childProcess.exec,
  execSync: childProcess.execSync,
};

function notFound(command: string) {
  return Object.assign(new Error(`fake child_process: ${command} not found`), {
    code: "ENOENT",
  });
}

childProcess.execFile = (command: string, args: unknown, ...rest: unknown[]) => {
  spawnCalls.push({ fn: "execFile", command, args });
  const callback = [args, ...rest].reverse().find((value) => typeof value === "function") as
    ((error: Error | null, stdout?: string, stderr?: string) => void) | undefined;
  if (callback) process.nextTick(() => callback(notFound(command), "", ""));
  return { pid: undefined, on() {}, kill() {} };
};
childProcess.execFileSync = (command: string, args: unknown) => {
  spawnCalls.push({ fn: "execFileSync", command, args });
  throw notFound(command);
};
childProcess.spawn = (command: string, args: unknown) => {
  spawnCalls.push({ fn: "spawn", command, args });
  throw notFound(command);
};
childProcess.spawnSync = (command: string, args: unknown) => {
  spawnCalls.push({ fn: "spawnSync", command, args });
  return { status: 1, stdout: "", stderr: "", error: notFound(command) };
};
childProcess.exec = (command: string, ...rest: unknown[]) => {
  spawnCalls.push({ fn: "exec", command, args: null });
  const callback = rest.reverse().find((value) => typeof value === "function") as
    ((error: Error | null) => void) | undefined;
  if (callback) process.nextTick(() => callback(notFound(command)));
  return { pid: undefined, on() {}, kill() {} };
};
childProcess.execSync = (command: string) => {
  spawnCalls.push({ fn: "execSync", command, args: null });
  throw notFound(command);
};
syncBuiltinESMExports();

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-spawn-probe-locality-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_STAMP_TOKEN = process.env.OMNIROUTE_PEER_STAMP_TOKEN;
const ORIGINAL_BINS = {
  TAILSCALE_BIN: process.env.TAILSCALE_BIN,
  TAILSCALED_BIN: process.env.TAILSCALED_BIN,
  CLOUDFLARED_BIN: process.env.CLOUDFLARED_BIN,
  HEADROOM_PYTHON: process.env.HEADROOM_PYTHON,
};
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "spawn-probe-locality-secret";
// A stamping server is "in front": route handlers then trust the pipeline's
// x-omniroute-peer-locality verdict, exactly as in production.
process.env.OMNIROUTE_PEER_STAMP_TOKEN = "spawn-probe-locality-stamp-token";
for (const key of Object.keys(ORIGINAL_BINS)) delete process.env[key];

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { AUTHZ_HEADER_PEER_LOCALITY } = await import("../../src/server/authz/headers.ts");
const headroomStatusRoute = await import("../../src/app/api/headroom/status/route.ts");
const tailscaleRoute = await import("../../src/app/api/tunnels/tailscale/route.ts");
const tailscaleCheckRoute = await import("../../src/app/api/tunnels/tailscale/check/route.ts");
const cloudflaredRoute = await import("../../src/app/api/tunnels/cloudflared/route.ts");

// requireLogin=false: isAuthenticated() is true for every caller, so the probe gate
// is the only thing standing between a remote peer and the spawn.
await settingsDb.updateSettings({ requireLogin: false, headroomUrl: "http://127.0.0.1:9" });

test.after(() => {
  Object.assign(childProcess, originals);
  syncBuiltinESMExports();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_STAMP_TOKEN === undefined) delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
  else process.env.OMNIROUTE_PEER_STAMP_TOKEN = ORIGINAL_STAMP_TOKEN;
  for (const [key, value] of Object.entries(ORIGINAL_BINS)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

type Locality = "loopback" | "lan" | "remote";

function requestFrom(pathname: string, locality: Locality) {
  return new Request(`http://omniroute.example${pathname}`, {
    method: "GET",
    headers: { [AUTHZ_HEADER_PEER_LOCALITY]: locality },
  });
}

async function callWith(
  locality: Locality,
  pathname: string,
  handler: (request: Request) => Promise<Response>
) {
  spawnCalls.length = 0;
  const response = await handler(requestFrom(pathname, locality));
  const body = (await response.json()) as Record<string, unknown>;
  return { status: response.status, body, calls: [...spawnCalls] };
}

const HEADROOM_KEYS = [
  "canStart",
  "installed",
  "localUrl",
  "managedPid",
  "path",
  "python",
  "running",
  "url",
];

test("headroom status: a remote peer gets the unprobed status without any spawn", async () => {
  const { status, body, calls } = await callWith(
    "remote",
    "/api/headroom/status",
    headroomStatusRoute.GET as (request: Request) => Promise<Response>
  );
  assert.equal(status, 200);
  assert.deepEqual(calls, [], "remote GET /api/headroom/status must not spawn");
  assert.equal(body.probed, false);
  assert.equal(body.installed, false);
  assert.equal(body.path, null);
  assert.equal(body.python, null);
  assert.equal(body.canStart, false);
  assert.equal(typeof body.running, "boolean");
  assert.equal(body.url, "http://127.0.0.1:9");
});

for (const locality of ["loopback", "lan"] as const) {
  test(`headroom status: a ${locality} peer still runs the binary probes (unchanged shape)`, async () => {
    const { status, body, calls } = await callWith(
      locality,
      "/api/headroom/status",
      headroomStatusRoute.GET as (request: Request) => Promise<Response>
    );
    assert.equal(status, 200);
    assert.ok(
      calls.some((c) => c.fn === "execFileSync" && c.command === "which"),
      `${locality} GET must probe for the headroom binary`
    );
    assert.ok(calls.some((c) => c.fn === "execFileSync" && String(c.command).startsWith("python")));
    assert.deepEqual(Object.keys(body).sort(), HEADROOM_KEYS, "local response shape unchanged");
  });
}

const TAILSCALE_ROUTES = [
  { pathname: "/api/tunnels/tailscale", handler: tailscaleRoute.GET },
  { pathname: "/api/tunnels/tailscale/check", handler: tailscaleCheckRoute.GET },
];

for (const { pathname, handler } of TAILSCALE_ROUTES) {
  test(`tailscale ${pathname}: a remote peer gets the unprobed status without any spawn`, async () => {
    const { status, body, calls } = await callWith(
      "remote",
      pathname,
      handler as (request: Request) => Promise<Response>
    );
    assert.equal(status, 200);
    assert.deepEqual(calls, [], `remote GET ${pathname} must not spawn`);
    assert.equal(body.probed, false);
    assert.equal(body.installed, false);
    assert.equal(body.binaryPath, null);
    assert.equal(body.brewAvailable, false);
    assert.equal(typeof body.supported, "boolean");
    assert.equal(typeof body.running, "boolean");
  });

  test(`tailscale ${pathname}: a loopback peer still probes the binary (unchanged shape)`, async () => {
    const { status, body, calls } = await callWith(
      "loopback",
      pathname,
      handler as (request: Request) => Promise<Response>
    );
    assert.equal(status, 200);
    assert.ok(
      calls.some(
        (c) =>
          c.fn === "execFile" &&
          (c.command === "which" || c.command === "where") &&
          Array.isArray(c.args) &&
          c.args.includes("tailscale")
      ),
      `loopback GET ${pathname} must probe for the tailscale binary`
    );
    assert.equal("probed" in body, false, "local response shape unchanged");
    assert.equal(body.installed, false);
  });
}

test("tailscale status: a remote peer still sees a funnel the operator enabled", async () => {
  const funnelUrl = "https://omniroute-test.tailnet-example.ts.net";
  await settingsDb.updateSettings({ tailscaleEnabled: true, tailscaleUrl: funnelUrl });
  try {
    const { body, calls } = await callWith(
      "remote",
      "/api/tunnels/tailscale",
      tailscaleRoute.GET as (request: Request) => Promise<Response>
    );
    assert.deepEqual(calls, []);
    assert.equal(body.probed, false);
    assert.equal(body.running, true);
    assert.equal(body.enabled, true);
    assert.equal(body.tunnelUrl, funnelUrl);
    assert.equal(body.apiUrl, `${funnelUrl}/v1`);
    assert.equal(body.phase, "running");
  } finally {
    await settingsDb.updateSettings({ tailscaleEnabled: false, tailscaleUrl: "" });
  }
});

test("cloudflared status: a remote peer gets the unprobed status without any spawn", async () => {
  const { status, body, calls } = await callWith(
    "remote",
    "/api/tunnels/cloudflared",
    cloudflaredRoute.GET as unknown as (request: Request) => Promise<Response>
  );
  assert.equal(status, 200);
  assert.deepEqual(calls, [], "remote GET /api/tunnels/cloudflared must not spawn");
  assert.equal(body.probed, false);
  assert.equal(body.installed, false);
  assert.equal(body.binaryPath, null);
  assert.equal(body.running, false);
  assert.notEqual(body.phase, "not_installed", "an unprobed status never claims not_installed");
});

test("cloudflared status: a loopback peer still probes the binary (unchanged shape)", async () => {
  const { status, body, calls } = await callWith(
    "loopback",
    "/api/tunnels/cloudflared",
    cloudflaredRoute.GET as unknown as (request: Request) => Promise<Response>
  );
  assert.equal(status, 200);
  assert.ok(
    calls.some(
      (c) =>
        c.fn === "execFile" &&
        (c.command === "which" || c.command === "where") &&
        Array.isArray(c.args) &&
        c.args.includes("cloudflared")
    ),
    "loopback GET /api/tunnels/cloudflared must probe for the cloudflared binary"
  );
  assert.equal("probed" in body, false, "local response shape unchanged");
});
