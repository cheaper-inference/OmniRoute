import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

// Hermetic: a temp HOME for the route AND for the spawned fake `codex`, which is a shell
// script selected through CLI_CODEX_BIN. The real ~/.codex is never read or written.
const TEST_ROOT = path.join(os.tmpdir(), `omniroute-codex-catalog-${process.pid}-${Date.now()}`);
const TEST_HOME = path.join(TEST_ROOT, "home");
const BIN_DIR = path.join(TEST_ROOT, "bin");
const CODEX_DIR = path.join(TEST_HOME, ".codex");
const CONFIG_PATH = path.join(CODEX_DIR, "config.toml");
const CATALOG_PATH = path.join(CODEX_DIR, "omniroute-models.json");
const BUNDLED_PATH = path.join(TEST_ROOT, "bundled.json");
const SEEN_CODEX_HOME = path.join(TEST_ROOT, "seen-codex-home.txt");
const FAKE_CODEX_OK = path.join(BIN_DIR, "codex-ok");
const FAKE_CODEX_BROKEN = path.join(BIN_DIR, "codex-broken");

const saved = {
  homedir: os.homedir,
  HOME: process.env.HOME,
  JWT_SECRET: process.env.JWT_SECRET,
  CLI_ALLOW_CONFIG_WRITES: process.env.CLI_ALLOW_CONFIG_WRITES,
  CLI_CODEX_BIN: process.env.CLI_CODEX_BIN,
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
  `#!/bin/sh\nprintf '%s' "$CODEX_HOME" > '${SEEN_CODEX_HOME}'\n[ "$1 $2 $3" = "debug models --bundled" ] || exit 2\ncat '${BUNDLED_PATH}'\n`,
  { mode: 0o755 }
);
await fs.writeFile(FAKE_CODEX_BROKEN, "#!/bin/sh\necho 'unknown subcommand' >&2\nexit 1\n", {
  mode: 0o755,
});

