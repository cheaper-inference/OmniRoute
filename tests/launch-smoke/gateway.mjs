// tests/launch-smoke/gateway.mjs: run the real OmniRoute server from this worktree for the live
// launch smoke, register the mock upstream in it, and read back launch/agent sessions.
//
// Start command (dev server, no build needed):
//   node --max-old-space-size=8192 scripts/dev/run-next.mjs dev
// with HOST=127.0.0.1 PORT=DASHBOARD_PORT=API_PORT=<port>, DATA_DIR + HOME in a temp dir,
// JWT_SECRET, API_KEY_SECRET, INITIAL_PASSWORD, OMNIROUTE_USE_TURBOPACK=0 (Turbopack
// refuses the symlinked node_modules of a worktree), OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS=true.

import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import { createWriteStream, mkdirSync } from "node:fs";
import net from "node:net";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = resolve(HERE, "..", "..");
export const DEFAULT_PASSWORD = "smoke-pass-1";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function freePort() {
  return new Promise((res, rej) => {
    const s = net.createServer();
    s.once("error", rej);
    s.listen(0, "127.0.0.1", () => {
      const { port } = s.address();
      s.close(() => res(port));
    });
  });
}

function killTree(pid, signal) {
  try {
    process.kill(-pid, signal); // detached child leads its own process group
  } catch {
    try {
      process.kill(pid, signal);
    } catch {
      /* already gone */
    }
  }
}

function alive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

/**
 * @param {{ port?: number, dataDir: string, logFile?: string, env?: Record<string,string>,
 *           mode?: "dev"|"start", timeoutMs?: number }} opts
 */
export async function startGateway({
  port,
  dataDir,
  logFile,
  env = {},
  mode = "dev",
  timeoutMs = 480000,
  heapMb = 20000,
}) {
  if (!dataDir)
    throw new Error("startGateway: dataDir is required (never use the real ~/.omniroute)");
  const p = port || (await freePort());
  mkdirSync(dataDir, { recursive: true });
  const home = env.HOME || join(dataDir, "home");
  mkdirSync(home, { recursive: true });
  const log = logFile || join(dataDir, "server.log");
  mkdirSync(dirname(log), { recursive: true });
  const out = createWriteStream(log, { flags: "a" });

  const childEnv = {
    ...process.env,
    HOME: home,
    DATA_DIR: dataDir,
    HOST: "127.0.0.1",
    PORT: String(p),
    DASHBOARD_PORT: String(p),
    API_PORT: String(p),
    JWT_SECRET: randomBytes(24).toString("hex"),
    API_KEY_SECRET: randomBytes(16).toString("hex"),
    INITIAL_PASSWORD: DEFAULT_PASSWORD,
    NEXT_TELEMETRY_DISABLED: "1",
    OMNIROUTE_USE_TURBOPACK: "0",
    OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS: "true",
    OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS: "true",
    // dev webpack keeps several GB resident; without these the chat pipeline sheds with a 503
    // "resource_pressure" once RSS/heap pass the default budget.
    OMNIROUTE_RSS_PRESSURE_MB: "48000",
    HEAP_PRESSURE_THRESHOLD_MB: "40000",
    ...env,
  };
  delete childEnv.NODE_OPTIONS;
  const child = spawn(
    process.execPath,
    [`--max-old-space-size=${heapMb}`, "scripts/dev/run-next.mjs", mode],
    { cwd: REPO_ROOT, env: childEnv, detached: true, stdio: ["ignore", "pipe", "pipe"] }
  );
  child.stdout.pipe(out);
  child.stderr.pipe(out);
  let exited = null;
  child.once("exit", (code, sig) => {
    exited = { code, sig };
  });

  const url = `http://127.0.0.1:${p}`;
  const gw = {
    url,
    port: p,
    pid: child.pid,
    child,
    dataDir,
    logFile: log,
    password: childEnv.INITIAL_PASSWORD,
    startedAt: Date.now(),
    healthyMs: null,
    async stop() {
      if (!alive(child.pid) && exited) return;
      killTree(child.pid, "SIGTERM");
      for (let i = 0; i < 40 && alive(child.pid); i++) await sleep(250);
      if (alive(child.pid)) killTree(child.pid, "SIGKILL");
      for (let i = 0; i < 20 && alive(child.pid); i++) await sleep(100);
      out.end();
    },
  };

  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (exited) {
      throw new Error(`gateway exited early (code=${exited.code} sig=${exited.sig}); see ${log}`);
    }
    try {
      const r = await fetch(`${url}/api/monitoring/health`, {
        signal: AbortSignal.timeout(120000),
      });
      if (r.status === 200) {
        gw.healthyMs = Date.now() - gw.startedAt;
        return gw;
      }
    } catch {
      /* not listening yet or still compiling */
    }
    await sleep(1000);
  }
  await gw.stop();
  throw new Error(`gateway not healthy after ${timeoutMs}ms; see ${log}`);
}

// ---------------------------------------------------------------- auth

