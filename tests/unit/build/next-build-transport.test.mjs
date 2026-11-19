import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const helper = join(root, "scripts/ci/unpack-next-build.py");
const posix = { skip: process.platform === "win32", timeout: 15000 };
const hash = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
function directory(t) {
  mkdirSync(join(root, "_artifacts"), { recursive: true });
  const path = mkdtempSync(join(root, "_artifacts/next-transport-"));
  t.after(() => rmSync(path, { recursive: true, force: true }));
  return path;
}
function python(args, cwd, env = {}) {
  const result = spawnSync("python3", args, {
    cwd,
    env: { PATH: process.env.PATH, ...env },
    encoding: "utf8",
    timeout: 10000,
    maxBuffer: 1024 * 1024,
  });
  assert.equal(result.error, undefined);
  return result;
}
function zip(t, mode = "valid") {
  const cwd = directory(t);
  mkdirSync(join(cwd, "download"));
  const archive = join(cwd, "download/input.zip");
  const make = python(
    [
      "-c",
      `
import sys, zipfile, warnings
warnings.simplefilter("ignore", UserWarning)
mode, path = sys.argv[1:]
with zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED) as output:
    output.writestr("e2e-build.tar.gz", b"tiny tar placeholder")
    if mode != "missing":
        info = zipfile.ZipInfo("next-build-provenance.json")
        if mode == "symlink": info.external_attr = 0o120777 << 16
        output.writestr(info, b"x" * 65537 if mode == "oversize" else b"{}")
    if mode == "extra": output.writestr("extra.txt", b"x")
    if mode == "duplicate": output.writestr("next-build-provenance.json", b"{}")
    if mode == "escape": output.writestr("../escape.txt", b"x")
`,
      mode,
      archive,
    ],
    cwd
  );
  assert.equal(make.status, 0, make.stderr);
  const env = { NEXT_BUILD_ARTIFACT_ID: "123", NEXT_BUILD_ARTIFACT_DIGEST: hash(archive) };
  return { cwd, archive, env, output: join(cwd, "verified") };
}

test("the raw Actions ZIP is hashed before its two regular members are copied", posix, (t) => {
  const f = zip(t);
  const result = python([helper, "unpack", "download", "verified"], f.cwd, f.env);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(readFileSync(join(f.output, "e2e-build.tar.gz"), "utf8"), "tiny tar placeholder");
  const receipt = JSON.parse(readFileSync(join(f.output, "zip-verification.json")));
  assert.equal(receipt.artifactId, "123");
  assert.equal(receipt.sha256, f.env.NEXT_BUILD_ARTIFACT_DIGEST);
});

for (const mode of ["missing", "extra", "duplicate", "escape", "symlink", "oversize"]) {
  test(`ZIP ${mode} member is refused before copying payloads`, posix, (t) => {
    const f = zip(t, mode);
    const result = python([helper, "unpack", "download", "verified"], f.cwd, f.env);
    assert.equal(result.status, 1, result.stderr);
    assert.match(result.stderr, /PREBUILT_NEXT_REQUIRED: zip-/);
    assert.equal(existsSync(f.output), false);
  });
}

test("a changed ZIP cannot use its original digest", posix, (t) => {
  const f = zip(t);
  const result = python([helper, "unpack", "download", "verified"], f.cwd, {
    ...f.env,
    NEXT_BUILD_ARTIFACT_DIGEST: "0".repeat(64),
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /zip-digest-mismatch/);
  assert.equal(existsSync(f.output), false);
});

function tar(t, additions = []) {
  const cwd = directory(t);
  const members = [
    { name: ".build/next", type: "directory" },
    { name: ".build/next/standalone", type: "directory" },
    { name: ".build/next/BUILD_ID", data: "fixture-build" },
    { name: ".build/next/standalone/server.js", data: "module.exports = 1;" },
    ...additions,
  ];
  const archive = join(cwd, "input.tar.gz");
  const make = python(
    [
      "-c",
      `
import io, json, sys, tarfile
members, path = json.loads(sys.argv[1]), sys.argv[2]
with tarfile.open(path, "w:gz") as output:
    for item in members:
        info = tarfile.TarInfo(item["name"])
        kind = item.get("type", "file")
        info.type = {"directory": tarfile.DIRTYPE, "file": tarfile.REGTYPE,
            "symlink": tarfile.SYMTYPE, "hardlink": tarfile.LNKTYPE, "fifo": tarfile.FIFOTYPE}[kind]
        info.linkname = item.get("target", "")
        data = item.get("data", "").encode()
        info.size = len(data) if kind == "file" else 0
        output.addfile(info, io.BytesIO(data) if kind == "file" else None)
`,
      JSON.stringify(members),
      archive,
    ],
    cwd
  );
  assert.equal(make.status, 0, make.stderr);
  return { cwd, archive };
}

test("tar retains legitimate relative symlinks and hard links", posix, (t) => {
  const f = tar(t, [
    { name: ".build/next/standalone/alias.js", type: "symlink", target: "server.js" },
    {
      name: ".build/next/standalone/hard.js",
      type: "hardlink",
      target: ".build/next/standalone/server.js",
    },
  ]);
  const result = python([helper, "inspect", f.archive], f.cwd);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(existsSync(join(f.cwd, ".build/next")), false, "inspection does not extract");
});

for (const [name, additions, code] of [
  ["path traversal", [{ name: ".build/next/../../escape", data: "x" }], "tar-path-escape"],
  ["absolute path", [{ name: "/tmp/next-proof-escape", data: "x" }], "tar-path-escape"],
  ["Windows drive", [{ name: "C:/escape", data: "x" }], "tar-path-invalid"],
  ["backslash path", [{ name: ".build\\next\\escape", data: "x" }], "tar-path-invalid"],
  ["duplicate file", [{ name: ".build/next/BUILD_ID", data: "other" }], "duplicate-tar-member"],
  [
    "escaping symlink",
    [{ name: ".build/next/standalone/link", type: "symlink", target: "../../../escape" }],
    "tar-symlink-escape",
  ],
  [
    "escaping hardlink",
    [{ name: ".build/next/standalone/link", type: "hardlink", target: "../escape" }],
    "tar-path-escape",
  ],
  [
    "link ancestor",
    [
      { name: ".build/next/standalone/link", type: "symlink", target: "." },
      { name: ".build/next/standalone/link/injected", data: "x" },
    ],
    "tar-link-ancestor",
  ],
  ["special node", [{ name: ".build/next/standalone/fifo", type: "fifo" }], "special-tar-member"],
  [
    "imported consumer receipt",
    [{ name: ".build/next/.omniroute-next-input.json", data: "{}" }],
    "tar-excluded-member",
  ],
]) {
  test(`tar rejects ${name} before extraction`, posix, (t) => {
    const f = tar(t, additions);
    const result = python([helper, "inspect", f.archive], f.cwd);
    assert.equal(result.status, 1, result.stderr);
    assert.match(result.stderr, new RegExp(code));
    assert.equal(existsSync(join(f.cwd, ".build/next")), false);
  });
}
