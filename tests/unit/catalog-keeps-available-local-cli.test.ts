/**
 * Counterpart of catalog-hides-unavailable-local-cli-absent.test.ts: when the host
 * has the zcode / auggie binaries, the Devin bridge home and the Codex app-server
 * config, those providers stay advertised on /v1/models.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-local-cli-present-"));
const BIN_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-local-cli-bins-"));
for (const name of ["zcode", "auggie"]) {
  fs.writeFileSync(path.join(BIN_DIR, name), "#!/bin/sh\nexit 0\n", { mode: 0o755 });
}
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";
process.env.ZCODE_BIN = path.join(BIN_DIR, "zcode");
process.env.ZCODE_SERVER_RUNTIME_ROOT = path.join(BIN_DIR, "no-zcode-runtime");
process.env.AUGGIE_BIN = path.join(BIN_DIR, "auggie");
process.env.DEVIN_AGENTIC_HOME = path.join(BIN_DIR, ".sandbox", "home");
process.env.OMNIROUTE_CODEX_APPSERVER_WS = "ws://127.0.0.1:1";
process.env.OMNIROUTE_CODEX_APPSERVER_WS_TOKEN = "test-token";

const core = await import("../../src/lib/db/core.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.rmSync(BIN_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("catalog keeps local-CLI no-auth providers whose host check reports available", async () => {
  catalog.__resetCatalogBuilderRunsForTest();
  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models?prefix=dual")
  );
  assert.equal(response.status, 200);
  const ids = ((await response.json()) as { data: Array<{ id: string }> }).data.map((r) => r.id);
  for (const prefix of ["zc", "aug", "dva", "cxa"]) {
    assert.ok(
      ids.some((id) => id.startsWith(`${prefix}/`)),
      `${prefix}/ models must stay advertised`
    );
  }
});
