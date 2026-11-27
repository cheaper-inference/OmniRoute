// tests/unit/build/check-secrets.test.ts
// TDD unit tests for scripts/check/check-secrets.mjs — Task 7.18 gitleaks.
//
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  parseGitleaksJson,
  evaluateSecretsRatchet,
  readBaselineSecretsValue,
  // @ts-expect-error — .mjs helper has no type declarations; runtime shape is known.
} from "../../../scripts/check/check-secrets.mjs";

type RatchetVerdict = { regressed: boolean; improved: boolean };
const evaluate = evaluateSecretsRatchet as (current: number, baseline: number) => RatchetVerdict;
const readBaseline = readBaselineSecretsValue as (p?: string) => number | null;

// ---------------------------------------------------------------------------
// Fixtures — synthetic gitleaks --report-format json output
// ---------------------------------------------------------------------------

/** Helper to build a minimal gitleaks finding. */
function makeFinding(
  overrides: {
    ruleId?: string;
    file?: string;
    description?: string;
    startLine?: number;
    secret?: string;
  } = {}
) {
  return {
    Description: overrides.description ?? "GitHub Personal Access Token",
    StartLine: overrides.startLine ?? 42,
    EndLine: overrides.startLine ?? 42,
    StartColumn: 15,
    EndColumn: 50,
    Match: "REDACTED",
    Secret: overrides.secret ?? "ghp_REDACTED",
    File: overrides.file ?? "src/config/secrets.ts",
    SymlinkFile: "",
    Commit: "",
    Entropy: 4.5,
    Author: "Developer",
    Email: "dev@example.com",
    Date: "2026-01-01T00:00:00Z",
    Message: "add config",
    Tags: [],
    RuleID: overrides.ruleId ?? "github-pat",
    Fingerprint: "abc123",
  };
}

// ---------------------------------------------------------------------------
// parseGitleaksJson — input inválido / vazio
// ---------------------------------------------------------------------------

test("parseGitleaksJson: null retorna findingCount=0", () => {
  const result = parseGitleaksJson(null);
  assert.equal(result.findingCount, 0);
  assert.deepEqual(result.byRule, {});
  assert.deepEqual(result.byFile, {});
});

test("parseGitleaksJson: undefined retorna findingCount=0", () => {
  const result = parseGitleaksJson(undefined as unknown as null);
  assert.equal(result.findingCount, 0);
});

test("parseGitleaksJson: array vazio retorna findingCount=0", () => {
  const result = parseGitleaksJson([]);
  assert.equal(result.findingCount, 0);
  assert.deepEqual(result.byRule, {});
  assert.deepEqual(result.byFile, {});
});

test("parseGitleaksJson: objeto (não-array) retorna findingCount=0", () => {
  const result = parseGitleaksJson({ RuleID: "github-pat" } as unknown as null);
  assert.equal(result.findingCount, 0);
});

test("parseGitleaksJson: string retorna findingCount=0", () => {
  const result = parseGitleaksJson("findings" as unknown as null);
  assert.equal(result.findingCount, 0);
});

test("parseGitleaksJson: número retorna findingCount=0", () => {
  const result = parseGitleaksJson(42 as unknown as null);
  assert.equal(result.findingCount, 0);
});

// ---------------------------------------------------------------------------
// parseGitleaksJson — contagem básica
// ---------------------------------------------------------------------------

test("parseGitleaksJson: 1 finding retorna findingCount=1", () => {
  const result = parseGitleaksJson([makeFinding()]);
  assert.equal(result.findingCount, 1);
});

test("parseGitleaksJson: 3 findings retorna findingCount=3", () => {
  const findings = [
    makeFinding({ ruleId: "github-pat", file: "src/a.ts" }),
    makeFinding({ ruleId: "aws-access-key", file: "src/b.ts" }),
    makeFinding({ ruleId: "generic-api-key", file: "src/c.ts" }),
  ];
  const result = parseGitleaksJson(findings);
  assert.equal(result.findingCount, 3);
});

// ---------------------------------------------------------------------------
// parseGitleaksJson — agrupamento por RuleID
// ---------------------------------------------------------------------------

