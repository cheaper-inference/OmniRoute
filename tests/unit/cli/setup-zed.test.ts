import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import os from "node:os";
import { parse } from "jsonc-parser";
import {
  ZED_PROVIDER_ID,
  ZED_MODEL_CAP,
  ZED_DEFAULT_CONTEXT,
  resolveZedSettingsPath,
  pickZedModels,
  zedModelEntry,
  buildZedProvider,
  parseZedSettings,
  mergeZedSettings,
  removeZedProvider,
  runSetupZedCommand,
} from "../../../bin/cli/commands/setup-zed.mjs";

const BASE = "http://gw.test:20128/v1";

// The command prints progress with console.log. node:test streams each file's
// report over fd 1, so stray stdout writes can corrupt it — silence them here.
const originalConsole = { log: console.log, info: console.info, warn: console.warn };
before(() => {
  console.log = console.info = console.warn = () => {};
});
after(() => {
  Object.assign(console, originalConsole);
});

type ZedModel = Record<string, unknown>;
type ZedSettings = {
  theme?: string;
  language_models?: {
    openai_compatible?: Record<
      string,
      { api_url: string; available_models: ZedModel[]; api_key?: string }
    >;
  } & Record<string, unknown>;
} & Record<string, unknown>;

function parsed(text: string): ZedSettings {
  return parse(text, [], { allowTrailingComma: true }) as ZedSettings;
}

test("provider id is omniroute so Zed reads the key from OMNIROUTE_API_KEY", () => {
  assert.equal(ZED_PROVIDER_ID, "omniroute");
  assert.equal(ZED_MODEL_CAP, 25);
  assert.equal(ZED_DEFAULT_CONTEXT, 200000);
});

test("resolveZedSettingsPath honours XDG_CONFIG_HOME, ~/.config and Windows APPDATA", () => {
  assert.equal(
    resolveZedSettingsPath({ env: { XDG_CONFIG_HOME: "/x" }, platform: "linux", homedir: "/h" }),
    join("/x", "zed", "settings.json")
  );
  assert.equal(
    resolveZedSettingsPath({ env: {}, platform: "darwin", homedir: "/h" }),
    join("/h", ".config", "zed", "settings.json")
  );
  assert.equal(
    resolveZedSettingsPath({ env: { APPDATA: "C:/AppData" }, platform: "win32", homedir: "/h" }),
    join("C:/AppData", "Zed", "settings.json")
  );
});

test("pickZedModels puts combos first and drops non-chat and tool-less models", () => {
  const picked = pickZedModels([
    { id: "kr/claude-sonnet-4.5", owned_by: "kr", capabilities: { tool_calling: true } },
    { id: "my-stack", owned_by: "combo" },
    { id: "no-tools", owned_by: "glm", capabilities: { tool_calling: false } },
    { id: "no-tools-legacy", owned_by: "glm", capabilities: { tools: false } },
    { id: "web/search", owned_by: "or", kind: "webSearch" },
    { id: "openai/tts-1", owned_by: "openai", type: "audio" },
    { id: "openai/text-embedding-3", owned_by: "openai", type: "embedding" },
    { id: "plain", owned_by: "x" },
    { owned_by: "x" },
  ]);
  assert.deepEqual(
    picked.map((m: ZedModel) => m.id),
    ["my-stack", "kr/claude-sonnet-4.5", "plain"]
  );
});

test("pickZedModels caps the list at 25", () => {
  const models = Array.from({ length: 40 }, (_, i) => ({ id: `m${i}`, owned_by: "p" }));
  assert.equal(pickZedModels(models).length, 25);
});

test("zedModelEntry maps context_length and the output limit, defaulting the context", () => {
  assert.deepEqual(zedModelEntry({ id: "a", context_length: 128000 }), {
    name: "a",
    display_name: "a",
    max_tokens: 128000,
  });
  assert.deepEqual(zedModelEntry({ id: "b", context_length: 200000, max_output_tokens: 64000 }), {
    name: "b",
    display_name: "b",
    max_tokens: 200000,
    max_output_tokens: 64000,
  });
  assert.equal(zedModelEntry({ id: "c", max_completion_tokens: 8192 }).max_output_tokens, 8192);
  assert.equal(zedModelEntry({ id: "d" }).max_tokens, 200000);
});

test("buildZedProvider writes api_url and models but never an api_key", () => {
  const p = buildZedProvider([{ id: "x" }], BASE);
  assert.equal(p.api_url, BASE);
  assert.deepEqual(p.available_models, [{ name: "x", display_name: "x", max_tokens: 200000 }]);
  assert.equal("api_key" in p, false);
});

test("mergeZedSettings adds our provider and keeps unrelated keys and other providers", () => {
  const existing = JSON.stringify({
    theme: "One Dark",
    language_models: { openai_compatible: { other: { api_url: "http://x/v1" } } },
  });
  const provider = buildZedProvider([{ id: "m1" }], BASE);
  const out = parsed(mergeZedSettings(existing, provider));
  assert.equal(out.theme, "One Dark");
  assert.equal(out.language_models?.openai_compatible?.other.api_url, "http://x/v1");
  assert.equal(out.language_models?.openai_compatible?.omniroute.api_url, BASE);
  assert.equal(out.language_models?.openai_compatible?.omniroute.available_models.length, 1);
});

