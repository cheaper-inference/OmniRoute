/**
 * Kiro client-version gate regression guard (#19607).
 *
 * On 2026-11-09 Kiro started rejecting clients older than IDE 0.11.133 / CLI 1.28.2
 * (kirodotdev/Kiro#11335) with:
 *   403 "This version of Kiro is no longer supported. Please update to the latest
 *        version of Kiro to continue."
 * OmniRoute identified itself as `kiro-ide/1.0.0` (inference, credits, refresh) and
 * `KiroIDE-0.10.32` (model catalog) — both far below the floor. The same enforcement
 * retired the legacy `codewhisperer.us-east-1.amazonaws.com` runtime host: the current
 * kiro-cli only talks to `runtime.*.kiro.dev` and `q.<region>.amazonaws.com`.
 *
 * These tests pin the three identities so a future UA/host drift fails loudly here
 * instead of as an upstream 403 in production.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { KiroExecutor } from "../../open-sse/executors/kiro.ts";
import { kiroRuntimeHost } from "../../open-sse/services/kiroRegion.ts";
import { fetchKiroAvailableModels } from "../../open-sse/services/kiroModels.ts";
import {
  KIRO_SDK_USER_AGENT,
  KIRO_AMZ_USER_AGENT,
  getKiroServiceHeaders,
} from "../../open-sse/config/providerHeaderProfiles.ts";

/**
 * Lowest client version Kiro still serves (kirodotdev/Kiro#11335; the next floor,
 * CLI 1.28.2–2.5.0 / IDE 0.11.133–0.12.291, takes effect 2027-01-15 per
 * kirodotdev/Kiro#11966 — keep the pinned identities comfortably above it).
 */
const MIN_SUPPORTED_CLI = [1, 28, 2];

/** Extract the `kiro-cli/<ver>` (or `KiroIDE-<ver>`-style) version from a UA string. */
function uaVersion(ua: string): number[] | null {
  const match = ua.match(/kiro-cli\/(\d+(?:\.\d+)*)/i) ?? ua.match(/KiroIDE-(\d+(?:\.\d+)*)/i);
  return match ? match[1].split(".").map(Number) : null;
}

/** Semver-ish >= compare where missing segments count as 0. */
function atLeast(version: number[], floor: number[]): boolean {
  for (let i = 0; i < Math.max(version.length, floor.length); i++) {
    const v = version[i] ?? 0;
    const f = floor[i] ?? 0;
    if (v > f) return true;
    if (v < f) return false;
  }
  return true;
}

const REPO_ROOT = fileURLToPath(new URL("../..", import.meta.url));

/** Runtime keys a tsx child process still needs (same allowlist as the adapta fixture). */
const CHILD_RUNTIME_ENV_KEYS = [
  "PATH",
  "TMPDIR",
  "TMP",
  "TEMP",
  "SystemRoot",
  "ComSpec",
  "PATHEXT",
  "LANG",
  "LC_ALL",
  "TZ",
] as const;

/** Minimal child env: no OMNIROUTE_CODEWHISPERER_BASE_URL, no NODE_TEST_CONTEXT. */
function buildIsolatedChildEnv(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {
    NODE_ENV: "test",
    APP_LOG_TO_FILE: "false",
    DISABLE_SQLITE_AUTO_BACKUP: "true",
  };
  for (const key of CHILD_RUNTIME_ENV_KEYS) {
    const value = process.env[key];
    if (value !== undefined) env[key] = value;
  }
  // A nested test runner must receive its own context instead of inheriting the parent's.
  delete env.NODE_TEST_CONTEXT;
  return env;
}

type Credentials = Record<string, unknown>;

