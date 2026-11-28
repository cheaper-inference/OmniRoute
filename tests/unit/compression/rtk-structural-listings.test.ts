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

const LS_LONG = fixture("listing-ls-long.txt");
const LS_LONG_ERROR = fixture("listing-ls-long-error.txt");
const FIND = fixture("listing-find.txt");
const TREE = fixture("listing-tree.txt");
const GLOB = fixture("listing-glob.txt");
const GLOB_FOUND = fixture("listing-glob-found.txt");
const TREE_FOOTER = TREE.trimEnd().split("\n").pop() ?? "";

const encoder = getEncoding("cl100k_base");
const tokens = (text: string): number => encoder.encode(text).length;

const ON = { enabled: true, applyToToolResults: true, enableRenderers: true };

type Json = Record<string, unknown>;
type RunOptions = { flag?: boolean; config?: Json; toolName?: string };

function chatBody(output: string, command: string | null, toolName: string, extra: Json = {}) {
  return {
    model: "gpt-test",
    messages: [
      { role: "user", content: "list the files" },
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
      { role: "tool", tool_call_id: "call_1", content: output, ...extra },
    ],
  };
}

function summarize(res: ReturnType<typeof applyRtkCompression>) {
  return {
    compressed: res.compressed,
    techniques: res.stats?.techniquesUsed ?? [],
    rules: res.stats?.rulesApplied ?? [],
  };
}

/** One correlated tool call through the real engine (Chat shape). */
function run(text: string, command: string | null, options: RunOptions = {}) {
  const res = applyRtkCompression(chatBody(text, command, options.toolName ?? "bash"), {
    config: { ...ON, ...(options.config ?? {}) },
    rtkStructuralRenderersEnabled: options.flag ?? true,
  });
  const messages = (res.body as { messages: Array<{ content: string }> }).messages;
  return { text: messages[2].content, ...summarize(res) };
}

/** A native (non-shell) tool call whose result is an Anthropic `tool_result` block. */
function runAnthropic(text: string, toolName: string, resultExtra: Json = {}, flag = true) {
  const body = {
    model: "claude-test",
    messages: [
      { role: "user", content: "list the files" },
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "toolu_1", name: toolName, input: { pattern: "**/*" } }],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "toolu_1", content: text, ...resultExtra }],
      },
    ],
  };
  const res = applyRtkCompression(body, {
    config: ON,
    rtkStructuralRenderersEnabled: flag,
  });
  const messages = (res.body as { messages: Array<{ content: Json[] }> }).messages;
  return { block: messages[2].content[0], ...summarize(res) };
}

/** Rebuild every path a grouped listing stands for (headers, indented names, bare paths). */
function expandGroups(listing: string): string[] {
  const paths: string[] = [];
  let dir = "";
  let left = 0;
  for (const line of listing.split("\n")) {
    const header = /^(.*[\\/]) \((\d+)\)$/.exec(line);
    if (left === 0 && header) {
      dir = header[1];
      left = Number(header[2]);
    } else if (left > 0) {
      assert.ok(line.startsWith("  "), `entry under ${dir} must be indented: ${line}`);
      paths.push(dir + line.slice(2));
      left--;
    } else if (line !== "") {
      paths.push(line);
    }
  }
  assert.equal(left, 0, "a group header promised more entries than it listed");
  return paths;
}

const lines = (text: string) => text.split("\n").filter((line) => line !== "");

/** Full path of every entry of a `tree` listing, derived independently of the renderer. */
function treePaths(treeText: string): string[] {
  const out: string[] = [];
  const stack: string[] = [];
  const all = treeText.split("\n");
  const root = all[0];
  for (const line of all.slice(1)) {
    const m = /^((?:│ {3}| {4})*)(?:├── |└── )(.+)$/.exec(line);
    if (!m) continue;
    const depth = m[1].length / 4;
    stack.length = depth;
    stack.push(m[2]);
    out.push([root, ...stack].join("/"));
  }
  return out;
}

