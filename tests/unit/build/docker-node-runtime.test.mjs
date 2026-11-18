import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const probe = new URL("../../../scripts/ci/check-docker-node-runtime.mjs", import.meta.url);
const workflow = readFileSync(path.join(root, ".github/workflows/docker-publish.yml"), "utf8");

function runProbe(version, env = {}) {
  return spawnSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      `Object.defineProperty(process.versions, "node", { value: ${JSON.stringify(version)} });
       await import(${JSON.stringify(probe.href)});`,
    ],
    { encoding: "utf8", env: { ...process.env, ...env } }
  );
}

for (const version of ["26.5.0", "26.12.0", "25.9.0", "27.0.0"]) {
  test(`image runtime probe rejects Node ${version}`, () => {
    const result = runProbe(version);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /requires Node 26\.12\.1 or newer in the 26\.x line/);
  });
}

for (const version of ["26.12.1", "26.12.2", "26.13.0"]) {
  test(`image runtime probe accepts patched Node ${version}`, () => {
    const result = runProbe(version);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, new RegExp(`Node ${version.replaceAll(".", "\\.")}`));
  });
}

test("image runtime probe checks the running binary rather than NODE_VERSION metadata", () => {
  const result = runProbe("26.5.0", { NODE_VERSION: "26.12.1" });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /26\.5\.0/);
});

function verificationStep() {
  const start = workflow.indexOf("      - name: Verify published Node runtimes");
  assert.notEqual(start, -1, "each architecture must verify the pushed images");
  const end = workflow.indexOf("\n      - name:", start + 1);
  return { start, text: workflow.slice(start, end === -1 ? undefined : end) };
}

test("both Node image digests are checked before exporting publish artifacts", () => {
  const { start, text } = verificationStep();
  assert.ok(start > workflow.indexOf("- name: Build and push WEB platform image by digest"));
  assert.ok(start < workflow.indexOf("- name: Export digests"));
  assert.match(text, /DIGEST_BASE: \$\{\{ steps\.build\.outputs\.digest \}\}/);
  assert.match(text, /DIGEST_WEB: \$\{\{ steps\.build-web\.outputs\.digest \}\}/);
  assert.match(text, /PLATFORM: \$\{\{ matrix\.platform \}\}/);
  assert.doesNotMatch(text, /continue-on-error:/);
});

for (const fail of [false, true]) {
  test(`verification shell ${fail ? "stops on an unpatched image" : "runs both immutable images"}`, () => {
    const { text } = verificationStep();
    const body = text.split("        run: |\n")[1];
    assert.ok(body, "verification step must have an executable shell body");
    const dir = mkdtempSync(path.join(tmpdir(), "omniroute-node-probe-"));
    try {
      const log = path.join(dir, "calls.jsonl");
      writeFileSync(
        path.join(dir, "docker"),
        `#!${process.execPath}
const fs = require("node:fs");
const { spawnSync } = require("node:child_process");
const args = process.argv.slice(2);
fs.appendFileSync(process.env.PROBE_LOG, JSON.stringify(args) + "\\n");
const source = fs.readFileSync(0, "utf8");
const version = process.env.PROBE_FAIL === "true" ? "26.5.0" : "26.12.1";
const result = spawnSync(process.execPath, ["--input-type=module", "-e",
  'Object.defineProperty(process.versions, "node", { value: ' + JSON.stringify(version) + ' });\\n' + source
], { stdio: ["ignore", "inherit", "inherit"] });
process.exit(result.status ?? 1);
`,
        { mode: 0o755 }
      );
      const result = spawnSync("bash", ["-c", body.replace(/^          /gm, "")], {
        cwd: root,
        encoding: "utf8",
        env: {
          ...process.env,
          PATH: `${dir}${path.delimiter}${process.env.PATH}`,
          GHCR_IMAGE_NAME: "ghcr.io/cheaper-inference/omniroute",
          DIGEST_BASE: `sha256:${"a".repeat(64)}`,
          DIGEST_WEB: `sha256:${"b".repeat(64)}`,
          PLATFORM: "linux/arm64",
          PROBE_LOG: log,
          PROBE_FAIL: String(fail),
        },
      });
      assert.equal(result.status, fail ? 1 : 0, result.stderr);
      const calls = readFileSync(log, "utf8").trim().split("\n").map(JSON.parse);
      assert.equal(calls.length, fail ? 1 : 2);
      for (const [index, args] of calls.entries()) {
        assert.ok(args.includes("--rm"));
        assert.equal(args[args.indexOf("--pull") + 1], "always");
        assert.equal(args[args.indexOf("--platform") + 1], "linux/arm64");
        assert.equal(args[args.indexOf("--entrypoint") + 1], "node");
        assert.ok(args.includes("--input-type=module"));
        assert.ok(
          args.includes(
            `ghcr.io/cheaper-inference/omniroute@sha256:${(index ? "b" : "a").repeat(64)}`
          )
        );
      }
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
}
