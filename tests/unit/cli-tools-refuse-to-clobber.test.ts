/**
 * CLI-tool settings writers must never mistake an unreadable config file for an
 * empty one.
 *
 * The writers used to do `let data = {}; try { data = parse(read()) } catch {}`,
 * merge a few keys and write the result back — so a malformed file (or one with
 * an unexpected shape) was replaced by OmniRoute's keys alone and the route still
 * answered `success: true`. For `~/.codex/auth.json` that drops the ChatGPT OAuth
 * tokens; for `config.toml`, every provider and MCP server.
 *
 * Only ENOENT means "start fresh". Everything here runs against a throwaway HOME
 * and DATA_DIR — never the real `~/.codex`, `~/.claude`, `~/.omniroute`, etc.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omr-cli-no-clobber-"));
const TEST_HOME = path.join(TEST_ROOT, "home");
fs.mkdirSync(TEST_HOME, { recursive: true });

const originalHomedir = os.homedir;
const savedEnv: Record<string, string | undefined> = {};
const ENV_OVERRIDES: Record<string, string | undefined> = {
  HOME: TEST_HOME,
  USERPROFILE: TEST_HOME,
  DATA_DIR: path.join(TEST_ROOT, "data"),
  API_KEY_SECRET: "cli-no-clobber-api-secret",
  JWT_SECRET: "cli-no-clobber-jwt-secret",
  CLI_ALLOW_CONFIG_WRITES: "true",
  // These tests exercise the merge/write path, not the container guard — keep
  // them hermetic on container devboxes/CI runners (guard answers 422 there).
  OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE: "1",
  CLI_CONFIG_HOME: undefined,
  XDG_CONFIG_HOME: undefined,
  CODEX_HOME: undefined,
  HERMES_HOME: undefined,
  APPDATA: undefined,
  INITIAL_PASSWORD: undefined,
};
for (const [key, value] of Object.entries(ENV_OVERRIDES)) {
  savedEnv[key] = process.env[key];
  if (value === undefined) delete process.env[key];
  else process.env[key] = value;
}
os.homedir = () => TEST_HOME;

const core = await import("../../src/lib/db/core.ts");
const helper = await import("../../src/app/api/cli-tools/_lib/readExistingConfig.ts");
const { getCliPrimaryConfigPath } = await import("../../src/shared/services/cliRuntime.ts");
const codexRoute = await import("../../src/app/api/cli-tools/codex-settings/route.ts");
const kiloRoute = await import("../../src/app/api/cli-tools/kilo-settings/route.ts");
const clineRoute = await import("../../src/app/api/cli-tools/cline-settings/route.ts");
const lettaRoute = await import("../../src/app/api/cli-tools/letta-settings/route.ts");
const smeltRoute = await import("../../src/app/api/cli-tools/smelt-settings/route.ts");
const piRoute = await import("../../src/app/api/cli-tools/pi-settings/route.ts");
const crushRoute = await import("../../src/app/api/cli-tools/crush-settings/route.ts");
const openclawRoute = await import("../../src/app/api/cli-tools/openclaw-settings/route.ts");
const droidRoute = await import("../../src/app/api/cli-tools/droid-settings/route.ts");
const guideRoute = await import("../../src/app/api/cli-tools/guide-settings/[toolId]/route.ts");

test.after(() => {
  core.resetDbInstance();
  os.homedir = originalHomedir;
  for (const [key, value] of Object.entries(savedEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  fs.rmSync(TEST_ROOT, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.beforeEach(() => {
  // Each test starts from an empty fake HOME.
  fs.rmSync(TEST_HOME, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_HOME, { recursive: true });
});

const authCookie = async (): Promise<string> => {
  const token = await new SignJWT({ authenticated: true, sub: "cli-no-clobber-test" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return `auth_token=${token}`;
};

type Handler = (request: Request, ctx?: unknown) => Promise<Response>;

const call = async (
  handler: Handler,
  urlPath: string,
  method: string,
  body?: Record<string, unknown>,
  ctx?: unknown
) =>
  handler(
    new Request(`http://localhost${urlPath}`, {
      method,
      headers: { cookie: await authCookie(), "Content-Type": "application/json" },
      ...(body ? { body: JSON.stringify(body) } : {}),
    }),
    ctx
  );

const MODEL_BODY = {
  baseUrl: "http://localhost:20128",
  apiKey: "sk-test-no-clobber",
  model: "gpt-5.6-sol",
};

const writeFixture = (filePath: string, content: string) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
};

/** A refusal: 409, the documented error code, the file named, no stack trace. */
const assertRefused = async (res: Response, fileHint: string) => {
  assert.equal(res.status, 409, `expected 409, got ${res.status}`);
  const body = await res.json();
  assert.equal(body.error?.code, "config_unparseable");
  assert.match(body.error?.message ?? "", /refusing to overwrite it/);
  assert.ok(
    String(body.error?.message).includes(fileHint),
    `message should name ${fileHint}: ${body.error?.message}`
  );
  assert.ok(!String(body.error?.message).includes("at /"), "no stack trace in the body");
  assert.ok(!String(body.error?.message).includes(TEST_ROOT), "no absolute path in the body");
};

