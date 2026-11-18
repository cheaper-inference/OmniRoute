// UI review 2026-11-15, defect 4 (finding A7-01): a dashboard route without the kit PageHeader
// has no page title below 1024 px. The only title left is the shell one (Header.tsx), which
// lives in a `hidden … lg:flex` block: under `lg` its <h1> is `display: none`, so the page has
// no heading on screen or in the accessibility tree.
//
// This guard walks every `page.tsx` under `src/app/(dashboard)` and requires each one that is
// not a redirect to reach a kit `PageHeader` (docs/architecture/DESIGN_SYSTEM.md §3.1). "Reach"
// follows the components the page actually renders: from a file, only the imports used as a JSX
// tag are followed (static imports, `dynamic(() => import(…))`, and re-exports of a barrel), so
// a PageHeader in an unrelated module the page merely imports does not count.
//
// It also pins the three things the fix settled:
//   - the PageHeader is `compact` everywhere in the dashboard;
//   - a page has one <h1>: a raw <h1> in the dashboard tree is only allowed in the listed files;
//   - the routes that used to rely on the shell title show the same title and description the
//     shell showed, from the same keys (`sidebar.<i18nKey>` and `header.<…Description>`).

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

import { SIDEBAR_SECTIONS, getSectionItems } from "../../src/shared/constants/sidebarVisibility";

const ROOT = path.resolve(import.meta.dirname, "../..");
const DASHBOARD_APP = "src/app/(dashboard)";
const KIT_PAGE_HEADER = "@omniroute/ui-kit/page-header";

/**
 * Pages that keep no PageHeader on purpose. Each one must still render an <h1> of its own
 * (checked below), and an entry that starts reaching a PageHeader fails as stale.
 */
const PAGES_WITHOUT_PAGE_HEADER: Record<string, string> = {
  "src/app/(dashboard)/dashboard/onboarding/page.tsx":
    "First-run wizard, not in the sidebar (the shell shows no title for it): the <h1> is the " +
    "title of the current step, inside the step card. A fixed PageHeader would add a second, " +
    "competing title above every step.",
  "src/app/(dashboard)/dashboard/system/mitm-proxy/page.tsx":
    'A "page moved" notice shown for 2.5 s before the redirect to /dashboard/tools/agent-bridge: ' +
    "the <h1> is the title of the kit Alert, which is the whole page.",
};

/** Files of the dashboard tree that may hold a raw <h1> (everything else uses the PageHeader). */
const RAW_H1_ALLOWED: Record<string, string> = {
  "src/shared/components/Header.tsx":
    "The shell title: rendered only while no PageHeader is mounted in #main-content.",
  "src/shared/components/ErrorPageScaffold.tsx":
    "Standalone error screens (400–503), outside the dashboard shell.",
  "src/app/(dashboard)/dashboard/onboarding/page.tsx": "Step title of the wizard (see above).",
  "src/app/(dashboard)/dashboard/system/mitm-proxy/page.tsx":
    "Title of the page-moved Alert (see above).",
  "src/app/(dashboard)/dashboard/combos/ComboControlCenterClient.tsx":
    "Error branch that replaces the whole page, PageHeader included.",
  "src/app/(dashboard)/dashboard/playground/components/MarkdownMessage.tsx":
    "Markdown renderer: `#` headings of a model answer.",
  "src/app/(dashboard)/dashboard/changelog/components/ChangelogViewer.tsx":
    "Markdown renderer: the changelog body (the leading `# ` block is filtered out).",
  "src/app/(dashboard)/dashboard/providers/components/CodexCliGuideModal.tsx":
    "Markdown renderer inside a modal.",
};

/**
 * Routes that had only the shell title before the fix: route → file that now holds the
 * PageHeader. The expected keys are derived from the shell's own sources (the sidebar catalog
 * and `HEADER_DESCRIPTIONS` in Header.tsx), not repeated here.
 */
