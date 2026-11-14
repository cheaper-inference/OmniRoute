#!/usr/bin/env node
// Launch quality gates runner (docs/qa/LAUNCH-QA.md).
//
//   npm run quality:launch                    summary table + one line per violation
//   npm run quality:launch -- --json out.json also writes the full report as JSON
//
// Gates and limits: config/quality/launch-gates.json. Exit 1 when any gate has a violation.
// Measure only: this script never edits the files it checks.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ESLint } from "eslint";
import libCoverage from "istanbul-lib-coverage";
import v8ToIstanbul from "v8-to-istanbul";
import { listFunctions, computeHalstead } from "./launch-halstead.mjs";
import { runDeadCode, runDuplicates, runAnyUnknown } from "./launch-scans.mjs";
import { resolveScope } from "./launch-scope.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const GATES_PATH = path.join(ROOT, "config/quality/launch-gates.json");
const ESLINT_CONFIG = path.join(ROOT, "config/quality/launch-gates.eslint.config.mjs");

/** CRAP = cc^2 * (1 - coverage)^3 + cc, coverage in [0, 1]. */
export function crapScore(cc, coverage) {
  const uncovered = 1 - coverage;
  return cc * cc * uncovered ** 3 + cc;
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

function parseArgs(argv) {
  const args = { json: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--json") args.json = argv[++i];
  }
  return args;
}

function lineStarts(text) {
  const starts = [0];
  for (let i = 0; i < text.length; i++) if (text[i] === "\n") starts.push(i + 1);
  return starts;
}

/** Per-file function index: names and spans shared by every per-function gate. */
function indexFunctions(files, root = ROOT) {
  const index = new Map();
  for (const file of files) {
    const text = fs.readFileSync(path.join(root, file), "utf8");
    index.set(file, { text, starts: lineStarts(text), fns: listFunctions(text, file) });
  }
  return index;
}

/**
 * Map an ESLint report location (function head) to the measured function. The head is
 * either inside the function span (arrows report `=>`, declarations their keyword) or starts
 * before it (a method or property key); pick the innermost candidate.
 */
function functionAt(entry, msg) {
  const at = entry.starts[msg.line - 1] + msg.column - 1;
  const endLine = msg.endLine ?? msg.line;
  const endCol = msg.endColumn ?? msg.column;
  const headEnd = entry.starts[endLine - 1] + endCol - 1;
  let best = null;
  for (const fn of entry.fns) {
    const contains = fn.start <= at && at < fn.end;
    const startsInHead = fn.start >= at && fn.start <= headEnd;
    if ((contains || startsInHead) && (!best || fn.start > best.start)) best = fn;
  }
  return best;
}

function lintFiles(overrideConfig) {
  const eslint = new ESLint({
    cwd: ROOT,
    overrideConfigFile: ESLINT_CONFIG,
    overrideConfig,
    errorOnUnmatchedPattern: false,
  });
  return eslint;
}

async function runEslintGates(files, index) {
  const results = await lintFiles().lintFiles(files);
  const out = { cyclomatic: [], cognitive: [], fileLength: [] };
  for (const res of results) {
    const file = path.relative(ROOT, res.filePath);
    const entry = index.get(file);
    for (const msg of res.messages) {
      if (msg.ruleId === "max-lines") {
        const lines = entry.text.split("\n").length - (entry.text.endsWith("\n") ? 1 : 0);
        out.fileLength.push({ file, line: 1, function: "<file>", value: lines });
        continue;
      }
      const fn = functionAt(entry, msg);
      const rec = { file, line: fn ? fn.line : msg.line, function: fn ? fn.name : "<unknown>" };
      if (msg.ruleId === "complexity") {
        const m = /complexity of (\d+)/.exec(msg.message);
        out.cyclomatic.push({ ...rec, value: Number(m?.[1]) });
      } else if (msg.ruleId === "sonarjs/cognitive-complexity") {
        const m = /from (\d+) to/.exec(msg.message);
        out.cognitive.push({ ...rec, value: Number(m?.[1]) });
      } else if (msg.fatal) {
        throw new Error(`ESLint could not parse ${file}: ${msg.message}`);
      }
    }
  }
  return out;
}

/** Cyclomatic complexity of every function (complexity rule at max 0 reports all). */
async function allComplexities(files, index) {
  const eslint = lintFiles({
    rules: {
      complexity: ["error", { max: 0 }],
      "max-lines": "off",
      "sonarjs/cognitive-complexity": "off",
    },
  });
  const results = await eslint.lintFiles(files);
  const ccByFn = new Map();
  for (const res of results) {
    const file = path.relative(ROOT, res.filePath);
    const entry = index.get(file);
    for (const msg of res.messages) {
      if (msg.ruleId !== "complexity") continue;
      const fn = functionAt(entry, msg);
      const m = /complexity of (\d+)/.exec(msg.message);
      if (fn && m) ccByFn.set(fn, Math.max(ccByFn.get(fn) ?? 0, Number(m[1])));
    }
  }
  return ccByFn;
}

/**
 * Convert raw NODE_V8_COVERAGE files to one istanbul coverage map, limited to `files`.
 *
 * Each process file, and each script inside it, is converted on its own (with that process's
 * own source map, when the script was transformed) and only then merged, line by line. c8
 * instead merges the raw V8 byte ranges of every process first and remaps them through a
 * single source map per file; when one process ran a file through tsx (offsets shifted by the
 * `import()` interop wrapper) and another ran it natively (a spawned child, or this runner's
 * load hook), the merged ranges no longer belong to one text and per-function coverage is
 * wrong.
 * @param {string} rawDir NODE_V8_COVERAGE directory
 * @param {string[]} files repo-relative files to keep
 * @param {string} [root]
 * @returns {Promise<Record<string, object>>} istanbul JSON keyed by absolute path
 */
export async function convertRawCoverage(rawDir, files, root = ROOT) {
  const wanted = new Map(files.map((f) => [pathToFileURL(path.join(root, f)).href, f]));
  const map = libCoverage.createCoverageMap({});
  for (const name of fs.readdirSync(rawDir)) {
    if (!name.endsWith(".json")) continue;
    const raw = JSON.parse(fs.readFileSync(path.join(rawDir, name), "utf8"));
    const smc = raw["source-map-cache"] ?? {};
    for (const script of raw.result ?? []) {
      if (!wanted.has(script.url)) continue;
      const abs = fileURLToPath(script.url);
      const cached = smc[script.url];
      const sources = cached?.data
        ? {
            sourceMap: { sourcemap: cached.data },
            source: cached.lineLengths.map((n) => "".padEnd(n, ".")).join("\n") + "\n",
            originalSource: fs.readFileSync(abs, "utf8"),
          }
        : undefined;
      const converter = v8ToIstanbul(abs, 0, sources);
      await converter.load();
      converter.applyCoverage(script.functions);
      // A source-mapped conversion keys the entry by the map's source (path or file URL).
      for (const data of Object.values(converter.toIstanbul())) {
        const key = data.path.startsWith("file:") ? fileURLToPath(data.path) : data.path;
        if (path.resolve(key) === abs) map.merge({ [abs]: { ...data, path: abs } });
      }
      converter.destroy();
    }
  }
  return map.toJSON();
}

/**
 * Run `tests` with V8 coverage and return the istanbul JSON keyed by absolute path, limited to
 * `files` (repo-relative). Those files are loaded untransformed through
 * launch-coverage-hooks.mjs so V8 offsets match the files on disk (see that file), and the raw
 * data is converted per process (see convertRawCoverage).
 * @param {{ tests: string[], files: string[], root?: string }} options
 */
export async function runCoverage({ tests, files, root = ROOT }) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "launch-cov-"));
  try {
    // Not .json: tsx would read a hook URL ending in .json as a JSON module.
    const scopeList = path.join(tmp, "scope-files.txt");
    const rawDir = path.join(tmp, "raw");
    fs.writeFileSync(scopeList, JSON.stringify(files.map((f) => path.join(root, f))));
    const testArgs = [
      "--import",
      "tsx/esm",
      "--import",
      `${pathToFileURL(path.join(ROOT, "scripts/quality/launch-coverage-hooks.mjs")).href}?scope=${encodeURIComponent(scopeList)}`,
      "--import",
      "./open-sse/utils/setupPolyfill.ts",
      "--import",
      "./tests/_setup/isolateDataDir.ts",
      "--test",
      "--test-force-exit",
      "--test-concurrency=4",
      ...tests,
    ];
    // NODE_TEST_CONTEXT is set when this runs inside node:test; it would stop the nested run.
    const { NODE_TEST_CONTEXT: _nested, ...env } = process.env;
    const res = spawnSync(process.execPath, testArgs, {
      cwd: root,
      encoding: "utf8",
      maxBuffer: 256 * 1024 * 1024,
      env: {
        ...env,
        DISABLE_SQLITE_AUTO_BACKUP: "true",
        NODE_V8_COVERAGE: rawDir,
      },
    });
    if (!fs.existsSync(rawDir)) {
      throw new Error(`tests produced no V8 coverage (exit ${res.status})\n${res.stderr}`);
    }
    const coverage = await convertRawCoverage(rawDir, files, root);
    const failed = /^ℹ fail (\d+)/m.exec(res.stdout || "");
    return { coverage, testsFailed: failed ? Number(failed[1]) : null, exitCode: res.status };
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

/** Lines owned by a function: its span minus the inner lines of nested functions. */
function ownLines(fn, entry) {
  const lines = new Set();
  for (let l = fn.startLine; l <= fn.endLine; l++) lines.add(l);
  for (const [s, e] of fn.nested) {
    const ns = lineOf(entry, s);
    const ne = lineOf(entry, e);
    for (let l = ns + 1; l < ne; l++) lines.delete(l);
  }
  return lines;
}

function lineOf(entry, offset) {
  let lo = 0;
  let hi = entry.starts.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (entry.starts[mid] <= offset) lo = mid;
    else hi = mid - 1;
  }
  return lo + 1;
}

