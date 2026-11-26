import test, { describe, it } from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

// C18: when the desktop shell's default port is busy, the opt-in flow tries the next five
// (20129 to 20133). The shell trusts only the bind its own active child confirms over a private
// IPC channel; a healthy foreign service on the default port must never open a window.

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const {
  ATTEMPT_TOKEN_ENV,
  DEFAULT_EMBEDDED_PORT,
  EMBEDDED_BIND_FAILED_EVENT,
  EMBEDDED_BOUND_EVENT,
  FALLBACK_FLAG_ENV,
  PORT_FALLBACK_SPAN,
  bundleReportsBind,
  describeStartupFailure,
  isFallbackFlagEnabled,
  parseEmbeddedBindEvent,
  resolveFallbackPolicy,
  startEmbeddedOnAvailablePort,
  startLocalEmbeddedServer,
} = require("../../electron/lib/localServerStartup.js");
const { buildReadinessUrl, waitForServer } = require("../../electron/lib/serverReadiness.js");

// ─── Harness: fake child processes and the shell's consumers of the published port ──────

type FakeChild = EventEmitter & {
  port: number;
  token: string;
  exited: boolean;
  signals: string[];
  emitBound: (port?: number) => void;
  emitBindFailed: (code: string, port?: number) => void;
  die: (code?: number) => void;
};

function makeFakeChild(port: number, token: string): FakeChild {
  const child = new EventEmitter() as FakeChild;
  child.port = port;
  child.token = token;
  child.exited = false;
  child.signals = [];
  child.emitBound = (p = port) =>
    child.emit("message", { type: EMBEDDED_BOUND_EVENT, port: p, token });
  child.emitBindFailed = (code, p = port) =>
    child.emit("message", { type: EMBEDDED_BIND_FAILED_EVENT, port: p, code, token });
  child.die = (code = 1) => {
    if (child.exited) return;
    child.exited = true;
    child.emit("exit", code, null);
  };
  return child;
}

type Harness = {
  children: FakeChild[];
  attemptedPorts: number[];
  probedUrls: string[];
  published: number[];
  // What the shell derives from the published port.
  rendererUrls: string[];
  trayPort: number | null;
  appInfo: { port: number };
  clientSnippet: string;
  controller: AbortController;
  run: (opts?: {
    allowFallback?: boolean;
    requestedPort?: number;
  }) => Promise<Awaited<ReturnType<typeof startLocalEmbeddedServer>>>;
};

function makeHarness(opts: {
  onSpawn: (child: FakeChild, index: number, h: Harness) => void;
  foreignHealthy?: number[];
  exitDelayMs?: number;
  timeoutMs?: number;
}): Harness {
  const foreignHealthy = new Set(opts.foreignHealthy ?? []);
  const h: Harness = {
    children: [],
    attemptedPorts: [],
    probedUrls: [],
    published: [],
    rendererUrls: [],
    trayPort: null,
    appInfo: { port: DEFAULT_EMBEDDED_PORT },
    clientSnippet: `http://localhost:${DEFAULT_EMBEDDED_PORT}/v1`,
    controller: new AbortController(),
    run: async (runOpts = {}) => {
      return startLocalEmbeddedServer({
        requestedPort: runOpts.requestedPort ?? DEFAULT_EMBEDDED_PORT,
        allowFallback: runOpts.allowFallback ?? true,
        signal: h.controller.signal,
        timeoutMs: opts.timeoutMs ?? 5000,
        exitTimeoutMs: 200,
        spawnChild: (port: number, token: string) => {
          const child = makeFakeChild(port, token);
          h.children.push(child);
          h.attemptedPorts.push(port);
          setImmediate(() => opts.onSpawn(child, h.children.length - 1, h));
          return child;
        },
        stopChild: (child: FakeChild, signal = "SIGTERM") => {
          child.signals.push(signal);
          setTimeout(() => child.die(143), opts.exitDelayMs ?? 5);
        },
        waitUntilReady: (port: number, timeoutMs: number) =>
          waitForServer(buildReadinessUrl(`http://localhost:${port}`), timeoutMs, {
            requestTimeoutMs: 50,
            pollIntervalMs: 5,
            warnFn: () => {},
            fetchFn: async (url: string) => {
              h.probedUrls.push(url);
              const probed = Number(new URL(url).port);
              // Only a port some process really serves answers 200.
              const servedByUs = h.children.some((c) => c.port === probed && !c.exited);
              return { ok: servedByUs || foreignHealthy.has(probed) } as Response;
            },
          }),
        publish: (port: number) => {
          h.published.push(port);
          // Mirrors electron/main.js: every consumer derives from the one published port.
          h.rendererUrls.push(`http://localhost:${port}`);
          h.trayPort = port;
          h.appInfo = { port };
          h.clientSnippet = `http://localhost:${port}/v1`;
        },
      });
    },
  };
  return h;
}

