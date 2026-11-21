import { test } from "node:test";
import assert from "node:assert/strict";

import {
  deriveOnboardingState,
  onboardingTextFingerprint,
} from "../../src/app/quota/[provider]/lib/onboardingState.ts";

const SONNET = "qtSd/team/claude/claude-sonnet-5";
const OPUS = "qtSd/team/claude/claude-opus-4-8";
const HAIKU = "qtSd/team/claude/claude-haiku-4-5-20251001";
const CODEX = "qtSd/team/codex/gpt-5.5";
const MODELS = [HAIKU, CODEX, OPUS, SONNET];
const KEY = "sk-live-1234567890";

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

const EXPORTS_OFF = `export ANTHROPIC_BASE_URL='https://gw.example.net'
export ANTHROPIC_AUTH_TOKEN='<your API key>'
export ANTHROPIC_MODEL='qtSd/team/claude/claude-sonnet-5'
export ANTHROPIC_DEFAULT_OPUS_MODEL='qtSd/team/claude/claude-opus-4-8'
export ANTHROPIC_DEFAULT_SONNET_MODEL='qtSd/team/claude/claude-sonnet-5'
export ANTHROPIC_DEFAULT_HAIKU_MODEL='qtSd/team/claude/claude-haiku-4-5-20251001'
export CLAUDE_CODE_AUTO_COMPACT_WINDOW='190000'`;

const DISCOVERY = `{
  "env": {
    "ANTHROPIC_BASE_URL": "<base>",
    "ANTHROPIC_AUTH_TOKEN": "<your API key>",
    "CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY": "1"
  }
}`;

const DESKTOP_MODELS_ON = `{
  "inferenceModels": [
    {
      "name": "qtSd/team/claude/claude-sonnet-5",
      "supports1m": true
    },
    {
      "name": "qtSd/team/claude/claude-opus-4-8",
      "supports1m": true
    },
    {
      "name": "qtSd/team/claude/claude-haiku-4-5-20251001"
    }
  ]
}`;

const texts = { keyPlaceholder: "<your API key>", baseUrlPlaceholder: "<gateway base URL>" };
const off = { includeKey: false, mainModel: null, longContext: false };
const input = {
  provider: "claude",
  availableModels: MODELS,
  apiBaseUrl: "https://gw.example.net",
  apiKey: KEY,
  pageHostname: "192.168.0.10",
  choices: off,
  texts,
};

test("by default the key is a placeholder and the models are pinned", () => {
  const state = deriveOnboardingState(input);
  assert.equal(state.settingsJson, SETTINGS_OFF);
  assert.equal(state.publicExports, EXPORTS_OFF);
  assert.deepEqual(state.models, [SONNET, OPUS, HAIKU]);
  assert.equal(state.totalModels, 3);
  assert.equal(state.mainModel, SONNET);
  assert.equal(state.localExports, null);
  assert.equal(state.longContextAvailable, true);
  assert.equal(state.longContext, false);
  assert.equal(JSON.stringify(state).includes(KEY), false);
});

test("the key enters the generated text only with includeKey", () => {
  const state = deriveOnboardingState({ ...input, choices: { ...off, includeKey: true } });
  assert.equal(state.credential, KEY);
  assert.equal(state.settingsJson, SETTINGS_OFF.replace("<your API key>", KEY));
  assert.equal(state.publicExports, EXPORTS_OFF.replace("<your API key>", KEY));
  assert.equal(state.desktopModelsJson?.includes(KEY), false);
  const noKey = deriveOnboardingState({
    ...input,
    apiKey: null,
    choices: { ...off, includeKey: true },
  });
  assert.equal(noKey.credential, "<your API key>");
});

test("without a base URL the blocks carry the placeholder and no local profile", () => {
  const state = deriveOnboardingState({ ...input, apiBaseUrl: null });
  assert.equal(state.baseUrlKnown, false);
  assert.equal(state.baseUrl, "<gateway base URL>");
  assert.equal(
    state.settingsJson,
    SETTINGS_OFF.replace("https://gw.example.net", "<gateway base URL>")
  );
  assert.equal(state.localExports, null);
});

test("a plain http origin with a port adds the local profile for another page host", () => {
  const state = deriveOnboardingState({ ...input, apiBaseUrl: "http://gw.example.net:20128" });
  assert.equal(
    state.publicExports,
    EXPORTS_OFF.replace("https://gw.example.net", "http://gw.example.net:20128")
  );
  assert.equal(
    state.localExports,
    EXPORTS_OFF.replace("https://gw.example.net", "http://192.168.0.10:20128")
  );
});

