#!/usr/bin/env node
/**
 * OmniRoute — derived files stay out of feature PRs (PR-scope gate, blocking in `pr` mode).
 *
 * Plan "derived numbers and texts resolved only at release" (2026-11-13). Some files are not
 * written by people: the 66 translation mirrors under docs/i18n, the UI/CLI catalogs of the
 * non-English locales, generated reference docs, quality baselines. Each one is recomputed in
 * one place — a translation wave, the release refresh (`release:refresh-derived`) or a nightly
 * refresh PR. When feature PRs also edit them, every merge invalidates the copy that every
 * sibling PR carries: on 2026-11-13, 48 open PRs touched the same ~43 locale catalogs and 44
 * touched docs/i18n. This gate keeps those files out of feature PRs.
 *
 * The rule, per FAMILY of derived files (config/quality/derived-paths/*.json):
 *   - a PR that touches nothing but that family's files (plus its companions, e.g. a changelog
 *     fragment) is a refresh/translation PR → allowed (a community fix to ko.json is fine);
 *   - a PR whose head branch matches one of the family's `writers` globs → allowed
 *     (release/v*, translation waves, derived-refresh branches);
 *   - any other PR that touches a family file → FAIL: those edits ride along with a feature
 *     and belong to the refresh that owns them.
 *
 * Only runs in `pr` mode (scripts/check/lib/gateMode.mjs). In `release` mode it is a no-op:
 * the release PR and the refresh branches are exactly the ones that write derived files.
 *
 * Usage:
 *   node scripts/check/check-pr-derived-paths.mjs                 # mode from the environment
 *   node scripts/check/check-pr-derived-paths.mjs --mode=pr       # preview the CI verdict locally
 *   node scripts/check/check-pr-derived-paths.mjs --files=changed.txt   # explicit change list
 *   node scripts/check/check-pr-derived-paths.mjs --branch=feat/x       # override the head branch
 *   node scripts/check/check-pr-derived-paths.mjs --warn | --json
 *   npm run check:pr-derived-paths
 *
 * Base for the diff (pr mode): BASE_SHA, GITHUB_BASE_SHA, BASE_REF, origin/$GITHUB_BASE_REF,
 * origin/release/v<package.json version> — first that resolves. No resolvable base → SKIP.
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
  describeGateMode,
  listChangedFiles,
  resolveGateModeInfo,
  resolveHeadBranch,
  resolvePrDiffBase,
} from "./lib/gateMode.mjs";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..", "..");
export const CONFIG_DIR_REL = "config/quality/derived-paths";
const TAG = "[derived-paths]";
// Queue batches (Mergify drafts, the omni-queue candidate, GitHub's merge queue) are sums of PRs.
const QUEUE_BRANCHES = [/^mergify\/merge-queue\//, /^omni-queue\//, /^gh-readonly-queue\//];

/**
 * Glob → RegExp over repo-relative POSIX paths. `**` crosses directories (`**` before a slash may also
 * match zero directories), `*` and `?` stay inside one path segment. No braces or classes: the config
 * only needs these three.
 */
export function globToRegExp(glob) {
  let out = "";
  for (let i = 0; i < glob.length; i += 1) {
    const ch = glob[i];
    if (ch === "*") {
      if (glob[i + 1] === "*") {
        const slashAfter = glob[i + 2] === "/";
        out += slashAfter ? "(?:.*/)?" : ".*";
        i += slashAfter ? 2 : 1;
      } else {
        out += "[^/]*";
      }
    } else if (ch === "?") {
      out += "[^/]";
    } else {
      out += ch.replace(/[.+^${}()|[\]\\]/g, "\\$&");
    }
  }
  return new RegExp(`^${out}$`);
}

export function matchesAny(file, globs = []) {
  return globs.some((glob) => globToRegExp(glob).test(file));
}

function asStringArray(value, where) {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.some((v) => typeof v !== "string" || !v.trim())) {
    throw new Error(`${where} must be an array of non-empty strings`);
  }
  return value;
}

