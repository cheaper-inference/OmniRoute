import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import http from "node:http";
import os from "node:os";
import path from "node:path";

const {
  listConfigureTargets,
  profileNameFromModel,
  resolveConfigureTargetOptions,
  rankPreferredModels,
  getModelPreferenceState,
  parseOmpRoleAnswer,
  buildConfigureSetupOpts,
  runConfigureCommand,
} = await import("../../../bin/cli/commands/configure.mjs");

test("configure picker exposes setup-backed CLI targets (manifest declaration order)", () => {
  assert.deepEqual(listConfigureTargets(), [
    "aider",
    "claude",
    "cline",
    "codex",
    "continue",
    "gemini",
    "goose",
    "kilo",
    "omp",
    "opencode",
    "qwen",
    "5dive",
    "whycodes",
  ]);
});

test("configure picker derives stable profile names from provider/model ids", () => {
  assert.equal(profileNameFromModel("glm/glm-5.2"), "glm52");
  assert.equal(profileNameFromModel("claude-sonnet-4.6"), "claudesonnet46");
});

test("configure picker materializes explicit remote/base-url targets", () => {
  assert.deepEqual(
    resolveConfigureTargetOptions({
      baseUrl: "https://relay.example.test/v1",
      apiKey: "sk_test",
      port: "2999",
    }),
    {
      baseUrl: "https://relay.example.test/v1",
      remote: "https://relay.example.test/v1",
      apiKey: "sk_test",
      port: "2999",
    }
  );
});

test("configure picker copies --remote onto baseUrl so apiFetch hits the same host", () => {
  assert.deepEqual(
    resolveConfigureTargetOptions({
      remote: "http://192.168.0.15:20128/",
      apiKey: "sk_test",
    }),
    {
      remote: "http://192.168.0.15:20128",
      apiKey: "sk_test",
      baseUrl: "http://192.168.0.15:20128",
    }
  );
});

const OMP_CATALOG = [{ id: "glm/glm-5.2" }, { id: "qwen/qwen3-vl" }, { id: "auto/coding:max" }];

test("parseOmpRoleAnswer: Enter aliases @default, skip/s unset, id[:thinking] assigns", () => {
  assert.deepEqual(parseOmpRoleAnswer("", OMP_CATALOG), { kind: "alias", flag: "@default" });
  assert.deepEqual(parseOmpRoleAnswer("skip", OMP_CATALOG), { kind: "skip" });
  assert.deepEqual(parseOmpRoleAnswer("S", OMP_CATALOG), { kind: "skip" });
  assert.deepEqual(parseOmpRoleAnswer("@smol", OMP_CATALOG), { kind: "alias", flag: "@smol" });
  assert.deepEqual(parseOmpRoleAnswer("glm/glm-5.2", OMP_CATALOG), {
    kind: "assign",
    flag: "glm/glm-5.2",
  });
  assert.deepEqual(parseOmpRoleAnswer("glm/glm-5.2:high", OMP_CATALOG), {
    kind: "assign",
    flag: "glm/glm-5.2:high",
  });
  // The writer re-adds the prefix, so an already-prefixed answer resolves too.
  assert.deepEqual(parseOmpRoleAnswer("omniroute/glm/glm-5.2", OMP_CATALOG), {
    kind: "assign",
    flag: "omniroute/glm/glm-5.2",
  });
});

test("parseOmpRoleAnswer: catalog match wins over thinking-suffix parsing", () => {
  // `auto/coding:max` is a real catalog id whose tail looks like a level.
  assert.deepEqual(parseOmpRoleAnswer("auto/coding:max", OMP_CATALOG), {
    kind: "assign",
    flag: "auto/coding:max",
  });
  assert.equal(parseOmpRoleAnswer("nope", OMP_CATALOG).kind, "invalid");
  assert.equal(parseOmpRoleAnswer("glm/glm-5.2:", OMP_CATALOG).kind, "invalid");
  assert.equal(parseOmpRoleAnswer("glm/glm-5.2:bogus", OMP_CATALOG).kind, "invalid");
});

