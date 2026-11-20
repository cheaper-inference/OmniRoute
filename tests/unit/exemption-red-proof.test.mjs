// Red-proof tests: one named case per runtime exemption entry.
// Every case proves its declaration can be neutralized in memory. The flag-ship
// model case also runs the real load hook in a subprocess, where the same test
// must fail with the constant neutralized and pass with the real list.
// Everything entering the repository is written in generic English.

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { Script } from "node:vm";
import test from "node:test";

const ROOT = process.cwd();
const REGISTRY = JSON.parse(readFileSync("config/quality/gate-exemptions.json", "utf8"));
const RUNTIME = REGISTRY.exemptions.filter((entry) => entry.surface === "runtime");
const LOADER = new URL("../../scripts/check/lib/exemption-proof-loader.mjs", import.meta.url).href;
const MODEL_TARGET = "open-sse/services/model.ts#KNOWN_MODEL_IDS";
const MODEL_CASE = "KNOWN_MODEL_IDS rejects an unlisted model";

test("the committed registry declares a named red-proof case for every runtime entry", () => {
  const cases = new Set();
  for (const entry of RUNTIME) {
    assert.equal(typeof entry.redProof?.case, "string");
    assert.ok(entry.redProof.case.length > 0);
    assert.ok(!cases.has(entry.redProof.case));
    cases.add(entry.redProof.case);
  }
  assert.equal(RUNTIME.length, 65);
  assert.equal(cases.size, 65);
});

// One case per runtime entry. The source-level proof is real and deterministic:
// the anchored declaration must be found and its initializer replaced by the
// declared neutral value, without touching the file on disk.
for (const entry of RUNTIME) {
  test(entry.redProof.case, async () => {
    const { neutralizeDeclaration } =
      await import("../../scripts/check/lib/exemption-proof-loader.mjs");
    const { discoverRuntimeConstants } =
      await import("../../scripts/check/lib/exemption-proof.mjs");
    const name = String(entry.target).split("#").pop();
    // Resolve the declaration by name: a registry target can point at a test
    // that uses the constant while the declaration lives in another file (the
    // .tsx case). Discovery is the authority for where it is declared.
    const declaration = discoverRuntimeConstants({ root: ROOT, includeChecks: true }).find(
      (candidate) => candidate.name === name
    );
    assert.ok(declaration, `no anchored declaration for: ${name}`);
    // Under the dynamic runner the exact line comes from the same discovery the
    // loader uses, so a prefix name can never neutralize a neighbour (for
    // example KNOWN_LIMIT_ENV in place of KNOWN_LIMIT).
    const envLine = Number(process.env.OMNIROUTE_EXEMPTION_PROOF_LINE || 0);
    const line = envLine || declaration.line;
    const source = readFileSync(resolve(ROOT, declaration.file), "utf8");
    const result = neutralizeDeclaration({
      source,
      name,
      neutralValue: entry.redProof.neutralValue,
      line,
    });
    assert.equal(result.changed, true, `anchored declaration missing: ${entry.target}`);
    const rewritten = result.source.split("\n")[line - 1];
    assert.ok(
      rewritten.includes("const") && rewritten.includes(`= ${entry.redProof.neutralValue};`)
    );
  });
}

test("a multiline initializer is replaced in full and keeps the source parseable", async () => {
  const { neutralizeDeclaration } =
    await import("../../scripts/check/lib/exemption-proof-loader.mjs");
  const source = [
    "const ALLOWED_TOOLS = new Set([",
    '  "chat",',
    '  "tools",',
    "]);",
    "const AFTER = 1;",
    "",
  ].join("\n");
  const result = neutralizeDeclaration({
    source,
    name: "ALLOWED_TOOLS",
    neutralValue: "new Set()",
    line: 1,
  });
  assert.equal(result.changed, true);
  assert.equal(result.source.split("\n")[0], "const ALLOWED_TOOLS = new Set();");
  assert.equal(result.source.split("\n")[4], "const AFTER = 1;");
  assert.ok(!result.source.includes('"chat"'));
  assert.doesNotThrow(() => new Script(result.source));
});

// End-to-end proof for the flag-ship runtime list. The same observable assertion
// is green with the real list and red with the neutralized one; only the loader
// environment changes between the two runs.
test("KNOWN_MODEL_IDS stays red under neutralization and green with the real list", () => {
  const entry = RUNTIME.find((candidate) => candidate.target === MODEL_TARGET);
  assert.ok(entry, `registry missing runtime entry: ${MODEL_TARGET}`);
  assert.equal(entry.redProof.case, MODEL_CASE);

  const modelUrl = pathToFileURL(resolve(ROOT, "open-sse/services/model.ts")).href;
  const script = `const m = await import(${JSON.stringify(modelUrl)}); console.log(m.isKnownCatalogModelId('gpt-4o') ? 'KNOWN' : 'UNKNOWN');`;

  const run = (neutralize) =>
    spawnSync(
      process.execPath,
      ["--import", "tsx/esm", "--import", LOADER, "--input-type=module", "-e", script],
      {
        cwd: ROOT,
        encoding: "utf8",
        maxBuffer: 64 * 1024 * 1024,
        env: {
          ...process.env,
          ...(neutralize
            ? {
                OMNIROUTE_EXEMPTION_PROOF_REGISTER: "1",
                OMNIROUTE_EXEMPTION_PROOF_TARGET: entry.target,
                OMNIROUTE_EXEMPTION_PROOF_NEUTRAL: entry.redProof.neutralValue,
              }
            : {}),
        },
      }
    );

  const control = run(false);
  assert.equal(control.status, 0, control.stderr);
  assert.match(control.stdout, /^KNOWN$/m);

  const proof = run(true);
  assert.equal(proof.status, 0, proof.stderr);
  assert.match(proof.stdout, /^UNKNOWN$/m);
});