/** Validates one family file; returns a normalized object or throws with the file name. */
export function normalizeFamily(raw, source = "<inline>") {
  const where = (field) => `${source}: ${field}`;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new Error(`${source}: expected a JSON object`);
  }
  if (typeof raw.family !== "string" || !raw.family.trim()) throw new Error(where("family"));
  if (!Array.isArray(raw.categories) || raw.categories.length === 0) {
    throw new Error(where("categories must be a non-empty array"));
  }
  const ids = new Set();
  const categories = raw.categories.map((cat, i) => {
    const at = `categories[${i}]`;
    if (!cat || typeof cat.id !== "string" || !cat.id.trim()) throw new Error(where(`${at}.id`));
    if (ids.has(cat.id)) throw new Error(where(`duplicate category id "${cat.id}"`));
    ids.add(cat.id);
    const paths = asStringArray(cat.paths, where(`${at}.paths`));
    if (!paths.length) throw new Error(where(`${at}.paths must not be empty`));
    return {
      id: cat.id,
      paths,
      except: asStringArray(cat.except, where(`${at}.except`)),
      why: typeof cat.why === "string" ? cat.why : "",
      refreshedBy: typeof cat.refreshedBy === "string" ? cat.refreshedBy : "",
    };
  });
  return {
    family: raw.family,
    description: typeof raw.description === "string" ? raw.description : "",
    writers: asStringArray(raw.writers, where("writers")),
    companions: asStringArray(raw.companions, where("companions")),
    categories,
    source,
  };
}

/** Every `*.json` under the config dir, sorted by file name. A missing dir is an empty set. */
export function loadFamilies(root = ROOT) {
  const dir = path.join(root, CONFIG_DIR_REL);
  if (!fs.existsSync(dir)) return [];
  const families = fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".json"))
    .sort()
    .map((name) => {
      const rel = `${CONFIG_DIR_REL}/${name}`;
      let raw;
      try {
        raw = JSON.parse(fs.readFileSync(path.join(dir, name), "utf8"));
      } catch (err) {
        throw new Error(`${rel}: ${err.message}`);
      }
      return normalizeFamily(raw, rel);
    });
  const seen = new Map();
  for (const fam of families) {
    if (seen.has(fam.family)) {
      throw new Error(
        `family "${fam.family}" declared twice (${seen.get(fam.family)}, ${fam.source})`
      );
    }
    seen.set(fam.family, fam.source);
  }
  return families;
}

/** First category of the family that claims the file, or null. */
export function categoryOf(file, family) {
  for (const cat of family.categories) {
    if (matchesAny(file, cat.paths) && !matchesAny(file, cat.except)) return cat;
  }
  return null;
}

/**
 * Pure core.
 * @param {object} args
 * @param {string[]} args.files    repo-relative paths the change touches
 * @param {string}   args.branch   head branch name ("" when unknown)
 * @param {ReturnType<typeof normalizeFamily>[]} args.families
 * @returns {{ violations: Array<{ family: string, category: string, files: string[], why: string, refreshedBy: string }>,
 *             allowed: Array<{ family: string, reason: "writer" | "family-only", files: string[] }> }}
 */
export function evaluateDerivedPaths({ files, branch, families }) {
  const violations = [];
  const allowed = [];
  for (const family of families) {
    const byCategory = new Map();
    for (const file of files) {
      const cat = categoryOf(file, family);
      if (!cat) continue;
      if (!byCategory.has(cat.id)) byCategory.set(cat.id, { cat, files: [] });
      byCategory.get(cat.id).files.push(file);
    }
    if (byCategory.size === 0) continue;
    const touched = [...byCategory.values()].flatMap((entry) => entry.files);

    if (branch && matchesAny(branch, family.writers)) {
      allowed.push({ family: family.family, reason: "writer", files: touched });
      continue;
    }
    const familyOnly = files.every(
      (file) => categoryOf(file, family) !== null || matchesAny(file, family.companions)
    );
    if (familyOnly) {
      allowed.push({ family: family.family, reason: "family-only", files: touched });
      continue;
    }
    for (const { cat, files: catFiles } of byCategory.values()) {
      violations.push({
        family: family.family,
        category: cat.id,
        files: catFiles,
        why: cat.why,
        refreshedBy: cat.refreshedBy,
      });
    }
  }
  return { violations, allowed };
}

function parseArgs(argv) {
  const value = (name) => {
    const hit = argv.find((arg) => arg.startsWith(`--${name}=`));
    return hit ? hit.slice(name.length + 3) : undefined;
  };
  return {
    warn: argv.includes("--warn"),
    json: argv.includes("--json"),
    files: value("files"),
    branch: value("branch"),
  };
}