const route = await import("../../src/app/api/cli-tools/codex-settings/route.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const authCookie = async (): Promise<string> => {
  process.env.JWT_SECRET = "codex-model-catalog-test-secret";
  const token = await new SignJWT({ authenticated: true, sub: "codex-model-catalog-test" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return `auth_token=${token}`;
};

const post = async (body: Record<string, unknown>) =>
  route.POST(
    new Request("http://localhost/api/cli-tools/codex-settings", {
      method: "POST",
      headers: { cookie: await authCookie(), "Content-Type": "application/json" },
      body: JSON.stringify({
        baseUrl: "http://localhost:20128/v1",
        apiKey: "sk-test-only",
        model: "cx/gpt-5.5",
        ...body,
      }),
    })
  );

const reset = async () =>
  route.DELETE(
    new Request("http://localhost/api/cli-tools/codex-settings", {
      method: "DELETE",
      headers: { cookie: await authCookie() },
    })
  );

const exists = async (filePath: string) =>
  fs.access(filePath).then(
    () => true,
    () => false
  );

const freshCodexDir = async () => {
  await fs.rm(CODEX_DIR, { recursive: true, force: true });
  await fs.rm(SEEN_CODEX_HOME, { force: true });
};

test.after(async () => {
  resetDbInstance();
  os.homedir = saved.homedir;
  for (const key of ["HOME", "JWT_SECRET", "CLI_ALLOW_CONFIG_WRITES", "CLI_CODEX_BIN"] as const) {
    if (saved[key] === undefined) delete process.env[key];
    else process.env[key] = saved[key];
  }
  await fs.rm(TEST_ROOT, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("POST with modelCatalog writes an OmniRoute catalog and points Codex at it", async () => {
  await freshCodexDir();
  process.env.CLI_CODEX_BIN = FAKE_CODEX_OK;

  const response = await post({
    modelCatalog: true,
    modelMappings: { "gpt-5.6-sol": "kr/claude-sonnet" },
  });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.success, true);
  assert.equal(body.catalogPath, CATALOG_PATH);
  assert.equal(body.catalogWarning, undefined);
  assert.ok(body.catalogModelCount >= 2);

  const config = await fs.readFile(CONFIG_PATH, "utf8");
  assert.match(config, new RegExp(`^model_catalog_json = "${CATALOG_PATH}"$`, "m"));
  assert.match(config, /^model = "cx\/gpt-5\.5"$/m);

  // The child ran against the same Codex home OmniRoute writes into
  assert.equal(await fs.readFile(SEEN_CODEX_HOME, "utf8"), CODEX_DIR);

  const catalog = JSON.parse(await fs.readFile(CATALOG_PATH, "utf8"));
  const listedSlugs = catalog.models
    .filter((m: { visibility: string }) => m.visibility === "list")
    .map((m: { slug: string }) => m.slug);
  // The models picked in this Apply lead the picker
  assert.deepEqual(listedSlugs.slice(0, 2), ["cx/gpt-5.5", "kr/claude-sonnet"]);
  const bundledCopy = catalog.models.find((m: { slug: string }) => m.slug === "gpt-5.5");
  assert.equal(bundledCopy.visibility, "hide");
  // The API key never lands in the catalog
  assert.ok(!JSON.stringify(catalog).includes("sk-test-only"));
});

test("POST without modelCatalog leaves Codex's catalog untouched", async () => {
  await freshCodexDir();
  process.env.CLI_CODEX_BIN = FAKE_CODEX_OK;

  const response = await post({});
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.catalogPath, undefined);
  assert.equal(body.catalogWarning, undefined);
  assert.doesNotMatch(await fs.readFile(CONFIG_PATH, "utf8"), /model_catalog_json/);
  assert.equal(await exists(CATALOG_PATH), false);
  assert.equal(await exists(SEEN_CODEX_HOME), false, "codex must not be spawned");
});

test("POST with modelCatalog: false leaves Codex's catalog untouched", async () => {
  await freshCodexDir();
  process.env.CLI_CODEX_BIN = FAKE_CODEX_OK;

  const response = await post({ modelCatalog: false });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.catalogPath, undefined);
  assert.doesNotMatch(await fs.readFile(CONFIG_PATH, "utf8"), /model_catalog_json/);
  assert.equal(await exists(CATALOG_PATH), false);
  assert.equal(await exists(SEEN_CODEX_HOME), false, "codex must not be spawned");
});

test("POST fails open with catalogWarning when Codex cannot dump its catalog", async () => {
  await freshCodexDir();
  process.env.CLI_CODEX_BIN = FAKE_CODEX_BROKEN;

  const response = await post({ modelCatalog: true });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.success, true);
  assert.equal(typeof body.catalogWarning, "string");
  assert.equal(body.catalogPath, undefined);

  const config = await fs.readFile(CONFIG_PATH, "utf8");
  assert.doesNotMatch(config, /model_catalog_json/);
  assert.match(config, /^model_provider = "omniroute"$/m);
  assert.equal(await exists(CATALOG_PATH), false);
});

test("DELETE removes the catalog key and file only when the key points to OmniRoute's file", async () => {
  await freshCodexDir();
  process.env.CLI_CODEX_BIN = FAKE_CODEX_OK;
  assert.equal((await post({ modelCatalog: true })).status, 200);
  assert.equal(await exists(CATALOG_PATH), true);

  assert.equal((await reset()).status, 200);
  assert.doesNotMatch(await fs.readFile(CONFIG_PATH, "utf8"), /model_catalog_json/);
  assert.equal(await exists(CATALOG_PATH), false);

  // A user-owned catalog is left alone
  const userCatalog = path.join(CODEX_DIR, "my-models.json");
  await fs.writeFile(
    CONFIG_PATH,
    `model_catalog_json = "${userCatalog}"\nmodel = "cx/gpt-5.5"\nmodel_provider = "omniroute"\n`
  );
  assert.equal((await reset()).status, 200);
  assert.match(
    await fs.readFile(CONFIG_PATH, "utf8"),
    new RegExp(`^model_catalog_json = "${userCatalog}"$`, "m")
  );
});
