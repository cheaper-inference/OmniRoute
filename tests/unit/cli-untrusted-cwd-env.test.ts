/**
 * R6B-1: a `.env` in the working directory must not be able to send the CLI's
 * credentials elsewhere or inject code into `omniroute serve`.
 *
 * Every request goes to in-process loopback servers; HOME and the data dir are
 * temp directories; the injected code only writes a marker file.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const BIN = path.join(ROOT, "bin", "omniroute.mjs");

type Hit = { url: string; authorization: string | null; cliToken: string | null };

async function startRecorder(host = "127.0.0.1") {
  const hits: Hit[] = [];
  const server = http.createServer((req, res) => {
    hits.push({
      url: req.url ?? "",
      authorization: (req.headers.authorization as string) ?? null,
      cliToken: (req.headers["x-omniroute-cli-token"] as string) ?? null,
    });
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
  });
  await new Promise<void>((resolve) => server.listen(0, host, resolve));
  const { port } = server.address() as net.AddressInfo;
  return { hits, port, close: () => new Promise<void>((r) => server.close(() => r())) };
}

async function freePort() {
  const srv = net.createServer();
  await new Promise<void>((resolve) => srv.listen(0, "127.0.0.1", resolve));
  const { port } = srv.address() as net.AddressInfo;
  await new Promise<void>((r) => srv.close(() => r()));
  return port;
}

function layout() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-r6b1-"));
  const home = path.join(tmp, "home");
  const dataDir = path.join(home, ".omniroute");
  const cwd = path.join(tmp, "untrusted");
  fs.mkdirSync(dataDir, { recursive: true });
  fs.mkdirSync(cwd, { recursive: true });
  return { tmp, home, dataDir, cwd };
}

function cleanEnv(home: string, extra: Record<string, string> = {}) {
  const env: Record<string, string> = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value === undefined) continue;
    if (/^(OMNIROUTE_|NODE_|NPM_CONFIG_|DATA_DIR$|PORT$|API_PORT$|DASHBOARD_PORT$)/i.test(key)) {
      continue;
    }
    if (/_PROXY$|^XDG_|^LD_|^DYLD_|^SSL_CERT_|^USERPROFILE$|^APPDATA$/i.test(key)) continue;
    env[key] = value;
  }
  return {
    ...env,
    HOME: home,
    CI: "1",
    NO_UPDATE_NOTIFIER: "1",
    OMNIROUTE_NO_UPDATE_NOTIFIER: "1",
    OMNIROUTE_CLI_SKIP_REPO_ENV: "1",
    OMNIROUTE_CONTEXT_KEYCHAIN_DISABLED: "1",
    OMNIROUTE_DISABLE_CLI_TOKEN: "1",
    STORAGE_ENCRYPTION_KEY: "0".repeat(64),
    ...extra,
  };
}

function runCli(bin: string, args: string[], cwd: string, env: Record<string, string>) {
  return new Promise<{ code: number | null; stdout: string; stderr: string }>((resolve) => {
    const child = spawn(process.execPath, [bin, ...args], { cwd, env, detached: true });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (d) => (stdout += d));
    child.stderr.on("data", (d) => (stderr += d));
    const timer = setTimeout(() => {
      try {
        process.kill(-child.pid!, "SIGKILL");
      } catch {}
    }, 60_000);
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code, stdout, stderr });
    });
  });
}

function rm(dir: string) {
  fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}

// ── (a) Bearer exfiltration through OMNIROUTE_BASE_URL ───────────────────────

test("cwd .env OMNIROUTE_BASE_URL (loopback) no longer receives the data-dir API key", async () => {
  const dirs = layout();
  const legit = await startRecorder();
  const sink = await startRecorder();
  try {
    fs.writeFileSync(
      path.join(dirs.dataDir, ".env"),
      `OMNIROUTE_API_KEY=sk-r6b1-datadir-key\nPORT=${legit.port}\n`
    );
    fs.writeFileSync(
      path.join(dirs.cwd, ".env"),
      `OMNIROUTE_BASE_URL=http://127.0.0.1:${sink.port}\n`
    );

    const { stderr } = await runCli(BIN, ["health"], dirs.cwd, cleanEnv(dirs.home));

    assert.deepEqual(sink.hits, [], "the cwd base URL must not be contacted");
    assert.ok(legit.hits.length > 0, `the configured server is used instead: ${stderr}`);
    assert.equal(legit.hits[0].authorization, "Bearer sk-r6b1-datadir-key");
    assert.match(stderr, /cannot set OMNIROUTE_BASE_URL; ignored/);
    assert.ok(!stderr.includes(`:${sink.port}`), "the ignored value is never printed");
  } finally {
    await legit.close();
    await sink.close();
    rm(dirs.tmp);
  }
});

test("cwd .env OMNIROUTE_BASE_URL (non-loopback host) no longer receives the remote context token", async () => {
  const dirs = layout();
  const remote = await startRecorder();
  const sink = await startRecorder();
  try {
    fs.writeFileSync(
      path.join(dirs.dataDir, "config.json"),
      JSON.stringify({
        version: 1,
        currentContext: "prod",
        contexts: {
          prod: {
            baseUrl: `http://127.0.0.1:${remote.port}`,
            accessToken: "oma_r6b1_remote_manage_token",
          },
        },
      })
    );
    // 0.0.0.0 is not loopback for isLoopbackUrl() but still reaches the local sink.
    fs.writeFileSync(
      path.join(dirs.cwd, ".env"),
      `OMNIROUTE_BASE_URL=http://0.0.0.0:${sink.port}\n`
    );

    await runCli(BIN, ["health"], dirs.cwd, cleanEnv(dirs.home));

    assert.deepEqual(sink.hits, []);
    assert.ok(remote.hits.length > 0, "the active context is used instead");
    assert.equal(remote.hits[0].authorization, "Bearer oma_r6b1_remote_manage_token");
  } finally {
    await remote.close();
    await sink.close();
    rm(dirs.tmp);
  }
});

// ── (C) the context token stays with its own origin ─────────────────────────

test("a shell OMNIROUTE_BASE_URL pointing away from the context does not get the context token", async () => {
  const dirs = layout();
  const remote = await startRecorder();
  const other = await startRecorder();
  try {
    fs.writeFileSync(
      path.join(dirs.dataDir, "config.json"),
      JSON.stringify({
        version: 1,
        currentContext: "prod",
        contexts: {
          prod: {
            baseUrl: `http://127.0.0.1:${remote.port}`,
            accessToken: "oma_r6b1_remote_manage_token",
          },
        },
      })
    );

    await runCli(
      BIN,
      ["health"],
      dirs.cwd,
      cleanEnv(dirs.home, { OMNIROUTE_BASE_URL: `http://0.0.0.0:${other.port}` })
    );

    assert.ok(other.hits.length > 0, "the shell base URL is still honoured");
    for (const hit of other.hits) {
      assert.notEqual(hit.authorization, "Bearer oma_r6b1_remote_manage_token");
    }
    assert.deepEqual(remote.hits, []);
  } finally {
    await remote.close();
    await other.close();
    rm(dirs.tmp);
  }
});

// ── (c) trusted sources keep working ────────────────────────────────────────

test("data-dir .env still sets OMNIROUTE_BASE_URL, and wins over the cwd .env", async () => {
  const dirs = layout();
  const legit = await startRecorder();
  const sink = await startRecorder();
  try {
    fs.writeFileSync(
      path.join(dirs.dataDir, ".env"),
      `OMNIROUTE_BASE_URL=http://127.0.0.1:${legit.port}\nOMNIROUTE_API_KEY=sk-r6b1-datadir-key\n`
    );
    fs.writeFileSync(
      path.join(dirs.cwd, ".env"),
      `OMNIROUTE_BASE_URL=http://127.0.0.1:${sink.port}\n`
    );
    await runCli(BIN, ["health"], dirs.cwd, cleanEnv(dirs.home));
    assert.deepEqual(sink.hits, []);
    assert.ok(legit.hits.length > 0);
    assert.equal(legit.hits[0].authorization, "Bearer sk-r6b1-datadir-key");
  } finally {
    await legit.close();
    await sink.close();
    rm(dirs.tmp);
  }
});

test("a shell variable still wins over the cwd .env", async () => {
  const dirs = layout();
  const legit = await startRecorder();
  const sink = await startRecorder();
  try {
    fs.writeFileSync(path.join(dirs.cwd, ".env"), `PORT=${sink.port}\n`);
    await runCli(BIN, ["health"], dirs.cwd, cleanEnv(dirs.home, { PORT: String(legit.port) }));
    assert.deepEqual(sink.hits, []);
    assert.ok(legit.hits.length > 0);
  } finally {
    await legit.close();
    await sink.close();
    rm(dirs.tmp);
  }
});

// ── (d) ordinary keys in the cwd .env keep working ──────────────────────────

test("cwd .env PORT still applies", async () => {
  const dirs = layout();
  const legit = await startRecorder();
  try {
    fs.writeFileSync(path.join(dirs.cwd, ".env"), `PORT=${legit.port}\n`);
    const { stderr } = await runCli(BIN, ["health"], dirs.cwd, cleanEnv(dirs.home));
    assert.ok(legit.hits.length > 0, `PORT from the cwd .env is honoured: ${stderr}`);
    assert.doesNotMatch(stderr, /cannot set/);
  } finally {
    await legit.close();
    rm(dirs.tmp);
  }
});

// ── (b) `serve` must not hand cwd NODE_OPTIONS (or the rest) to the server ──
//
// `serve` runs <package>/dist/server.js. A throwaway package root holds a copy
// of bin/ plus a stub server.js that records its own environment and exits.

function makeServePackage(tmp: string) {
  const pkg = path.join(tmp, "pkg");
  fs.mkdirSync(path.join(pkg, "dist"), { recursive: true });
  fs.cpSync(path.join(ROOT, "bin"), path.join(pkg, "bin"), { recursive: true });
  for (const entry of fs.readdirSync(ROOT)) {
    if (["bin", "dist", "app", ".git", ".env"].includes(entry)) continue;
    fs.symlinkSync(path.join(ROOT, entry), path.join(pkg, entry));
  }
  fs.writeFileSync(
    path.join(pkg, "dist", "server.js"),
    [
      'import fs from "node:fs";',
      "fs.writeFileSync(process.env.R6B1_RESULT, JSON.stringify(process.env));",
      'console.log("listening");',
      "setTimeout(() => process.exit(0), 200);",
      "",
    ].join("\n")
  );
  return path.join(pkg, "bin", "omniroute.mjs");
}

async function runServe(
  dirs: ReturnType<typeof layout>,
  bin: string,
  adjustEnv: (env: Record<string, string>) => void = () => {},
  cwd = dirs.cwd
) {
  const result = path.join(dirs.tmp, "server-env.json");
  const port = await freePort();
  const env = cleanEnv(dirs.home, { R6B1_RESULT: result, OMNIROUTE_SERVER_HOST: "127.0.0.1" });
  adjustEnv(env);
  const out = await runCli(
    bin,
    ["serve", "--port", String(port), "--no-open", "--no-recovery", "--headless", "--no-tray"],
    cwd,
    env
  );
  assert.ok(fs.existsSync(result), `stub server must start: ${out.stderr}\n${out.stdout}`);
  return { childEnv: JSON.parse(fs.readFileSync(result, "utf8")), ...out };
}

test("serve: cwd NODE_OPTIONS (--require and --import=data:) does not reach the server", async () => {
  const dirs = layout();
  try {
    const bin = makeServePackage(dirs.tmp);
    const requireMarker = path.join(dirs.tmp, "require-marker.txt");
    const importMarker = path.join(dirs.tmp, "import-marker.txt");
    const preload = path.join(dirs.tmp, "preload.cjs");
    fs.writeFileSync(
      preload,
      `require("node:fs").appendFileSync(${JSON.stringify(requireMarker)}, "loaded\\n");\n`
    );

    fs.writeFileSync(path.join(dirs.cwd, ".env"), `NODE_OPTIONS=--require ${preload}\n`);
    const first = await runServe(dirs, bin);
    assert.ok(!fs.existsSync(requireMarker), "--require from the cwd .env must not run");
    assert.doesNotMatch(String(first.childEnv.NODE_OPTIONS ?? ""), /--require/);
    assert.match(first.stderr, /cannot set NODE_OPTIONS; ignored/);

    const code = `import('node:fs').then(f=>f.appendFileSync(${JSON.stringify(importMarker)},'loaded'))`;
    fs.writeFileSync(
      path.join(dirs.cwd, ".env"),
      `NODE_OPTIONS=--import=data:text/javascript,${encodeURIComponent(code)}\n`
    );
    const second = await runServe(dirs, bin);
    assert.ok(!fs.existsSync(importMarker), "--import=data: from the cwd .env must not run");
    assert.doesNotMatch(String(second.childEnv.NODE_OPTIONS ?? ""), /--import/);
  } finally {
    rm(dirs.tmp);
  }
});

test("serve: data-dir .env NODE_OPTIONS still reaches the server", async () => {
  const dirs = layout();
  try {
    const bin = makeServePackage(dirs.tmp);
    const marker = path.join(dirs.tmp, "datadir-marker.txt");
    const preload = path.join(dirs.tmp, "preload.cjs");
    fs.writeFileSync(
      preload,
      `require("node:fs").appendFileSync(${JSON.stringify(marker)}, "loaded\\n");\n`
    );
    // The plain-name rule applies to the working-directory file only.
    fs.writeFileSync(
      path.join(dirs.dataDir, ".env"),
      `NODE_OPTIONS=--require ${preload}\nOMNIROUTE-R6B1-DASHED=trusted\n`
    );
    const { childEnv } = await runServe(dirs, bin);
    assert.ok(fs.existsSync(marker), "a trusted NODE_OPTIONS keeps working");
    assert.match(String(childEnv.NODE_OPTIONS), /--require/);
    assert.equal(childEnv["OMNIROUTE-R6B1-DASHED"], "trusted");
  } finally {
    rm(dirs.tmp);
  }
});

// Keys a working-directory .env must not set. Spelled out rather than derived
// from the module. The allowlist skips every key not on it, so this list is a
// sample: keys the denylist of an earlier revision named, and keys it missed
// (the Python lookup and self-update keys, CA bundles, plural families,
// *_API_KEY, server policy switches).
const EXPECTED_SKIPPED = [
  "BASH_ENV",
  "ENV",
  "SHELL",
  "SHELLOPTS",
  "BASHOPTS",
  "PS4",
  "PROMPT_COMMAND",
  "ELECTRON_RUN_AS_NODE",
  "DOTNET_STARTUP_HOOKS",
  "NODE_V8_COVERAGE",
  "NODE_COMPILE_CACHE",
  "NODE_REDIRECT_WARNINGS",
  "NODE_ICU_DATA",
  "NODE_REPL_EXTERNAL_MODULE",
  "BROWSER",
  "VISUAL",
  "GLIBC_TUNABLES",
  "HOSTALIASES",
  "LOCALDOMAIN",
  "LOCPATH",
  "DBUS_SESSION_BUS_ADDRESS",
  "ZCODE_SERVER_NODE",
  "CODEX_CHATGPT_WEB_BUN",
  "SKILLS_SANDBOX_RUNTIME",
  "SKILLS_ALLOWED_SANDBOX_IMAGES",
  "OMNIROUTE_VNC_IMAGE",
  "OMNIROUTE_CODEX_APPSERVER_WS",
  "NODE_TLS_REJECT_UNAUTHORIZED",
  "MITM_DISABLE_TLS_VERIFY",
  "OMNIROUTE_TURNSTILE_IGNORE_TLS_ERRORS",
  "SSLKEYLOGFILE",
  "OPENSSL_MODULES",
  "OMNIROUTE_CONTEXT",
  "OMNIROUTE_CODEX_APPSERVER_AUTO_APPROVE",
  "OMNIROUTE_RTK_TRUST_PROJECT_FILTERS",
  "USERPROFILE",
  "APPDATA",
  "LOCALAPPDATA",
  "TMP",
  "TEMP",
  "NODE_OPTIONS",
  "JAVA_TOOL_OPTIONS",
  "LD_PRELOAD",
  "DYLD_INSERT_LIBRARIES",
  "BASH_FUNC_npm%%",
  "GIT_CONFIG_COUNT",
  "npm_config_registry",
  "PATH",
  "NODE_PATH",
  "PYTHONPATH",
  "PYTHONSTARTUP",
  "CLI_EXTRA_PATHS",
  "CLOUDFLARED_BIN",
  "OMNIROUTE_PROXY_CORE_RELOAD_COMMAND",
  "ZCODE_ARGS",
  "PERL5OPT",
  "RUBYOPT",
  "DOCKER_CONTEXT",
  "EDITOR",
  "PAGER",
  "SSH_ASKPASS",
  // src/lib/headroom/detect.ts runs these (or a python found through them).
  "HEADROOM_PYTHON",
  "CONDA_PREFIX",
  "PYENV_ROOT",
  // src/lib/system/autoUpdate.ts fetches, installs and builds from these.
  "AUTO_UPDATE_GIT_REMOTE",
  "AUTO_UPDATE_MODE",
  "AUTO_UPDATE_PATCH_COMMITS",
  "DATA_DIR",
  "OMNIROUTE_PLUGINS_DIR",
  "TMPDIR",
  "HOME",
  "XDG_CONFIG_HOME",
  "SSL_CERT_FILE",
  "OPENSSL_CONF",
  "NODE_EXTRA_CA_CERTS",
  "CURL_CA_BUNDLE",
  "REQUESTS_CA_BUNDLE",
  "OMNIROUTE_TLS_CERT",
  "OMNIROUTE_BASE_URL",
  "KILO_API_URL",
  "GITLAB_BASE_URL",
  "QODER_OAUTH_TOKEN_URL",
  "REDIS_URL",
  "CLAUDE_CODE_REDIRECT_URI",
  "CLOUDFLARE_API_BASE",
  "HF_HUB_ENDPOINT",
  "OMNIROUTE_LOCAL_ENDPOINTS",
  "QDRANT_HOST",
  "QDRANT_PORT",
  "CLIPROXYAPI_PORT",
  "OMNIROUTE_PORT",
  "TRAE_WEB_ORIGIN",
  "LIVE_WS_ALLOWED_ORIGINS",
  "OMNIROUTE_SERVER",
  "AWS_REGION",
  "HTTPS_PROXY",
  "https_proxy",
  "NO_PROXY",
  "OMNIROUTE_TRUSTED_PROXIES",
  "OMNIROUTE_API_KEY",
  "OPENAI_API_KEY",
  "STORAGE_ENCRYPTION_KEY",
  "JWT_SECRET",
  "OMNIROUTE_CLOUD_SYNC_SECRETS",
  "OMNIROUTE_SYNC_TOKEN",
  "INITIAL_PASSWORD",
  "MACHINE_ID_SALT",
  "OMNIROUTE_EVAL_CREDENTIALS",
  // Policy and tuning keys that the earlier denylist let through.
  "HOST",
  "HOSTNAME",
  "CORS_ALLOW_ALL",
  "OUTBOUND_SSRF_GUARD_ENABLED",
  "ALLOW_API_KEY_REVEAL",
  "PROXY_FAIL_OPEN",
  "OMNIROUTE_SKIP_SYSTEM_TRUST",
  "NODE_ENV",
  "APP_LOG_LEVEL",
  "OMNIROUTE_API_KEY_COOLDOWN_MS",
  "OMNIROUTE_R6B1_ORDINARY",
];

// The whole allowlist, with a value each key accepts.
const EXPECTED_ALLOWED: Record<string, string> = {
  PORT: "20129",
  API_PORT: "20130",
  DASHBOARD_PORT: "20131",
  REQUIRE_API_KEY: "true",
  LANG: "C.UTF-8",
  LANGUAGE: "en_US:en",
  LC_ALL: "de_DE@euro",
  LC_MESSAGES: "en_US.UTF-8",
  TZ: "America/New_York",
  NO_COLOR: "1",
  FORCE_COLOR: "0",
};

test("allowlist: exactly the expected keys, nothing else", async () => {
  const { UNTRUSTED_CWD_ENV_ALLOWLIST, isAllowedFromCwdEnv } =
    await import("../../bin/cli/utils/untrustedCwdEnv.mjs");
  assert.deepEqual([...UNTRUSTED_CWD_ENV_ALLOWLIST].sort(), Object.keys(EXPECTED_ALLOWED).sort());
  for (const [key, value] of Object.entries(EXPECTED_ALLOWED)) {
    assert.equal(isAllowedFromCwdEnv(key, value), true, `${key}=${value} must load`);
    // Exact names only: `port=` sets nothing on Linux and macOS.
    assert.equal(isAllowedFromCwdEnv(key.toLowerCase(), value), false, `${key} lowercase`);
  }
  for (const key of EXPECTED_SKIPPED) {
    assert.equal(isAllowedFromCwdEnv(key, "1"), false, `${key} must be skipped`);
    assert.equal(isAllowedFromCwdEnv(key.toLowerCase(), "1"), false, `${key} lowercase`);
  }
});

test("allowlist: values that are not plain ports, locales or flags are skipped", async () => {
  const { isAllowedFromCwdEnv } = await import("../../bin/cli/utils/untrustedCwdEnv.mjs");
  const rejected: Array<[string, string]> = [
    ["PORT", "0"],
    ["PORT", "65536"],
    ["PORT", "abc"],
    ["PORT", "80 81"],
    ["PORT", "1e3"],
    ["PORT", ""],
    ["API_PORT", "-1"],
    ["DASHBOARD_PORT", "999999"],
    ["REQUIRE_API_KEY", "false"],
    ["REQUIRE_API_KEY", "0"],
    ["REQUIRE_API_KEY", ""],
    ["REQUIRE_API_KEY", "TRUE"],
    ["REQUIRE_API_KEY", "True"],
    ["REQUIRE_API_KEY", "YES"],
    ["REQUIRE_API_KEY", "10"],
    ["REQUIRE_API_KEY", "xtrue"],
    ["REQUIRE_API_KEY", "true1"],
    ["LANG", "/tmp/evil-locale"],
    ["LANG", "en_US:en"],
    ["LC_ALL", "en_US:en"],
    ["LC_MESSAGES", "en_US:en"],
    ["LANG", "a".repeat(65)],
    ["LC_ALL", "a".repeat(65)],
    ["LANGUAGE", "a".repeat(65)],
    ["LANG", "../../tmp/evil"],
    ["LC_ALL", "en_US/../../x"],
    ["LC_MESSAGES", "a b"],
    ["LANGUAGE", "/tmp/x"],
    ["TZ", ":/etc/localtime"],
    ["TZ", "/etc/passwd"],
    ["TZ", "../../../tmp/zone"],
    ["TZ", "Europe/../../tmp/zone"],
    ["TZ", "./etc/passwd"],
    ["TZ", "."],
    ["TZ", "a".repeat(65)],
    // Valid POSIX TZ forms that this check rejects on purpose (see the docs).
    ["TZ", ":America/New_York"],
    ["TZ", "EST5EDT,M3.2.0,M11.1.0"],
    ["TZ", "<+08>-8"],
    ["NO_COLOR", "a b"],
    ["FORCE_COLOR", "--require=x"],
  ];
  for (const [key, value] of rejected) {
    assert.equal(isAllowedFromCwdEnv(key, value), false, `${key}=${JSON.stringify(value)}`);
  }
  for (const [key, value] of [
    ["PORT", "1"],
    ["PORT", "65535"],
    ["REQUIRE_API_KEY", "true"],
    ["REQUIRE_API_KEY", "1"],
    ["REQUIRE_API_KEY", "yes"],
    ["LANG", "a".repeat(64)],
    ["LC_MESSAGES", "a".repeat(64)],
    ["LANGUAGE", "en_US:en"],
    ["LANGUAGE", "a".repeat(64)],
    ["TZ", "a".repeat(64)],
    ["TZ", "UTC"],
    ["TZ", "EST5EDT"],
    ["TZ", "Etc/GMT+3"],
    ["NO_COLOR", ""],
  ]) {
    assert.equal(isAllowedFromCwdEnv(key, value), true, `${key}=${JSON.stringify(value)}`);
  }
});

test("allowlist: REQUIRE_API_KEY accepts exactly the values the server treats as on", async () => {
  const { isAllowedFromCwdEnv } = await import("../../bin/cli/utils/untrustedCwdEnv.mjs");
  const { isFeatureFlagEnabled } = await import("../../src/shared/utils/featureFlags.ts");
  const saved = process.env.REQUIRE_API_KEY;
  try {
    const values = ["true", "1", "yes", "TRUE", "True", "YES", "Yes", "on", "false", "0", "no"];
    values.push("", " true", "true ", "10", "01", "xtrue", "true1", "y", "enabled");
    for (const value of values) {
      process.env.REQUIRE_API_KEY = value;
      const serverOn = isFeatureFlagEnabled("REQUIRE_API_KEY");
      // Anything the file may set must turn the check on, and every value
      // that turns it on must be accepted, so an upgrade cannot turn it off.
      assert.equal(isAllowedFromCwdEnv("REQUIRE_API_KEY", value), serverOn, JSON.stringify(value));
    }
  } finally {
    if (saved === undefined) delete process.env.REQUIRE_API_KEY;
    else process.env.REQUIRE_API_KEY = saved;
  }
});

test("cwdEnvRejection: unknown name, wrong case and bad value are told apart", async () => {
  const { cwdEnvRejection } = await import("../../bin/cli/utils/untrustedCwdEnv.mjs");
  assert.equal(cwdEnvRejection("PORT", "20129"), null);
  assert.deepEqual(cwdEnvRejection("NODE_OPTIONS", "x"), { kind: "name" });
  assert.deepEqual(cwdEnvRejection("NODE_OPTIONS\u0000", "x"), { kind: "name" });
  assert.deepEqual(cwdEnvRejection("port", "20129"), { kind: "case", name: "PORT" });
  assert.deepEqual(cwdEnvRejection("Tz", "UTC"), { kind: "case", name: "TZ" });
  assert.deepEqual(cwdEnvRejection("PORT", "abc"), {
    kind: "value",
    expected: "a port number from 1 to 65535",
  });
  assert.deepEqual(cwdEnvRejection("REQUIRE_API_KEY", "false"), {
    kind: "value",
    expected: "true, 1 or yes",
  });
});

// Names the C library would truncate or that only look like an allowed key.
const MALFORMED_KEYS = [
  "NODE_OPTIONS\u0000",
  "NODE_OPTIONS\u0000x",
  "PORT\u0000",
  "NODE_OPTIONS\u0001",
  "NODE_OPTIONS\u001b[0m",
  "NODE_OPTIONS\u200b",
  "\u200bNODE_OPTIONS",
  "NODE_OPTIONS\u00a0x",
  "N\u041eDE_OPTIONS", // Cyrillic O
  "DA\u017fHBOARD_PORT", // long s, upper-cases to DASHBOARD_PORT
  "AP\u0131_PORT", // dotless i, upper-cases to API_PORT
  "\uff30ORT", // fullwidth P
  "NODE OPTIONS",
  "NODE-OPTIONS",
  "1PORT",
  "PORT.x",
  "export PORT",
];

test("allowlist: malformed key names are rejected, even when they upper-case to an allowed key", async () => {
  const { cwdEnvRejection, isAllowedFromCwdEnv, isPlainEnvKey } =
    await import("../../bin/cli/utils/untrustedCwdEnv.mjs");
  for (const key of MALFORMED_KEYS) {
    assert.equal(isPlainEnvKey(key), false, JSON.stringify(key));
    assert.equal(isAllowedFromCwdEnv(key, "20129"), false, JSON.stringify(key));
    // Not a case hint: `DAſHBOARD_PORT` is not a misspelt DASHBOARD_PORT.
    assert.deepEqual(cwdEnvRejection(key, "20129"), { kind: "name" }, JSON.stringify(key));
  }
  for (const key of ["PORT", "_X", "a1_B2"]) assert.equal(isPlainEnvKey(key), true, key);
});

test("printableEnvKey: names outside printable ASCII are escaped", async () => {
  const { printableEnvKey } = await import("../../bin/cli/utils/untrustedCwdEnv.mjs");
  assert.equal(printableEnvKey("PORT"), "PORT");
  assert.equal(printableEnvKey("NODE_OPTIONS\u0000x"), '"NODE_OPTIONS\\u0000x"');
  assert.equal(printableEnvKey("A\u001b[31mB"), '"A\\u001b[31mB"');
  assert.equal(printableEnvKey("N\u041eDE"), '"N\\u041eDE"');
  assert.equal(printableEnvKey("NODE OPTIONS"), '"NODE OPTIONS"');
});

test("printablePath: control and format characters are escaped, other paths kept", async () => {
  const { printablePath } = await import("../../bin/cli/utils/untrustedCwdEnv.mjs");
  assert.equal(printablePath("/home/a b/项目/.env"), "/home/a b/项目/.env");
  assert.equal(printablePath("C:\\Users\\a\\.env"), "C:\\Users\\a\\.env");
  assert.equal(printablePath("/r/x\u001b[2K\r/.env"), '"/r/x\\u001b[2K\\r/.env"');
  assert.equal(printablePath("/r/a\nb/.env"), '"/r/a\\nb/.env"');
  assert.equal(printablePath("/r/\u009b31m/.env"), '"/r/\\u009b31m/.env"');
  assert.equal(printablePath("/r/\u202egnp.exe/.env"), '"/r/\\u202egnp.exe/.env"');
  assert.equal(printablePath("/r/a\u2028b/.env"), '"/r/a\\u2028b/.env"');
  assert.equal(printablePath("/r/\u007f/.env"), '"/r/\\u007f/.env"');
  assert.equal(printablePath("/r/a\u200bb/.env"), '"/r/a\\u200bb/.env"');
  // NUL (process.cwd() never has one, other callers might), the Arabic letter
  // mark, LRM/RLM, the bidi isolates (Trojan Source) and the BOM.
  for (const code of [0, 0x61c, 0x200e, 0x200f, 0x2060, 0x2066, 0x2067, 0x2068, 0x2069, 0xfeff]) {
    const hex = code.toString(16).padStart(4, "0");
    const ch = String.fromCharCode(code);
    assert.equal(printablePath(`/r/a${ch}b/.env`), `"/r/a\\u${hex}b/.env"`, hex);
  }
  // Every unsafe character, not just the first.
  assert.equal(printablePath("/r/\u202e\u202d/.env"), '"/r/\\u202e\\u202d/.env"');
});

test("cwd .env NUL-suffixed names cannot set NODE_OPTIONS or OMNIROUTE_BASE_URL", async () => {
  const dirs = layout();
  const legit = await startRecorder();
  const sink = await startRecorder();
  try {
    fs.writeFileSync(
      path.join(dirs.dataDir, ".env"),
      `OMNIROUTE_API_KEY=sk-r6b1-datadir-key\nPORT=${legit.port}\n`
    );
    fs.writeFileSync(
      path.join(dirs.cwd, ".env"),
      `OMNIROUTE_BASE_URL\0=http://127.0.0.1:${sink.port}\n` +
        `OMNIROUTE_BASE_URL\0x=http://127.0.0.1:${sink.port}\n`
    );
    const { stderr } = await runCli(BIN, ["health"], dirs.cwd, cleanEnv(dirs.home));
    assert.deepEqual(sink.hits, [], "the NUL-suffixed base URL must not be used");
    assert.ok(legit.hits.length > 0, stderr);
    assert.equal(legit.hits[0].authorization, "Bearer sk-r6b1-datadir-key");
    assert.ok(stderr.includes('"OMNIROUTE_BASE_URL\\u0000"'), stderr);
    assert.ok(stderr.includes('"OMNIROUTE_BASE_URL\\u0000x"'), stderr);
    assert.ok(!stderr.includes("\u0000"), "no raw NUL reaches the terminal");
  } finally {
    await legit.close();
    await sink.close();
    rm(dirs.tmp);
  }
});

test("serve: malformed cwd .env names (NUL, control, look-alike) reach nothing", async () => {
  const dirs = layout();
  try {
    const bin = makeServePackage(dirs.tmp);
    const marker = path.join(dirs.tmp, "nul-marker.txt");
    const preload = path.join(dirs.tmp, "preload.cjs");
    fs.writeFileSync(
      preload,
      `require("node:fs").appendFileSync(${JSON.stringify(marker)}, "loaded\\n");\n`
    );
    const lines = MALFORMED_KEYS.map((k) => `${k}=--require ${preload}`);
    lines.push("NODE_TLS_REJECT_UNAUTHORIZED\0=0", "LANG=C");
    fs.writeFileSync(path.join(dirs.cwd, ".env"), lines.join("\n") + "\n");
    const { childEnv, stderr } = await runServe(dirs, bin, (env) => {
      delete env.LANG;
    });
    assert.ok(!fs.existsSync(marker), "--require through a malformed name must not run");
    assert.doesNotMatch(String(childEnv.NODE_OPTIONS ?? ""), /--require/);
    assert.equal(childEnv.NODE_TLS_REJECT_UNAUTHORIZED, undefined);
    assert.equal(childEnv.LANG, "C");
    for (const name of Object.keys(childEnv)) {
      assert.ok(!MALFORMED_KEYS.includes(name), `${JSON.stringify(name)} reached the server`);
    }
    assert.ok(stderr.includes('"NODE_OPTIONS\\u0000"'), stderr);
    assert.ok(!stderr.includes("\u001b[0m=") && !stderr.includes("\u0000"), "names are escaped");
    assert.ok(!stderr.includes(preload), "ignored values are never printed");
  } finally {
    rm(dirs.tmp);
  }
});

test("one warning names every skipped key", async () => {
  const dirs = layout();
  const legit = await startRecorder();
  try {
    fs.writeFileSync(path.join(dirs.dataDir, ".env"), `PORT=${legit.port}\n`);
    fs.writeFileSync(
      path.join(dirs.cwd, ".env"),
      "OMNIROUTE_BASE_URL=http://127.0.0.1:9\nHEADROOM_PYTHON=/tmp/x\nNODE_ENV=development\n"
    );
    const { stderr } = await runCli(BIN, ["health"], dirs.cwd, cleanEnv(dirs.home));
    const warnings = stderr.split("\n").filter((l) => l.includes("cannot set"));
    assert.equal(warnings.length, 1, stderr);
    assert.match(warnings[0], /cannot set OMNIROUTE_BASE_URL, HEADROOM_PYTHON, NODE_ENV; ignored/);
    assert.match(warnings[0], /may set only PORT, API_PORT, DASHBOARD_PORT, REQUIRE_API_KEY/);
    assert.ok(!stderr.includes("/tmp/x") && !stderr.includes("development"));
  } finally {
    await legit.close();
    rm(dirs.tmp);
  }
});

test("a key the shell already sets is reported as shadowed, not as skipped", async () => {
  const dirs = layout();
  const legit = await startRecorder();
  try {
    fs.writeFileSync(path.join(dirs.cwd, ".env"), "OMNIROUTE_BASE_URL=http://127.0.0.1:9\n");
    const { stderr } = await runCli(
      BIN,
      ["health"],
      dirs.cwd,
      cleanEnv(dirs.home, { OMNIROUTE_BASE_URL: `http://127.0.0.1:${legit.port}` })
    );
    assert.ok(legit.hits.length > 0, stderr);
    assert.match(stderr, /OMNIROUTE_BASE_URL in .* is ignored, the environment set it first/);
    assert.doesNotMatch(stderr, /cannot set/);
  } finally {
    await legit.close();
    rm(dirs.tmp);
  }
});

test("cwd .env PORT with a value that is not a port is skipped", async () => {
  const dirs = layout();
  const legit = await startRecorder();
  try {
    fs.writeFileSync(path.join(dirs.dataDir, ".env"), "");
    fs.writeFileSync(path.join(dirs.cwd, ".env"), `PORT=${legit.port}x\n`);
    const { stderr } = await runCli(
      BIN,
      ["health"],
      dirs.cwd,
      cleanEnv(dirs.home, { OMNIROUTE_BASE_URL: `http://127.0.0.1:${legit.port}` })
    );
    assert.match(stderr, /: ignored PORT \(expected a port number from 1 to 65535\)\./);
    // PORT is an allowed key, so the warning must not say it cannot be set.
    assert.doesNotMatch(stderr, /cannot set/);
    assert.ok(!stderr.includes(`${legit.port}x`), "the rejected value is not printed");
  } finally {
    await legit.close();
    rm(dirs.tmp);
  }
});

test("cwd .env `port=` (wrong case) is skipped with a hint, not silently", async () => {
  const dirs = layout();
  const legit = await startRecorder();
  const sink = await startRecorder();
  try {
    fs.writeFileSync(path.join(dirs.cwd, ".env"), `port=${sink.port}\nTz=UTC\n`);
    const { stderr } = await runCli(
      BIN,
      ["health"],
      dirs.cwd,
      cleanEnv(dirs.home, { PORT: String(legit.port) })
    );
    assert.deepEqual(sink.hits, []);
    assert.ok(legit.hits.length > 0, stderr);
    assert.match(
      stderr,
      /: ignored port \(write the name as PORT\), Tz \(write the name as TZ\)\./
    );
    assert.doesNotMatch(stderr, /cannot set/);
  } finally {
    await legit.close();
    await sink.close();
    rm(dirs.tmp);
  }
});

test("the skipped-key warning points a user who wrote the lines to the data-dir .env", async () => {
  const dirs = layout();
  const legit = await startRecorder();
  try {
    fs.writeFileSync(path.join(dirs.dataDir, ".env"), `PORT=${legit.port}\n`);
    fs.writeFileSync(path.join(dirs.cwd, ".env"), "NODE_ENV=development\nPORT=abc\n");
    const { stderr } = await runCli(BIN, ["health"], dirs.cwd, cleanEnv(dirs.home));
    const durable = path.join(dirs.dataDir, ".env");
    const lines = stderr.split("\n").filter((l) => l.includes("⚠"));
    const skipped = lines.filter((l) => l.includes("cannot set"));
    assert.equal(skipped.length, 1, stderr);
    assert.ok(
      skipped[0].includes(
        `If you wrote these lines yourself, set them in the shell or in ${durable}.`
      ),
      skipped[0]
    );
    assert.match(skipped[0], /cannot set NODE_ENV; ignored\./);
    // The data-dir PORT wins, so the cwd PORT line is shadowed, not rejected.
    assert.ok(!lines.some((l) => l.includes(": ignored PORT")), stderr);
  } finally {
    await legit.close();
    rm(dirs.tmp);
  }
});

test("a working directory name with escape sequences is escaped in every env message", async () => {
  const dirs = layout();
  try {
    const evilName = "repo\u001b[2K\u001b]0;PWNED\u0007\n  \u2714 all keys loaded\u202e";
    const cwd = path.join(dirs.tmp, evilName);
    fs.mkdirSync(cwd);
    fs.writeFileSync(
      path.join(cwd, ".env"),
      "NODE_OPTIONS=x\nPORT=abc\nOMNIROUTE_BASE_URL=x\nLC_MESSAGES=C\nLC_MESSAGES=C\n"
    );
    const env = cleanEnv(dirs.home, { OMNIROUTE_BASE_URL: "http://127.0.0.1:9" });
    delete env.LC_MESSAGES;
    const { stdout, stderr } = await runCli(BIN, ["health"], cwd, env);
    const out = stdout + stderr;
    for (const raw of ["\u001b[2K", "\u001b]0;", "\u0007", "\u202e"]) {
      assert.ok(!out.includes(raw), `raw ${JSON.stringify(raw)} reached the terminal`);
    }
    assert.ok(!/^\s*\u2714 all keys loaded/m.test(out), "no forged line");
    const shown = "\\u001b[2K\\u001b]0;PWNED\\u0007\\n  \u2714 all keys loaded\\u202e";
    assert.ok(stderr.includes(`${shown}/.env" cannot set NODE_OPTIONS; ignored.`), stderr);
    assert.ok(stderr.includes(`${shown}/.env": ignored PORT (`), stderr);
    assert.ok(stderr.includes(`${shown}/.env" is ignored, the environment set it first`), stderr);
    // The second LC_MESSAGES line: the cwd file itself set it first.
    assert.ok(
      stderr.includes(`LC_MESSAGES in "${dirs.tmp}/repo${shown}/.env" is ignored, "`),
      stderr
    );
    assert.ok(stdout.includes(`Loaded env from "`) && stdout.includes(shown), stdout);
  } finally {
    rm(dirs.tmp);
  }
});

test("a read error that repeats an escaped path is escaped too", async () => {
  const dirs = layout();
  // A Unix socket named .env: existsSync() is true and readFileSync() fails
  // with ENXIO, whose message repeats the path. Root cannot read it either.
  const cwd = path.join(dirs.tmp, "r\u001b[2K\u202e");
  fs.mkdirSync(cwd);
  const sock = net.createServer();
  await new Promise<void>((resolve) => sock.listen(path.join(cwd, ".env"), resolve));
  try {
    const { stdout, stderr } = await runCli(
      BIN,
      ["health"],
      cwd,
      cleanEnv(dirs.home, { OMNIROUTE_BASE_URL: "http://127.0.0.1:9" })
    );
    const line = stderr.split("\n").find((l) => l.includes("Could not read"));
    assert.ok(line, stderr);
    assert.match(line, /ENXIO/);
    for (const raw of ["\u001b[2K", "\u202e"]) {
      assert.ok(
        !(stdout + stderr).includes(raw),
        `raw ${JSON.stringify(raw)} reached the terminal`
      );
    }
  } finally {
    await new Promise<void>((r) => sock.close(() => r()));
    rm(dirs.tmp);
  }
});

test("the data-dir path in the skipped-key warning is escaped too", async () => {
  const dirs = layout();
  try {
    const dataDir = path.join(dirs.tmp, "d\u001b[2K");
    fs.mkdirSync(dataDir);
    fs.writeFileSync(path.join(dirs.cwd, ".env"), "NODE_ENV=development\n");
    const { stdout, stderr } = await runCli(
      BIN,
      ["health"],
      dirs.cwd,
      cleanEnv(dirs.home, { DATA_DIR: dataDir, OMNIROUTE_BASE_URL: "http://127.0.0.1:9" })
    );
    assert.ok(!(stdout + stderr).includes("\u001b[2K"), "raw escape reached the terminal");
    assert.ok(stderr.includes(`in "${dirs.tmp}/d\\u001b[2K/.env".`), stderr);
  } finally {
    rm(dirs.tmp);
  }
});

test("doctor: the cwd .env path it reports is escaped", async () => {
  const dirs = layout();
  try {
    const cwd = path.join(dirs.tmp, "repo\u001b[2K\r\u001b[32m\u2714 fake ok\u001b[0m\nx\u2066");
    fs.mkdirSync(cwd);
    fs.writeFileSync(path.join(cwd, ".env"), "PORT=20128\n");
    const { stdout, stderr } = await runCli(
      BIN,
      ["doctor", "--no-liveness"],
      cwd,
      cleanEnv(dirs.home)
    );
    const out = stdout + stderr;
    const line = stdout.split("\n").find((l) => l.includes(".env found at"));
    assert.ok(line, stdout);
    for (const raw of ["\u001b[2K", "\r", "\u2066"]) {
      assert.ok(!out.includes(raw), `raw ${JSON.stringify(raw)} reached the terminal`);
    }
    assert.ok(!/^x\u2066?\/\.env/m.test(stdout), "the path was split across lines");
    assert.ok(
      line.includes('repo\\u001b[2K\\r\\u001b[32m\u2714 fake ok\\u001b[0m\\nx\\u2066/.env"'),
      line
    );
  } finally {
    rm(dirs.tmp);
  }
});

test("doctor --output json: the cwd .env path in details is escaped too", async () => {
  const dirs = layout();
  // JSON.stringify escapes C0 controls but prints these as they are.
  const names = ["bidi\u2066\u202eabc", "c1\u009b31mred", "zw\u200b\ufeffz", "lrm\u200e\u200fz"];
  const u = (ch: string) => `\\u${ch.charCodeAt(0).toString(16).padStart(4, "0")}`;
  try {
    for (const name of names) {
      const cwd = path.join(dirs.tmp, name);
      fs.mkdirSync(cwd);
      const shown = `"${dirs.tmp}/${name.replace(/[^\x20-\x7e]/g, u)}/.env"`;
      const config = async (extra: Record<string, string> = {}) => {
        const args = ["doctor", "--no-liveness", "--output", "json"];
        const { stdout } = await runCli(BIN, args, cwd, cleanEnv(dirs.home, extra));
        for (const ch of name.replace(/[\x20-\x7e]/g, "")) {
          assert.ok(!stdout.includes(ch), `raw ${u(ch)} in ${stdout}`);
        }
        const report = JSON.parse(stdout.slice(stdout.indexOf("{")));
        return report.checks.find((c: { name: string }) => c.name === "Config");
      };
      let check = await config(); // no .env yet: the cwd candidate is listed
      assert.equal(check.status, "warn", JSON.stringify(check));
      assert.ok(check.details.checked.includes(shown), JSON.stringify(check));
      fs.writeFileSync(path.join(cwd, ".env"), "PORT=20128\n");
      check = await config();
      assert.equal(check.status, "ok", JSON.stringify(check));
      assert.equal(check.details.envFile, shown);
      assert.equal(check.message, `.env found at ${shown}`);
      check = await config({ PORT: "abc" }); // the invalid-port report names the file too
      assert.equal(check.status, "fail", JSON.stringify(check));
      assert.equal(check.details.envFile, shown);
    }
  } finally {
    rm(dirs.tmp);
  }
});

// Not observable through `serve`: HOME is repopulated at start-up, and
// NODE_OPTIONS and PATH have their own tests.
const NOT_OBSERVABLE_IN_SERVE = new Set(["HOME", "NODE_OPTIONS", "PATH"]);

test("serve: only allowlisted keys from the cwd .env reach the server", async () => {
  const dirs = layout();
  try {
    const bin = makeServePackage(dirs.tmp);
    const harmless = (key: string) =>
      /PROXY$/i.test(key) || key === "OMNIROUTE_BASE_URL"
        ? "http://127.0.0.1:9"
        : `r6b1-cwd-${key.toLowerCase()}`;
    const keys = EXPECTED_SKIPPED.filter((k) => !NOT_OBSERVABLE_IN_SERVE.has(k));
    const lines = keys.map((k) => `${k}=${harmless(k)}`);
    // `serve --port` sets PORT itself, so it is checked through the CLI tests.
    const allowed = Object.entries(EXPECTED_ALLOWED).filter(([k]) => k !== "PORT");
    // A rejected value and a wrong-case name set nothing, so the next LANG
    // line still applies and no `tz` reaches the server.
    lines.push("LANG=/tmp/r6b1-bad", "tz=Europe/Berlin");
    // TZ is quoted: the value check must see the parsed value, not the raw text.
    for (const [key, value] of allowed) {
      lines.push(key === "TZ" ? `${key}="${value}"` : `${key}=${value}`);
    }
    fs.writeFileSync(path.join(dirs.cwd, ".env"), lines.join("\n") + "\n");

    const { childEnv, stderr } = await runServe(dirs, bin, (env) => {
      // Drop the shell's own copy (TMPDIR, SHELL, LANG, ...) so a leak would show.
      const names = new Set([...keys, ...allowed.map(([k]) => k)].map((k) => k.toUpperCase()));
      for (const name of Object.keys(env)) {
        if (names.has(name.toUpperCase())) delete env[name];
      }
    });

    for (const key of keys) {
      assert.notEqual(childEnv[key], harmless(key), `${key} from the cwd .env reached the server`);
    }
    for (const [key, value] of allowed) {
      assert.equal(childEnv[key], value, `${key} from the cwd .env still loads`);
    }
    assert.equal(childEnv.tz, undefined, "a wrong-case name from the cwd .env reached the server");
    assert.ok(!stderr.includes("r6b1-cwd-"), "ignored values are never printed");
    assert.ok(!stderr.includes("r6b1-bad"), "rejected values are never printed");
  } finally {
    rm(dirs.tmp);
  }
});

// ── (C) buildHeaders in-process: the connect probe and absolute URLs ────────

async function withContextConfig(
  fn: () => Promise<void>,
  prod: Record<string, string> = {
    baseUrl: "https://prod.example.test/omniroute",
    accessToken: "oma_ctx",
  }
) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-r6b1-ctx-"));
  const saved = {
    DATA_DIR: process.env.DATA_DIR,
    OMNIROUTE_BASE_URL: process.env.OMNIROUTE_BASE_URL,
    OMNIROUTE_API_KEY: process.env.OMNIROUTE_API_KEY,
    OMNIROUTE_CONTEXT: process.env.OMNIROUTE_CONTEXT,
  };
  process.env.DATA_DIR = dir;
  delete process.env.OMNIROUTE_BASE_URL;
  delete process.env.OMNIROUTE_API_KEY;
  delete process.env.OMNIROUTE_CONTEXT;
  fs.writeFileSync(
    path.join(dir, "config.json"),
    JSON.stringify({
      version: 1,
      currentContext: "prod",
      contexts: { prod },
    })
  );
  try {
    await fn();
  } finally {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    rm(dir);
  }
}

test("buildHeaders: the context token is sent to its own origin, whatever the path", async () => {
  await withContextConfig(async () => {
    const { buildHeaders } = await import("../../bin/cli/api.mjs");
    const headers = await buildHeaders({
      cliToken: "",
      destinationUrl: "https://prod.example.test/omniroute/api/health",
    });
    assert.equal(headers.get("authorization"), "Bearer oma_ctx");
  });
});

test("buildHeaders: `connect` probing another server does not carry the active context token", async () => {
  await withContextConfig(async () => {
    const { buildHeaders } = await import("../../bin/cli/api.mjs");
    const headers = await buildHeaders({ cliToken: "", baseUrl: "https://other.example.test" });
    assert.equal(headers.get("authorization"), null);
  });
});

test("buildHeaders: an absolute URL on another origin falls back to the ambient key", async () => {
  await withContextConfig(async () => {
    process.env.OMNIROUTE_API_KEY = "sk-ambient";
    const { buildHeaders } = await import("../../bin/cli/api.mjs");
    const headers = await buildHeaders({
      cliToken: "",
      apiKey: "sk-ambient",
      destinationUrl: "https://prod.example.test:8443/api/health",
    });
    assert.equal(headers.get("authorization"), "Bearer sk-ambient");
  });
});

test("serve: cwd .env cannot supply PATH when the shell lacks it", async () => {
  const dirs = layout();
  try {
    const bin = makeServePackage(dirs.tmp);
    fs.writeFileSync(path.join(dirs.cwd, ".env"), "PATH=r6b1-cwd-path\nTZ=Asia/Tokyo\n");
    const { childEnv } = await runServe(dirs, bin, (env) => {
      delete env.PATH;
      delete env.TZ;
    });
    assert.notEqual(childEnv.PATH, "r6b1-cwd-path");
    assert.equal(childEnv.TZ, "Asia/Tokyo");
  } finally {
    rm(dirs.tmp);
  }
});

// ── (C) setup/launch resolvers: the context token stays with its origin ────

const RESOLVERS: Array<[string, string, string]> = [
  ["launch", "../../bin/cli/commands/launch.mjs", "resolveLaunchTarget"],
  ["launch codex", "../../bin/cli/commands/launch-codex.mjs", "resolveCodexTarget"],
  ["setup kilo", "../../bin/cli/commands/setup-kilo.mjs", "resolveKiloTarget"],
  ["setup continue", "../../bin/cli/commands/setup-continue.mjs", "resolveContinueTarget"],
  ["setup roo", "../../bin/cli/commands/setup-roo.mjs", "resolveRooTarget"],
  ["setup goose", "../../bin/cli/commands/setup-goose.mjs", "resolveGooseTarget"],
  ["setup cursor", "../../bin/cli/commands/setup-cursor.mjs", "resolveCursorTarget"],
  ["setup whycodes", "../../bin/cli/commands/setup-whycodes.mjs", "resolveWhyCodesTarget"],
  ["setup opencode", "../../bin/cli/commands/setup-opencode.mjs", "resolveOpencodeTarget"],
  ["setup aider", "../../bin/cli/commands/setup-aider.mjs", "resolveAiderTarget"],
  ["setup cline", "../../bin/cli/commands/setup-cline.mjs", "resolveClineTarget"],
  ["setup crush", "../../bin/cli/commands/setup-crush.mjs", "resolveCrushTarget"],
  ["setup 5dive", "../../bin/cli/commands/setup-5dive.mjs", "resolveFivediveTarget"],
  ["setup qwen", "../../bin/cli/commands/setup-qwen.mjs", "resolveQwenTarget"],
  ["setup gemini", "../../bin/cli/commands/setup-gemini.mjs", "resolveGeminiTarget"],
  ["configure", "../../bin/cli/commands/configure.mjs", "resolveConfigureTargetOptions"],
];

for (const [label, modulePath, exportName] of RESOLVERS) {
  test(`${label}: --remote on another origin does not get the context token`, async () => {
    await withContextConfig(async () => {
      const resolve = (await import(modulePath))[exportName];
      const own = JSON.stringify(await resolve({}));
      assert.ok(own.includes("oma_ctx"), `the context's own server still gets it: ${own}`);
      const same = JSON.stringify(await resolve({ remote: "https://prod.example.test/omniroute" }));
      assert.ok(same.includes("oma_ctx"), `--remote on the same origin still gets it: ${same}`);
      const other = JSON.stringify(await resolve({ remote: "https://evil.example.test" }));
      assert.ok(!other.includes("oma_ctx"), `token paired with another server: ${other}`);
      assert.ok(other.includes("evil.example.test"), other);
      // WHATWG reads this as prod.example.test; Python's urllib and httpx as evil.test.
      const split = JSON.stringify(
        await resolve({ remote: "https://prod.example.test\\@evil.test/omniroute" })
      );
      assert.ok(!split.includes("oma_ctx"), `token paired with an ambiguous URL: ${split}`);
    });
  });
}

test("isContextOrigin: exact URL origin; host spelling variants fail closed", async () => {
  const { isContextOrigin } = await import("../../bin/cli/contexts.mjs");
  const ctx = { baseUrl: "https://prod.example.test/omniroute" };
  assert.equal(isContextOrigin(ctx, "https://PROD.example.test/v1"), true);
  assert.equal(isContextOrigin(ctx, "https://prod.example.test:443/x"), true);
  // Userinfo, backslashes and whitespace read differently in other URL
  // parsers (Python's urllib and httpx), so they match nothing.
  assert.equal(isContextOrigin(ctx, "https://user@prod.example.test/x"), false);
  assert.equal(isContextOrigin(ctx, "https://:pw@prod.example.test/x"), false);
  assert.equal(
    isContextOrigin({ baseUrl: "https://:pw@prod.example.test" }, "https://prod.example.test"),
    false
  );
  assert.equal(isContextOrigin(ctx, "https://prod.example.test\\@evil.test/v1"), false);
  assert.equal(isContextOrigin(ctx, "https://prod.example.test\\evil"), false);
  assert.equal(isContextOrigin(ctx, "https://prod.example.test/\tx"), false);
  assert.equal(isContextOrigin(ctx, "https://prod.example.test/a b"), false);
  // Controls and Unicode spaces anywhere, even where WHATWG keeps the origin.
  const local20128 = { baseUrl: "http://localhost:20128" };
  for (const ch of ["\u0000", "\u0001", "\u001f", "\u007f", "\u00a0", "\u2028", "\u3000"]) {
    const hex = ch.charCodeAt(0).toString(16).padStart(4, "0");
    assert.equal(isContextOrigin(local20128, `http://localhost:20128/${ch}`), false, hex);
  }
  assert.equal(isContextOrigin(local20128, "\u0001http://localhost:20128"), false);
  assert.equal(isContextOrigin(local20128, "http://localhost:20128/"), true);
  assert.equal(isContextOrigin(ctx, "https://prod.example.test/a@b"), true);
  assert.equal(
    isContextOrigin({ baseUrl: "https://u:p@prod.example.test" }, "https://prod.example.test"),
    false
  );
  assert.equal(isContextOrigin(ctx, "http://prod.example.test/x"), false);
  assert.equal(isContextOrigin(ctx, "https://prod.example.test:8443/x"), false);
  assert.equal(isContextOrigin(ctx, "https://prod.example.test./x"), false);
  assert.equal(isContextOrigin(ctx, "not a url"), false);
  assert.equal(isContextOrigin(null, "https://prod.example.test"), false);
  const local = { baseUrl: "http://localhost:20128" };
  assert.equal(isContextOrigin(local, "http://127.0.0.1:20128"), false);
});

test("isContextOrigin: a context with no usable origin matches nothing", async () => {
  const { isContextOrigin, contextCredentialFor } = await import("../../bin/cli/contexts.mjs");
  // Two unparsable URLs, or two opaque origins ("null"), are not one server.
  assert.equal(isContextOrigin({ baseUrl: "not a url" }, "also not a url"), false);
  assert.equal(isContextOrigin({ baseUrl: "file:///srv/a" }, "file:///srv/b"), false);
  assert.equal(isContextOrigin({ baseUrl: "data:text/plain,a" }, "data:text/plain,b"), false);
  assert.equal(
    contextCredentialFor({ baseUrl: "not a url", accessToken: "oma_x" }, "also not a url"),
    undefined
  );
});

test("isContextOrigin: a context without baseUrl is the local server on PORT", async () => {
  const { isContextOrigin } = await import("../../bin/cli/contexts.mjs");
  const saved = process.env.PORT;
  try {
    process.env.PORT = "31337";
    assert.equal(isContextOrigin({}, "http://localhost:31337/api/health"), true);
    // An empty baseUrl means the same as none, as in api.mjs getBaseUrl().
    assert.equal(isContextOrigin({ baseUrl: "" }, "http://localhost:31337/api/health"), true);
    assert.equal(isContextOrigin({}, "http://localhost:20128/api/health"), false);
  } finally {
    if (saved === undefined) delete process.env.PORT;
    else process.env.PORT = saved;
  }
});

test("contextCredentialFor: the legacy apiKey is bound to the origin too", async () => {
  const { contextCredentialFor } = await import("../../bin/cli/contexts.mjs");
  const base = "https://prod.example.test/omniroute";
  assert.equal(contextCredentialFor({ baseUrl: base, apiKey: "sk_legacy" }, base), "sk_legacy");
  assert.equal(
    contextCredentialFor({ baseUrl: base, apiKey: "sk_legacy" }, "https://evil.example.test"),
    undefined
  );
  assert.equal(
    contextCredentialFor({ baseUrl: base, accessToken: "oma_ctx", apiKey: "sk_legacy" }, base),
    "oma_ctx"
  );
});

test("buildHeaders: a context with only a legacy apiKey sends it to its own origin only", async () => {
  await withContextConfig(
    async () => {
      const { buildHeaders } = await import("../../bin/cli/api.mjs");
      const own = await buildHeaders({
        cliToken: "",
        destinationUrl: "https://prod.example.test/omniroute/api/health",
      });
      assert.equal(own.get("authorization"), "Bearer sk_legacy_ctx");
      const other = await buildHeaders({ cliToken: "", baseUrl: "https://evil.example.test" });
      assert.equal(other.get("authorization"), null);
    },
    { baseUrl: "https://prod.example.test/omniroute", apiKey: "sk_legacy_ctx" }
  );
});

test("run plan: authSource is context only when the context token is actually sent", async () => {
  await withContextConfig(async () => {
    const saved = process.env.ANTHROPIC_AUTH_TOKEN;
    delete process.env.ANTHROPIC_AUTH_TOKEN;
    try {
      const { buildRunPlan } = await import("../../bin/cli/commands/run.mjs");
      for (const target of ["claude", "codex", "goose"]) {
        const own = await buildRunPlan(target, {});
        assert.equal(own.authSource, "context", `${target} on the context's own server`);
        const other = await buildRunPlan(target, { remote: "https://evil.example.test" });
        assert.equal(other.authSource, "none", `${target} --remote elsewhere`);
        assert.ok(!JSON.stringify(other).includes("oma_ctx"), target);
      }
    } finally {
      if (saved !== undefined) process.env.ANTHROPIC_AUTH_TOKEN = saved;
    }
  });
});

// ── trusted working directories keep the whole file ─────────────────────────

const dropShellBrowser = (env: Record<string, string>) => {
  delete env.BROWSER;
};

test("serve: a cwd that is the data directory keeps every key of its .env", async () => {
  const dirs = layout();
  try {
    const bin = makeServePackage(dirs.tmp);
    fs.writeFileSync(
      path.join(dirs.dataDir, ".env"),
      "KILO_API_URL=http://127.0.0.1:9/r6b1-trusted\nBROWSER=r6b1-trusted-browser\n"
    );
    const { childEnv, stderr } = await runServe(dirs, bin, dropShellBrowser, dirs.dataDir);
    assert.equal(childEnv.KILO_API_URL, "http://127.0.0.1:9/r6b1-trusted");
    assert.equal(childEnv.BROWSER, "r6b1-trusted-browser");
    assert.doesNotMatch(stderr, /cannot set/);
  } finally {
    rm(dirs.tmp);
  }
});

test("serve: a cwd that is the package root keeps every key of its .env", async () => {
  const dirs = layout();
  try {
    const bin = makeServePackage(dirs.tmp);
    const pkg = path.dirname(path.dirname(bin));
    fs.writeFileSync(
      path.join(pkg, ".env"),
      "KILO_API_URL=http://127.0.0.1:9/r6b1-package\nBROWSER=r6b1-package-browser\n"
    );
    const { childEnv, stderr } = await runServe(dirs, bin, dropShellBrowser, pkg);
    assert.equal(childEnv.KILO_API_URL, "http://127.0.0.1:9/r6b1-package");
    assert.equal(childEnv.BROWSER, "r6b1-package-browser");
    assert.doesNotMatch(stderr, /cannot set/);
  } finally {
    rm(dirs.tmp);
  }
});

// ── `omniroute dashboard` opens the browser through xdg-open ────────────────
//
// With no desktop handler registered (no DISPLAY: SSH, headless servers),
// xdg-open runs $BROWSER, else the first of www-browser, links2, ... on PATH.
// Stubs for those names stand in for a real browser and mark that xdg-open
// ran, so a missing $BROWSER marker means "not run", not "never got there".

const linuxOnly = { skip: process.platform !== "linux" && "xdg-open is Linux-only" };

function browserEnv(home: string, tmp: string) {
  const stubBin = path.join(tmp, "stub-bin");
  const fallbackMarker = path.join(tmp, "fallback-browser.txt");
  fs.mkdirSync(stubBin, { recursive: true });
  for (const name of ["www-browser", "links2", "elinks", "links", "lynx", "w3m"]) {
    const stub = path.join(stubBin, name);
    fs.writeFileSync(stub, `#!/bin/sh\necho "$*" >> ${JSON.stringify(fallbackMarker)}\n`);
    fs.chmodSync(stub, 0o755);
  }
  const env = cleanEnv(home);
  for (const key of Object.keys(env)) {
    if (/^(BROWSER|DISPLAY|WAYLAND_DISPLAY|DESKTOP_SESSION|KDE_|GNOME_|MATE_)/i.test(key)) {
      delete env[key];
    }
  }
  env.PATH = `${stubBin}:${env.PATH ?? "/usr/bin:/bin"}`;
  return { env, fallbackMarker };
}

function writeMarkerScript(file: string, marker: string) {
  fs.writeFileSync(file, `#!/bin/sh\necho "$*" > ${JSON.stringify(marker)}\n`);
  fs.chmodSync(file, 0o755);
}

async function waitForAny(files: string[], ms = 15_000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    if (files.some((f) => fs.existsSync(f))) return;
    await new Promise((r) => setTimeout(r, 100));
  }
}

test("dashboard: cwd .env BROWSER does not run", linuxOnly, async () => {
  const dirs = layout();
  try {
    const evilMarker = path.join(dirs.tmp, "evil-browser.txt");
    writeMarkerScript(path.join(dirs.cwd, "evil.sh"), evilMarker);
    fs.writeFileSync(path.join(dirs.cwd, ".env"), "BROWSER=./evil.sh\n");
    const { env, fallbackMarker } = browserEnv(dirs.home, dirs.tmp);

    const { stderr } = await runCli(BIN, ["dashboard"], dirs.cwd, env);
    await waitForAny([evilMarker, fallbackMarker]);

    assert.ok(!fs.existsSync(evilMarker), "BROWSER from the cwd .env must not run");
    assert.ok(fs.existsSync(fallbackMarker), `xdg-open ran without it: ${stderr}`);
    assert.match(stderr, /cannot set BROWSER; ignored/);
  } finally {
    rm(dirs.tmp);
  }
});

test("dashboard: data-dir .env BROWSER still runs", linuxOnly, async () => {
  const dirs = layout();
  try {
    const trustedMarker = path.join(dirs.tmp, "trusted-browser.txt");
    const script = path.join(dirs.tmp, "trusted-browser.sh");
    writeMarkerScript(script, trustedMarker);
    fs.writeFileSync(path.join(dirs.dataDir, ".env"), `BROWSER=${script}\n`);
    const { env, fallbackMarker } = browserEnv(dirs.home, dirs.tmp);

    await runCli(BIN, ["dashboard"], dirs.cwd, env);
    await waitForAny([trustedMarker, fallbackMarker]);

    assert.ok(fs.existsSync(trustedMarker), "a trusted BROWSER keeps working");
    assert.match(fs.readFileSync(trustedMarker, "utf8"), /http:\/\/localhost:/);
  } finally {
    rm(dirs.tmp);
  }
});
