import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// The opt-in tier selector reads the client's reasoning_effort in the executor, but an
// OpenAI-format client reaches the executor through the OpenAI -> Antigravity translator,
// which folds the effort into generationConfig.thinkingConfig. The envelope must still carry
// the client value to the executor, and the executor must not forward it upstream.
const dataDir = mkdtempSync(join(tmpdir(), "antigravity-effort-tier-wire-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const ENV = "ANTIGRAVITY_EFFORT_TIER_SELECTION";
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { AntigravityExecutor } = await import("../../open-sse/executors/antigravity.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  delete process.env[ENV];
  resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
});

function translate(reasoningEffort?: string) {
  return translateRequest(
    "openai",
    "antigravity",
    "gemini-4-argon",
    {
      model: "gemini-4-argon",
      messages: [{ role: "user", content: "hi" }],
      ...(reasoningEffort ? { reasoning_effort: reasoningEffort } : {}),
    },
    true,
    { accessToken: "synthetic-token", projectId: "synthetic-project" },
    "antigravity"
  ) as Record<string, unknown>;
}

async function wireModel(envelope: Record<string, unknown>) {
  const out = (await new AntigravityExecutor().transformRequest("gemini-4-argon", envelope, true, {
    accessToken: "synthetic-token",
    projectId: "synthetic-project",
  })) as Record<string, unknown>;
  assert.equal("reasoning_effort" in out, false, "the effort never reaches the upstream body");
  return out.model;
}

test("flag on: an OpenAI client's reasoning_effort reaches the tier selector", async () => {
  process.env[ENV] = "true";
  const envelope = translate("high");
  assert.equal(envelope.reasoning_effort, "high");
  assert.equal(await wireModel(envelope), "gemini-4-argon-high");
});

test("flag off: the same request keeps the default tier and the envelope keeps its shape", async () => {
  delete process.env[ENV];
  const envelope = translate("high");
  assert.equal("reasoning_effort" in envelope, false);
  assert.equal(await wireModel(envelope), "gemini-4-argon-medium");
});

test("flag on, no client effort: the envelope carries no reasoning_effort key", () => {
  process.env[ENV] = "true";
  assert.equal("reasoning_effort" in translate(), false);
});
