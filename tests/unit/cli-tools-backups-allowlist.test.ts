// /api/cli-tools/backups must accept every tool id that a setup writer backs up under.
// Before, the route kept its own fixed id list: a writer could create backups that the
// list, restore and delete calls then refused with 400 "Invalid tool".
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-backups-allow-"));
const ORIGINAL_ENV = { DATA_DIR: process.env.DATA_DIR, JWT_SECRET: process.env.JWT_SECRET };
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "cli-backups-allowlist-jwt-secret";

const backupsRoute = await import("../../src/app/api/cli-tools/backups/route.ts");
const { createBackup } = await import("../../src/shared/services/backupService.ts");

const URL_BASE = "http://localhost:20128/api/cli-tools/backups";
const ROUTES_DIR = path.resolve("src/app/api/cli-tools");

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

/** Tool ids that setup writers pass to createBackup / createMultiBackup. */
function writerBackupToolIds(): string[] {
  const sources: Array<{ file: string; text: string }> = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === "route.ts")
        sources.push({ file: full, text: fs.readFileSync(full, "utf8") });
    }
  };
  walk(ROUTES_DIR);
  const piConfig = fs.readFileSync(path.resolve("src/shared/services/piConfig.ts"), "utf8");

  const ids = new Set<string>();
  for (const { text } of sources) {
    for (const match of text.matchAll(/create(?:Multi)?Backup\(\s*([A-Za-z_]+|"[^"]+")/g)) {
      const arg = match[1];
      if (arg.startsWith('"')) {
        ids.add(arg.slice(1, -1));
        continue;
      }
      // The constant is declared in the writer file itself, or imported from piConfig.
      const declaration = new RegExp(`const ${arg}\\s*=\\s*"([^"]+)"`);
      const decl = text.match(declaration) ?? piConfig.match(declaration);
      assert.ok(decl, `cannot resolve backup tool id constant ${arg}`);
      ids.add(decl[1]);
    }
  }
  return [...ids].sort();
}

test("the scan finds the writer ids it should", () => {
  const ids = writerBackupToolIds();
  for (const id of ["claude", "codex", "pi", "smelt", "omp", "crush"]) {
    assert.ok(ids.includes(id), `writer id ${id} missing from scan: ${ids.join(",")}`);
  }
});

test("list, restore and delete accept every tool id a writer backs up under", async () => {
  const rejected: string[] = [];
  for (const tool of writerBackupToolIds()) {
    const list = await backupsRoute.GET(
      await makeManagementSessionRequest(`${URL_BASE}?tool=${encodeURIComponent(tool)}`)
    );
    if (list.status === 400) rejected.push(`GET ${tool}`);
    for (const method of ["POST", "DELETE"] as const) {
      const response = await backupsRoute[method](
        await makeManagementSessionRequest(URL_BASE, {
          method,
          body: { tool, backupId: "missing.json" },
        })
      );
      const body = await response.text();
      if (response.status === 400 && body.includes("Invalid tool"))
        rejected.push(`${method} ${tool}`);
    }
  }
  assert.deepEqual(rejected, []);
});

test("a backup written for a newly allowed tool is listed", async () => {
  const source = path.join(TEST_DATA_DIR, "pi-models.json");
  fs.writeFileSync(source, "{}");
  await createBackup("pi", source);
  const response = await backupsRoute.GET(
    await makeManagementSessionRequest(`${URL_BASE}?tool=pi`)
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { backups: unknown[] };
  assert.equal(body.backups.length, 1);
});

test("an unknown tool id is still refused", async () => {
  const response = await backupsRoute.GET(
    await makeManagementSessionRequest(`${URL_BASE}?tool=not-a-tool`)
  );
  assert.equal(response.status, 400);
});
