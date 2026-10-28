#!/usr/bin/env node
// Mirrors the vendored kit's upstream version into the workspace: packages/ui-kit/package.json and
// the "packages/ui-kit" entry of package-lock.json. scripts/dev/sync-ui-kit.sh calls it after the
// copy, so a sync never leaves the workspace version behind UPSTREAM.md (the snapshot-gate test
// checks that they match).
// Usage: node scripts/dev/sync-ui-kit-version.mjs <repo-root> <version>
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const VERSION_RE = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;

function rewriteJson(file, mutate) {
  const before = fs.readFileSync(file, "utf8");
  const data = JSON.parse(before);
  if (!mutate(data)) return false;
  // Same layout npm writes (2 spaces, trailing newline), so only the version line changes.
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
  return true;
}

export function syncWorkspaceVersion(root, version) {
  if (!VERSION_RE.test(version)) throw new Error(`invalid kit version: ${version}`);
  const changed = [];
  const pkg = path.join(root, "packages", "ui-kit", "package.json");
  const bumpedPkg = rewriteJson(pkg, (data) => {
    if (data.version === version) return false;
    data.version = version;
    return true;
  });
  if (bumpedPkg) changed.push("packages/ui-kit/package.json");
  const lock = path.join(root, "package-lock.json");
  if (fs.existsSync(lock)) {
    const bumpedLock = rewriteJson(lock, (data) => {
      const entry = data.packages?.["packages/ui-kit"];
      if (!entry || entry.version === version) return false;
      entry.version = version;
      return true;
    });
    if (bumpedLock) changed.push("package-lock.json");
  }
  return changed;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const [root, version] = process.argv.slice(2);
  if (!root || !version) {
    console.error("usage: sync-ui-kit-version.mjs <repo-root> <version>");
    process.exit(2);
  }
  const changed = syncWorkspaceVersion(root, version);
  console.log(
    changed.length
      ? `workspace version → ${version}: ${changed.join(", ")}`
      : `workspace version already ${version}`
  );
}
