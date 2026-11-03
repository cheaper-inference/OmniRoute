import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

/**
 * Regression guard for the /docs React #130 crash introduced by #11834.
 *
 * `src/app/docs/[...slug]/page.tsx` binds `defaultMdxComponents` from the awaited
 * `fumadocs-ui/mdx` module namespace. That namespace only exposes
 * `createRelativeLink` + `default`, so the components live under `.default`.
 * Binding the namespace itself made `defaultMdxComponents.a` undefined, and
 * `DocsLink` renders `<defaultMdxComponents.a />`, so every doc containing a
 * markdown link threw "Element type is invalid ... got: undefined" (#130)
 * during SSR and fell through to the error boundary.
 */
const REPO_ROOT = path.resolve(import.meta.dirname, "../..");
const PAGE_REL = "src/app/docs/[...slug]/page.tsx";

function readPageSource(): string {
  return fs.readFileSync(path.join(REPO_ROOT, PAGE_REL), "utf8");
}

test("fumadocs-ui/mdx exposes the MDX components on the default export, not the namespace", async () => {
  const mod: Record<string, unknown> = await import("fumadocs-ui/mdx");
  const components = mod.default as Record<string, unknown>;

  assert.ok(components, "fumadocs-ui/mdx must have a default export holding the components");
  assert.equal(
    typeof components.a,
    "function",
    "components.a must be the anchor component DocsLink renders"
  );

  // The namespace itself must NOT be usable as the components map — that is
  // exactly the mistake #11834 introduced.
  assert.equal(
    (mod as Record<string, unknown>).a,
    undefined,
    "module namespace must not expose `a` directly; components live under `default`"
  );
});

test("docs slug page binds defaultMdxComponents from the default export", () => {
  const source = readPageSource();

  assert.match(
    source,
    /\{\s*default:\s*defaultMdxComponents\s*\}\s*\]\s*=\s*await\s+Promise\.all/,
    "docs slug page must destructure `{ default: defaultMdxComponents }` from the awaited import"
  );

  assert.doesNotMatch(
    source,
    /,\s*defaultMdxComponents\s*\]\s*=\s*await\s+Promise\.all/,
    "docs slug page must not bind the raw module namespace as defaultMdxComponents"
  );
});
