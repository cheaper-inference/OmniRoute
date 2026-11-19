import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const script = resolve(import.meta.dirname, "../../scripts/i18n/run-doc-wave.sh");
const hash = (text) => createHash("sha256").update(text).digest("hex");

function runWave(t, scenario) {
  const root = mkdtempSync(join(tmpdir(), "omni-i18n-wave-contract-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const bin = join(root, "fake-bin");
  mkdirSync(bin);
  mkdirSync(join(root, "docs/i18n/pt-BR/docs"), { recursive: true });
  mkdirSync(join(root, "config"));
  const source = "# Source\n\nDocumented behavior.\n";
  const target = "# Fonte\n\nComportamento documentado.\n";
  writeFileSync(join(root, "docs/example.md"), source);
  writeFileSync(join(root, "docs/i18n/pt-BR/docs/example.md"), target);
  writeFileSync(
    join(root, "config/i18n.json"),
    JSON.stringify({
      locales: [{ code: "en" }, { code: "pt-BR" }],
      docsExcluded: ["en"],
    })
  );
  writeFileSync(
    join(root, ".i18n-state.json"),
    JSON.stringify({
      sources: {
        "docs/example.md": {
          source_hash: scenario === "stale-source" ? "old-source" : hash(source),
          locales: {
            "pt-BR": { source_hash: hash(source), target_hash: hash(target) },
          },
        },
      },
    })
  );
  const env = join(root, "translation.env");
  writeFileSync(
    env,
    "OMNIROUTE_TRANSLATION_API_URL=http://fixture.invalid/v1\nOMNIROUTE_TRANSLATION_MODEL=fixture\nOMNIROUTE_TRANSLATION_API_KEY=fixture-only\n"
  );
  function executable(name, contents) {
    writeFileSync(join(bin, name), contents, { mode: 0o755 });
  }
  executable(
    "git",
    `#!/usr/bin/env bash
printf '%s\\n' "$*" >> "$FAKE_GIT_LOG"
case "$1" in
  rev-parse) echo fixture-head ;;
  diff) exit 1 ;;
  add) [ "$WAVE_SCENARIO" != add ] ;;
  commit) [ "$WAVE_SCENARIO" != commit ] ;;
  push) [ "$WAVE_SCENARIO" != push ] ;;
esac
`
  );
  executable(
    "curl",
    '#!/usr/bin/env bash\nif [ "$WAVE_SCENARIO" = backend ]; then printf 503; else printf 200; fi\n'
  );
  executable("pgrep", "#!/usr/bin/env bash\nexit 1\n");
  executable("sleep", "#!/usr/bin/env bash\nexit 0\n");
  executable("npx", '#!/usr/bin/env bash\n[ "$WAVE_SCENARIO" != format ]\n');
  executable(
    "node",
    `#!${process.execPath}
const fs = require("node:fs");
const cp = require("node:child_process");
const args = process.argv.slice(2);
const scenario = process.env.WAVE_SCENARIO;
if (args[0] === "scripts/i18n/run-translation.mjs") {
  fs.appendFileSync(process.env.FAKE_TRANSLATION_LOG, "attempt\\n");
  const errors = {
    "validation-quota-text": "inline code changed: QUOTA_LIMIT and 429",
    "recovered-quota": "timeout after 60000ms",
    "quota-error": "upstream 429: quota exhausted",
  };
  if (scenario === "recovered-quota") fs.writeSync(1, "[i18n-run] WARN upstream 429 — retrying\\n");
  if (errors[scenario]) {
    fs.writeSync(1, "[i18n-run] ERROR docs/example.md [pt-BR] failed: " + errors[scenario] + "\\n");
    fs.writeSync(1, "[i18n-run] summary: translated=0, skipped=0, failed=1, total considered=1, elapsed=0.1s\\n");
    process.exit(1);
  }
  if (scenario === "missing") fs.rmSync("docs/i18n/pt-BR/docs/example.md");
  if (scenario === "large") fs.writeSync(1, "progress ".repeat(40000) + "\\n");
  fs.writeSync(1, "[i18n-run] summary: translated=1, skipped=0, failed=" + (scenario === "translation" ? 1 : 0) + ", total considered=1, elapsed=0.1s\\n");
  process.exit(scenario === "exit" ? 1 : 0);
}
if (args[0] === "scripts/i18n/check-translation-drift.mjs") {
  if (scenario === "drift-json") { console.log("truncated {"); process.exit(1); }
  if (args.includes("--json")) {
    console.log(JSON.stringify({ ok: scenario !== "stale", checkedSources: 1,
      driftedSources: scenario === "stale" ? [{ rel: "docs/example.md" }] : [],
      missingTargets: [], driftedTargets: [], staleTargets: [] }));
  } else console.log("PASS fixture");
  process.exit(scenario === "stale" ? 1 : 0);
}
const result = cp.spawnSync(${JSON.stringify(process.execPath)}, args, { stdio: "inherit" });
process.exit(result.status ?? 2);
`
  );
  const out = join(root, "out");
  const result = spawnSync("bash", [script, root, "fixture"], {
    env: {
      ...process.env,
      PATH: `${bin}:${process.env.PATH}`,
      I18N_ENV: env,
      I18N_OUT: out,
      FILES: "docs/example.md",
      WAVE_SCENARIO: scenario,
      FAKE_GIT_LOG: join(root, "git.log"),
      FAKE_TRANSLATION_LOG: join(root, "translation.log"),
      DOWN_MAX: "1",
      QUOTA_MAX: "1",
    },
    encoding: "utf8",
    timeout: 20_000,
  });
  assert.equal(result.signal, null, result.stderr);
  return {
    ...result,
    log: readFileSync(join(out, "fixture.log"), "utf8"),
    git: readFileSync(join(root, "git.log"), "utf8"),
    attempts: existsSync(join(root, "translation.log"))
      ? readFileSync(join(root, "translation.log"), "utf8").trim().split("\n").length
      : 0,
  };
}

test("a completed scoped wave reports PASS only after commit, push and verification", (t) => {
  const result = runWave(t, "success");
  assert.equal(result.status, 0, result.log + result.stderr);
  assert.match(result.log, /WAVE END .*status=PASS/);
  assert.match(result.git, /commit/);
  assert.match(result.git, /push/);
});

test("large progress output cannot turn a valid summary into a SIGPIPE failure", (t) => {
  const result = runWave(t, "large");
  assert.equal(result.status, 0, result.log + result.stderr);
  assert.match(result.log, /WAVE END .*status=PASS/);
});

for (const scenario of ["validation-quota-text", "recovered-quota"]) {
  test(`wave does not classify ${scenario} as exhausted quota`, (t) => {
    const result = runWave(t, scenario);
    assert.notEqual(result.status, 0, result.log);
    assert.equal(result.attempts, 3, result.log);
    assert.doesNotMatch(result.log, /QUOTA during/);
    assert.match(result.log, /WAVE END .*status=FAIL/);
  });
}

test("a terminal upstream 429 retains the quota backoff limit", (t) => {
  const result = runWave(t, "quota-error");
  assert.notEqual(result.status, 0, result.log);
  assert.equal(result.attempts, 1, result.log);
  assert.match(result.log, /QUOTA during/);
  assert.match(result.log, /WAVE END .*status=FAIL/);
});

for (const scenario of [
  "add",
  "commit",
  "push",
  "exit",
  "translation",
  "missing",
  "format",
  "drift-json",
  "stale",
  "stale-source",
  "backend",
]) {
  test(`wave cannot certify ${scenario} failure`, (t) => {
    const result = runWave(t, scenario);
    assert.notEqual(result.status, 0, result.log);
    assert.doesNotMatch(result.log, /WAVE END .*status=PASS/);
    assert.match(result.log, /WAVE END .*status=(FAIL|INCOMPLETE)/);
    if (scenario === "commit" || scenario === "add") assert.doesNotMatch(result.git, /^push/m);
  });
}
