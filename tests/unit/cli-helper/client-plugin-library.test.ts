import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test, type TestContext } from "node:test";

import {
  changeClientPluginLibrary,
  getClientPluginLibrary,
} from "@/lib/cli-helper/clientPluginLibrary";

function fixture(t: TestContext) {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "omni-plugin-library-")));
  const variables = {
    DATA_DIR: path.join(root, "data"),
    CODEX_HOME: path.join(root, "codex"),
    KIMI_CODE_HOME: path.join(root, "kimi"),
    CODEBUDDY_CONFIG_DIR: path.join(root, "codebuddy"),
    HERMES_HOME: path.join(root, "hermes"),
    PATH: root,
  };
  const original = new Map(Object.keys(variables).map((name) => [name, process.env[name]]));
  Object.assign(process.env, variables);
  const kimi = path.join(variables.KIMI_CODE_HOME, "plugins");
  fs.mkdirSync(kimi, { recursive: true });
  fs.mkdirSync(variables.CODEX_HOME);
  fs.mkdirSync(variables.CODEBUDDY_CONFIG_DIR);
  fs.mkdirSync(variables.HERMES_HOME);
  const installed = path.join(kimi, "installed.json");
  const codex = path.join(variables.CODEX_HOME, "config.toml");
  const codebuddy = path.join(variables.CODEBUDDY_CONFIG_DIR, "settings.json");
  fs.writeFileSync(
    installed,
    JSON.stringify({
      version: 1,
      plugins: [{ id: "same-plugin", enabled: false, token: "private-fixture" }],
      unrelated: true,
    })
  );
  fs.writeFileSync(codex, '[plugins."same-plugin"]\nenabled = false # retained\n');
  fs.writeFileSync(codebuddy, '{"enabledPlugins":{"same-plugin":false}}');
  t.after(() => {
    for (const [key, value] of original) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    fs.rmSync(root, { recursive: true, force: true });
  });
  return { kimi, installed, codex, data: variables.DATA_DIR };
}

