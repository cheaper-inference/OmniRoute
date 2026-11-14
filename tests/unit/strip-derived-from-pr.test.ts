// scripts/ad-hoc/strip-derived-from-pr.mjs — the one-time pass of plan 2026-11-13 (section 8):
// restore, in an open PR, only the lines it changed to update values the release refresh owns.
import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

type Check = {
  label: string;
  extract: (c: string) => { value: unknown; start: number; end: number }[];
};
type Ctx = { claimFiles: Map<string, Check[]>; instructionFiles: Set<string> };
type PlannedFile = { file: string; kind: string; content: string | null };

const strip = (await import("../../scripts/ad-hoc/strip-derived-from-pr.mjs")) as unknown as {
  classifyFile: (file: string, ctx: Ctx) => string | null;
  restoreClaims: (
    base: string,
    head: string,
    checks: Check[]
  ) => { content: string; edits: { from: string; to: string }[]; manual: string[] };
  revertDigitOnlyLines: (base: string, head: string) => { content: string; reverted: unknown[] };
  restoreDescription: (base: string, head: string) => { content: string; changed: boolean };
  planPrRestore: (args: {
    changed: string[];
    readBase: (f: string) => string | null;
    readHead: (f: string) => string | null;
    ctx: Ctx;
  }) => { files: PlannedFile[]; manual: string[] };
  loadContext: () => Promise<Ctx>;
  buildRestoreCommit: (args: {
    cwd: string;
    head: string;
    files: PlannedFile[];
    message?: string;
  }) => string;
};

// A locator in the gate's shape: "<N> providers" claims with the span of N.
const providerCheck: Check = {
  label: "Provider count",
  extract: (content) =>
    [...content.matchAll(/(\d+) providers/dg)].map((m) => ({
      value: Number(m[1]),
      start: (m as unknown as { indices: [number, number][] }).indices[1][0],
      end: (m as unknown as { indices: [number, number][] }).indices[1][1],
    })),
};
const ctx: Ctx = {
  claimFiles: new Map([["README.md", [providerCheck]]]),
  instructionFiles: new Set(["AGENTS.md", "llm.txt"]),
};

test("classifies every derived surface and nothing else", () => {
  assert.equal(strip.classifyFile("stryker.conf.json", ctx), "computed");
  assert.equal(strip.classifyFile("docs/i18n/pt-BR/llm.txt", ctx), "mirror");
  assert.equal(strip.classifyFile("docs/reference/derived-facts.json", ctx), "snapshot");
  assert.equal(strip.classifyFile("AGENTS.md", ctx), "instruction");
  assert.equal(strip.classifyFile("llm.txt", ctx), "instruction");
  assert.equal(strip.classifyFile("package.json", ctx), "description");
  assert.equal(strip.classifyFile("README.md", ctx), "claims");
  assert.equal(strip.classifyFile("src/app/page.tsx", ctx), null);
  assert.equal(strip.classifyFile("docs/i18n/pt-BR/README.md", ctx), null, "not a claim file here");
});

test("claims: each value the PR changed goes back to the base value; prose edits stay", () => {
  const base = "OmniRoute routes 387 providers. Old intro.\nAll 387 providers listed.\n";
  const head = "OmniRoute routes 388 providers. New intro!\nAll 388 providers listed.\n";
  const r = strip.restoreClaims(base, head, [providerCheck]);
  assert.equal(
    r.content,
    "OmniRoute routes 387 providers. New intro!\nAll 387 providers listed.\n"
  );
  assert.deepEqual(
    r.edits.map((e) => [e.from, e.to]),
    [
      ["388", "387"],
      ["388", "387"],
    ]
  );
  assert.deepEqual(r.manual, []);
});

test("claims: a PR that adds or removes a claim is left to a human", () => {
  const r = strip.restoreClaims("387 providers.\n", "388 providers. Also 388 providers.\n", [
    providerCheck,
  ]);
  assert.equal(r.content, "388 providers. Also 388 providers.\n", "nothing rewritten");
  assert.match(r.manual[0], /base has 1 claim\(s\), the PR has 2/);
});

test("instruction files: digit-only line edits revert, every other edit stays", () => {
  const base = "# Agents\nOne endpoint, 387 LLM providers.\nRule A.\n236 migrations.\n";
  const head =
    "# Agents\nOne endpoint, 388 LLM providers.\nRule A, clarified.\nNew rule B.\n237 migrations.\n";
  const r = strip.revertDigitOnlyLines(base, head);
  assert.equal(
    r.content,
    "# Agents\nOne endpoint, 387 LLM providers.\nRule A, clarified.\nNew rule B.\n236 migrations.\n"
  );
  assert.equal(r.reverted.length, 2);
});

