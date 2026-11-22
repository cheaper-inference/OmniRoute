import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { NextRequest } from "next/server";

// The resolver reads the DB, so the store has to live in an isolated directory
// before any module import touches DATA_DIR.
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-env-only-flags-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = "env-only-flags-api-key-secret";
process.env.JWT_SECRET = "env-only-flags-session-secret";

const flags = await import("../../src/shared/utils/featureFlags.ts");
const flagsDb = await import("../../src/lib/db/featureFlags.ts");
const { closeDbInstance } = await import("../../src/lib/db/core.ts");
const route = await import("../../src/app/api/settings/feature-flags/route.ts");
const { FEATURE_FLAG_DEFINITIONS } = await import(
  "../../src/shared/constants/featureFlagDefinitions.ts"
);
const { mintDashboardSessionToken } = await import(
  "../../src/shared/utils/dashboardSessionToken.ts"
);

/**
 * Keys whose consumers read the environment directly. Keep this list in sync
 * with the envOnly markers; the set-equality test below fails when the two
 * disagree.
 */
const ENV_ONLY_KEYS = [
  "CLI_COMPAT_ALL",
  "ENABLE_TLS_FINGERPRINT",
  "MITM_DISABLE_TLS_VERIFY",
  "MODEL_ALIAS_COMPAT_ENABLED",
  "OMNIROUTE_DISABLE_BACKGROUND_SERVICES",
  "OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK",
  "OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK",
  "OMNIROUTE_ENABLE_LIVE_WS",
  "OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS",
  "OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS",
  "OMNIROUTE_RTK_TRUST_PROJECT_FILTERS",
  "PRICING_SYNC_ENABLED",
  "RATE_LIMIT_AUTO_ENABLE",
  "SKILLS_SANDBOX_NETWORK_ENABLED",
  "TOOL_POLICY_MODE",
];

const RESOLVER_HELPERS = [
  "isFeatureFlagEnabled",
  "isRegisteredFeatureFlagEnabled",
  "resolveFeatureFlag",
  "resolveBooleanFeatureFlag",
  "getFeatureFlagOverride",
  "resolveRegisteredFeatureFlag",
  "isFeatureEnabled",
];

/**
 * Keys resolved through an indirection the scanner cannot follow by name: the
 * call site passes a locally bound resolver function. Each entry names the
 * symbol that must still exist, so deleting the resolver breaks this test
 * instead of silently widening the allowlist.
 */
interface IndirectResolver {
  key: string;
  via: string;
  alias: string;
  call: string;
}

const INDIRECT_RESOLVERS: IndirectResolver[] = [
  {
    key: "OMNIROUTE_EMERGENCY_FALLBACK",
    via: "emergencyFallbackFeatureFlagResolver",
    alias: "EMERGENCY_FALLBACK_FLAG_KEY",
    call: String.raw`emergencyFallbackFeatureFlagResolver\s*\(\s*EMERGENCY_FALLBACK_FLAG_KEY\s*\)`,
  },
  {
    key: "OMNIROUTE_CHAT_VIRTUAL_LANES",
    via: "resolveAdaptiveVirtualLanesFlag",
    alias: "ADAPTIVE_VIRTUAL_LANES_FLAG_KEY",
    call: String.raw`getOverride\s*\(\s*ADAPTIVE_VIRTUAL_LANES_FLAG_KEY\s*\)`,
  },
];

/** Helpers that read a registered key straight from the environment. */
const ENV_READER_HELPERS = ["isEnvFlagEnabled"];

const SOURCE_EXT = /\.(ts|tsx|js|cjs|mjs)$/;
const SCAN_ROOTS = ["src", "open-sse"];

interface SourceFile {
  file: string;
  text: string;
}

function collectSourceFiles(roots: string[] = SCAN_ROOTS): SourceFile[] {
  const files: SourceFile[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
        walk(full);
        continue;
      }
      if (!SOURCE_EXT.test(entry.name)) continue;
      if (/\.test\.(ts|tsx|js|cjs|mjs)$/.test(entry.name)) continue;
      // The catalog itself names every key; scanning it would make every key
      // look like it has a reader.
      if (full.includes("featureFlagDefinitions")) continue;
      files.push({ file: full, text: fs.readFileSync(full, "utf8") });
    }
  };
  for (const root of roots) walk(path.resolve(root));
  return files;
}