/** Full path of every entry of the indented tree summary (two spaces per level). */
function indentedPaths(summary: string): string[] {
  const rows = summary.split("\n");
  const out: string[] = [];
  const stack: string[] = [];
  for (const row of rows.slice(1)) {
    const m = /^((?: {2})+)(\S.*)$/.exec(row);
    if (!m) continue;
    stack.length = m[1].length / 2 - 1;
    stack.push(m[2].replace(/\/$/, ""));
    out.push([rows[0], ...stack].join("/"));
  }
  return out;
}

const originalDataDir = process.env.DATA_DIR;
afterEach(() => {
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  loadRtkFilters({ refresh: true, customFiltersEnabled: false });
});
after(() => closeCompressionWorkerPoolForTests());

describe("structural file listings (shell)", () => {
  it("listagens preservam caminhos, hierarquia e contagens", () => {
    // ls -l: name, size, type and the totals survive; the repetitive columns do not
    const ls = run(LS_LONG, "ls -la");
    assert.ok(ls.techniques.includes("rtk-render:ls-long"), ls.techniques.join(","));
    assert.ok(tokens(ls.text) < tokens(LS_LONG));
    for (const fact of [
      "total 96",
      "relatório final.ts",
      "notas de reunião.md",
      "日本語.txt",
      "1048576",
      "5120",
      "link atual -> relatório final.ts",
      "drwxr-xr-x 4096 src",
      "lrwxrwxrwx 20 link atual",
      "-rwxr-xr-x 2210 deploy.sh",
    ]) {
      assert.ok(ls.text.includes(fact), fact);
    }
    assert.equal(lines(ls.text).length, lines(LS_LONG).length + 1, "one line per entry + owner");
    assert.ok(ls.text.includes("owner:group dev:dev"), ls.text);
    assert.ok(!ls.text.includes("Nov 26"), "the date column is dropped");

    // find: every path survives, grouped under its directory with the directory's count
    const find = run(FIND, "find . -type f");
    assert.ok(find.techniques.includes("rtk-render:find-paths"), find.techniques.join(","));
    assert.ok(tokens(find.text) < tokens(FIND));
    assert.deepEqual(expandGroups(find.text).sort(), lines(FIND).sort());
    assert.ok(find.text.includes("./src/app/dashboard/providers/components/ (6)"), find.text);
    assert.ok(find.text.includes("./src/shared/utils/formatting/ (4)"), find.text);
    assert.ok(find.text.includes("  relatório final.ts"));
    assert.ok(find.text.includes("  Tabela de preços.tsx"));

    // tree: ancestors, names, Unicode and the footer survive; drawing characters do not
    const tree = run(TREE, "tree");
    assert.ok(tree.techniques.includes("rtk-render:tree"), tree.techniques.join(","));
    assert.ok(tokens(tree.text) < tokens(TREE) * 0.7, `${tokens(tree.text)} vs ${tokens(TREE)}`);
    assert.ok(tree.text.endsWith(`\n${TREE_FOOTER}\n`), tree.text);
    assert.ok(tree.text.startsWith(".\n  README.md\n  docs/\n    guia rápido.md\n"), tree.text);
    assert.ok(tree.text.includes("\n  src/\n    app.ts\n"));
    assert.ok(tree.text.includes("\n    sub pasta/\n      a.ts\n      b.ts\n      ñandú.ts\n"));
    assert.ok(!/[│├└]/.test(tree.text));
    for (const name of [
      "日本語",
      "índice.md",
      "ñandú.ts",
      "relatório final.ts",
      "Tabela de preços.tsx",
    ]) {
      assert.ok(tree.text.includes(name), name);
    }
    assert.deepEqual(indentedPaths(tree.text).sort(), treePaths(TREE).sort());
    assert.equal(indentedPaths(tree.text).length, 35);
  });

  it("listagem com linha sem classificação fica integral", () => {
    const stray = (text: string, extra: string) => `${text}${extra}\n`;
    const cases: Array<[string, string]> = [
      [LS_LONG_ERROR, "ls -la"],
      [stray(LS_LONG, "total 5 extra words"), "ls -la"],
      [stray(FIND, "find: './secret': Permission denied"), "find ."],
      [stray(FIND, "find: warning: you have specified the -maxdepth option after"), "find ."],
      [`${TREE}tree: error opening dir\n`, "tree"],
      [TREE.replace(TREE_FOOTER, "11 directories, 25 files"), "tree"],
      [TREE.replace("├── README.md", "README.md"), "tree"],
    ];
    for (const [text, command] of cases) {
      const out = run(text, command);
      assert.equal(out.text, text, command);
      assert.equal(out.compressed, false);
      assert.deepEqual(out.techniques, []);
    }
  });

  it("CRLF, Unicode e nomes com espaços mantêm componentes e contagens", () => {
    const crlfTree = TREE.replace(/\n/g, "\r\n");
    const out = run(crlfTree, "tree");
    assert.ok(out.techniques.includes("rtk-render:tree"), out.techniques.join(","));
    assert.equal(out.text, run(TREE, "tree").text, "the summary uses LF and is the same");
    assert.ok(!out.text.includes("\r"));
    assert.ok(out.text.includes("\n    sub pasta/\n      a.ts\n"));

    const crlfFind = run(FIND.replace(/\n/g, "\r\n"), "find .");
    assert.deepEqual(expandGroups(crlfFind.text).sort(), lines(FIND).sort());
    assert.ok(!crlfFind.text.includes("\r"));

    const crlfLs = run(LS_LONG.replace(/\n/g, "\r\n"), "ls -l");
    assert.ok(crlfLs.techniques.includes("rtk-render:ls-long"));
    assert.ok(crlfLs.text.includes("relatório final.ts") && !crlfLs.text.includes("\r"));

    // a stray CR inside an LF listing could be part of a name: nothing is rewritten
    const mixed = FIND.replace("./README.md\n", "./README.md\r\n");
    assert.notEqual(mixed, FIND);
    assert.equal(run(mixed, "find .").text, mixed);
    const mixedTree = TREE.replace("├── README.md\n", "├── README.md\r\n");
    assert.equal(run(mixedTree, "tree").text, mixedTree);
  });

  it("recognises a tree by its signature when the tool call carries no command", () => {
    const out = run(TREE, null);
    assert.ok(out.techniques.includes("rtk-render:tree"), out.techniques.join(","));
    // find and ls need the command: nothing in their text is a strong signature
    assert.equal(run(FIND, null).text, run(FIND, null, { flag: false }).text);
    assert.equal(run(LS_LONG, null).text, run(LS_LONG, null, { flag: false }).text);
  });

  it("tree: ASCII connectors and non-breaking spaces are read as the same hierarchy", () => {
    const ascii = TREE.replace(/├── /g, "|-- ").replace(/└── /g, "`-- ").replace(/│ {3}/g, "|   ");
    const nbsp = TREE.replace(/│ {3}/g, "│   ");
    const base = run(TREE, "tree").text;
    assert.equal(run(ascii, "tree").text, base);
    assert.equal(run(nbsp, "tree").text, base);
  });

  it("only routes the commands and options whose output it can read", async () => {
    const { listingDialectForCommand } =
      await import("../../../open-sse/services/compression/engines/rtk/renderers/fileListing.ts");
    const dialect = (command: string) => listingDialectForCommand(command);
    assert.equal(dialect("ls -la src"), "ls");
    assert.equal(dialect("/bin/ls -lh"), "ls");
    assert.equal(dialect("ls -l | head -20"), "ls");
    assert.equal(dialect("find . -name '*.ts' | sort"), "find");
    assert.equal(dialect("find 'a|b' -type f"), "find");
    assert.equal(dialect("tree -L 2 src"), "tree");
    assert.equal(dialect("ls -l --time-style=long-iso"), "ls");
    assert.equal(dialect("ls -l --time-style long-iso"), "ls");
    for (const command of [
      // date-only and other timestamp layouts the fixed-column parser cannot read
      "ls -l --time-style=iso",
      "ls -l --time-style iso",
      "ls -l --time-style=full-iso",
      "ls -l --time-style=locale",
      "ls -l --time-style=+%F",
      "ls -l --time-s=iso",
      "ls -l --time-style",
      "ls",
      "ls src",
      "ls -1",
      "ls -l | grep foo",
      "find . -name x -exec wc -l {} +",
      "find . -ls",
      "find . -print0",
      "find . -printf '%p %s\\n'",
      "find . | xargs wc -l",
      "tree -J",
      "tree -s -h",
      "tree --json",
      "tree -f",
      "git status",
      "",
    ]) {
      assert.equal(dialect(command), null, command);
    }
  });
});

