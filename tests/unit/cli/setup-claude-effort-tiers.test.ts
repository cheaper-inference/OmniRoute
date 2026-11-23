// setup-claude wrote the category's effortLevel (xhigh / high / low) into every profile, even
// when the catalog row lists the model's effort tiers and the level is not one of them. A
// generated profile must stay within `capabilities.effort_tiers`: a level the model does not
// offer is lowered to the highest listed level below it (never to `minimal`, which is not a
// Claude Code level), and omitted when no level fits.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  buildProfileSettings,
  syncClaudeProfilesFromModels,
} from "../../../bin/cli/commands/setup-claude.mjs";
import { categoriseModel } from "../../../bin/cli/commands/setup-codex.mjs";

// Same stdout hygiene as setup-claude.test.ts (#5959).
const _console = { log: console.log, info: console.info, warn: console.warn };
before(() => {
  console.log = () => {};
  console.info = () => {};
  console.warn = () => {};
});
after(() => {
  console.log = _console.log;
  console.info = _console.info;
  console.warn = _console.warn;
});

const thinking = categoriseModel("glm/glm-5.2"); // effort xhigh
const effortOf = (cfg: object, effortTiers?: unknown) =>
  JSON.parse(buildProfileSettings("p/m", "http://vps:20128", cfg, undefined, effortTiers))
    .effortLevel;

test("a level the model offers is kept", () => {
  assert.equal(effortOf(thinking, ["low", "medium", "high", "xhigh", "max"]), "xhigh");
});

test("a level the model does not offer is lowered to the highest listed level below it", () => {
  assert.equal(effortOf(thinking, ["low", "medium", "high"]), "high");
  assert.equal(effortOf(thinking, ["low", "max"]), "low");
  assert.equal(effortOf({ name: "x", effort: "high" }, ["low", "medium"]), "medium");
});

test("the clamp never lands on minimal, and the level is omitted when nothing fits", () => {
  assert.equal(effortOf(thinking, ["minimal", "max"]), undefined);
  assert.equal(effortOf({ name: "x", effort: "low" }, ["none", "minimal", "high"]), undefined);
});

test("without catalog tiers the category level passes through unchanged", () => {
  assert.equal(effortOf(thinking), "xhigh");
  assert.equal(effortOf(thinking, []), "xhigh");
  assert.equal(effortOf(thinking, "high"), "xhigh");
});

test("the simple tier still writes no effortLevel, whatever the tiers", () => {
  assert.equal(effortOf({ name: "x" }, ["low", "high"]), undefined);
});

async function profileSettings(entry: Record<string, unknown>, name: string) {
  const claudeHome = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-claude-effort-"));
  try {
    await syncClaudeProfilesFromModels([{ output_modalities: ["text"], ...entry }], {
      claudeHome,
      baseUrl: "http://vps:20128",
    });
    const file = path.join(claudeHome, "profiles", name, "settings.json");
    return JSON.parse(await fs.readFile(file, "utf8"));
  } finally {
    await fs.rm(claudeHome, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

test("profile sync (CLI and dashboard auto-sync) reads the tiers from the live catalog row", async () => {
  const clamped = await profileSettings(
    { id: "glm/glm-5.2", capabilities: { effort_tiers: ["low", "medium", "high"] } },
    "glm52"
  );
  assert.equal(clamped.effortLevel, "high");
  const unclamped = await profileSettings({ id: "glm/glm-5.2" }, "glm52");
  assert.equal(unclamped.effortLevel, "xhigh");
});

test("profile sync keeps the catalog window logic untouched while clamping", async () => {
  const json = await profileSettings(
    {
      id: "glm/glm-5.2",
      max_input_tokens: 1_000_000,
      capabilities: { effort_tiers: ["low", "high"] },
    },
    "glm52"
  );
  assert.equal(json.effortLevel, "high");
  assert.equal(json.env.CLAUDE_CODE_AUTO_COMPACT_WINDOW, "190000");
  assert.equal(json.env.CLAUDE_CODE_MAX_CONTEXT_TOKENS, undefined);
});
