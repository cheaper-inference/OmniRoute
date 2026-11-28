import { after, afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Worker } from "node:worker_threads";
import { getEncoding } from "js-tiktoken";
import {
  applyRtkCompression,
  processRtkText,
} from "../../../open-sse/services/compression/engines/rtk/index.ts";
import { loadRtkFilters } from "../../../open-sse/services/compression/engines/rtk/filterLoader.ts";
import {
  applyCompression,
  applyCompressionAsync,
} from "../../../open-sse/services/compression/strategySelector.ts";
import { makeMemoKey } from "../../../open-sse/services/compression/resultMemo.ts";
import { isCompressionWorkerEligible } from "../../../open-sse/services/compression/compressionWorkerProtocol.ts";
import { closeCompressionWorkerPoolForTests } from "../../../open-sse/services/compression/compressionWorkerPool.ts";
import { applyLossyRequestPolicy } from "../../../open-sse/services/compression/lossyRequestPolicy.ts";
import { RTK_STRUCTURAL_RENDERERS_FLAG } from "../../../open-sse/services/compression/engines/rtk/structuralFlag.ts";
import { tryStructuralRender } from "../../../open-sse/services/compression/engines/rtk/renderers/structural.ts";
import {
  DEFAULT_RTK_CONFIG,
  type CompressionConfig,
} from "../../../open-sse/services/compression/types.ts";

const FIXTURES = path.join(import.meta.dirname, "fixtures", "rtk", "structural");
const fixture = (name: string) => fs.readFileSync(path.join(FIXTURES, name), "utf8");

const MULTI_DIFF = fixture("diff-multi-file.diff");
const COMBINED_DIFF = fixture("diff-combined-merge.diff");
const CONFLICT_DIFF = fixture("diff-conflict-markers.diff");
const MIXED_BINARY_DIFF = fixture("diff-mixed-binary.diff");
const MIXED_BINARY_PATCH = fixture("diff-mixed-binary-patch.diff");

const encoder = getEncoding("cl100k_base");
const tokens = (text: string): number => encoder.encode(text).length;

const ON = { enabled: true, applyToToolResults: true, enableRenderers: true };
const STRUCTURAL_TECHNIQUE = "rtk-render:unified-diff";

type Block = Record<string, unknown>;
type RunOptions = {
  flag?: boolean;
  config?: Record<string, unknown>;
  toolName?: string;
};

function chatBody(output: string, command: string | null, toolName = "bash") {
  return {
    model: "gpt-test",
    messages: [
      { role: "user", content: "show me the changes" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_1",
            type: "function",
            function: {
              name: toolName,
              arguments: JSON.stringify(command === null ? {} : { command }),
            },
          },
        ],
      },
      { role: "tool", tool_call_id: "call_1", content: output },
    ],
  };
}

/** One correlated shell tool call through the real engine; returns the text and techniques. */
function run(text: string, command: string | null = "git diff", options: RunOptions = {}) {
  const res = applyRtkCompression(chatBody(text, command, options.toolName), {
    config: { ...ON, ...(options.config ?? {}) },
    rtkStructuralRenderersEnabled: options.flag ?? true,
  });
  const messages = (res.body as { messages: Array<{ content: string }> }).messages;
  return {
    text: messages[2].content,
    compressed: res.compressed,
    techniques: res.stats?.techniquesUsed ?? [],
    rules: res.stats?.rulesApplied ?? [],
  };
}

interface FileFacts {
  header: string;
  hunkHeaders: string[];
  /** Changed lines, and the no-newline markers that follow them, in input order. */
  changed: string[];
  adds: number;
  dels: number;
}

const HUNK_COUNTS_RE = /^@@ -\d+(?:,(\d+))? \+\d+(?:,(\d+))? @@/;

/**
 * The facts a faithful summary of a unified diff must keep, read from the input itself. Lines are
 * classified by their place in a hunk (the declared counts decide where it ends), so a changed
 * line that looks like a path header (`+++ b/x`) still counts as a change.
 */
function diffFacts(diff: string): FileFacts[] {
  const files: FileFacts[] = [];
  let oldLeft = 0;
  let newLeft = 0;
  let afterChange = false;
  for (const raw of diff.split("\n")) {
    const file = files[files.length - 1];
    if (raw.startsWith("\\")) {
      if (afterChange) file.changed.push(raw);
    } else if (oldLeft > 0 || newLeft > 0) {
      afterChange = raw.startsWith("+") || raw.startsWith("-");
      if (raw.startsWith("+")) {
        file.adds++;
        newLeft--;
        file.changed.push(raw);
      } else if (raw.startsWith("-")) {
        file.dels++;
        oldLeft--;
        file.changed.push(raw);
      } else {
        oldLeft--;
        newLeft--;
      }
    } else if (raw.startsWith("diff --git ")) {
      files.push({ header: raw, hunkHeaders: [], changed: [], adds: 0, dels: 0 });
    } else if (raw.startsWith("@@ ")) {
      const counts = HUNK_COUNTS_RE.exec(raw);
      assert.ok(counts, raw);
      oldLeft = Number(counts[1] ?? 1);
      newLeft = Number(counts[2] ?? 1);
      afterChange = false;
      file.hunkHeaders.push(raw);
    }
  }
  return files;
}

/** The same facts read back from a summary: stat lines carry the counts, context is gone. */
function summaryFacts(summary: string): Array<FileFacts & { stats: string[] }> {
  const files: Array<FileFacts & { stats: string[] }> = [];
  for (const line of summary.split("\n")) {
    if (line.startsWith("diff --git ")) {
      files.push({ header: line, hunkHeaders: [], changed: [], adds: 0, dels: 0, stats: [] });
      continue;
    }
    const file = files[files.length - 1];
    const stat = /^# (\+\d+ -\d+)$/.exec(line);
    if (stat) file.stats.push(stat[1]);
    else if (line.startsWith("@@ ")) file.hunkHeaders.push(line);
    else if (file.hunkHeaders.length > 0) file.changed.push(line);
  }
  return files;
}

