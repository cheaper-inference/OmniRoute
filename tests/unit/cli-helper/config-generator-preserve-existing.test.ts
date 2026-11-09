// The generic Apply path (generateConfig) must keep what the user already has in Claude, Cline,
// Kilo and Continue config files and change only the keys OmniRoute manages. Before, these four
// generators returned a fresh document and the writer replaced the file.
import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { parse as parseJsonc } from "jsonc-parser";
import { dump, load } from "js-yaml";

import { generateClaudeConfig } from "../../../src/lib/cli-helper/config-generator/claude.ts";
import { generateClineConfig } from "../../../src/lib/cli-helper/config-generator/cline.ts";
import { generateKilocodeConfig } from "../../../src/lib/cli-helper/config-generator/kilocode.ts";
import { generateContinueConfig } from "../../../src/lib/cli-helper/config-generator/continue.ts";

const dirs: string[] = [];
function tmp(name: string, content?: string): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gen-preserve-"));
  dirs.push(dir);
  const file = path.join(dir, name);
  if (content !== undefined) fs.writeFileSync(file, content, "utf8");
  return file;
}
after(() => {
  for (const dir of dirs) fs.rmSync(dir, { recursive: true, force: true });
});

const KEY = ["sk", "synthetic", "preserve", "test"].join("-");
const options = { baseUrl: "http://localhost:20128/v1", apiKey: KEY, model: "glm/glm-5.2" };

describe("generic config generators keep unrelated user config", () => {
  it("claude: keeps permissions, hooks, statusLine and unrelated env; replaces managed keys", async () => {
    const configPath = tmp(
      "settings.json",
      `{
  // user comment
  "permissions": { "allow": ["Bash(ls)"], },
  "hooks": { "PreToolUse": [] },
  "statusLine": { "type": "command", "command": "echo hi" },
  "env": { "MY_VAR": "1", "ANTHROPIC_BASE_URL": "https://old.example" }
}`
    );
    const content = await generateClaudeConfig({ ...options, configPath });
    const out = parseJsonc(content);
    assert.deepEqual(out.permissions, { allow: ["Bash(ls)"] });
    assert.deepEqual(out.hooks, { PreToolUse: [] });
    assert.equal(out.statusLine.command, "echo hi");
    assert.equal(out.env.MY_VAR, "1");
    assert.equal(out.env.ANTHROPIC_BASE_URL, "http://localhost:20128");
    assert.equal(out.env.ANTHROPIC_AUTH_TOKEN, KEY);
    assert.equal(out.model, "glm/glm-5.2");
    assert.match(content, /user comment/, "comments survive");
  });

  it("claude: with no existing file the output is the same fresh document as before", async () => {
    const configPath = tmp("missing.json");
    const out = JSON.parse(await generateClaudeConfig({ ...options, configPath }));
    assert.deepEqual(Object.keys(out).sort(), ["env", "model"]);
  });

  it("claude: an existing file that is not valid JSON aborts instead of being replaced", async () => {
    const configPath = tmp("settings.json", "{ not json");
    await assert.rejects(
      async () => generateClaudeConfig({ ...options, configPath }),
      /refusing to overwrite/i
    );
  });

  it("cline: keeps other globalState keys", async () => {
    const configPath = tmp("globalState.json", '{"apiProvider":"openai","taskHistory":[1,2]}');
    const out = JSON.parse(await generateClineConfig({ ...options, configPath }));
    assert.deepEqual(out.taskHistory, [1, 2]);
    assert.equal(out.apiProvider, "openai");
    assert.equal(out.openAiBaseUrl, "http://localhost:20128/v1");
    assert.equal(out.openAiApiKey, KEY);
  });

  it("kilo: keeps other settings keys", async () => {
    const configPath = tmp("settings.json", '{"theme":"dark"}');
    const out = JSON.parse(await generateKilocodeConfig({ ...options, configPath }));
    assert.equal(out.theme, "dark");
    assert.equal(out.baseUrl, "http://localhost:20128/v1");
    assert.equal(out.apiKey, KEY);
  });

  it("continue: keeps other keys and other models; replaces only the OmniRoute entry", async () => {
    const configPath = tmp(
      "config.yaml",
      dump({
        name: "my-config",
        models: [
          { title: "Other", provider: "ollama", model: "llama3" },
          { title: "OmniRoute", apiBase: "http://old/v1", apiKey: "old" },
        ],
      })
    );
    const out = load(await generateContinueConfig({ ...options, configPath })) as {
      name: string;
      models: Array<Record<string, string>>;
    };
    assert.equal(out.name, "my-config");
    assert.equal(out.models.length, 2);
    assert.equal(out.models[0].title, "Other");
    assert.equal(out.models[1].title, "OmniRoute");
    assert.equal(out.models[1].apiBase, "http://localhost:20128/v1");
    assert.equal(out.models[1].apiKey, KEY);
  });
});
