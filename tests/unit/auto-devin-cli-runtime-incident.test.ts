import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "auto-devin-runtime-"));
process.env.DATA_DIR = dir;
process.env.CLI_DEVIN_BIN = path.join(dir, "missing-devin");
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const settings = await import("../../src/lib/db/settings.ts");
const factory = await import("../../open-sse/services/autoCombo/virtualFactory.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});

test("incident 2026-11-25: a missing credentialed Devin runtime must not flood auto candidates", async () => {
  await settings.updateSettings({ excludeTosAvoid: false });
  await providers.createProviderConnection({
    provider: "devin-cli",
    authType: "apikey",
    apiKey: "synthetic",
  });
  await providers.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "synthetic",
  });
  const result = await factory.prepareVirtualAutoComboInputs();
  const ids = result.familyCandidates.map((c) => c.provider);
  assert.ok(ids.includes("openai"), "healthy alternate must remain");
  assert.equal(
    ids.filter((id) => id === "devin-cli").length,
    0,
    "missing local runtime must be excluded"
  );

  const binary = process.env.CLI_DEVIN_BIN!;
  fs.writeFileSync(binary, "#!/bin/sh\nexit 0\n", { mode: 0o644 });
  await new Promise((resolve) => setTimeout(resolve, 1200));
  assert.equal(
    (await factory.prepareVirtualAutoComboInputs()).regularCandidates.filter(
      (c) => c.provider === "devin-cli"
    ).length,
    0,
    "non-executable binary is excluded"
  );
  fs.chmodSync(binary, 0o755);
  await new Promise((resolve) => setTimeout(resolve, 1200));
  assert.ok(
    (await factory.prepareVirtualAutoComboInputs()).regularCandidates.some(
      (c) => c.provider === "devin-cli"
    ),
    "install becomes eligible in the same process"
  );
  const alternatePath = path.join(dir, "bin");
  fs.mkdirSync(alternatePath);
  fs.copyFileSync(binary, path.join(alternatePath, "devin"));
  fs.chmodSync(path.join(alternatePath, "devin"), 0o755);
  delete process.env.CLI_DEVIN_BIN;
  process.env.PATH = alternatePath;
  assert.ok(
    (await factory.prepareVirtualAutoComboInputs()).regularCandidates.some(
      (c) => c.provider === "devin-cli"
    ),
    "PATH executable admitted"
  );
});
