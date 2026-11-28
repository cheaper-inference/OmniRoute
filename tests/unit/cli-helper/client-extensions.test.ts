import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import {
  getClientExtensions,
  installClientSkill,
  updateClientPlugin,
} from "@/lib/cli-helper/clientExtensions";

test("lists Kimi Code skills and native plugin state from the selected homes", async (t) => {
  const home = mkdtempSync(path.join(os.tmpdir(), "omni-extension-test-"));
  const client = path.join(home, ".kimi-code");
  t.mock.method(os, "homedir", () => home);
  const previous = process.env.KIMI_CODE_HOME;
  process.env.KIMI_CODE_HOME = client;
  t.after(() => {
    if (previous === undefined) delete process.env.KIMI_CODE_HOME;
    else process.env.KIMI_CODE_HOME = previous;
    rmSync(home, { recursive: true, force: true });
  });
  for (const [root, skill] of [
    [client, "client-skill"],
    [path.join(home, ".agents"), "shared-skill"],
  ]) {
    const dir = path.join(root, "skills", skill);
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, "SKILL.md"), "test");
  }
  mkdirSync(path.join(client, "plugins"));
  writeFileSync(
    path.join(client, "plugins", "installed.json"),
    JSON.stringify({
      version: 1,
      plugins: [{ id: "my-plugin", enabled: false, token: "not view data" }],
    })
  );
  const result = await getClientExtensions("kimi-code");
  assert.deepEqual(result.skills, [
    { name: "client-skill", source: "client" },
    { name: "shared-skill", source: "shared", installable: true },
  ]);
  assert.deepEqual(result.plugins, [{ name: "my-plugin", enabled: false, canToggle: true }]);
  assert.equal(result.capabilities.togglePlugin, true);
  const changed = await updateClientPlugin({
    client: "kimi-code",
    name: "my-plugin",
    enabled: true,
  });
  assert.equal(changed?.plugins[0].enabled, true);
  assert.match(
    readFileSync(path.join(client, "plugins", "installed.json"), "utf8"),
    /not view data/
  );
  assert.equal(
    (await updateClientPlugin({ client: "kimi-code", name: "my-plugin", enabled: false }))
      ?.plugins[0].enabled,
    false
  );
  const installed = await installClientSkill({ client: "kimi-code", name: "shared-skill" });
  assert(
    installed.skills.some((skill) => skill.name === "shared-skill" && skill.source === "client")
  );
  const installedFile = path.join(client, "skills", "shared-skill", "SKILL.md");
  assert.equal(readFileSync(installedFile, "utf8"), "test");
  await assert.rejects(installClientSkill({ client: "kimi-code", name: "shared-skill" }));
  assert.equal(readFileSync(installedFile, "utf8"), "test");
});

test("updates only the selected Codex or CodeBuddy plugin preference", async (t) => {
  const dir = mkdtempSync(path.join(os.tmpdir(), "omni-extension-preference-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const fixtures = [
    {
      client: "codex" as const,
      variable: "CODEX_HOME",
      name: "config.toml",
      content: '[plugins."my-plugin@test"]\nenabled = false # keep\n[other]\nsecret = "fixture"\n',
    },
    {
      client: "codebuddy" as const,
      variable: "CODEBUDDY_CONFIG_DIR",
      name: "settings.json",
      content:
        '{\n  // keep\n  "enabledPlugins": {"my-plugin@test": false},\n  "other": "fixture"\n}\n',
    },
  ];
  for (const { client, variable, name, content } of fixtures) {
    const before = process.env[variable];
    process.env[variable] = dir;
    t.after(() => {
      if (before === undefined) delete process.env[variable];
      else process.env[variable] = before;
    });
    const file = path.join(dir, name);
    writeFileSync(file, content);
    assert.equal(
      (await updateClientPlugin({ client, name: "my-plugin@test", enabled: true }))?.plugins[0]
        .enabled,
      true
    );
    assert.match(readFileSync(file, "utf8"), /keep/);
    assert.equal(
      (await updateClientPlugin({ client, name: "my-plugin@test", enabled: false }))?.plugins[0]
        .enabled,
      false
    );
  }
});
