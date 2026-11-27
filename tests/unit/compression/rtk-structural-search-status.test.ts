import { after, afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { getEncoding } from "js-tiktoken";
import { applyRtkCompression } from "../../../open-sse/services/compression/engines/rtk/index.ts";
import { loadRtkFilters } from "../../../open-sse/services/compression/engines/rtk/filterLoader.ts";
import { closeCompressionWorkerPoolForTests } from "../../../open-sse/services/compression/compressionWorkerPool.ts";

const FIXTURES = path.join(import.meta.dirname, "fixtures", "rtk", "structural");
const fixture = (name: string) => fs.readFileSync(path.join(FIXTURES, name), "utf8");

const RG_OUTPUT = fixture("rg-n-interleaved.txt");
const STATUS_OUTPUT = fixture("git-status-porcelain-v1.txt");

const encoder = getEncoding("cl100k_base");
const tokens = (text: string): number => encoder.encode(text).length;

const ON = { enabled: true, applyToToolResults: true, enableRenderers: true };
const SEARCH_TECHNIQUE = "rtk-render:search-matches";
const STATUS_TECHNIQUE = "rtk-render:git-status";

type RunOptions = { flag?: boolean; config?: Record<string, unknown>; toolName?: string };

function chatBody(output: string, command: string | null, toolName: string) {
  return {
    model: "gpt-test",
    messages: [
      { role: "user", content: "look around" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_1",
            type: "function",
            function: {
              name: toolName,
              arguments: JSON.stringify(command === null ? { pattern: "needle" } : { command }),
            },
          },
        ],
      },
      { role: "tool", tool_call_id: "call_1", content: output },
    ],
  };
}

