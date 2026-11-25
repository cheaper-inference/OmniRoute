import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

import { isMainModule } from "../../scripts/lib/is-main-module.mjs";

const ROOT = path.resolve(import.meta.dirname, "../..");
const SCRIPT_REL = "scripts/check/check-migration-numbering.mjs";

function withTmp<T>(fn: (tmp: string) => T): T {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "entry-guard-20617-"));
  try {
    return fn(tmp);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

test("#20617: gate script reached via a symlinked checkout dir still runs main()", () => {
  withTmp((tmp) => {
    const link = path.join(tmp, "link-to-checkout");
    fs.symlinkSync(ROOT, link, "dir");
    const run = (p: string) =>
      spawnSync(process.execPath, [p], { cwd: ROOT, encoding: "utf8", timeout: 120_000 });
    const real = run(path.join(ROOT, SCRIPT_REL));
    const viaLink = run(path.join(link, SCRIPT_REL));
    assert.match(real.stdout + real.stderr, /check-migration-numbering/);
    assert.match(
      viaLink.stdout + viaLink.stderr,
      /check-migration-numbering/,
      `symlinked path produced no output (status=${viaLink.status}) - main() skipped`
    );
    assert.equal(viaLink.status, real.status);
  });
});

test("isMainModule: real path, symlinked dir, spaces and missing argv1", () => {
  withTmp((tmp) => {
    const realDir = path.join(tmp, "real dir");
    fs.mkdirSync(realDir);
    const file = path.join(realDir, "s.mjs");
    fs.writeFileSync(file, "");
    const link = path.join(tmp, "link");
    fs.symlinkSync(realDir, link, "dir");
    const realUrl = pathToFileURL(fs.realpathSync(file)).href;

    assert.equal(isMainModule(realUrl, file), true);
    assert.equal(isMainModule(realUrl, path.join(link, "s.mjs")), true);
    assert.equal(isMainModule(realUrl, path.join(tmp, "other.mjs")), false);
    assert.equal(isMainModule(realUrl, undefined), false);
    assert.equal(isMainModule(realUrl, ""), false);
  });
});

test("scripts/check no longer uses the naive import.meta.url === pathToFileURL(argv[1]) guard", () => {
  const dir = path.join(ROOT, "scripts/check");
  const offenders = fs
    .readdirSync(dir)
    .filter((f) => /\.(mjs|js|ts)$/.test(f))
    .filter((f) =>
      /import\.meta\.url\s*===\s*pathToFileURL\(\s*process\.argv\[1\]/.test(
        fs.readFileSync(path.join(dir, f), "utf8")
      )
    );
  assert.deepEqual(offenders, []);
});
