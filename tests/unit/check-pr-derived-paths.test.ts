import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  categoryOf,
  evaluateDerivedPaths,
  globToRegExp,
  loadFamilies,
  main,
  normalizeFamily,
} from "../../scripts/check/check-pr-derived-paths.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const translation = normalizeFamily(
  {
    family: "translation",
    writers: ["release/v*", "docs/i18n-*", "chore/i18n-*", "chore/derived-*"],
    companions: ["changelog.d/**"],
    categories: [
      {
        id: "ui-locale-catalogs",
        paths: ["src/i18n/messages/*.json"],
        except: ["src/i18n/messages/en.json"],
        refreshedBy: "sync-ui-keys",
      },
      { id: "docs-i18n-mirrors", paths: ["docs/i18n/**", ".i18n-state.json"] },
    ],
  },
  "inline"
);

test("glob: * stays in one segment, ** crosses directories", () => {
  assert.ok(globToRegExp("src/i18n/messages/*.json").test("src/i18n/messages/pt-BR.json"));
  assert.ok(!globToRegExp("src/i18n/messages/*.json").test("src/i18n/messages/sub/pt-BR.json"));
  assert.ok(globToRegExp("docs/i18n/**").test("docs/i18n/pt-BR/docs/guides/X.md"));
  assert.ok(globToRegExp("docs/**/*.svg").test("docs/a.svg"));
  assert.ok(globToRegExp("docs/**/*.svg").test("docs/diagrams/x/a.svg"));
  assert.ok(!globToRegExp("release/v*").test("release-notes/v1"));
  assert.ok(globToRegExp("release/v*").test("release/v3.8.55"));
  assert.ok(!globToRegExp("a.b").test("axb"), "dots are literal");
});

test("en.json is the source, never a derived file", () => {
  assert.equal(categoryOf("src/i18n/messages/en.json", translation), null);
  assert.equal(categoryOf("src/i18n/messages/ko.json", translation)?.id, "ui-locale-catalogs");
  assert.equal(categoryOf(".i18n-state.json", translation)?.id, "docs-i18n-mirrors");
});

test("a feature PR that also edits locale catalogs and mirrors fails, one entry per category", () => {
  const { violations } = evaluateDerivedPaths({
    files: [
      "src/app/x.tsx",
      "src/i18n/messages/en.json",
      "src/i18n/messages/ko.json",
      "src/i18n/messages/pt-BR.json",
      "docs/i18n/ko/llm.txt",
    ],
    branch: "feat/thing",
    families: [translation],
  });
  assert.deepEqual(
    violations.map((v) => [v.category, v.files]),
    [
      ["ui-locale-catalogs", ["src/i18n/messages/ko.json", "src/i18n/messages/pt-BR.json"]],
      ["docs-i18n-mirrors", ["docs/i18n/ko/llm.txt"]],
    ]
  );
  assert.equal(violations[0].refreshedBy, "sync-ui-keys");
});

test("a feature PR that only touches en.json passes", () => {
  const result = evaluateDerivedPaths({
    files: ["src/app/x.tsx", "src/i18n/messages/en.json", "changelog.d/features/1-x.md"],
    branch: "feat/thing",
    families: [translation],
  });
  assert.deepEqual(result, { violations: [], allowed: [] });
});

test("a translation-only PR (plus a changelog fragment) is allowed", () => {
  const { violations, allowed } = evaluateDerivedPaths({
    files: ["src/i18n/messages/ko.json", "changelog.d/fixes/9-ko.md"],
    branch: "fix/ko-wording",
    families: [translation],
  });
  assert.equal(violations.length, 0);
  assert.deepEqual(allowed, [
    { family: "translation", reason: "family-only", files: ["src/i18n/messages/ko.json"] },
  ]);
});

test("en.json next to locale edits is not a translation-only PR", () => {
  const { violations } = evaluateDerivedPaths({
    files: ["src/i18n/messages/en.json", "src/i18n/messages/ko.json"],
    branch: "fix/ko-wording",
    families: [translation],
  });
  assert.equal(violations.length, 1);
});

