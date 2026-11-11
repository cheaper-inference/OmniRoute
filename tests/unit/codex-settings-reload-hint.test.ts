import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

// Hermetic: temp HOME for the route and a fake `codex` script (CLI_CODEX_BIN). Same setup as
// codex-settings-model-catalog.test.ts; the real ~/.codex is never touched.
const TEST_ROOT = path.join(os.tmpdir(), `omniroute-codex-reload-${process.pid}-${Date.now()}`);
const TEST_HOME = path.join(TEST_ROOT, "home");
const BIN_DIR = path.join(TEST_ROOT, "bin");
const CODEX_DIR = path.join(TEST_HOME, ".codex");
const BUNDLED_PATH = path.join(TEST_ROOT, "bundled.json");
const FAKE_CODEX_OK = path.join(BIN_DIR, "codex-ok");
const FLAG = "OMNIROUTE_CODEX_RELOAD_HINT";

const saved = {
  homedir: os.homedir,
  HOME: process.env.HOME,
  JWT_SECRET: process.env.JWT_SECRET,
  CLI_ALLOW_CONFIG_WRITES: process.env.CLI_ALLOW_CONFIG_WRITES,
  CLI_CODEX_BIN: process.env.CLI_CODEX_BIN,
  FLAG: process.env[FLAG],
};

os.homedir = () => TEST_HOME;
process.env.HOME = TEST_HOME;
process.env.CLI_ALLOW_CONFIG_WRITES = "true";

await fs.mkdir(BIN_DIR, { recursive: true });
await fs.writeFile(
  BUNDLED_PATH,
  JSON.stringify({
    models: [
      {
        slug: "gpt-5.5",
        display_name: "GPT-5.5",
        supported_reasoning_levels: [],
        support_verbosity: true,
        shell_type: "unified_exec",
        truncation_policy: { mode: "tokens", limit: 10000 },
        priority: 3,
        visibility: "list",
        supported_in_api: true,
        experimental_supported_tools: [],
        base_instructions: "bundled prompt",
        upgrade: null,
      },
    ],
  })
);
await fs.writeFile(
  FAKE_CODEX_OK,
  `#!/bin/sh\n[ "$1 $2 $3" = "debug models --bundled" ] || exit 2\ncat '${BUNDLED_PATH}'\n`,
  { mode: 0o755 }
);

const route = await import("../../src/app/api/cli-tools/codex-settings/route.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const post = async (body: Record<string, unknown>) => {
  process.env.JWT_SECRET = "codex-reload-hint-test-secret";
  const token = await new SignJWT({ authenticated: true, sub: "codex-reload-hint-test" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return route.POST(
    new Request("http://localhost/api/cli-tools/codex-settings", {
      method: "POST",
      headers: { cookie: `auth_token=${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        baseUrl: "http://localhost:20128/v1",
        apiKey: "sk-test-only",
        model: "cx/gpt-5.5",
        ...body,
      }),
    })
  );
};

test.beforeEach(async () => {
  await fs.rm(CODEX_DIR, { recursive: true, force: true });
  process.env.CLI_CODEX_BIN = FAKE_CODEX_OK;
  delete process.env[FLAG];
});

test.after(async () => {
  resetDbInstance();
  os.homedir = saved.homedir;
  for (const key of ["HOME", "JWT_SECRET", "CLI_ALLOW_CONFIG_WRITES", "CLI_CODEX_BIN"] as const) {
    if (saved[key] === undefined) delete process.env[key];
    else process.env[key] = saved[key];
  }
  if (saved.FLAG === undefined) delete process.env[FLAG];
  else process.env[FLAG] = saved.FLAG;
  await fs.rm(TEST_ROOT, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("default: a catalog Apply returns no reload hint", async () => {
  const body = await (await post({ modelCatalog: true })).json();
  assert.equal(body.success, true);
  assert.ok(body.catalogPath);
  assert.equal(body.reloadNeeded, undefined);
  assert.equal(body.reloadHint, undefined);
});

test("flag on: a catalog Apply says a Codex reload is needed, with manual guidance", async () => {
  process.env[FLAG] = "1";
  const body = await (await post({ modelCatalog: true })).json();
  assert.equal(body.success, true);
  assert.equal(body.reloadNeeded, true);
  assert.equal(typeof body.reloadHint, "string");
  assert.match(body.reloadHint, /restart|reload/i);
});

test("flag on: no catalog written means no reload hint", async () => {
  process.env[FLAG] = "1";
  const body = await (await post({})).json();
  assert.equal(body.success, true);
  assert.equal(body.catalogPath, undefined);
  assert.equal(body.reloadNeeded, undefined);
});

test("flag on: a failed catalog (warning only) means no reload hint", async () => {
  process.env[FLAG] = "1";
  const broken = path.join(BIN_DIR, "codex-broken");
  await fs.writeFile(broken, "#!/bin/sh\nexit 1\n", { mode: 0o755 });
  process.env.CLI_CODEX_BIN = broken;
  const body = await (await post({ modelCatalog: true })).json();
  assert.equal(body.success, true);
  assert.equal(typeof body.catalogWarning, "string");
  assert.equal(body.reloadNeeded, undefined);
});