/**
 * Statement coverage of every function of one file, keyed by function name (first
 * occurrence wins for repeated names). Exported for tests.
 * @param {string} file repo-relative
 * @param {object | undefined} fileCov istanbul entry of the file
 * @param {string} [root]
 */
export function coverageByFunction(file, fileCov, root = ROOT) {
  const entry = indexFunctions([file], root).get(file);
  const out = new Map();
  for (const fn of entry.fns)
    if (!out.has(fn.name)) out.set(fn.name, functionCoverage(fn, entry, fileCov));
  return out;
}

/** Statement coverage of one function, from an istanbul file entry (undefined = not loaded). */
function functionCoverage(fn, entry, fileCov) {
  if (!fileCov) return 0;
  const lines = ownLines(fn, entry);
  let total = 0;
  let hit = 0;
  for (const [id, loc] of Object.entries(fileCov.statementMap)) {
    if (!lines.has(loc.start.line)) continue;
    total++;
    if (fileCov.s[id] > 0) hit++;
  }
  return total === 0 ? 1 : hit / total;
}

async function runCrap(files, index, gates) {
  const ccByFn = await allComplexities(files, index);
  const { coverage, testsFailed, exitCode } = await runCoverage({
    tests: gates.coverageTests,
    files,
  });
  const measured = [];
  for (const file of files) {
    const entry = index.get(file);
    const fileCov = coverage[path.join(ROOT, file)];
    for (const fn of entry.fns) {
      const cc = ccByFn.get(fn) ?? 1;
      const cov = functionCoverage(fn, entry, fileCov);
      measured.push({
        file,
        line: fn.line,
        function: fn.name,
        value: round2(crapScore(cc, cov)),
        cc,
        coverage: round2(cov * 100),
      });
    }
  }
  return { measured, testsFailed, exitCode };
}