test("parseGitleaksJson: agrupa por RuleID em byRule", () => {
  const findings = [
    makeFinding({ ruleId: "github-pat" }),
    makeFinding({ ruleId: "aws-access-key" }),
    makeFinding({ ruleId: "github-pat" }), // segundo github-pat
  ];
  const result = parseGitleaksJson(findings);
  assert.equal(result.byRule["github-pat"], 2);
  assert.equal(result.byRule["aws-access-key"], 1);
});

test("parseGitleaksJson: RuleID ausente usa 'unknown'", () => {
  const finding = {
    Description: "Some secret",
    StartLine: 1,
    File: "src/x.ts",
    // sem RuleID
  };
  const result = parseGitleaksJson([finding]);
  assert.equal(result.findingCount, 1);
  assert.equal(result.byRule["unknown"], 1);
});

test("parseGitleaksJson: suporta campo ruleId (camelCase) como fallback", () => {
  const finding = {
    ruleId: "lowercase-rule",
    File: "src/x.ts",
    Description: "test",
  };
  const result = parseGitleaksJson([finding]);
  assert.equal(result.byRule["lowercase-rule"], 1);
});

// ---------------------------------------------------------------------------
// parseGitleaksJson — agrupamento por arquivo
// ---------------------------------------------------------------------------

test("parseGitleaksJson: agrupa por File em byFile", () => {
  const findings = [
    makeFinding({ file: "src/config.ts", ruleId: "github-pat" }),
    makeFinding({ file: "src/config.ts", ruleId: "aws-access-key" }), // mesmo arquivo
    makeFinding({ file: "tests/fixtures/token.ts", ruleId: "github-pat" }),
  ];
  const result = parseGitleaksJson(findings);
  assert.equal(result.byFile["src/config.ts"], 2);
  assert.equal(result.byFile["tests/fixtures/token.ts"], 1);
});

test("parseGitleaksJson: File ausente usa 'unknown' em byFile", () => {
  const finding = {
    RuleID: "github-pat",
    Description: "Token",
    StartLine: 1,
    // sem File
  };
  const result = parseGitleaksJson([finding]);
  assert.equal(result.byFile["unknown"], 1);
});

test("parseGitleaksJson: suporta campo file (camelCase) como fallback", () => {
  const finding = {
    RuleID: "generic-api-key",
    file: "src/config.js",
    Description: "test",
  };
  const result = parseGitleaksJson([finding]);
  assert.equal(result.byFile["src/config.js"], 1);
});

test("parseGitleaksJson: normaliza separadores de caminho do Windows", () => {
  const reports = [
    makeFinding({ file: "src\\config\\secrets.ts" }),
    makeFinding({ file: "src/config/secrets.ts" }),
  ];
  assert.deepEqual(parseGitleaksJson(reports).byFile, { "src/config/secrets.ts": 2 });
});

// ---------------------------------------------------------------------------
// parseGitleaksJson — entradas inválidas dentro do array
// ---------------------------------------------------------------------------

test("parseGitleaksJson: entradas null dentro do array são ignoradas", () => {
  const findings = [makeFinding(), null, makeFinding({ ruleId: "aws-access-key" })] as (ReturnType<
    typeof makeFinding
  > | null)[];
  const result = parseGitleaksJson(findings as unknown as ReturnType<typeof makeFinding>[]);
  assert.equal(result.findingCount, 2, "null entries should be skipped");
});

test("parseGitleaksJson: entradas primitivas dentro do array são ignoradas", () => {
  const findings = [
    makeFinding(),
    "string-entry",
    42,
    makeFinding({ ruleId: "aws-access-key" }),
  ] as unknown[];
  const result = parseGitleaksJson(findings as ReturnType<typeof makeFinding>[]);
  assert.equal(result.findingCount, 2, "primitive entries should be skipped");
});

// ---------------------------------------------------------------------------
// parseGitleaksJson — casos de borda do RuleID PascalCase
// ---------------------------------------------------------------------------

test("parseGitleaksJson: RuleID PascalCase como emitido pelo gitleaks", () => {
  // gitleaks emite RuleID com PascalCase nos campos
  const finding = {
    RuleID: "github-fine-grained-pat",
    File: "config/auth.yaml",
    Description: "Fine-grained PAT",
    StartLine: 3,
  };
  const result = parseGitleaksJson([finding]);
  assert.equal(result.byRule["github-fine-grained-pat"], 1);
});

// ---------------------------------------------------------------------------
// parseGitleaksJson — invariantes estruturais
// ---------------------------------------------------------------------------

