import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const { parseOpenapi } = await import("../../src/lib/agentSkills/openapiParser.ts");
const { CURATED_SKILLS } = await import("../../src/shared/constants/agentSkills.ts");

// Each path must land in the skill area that documents it. First match wins,
// so a specific prefix must come before a general one.
const CASES: Array<[string, string]> = [
  ["/api/tunnels/ngrok", "tunnels"],
  ["/api/settings/proxy", "proxies"],
  ["/api/settings/proxies/{id}", "proxies"],
  ["/api/settings/compression", "compression"],
  ["/api/settings", "settings"],
  ["/api/db-backups/export", "db-backups"],
  ["/api/github-skills", "github-skills"],
  ["/api/log-export/destinations", "usage-logs"],
];

function areaOf(areas: Map<string, Array<{ path: string }>>, p: string): string | null {
  for (const [area, ops] of areas) if (ops.some((op) => op.path === p)) return area;
  return null;
}

test("parseOpenapi() maps each path prefix to the skill that documents it", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-pathmap-test-"));
  fs.mkdirSync(path.join(tmpDir, "docs"));
  const yaml = [
    "openapi: 3.1.0",
    "info: { title: t, version: '1' }",
    "paths:",
    ...CASES.map(([p]) => `  "${p}":\n    get:\n      summary: s`),
  ].join("\n");
  fs.writeFileSync(path.join(tmpDir, "docs", "openapi.yaml"), yaml, "utf-8");
  const originalCwd = process.cwd();
  process.chdir(tmpDir);
  try {
    const { areas } = parseOpenapi();
    const got = CASES.map(([p]) => [p, areaOf(areas, p)]);
    assert.deepEqual(got, CASES);
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

// Real spec: the agent-read skills must list log export and the safe backup routes, and must not
// list the operator-only restore and import routes (API keys get 403 there).
test("real openapi.yaml: db-backups skill omits restore and import, usage-logs lists log export", () => {
  const { areas } = parseOpenapi();
  const keys = (area: string) =>
    (areas.get(area as never) ?? []).map((o) => `${o.method} ${o.path}`);
  const backups = keys("db-backups");
  assert.ok(backups.includes("GET /api/db-backups"));
  assert.ok(!backups.includes("POST /api/db-backups"), "restore must not be in the skill");
  assert.ok(!backups.includes("POST /api/db-backups/import"), "import must not be in the skill");
  const logs = keys("usage-logs");
  assert.ok(logs.includes("GET /api/log-export/status"));
  assert.ok(logs.includes("POST /api/log-export/destinations/{id}/run"));
});

test("skill descriptions promise only what the generated skill lists", () => {
  const text = (id: string) => CURATED_SKILLS.find((s) => s.id === id)?.description ?? "";
  assert.doesNotMatch(text("omni-cache"), /TTL|threshold/i);
  assert.doesNotMatch(text("omni-db-backups"), /restore|import/i);
});