test("writer branches may mix derived files with anything", () => {
  for (const branch of [
    "release/v3.8.55",
    "docs/i18n-wave-1113",
    "chore/i18n-mirror-refresh",
    "chore/derived-refresh",
  ]) {
    const { violations, allowed } = evaluateDerivedPaths({
      files: ["AGENTS.md", "docs/i18n/bs/AGENTS.md"],
      branch,
      families: [translation],
    });
    assert.equal(violations.length, 0, branch);
    assert.equal(allowed[0].reason, "writer", branch);
  }
});

test("config validation names the file and the field", () => {
  assert.throws(
    () => normalizeFamily({ family: "x", categories: [] }, "f.json"),
    /f\.json: categories/
  );
  assert.throws(
    () => normalizeFamily({ family: "x", categories: [{ id: "a", paths: [] }] }, "f.json"),
    /paths must not be empty/
  );
  assert.throws(
    () =>
      normalizeFamily(
        {
          family: "x",
          categories: [
            { id: "a", paths: ["x"] },
            { id: "a", paths: ["y"] },
          ],
        },
        "f.json"
      ),
    /duplicate category id "a"/
  );
  assert.throws(
    () =>
      normalizeFamily({
        family: "x",
        writers: "release/*",
        categories: [{ id: "a", paths: ["x"] }],
      }),
    /writers/
  );
});

test("the checked-in families load and keep en.json out of every category", () => {
  const families = loadFamilies(root);
  for (const family of families) {
    for (const source of [
      "src/i18n/messages/en.json",
      "bin/cli/locales/en.json",
      "llm.txt",
      "AGENTS.md",
    ]) {
      assert.equal(
        categoryOf(source, family),
        null,
        `${family.family} claims the source ${source}`
      );
    }
  }
});