test("buildConfigureSetupOpts forwards role[] and keeps omp yes:false", () => {
  const roles = ["smol=@default", "plan=glm/glm-5.2:high"];
  const omp = buildConfigureSetupOpts({
    requestOpts: { remote: "http://vps:20128" },
    opts: { yes: false },
    chosenId: "glm/glm-5.2",
    ompRoleFlags: roles,
    target: "omp",
  });
  assert.equal(omp.yes, false);
  assert.deepEqual(omp.role, roles);
  assert.equal(omp.model, "glm/glm-5.2");
  assert.equal("only" in omp, false);

  const claude = buildConfigureSetupOpts({
    requestOpts: {},
    opts: { yes: false },
    chosenId: "glm/glm-5.2",
    ompRoleFlags: [],
    target: "claude",
  });
  assert.equal(claude.yes, true);
  assert.equal("role" in claude, false);
  assert.equal(claude.only, "glm/glm-5.2");
});

test("configure picker ranks favorites and recent model ids without leaking context data", () => {
  const ranked = rankPreferredModels("codex", ["glm/slow", "glm/fast", "qwen/recent"], {
    version: 1,
    contexts: {},
    targets: { codex: { favorites: ["glm/fast"], recent: ["qwen/recent"] } },
  });
  assert.deepEqual(ranked, ["glm/fast", "qwen/recent", "glm/slow"]);
  assert.deepEqual(
    getModelPreferenceState("codex", {
      version: 1,
      contexts: {},
      targets: { codex: { favorites: ["glm/fast"], recent: ["qwen/recent"] } },
    }),
    { favorites: ["glm/fast"], recent: ["qwen/recent"] }
  );
});

test("configure picker keeps preferences isolated per remote context", () => {
  const preferences = {
    version: 1,
    targets: {},
    contexts: {
      local: { codex: { favorites: ["local/model"], recent: [] } },
      remote: { codex: { favorites: ["remote/model"], recent: [] } },
    },
  };
  assert.deepEqual(
    rankPreferredModels("codex", ["local/model", "remote/model"], preferences, "remote"),
    ["remote/model", "local/model"]
  );
  assert.deepEqual(getModelPreferenceState("codex", preferences, "local"), {
    favorites: ["local/model"],
    recent: [],
  });
});

test("configure codex writes a self-contained private TOML profile for the remote context", async () => {
  const codexHome = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-configure-codex-"));
  const server = http.createServer((request, response) => {
    assert.equal(request.url, "/v1/models");
    response.setHeader("content-type", "application/json");
    response.end(JSON.stringify({ data: [{ id: "glm/glm-5.2", context_length: 131072 }] }));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address === "object");
  const remote = `http://127.0.0.1:${address.port}`;

  try {
    assert.equal(
      await runConfigureCommand("codex", {
        model: "glm/glm-5.2",
        yes: true,
        remote,
        apiKey: "secret-must-not-be-persisted",
        codexHome,
        allowContainerWrite: true,
      }),
      0
    );
    const profilePath = path.join(codexHome, "glm52.config.toml");
    const [content, stat] = await Promise.all([
      fs.readFile(profilePath, "utf8"),
      fs.stat(profilePath),
    ]);
    assert.match(content, /model_provider\s+= "omniroute"/);
    assert.match(content, /\[model_providers\.omniroute\]/);
    assert.ok(content.includes(`base_url = "${remote}/v1"`));
    assert.match(content, /env_key\s+= "OMNIROUTE_API_KEY"/);
    assert.doesNotMatch(content, /secret-must-not-be-persisted/);
    assert.equal(stat.mode & 0o777, 0o600);
    await assert.rejects(fs.stat(path.join(codexHome, "config.yaml")), /ENOENT/);
  } finally {
    server.close();
    await fs.rm(codexHome, { recursive: true, force: true });
  }
});