// ─── Behavior of the startup flow ────────────────────────────────────────────────

describe("embedded server port fallback: startup flow", () => {
  it("ignores a healthy port occupier and late events from the previous child", async () => {
    const h = makeHarness({
      foreignHealthy: [20128], // a foreign service answers 200 on the default port
      onSpawn: (child, index, harness) => {
        if (index === 0) {
          child.emitBindFailed("EADDRINUSE");
        } else {
          // The previous child speaks up again, late, AFTER the next attempt started.
          harness.children[0].emit("message", {
            type: EMBEDDED_BOUND_EVENT,
            port: 20128,
            token: harness.children[0].token,
          });
          // And a stale-looking event on the current channel carries the wrong token.
          child.emit("message", { type: EMBEDDED_BOUND_EVENT, port: 20129, token: "x".repeat(20) });
          child.emitBound();
        }
      },
    });

    const result = await h.run();

    assert.deepEqual(result, { kind: "ready", port: 20129 });
    assert.deepEqual(h.attemptedPorts, [20128, 20129]);
    assert.deepEqual(h.rendererUrls, ["http://localhost:20129"]);
    assert.equal(h.trayPort, 20129);
    assert.equal(h.appInfo.port, 20129);
    assert.match(h.clientSnippet, /localhost:20129\/v1/);
    // The foreign service on 20128 was never asked anything: no health probe before a bind.
    const foreignProbes = h.probedUrls.filter((u) => new URL(u).port === "20128");
    assert.equal(foreignProbes.length, 0);
    assert.deepEqual(h.published, [20129], "publish exactly once, for the confirmed port");
  });

  it("starts the next port only after the previous child has exited", async () => {
    const order: string[] = [];
    const h = makeHarness({
      exitDelayMs: 40,
      onSpawn: (child, index, harness) => {
        order.push(`spawn:${child.port}`);
        if (index === 0) {
          child.once("exit", () => order.push("exit:20128"));
          child.emitBindFailed("EADDRINUSE");
        } else {
          child.emitBound();
        }
        void harness;
      },
    });
    await h.run();
    assert.deepEqual(order, ["spawn:20128", "exit:20128", "spawn:20129"]);
    assert.deepEqual(h.children[0].signals, ["SIGTERM"]);
  });

  it("does not search at all when the fallback is not allowed", async () => {
    const h = makeHarness({
      foreignHealthy: [20128],
      onSpawn: (child) => child.emitBindFailed("EADDRINUSE"),
    });
    const result = await h.run({ allowFallback: false });
    assert.deepEqual(result, { kind: "bind-error", code: "EADDRINUSE" });
    assert.deepEqual(h.attemptedPorts, [20128]);
    assert.deepEqual(h.published, []);
    assert.deepEqual(h.probedUrls, []);
  });

  it("stops on EACCES without trying another port", async () => {
    const h = makeHarness({ onSpawn: (child) => child.emitBindFailed("EACCES") });
    const result = await h.run();
    assert.deepEqual(result, { kind: "bind-error", code: "EACCES" });
    assert.deepEqual(h.attemptedPorts, [20128]);
    assert.deepEqual(h.published, []);
  });

  it("gives up after the five ports following the default and never goes further", async () => {
    const h = makeHarness({ onSpawn: (child) => child.emitBindFailed("EADDRINUSE") });
    const result = await h.run();
    assert.deepEqual(result, { kind: "bind-error", code: "EADDRINUSE" });
    assert.equal(PORT_FALLBACK_SPAN, 5);
    assert.deepEqual(h.attemptedPorts, [20128, 20129, 20130, 20131, 20132, 20133]);
    assert.deepEqual(h.published, []);
    assert.equal(
      h.children.every((c) => c.exited),
      true,
      "every failed child is gone"
    );
  });

  it("treats a child that dies before reporting as a startup failure, not a free port", async () => {
    const h = makeHarness({ onSpawn: (child) => child.die(1) });
    const result = await h.run();
    assert.deepEqual(result, { kind: "failed", reason: "exit" });
    assert.deepEqual(h.attemptedPorts, [20128]);
    assert.deepEqual(h.published, []);
  });

  it("does not publish when the bound child fails its health check", async () => {
    const h = makeHarness({
      timeoutMs: 150,
      onSpawn: (child) => {
        child.emitBound();
        child.exited = true; // bound, then gone: nothing answers on that port
        child.emit("exit", 1, null);
      },
    });
    const result = await h.run();
    assert.equal(result.kind, "failed");
    assert.deepEqual(h.published, []);
  });

  it("cancels a startup in flight: child stopped, nothing published", async () => {
    const h = makeHarness({
      onSpawn: () => {
        /* the child never reports anything */
      },
    });
    const pending = h.run();
    await new Promise((r) => setTimeout(r, 20));
    h.controller.abort();
    const result = await pending;
    assert.deepEqual(result, { kind: "failed", reason: "cancelled" });
    assert.deepEqual(h.children[0].signals, ["SIGTERM"]);
    assert.equal(h.children[0].exited, true);
    assert.deepEqual(h.published, []);
    assert.deepEqual(h.attemptedPorts, [20128]);
  });

  it("does not spawn anything when already cancelled", async () => {
    const h = makeHarness({ onSpawn: () => {} });
    h.controller.abort();
    const result = await h.run();
    assert.deepEqual(result, { kind: "failed", reason: "cancelled" });
    assert.deepEqual(h.attemptedPorts, []);
  });

  it("fails with a timeout when the child never reports a bind", async () => {
    const h = makeHarness({ timeoutMs: 60, onSpawn: () => {} });
    const result = await h.run();
    assert.deepEqual(result, { kind: "failed", reason: "timeout" });
    assert.deepEqual(h.published, []);
    assert.equal(h.children[0].exited, true);
  });

  it("startEmbeddedOnAvailablePort only advances on a confirmed EADDRINUSE", async () => {
    const seen: number[] = [];
    const result = await startEmbeddedOnAvailablePort({
      requestedPort: 20128,
      allowFallback: true,
      signal: new AbortController().signal,
      startAttempt: async (port: number) => {
        seen.push(port);
        if (port === 20128) return { kind: "bind-error", code: "EADDRINUSE" };
        return { kind: "failed", reason: "startup" };
      },
    });
    assert.deepEqual(result, { kind: "failed", reason: "startup" });
    assert.deepEqual(seen, [20128, 20129]);
  });
});

