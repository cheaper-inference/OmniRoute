/**
 * The Crush and OpenClaw writers put a readable picker label in the model's
 * `name` (registry name, else derived from the id) instead of the raw id. The
 * `id` fields, which the tools read back as model ids, are unchanged.
 * Runs against a throwaway HOME and DATA_DIR.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omr-cli-model-names-"));
const TEST_HOME = path.join(TEST_ROOT, "home");
fs.mkdirSync(TEST_HOME, { recursive: true });

const originalHomedir = os.homedir;
const savedEnv: Record<string, string | undefined> = {};
const ENV_OVERRIDES: Record<string, string | undefined> = {
  HOME: TEST_HOME,
  USERPROFILE: TEST_HOME,
  DATA_DIR: path.join(TEST_ROOT, "data"),
  API_KEY_SECRET: "cli-model-names-api-secret",
  JWT_SECRET: "cli-model-names-jwt-secret",
  CLI_ALLOW_CONFIG_WRITES: "true",
  // Exercise the write path, not the container guard (it answers 422 on devboxes/CI).
  OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE: "1",
  CLI_CONFIG_HOME: undefined,
  XDG_CONFIG_HOME: undefined,
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
const { getCliPrimaryConfigPath } = await import("../../src/shared/services/cliRuntime.ts");
const { cliModelLabel } = await import("../../src/app/api/cli-tools/_lib/modelLabel.ts");
const crushRoute = await import("../../src/app/api/cli-tools/crush-settings/route.ts");
const openclawRoute = await import("../../src/app/api/cli-tools/openclaw-settings/route.ts");

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
  fs.mkdirSync(TEST_HOME, { recursive: true });
});

const post = async (
  handler: (request: Request) => Promise<Response>,
  urlPath: string,
  model: string
) => {
  const token = await new SignJWT({ authenticated: true, sub: "cli-model-names-test" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return handler(
    new Request(`http://localhost${urlPath}`, {
      method: "POST",
      headers: { cookie: `auth_token=${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ baseUrl: "http://localhost:20128", apiKey: "sk-test", model }),
    })
  );
};

test("cliModelLabel prefers the registry name and derives one when there is none", () => {
  assert.equal(cliModelLabel("glm/glm-5.3-flash"), "GLM 5.3 Flash");
  assert.equal(cliModelLabel("ai21/jamba-large-1.7"), "Jamba Large 1.7");
  assert.equal(cliModelLabel("unknown-prefix/claude-opus-5-5-preview"), "Claude Opus 5.5 Preview");
  assert.equal(cliModelLabel("my-daily-combo"), "My Daily Combo");
});

test("crush POST writes a readable name and keeps the model id", async () => {
  const res = await post(crushRoute.POST, "/api/cli-tools/crush-settings", "glm/glm-5.3-flash");
  assert.equal(res.status, 200);
  const configPath =
    getCliPrimaryConfigPath("crush") ?? path.join(TEST_HOME, ".config", "crush", "crush.json");
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const [entry] = config.providers.omniroute.models;
  assert.equal(entry.id, "glm/glm-5.3-flash");
  assert.equal(entry.name, "OmniRoute: GLM 5.3 Flash");
  assert.equal(typeof entry.context_window, "number");
});

test("openclaw POST writes a readable name and keeps the model id and primary model", async () => {
  const res = await post(
    openclawRoute.POST,
    "/api/cli-tools/openclaw-settings",
    "ai21/jamba-large-1.7"
  );
  assert.equal(res.status, 200);
  const configPath = getCliPrimaryConfigPath("openclaw") as string;
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  assert.equal(config.agents.defaults.model.primary, "omniroute/ai21/jamba-large-1.7");
  assert.deepEqual(config.models.providers.omniroute.models, [
    { id: "ai21/jamba-large-1.7", name: "Jamba Large 1.7" },
  ]);
});