test("no model for this provider means discovery settings and no model list", () => {
  for (const availableModels of [[], [CODEX]]) {
    const state = deriveOnboardingState({
      ...input,
      availableModels,
      choices: { ...off, longContext: true },
    });
    assert.equal(state.settingsJson, DISCOVERY.replace("<base>", "https://gw.example.net"));
    assert.deepEqual(state.models, []);
    assert.equal(state.mainModel, null);
    assert.equal(state.desktopModelsJson, null);
    assert.equal(state.longContextAvailable, false);
    assert.equal(state.longContext, false);
  }
});

test("long context applies when chosen and available", () => {
  const on = deriveOnboardingState({ ...input, choices: { ...off, longContext: true } });
  assert.equal(on.settingsJson, SETTINGS_ON);
  assert.equal(on.desktopModelsJson, DESKTOP_MODELS_ON);
  const haikuOnly = deriveOnboardingState({
    ...input,
    availableModels: [HAIKU],
    choices: { ...off, longContext: true },
  });
  assert.equal(haikuOnly.longContext, false);
  assert.equal(haikuOnly.settingsJson.includes("[1m]"), false);
});

test("a chosen main model leads the listing and one that left the list falls back", () => {
  const chosen = deriveOnboardingState({ ...input, choices: { ...off, mainModel: OPUS } });
  assert.equal(chosen.mainModel, OPUS);
  assert.deepEqual(chosen.models, [OPUS, SONNET, HAIKU]);
  assert.equal(JSON.parse(chosen.settingsJson).env.ANTHROPIC_MODEL, OPUS);
  assert.equal(
    deriveOnboardingState({ ...input, choices: { ...off, mainModel: CODEX } }).mainModel,
    SONNET
  );
});

test("past the cap the listing stops at 40 and the tiers are still found", () => {
  const many = Array.from(
    { length: 44 },
    (_, i) => `qtSd/team/claude/m-${String(i + 1).padStart(2, "0")}`
  );
  const lastSorted = "qtSd/team/claude/claude-haiku-4-5";
  const state = deriveOnboardingState({ ...input, availableModels: [...many, lastSorted] });
  assert.equal(state.totalModels, 45);
  assert.equal(state.models.length, 40);
  assert.equal(state.models.includes(lastSorted), false);
  assert.equal(state.mainModel, "qtSd/team/claude/m-44");
  assert.equal(JSON.parse(state.settingsJson).env.ANTHROPIC_DEFAULT_HAIKU_MODEL, lastSorted);
});

test("the text fingerprint never holds the key and ignores it", () => {
  const withKey = { ...input, choices: { ...off, includeKey: true } };
  const fingerprint = onboardingTextFingerprint(withKey);
  assert.equal(fingerprint.includes(KEY), false);
  assert.equal(fingerprint, onboardingTextFingerprint({ ...input, apiKey: null }));
});

test("the text fingerprint follows the base URL and the 1M choice", () => {
  const base = onboardingTextFingerprint(input);
  assert.notEqual(
    base,
    onboardingTextFingerprint({ ...input, apiBaseUrl: "https://other.example.net" })
  );
  assert.notEqual(
    base,
    onboardingTextFingerprint({ ...input, choices: { ...off, longContext: true } })
  );
});

test("the text fingerprint follows a default model the listing does not show", () => {
  const filler = Array.from(
    { length: 44 },
    (_, index) => `qtSd/team/claude/model-${String(index).padStart(2, "0")}`
  );
  const withOpus = (opus: string) => ({
    ...input,
    availableModels: ["qtSd/team/claude/zz-claude-sonnet-5", ...filler, opus],
  });
  const first = withOpus("qtSd/team/claude/aa-claude-opus-4-7");
  const second = withOpus("qtSd/team/claude/aa-claude-opus-4-8");
  const a = deriveOnboardingState(first);
  const b = deriveOnboardingState(second);
  // What the card lists is the same in both: only a tier default past the listing differs.
  assert.deepEqual(a.models, b.models);
  assert.equal(a.mainModel, b.mainModel);
  assert.equal(a.totalModels, b.totalModels);
  assert.notEqual(a.settingsJson, b.settingsJson);
  assert.notEqual(onboardingTextFingerprint(first), onboardingTextFingerprint(second));
});