// ─── Eligibility ─────────────────────────────────────────────────────────────────────

describe("embedded server port fallback: eligibility", () => {
  const eligible = {
    env: { [FALLBACK_FLAG_ENV]: "true" } as Record<string, string>,
    requestedPort: 20128,
    remoteServerUrl: null,
    isDev: false,
    isHeadless: false,
    bundleReportsBind: true,
  };

  it("is enabled only in the local graphical packaged mode with the default port", () => {
    assert.deepEqual(resolveFallbackPolicy(eligible), { enabled: true, reason: "enabled" });
  });

  it("accepts the same truthy spellings as the registered flag", () => {
    for (const on of ["true", "1", "yes", " TRUE "]) assert.equal(isFallbackFlagEnabled(on), true);
    for (const off of ["", "false", "0", "no", "on", undefined, null, 1]) {
      assert.equal(isFallbackFlagEnabled(off as string), false);
    }
  });

  const off: Array<[string, Partial<typeof eligible>, string]> = [
    ["flag unset", { env: {} }, "flag-off"],
    ["flag false", { env: { [FALLBACK_FLAG_ENV]: "false" } }, "flag-off"],
    ["remote mode", { remoteServerUrl: "http://10.0.0.5:20128" }, "remote-mode"],
    ["dev mode", { isDev: true }, "dev"],
    ["headless", { isHeadless: true }, "headless"],
    ["a non-default requested port", { requestedPort: 3000 }, "custom-port"],
    ["explicit PORT", { env: { [FALLBACK_FLAG_ENV]: "true", PORT: "20128" } }, "explicit-port"],
    [
      "explicit OMNIROUTE_PORT",
      { env: { [FALLBACK_FLAG_ENV]: "true", OMNIROUTE_PORT: "21000" } },
      "explicit-port",
    ],
    ["split API port", { env: { [FALLBACK_FLAG_ENV]: "true", API_PORT: "20129" } }, "split-port"],
    [
      "split dashboard port",
      { env: { [FALLBACK_FLAG_ENV]: "true", DASHBOARD_PORT: "20130" } },
      "split-port",
    ],
    ["a legacy bundle without the bind report", { bundleReportsBind: false }, "legacy-bundle"],
  ];
  for (const [name, patch, reason] of off) {
    it(`stays off for ${name}`, () => {
      assert.deepEqual(resolveFallbackPolicy({ ...eligible, ...patch }), {
        enabled: false,
        reason,
      });
    });
  }

  it("reads the wrapper only after every other condition allows the search", () => {
    let reads = 0;
    const lazy = () => {
      reads += 1;
      return true;
    };
    resolveFallbackPolicy({ ...eligible, env: {}, bundleReportsBind: lazy });
    resolveFallbackPolicy({ ...eligible, isDev: true, bundleReportsBind: lazy });
    assert.equal(reads, 0, "flag off or an ineligible mode must not touch the bundle");
    assert.equal(resolveFallbackPolicy({ ...eligible, bundleReportsBind: lazy }).enabled, true);
    assert.equal(reads, 1);
  });

  it("detects a wrapper that reports its bind", () => {
    assert.equal(bundleReportsBind(`send("${EMBEDDED_BOUND_EVENT}")`), true);
    assert.equal(bundleReportsBind("import http from 'node:http';"), false);
    assert.equal(bundleReportsBind(undefined as unknown as string), false);
  });
});