describe("structural file listings (ls timestamp styles)", () => {
  // GNU `ls -l --time-style=iso` prints only the date for an old file, so a name that starts
  // with `12:34 ` is indistinguishable from a time column: the row below is one file named
  // "12:34 report.txt", and a fixed-column parser would render it as "report.txt".
  const DATE_ONLY = [
    "total 96",
    ...Array.from(
      { length: 12 },
      (_, i) => `-rw-r--r-- 1 dev dev ${100 + i} 2020-01-01 12:34 report-${i}.txt`
    ),
    "",
  ].join("\n");

  it("keeps the original when the timestamp style is not one it can read", () => {
    for (const command of ["ls -l --time-style=iso", "ls -l --time-style iso"]) {
      const on = run(DATE_ONLY, command);
      assert.equal(on.text, run(DATE_ONLY, command, { flag: false }).text, command);
      assert.ok(on.text.includes("12:34 report-0.txt"), command);
      assert.ok(!on.techniques.includes("rtk-render:ls-long"), command);
    }
    // under long-iso every row carries a time column, so the same rows are read
    assert.ok(
      run(DATE_ONLY, "ls -l --time-style=long-iso").techniques.includes("rtk-render:ls-long")
    );
  });

  it("still reads the default and the long-iso layouts", () => {
    assert.ok(run(LS_LONG, "ls -la").techniques.includes("rtk-render:ls-long"));
    // `--time-style=long-iso` prints every row as `YYYY-MM-DD HH:MM`.
    const longIso = LS_LONG.replace(
      / (Nov) (\d{2}) (\d{2}:\d{2}) /g,
      (_m, _mon: string, day: string, time: string) => ` 2026-11-${day} ${time} `
    )
      .replace(" Oct  3  2025 ", " 2025-10-03 00:00 ")
      .replace(" Sep 30  2025 ", " 2025-09-30 00:00 ");
    assert.notEqual(longIso, LS_LONG);
    const out = run(longIso, "ls -la --time-style=long-iso");
    assert.ok(out.techniques.includes("rtk-render:ls-long"), out.techniques.join(","));
    assert.ok(out.text.includes("relatório final.ts"));
  });
});