async function captureExecuteRequests(
  credentials: Credentials
): Promise<{ urls: string[]; headers: Record<string, string> }> {
  const executor = new KiroExecutor();
  executor.transformEventStreamToSSE = () =>
    new Response("data: [DONE]\n\n", {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  const originalFetch = globalThis.fetch;
  const urls: string[] = [];
  let capturedHeaders: Record<string, string> = {};
  globalThis.fetch = (async (url: URL | string, init?: RequestInit) => {
    urls.push(String(url));
    capturedHeaders = (init?.headers ?? {}) as Record<string, string>;
    return new Response("ok", { status: 200 });
  }) as typeof fetch;
  try {
    await executor.execute({
      model: "kiro-model",
      body: { conversationState: {} },
      stream: true,
      credentials,
    } as Parameters<KiroExecutor["execute"]>[0]);
  } finally {
    globalThis.fetch = originalFetch;
  }
  return { urls, headers: capturedHeaders };
}

test("kiro service User-Agent identifies a supported kiro-cli version (>= 1.28.2)", () => {
  const headers = getKiroServiceHeaders();
  for (const ua of [KIRO_SDK_USER_AGENT, KIRO_AMZ_USER_AGENT]) {
    const version = uaVersion(ua);
    assert.ok(version, `UA must carry a version segment: ${ua}`);
    assert.ok(
      atLeast(version, MIN_SUPPORTED_CLI),
      `UA version ${ua} is below Kiro's minimum supported CLI 1.28.2 (kirodotdev/Kiro#11335) — upstream answers 403`
    );
  }
  assert.equal(headers["User-Agent"], KIRO_SDK_USER_AGENT);
});

test("kiro inference requests send the versioned User-Agent over the wire", async () => {
  const { headers } = await captureExecuteRequests({
    accessToken: "idc-token",
    providerSpecificData: { authMethod: "idc", region: "us-east-1" },
  });
  const ua = String(headers["User-Agent"] ?? "");
  const version = uaVersion(ua);
  assert.ok(version, `executor must send a versioned User-Agent, got: ${ua}`);
  assert.ok(atLeast(version, MIN_SUPPORTED_CLI), `executor UA below floor: ${ua}`);
});

test("kiroRuntimeHost never routes to the retired codewhisperer host in us-east-1", () => {
  // The current kiro-cli embeds only runtime.*.kiro.dev and q.<region>.amazonaws.com;
  // codewhisperer.us-east-1.amazonaws.com is the retired legacy surface the version
  // gate rejects (#19607).
  assert.equal(
    kiroRuntimeHost("us-east-1"),
    "https://q.us-east-1.amazonaws.com",
    "us-east-1 runtime must use the regional Amazon Q host, not the retired codewhisperer host"
  );
  assert.equal(kiroRuntimeHost("eu-central-1"), "https://q.eu-central-1.amazonaws.com");
});

test("idc connection in us-east-1 tries the branded gateway first, regional Q as fallback", async () => {
  // Live-verified 2026-11-10 (#19607): AWS-native hosts (codewhisperer AND q.us-east-1)
  // reject SSO-issued tokens with the version-gate 403 regardless of User-Agent; the
  // branded runtime.us-east-1.kiro.dev gateway authenticates the same IdC token and
  // streams a real completion. IdC inference must therefore ride the gateway first
  // exactly like builder-id/social, keeping the regional Q host as the fallback.
  const { urls } = await captureExecuteRequests({
    accessToken: "idc-token",
    providerSpecificData: { authMethod: "idc", region: "us-east-1" },
  });
  // Success on the first candidate means exactly one URL — the gateway.
  assert.deepEqual(urls, ["https://runtime.us-east-1.kiro.dev/generateAssistantResponse"]);
});

test("idc connection falls back to the regional Q host when the gateway rejects auth", async () => {
  const executor = new KiroExecutor();
  executor.transformEventStreamToSSE = () =>
    new Response("data: [DONE]\n\n", {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  const originalFetch = globalThis.fetch;
  const urls: string[] = [];
  globalThis.fetch = (async (url: URL | string) => {
    urls.push(String(url));
    if (String(url).includes("runtime.us-east-1.kiro.dev")) {
      return new Response(JSON.stringify({ message: "bearer token invalid" }), { status: 403 });
    }
    return new Response("ok", { status: 200 });
  }) as typeof fetch;
  try {
    await executor.execute({
      model: "kiro-model",
      body: { conversationState: {} },
      stream: true,
      credentials: {
        accessToken: "idc-token",
        providerSpecificData: { authMethod: "idc", region: "us-east-1" },
      },
    } as Parameters<KiroExecutor["execute"]>[0]);
  } finally {
    globalThis.fetch = originalFetch;
  }
  assert.deepEqual(urls, [
    "https://runtime.us-east-1.kiro.dev/generateAssistantResponse",
    "https://q.us-east-1.amazonaws.com/generateAssistantResponse",
  ]);
});

test("kiro catalog fingerprint UA carries a supported IDE version", async () => {
  let catalogUa = "";
  const fetchImpl = (async (_url: URL | string, init?: RequestInit) => {
    const headers = (init?.headers ?? {}) as Record<string, string>;
    catalogUa = String(headers["User-Agent"] ?? headers["user-agent"] ?? "");
    return new Response(JSON.stringify({ models: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  await fetchKiroAvailableModels({
    accessToken: "token",
    providerSpecificData: { authMethod: "idc", region: "us-east-1", clientId: "abc" },
    fetchImpl,
  });
  const match = catalogUa.match(/KiroIDE-(\d+(?:\.\d+)*)/i);
  assert.ok(match, `catalog UA must carry KiroIDE-<version>, got: ${catalogUa}`);
  const version = match[1].split(".").map(Number);
  // IDE floor is 0.11.133 (kirodotdev/Kiro#11335)
  assert.ok(
    atLeast(version, [0, 11, 133]),
    `catalog UA IDE version ${match[1]} is below the 0.11.133 support floor`
  );
});

test("kiro usage fetches never target the retired codewhisperer host in us-east-1", () => {
  // GetUsageLimits routed its primary attempt to the legacy codewhisperer host for
  // us-east-1 profiles; with the 2026-11-09 gate that host 403s every request (#19607).
  //
  // The usage module captures OMNIROUTE_CODEWHISPERER_BASE_URL at module load, and
  // `test:unit:fast` runs with --test-isolation=none — ~60 alphabetically-earlier test
  // files load services/usage.ts before this one, so the parent process's module
  // cache would freeze whatever env those tests ran under. Run the assertion in an
  // isolated child process (repo's fixture+spawnSync pattern) with the variable
  // deleted from a minimal env: no module-cache reuse, no operator-exported legacy
  // override can mask the default-routing regression this test pins.
  const fixture = fileURLToPath(
    new URL("../fixtures/kiro-usage-host-isolation.fixture.ts", import.meta.url)
  );
  const result = spawnSync(
    process.execPath,
    ["--import", "tsx/esm", "--test", "--test-force-exit", fixture],
    {
      cwd: REPO_ROOT,
      encoding: "utf8",
      // Minimal child env: runtime essentials only. OMNIROUTE_CODEWHISPERER_BASE_URL
      // is deliberately absent so the usage module's load-time capture resolves the
      // default (regional Q host) — the fixture also sets it deliberately to the
      // legacy value *after* its own import to prove default routing stands.
      env: buildIsolatedChildEnv(),
      timeout: 60_000,
    }
  );
  assert.equal(result.status, 0, `fixture failed:\n${result.stdout}\n${result.stderr}`);
});