const SHELL_TITLED_ROUTES: Record<string, string> = {
  "/home": "src/app/(dashboard)/home/HomePageHeader.tsx",
  "/dashboard/analytics": "src/app/(dashboard)/dashboard/analytics/page.tsx",
  "/dashboard/analytics/combo-health":
    "src/app/(dashboard)/dashboard/analytics/combo-health/page.tsx",
  "/dashboard/analytics/compression":
    "src/app/(dashboard)/dashboard/analytics/compression/page.tsx",
  "/dashboard/analytics/evals": "src/app/(dashboard)/dashboard/analytics/evals/page.tsx",
  "/dashboard/analytics/search": "src/app/(dashboard)/dashboard/analytics/search/page.tsx",
  "/dashboard/analytics/utilization":
    "src/app/(dashboard)/dashboard/analytics/utilization/page.tsx",
  "/dashboard/api-endpoints": "src/app/(dashboard)/dashboard/api-endpoints/page.tsx",
  "/dashboard/batch/files": "src/app/(dashboard)/dashboard/batch/files/page.tsx",
  "/dashboard/cache": "src/app/(dashboard)/dashboard/cache/page.tsx",
  "/dashboard/cache/media": "src/app/(dashboard)/dashboard/cache/media/MediaPageClient.tsx",
  "/dashboard/compression/exclusions":
    "src/app/(dashboard)/dashboard/compression/exclusions/page.tsx",
  "/dashboard/compression/studio": "src/app/(dashboard)/dashboard/compression/studio/page.tsx",
  "/dashboard/context/combos":
    "src/app/(dashboard)/dashboard/context/combos/CompressionCombosPageClient.tsx",
  "/dashboard/context/settings": "src/app/(dashboard)/dashboard/context/settings/page.tsx",
  "/dashboard/conversations": "src/app/(dashboard)/dashboard/conversations/page.tsx",
  "/dashboard/costs/budget": "src/app/(dashboard)/dashboard/costs/budget/page.tsx",
  "/dashboard/costs/pricing": "src/app/(dashboard)/dashboard/costs/pricing/page.tsx",
  "/dashboard/costs/teams": "src/app/(dashboard)/dashboard/costs/teams-page.tsx",
  "/dashboard/free-tiers": "src/app/(dashboard)/dashboard/free-tiers/page.tsx",
  "/dashboard/logs/timeline": "src/app/(dashboard)/dashboard/logs/timeline/page.tsx",
  "/dashboard/orchestration":
    "src/app/(dashboard)/dashboard/orchestration/OrchestrationPageClient.tsx",
  "/dashboard/playground": "src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx",
  "/dashboard/providers":
    "src/app/(dashboard)/dashboard/providers/components/ProvidersPageFrame.tsx",
  "/dashboard/quota": "src/app/(dashboard)/dashboard/quota/page.tsx",
  "/dashboard/search-tools": "src/app/(dashboard)/dashboard/search-tools/SearchToolsClient.tsx",
  "/dashboard/system/proxy": "src/app/(dashboard)/dashboard/system/proxy/page.tsx",
  "/dashboard/translator": "src/app/(dashboard)/dashboard/translator/TranslatorPageClient.tsx",
};

// ─── module graph ────────────────────────────────────────────────────────────

type ImportRecord = { imported: string; specifier: string };

type ModuleInfo = {
  /** local binding → where it comes from (static import or `dynamic(() => import(…))`). */
  bindings: Map<string, ImportRecord>;
  /** exported name → re-export source (`export { default as X } from "./X"`). */
  reexports: Map<string, ImportRecord>;
  /** `export * from "./x"` sources. */
  starExports: string[];
  /** root identifier of every JSX tag in the file, with its attribute names. */
  tags: Array<{ name: string; attributes: string[]; line: number }>;
  hasJsx: boolean;
  callsRedirect: boolean;
};

const moduleCache = new Map<string, ModuleInfo>();

function dynamicImportSpecifier(node: ts.Node): string | undefined {
  let found: string | undefined;
  const visit = (child: ts.Node) => {
    if (
      ts.isCallExpression(child) &&
      child.expression.kind === ts.SyntaxKind.ImportKeyword &&
      child.arguments.length === 1 &&
      ts.isStringLiteralLike(child.arguments[0])
    ) {
      found ??= (child.arguments[0] as ts.StringLiteralLike).text;
    }
    ts.forEachChild(child, visit);
  };
  visit(node);
  return found;
}

