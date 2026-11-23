import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// skills.sh install inputs (`source` = owner/repo, `skillId`, `version`) are
// interpolated into the GitHub raw URL that `fetchSkillMd` fetches. They must be
// validated before that happens — in the install route AND at the fetch boundary,
// so direct callers cannot pivot the fetch to another path with `..`, `?`, `#`,
// `%2f`, `%2e%2e` or extra segments.

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-skillssh-inputs-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = tmpDir;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { skillRegistry } = await import("../../src/lib/skills/registry.ts");
const skillssh = await import("../../src/lib/skills/skillssh.ts");
const installRoute = await import("../../src/app/api/skills/skillssh/install/route.ts");

const { fetchSkillMd, SkillsShSourceSchema, SkillsShSkillIdSchema, SkillsShVersionSchema } =
  skillssh;

/** The registry keeps its in-memory maps private; tests reset them between runs. */
type RegistryInternals = {
  registeredSkills?: { clear?: () => void };
  versionCache?: { clear?: () => void };
};

function clearSkillRegistry() {
  const internals = skillRegistry as unknown as RegistryInternals;
  internals.registeredSkills?.clear?.();
  internals.versionCache?.clear?.();
}

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(tmpDir, { recursive: true });
  clearSkillRegistry();
  core.getDbInstance();
}

const originalFetch = globalThis.fetch;

test.beforeEach(async () => {
  resetStorage();
  await settingsDb.updateSettings({ skillsProvider: "skillssh", requireLogin: false });
  globalThis.fetch = originalFetch;
});

test.after(() => {
  core.resetDbInstance();
  clearSkillRegistry();
  globalThis.fetch = originalFetch;
  process.env.DATA_DIR = originalDataDir;
  fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/** Records every URL handed to `fetch` and answers 200 with a fixed SKILL.md body. */
function recordingFetch(urls: string[], body = "# Skill\nContent.") {
  return async (input: string | URL | Request) => {
    urls.push(typeof input === "string" ? input : input instanceof URL ? input.href : input.url);
    return new Response(body, { status: 200 });
  };
}

function installRequest(overrides: Record<string, unknown>) {
  return new Request("http://localhost/api/skills/skillssh/install", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "input-validation-skill",
      description: "Exercises the skills.sh install input validation",
      source: "owner/repo",
      skillId: "valid-skill",
      version: "1.0.0",
      ...overrides,
    }),
  });
}

type ValidationErrorBody = {
  message: string;
  details: Array<{ field: string; message: string }>;
};

// ── Exported schemas: single source of truth ──

const VALID_SOURCES = ["owner/repo", "supabase/agent-skills", "owner/repo.name", "owner/.skills"];
const INVALID_SOURCES = [
  "",
  "../x",
  "a/../b",
  "a/./b",
  "%2e%2e/x",
  "a%2fb",
  "owner/repo/extra",
  "owner/repo?x=1",
  "owner/repo#frag",
  "owner repo",
  "owner/re po",
  "/",
  "owner/",
  "/repo",
  "https://github.com/owner/repo",
  `${"a".repeat(150)}/${"b".repeat(150)}`,
];

test("SkillsShSourceSchema accepts GitHub owner/repo sources", () => {
  for (const source of VALID_SOURCES) {
    assert.equal(SkillsShSourceSchema.safeParse(source).success, true, `expected ok: ${source}`);
  }
});

test("SkillsShSourceSchema rejects path pivots, extra segments and encoded separators", () => {
  for (const source of INVALID_SOURCES) {
    assert.equal(
      SkillsShSourceSchema.safeParse(source).success,
      false,
      `expected rejection: ${JSON.stringify(source)}`
    );
  }
});

const VALID_SKILL_IDS = ["supabase-postgres-best-practices", "valid-skill_1", "a", "X"];
const INVALID_SKILL_IDS = [
  "",
  "skill id",
  "../root",
  "..",
  "a/b",
  "a%2fb",
  "%2e%2e",
  "skill?x=1",
  "skill#frag",
  "skill.md",
  "x".repeat(101),
];

test("SkillsShSkillIdSchema accepts plain skill ids with dashes and underscores", () => {
  for (const skillId of VALID_SKILL_IDS) {
    assert.equal(SkillsShSkillIdSchema.safeParse(skillId).success, true, `expected ok: ${skillId}`);
  }
});

test("SkillsShSkillIdSchema rejects separators, encodings, whitespace and empty ids", () => {
  for (const skillId of INVALID_SKILL_IDS) {
    assert.equal(
      SkillsShSkillIdSchema.safeParse(skillId).success,
      false,
      `expected rejection: ${JSON.stringify(skillId)}`
    );
  }
});

test("SkillsShVersionSchema keeps the registry's X.Y.Z contract and its 1.0.0 default", () => {
  for (const version of ["1.0.0", "1.2.3", "10.20.30"]) {
    assert.equal(SkillsShVersionSchema.safeParse(version).success, true, `expected ok: ${version}`);
  }
  for (const version of ["", "1", "1.0", "v1.0.0", "latest", "1.0.0/x", "../1.0.0", "1.0.0 beta"]) {
    assert.equal(
      SkillsShVersionSchema.safeParse(version).success,
      false,
      `expected rejection: ${JSON.stringify(version)}`
    );
  }
  assert.equal(SkillsShVersionSchema.parse(undefined), "1.0.0");
});

