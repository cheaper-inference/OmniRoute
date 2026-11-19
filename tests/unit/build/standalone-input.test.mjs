import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import {
  measureNextTree,
  nextDistPath,
  NEXT_INPUT_RECEIPT,
  portableLinkTarget,
  readNextInput,
  sha256,
  writeNextInput,
} from "../../../scripts/build/standaloneInput.mjs";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const helper = new URL("../../../scripts/build/standaloneInput.mjs", import.meta.url).href;
const posix = { skip: process.platform === "win32", timeout: 15000 };

test("Windows separators normalize relative link evidence without admitting absolute links", () => {
  assert.equal(portableLinkTarget("..\\fixture\\cli.js", "win32"), "../fixture/cli.js");
  assert.equal(portableLinkTarget("../fixture/cli.js", "linux"), "../fixture/cli.js");
  assert.throws(() => portableLinkTarget("C:\\outside", "win32"), /unsafe-next-link/);
  assert.throws(() => portableLinkTarget("\\\\server\\outside", "win32"), /unsafe-next-link/);
  assert.throws(() => portableLinkTarget("..\\outside", "linux"), /unsafe-next-link/);
});

test("fresh input paths cannot designate source, private repositories or sibling worktrees", () => {
  for (const path of [
    ".",
    "..",
    "_tasks",
    "scripts",
    ".claude/worktrees/sibling",
    ".build/../_tasks",
  ]) {
    assert.throws(() => nextDistPath(root, { NEXT_DIST_DIR: path }), /unsafe-next-directory/);
  }
  assert.equal(
    nextDistPath(root, { NEXT_DIST_DIR: ".build/next-release" }),
    join(root, ".build/next-release")
  );
});

function fixture(t) {
  mkdirSync(join(root, "_artifacts"), { recursive: true });
  const directory = mkdtempSync(join(root, "_artifacts/next-input-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const dist = join(directory, ".build/next");
  mkdirSync(join(dist, "standalone"), { recursive: true });
  mkdirSync(join(directory, "bin"));
  mkdirSync(join(directory, "dist"));
  writeFileSync(join(directory, "dist/prior-staging"), "preserve");
  writeFileSync(join(dist, "standalone/server.js"), "module.exports = 1;\n");
  writeFileSync(join(dist, "BUILD_ID"), "current-build-id\n");
  const lock = '{"lockfileVersion":3}\n';
  writeFileSync(join(directory, "package-lock.json"), lock);
  const source = {
    candidateSha: "1".repeat(40),
    treeSha: "2".repeat(40),
    lockfileSha256: sha256(lock),
  };
  writeFileSync(
    join(directory, "bin/git"),
    `#!${process.execPath}\n
    if (process.argv[2] === "rev-parse") console.log(process.argv[3] === "HEAD"
      ? (process.env.FIXTURE_SHA || "${source.candidateSha}") : "${source.treeSha}");
    if (process.argv[2] === "status" && process.env.FIXTURE_DIRTY) console.log(" M source.ts");
  `,
    { mode: 0o755 }
  );
  const proof = writeNextInput(
    dist,
    source,
    { kind: "ci", runId: "7", runAttempt: "1" },
    measureNextTree(dist)
  );
  const env = {
    PATH: `${join(directory, "bin")}:${process.env.PATH}`,
    OMNIROUTE_NEXT_INPUT_SHA256: proof.sha256,
  };
  const verify = (extra = {}) =>
    spawnSync(
      process.execPath,
      [
        "--input-type=module",
        "-e",
        `
    import { verifyNextInput } from ${JSON.stringify(helper)};
    try { verifyNextInput(process.argv[1]); }
    catch (error) { console.error(error.code || "input-incomplete"); process.exitCode = 1; }
  `,
        directory,
      ],
      { cwd: directory, env: { ...env, ...extra }, encoding: "utf8", timeout: 10000 }
    );
  return { directory, dist, env, source, proof, verify };
}

test("strict input verifies content, source and an independent receipt digest", posix, (t) => {
  const f = fixture(t);
  const result = f.verify();
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(existsSync(join(f.directory, "dist/prior-staging")), true);
  assert.equal(readNextInput(f.dist, f.proof.sha256).source.candidateSha, f.source.candidateSha);
});

for (const [name, change, code] of [
  [
    "same-sized changed server bytes",
    (f) => writeFileSync(join(f.dist, "standalone/server.js"), "module.exports = 2;\n"),
    "next-input-bytes-mismatch",
  ],
  [
    "a changed asset",
    (f) => writeFileSync(join(f.dist, "new-asset.js"), "unsealed"),
    "next-input-bytes-mismatch",
  ],
  [
    "a changed lockfile",
    (f) => writeFileSync(join(f.directory, "package-lock.json"), '{"lockfileVersion":2}\n'),
    "next-input-source-mismatch",
  ],
  [
    "a relabeled receipt",
    (f) => {
      const path = join(f.dist, NEXT_INPUT_RECEIPT);
      const value = JSON.parse(readFileSync(path));
      value.source.candidateSha = "3".repeat(40);
      writeFileSync(path, JSON.stringify(value));
    },
    "next-input-receipt-mismatch",
  ],
]) {
  test(`strict input rejects ${name} and leaves staging untouched`, posix, (t) => {
    const f = fixture(t);
    change(f);
    const result = f.verify();
    assert.equal(result.status, 1, result.stderr);
    assert.match(result.stderr, new RegExp(code));
    assert.equal(readFileSync(join(f.directory, "dist/prior-staging"), "utf8"), "preserve");
  });
}

for (const [name, extra, code] of [
  [
    "self-declared evidence without an independent digest",
    { OMNIROUTE_NEXT_INPUT_SHA256: "" },
    "missing-independent-input-digest",
  ],
  ["a different candidate", { FIXTURE_SHA: "3".repeat(40) }, "next-input-source-mismatch"],
  ["modified tracked inputs", { FIXTURE_DIRTY: "1" }, "dirty-checkout"],
]) {
  test(`strict input rejects ${name}`, posix, (t) => {
    const f = fixture(t);
    const result = f.verify(extra);
    assert.equal(result.status, 1, result.stderr);
    assert.match(result.stderr, new RegExp(code));
  });
}

test("cache changes do not alter the transported output fingerprint", posix, (t) => {
  const f = fixture(t);
  mkdirSync(join(f.dist, "cache"));
  writeFileSync(join(f.dist, "cache/untransported"), "changed cache");
  assert.equal(f.verify().status, 0);
});

test("fingerprints preserve internal links and reject links leaving the artifact", posix, (t) => {
  const f = fixture(t);
  symlinkSync("server.js", join(f.dist, "standalone/server-alias.js"));
  const internal = measureNextTree(f.dist);
  assert.equal(internal.links, 1);
  symlinkSync("../../../package-lock.json", join(f.dist, "standalone/outside"));
  assert.throws(() => measureNextTree(f.dist), /escaping-next-link/);
});

test("BUILD_ID alone cannot establish a complete Next input", posix, (t) => {
  const f = fixture(t);
  rmSync(join(f.dist, "standalone"), { recursive: true });
  assert.throws(() => measureNextTree(f.dist));
  assert.equal(f.verify().status, 1);
  assert.equal(existsSync(join(f.directory, "dist/prior-staging")), true);
});
