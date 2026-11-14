// Hermes Agent settings API: apply to one Hermes profile, or to all of them.
// Profiles live in <hermes home>/profiles/<name>/. Without a profile the route behaves as before
// (it reads and writes the default Hermes home).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-hermes-profiles-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "hermes-profiles-api-secret";
process.env.JWT_SECRET = "hermes-profiles-jwt-secret";
process.env.CLI_ALLOW_CONFIG_WRITES = "true";
const HOME = path.join(TEST_DATA_DIR, "hermes");
process.env.HERMES_HOME = HOME;

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { listHermesProfiles } =
  await import("../../src/lib/cli-helper/config-generator/hermesHome.ts");
const route = await import("../../src/app/api/cli-tools/hermes-agent-settings/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const URL_BASE = "http://localhost/api/cli-tools/hermes-agent-settings";
// Built from parts: a plain placeholder, not a credential-shaped literal.
const PLACEHOLDER_KEY = ["placeholder", "value"].join("-");

function profileDir(name: string) {
  return path.join(HOME, "profiles", name);
}

function makeProfile(name: string, identityFile = "config.yaml", body = "{}\n") {
  fs.mkdirSync(profileDir(name), { recursive: true });
  fs.writeFileSync(path.join(profileDir(name), identityFile), body);
}

async function authCookie(): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = await new SignJWT({ authenticated: true, sub: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
  return `auth_token=${jwt}`;
}

async function post(body: Record<string, unknown>) {
  return route.POST(
    new Request(URL_BASE, {
      method: "POST",
      headers: { cookie: await authCookie(), "Content-Type": "application/json" },
      body: JSON.stringify({
        baseUrl: "http://localhost:20128",
        selections: [{ role: "default", model: "gpt-4o" }],
        ...body,
      }),
    })
  );
}

async function get(query = "") {
  return route.GET(new Request(`${URL_BASE}${query}`, { headers: { cookie: await authCookie() } }));
}

const read = (file: string) => fs.readFileSync(file, "utf8");

test("listHermesProfiles returns real profile directories that hold an identity file", () => {
  makeProfile("beta");
  makeProfile("alpha", "profile.yaml");
  fs.mkdirSync(profileDir("empty"), { recursive: true });
  fs.writeFileSync(path.join(HOME, "profiles", "stray-file.txt"), "x");
  fs.symlinkSync(profileDir("alpha"), path.join(HOME, "profiles", "linked"));
  assert.deepEqual(listHermesProfiles(), ["alpha", "beta"]);
});

test("listHermesProfiles is empty when there is no profiles directory", () => {
  const saved = process.env.HERMES_HOME;
  process.env.HERMES_HOME = path.join(TEST_DATA_DIR, "no-such-home");
  try {
    assert.deepEqual(listHermesProfiles(), []);
  } finally {
    process.env.HERMES_HOME = saved;
  }
});

test("GET with a profile reads that profile's config, GET without one reads the default", async () => {
  fs.mkdirSync(HOME, { recursive: true });
  fs.writeFileSync(
    path.join(HOME, "config.yaml"),
    "model:\n  default: default-home-model\n  provider: omniroute\n"
  );
  fs.writeFileSync(
    path.join(profileDir("alpha"), "config.yaml"),
    "model:\n  default: alpha-model\n  provider: omniroute\n"
  );
  const withProfile = (await (await get("?profile=alpha")).json()) as {
    roles: { default?: { model: string } };
  };
  assert.equal(withProfile.roles.default?.model, "alpha-model");
  const without = (await (await get()).json()) as { roles: { default?: { model: string } } };
  assert.equal(without.roles.default?.model, "default-home-model");
});

test("POST with a profile writes only that profile", async () => {
  const key = await apiKeysDb.createApiKey("hermes-profile-key", "hermes-profile-machine");
  const defaultBefore = read(path.join(HOME, "config.yaml"));
  const betaBefore = read(path.join(profileDir("beta"), "config.yaml"));

  const response = await post({ profile: "alpha", keyId: key.id });
  assert.equal(response.status, 200);
  const body = (await response.json()) as { configPath: string };
  assert.equal(body.configPath, path.join(profileDir("alpha"), "config.yaml"));

  assert.match(read(path.join(profileDir("alpha"), "config.yaml")), /gpt-4o/);
  assert.match(read(path.join(profileDir("alpha"), ".env")), /^OMNIROUTE_API_KEY=/m);
  assert.equal(read(path.join(HOME, "config.yaml")), defaultBefore);
  assert.equal(read(path.join(profileDir("beta"), "config.yaml")), betaBefore);
});

test("POST without a profile still writes the default home", async () => {
  const key = await apiKeysDb.createApiKey("hermes-default-key", "hermes-default-machine");
  const response = await post({ keyId: key.id });
  assert.equal(response.status, 200);
  assert.match(read(path.join(HOME, "config.yaml")), /gpt-4o/);
});

test("POST refuses unknown profiles and traversal names, and writes nothing", async () => {
  const outside = path.join(TEST_DATA_DIR, "escape");
  for (const profile of ["missing", "../escape", "..", "alpha/../../escape", "/etc", "empty"]) {
    const response = await post({ profile, preview: false, apiKey: PLACEHOLDER_KEY });
    assert.equal(response.status, 400, `profile ${JSON.stringify(profile)} must be refused`);
  }
  assert.equal(fs.existsSync(outside), false);
  assert.equal(fs.existsSync(path.join(profileDir("empty"), "config.yaml")), false);
});

test("POST with applyToAll writes every profile and leaves the default home alone", async () => {
  const key = await apiKeysDb.createApiKey("hermes-all-key", "hermes-all-machine");
  const defaultBefore = read(path.join(HOME, "config.yaml"));
  fs.writeFileSync(
    path.join(profileDir("beta"), "config.yaml"),
    "model:\n  default: beta-old\n  provider: omniroute\n"
  );

  const response = await post({
    applyToAll: true,
    keyId: key.id,
    selections: [{ role: "default", model: "all-profiles-model" }],
  });
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    results: Array<{ profile: string; success: boolean }>;
  };
  assert.deepEqual(
    body.results.map((entry) => [entry.profile, entry.success]),
    [
      ["alpha", true],
      ["beta", true],
    ]
  );
  for (const name of ["alpha", "beta"]) {
    assert.match(read(path.join(profileDir(name), "config.yaml")), /all-profiles-model/);
  }
  assert.equal(read(path.join(HOME, "config.yaml")), defaultBefore);
});

test("POST refuses profile together with applyToAll", async () => {
  const response = await post({ profile: "alpha", applyToAll: true, apiKey: PLACEHOLDER_KEY });
  assert.equal(response.status, 400);
});