function readImportDeclaration(node: ts.ImportDeclaration, info: ModuleInfo) {
  const specifier = (node.moduleSpecifier as ts.StringLiteral).text;
  const clause = node.importClause;
  if (!clause) return;
  if (clause.name) info.bindings.set(clause.name.text, { imported: "default", specifier });
  const named = clause.namedBindings;
  if (named && ts.isNamespaceImport(named)) {
    info.bindings.set(named.name.text, { imported: "*", specifier });
  } else if (named) {
    for (const element of named.elements) {
      info.bindings.set(element.name.text, {
        imported: (element.propertyName ?? element.name).text,
        specifier,
      });
    }
  }
}

function readExportDeclaration(node: ts.ExportDeclaration, info: ModuleInfo) {
  if (!node.moduleSpecifier) return;
  const specifier = (node.moduleSpecifier as ts.StringLiteral).text;
  if (!node.exportClause) {
    info.starExports.push(specifier);
  } else if (ts.isNamedExports(node.exportClause)) {
    for (const element of node.exportClause.elements) {
      info.reexports.set(element.name.text, {
        imported: (element.propertyName ?? element.name).text,
        specifier,
      });
    }
  }
}

function readModule(file: string): ModuleInfo {
  const cached = moduleCache.get(file);
  if (cached) return cached;
  const source = fs.readFileSync(file, "utf8");
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const info: ModuleInfo = {
    bindings: new Map(),
    reexports: new Map(),
    starExports: [],
    tags: [],
    hasJsx: false,
    callsRedirect: false,
  };
  const visit = (node: ts.Node) => {
    if (ts.isImportDeclaration(node)) readImportDeclaration(node, info);
    else if (ts.isExportDeclaration(node)) readExportDeclaration(node, info);
    else if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) {
      const specifier = dynamicImportSpecifier(node.initializer);
      if (specifier) info.bindings.set(node.name.text, { imported: "default", specifier });
    } else if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      info.hasJsx = true;
      info.tags.push({
        name: node.tagName.getText(sf).split(".")[0],
        attributes: node.attributes.properties
          .filter(ts.isJsxAttribute)
          .map((attr) => attr.name.getText(sf)),
        line: sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1,
      });
    } else if (ts.isJsxFragment(node)) {
      info.hasJsx = true;
    } else if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      (node.expression.text === "redirect" || node.expression.text === "permanentRedirect")
    ) {
      info.callsRedirect = true;
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  moduleCache.set(file, info);
  return info;
}

const RESOLVE_SUFFIXES = ["", ".tsx", ".ts", "/index.tsx", "/index.ts"];

