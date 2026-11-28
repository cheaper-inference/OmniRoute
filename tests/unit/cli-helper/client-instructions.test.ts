import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  getClientInstructions,
  MAX_CLIENT_INSTRUCTIONS_BYTES,
  updateClientInstructions,
} from "../../../src/lib/cli-helper/clientInstructions.ts";

function fixture(t: test.TestContext) {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "omni-client-instructions-")));
  const clients = {
    codex: ["CODEX_HOME", "AGENTS.md"],
    hermes: ["HERMES_HOME", "SOUL.md"],
    "kimi-code": ["KIMI_CODE_HOME", "AGENTS.md"],
    codebuddy: ["CODEBUDDY_CONFIG_DIR", "CODEBUDDY.md"],
  } as const;
  const env = { DATA_DIR: path.join(root, "data") };
  const files = Object.fromEntries(
    Object.entries(clients).map(([client, [variable, file]]) => {
      const directory = path.join(root, client);
      Object.assign(env, { [variable]: directory });
      return [client, path.join(directory, file)];
    })
  );
  const previousEnv = Object.keys(env).map((key) => [key, process.env[key]] as const);
  Object.assign(process.env, env);
  t.after(() => {
    for (const [key, value] of previousEnv) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    fs.rmSync(root, { recursive: true, force: true });
  });
  return { clients, files, root };
}

test("keeps the migrated prompt library separate from active instructions and filters by client", (t) => {
  const { root } = fixture(t);
  const dir = path.join(root, "data", "client-instructions");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "library.json"),
    JSON.stringify({
      source: "CC Switch",
      version: 1,
      prompts: [
        { app_type: "codex", id: "old1", name: "Daily", content: "Daily instructions", enabled: 1 },
        { app_type: "kimi", id: "old2", name: "Kimi", content: "Kimi instructions", enabled: 0 },
      ],
    })
  );
  const first = getClientInstructions("codex");
  assert.equal(first.exists, false);
  assert.deepEqual(
    first.variants.map(({ name, content }) => ({ name, content })),
    [{ name: "Daily", content: "Daily instructions" }]
  );
  assert.equal(getClientInstructions("kimi-code").variants[0].name, "Kimi");
  const saved = updateClientInstructions({
    client: "codex",
    revision: first.revision,
    action: "save",
    content: first.variants[0].content,
  });
  assert.equal(saved.content, "Daily instructions");
  assert.equal(saved.variants.length, 1);
});

test("saves, reads and restores each client's configured global instructions", (t) => {
  const { clients, files } = fixture(t);
  for (const client of Object.keys(clients) as (keyof typeof clients)[]) {
    const missing = getClientInstructions(client);
    assert.equal(missing.file, clients[client][1]);
    assert.equal(missing.exists, false);
    assert.equal(missing.canRestore, false);
    const saved = updateClientInstructions({
      client,
      revision: missing.revision,
      action: "save",
      content: "",
    });
    assert.equal(saved.exists, true);
    assert.equal(saved.canRestore, true);
    assert.equal(fs.readFileSync(files[client], "utf8"), "");
    assert.deepEqual(getClientInstructions(client), saved);
    const restored = updateClientInstructions({
      client,
      revision: saved.revision,
      action: "restore",
    });
    assert.notEqual(restored.revision, missing.revision);
    assert.deepEqual(restored, { ...missing, revision: restored.revision });
    assert.equal(fs.existsSync(files[client]), false);
  }
});

test("preserves existing contents and rejects stale saves or restores", (t) => {
  const { files } = fixture(t);
  fs.mkdirSync(path.dirname(files.codex));
  fs.writeFileSync(files.codex, "\ufeff# First\r\n");
  const before = getClientInstructions("codex");
  const saved = updateClientInstructions({
    client: "codex",
    revision: before.revision,
    action: "save",
    content: "# Second\n",
  });
  assert.throws(
    () =>
      updateClientInstructions({ client: "codex", revision: before.revision, action: "restore" }),
    { status: 409 }
  );
  const restored = updateClientInstructions({
    client: "codex",
    revision: saved.revision,
    action: "restore",
  });
  assert.equal(fs.readFileSync(files.codex, "utf8"), before.content);
  assert.equal(restored.canRestore, false);
  fs.writeFileSync(files.codex, "Written externally");
  assert.throws(
    () =>
      updateClientInstructions({
        client: "codex",
        revision: restored.revision,
        action: "save",
        content: "Lost update",
      }),
    { status: 409 }
  );
  assert.equal(fs.readFileSync(files.codex, "utf8"), "Written externally");
});

