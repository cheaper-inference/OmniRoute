/**
 * Unit tests for src/shared/services/piConfig.ts
 *
 * Exercises the OmniRoute ↔ Pi Coding Agent models.json contract against real
 * temp files under a temp PI_CODING_AGENT_DIR:
 *
 *   - path resolution (default + PI_CODING_AGENT_DIR + tilde expansion)
 *   - apply / read / remove round-trips
 *   - preservation of unrelated providers and root keys
 *   - corrupt/foreign file handling
 *   - v1 base-URL normalisation
 *   - owned vs hand-edited (unowned) provider detection
 *
 * Pi's own schema (ProviderConfigSchema in
 * @earendil-works/pi-coding-agent/dist/core/model-config.js) is TypeBox-compiled
 * without `additionalProperties: false`, which is what lets us carry the
 * `omnirouteManaged` ownership marker.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

const TMP_ROOT = path.join(os.tmpdir(), "omniroute-pi-config-test");
const API_PORT = 20128;

const {
  applyOmniRoutePiProvider,
  ensurePiV1BaseUrl,
  getPiAgentDir,
  getPiModelsPath,
  hasOmniRoutePiProvider,
  hasUnownedOmniRoutePiProvider,
  normalizePiBaseUrl,
  readOmniRoutePiProvider,
  readPiModelsJson,
  removeOmniRoutePiProvider,
} = await import("../../src/shared/services/piConfig.ts");

/** TMP_ROOT is created lazily so a stale /tmp cleanup does not break the suite. */
async function ensureTmpRoot(): Promise<string> {
  await fs.mkdir(TMP_ROOT, { recursive: true });
  return TMP_ROOT;
}

/** Fresh temp agent dir env, optionally pre-seeded with a models.json. */
async function makeEnv(seed?: Record<string, unknown>): Promise<{
  env: NodeJS.ProcessEnv;
  dir: string;
}> {
  await ensureTmpRoot();
  const dir = await fs.mkdtemp(path.join(TMP_ROOT, "pi-"));
  const env: NodeJS.ProcessEnv = { ...process.env, PI_CODING_AGENT_DIR: dir };
  if (seed) {
    await fs.writeFile(path.join(dir, "models.json"), JSON.stringify(seed, null, 2), "utf-8");
  }
  return { env, dir };
}

const SAMPLE_PROVIDERS = {
  providers: {
    "personal-openai": {
      baseUrl: "https://api.openai.com/v1",
      apiKey: "sk-personal",
      models: [{ id: "gpt-test", name: "GPT test" }],
    },
  },
  // Unrelated root keys models.json legitimately carries in pi-gui's writer.
  $schema: "https://example.com/models.schema.json",
};

// ── Path resolution ───────────────────────────────────────────────────────────

test("getPiAgentDir defaults to ~/.pi/agent", () => {
  const env: NodeJS.ProcessEnv = { ...process.env, PI_CODING_AGENT_DIR: "" };
  const expected = path.join(
    typeof env.HOME === "string" && env.HOME ? env.HOME : os.homedir(),
    ".pi",
    "agent"
  );
  assert.equal(getPiAgentDir(env), expected);
  assert.equal(getPiModelsPath(env), path.join(expected, "models.json"));
});

test("getPiAgentDir honours an absolute PI_CODING_AGENT_DIR", () => {
  const env: NodeJS.ProcessEnv = { ...process.env, PI_CODING_AGENT_DIR: "/tmp/pi/agent" };
  assert.equal(getPiAgentDir(env), "/tmp/pi/agent");
});

test("getPiAgentDir expands a leading ~", () => {
  const env: NodeJS.ProcessEnv = { ...process.env, PI_CODING_AGENT_DIR: "~/custom-pi" };
  const home = typeof env.HOME === "string" && env.HOME ? env.HOME : os.homedir();
  assert.equal(getPiAgentDir(env), path.join(home, "custom-pi"));
});

test("getPiAgentDir ignores a relative override but accepts a normalised traversal", () => {
  // Relative values are unsafe (they resolve against the server's cwd).
  const relativeEnv: NodeJS.ProcessEnv = { ...process.env, PI_CODING_AGENT_DIR: "relative/dir" };
  const home = os.homedir();
  assert.equal(getPiAgentDir(relativeEnv), path.join(home, ".pi", "agent"));

  // An absolute path containing `..` is a legitimate absolute path once
  // normalised — this mirrors Pi's own behaviour (it just joins+normalises),
  // so an operator pointing at a sibling directory keeps working.
  const traversalEnv: NodeJS.ProcessEnv = { ...process.env, PI_CODING_AGENT_DIR: "/tmp/../etc" };
  assert.equal(getPiAgentDir(traversalEnv), "/etc");
});