/** Every file, hunk header and changed line of `diff` is in `summary`, in order, in its own file. */
function assertSummaryKeepsEveryChange(summary: string, diff: string): void {
  const expected = diffFacts(diff);
  const actual = summaryFacts(summary);
  assert.deepEqual(
    actual.map((file) => file.header),
    expected.map((file) => file.header)
  );
  expected.forEach((file, index) => {
    const got = actual[index];
    assert.deepEqual(got.hunkHeaders, file.hunkHeaders, `hunk headers of ${file.header}`);
    assert.deepEqual(got.changed, file.changed, `changed lines of ${file.header}`);
    const stats = file.hunkHeaders.length > 0 ? [`+${file.adds} -${file.dels}`] : [];
    assert.deepEqual(got.stats, stats, `counts of ${file.header}`);
  });
}

function syntheticAddedFile(lines: number, lineText: (index: number) => string): string {
  const body = Array.from({ length: lines }, (_, i) => `+${lineText(i)}`).join("\n");
  return [
    "diff --git a/big.txt b/big.txt",
    "new file mode 100644",
    "index 0000000..1111111",
    "--- /dev/null",
    "+++ b/big.txt",
    `@@ -0,0 +1,${lines} @@`,
    body,
    "",
  ].join("\n");
}

const FLAG_RESOLVER_KEY = Symbol.for("omniroute.featureFlagResolver");
function setFlagResolver(resolver: unknown): void {
  const store = globalThis as Record<symbol, unknown>;
  if (resolver === undefined) delete store[FLAG_RESOLVER_KEY];
  else store[FLAG_RESOLVER_KEY] = resolver;
}
/** Install a resolver that answers `value` and counts only lookups of the structural flag. */
function countFlagLookups(value: boolean): { count: number } {
  const lookups = { count: 0 };
  setFlagResolver((key: string) => {
    if (key !== RTK_STRUCTURAL_RENDERERS_FLAG) return false;
    lookups.count++;
    return value;
  });
  return lookups;
}
const originalResolver = (globalThis as Record<symbol, unknown>)[FLAG_RESOLVER_KEY];
const originalDataDir = process.env.DATA_DIR;

afterEach(() => {
  setFlagResolver(originalResolver);
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  loadRtkFilters({ refresh: true, customFiltersEnabled: false });
});
after(() => closeCompressionWorkerPoolForTests());