test("parseGitleaksJson: findingCount == soma de todos os byRule values", () => {
  const findings = [
    makeFinding({ ruleId: "a" }),
    makeFinding({ ruleId: "b" }),
    makeFinding({ ruleId: "a" }),
    makeFinding({ ruleId: "c" }),
  ];
  const result = parseGitleaksJson(findings);
  const sumByRule = Object.values(result.byRule).reduce((s, n) => s + n, 0);
  assert.equal(result.findingCount, sumByRule, "findingCount must equal sum of byRule counts");
});

test("parseGitleaksJson: findingCount == soma de todos os byFile values", () => {
  const findings = [
    makeFinding({ file: "src/a.ts" }),
    makeFinding({ file: "src/b.ts" }),
    makeFinding({ file: "src/a.ts" }),
  ];
  const result = parseGitleaksJson(findings);
  const sumByFile = Object.values(result.byFile).reduce((s, n) => s + n, 0);
  assert.equal(result.findingCount, sumByFile, "findingCount must equal sum of byFile counts");
});

// ---------------------------------------------------------------------------
// evaluateSecretsRatchet — ratchet direction:down (Etapa 2: flip to blocking)
// Regression when measured > baseline; baseline=3 → 4+ findings block, 3 passes.
// ---------------------------------------------------------------------------

test("evaluateSecretsRatchet: medida == baseline passa (3 vs 3)", () => {
  const r = evaluate(3, 3);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, false);
});

test("evaluateSecretsRatchet: uma a mais que o baseline é regressão (4 vs 3)", () => {
  const r = evaluate(4, 3);
  assert.equal(r.regressed, true, "a single new secret finding must block");
  assert.equal(r.improved, false);
});

test("evaluateSecretsRatchet: menos que o baseline é melhoria", () => {
  const r = evaluate(1, 3);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, true);
});

test("evaluateSecretsRatchet: zero contra baseline não-zero é melhoria máxima", () => {
  const r = evaluate(0, 5);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, true);
});

test("evaluateSecretsRatchet: comparação inteira estrita — qualquer aumento regride", () => {
  assert.equal(evaluate(6, 5).regressed, true);
  assert.equal(evaluate(5, 5).regressed, false);
  assert.equal(evaluate(4, 5).regressed, false);
});

// ---------------------------------------------------------------------------
// readBaselineSecretsValue — leitura tolerante do quality-baseline.json
// ---------------------------------------------------------------------------