describe("embedded server port fallback: failure message", () => {
  it("names the range when every port is busy and never promises a random port", () => {
    const { message } = describeStartupFailure({ kind: "bind-error", code: "EADDRINUSE" }, 20128);
    assert.match(message, /20128 to 20133/);
    assert.doesNotMatch(message, /random|ephemeral/i);
  });

  it("distinguishes permission errors and other failures", () => {
    assert.match(
      describeStartupFailure({ kind: "bind-error", code: "EACCES" }, 20128).message,
      /allow/
    );
    assert.match(
      describeStartupFailure({ kind: "bind-error", code: "EINVAL" }, 20128).message,
      /EINVAL/
    );
    assert.match(describeStartupFailure({ kind: "failed", reason: "exit" }, 20128).message, /exit/);
  });
});

// ─── IPC event validation ────────────────────────────────────────────────────────────

describe("embedded server port fallback: bind event validation", () => {
  const token = "a1b2c3d4-e5f6-7890-abcd-ef0123456789";
  const expected = { port: 20129, token };

  it("accepts a well formed event for this attempt", () => {
    assert.deepEqual(
      parseEmbeddedBindEvent({ type: EMBEDDED_BOUND_EVENT, port: 20129, token }, expected),
      { type: EMBEDDED_BOUND_EVENT, port: 20129, token }
    );
    assert.deepEqual(
      parseEmbeddedBindEvent(
        { type: EMBEDDED_BIND_FAILED_EVENT, port: 20129, code: "EADDRINUSE", token },
        expected
      ),
      { type: EMBEDDED_BIND_FAILED_EVENT, port: 20129, code: "EADDRINUSE", token }
    );
  });

  it("rejects everything else", () => {
    const bad: unknown[] = [
      null,
      undefined,
      "omniroute:embedded-bound",
      42,
      [],
      {},
      { type: "other", port: 20129, token },
      { type: EMBEDDED_BOUND_EVENT, port: 20128, token }, // another port
      { type: EMBEDDED_BOUND_EVENT, port: "20129", token }, // not a number
      { type: EMBEDDED_BOUND_EVENT, port: 20129.5, token },
      { type: EMBEDDED_BOUND_EVENT, port: 70000, token },
      { type: EMBEDDED_BOUND_EVENT, port: 20129, token: "someone-else-0123456789" },
      { type: EMBEDDED_BOUND_EVENT, port: 20129 },
      { type: EMBEDDED_BIND_FAILED_EVENT, port: 20129, token }, // no code
      { type: EMBEDDED_BIND_FAILED_EVENT, port: 20129, code: "eaddrinuse", token },
      { type: EMBEDDED_BIND_FAILED_EVENT, port: 20129, code: "X".repeat(99), token },
    ];
    for (const message of bad) {
      assert.equal(parseEmbeddedBindEvent(message, expected), null, JSON.stringify(message));
    }
  });
});

