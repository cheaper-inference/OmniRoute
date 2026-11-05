import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const script = fileURLToPath(
  new URL("../../../scripts/check/check-vuln-ratchet.mjs", import.meta.url)
);
function run(
  t,
  { report = { results: [] }, status = 0, absent = false, baseline = 0, json = false } = {}
) {
  const root = mkdtempSync(join(tmpdir(), "osv-required-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, "bin"));
  mkdirSync(join(root, "config/quality"), { recursive: true });
  if (baseline !== null)
    writeFileSync(
      join(root, "config/quality/quality-baseline.json"),
      JSON.stringify({ metrics: { vulnCount: { value: baseline } } })
    );
  writeFileSync(join(root, "package-lock.json"), "{}");
  writeFileSync(
    join(root, "bin/osv-scanner"),
    `#!${process.execPath}\nconsole.log(${JSON.stringify(JSON.stringify(report))}); process.exit(${status});\n`,
    { mode: 0o755 }
  );
  return spawnSync(
    process.execPath,
    [script, "--ratchet", "--quiet", ...(json ? ["--json"] : [])],
    {
      cwd: root,
      encoding: "utf8",
      timeout: 30000,
      env: {
        ...process.env,
        PATH: absent ? "/nonexistent-bin-dir" : `${join(root, "bin")}:${process.env.PATH}`,
      },
    }
  );
}

for (const [label, opts] of [
  ["missing scanner", { absent: true }],
  ["invalid report", { report: {} }],
  ["general error even with JSON", { status: 127 }],
  ["no packages scanned", { status: 128 }],
  ["missing baseline", { baseline: null }],
  ["invalid baseline", { baseline: -1 }],
]) {
  test(`required OSV measurement rejects ${label}`, (t) => {
    const r = run(t, opts);
    assert.equal(r.status, 2, r.stdout + r.stderr);
    assert.match(r.stdout, /vulnCount=INCOMPLETE/);
  });
}

test("complete zero findings remain green", (t) => {
  const r = run(t);
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /vulnCount=0/);
});

for (const json of [false, true]) {
  test(`a real OSV finding remains blocking (json=${json})`, (t) => {
    const report = {
      results: [
        { packages: [{ package: { name: "fixture" }, vulnerabilities: [{ id: "GHSA-fixture" }] }] },
      ],
    };
    const r = run(t, { report, status: 1, json });
    assert.equal(r.status, 1, r.stdout + r.stderr);
  });
}