// ── Reading ───────────────────────────────────────────────────────────────────

test("readPiModelsJson returns null config (no error) when the file is absent", async () => {
  const { env } = await makeEnv();
  const { config, error } = await readPiModelsJson(env);
  assert.equal(config, null);
  assert.equal(error, null);
});

test("readPiModelsJson reports invalid JSON instead of treating it as empty", async () => {
  const dir = await fs.mkdtemp(path.join(TMP_ROOT, "pi-"));
  await fs.writeFile(path.join(dir, "models.json"), "{ not valid json ", "utf-8");
  const { config, error } = await readPiModelsJson({ PI_CODING_AGENT_DIR: dir });
  assert.equal(config, null);
  assert.ok(error && error.includes("not valid JSON"), error);
});

test('readPiModelsJson reports a file with no "providers" object', async () => {
  const dir = await fs.mkdtemp(path.join(TMP_ROOT, "pi-"));
  await fs.writeFile(path.join(dir, "models.json"), JSON.stringify({ foo: "bar" }), "utf-8");
  const { config, error } = await readPiModelsJson({ PI_CODING_AGENT_DIR: dir });
  assert.equal(config, null);
  assert.equal(error, 'models.json has no "providers" object');
});

test("readPiModelsJson rejects provider entries Pi cannot load", async () => {
  const dir = await fs.mkdtemp(path.join(TMP_ROOT, "pi-"));
  await fs.writeFile(
    path.join(dir, "models.json"),
    JSON.stringify({ providers: { omniroute: { api: "openai-completions", models: "auto" } } }),
    "utf-8"
  );
  const { config, error } = await readPiModelsJson({ PI_CODING_AGENT_DIR: dir });
  assert.equal(config, null);
  assert.match(error ?? "", /field "models" must be an array/);
});

// ── Apply + read round-trip ───────────────────────────────────────────────────

test("apply creates models.json with the OmniRoute provider when none exists", async () => {
  const { env, dir } = await makeEnv();
  const modelsPath = await applyOmniRoutePiProvider(
    {
      baseUrl: "http://127.0.0.1:20128",
      apiKey: "sk-test",
      model: "auto/best-coding",
      modelName: "OmniRoute best-coding",
    },
    env
  );

  assert.equal(modelsPath, path.join(dir, "models.json"));
  const written = JSON.parse(await fs.readFile(modelsPath, "utf-8"));
  const provider = written.providers.omniroute;

  assert.equal(provider.baseUrl, "http://127.0.0.1:20128/v1");
  assert.equal(provider.api, "openai-completions");
  assert.equal(provider.apiKey, "sk-test");
  assert.equal(provider.omnirouteManaged, true);
  assert.deepEqual(provider.models, [{ id: "auto/best-coding", name: "OmniRoute best-coding" }]);

  const { config } = await readPiModelsJson(env);
  assert.equal(hasOmniRoutePiProvider(config), true);
  assert.equal(hasUnownedOmniRoutePiProvider(config, API_PORT), false);
  if (process.platform !== "win32") {
    assert.equal((await fs.stat(modelsPath)).mode & 0o777, 0o600);
  }
});

test("apply preserves unrelated providers and root keys", async () => {
  const { env } = await makeEnv(SAMPLE_PROVIDERS);
  await applyOmniRoutePiProvider(
    { baseUrl: "http://127.0.0.1:20128", apiKey: "sk-test", model: "auto/best-fast" },
    env
  );

  const { config } = await readPiModelsJson(env);
  assert.ok(config?.providers["personal-openai"], "unrelated provider preserved");
  assert.equal(config?.providers["personal-openai"].apiKey, "sk-personal");
  assert.equal(config?.$schema, SAMPLE_PROVIDERS.$schema, "unrelated root key preserved");
  assert.equal(config?.providers.omniroute.models[0].id, "auto/best-fast");
});

test("apply updates the existing OmniRoute provider in place", async () => {
  const { env } = await makeEnv();
  await applyOmniRoutePiProvider(
    { baseUrl: "http://127.0.0.1:20128", apiKey: "sk-old", model: "auto/best-fast" },
    env
  );
  await applyOmniRoutePiProvider(
    { baseUrl: "http://127.0.0.1:20128", apiKey: "sk-new", model: "auto/best-reasoning" },
    env
  );

  const provider = readOmniRoutePiProvider((await readPiModelsJson(env)).config);
  assert.equal(provider?.apiKey, "sk-new");
  assert.equal(provider?.models[0].id, "auto/best-reasoning");
  assert.equal(provider?.baseUrl, "http://127.0.0.1:20128/v1");
});