// ─── Wiring (static) and registration ───────────────────────────────────────────────

describe("embedded server port fallback: wiring", () => {
  const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), "utf8");

  it("ships the helper in the packaged app", () => {
    const pkg = JSON.parse(read("electron/package.json"));
    assert.ok(pkg.build.files.includes("lib/localServerStartup.js"));
  });

  it("registers an opt-in flag that needs a restart, outside the main catalog file", async () => {
    const { ELECTRON_LOCAL_PORT_FALLBACK_ENABLED_FLAG } =
      await import("../../src/shared/constants/featureFlagDefinitionsElectronPortFallback.ts");
    const { EXTRA_FEATURE_FLAG_DEFINITIONS } =
      await import("../../src/shared/constants/featureFlagDefinitionsExtras.ts");
    assert.equal(ELECTRON_LOCAL_PORT_FALLBACK_ENABLED_FLAG.key, FALLBACK_FLAG_ENV);
    assert.equal(ELECTRON_LOCAL_PORT_FALLBACK_ENABLED_FLAG.defaultValue, "false");
    assert.equal(ELECTRON_LOCAL_PORT_FALLBACK_ENABLED_FLAG.type, "boolean");
    assert.equal(ELECTRON_LOCAL_PORT_FALLBACK_ENABLED_FLAG.requiresRestart, true);
    assert.ok(EXTRA_FEATURE_FLAG_DEFINITIONS.includes(ELECTRON_LOCAL_PORT_FALLBACK_ENABLED_FLAG));
    assert.doesNotMatch(read("src/shared/constants/featureFlagDefinitions.ts"), /ELECTRON_LOCAL/);
  });

  it("main.js publishes the port only through the confirmed-bind flow", () => {
    const main = read("electron/main.js");
    assert.match(main, /require\("\.\/lib\/localServerStartup"\)/);
    assert.match(main, /startLocalEmbeddedServer\(/);
    assert.match(main, /resolveFallbackPolicy\(/);
    // The only assignment that adopts a discovered port is inside the publish callback.
    const publish = main.match(/publish: \(port\) => \{[\s\S]*?\n {4}\},/);
    assert.ok(publish, "main.js must hand startLocalEmbeddedServer a publish callback");
    assert.match(publish![0], /serverPort = port;/);
    assert.match(publish![0], /createTray\(\)/);
    assert.match(publish![0], /port-changed/);
    assert.equal((main.match(/serverPort = port;/g) ?? []).length, 1);
    // The embedded child is spawned without a shell and the token travels through env only.
    assert.match(main, /shell: false/);
    assert.match(main, new RegExp(`\\[ATTEMPT_TOKEN_ENV\\]: token`));
    assert.match(main, /stdio: \["pipe", "pipe", "pipe", "ipc"\]/);
  });

  it("main.js never opens a window on a failed discovery", () => {
    const main = read("electron/main.js");
    assert.match(main, /dialog\.showErrorBox/);
    const ready = main.match(/app\.whenReady\(\)\.then\(async \(\) => \{[\s\S]*?\n\}\);/);
    assert.ok(ready);
    const body = ready![0];
    assert.ok(
      body.indexOf("embeddedStartupFailed") < body.indexOf("showMainWindow()"),
      "the failure branch must run before the window is created"
    );
  });

  it("the standalone wrapper reports the bind of its main listener over IPC", () => {
    const wrapper = read("scripts/dev/standalone-server-ws.mjs");
    assert.ok(wrapper.includes(EMBEDDED_BOUND_EVENT));
    assert.ok(wrapper.includes(EMBEDDED_BIND_FAILED_EVENT));
    assert.ok(wrapper.includes(ATTEMPT_TOKEN_ENV));
  });
});

