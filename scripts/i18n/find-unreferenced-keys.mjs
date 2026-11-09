#!/usr/bin/env node
// scripts/i18n/find-unreferenced-keys.mjs
//
// Lists UI message keys that exist in src/i18n/messages/en.json but that no source file
// references, and (optionally) removes a SELECTED subset of them from every catalog at once.
//
// Why: retiring a feature leaves its keys behind in all 67 catalogs, and the i18n waves keep
// translating them. Removing them by hand in one locale breaks key parity; removing every
// unreferenced key breaks screens that build keys dynamically. This script does the narrow
// thing: report the candidates, then delete only the keys you name, only if they are still
// unreferenced, from all catalogs in the same pass.
//
// "Referenced" is deliberately generous (a false "referenced" keeps a key, which is safe):
//   - the leaf name, the full dotted path, or the path without its namespace appears as a
//     quoted string literal ("x", 'x' or `x`) anywhere under src/, open-sse/, electron/ or
//     bin/ (catalogs excluded) — this covers t("leaf"), t("ns.leaf"), key arrays and maps;
//   - a template literal prefix of 3+ characters such as t(`theme${name}`) or
//     t(`strategy.${id}`) marks every key whose leaf (or dotted path) starts with that prefix
//     as "maybe dynamic" and never removable.
//
// Usage:
//   node scripts/i18n/find-unreferenced-keys.mjs                      # report all candidates
//   node scripts/i18n/find-unreferenced-keys.mjs --match '^settings\.theme'   # filter report
//   node scripts/i18n/find-unreferenced-keys.mjs --json               # machine-readable report
//   node scripts/i18n/find-unreferenced-keys.mjs --remove settings.themeCoral,playground.closeExportModal
//
// --remove refuses (exit 1, nothing written) when a named key is referenced, maybe dynamic,
// or absent from en.json. Catalogs are rewritten with JSON.stringify(obj, null, 2) + "\n",
// the format every catalog already uses, so only the removed lines change.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SOURCE_ROOTS = ["src", "open-sse", "electron", "bin"];
// .json covers generated maps such as src/i18n/routeNamespaces.generated.json (namespaces
// loaded per route); the catalogs themselves are excluded by directory.
const SOURCE_EXT = /\.(ts|tsx|js|jsx|mjs|cjs|json)$/;
const MIN_TEMPLATE_PREFIX = 3;
const SKIP_DIRS = new Set(["node_modules", ".next", ".build", "dist", "dist-electron", "coverage"]);

export function flattenKeys(obj, prefix = "") {
  const out = [];
  for (const [key, value] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      out.push(...flattenKeys(value, full));
    } else {
      out.push(full);
    }
  }
  return out;
}

