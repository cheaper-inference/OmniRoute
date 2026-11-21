/**
 * The quota panel listener follows QUOTA_PANEL_PORT only. It is off unless the variable is set,
 * binds 127.0.0.1 unless QUOTA_PANEL_HOST says otherwise, and a refused value, a port clash or a
 * bind failure logs one warning and opens nothing, without throwing.
 */

import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import { once } from "node:events";

const panel = await import("../../src/lib/quotaPanelBridge.ts");
const bridge = await import("../../src/lib/apiBridgeServer.ts");

type Reply = { status: number; body: string };
type Captured<T> = { result: T; warnings: string[]; logs: string[]; events: string[] };

const PORTS = { apiPort: 20128, dashboardPort: 20128 };
const INVALID =
  "QUOTA_PANEL_PORT is not a port number from 1 to 65535. The quota panel port stays off.";
const CLASH =
  "QUOTA_PANEL_PORT equals the dashboard port or the API port. The quota panel port stays off.";
const LIVE_WS_CLASH =
  "QUOTA_PANEL_PORT equals the live dashboard WebSocket port (LIVE_WS_PORT, default 20132). The quota panel port stays off.";
const BASE =
  "OMNIROUTE_BASE_PATH has a shape the quota panel port does not support. The quota panel port stays off.";

async function freePort(): Promise<number> {
  const server = net.createServer();
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as net.AddressInfo;
  await new Promise<void>((resolve) => server.close(() => resolve()));
  return port;
}

async function captureWarnings<T>(fn: () => T | Promise<T>): Promise<Captured<Awaited<T>>> {
  const warnings: string[] = [];
  const logs: string[] = [];
  const events: string[] = []; // Every call, in order, as "warn: …" or "log: …".
  const originalWarn = console.warn;
  const originalLog = console.log;
  console.warn = (...args: unknown[]) => {
    warnings.push(args.map(String).join(" "));
    events.push(`warn: ${args.map(String).join(" ")}`);
  };
  console.log = (...args: unknown[]) => {
    logs.push(args.map(String).join(" "));
    events.push(`log: ${args.map(String).join(" ")}`);
  };
  try {
    const result = await fn();
    return { result, warnings, logs, events };
  } finally {
    console.warn = originalWarn;
    console.log = originalLog;
  }
}

function call(port: number, path: string, options: { method?: string } = {}): Promise<Reply> {
  return new Promise((resolve, reject) => {
    const req = http.request(
      { host: "127.0.0.1", port, path, method: options.method || "GET" },
      (res) => {
        let text = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (text += chunk));
        res.on("end", () => resolve({ status: res.statusCode || 0, body: text }));
      }
    );
    req.on("error", reject);
    req.end();
  });
}

function shut(server: http.Server): void {
  server.close();
  server.closeAllConnections();
}

test("the panel port is off unless QUOTA_PANEL_PORT is set", () => {
  for (const env of [
    {},
    { QUOTA_PANEL_PORT: "" },
    { QUOTA_PANEL_PORT: "   " },
    { QUOTA_PANEL_HOST: "0.0.0.0" },
  ]) {
    assert.deepEqual(panel.resolveQuotaPanelListener(env, PORTS), { kind: "off" });
  }
});

test("a valid port listens on 127.0.0.1 unless QUOTA_PANEL_HOST says otherwise", () => {
  assert.deepEqual(panel.resolveQuotaPanelListener({ QUOTA_PANEL_PORT: "20133" }, PORTS), {
    kind: "listen",
    port: 20133,
    host: "127.0.0.1",
    basePath: "",
  });
  assert.deepEqual(
    panel.resolveQuotaPanelListener(
      { QUOTA_PANEL_PORT: " 20133 ", QUOTA_PANEL_HOST: " 0.0.0.0 " },
      PORTS
    ),
    { kind: "listen", port: 20133, host: "0.0.0.0", basePath: "" }
  );
  assert.deepEqual(
    panel.resolveQuotaPanelListener({ QUOTA_PANEL_PORT: "1", QUOTA_PANEL_HOST: "  " }, PORTS),
    { kind: "listen", port: 1, host: panel.QUOTA_PANEL_DEFAULT_HOST, basePath: "" }
  );
  assert.equal(panel.QUOTA_PANEL_DEFAULT_HOST, "127.0.0.1");
});