describe("structural file listings (native tools)", () => {
  const nativeNames = [
    "Glob",
    "glob",
    "glob_file_search",
    "list_dir",
    "list_directory",
    "list_files",
    "file_search",
    "ls",
  ];

  it("Glob: paths and the tool_result envelope survive", () => {
    const out = runAnthropic(GLOB, "Glob");
    assert.ok(out.techniques.includes("rtk-render:path-list"), out.techniques.join(","));
    const block = out.block as { type: string; tool_use_id: string; content: string };
    assert.equal(block.type, "tool_result");
    assert.equal(block.tool_use_id, "toolu_1");
    assert.ok(tokens(block.content) < tokens(GLOB));
    // the order of a Glob result is meaningful (it is sorted by recency): it is kept exactly
    assert.deepEqual(expandGroups(block.content), lines(GLOB));
    assert.ok(block.content.includes("  Tabela de preços.tsx"));
  });

  it("Glob in Chat shape keeps role, tool_call_id and sibling fields", () => {
    const body = chatBody(GLOB, null, "Glob", { name: "Glob" });
    const res = applyRtkCompression(body, {
      config: ON,
      rtkStructuralRenderersEnabled: true,
    });
    const tool = (res.body as { messages: Json[] }).messages[2];
    assert.equal(tool.role, "tool");
    assert.equal(tool.tool_call_id, "call_1");
    assert.equal(tool.name, "Glob");
    assert.deepEqual(expandGroups(tool.content as string), lines(GLOB));
    assert.ok(summarize(res).techniques.includes("rtk-render:path-list"));
  });

  it("Cursor listings: every bridged listing tool name is routed and keeps its header", () => {
    for (const name of nativeNames) {
      const out = runAnthropic(GLOB_FOUND, name);
      assert.ok(out.techniques.includes("rtk-render:path-list"), `${name}: ${out.techniques}`);
      const text = (out.block as { content: string }).content;
      assert.ok(text.startsWith(`Found ${lines(GLOB).length} files\n`), name);
      assert.deepEqual(expandGroups(text.split("\n").slice(1).join("\n")), lines(GLOB), name);
      assert.equal((out.block as { tool_use_id: string }).tool_use_id, "toolu_1");
    }
  });

  it("native listing: a wrong header count, prose or an error line keeps the original", () => {
    const wrongCount = GLOB_FOUND.replace(/^Found \d+ files/, "Found 99 files");
    const truncated = `${GLOB}(Results are truncated. Consider using a more specific path.)\n`;
    const error = `${GLOB}Error: EACCES: permission denied, scandir '/work/projeto/private'\n`;
    for (const text of [wrongCount, truncated, error, "No files found\n"]) {
      const out = runAnthropic(text, "Glob");
      assert.equal((out.block as { content: string }).content, text);
      assert.deepEqual(out.techniques, []);
    }
  });

  it("native listing never takes search matches or an unknown tool", () => {
    const matches = lines(GLOB)
      .map((p, i) => `${p}:${i + 3}:const needle = 1;`)
      .join("\n");
    for (const name of ["file_search", "Glob", "ls"]) {
      const out = runAnthropic(matches, name);
      const off = runAnthropic(matches, name, {}, false);
      assert.deepEqual(out.block, off.block, name);
      assert.ok(!out.techniques.some((t) => t.startsWith("rtk-render:")), name);
    }
    const unknown = runAnthropic(GLOB, "Read");
    assert.ok(!unknown.techniques.some((t) => t.startsWith("rtk-render:")));
  });

  it("is_error and cache_control blocks of a native listing stay byte-identical", () => {
    const failed = runAnthropic(GLOB, "Glob", { is_error: true });
    assert.equal((failed.block as { content: string }).content, GLOB);
    const cached = runAnthropic(GLOB, "Glob", { cache_control: { type: "ephemeral" } });
    assert.equal((cached.block as { content: string }).content, GLOB);
  });
});

