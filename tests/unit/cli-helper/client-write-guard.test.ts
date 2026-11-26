import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { type TestContext } from "node:test";
import { SignJWT } from "jose";
import * as extensions from "../../../src/app/api/local/client-extensions/route";
import * as instructions from "../../../src/app/api/local/client-instructions/route";
import * as mcp from "../../../src/app/api/local/client-mcp/route";
import * as mcpLibrary from "../../../src/app/api/local/client-mcp-library/route";
import * as models from "../../../src/app/api/local/client-model-config/route";
import * as plugins from "../../../src/app/api/local/client-plugin-library/route";
import * as skills from "../../../src/app/api/local/client-skill-library/route";

function fixture(t: TestContext) {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "omr-local-client-write-"));
  t.after(() => fs.rmSync(home, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 }));
  const values = {
    DATA_DIR: path.join(home, "data"),
    CODEX_HOME: path.join(home, ".codex"),
    JWT_SECRET: "fixture-local-client-write-secret",
    OMNIROUTE_LOCAL_ENDPOINTS_ENABLED: "1",
    OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE: "",
  };
  for (const [key, value] of Object.entries(values)) {
    const previous = process.env[key];
    process.env[key] = value;
    t.after(() => {
      if (previous === undefined) delete process.env[key];
      else process.env[key] = previous;
    });
  }
  return { home, ...values };
}

async function request(endpoint: string, method: string, body?: unknown) {
  const token = await new SignJWT({ authenticated: true, sub: "local-client-write-test" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return new Request(`http://localhost/api/local/client-${endpoint}`, {
    method,
    headers: { cookie: `auth_token=${token}`, "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

test("every local client mutation enforces CLI_ALLOW_CONFIG_WRITES before body processing", async (t) => {
  const { home } = fixture(t);
  t.mock.method(os, "homedir", () => home);
  const previous = process.env.CLI_ALLOW_CONFIG_WRITES;
  process.env.CLI_ALLOW_CONFIG_WRITES = "false";
  t.after(() => {
    if (previous === undefined) delete process.env.CLI_ALLOW_CONFIG_WRITES;
    else process.env.CLI_ALLOW_CONFIG_WRITES = previous;
  });
  for (const [endpoint, method, handler] of [
    ["extensions", "PATCH", extensions.PATCH],
    ["extensions", "POST", extensions.POST],
    ["instructions", "POST", instructions.POST],
    ["mcp", "POST", mcp.POST],
    ["mcp-library", "POST", mcpLibrary.POST],
    ["model-config", "POST", models.POST],
    ["plugin-library", "POST", plugins.POST],
    ["skill-library", "POST", skills.POST],
  ] as const) {
    const response = await handler(await request(endpoint, method));
    assert.equal(response.status, 403, `${method} ${endpoint}`);
    assert.match((await response.json()).error, /CLI_ALLOW_CONFIG_WRITES/);
  }
  assert.deepEqual(fs.readdirSync(home), []);
});

test("host instructions stay read-only when their destination is ephemeral inside a container", async (t) => {
  const { home, CODEX_HOME } = fixture(t);
  t.mock.method(os, "homedir", () => home);
  for (const [key, value] of Object.entries({
    CLI_ALLOW_CONFIG_WRITES: "true",
    OMNIROUTE_CONTAINER: "1",
  })) {
    const previous = process.env[key];
    process.env[key] = value;
    t.after(() => {
      if (previous === undefined) delete process.env[key];
      else process.env[key] = previous;
    });
  }
  const before = await instructions.GET(await request("instructions?client=codex", "GET"));
  assert.equal(before.status, 200);
  const { revision } = await before.json();
  const after = await instructions.POST(
    await request("instructions", "POST", {
      client: "codex",
      action: "save",
      revision,
      content: "must not reach disk",
    })
  );
  assert.equal(after.status, 403);
  assert.equal(fs.existsSync(path.join(CODEX_HOME, "AGENTS.md")), false);
});
