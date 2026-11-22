/**
 * Regression guards for #21014 high-priority supply-chain & CI hardening:
 *   1. Dockerfile.bun copies package-lock.json and runs `bun install --frozen-lockfile --ignore-scripts`
 *   2. nightly-llm-security.yml pins `pip install garak==...` inside the secret-bearing job
 *   3. Floating CI/build tools are pinned or locked (`ci.yml` test-bun-sqlite,
 *      `npm-publish.yml` CycloneDX `--no-install`, `nightly-schemathesis.yml` &
 *      `dast-smoke.yml` `schemathesis==...`, `build:native:tproxy` without `npx --yes`,
 *      `docker/vnc-browser/chromium/Dockerfile` digest-pinned)
 *   4. Dependency audit gate (`audit-dependencies.mjs` + `audit:electron`) blocks on `high`
 *   5. Secret-scan gaps closed: `.gitleaks.toml` path-segment anchors (no substring
 *      blind-spot on `*dist*`/`*coverage*` filenames), expanded `SECRET_SCAN_DIRS`,
 *      and full staged pre-commit scan wired into `.husky/pre-commit`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  SECRET_SCAN_DIRS,
  buildStagedGitleaksArgs,
  findGitleaks,
} from "../../scripts/check/check-secrets.mjs";
import {
  auditDependencies,
  evaluateAuditResult,
} from "../../scripts/quality/audit-dependencies.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");

function stripHashComments(source) {
  return source
    .split("\n")
    .filter((line) => !/^\s*#/.test(line))
    .join("\n");
}

// ── 1. Dockerfile.bun frozen lockfile + --ignore-scripts ─────────────────────

test("Dockerfile.bun copies package-lock.json and enforces --frozen-lockfile --ignore-scripts (#21014)", () => {
  const bunDocker = stripHashComments(read("Dockerfile.bun"));
  assert.match(
    bunDocker,
    /^COPY\s+package\.json\s+package-lock\.json\b/m,
    "Dockerfile.bun builder must copy package-lock.json so Bun has a lockfile to enforce"
  );
  assert.match(
    bunDocker,
    /^RUN\s+test\s+-f\s+package-lock\.json\b/m,
    "Dockerfile.bun must fail closed if the lockfile is missing from build context"
  );
  assert.match(
    bunDocker,
    /^RUN\s+bun\s+install\s+--frozen-lockfile\s+--ignore-scripts\b/m,
    "Dockerfile.bun must enforce --frozen-lockfile and --ignore-scripts"
  );
  assert.doesNotMatch(
    bunDocker,
    /^RUN\s+bun\s+install(?!.*--frozen-lockfile)/m,
    "no unfrozen `bun install` may remain in Dockerfile.bun"
  );
});

// ── 2. Nightly LLM Security garak exact version pin ──────────────────────────

test("nightly-llm-security.yml pins garak to an exact PyPI version (#21014)", () => {
  const wf = stripHashComments(read(".github/workflows/nightly-llm-security.yml"));
  assert.doesNotMatch(
    wf,
    /pip\s+install\s+(?:--[^\s]+\s+)*garak\s*$/m,
    "unpinned `pip install garak` in a job holding PROMPTFOO_PROVIDER_KEY is forbidden"
  );
  assert.match(
    wf,
    /pip\s+install\s+--disable-pip-version-check\s+garak==\d+\.\d+\.\d+\b/,
    "garak must be pinned with ==x.y.z"
  );
});

// ── 3. Floating CI & build tooling pins ──────────────────────────────────────

test("ci.yml test-bun-sqlite uses lockfile-pinned Bun instead of remote/global installers (#21014)", () => {
  const ci = stripHashComments(read(".github/workflows/ci.yml"));
  assert.doesNotMatch(
    ci,
    /bun\.sh\/install\.ps1/,
    "ci.yml must never pipe bun.sh/install.ps1 into PowerShell"
  );
  assert.doesNotMatch(
    ci,
    /npm\s+install\s+-g\s+bun\b/,
    "ci.yml must never run unpinned `npm install -g bun`"
  );
  assert.match(
    ci,
    /npx\s+--no-install\s+bun\s+--version/,
    "test-bun-sqlite must verify the lockfile-pinned local bun binary via npx --no-install"
  );
});

test("npm-publish.yml runs CycloneDX with npx --no-install (#21014)", () => {
  const wf = stripHashComments(read(".github/workflows/npm-publish.yml"));
  assert.match(
    wf,
    /npx\s+--no-install\s+@cyclonedx\/cyclonedx-npm\b/,
    "SBOM generation must execute the lockfile-pinned @cyclonedx/cyclonedx-npm with --no-install"
  );
  assert.doesNotMatch(
    wf,
    /npx\s+@cyclonedx\/cyclonedx-npm\b/,
    "bare `npx @cyclonedx/cyclonedx-npm` without --no-install must not remain"
  );
});

test("schemathesis workflows pin exact PyPI versions (#21014)", () => {
  for (const rel of [
    ".github/workflows/nightly-schemathesis.yml",
    ".github/workflows/dast-smoke.yml",
  ]) {
    const wf = stripHashComments(read(rel));
    assert.doesNotMatch(
      wf,
      /pip\s+install\s+(?:--[^\s]+\s+)*schemathesis\s*$/m,
      `${rel} must not run unpinned pip install schemathesis`
    );
    assert.match(
      wf,
      /pip\s+install\s+--disable-pip-version-check\s+schemathesis==\d+\.\d+\.\d+\b/,
      `${rel} must pin schemathesis==x.y.z`
    );
  }
});

test("tproxy native build and VNC chromium Dockerfile contain no floating latest/npx --yes (#21014)", () => {
  const pkg = JSON.parse(read("package.json"));
  assert.doesNotMatch(
    pkg.scripts?.["build:native:tproxy"] ?? "",
    /npx\s+--yes/,
    "package.json build:native:tproxy must not use npx --yes"
  );
  const tproxyHelper = read("scripts/build/build-tproxy-native.mjs")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .filter((l) => !/^\s*\/\//.test(l))
    .join("\n");
  assert.doesNotMatch(tproxyHelper, /npx/, "build-tproxy-native.mjs must not spawn npx");

  const chromiumDocker = stripHashComments(read("docker/vnc-browser/chromium/Dockerfile"));
  assert.doesNotMatch(chromiumDocker, /:latest\b/, "VNC chromium Dockerfile must not use :latest");
  assert.match(
    chromiumDocker,
    /^FROM\s+linuxserver\/chromium:[^\s@]+@sha256:[a-f0-9]{64}\s*$/m,
    "VNC chromium Dockerfile must pin tag + sha256 digest"
  );
});

// ── 4. Dependency audit blocks high severity ─────────────────────────────────

test("dependency audit blocks on high-severity advisories as well as critical (#21014)", () => {
  const highVerdict = evaluateAuditResult({
    status: 1,
    stdout: JSON.stringify({
      auditReportVersion: 2,
      metadata: {
        vulnerabilities: { info: 0, low: 0, moderate: 0, high: 1, critical: 0, total: 1 },
      },
    }),
  });
  assert.equal(highVerdict.state, "FAIL", "high=1 must fail evaluateAuditResult");

  const pkg = JSON.parse(read("package.json"));
  assert.equal(pkg.scripts?.["audit:electron"], "npm --prefix electron audit --audit-level=high");

  const report = auditDependencies({
    root: "/nonexistent-root-for-policy-check",
    scopes: [],
    run: () => {
      throw new Error("must not run");
    },
  });
  assert.equal(report.policy.blockingSeverity, "high");
  assert.equal(report.policy.high, "blocking");
});

// ── 5. Secret-scan hardening (.gitleaks.toml + check-secrets.mjs + pre-commit) ─

test(".gitleaks.toml anchors path exclusions on directory segments and covers expanded dirs + pre-commit (#21014)", () => {
  const toml = stripHashComments(read(".gitleaks.toml"));
  for (const bare of ["'''dist'''", "'''coverage'''", "'''node_modules'''"]) {
    assert.ok(
      !toml.includes(bare),
      `.gitleaks.toml must not contain unanchored ${bare} (blind-spots files like src/distributed.ts)`
    );
  }
  assert.match(toml, /\(\^\|\[\/\\\\\]\)dist\(\[\/\\\\\]\|\$\)/);
  assert.match(toml, /\(\^\|\[\/\\\\\]\)coverage\(\[\/\\\\\]\|\$\)/);

  for (const requiredDir of [
    "src",
    "open-sse",
    "bin",
    "electron",
    "scripts",
    "packages",
    "@omniroute",
    "deploy",
    "docker",
    ".github",
    "config",
    "skills",
  ]) {
    assert.ok(
      SECRET_SCAN_DIRS.includes(requiredDir),
      `SECRET_SCAN_DIRS must include ${requiredDir}`
    );
  }

  const stagedArgs = buildStagedGitleaksArgs(path.join(ROOT, ".gitleaks.toml"));
  assert.ok(stagedArgs.includes("git") && stagedArgs.includes("--staged"));
  assert.ok(stagedArgs.includes("--pre-commit") && stagedArgs.includes("--redact"));
  const exitCodeFlagIdx = stagedArgs.indexOf("--exit-code");
  assert.ok(
    exitCodeFlagIdx !== -1 && stagedArgs[exitCodeFlagIdx + 1] === "99",
    "buildStagedGitleaksArgs must pass --exit-code 99 so findings are distinct from gitleaks exit-1 errors"
  );

  const preCommit = stripHashComments(read(".husky/pre-commit"));
  assert.match(
    preCommit,
    /node\s+scripts\/check\/check-secrets\.mjs\s+--staged\b/,
    ".husky/pre-commit must run check-secrets.mjs --staged"
  );
});

test("check-secrets.mjs --staged treats only exit 99 as findings and fails closed (exit 2) on exit 1 with empty report (#21014)", (t) => {
  const tmpBin = fs.mkdtempSync(path.join(os.tmpdir(), "gitleaks-stub-21014-"));
  t.after(() => fs.rmSync(tmpBin, { recursive: true, force: true }));

  const writeStubGitleaks = (body) => {
    const stubPath = path.join(tmpBin, "gitleaks");
    fs.writeFileSync(stubPath, `#!/bin/sh\n${body}\n`, { mode: 0o755 });
  };

  const runStaged = () =>
    spawnSync(process.execPath, [path.join(ROOT, "scripts/check/check-secrets.mjs"), "--staged"], {
      cwd: ROOT,
      encoding: "utf8",
      env: {
        ...process.env,
        PATH: `${tmpBin}:${process.env.PATH}`,
      },
    });

  // 1. Operational/config error where gitleaks exits 1 and writes `[]` (or `null`) to stdout:
  // must fail closed with exit 2 — NEVER pass silently with exit 0!
  writeStubGitleaks('printf "[]\\n"\nprintf "fatal: bad git index\\n" >&2\nexit 1');
  const errEmptyArray = runStaged();
  assert.equal(
    errEmptyArray.status,
    2,
    "gitleaks exit 1 with [] stdout must fail closed with exit 2 (never exit 0)"
  );
  assert.match(errEmptyArray.stderr, /ERRO ao executar gitleaks/);

  writeStubGitleaks('printf "null\\n"\nexit 1');
  const errNull = runStaged();
  assert.equal(errNull.status, 2, "gitleaks exit 1 with null stdout must fail closed with exit 2");

  // 2. Findings detected via configured --exit-code 99 -> exits 1 (blocks commit)
  writeStubGitleaks(
    'printf \'[{"RuleID":"github-pat","File":"secret.env","StartLine":1}]\\n\'\nexit 99'
  );
  const leakDetected = runStaged();
  assert.equal(leakDetected.status, 1, "gitleaks exit 99 with findings must exit 1 (BLOQUEADO)");
  assert.match(leakDetected.stderr, /BLOQUEADO/);

  // 3. Clean staged scan (exit 0, empty array) -> exits 0
  writeStubGitleaks('printf "[]\\n"\nexit 0');
  const cleanScan = runStaged();
  assert.equal(cleanScan.status, 0, "clean gitleaks exit 0 must exit 0");
});

test("live gitleaks (when installed) catches secrets in src/distributed.ts and staged commits while ignoring dist/ (#21014)", (t) => {
  const gitleaksBin = findGitleaks();
  if (!gitleaksBin) {
    t.skip("gitleaks binary not installed in PATH");
    return;
  }

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "gitleaks-21014-"));
  t.after(() => fs.rmSync(tmp, { recursive: true, force: true }));

  fs.mkdirSync(path.join(tmp, "src"), { recursive: true });
  fs.mkdirSync(path.join(tmp, "dist"), { recursive: true });
  // Synthetic 36-alnum token shape for test fixture only (not a real credential).
  const fakePat = ["ghp", "a1B2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8"].join("_");
  fs.writeFileSync(path.join(tmp, "src", "distributed.ts"), `export const k = "${fakePat}";\n`);
  fs.writeFileSync(path.join(tmp, "src", "coverageHelper.ts"), `export const k = "${fakePat}";\n`);
  fs.writeFileSync(path.join(tmp, "dist", "bundle.js"), `export const k = "${fakePat}";\n`);

  // 1. Directory scan must catch BOTH src/distributed.ts and src/coverageHelper.ts, and ignore dist/bundle.js.
  const srcRes = spawnSync(
    gitleaksBin,
    [
      "dir",
      "src",
      "--config",
      path.join(ROOT, ".gitleaks.toml"),
      "--report-format",
      "json",
      "--report-path",
      "-",
      "--no-banner",
    ],
    { cwd: tmp, encoding: "utf8" }
  );
  assert.equal(srcRes.status, 1, "gitleaks must flag secrets in src/distributed.ts");
  const srcFindings = JSON.parse(srcRes.stdout);
  const flaggedFiles = srcFindings.map((f) => f.File).sort();
  assert.deepEqual(flaggedFiles, ["src/coverageHelper.ts", "src/distributed.ts"]);

  const distRes = spawnSync(
    gitleaksBin,
    [
      "dir",
      "dist",
      "--config",
      path.join(ROOT, ".gitleaks.toml"),
      "--report-format",
      "json",
      "--report-path",
      "-",
      "--no-banner",
    ],
    { cwd: tmp, encoding: "utf8" }
  );
  assert.equal(distRes.status, 0, "dist/ directory must remain allowlisted");

  // 2. Staged pre-commit scan via check-secrets.mjs --staged must block a staged root file secret!
  execFileSync("git", ["init", "-q"], { cwd: tmp });
  fs.copyFileSync(path.join(ROOT, ".gitleaks.toml"), path.join(tmp, ".gitleaks.toml"));
  fs.writeFileSync(path.join(tmp, "root-config.yaml"), `token: "${fakePat}"\n`);
  execFileSync("git", ["add", "root-config.yaml"], { cwd: tmp });

  const stagedRun = spawnSync(
    process.execPath,
    [path.join(ROOT, "scripts/check/check-secrets.mjs"), "--staged", "--quiet"],
    { cwd: tmp, encoding: "utf8" }
  );
  assert.equal(stagedRun.status, 1, "check-secrets.mjs --staged must exit 1 on a staged secret");
  assert.match(stagedRun.stderr, /BLOQUEADO/);
  assert.doesNotMatch(
    stagedRun.stderr,
    new RegExp(fakePat),
    "staged output must redact raw secret"
  );
});
