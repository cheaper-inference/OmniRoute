// UI review 2026-11-15, defect 8 (finding A7-07): the shell draws a breadcrumb trail on every
// dashboard page, one crumb per URL segment. Two things were wrong:
//   - a crumb was always a link, including for a segment whose folder only groups sub-routes
//     and has no page.tsx (`/dashboard/resilience`, `/dashboard/system`, `/dashboard/tools`,
//     `/dashboard/gamification`): the link answered 404;
//   - 26 route segments had no label and showed the raw segment, capitalised, in every locale
//     ("Log-export", "Mitm-proxy").
//
// The rules live in `src/shared/utils/breadcrumbTrail.ts`. This guard checks them against the
// real route tree, so a folder that gains or loses its page, or a new route segment without a
// label, fails here instead of shipping a dead link or an untranslated crumb. The rendered
// behaviour is pinned by tests/unit/ui/adapters/breadcrumbs-trail.test.tsx.

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { breadcrumbLabelRefs, routeHasPage } from "../../src/shared/utils/breadcrumbTrail";

const ROOT = path.resolve(import.meta.dirname, "../..");
const DASHBOARD_APP = path.join(ROOT, "src/app/(dashboard)");

/**
 * Static segments that keep the capitalised fallback on purpose: they are data, not UI text.
 */
const UNLABELLED_SEGMENTS: Record<string, string> = {
  chatgpt:
    "A provider id: `/dashboard/providers/chatgpt` is answered by `providers/[id]`, and the " +
    "trail shows every provider id the same way (the static folder only holds the connect page).",
};

type RouteNode = { hasPage: boolean; children: Map<string, RouteNode> };

function readRouteTree(dir: string): RouteNode {
  const node: RouteNode = {
    hasPage: fs.existsSync(path.join(dir, "page.tsx")),
    children: new Map(),
  };
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith("_")) continue;
    const child = readRouteTree(path.join(dir, entry.name));
    if (child.hasPage || child.children.size > 0) node.children.set(entry.name, child);
  }
  return node;
}

const isOptionalCatchAll = (name: string) => name.startsWith("[[...");
const isCatchAll = (name: string) => name.startsWith("[...");
const isDynamic = (name: string) => name.startsWith("[");

/** Does the App Router answer `segments` with a page under `node`? (static, then dynamic.) */
function resolvesToPage(node: RouteNode, segments: string[]): boolean {
  if (segments.length === 0) {
    if (node.hasPage) return true;
    return [...node.children].some(([name, child]) => isOptionalCatchAll(name) && child.hasPage);
  }
  const [head, ...rest] = segments;
  const exact = node.children.get(head);
  if (exact && resolvesToPage(exact, rest)) return true;
  for (const [name, child] of node.children) {
    if (isOptionalCatchAll(name) || isCatchAll(name)) {
      if (child.hasPage) return true;
    } else if (isDynamic(name) && resolvesToPage(child, rest)) {
      return true;
    }
  }
  return false;
}

/** Every route prefix of the tree, as the folder names that lead to it. */
function routePrefixes(node: RouteNode, trail: string[] = [], out: string[][] = []): string[][] {
  for (const [name, child] of node.children) {
    if (isOptionalCatchAll(name) || isCatchAll(name)) continue;
    const next = [...trail, name];
    out.push(next);
    routePrefixes(child, next, out);
  }
  return out;
}

const tree = readRouteTree(DASHBOARD_APP);
const prefixes = routePrefixes(tree);
/** A concrete URL for a folder trail: `[id]` becomes a sample value. */
const sampleSegments = (trail: string[]) =>
  trail.map((name) => (isDynamic(name) ? `sample-${name.replace(/\W/g, "")}` : name));
const toHref = (segments: string[]) => "/" + segments.join("/");

test("the route tree is read (sanity)", () => {
  assert.ok(prefixes.length >= 120, `only ${prefixes.length} route prefixes found`);
  assert.equal(resolvesToPage(tree, ["dashboard", "providers", "anything"]), true);
  assert.equal(resolvesToPage(tree, ["dashboard", "resilience"]), false);
});

