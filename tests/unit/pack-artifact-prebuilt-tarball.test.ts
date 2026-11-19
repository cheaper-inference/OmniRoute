import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { computeMcpClosure } from "../../scripts/build/mcpPublishedFilesClosure.ts";
import { PACK_ARTIFACT_REQUIRED_PATHS } from "../../scripts/build/pack-artifact-policy.ts";
import {
  describeManifestMismatch,
  parsePaxRecords,
  readPackedTarball,
} from "../../scripts/build/packedTarballContents.ts";
import { PACKED_TARBALL_ENV, runGateWithNpmShim } from "../helpers/packedTarballGate.ts";

/**
 * #20644 — check:pack-artifact ran its own `npm pack --dry-run --json` (12–22 min on the
 * v3.8.54 publish runs) and validated that second pack, not the tarball the publish job
 * packs once (#20556), boots and uploads. With --tarball / OMNIROUTE_PACKED_TARBALL the
 * gate now reads the file list, sizes, package.json and dist/BUILD_SHA from the tarball
 * itself and runs every policy check on them, without calling npm at all. The script runs
 * here with npm replaced by a recording shim (PATH and npm_execpath), so a stray
 * `npm pack` or `npm run build:cli` shows up in `npmCalls`.
 */

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SCRIPT_PATH = path.join(REPO_ROOT, "scripts/build/validate-pack-artifact.ts");
const ROOT_MANIFEST = JSON.parse(readFileSync(path.join(REPO_ROOT, "package.json"), "utf8"));
const HEAD_SHA = execFileSync("git", ["rev-parse", "HEAD"], { cwd: REPO_ROOT, encoding: "utf8" })
  .trim()
  .slice(0, 12);

const MCP_CLOSURE = computeMcpClosure(REPO_ROOT);

/** Write a gzipped tar of `package/<path>` = content for every entry of `files`. */
function makePackageTarball(
  dir: string,
  files: Record<string, string | Buffer>,
  name = "fixture.tgz",
  tarArgs: string[] = []
): string {
  const staging = mkdtempSync(path.join(os.tmpdir(), "pack-artifact-tarball-src-"));
  try {
    for (const [relative, content] of Object.entries(files)) {
      const target = path.join(staging, "package", relative);
      mkdirSync(path.dirname(target), { recursive: true });
      writeFileSync(target, content);
    }
    const tarball = path.join(dir, name);
    execFileSync("tar", [...tarArgs, "-czf", tarball, "-C", staging, "package"]);
    return tarball;
  } finally {
    rmSync(staging, { recursive: true, force: true });
  }
}

/** A tarball holding everything the gate requires: manifest, required paths, MCP closure. */
function completePackageFiles(overrides: Record<string, string | Buffer | null> = {}) {
  const files: Record<string, string | Buffer> = {
    "package.json": JSON.stringify({ name: ROOT_MANIFEST.name, version: ROOT_MANIFEST.version }),
    "dist/BUILD_SHA": `${HEAD_SHA}\n`,
  };
  for (const required of PACK_ARTIFACT_REQUIRED_PATHS) files[required] ??= "";
  for (const closurePath of MCP_CLOSURE) files[closurePath] ??= "";
  for (const [relative, content] of Object.entries(overrides)) {
    if (content === null) delete files[relative];
    else files[relative] = content;
  }
  return files;
}