test("apply adopts a pre-existing unowned omniroute provider", async () => {
  // The shape pi-gui's "Custom endpoints" writer produces.
  const { env } = await makeEnv({
    providers: {
      omniroute: {
        baseUrl: "http://127.0.0.1:20128/v1",
        api: "openai-completions",
        apiKey: "not-needed",
        piGuiCustomEndpoint: true,
        models: [{ id: "direct-model-combo", name: "direct-model-combo" }],
      },
    },
  });

  const { config: before } = await readPiModelsJson(env);
  assert.equal(hasOmniRoutePiProvider(before), false);
  assert.equal(hasUnownedOmniRoutePiProvider(before, API_PORT), true);

  await applyOmniRoutePiProvider(
    { baseUrl: "http://127.0.0.1:20128", apiKey: "sk-adopted", model: "auto/best-coding" },
    env
  );

  const provider = readOmniRoutePiProvider((await readPiModelsJson(env)).config);
  assert.equal(provider?.apiKey, "sk-adopted");
  assert.equal(provider?.omnirouteManaged, true);
  assert.equal(provider?.models[0].id, "auto/best-coding");
});

// ── Remove ───────────────────────────────────────────────────────────────────

test("remove deletes only the OmniRoute provider and keeps the rest", async () => {
  const { env, dir } = await makeEnv(SAMPLE_PROVIDERS);
  await applyOmniRoutePiProvider(
    { baseUrl: "http://127.0.0.1:20128", apiKey: "sk-test", model: "auto/best-coding" },
    env
  );

  const { removed, modelsPath } = await removeOmniRoutePiProvider(env);
  assert.equal(removed, true);
  assert.equal(modelsPath, path.join(dir, "models.json"));

  const { config } = await readPiModelsJson(env);
  assert.equal(config?.providers.omniroute, undefined);
  assert.ok(config?.providers["personal-openai"], "unrelated provider kept");
  assert.equal(config?.$schema, SAMPLE_PROVIDERS.$schema);
});

test("remove deletes the file when it would be left empty", async () => {
  const { env, dir } = await makeEnv();
  await applyOmniRoutePiProvider(
    { baseUrl: "http://127.0.0.1:20128", apiKey: "sk-test", model: "auto/best-coding" },
    env
  );

  const { removed } = await removeOmniRoutePiProvider(env);
  assert.equal(removed, true);

  await assert.rejects(
    () => fs.access(path.join(dir, "models.json")),
    (err: NodeJS.ErrnoException) => err.code === "ENOENT"
  );
});

test("remove is a no-op when there is nothing OmniRoute owns", async () => {
  const { env } = await makeEnv(SAMPLE_PROVIDERS);
  const { removed } = await removeOmniRoutePiProvider(env);
  assert.equal(removed, false);

  const { config } = await readPiModelsJson(env);
  assert.ok(config?.providers["personal-openai"], "unrelated provider untouched");
});

test("remove refuses to touch a hand-edited omniroute entry it does not own", async () => {
  const { env } = await makeEnv({
    providers: {
      omniroute: {
        baseUrl: "http://127.0.0.1:20128/v1",
        api: "openai-completions",
        apiKey: "not-needed",
        piGuiCustomEndpoint: true,
        models: [{ id: "direct-model-combo" }],
      },
    },
  });

  const { removed } = await removeOmniRoutePiProvider(env);
  assert.equal(removed, false);

  const { config } = await readPiModelsJson(env);
  assert.ok(config?.providers.omniroute, "unowned entry left in place");
});

// ── Detection of foreign providers ────────────────────────────────────────────

test("hasUnownedOmniRoutePiProvider matches a same-port local entry", async () => {
  const { env } = await makeEnv({
    providers: {
      omniroute: { baseUrl: "http://localhost:20128/v1", api: "openai-completions" },
    },
  });
  const { config } = await readPiModelsJson(env);
  assert.equal(hasUnownedOmniRoutePiProvider(config, API_PORT), true);
});

test("hasUnownedOmniRoutePiProvider ignores a remote endpoint on another port", async () => {
  const { env } = await makeEnv({
    providers: {
      omniroute: { baseUrl: "https://api.example.com/v1", api: "openai-completions" },
    },
  });
  const { config } = await readPiModelsJson(env);
  assert.equal(hasUnownedOmniRoutePiProvider(config, API_PORT), false);
});

