import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { listClientMcp, mutateClientMcp } from "../../../src/lib/cli-helper/clientMcp.ts";
import {
  changeClientMcpLibrary,
  getClientMcpLibrary,
} from "../../../src/lib/cli-helper/clientMcpLibrary.ts";

function homes(t: test.TestContext) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-client-mcp-library-"));
  const variables = [
    "DATA_DIR",
    "CODEX_HOME",
    "HERMES_HOME",
    "KIMI_CODE_HOME",
    "CODEBUDDY_CONFIG_DIR",
  ] as const;
  const prior = variables.map((key) => process.env[key]);
  const locations = Object.fromEntries(
    variables.map((key) => {
      const location = path.join(root, key);
      fs.mkdirSync(location);
      process.env[key] = location;
      return [key, location];
    })
  );
  t.after(() => {
    for (const [index, key] of variables.entries()) {
      if (prior[index] === undefined) delete process.env[key];
      else process.env[key] = prior[index];
    }
    fs.rmSync(root, { recursive: true, force: true });
  });
  return locations;
}

test("batch import leaves native configs untouched and the index excludes connection data", (t) => {
  const locations = homes(t);
  const file = path.join(locations.CODEX_HOME, "config.toml");
  const config =
    '[mcp_servers.docs]\nurl = "https://example.com/mcp" # docs\n\n[mcp_servers.private]\ncommand = "node"\nargs = ["fixture-only-argument"]\n[mcp_servers.private.env]\nFIXTURE = "fixture-only-secret"\n';
  fs.writeFileSync(file, config);
  fs.writeFileSync(path.join(locations.HERMES_HOME, "config.yaml"), "mcp_servers: [invalid]");
  const discovery = getClientMcpLibrary();
  assert.equal(discovery.items.length, 2);
  assert.match(discovery.errors.hermes ?? "", /unsupported/);
  assert.doesNotMatch(JSON.stringify(discovery), /fixture-only|example\.com/);
  const ids = discovery.items.map((item) => item.id);
  const imported = changeClientMcpLibrary({ action: "import", ids });
  assert.ok(imported.results.every((entry) => entry.ok));
  assert.equal(fs.readFileSync(file, "utf8"), config);
  assert.doesNotMatch(
    fs.readFileSync(path.join(locations.DATA_DIR, "client-mcp-library.json"), "utf8"),
    /fixture-only|example\.com/
  );
  assert.equal(
    imported.items.find((item) => item.name === "private")?.clients.codebuddy?.canEnable,
    false
  );
  const off = changeClientMcpLibrary({ action: "disable", ids, client: "codex" });
  assert.ok(
    off.results.every((entry) => entry.ok),
    JSON.stringify(off.results)
  );
  assert.match(fs.readFileSync(file, "utf8"), /# docs/);
  const edited = listClientMcp("codex");
  assert.ok(edited.servers.every((entry) => !entry.enabled));
  mutateClientMcp({ client: "codex", revision: edited.revision, action: "restore" });
  assert.equal(fs.readFileSync(file, "utf8"), config);
});

test("CodeBuddy membership preserves other entries and supports reversible off and on", (t) => {
  const locations = homes(t);
  const file = path.join(locations.CODEBUDDY_CONFIG_DIR, "mcp.json");
  fs.writeFileSync(
    file,
    '{\n // keep config comment\n "disabledMcpServers": ["other"],\n "mcpServers":{"docs":{"url":"https://example.com/mcp","headers":{"X-FIXTURE":"fixture-only-secret"}}}\n}\n'
  );
  const id = getClientMcpLibrary().items[0].id;
  changeClientMcpLibrary({ action: "import", ids: [id] });
  const off = changeClientMcpLibrary({ action: "disable", ids: [id], client: "codebuddy" });
  assert.ok(off.results[0].ok, off.results[0].error);
  assert.equal(off.items[0].clients.codebuddy?.enabled, false);
  const on = changeClientMcpLibrary({ action: "enable", ids: [id], client: "codebuddy" });
  assert.ok(on.results[0].ok, on.results[0].error);
  assert.equal(on.items[0].clients.codebuddy?.enabled, true);
  const content = fs.readFileSync(file, "utf8");
  assert.match(content, /keep config comment/);
  assert.match(content, /fixture-only-secret/);
  assert.match(content, /"other"/);
});

test("portable installs track their target and occupied names preserve independent variants", (t) => {
  const locations = homes(t);
  fs.writeFileSync(
    path.join(locations.CODEX_HOME, "config.toml"),
    '[mcp_servers.docs]\nurl = "https://one.example/mcp"\n'
  );
  fs.writeFileSync(
    path.join(locations.HERMES_HOME, "config.yaml"),
    "mcp_servers:\n  docs:\n    url: https://two.example/mcp\n"
  );
  const discovery = getClientMcpLibrary();
  assert.equal(discovery.items.length, 2);
  const id = discovery.items.find((item) => item.sourceClient === "codex").id;
  const imported = changeClientMcpLibrary({ action: "import", ids: [id] });
  assert.equal(imported.items.find((item) => item.id === id)?.clients.hermes?.canEnable, false);
  const blocked = changeClientMcpLibrary({ action: "enable", ids: [id], client: "hermes" });
  assert.equal(blocked.results[0].ok, false);
  const installed = changeClientMcpLibrary({ action: "enable", ids: [id], client: "kimi-code" });
  assert.ok(installed.results[0].ok, installed.results[0].error);
  assert.equal(
    installed.items.find((item) => item.id === id)?.clients["kimi-code"]?.canDisable,
    true
  );
  assert.equal(installed.items.length, 2);
  const native = path.join(locations.KIMI_CODE_HOME, "mcp.json");
  fs.writeFileSync(native, '{"mcpServers":{"docs":{"url":"https://updated.example/mcp"}}}');
  const conflict = changeClientMcpLibrary({ action: "disable", ids: [id], client: "kimi-code" });
  assert.equal(conflict.results[0].ok, false);
  assert.match(fs.readFileSync(native, "utf8"), /updated\.example/);
  const updated = changeClientMcpLibrary({ action: "update", ids: [id], client: "kimi-code" });
  assert.ok(updated.results[0].ok, updated.results[0].error);
  assert.equal(
    updated.items.find((item) => item.id === id)?.clients["kimi-code"]?.canDisable,
    true
  );
  const before = fs.readFileSync(native, "utf8");
  const removed = changeClientMcpLibrary({ action: "uninstall", ids: [id] });
  assert.ok(removed.results[0].ok, removed.results[0].error);
  assert.equal(removed.items.find((item) => item.id === id)?.managed, false);
  assert.equal(fs.readFileSync(native, "utf8"), before);
});
