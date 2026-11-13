import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mem-skills-guards-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { injectMemoryAndSkills } =
  await import("../../open-sse/handlers/chatCore/memorySkillsInjection.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const core = await import("../../src/lib/db/core.ts");
const { skillRegistry } = await import("../../src/lib/skills/registry.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { invalidateMemorySettingsCache } = await import("../../src/lib/memory/settings.ts");
const { createMemory } = await import("../../src/lib/memory/store.ts");

function resetSkillsRegistry() {
  skillRegistry["registeredSkills"].clear();
  skillRegistry["versionCache"].clear();
  skillRegistry.invalidateCache();
}

test.after(() => {
  resetSkillsRegistry();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const call = (body: Record<string, unknown>, owner: string, provider = "openai") =>
  injectMemoryAndSkills({
    body,
    memoryOwnerId: owner,
    provider,
    effectiveModel: String(body.model),
    sourceFormat: FORMATS.OPENAI,
    targetFormat: FORMATS.OPENAI,
    backgroundReason: null,
    log: null,
  });

// One bad skill row (here a global owner row, which every key loads) must not fail the request.
test("a corrupt skill row does not make the injection reject", async () => {
  await updateSettings({ memoryEnabled: true, memoryMaxTokens: 2000, skillsEnabled: true });
  invalidateMemorySettingsCache();
  resetSkillsRegistry();
  const db = core.getDbInstance() as unknown as {
    prepare: (sql: string) => { all: () => unknown[]; run: (...a: unknown[]) => void };
  };
  const columns = db
    .prepare("PRAGMA table_info(skills)")
    .all()
    .map((c) => (c as { name: string }).name);
  const now = new Date().toISOString();
  const row: Record<string, unknown> = {
    id: "bad-skill-1",
    api_key_id: "skillsmp",
    name: "bad",
    version: "1.0.0",
    description: "d",
    schema: "{not json",
    handler: "h",
    enabled: 1,
    created_at: now,
    updated_at: now,
  };
  const use = Object.keys(row).filter((k) => columns.includes(k));
  db.prepare(`INSERT INTO skills (${use.join(",")}) VALUES (${use.map(() => "?").join(",")})`).run(
    ...use.map((k) => row[k])
  );
  const body = { model: "gpt-4o", messages: [{ role: "user", content: "hi" }] };
  const result = await call(body, "key-A");
  assert.deepEqual(result.body.messages, body.messages, "the request still goes through");
});

// Automatic prefix caching (OpenAI, Codex, Azure) needs a byte-identical prefix from token 0:
// a per-query memory text at messages[0] misses the cache on every turn.
test("OpenAI memory injection leaves the prefix of the conversation untouched", async () => {
  await updateSettings({ memoryEnabled: true, memoryMaxTokens: 2000, skillsEnabled: false });
  invalidateMemorySettingsCache();
  await createMemory({
    apiKeyId: "key-prefix",
    sessionId: "s",
    type: "factual",
    key: "color",
    content: "The user likes tea",
    metadata: {},
    expiresAt: null,
  } as unknown as Parameters<typeof createMemory>[0]);
  const body = {
    model: "gpt-4o",
    messages: [
      { role: "system", content: "SYS" },
      { role: "user", content: "q1 tea" },
      { role: "assistant", content: "a1" },
      { role: "user", content: "q2 tea" },
    ],
  };
  const result = await call(body, "key-prefix");
  const out = result.body.messages as Array<{ role: string; content: string }>;
  assert.equal(out.length, 5, "memory was injected");
  assert.equal(out[0].content, "SYS", "messages[0] is still the client's system prompt");
  assert.match(out[3].content, /Memory context/, "memory sits just before the last user turn");
  assert.equal(out[4].content, "q2 tea");
});