// ── readExistingConfig helper ────────────────────────────────────────────────

test("readExistingConfig: returns null when the file does not exist", async () => {
  const result = await helper.readExistingConfig(
    path.join(TEST_HOME, "absent.json"),
    helper.parseJsonObject
  );
  assert.equal(result, null);
});

test("readExistingConfig: returns the parsed contents of a valid file", async () => {
  const file = path.join(TEST_HOME, "valid.json");
  writeFixture(file, JSON.stringify({ keep: "me" }));
  assert.deepEqual(await helper.readExistingConfig(file, helper.parseJsonObject), {
    keep: "me",
  });
});

test("readExistingConfig: refuses a malformed file and names it home-relative", async () => {
  const file = path.join(TEST_HOME, ".codex", "auth.json");
  writeFixture(file, '{"tokens": {"access_token": "ey');
  await assert.rejects(
    helper.readExistingConfig(file, helper.parseJsonObject),
    (error: unknown) => {
      assert.ok(error instanceof helper.ConfigClobberRefusedError);
      assert.equal(error.filePath, file);
      assert.match(error.message, /^~\/\.codex\/auth\.json exists but could not be parsed/);
      return true;
    }
  );
});

test("readExistingConfig: re-throws read errors other than ENOENT (EISDIR)", async () => {
  const dir = path.join(TEST_HOME, "config-as-dir.json");
  fs.mkdirSync(dir, { recursive: true });
  await assert.rejects(
    helper.readExistingConfig(dir, helper.parseJsonObject),
    (error: NodeJS.ErrnoException) => {
      assert.ok(!(error instanceof helper.ConfigClobberRefusedError));
      assert.equal(error.code, "EISDIR");
      return true;
    }
  );
});

test("parsers: refuse wrong top-level shapes instead of resetting them", () => {
  assert.throws(() => helper.parseJsonObject("[1, 2]"), TypeError);
  assert.throws(() => helper.parseJsonObject("null"), TypeError);
  assert.deepEqual(helper.parseJsoncObject('{"a": [1, 2,], "b": 1,}'), { a: [1, 2], b: 1 });
  assert.deepEqual(helper.parseYamlObject(""), {});
  assert.deepEqual(helper.parseYamlObject("# only a comment\n\n"), {});
  assert.deepEqual(helper.parseYamlObject("a: 1\n"), { a: 1 });
  assert.throws(() => helper.parseYamlObject("just a string"), TypeError);
  assert.throws(() => helper.parseYamlObject("- a\n- b\n"), TypeError);
});

test("configClobberRefusalResponse: null for unrelated errors", () => {
  assert.equal(helper.configClobberRefusalResponse(new Error("boom")), null);
  assert.equal(helper.configClobberRefusalResponse("nope"), null);
});

// ── codex-settings ───────────────────────────────────────────────────────────

const codexDir = () => path.join(TEST_HOME, ".codex");

test("codex POST: malformed auth.json is refused and neither file is touched", async () => {
  const authPath = path.join(codexDir(), "auth.json");
  const configPath = path.join(codexDir(), "config.toml");
  const authBytes = '{"OPENAI_API_KEY": null, "tokens": {"refresh_token": "rt-keep';
  const configBytes = 'model = "o3"\n\n[mcp_servers.docs]\ncommand = "docs-mcp"\n';
  writeFixture(authPath, authBytes);
  writeFixture(configPath, configBytes);

  const res = await call(codexRoute.POST, "/api/cli-tools/codex-settings", "POST", MODEL_BODY);

  await assertRefused(res, "~/.codex/auth.json");
  assert.equal(fs.readFileSync(authPath, "utf8"), authBytes);
  assert.equal(fs.readFileSync(configPath, "utf8"), configBytes, "config.toml written before");
});

