/**
 * A malformed ~/.hermes/config.yaml must never be silently replaced.
 *
 * generateHermesAgentConfig used to swallow every read/parse error (the bare
 * catch around the readFile/yaml.load pair), so a config.yaml that js-yaml
 * cannot parse (duplicate key, unclosed quote, ...) was treated as "absent": the merge
 * started from `{}` and the route wrote the result over the user's file. Every
 * Hermes setting outside the applied roles was dropped while the route still
 * answered `success: true`.
 *
 * Only ENOENT means "start fresh". Any other error must fail the apply and
 * leave the file byte-identical. Runs against a throwaway HERMES_HOME.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-hermes-yaml-refuse-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "hermes-yaml-refuse-api-secret";
process.env.JWT_SECRET = "hermes-yaml-refuse-jwt-secret";
process.env.CLI_ALLOW_CONFIG_WRITES = "true";
process.env.HERMES_HOME = path.join(TEST_DATA_DIR, "hermes");
fs.mkdirSync(process.env.HERMES_HOME, { recursive: true });

const core = await import("../../src/lib/db/core.ts");
const route = await import("../../src/app/api/cli-tools/hermes-agent-settings/route.ts");
const generator = await import("../../src/lib/cli-helper/config-generator/index.ts");

const configPath = () => path.join(process.env.HERMES_HOME as string, "config.yaml");
const envPath = () => path.join(process.env.HERMES_HOME as string, ".env");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function authCookie(): Promise<string> {
  const jwt = await new SignJWT({ authenticated: true, sub: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return `auth_token=${jwt}`;
}

const applyBody = {
  baseUrl: "http://localhost:20128",
  apiKey: "sk-hermes-yaml-refuse",
  selections: [{ role: "default", model: "gpt-4o" }],
};

async function apply(): Promise<Response> {
  return route.POST(
    new Request("http://localhost/api/cli-tools/hermes-agent-settings", {
      method: "POST",
      headers: { cookie: await authCookie(), "Content-Type": "application/json" },
      body: JSON.stringify(applyBody),
    })
  );
}

for (const [name, bytes] of [
  ["duplicate mapping key", "model:\n  default: keep-me\nmodel:\n  default: other\n"],
  ["unclosed quote", 'model: "unclosed\n'],
  ["non-mapping document", "- just\n- a\n- list\n"],
  ["falsy boolean document", "false\n"],
  ["falsy number document", "0\n"],
  ["null document", "null\n"],
] as const) {
  test(`POST apply with a ${name} config.yaml is refused and the file is untouched`, async () => {
    fs.writeFileSync(configPath(), bytes);
    const res = await apply();
    assert.ok(!res.ok, `expected a failure status, got ${res.status}`);
    assert.equal(fs.readFileSync(configPath(), "utf8"), bytes, "config.yaml was overwritten");
    assert.equal(fs.existsSync(envPath()), false, ".env must not be written on refusal");
  });
}

// `omniroute config validate|set hermes-agent` go through the generic adapter.
// It must report the refusal as a failure, not wrap the error object as content.
for (const bytes of ['model: "unclosed\n', "false\n"]) {
  test(`generateConfig("hermes-agent") reports a refusal for ${JSON.stringify(bytes)}`, async () => {
    fs.writeFileSync(configPath(), bytes);
    const result = await generator.generateConfig("hermes-agent", {
      baseUrl: "http://localhost:20128/v1",
      apiKey: "test-key",
    });
    assert.equal(result.success, false, "an unparseable config.yaml must not validate");
    assert.match(String(result.error), /refusing to overwrite/);
    assert.equal(result.content, undefined, "no content object may leak out as success");
    assert.equal(fs.readFileSync(configPath(), "utf8"), bytes);
  });
}

test("POST apply with a valid config.yaml merges and keeps unrelated keys", async () => {
  fs.writeFileSync(
    configPath(),
    "theme: dark\nmcp_servers:\n  mine:\n    command: keep\nmodel:\n  default: old-model\n"
  );
  const res = await apply();
  assert.equal(res.status, 200);
  const written = fs.readFileSync(configPath(), "utf8");
  assert.match(written, /theme: dark/);
  assert.match(written, /command: keep/);
  assert.match(written, /gpt-4o/);
});

test("POST apply with no existing config.yaml still starts fresh", async () => {
  const res = await apply();
  assert.equal(res.status, 200);
  const written = fs.readFileSync(configPath(), "utf8");
  assert.match(written, /gpt-4o/);
});