/**
 * `const SOME_KEY = "THE_FLAG"` aliases, so a resolver call through an alias
 * counts. Scoped per file: two modules can reuse the same identifier for
 * different flags, and a tree-wide map would resolve one file's call through
 * another file's binding.
 */
function collectAliases(source: SourceFile): Map<string, string> {
  const aliases = new Map<string, string>();
  for (const match of source.text.matchAll(
    /const\s+([A-Za-z_$][\w$]*)\s*=\s*["']([A-Z0-9_]+)["']/g
  )) {
    aliases.set(match[1], match[2]);
  }
  return aliases;
}

/**
 * Keys that at least one call site reads from the environment, and keys that at
 * least one call site resolves through a flag helper. A key in the first set and
 * not the second is env-only by construction.
 *
 * Keys in both sets are deliberately out of scope: their resolver path honours a
 * stored override, so the flag is not lying, even though individual code paths
 * may still read the environment. Those eleven keys are tracked in #20778.
 */
function classifySources(
  sources: SourceFile[],
  indirect: IndirectResolver[] = INDIRECT_RESOLVERS
) {
  const aliasesByFile = new Map(sources.map((source) => [source.file, collectAliases(source)]));
  const resolverKeys = new Set<string>();
  const envKeys = new Set<string>();
  const helperPattern = new RegExp(
    `(?:${RESOLVER_HELPERS.join("|")})\\s*\\(\\s*(?:["']([A-Z0-9_]+)["']|([A-Za-z_$][\\w$]*))`,
    "g"
  );

  for (const { key, via, alias, call } of indirect) {
    if (!sources.some((source) => source.text.includes(via))) {
      throw new Error(`indirect resolver ${via} for ${key} no longer exists in the tree`);
    }
    // The symbol string alone is not proof. Two ways the binding can drift:
    // the alias is repointed, or the resolver is called with a different
    // constant while the alias keeps its old value. Both are checked in the
    // file that actually contains the call: an identically named constant in
    // another module must not satisfy this one.
    const callPattern = new RegExp(call);
    const callSite = sources.find((source) => callPattern.test(source.text));
    if (!callSite) {
      throw new Error(`${via} no longer reads ${key} through ${alias}`);
    }
    const callSiteAliases = aliasesByFile.get(callSite.file);
    const bound = callSiteAliases?.get(alias);
    if (bound !== key) {
      throw new Error(
        `${alias} no longer resolves to ${key} in ${callSite.file} (found ${bound ?? "nothing"})`
      );
    }
    resolverKeys.add(key);
  }

  for (const { file, text } of sources) {
    const aliases = aliasesByFile.get(file);
    for (const match of text.matchAll(helperPattern)) {
      const literal = match[1];
      const alias = match[2];
      if (literal) resolverKeys.add(literal);
      else if (alias && aliases?.has(alias)) resolverKeys.add(aliases.get(alias)!);
    }
    for (const match of text.matchAll(
      new RegExp(`(?:${ENV_READER_HELPERS.join("|")})\\s*\\(\\s*(?:["']([A-Z0-9_]+)["']|([A-Za-z_$][\\w$]*))`, "g")
    )) {
      const literal = match[1];
      const alias = match[2];
      if (literal) envKeys.add(literal);
      else if (alias && aliases?.has(alias)) envKeys.add(aliases.get(alias)!);
    }
    for (const match of text.matchAll(/(?:process\.env|\benv)\s*\.\s*([A-Z0-9_]{3,})/g)) {
      envKeys.add(match[1]);
    }
    for (const match of text.matchAll(/(?:process\.env|\benv)\s*\[\s*["']([A-Z0-9_]{3,})["']\s*\]/g)) {
      envKeys.add(match[1]);
    }
    for (const match of text.matchAll(/\{([^{}]{1,400})}\s*=\s*(?:process\.env|\benv)\b/g)) {
      for (const name of match[1].matchAll(/[A-Za-z_$][\w$]*/g)) {
        if (/^[A-Z0-9_]{3,}$/.test(name[0])) envKeys.add(name[0]);
      }
    }
  }
  return { resolverKeys, envKeys };
}

function findUnmarkedEnvReads(
  sources: SourceFile[],
  definitions: Array<{ key: string; envOnly?: boolean }>,
  indirect: IndirectResolver[] = INDIRECT_RESOLVERS
): string[] {
  const { resolverKeys, envKeys } = classifySources(sources, indirect);
  const byKey = new Map(definitions.map((entry) => [entry.key, entry]));
  return [...envKeys]
    .filter((key) => byKey.has(key) && !resolverKeys.has(key))
    .filter((key) => byKey.get(key)?.envOnly !== true)
    .sort();
}

function request(method = "GET", body?: { key: string; value?: string }, cookie = authCookie) {
  return new NextRequest("http://localhost/api/settings/feature-flags", {
    method,
    headers: { ...(cookie ? { Cookie: cookie } : {}), "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
}

let authCookie = "";

test.before(async () => {
  authCookie = `auth_token=${await mintDashboardSessionToken(new TextEncoder().encode(process.env.JWT_SECRET))}`;
});

test.after(() => {
  // Override writes and route calls open the store; close it before the
  // directory disappears so the handle does not outlive the test.
  closeDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("every env-only key carries the marker and nothing else does", () => {
  const marked = FEATURE_FLAG_DEFINITIONS.filter((d) => d.envOnly === true).map((d) => d.key);
  assert.deepEqual(marked.sort(), [...ENV_ONLY_KEYS].sort(), "the envOnly set drifted");
});

test("a resolver-backed key keeps honouring a stored override", () => {
  // Regression: this key was marked envOnly by mistake. Its consumer calls
  // isFeatureFlagEnabled through an alias, and two suites caught the change.
  const key = "OMNIROUTE_EMERGENCY_FALLBACK";
  flagsDb.setFeatureFlagOverride(key, "false");
  try {
    const resolved = flags.resolveAllFeatureFlags().find((entry) => entry.key === key);
    assert.equal(resolved?.source, "db");
    assert.equal(resolved?.effectiveValue, "false");
  } finally {
    flagsDb.removeFeatureFlagOverride(key);
  }
});

test("a stored override cannot outrank the environment for an env-only key", () => {
  const key = "PRICING_SYNC_ENABLED";
  // The invoking shell may export the flag; clear it so the default-source
  // assertion below tests the resolver instead of the ambient environment.
  const previousEnv = process.env[key];
  delete process.env[key];
  flagsDb.setFeatureFlagOverride(key, "true");
  try {
    const resolved = flags.resolveAllFeatureFlags().find((entry) => entry.key === key);
    assert.ok(resolved);
    assert.equal(resolved.source, "default", "the DB row must not become the reported source");
    assert.equal(resolved.effectiveValue, "false");
    assert.equal(flags.resolveFeatureFlag(key), "false");

    process.env[key] = "true";
    assert.equal(flags.resolveFeatureFlag(key), "true", "the environment still decides");
    assert.equal(
      flags.resolveAllFeatureFlags().find((entry) => entry.key === key)?.source,
      "env"
    );
  } finally {
    delete process.env[key];
    if (previousEnv !== undefined) process.env[key] = previousEnv;
    flagsDb.removeFeatureFlagOverride(key);
  }
});

test("PUT refuses an env-only key and writes nothing", async () => {
  const response = await route.PUT(
    request("PUT", { key: "SKILLS_SANDBOX_NETWORK_ENABLED", value: "true" })
  );
  assert.equal(response.status, 400);
  const payload = (await response.json()) as { error?: string };
  assert.match(payload.error ?? "", /environment-only/);
  assert.equal(flagsDb.getFeatureFlagOverride("SKILLS_SANDBOX_NETWORK_ENABLED"), undefined);
});

test("an anonymous caller still gets the auth refusal before the env-only refusal", async () => {
  // The env-only check must not run ahead of authorization, or an unauthenticated
  // probe could tell a protected flag apart from a normal one.
  const response = await route.PUT(
    request("PUT", { key: "MITM_DISABLE_TLS_VERIFY", value: "true" }, "")
  );
  assert.ok(
    response.status === 401 || response.status === 403,
    `expected an auth refusal, got ${response.status}`
  );
});

test("PUT still accepts a key whose readers resolve through the flag store", async () => {
  const key = "COMBO_AUTO_PRUNE_STALE_STEPS";
  const response = await route.PUT(request("PUT", { key, value: "true" }));
  assert.equal(response.status, 200);
  const payload = (await response.json()) as { effectiveValue: string; source: string };
  assert.equal(payload.effectiveValue, "true");
  assert.equal(payload.source, "db");
  flagsDb.removeFeatureFlagOverride(key);
});

test("GET reports which keys are environment-only", async () => {
  const response = await route.GET(request());
  assert.equal(response.status, 200);
  const payload = (await response.json()) as {
    flags: Array<{ key: string; envOnly?: boolean }>;
  };
  const envOnly = payload.flags.find((flag) => flag.key === "MITM_DISABLE_TLS_VERIFY");
  const dbBacked = payload.flags.find((flag) => flag.key === "COMBO_AUTO_PRUNE_STALE_STEPS");
  assert.equal(envOnly?.envOnly, true);
  assert.equal(dbBacked?.envOnly, false);
});
test("GET reports the limiter's auto-enable verdict, not the catalog default", async () => {
  // With the env override unset the limiter falls back to
  // requestQueue.autoEnableApiKeyProviders, whose shipped default is true.
  // Reporting the catalog default (false) would tell operators the safety net
  // is off while it is actively enabling protection.
  const previous = process.env.RATE_LIMIT_AUTO_ENABLE;
  delete process.env.RATE_LIMIT_AUTO_ENABLE;
  try {
    const response = await route.GET(request());
    const payload = (await response.json()) as {
      flags: Array<{ key: string; effectiveValue: string; source: string }>;
    };
    const flag = payload.flags.find((entry) => entry.key === "RATE_LIMIT_AUTO_ENABLE");
    assert.equal(flag?.effectiveValue, "true");
    assert.equal(flag?.source, "default", "an inherited default is not a stored override");

    process.env.RATE_LIMIT_AUTO_ENABLE = "false";
    const forced = await route.GET(request());
    const forcedPayload = (await forced.json()) as {
      flags: Array<{ key: string; effectiveValue: string; source: string }>;
    };
    const forcedFlag = forcedPayload.flags.find((entry) => entry.key === "RATE_LIMIT_AUTO_ENABLE");
    assert.equal(forcedFlag?.effectiveValue, "false", "the env override still wins");
    assert.equal(forcedFlag?.source, "env");
  } finally {
    if (previous !== undefined) process.env.RATE_LIMIT_AUTO_ENABLE = previous;
    else delete process.env.RATE_LIMIT_AUTO_ENABLE;
  }
});

test("the scanner sees every read form a consumer can be written in", () => {
  const definitions = [
    { key: "ALIAS_READ" },
    { key: "BRACKET_READ" },
    { key: "ENV_OBJECT_READ" },
    { key: "DESTRUCTURED_READ" },
    { key: "ENV_HELPER_READ" },
    { key: "RESOLVED_READ" },
  ];
  const sources: SourceFile[] = [
    {
      file: "synthetic.ts",
      text: `
        const a = process.env.ALIAS_READ;
        const b = process.env["BRACKET_READ"];
        function f(env: Record<string, string | undefined>) { return env.ENV_OBJECT_READ; }
        const { DESTRUCTURED_READ } = process.env;
        const d = isEnvFlagEnabled("ENV_HELPER_READ");
        const KEY = "RESOLVED_READ";
        const c = isFeatureFlagEnabled(KEY);
      `,
    },
  ];
  assert.deepEqual(findUnmarkedEnvReads(sources, definitions, []), [
    "ALIAS_READ",
    "BRACKET_READ",
    "DESTRUCTURED_READ",
    "ENV_HELPER_READ",
    "ENV_OBJECT_READ",
  ]);
});

test("an alias in one file does not resolve a call in another file", () => {
  // Two modules bind the same identifier to different flags. A tree-wide alias
  // map lets the last binding win, which credits a.ts's resolver call to
  // ENV_ONLY and hides the real environment read in b.ts.
  const definitions = [{ key: "DB_BACKED" }, { key: "ENV_ONLY" }];
  const sources: SourceFile[] = [
    {
      file: "a.ts",
      text: `const KEY = "DB_BACKED"; export const v = isFeatureFlagEnabled(KEY);`,
    },
    {
      file: "b.ts",
      text: `const KEY = "ENV_ONLY"; export const x = process.env.ENV_ONLY;`,
    },
  ];
  assert.deepEqual(findUnmarkedEnvReads(sources, definitions, []), ["ENV_ONLY"]);
});

test("the scanner covers the file types and trees the real consumers live in", () => {
  const files = collectSourceFiles().map((entry) => entry.file);
  const required = [
    path.resolve("open-sse/services/emergencyFallback.ts"),
    path.resolve("src/lib/pricingSync.ts"),
    path.resolve("src/mitm/server.cjs"),
  ];
  for (const file of required) {
    assert.ok(files.includes(file), `scanner skipped ${path.relative(process.cwd(), file)}`);
  }
  assert.ok(
    files.every((file) => !file.includes("node_modules")),
    "scanner walked into node_modules"
  );
});

test("a marked key is never resolved through the flag store", () => {
  // Marking a key whose consumer resolves through the flag store would make that
  // consumer ignore a stored override, which is the regression this change hit
  // once already with OMNIROUTE_EMERGENCY_FALLBACK.
  const { resolverKeys } = classifySources(collectSourceFiles());
  const marked = FEATURE_FLAG_DEFINITIONS.filter((d) => d.envOnly === true).map((d) => d.key);
  const conflicted = marked.filter((key) => resolverKeys.has(key)).sort();
  assert.deepEqual(conflicted, [], `marked env-only but resolved through the flag store: ${conflicted.join(", ")}`);
});

test("no registered key reads the environment without a resolver or the marker", () => {
  const offenders = findUnmarkedEnvReads(collectSourceFiles(), FEATURE_FLAG_DEFINITIONS);
  assert.deepEqual(
    offenders,
    [],
    `these registered keys are read from the environment but are not marked envOnly: ${offenders.join(", ")}`
  );
});

// Definition order is deliberately not asserted. The settings panel groups by
// category and renders in API order, and no consumer indexes the array, so
// pinning an order would only make every future flag addition churn this file.
test("every definition carries a distinct description i18n key", () => {
  // The env-only rows were moved between modules during this change. A copy or a
  // rename that drops the key leaves the panel rendering a raw identifier, so the
  // catalog key travels with the definition and stays unique.
  const missing = FEATURE_FLAG_DEFINITIONS.filter((d) => !d.descriptionI18nKey?.trim()).map((d) => d.key);
  assert.deepEqual(missing, [], `definitions without an i18n description key: ${missing.join(", ")}`);

  const seen = new Map<string, string[]>();
  for (const definition of FEATURE_FLAG_DEFINITIONS) {
    if (!definition.descriptionI18nKey) continue;
    seen.set(definition.descriptionI18nKey, [...(seen.get(definition.descriptionI18nKey) ?? []), definition.key]);
  }
  const shared = [...seen.entries()].filter(([, keys]) => keys.length > 1);
  assert.deepEqual(
    shared.map(([i18nKey, keys]) => `${i18nKey}: ${keys.join(" + ")}`),
    [],
    "definitions sharing one description i18n key"
  );
});

test("the env-only definitions keep the catalog keys they were moved with", () => {
  const expected: Record<string, string> = {
    CLI_COMPAT_ALL: "featureFlagCliCompatAllDescription",
    ENABLE_TLS_FINGERPRINT: "featureFlagEnableTlsFingerprintDescription",
    MITM_DISABLE_TLS_VERIFY: "featureFlagMitmDisableTlsVerifyDescription",
    MODEL_ALIAS_COMPAT_ENABLED: "featureFlagModelAliasCompatEnabledDescription",
    OMNIROUTE_DISABLE_BACKGROUND_SERVICES: "featureFlagOmnirouteDisableBackgroundServicesDescription",
    OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK: "featureFlagOmnirouteDisableLocalHealthcheckDescription",
    OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK: "featureFlagOmnirouteDisableTokenHealthcheckDescription",
    OMNIROUTE_ENABLE_LIVE_WS: "featureFlagOmnirouteEnableLiveWsDescription",
    OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS: "featureFlagOmnirouteEnableRuntimeBackgroundTasksDescription",
    OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS: "featureFlagOmnirouteMcpCompressDescriptionsDescription",
    OMNIROUTE_RTK_TRUST_PROJECT_FILTERS: "featureFlagOmnirouteRtkTrustProjectFiltersDescription",
    PRICING_SYNC_ENABLED: "featureFlagPricingSyncEnabledDescription",
    RATE_LIMIT_AUTO_ENABLE: "featureFlagRateLimitAutoEnableDescription",
    SKILLS_SANDBOX_NETWORK_ENABLED: "featureFlagSkillsSandboxNetworkEnabledDescription",
    TOOL_POLICY_MODE: "featureFlagToolPolicyModeDescription",
  };
  const byKey = new Map(FEATURE_FLAG_DEFINITIONS.map((d) => [d.key, d]));
  const drifted = Object.entries(expected)
    .filter(([key, i18nKey]) => byKey.get(key)?.descriptionI18nKey !== i18nKey)
    .map(([key, i18nKey]) => `${key}: expected ${i18nKey}, got ${byKey.get(key)?.descriptionI18nKey ?? "missing"}`);
  assert.deepEqual(drifted, [], drifted.join("; "));
});