test("a value that is not a port number opens nothing", () => {
  for (const value of [
    "0",
    "65536",
    "70000",
    "999999",
    "-1",
    "+80",
    "20133abc",
    "2e4",
    "0x50",
    "20133.0",
    "port",
    "20 133",
  ]) {
    assert.deepEqual(
      panel.resolveQuotaPanelListener({ QUOTA_PANEL_PORT: value }, PORTS),
      { kind: "refused", warning: INVALID },
      value
    );
  }
});

test("a port equal to the dashboard port or the API port opens nothing", () => {
  assert.deepEqual(panel.resolveQuotaPanelListener({ QUOTA_PANEL_PORT: "20128" }, PORTS), {
    kind: "refused",
    warning: CLASH,
  });
  const split = { apiPort: 20129, dashboardPort: 20128 };
  for (const value of ["20128", "20129"]) {
    assert.deepEqual(panel.resolveQuotaPanelListener({ QUOTA_PANEL_PORT: value }, split), {
      kind: "refused",
      warning: CLASH,
    });
  }
});

test("a port equal to the live dashboard WebSocket port opens nothing while that server is on", () => {
  const refused = { kind: "refused", warning: LIVE_WS_CLASH };
  const listen = (port: number) => ({ kind: "listen", port, host: "127.0.0.1", basePath: "" });
  const resolve = (env: Record<string, string>) => panel.resolveQuotaPanelListener(env, PORTS);
  // LIVE_WS_PORT unset: the live server uses its default port, 20132, and is on by default.
  assert.deepEqual(resolve({ QUOTA_PANEL_PORT: "20132" }), refused);
  for (const flag of ["1", "true", "TRUE"]) {
    assert.deepEqual(
      resolve({ QUOTA_PANEL_PORT: "20132", OMNIROUTE_ENABLE_LIVE_WS: flag }),
      refused
    );
  }
  // An explicit LIVE_WS_PORT moves the clash to that port.
  assert.deepEqual(resolve({ QUOTA_PANEL_PORT: "20140", LIVE_WS_PORT: "20140" }), refused);
  assert.deepEqual(resolve({ QUOTA_PANEL_PORT: "20132", LIVE_WS_PORT: "20140" }), listen(20132));
  // With the live server off, its port is free for the panel.
  for (const flag of ["0", "false", "off", ""]) {
    assert.deepEqual(
      resolve({ QUOTA_PANEL_PORT: "20132", OMNIROUTE_ENABLE_LIVE_WS: flag }),
      listen(20132),
      flag
    );
    assert.deepEqual(
      resolve({ QUOTA_PANEL_PORT: "20140", LIVE_WS_PORT: "20140", OMNIROUTE_ENABLE_LIVE_WS: flag }),
      listen(20140),
      flag
    );
  }
});

test("the base path is taken from OMNIROUTE_BASE_PATH and an unsupported shape opens nothing", () => {
  const withBase = (value: string) =>
    panel.resolveQuotaPanelListener(
      { QUOTA_PANEL_PORT: "20133", OMNIROUTE_BASE_PATH: value },
      PORTS
    );
  for (const [value, basePath] of [
    ["", ""],
    ["   ", ""],
    [" /omniroute ", "/omniroute"],
    ["/omniroute", "/omniroute"],
    ["/a/b", "/a/b"],
  ]) {
    assert.deepEqual(
      withBase(value),
      { kind: "listen", port: 20133, host: "127.0.0.1", basePath },
      value
    );
  }
  // The base path is either empty or a leading slash followed by segments, with no trailing
  // slash and no empty segment.
  for (const value of [
    "/",
    "/x/",
    "/omniroute/",
    "x",
    "omniroute",
    "/a%2f",
    "/a b",
    "/a%2fb",
    "/..",
    "/a/../b",
    "/a/./b",
    "/.a",
    "/a?b",
    "/a#b",
    "/a\\b",
    "//a",
    "/a//b",
  ]) {
    assert.deepEqual(withBase(value), { kind: "refused", warning: BASE }, value);
  }
});

test("isLoopbackBindHost knows the loopback spellings", () => {
  for (const host of ["127.0.0.1", "::1", "localhost", "LOCALHOST"]) {
    assert.equal(panel.isLoopbackBindHost(host), true, host);
  }
  for (const host of ["0.0.0.0", "::", "192.168.0.10", "example.test"]) {
    assert.equal(panel.isLoopbackBindHost(host), false, host);
  }
  // The whole 127.0.0.0/8 range, also in its IPv4-mapped IPv6 form.
  for (const host of ["127.0.0.2", "127.255.255.254", "::ffff:127.0.0.1", "::FFFF:127.1.2.3"]) {
    assert.equal(panel.isLoopbackBindHost(host), true, host);
  }
  for (const host of [
    "128.0.0.1",
    "::ffff:10.0.0.1",
    "127.0.0.1.example.test",
    "1270.0.0.1",
    "127.0.0.256",
    "[::1]",
  ]) {
    assert.equal(panel.isLoopbackBindHost(host), false, host);
  }
});

