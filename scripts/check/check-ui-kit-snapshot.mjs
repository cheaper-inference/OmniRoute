#!/usr/bin/env node
// Gate: packages/ui-kit/src must be the same as the UPSTREAM.md commit (after the ".js" strip).
// Skipped with warning when clone in _references does not exist (public CI/forks).
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const common = execFileSync("git", ["rev-parse", "--path-format=absolute", "--git-common-dir"], {
  cwd: ROOT,
})
  .toString()
  .trim();
const CLONE =
  process.env.UI_KIT_CLONE ||
  path.join(path.dirname(common), "_references", "cheaper-inference-ui-kit");
const DEST = path.join(ROOT, "packages", "ui-kit");

export function readPinnedCommit(upstreamMd) {
  const m = /^- commit: ([0-9a-f]{40})/m.exec(upstreamMd);
  return m ? m[1] : null;
}

export function stripJsSuffix(text) {
  return text.replace(/(from "\.{1,2}\/[^"]+)\.js"/g, '$1"');
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    e.isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}

function main() {
  const upstream = fs.readFileSync(path.join(DEST, "UPSTREAM.md"), "utf8");
  const commit = readPinnedCommit(upstream);
  if (!commit) {
    console.error("UPSTREAM.md without line '- commit: <sha>'");
    process.exit(1);
  }
  if (!fs.existsSync(path.join(CLONE, ".git"))) {
    console.warn(
      `[check-ui-kit-snapshot] clone not found in ${CLONE} — gate skipped (public CI/fork)`
    );
    return;
  }
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "ui-kit-snapshot-"));
  try {
    // Hooks inherit GIT_DIR/GIT_INDEX_FILE from the repo being committed; drop them so the
    // archive command resolves the clone, not OmniRoute.
    const cloneEnv = Object.fromEntries(
      Object.entries(process.env).filter(([k]) => !k.startsWith("GIT_"))
    );
    const archive = execFileSync("git", ["-C", CLONE, "archive", commit, "src"], {
      env: cloneEnv,
      maxBuffer: 64 * 1024 * 1024,
    });
    execFileSync("tar", ["-x", "-C", tmp], { input: archive });
    const expected = new Map();
    for (const f of walk(path.join(tmp, "src"))) {
      const rel = path.relative(path.join(tmp, "src"), f);
      let text = fs.readFileSync(f);
      if (/\.(ts|tsx)$/.test(rel)) text = Buffer.from(stripJsSuffix(text.toString("utf8")));
      expected.set(rel, text);
    }
    const actual = new Map(
      walk(path.join(DEST, "src")).map((f) => [
        path.relative(path.join(DEST, "src"), f),
        fs.readFileSync(f),
      ])
    );
    const problems = [];
    for (const [rel, buf] of expected) {
      if (!actual.has(rel)) problems.push(`faltando: ${rel}`);
      else if (!buf.equals(actual.get(rel))) problems.push(`different: ${rel}`);
    }
    for (const rel of actual.keys()) if (!expected.has(rel)) problems.push(`extra: ${rel}`);
    const patches = fs.existsSync(path.join(DEST, "PATCHES.md"))
      ? fs.readFileSync(path.join(DEST, "PATCHES.md"), "utf8")
      : "";
    if (problems.length && !patches.includes(`## ${commit}`)) {
      console.error(
        `[check-ui-kit-snapshot] packages/ui-kit/src diverges from commit ${commit} and PATCHES.md does not document:\n ${problems.join("\n ")}`
      );
      process.exit(1);
    }
    console.log(
      `[check-ui-kit-snapshot] ok (${expected.size} files, commit ${commit.slice(0, 12)})`
    );
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main();
