#!/usr/bin/env node
/**
 * Launch quality scans over the scope resolved from config/quality/launch-gates.json
 * (scripts/quality/launch-scope.mjs).
 *
 * - runDeadCode: a TypeScript-parser based reference scan (knip was not used: it cannot be scoped
 *   to a file subset with "exports used only by tests count as used" plus lazy adapter loading
 *   without false positives and a dedicated config). Every .ts/.tsx/.mts/.js/.mjs/.cjs file under
 *   bin/, src/, open-sse/, tests/, scripts/ and electron/ is scanned for static imports, re-exports,
 *   dynamic import(), require() and JSDoc import("...") types. A scope file is "unused" when no
 *   other file references it (and it is not an entry); an export is "unused" when no other file
 *   imports it by name. Namespace imports, `export *`, dynamic import() / require() without a
 *   destructure count as using every export. Template dynamic imports resolve to glob matches.
 * - runDuplicates: the jscpd CLI with default thresholds, restricted to the scope files.
 * - runAnyUnknown: TS AST scan for any/unknown type nodes, and JSDoc scan of .mjs files for
 *   any, `*`, unknown type expressions.
 *
 * Direct run: `node scripts/quality/launch-scans.mjs`.
 */

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { resolveScope } from "./launch-scope.mjs";

const SCAN_DIRS = ["bin", "src", "open-sse", "tests", "scripts", "electron"];
const SOURCE_EXT = /\.(?:ts|tsx|mts|cts|js|mjs|cjs)$/;
const SKIP_DIRS = new Set(["node_modules", ".next", "dist", "build", "coverage", ".git"]);
const RESOLVE_EXTS = [".ts", ".tsx", ".mts", ".d.ts", ".mjs", ".js", ".cjs", ".json"];
const ROUTE_FRAMEWORK_EXPORTS = new Set([
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
  "dynamic",
  "runtime",
  "revalidate",
  "fetchCache",
  "dynamicParams",
  "maxDuration",
  "preferredRegion",
  "generateStaticParams",
]);

const toPosix = (value) => value.split(path.sep).join("/");

function walk(dir, out, root) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry.name.startsWith("_") || SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out, root);
    else if (SOURCE_EXT.test(entry.name)) out.push(toPosix(path.relative(root, full)));
  }
}

function listRepoSources(root) {
  const out = [];
  for (const dir of SCAN_DIRS) walk(path.join(root, dir), out, root);
  return out;
}

function parse(root, rel) {
  const text = fs.readFileSync(path.join(root, rel), "utf8");
  const kind = /\.(?:js|mjs|cjs)$/.test(rel)
    ? ts.ScriptKind.JS
    : rel.endsWith(".tsx")
      ? ts.ScriptKind.TSX
      : ts.ScriptKind.TS;
  return { text, sf: ts.createSourceFile(rel, text, ts.ScriptTarget.Latest, true, kind) };
}

function lineOf(sf, node) {
  return sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
}

// ---------------------------------------------------------------------------------------------
// Dead code
// ---------------------------------------------------------------------------------------------

function specifierBase(spec, importerRel) {
  if (spec.startsWith(".")) return toPosix(path.join(path.dirname(importerRel), spec));
  if (spec === "@omniroute/open-sse") return "open-sse";
  if (spec.startsWith("@omniroute/open-sse/")) return "open-sse/" + spec.slice(20);
  if (spec.startsWith("@/")) return "src/" + spec.slice(2);
  return null;
}

function candidatesFor(base) {
  const list = [base];
  const stripped = base.replace(/\.(?:m?js|cjs|jsx)$/, "");
  for (const ext of RESOLVE_EXTS) {
    list.push(stripped + ext, base + ext, `${base}/index${ext}`);
  }
  return list;
}

function globToRegExp(glob) {
  const escaped = glob.replace(/[.+^$()|[\]\\{}]/g, "\\$&").replace(/\*/g, "[^/]*");
  return new RegExp(`^${escaped}$`);
}

