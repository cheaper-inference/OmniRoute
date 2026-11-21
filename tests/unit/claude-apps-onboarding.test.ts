import { test } from "node:test";
import assert from "node:assert/strict";

import {
  buildDesktopInferenceModels,
  buildShellExports,
  deriveLocalNetworkBaseUrl,
  listOnboardingModels,
} from "../../src/shared/services/claudeAppsOnboarding.ts";

const SONNET = "qtSd/team/claude/claude-sonnet-5";
const OPUS = "qtSd/team/claude/claude-opus-4-8";
const HAIKU = "qtSd/team/claude/claude-haiku-4-5-20251001";

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

test("export lines keep the order and quote every value", () => {
  const env = { ANTHROPIC_BASE_URL: "https://gw.example.net", ANTHROPIC_MODEL: `${SONNET}[1m]` };
  assert.equal(
    buildShellExports(env),
    "export ANTHROPIC_BASE_URL='https://gw.example.net'\nexport ANTHROPIC_MODEL='qtSd/team/claude/claude-sonnet-5[1m]'"
  );
  assert.equal(buildShellExports({}), "");
});

test("a quote, a dollar sign and a backtick stay inside one quoted token", () => {
  assert.equal(buildShellExports({ K: "sk-a'b$(x)`y\\z" }), "export K='sk-a'\\''b$(x)`y\\z'");
});

test("a value with a space stays one single-quoted token", () => {
  assert.equal(buildShellExports({ K: "sk a  b" }), "export K='sk a  b'");
});

test("a value with a newline stays one single-quoted token", () => {
  assert.equal(buildShellExports({ K: "sk-a\nb", L: "c" }), "export K='sk-a\nb'\nexport L='c'");
});

test("the local profile swaps only the host of a plain http origin with a port", () => {
  assert.equal(
    deriveLocalNetworkBaseUrl("http://gw.example.net:20128", "192.168.0.10"),
    "http://192.168.0.10:20128"
  );
  assert.equal(
    deriveLocalNetworkBaseUrl("http://gw.example.net:20128", "[::1]"),
    "http://[::1]:20128"
  );
  assert.equal(
    deriveLocalNetworkBaseUrl("http://gw.example.net:20128", "localhost"),
    "http://localhost:20128"
  );
});

test("no local profile without a known port, over https, for the same host or for a bad input", () => {
  for (const [base, host] of [
    [null, "192.168.0.10"],
    ["https://gw.example.net:8443", "192.168.0.10"],
    ["http://gw.example.net", "192.168.0.10"],
    ["http://gw.example.net:20128", "gw.example.net"],
    ["http://gw.example.net:20128", "GW.example.net"],
    ["http://gw.example.net:20128", ""],
    ["http://gw.example.net:20128", "bad host"],
    ["not a url", "192.168.0.10"],
  ] as const)
    assert.equal(deriveLocalNetworkBaseUrl(base, host), null, `${base} ${host}`);
});

test("the listing puts the main model first and stops at the limit", () => {
  assert.deepEqual(listOnboardingModels([SONNET, OPUS, HAIKU], OPUS), [OPUS, SONNET, HAIKU]);
  assert.deepEqual(listOnboardingModels([SONNET, OPUS, HAIKU], null), [SONNET, OPUS, HAIKU]);
  const many = Array.from(
    { length: 45 },
    (_, i) => `qtSd/team/claude/m-${String(i).padStart(2, "0")}`
  );
  const listed = listOnboardingModels(many, many[44]);
  assert.equal(listed.length, 40);
  assert.equal(listed[0], many[44]);
  assert.equal(listed[1], many[0]);
  assert.deepEqual(listOnboardingModels(many, many[44], 2), [many[44], many[0]]);
});

test("the desktop model list marks 1M only when asked and supported", () => {
  assert.equal(buildDesktopInferenceModels([SONNET, OPUS, HAIKU], true), DESKTOP_MODELS_ON);
  assert.deepEqual(JSON.parse(buildDesktopInferenceModels([SONNET, HAIKU], false)), {
    inferenceModels: [{ name: SONNET }, { name: HAIKU }],
  });
  assert.equal(buildDesktopInferenceModels([], true), '{\n  "inferenceModels": []\n}');
});
