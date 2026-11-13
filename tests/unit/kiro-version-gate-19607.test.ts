/**
 * Kiro client-version gate regression guard (#19607).
 *
 * On 2026-11-09 Kiro started rejecting clients older than IDE 0.11.133 / CLI 1.28.2
 * (kirodotdev/Kiro#11335) with:
 *   403 "This version of Kiro is no longer supported. Please update to the latest
 *        version of Kiro to continue."
 * OmniRoute identified itself as `kiro-ide/1.0.0` on inference, below the floor. The model
 * catalog's `KiroIDE-0.10.32` is below it too, but ListAvailableModels is not gated; it stays
 * on that version (live re-check 2026-11-13, see the catalog tests below).
 *
 * Live matrix, 2026-11-10, real IdC token, invalid model id so nothing is generated:
 *   q.us-east-1             UA kiro-ide/1.0.0      -> 403 version gate
 *   q.us-east-1             UA kiro-cli/3.1.0      -> 403 version gate
 *   q.us-east-1             UA ...KiroIDE-1.4.121  -> passes (400 INVALID_MODEL_ID)
 *   codewhisperer.us-east-1 UA ...KiroIDE-1.4.121  -> passes
 *   runtime.us-east-1.kiro.dev, either UA          -> passes
 * The gate reads `User-Agent` only (X-Amz-User-Agent swapped alone changes nothing) and
 * does not need the machine-id suffix. A real completion on q.us-east-1 with the IDE
 * User-Agent returned 200. Connections that only use q.<region> (api_key, external_idp,
 * eu-central-1) therefore need the IDE identity; a kiro-cli identity is not enough.
 *
 * Live re-check, 2026-11-13, same setup: the gate now answers with 400 instead of 403
 * (same message). q.us-east-1 and codewhisperer.us-east-1 return the 400 for
 * `kiro-ide/1.0.0`; `KiroIDE-1.4.121` (no suffix) and `KiroIDE-1.4.154-<machineId>` pass on
 * all three hosts; runtime.us-east-1.kiro.dev passed every identity for this IdC token.
 *
 * These tests pin the identities so a future drift fails here instead of as an
 * upstream 403 in production.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { KiroExecutor } from "../../open-sse/executors/kiro.ts";
import {
  classifyProviderError,
  PROVIDER_ERROR_TYPES,
} from "../../open-sse/services/errorClassifier.ts";
import { checkFallbackError } from "../../open-sse/services/accountFallback.ts";
import { kiroRuntimeHost } from "../../open-sse/services/kiroRegion.ts";
import { fetchKiroAvailableModels } from "../../open-sse/services/kiroModels.ts";
import {
  KIRO_SDK_USER_AGENT,
  KIRO_AMZ_USER_AGENT,
  getKiroServiceHeaders,
} from "../../open-sse/config/providerHeaderProfiles.ts";

/**
 * Kiro IDE version floor to stay above: 0.11.133 since 2026-11-09 (kirodotdev/Kiro#11335),
 * raised to 0.12.291 on 2027-01-15 (kirodotdev/Kiro#11966). Pin against the later one.
 */
const NEXT_IDE_FLOOR = [0, 12, 291];