// ── fetchSkillMd: validation at the fetch boundary (direct callers) ──

test("fetchSkillMd rejects invalid source/skillId before any network call", async () => {
  const urls: string[] = [];
  globalThis.fetch = recordingFetch(urls);

  const badPairs: Array<[string, string]> = [
    ["../x", "skill"],
    ["a/../b", "skill"],
    ["a/b/../../../evil/repo", "skill"],
    ["%2e%2e/x", "skill"],
    ["a%2fb", "skill"],
    ["owner/repo/extra", "skill"],
    ["owner/repo?x=1", "skill"],
    ["", "skill"],
    ["owner/repo", "../root"],
    ["owner/repo", "a%2fb"],
    ["owner/repo", "skill id"],
    ["owner/repo", ""],
  ];

  // Fixed, sanitized messages: the rejected input is never echoed back.
  const sanitizedMessages = new Set([
    "Invalid skills.sh source: expected a GitHub owner/repo",
    "Invalid skills.sh skill id: expected letters, digits, '_' or '-'",
  ]);

  for (const [source, skillId] of badPairs) {
    await assert.rejects(
      () => fetchSkillMd(source, skillId),
      (err: unknown) => {
        assert.ok(err instanceof Error, `plain Error expected for ${source}/${skillId}`);
        assert.equal(err.name, "Error");
        assert.ok(
          sanitizedMessages.has(err.message),
          `fixed sanitized message expected, got: ${err.message}`
        );
        return true;
      },
      `expected rejection for ${JSON.stringify(source)} / ${JSON.stringify(skillId)}`
    );
  }
  assert.deepEqual(urls, [], "no fetch may happen for a rejected input");
});

test("fetchSkillMd still builds the exact GitHub raw URL for legitimate inputs", async () => {
  const urls: string[] = [];
  globalThis.fetch = recordingFetch(urls, "skill");

  assert.equal(await fetchSkillMd("owner/repo.name", "valid-skill_1"), "skill");
  assert.equal(await fetchSkillMd("owner/.skills", "valid"), "skill");
  assert.equal(await fetchSkillMd("supabase/agent-skills", "supabase-postgres"), "skill");
  assert.deepEqual(urls, [
    "https://raw.githubusercontent.com/owner/repo.name/main/skills/valid-skill_1/SKILL.md",
    "https://raw.githubusercontent.com/owner/.skills/main/skills/valid/SKILL.md",
    "https://raw.githubusercontent.com/supabase/agent-skills/main/skills/supabase-postgres/SKILL.md",
  ]);
});

// ── POST /api/skills/skillssh/install: 400 contract ──

test("install route returns the validateBody 400 shape for a path-pivoting source", async () => {
  const urls: string[] = [];
  globalThis.fetch = recordingFetch(urls);

  const res = await installRoute.POST(installRequest({ source: "a/../b" }));
  assert.equal(res.status, 400);
  const body = (await res.json()) as ValidationErrorBody;
  assert.equal(body.message, "Invalid request");
  assert.ok(Array.isArray(body.details));
  assert.ok(body.details.length >= 1);
  assert.equal(body.details[0].field, "source");
  assert.equal(typeof body.details[0].message, "string");
  assert.ok(!body.details[0].message.includes("at /"));

  assert.deepEqual(urls, [], "the route must not fetch for a rejected source");
  assert.equal(skillRegistry.list().length, 0, "nothing may be registered");
});

test("install route returns 400 for every invalid source, skillId and version", async () => {
  const urls: string[] = [];
  globalThis.fetch = recordingFetch(urls);

  const cases: Array<Record<string, unknown>> = [
    { source: "../x" },
    { source: "%2e%2e/x" },
    { source: "a%2fb" },
    { source: "owner/repo/extra" },
    { source: "owner/repo?x=1" },
    { source: "" },
    { skillId: "../root" },
    { skillId: "a%2fb" },
    { skillId: "skill id" },
    { skillId: "" },
    { version: "latest" },
    { version: "1" },
    { version: "" },
  ];

  for (const overrides of cases) {
    const res = await installRoute.POST(installRequest(overrides));
    assert.equal(res.status, 400, `expected 400 for ${JSON.stringify(overrides)}`);
    const body = (await res.json()) as ValidationErrorBody;
    assert.equal(body.message, "Invalid request");
    assert.equal(body.details[0].field, Object.keys(overrides)[0]);
  }

  assert.deepEqual(urls, []);
  assert.equal(skillRegistry.list().length, 0);
});

test("install route still installs a legitimate skills.sh skill", async () => {
  const urls: string[] = [];
  globalThis.fetch = recordingFetch(urls, "# Supabase Postgres\nBest practices.");

  const res = await installRoute.POST(
    installRequest({
      name: "supabase-postgres",
      source: "supabase/agent-skills",
      skillId: "supabase-postgres-best-practices",
      version: "1.2.3",
    })
  );
  const body = (await res.json()) as { success?: boolean; id?: string };

  assert.equal(res.status, 200);
  assert.equal(body.success, true);
  assert.ok(body.id);
  assert.deepEqual(urls, [
    "https://raw.githubusercontent.com/supabase/agent-skills/main/skills/supabase-postgres-best-practices/SKILL.md",
  ]);
  const installed = skillRegistry.list().find((s) => s.name === "supabase-postgres");
  assert.ok(installed);
  assert.equal(installed.version, "1.2.3");
});
