/**
 * The batch status (`checkToolConfigStatus`) must read the same fields the per-tool settings
 * route and the expanded card read, not search the file for marker text. Config shapes below
 * are the ones the routes write: Claude `env.ANTHROPIC_BASE_URL`, Droid `customModels[]`
 * (`custom:OmniRoute-N`), OpenClaw `models.providers.omniroute`, Cline `globalState`, Kilo
 * `auth["openai-compatible" | "omniroute"]`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

process.env.DATA_DIR = path.join(os.tmpdir(), "omniroute-check-tool-exact-test");
delete process.env.API_PORT;
delete process.env.PORT;

const { checkToolConfigStatus } = await import("../../src/lib/cliTools/checkToolConfigStatus.ts");

async function writeJson(name: string, value: unknown): Promise<string> {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-clicheck-exact-"));
  const file = path.join(dir, name);
  await fs.writeFile(file, JSON.stringify(value), "utf-8");
  return file;
}

const claude = (url: string) => writeJson("settings.json", { env: { ANTHROPIC_BASE_URL: url } });

// ── Claude ───────────────────────────────────────────────────────────────────

test("claude: this OmniRoute on its own port is configured", async () => {
  const file = await claude("http://localhost:20128");
  assert.equal(await checkToolConfigStatus("claude", file), "configured");
  const loopback = await claude("http://127.0.0.1:20128/v1");
  assert.equal(await checkToolConfigStatus("claude", loopback), "configured");
});

test("claude: a stale localhost port is not configured", async () => {
  const file = await claude("http://localhost:3999");
  assert.equal(await checkToolConfigStatus("claude", file), "other");
});

test("claude: a foreign HTTPS host is not configured", async () => {
  const file = await claude("https://gateway.example.com");
  assert.equal(await checkToolConfigStatus("claude", file), "other");
});

test("claude: the direct Anthropic URL is not configured", async () => {
  const file = await claude("https://api.anthropic.com");
  assert.equal(await checkToolConfigStatus("claude", file), "other");
});

test("claude: a missing base URL is not configured", async () => {
  const file = await writeJson("settings.json", { env: {} });
  assert.equal(await checkToolConfigStatus("claude", file), "not_configured");
});

// ── Droid ────────────────────────────────────────────────────────────────────

test("droid: an OmniRoute customModels entry on this port is configured", async () => {
  const file = await writeJson("settings.json", {
    customModels: [{ id: "custom:OmniRoute-0", baseUrl: "http://localhost:20128/v1", apiKey: "k" }],
  });
  assert.equal(await checkToolConfigStatus("droid", file), "configured");
});

test("droid: an OmniRoute entry that points at another host is not configured", async () => {
  const file = await writeJson("settings.json", {
    customModels: [{ id: "custom:OmniRoute-0", baseUrl: "https://gateway.example.com/v1" }],
  });
  assert.equal(await checkToolConfigStatus("droid", file), "other");
});

test("droid: unrelated text that mentions omniroute is not configured", async () => {
  const file = await writeJson("settings.json", {
    theme: "omniroute",
    customModels: [
      { id: "custom:Other", baseUrl: "https://api.example.com/v1", note: "sk_omniroute" },
    ],
  });
  assert.equal(await checkToolConfigStatus("droid", file), "not_configured");
});

// ── OpenClaw ─────────────────────────────────────────────────────────────────

test("openclaw: models.providers.omniroute on this port is configured", async () => {
  const file = await writeJson("openclaw.json", {
    models: { providers: { omniroute: { baseUrl: "http://localhost:20128/v1", apiKey: "k" } } },
  });
  assert.equal(await checkToolConfigStatus("openclaw", file), "configured");
});

test("openclaw: unrelated text that mentions omniroute is not configured", async () => {
  const file = await writeJson("openclaw.json", {
    models: { providers: { other: { baseUrl: "https://api.example.com/v1" } } },
    notes: "omniroute localhost:20128",
  });
  assert.equal(await checkToolConfigStatus("openclaw", file), "not_configured");
});

// ── Cline ────────────────────────────────────────────────────────────────────

test("cline: the openai provider on this port is configured", async () => {
  const file = await writeJson("globalState.json", {
    actModeApiProvider: "openai",
    openAiBaseUrl: "http://localhost:20128/v1",
  });
  assert.equal(await checkToolConfigStatus("cline", file), "configured");
});

test("cline: the openai provider on a foreign host is not configured", async () => {
  const file = await writeJson("globalState.json", {
    actModeApiProvider: "openai",
    openAiBaseUrl: "https://api.example.com/v1",
  });
  assert.equal(await checkToolConfigStatus("cline", file), "not_configured");
});

test("cline: unrelated text that mentions omniroute is not configured", async () => {
  const file = await writeJson("globalState.json", {
    actModeApiProvider: "anthropic",
    lastPrompt: "how do I use omniroute at localhost:20128?",
  });
  assert.equal(await checkToolConfigStatus("cline", file), "not_configured");
});

// ── Kilo ─────────────────────────────────────────────────────────────────────

test("kilo: an openai-compatible entry on this port is configured", async () => {
  const file = await writeJson("auth.json", {
    "openai-compatible": { baseUrl: "http://localhost:20128/v1", apiKey: "k" },
  });
  assert.equal(await checkToolConfigStatus("kilo", file), "configured");
});

test("kilo: unrelated text that mentions omniroute is not configured", async () => {
  const file = await writeJson("auth.json", {
    anthropic: { apiKey: "sk_omniroute_not_ours" },
    notes: "omniroute localhost:20128",
  });
  assert.equal(await checkToolConfigStatus("kilo", file), "not_configured");
});