function createUsage(scopeSet) {
  const usage = new Map();
  const get = (file) => {
    if (!usage.has(file)) usage.set(file, { importers: new Set(), names: new Set(), all: false });
    return usage.get(file);
  };
  const resolve = (spec, importerRel) => {
    const base = specifierBase(spec, importerRel);
    if (base === null) return [];
    if (spec.includes("*")) {
      const re = globToRegExp(base);
      return [...scopeSet].filter((f) => re.test(f) || re.test(f.replace(/\.[^./]+$/, "")));
    }
    return candidatesFor(base).filter((c) => scopeSet.has(c));
  };
  const record = (importerRel, spec, names, all) => {
    for (const target of resolve(spec, importerRel)) {
      if (target === importerRel) continue;
      const u = get(target);
      u.importers.add(importerRel);
      for (const n of names) u.names.add(n);
      if (all) u.all = true;
    }
  };
  return { usage, record, get };
}

function stringArg(node) {
  if (!node) return null;
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isTemplateExpression(node)) {
    return node.head.text + node.templateSpans.map((s) => "*" + s.literal.text).join("");
  }
  return null;
}

function collectReferences(rel, sf, text, record) {
  const visit = (node) => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const clause = node.importClause;
      const names = [];
      let all = false;
      if (!clause) all = true;
      else {
        if (clause.name) names.push("default");
        const nb = clause.namedBindings;
        if (nb && ts.isNamespaceImport(nb)) all = true;
        else if (nb) for (const el of nb.elements) names.push((el.propertyName ?? el.name).text);
      }
      record(rel, node.moduleSpecifier.text, names, all);
    } else if (ts.isExportDeclaration(node) && node.moduleSpecifier) {
      const names = [];
      let all = false;
      if (!node.exportClause || ts.isNamespaceExport(node.exportClause)) all = true;
      else
        for (const el of node.exportClause.elements) names.push((el.propertyName ?? el.name).text);
      record(rel, node.moduleSpecifier.text, names, all);
    } else if (ts.isCallExpression(node)) {
      const isDynamic = node.expression.kind === ts.SyntaxKind.ImportKeyword;
      const isRequire = ts.isIdentifier(node.expression) && node.expression.text === "require";
      const spec = isDynamic || isRequire ? stringArg(node.arguments[0]) : null;
      if (spec !== null) record(rel, spec, [], true);
    } else if (
      ts.isImportTypeNode(node) &&
      ts.isLiteralTypeNode(node.argument) &&
      ts.isStringLiteral(node.argument.literal)
    ) {
      const q = node.qualifier;
      const name = q ? (ts.isIdentifier(q) ? q.text : q.left.getText(sf)) : null;
      record(rel, node.argument.literal.text, name ? [name] : [], !name);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  // JSDoc `import("x").Name` types in .mjs/.js files are plain comment text to the parser.
  if (/\.(?:js|mjs|cjs)$/.test(rel)) {
    for (const m of text.matchAll(/import\(\s*["']([^"']+)["']\s*\)(?:\.(\w+))?/g)) {
      record(rel, m[1], m[2] ? [m[2]] : [], !m[2]);
    }
    for (const m of text.matchAll(/@import\s*\{([^}]*)\}\s*from\s*["']([^"']+)["']/g)) {
      const names = m[1]
        .split(",")
        .map((s) => s.trim().split(/\s+as\s+/)[0])
        .filter(Boolean);
      record(rel, m[2], names, false);
    }
  }
}

