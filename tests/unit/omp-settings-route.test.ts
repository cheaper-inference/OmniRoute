/**
 * /api/cli-tools/omp-settings — safe YAML writes + omp `modelRoles` assignments.
 *
 * - A models.yml / config.yml that exists but cannot be parsed is refused (409)
 *   and left byte-identical; before, `readModelsYml()` swallowed every error and
 *   the POST rewrote models.yml with only `providers.omniroute`, silently
 *   dropping every other omp provider.
 * - Every write is preceded by a backup (backupService, under DATA_DIR).
 * - `roles` assigns `modelRoles.<role>: omniroute/<model>` in config.yml; unset
 *   and DELETE only remove OmniRoute-owned values.
 *
 * Runs against a throwaway HOME + DATA_DIR — never the real `~/.omp`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { load as yamlLoad } from "js-yaml";
import { SignJWT } from "jose";
import Database from "better-sqlite3";

const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omr-omp-settings-"));
const TEST_HOME = path.join(TEST_ROOT, "home");
const TEST_DATA_DIR = path.join(TEST_ROOT, "data");
fs.mkdirSync(TEST_HOME, { recursive: true });

const originalHomedir = os.homedir;
const savedEnv: Record<string, string | undefined> = {};
const ENV_OVERRIDES: Record<string, string | undefined> = {
  HOME: TEST_HOME,
  USERPROFILE: TEST_HOME,
  LOCALAPPDATA: path.join(TEST_HOME, "AppData", "Local"),
  DATA_DIR: TEST_DATA_DIR,
  API_KEY_SECRET: "omp-settings-api-secret",
  JWT_SECRET: "omp-settings-jwt-secret",
  INITIAL_PASSWORD: undefined,
};
for (const [key, value] of Object.entries(ENV_OVERRIDES)) {
  savedEnv[key] = process.env[key];
  if (value === undefined) delete process.env[key];
  else process.env[key] = value;
}
os.homedir = () => TEST_HOME;

const core = await import("../../src/lib/db/core.ts");
const route = await import("../../src/app/api/cli-tools/omp-settings/route.ts");

const ompDir = () => path.join(TEST_HOME, ".omp", "agent");
const modelsPath = () => path.join(ompDir(), "models.yml");
const configPath = () => path.join(ompDir(), "config.yml");
const backupDir = () => path.join(TEST_DATA_DIR, "backups", "omp");

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
  fs.rmSync(TEST_HOME, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.rmSync(backupDir(), { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(ompDir(), { recursive: true });
  // The omp CLI owns agent.db; simulate it so the credential write succeeds.
  const db = new Database(path.join(ompDir(), "agent.db"));
  db.exec(
    "CREATE TABLE IF NOT EXISTS auth_credentials (provider TEXT NOT NULL, credential_type TEXT NOT NULL, data TEXT, disabled_cause TEXT, identity_key TEXT, created_at INTEGER, updated_at INTEGER)"
  );
  db.close();
});

const authCookie = async (): Promise<string> => {
  const token = await new SignJWT({ authenticated: true, sub: "omp-settings-test" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return `auth_token=${token}`;
};

const request = async (method: string, body?: Record<string, unknown>) =>
  new Request("http://localhost/api/cli-tools/omp-settings", {
    method,
    headers: { cookie: await authCookie(), "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

const post = async (body: Record<string, unknown>) =>
  route.POST(await request("POST", { baseUrl: "http://localhost:20128", ...body }));

type YamlDoc = Record<string, Record<string, Record<string, unknown>>>;
const readYaml = (file: string) => yamlLoad(fs.readFileSync(file, "utf8")) as YamlDoc;

const assertRefused = async (res: Response, fileHint: string) => {
  assert.equal(res.status, 409, `expected 409, got ${res.status}`);
  const body = await res.json();
  assert.equal(body.error?.code, "config_unparseable");
  assert.ok(String(body.error?.message).includes(fileHint), body.error?.message);
  assert.ok(!String(body.error?.message).includes("at /"), "no stack trace in the body");
};

const OTHER_PROVIDERS =
  "# my providers\nproviders:\n  ollama:\n    baseUrl: http://127.0.0.1:11434/v1\n    api: openai-completions\n";

test("POST: unparsable models.yml is refused and left byte-identical", async () => {
  const bytes = `${OTHER_PROVIDERS}  broken: [unclosed\n`;
  fs.writeFileSync(modelsPath(), bytes);

  const res = await post({ apiKey: "sk-omp" });

  await assertRefused(res, "~/.omp/agent/models.yml");
  assert.equal(fs.readFileSync(modelsPath(), "utf8"), bytes);
});

test("POST: models.yml whose `providers` is not a mapping is refused", async () => {
  const bytes = "providers:\n  - ollama\n";
  fs.writeFileSync(modelsPath(), bytes);
  const res = await post({ apiKey: "sk-omp" });
  await assertRefused(res, "models.yml");
  assert.equal(fs.readFileSync(modelsPath(), "utf8"), bytes);
});

test("POST: keeps other providers and backs models.yml up before writing", async () => {
  fs.writeFileSync(modelsPath(), OTHER_PROVIDERS);

  const res = await post({ apiKey: "sk-omp" });

  assert.equal(res.status, 200);
  const models = readYaml(modelsPath());
  assert.equal(models.providers.ollama.baseUrl, "http://127.0.0.1:11434/v1");
  assert.equal(models.providers.omniroute.baseUrl, "http://localhost:20128/v1");
  const backups = fs.readdirSync(backupDir()).filter((f) => !f.endsWith(".meta.json"));
  assert.equal(backups.length, 1);
  assert.match(backups[0], /^models_.*\.yml$/);
  assert.equal(fs.readFileSync(path.join(backupDir(), backups[0]), "utf8"), OTHER_PROVIDERS);
});

test("POST: an empty models.yml is treated as empty, not refused", async () => {
  fs.writeFileSync(modelsPath(), "");
  const res = await post({ apiKey: "sk-omp" });
  assert.equal(res.status, 200);
  assert.ok(readYaml(modelsPath()).providers.omniroute);
});

test("POST roles: assigns omniroute/<model>, keeps foreign and custom roles", async () => {
  fs.writeFileSync(
    configPath(),
    [
      "theme: dark",
      "modelRoles:",
      "  plan: openai/gpt-x",
      "  smol: omniroute/old-fast",
      "  my-custom: anthropic/claude-x",
      "",
    ].join("\n")
  );

  const res = await post({ apiKey: "sk-omp", roles: { default: "kimi/k3", smol: null } });

  assert.equal(res.status, 200);
  const body = await res.json();
  assert.deepEqual(body.modelRoles, { default: "kimi/k3" });
  const config = readYaml(configPath());
  assert.equal(config.theme, "dark");
  assert.deepEqual(config.modelRoles, {
    plan: "openai/gpt-x",
    "my-custom": "anthropic/claude-x",
    default: "omniroute/kimi/k3",
  });
});

test("POST roles: unsetting a role owned by another provider leaves it alone", async () => {
  const bytes = "modelRoles:\n  plan: openai/gpt-x\n";
  fs.writeFileSync(configPath(), bytes);
  const res = await post({ apiKey: "sk-omp", roles: { plan: null, vision: "" } });
  assert.equal(res.status, 200);
  assert.equal(fs.readFileSync(configPath(), "utf8"), bytes, "no-op must not rewrite config.yml");
});

test("POST roles: unparsable config.yml is refused before models.yml is written", async () => {
  const bytes = "modelRoles:\n  plan: [openai/gpt-x\n";
  fs.writeFileSync(configPath(), bytes);

  const res = await post({ apiKey: "sk-omp", roles: { default: "kimi/k3" } });

  await assertRefused(res, "~/.omp/agent/config.yml");
  assert.equal(fs.readFileSync(configPath(), "utf8"), bytes);
  assert.equal(fs.existsSync(modelsPath()), false, "models.yml must not be written either");
});

test("POST roles: an unknown role id or a multi-line model id is a 400", async () => {
  const unknownRole = await post({ roles: { bogus: "kimi/k3" } });
  assert.equal(unknownRole.status, 400);
  const multiline = await post({ roles: { default: "kimi/k3\nevil: true" } });
  assert.equal(multiline.status, 400);
  assert.equal(fs.existsSync(configPath()), false);
});

test("GET: reports OmniRoute-owned roles and tolerates a broken config.yml", async () => {
  fs.writeFileSync(
    configPath(),
    "modelRoles:\n  default: omniroute/kimi/k3\n  plan: openai/gpt-x\n  my-custom: omniroute/z\n"
  );
  // Make the install probe deterministic: a binary under the fake HOME.
  const binPath = path.join(TEST_HOME, ".omp", "bin", "omp");
  fs.mkdirSync(path.dirname(binPath), { recursive: true });
  fs.writeFileSync(binPath, "");
  const res = await route.GET(await request("GET"));
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.installed, true);
  assert.deepEqual(body.config.modelRoles, { default: "kimi/k3" });

  fs.writeFileSync(configPath(), "modelRoles: [\n");
  const broken = await route.GET(await request("GET"));
  assert.equal(broken.status, 200);
});

test("DELETE: removes only OmniRoute-owned role values and the omniroute provider", async () => {
  fs.writeFileSync(
    modelsPath(),
    `${OTHER_PROVIDERS}  omniroute:\n    baseUrl: http://localhost:20128/v1\n`
  );
  fs.writeFileSync(
    configPath(),
    "theme: dark\nmodelRoles:\n  default: omniroute/kimi/k3\n  plan: openai/gpt-x\n  my-custom: omniroute/z\n"
  );

  const res = await route.DELETE(await request("DELETE"));

  assert.equal(res.status, 200);
  const models = readYaml(modelsPath());
  assert.ok(models.providers.ollama);
  assert.equal(models.providers.omniroute, undefined);
  const config = readYaml(configPath());
  assert.equal(config.theme, "dark");
  assert.deepEqual(config.modelRoles, { plan: "openai/gpt-x" });
});

test("DELETE: unparsable models.yml aborts the reset untouched", async () => {
  const bytes = `${OTHER_PROVIDERS}  omniroute: {baseUrl: http://x\n`;
  fs.writeFileSync(modelsPath(), bytes);
  const res = await route.DELETE(await request("DELETE"));
  await assertRefused(res, "models.yml");
  assert.equal(fs.readFileSync(modelsPath(), "utf8"), bytes);
});