function gitIn(dir: string, ...args: string[]) {
  return execFileSync("git", args, {
    cwd: dir,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function withRepo(fn: (dir: string, baseSha: string) => void) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "derived-paths-"));
  try {
    gitIn(dir, "init", "-q", "-b", "base");
    gitIn(dir, "config", "user.email", "test@example.invalid");
    gitIn(dir, "config", "user.name", "test");
    gitIn(dir, "config", "commit.gpgsign", "false");
    fs.mkdirSync(path.join(dir, "config/quality/derived-paths"), { recursive: true });
    fs.writeFileSync(
      path.join(dir, "config/quality/derived-paths/translation.json"),
      JSON.stringify({
        family: "translation",
        writers: ["docs/i18n-*"],
        categories: [{ id: "docs-i18n-mirrors", paths: ["docs/i18n/**"] }],
      })
    );
    fs.writeFileSync(path.join(dir, "app.ts"), "1\n");
    gitIn(dir, "add", "-A");
    gitIn(dir, "commit", "-q", "-m", "base");
    const baseSha = gitIn(dir, "rev-parse", "HEAD");
    gitIn(dir, "checkout", "-q", "-b", "feat/x");
    fn(dir, baseSha);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function quiet<T>(fn: () => T): T {
  const { log, error } = console;
  console.log = () => {};
  console.error = () => {};
  try {
    return fn();
  } finally {
    console.log = log;
    console.error = error;
  }
}

test("main: pr mode fails a feature commit that edits a mirror; --warn reports and passes", () => {
  withRepo((dir, baseSha) => {
    fs.writeFileSync(path.join(dir, "app.ts"), "2\n");
    fs.mkdirSync(path.join(dir, "docs/i18n/ko"), { recursive: true });
    fs.writeFileSync(path.join(dir, "docs/i18n/ko/llm.txt"), "x\n");
    gitIn(dir, "add", "-A");
    gitIn(dir, "commit", "-q", "-m", "feat");
    const env = { CI: "1", BASE_SHA: baseSha };
    assert.equal(
      quiet(() => main(["--mode=pr"], env, dir)),
      1
    );
    assert.equal(
      quiet(() => main(["--mode=pr", "--warn"], env, dir)),
      0
    );
    assert.equal(
      quiet(() => main(["--mode=pr", "--branch=docs/i18n-wave-1"], env, dir)),
      0
    );
    assert.equal(
      quiet(() => main(["--mode=release"], env, dir)),
      0,
      "release mode never judges"
    );
  });
});

test("main: unresolved base is a SKIP, not a pass by accident of an empty diff", () => {
  withRepo((dir) => {
    const lines: string[] = [];
    const { log } = console;
    console.log = (line: string) => lines.push(line);
    try {
      assert.equal(main(["--mode=pr"], { CI: "1", BASE_REF: "nope" }, dir), 0);
    } finally {
      console.log = log;
    }
    assert.match(lines.join("\n"), /SKIP reason=base-unresolved/);
  });
});

test("main: --files reads an explicit change list (the classify-pr-changes format)", () => {
  withRepo((dir) => {
    const list = path.join(dir, "changed.txt");
    fs.writeFileSync(list, "app.ts\ndocs/i18n/ko/README.md\n");
    assert.equal(
      quiet(() => main(["--mode=pr", `--files=${list}`, "--branch=feat/x"], { CI: "1" }, dir)),
      1
    );
    fs.writeFileSync(list, "docs/i18n/ko/README.md\n");
    assert.equal(
      quiet(() => main(["--mode=pr", `--files=${list}`, "--branch=feat/x"], { CI: "1" }, dir)),
      0
    );
  });
});

test("main: queue batches are skipped — each PR in them was judged on its own", () => {
  withRepo((dir, baseSha) => {
    fs.writeFileSync(path.join(dir, "app.ts"), "2\n");
    fs.mkdirSync(path.join(dir, "docs/i18n/ko"), { recursive: true });
    fs.writeFileSync(path.join(dir, "docs/i18n/ko/llm.txt"), "x\n");
    gitIn(dir, "add", "-A");
    gitIn(dir, "commit", "-q", "-m", "batch");
    const env = { CI: "1", BASE_SHA: baseSha };
    for (const branch of [
      "mergify/merge-queue/abc",
      "omni-queue/release/v3.8.54/1",
      "gh-readonly-queue/main/pr-1",
    ]) {
      assert.equal(
        quiet(() => main(["--mode=pr", `--branch=${branch}`], env, dir)),
        0,
        branch
      );
    }
    assert.equal(
      quiet(() => main(["--mode=pr"], { ...env, GITHUB_EVENT_NAME: "merge_group" }, dir)),
      0
    );
  });
});

test("main: --warn in GitHub Actions also emits one ::warning annotation per violation", () => {
  withRepo((dir, baseSha) => {
    fs.writeFileSync(path.join(dir, "app.ts"), "2\n");
    fs.mkdirSync(path.join(dir, "docs/i18n/ko"), { recursive: true });
    fs.writeFileSync(path.join(dir, "docs/i18n/ko/llm.txt"), "x\n");
    gitIn(dir, "add", "-A");
    gitIn(dir, "commit", "-q", "-m", "feat");
    const lines: string[] = [];
    const { log, error } = console;
    console.log = (line: string) => lines.push(line);
    console.error = () => {};
    try {
      const env = { CI: "1", BASE_SHA: baseSha, GITHUB_ACTIONS: "true" };
      assert.equal(main(["--mode=pr", "--warn"], env, dir), 0);
      assert.equal(lines.filter((l) => l.startsWith("::warning ")).length, 1);
      lines.length = 0;
      assert.equal(main(["--mode=pr"], env, dir), 1);
      assert.equal(lines.filter((l) => l.startsWith("::warning ")).length, 0, "only in --warn");
    } finally {
      console.log = log;
      console.error = error;
    }
  });
});
