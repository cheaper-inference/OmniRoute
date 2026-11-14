// Launch quality gate scope (docs/qa/LAUNCH-QA.md, "Scope").
//
// The scope in config/quality/launch-gates.json is a set of include globs plus an exclude list,
// resolved at run time against `git ls-files` (tracked) plus untracked, non-ignored files, so
// modules created later (for example by splitting a large file) are measured without editing
// the config. Glob syntax: `**` (any number of path segments), `*` (within one segment), `?`
// and `{a,b}` alternatives; a pattern without wildcards matches that exact path.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

/** Test files never belong to the scope, whatever the include globs say. */
const TEST_FILE = /(?:^|\/)(?:tests?|__tests__)\/|\.(?:test|spec)\.[^/]+$/;

function expandBraces(glob) {
  const m = /\{([^{}]*)\}/.exec(glob);
  if (!m) return [glob];
  const head = glob.slice(0, m.index);
  const tail = glob.slice(m.index + m[0].length);
  return m[1].split(",").flatMap((alt) => expandBraces(head + alt + tail));
}

function segmentToRegExp(glob) {
  let out = "";
  for (let i = 0; i < glob.length; i++) {
    const ch = glob[i];
    if (ch === "*" && glob[i + 1] === "*") {
      const slash = glob[i + 2] === "/";
      out += slash ? "(?:[^/]+/)*" : ".*";
      i += slash ? 2 : 1;
    } else if (ch === "*") out += "[^/]*";
    else if (ch === "?") out += "[^/]";
    else out += ch.replace(/[.+^$()|[\]\\]/g, "\\$&");
  }
  return out;
}

/** Compile a glob (with `{a,b}`, `**`, `*`, `?`) to an anchored RegExp over posix paths. */
export function globToRegExp(glob) {
  return new RegExp(`^(?:${expandBraces(glob).map(segmentToRegExp).join("|")})$`);
}

/**
 * Filter candidate repo-relative paths down to the scope.
 * @param {string[]} candidates posix paths relative to the repo root
 * @param {{ include: string[], exclude?: string[] }} scope
 * @returns {string[]} sorted, unique
 */
export function filterScope(candidates, scope) {
  const include = scope.include.map(globToRegExp);
  const exclude = (scope.exclude ?? []).map(globToRegExp);
  const picked = candidates.filter(
    (f) =>
      include.some((re) => re.test(f)) && !exclude.some((re) => re.test(f)) && !TEST_FILE.test(f)
  );
  return [...new Set(picked)].sort();
}

/** Tracked plus untracked (not ignored) files that exist on disk, relative to root. */
export function listRepoFiles(root) {
  const res = spawnSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard"], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
  });
  if (res.status !== 0) throw new Error(`git ls-files failed: ${res.stderr}`);
  return res.stdout
    .split("\0")
    .filter(Boolean)
    .filter((f) => fs.existsSync(path.join(root, f)));
}

/**
 * Resolve the launch scope from the gates config.
 * @param {{ scope: { include: string[], exclude?: string[] } }} cfg
 * @param {string} root repo root
 */
export function resolveScope(cfg, root) {
  if (Array.isArray(cfg.scope))
    throw new Error("launch-gates.json scope must be {include, exclude}");
  const files = filterScope(listRepoFiles(root), cfg.scope);
  if (!files.length) throw new Error("launch scope resolved to 0 files");
  return files;
}