/** One correlated tool call through the real engine; returns the text and techniques. */
function run(text: string, command: string | null, options: RunOptions = {}) {
  const res = applyRtkCompression(chatBody(text, command, options.toolName ?? "bash"), {
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

/** The engine as it behaved before the structural flag existed: the option is simply absent. */
function runLegacy(text: string, command: string | null, toolName = "bash") {
  const res = applyRtkCompression(chatBody(text, command, toolName), { config: { ...ON } });
  return (res.body as { messages: Array<{ content: string }> }).messages[2].content;
}

/** A native (non-shell) search tool call: no command, the tool name carries the routing. */
const runNative = (text: string, toolName: string, options: RunOptions = {}) =>
  run(text, null, { ...options, toolName });

function assertUntouched(out: ReturnType<typeof run>, original: string, label: string) {
  assert.equal(out.text, original, label);
  assert.equal(out.compressed, false, label);
  assert.deepEqual(out.techniques, [], label);
}

/** path -> every `line:text` of that path, read from the raw output. */
function matchesByPath(output: string): Map<string, string[]> {
  const byPath = new Map<string, string[]>();
  for (const line of output.split("\n")) {
    if (!line) continue;
    const first = line.indexOf(":");
    const file = line.slice(0, first);
    const list = byPath.get(file) ?? [];
    list.push(line.slice(first + 1));
    byPath.set(file, list);
  }
  return byPath;
}

const originalDataDir = process.env.DATA_DIR;
afterEach(() => {
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  loadRtkFilters({ refresh: true, customFiltersEnabled: false });
});
after(() => closeCompressionWorkerPoolForTests());

describe("structural search matches (shell)", () => {
  it("busca mantém contagem por arquivo e rejeita uma linha estranha", () => {
    const out = run(RG_OUTPUT, "rg -n needle src docs");
    assert.ok(out.techniques.includes(SEARCH_TECHNIQUE), out.techniques.join(","));
    assert.ok(tokens(out.text) < tokens(RG_OUTPUT));
    assert.ok(out.text.includes("src/a.ts (14)"), out.text);
    assert.ok(out.text.includes("27:needle"), out.text);

    // a stray tail line makes the whole listing untrustworthy: it comes back complete
    const almostSearch = `${RG_OUTPUT}rg: src/gone.ts: No such file or directory (os error 2)\n`;
    assertUntouched(run(almostSearch, "rg -n needle src"), almostSearch, "unknown tail line");
  });

  it("keeps the path, total and first samples of every group, in first-seen order", () => {
    const out = run(RG_OUTPUT, "rg -n needle src docs").text;
    const groups = matchesByPath(RG_OUTPUT);
    assert.equal(groups.size, 4);
    const positions: number[] = [];
    for (const [file, matches] of groups) {
      const header = `${file} (${matches.length})`;
      const at = out.indexOf(header);
      assert.ok(at >= 0, header);
      positions.push(at);
      // the head of the group survives verbatim with its line numbers
      for (const sample of matches.slice(0, 5)) assert.ok(out.includes(sample), sample);
    }
    assert.deepEqual(
      positions,
      [...positions].sort((x, y) => x - y)
    );
    assert.ok(out.includes("32 matches in 4 files"), out);
    // the 14 matches of src/a.ts show 5 and say how many are left
    assert.ok(out.includes("(+9 omitted)"), out);
    assert.ok(!out.includes("88:"), "a sample past the cap must not leak in");
  });

  it("works for grep -rn and tolerates CRLF", () => {
    const grep = run(RG_OUTPUT, "grep -rn needle .");
    assert.ok(grep.techniques.includes(SEARCH_TECHNIQUE));
    const crlf = run(RG_OUTPUT.replace(/\n/g, "\r\n"), "rg -n needle");
    assert.ok(crlf.techniques.includes(SEARCH_TECHNIQUE));
    assert.ok(crlf.text.includes("src/a.ts (14)"));
  });

  it("recognises the command after a cd and keeps the last segment", () => {
    const out = run(RG_OUTPUT, "cd repo && rg -n needle src");
    assert.ok(out.techniques.includes(SEARCH_TECHNIQUE));
  });

  it("keeps whole any listing that is not strictly path:line:text", () => {
    const first = RG_OUTPUT.split("\n").slice(0, 12).join("\n");
    const broken = [
      `${first}\n--\n`, // context separator
      `${first}\nBinary file src/blob.bin matches\n`,
      `${first}\n\nsrc/a.ts:99:after a blank line\n`,
      `${first}\nC:\\work\\a.ts:7:windows drive path\n`,
      `${first}\nsrc/a.ts-9-a context line\n`,
      `${first}\nsrc/a.ts:notanumber:text\n`,
      `${first}\n    \n`,
    ];
    for (const text of broken) {
      assertUntouched(run(text, "rg -n -C2 needle src"), text, JSON.stringify(text.slice(-40)));
    }
  });

  it("leaves output without line numbers or with other shapes on the legacy path", () => {
    const noNumbers = RG_OUTPUT.split("\n")
      .filter(Boolean)
      .map((line) => line.replace(/:\d+:/, ":"))
      .join("\n");
    for (const text of [noNumbers, "src/a.ts\nsrc/b.ts\nsrc/lib/c.ts\n", "42\n"]) {
      const on = run(text, "rg needle");
      const off = run(text, "rg needle", { flag: false });
      assert.ok(!on.techniques.includes(SEARCH_TECHNIQUE));
      assert.equal(on.text, off.text);
    }
  });

  it("flag off is byte-identical to the legacy path", () => {
    const off = run(RG_OUTPUT, "rg -n needle", { flag: false });
    assert.equal(off.text, runLegacy(RG_OUTPUT, "rg -n needle"));
    assert.ok(!off.techniques.includes(SEARCH_TECHNIQUE));
    assert.notEqual(run(RG_OUTPUT, "rg -n needle").text, off.text);
  });

  it("respects the renderers allowlist and requires applyToToolResults", () => {
    const blocked = run(RG_OUTPUT, "rg -n needle", { config: { renderers: ["git-diff"] } });
    assert.ok(!blocked.techniques.includes(SEARCH_TECHNIQUE));
    const allowed = run(RG_OUTPUT, "rg -n needle", { config: { renderers: ["shell-grep"] } });
    assert.ok(allowed.techniques.includes(SEARCH_TECHNIQUE));
    const off = run(RG_OUTPUT, "rg -n needle", { config: { applyToToolResults: false } });
    assertUntouched(off, RG_OUTPUT, "applyToToolResults off");
  });

  it("a second pass over a summary changes nothing", () => {
    const first = run(RG_OUTPUT, "rg -n needle");
    const second = run(first.text, "rg -n needle");
    assert.equal(second.text, first.text);
    assert.ok(!second.techniques.includes(SEARCH_TECHNIQUE));
  });

  it("input above the analysis budget skips the renderer and is counted", () => {
    const line = "src/big.ts:1:" + "needle ".repeat(10) + "\n";
    const big = line.repeat(9000);
    const on = run(big, "rg -n needle");
    const off = run(big, "rg -n needle", { flag: false });
    assert.ok(!on.techniques.includes(SEARCH_TECHNIQUE));
    assert.equal(on.text, off.text);
    assert.ok(on.rules.includes("rtk:structural:over-budget"), on.rules.join(","));
  });
});

describe("structural search matches (native Grep tool)", () => {
  const header = "Found 32 matches";
  const footer = "[Showing results with pagination = limit: 250, offset: 0]";
  const NATIVE = `${header}\n${RG_OUTPUT}\n${footer}`;

  it("summarises native Grep output and keeps path, line number and envelope", () => {
    for (const toolName of ["Grep", "grep"]) {
      const out = runNative(NATIVE, toolName);
      assert.ok(out.techniques.includes(SEARCH_TECHNIQUE), `${toolName}: ${out.techniques}`);
      assert.ok(tokens(out.text) < tokens(NATIVE));
      const lines = out.text.split("\n");
      assert.equal(lines[0], header);
      assert.equal(lines[lines.length - 1], footer);
      assert.ok(out.text.includes("src/a.ts (14)"));
      assert.ok(out.text.includes("27:needle(config, { retries: 3 });"));
      for (const [file, matches] of matchesByPath(RG_OUTPUT)) {
        assert.ok(out.text.includes(`${file} (${matches.length})`), file);
      }
      // the envelope is not duplicated by a second summary header
      assert.ok(!out.text.includes("matches in 4 files"));
    }
  });

  it("summarises bare native output (no envelope lines) as well", () => {
    const out = runNative(RG_OUTPUT, "Grep");
    assert.ok(out.techniques.includes(SEARCH_TECHNIQUE));
    assert.ok(out.text.includes("32 matches in 4 files"));
  });

  it("keeps native output whole when it starts valid and ends with an unknown line", () => {
    for (const text of [
      `${NATIVE}\nunexpected trailing note`,
      `${header}\n${RG_OUTPUT}rg: warning: something odd\n${footer}`,
      `${header}\n${RG_OUTPUT}\n${footer}\n${footer}`,
    ]) {
      assertUntouched(runNative(text, "Grep"), text, JSON.stringify(text.slice(-30)));
    }
  });

  it("native output that is not content mode stays on the legacy path", () => {
    for (const text of [
      "Found 3 files\nsrc/a.ts\nsrc/b.ts\nsrc/lib/c.ts",
      "No matches found",
      "src/a.ts:14\nsrc/b.ts:9\n",
    ]) {
      const on = runNative(text, "Grep");
      const off = runNative(text, "Grep", { flag: false });
      assert.ok(!on.techniques.includes(SEARCH_TECHNIQUE), text);
      assert.equal(on.text, off.text);
    }
  });

  it("other native tools and flag off are untouched by this route", () => {
    const readTool = runNative(NATIVE, "Read");
    assert.ok(!readTool.techniques.includes(SEARCH_TECHNIQUE));
    const off = runNative(NATIVE, "Grep", { flag: false });
    assert.ok(!off.techniques.includes(SEARCH_TECHNIQUE));
    assert.equal(off.text, runLegacy(NATIVE, null, "Grep"));
    const allowlist = runNative(NATIVE, "Grep", { config: { renderers: ["git-diff"] } });
    assert.ok(!allowlist.techniques.includes(SEARCH_TECHNIQUE));
  });
});

describe("structural git status", () => {
  const statusCommand = "git status --porcelain=v1 --branch";

  it("status separa índice, árvore de trabalho, conflitos e não rastreados", () => {
    const out = run(STATUS_OUTPUT, statusCommand);
    assert.ok(out.techniques.includes(STATUS_TECHNIQUE), out.techniques.join(","));
    assert.ok(tokens(out.text) < tokens(STATUS_OUTPUT));
    for (const fact of [
      "## feature/render...origin/feature/render [ahead 2, behind 1]",
      "staged: 8",
      "unstaged: 4",
      "unmerged: 1",
      "untracked: 36",
      "ignored: 6",
      "old.ts -> new.ts",
    ]) {
      assert.ok(out.text.includes(fact), fact);
    }
  });

  it("keeps both axes of XY and every staged, unstaged and unmerged path", () => {
    const out = run(STATUS_OUTPUT, statusCommand).text;
    const lines = out.split("\n");
    const section = (name: string) => {
      const from = lines.findIndex((line) => line.startsWith(`${name}:`));
      assert.ok(from >= 0, name);
      const body: string[] = [];
      for (let i = from + 1; i < lines.length && lines[i].startsWith("  "); i++) {
        body.push(lines[i].trim());
      }
      return body;
    };
    assert.deepEqual(section("staged"), [
      "M src/a.ts",
      "M src/b.ts",
      "A src/new1.ts",
      "A src/new2.ts",
      "D src/old1.ts",
      "R old.ts -> new.ts",
      "M src/c.ts",
      "M docs/readme.md",
    ]);
    assert.deepEqual(section("unstaged"), ["M src/c.ts", "M src/d.ts", "M src/e.ts", "D src/f.ts"]);
    assert.deepEqual(section("unmerged"), ["UU src/conflict.ts"]);
  });

  it("groups untracked and ignored files by directory with totals", () => {
    const out = run(STATUS_OUTPUT, statusCommand).text;
    assert.ok(out.includes("build/gen/ (30)"), out);
    assert.ok(out.includes("tmp/ (4)"), out);
    assert.ok(out.includes("dist/ (6)"), out);
    // a quoted path (it holds a space) is never regrouped or rewritten
    assert.ok(out.includes('"my file.txt"'), out);
    assert.ok(out.includes("notes.txt"), out);
    // the first names of a group are kept, the rest is counted
    assert.ok(out.includes("out01.js"), out);
    assert.ok(!out.includes("out30.js"), out);
  });

  it("accepts the short forms of the same format", () => {
    for (const command of ["git status -s", "git status -sb", "git status --short --branch"]) {
      const out = run(STATUS_OUTPUT, command);
      assert.ok(out.techniques.includes(STATUS_TECHNIQUE), command);
    }
    const noBranch = STATUS_OUTPUT.split("\n").slice(1).join("\n");
    const out = run(noBranch, "git status --porcelain");
    assert.ok(out.techniques.includes(STATUS_TECHNIQUE));
    assert.ok(!out.text.includes("##"));
  });

  it("keeps -z, porcelain v2, colour, unknown lines and stray tails whole", () => {
    const nul = STATUS_OUTPUT.split("\n").filter(Boolean).join("\0") + "\0";
    const v2 = [
      "# branch.oid 1111111111111111111111111111111111111111",
      "# branch.head main",
      ...Array.from(
        { length: 40 },
        (_, i) => `1 .M N... 100644 100644 100644 aaaa bbbb src/f${i}.ts`
      ),
      "? notes.txt",
    ].join("\n");
    const cases: Array<[string, string]> = [
      [nul, "git status --porcelain -z"],
      [v2, "git status --porcelain=v2 --branch"],
      [`${STATUS_OUTPUT}warning: unable to access cache\n`, statusCommand],
      [STATUS_OUTPUT.replace("UU src/conflict.ts", "ZZ src/conflict.ts"), statusCommand],
      [STATUS_OUTPUT.replace("R  old.ts -> new.ts", "R  old.ts"), statusCommand],
      [STATUS_OUTPUT.replace("M  src/a.ts", "\u001b[32mM\u001b[m  src/a.ts"), statusCommand],
      [`${STATUS_OUTPUT}## late branch line\n`, statusCommand],
      [`${STATUS_OUTPUT}\n \n`, statusCommand],
    ];
    for (const [text, command] of cases) {
      assertUntouched(run(text, command), text, `${command} :: ${JSON.stringify(text.slice(-30))}`);
    }
  });

  it("human-readable status stays on the legacy path", () => {
    const human = [
      "On branch main",
      "Changes not staged for commit:",
      ...Array.from({ length: 30 }, (_, i) => `\tmodified:   src/f${i}.ts`),
      "",
    ].join("\n");
    const on = run(human, "git status");
    const off = run(human, "git status", { flag: false });
    assert.ok(!on.techniques.includes(STATUS_TECHNIQUE));
    assert.equal(on.text, off.text);
  });

  it("flag off is byte-identical to the legacy path; the allowlist is honoured", () => {
    const off = run(STATUS_OUTPUT, statusCommand, { flag: false });
    assert.equal(off.text, runLegacy(STATUS_OUTPUT, statusCommand));
    assert.ok(!off.techniques.includes(STATUS_TECHNIQUE));
    const blocked = run(STATUS_OUTPUT, statusCommand, { config: { renderers: ["git-diff"] } });
    assert.ok(!blocked.techniques.includes(STATUS_TECHNIQUE));
    const allowed = run(STATUS_OUTPUT, statusCommand, { config: { renderers: ["git-status"] } });
    assert.ok(allowed.techniques.includes(STATUS_TECHNIQUE));
  });

  it("a second pass over a summary changes nothing", () => {
    const first = run(STATUS_OUTPUT, statusCommand);
    const second = run(first.text, statusCommand);
    assert.equal(second.text, first.text);
    assert.ok(!second.techniques.includes(STATUS_TECHNIQUE));
  });
});
