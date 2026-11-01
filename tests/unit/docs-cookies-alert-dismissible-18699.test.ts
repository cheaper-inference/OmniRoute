import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

/**
 * Regression tests for review feedback on #18612 / #18699:
 *  - /docs never showed a translation because `cookies()` was not awaited
 *    (Next.js 16 makes `cookies()` async) — #18699.
 *  - Login and status notices switched from hand-rolled `ci-alert` markup to
 *    `<Alert dismissible={false}>` now that the kit supports a non-dismissible
 *    alert — #18612 follow-up.
 *
 * These are source-level guards (same pattern as
 * `tests/unit/docs-mdx-components-default-export.test.ts`) because the affected
 * symbols (`getDocsLocale`) are module-private and the pages are Next.js App
 * Router routes that are costly to render in node:test.
 */

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");

function read(rel: string): string {
  return fs.readFileSync(path.join(REPO_ROOT, rel), "utf8");
}

test("docs slug page awaits cookies() so non-EN translations render (#18699)", () => {
  const source = read("src/app/docs/[...slug]/page.tsx");

  assert.match(
    source,
    /async function getDocsLocale\(\): Promise<string>/,
    "getDocsLocale must be async now that cookies() is awaited"
  );
  assert.match(
    source,
    /const cookieStore = await cookies\(\);/,
    "cookies() must be awaited in getDocsLocale"
  );
  assert.match(
    source,
    /const locale = await getDocsLocale\(\);/,
    "the page must await getDocsLocale()"
  );
});

test("login node-warning banner uses Alert dismissible={false}", () => {
  const source = read("src/app/login/page.tsx");

  assert.match(
    source,
    /import \{ Alert \} from "@omniroute\/ui-kit\/alert"/,
    "login page must import the kit Alert"
  );
  assert.match(source, /dismissible={false}/, "login node-warning alert must be non-dismissible");
  // The kit Alert renders the dismiss control internally; the hand-rolled
  // ci-alert div is no longer needed (and previously could not drop it).
  assert.doesNotMatch(
    source,
    /ci-alert ci-alert--critical/,
    "login page must not hand-roll a raw ci-alert banner"
  );
});

test("status health-check alert uses Alert dismissible={false}", () => {
  const source = read("src/app/status/page.tsx");

  assert.match(
    source,
    /import \{ Alert \} from "@omniroute\/ui-kit\/alert"/,
    "status page must import the kit Alert"
  );
  assert.match(source, /dismissible={false}/, "status health-check alert must be non-dismissible");
  assert.doesNotMatch(
    source,
    /ci-alert ci-alert--critical/,
    "status page must not hand-roll a raw ci-alert banner"
  );
});