function withDir(fn: (dir: string) => void | Promise<void>) {
  return async () => {
    const dir = mkdtempSync(path.join(os.tmpdir(), "pack-artifact-prebuilt-"));
    try {
      await fn(dir);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  };
}

function runGate(args: string[], env: Record<string, string> = {}) {
  return runGateWithNpmShim(
    SCRIPT_PATH,
    REPO_ROOT,
    args,
    // HEAD is always an ancestor of itself, also in a shallow CI checkout.
    { OMNIROUTE_RELEASE_REF: "HEAD", OMNIROUTE_ALLOW_CANARY_BUILD: "", ...env },
    { nodeArgs: ["--import", "tsx"], timeout: 120_000 }
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex++;
  }
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`;
}

// ── readPackedTarball ─────────────────────────────────────────────────────────

for (const [format, tarArgs] of [
  ["GNU", []],
  ["pax", ["--format=posix"]],
] as const) {
  test(
    `readPackedTarball lists a ${format} tarball like tar -tzf, with sizes from the entries`,
    withDir(async (dir) => {
      const longDir = `deep/${"d".repeat(120)}`;
      const tarball = makePackageTarball(
        dir,
        {
          "package.json": '{"name":"x","version":"1.0.0"}',
          "dist/server.js": "x".repeat(1500),
          [`${longDir}/${"f".repeat(90)}.js`]: "abc",
          "empty.txt": "",
        },
        "fmt.tgz",
        [...tarArgs]
      );
      const contents = await readPackedTarball(tarball, { capture: ["package.json"] });

      const tarList = execFileSync("tar", ["-tzf", tarball], { encoding: "utf8" })
        .split("\n")
        .filter((line) => line && !line.endsWith("/"))
        .map((line) => line.replace(/^package\//, ""))
        .sort();
      assert.deepEqual(contents.files.map((file) => file.path).sort(), tarList);
      assert.equal(contents.entryCount, 4);
      assert.equal(contents.unpackedSize, 30 + 1500 + 3 + 0);
      assert.equal(contents.size, statSync(tarball).size, "packed size is the file's size");
      assert.equal(contents.filename, "fmt.tgz");
      assert.deepEqual(contents.captured, { "package.json": '{"name":"x","version":"1.0.0"}' });
    })
  );
}

test(
  "readPackedTarball keeps entries outside package/ under their full name",
  withDir(async (dir) => {
    const staging = path.join(dir, "src");
    mkdirSync(path.join(staging, "package"), { recursive: true });
    mkdirSync(path.join(staging, "stray"), { recursive: true });
    writeFileSync(path.join(staging, "package", "package.json"), "{}");
    writeFileSync(path.join(staging, "stray", "x.js"), "1");
    const tarball = path.join(dir, "stray.tgz");
    execFileSync("tar", ["-czf", tarball, "-C", staging, "package", "stray"]);
    const contents = await readPackedTarball(tarball);
    assert.deepEqual(contents.files.map((file) => file.path).sort(), [
      "package.json",
      "stray/x.js",
    ]);
  })
);

test(
  "readPackedTarball rejects a file that is not a gzipped tar",
  withDir(async (dir) => {
    const bogus = path.join(dir, "bogus.tgz");
    writeFileSync(bogus, "not a tarball");
    await assert.rejects(readPackedTarball(bogus), /cannot read bogus\.tgz as a gzipped tar/);
  })
);

test("parsePaxRecords reads path and size records", () => {
  const record = (body: string) => {
    let length = body.length + 3;
    if (String(length).length + body.length + 2 !== length) length += 1;
    return `${length} ${body}\n`;
  };
  const data = Buffer.from(record("path=package/a/b.js") + record("size=12"));
  assert.deepEqual(parsePaxRecords(data), { path: "package/a/b.js", size: "12" });
});

test("describeManifestMismatch reports name and version like check-pack-boot", () => {
  const expected = { name: "omniroute", version: "3.8.55" };
  assert.deepEqual(
    describeManifestMismatch('{"name":"omniroute","version":"3.8.55"}', expected),
    []
  );
  assert.deepEqual(
    describeManifestMismatch(
      '{"name":"@cheaper-inference/omniroute","version":"3.8.54"}',
      expected
    ),
    [
      'name "@cheaper-inference/omniroute" (expected "omniroute")',
      'version "3.8.54" (expected "3.8.55")',
    ]
  );
  assert.deepEqual(describeManifestMismatch(undefined, expected), [
    "no package/package.json (not an npm tarball?)",
  ]);
});

// ── validate-pack-artifact.ts --tarball ───────────────────────────────────────

test(
  "a complete prebuilt tarball passes every check without calling npm",
  withDir((dir) => {
    const files = completePackageFiles();
    const tarball = makePackageTarball(dir, files, "complete.tgz");
    const run = runGate(["--tarball", tarball]);

    assert.equal(run.status, 0, run.stdout + run.stderr);
    assert.deepEqual(run.npmCalls, [], "no npm pack, no npm run build:cli");
    assert.match(run.stdout, /Validating the prebuilt tarball .*complete\.tgz — not packing/);
    assert.match(run.stdout, /File:\s+complete\.tgz/);
    assert.match(run.stdout, new RegExp(`Entry count:\\s+${Object.keys(files).length}\\b`));
    const packedSize = formatBytes(statSync(tarball).size);
    assert.match(run.stdout, new RegExp(`Packed size:\\s+${packedSize.replace(".", "\\.")}`));
    assert.match(run.stdout, new RegExp(`BUILD_SHA ${HEAD_SHA} is on the release line`));
    assert.match(run.stdout, /Pack artifact policy check passed/);
  })
);

test(
  "a prebuilt tarball with policy violations fails with every finding",
  withDir((dir) => {
    const [firstClosurePath] = MCP_CLOSURE;
    const tarball = makePackageTarball(
      dir,
      completePackageFiles({
        "dist/server.js": null,
        [firstClosurePath]: null,
        "scripts/ad-hoc/leftover.mjs": "",
        "open-sse/services/combo.test.ts": "",
      }),
      "violations.tgz"
    );
    const run = runGate(["--tarball", tarball]);
    assert.equal(run.status, 1, run.stdout + run.stderr);
    assert.deepEqual(run.npmCalls, []);
    assert.match(run.stderr, /Required runtime files are missing[\s\S]*- dist\/server\.js/);
    assert.match(run.stderr, /Unexpected files[\s\S]*- scripts\/ad-hoc\/leftover\.mjs/);
    assert.match(run.stderr, /Test\/spec files leaked[\s\S]*- open-sse\/services\/combo\.test\.ts/);
    assert.match(run.stderr, /MCP-reachable source files are missing/);
    assert.ok(run.stderr.includes(`- ${firstClosurePath}`), run.stderr);
  })
);

test(
  "provenance is judged on the tarball's own dist/BUILD_SHA",
  withDir((dir) => {
    const tarball = makePackageTarball(
      dir,
      completePackageFiles({ "dist/BUILD_SHA": null }),
      "unstamped.tgz"
    );
    const run = runGate(["--tarball", tarball]);
    assert.equal(run.status, 1, run.stdout + run.stderr);
    assert.match(run.stdout, /dist\/BUILD_SHA is missing/);
    assert.match(run.stderr, /Build provenance check failed/);
  })
);

test(
  "a prebuilt tarball with another version fails before any check",
  withDir((dir) => {
    const tarball = makePackageTarball(
      dir,
      completePackageFiles({
        "package.json": JSON.stringify({ name: ROOT_MANIFEST.name, version: "0.0.1" }),
      }),
      "stale.tgz"
    );
    const run = runGate(["--tarball", tarball]);
    assert.equal(run.status, 1, run.stdout + run.stderr);
    assert.deepEqual(run.npmCalls, []);
    assert.ok(
      run.stderr.includes(
        `prebuilt tarball stale.tgz does not match ./package.json: version "0.0.1" (expected "${ROOT_MANIFEST.version}")`
      ),
      run.stderr
    );
    assert.doesNotMatch(run.stdout, /npm pack artifact summary/);
  })
);

test(
  "a missing tarball named by OMNIROUTE_PACKED_TARBALL fails without packing",
  withDir((dir) => {
    const run = runGate([], { [PACKED_TARBALL_ENV]: path.join(dir, "absent.tgz") });
    assert.equal(run.status, 1, run.stdout + run.stderr);
    assert.deepEqual(run.npmCalls, []);
    assert.match(run.stderr, /prebuilt tarball not found: .*absent\.tgz/);
  })
);

test("without a prebuilt tarball the gate still runs npm pack --dry-run (local behavior)", () => {
  // --policy-only skips the build:cli staging step, so the first npm call is the pack. The
  // shim prints no JSON, so the gate then stops on the missing files[] payload.
  const run = runGate(["--policy-only"]);
  assert.equal(run.status, 1, run.stdout + run.stderr);
  assert.match(run.npmCalls[0] ?? "", /^pack --dry-run --json --ignore-scripts$/);
  assert.match(run.stderr, /did not return the expected files\[\] payload/);
});