test("unowned Pi providers on a default HTTP port are not mistaken for OmniRoute", () => {
  const config = {
    providers: {
      omniroute: {
        baseUrl: "http://localhost/v1",
        api: "openai-completions",
        models: [{ id: "auto" }],
      },
    },
  };
  assert.equal(hasUnownedOmniRoutePiProvider(config as never, API_PORT), false);
});

test("hasOmniRoutePiProvider is false when the provider key is absent", async () => {
  const { env } = await makeEnv(SAMPLE_PROVIDERS);
  const { config } = await readPiModelsJson(env);
  assert.equal(hasOmniRoutePiProvider(config), false);
  assert.equal(readOmniRoutePiProvider(config), null);
});

// ── Base-URL normalisation ────────────────────────────────────────────────────

test("ensurePiV1BaseUrl is idempotent and trims trailing slashes", () => {
  assert.equal(ensurePiV1BaseUrl("http://127.0.0.1:20128"), "http://127.0.0.1:20128/v1");
  assert.equal(ensurePiV1BaseUrl("http://127.0.0.1:20128/v1"), "http://127.0.0.1:20128/v1");
  assert.equal(ensurePiV1BaseUrl("http://127.0.0.1:20128/v1/"), "http://127.0.0.1:20128/v1");
  assert.equal(
    ensurePiV1BaseUrl("  https://omniroute.example.com/v1  "),
    "https://omniroute.example.com/v1"
  );
  assert.equal(
    ensurePiV1BaseUrl("https://omniroute.example.com/api"),
    "https://omniroute.example.com/api/v1"
  );
});

test("normalizePiBaseUrl accepts local and remote HTTP endpoints and rejects malformed values", () => {
  assert.equal(normalizePiBaseUrl(" http://localhost:20128/v1/ "), "http://localhost:20128/v1");
  assert.equal(normalizePiBaseUrl("https://omni.example/api"), "https://omni.example/api/v1");
  assert.throws(() => normalizePiBaseUrl("not-a-url"), /absolute HTTP or HTTPS URL/);
  assert.throws(() => normalizePiBaseUrl("ftp://omni.example"), /HTTP or HTTPS URL/);
  assert.throws(
    () => normalizePiBaseUrl("http://user:pass@localhost:20128"),
    /without credentials/
  );
  assert.throws(() => normalizePiBaseUrl("http://localhost:20128?token=x"), /without credentials/);
});

test("apply never double-appends /v1 across repeated calls", async () => {
  const { env } = await makeEnv();
  const opts = {
    baseUrl: "http://127.0.0.1:20128/v1",
    apiKey: "sk-test",
    model: "auto/best-coding",
  };
  await applyOmniRoutePiProvider(opts, env);
  await applyOmniRoutePiProvider(opts, env);
  await applyOmniRoutePiProvider(opts, env);

  const provider = readOmniRoutePiProvider((await readPiModelsJson(env)).config);
  assert.equal(provider?.baseUrl, "http://127.0.0.1:20128/v1");
});

// ── Robustness: invalid env overrides are ignored, not trusted ─────────────

test("apply writes into the default agent dir when PI_CODING_AGENT_DIR is invalid", async () => {
  // A relative override would otherwise resolve against the server's cwd; we
  // fall back to ~/.pi/agent instead and report exactly that path.
  const env: NodeJS.ProcessEnv = { ...process.env, PI_CODING_AGENT_DIR: "relative/dir" };
  const expectedPath = path.join(
    typeof env.HOME === "string" && env.HOME ? env.HOME : os.homedir(),
    ".pi",
    "agent",
    "models.json"
  );

  const modelsPath = getPiModelsPath(env);
  assert.equal(modelsPath, expectedPath);

  // Resolve to a temp HOME copy so the test never touches the real ~/.pi tree.
  const tmpHome = await fs.mkdtemp(path.join(TMP_ROOT, "home-"));
  const safeEnv: NodeJS.ProcessEnv = {
    ...process.env,
    HOME: tmpHome,
    PI_CODING_AGENT_DIR: "relative/dir",
  };
  const writtenPath = await applyOmniRoutePiProvider(
    { baseUrl: "http://127.0.0.1:20128", apiKey: "sk", model: "auto/best-coding" },
    safeEnv
  );
  assert.equal(writtenPath, path.join(tmpHome, ".pi", "agent", "models.json"));
  assert.ok(JSON.parse(await fs.readFile(writtenPath, "utf-8")).providers.omniroute);
});
