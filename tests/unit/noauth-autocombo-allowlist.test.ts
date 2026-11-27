/**
 * Auto-combo no-auth pool — the `auto`/`auto-*` candidate pool may only pull in
 * no-auth providers that opt into prompt-emulated tool calling. Browser transports
 * and supported local CLIs also need a successful readiness probe.
 * Every other keyless provider remains usable through direct `<alias>/<model>` calls,
 * but is excluded from auto-routing.
 *
 * The pool is no longer a hand-maintained id list: it is derived at startup from
 * NOAUTH_PROVIDERS, taking every entry with `noAuth: true` and
 * `toolCalling: "emulated"`. Those providers answer without any credential, and
 * their tool calls are executed by the 3rd-party CLI (Claude Code, Codex, Cursor…)
 * rather than by the upstream.
 *
 * Every other keyless provider stays OUT of every auto/* pool — it remains fully
 * usable via direct `<alias>/<model>` calls, it is just not auto-routed to.
 *
 * The admitted providers are Cloudflare Playground, DuckDuckGo, and Devin
 * when their probes confirm readiness.
 *
 * Historical note: until 2026-07-24 (refs #8183/#6453/#7032) the pool was a
 * hardcoded `{opencode}` allowlist. That narrowing is retired.
 *
 * Regression guard: EMULATED_TOOL_CALLING_NOAUTH_PROVIDERS in
 * open-sse/services/autoCombo/emulatedNoAuthAllowlist.ts drives what belongs
 * here. Adding `toolCalling: "emulated"` to another NOAUTH_PROVIDERS entry WILL
 * change the pool and must update AVAILABLE_BROWSER_PROVIDERS below.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-noauth-allowlist-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

process.env.DATA_DIR = TEST_DATA_DIR;
// Deterministic "no Devin CLI on this machine": the readiness probe must not find a real
// `devin` binary on the developer's PATH.
const ORIGINAL_DEVIN_BIN = process.env.CLI_DEVIN_AGENTIC_BIN;
const ORIGINAL_DEVIN_HOME = process.env.DEVIN_AGENTIC_HOME;
process.env.CLI_DEVIN_AGENTIC_BIN = path.join(TEST_DATA_DIR, "no-such-devin-binary");
delete process.env.DEVIN_AGENTIC_HOME;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const virtualFactory = await import("../../open-sse/services/autoCombo/virtualFactory.ts");
const { createBuiltinAutoCombo } =
  await import("../../open-sse/services/autoCombo/builtinCatalog.ts");
const devinStatus = await import("../../src/lib/providers/devinAgenticAuthStatus.ts");
const noAuthReadiness = await import("../../open-sse/services/autoCombo/noAuthReadiness.ts");
const readinessBoot = await import("../../src/lib/providers/noAuthAutoRoutingReadiness.ts");
// Exercise the same readiness registration as the Node.js server boot.
await readinessBoot.registerNoAuthAutoRoutingReadiness();

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
  for (const providerId of AVAILABLE_BROWSER_PROVIDERS) {
    noAuthReadiness.registerNoAuthReadiness(providerId, () => true);
  }
  // contract changed by #15979 (on top of #15839): `excludeTosAvoid` defaults to on and
  // uncataloged models inherit the provider's curated `tos: "avoid"` verdict, so a fresh
  // install filters every opencode model out of auto/*. Opt out so this file keeps guarding
  // the no-auth allowlist itself; the ToS default is covered by
  // tests/unit/issue-15059-tos-avoid-auto-default.test.ts and tos-provider-alias-15059.
  await settingsDb.updateSettings({ excludeTosAvoid: false });
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });

  devinStatus.clearDevinAgenticAuthStatusCache();
  if (ORIGINAL_DEVIN_BIN === undefined) delete process.env.CLI_DEVIN_AGENTIC_BIN;
  else process.env.CLI_DEVIN_AGENTIC_BIN = ORIGINAL_DEVIN_BIN;
  if (ORIGINAL_DEVIN_HOME === undefined) delete process.env.DEVIN_AGENTIC_HOME;
  else process.env.DEVIN_AGENTIC_HOME = ORIGINAL_DEVIN_HOME;

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

// Emulated-tool-calling providers expected on a fresh install. Devin is emulated too,
// but its local CLI readiness gate keeps it out until authentication is confirmed.
const AVAILABLE_BROWSER_PROVIDERS = ["cloudflare-playground", "duckduckgo-web"];
// Keyless providers that never opted in — must stay out of every auto/* pool.
const EXCLUDED_NOAUTH_PROVIDERS = [
  "aihorde",
  "auggie",
  "codex-app-server",
  "veoaifree-web",
  "zcode",
];

test("fresh install: the emulated-tool-calling no-auth providers are present in the auto-combo pool", async () => {
  const combo = await virtualFactory.createVirtualAutoCombo(undefined);

  for (const providerId of AVAILABLE_BROWSER_PROVIDERS) {
    const models = combo.models.filter((m: { providerId: string }) => m.providerId === providerId);
    assert.ok(
      models.length >= 1,
      `no-auth provider "${providerId}" (toolCalling: "emulated") must be present in the fresh-install ` +
        `auto-combo pool. Pool providers: ${JSON.stringify([...new Set(combo.models.map((m: { providerId: string }) => m.providerId))])}`
    );
    assert.ok(
      models.every((m: { connectionId: string }) => m.connectionId === "noauth"),
      `all "${providerId}" models must use the synthetic noauth connection`
    );
    assert.ok(
      combo.autoConfig.candidatePool.includes(providerId),
      `"${providerId}" must be in the candidatePool`
    );
  }
});

test("fresh install: no-auth providers without the emulated opt-in are EXCLUDED from the auto-combo pool", async () => {
  const combo = await virtualFactory.createVirtualAutoCombo(undefined);

  for (const providerId of EXCLUDED_NOAUTH_PROVIDERS) {
    const present = combo.models.some((m: { providerId: string }) => m.providerId === providerId);
    assert.equal(
      present,
      false,
      `no-auth provider "${providerId}" must NOT be auto-routed to (it carries no ` +
        `toolCalling: "emulated" opt-in), but it appeared in the pool. ` +
        `Pool: ${JSON.stringify(combo.models.map((m: { model: string }) => m.model))}`
    );
    assert.ok(
      !combo.autoConfig.candidatePool.includes(providerId),
      `"${providerId}" must not be in the candidatePool`
    );
  }
});

test("fresh install: ONLY the emulated-tool-calling providers are synthetic-noauth candidates (no other keyless provider leaks in)", async () => {
  const combo = await virtualFactory.createVirtualAutoCombo(undefined);

  const noauthProviders = [
    ...new Set(
      combo.models
        .filter((m: { connectionId: string }) => m.connectionId === "noauth")
        .map((m: { providerId: string }) => m.providerId)
    ),
  ].sort();
  assert.deepEqual(
    noauthProviders,
    [...AVAILABLE_BROWSER_PROVIDERS].sort(),
    `only the emulated-tool-calling providers may be no-auth (connectionId="noauth") candidates on a ` +
      `fresh install, but found: ${JSON.stringify(noauthProviders)}`
  );
});

// ── devin-cli-agentic: allowlisted, but only once the isolated Devin login is confirmed ──

async function poolProviders(): Promise<string[]> {
  const combo = await virtualFactory.createVirtualAutoCombo(undefined);
  return [...new Set(combo.models.map((m: { providerId: string }) => m.providerId))] as string[];
}

for (const model of ["auto", "auto/best-free", "auto/best-coding", "auto/coding:free"]) {
  test(`#19385 ${model} excludes UncloseAI without a connection`, async () => {
    const combo =
      model === "auto"
        ? await virtualFactory.createVirtualAutoCombo(undefined)
        : await createBuiltinAutoCombo(model, model.slice("auto/".length));
    assert.equal(
      combo.models.some((candidate) => candidate.providerId === "uncloseai"),
      false,
      `${model} exposed UncloseAI's retired anonymous access`
    );
  });
}

test("#19385 browser-backed providers stay out of auto when their runtime is unconfirmed", async () => {
  const providers = AVAILABLE_BROWSER_PROVIDERS;
  noAuthReadiness.__resetNoAuthReadinessForTests();
  try {
    for (const provider of providers) {
      assert.equal((await poolProviders()).includes(provider), false, `${provider} has no probe`);
    }
  } finally {
    await readinessBoot.registerNoAuthAutoRoutingReadiness();
  }
});

test("#19385 auto includes browser-backed providers only when their probes confirm readiness", async () => {
  const providers = AVAILABLE_BROWSER_PROVIDERS;
  try {
    for (const available of [false, true]) {
      for (const provider of providers) {
        noAuthReadiness.registerNoAuthReadiness(provider, () => available);
      }
      const pool = await poolProviders();
      for (const provider of providers) {
        assert.equal(pool.includes(provider), available, `${provider} runtime ready: ${available}`);
      }
    }
  } finally {
    await readinessBoot.registerNoAuthAutoRoutingReadiness();
  }
});

test("#19385 an existing Cloudflare connection still needs a ready browser for auto routing", async () => {
  await providersDb.createProviderConnection({
    provider: "cloudflare-playground",
    authType: "apikey",
    apiKey: "fixture-key",
    name: "Existing Cloudflare connection",
  });
  noAuthReadiness.registerNoAuthReadiness("cloudflare-playground", () => false);
  assert.equal((await poolProviders()).includes("cloudflare-playground"), false);
});

test("#19385 boot registers Cloudflare readiness for the configured Chromium executable", async () => {
  const missingPath = path.join(TEST_DATA_DIR, "missing-chromium");
  const chromiumPath = path.join(TEST_DATA_DIR, "chromium");
  fs.writeFileSync(chromiumPath, "test executable", { mode: 0o700 });
  const original = process.env.CLOUDFLARE_PLAYGROUND_CHROME_PATH;
  const originalGeneric = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
  try {
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH = chromiumPath;
    process.env.CLOUDFLARE_PLAYGROUND_CHROME_PATH = missingPath;
    await readinessBoot.registerNoAuthAutoRoutingReadiness();
    assert.equal((await poolProviders()).includes("cloudflare-playground"), false);

    process.env.CLOUDFLARE_PLAYGROUND_CHROME_PATH = chromiumPath;
    await readinessBoot.registerNoAuthAutoRoutingReadiness();
    assert.equal((await poolProviders()).includes("cloudflare-playground"), true);

    delete process.env.CLOUDFLARE_PLAYGROUND_CHROME_PATH;
    await readinessBoot.registerNoAuthAutoRoutingReadiness();
    const pool = await poolProviders();
    assert.ok(pool.includes("cloudflare-playground"));
    assert.ok(pool.includes("duckduckgo-web"));
  } finally {
    if (original === undefined) delete process.env.CLOUDFLARE_PLAYGROUND_CHROME_PATH;
    else process.env.CLOUDFLARE_PLAYGROUND_CHROME_PATH = original;
    if (originalGeneric === undefined) delete process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
    else process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH = originalGeneric;
    await readinessBoot.registerNoAuthAutoRoutingReadiness();
  }
});

async function primeDevinStatus(): Promise<void> {
  devinStatus.clearDevinAgenticAuthStatusCache();
  devinStatus.peekDevinAgenticAuthStatus();
  await devinStatus.waitForDevinAgenticAuthRefresh();
}

function withFakeDevinCli(output: string): () => void {
  const sandbox = path.join(os.tmpdir(), ".sandbox", "noauth-allowlist-devin");
  fs.mkdirSync(sandbox, { recursive: true });
  const home = fs.mkdtempSync(path.join(sandbox, "home-"));
  const cli = path.join(sandbox, `fake-devin-${process.pid}.sh`);
  fs.writeFileSync(cli, `#!/bin/sh\nprintf '${output}\\n'\n`, { mode: 0o700 });
  const previousBin = process.env.CLI_DEVIN_AGENTIC_BIN;
  process.env.CLI_DEVIN_AGENTIC_BIN = cli;
  process.env.DEVIN_AGENTIC_HOME = home;
  return () => {
    process.env.CLI_DEVIN_AGENTIC_BIN = previousBin;
    delete process.env.DEVIN_AGENTIC_HOME;
    devinStatus.clearDevinAgenticAuthStatusCache();
    fs.rmSync(home, { recursive: true, force: true });
    fs.rmSync(cli, { force: true });
  };
}

test("fresh install without the Devin CLI: devin-cli-agentic is NOT in the auto-combo pool", async () => {
  // Before any probe finished (cold boot) and after a probe found no binary.
  devinStatus.clearDevinAgenticAuthStatusCache();
  assert.ok(!(await poolProviders()).includes("devin-cli-agentic"));
  await primeDevinStatus();
  assert.equal(devinStatus.peekDevinAgenticAuthStatus(), "unavailable");
  assert.ok(!(await poolProviders()).includes("devin-cli-agentic"));
});

test("Devin CLI logged out: devin-cli-agentic stays out of the auto-combo pool", async () => {
  const restore = withFakeDevinCli("Not logged in.");
  try {
    await primeDevinStatus();
    assert.equal(devinStatus.peekDevinAgenticAuthStatus(), "unauthenticated");
    assert.ok(!(await poolProviders()).includes("devin-cli-agentic"));
  } finally {
    restore();
  }
});

test("Devin CLI logged in: devin-cli-agentic joins the auto-combo pool on the noauth connection", async () => {
  const restore = withFakeDevinCli("Logged in (via Devin).");
  try {
    await primeDevinStatus();
    assert.equal(devinStatus.peekDevinAgenticAuthStatus(), "authenticated");
    const combo = await virtualFactory.createVirtualAutoCombo(undefined);
    const models = combo.models.filter(
      (m: { providerId: string }) => m.providerId === "devin-cli-agentic"
    );
    assert.ok(models.length >= 1, "authenticated Devin CLI must contribute auto-combo candidates");
    assert.ok(models.every((m: { connectionId: string }) => m.connectionId === "noauth"));
    assert.ok(combo.autoConfig.candidatePool.includes("devin-cli-agentic"));
  } finally {
    restore();
  }
});

// ── readiness registry: unregistered or failing probes fail closed ──

test("no registered Devin probe: devin-cli-agentic stays out even when the CLI is logged in", async () => {
  const restore = withFakeDevinCli("Logged in (via Devin).");
  try {
    await primeDevinStatus();
    assert.equal(devinStatus.peekDevinAgenticAuthStatus(), "authenticated");
    noAuthReadiness.__resetNoAuthReadinessForTests();
    assert.equal(noAuthReadiness.isNoAuthProviderReadyForAutoRouting("devin-cli-agentic"), false);
    assert.ok(!(await poolProviders()).includes("devin-cli-agentic"));
    // Providers without a readiness requirement are unaffected by the registry.
    assert.equal(noAuthReadiness.isNoAuthProviderReadyForAutoRouting("aihorde"), true);
  } finally {
    await readinessBoot.registerNoAuthAutoRoutingReadiness();
    restore();
  }
});

test("a throwing readiness probe keeps the provider out instead of breaking the pool", async () => {
  noAuthReadiness.registerNoAuthReadiness("devin-cli-agentic", () => {
    throw new Error("probe exploded");
  });
  try {
    const providers = await poolProviders();
    assert.ok(!providers.includes("devin-cli-agentic"));
    for (const allowed of AVAILABLE_BROWSER_PROVIDERS) {
      assert.ok(providers.includes(allowed), `${allowed} must stay in the pool`);
    }
  } finally {
    await readinessBoot.registerNoAuthAutoRoutingReadiness();
  }
});

// #17036 — AUTO_COMBO_KEYLESS_TRANSPORT_GATE (default off): with the flag on, the
// browser-backed and local-CLI keyless transports leave the pool. The gate keys off the
// catalog flags (`browserBacked` / `isLocalCli`), never off an id list.
async function withTransportGate<T>(value: string | undefined, fn: () => Promise<T>): Promise<T> {
  const original = process.env.AUTO_COMBO_KEYLESS_TRANSPORT_GATE;
  if (value === undefined) delete process.env.AUTO_COMBO_KEYLESS_TRANSPORT_GATE;
  else process.env.AUTO_COMBO_KEYLESS_TRANSPORT_GATE = value;
  try {
    return await fn();
  } finally {
    if (original === undefined) delete process.env.AUTO_COMBO_KEYLESS_TRANSPORT_GATE;
    else process.env.AUTO_COMBO_KEYLESS_TRANSPORT_GATE = original;
  }
}

test("transport gate (flag on): every browser-backed / local-CLI keyless transport leaves the pool", async () => {
  const { NOAUTH_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
  const flagged = Object.values(NOAUTH_PROVIDERS).filter(
    (p) =>
      ("browserBacked" in p && p.browserBacked === true) ||
      ("isLocalCli" in p && p.isLocalCli === true)
  );
  assert.ok(flagged.length > 0, "expected at least one transport-gated no-auth catalog entry");
  assert.ok(flagged.some((p) => p.id === "cloudflare-playground"));
  assert.ok(flagged.some((p) => p.id === "duckduckgo-web"));

  const combo = await withTransportGate("true", () =>
    virtualFactory.createVirtualAutoCombo(undefined)
  );
  const poolProviders = new Set(combo.models.map((m: { providerId: string }) => m.providerId));
  for (const entry of flagged) {
    assert.equal(
      poolProviders.has(entry.id),
      false,
      `"${entry.id}" is transport-gated and must not be auto-routed to with the flag on. ` +
        `Pool: ${JSON.stringify([...poolProviders])}`
    );
  }
  assert.ok(!poolProviders.has("uncloseai"), "UncloseAI requires a configured key");
});

test("transport gate (default off): browser-backed providers with a ready runtime stay in the pool", async () => {
  const combo = await withTransportGate(undefined, () =>
    virtualFactory.createVirtualAutoCombo(undefined)
  );
  const poolProviders = new Set(combo.models.map((m: { providerId: string }) => m.providerId));
  for (const providerId of AVAILABLE_BROWSER_PROVIDERS) {
    assert.ok(poolProviders.has(providerId), `"${providerId}" must stay in the default pool`);
  }
});

test("transport gate flag reader is off by default and fails closed", async () => {
  const allowlist = await import("../../open-sse/services/autoCombo/emulatedNoAuthAllowlist.ts");
  await withTransportGate(undefined, async () => {
    assert.equal(allowlist.isKeylessTransportGateEnabled(), false);
  });
  await withTransportGate("true", async () => {
    assert.equal(allowlist.isKeylessTransportGateEnabled(), true);
  });
  const ungated = allowlist.getEmulatedToolCallingNoAuthProviders();
  const gated = allowlist.getEmulatedToolCallingNoAuthProviders({ transportGate: true });
  assert.deepEqual(
    [...allowlist.EMULATED_TOOL_CALLING_NOAUTH_PROVIDERS].sort(),
    [...ungated].sort()
  );
  assert.ok(
    [...gated].every((id) => ungated.has(id)),
    "the gate only ever removes members"
  );
  assert.ok(!gated.has("cloudflare-playground") && ungated.has("cloudflare-playground"));
});