describe("structural file listings (dispatch gates)", () => {
  it("flag off, renderers off or a different allowlist keep the legacy output", () => {
    const legacy = run(FIND, "find .", { flag: false });
    assert.ok(!legacy.techniques.some((t) => t.startsWith("rtk-render:")));
    assert.notEqual(run(FIND, "find .").text, legacy.text);
    const noRenderers = run(FIND, "find .", { config: { enableRenderers: false } });
    assert.equal(noRenderers.text, legacy.text);
    const otherAllowlist = run(FIND, "find .", { config: { renderers: ["git-diff"] } });
    assert.equal(otherAllowlist.text, legacy.text);
    const allowed = run(FIND, "find .", { config: { renderers: ["shell-find"] } });
    assert.ok(allowed.techniques.includes("rtk-render:find-paths"));
    const nativeAllowed = runAnthropic(GLOB, "Glob");
    assert.ok(nativeAllowed.techniques.includes("rtk-render:path-list"));
  });

  it("a listing over the analysis budget takes the legacy path and is counted", () => {
    const huge = Array.from({ length: 9000 }, (_, i) => `./d${i % 7}/arquivo-${i}.ts`).join("\n");
    const on = run(huge, "find . -type f");
    const off = run(huge, "find . -type f", { flag: false });
    assert.equal(on.text, off.text);
    assert.ok(on.rules.includes("rtk:structural:over-budget"), on.rules.join(","));
    assert.ok(!on.techniques.some((t) => t.startsWith("rtk-render:")));
  });

  it("a summary above the RTK line limit keeps the original instead of cutting it", () => {
    const out = run(FIND, "find .", { config: { maxLinesPerResult: 10 } });
    assert.equal(out.text, FIND);
    assert.deepEqual(out.techniques, []);
  });

  it("a second pass over a summary changes nothing", () => {
    const first = run(TREE, "tree");
    const second = run(first.text, "tree");
    assert.equal(second.text, first.text);
  });

  it("find without a saving (one file per directory) keeps the original", () => {
    const flat = Array.from({ length: 12 }, (_, i) => `./d${i}/f.ts`).join("\n") + "\n";
    const out = run(flat, "find . -type f");
    assert.equal(out.text, flat);
  });
});