function readFileList(file) {
  return fs
    .readFileSync(path.resolve(file), "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function emit(opts, payload, lines, stream = "log") {
  if (opts.json) process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
  else for (const line of lines) console[stream](line);
}

export function main(argv = process.argv.slice(2), env = process.env, cwd = ROOT) {
  const opts = parseArgs(argv);
  const info = resolveGateModeInfo({ argv, env });
  const families = loadFamilies(cwd);

  if (info.mode === "release") {
    emit(opts, { ok: true, skipped: true, reason: "release-mode", mode: info }, [
      `${TAG} SKIP — ${describeGateMode(info)}: the release PR and refresh branches are the writers of derived files.`,
    ]);
    return 0;
  }

  const branch = opts.branch ?? resolveHeadBranch({ env, cwd });
  if (env.GITHUB_EVENT_NAME === "merge_group" || QUEUE_BRANCHES.some((re) => re.test(branch))) {
    emit(opts, { ok: true, skipped: true, reason: "queue-batch", mode: info, branch }, [
      `${TAG} SKIP reason=queue-batch — ${branch || "merge_group"} sums PRs this gate already judged one by one (a translation-only PR next to feature PRs is not a mixed PR).`,
    ]);
    return 0;
  }

  let files;
  let baseLabel;
  if (opts.files) {
    files = readFileList(opts.files);
    baseLabel = `--files=${opts.files}`;
  } else {
    const base = resolvePrDiffBase({ env, cwd });
    if (!base) {
      emit(opts, { ok: true, skipped: true, reason: "base-unresolved", mode: info }, [
        `${TAG} SKIP reason=base-unresolved — no merge base (shallow clone or unknown base ref); set BASE_SHA or fetch the base branch.`,
      ]);
      return 0;
    }
    files = listChangedFiles(base.sha, { cwd, includeWorktree: !env.CI });
    baseLabel = `${base.ref} @ ${base.sha.slice(0, 10)}`;
  }

  const { violations, allowed } = evaluateDerivedPaths({ files, branch, families });
  const payload = {
    ok: violations.length === 0,
    mode: info,
    base: baseLabel,
    branch,
    violations,
    allowed,
  };

  if (violations.length === 0) {
    const notes = allowed.map(
      (a) =>
        `${TAG}   allowed ${a.family}: ${a.files.length} file(s) (${a.reason === "writer" ? `writer branch ${branch}` : "derived-only PR"})`
    );
    emit(opts, payload, [
      `${TAG} PASS — ${describeGateMode(info)}; ${files.length} changed file(s) vs ${baseLabel}; ${families.length} famil${families.length === 1 ? "y" : "ies"} checked.`,
      ...notes,
    ]);
    return 0;
  }

  const label = opts.warn ? "WARN" : "FAIL";
  const lines = [
    `${TAG} ${label} — ${describeGateMode(info)}; this PR edits files that a refresh owns, next to a feature change (base ${baseLabel}, branch ${branch || "?"}):`,
  ];
  const sample = 6;
  for (const v of violations) {
    lines.push(
      `  ✗ ${v.family}/${v.category} — ${v.files.length} file(s): ${v.files.slice(0, sample).join(", ")}${v.files.length > sample ? ", …" : ""}`
    );
    if (v.why) lines.push(`      why: ${v.why}`);
    if (v.refreshedBy) lines.push(`      refreshed by: ${v.refreshedBy}`);
  }
  lines.push(
    "",
    "  Fix: drop those edits from this PR — restore each file to the base",
    "    git restore --source=<base> --staged --worktree -- <file>   (git rm <file> if this PR added it)",
    "  and leave them to the refresh named above. A PR that changes ONLY files of one family",
    "  (e.g. a translation fix to one locale) is allowed; so are the writer branches listed in",
    `  ${CONFIG_DIR_REL}/<family>.json.`
  );
  emit(opts, payload, lines, "error");
  if (opts.warn && env.GITHUB_ACTIONS === "true" && !opts.json) {
    // Advisory mode passes the step, so surface each violation as a check annotation too.
    for (const v of violations) {
      console.log(
        `::warning title=Derived files in a feature PR (${v.family}/${v.category})::${v.files.length} file(s) belong to ${v.refreshedBy || "a refresh"}; restore them to the base (see the step log).`
      );
    }
  }
  return opts.warn ? 0 : 1;
}

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirectRun) {
  try {
    process.exitCode = main();
  } catch (err) {
    console.error(`${TAG} ERROR — ${err.message}`);
    process.exitCode = 1;
  }
}
