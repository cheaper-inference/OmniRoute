import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

// tsconfig.build.json leaves the vendored kit's root barrel and reporting-charts.tsx out of the
// build type check, because upstream wrote that component for recharts 2 and we ship recharts 3.
// That is only safe while nothing imports either file. If this fails, the component is about to be
// bundled: drop the exclude and fix the recharts 3 types (upstream or in an adapter).

const ROOT = process.cwd();
const EXCLUDED = ["packages/ui-kit/src/index.ts", "packages/ui-kit/src/reporting-charts.tsx"];

function stripJsonComments(text: string): string {
  return text.replace(/\/\/[^\n]*/g, "");
}

function grep(pattern: string, paths: string[]): string[] {
  try {
    return execFileSync("git", ["grep", "-n", "-E", pattern, "--", ...paths], {
      cwd: ROOT,
      encoding: "utf8",
    })
      .split("\n")
      .filter(Boolean);
  } catch {
    return [];
  }
}

const SHIPPED = ["src", "open-sse", "electron", "bin"];

test("tsconfig.build.json excludes exactly the two unimported vendored kit files", () => {
  const config = JSON.parse(
    stripJsonComments(fs.readFileSync(path.join(ROOT, "tsconfig.build.json"), "utf8"))
  );
  const kitExcludes = (config.exclude as string[]).filter((entry) => entry.startsWith("packages/"));
  assert.deepEqual(kitExcludes.sort(), [...EXCLUDED].sort());
  for (const file of EXCLUDED) assert.ok(fs.existsSync(path.join(ROOT, file)), file);
});

test("no shipped code imports the vendored kit's root barrel", () => {
  const hits = grep(
    `from ["']@omniroute/ui-kit["']|import\\(["']@omniroute/ui-kit["']\\)`,
    SHIPPED
  );
  assert.deepEqual(hits, []);
});

test("no shipped code or other kit module imports reporting-charts", () => {
  const shipped = grep(`ui-kit/reporting-charts|ui-kit/src/reporting-charts`, SHIPPED);
  assert.deepEqual(shipped, []);
  const kitImporters = grep(`from ["']\\./reporting-charts["']`, ["packages/ui-kit/src"]).filter(
    (line) => !line.startsWith("packages/ui-kit/src/index.ts:")
  );
  assert.deepEqual(kitImporters, []);
});