function withTmpBaseline(content: string | null, fn: (p: string) => void) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "secrets-baseline-"));
  const p = path.join(dir, "quality-baseline.json");
  if (content !== null) fs.writeFileSync(p, content);
  try {
    fn(p);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

test("readBaselineSecretsValue: lê metrics.secretFindings.value", () => {
  withTmpBaseline(JSON.stringify({ metrics: { secretFindings: { value: 3 } } }), (p) => {
    assert.equal(readBaseline(p), 3);
  });
});

test("readBaselineSecretsValue: arquivo ausente retorna null (SKIP gracioso)", () => {
  assert.equal(readBaseline("/tmp/does-not-exist-99999/quality-baseline.json"), null);
});

test("readBaselineSecretsValue: métrica ausente retorna null", () => {
  withTmpBaseline(JSON.stringify({ metrics: {} }), (p) => {
    assert.equal(readBaseline(p), null);
  });
});

test("readBaselineSecretsValue: value não-numérico retorna null", () => {
  withTmpBaseline(JSON.stringify({ metrics: { secretFindings: { value: "3" } } }), (p) => {
    assert.equal(readBaseline(p), null);
  });
});

test("readBaselineSecretsValue: JSON inválido retorna null (não lança)", () => {
  withTmpBaseline("{ not valid json", (p) => {
    assert.equal(readBaseline(p), null);
  });
});

const scanner = fileURLToPath(new URL("../../../scripts/check/check-secrets.mjs", import.meta.url));
const config = fileURLToPath(new URL("../../../.gitleaks.toml", import.meta.url));
const preCommitHook = fileURLToPath(new URL("../../../.husky/pre-commit", import.meta.url));
const hasGitleaks = spawnSync("gitleaks", ["version"]).status === 0;

function withStagedScanRepo(run: (dir: string) => void) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "staged-secret-scan-"));
  try {
    run(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

function scanStaged(dir: string, env = process.env) {
  const result = spawnSync(process.execPath, [scanner, "--staged", "--quiet"], {
    cwd: dir,
    env,
    encoding: "utf8",
  });
  assert.ifError(result.error);
  return result;
}

function runGit(dir: string, ...args: string[]) {
  const result = spawnSync("git", args, { cwd: dir, encoding: "utf8" });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
}

function initScanRepo(dir: string) {
  runGit(dir, "init", "-q");
  fs.copyFileSync(config, path.join(dir, ".gitleaks.toml"));
}

function writeStagedFixture(dir: string, file: string, text: string) {
  const target = path.join(dir, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, text);
  runGit(dir, "add", "--", file);
}

test(
  "--staged warns on a changed generic API key line in translated Markdown",
  { skip: !hasGitleaks },
  () => {
    withStagedScanRepo((dir) => {
      initScanRepo(dir);
      const file = "docs/i18n/am/README.md";
      const value = createHash("sha256").update(file).digest("hex");
      const line = `const api_key = "${value}";`;
      writeStagedFixture(dir, file, `# Example\n\n${line}\n`);
      runGit(
        dir,
        "-c",
        "user.name=Test",
        "-c",
        "user.email=test@example.com",
        "commit",
        "-qm",
        "Add translated example"
      );
      writeStagedFixture(dir, file, `# Example\n\n${line} \n`);

      const result = scanStaged(dir);
      assert.equal(result.status, 0, result.stderr);
      assert.match(
        result.stderr,
        /AVISO[^\n]*\n[^\n]*\[generic-api-key\] docs\/i18n\/am\/README\.md:3/
      );
      assert.doesNotMatch(result.stderr, /BLOQUEADO/);
      assert.ok(!result.stderr.includes(value));
    });
  }
);

test("--staged --quiet warns and allows commits when Gitleaks is missing", () => {
  withStagedScanRepo((dir) => {
    const result = scanStaged(dir, { ...process.env, PATH: dir });
    assert.equal(result.status, 0);
    assert.match(result.stderr, /gitleaks.*não encontrado/i);
  });
});

test("--staged blocks a synthetic GitHub token in documentation", { skip: !hasGitleaks }, () => {
  withStagedScanRepo((dir) => {
    initScanRepo(dir);
    const file = "docs/example.md";
    const hash = createHash("sha256").update(file).digest("hex");
    const syntheticPat = ["ghp", hash.slice(0, 36)].join("_");
    writeStagedFixture(dir, file, `const api_key = "${hash}";\n${syntheticPat}\n`);

    const result = scanStaged(dir);
    assert.equal(result.status, 1, result.stderr);
    assert.match(result.stderr, /AVISO[^\n]*\n[^\n]*\[generic-api-key\] docs\/example\.md:1/);
    assert.match(result.stderr, /BLOQUEADO[^\n]*\n[^\n]*\[github-pat\] docs\/example\.md:2/);
    assert.ok(!result.stderr.includes(syntheticPat));
  });
});

test("--staged blocks a generic API key in a new source file", { skip: !hasGitleaks }, () => {
  withStagedScanRepo((dir) => {
    initScanRepo(dir);
    const file = "src/config.ts";
    const value = createHash("sha256").update(file).digest("hex");
    writeStagedFixture(dir, file, `const api_key = "${value}";\n`);

    const result = scanStaged(dir);
    assert.equal(result.status, 1, result.stderr);
    assert.match(result.stderr, /BLOQUEADO[^\n]*\n[^\n]*\[generic-api-key\] src\/config\.ts:1/);
    assert.doesNotMatch(result.stderr, /AVISO/);
  });
});

test(
  "pre-commit warns when the staged scanner exits 2",
  { skip: process.platform === "win32" },
  () => {
    withStagedScanRepo((dir) => {
      initScanRepo(dir);
      fs.writeFileSync(path.join(dir, "gitleaks"), "#!/bin/sh\nexit 1\n", { mode: 0o755 });
      const env = {
        ...process.env,
        PATH: [dir, process.env.PATH].join(path.delimiter),
        SECRET_SCAN_TEST_NODE: process.execPath,
        SECRET_SCAN_TEST_SCRIPT: scanner,
      };
      const direct = scanStaged(dir, env);
      assert.equal(direct.status, 2, direct.stderr);
      assert.match(direct.stderr, /ERRO ao executar gitleaks/);

      // Execute the real hook with only its unrelated local gates stubbed.
      const hookRunner = `
      npx() { :; }
      npm() { :; }
      sh() { :; }
      node() {
        if [ "$1" = scripts/check/check-secrets.mjs ]; then
          shift
          "$SECRET_SCAN_TEST_NODE" "$SECRET_SCAN_TEST_SCRIPT" "$@"
        fi
      }
      . "$1"
    `;
      const result = spawnSync("sh", ["-c", hookRunner, "pre-commit-test", preCommitHook], {
        cwd: dir,
        env,
        encoding: "utf8",
      });
      assert.ifError(result.error);
      assert.equal(result.status, 0, result.stderr);
      assert.match(result.stderr, /\[pre-commit\] AVISO.*gitleaks.*código 2/);
    });
  }
);

test(
  "--staged distinguishes scanner errors from findings",
  { skip: process.platform === "win32" },
  () => {
    withStagedScanRepo((dir) => {
      const binary = path.join(dir, "gitleaks");
      const cases = [
        { status: 1, report: "[]" },
        { status: 0, report: "unexpected output" },
        { status: 0, report: "{}" },
        { status: 99, report: "[]" },
        { status: 99, report: "[{}]" },
      ];
      for (const { status, report } of cases) {
        fs.writeFileSync(binary, `#!/bin/sh\nprintf '%s\\n' '${report}'\nexit ${status}\n`, {
          mode: 0o755,
        });
        const result = scanStaged(dir, {
          ...process.env,
          PATH: [dir, process.env.PATH].join(path.delimiter),
        });
        assert.equal(result.status, 2, `Gitleaks status ${status}, report ${report}`);
        assert.match(result.stderr, /\[check-secrets.*\].*ERRO/);
        assert.doesNotMatch(result.stderr, /BLOQUEADO|unexpected output/);
      }
    });
  }
);

test(
  "--staged blocks new synthetic credentials in source and tests",
  { skip: !hasGitleaks },
  () => {
    withStagedScanRepo((dir) => {
      initScanRepo(dir);
      const files = ["src/distributed.ts", "src/coverageHelper.ts", "tests/new.ts"];
      for (const file of files) {
        const body = createHash("sha256").update(file).digest("hex").slice(0, 36);
        const syntheticPat = ["ghp", body].join("_");
        writeStagedFixture(dir, file, `export const value = "${syntheticPat}";\n`);
        fs.writeFileSync(path.join(dir, file), "// Clean unstaged worktree contents\n");
      }
      const result = scanStaged(dir);
      assert.equal(result.status, 1, result.stderr);
      for (const file of files) {
        assert.ok(result.stderr.includes(`[github-pat] ${file}:1`), result.stderr);
      }
      assert.doesNotMatch(result.stderr, /ghp_/);
    });
  }
);

test("--staged allows the documented curl placeholder", { skip: !hasGitleaks }, () => {
  withStagedScanRepo((dir) => {
    initScanRepo(dir);
    const placeholder = ["your", "api", "key"].join("-");
    writeStagedFixture(
      dir,
      "docs/reference/API_REFERENCE.md",
      `curl http://localhost:20128/v1/models -H "Authorization: Bearer ${placeholder}"\n`
    );
    const result = scanStaged(dir);
    assert.equal(result.status, 0, result.stderr);
  });
});

test(
  "--staged allows a redaction fixture and detects a new credential at the same path",
  { skip: !hasGitleaks },
  () => {
    withStagedScanRepo((dir) => {
      initScanRepo(dir);
      const file = "tests/fixtures/perplexity-web-stream-error-boundary.fixture.ts";
      const fixture = ["sk", "zone", "secret", "h19rT8"].join("-");
      writeStagedFixture(dir, file, `const api_key = "${fixture}";\n`);
      const clean = scanStaged(dir);
      assert.equal(clean.status, 0, clean.stderr);

      const newValue = createHash("sha256").update(file).digest("hex").slice(0, 32);
      writeStagedFixture(dir, file, `const api_key = "${newValue}";\n`);
      const detected = scanStaged(dir);
      assert.equal(detected.status, 1, detected.stderr);
      assert.ok(detected.stderr.includes(`[generic-api-key] ${file}:1`), detected.stderr);
    });
  }
);
