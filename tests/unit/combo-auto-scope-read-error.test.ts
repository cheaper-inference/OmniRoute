import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// A failed connection read in the scoped (API-key restricted) auto path must not drop every
// candidate silently. The unscoped path already keeps going; the scoped path must do the same
// and say what failed.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auto-scope-read-error-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { buildAutoCandidates } = await import("../../open-sse/services/combo.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

function boundTarget(provider: string, model: string, connectionId: string) {
  const modelStr = `${provider}/${model}`;
  return {
    kind: "model" as const,
    stepId: modelStr,
    executionKey: `${modelStr}@${connectionId}`,
    modelStr,
    provider,
    providerId: provider,
    connectionId,
    allowedConnectionIds: [connectionId],
    weight: 1,
    label: null,
  };
}

test("scoped auto candidates survive a failed connection read and the failure is logged", async () => {
  const connection = (await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "scope-read-error",
    apiKey: ["sk", "scope", "read", "error"].join("-"),
    isActive: true,
  })) as { id: string };
  const target = boundTarget("openai", "gpt-4o-mini", connection.id);

  core.getDbInstance().exec("DROP TABLE provider_connections");
  invalidateDbCache("connections");

  const warnings: string[] = [];
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    warnings.push(args.map(String).join(" "));
  };
  let candidates;
  try {
    candidates = await buildAutoCandidates([target], "scope-read-error", null, undefined, null, [
      connection.id,
    ]);
  } finally {
    console.warn = originalWarn;
  }

  assert.deepEqual(
    candidates.map((candidate) => candidate.executionKey),
    [target.executionKey]
  );
  assert.ok(
    warnings.some((line) => line.includes("COMBO_AUTO") && line.includes("connection read failed")),
    `expected a warning naming the failed connection read, got ${JSON.stringify(warnings)}`
  );
});
