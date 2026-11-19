/**
 * `--from-tarball` mode: the pack-artifact gate reads the file list of the artifact that was
 * actually built instead of asking npm for a second dry-run walk (one walk of the v3.8.54 tree
 * is about 104 s under npm 11 and 182 s under npm 12). The list must match the dry-run shape
 * the policy expects: `package/` stripped and directory entries dropped.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { listTarballFiles } from "../../scripts/build/tarballFileList.ts";

test("listTarballFiles strips package/, drops directories and keeps nested files", () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-tarball-list-"));
  try {
    const pkg = join(root, "package");
    mkdirSync(join(pkg, "dist", "empty"), { recursive: true });
    writeFileSync(join(pkg, "package.json"), "{}\n");
    writeFileSync(join(pkg, "dist", "a.mjs"), "export default 1;\n");
    writeFileSync(join(pkg, "dist", "empty", "b.mjs"), "export default 2;\n");

    const tarball = join(root, "artifact.tgz");
    execFileSync("tar", ["-czf", tarball, "-C", root, "package"]);

    assert.deepEqual(
      listTarballFiles(tarball).sort(),
      ["dist/a.mjs", "dist/empty/b.mjs", "package.json"],
      "directory entries must not reach the policy, and files must lose the package/ prefix"
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("listTarballFiles rejects entries outside package/", () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-tarball-prefix-"));
  try {
    const pkg = join(root, "package");
    mkdirSync(pkg, { recursive: true });
    writeFileSync(join(pkg, "package.json"), "{}\n");
    writeFileSync(join(root, "evil.js"), "export default 1;\n");

    const tarball = join(root, "artifact.tgz");
    execFileSync("tar", ["-czf", tarball, "-C", root, "package", "evil.js"]);

    assert.throws(
      () => listTarballFiles(tarball),
      /tarball entry is not under package\/: evil\.js/,
      "an unprefixed entry would be normalized into a package-looking path"
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