function runHalsteadGate(files, index) {
  const measured = [];
  for (const file of files) {
    for (const h of computeHalstead(index.get(file).text, file)) {
      measured.push({ file, line: h.line, function: h.name, value: h.difficulty });
    }
  }
  return measured;
}

function byValueDesc(a, b) {
  const av = typeof a.value === "number" ? a.value : 0;
  const bv = typeof b.value === "number" ? b.value : 0;
  return bv - av || a.file.localeCompare(b.file) || a.line - b.line;
}

function summarize(name, limitLabel, violations, worstFallback) {
  violations.sort(byValueDesc);
  const top = violations.length ? violations[0].value : worstFallback;
  const worst = typeof top === "number" ? top : null;
  return { gate: name, limit: limitLabel, violations: violations.length, worst, list: violations };
}

function printTable(gates) {
  const rows = [["gate", "limit", "violations", "worst"]].concat(
    gates.map((g) => [g.gate, g.limit, String(g.violations), String(g.worst ?? "-")])
  );
  const widths = rows[0].map((_, i) => Math.max(...rows.map((r) => r[i].length)));
  const fmt = (r) => r.map((c, i) => c.padEnd(widths[i])).join("  ");
  console.log(fmt(rows[0]));
  console.log(widths.map((w) => "-".repeat(w)).join("  "));
  for (const r of rows.slice(1)) console.log(fmt(r));
}