// ─── The real wrapper, with a real occupied port and a real IPC channel ─────────────────

const WRAPPER_SOURCE = path.join(ROOT, "scripts/dev/standalone-server-ws.mjs");
const SIBLINGS: Array<[string, string]> = [
  ["scripts/dev/peer-stamp.mjs", "peer-stamp.mjs"],
  ["scripts/dev/main-server-timeouts.mjs", "main-server-timeouts.mjs"],
  ["scripts/dev/systemd-notify.mjs", "systemd-notify.mjs"],
  ["scripts/dev/http-method-guard.cjs", "http-method-guard.cjs"],
  ["scripts/dev/head-response-guard.cjs", "head-response-guard.cjs"],
  ["scripts/dev/h2c-upgrade-guard.cjs", "h2c-upgrade-guard.cjs"],
  ["scripts/dev/responses-ws-proxy.mjs", "responses-ws-proxy.mjs"],
  ["src/shared/utils/httpClientAbortGuard.mjs", "httpClientAbortGuard.mjs"],
  ["scripts/dev/webdav-handler.mjs", "webdav-handler.mjs"],
  ["scripts/dev/tls-options.mjs", "tls-options.mjs"],
];

// Behaves like Next's start-server on a listen error: log it and exit 1, right after every other
// 'error' listener (the wrapper's report) already ran.
const FAKE_NEXT_SERVER = String.raw`
const http = require("node:http");
const server = http.createServer((req, res) => res.end("ok"));
server.on("error", (err) => {
  console.error("listen error", err.code);
  process.exit(1);
});
server.listen(Number(process.env.PORT), process.env.HOSTNAME || "127.0.0.1");
`;

function makeWrapperDir(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-embedded-bind-"));
  fs.copyFileSync(WRAPPER_SOURCE, path.join(dir, "server-ws.mjs"));
  for (const [src, dest] of SIBLINGS) fs.copyFileSync(path.join(ROOT, src), path.join(dir, dest));
  fs.writeFileSync(path.join(dir, "server.js"), FAKE_NEXT_SERVER);
  return dir;
}

function listenOnFreePort(): Promise<{ server: net.Server; port: number }> {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      resolve({ server, port: (server.address() as net.AddressInfo).port });
    });
  });
}