/** Extract the `KiroIDE-<ver>` version from a UA string. */
function kiroIdeVersion(ua: string): number[] | null {
  const match = ua.match(/KiroIDE-(\d+(?:\.\d+)*)/);
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

/** The exact 403 body Kiro returns to a client below its version floor (live, 2026-11-10). */
const KIRO_VERSION_GATE_403 = {
  message:
    "This version of Kiro is no longer supported. Please update to the latest version of Kiro to continue.",
  reason: "FEATURE_NOT_SUPPORTED",
};

test("version-gate 403 is a recoverable Kiro error, not a permanent ban", () => {
  // The body blames the client version, not the account: the same token succeeds once the
  // request carries a supported identity. FORBIDDEN would write the terminal banned /
  // isActive:false state on the first occurrence (#19607 log: "banned (403) -- disabling
  // permanently"), so the connection stayed dead even after the client was fixed.
  for (const provider of ["kiro", "amazon-q"]) {
    assert.equal(
      classifyProviderError(403, KIRO_VERSION_GATE_403, provider),
      PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR,
      `${provider} version-gate 403 must not ban the connection`
    );
  }
});

test("control: the version-gate wording on a non-Kiro oauth provider keeps FORBIDDEN", () => {
  assert.equal(
    classifyProviderError(403, KIRO_VERSION_GATE_403, "claude"),
    PROVIDER_ERROR_TYPES.FORBIDDEN
  );
});

/** Since 2026-11-12 the gate answers with 400 and the same message (live, 2026-11-13). */
const KIRO_VERSION_GATE_400 = {
  message:
    "This version of Kiro is no longer supported. Please update to the latest version of Kiro to continue.",
};

test("version-gate 400 is recorded as a recoverable Kiro error", () => {
  // Unclassified (null), the 400 left no trace on the connection: it stayed "active" with
  // no lastError while every request failed (#19748). PROJECT_ROUTE_ERROR records the
  // reason on the connection and never bans it.
  for (const provider of ["kiro", "amazon-q"]) {
    assert.equal(
      classifyProviderError(400, KIRO_VERSION_GATE_400, provider),
      PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR,
      `${provider} version-gate 400 must be recorded without a ban`
    );
  }
});

test("version-gate 400 does not trigger account fallback or a cooldown", () => {
  // Every account sends the same client identity, so another account cannot pass the gate.
  const result = checkFallbackError(400, JSON.stringify(KIRO_VERSION_GATE_400), 0, null, "kiro");
  assert.equal(result.shouldFallback, false);
  assert.equal(result.cooldownMs, 0);
  assert.notEqual(result.permanent, true);
});

test("control: the version-gate wording on a non-Kiro provider 400 stays unclassified", () => {
  assert.equal(classifyProviderError(400, KIRO_VERSION_GATE_400, "claude"), null);
});

test("kiro service User-Agent identifies a Kiro IDE release above the next version floor", () => {
  // A kiro-cli identity is not enough: q.<region> answers the version-gate 403 to
  // `kiro-cli/3.1.0` while it serves a Kiro IDE identity (live matrix in the header).
  for (const ua of [KIRO_SDK_USER_AGENT, KIRO_AMZ_USER_AGENT]) {
    const version = kiroIdeVersion(ua);
    assert.ok(version, `UA must carry KiroIDE-<version>: ${ua}`);
    assert.ok(
      atLeast(version, NEXT_IDE_FLOOR),
      `UA ${ua} is below the Kiro IDE 0.12.291 floor (kirodotdev/Kiro#11966)`
    );
  }
  assert.equal(getKiroServiceHeaders()["User-Agent"], KIRO_SDK_USER_AGENT);
});

test("connections served only by q.<region> send the Kiro IDE User-Agent", async () => {
  // api_key, external_idp and eu-central-1 never reach the branded gateway, so the
  // User-Agent alone decides whether they pass the gate.
  const cases: Credentials[] = [
    { apiKey: "ksk_test", providerSpecificData: { authMethod: "api_key", region: "us-east-1" } },
    {
      accessToken: "org-token",
      providerSpecificData: { authMethod: "external_idp", region: "us-east-1" },
    },
    {
      accessToken: "idc-token",
      providerSpecificData: { authMethod: "idc", region: "eu-central-1" },
    },
  ];
  for (const credentials of cases) {
    const { urls, headers } = await captureExecuteRequests(credentials);
    const label = JSON.stringify(credentials.providerSpecificData);
    assert.ok(
      urls.every((u) => /^https:\/\/q\.[a-z0-9-]+\.amazonaws\.com\//.test(u)),
      `${label} must use the regional Amazon Q host, got ${JSON.stringify(urls)}`
    );
    const ua = String(headers["User-Agent"] ?? "");
    const version = kiroIdeVersion(ua);
    assert.ok(version && atLeast(version, NEXT_IDE_FLOOR), `${label} sent User-Agent: ${ua}`);
  }
});

test("API-key import probe sends the Kiro IDE User-Agent", async () => {
  // The probe is a real GenerateAssistantResponse call, so the version gate applies to it.
  // Without a supported User-Agent a valid key gets the gate 403, which the probe reports
  // as "Invalid Kiro API key or AWS region".
  const { validateKiroApiKeyRuntimeProbe } =
    await import("../../src/lib/providers/validation/kiro.ts");
  const originalFetch = globalThis.fetch;
  let probeUa = "";
  globalThis.fetch = (async (_url: URL | string, init?: RequestInit) => {
    const headers = (init?.headers ?? {}) as Record<string, string>;
    probeUa = String(headers["User-Agent"] ?? headers["user-agent"] ?? "");
    return new Response(new ReadableStream(), { status: 200 });
  }) as typeof fetch;
  try {
    await validateKiroApiKeyRuntimeProbe({ apiKey: "ksk_test", region: "us-east-1" });
  } finally {
    globalThis.fetch = originalFetch;
  }
  const version = kiroIdeVersion(probeUa);
  assert.ok(version && atLeast(version, NEXT_IDE_FLOOR), `probe sent User-Agent: ${probeUa}`);
});

test("kiroRuntimeHost uses the regional Amazon Q host in us-east-1, like kiro-cli 3.1.0", () => {
  // kiro-cli 3.1.0 embeds only runtime.*.kiro.dev and q.<region>.amazonaws.com. The
  // codewhisperer host still answers, but OmniRoute follows the current client's hosts.
  assert.equal(
    kiroRuntimeHost("us-east-1"),
    "https://q.us-east-1.amazonaws.com",
    "us-east-1 runtime must use the regional Amazon Q host"
  );
  assert.equal(kiroRuntimeHost("eu-central-1"), "https://q.eu-central-1.amazonaws.com");
});

test("idc connection in us-east-1 uses only the regional Amazon Q host", async () => {
  // The gate is User-Agent based, not host based: with the Kiro IDE identity a real IdC
  // completion returned 200 from q.us-east-1 (live, 2026-11-10). IdC keeps its pre-#19607
  // single-surface routing; the branded gateway is not needed to pass the gate.
  const { urls } = await captureExecuteRequests({
    accessToken: "idc-token",
    providerSpecificData: { authMethod: "idc", region: "us-east-1" },
  });
  assert.deepEqual(urls, ["https://q.us-east-1.amazonaws.com/generateAssistantResponse"]);
});

/**
 * ListAvailableModels as measured live on 2026-11-13 (IdC, us-east-1, with a profileArn).
 * Only the identities that were measured are modelled:
 *   KiroIDE-0.10.32, origin only   -> 200, full catalog (22 models, Claude included)
 *   KiroIDE-1.4.121, origin only   -> 400 "Invalid profileArn."
 *   KiroIDE-1.4.121, + profileArn  -> 200; on the reporter's account a 9-model list, no Claude
 */
function liveCatalogUpstream() {
  const calls: Array<{ url: string; ideVersion: string | null }> = [];
  const json = (status: number, body: unknown) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  const fetchImpl = (async (url: URL | string, init?: RequestInit) => {
    const headers = (init?.headers ?? {}) as Record<string, string>;
    const ua = String(headers["User-Agent"] ?? headers["user-agent"] ?? "");
    const ideVersion = kiroIdeVersion(ua)?.join(".") ?? null;
    calls.push({ url: String(url), ideVersion });
    if (String(url).includes("profileArn=")) {
      return json(200, { models: [{ modelId: "auto" }, { modelId: "deepseek-3.2" }] });
    }
    if (ideVersion === "0.10.32") {
      return json(200, {
        models: [
          { modelId: "auto" },
          { modelId: "claude-sonnet-4.5" },
          { modelId: "claude-opus-4.5" },
          { modelId: "deepseek-3.2" },
        ],
      });
    }
    return json(400, { message: "Invalid profileArn.", missingPermissions: null, reason: null });
  }) as typeof fetch;
  return { calls, fetchImpl };
}

test("kiro catalog lists the full catalog from the origin-only call, without the profileArn retry", async () => {
  // #19607 regression: the catalog advertised the inference version (KiroIDE-1.4.121). The
  // origin-only call then answered 400 "Invalid profileArn.", discovery fell through to the
  // profileArn retry, and on the reporter's account that returned 9 models with no Claude,
  // which were saved as the account's catalog. The catalog is not behind the version gate.
  const { calls, fetchImpl } = liveCatalogUpstream();
  const result = await fetchKiroAvailableModels({
    accessToken: "catalog-regression-token",
    providerSpecificData: {
      authMethod: "idc",
      region: "us-east-1",
      clientId: "catalog-regression-client",
      profileArn: "arn:aws:codewhisperer:us-east-1:000000000000:profile/TEST",
    },
    fetchImpl,
  });
  assert.equal(result.source, "api");
  assert.ok(
    result.models.some((model) => model.id === "claude-sonnet-4.5"),
    `catalog lost Claude: ${JSON.stringify(result.models.map((model) => model.id))}`
  );
  assert.equal(calls.length, 1, `expected one origin-only call, got ${JSON.stringify(calls)}`);
  assert.ok(!calls[0].url.includes("profileArn="), "the profileArn retry must not be needed");
});

test("kiro catalog keeps its own Kiro IDE identity, separate from inference", async () => {
  const { calls, fetchImpl } = liveCatalogUpstream();
  await fetchKiroAvailableModels({
    accessToken: "catalog-identity-token",
    // Unique seed: the catalog cache is module-level and keyed on it.
    providerSpecificData: {
      authMethod: "idc",
      region: "us-east-1",
      clientId: "catalog-identity-client",
    },
    fetchImpl,
  });
  assert.equal(calls[0]?.ideVersion, "0.10.32");
  // Inference still needs the gated-era identity; the two versions differ on purpose.
  assert.notDeepEqual(kiroIdeVersion(KIRO_SDK_USER_AGENT), [0, 10, 32]);
});

test("kiro usage fetches use the regional Amazon Q host in us-east-1", () => {
  // GetUsageLimits used the legacy codewhisperer host for us-east-1 profiles; since
  // #19607 it follows the rest of the integration onto q.us-east-1.
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
