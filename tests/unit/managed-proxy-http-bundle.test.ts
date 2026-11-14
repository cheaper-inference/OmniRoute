import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { buildManagedProxyHttpBundle } from "../_setup/managedProxyHttpBundle.ts";

test("hosted deletion fixture links all current authz imports without real database or lifecycle modules", async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "managed-bundle-only-"));
  try {
    const outfile = path.join(directory, "never-executed.cjs");
    const result = await buildManagedProxyHttpBundle(process.cwd(), outfile);
    assert.equal(
      fs.existsSync(outfile),
      false,
      "compile-only helper must never write or execute its output"
    );
    assert.equal(result.outputFiles.length, 1);
    assert.ok(result.outputFiles[0].contents.length > 0);
    const inputs = Object.keys(result.metafile.inputs);
    assert.ok(inputs.includes("fixture:src/lib/db/readCache"));
    assert.ok(inputs.includes("src/server/authz/pipeline.ts"));
    assert.ok(inputs.includes("fixture:src/lib/services/managedProxy/remove"));
    assert.deepEqual(
      inputs.filter(
        (file) =>
          !file.startsWith("fixture:") &&
          /(?:^|\/)src\/lib\/(?:db\/|services\/managedProxy\/(?:runtime|install|manager|remove)\.)/.test(
            file
          )
      ),
      []
    );
    assert.deepEqual(
      inputs.filter((file) => /(?:src\/shared\/utils\/logger|src\/lib\/logRotation)/.test(file)),
      [],
      "HTTP fixture must not initialize real log files, timers or Pino workers"
    );
    const hosted = fs.readFileSync(
      "tests/integration/managed-proxy/deletion-dispatch.test.ts",
      "utf8"
    );
    assert.ok(hosted.includes("assertManagedFixture()"));
    assert.ok(hosted.includes("await buildManagedProxyHttpBundle(project, bundle)"));
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