function printViolations(gates) {
  for (const g of gates) {
    if (!g.list.length) continue;
    console.log(`\n## ${g.gate} (${g.violations})`);
    for (const v of g.list) console.log(`${v.file}:${v.line} ${v.function} ${v.value}`);
  }
}

async function main() {
  const started = Date.now();
  const args = parseArgs(process.argv.slice(2));
  const cfg = JSON.parse(fs.readFileSync(GATES_PATH, "utf8"));
  const { limits } = cfg;
  const scope = resolveScope(cfg, ROOT);
  console.log(`launch scope: ${scope.length} files (config/quality/launch-gates.json)\n`);

  const index = indexFunctions(scope);
  const [eslintOut, crap, dead, dupes, anyUnknown] = await Promise.all([
    runEslintGates(scope, index),
    runCrap(scope, index, cfg),
    runDeadCode(scope, { root: ROOT }),
    runDuplicates(scope, { root: ROOT }),
    runAnyUnknown(scope, { root: ROOT }),
  ]);
  const halstead = runHalsteadGate(scope, index);
  const maxOf = (list) => list.reduce((m, v) => Math.max(m, v.value), 0);

  const gates = [
    summarize("cyclomatic complexity", `<= ${limits.cyclomatic}`, eslintOut.cyclomatic, null),
    summarize("cognitive complexity", `<= ${limits.cognitive}`, eslintOut.cognitive, null),
    summarize(
      "halstead difficulty",
      `<= ${limits.halsteadDifficulty}`,
      halstead.filter((h) => h.value > limits.halsteadDifficulty),
      maxOf(halstead)
    ),
    summarize("file length", `< ${limits.fileLinesMax + 1} lines`, eslintOut.fileLength, null),
    summarize(
      "crap",
      `<= ${limits.crap}`,
      crap.measured.filter((c) => c.value > limits.crap),
      maxOf(crap.measured)
    ),
    summarize("dead code", `${limits.deadCode}`, dead.violations, null),
    summarize("duplicate code", `${limits.duplicates}`, dupes.violations, null),
    summarize("any/unknown types", `${limits.anyUnknown}`, anyUnknown.violations, null),
  ];

  printTable(gates);
  printViolations(gates);
  const total = gates.reduce((n, g) => n + g.violations, 0);
  const seconds = round2((Date.now() - started) / 1000);
  if (crap.testsFailed) {
    console.log(`\nwarning: ${crap.testsFailed} launch unit tests failed during coverage`);
  }
  console.log(`\n${total} violations across ${scope.length} files in ${seconds}s`);

  if (args.json) {
    const report = {
      generatedAt: new Date().toISOString(),
      commit: spawnSync("git", ["rev-parse", "HEAD"], {
        cwd: ROOT,
        encoding: "utf8",
      }).stdout.trim(),
      seconds,
      limits,
      scopeConfig: cfg.scope,
      scopeCount: scope.length,
      scope,
      coverageTestsFailed: crap.testsFailed,
      gates: gates.map(({ list, ...g }) => ({ ...g, list })),
      crapMeasured: crap.measured,
      totalViolations: total,
    };
    fs.mkdirSync(path.dirname(path.resolve(args.json)), { recursive: true });
    fs.writeFileSync(path.resolve(args.json), JSON.stringify(report, null, 2) + "\n");
    console.log(`JSON report written to ${args.json}`);
  }
  return total === 0 ? 0 : 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().then(
    (code) => process.exit(code),
    (err) => {
      console.error(err);
      process.exit(2);
    }
  );
}