test("rejects oversized documents, invalid UTF-8 and linked homes", (t) => {
  const { files, root } = fixture(t);
  const missing = getClientInstructions("codex");
  assert.throws(
    () =>
      updateClientInstructions({
        client: "codex",
        revision: missing.revision,
        action: "save",
        content: "ł".repeat(MAX_CLIENT_INSTRUCTIONS_BYTES),
      }),
    { status: 413 }
  );
  fs.mkdirSync(path.dirname(files.codex));
  fs.writeFileSync(files.codex, Buffer.alloc(MAX_CLIENT_INSTRUCTIONS_BYTES + 1));
  assert.throws(() => getClientInstructions("codex"), { status: 413 });
  fs.writeFileSync(files.codex, Buffer.from([0xc0, 0x80]));
  assert.throws(() => getClientInstructions("codex"), { status: 422 });
  fs.symlinkSync(path.dirname(files.codex), path.join(root, "hermes"), "junction");
  assert.throws(() => getClientInstructions("hermes"), { status: 409 });
});

test("retains the last usable undo if replacing the instructions fails", (t) => {
  const { files } = fixture(t);
  const missing = getClientInstructions("codex");
  const first = updateClientInstructions({
    client: "codex",
    revision: missing.revision,
    action: "save",
    content: "first",
  });
  const rename = fs.renameSync;
  const mock = t.mock.method(fs, "renameSync", (from, to) => {
    if (to === files.codex) throw new Error("Unable to replace instructions");
    return rename(from, to);
  });
  assert.throws(
    () =>
      updateClientInstructions({
        client: "codex",
        revision: first.revision,
        action: "save",
        content: "second",
      }),
    /Unable to replace instructions/
  );
  mock.mock.restore();
  assert.deepEqual(getClientInstructions("codex"), first);
  assert.equal(
    updateClientInstructions({
      client: "codex",
      revision: first.revision,
      action: "restore",
    }).exists,
    false
  );
});

test("the HTTP route enforces authentication, same-origin, and strict request bodies", async (t) => {
  const { files } = fixture(t);
  const jwtSecret = process.env.JWT_SECRET;
  const { makeManagementSessionRequest } = await import("../../helpers/managementSession.ts");
  const core = await import("../../../src/lib/db/core.ts");
  const { GET, POST } = await import("../../../src/app/api/local/client-instructions/route.ts");
  const url = "http://localhost:20128/api/local/client-instructions";
  const codexUrl = url + "?client=codex";
  const sameOrigin = { origin: "http://localhost:20128", "sec-fetch-site": "same-origin" };
  try {
    assert.equal((await GET(new Request(codexUrl))).status, 401);
    assert.equal(
      (
        await GET(
          await makeManagementSessionRequest(codexUrl, {
            headers: { origin: "https://external.example" },
          })
        )
      ).status,
      403
    );
    const initial = await GET(
      await makeManagementSessionRequest(codexUrl, { headers: sameOrigin })
    );
    assert.equal(initial.status, 200);
    assert.equal(initial.headers.get("cache-control"), "no-store");
    const before = await initial.json();
    assert.equal(before.file, "AGENTS.md");
    const save = {
      client: "codex",
      revision: before.revision,
      action: "save",
      content: "global rules",
    };
    const post = (body: typeof save | Record<string, unknown>) =>
      makeManagementSessionRequest(url, { method: "POST", headers: sameOrigin, body }).then(POST);
    assert.equal((await post({ ...save, path: files.codex })).status, 400);
    assert.equal(fs.existsSync(files.codex), false);
    const response = await post(save);
    assert.equal(response.status, 200);
    assert.equal(fs.readFileSync(files.codex, "utf8"), save.content);
    const after = await response.json();
    assert.equal((await post(save)).status, 409);
    assert.equal(
      (await post({ client: "codex", revision: after.revision, action: "restore" })).status,
      200
    );
    assert.equal(fs.existsSync(files.codex), false);
  } finally {
    core.resetDbInstance();
    if (jwtSecret === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = jwtSecret;
  }
});
