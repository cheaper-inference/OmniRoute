import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, test } from "node:test";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "managed-install-integrity-"));
process.env.DATA_DIR = root;
const { installManagedCore } = await import("../../src/lib/services/managedProxy/install.ts");
const { officialRelease } = await import("../../src/lib/services/managedProxy/releases.ts");
after(() => fs.rmSync(root, { recursive: true, force: true }));

for (const missing of ["binary", "metadata"]) {
  test(`an existing version missing its ${missing} fails safely before downloading`, async (t) => {
    const release = officialRelease("xray");
    const caseRoot = path.join(root, missing);
    const directory = path.join(caseRoot, "binaries", "xray", release.version);
    fs.mkdirSync(directory, { recursive: true });
    const retained = missing === "binary" ? "verified.json" : release.executable;
    fs.writeFileSync(path.join(directory, retained), missing === "binary" ? "{}" : "synthetic");
    let downloads = 0;
    t.mock.method(globalThis, "fetch", async () => {
      downloads++;
      throw new Error("unexpected download");
    });
    await assert.rejects(
      installManagedCore("xray", caseRoot),
      /remove only the damaged managed version/
    );
    assert.equal(downloads, 0);
    assert.equal(fs.existsSync(path.join(directory, retained)), true);
  });
}

test("archive readers are declared as required production dependencies", () => {
  const manifest = JSON.parse(
    fs.readFileSync(new URL("../../package.json", import.meta.url), "utf8")
  );
  for (const dependency of ["adm-zip", "tar"]) assert.ok(manifest.dependencies[dependency]);
});
