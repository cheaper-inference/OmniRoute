/**
 * #18078 — `src/app/not-found.tsx` rendered inside the dashboard showed
 * `MISSING_MESSAGE publicSystem`: as a client component it read its copy from the
 * nearest `NextIntlClientProvider`, and the dashboard providers (chrome + section sets
 * from routeNamespaces.generated.json) do not serve `publicSystem`.
 *
 * As a server component it translates at render time from the full request catalog, so
 * it no longer depends on which provider happens to wrap the boundary, and no dashboard
 * route has to ship `publicSystem` in its client payload.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), "utf8");

/** True when the file opens with a "use client" directive (comments and blank lines skipped). */
function isClientModule(source: string): boolean {
  const body = source.replace(/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/\s*)*/, "");
  return /^["']use client["']/.test(body.trimStart());
}

test("not-found.tsx is a server component, so its copy never depends on a client provider", () => {
  const src = read("src/app/not-found.tsx");
  assert.equal(isClientModule(src), false, "not-found.tsx must not be a client component");
  // Client-only hooks would force it back to the client.
  assert.doesNotMatch(src, /\buse(State|Effect|LayoutEffect|Router|Pathname)\(/);
  // It still translates through next-intl (the server entry resolves the full catalog).
  assert.match(src, /useTranslations\("publicSystem"\)/);
});

test("the namespace analyzer no longer counts not-found.tsx as a client file", async () => {
  const analyzer = await import("../../scripts/i18n/lib/routeNamespacesAnalyzer.mjs");
  const map = analyzer.analyzeRouteNamespaces() as {
    root: string[];
    chrome: string[];
  };
  // error.tsx (a client boundary that must stay client) keeps publicSystem in the root set.
  assert.ok(map.root.includes("publicSystem"), "root keeps publicSystem for error.tsx");
  // The dashboard chrome is unchanged: the fix is not to ship publicSystem on every page.
  assert.equal(map.chrome.includes("publicSystem"), false);
});