test("package.json: only the description value changes", () => {
  const base =
    '{\n  "name": "omniroute",\n  "description": "Router with 387 providers.",\n  "version": "1"\n}\n';
  const head =
    '{\n  "name": "omniroute",\n  "description": "Router with 388 providers.",\n  "version": "2"\n}\n';
  const r = strip.restoreDescription(base, head);
  assert.equal(r.changed, true);
  assert.equal(
    r.content,
    '{\n  "name": "omniroute",\n  "description": "Router with 387 providers.",\n  "version": "2"\n}\n'
  );
  assert.equal(strip.restoreDescription(base, base).changed, false);
});

test("planPrRestore: whole-file kinds go back to the merge base (or are deleted)", () => {
  const baseFiles: Record<string, string | null> = {
    "docs/i18n/pt-BR/llm.txt": "mirror old\n",
    "stryker.conf.json": '{"tap":{"testFiles":["a"]}}\n',
    "docs/reference/derived-facts.json": null,
    "README.md": "387 providers.\n",
    "src/feature.ts": "export const a = 1;\n",
  };
  const headFiles: Record<string, string | null> = {
    "docs/i18n/pt-BR/llm.txt": "mirror new\n",
    "stryker.conf.json": '{"tap":{"testFiles":["a","b"]}}\n',
    "docs/reference/derived-facts.json": "{}\n",
    "README.md": "388 providers.\n",
    "src/feature.ts": "export const a = 2;\n",
  };
  const plan = strip.planPrRestore({
    changed: Object.keys(headFiles),
    readBase: (f) => baseFiles[f] ?? null,
    readHead: (f) => headFiles[f] ?? null,
    ctx,
  });
  const byFile = Object.fromEntries(plan.files.map((f) => [f.file, f]));
  assert.equal(byFile["docs/i18n/pt-BR/llm.txt"].content, "mirror old\n");
  assert.equal(byFile["stryker.conf.json"].content, '{"tap":{"testFiles":["a"]}}\n');
  assert.equal(
    byFile["docs/reference/derived-facts.json"].content,
    null,
    "absent at base → delete"
  );
  assert.equal(byFile["README.md"].content, "387 providers.\n");
  assert.equal(byFile["src/feature.ts"], undefined, "the PR's own change is never touched");
});

test("the real gate context covers README claims and the instruction files", async () => {
  const real = await strip.loadContext();
  assert.ok(real.claimFiles.has("README.md"));
  assert.ok(real.instructionFiles.has("AGENTS.md"));
  assert.ok(real.instructionFiles.has("llm.txt"));
  assert.ok(real.instructionFiles.has("src/shared/constants/agentSkills.ts"));
});

test("buildRestoreCommit: one commit on top of the head, only the planned files change", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "strip-commit-"));
  const git = (...args: string[]) =>
    execFileSync(
      "git",
      ["-c", "user.name=test", "-c", "user.email=test@example.invalid", ...args],
      { cwd: dir, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
    ).trim();
  try {
    git("init", "-q");
    fs.writeFileSync(path.join(dir, "README.md"), "388 providers.\n");
    fs.writeFileSync(path.join(dir, "keep.txt"), "untouched\n");
    fs.writeFileSync(path.join(dir, "drop.json"), "{}\n");
    git("add", "-A");
    git("commit", "-q", "-m", "PR head");
    const head = git("rev-parse", "HEAD");
    const commit = execFileSync(
      "node",
      [
        "--input-type=module",
        "-e",
        `import { buildRestoreCommit } from ${JSON.stringify(path.resolve("scripts/ad-hoc/strip-derived-from-pr.mjs"))};
         process.stdout.write(buildRestoreCommit({ cwd: process.argv[1], head: process.argv[2], files: [
           { file: "README.md", content: "387 providers.\\n" },
           { file: "drop.json", content: null } ] }));`,
        dir,
        head,
      ],
      {
        encoding: "utf8",
        env: {
          ...process.env,
          GIT_AUTHOR_NAME: "t",
          GIT_AUTHOR_EMAIL: "t@example.invalid",
          GIT_COMMITTER_NAME: "t",
          GIT_COMMITTER_EMAIL: "t@example.invalid",
        },
      }
    ).trim();
    assert.equal(git("rev-parse", `${commit}^`), head, "parent is the PR head (fast-forward)");
    assert.equal(git("show", `${commit}:README.md`), "387 providers.");
    assert.equal(git("show", `${commit}:keep.txt`), "untouched");
    assert.throws(() => git("show", `${commit}:drop.json`), "deleted file is gone");
    assert.match(
      git("log", "-1", "--format=%B", commit),
      /drop derived values the release refresh now owns/
    );
    assert.equal(git("rev-parse", "HEAD"), head, "the working branch is not moved");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