test("an IPv6 bind address in brackets is used without them", () => {
  const resolve = (host: string) =>
    panel.resolveQuotaPanelListener({ QUOTA_PANEL_PORT: "20133", QUOTA_PANEL_HOST: host }, PORTS);
  assert.deepEqual(resolve("[::1]"), { kind: "listen", port: 20133, host: "::1", basePath: "" });
  assert.deepEqual(resolve(" [::] "), { kind: "listen", port: 20133, host: "::", basePath: "" });
  // Brackets around something that is not an IPv6 literal are left as written.
  assert.deepEqual(resolve("[localhost]"), {
    kind: "listen",
    port: 20133,
    host: "[localhost]",
    basePath: "",
  });
});

test("a base path whose first segment names an application route opens nothing", () => {
  const withBase = (value: string) =>
    panel.resolveQuotaPanelListener(
      { QUOTA_PANEL_PORT: "20133", OMNIROUTE_BASE_PATH: value },
      PORTS
    );
  for (const segment of [
    "api",
    "v1",
    "v1beta",
    "_next",
    "quota",
    "dashboard",
    "docs",
    "login",
    "codex",
    "responses",
    "anthropic",
    "openai",
    "v0",
    "connect",
  ]) {
    const mixed = segment.charAt(0).toUpperCase() + segment.slice(1).toUpperCase();
    for (const value of [`/${segment}`, `/${mixed}`, `/${segment}/x`, `/${mixed}/x`]) {
      assert.equal(panel.isQuotaPanelBasePath(value), false, value);
      assert.deepEqual(withBase(value), { kind: "refused", warning: BASE }, value);
    }
  }
  for (const value of [
    "/apiary",
    "/quotas",
    "/v10",
    "/x/api",
    "/docs-site",
    "/codexes",
    "/v00",
    "/connected",
    "/x/openai",
  ]) {
    assert.equal(panel.isQuotaPanelBasePath(value), true, value);
    assert.equal(withBase(value).kind, "listen", value);
  }
});

test("startQuotaPanelListener opens nothing and logs nothing while the variable is unset", async () => {
  const { result, warnings, logs } = await captureWarnings(() =>
    bridge.startQuotaPanelListener({}, PORTS)
  );
  assert.equal(result, null);
  assert.deepEqual([...warnings, ...logs], []);
});

test("startQuotaPanelListener warns once and opens nothing for a refused value", async () => {
  const { result, warnings } = await captureWarnings(() =>
    bridge.startQuotaPanelListener({ QUOTA_PANEL_PORT: "20133abc" }, PORTS)
  );
  assert.equal(result, null);
  assert.deepEqual(warnings, [`[Quota Panel] ${INVALID}`]);
});

test("startQuotaPanelListener warns once and opens nothing for an unsupported base path", async () => {
  for (const value of ["/", "/x/"]) {
    const { result, warnings, logs } = await captureWarnings(() =>
      bridge.startQuotaPanelListener(
        { QUOTA_PANEL_PORT: "20133", OMNIROUTE_BASE_PATH: value },
        PORTS
      )
    );
    assert.equal(result, null, value);
    assert.deepEqual(warnings, [`[Quota Panel] ${BASE}`], value);
    assert.deepEqual(logs, [], value);
  }
});

test("a started panel listener binds to 127.0.0.1 and serves the panel role", async () => {
  const port = await freePort();
  const target = await freePort(); // Nothing listens there. Only refused paths are requested.
  const { result: server, logs } = await captureWarnings(async () => {
    const started = bridge.startQuotaPanelListener(
      { QUOTA_PANEL_PORT: String(port) },
      { apiPort: target, dashboardPort: target }
    );
    assert.ok(started);
    await once(started, "listening");
    await new Promise((resolve) => setImmediate(resolve));
    return started;
  });
  try {
    assert.equal((server.address() as net.AddressInfo).address, "127.0.0.1");
    assert.deepEqual(logs, [`[Quota Panel] Listening on 127.0.0.1:${port} -> dashboard:${target}`]);
    const res = await call(port, "/dashboard");
    assert.equal(res.status, 404);
    assert.deepEqual(JSON.parse(res.body), { error: "not_found", message: "Not found." });
    assert.equal((await call(port, "/quota/claude", { method: "POST" })).status, 404);
  } finally {
    shut(server);
  }
});