test("mergeZedSettings never writes the API key into settings.json", () => {
  const provider = buildZedProvider([{ id: "m1" }], BASE);
  const out = mergeZedSettings("", provider);
  assert.equal(out.includes("sk-secret"), false);
  assert.equal(out.includes("api_key"), false);
  assert.equal(out.endsWith("\n"), true);
});

test("mergeZedSettings accepts JSONC (comments + trailing commas) and keeps the comments", () => {
  const jsonc = `// Zed settings\n{\n  // my theme\n  "theme": "One Light",\n  "vim_mode": true,\n}\n`;
  const out = mergeZedSettings(jsonc, buildZedProvider([{ id: "m1" }], BASE));
  assert.ok(out.includes("// my theme"), "comments survive the edit");
  const cfg = parsed(out);
  assert.equal(cfg.theme, "One Light");
  assert.equal(cfg.vim_mode, true);
  assert.equal(cfg.language_models?.openai_compatible?.omniroute.api_url, BASE);
});

test("parseZedSettings throws on invalid JSON instead of returning an empty object", () => {
  assert.throws(() => parseZedSettings('{ "theme": "x", '), /settings\.json/);
  assert.throws(() => parseZedSettings("[1, 2]"), /settings\.json/);
  assert.deepEqual(parseZedSettings(""), {});
  assert.deepEqual(parseZedSettings("  // only a comment\n"), {});
});

test("removeZedProvider removes only our entry and prunes empty parents", () => {
  const withOther = JSON.stringify({
    theme: "t",
    language_models: {
      openai_compatible: { other: { api_url: "http://x/v1" }, omniroute: { api_url: BASE } },
    },
  });
  const kept = parsed(removeZedProvider(withOther));
  assert.equal(kept.language_models?.openai_compatible?.omniroute, undefined);
  assert.equal(kept.language_models?.openai_compatible?.other.api_url, "http://x/v1");

  const onlyOurs = JSON.stringify({
    theme: "t",
    language_models: { openai_compatible: { omniroute: { api_url: BASE } } },
  });
  const pruned = parsed(removeZedProvider(onlyOurs));
  assert.equal(pruned.theme, "t");
  assert.equal("language_models" in pruned, false);

  const siblingKey = JSON.stringify({
    language_models: { anthropic: { version: "1" }, openai_compatible: { omniroute: {} } },
  });
  const partial = parsed(removeZedProvider(siblingKey));
  assert.equal("openai_compatible" in (partial.language_models || {}), false);
  assert.deepEqual(partial.language_models?.anthropic, { version: "1" });
});

// ── runSetupZedCommand: end-to-end against a temp settings file ──────────────
// Never touches the real Zed config: every run passes an explicit --config-path
// inside a temp dir, and fetch is stubbed.

function withTempSettings(fn: (file: string) => Promise<void>) {
  return async () => {
    const dir = mkdtempSync(join(os.tmpdir(), "omniroute-zed-"));
    try {
      await fn(join(dir, "zed", "settings.json"));
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  };
}

function stubModels(data: ZedModel[]) {
  const original = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ object: "list", data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })) as typeof fetch;
  return () => {
    globalThis.fetch = original;
  };
}

test(
  "runSetupZedCommand writes the provider and --reset removes it",
  withTempSettings(async (file) => {
    const restore = stubModels([
      { id: "combo-a", owned_by: "combo", context_length: 100000 },
      { id: "openai/gpt-x", owned_by: "openai" },
    ]);
    try {
      const opts = {
        remote: "http://gw.test:20128",
        apiKey: "sk-secret",
        configPath: file,
        allowContainerWrite: true,
      };
      assert.equal(await runSetupZedCommand(opts), 0);
      const text = readFileSync(file, "utf8");
      assert.equal(text.includes("sk-secret"), false);
      const cfg = parsed(text);
      const p = cfg.language_models?.openai_compatible?.omniroute;
      assert.equal(p?.api_url, BASE);
      assert.deepEqual(
        p?.available_models.map((m) => m.name),
        ["combo-a", "openai/gpt-x"]
      );

      assert.equal(await runSetupZedCommand({ ...opts, reset: true }), 0);
      assert.equal("language_models" in parsed(readFileSync(file, "utf8")), false);
    } finally {
      restore();
    }
  })
);

test(
  "runSetupZedCommand refuses to overwrite an unparseable settings.json",
  withTempSettings(async (file) => {
    mkdirSync(join(file, ".."), { recursive: true });
    const broken = '{ "theme": "x", ';
    writeFileSync(file, broken);
    const restore = stubModels([{ id: "m1", owned_by: "p" }]);
    try {
      const code = await runSetupZedCommand({
        remote: "http://gw.test:20128",
        configPath: file,
        allowContainerWrite: true,
      });
      assert.equal(code, 1);
      assert.equal(readFileSync(file, "utf8"), broken);
    } finally {
      restore();
    }
  })
);

test(
  "runSetupZedCommand --dry-run writes nothing",
  withTempSettings(async (file) => {
    const restore = stubModels([{ id: "m1", owned_by: "p" }]);
    try {
      const code = await runSetupZedCommand({
        remote: "http://gw.test:20128",
        configPath: file,
        dryRun: true,
      });
      assert.equal(code, 0);
      assert.equal(existsSync(file), false);
    } finally {
      restore();
    }
  })
);
