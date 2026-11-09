import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const BASE_PATH = "/omni";
// Same resolution as scripts/build/build-next-isolated.mjs and next.config.mjs.
const DIST = path.resolve(ROOT, process.env.NEXT_DIST_DIR || ".build/next");
// A root-absolute /brand/ reference in markup, JS or CSS: `"/brand/`, `'/brand/`, a template
// literal starting with /brand/, or `url(/brand/`. Under basePath the asset lives at
// /omni/brand/…, so any of these is a broken link.
const ABSOLUTE_BRAND = /["'`(]\/brand\//;

// Pure-Node scan instead of `grep -rl`: grep exits 1 when nothing matches, which makes
// execFileSync throw on exactly the passing case.
function filesMatching(dir: string, pattern: RegExp): string[] {
  const hits: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) hits.push(...filesMatching(full, pattern));
    else if (
      /\.(js|mjs|cjs|css|html|json|rsc|body|map)$/.test(entry.name) &&
      pattern.test(fs.readFileSync(full, "utf8"))
    ) {
      hits.push(path.relative(ROOT, full));
    }
  }
  return hits;
}

test(
  "a basePath build references no absolute /brand/ asset and bundles the fonts",
  { skip: !process.env.RUN_BUILD_TESTS && "set RUN_BUILD_TESTS=1" },
  () => {
    // RUN_BUILD_TESTS_REUSE=1 checks an existing build output instead of rebuilding.
    if (!process.env.RUN_BUILD_TESTS_REUSE) {
      execFileSync("npm", ["run", "build"], {
        cwd: ROOT,
        env: { ...process.env, OMNIROUTE_BASE_PATH: BASE_PATH },
        stdio: "inherit",
        timeout: 2_400_000,
      });
    }

    // Positive control: the output really is a basePath build, so a clean scan means something.
    const manifest = JSON.parse(fs.readFileSync(path.join(DIST, "routes-manifest.json"), "utf8"));
    assert.equal(manifest.basePath, BASE_PATH, "routes-manifest.json basePath");

    // Client chunks and the server output (ErrorPageScaffold and maintenance are server components).
    const hits = [
      ...filesMatching(path.join(DIST, "static"), ABSOLUTE_BRAND),
      ...filesMatching(path.join(DIST, "server"), ABSOLUTE_BRAND),
    ];
    assert.deepEqual(hits, [], `absolute /brand/ references found:\n${hits.join("\n")}`);

    const fonts = fs
      .readdirSync(path.join(DIST, "static", "media"))
      .filter((f) => /inter|instrument|plex/i.test(f));
    assert.ok(
      fonts.length >= 3,
      `expected the three font families in static/media, got ${fonts.join(", ")}`
    );
  }
);
