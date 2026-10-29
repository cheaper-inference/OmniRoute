/**
 * Route tests for /api/cli-tools/pi-settings
 *
 * Covers the full dashboard ↔ Pi models.json contract end to end against a temp
 * PI_CODING_AGENT_DIR:
 *
 *   - GET reports installed / runnable / config path / hasOmniRoute
 *   - POST writes a valid models.json provider entry and returns success
 *   - POST never leaks a stack trace on failure
 *   - DELETE removes only the OmniRoute entry and leaves unrelated providers
 *   - the container-ephemeral guard still refuses with 422
 *
 * The auth guard and last-configured bookkeeping open the SQLite singleton, so
 * resetDbInstance() runs in test.after (AGENTS.md → "Database Handles in Tests").
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import fsp from "node:fs/promises";

const { mkdir, mkdtemp, writeFile, readFile, rm, symlink } = fsp;
import path from "node:path";
import os from "node:os";
import { pathToFileURL } from "node:url";

const routePath = path.join(process.cwd(), "src/app/api/cli-tools/pi-settings/route.ts");
const TMP_ROOT = path.join(os.tmpdir(), "omniroute-pi-settings-route-test");
const tempDirs = new Set<string>();

// Hermetic runtime: GET short-circuits to "Pi CLI is not installed" when no `pi`
// binary is found, and write routes answer 422 on a container devbox. Neither
// depends on the code under test, so every test starts with a stub `pi` on PATH
// and container detection forced off (the container-guard test opts back in).
const STUB_BIN_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pi-stub-bin-"));
tempDirs.add(STUB_BIN_DIR);
const STUB_PI = path.join(STUB_BIN_DIR, "pi");
fs.writeFileSync(STUB_PI, '#!/bin/sh\necho "pi 1.0.0"\n', { mode: 0o755 });

const originalEnv = { ...process.env };

async function importRoute(label: string) {
  return import(`${pathToFileURL(routePath).href}?case=${label}-${Date.now()}-${Math.random()}`);
}

function restoreEnv() {
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) delete process.env[key];
  }
  Object.assign(process.env, originalEnv);
}

/** Fresh temp agent dir so tests never touch the real ~/.pi tree. */
async function tempAgentDir(): Promise<string> {
  await mkdir(TMP_ROOT, { recursive: true });
  const dir = await mkdtemp(path.join(TMP_ROOT, "pi-"));
  tempDirs.add(dir);
  process.env.PI_CODING_AGENT_DIR = dir;
  return dir;
}