test("codex POST: malformed config.toml is refused and left byte-identical", async () => {
  const configPath = path.join(codexDir(), "config.toml");
  const configBytes = 'model = "o3"\n[model_providers.mine\nbase_url = "http://x"\n';
  writeFixture(configPath, configBytes);

  const res = await call(codexRoute.POST, "/api/cli-tools/codex-settings", "POST", MODEL_BODY);

  await assertRefused(res, "~/.codex/config.toml");
  assert.equal(fs.readFileSync(configPath, "utf8"), configBytes);
  assert.equal(fs.existsSync(path.join(codexDir(), "auth.json")), false);
});

test("codex POST: fresh HOME still creates both files", async () => {
  const res = await call(codexRoute.POST, "/api/cli-tools/codex-settings", "POST", MODEL_BODY);
  assert.equal(res.status, 200);
  const auth = JSON.parse(fs.readFileSync(path.join(codexDir(), "auth.json"), "utf8"));
  assert.equal(auth.OPENAI_API_KEY, "sk-test-no-clobber");
  assert.match(fs.readFileSync(path.join(codexDir(), "config.toml"), "utf8"), /omniroute/);
});

test("codex POST: a valid auth.json keeps its other keys", async () => {
  const authPath = path.join(codexDir(), "auth.json");
  writeFixture(authPath, JSON.stringify({ tokens: { refresh_token: "rt-keep" } }));
  const res = await call(codexRoute.POST, "/api/cli-tools/codex-settings", "POST", MODEL_BODY);
  assert.equal(res.status, 200);
  const auth = JSON.parse(fs.readFileSync(authPath, "utf8"));
  assert.equal(auth.tokens.refresh_token, "rt-keep");
  assert.equal(auth.OPENAI_API_KEY, "sk-test-no-clobber");
});

// ── kilo-settings ────────────────────────────────────────────────────────────

test("kilo POST: malformed auth.json is refused and unchanged", async () => {
  const authPath = path.join(TEST_HOME, ".local", "share", "kilo", "auth.json");
  const bytes = '{"anthropic": {"type": "oauth", "refresh": "keep"';
  writeFixture(authPath, bytes);
  const res = await call(kiloRoute.POST, "/api/cli-tools/kilo-settings", "POST", MODEL_BODY);
  await assertRefused(res, "auth.json");
  assert.equal(fs.readFileSync(authPath, "utf8"), bytes);
});

test("kilo POST: trailing-comma auth.json is not a false refusal", async () => {
  const authPath = path.join(TEST_HOME, ".local", "share", "kilo", "auth.json");
  writeFixture(authPath, '{"anthropic": {"type": "oauth", "refresh": "keep",},}');
  const res = await call(kiloRoute.POST, "/api/cli-tools/kilo-settings", "POST", MODEL_BODY);
  assert.equal(res.status, 200);
  const auth = JSON.parse(fs.readFileSync(authPath, "utf8"));
  assert.equal(auth.anthropic.refresh, "keep");
  assert.ok(auth["openai-compatible"]);
});

test("kilo POST: a commented VS Code settings.json is skipped, not replaced", async () => {
  const vscodePath = path.join(TEST_HOME, ".config", "Code", "User", "settings.json");
  const bytes = '{\n  // my font\n  "editor.fontSize": 15\n}\n';
  writeFixture(vscodePath, bytes);
  const res = await call(kiloRoute.POST, "/api/cli-tools/kilo-settings", "POST", MODEL_BODY);
  assert.equal(res.status, 200, "the CLI auth write still succeeds");
  assert.equal(fs.readFileSync(vscodePath, "utf8"), bytes);
});

// ── cline-settings ───────────────────────────────────────────────────────────

test("cline POST: malformed secrets.json is refused before globalState is written", async () => {
  const dataDir = path.join(TEST_HOME, ".cline", "data");
  const statePath = path.join(dataDir, "globalState.json");
  const secretsPath = path.join(dataDir, "secrets.json");
  const stateBytes = JSON.stringify({ actModeApiProvider: "anthropic" });
  const secretsBytes = '{"anthropicApiKey": "sk-ant-keep"';
  writeFixture(statePath, stateBytes);
  writeFixture(secretsPath, secretsBytes);

  const res = await call(clineRoute.POST, "/api/cli-tools/cline-settings", "POST", MODEL_BODY);

  await assertRefused(res, "secrets.json");
  assert.equal(fs.readFileSync(statePath, "utf8"), stateBytes);
  assert.equal(fs.readFileSync(secretsPath, "utf8"), secretsBytes);
});

