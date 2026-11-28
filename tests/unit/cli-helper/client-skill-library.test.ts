import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import {
  changeClientSkillLibrary,
  clientSkillLibraryChange,
  getClientSkillLibrary,
} from "../../../src/lib/cli-helper/clientSkillLibrary";

test("discovers, imports, syncs, updates and retires a skill without replacing the source", async (t) => {
  const home = fs.mkdtempSync(path.join(fs.realpathSync(os.tmpdir()), "omniroute-skills-test-"));
  let closeDatabase: (() => boolean) | undefined;
  t.after(() => {
    closeDatabase?.();
    fs.rmSync(home, { recursive: true, force: true });
  });
  const roots = {
    HOME: home,
    USERPROFILE: home,
    DATA_DIR: path.join(home, "data"),
    CODEX_HOME: path.join(home, "codex"),
    HERMES_HOME: path.join(home, "hermes"),
    KIMI_CODE_HOME: path.join(home, "kimi"),
    CODEBUDDY_CONFIG_DIR: path.join(home, "codebuddy"),
    JWT_SECRET: "fake-test-only-skill-library-session-key",
  };
  for (const [key, value] of Object.entries(roots)) {
    const previous = process.env[key];
    process.env[key] = value;
    t.after(() => {
      if (previous === undefined) delete process.env[key];
      else process.env[key] = previous;
    });
  }
  const source = path.join(roots.HERMES_HOME, "skills", "category", "example-folder", "SKILL.md");
  const client = path.join(roots.CODEX_HOME, "skills", "example", "SKILL.md");
  const original = "---\nname: example\ndescription: Example skill\n---\nFirst version";
  fs.mkdirSync(path.dirname(source), { recursive: true });
  fs.mkdirSync(path.join(roots.KIMI_CODE_HOME, "skills"), { recursive: true });
  fs.mkdirSync(path.join(home, ".agents", "skills", "shared-example"), { recursive: true });
  fs.writeFileSync(source, original);
  fs.writeFileSync(path.join(roots.KIMI_CODE_HOME, "skills", "flat.md"), "Flat skill instructions");
  fs.writeFileSync(
    path.join(home, ".agents", "skills", "shared-example", "SKILL.md"),
    "---\nname: shared-example\ndescription: Shared\n---\nShared instructions"
  );
  const items = getClientSkillLibrary().items;
  const example = items.find(({ name }) => name === "example")!;
  const flat = items.find(({ name }) => name === "flat")!;
  const shared = items.find(({ name }) => name === "shared-example")!;
  assert.equal(example.managed, false);
  assert.equal(example.clients.hermes.enabled, true);
  assert.equal(flat.sourceClient, "kimi-code");
  assert.equal(shared.clients.codex.canDisable, false);
  assert.equal(shared.clients["kimi-code"].enabled, true);
  assert.equal(
    clientSkillLibraryChange.safeParse({ action: "enable", ids: [example.id] }).success,
    false
  );

  const change = (action: "import" | "enable" | "disable" | "update" | "uninstall") =>
    changeClientSkillLibrary({ action, ids: [example.id], client: "codex" });

  const imported = changeClientSkillLibrary({
    action: "import",
    ids: [example.id, flat.id, "0".repeat(64)],
  });
  assert.deepEqual(
    imported.results.map(({ ok }) => ok),
    [true, true, false]
  );
  assert.equal(imported.items.find(({ id }) => id === flat.id)?.managed, true);
  assert.equal(imported.items.find(({ id }) => id === example.id)?.clients.codex.canEnable, true);
  assert.equal(imported.items.find(({ id }) => id === example.id)?.clients.hermes.canDisable, true);
  assert.equal(fs.readFileSync(source, "utf8"), original);

  const nativeChange = (action: "enable" | "disable") =>
    changeClientSkillLibrary({ action, ids: [example.id], client: "hermes" });
  const nativeOff = nativeChange("disable");
  assert.equal(nativeOff.results[0].ok, true);
  assert.equal(nativeOff.items.find(({ id }) => id === example.id)?.clients.hermes.enabled, false);
  assert.equal(fs.existsSync(source), false);
  fs.mkdirSync(path.dirname(source));
  fs.writeFileSync(source, "New unmanaged skill");
  assert.equal(nativeChange("enable").results[0].ok, false);
  assert.equal(fs.readFileSync(source, "utf8"), "New unmanaged skill");
  fs.rmSync(path.dirname(source), { recursive: true });
  assert.equal(nativeChange("enable").results[0].ok, true);
  assert.equal(fs.readFileSync(source, "utf8"), original);
  fs.writeFileSync(source, original + " edited");
  assert.equal(nativeChange("disable").results[0].ok, false);
  assert.equal(fs.readFileSync(source, "utf8"), original + " edited");
  fs.writeFileSync(source, original);

  for (const [client, nativeHome, skill] of [
    ["hermes", roots.HERMES_HOME, flat],
    ["codebuddy", roots.CODEBUDDY_CONFIG_DIR, flat],
    ["kimi-code", roots.KIMI_CODE_HOME, example],
  ] as const) {
    const enabled = changeClientSkillLibrary({ action: "enable", ids: [skill.id], client });
    assert.equal(enabled.results[0].ok, true);
    assert.equal(enabled.items.find(({ id }) => id === skill.id)?.clients[client].enabled, true);
    const installed = path.join(nativeHome, "skills", skill.name, "SKILL.md");
    assert.match(fs.readFileSync(installed, "utf8"), new RegExp(`name: ${skill.name}`));
    const disabled = changeClientSkillLibrary({ action: "disable", ids: [skill.id], client });
    assert.equal(disabled.results[0].ok, true);
    assert.equal(fs.existsSync(installed), false);
  }

  assert.deepEqual(change("enable").results, [{ id: example.id, ok: true }]);
  assert.equal(fs.readFileSync(client, "utf8"), original);
  assert.equal(change("enable").results[0].ok, true);
  const updated = original.replace("First", "Second");
  fs.writeFileSync(source, updated);
  const rename = fs.renameSync;
  const failPublish = t.mock.method(fs, "renameSync", (from, to) => {
    if (to === path.dirname(client) && String(from).includes("staging-"))
      throw new Error("Injected publication error");
    rename(from, to);
  });
  assert.equal(change("update").results[0].ok, false);
  failPublish.mock.restore();
  assert.equal(fs.readFileSync(client, "utf8"), original);
  assert.equal(
    fs.readFileSync(
      path.join(roots.DATA_DIR, "client-skill-library", example.id, "bundle", "SKILL.md"),
      "utf8"
    ),
    original
  );
  assert.equal(change("update").results[0].ok, true);
  assert.equal(fs.readFileSync(client, "utf8"), updated);
  fs.writeFileSync(client, "An operator changed this file");
  assert.equal(change("disable").results[0].ok, false);
  assert.equal(fs.readFileSync(client, "utf8"), "An operator changed this file");

  fs.writeFileSync(client, updated);
  assert.equal(change("disable").results[0].ok, true);
  assert.equal(fs.existsSync(client), false);
  fs.mkdirSync(path.dirname(client));
  fs.writeFileSync(client, "An unmanaged file");
  assert.equal(change("enable").results[0].ok, false);
  assert.equal(fs.readFileSync(client, "utf8"), "An unmanaged file");

  assert.equal(nativeChange("disable").results[0].ok, true);
  assert.equal(fs.existsSync(source), false);
  assert.equal(change("uninstall").results[0].ok, true);
  assert.equal(fs.readFileSync(source, "utf8"), updated);
  assert.equal(getClientSkillLibrary().items.find(({ id }) => id === example.id)?.managed, false);

  const { GET, POST } = await import("../../../src/app/api/local/client-skill-library/route");
  closeDatabase = (await import("../../../src/lib/db/core")).closeDbInstance;
  const { mintDashboardSessionToken } =
    await import("../../../src/shared/utils/dashboardSessionToken");
  const url = "http://localhost:20128/api/local/client-skill-library";
  const blocked = await GET(new Request(url, { headers: { origin: "https://example.test" } }));
  assert.equal(blocked.status, 403);
  const unsigned = await GET(new Request(url));
  assert.equal(unsigned.status, 401);
  const token = await mintDashboardSessionToken(new TextEncoder().encode(roots.JWT_SECRET));
  const headers = { cookie: `auth_token=${token}`, origin: new URL(url).origin };
  const response = await GET(new Request(url, { headers }));
  assert.equal(response.status, 200);
  const importedByRoute = await POST(
    new Request(url, {
      method: "POST",
      headers: { ...headers, "content-type": "application/json" },
      body: JSON.stringify({ action: "import", ids: [example.id] }),
    })
  );
  assert.equal(importedByRoute.status, 200);
  assert.deepEqual((await importedByRoute.json()).results, [{ id: example.id, ok: true }]);
});
