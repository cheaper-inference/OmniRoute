import { test } from "node:test";
import assert from "node:assert/strict";

import {
  buildClaudeCodeEnv,
  buildClaudeDiscoverySettingsSnippet,
  formatClaudeSettingsJson,
  modelSupportsLongContext,
  planClaudeCodeModels,
} from "../../src/shared/services/claudeCliConfig.ts";

const SONNET = "qtSd/team/claude/claude-sonnet-5";
const OPUS = "qtSd/team/claude/claude-opus-4-8";
const HAIKU = "qtSd/team/claude/claude-haiku-4-5-20251001";
const CODEX = "qtSd/team/codex/gpt-5.5";
const MODELS = [HAIKU, CODEX, OPUS, SONNET];

const SETTINGS_OFF = `{
  "env": {
    "ANTHROPIC_BASE_URL": "https://gw.example.net",
    "ANTHROPIC_AUTH_TOKEN": "<your API key>",
    "ANTHROPIC_MODEL": "qtSd/team/claude/claude-sonnet-5",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "qtSd/team/claude/claude-opus-4-8",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "qtSd/team/claude/claude-sonnet-5",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "qtSd/team/claude/claude-haiku-4-5-20251001",
    "CLAUDE_CODE_AUTO_COMPACT_WINDOW": "190000"
  }
}`;

const SETTINGS_ON = `{
  "env": {
    "ANTHROPIC_BASE_URL": "https://gw.example.net",
    "ANTHROPIC_AUTH_TOKEN": "<your API key>",
    "ANTHROPIC_MODEL": "qtSd/team/claude/claude-sonnet-5[1m]",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "qtSd/team/claude/claude-opus-4-8[1m]",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "qtSd/team/claude/claude-sonnet-5[1m]",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "qtSd/team/claude/claude-haiku-4-5-20251001"
  }
}`;

const plan = planClaudeCodeModels("claude", MODELS);
const base = {
  baseUrl: "https://gw.example.net",
  authToken: "<your API key>",
  plan,
  mainModel: null,
};

test("keeps the provider's quota-share models, highest model first, without duplicates", () => {
  const ids = [
    ...MODELS,
    "qtSd/alpha/anthropic/claude-sonnet-5",
    "claude-sonnet-5",
    SONNET,
    "qtSd/team/claude/claude-opus-4-7",
  ];
  assert.deepEqual(planClaudeCodeModels("claude", ids).models, [
    "qtSd/alpha/anthropic/claude-sonnet-5",
    SONNET,
    OPUS,
    "qtSd/team/claude/claude-opus-4-7",
    HAIKU,
  ]);
  assert.deepEqual(planClaudeCodeModels("anthropic", MODELS).models, [SONNET, OPUS, HAIKU]);
});

test("another provider sees only its own models and no tier", () => {
  assert.deepEqual(planClaudeCodeModels("codex", MODELS), {
    models: [CODEX],
    main: CODEX,
    tiers: { opus: null, sonnet: null, haiku: null, fable: null },
  });
});

test("the default plan picks sonnet as the main model and fills the tiers it finds", () => {
  assert.deepEqual(plan, {
    models: [SONNET, OPUS, HAIKU],
    main: SONNET,
    tiers: { opus: OPUS, sonnet: SONNET, haiku: HAIKU, fable: null },
  });
});

test("a tier is a whole word of the model segment, never of the group or of a longer word", () => {
  const ids = [
    "qtSd/sonnetteam/codex/gpt-5.5",
    "qtSd/team/codex/sonnetx-1",
    "qtSd/team/codex/kimi-opus.2",
  ];
  const tiers = planClaudeCodeModels("codex", ids).tiers;
  assert.equal(tiers.sonnet, null);
  assert.equal(tiers.opus, "qtSd/team/codex/kimi-opus.2");
  assert.equal(
    planClaudeCodeModels("claude", ["qtSd/t/claude/claude-3-5-sonnet-20241022"]).tiers.sonnet,
    "qtSd/t/claude/claude-3-5-sonnet-20241022"
  );
});

test("an empty list plans nothing", () => {
  assert.deepEqual(planClaudeCodeModels("claude", []), {
    models: [],
    main: null,
    tiers: { opus: null, sonnet: null, haiku: null, fable: null },
  });
});

test("long context follows the gateway's own list, for the claude family only", () => {
  assert.equal(modelSupportsLongContext(SONNET), true);
  assert.equal(modelSupportsLongContext("qtSd/t/anthropic/claude-opus-4-8"), true);
  assert.equal(modelSupportsLongContext(HAIKU), false);
  assert.equal(modelSupportsLongContext("qtSd/team/codex/claude-sonnet-5"), false);
  assert.equal(modelSupportsLongContext("qtSd/team/claude/my-sonnet-tuned"), false);
  assert.equal(modelSupportsLongContext("claude-sonnet-5"), false);
});

test("pinned settings with long context off", () => {
  assert.equal(
    formatClaudeSettingsJson(buildClaudeCodeEnv({ ...base, longContext: false })),
    SETTINGS_OFF
  );
});

test("long context marks only the models that support it and leaves out the compact window", () => {
  assert.equal(
    formatClaudeSettingsJson(buildClaudeCodeEnv({ ...base, longContext: true })),
    SETTINGS_ON
  );
});

test("a chosen main model replaces the default and an unknown one falls back", () => {
  assert.equal(
    buildClaudeCodeEnv({ ...base, mainModel: HAIKU, longContext: true }).ANTHROPIC_MODEL,
    HAIKU
  );
  assert.equal(
    buildClaudeCodeEnv({ ...base, mainModel: HAIKU, longContext: true })
      .CLAUDE_CODE_AUTO_COMPACT_WINDOW,
    "190000"
  );
  assert.equal(
    buildClaudeCodeEnv({ ...base, mainModel: CODEX, longContext: false }).ANTHROPIC_MODEL,
    SONNET
  );
});

test("without models the settings are the dashboard's discovery fragment", () => {
  const empty = planClaudeCodeModels("claude", [CODEX]);
  const json = formatClaudeSettingsJson(
    buildClaudeCodeEnv({
      ...base,
      baseUrl: "https://gw.example.net/",
      plan: empty,
      longContext: true,
    })
  );
  assert.equal(
    json,
    buildClaudeDiscoverySettingsSnippet({
      baseUrl: "https://gw.example.net",
      apiKeyPlaceholder: "<your API key>",
    })
  );
});

test("a key with quotes and backslashes stays valid JSON", () => {
  const authToken = "sk-a\"b\\c'd";
  const json = formatClaudeSettingsJson(
    buildClaudeCodeEnv({ ...base, authToken, longContext: false })
  );
  assert.equal(JSON.parse(json).env.ANTHROPIC_AUTH_TOKEN, authToken);
});