function exportedDeclarations(rel, sf) {
  const out = [];
  const isDts = rel.endsWith(".d.ts");
  const hasExplicit = sf.statements.some(
    (s) =>
      ts.isExportDeclaration(s) ||
      ts.isExportAssignment(s) ||
      ts.getCombinedModifierFlags(s) & ts.ModifierFlags.Export
  );
  const add = (name, node) => out.push({ name, line: lineOf(sf, node) });
  for (const stmt of sf.statements) {
    const mods = ts.canHaveModifiers(stmt) ? ts.getModifiers(stmt) : undefined;
    const exported = mods?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
    const isDefault = mods?.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword);
    const implicitDts = isDts && !hasExplicit;
    if (ts.isExportDeclaration(stmt)) {
      if (stmt.moduleSpecifier) continue; // re-export: forwards names, owns none
      if (stmt.exportClause && ts.isNamedExports(stmt.exportClause)) {
        for (const el of stmt.exportClause.elements) add(el.name.text, el.name);
      }
    } else if (ts.isExportAssignment(stmt)) {
      add("default", stmt);
    } else if (exported || implicitDts) {
      if (ts.isVariableStatement(stmt)) {
        for (const d of stmt.declarationList.declarations) {
          if (ts.isIdentifier(d.name)) add(d.name.text, d.name);
          else
            for (const el of d.name.elements)
              if (ts.isIdentifier(el.name)) add(el.name.text, el.name);
        }
      } else if (isDefault) add("default", stmt);
      else if (stmt.name && ts.isIdentifier(stmt.name)) add(stmt.name.text, stmt.name);
    }
  }
  return out;
}

/**
 * @param {string[]} files repo-relative scope files
 * @param {{ root: string }} options
 */
export async function runDeadCode(files, { root }) {
  const scopeSet = new Set(files);
  const { usage, record, get } = createUsage(scopeSet);
  const sources = listRepoSources(root);
  const basenames = [
    ...new Set(files.map((f) => path.basename(f).replace(/\.d\.ts$|\.[^.]+$/, ""))),
  ];
  const prefilter = new RegExp(
    `(?:${basenames.map((b) => b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})(?:\\.[a-z.]+)?["'\`]|import\\(\\s*\`|from\\s*\`|\\$\\{`
  );
  const pathNeedles = files.map((f) => [f, f]);
  for (const rel of sources) {
    const text = fs.readFileSync(path.join(root, rel), "utf8");
    for (const [target, needle] of pathNeedles) {
      if (target !== rel && text.includes(needle)) get(target).importers.add(rel);
    }
    if (!prefilter.test(text)) continue;
    const { sf } = parse(root, rel);
    collectReferences(rel, sf, text, record);
  }
  const violations = [];
  const details = { unusedFiles: [], unusedExports: [] };
  for (const file of files) {
    const isEntry = /(?:^|\/)route\.ts$/.test(file) || file === "bin/omnirouter.mjs";
    const u = usage.get(file);
    const referenced = Boolean(u && u.importers.size > 0);
    if (!isEntry && !referenced) {
      violations.push({ file, line: 1, function: "<file>", value: "unused file" });
      details.unusedFiles.push(file);
      continue;
    }
    if (!SOURCE_EXT.test(file)) continue;
    const { sf } = parse(root, file);
    const isRoute = /(?:^|\/)route\.ts$/.test(file);
    for (const exp of exportedDeclarations(file, sf)) {
      if (isRoute && ROUTE_FRAMEWORK_EXPORTS.has(exp.name)) continue;
      if (u?.all || u?.names.has(exp.name)) continue;
      if (file === "bin/omnirouter.mjs") continue;
      violations.push({ file, line: exp.line, function: exp.name, value: "unused export" });
      details.unusedExports.push(`${file}:${exp.name}`);
    }
  }
  return { violations, details };
}

// ---------------------------------------------------------------------------------------------
// Duplicates
// ---------------------------------------------------------------------------------------------

/**
 * @param {string[]} files repo-relative scope files
 * @param {{ root: string }} options
 */