test("a port already in use logs a warning and does not throw", async () => {
  const holder = http.createServer();
  await new Promise<void>((resolve) => holder.listen(0, "127.0.0.1", resolve));
  const { port } = holder.address() as net.AddressInfo;
  try {
    const { result: server, warnings } = await captureWarnings(async () => {
      const started = bridge.startQuotaPanelListener(
        { QUOTA_PANEL_PORT: String(port) },
        { apiPort: 1, dashboardPort: 2 }
      );
      await once(started as http.Server, "error").catch(() => undefined);
      await new Promise((resolve) => setImmediate(resolve));
      return started;
    });
    assert.equal((server as http.Server).listening, false);
    assert.deepEqual(warnings, [
      `[Quota Panel] Port ${port} is already in use. The quota panel port stays off.`,
    ]);
  } finally {
    shut(holder);
  }
});

test("a bind address the host does not have logs a warning and does not throw", async () => {
  const port = await freePort();
  // 203.0.113.1 is in a documentation range and is never a local address.
  const { result: server, warnings } = await captureWarnings(async () => {
    const started = bridge.startQuotaPanelListener(
      { QUOTA_PANEL_PORT: String(port), QUOTA_PANEL_HOST: "203.0.113.1" },
      { apiPort: 1, dashboardPort: 2 }
    );
    await once(started as http.Server, "error").catch(() => undefined);
    await new Promise((resolve) => setImmediate(resolve));
    return started;
  });
  // The notice about the bind address comes only once the port listens, so a failed bind logs
  // only its own warning.
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /^\[Quota Panel\] Failed to start:/);
  assert.equal((server as http.Server).listening, false);
});

test("the notice about a bind address other than loopback follows the listening line", async (t) => {
  const external = Object.values(os.networkInterfaces())
    .flat()
    .find((entry) => entry && entry.family === "IPv4" && !entry.internal);
  if (!external) {
    t.skip("no non-loopback IPv4 interface on this machine");
    return;
  }
  const host = external.address;
  const port = await freePort();
  const { result: server, events } = await captureWarnings(async () => {
    const started = bridge.startQuotaPanelListener(
      { QUOTA_PANEL_PORT: String(port), QUOTA_PANEL_HOST: host },
      { apiPort: 1, dashboardPort: 2 }
    );
    assert.ok(started);
    await Promise.race([once(started, "listening"), once(started, "error")]);
    await new Promise((resolve) => setImmediate(resolve));
    return started;
  });
  try {
    assert.equal(server.listening, true);
    assert.deepEqual(events, [
      `log: [Quota Panel] Listening on ${host}:${port} -> dashboard:2`,
      `warn: [Quota Panel] Bound to ${host}. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.`,
    ]);
  } finally {
    shut(server);
  }
});

test("an error after the listener is listening is logged as a listener error", async () => {
  const port = await freePort();
  const { result: server, warnings } = await captureWarnings(async () => {
    const started = bridge.startQuotaPanelListener(
      { QUOTA_PANEL_PORT: String(port) },
      { apiPort: 1, dashboardPort: 2 }
    );
    assert.ok(started);
    await once(started, "listening");
    await new Promise((resolve) => setImmediate(resolve));
    started.emit("error", Object.assign(new Error("too many open files"), { code: "EMFILE" }));
    started.emit("error", new Error("accept failed"));
    return started;
  });
  try {
    assert.deepEqual(warnings, [
      "[Quota Panel] Listener error: EMFILE",
      "[Quota Panel] Listener error: accept failed",
    ]);
    assert.equal(server.listening, true);
  } finally {
    shut(server);
  }
});