test("a crumb is a link exactly when its URL has a page", () => {
  const wrong: string[] = [];
  for (const trail of prefixes) {
    const segments = sampleSegments(trail);
    const expected = resolvesToPage(tree, segments);
    if (routeHasPage(toHref(segments)) !== expected) {
      wrong.push(
        `${toHref(trail)}: ${expected ? "has a page but is listed as page-less" : "has no page (the crumb would link to a 404)"}`
      );
    }
  }
  assert.deepEqual(
    wrong,
    [],
    "ROUTE_PREFIXES_WITHOUT_PAGE / STATIC_ROUTES_WITH_PAGE in src/shared/utils/breadcrumbTrail.ts are out of sync with src/app/(dashboard)"
  );
});

test("the four dead links of the review are gone, and real pages stay links", () => {
  for (const href of [
    "/dashboard/resilience",
    "/dashboard/system",
    "/dashboard/tools",
    "/dashboard/gamification",
    "/dashboard/api-manager/key-1",
    "/dashboard/plugins/my-plugin",
  ]) {
    assert.equal(routeHasPage(href), false, `${href} has no page: its crumb must not be a link`);
  }
  for (const href of [
    "/dashboard",
    "/dashboard/providers",
    "/dashboard/providers/chatgpt",
    "/dashboard/api-manager",
    // A static folder next to the page-less `api-manager/[id]`.
    "/dashboard/api-manager/routing",
    "/dashboard/plugins",
    "/dashboard/settings",
    "/dashboard/resilience/connections",
  ]) {
    assert.equal(routeHasPage(href), true, `${href} has a page: its crumb stays a link`);
  }
});

test("every static route segment has a label that exists in en.json", () => {
  const en = JSON.parse(fs.readFileSync(path.join(ROOT, "src/i18n/messages/en.json"), "utf8"));
  const unlabelled: string[] = [];
  const missingKeys: string[] = [];
  const seenExceptions = new Set<string>();

  for (const trail of prefixes) {
    const segment = trail[trail.length - 1];
    if (isDynamic(segment)) continue;
    const href = toHref(sampleSegments(trail));
    const refs = breadcrumbLabelRefs(segment, href);
    if (segment in UNLABELLED_SEGMENTS) {
      seenExceptions.add(segment);
      assert.deepEqual(refs, [], `${segment}: has a label now, drop the stale exception`);
      continue;
    }
    if (refs.length === 0) unlabelled.push(toHref(trail));
    for (const ref of refs) {
      if (typeof en[ref.namespace]?.[ref.key] !== "string") {
        missingKeys.push(`${toHref(trail)} → ${ref.namespace}.${ref.key}`);
      }
    }
  }

  assert.deepEqual(
    unlabelled,
    [],
    "Route segments without a breadcrumb label (they would show the raw segment in every " +
      "locale). Reuse a `sidebar` key when the route has one, else add the segment to " +
      "BREADCRUMB_LABEL_KEYS and the key to the `breadcrumbs` namespace of en.json."
  );
  assert.deepEqual(missingKeys, [], "breadcrumb label keys missing from en.json");
  assert.deepEqual(
    Object.keys(UNLABELLED_SEGMENTS).filter((segment) => !seenExceptions.has(segment)),
    [],
    "UNLABELLED_SEGMENTS lists segments that are no longer in the route tree"
  );
  for (const reason of Object.values(UNLABELLED_SEGMENTS)) {
    assert.ok(reason.trim().length > 40, "an unlabelled segment needs a real justification");
  }
});

test("a route with a sidebar entry and no breadcrumb key shows the sidebar label", () => {
  assert.deepEqual(breadcrumbLabelRefs("log-export", "/dashboard/log-export"), [
    { namespace: "sidebar", key: "logExport" },
  ]);
  // The same segment under two parents takes the label of its own route.
  assert.deepEqual(breadcrumbLabelRefs("proxy", "/dashboard/system/proxy"), [
    { namespace: "sidebar", key: "proxy" },
  ]);
  assert.deepEqual(breadcrumbLabelRefs("proxy", "/dashboard/logs/proxy"), [
    { namespace: "sidebar", key: "logsProxy" },
  ]);
  // A group prefix has no sidebar entry of its own: the group title names it.
  assert.deepEqual(breadcrumbLabelRefs("system", "/dashboard/system"), [
    { namespace: "sidebar", key: "systemGroup" },
  ]);
  // A segment that already had a breadcrumb key keeps it first.
  assert.deepEqual(breadcrumbLabelRefs("analytics", "/dashboard/analytics")[0], {
    namespace: "breadcrumbs",
    key: "analytics",
  });
  // Data segments (ids) have no label.
  assert.deepEqual(breadcrumbLabelRefs("openai", "/dashboard/providers/openai"), []);
});
