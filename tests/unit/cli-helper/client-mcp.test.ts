import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { listClientMcp, mutateClientMcp } from "../../../src/lib/cli-helper/clientMcp.ts";

function fixture(t: test.TestContext, env: string, file: string, source?: string) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-client-mcp-"));
  const original = process.env[env];
  process.env[env] = directory;
  t.after(() => {
    if (original === undefined) delete process.env[env];
    else process.env[env] = original;
    fs.rmSync(directory, { recursive: true, force: true });
  });
  const target = path.join(directory, file);
  if (source !== undefined) fs.writeFileSync(target, source);
  return target;
}

test("Codex lists metadata, rejects stale writes, and restores the original native file", (t) => {
  const source =
    '# main comment\nmodel = "example"\n\n[mcp_servers.hidden]\ncommand = "npx"\nargs = ["--token", "secret"]\n';
  const file = fixture(t, "CODEX_HOME", "config.toml", source);
  const before = listClientMcp("codex");
  assert.deepEqual(before.servers, [{ name: "hidden", transport: "stdio", enabled: true }]);
  const after = mutateClientMcp({
    client: "codex",
    revision: before.revision,
    action: "add",
    name: "docs",
    server: { transport: "http", url: "https://example.com/mcp" },
  });
  assert.ok(after.canRestore);
  assert.ok(fs.readFileSync(file, "utf8").startsWith(source));
  assert.throws(
    () =>
      mutateClientMcp({
        client: "codex",
        revision: before.revision,
        action: "remove",
        name: "hidden",
      }),
    /changed/
  );
  mutateClientMcp({ client: "codex", revision: after.revision, action: "restore" });
  assert.equal(fs.readFileSync(file, "utf8"), source);
  assert.equal(listClientMcp("codex").canRestore, false);
});

test("Hermes toggles and updates an entry while retaining its YAML comments and private fields", (t) => {
  const source =
    "# settings\nmcp_servers:\n  tools:\n    command: npx # process\n    env:\n      TOKEN: private-value\n";
  const file = fixture(t, "HERMES_HOME", "config.yaml", source);
  const before = listClientMcp("hermes");
  const off = mutateClientMcp({
    client: "hermes",
    revision: before.revision,
    action: "toggle",
    name: "tools",
    enabled: false,
  });
  assert.deepEqual(off.servers, [{ name: "tools", transport: "stdio", enabled: false }]);
  mutateClientMcp({
    client: "hermes",
    revision: off.revision,
    action: "update",
    name: "tools",
    server: { transport: "stdio", command: "node", args: ["tools.js"] },
  });
  const saved = fs.readFileSync(file, "utf8");
  assert.match(saved, /# settings/);
  assert.match(saved, /command: node # process/);
  assert.match(saved, /TOKEN: private-value/);
});

test("Kimi Code can restore a previously absent config and rejects duplicate JSON keys", (t) => {
  const file = fixture(t, "KIMI_CODE_HOME", "mcp.json");
  const before = listClientMcp("kimi-code");
  const after = mutateClientMcp({
    client: "kimi-code",
    revision: before.revision,
    action: "add",
    name: "docs",
    server: { transport: "http", url: "https://example.com/mcp" },
  });
  assert.ok(after.canRestore);
  assert.ok(after.canToggle);
  mutateClientMcp({ client: "kimi-code", revision: after.revision, action: "restore" });
  assert.equal(fs.existsSync(file), false);
  fs.writeFileSync(file, '{"mcpServers": {}, "mcpServers": {}}');
  assert.throws(() => listClientMcp("kimi-code"), /unsupported/);
});

test("CodeBuddy edits the existing JSONC config and refuses an unverified toggle", (t) => {
  const file = fixture(
    t,
    "CODEBUDDY_CONFIG_DIR",
    "mcp.json",
    '{\n  // keep this\n  "mcpServers": {"docs": {"type": "http", "url": "https://user:pass@example.com/mcp?token=secret"}},\n}\n'
  );
  const initial = listClientMcp("codebuddy");
  assert.equal(initial.file, "mcp.json");
  assert.deepEqual(initial.servers, [{ name: "docs", transport: "http", enabled: true }]);
  assert.equal(initial.canToggle, false);
  assert.throws(
    () =>
      mutateClientMcp({
        client: "codebuddy",
        revision: initial.revision,
        action: "toggle",
        name: "docs",
        enabled: false,
      }),
    /disable/
  );
  mutateClientMcp({
    client: "codebuddy",
    revision: initial.revision,
    action: "remove",
    name: "docs",
  });
  assert.match(fs.readFileSync(file, "utf8"), /\/\/ keep this/);
});