/** Dashboard login with the INITIAL_PASSWORD. Returns { cookie, headers } for management calls. */
export async function gatewayLogin({ gatewayUrl, password = DEFAULT_PASSWORD }) {
  const r = await fetch(`${gatewayUrl}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ password }),
  });
  if (!r.ok) throw new Error(`login failed ${r.status}: ${(await r.text()).slice(0, 300)}`);
  const setCookies = r.headers.getSetCookie?.() ?? [];
  const cookie = setCookies.map((c) => c.split(";")[0]).join("; ");
  if (!cookie) throw new Error("login returned no session cookie");
  return { cookie, headers: { cookie } };
}

async function api(gatewayUrl, auth, method, path, body) {
  const headers = { ...(auth?.headers || {}) };
  if (body !== undefined) headers["content-type"] = "application/json";
  const r = await fetch(`${gatewayUrl}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await r.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    /* non-json */
  }
  return { status: r.status, ok: r.ok, json, text };
}

/** Create a gateway API key (management auth required). Returns the plaintext key. */
export async function createApiKey({ gatewayUrl, auth, name = "smoke-key" }) {
  const r = await api(gatewayUrl, auth, "POST", "/api/keys", { name });
  if (!r.ok || !r.json?.key)
    throw new Error(`create key failed ${r.status}: ${r.text.slice(0, 300)}`);
  return r.json.key;
}

// ---------------------------------------------------------------- upstream registration

/**
 * Register the mock upstream as an openai-compatible provider node + connection.
 * Calls: POST /api/provider-nodes, POST /api/providers. Returns { prefix, nodeId, connectionId,
 * modelIds } where modelIds are the ids as the gateway lists them (prefix/model).
 */
export async function registerUpstream({ gatewayUrl, upstreamUrl, models, auth, prefix = "smk" }) {
  const node = await api(gatewayUrl, auth, "POST", "/api/provider-nodes", {
    name: "Smoke Mock",
    prefix,
    apiType: "chat",
    baseUrl: upstreamUrl,
    type: "openai-compatible",
  });
  if (node.status !== 201)
    throw new Error(`provider-nodes ${node.status}: ${node.text.slice(0, 400)}`);
  const nodeId = node.json.node.id;

  const conn = await api(gatewayUrl, auth, "POST", "/api/providers", {
    provider: nodeId,
    apiKey: "sk-smoke-mock",
    name: "Smoke Mock Key",
  });
  if (conn.status !== 201) throw new Error(`providers ${conn.status}: ${conn.text.slice(0, 400)}`);
  const connectionId = conn.json?.connection?.id ?? null;

  // POST /api/providers creates the connection inactive until its auto-test flips it
  // (src/app/api/providers/route.ts:408-416); on a cold dev server that test can lose the race,
  // leaving "No active credentials". Activate it explicitly, the same as the dashboard toggle.
  if (connectionId) {
    const act = await api(gatewayUrl, auth, "PUT", `/api/providers/${connectionId}`, {
      isActive: true,
    });
    if (!act.ok) throw new Error(`activate connection ${act.status}: ${act.text.slice(0, 300)}`);
  }

  // Models are discovered from the upstream /models; poll the gateway catalog until they appear.
  const apiKey = auth?.apiKey;
  const wanted = (models || []).map((m) => `${prefix}/${m}`);
  let listed = [];
  for (let i = 0; i < 30; i++) {
    const hdr = apiKey ? { authorization: `Bearer ${apiKey}` } : auth?.headers || {};
    const r = await fetch(`${gatewayUrl}/v1/models`, { headers: hdr });
    if (r.ok) {
      listed = ((await r.json()).data || []).map((m) => m.id);
      if (wanted.every((w) => listed.includes(w))) break;
    }
    if (i === 3 && connectionId) {
      // nudge model sync if discovery did not run on its own
      await api(gatewayUrl, auth, "POST", `/api/providers/${connectionId}/sync-models`, {}).catch(
        () => {}
      );
    }
    await sleep(1000);
  }
  return {
    prefix,
    nodeId,
    connectionId,
    modelIds: listed.filter((id) => id.startsWith(`${prefix}/`)),
  };
}

// ---------------------------------------------------------------- launch sessions

/**
 * The gateway's view of launch sessions. There is no list route: the launch API is
 * mint (POST /api/launch/sessions), patch, revoke (DELETE /api/launch/sessions/:id) and
 * GET /api/launch/sessions/:id/usage. `sessions` is an array of { sessionId, usage } for the
 * given ids; `agentSessions` is GET /api/sessions (live session-manager entries, if any).
 */
export async function listLaunchSessions({ gatewayUrl, auth, sessionIds = [], tokens = {} }) {
  const out = [];
  for (const id of sessionIds) {
    const headers = tokens[id] ? { authorization: `Bearer ${tokens[id]}` } : auth?.headers || {};
    const r = await fetch(`${gatewayUrl}/api/launch/sessions/${encodeURIComponent(id)}/usage`, {
      headers,
    });
    out.push({ sessionId: id, status: r.status, usage: r.ok ? await r.json() : await r.text() });
  }
  const live = await api(gatewayUrl, auth, "GET", "/api/sessions");
  return { sessions: out, activeSessions: live.ok ? live.json : { status: live.status } };
}

export async function mintLaunchSession({ gatewayUrl, apiKey, body }) {
  const r = await fetch(`${gatewayUrl}/api/launch/sessions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(apiKey ? { authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify(body),
  });
  const text = await r.text();
  if (r.status !== 201) throw new Error(`mint ${r.status}: ${text.slice(0, 300)}`);
  return JSON.parse(text);
}

export async function revokeLaunchSession({ gatewayUrl, apiKey, token, sessionId }) {
  const r = await fetch(`${gatewayUrl}/api/launch/sessions/${encodeURIComponent(sessionId)}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${token || apiKey}` },
  });
  return r.status;
}