test("imports equal native names independently and updates only the selected client", async (t) => {
  const { installed, codex, data } = fixture(t);
  const listed = await getClientPluginLibrary();
  const items = listed.items.filter((item) => item.name === "same-plugin");
  assert.equal(items.length, 3);
  assert.equal(new Set(items.map((item) => item.id)).size, 3);
  const kimi = items.find((item) => item.sourceClient === "kimi-code")!;
  const codexItem = items.find((item) => item.sourceClient === "codex")!;
  assert.equal(kimi.managed, false);
  const imported = await changeClientPluginLibrary({
    action: "import",
    ids: [kimi.id, codexItem.id],
  });
  assert.deepEqual(
    imported.results.map((result) => result.ok),
    [true, true]
  );
  assert(imported.items.find((item) => item.id === kimi.id)?.managed);
  assert(
    !fs
      .readFileSync(path.join(data, "client-plugin-library.json"), "utf8")
      .includes("private-fixture")
  );
  const toggled = await changeClientPluginLibrary({
    action: "enable",
    ids: [kimi.id, codexItem.id],
    client: "kimi-code",
  });
  assert.deepEqual(
    toggled.results.map((result) => result.ok),
    [true, false]
  );
  assert(toggled.items.find((item) => item.id === kimi.id)?.clients["kimi-code"]?.enabled);
  assert.equal(JSON.parse(fs.readFileSync(installed, "utf8")).plugins[0].token, "private-fixture");
  assert.match(fs.readFileSync(codex, "utf8"), /enabled = false # retained/);
  assert(!JSON.stringify(toggled).includes("private-fixture"));
});

test("uninstalls a selected Kimi registry record without deleting its bundle", async (t) => {
  const { installed, kimi } = fixture(t);
  const bundle = path.join(kimi, "managed", "same-plugin");
  fs.mkdirSync(bundle, { recursive: true });
  fs.writeFileSync(path.join(bundle, "plugin.json"), "{}");
  const { items } = await getClientPluginLibrary();
  const item = items.find((item) => item.sourceClient === "kimi-code")!;
  const previous = fs.readFileSync(installed, "utf8");
  const denied = await changeClientPluginLibrary({ action: "uninstall", ids: [item.id] });
  assert.equal(denied.results[0].ok, false);
  assert.equal(fs.readFileSync(installed, "utf8"), previous);
  await changeClientPluginLibrary({ action: "import", ids: [item.id] });
  const removed = await changeClientPluginLibrary({ action: "uninstall", ids: [item.id] });
  assert.equal(removed.results[0].ok, true);
  assert.deepEqual(JSON.parse(fs.readFileSync(installed, "utf8")), {
    version: 1,
    plugins: [],
    unrelated: true,
  });
  assert.equal(fs.readFileSync(path.join(bundle, "plugin.json"), "utf8"), "{}");
});

test("the plugin library route enforces local authentication and verifies the saved mutation", async (t) => {
  fixture(t);
  const jwt = process.env.JWT_SECRET;
  const { GET, POST } = await import("@/app/api/local/client-plugin-library/route");
  const core = await import("@/lib/db/core");
  const { makeManagementSessionRequest } = await import("../../helpers/managementSession.ts");
  const url = "http://127.0.0.1:20128/api/local/client-plugin-library";
  const origin = "http://127.0.0.1:20128";
  try {
    assert.equal((await GET(new Request(url))).status, 401);
    assert.equal(
      (
        await GET(
          await makeManagementSessionRequest(url, {
            headers: { origin: "https://external.example" },
          })
        )
      ).status,
      403
    );
    const list = await GET(await makeManagementSessionRequest(url, { headers: { origin } }));
    assert.equal(list.status, 200);
    assert.equal(list.headers.get("cache-control"), "no-store");
    const data = (await list.json()) as Awaited<ReturnType<typeof getClientPluginLibrary>>;
    const item = data.items.find((plugin) => plugin.sourceClient === "codex")!;
    const send = async (body: Record<string, unknown>) =>
      POST(await makeManagementSessionRequest(url, { headers: { origin }, method: "POST", body }));
    assert.equal(
      (await send({ action: "import", ids: [item.id], path: "../../secret" })).status,
      400
    );
    const response = await send({ action: "import", ids: [item.id] });
    assert.equal(response.status, 200);
    const saved = (await response.json()) as Awaited<ReturnType<typeof changeClientPluginLibrary>>;
    assert.deepEqual(saved.results, [{ id: item.id, ok: true }]);
    assert(saved.items.find((plugin) => plugin.id === item.id)?.managed);
    const unsupported = await send({ action: "update", ids: [item.id] });
    const updateResult = (await unsupported.json()) as typeof saved;
    assert.equal(updateResult.results[0].ok, false);
    assert(updateResult.results[0].error);
  } finally {
    core.resetDbInstance();
    if (jwt === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = jwt;
  }
});

test("Codex removal uses the exact local ID and leaves the official login fixture alone", async (t) => {
  const { uninstallCodexPlugin } = await import("@/lib/cli-helper/clientExtensions");
  const { codex } = fixture(t);
  const home = path.dirname(codex);
  const cache = path.join(home, "plugins", "cache", "local-market", "sample");
  const auth = path.join(home, "auth.json");
  const unrelated = 'model = "fixture"\n';
  fs.mkdirSync(path.join(cache, "local"), { recursive: true });
  fs.writeFileSync(auth, "official login fixture");
  fs.writeFileSync(codex, unrelated + '[plugins."sample@local-market"]\nenabled = false\n');
  let calls = 0;
  await assert.rejects(
    uninstallCodexPlugin("sample@openai-curated-remote", async () => {
      calls++;
      return { stdout: "{}" };
    })
  );
  assert.equal(calls, 0);
  await assert.rejects(
    uninstallCodexPlugin("sample@local-market", async () => ({
      stdout: JSON.stringify({ pluginId: "sample@local-market" }),
    })),
    /Could not verify/
  );
  await uninstallCodexPlugin("sample@local-market", async (client, args, cwd) => {
    calls++;
    assert.equal(client, "codex");
    assert.equal(cwd, home);
    assert.deepEqual(args, [
      "plugin",
      "remove",
      "sample@local-market",
      "--json",
      "-c",
      'cli_auth_credentials_store="ephemeral"',
    ]);
    fs.rmSync(cache, { recursive: true });
    fs.writeFileSync(codex, unrelated);
    return { stdout: JSON.stringify({ pluginId: "sample@local-market" }) };
  });
  assert.equal(calls, 1);
  assert.equal(fs.readFileSync(codex, "utf8"), unrelated);
  assert.equal(fs.readFileSync(auth, "utf8"), "official login fixture");
});

test("Hermes verifies a named tracked update and rejects pinned candidates without updating", async (t) => {
  const { updateHermesPlugin } = await import("@/lib/cli-helper/clientExtensions");
  fixture(t);
  const home = process.env.HERMES_HOME!;
  const plugins = path.join(home, "plugins");
  fs.mkdirSync(path.join(plugins, "sample"), { recursive: true });
  const metadata = path.join(plugins, ".install-metadata.json");
  const row = {
    source: "https://example.invalid/catalog/sample",
    revision: "a".repeat(40),
    pinned: false,
  };
  fs.writeFileSync(metadata, JSON.stringify({ sample: row }));
  let updates = 0;
  const execute = async (client: string, args: string[], cwd: string) => {
    assert.equal(client, "hermes");
    assert.equal(cwd, home);
    if (args[1] === "list") {
      assert.deepEqual(args, ["plugins", "list", "--json"]);
      return { stdout: JSON.stringify([{ name: "sample", source: "user", status: "disabled" }]) };
    }
    assert.deepEqual(args, ["plugins", "update", "sample"]);
    updates++;
    fs.writeFileSync(metadata, JSON.stringify({ sample: { ...row, revision: "b".repeat(40) } }));
    return { stdout: "Updated." };
  };
  await updateHermesPlugin("sample", execute);
  assert.equal(updates, 1);
  fs.writeFileSync(metadata, JSON.stringify({ sample: { ...row, pinned: true } }));
  await assert.rejects(updateHermesPlugin("sample", execute), /unpinned/);
  assert.equal(updates, 1);
});