test("the panel listener has its own connection limit and timeouts", async () => {
  const port = await freePort();
  const { result: server } = await captureWarnings(async () => {
    const started = bridge.startQuotaPanelListener(
      { QUOTA_PANEL_PORT: String(port) },
      { apiPort: 1, dashboardPort: 2 }
    );
    assert.ok(started);
    await once(started, "listening");
    return started;
  });
  try {
    assert.equal(panel.QUOTA_PANEL_MAX_CONNECTIONS, 256);
    assert.equal(panel.QUOTA_PANEL_HEADERS_TIMEOUT_MS, 10_000);
    assert.equal(panel.QUOTA_PANEL_REQUEST_TIMEOUT_MS, 30_000);
    assert.equal(panel.QUOTA_PANEL_KEEP_ALIVE_TIMEOUT_MS, 5_000);
    assert.equal(server.maxConnections, panel.QUOTA_PANEL_MAX_CONNECTIONS);
    assert.equal(server.headersTimeout, panel.QUOTA_PANEL_HEADERS_TIMEOUT_MS);
    assert.equal(server.requestTimeout, panel.QUOTA_PANEL_REQUEST_TIMEOUT_MS);
    assert.equal(server.keepAliveTimeout, panel.QUOTA_PANEL_KEEP_ALIVE_TIMEOUT_MS);
    assert.equal(panel.QUOTA_PANEL_SOCKET_TIMEOUT_MS, 60_000);
    assert.equal(server.timeout, panel.QUOTA_PANEL_SOCKET_TIMEOUT_MS);
    // The interval is passed as a server option, and the server keeps the value it was given.
    // The test "server options reach the bridge server" in quota-panel-bridge.test.ts shows
    // that the option makes the header timeout apply.
    assert.equal(panel.QUOTA_PANEL_TIMEOUT_CHECK_INTERVAL_MS, 1_000);
    assert.equal(
      (server as http.Server & { connectionsCheckingInterval?: number })
        .connectionsCheckingInterval,
      panel.QUOTA_PANEL_TIMEOUT_CHECK_INTERVAL_MS
    );
  } finally {
    shut(server);
  }
  // The API role's server keeps its own settings and has no connection limit.
  const api = bridge.createApiBridgeServer(2);
  assert.ok(api.maxConnections === undefined || api.maxConnections === 0, "no limit");
  assert.notEqual(api.headersTimeout, panel.QUOTA_PANEL_HEADERS_TIMEOUT_MS);
  assert.notEqual(api.requestTimeout, panel.QUOTA_PANEL_REQUEST_TIMEOUT_MS);
});

// This test goes last: initApiBridgeServer installs a process-wide crash guard.
test("the panel listener starts when the API port is not split", async () => {
  const keys = [
    "PORT",
    "OMNIROUTE_PORT",
    "API_PORT",
    "DASHBOARD_PORT",
    "QUOTA_PANEL_PORT",
    "QUOTA_PANEL_HOST",
    "OMNIROUTE_BASE_PATH",
    "LIVE_WS_PORT",
    "OMNIROUTE_ENABLE_LIVE_WS",
  ];
  const saved = new Map(keys.map((key) => [key, process.env[key]]));
  const savedStarted = globalThis.__omnirouteApiBridgeStarted;
  const mainPort = await freePort();
  const panelPort = await freePort();
  for (const key of keys) delete process.env[key];
  process.env.API_PORT = String(mainPort);
  process.env.DASHBOARD_PORT = String(mainPort);
  process.env.QUOTA_PANEL_PORT = String(panelPort);
  globalThis.__omnirouteQuotaPanelServer = undefined;
  globalThis.__omnirouteApiBridgeStarted = undefined;
  let server: http.Server | null | undefined;
  try {
    const first = await captureWarnings(async () => {
      bridge.initApiBridgeServer();
      server = globalThis.__omnirouteQuotaPanelServer;
      assert.ok(server);
      await once(server, "listening");
      await new Promise((resolve) => setImmediate(resolve));
    });
    assert.deepEqual(first.warnings, []);
    assert.deepEqual(first.logs, [
      `[Quota Panel] Listening on 127.0.0.1:${panelPort} -> dashboard:${mainPort}`,
    ]);
    assert.ok(server);
    assert.equal((await call(panelPort, "/dashboard")).status, 404); // nothing is relayed
    const second = await captureWarnings(() => bridge.initApiBridgeServer());
    assert.deepEqual([...second.warnings, ...second.logs], []);
    assert.equal(globalThis.__omnirouteQuotaPanelServer, server);
    assert.notEqual(globalThis.__omnirouteApiBridgeStarted, true);
  } finally {
    if (server) shut(server);
    globalThis.__omnirouteQuotaPanelServer = undefined;
    globalThis.__omnirouteApiBridgeStarted = savedStarted;
    for (const [key, value] of saved) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