function resolveSpecifier(fromFile: string, specifier: string): string | undefined {
  let base: string;
  if (specifier.startsWith("@/")) base = path.join(ROOT, "src", specifier.slice(2));
  else if (specifier.startsWith(".")) base = path.resolve(path.dirname(fromFile), specifier);
  else return undefined;
  for (const suffix of RESOLVE_SUFFIXES) {
    const candidate = base + suffix;
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return undefined;
}

/** Follows a barrel: the file that really declares `name`, or the barrel itself. */
function resolveExport(file: string, name: string, seen = new Set<string>()): string {
  if (seen.has(file)) return file;
  seen.add(file);
  const info = readModule(file);
  const reexport = info.reexports.get(name);
  if (reexport) {
    const target = resolveSpecifier(file, reexport.specifier);
    return target ? resolveExport(target, reexport.imported, seen) : file;
  }
  if (name !== "default" && !info.hasJsx) {
    for (const specifier of info.starExports) {
      const target = resolveSpecifier(file, specifier);
      if (target && /\.tsx$/.test(target)) {
        const resolved = resolveExport(target, name, seen);
        if (readModule(resolved).hasJsx) return resolved;
      }
    }
  }
  return file;
}

/** Local names the kit PageHeader is imported under (`PageHeader`, `KitPageHeader`…). */
function pageHeaderNames(info: ModuleInfo): string[] {
  return [...info.bindings]
    .filter(([, rec]) => rec.specifier === KIT_PAGE_HEADER && rec.imported === "PageHeader")
    .map(([local]) => local);
}

function rendersPageHeader(info: ModuleInfo): boolean {
  const names = pageHeaderNames(info);
  return info.tags.some((tag) => names.includes(tag.name));
}

/** Files a component file renders: every imported component it uses as a JSX tag. */
function renderedChildren(file: string): string[] {
  const info = readModule(file);
  const children: string[] = [];
  for (const tag of new Set(info.tags.map((t) => t.name))) {
    const record = info.bindings.get(tag);
    if (!record) continue;
    const target = resolveSpecifier(file, record.specifier);
    if (target && /\.tsx?$/.test(target)) children.push(resolveExport(target, record.imported));
  }
  return children;
}

/**
 * Breadth-first over what `page` renders, nearest files first; stops at the first file that
 * satisfies `found` (a page that has a PageHeader has it one or two imports away).
 */
function rendersSomewhere(page: string, found: (info: ModuleInfo) => boolean): boolean {
  const seen = new Set([page]);
  let frontier = [page];
  while (frontier.length > 0) {
    if (frontier.some((file) => found(readModule(file)))) return true;
    const next: string[] = [];
    for (const file of frontier) {
      for (const child of renderedChildren(file)) {
        if (!seen.has(child)) {
          seen.add(child);
          next.push(child);
        }
      }
    }
    frontier = next;
  }
  return false;
}

// ─── inventory ───────────────────────────────────────────────────────────────

function walk(dir: string, match: (name: string) => boolean, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "__tests__") continue;
      walk(full, match, out);
    } else if (match(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

const rel = (file: string) => path.relative(ROOT, file).split(path.sep).join("/");

const dashboardPages = walk(path.join(ROOT, DASHBOARD_APP), (name) => name === "page.tsx").sort();
const isRedirectPage = (file: string) => {
  const info = readModule(file);
  return info.callsRedirect && !info.hasJsx;
};
const contentPages = dashboardPages.filter((file) => !isRedirectPage(file));
const reachesPageHeader = (file: string) => rendersSomewhere(file, rendersPageHeader);

test("the inventory sees the dashboard pages and tells redirects apart", () => {
  assert.ok(dashboardPages.length >= 120, `only ${dashboardPages.length} dashboard pages found`);
  const redirects = dashboardPages.filter(isRedirectPage).map(rel);
  for (const page of [
    "src/app/(dashboard)/dashboard/page.tsx",
    "src/app/(dashboard)/dashboard/context/page.tsx",
    "src/app/(dashboard)/dashboard/settings/page.tsx",
    "src/app/(dashboard)/dashboard/logs/activity/page.tsx",
  ]) {
    assert.ok(redirects.includes(page), `${page} should be classified as a redirect`);
  }
  assert.ok(contentPages.length >= 100, `only ${contentPages.length} content pages found`);
});

test("every dashboard page that is not a redirect reaches a kit PageHeader", () => {
  const missing = contentPages
    .map(rel)
    .filter((page) => !(page in PAGES_WITHOUT_PAGE_HEADER))
    .filter((page) => !reachesPageHeader(path.join(ROOT, page)));
  assert.deepEqual(
    missing,
    [],
    "These dashboard pages render no kit PageHeader, so below 1024 px they have no title " +
      "(the shell title is hidden under `lg`). Open the page with " +
      '`<PageHeader compact title={…} description={…} />` from "@omniroute/ui-kit/page-header" ' +
      "(DESIGN_SYSTEM.md §3.1)."
  );
});

test("the PageHeader exceptions are justified, still needed and still titled", () => {
  for (const [page, reason] of Object.entries(PAGES_WITHOUT_PAGE_HEADER)) {
    const file = path.join(ROOT, page);
    assert.ok(reason.trim().length > 40, `${page}: the exception needs a real justification`);
    assert.ok(fs.existsSync(file), `${page}: listed as an exception but the file is gone`);
    assert.ok(!isRedirectPage(file), `${page}: is a redirect now, drop the exception`);
    assert.ok(
      !reachesPageHeader(file),
      `${page}: reaches a PageHeader now, drop the stale exception`
    );
    assert.ok(
      rendersSomewhere(file, (info) => info.tags.some((tag) => tag.name === "h1")),
      `${page}: has neither a PageHeader nor an <h1> — the page would have no title at all`
    );
  }
});

/** Dashboard-tree TSX files whose text contains `marker` (parsed only then: the tree is large). */
function dashboardTreeFilesWith(marker: string): string[] {
  return [
    ...walk(path.join(ROOT, DASHBOARD_APP), (name) => name.endsWith(".tsx")),
    ...walk(path.join(ROOT, "src/shared/components"), (name) => name.endsWith(".tsx")),
  ].filter((file) => fs.readFileSync(file, "utf8").includes(marker));
}

test("every PageHeader in the dashboard is compact", () => {
  const offenders: string[] = [];
  let seen = 0;
  for (const file of dashboardTreeFilesWith(KIT_PAGE_HEADER)) {
    const info = readModule(file);
    const names = pageHeaderNames(info);
    for (const tag of info.tags) {
      if (!names.includes(tag.name)) continue;
      seen++;
      if (!tag.attributes.includes("compact")) offenders.push(`${rel(file)}:${tag.line}`);
    }
  }
  assert.ok(seen >= 70, `only ${seen} <PageHeader> found in the dashboard tree`);
  assert.deepEqual(offenders, [], "PageHeader without `compact` inside the dashboard");
});

test("a raw <h1> lives only in the listed files (one page title per page)", () => {
  const withRawH1 = dashboardTreeFilesWith("<h1")
    .filter((file) => readModule(file).tags.some((tag) => tag.name === "h1"))
    .map(rel)
    .sort();
  const unexpected = withRawH1.filter((file) => !(file in RAW_H1_ALLOWED));
  assert.deepEqual(
    unexpected,
    [],
    "A raw <h1> next to the page's PageHeader (or the shell title) gives the page two h1s. " +
      "Use the kit PageHeader for the page title and <h2>/<h3> below it."
  );
  const stale = Object.keys(RAW_H1_ALLOWED).filter((file) => !withRawH1.includes(file));
  assert.deepEqual(stale, [], "RAW_H1_ALLOWED lists files that no longer hold an <h1>");
});

// ─── same title and description as the shell ─────────────────────────────────

function shellHeaderDescriptions(): Record<string, string> {
  const source = fs.readFileSync(path.join(ROOT, "src/shared/components/Header.tsx"), "utf8");
  const block = source.match(/const HEADER_DESCRIPTIONS[\s\S]*?=\s*\{([\s\S]*?)\n\};/);
  assert.ok(block, "HEADER_DESCRIPTIONS not found in Header.tsx");
  const map: Record<string, string> = {};
  for (const m of block[1].matchAll(/^\s*"?([\w-]+)"?:\s*"(\w+)",?\s*$/gm)) map[m[1]] = m[2];
  return map;
}

test("routes that relied on the shell title show the same title and description", () => {
  const en = JSON.parse(fs.readFileSync(path.join(ROOT, "src/i18n/messages/en.json"), "utf8"));
  const descriptions = shellHeaderDescriptions();
  assert.ok(Object.keys(descriptions).length >= 40, "HEADER_DESCRIPTIONS was not parsed");
  const itemByHref = new Map(
    SIDEBAR_SECTIONS.flatMap((section) => getSectionItems(section))
      .filter((item) => !item.external)
      .map((item) => [item.href, item])
  );

  for (const [route, holder] of Object.entries(SHELL_TITLED_ROUTES)) {
    const item = itemByHref.get(route);
    assert.ok(item, `${route}: no sidebar item with this href`);
    const source = fs.readFileSync(path.join(ROOT, holder), "utf8");
    const header = source.match(/<PageHeader\b[\s\S]*?\/>/)?.[0] ?? "";
    assert.ok(header, `${holder}: no self-closing <PageHeader … />`);

    assert.equal(typeof en.sidebar[item.i18nKey], "string", `en sidebar.${item.i18nKey}`);
    assert.ok(
      header.includes(`title={tSidebar("${item.i18nKey}")}`),
      `${holder}: the PageHeader title must be sidebar.${item.i18nKey} (the shell title of ${route})`
    );

    const descriptionKey = descriptions[item.id];
    if (descriptionKey) {
      assert.equal(typeof en.header[descriptionKey], "string", `en header.${descriptionKey}`);
      assert.ok(
        header.includes(`description={tHeader("${descriptionKey}")}`),
        `${holder}: the PageHeader description must be header.${descriptionKey}`
      );
    }
  }
});