test("cline DELETE: malformed secrets.json aborts the reset", async () => {
  const dataDir = path.join(TEST_HOME, ".cline", "data");
  const statePath = path.join(dataDir, "globalState.json");
  const secretsPath = path.join(dataDir, "secrets.json");
  const stateBytes = JSON.stringify({ actModeApiProvider: "openai", openAiModelId: "m" });
  const secretsBytes = '{"anthropicApiKey": "sk-ant-keep"';
  writeFixture(statePath, stateBytes);
  writeFixture(secretsPath, secretsBytes);

  const res = await call(clineRoute.DELETE, "/api/cli-tools/cline-settings", "DELETE");

  await assertRefused(res, "secrets.json");
  assert.equal(fs.readFileSync(statePath, "utf8"), stateBytes);
  assert.equal(fs.readFileSync(secretsPath, "utf8"), secretsBytes);
});

// ── letta-settings ───────────────────────────────────────────────────────────

test("letta POST: malformed settings.json is refused and auth.json untouched", async () => {
  const settingsPath = path.join(TEST_HOME, ".letta", "settings.json");
  const authPath = path.join(TEST_HOME, ".letta", "lc-local-backend", "providers", "auth.json");
  const settingsBytes = '{"preferredBackendMode": "cloud", "theme": ';
  const authBytes = JSON.stringify({ version: 1, providers: { openai: { key: "keep" } } });
  writeFixture(settingsPath, settingsBytes);
  writeFixture(authPath, authBytes);

  const res = await call(lettaRoute.POST, "/api/cli-tools/letta-settings", "POST", MODEL_BODY);

  await assertRefused(res, "settings.json");
  assert.equal(fs.readFileSync(settingsPath, "utf8"), settingsBytes);
  assert.equal(fs.readFileSync(authPath, "utf8"), authBytes);
});

test("letta POST: malformed provider auth.json is refused and unchanged", async () => {
  const authPath = path.join(TEST_HOME, ".letta", "lc-local-backend", "providers", "auth.json");
  const bytes = '{"version": 1, "providers": {"openai": {"key": "keep"}';
  writeFixture(authPath, bytes);
  const res = await call(lettaRoute.POST, "/api/cli-tools/letta-settings", "POST", MODEL_BODY);
  await assertRefused(res, "auth.json");
  assert.equal(fs.readFileSync(authPath, "utf8"), bytes);
});

// ── single-file JSON writers ─────────────────────────────────────────────────

const singleFileCases: Array<{
  name: string;
  route: { POST: Handler };
  urlPath: string;
  resolve: () => string;
  body?: Record<string, unknown>;
  bad: string;
}> = [
  {
    name: "smelt",
    route: smeltRoute,
    urlPath: "/api/cli-tools/smelt-settings",
    resolve: () =>
      getCliPrimaryConfigPath("smelt") ?? path.join(TEST_HOME, ".smelt", "config.json"),
    bad: '{"theme": "dark"',
  },
  {
    name: "pi",
    route: piRoute,
    urlPath: "/api/cli-tools/pi-settings",
    resolve: () => getCliPrimaryConfigPath("pi") ?? path.join(TEST_HOME, ".pi", "config.json"),
    bad: '{"theme": "dark"',
  },
  {
    name: "crush (malformed)",
    route: crushRoute,
    urlPath: "/api/cli-tools/crush-settings",
    resolve: () =>
      getCliPrimaryConfigPath("crush") ?? path.join(TEST_HOME, ".config", "crush", "crush.json"),
    bad: '{"providers": {"mine": {}}',
  },
  {
    name: "crush (providers is an array)",
    route: crushRoute,
    urlPath: "/api/cli-tools/crush-settings",
    resolve: () =>
      getCliPrimaryConfigPath("crush") ?? path.join(TEST_HOME, ".config", "crush", "crush.json"),
    bad: '{"providers": [{"id": "mine"}]}',
  },
  {
    name: "openclaw",
    route: openclawRoute,
    urlPath: "/api/cli-tools/openclaw-settings",
    resolve: () => getCliPrimaryConfigPath("openclaw") as string,
    bad: '{"agents": {"defaults": {}}, "channels": ',
  },
  {
    name: "droid (customModels is not an array)",
    route: droidRoute,
    urlPath: "/api/cli-tools/droid-settings",
    resolve: () => getCliPrimaryConfigPath("droid") as string,
    body: { ...MODEL_BODY, models: ["gpt-5.6-sol"] },
    bad: '{"customModels": {"mine": {"model": "x"}}}',
  },
];