describe("structural unified diff", () => {
  it("diff estrutural mantém todos os arquivos e hunks", () => {
    const out = run(MULTI_DIFF);
    const facts = diffFacts(MULTI_DIFF);
    assert.ok(out.techniques.includes(STRUCTURAL_TECHNIQUE), out.techniques.join(","));
    assert.ok(tokens(out.text) < tokens(MULTI_DIFF));
    assert.equal(facts.length, 7);
    assert.equal(facts.flatMap((file) => file.hunkHeaders).length, 8);
    assertSummaryKeepsEveryChange(out.text, MULTI_DIFF);
    // significant file metadata survives: creation, removal, rename and mode change
    for (const line of [
      "new file mode 100644",
      "deleted file mode 100644",
      "rename from src/svc/rename-me.ts",
      "rename to src/svc/renamed.ts",
      "similarity index 95%",
      "old mode 100644",
      "new mode 100755",
    ]) {
      assert.ok(out.text.includes(line), line);
    }
    // dispensable content is gone: blob ids and unchanged context
    assert.ok(!/^index /m.test(out.text));
    assert.ok(!/^ {3}const base = input \* 3;$/m.test(out.text));
    assert.ok(!/^ export function order2\(input: number\): number \{$/m.test(out.text));
  });

  it("counts +N -M per file from the whole input", () => {
    const out = run(MULTI_DIFF);
    const sections = out.text.split(/^(?=diff --git )/m);
    const sectionOf = (file: string) => sections.find((s) => s.startsWith(`diff --git a/${file}`));
    // math.ts: 3 hunks of the fixture add 4 lines and remove 3
    const math = sectionOf("src/util/math.ts");
    assert.ok(math, out.text);
    assert.equal(math.match(/^# \+\d+ -\d+$/gm)?.join("|"), "# +4 -3");
    // legacy.ts is a whole-file removal
    const legacy = sectionOf("src/svc/legacy.ts");
    assert.ok(legacy, out.text);
    assert.match(legacy.match(/^# \+\d+ -\d+$/gm)?.join("|") ?? "", /^# \+0 -3\d$/);
  });

  it("keeps duplicate and header-shaped changes in their own hunk and file", () => {
    const repeated = [" alpha", "-return 1;", "+return 2;", " omega"];
    const tricky = [
      "diff --git a/one.txt b/one.txt",
      "index 1111111..2222222 100644",
      "--- a/one.txt",
      "+++ b/one.txt",
      "@@ -1,3 +1,3 @@",
      ...repeated,
      "@@ -10,4 +10,4 @@",
      " beta",
      "--- a/example",
      "+++ b/example",
      "-return 1;",
      "+return 2;",
      " gamma",
      "diff --git a/two.txt b/two.txt",
      "index 3333333..4444444 100644",
      "--- a/two.txt",
      "+++ b/two.txt",
      "@@ -1,3 +1,3 @@",
      ...repeated,
      "",
    ].join("\n");
    const out = run(tricky);
    assert.ok(out.techniques.includes(STRUCTURAL_TECHNIQUE), out.text);
    assertSummaryKeepsEveryChange(out.text, tricky);
    const [one, two] = summaryFacts(out.text);
    assert.deepEqual(one.stats, ["+3 -3"]);
    assert.deepEqual(two.stats, ["+1 -1"]);
    assert.ok(one.changed.includes("+++ b/example") && one.changed.includes("--- a/example"));
  });

  it("recognises a diff by its signature when the tool call carries no command", () => {
    const out = run(MULTI_DIFF, null);
    assert.ok(out.techniques.includes(STRUCTURAL_TECHNIQUE));
    assert.ok(tokens(out.text) < tokens(MULTI_DIFF));
  });

  it("keeps CRLF content lines and still summarises", () => {
    const crlf = MULTI_DIFF.replace(/\n/g, "\r\n");
    const out = run(crlf);
    assert.ok(out.techniques.includes(STRUCTURAL_TECHNIQUE));
    assertSummaryKeepsEveryChange(out.text, crlf);
  });

  it("keeps the no-newline marker that belongs to a changed line", () => {
    const input = [
      "diff --git a/a.txt b/a.txt",
      "index 1111111..2222222 100644",
      "--- a/a.txt",
      "+++ b/a.txt",
      "@@ -1,2 +1,2 @@",
      " keep",
      "-old tail",
      "\\ No newline at end of file",
      "+new tail",
      "\\ No newline at end of file",
      "",
    ].join("\n");
    const out = run(input);
    assert.equal(out.text.split("\\ No newline at end of file").length - 1, 2);
    assert.ok(out.text.includes("-old tail\n\\ No newline at end of file\n+new tail"));
  });

  it("diff de conflito ou binário fica integral", () => {
    for (const text of [COMBINED_DIFF, CONFLICT_DIFF, MIXED_BINARY_DIFF, MIXED_BINARY_PATCH]) {
      const out = run(text, "git diff");
      assert.equal(out.text, text);
      assert.equal(out.compressed, false);
      assert.deepEqual(out.techniques, []);
      // and by signature alone
      assert.equal(run(text, null).text, text);
    }
  });

  it("keeps incomplete, trailing-garbage and miscounted diffs whole", () => {
    const truncated = MULTI_DIFF.split("\n").slice(0, 8).join("\n");
    const trailing = `${MULTI_DIFF}warning: something unexpected\n`;
    const miscounted = MULTI_DIFF.replace("@@ -10,7 +10,8 @@", "@@ -10,7 +10,9 @@");
    assert.notEqual(miscounted, MULTI_DIFF);
    for (const text of [truncated, trailing, miscounted]) {
      assert.equal(run(text).text, text);
    }
  });

  it("a second pass over a summary changes nothing", () => {
    const first = run(MULTI_DIFF);
    const second = run(first.text);
    assert.equal(second.text, first.text);
    assert.deepEqual(second.techniques, []);
  });

  it("falls back to the legacy filters when the output is not a diff at all", () => {
    const stat = " src/a.ts | 3 ++-\n 1 file changed, 2 insertions(+), 1 deletion(-)\n";
    const flagOn = run(stat, "git diff --stat");
    const flagOff = run(stat, "git diff --stat", { flag: false });
    assert.equal(flagOn.text, flagOff.text);
  });
});

describe("structural unified diff: refuses what it cannot prove complete", () => {
  const SECTION_HEAD = [
    "diff --git a/a.txt b/a.txt",
    "index 1111111..2222222 100644",
    "--- a/a.txt",
    "+++ b/a.txt",
  ];
  const withTail = (...tail: string[]) => `${[...SECTION_HEAD, ...tail].join("\n")}\n`;
  const keptWhole = (text: string, label: string) => {
    const out = run(text);
    assert.equal(out.text, text, label);
    assert.ok(!out.techniques.includes(STRUCTURAL_TECHNIQUE), label);
  };

  it("accepts only the exact no-newline marker inside a hunk", () => {
    const cases: Record<string, string> = {
      "diagnostic after context": withTail(
        "@@ -1,2 +1,2 @@",
        "-old",
        "+new",
        " keep",
        "\\ upstream read failed"
      ),
      "diagnostic after a change": withTail(
        "@@ -1,1 +1,1 @@",
        "-old",
        "+new",
        "\\ output truncated"
      ),
      "diagnostic after the counts reach zero": withTail(
        "@@ -1,1 +1,1 @@",
        "-old",
        "\\ No newline at end of file",
        "+new",
        "\\ No newline at end of file",
        "\\ trailing diagnostic"
      ),
      "marker with a suffix": withTail(
        "@@ -1,1 +1,1 @@",
        "-old",
        "+new",
        "\\ No newline at end of file!"
      ),
      "marker with another case": withTail(
        "@@ -1,1 +1,1 @@",
        "-old",
        "+new",
        "\\ no newline at end of file"
      ),
    };
    for (const [label, text] of Object.entries(cases)) keptWhole(text, label);
    // the exact marker still works, with a CRLF line ending too
    const valid = withTail("@@ -1,1 +1,1 @@", "-old", "+new", "\\ No newline at end of file");
    assert.ok(run(valid).techniques.includes(STRUCTURAL_TECHNIQUE));
    assert.ok(run(valid.replace(/\n/g, "\r\n")).techniques.includes(STRUCTURAL_TECHNIQUE));
  });

  it("refuses a file section that ends before its hunks", () => {
    const cut: Record<string, string[]> = {
      "path pair without a hunk": ["diff --git a/b.ts b/b.ts", "--- a/b.ts", "+++ b/b.ts"],
      "blob id and path pair without a hunk": [
        "diff --git a/b.ts b/b.ts",
        "index 1111111..2222222 100644",
        "--- a/b.ts",
        "+++ b/b.ts",
      ],
      "header and blob id only": ["diff --git a/b.ts b/b.ts", "index 1111111..2222222 100644"],
      "bare header": ["diff --git a/b.ts b/b.ts"],
      "rename without its target": [
        "diff --git a/b.ts b/c.ts",
        "similarity index 100%",
        "rename from b.ts",
      ],
      "old mode without the new mode": ["diff --git a/b.ts b/b.ts", "old mode 100644"],
      "copy without its target": [
        "diff --git a/b.ts b/c.ts",
        "similarity index 100%",
        "copy from b.ts",
      ],
    };
    for (const [label, lines] of Object.entries(cut)) {
      keptWhole(`${MULTI_DIFF}${lines.join("\n")}\n`, `after a complete diff: ${label}`);
      keptWhole(`${lines.join("\n")}\n`, `alone: ${label}`);
    }
  });

  it("still accepts hunkless changes that are complete", () => {
    const complete = [
      ["diff --git a/e.txt b/e.txt", "new file mode 100644", "index 0000000..e69de29"],
      ["diff --git a/e.txt b/e.txt", "deleted file mode 100644", "index e69de29..0000000"],
      ["diff --git a/o.ts b/n.ts", "similarity index 100%", "rename from o.ts", "rename to n.ts"],
      ["diff --git a/o.ts b/n.ts", "similarity index 100%", "copy from o.ts", "copy to n.ts"],
      ["diff --git a/x.sh b/x.sh", "old mode 100644", "new mode 100755"],
    ];
    const out = run(`${MULTI_DIFF}${complete.flat().join("\n")}\n`);
    assert.ok(out.techniques.includes(STRUCTURAL_TECHNIQUE), out.techniques.join(","));
    for (const line of complete.flat().filter((l) => !l.startsWith("index "))) {
      assert.ok(out.text.includes(line), line);
    }
  });
});

describe("structural dispatch gates", () => {
  const legacyOf = (text: string, config: Record<string, unknown> = {}) =>
    processRtkText(text, { command: "git diff", config: { ...ON, ...config } });

  it("flag off is byte-identical to the legacy path", () => {
    const off = run(MULTI_DIFF, "git diff", { flag: false });
    const legacy = legacyOf(MULTI_DIFF);
    assert.equal(off.text, legacy.text);
    assert.ok(off.techniques.includes("rtk-render:git-diff"));
    assert.ok(!off.techniques.includes(STRUCTURAL_TECHNIQUE));
    assert.notEqual(run(MULTI_DIFF).text, off.text);
  });

  it("covers the four combinations of the global flag and enableRenderers", () => {
    const legacy = legacyOf(MULTI_DIFF).text;
    for (const [flag, enableRenderers] of [
      [false, false],
      [false, true],
      [true, false],
      [true, true],
    ] as const) {
      const out = run(MULTI_DIFF, "git diff", { flag, config: { enableRenderers } });
      const structural = out.techniques.includes(STRUCTURAL_TECHNIQUE);
      assert.equal(
        structural,
        flag && enableRenderers,
        `flag=${flag} renderers=${enableRenderers}`
      );
      if (!structural) {
        const expected = enableRenderers
          ? legacy
          : processRtkText(MULTI_DIFF, {
              command: "git diff",
              config: { ...ON, enableRenderers: false },
            }).text;
        assert.equal(out.text, expected);
      }
    }
  });

  it("requires applyToToolResults", () => {
    const out = run(MULTI_DIFF, "git diff", { config: { applyToToolResults: false } });
    assert.equal(out.text, MULTI_DIFF);
    assert.deepEqual(out.techniques, []);
  });

  it("respects the renderers allowlist", () => {
    const blocked = run(MULTI_DIFF, "git diff", { config: { renderers: ["git-status"] } });
    assert.ok(!blocked.techniques.includes(STRUCTURAL_TECHNIQUE));
    const allowed = run(MULTI_DIFF, "git diff", { config: { renderers: ["git-diff"] } });
    assert.ok(allowed.techniques.includes(STRUCTURAL_TECHNIQUE));
  });

  it("explicit filter selection keeps the legacy path", () => {
    const disabled = run(MULTI_DIFF, "git diff", { config: { disabledFilters: ["git-diff"] } });
    assert.ok(!disabled.techniques.includes(STRUCTURAL_TECHNIQUE));
    const enabled = run(MULTI_DIFF, "git diff", { config: { enabledFilters: ["git-diff"] } });
    assert.ok(!enabled.techniques.includes(STRUCTURAL_TECHNIQUE));
    const unrelated = run(MULTI_DIFF, "git diff", {
      config: { disabledFilters: ["docker-logs"] },
    });
    assert.ok(unrelated.techniques.includes(STRUCTURAL_TECHNIQUE));
  });

  it("a custom filter that matches the command wins over the structural renderer", () => {
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-structural-"));
    try {
      process.env.DATA_DIR = dataDir;
      fs.mkdirSync(path.join(dataDir, "rtk"), { recursive: true });
      fs.writeFileSync(
        path.join(dataDir, "rtk", "filters.json"),
        JSON.stringify({
          id: "my-diff-filter",
          label: "my-diff-filter",
          category: "generic",
          priority: 100,
          match: { outputTypes: [], commands: ["^git diff\\b"], patterns: ["diff --git"] },
          rules: { dropPatterns: ["^index "], maxLines: 400, headLines: 200, tailLines: 200 },
          preserve: { errorPatterns: ["error"], summaryPatterns: [] },
          tests: [{ name: "sample", input: "index x\ndiff --git", expected: "diff --git" }],
        })
      );
      loadRtkFilters({ refresh: true });
      const out = run(MULTI_DIFF);
      assert.ok(!out.techniques.includes(STRUCTURAL_TECHNIQUE), out.techniques.join(","));
      const legacy = processRtkText(MULTI_DIFF, { command: "git diff", config: { ...ON } });
      assert.equal(out.text, legacy.text);
      // the custom filter, not a built-in one, produced that output
      assert.ok(
        legacy.rulesApplied.some((rule) => rule.includes("my-diff-filter")),
        legacy.rulesApplied.join(",")
      );
      assert.ok(
        out.rules.some((rule) => rule.includes("my-diff-filter")),
        out.rules.join(",")
      );
    } finally {
      fs.rmSync(dataDir, { recursive: true, force: true });
    }
  });

  it("an inherited object-prototype name is not a native tool route", () => {
    const config = { ...DEFAULT_RTK_CONFIG, ...ON };
    for (const toolName of ["__proto__", "constructor"]) {
      const options = {
        skipFilters: true,
        toolName,
        toolResult: true,
        rtkStructuralRenderersEnabled: true,
      };
      assert.deepEqual(tryStructuralRender(MULTI_DIFF, config, options), { kind: "legacy" });
      const huge = syntheticAddedFile(9000, (i) => `line ${i}`);
      assert.deepEqual(tryStructuralRender(huge, config, options), { kind: "legacy" });
      const viaText = processRtkText(MULTI_DIFF, { ...options, config: ON });
      assert.ok(!viaText.techniquesUsed.includes(STRUCTURAL_TECHNIQUE), toolName);
    }
  });

  it("a malformed renderers allowlist is normalised instead of throwing", () => {
    for (const renderers of [{ length: 1 }, "git-diff", 7, null]) {
      const out = run(MULTI_DIFF, "git diff", { config: { renderers } });
      assert.ok(out.techniques.includes(STRUCTURAL_TECHNIQUE), JSON.stringify(renderers));
    }
    // non-string entries are dropped and a valid allowlist still applies
    const mixed = run(MULTI_DIFF, "git diff", { config: { renderers: ["git-status", 5] } });
    assert.ok(!mixed.techniques.includes(STRUCTURAL_TECHNIQUE));
    const valid = run(MULTI_DIFF, "git diff", { config: { renderers: ["git-diff", 5] } });
    assert.ok(valid.techniques.includes(STRUCTURAL_TECHNIQUE));
    // the legacy renderer path reads the same normalised value
    const legacy = run(MULTI_DIFF, "git diff", {
      flag: false,
      config: { renderers: { length: 1 } },
    });
    assert.ok(legacy.techniques.includes("rtk-render:git-diff"));
  });

  it("applies the same line budget as the legacy path when maxLinesPerResult is 0", () => {
    // The legacy path clamps the line budget to at least one line (effectiveMaxLines), so a
    // zero must not lift the cap on the structural summary only.
    for (const maxLinesPerResult of [0, 1]) {
      const out = run(MULTI_DIFF, "git diff", { config: { maxLinesPerResult } });
      assert.equal(out.text, MULTI_DIFF, `maxLinesPerResult=${maxLinesPerResult}`);
      assert.ok(!out.techniques.includes(STRUCTURAL_TECHNIQUE));
    }
  });

  it("never applies to a non-shell tool result", () => {
    const out = run(MULTI_DIFF, null, { toolName: "read_file" });
    assert.ok(!out.techniques.includes(STRUCTURAL_TECHNIQUE));
  });

  it("leaves assistant text alone", () => {
    const body = {
      messages: [{ role: "assistant", content: MULTI_DIFF }],
    };
    const res = applyRtkCompression(body, {
      config: { ...ON, applyToAssistantMessages: true },
      rtkStructuralRenderersEnabled: true,
    });
    assert.ok(!(res.stats?.techniquesUsed ?? []).includes(STRUCTURAL_TECHNIQUE));
  });

  it("a stepConfig key cannot switch the renderers on", () => {
    const res = applyRtkCompression(chatBody(MULTI_DIFF, "git diff"), {
      stepConfig: { ...ON, rtkStructuralRenderersEnabled: true },
    });
    assert.ok(!(res.stats?.techniquesUsed ?? []).includes(STRUCTURAL_TECHNIQUE));
  });
});

describe("structural analysis budget", () => {
  it("a diff over 8192 lines goes to the legacy RTK, with a counter", () => {
    const big = syntheticAddedFile(9000, (i) => `line ${i}`);
    const on = run(big);
    const off = run(big, "git diff", { flag: false });
    assert.equal(on.text, off.text);
    assert.ok(!on.techniques.includes(STRUCTURAL_TECHNIQUE));
    assert.ok(on.rules.includes("rtk:structural:over-budget"), on.rules.join(","));
  });

  it("a line over 16 KiB goes to the legacy RTK", () => {
    const wide = syntheticAddedFile(5, (i) => (i === 2 ? "x".repeat(17 * 1024) : `line ${i}`));
    assert.equal(run(wide).text, run(wide, "git diff", { flag: false }).text);
  });

  it("an input over 512 KiB goes to the legacy RTK before any parsing", () => {
    const huge = syntheticAddedFile(600, () => "y".repeat(1000));
    assert.ok(huge.length > 512 * 1024);
    const on = run(huge);
    assert.equal(on.text, run(huge, "git diff", { flag: false }).text);
    assert.ok(on.rules.includes("rtk:structural:over-budget"));
  });

  it("measures the 512 KiB ceiling in bytes, not only characters", () => {
    // 200k characters of 3-byte code points: under the character ceiling, over the byte ceiling.
    const wide = syntheticAddedFile(400, () => "\u20ac".repeat(500));
    assert.ok(wide.length < 512 * 1024);
    assert.ok(Buffer.byteLength(wide) > 512 * 1024);
    const on = run(wide);
    assert.equal(on.text, run(wide, "git diff", { flag: false }).text);
    assert.ok(on.rules.includes("rtk:structural:over-budget"));
  });

  it("measures the 16 KiB line ceiling in bytes, not only characters", () => {
    // 10,000 CJK characters are 30,000 UTF-8 bytes on a single line.
    const wide = syntheticAddedFile(5, (i) => (i === 2 ? "\u4e2d".repeat(10_000) : `line ${i}`));
    assert.ok(wide.length < 512 * 1024);
    const on = run(wide);
    assert.equal(on.text, run(wide, "git diff", { flag: false }).text);
    assert.ok(!on.techniques.includes(STRUCTURAL_TECHNIQUE));
    assert.ok(on.rules.includes("rtk:structural:over-budget"), on.rules.join(","));
  });

  it("an ASCII line right at the 16 KiB ceiling stays eligible", () => {
    const edge = [
      "diff --git a/w.txt b/w.txt",
      "index 1111111..2222222 100644",
      "--- a/w.txt",
      "+++ b/w.txt",
      "@@ -1,3 +1,3 @@",
      ` ${"x".repeat(16 * 1024 - 1)}`,
      "-old",
      "+new",
      " tail",
      "",
    ].join("\n");
    const on = run(edge);
    assert.ok(on.techniques.includes(STRUCTURAL_TECHNIQUE), on.rules.join(","));
    assert.ok(!on.rules.includes("rtk:structural:over-budget"));
  });

  it("a summary that cannot fit the RTK line limit keeps the whole input", () => {
    const changes = syntheticAddedFile(300, (i) => `change ${i}`);
    const out = run(changes);
    assert.equal(out.text, changes);
    assert.deepEqual(out.techniques, []);
  });
});

describe("structural flag capture", () => {
  const rtkConfig = { enabled: true, applyToToolResults: true, enableRenderers: true };
  const config = {
    enabled: true,
    defaultMode: "rtk",
    memoizeCompressionResults: true,
    rtkConfig,
  } as unknown as CompressionConfig;
  const bodyOf = () => chatBody(MULTI_DIFF, "git diff") as unknown as Record<string, unknown>;
  const toolText = (result: { body: Record<string, unknown> }) =>
    (result.body.messages as Array<{ content: string }>)[2].content;

  it("desligar a flag invalida memo de RTK", () => {
    const principal = "structural-memo-principal";
    const flagOn = applyCompression(bodyOf(), "rtk", {
      config,
      principalId: principal,
      rtkStructuralRenderersEnabled: true,
    });
    const afterFlagOff = applyCompression(bodyOf(), "rtk", {
      config,
      principalId: principal,
      rtkStructuralRenderersEnabled: false,
    });
    const legacy = applyCompression(bodyOf(), "rtk", {
      config: { ...config, memoizeCompressionResults: false },
      rtkStructuralRenderersEnabled: false,
    });
    assert.equal(toolText(afterFlagOff), toolText(legacy));
    assert.notEqual(toolText(flagOn), toolText(legacy));
    const flagOnAgain = applyCompression(bodyOf(), "rtk", {
      config,
      principalId: principal,
      rtkStructuralRenderersEnabled: true,
    });
    assert.equal(toolText(flagOnAgain), toolText(flagOn));
  });

  it("the memo key differs with the flag only for engines that can render", () => {
    const body = bodyOf();
    const base = makeMemoKey(body, "rtk", config, "p");
    assert.equal(makeMemoKey(body, "rtk", config, "p", undefined, undefined, false), base);
    assert.notEqual(makeMemoKey(body, "rtk", config, "p", undefined, undefined, true), base);
    const stacked = { ...config, stackedPipeline: [{ engine: "rtk" }] } as CompressionConfig;
    assert.notEqual(
      makeMemoKey(body, "stacked", stacked, "p", undefined, undefined, true),
      makeMemoKey(body, "stacked", stacked, "p")
    );
    assert.equal(
      makeMemoKey(body, "lite", config, "p", "m", true, true),
      makeMemoKey(body, "lite", config, "p", "m", true)
    );
  });

  it("resolves the flag once at the entry point and honours an explicit value", async () => {
    const lookups = countFlagLookups(true);
    const resolved = applyCompression(bodyOf(), "rtk", { config });
    assert.ok(toolText(resolved).includes("+4 -3"));
    assert.equal(lookups.count, 1, "one lookup for an implicit sync request");
    lookups.count = 0;
    const remote = await applyCompressionAsync(bodyOf(), "rtk", { config });
    assert.ok(toolText(remote).includes("+4 -3"));
    assert.equal(lookups.count, 1, "one lookup for an implicit async request");
    lookups.count = 0;
    const explicitOff = applyCompression(bodyOf(), "rtk", {
      config,
      rtkStructuralRenderersEnabled: false,
    });
    assert.ok(!toolText(explicitOff).includes("+4 -3"));
    const explicitOn = await applyCompressionAsync(bodyOf(), "rtk", {
      config,
      rtkStructuralRenderersEnabled: true,
    });
    assert.ok(toolText(explicitOn).includes("+4 -3"));
    assert.equal(lookups.count, 0, "an explicit decision is never looked up");
  });

  it("never consults the flag resolver unless an RTK step has enableRenderers on", async () => {
    const lookups = countFlagLookups(true);
    const off = { enabled: true, applyToToolResults: true, enableRenderers: false };
    const cases: Array<[string, Record<string, unknown>]> = [
      ["rtk, renderers off", { rtkConfig: off }],
      ["rtk, default config", { rtkConfig: undefined }],
      ["rtk, tool results off", { rtkConfig: { ...rtkConfig, applyToToolResults: false } }],
    ];
    for (const [label, extra] of cases) {
      const cfg = { ...config, memoizeCompressionResults: false, ...extra } as CompressionConfig;
      const sync = applyCompression(bodyOf(), "rtk", { config: cfg });
      const remote = await applyCompressionAsync(bodyOf(), "rtk", { config: cfg });
      assert.ok(!toolText(sync).includes("+4 -3"), label);
      assert.ok(!toolText(remote).includes("+4 -3"), label);
      assert.equal(lookups.count, 0, label);
    }
    for (const pipeline of [[{ engine: "rtk" }], undefined]) {
      const stacked = {
        ...config,
        defaultMode: "stacked",
        memoizeCompressionResults: false,
        stackedPipeline: pipeline,
        rtkConfig: off,
      } as unknown as CompressionConfig;
      applyCompression(bodyOf(), "stacked", { config: stacked });
      await applyCompressionAsync(bodyOf(), "stacked", { config: stacked });
      assert.equal(lookups.count, 0, "stacked, renderers off");
    }
    // a step that turns the renderers on by itself is enough to ask for the flag
    const stepOn = {
      ...config,
      memoizeCompressionResults: false,
      stackedPipeline: [{ engine: "rtk", config: { enableRenderers: true } }],
      rtkConfig: off,
    } as unknown as CompressionConfig;
    const result = applyCompression(bodyOf(), "stacked", { config: stepOn });
    assert.equal(lookups.count, 1, "one lookup for a step that turns the renderers on");
    assert.ok(toolText(result).includes("+4 -3"));
    lookups.count = 0;
    applyCompression(bodyOf(), "rtk", { config });
    assert.equal(lookups.count, 1, "rtk with renderers on asks for the flag exactly once");
  });

  it("a resolver that throws fails closed", () => {
    setFlagResolver(() => {
      throw new Error("resolver down");
    });
    const result = applyCompression(bodyOf(), "rtk", { config });
    assert.ok(!toolText(result).includes("+4 -3"));
  });

  it("stacked pipelines carry the flag to the RTK step", () => {
    const stacked = {
      ...config,
      defaultMode: "stacked",
      memoizeCompressionResults: false,
      stackedPipeline: [{ engine: "rtk" }],
      rtkConfig,
    } as unknown as CompressionConfig;
    const on = applyCompression(bodyOf(), "stacked", {
      config: stacked,
      rtkStructuralRenderersEnabled: true,
    });
    const off = applyCompression(bodyOf(), "stacked", { config: stacked });
    assert.ok(toolText(on).includes("+4 -3"));
    assert.ok(!toolText(off).includes("+4 -3"));
  });

  it("local and worker execution agree and the worker needs no resolver of its own", async () => {
    const workerConfig = { ...config, memoizeCompressionResults: false } as CompressionConfig;
    assert.equal(
      isCompressionWorkerEligible(bodyOf(), "rtk", {
        config: workerConfig,
        rtkStructuralRenderersEnabled: true,
      }),
      true
    );
    const local = applyCompression(bodyOf(), "rtk", {
      config: workerConfig,
      rtkStructuralRenderersEnabled: true,
    });
    // Start from a fresh pool so the spy sees the listeners of the worker that serves this job.
    await closeCompressionWorkerPoolForTests();
    let posted = 0;
    const replies: string[] = [];
    const originalPostMessage = Worker.prototype.postMessage;
    const originalOn = Worker.prototype.on;
    Worker.prototype.postMessage = function (this: Worker, ...args) {
      posted++;
      return originalPostMessage.apply(this, args);
    };
    Worker.prototype.on = function (
      this: Worker,
      event: string,
      listener: (...args: unknown[]) => void
    ) {
      if (event !== "message") return originalOn.call(this, event, listener);
      return originalOn.call(this, event, (message: { type?: string }) => {
        replies.push(String(message?.type));
        listener(message);
      });
    } as typeof Worker.prototype.on;
    try {
      // The resolver exists only in this thread: the worker gets the decision in its job.
      const lookups = countFlagLookups(true);
      const remoteOn = await applyCompressionAsync(bodyOf(), "rtk", { config: workerConfig });
      assert.ok(posted >= 1, "must run in a worker thread");
      // A dispatch alone proves nothing: the in-process retry would produce the same text.
      assert.ok(replies.includes("result"), `worker replies: ${replies.join(",")}`);
      assert.ok(!replies.includes("error"), `worker replies: ${replies.join(",")}`);
      assert.equal(lookups.count, 1);
      assert.equal(toolText(remoteOn), toolText(local));
      assert.ok(toolText(remoteOn).includes("+4 -3"));
      replies.length = 0;
      setFlagResolver(() => false);
      const remoteOff = await applyCompressionAsync(bodyOf(), "rtk", { config: workerConfig });
      assert.ok(replies.includes("result"), `worker replies: ${replies.join(",")}`);
      assert.ok(!toolText(remoteOff).includes("+4 -3"));
    } finally {
      Worker.prototype.postMessage = originalPostMessage;
      Worker.prototype.on = originalOn;
    }
  });

  it("a safe request policy never reaches the structural renderer", () => {
    const plan = applyLossyRequestPolicy({ mode: "rtk", stackedPipeline: [] }, "safe");
    assert.ok(!plan.stackedPipeline.some((step) => step.engine === "rtk"));
    assert.notEqual(plan.mode, "rtk");
  });
});

describe("structural diff across message shapes", () => {
  const RTK_STRUCTURAL = { config: ON, rtkStructuralRenderersEnabled: true };

  it("Anthropic tool_result: string and text-block content, envelope intact", () => {
    const body = {
      model: "anthropic/claude-sonnet-4",
      messages: [
        { role: "user", content: "diff please" },
        {
          role: "assistant",
          content: [
            { type: "tool_use", id: "toolu_1", name: "bash", input: { command: "git diff" } },
            { type: "tool_use", id: "toolu_2", name: "bash", input: { command: "git diff" } },
          ],
        },
        {
          role: "user",
          content: [
            { type: "tool_result", tool_use_id: "toolu_1", content: MULTI_DIFF },
            {
              type: "tool_result",
              tool_use_id: "toolu_2",
              content: [{ type: "text", text: MULTI_DIFF }],
            },
          ],
        },
      ],
    };
    const res = applyRtkCompression(body, RTK_STRUCTURAL);
    const blocks = (res.body as { messages: Array<{ content: Block[] }> }).messages[2].content;
    assert.equal(blocks[0].type, "tool_result");
    assert.equal(blocks[0].tool_use_id, "toolu_1");
    assert.equal(blocks[1].tool_use_id, "toolu_2");
    const first = blocks[0].content as string;
    const second = (blocks[1].content as Array<{ type: string; text: string }>)[0];
    assert.equal(second.type, "text");
    assert.equal(first, second.text);
    assert.ok(first.includes("+4 -3"));
  });

  it("is_error: true stays intact with both flags on and the sibling is summarised", () => {
    const failedBlock = {
      type: "tool_result",
      tool_use_id: "toolu_1",
      is_error: true,
      content: MULTI_DIFF,
    };
    const okBlock = { type: "tool_result", tool_use_id: "toolu_2", content: MULTI_DIFF };
    const body = {
      messages: [
        { role: "user", content: "diff" },
        {
          role: "assistant",
          content: [
            { type: "tool_use", id: "toolu_1", name: "bash", input: { command: "git diff" } },
            { type: "tool_use", id: "toolu_2", name: "bash", input: { command: "git diff" } },
          ],
        },
        { role: "user", content: [failedBlock, okBlock] },
      ],
    };
    const res = applyRtkCompression(body, RTK_STRUCTURAL);
    const blocks = (res.body as { messages: Array<{ content: Block[] }> }).messages[2].content;
    assert.deepEqual(blocks[0], failedBlock);
    assert.ok((blocks[1].content as string).includes("+4 -3"));
  });

  it("cache_control on the block or the sub-block is preserved byte for byte", () => {
    const cached = {
      type: "tool_result",
      tool_use_id: "toolu_1",
      cache_control: { type: "ephemeral" },
      content: MULTI_DIFF,
    };
    const cachedSub = {
      type: "tool_result",
      tool_use_id: "toolu_2",
      content: [{ type: "text", text: MULTI_DIFF, cache_control: { type: "ephemeral" } }],
    };
    const body = {
      messages: [
        { role: "user", content: "diff" },
        {
          role: "assistant",
          content: [
            { type: "tool_use", id: "toolu_1", name: "bash", input: { command: "git diff" } },
            { type: "tool_use", id: "toolu_2", name: "bash", input: { command: "git diff" } },
          ],
        },
        { role: "user", content: [cached, cachedSub] },
      ],
    };
    const res = applyRtkCompression(body, RTK_STRUCTURAL);
    assert.equal(res.compressed, false);
    assert.equal(res.body, body);
  });

  it("Responses: summarises a local shell output and keeps the envelope", () => {
    const body = {
      model: "gpt-test",
      input: [
        { type: "message", role: "user", content: "diff" },
        { type: "local_shell_call", call_id: "call_s", action: { command: ["git", "diff"] } },
        { type: "local_shell_call_output", call_id: "call_s", output: MULTI_DIFF },
      ],
    };
    const res = applyRtkCompression(body, RTK_STRUCTURAL);
    const item = (res.body as { input: Array<Record<string, unknown>> }).input[2];
    assert.equal(item.type, "local_shell_call_output");
    assert.equal(item.call_id, "call_s");
    assert.equal(typeof item.output, "string");
    assert.ok((item.output as string).includes("+4 -3"));
    assert.deepEqual((res.body as { input: unknown[] }).input.slice(0, 2), body.input.slice(0, 2));
  });

  it("Responses: other output item types stay on the legacy path", () => {
    const body = {
      model: "gpt-test",
      input: [
        { type: "message", role: "user", content: "diff" },
        { type: "function_call", call_id: "call_f", name: "shell", arguments: "{}" },
        { type: "function_call_output", call_id: "call_f", output: MULTI_DIFF },
      ],
    };
    const res = applyRtkCompression(body, RTK_STRUCTURAL);
    assert.ok(!(res.stats?.techniquesUsed ?? []).includes(STRUCTURAL_TECHNIQUE));
  });
});

describe("structural dispatch through processRtkText (the context test route)", () => {
  it("renders only when the caller marks a tool result and passes the decision", () => {
    const base = { command: "git diff", config: ON };
    const on = processRtkText(MULTI_DIFF, {
      ...base,
      rtkStructuralRenderersEnabled: true,
      toolResult: true,
    });
    assert.ok(on.techniquesUsed.includes(STRUCTURAL_TECHNIQUE));
    assert.ok(on.rulesApplied.includes("rtk:render:unified-diff"));
    assert.ok(on.compressed && on.compressedTokens < on.originalTokens);
    const notMarked = processRtkText(MULTI_DIFF, { ...base, rtkStructuralRenderersEnabled: true });
    assert.ok(!notMarked.techniquesUsed.includes(STRUCTURAL_TECHNIQUE));
    const noDecision = processRtkText(MULTI_DIFF, { ...base, toolResult: true });
    assert.equal(noDecision.text, processRtkText(MULTI_DIFF, base).text);
  });
});