function jsonRequest(method: string, body?: unknown) {
  return new Request("http://localhost:20128/api/cli-tools/pi-settings", {
    method,
    headers: { "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

test.beforeEach(() => {
  process.env.PATH = `${STUB_BIN_DIR}${path.delimiter}${originalEnv.PATH ?? ""}`;
  delete process.env.CLI_PI_BIN;
  process.env.OMNIROUTE_CONTAINER = "0";
  delete process.env.OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE;
});

test.afterEach(restoreEnv);

test.after(async () => {
  try {
    const { resetDbInstance } = await import("../../src/lib/db/core.ts");
    resetDbInstance();
  } catch {
    // the DB was never opened
  }
  for (const dir of tempDirs) {
    await rm(dir, { recursive: true, force: true });
  }
});

// ── GET ───────────────────────────────────────────────────────────────────────

test("GET reports the models.json path and not-configured state", async () => {
  const dir = await tempAgentDir();
  const { GET } = await importRoute("get-empty");

  const body = await (await GET(jsonRequest("GET"))).json();

  assert.equal(body.hasOmniRoute, false);
  assert.equal(body.configError, null);
  assert.equal(body.modelsPath, path.join(dir, "models.json"));
  assert.equal(body.providers, null);
  assert.equal(typeof body.installed, "boolean");
  assert.equal(typeof body.runnable, "boolean");
});

test("GET surfaces a corrupt models.json as configError", async () => {
  const dir = await tempAgentDir();
  await writeFile(path.join(dir, "models.json"), "{ not valid json ", "utf-8");
  const { GET } = await importRoute("get-corrupt");

  const body = await (await GET(jsonRequest("GET"))).json();

  assert.equal(body.hasOmniRoute, false);
  assert.ok(body.configError, "configError must be set");
  assert.match(body.configError, /not valid JSON/);
});

test("GET reports hasOmniRoute once the provider is written", async () => {
  const dir = await tempAgentDir();
  await writeFile(
    path.join(dir, "models.json"),
    JSON.stringify({
      providers: {
        omniroute: {
          baseUrl: "http://127.0.0.1:20128/v1",
          api: "openai-completions",
          apiKey: "sk-test",
          omnirouteManaged: true,
          models: [{ id: "auto/best-coding", name: "OmniRoute best-coding" }],
        },
      },
    }),
    "utf-8"
  );
  const { GET } = await importRoute("get-configured");

  const body = await (await GET(jsonRequest("GET"))).json();

  assert.equal(body.hasOmniRoute, true);
  assert.equal(body.omniRouteOwned, true);
  assert.equal(body.omniRouteUnowned, false);
  assert.equal(body.baseUrl, "http://127.0.0.1:20128/v1");
  assert.equal(body.model, "auto/best-coding");
  assert.deepEqual(body.providers, ["omniroute"]);
});

test("GET reports a hand-edited (unowned) entry as configured but not owned", async () => {
  const dir = await tempAgentDir();
  await writeFile(
    path.join(dir, "models.json"),
    JSON.stringify({
      providers: {
        omniroute: {
          baseUrl: "http://127.0.0.1:20128/v1",
          api: "openai-completions",
          apiKey: "not-needed",
          piGuiCustomEndpoint: true,
          models: [{ id: "direct-model-combo" }],
        },
      },
    }),
    "utf-8"
  );
  const { GET } = await importRoute("get-unowned");

  const body = await (await GET(jsonRequest("GET"))).json();

  assert.equal(body.hasOmniRoute, true, "an unowned local entry still counts as configured");
  assert.equal(body.omniRouteOwned, false);
  assert.equal(body.omniRouteUnowned, true);
  assert.equal(body.baseUrl, "http://127.0.0.1:20128/v1");
  assert.equal(body.model, "direct-model-combo");
});

// ── POST ──────────────────────────────────────────────────────────────────────

test("POST writes the OmniRoute provider into models.json", async () => {
  const dir = await tempAgentDir();
  const { POST } = await importRoute("apply");

  const response = await POST(
    jsonRequest("POST", {
      baseUrl: "http://127.0.0.1:20128",
      apiKey: "sk-test",
      model: "auto/best-coding",
    })
  );

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.success, true);
  assert.equal(body.configPath, path.join(dir, "models.json"));

  const written = JSON.parse(await readFile(path.join(dir, "models.json"), "utf-8"));
  const provider = written.providers.omniroute;

  assert.equal(provider.baseUrl, "http://127.0.0.1:20128/v1");
  assert.equal(provider.api, "openai-completions");
  assert.equal(provider.apiKey, "sk-test");
  assert.equal(provider.omnirouteManaged, true);
  assert.deepEqual(provider.models, [{ id: "auto/best-coding", name: "auto/best-coding" }]);
});

test("POST preserves providers the user configured by hand", async () => {
  const dir = await tempAgentDir();
  await writeFile(
    path.join(dir, "models.json"),
    JSON.stringify({
      providers: {
        "personal-openai": {
          baseUrl: "https://api.openai.com/v1",
          apiKey: "sk-personal",
          models: [{ id: "gpt-test" }],
        },
      },
    }),
    "utf-8"
  );
  const { POST } = await importRoute("apply-preserve");

  await POST(
    jsonRequest("POST", {
      baseUrl: "http://127.0.0.1:20128",
      apiKey: "sk-test",
      model: "auto/best-coding",
    })
  );

  const written = JSON.parse(await readFile(path.join(dir, "models.json"), "utf-8"));
  assert.equal(written.providers["personal-openai"].apiKey, "sk-personal");
  assert.ok(written.providers.omniroute);
});

test("POST rejects an invalid body without touching models.json", async () => {
  const dir = await tempAgentDir();
  const { POST } = await importRoute("apply-invalid");

  const response = await POST(jsonRequest("POST", { baseUrl: "not-a-url" }));
  assert.equal(response.status, 400);
  const body = await response.json();
  assert.ok(body.error, "must return an error object");

  assert.equal(fs.existsSync(path.join(dir, "models.json")), false);
});

test("POST rejects a non-HTTP endpoint without touching models.json", async () => {
  const dir = await tempAgentDir();
  const { POST } = await importRoute("apply-invalid-endpoint");

  const response = await POST(
    jsonRequest("POST", {
      baseUrl: "ftp://example.com",
      apiKey: "sk-test",
      model: "auto/best-coding",
    })
  );
  assert.equal(response.status, 400);
  assert.equal(fs.existsSync(path.join(dir, "models.json")), false);
});

test("POST refuses a corrupt models.json with 409 and leaves it byte-identical", async () => {
  const dir = await tempAgentDir();
  const bytes = '{"providers": {"personal-openai": {"apiKey": "sk-personal"';
  await writeFile(path.join(dir, "models.json"), bytes, "utf-8");
  const { POST } = await importRoute("apply-corrupt");

  const response = await POST(
    jsonRequest("POST", {
      baseUrl: "http://127.0.0.1:20128",
      apiKey: "sk-test",
      model: "auto/best-coding",
    })
  );

  assert.equal(response.status, 409);
  const body = await response.json();
  assert.equal(body.error.code, "config_unparseable");
  assert.match(body.error.message, /models\.json/);
  assert.equal(await readFile(path.join(dir, "models.json"), "utf-8"), bytes);
});

test("POST error bodies never leak a stack trace", async () => {
  // Make only the write fail, independently of the user running the suite: a
  // chmod-based denial is bypassed by root (the merge train runs as root), so
  // models.json is instead a dangling symlink whose target directory does not
  // exist. The pre-write read sees ENOENT (fresh start, no 409 refusal), the
  // backup is skipped, and writeFile follows the link into a missing directory
  // and throws ENOENT for every uid, so the route goes through
  // sanitizeErrorMessage().
  const dir = await tempAgentDir();
  const missingTarget = path.join(dir, "missing-parent", "models.json");
  await symlink(missingTarget, path.join(dir, "models.json"));

  process.env.OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE = "1";
  const { POST } = await importRoute("apply-nostack");

  const response = await POST(
    jsonRequest("POST", {
      baseUrl: "http://127.0.0.1:20128",
      apiKey: "sk-test",
      model: "auto/best-coding",
    })
  );

  const body = await response.json();

  assert.equal(response.status, 500, "the failed write must surface as a 500");
  assert.ok(body.error, "error must be present");
  assert.ok(!body.error.message.includes("at /"), "must not leak a stack trace");
  assert.ok(!body.error.message.includes(".ts:"), "must not leak source locations");
  assert.equal(fs.existsSync(missingTarget), false, "nothing may be written");
});

// ── DELETE ────────────────────────────────────────────────────────────────────

test("DELETE removes the OmniRoute entry and keeps unrelated providers", async () => {
  const dir = await tempAgentDir();
  await writeFile(
    path.join(dir, "models.json"),
    JSON.stringify({
      providers: {
        "personal-openai": {
          baseUrl: "https://api.openai.com/v1",
          apiKey: "sk-personal",
          models: [{ id: "gpt-test" }],
        },
        omniroute: {
          baseUrl: "http://127.0.0.1:20128/v1",
          api: "openai-completions",
          apiKey: "sk-test",
          omnirouteManaged: true,
          models: [{ id: "auto/best-coding" }],
        },
      },
    }),
    "utf-8"
  );
  const { DELETE } = await importRoute("reset");

  const response = await DELETE(jsonRequest("DELETE"));
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.success, true);

  const written = JSON.parse(await readFile(path.join(dir, "models.json"), "utf-8"));
  assert.equal(written.providers.omniroute, undefined);
  assert.ok(written.providers["personal-openai"], "unrelated provider preserved");
});

test("DELETE reports success even with nothing OmniRoute owns", async () => {
  await tempAgentDir();
  const { DELETE } = await importRoute("reset-empty");

  const body = await (await DELETE(jsonRequest("DELETE"))).json();
  assert.equal(body.success, true);
  assert.match(body.message, /No OmniRoute provider to remove/);
});

// ── Container guard ───────────────────────────────────────────────────────────

test("POST refuses with 422 when the target is container-ephemeral", async () => {
  // OMNIROUTE_CONTAINER forces detection; the temp HOME has no bind mount, so
  // the models.json target classifies as ephemeral and the write is refused
  // rather than silently discarded.
  const fakeHome = fs.mkdtempSync(path.join(os.tmpdir(), "or-pi-ephemeral-"));
  tempDirs.add(fakeHome);
  process.env.OMNIROUTE_CONTAINER = "1";
  process.env.HOME = fakeHome;
  process.env.USERPROFILE = fakeHome;
  process.env.PI_CODING_AGENT_DIR = "";
  delete process.env.OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE;

  const { POST } = await importRoute("container");
  const response = await POST(
    jsonRequest("POST", {
      baseUrl: "http://127.0.0.1:20128",
      apiKey: "sk-test",
      model: "auto/best-coding",
    })
  );

  assert.equal(response.status, 422);
  const body = await response.json();
  assert.equal(body.containerEphemeralTarget, true);
  assert.ok(body.hostSetupCommand, "must carry a host-side hint");
  // We must not advertise a setup command that does not exist.
  assert.ok(
    !body.hostSetupCommand.includes("setup-pi"),
    "hostCommand must not point at a non-existent omniroute setup-pi"
  );
  assert.ok(!body.error.includes("at /"), "error must not leak a stack trace");

  // Nothing may hit disk.
  assert.equal(fs.existsSync(path.join(fakeHome, ".pi")), false);
});