for (const tc of singleFileCases) {
  test(`${tc.name} POST: unparsable config is refused and left byte-identical`, async () => {
    const configPath = tc.resolve();
    assert.ok(configPath.startsWith(TEST_HOME), `config path must live in the fake HOME`);
    writeFixture(configPath, tc.bad);
    const res = await call(tc.route.POST, tc.urlPath, "POST", tc.body ?? MODEL_BODY);
    await assertRefused(res, path.basename(configPath));
    assert.equal(fs.readFileSync(configPath, "utf8"), tc.bad);
  });
}

test("smelt POST: a valid config keeps its other keys", async () => {
  const configPath =
    getCliPrimaryConfigPath("smelt") ?? path.join(TEST_HOME, ".smelt", "config.json");
  writeFixture(configPath, JSON.stringify({ theme: "dark" }));
  const res = await call(smeltRoute.POST, "/api/cli-tools/smelt-settings", "POST", MODEL_BODY);
  assert.equal(res.status, 200);
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  assert.equal(config.theme, "dark");
  assert.equal(config._managedBy, "omniroute");
});

// ── guide-settings (continue JSON + hermes YAML) ─────────────────────────────

const guideCtx = (toolId: string) => ({ params: Promise.resolve({ toolId }) });

test("guide-settings continue: malformed config.json is refused and unchanged", async () => {
  const configPath = path.join(TEST_HOME, ".continue", "config.json");
  const bytes = '{"models": [{"title": "mine"}]';
  writeFixture(configPath, bytes);
  const res = await call(
    guideRoute.POST,
    "/api/cli-tools/guide-settings/continue",
    "POST",
    MODEL_BODY,
    guideCtx("continue")
  );
  await assertRefused(res, "~/.continue/config.json");
  assert.equal(fs.readFileSync(configPath, "utf8"), bytes);
});

test("guide-settings continue: a non-array `models` is refused, not reset", async () => {
  const configPath = path.join(TEST_HOME, ".continue", "config.json");
  const bytes = JSON.stringify({ models: { mine: { title: "mine" } } });
  writeFixture(configPath, bytes);
  const res = await call(
    guideRoute.POST,
    "/api/cli-tools/guide-settings/continue",
    "POST",
    MODEL_BODY,
    guideCtx("continue")
  );
  await assertRefused(res, "config.json");
  assert.equal(fs.readFileSync(configPath, "utf8"), bytes);
});

test("guide-settings hermes: non-mapping YAML is refused, not reset", async () => {
  const configPath =
    getCliPrimaryConfigPath("hermes") || path.join(TEST_HOME, ".hermes", "config.yaml");
  assert.ok(configPath.startsWith(TEST_HOME), "hermes config must live in the fake HOME");
  const bytes = "- providers\n- toolsets\n";
  writeFixture(configPath, bytes);
  const res = await call(
    guideRoute.POST,
    "/api/cli-tools/guide-settings/hermes",
    "POST",
    MODEL_BODY,
    guideCtx("hermes")
  );
  await assertRefused(res, path.basename(configPath));
  assert.equal(fs.readFileSync(configPath, "utf8"), bytes);
});

test("guide-settings hermes: malformed YAML is refused and unchanged", async () => {
  const configPath =
    getCliPrimaryConfigPath("hermes") || path.join(TEST_HOME, ".hermes", "config.yaml");
  assert.ok(configPath.startsWith(TEST_HOME), "hermes config must live in the fake HOME");
  const bytes = "providers:\n  mine: {base_url: http://x\n";
  writeFixture(configPath, bytes);
  const res = await call(
    guideRoute.POST,
    "/api/cli-tools/guide-settings/hermes",
    "POST",
    MODEL_BODY,
    guideCtx("hermes")
  );
  await assertRefused(res, path.basename(configPath));
  assert.equal(fs.readFileSync(configPath, "utf8"), bytes);
});
