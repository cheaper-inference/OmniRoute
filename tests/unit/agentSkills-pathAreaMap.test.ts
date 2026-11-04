import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const { parseOpenapi } = await import("../../src/lib/agentSkills/openapiParser.ts");

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