export async function runDuplicates(files, { root }) {
  const base = os.tmpdir();
  const work = fs.mkdtempSync(path.join(base, "launch-jscpd-"));
  try {
    const configPath = path.join(work, "jscpd.json");
    fs.writeFileSync(configPath, JSON.stringify({ gitignore: false }));
    const bin = path.join(root, "node_modules/.bin/jscpd");
    const args = [
      "--config",
      configPath,
      "--no-gitignore",
      "--reporters",
      "json",
      "--output",
      work,
      "--silent",
      "--formats-exts",
      "javascript:mjs,cjs;typescript:ts,tsx",
      ...files,
    ];
    const run = spawnSync(bin, args, { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
    const reportPath = path.join(work, "jscpd-report.json");
    if (!fs.existsSync(reportPath)) {
      throw new Error(`jscpd produced no report: ${run.stderr || run.stdout || run.error}`);
    }
    const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
    const violations = (report.duplicates || []).map((d) => ({
      file: toPosix(d.firstFile.name),
      line: d.firstFile.startLoc?.line ?? d.firstFile.start,
      function: `clone of ${toPosix(d.secondFile.name)}:${d.secondFile.startLoc?.line ?? d.secondFile.start}`,
      value: d.lines,
    }));
    return { violations, details: { statistics: report.statistics?.total } };
  } finally {
    fs.rmSync(work, { recursive: true, force: true });
  }
}

// ---------------------------------------------------------------------------------------------
// any / unknown
// ---------------------------------------------------------------------------------------------

function declName(node) {
  if (
    (ts.isFunctionDeclaration(node) ||
      ts.isMethodDeclaration(node) ||
      ts.isClassDeclaration(node) ||
      ts.isInterfaceDeclaration(node) ||
      ts.isTypeAliasDeclaration(node) ||
      ts.isPropertyDeclaration(node) ||
      ts.isEnumDeclaration(node)) &&
    node.name
  ) {
    return node.name.getText();
  }
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) return node.name.text;
  return null;
}

/**
 * @param {string[]} files repo-relative scope files
 * @param {{ root: string }} options
 */
export async function runAnyUnknown(files, { root }) {
  const violations = [];
  for (const rel of files) {
    if (!/\.(?:ts|tsx|mts|cts|mjs|js|cjs)$/.test(rel)) continue;
    const { sf } = parse(root, rel);
    const typeValue = (node) => {
      if (node.kind === ts.SyntaxKind.AnyKeyword) return "any";
      if (node.kind === ts.SyntaxKind.UnknownKeyword) return "unknown";
      if (node.kind === ts.SyntaxKind.JSDocAllType) return "*";
      return null;
    };
    const hit = (node, label) => {
      const value = typeValue(node);
      if (value) violations.push({ file: rel, line: lineOf(sf, node), function: label, value });
    };
    const walkDoc = (node, label) => {
      hit(node, label);
      ts.forEachChild(node, (child) => walkDoc(child, label));
    };
    const visit = (node, label) => {
      const own = declName(node) ?? label;
      hit(node, own);
      for (const doc of node.jsDoc ?? []) walkDoc(doc, own);
      ts.forEachChild(node, (child) => visit(child, own));
    };
    visit(sf, "<module>");
  }
  const seen = new Set();
  const unique = violations.filter((v) => {
    const key = `${v.file}:${v.line}:${v.value}:${v.function}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return { violations: unique };
}

// ---------------------------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------------------------

async function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
  const gates = JSON.parse(
    fs.readFileSync(path.join(root, "config/quality/launch-gates.json"), "utf8")
  );
  const files = resolveScope(gates, root);
  console.log(`launch scope: ${files.length} files`);
  for (const [name, fn] of [
    ["dead-code", runDeadCode],
    ["duplicates", runDuplicates],
    ["any-unknown", runAnyUnknown],
  ]) {
    const started = Date.now();
    const result = await fn(files, { root });
    console.log(`== ${name}: ${result.violations.length} (${Date.now() - started} ms)`);
    for (const v of result.violations) console.log(`${v.file}:${v.line} ${v.function} ${v.value}`);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