function walkSources(root, messagesDir, files = []) {
  let entries;
  try {
    entries = fs.readdirSync(root, { withFileTypes: true });
  } catch {
    return files;
  }
  for (const entry of entries) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name) || path.resolve(full) === messagesDir) continue;
      walkSources(full, messagesDir, files);
    } else if (SOURCE_EXT.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

/** Collects quoted literal tokens and template-literal prefixes from source text. */
export function collectTokens(sourceTexts) {
  const literals = new Set();
  const templatePrefixes = new Set();
  const literalRe = /(["'`])([A-Za-z_$][\w.$-]*)\1/g;
  const templateRe = /`([A-Za-z_][\w.]*)\$\{/g;
  const dottedHeads = new Set();
  for (const text of sourceTexts) {
    for (const m of text.matchAll(literalRe)) {
      literals.add(m[2]);
      const dot = m[2].indexOf(".");
      if (dot > 0) dottedHeads.add(m[2].slice(0, dot));
    }
    for (const m of text.matchAll(templateRe)) templatePrefixes.add(m[1]);
  }
  return { literals, templatePrefixes, dottedHeads };
}

/** Classifies one dotted key as referenced, maybe-dynamic or unreferenced. */
export function classifyKey(key, { literals, templatePrefixes, dottedHeads = new Set() }) {
  const parts = key.split(".");
  const leaf = parts[parts.length - 1];
  const withoutNamespace = parts.slice(1).join(".");
  // A namespace no source file names (useTranslations("ns"), getTranslations("ns"), "ns.key",
  // the route-namespace map) is never loaded, so a common leaf like "title" inside it does
  // not make the key referenced.
  const namespaceNamed = literals.has(parts[0]) || dottedHeads.has(parts[0]);
  if (literals.has(key)) return "referenced";
  if (
    namespaceNamed &&
    (literals.has(leaf) || (withoutNamespace && literals.has(withoutNamespace)))
  ) {
    return "referenced";
  }
  for (const prefix of templatePrefixes) {
    // One- and two-letter prefixes (`s${n}`, `c.${x}`) come from plurals and short ids, not
    // from message keys; counting them would mark half the catalog as dynamic.
    if (prefix.length < MIN_TEMPLATE_PREFIX) continue;
    if (key.startsWith(prefix) || withoutNamespace.startsWith(prefix)) return "maybe-dynamic";
    const tail = prefix.split(".").pop();
    if (tail.length >= MIN_TEMPLATE_PREFIX && leaf.startsWith(tail)) return "maybe-dynamic";
  }
  return "unreferenced";
}

function deleteKey(obj, dotted) {
  const parts = dotted.split(".");
  let node = obj;
  for (const part of parts.slice(0, -1)) {
    if (!node || typeof node !== "object" || !(part in node)) return false;
    node = node[part];
  }
  const leaf = parts[parts.length - 1];
  if (!node || typeof node !== "object" || !(leaf in node)) return false;
  delete node[leaf];
  pruneEmptyParents(obj, parts.slice(0, -1));
  return true;
}

/** Drops objects left empty by a removal (a retired namespace disappears entirely). */
function pruneEmptyParents(obj, parentParts) {
  for (let depth = parentParts.length; depth > 0; depth--) {
    let node = obj;
    for (const part of parentParts.slice(0, depth - 1)) node = node[part];
    const name = parentParts[depth - 1];
    if (Object.keys(node[name]).length > 0) return;
    delete node[name];
  }
}

function parseArgs(argv) {
  const args = { json: false, match: null, remove: null, root: process.cwd() };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--json") args.json = true;
    else if (a === "--match") args.match = new RegExp(argv[++i]);
    else if (a === "--remove")
      args.remove = argv[++i]
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    else if (a === "--root") args.root = path.resolve(argv[++i]);
    else throw new Error(`unknown argument: ${a}`);
  }
  return args;
}

export function analyze(root) {
  const messagesDir = path.resolve(root, "src/i18n/messages");
  const en = JSON.parse(fs.readFileSync(path.join(messagesDir, "en.json"), "utf8"));
  const files = SOURCE_ROOTS.flatMap((r) => walkSources(path.join(root, r), messagesDir));
  const tokens = collectTokens(files.map((f) => fs.readFileSync(f, "utf8")));
  const result = { referenced: [], maybeDynamic: [], unreferenced: [] };
  for (const key of flattenKeys(en)) {
    const kind = classifyKey(key, tokens);
    if (kind === "referenced") result.referenced.push(key);
    else if (kind === "maybe-dynamic") result.maybeDynamic.push(key);
    else result.unreferenced.push(key);
  }
  return { messagesDir, sourceFiles: files.length, ...result };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const report = analyze(args.root);
  const filter = (keys) => (args.match ? keys.filter((k) => args.match.test(k)) : keys);

  if (!args.remove) {
    const unreferenced = filter(report.unreferenced);
    const maybeDynamic = filter(report.maybeDynamic);
    if (args.json) {
      process.stdout.write(
        `${JSON.stringify({ sourceFiles: report.sourceFiles, unreferenced, maybeDynamic }, null, 2)}\n`
      );
    } else {
      console.log(`scanned ${report.sourceFiles} source files`);
      console.log(`unreferenced keys (${unreferenced.length}):`);
      for (const k of unreferenced) console.log(`  ${k}`);
      console.log(`maybe dynamic, never removable (${maybeDynamic.length}):`);
      for (const k of maybeDynamic) console.log(`  ${k}`);
    }
    return 0;
  }

  const unreferenced = new Set(report.unreferenced);
  const refused = args.remove.filter((k) => !unreferenced.has(k));
  if (refused.length > 0) {
    console.error(`refusing: not an unreferenced en.json key: ${refused.join(", ")}`);
    return 1;
  }
  const catalogs = fs
    .readdirSync(report.messagesDir)
    .filter((f) => f.endsWith(".json"))
    .sort();
  let total = 0;
  for (const file of catalogs) {
    const full = path.join(report.messagesDir, file);
    const data = JSON.parse(fs.readFileSync(full, "utf8"));
    const removed = args.remove.filter((k) => deleteKey(data, k));
    if (removed.length > 0) {
      fs.writeFileSync(full, `${JSON.stringify(data, null, 2)}\n`);
    }
    total += removed.length;
    console.log(`${file}: removed ${removed.length}`);
  }
  console.log(`total removed: ${total} across ${catalogs.length} catalogs`);
  return 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  try {
    process.exit(main());
  } catch (err) {
    console.error(err instanceof Error ? err.message : String(err));
    process.exit(2);
  }
}