async function runWrapperChild(
  dir: string,
  env: Record<string, string>,
  stop: "after-message" | "never"
): Promise<{ messages: unknown[]; code: number | null }> {
  const childEnv: NodeJS.ProcessEnv = { ...process.env, HOSTNAME: "127.0.0.1", ...env };
  delete childEnv.NOTIFY_SOCKET;
  delete childEnv.NEXT_MANUAL_SIG_HANDLE;
  const child = spawn(process.execPath, ["server-ws.mjs"], {
    cwd: dir,
    env: childEnv,
    stdio: ["pipe", "pipe", "pipe", "ipc"],
  });
  const messages: unknown[] = [];
  child.on("message", (m) => messages.push(m));
  child.stdout?.resume();
  child.stderr?.resume();
  const exited = new Promise<number | null>((resolve) =>
    child.once("exit", (code) => resolve(code))
  );
  const deadline = Date.now() + 15_000;
  while (messages.length === 0 && child.exitCode === null) {
    if (Date.now() > deadline) break;
    await new Promise((r) => setTimeout(r, 20));
  }
  if (stop === "after-message" && child.exitCode === null) child.kill("SIGTERM");
  const killer = setTimeout(() => child.kill("SIGKILL"), 10_000);
  const code = await exited;
  clearTimeout(killer);
  return { messages, code };
}

describe("embedded server port fallback: the real standalone wrapper over IPC", () => {
  const TOKEN = "0123456789abcdef-token";

  it("reports a bind failure on an occupied port", async () => {
    const dir = makeWrapperDir();
    const occupier = await listenOnFreePort();
    try {
      const result = await runWrapperChild(
        dir,
        { PORT: String(occupier.port), [ATTEMPT_TOKEN_ENV]: TOKEN },
        "after-message"
      );
      assert.deepEqual(result.messages, [
        { type: EMBEDDED_BIND_FAILED_EVENT, port: occupier.port, code: "EADDRINUSE", token: TOKEN },
      ]);
    } finally {
      occupier.server.close();
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("reports the bound port once the main listener is listening", async () => {
    const dir = makeWrapperDir();
    const probe = await listenOnFreePort();
    const freePort = probe.port;
    await new Promise((resolve) => probe.server.close(resolve));
    try {
      const result = await runWrapperChild(
        dir,
        { PORT: String(freePort), [ATTEMPT_TOKEN_ENV]: TOKEN },
        "after-message"
      );
      assert.deepEqual(result.messages, [
        { type: EMBEDDED_BOUND_EVENT, port: freePort, token: TOKEN },
      ]);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("stays silent without a token, so other launchers see no change", async () => {
    const dir = makeWrapperDir();
    const probe = await listenOnFreePort();
    const freePort = probe.port;
    await new Promise((resolve) => probe.server.close(resolve));
    const childEnv: NodeJS.ProcessEnv = {
      ...process.env,
      HOSTNAME: "127.0.0.1",
      PORT: String(freePort),
    };
    delete childEnv[ATTEMPT_TOKEN_ENV];
    delete childEnv.NOTIFY_SOCKET;
    delete childEnv.NEXT_MANUAL_SIG_HANDLE;
    const child = spawn(process.execPath, ["server-ws.mjs"], {
      cwd: dir,
      env: childEnv,
      stdio: ["pipe", "pipe", "pipe", "ipc"],
    });
    const messages: unknown[] = [];
    child.on("message", (m) => messages.push(m));
    child.stdout?.resume();
    child.stderr?.resume();
    const exited = new Promise((resolve) => child.once("exit", resolve));
    try {
      await new Promise((r) => setTimeout(r, 1500));
      assert.deepEqual(messages, []);
    } finally {
      child.kill("SIGTERM");
      await exited;
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});

test("flag key and bootstrap env names stay stable", () => {
  assert.equal(FALLBACK_FLAG_ENV, "ELECTRON_LOCAL_PORT_FALLBACK_ENABLED");
  assert.equal(ATTEMPT_TOKEN_ENV, "OMNIROUTE_EMBEDDED_BIND_TOKEN");
  assert.equal(DEFAULT_EMBEDDED_PORT, 20128);
});
