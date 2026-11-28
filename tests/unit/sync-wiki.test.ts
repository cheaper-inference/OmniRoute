// Unit tests for the pure helpers in scripts/docs/sync-wiki.mjs (the GitHub wiki sync).
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  normKey,
  toWikiName,
  toWikiContent,
  rewriteWikiLinks,
  syncHomeCounts,
  parseWikiPage,
  WIKI_BANNER,
  NEW_PAGE_EXCLUDE,
  GITHUB_REPO_URL,
  GITHUB_RAW_URL,
} from "../../scripts/docs/sync-wiki.mjs";

test("normKey: case/separator-insensitive fuzzy key (matches docs basename to curated wiki name)", () => {
  // The wiki names are hand-curated and not deterministic — normKey is what lets us
  // match e.g. FLY_IO_DEPLOYMENT_GUIDE.md to the existing "Fly-io-Deployment-Guide" page.
  assert.equal(normKey("FLY_IO_DEPLOYMENT_GUIDE.md"), normKey("Fly-io-Deployment-Guide"));
  assert.equal(normKey("API_REFERENCE"), normKey("API-Reference"));
  assert.equal(normKey("A2A-SERVER.md"), "a2aserver");
});

test("toWikiName: acronym-aware Title-Case-dashed name for NEW pages", () => {
  assert.equal(toWikiName("SUPPLY_CHAIN.md"), "Supply-Chain");
  assert.equal(toWikiName("API_REFERENCE"), "API-Reference");
  assert.equal(toWikiName("QUOTA_SHARE"), "Quota-Share");
  assert.equal(toWikiName("ACP"), "ACP");
});

test("toWikiContent: strips YAML frontmatter and prepends the language banner", () => {
  const doc = '---\ntitle: "X"\nversion: 3.8.2\n---\n\n# Heading\n\nBody text.\n';
  const out = toWikiContent(doc);
  assert.ok(out.startsWith(WIKI_BANNER), "must start with the wiki language banner");
  assert.ok(!out.includes("version: 3.8.2"), "frontmatter must be removed");
  assert.ok(out.includes("# Heading"), "content body must be preserved");
  assert.ok(out.endsWith("Body text.\n"), "trailing newline normalized");
});

test("toWikiContent: a document without frontmatter is kept intact (plus banner)", () => {
  const doc = "# No Frontmatter\n\nHello.\n";
  const out = toWikiContent(doc);
  assert.equal(out, WIKI_BANNER + "# No Frontmatter\n\nHello.\n");
});

test("rewriteWikiLinks: converts relative doc links to curated wiki page names", () => {
  const wikiKeyMap = new Map([
    ["autocombo", "Auto-Combo"],
    ["resilienceguide", "Resilience-Guide"],
    ["mcpserver", "MCP-Server"],
  ]);

  const md = `
# Architecture

See [Auto-Combo](../routing/AUTO-COMBO.md) and [Resilience](./RESILIENCE_GUIDE.md).
With anchor: [14 Factors](../routing/AUTO-COMBO.md#14-factors).
Ref style: [MCP][mcp-ref]
HTML: <a href="../routing/AUTO-COMBO.md#strategies">Strategies</a>

[mcp-ref]: ../frameworks/MCP-SERVER.md "MCP Tools"
`;

  const out = rewriteWikiLinks(md, {
    srcFile: "docs/architecture/ARCHITECTURE.md",
    wikiKeyMap,
  });

  assert.ok(out.includes("[Auto-Combo](Auto-Combo)"));
  assert.ok(out.includes("[Resilience](Resilience-Guide)"));
  assert.ok(out.includes("[14 Factors](Auto-Combo#14-factors)"));
  assert.ok(out.includes('[mcp-ref]: MCP-Server "MCP Tools"'));
  assert.ok(out.includes('<a href="Auto-Combo#strategies">Strategies</a>'));
});

test("rewriteWikiLinks: converts repo code and root markdown links to GitHub blob URLs", () => {
  const md = `
Refer to [DB Core](../../src/lib/db/core.ts) and [README](../README.md).
Check [Package config](../../package.json) and [Auth Guard](../../src/server/authz/routeGuard.ts).
`;

  const out = rewriteWikiLinks(md, {
    srcFile: "docs/architecture/ARCHITECTURE.md",
  });

  assert.ok(out.includes(`[DB Core](${GITHUB_REPO_URL}/blob/main/src/lib/db/core.ts)`));
  assert.ok(out.includes(`[README](${GITHUB_REPO_URL}/blob/main/docs/README.md)`));
  assert.ok(out.includes(`[Package config](${GITHUB_REPO_URL}/blob/main/package.json)`));
  assert.ok(
    out.includes(`[Auth Guard](${GITHUB_REPO_URL}/blob/main/src/server/authz/routeGuard.ts)`)
  );
});

test("rewriteWikiLinks: rewrites image links to GitHub raw content URLs", () => {
  const md = `![Architecture Overview](../diagrams/exported/resilience-3layers.svg "Diagram")`;
  const out = rewriteWikiLinks(md, {
    srcFile: "docs/architecture/ARCHITECTURE.md",
  });
  assert.equal(
    out,
    `![Architecture Overview](${GITHUB_RAW_URL}/docs/diagrams/exported/resilience-3layers.svg "Diagram")`
  );
});

test("rewriteWikiLinks: preserves pure anchor links and external URLs", () => {
  const md = `[Top](#top) and [Website](https://example.com) and [Email](mailto:test@example.com)`;
  const out = rewriteWikiLinks(md, {
    srcFile: "docs/architecture/ARCHITECTURE.md",
  });
  assert.equal(out, md);
});

test("rewriteWikiLinks: prepends locale prefix for localized wiki pages", () => {
  const wikiKeyMap = new Map([["autocombo", "Auto-Combo"]]);
  const md = `[Auto-Combo](../routing/AUTO-COMBO.md#scoring)`;
  const out = rewriteWikiLinks(md, {
    srcFile: "docs/i18n/pt-BR/routing/AUTO-COMBO.md",
    wikiKeyMap,
    locale: "pt-BR",
  });
  // U+2010 HYPHEN
  assert.equal(out, "[Auto-Combo](pt-BR\u2010Auto-Combo#scoring)");
});

test("rewriteWikiLinks: links to a doc with no wiki page fall back to the GitHub blob URL", () => {
  const wikiKeyMap = new Map([
    ["freetiers", "Free-Tiers"],
    ["autocombo", "Auto-Combo"],
  ]);
  const md = `[Tiers](../reference/FREE_TIERS.md#gemini) and [Combo](../routing/AUTO-COMBO.md)`;
  const out = rewriteWikiLinks(md, {
    srcFile: "docs/architecture/ARCHITECTURE.md",
    wikiKeyMap,
    wikiPages: new Set(["Auto-Combo"]),
  });
  assert.equal(
    out,
    `[Tiers](${GITHUB_REPO_URL}/blob/main/docs/reference/FREE_TIERS.md#gemini) and [Combo](Auto-Combo)`
  );
});

test("rewriteWikiLinks: a localized link with no page in that language goes to the localized file", () => {
  const wikiKeyMap = new Map([["freetiers", "Free-Tiers"]]);
  const md = `[Tiers](../reference/FREE_TIERS.md)`;
  const out = rewriteWikiLinks(md, {
    srcFile: "docs/i18n/pt-BR/docs/routing/AUTO-COMBO.md",
    wikiKeyMap,
    locale: "pt-BR",
    wikiPages: new Set(["Free-Tiers"]),
  });
  assert.equal(
    out,
    `[Tiers](${GITHUB_REPO_URL}/blob/main/docs/i18n/pt-BR/docs/reference/FREE_TIERS.md)`
  );
});

test("rewriteWikiLinks: a link to a doc missing from both the wiki and the repo is left as is", () => {
  const md = `[Gone](./NO_SUCH_DOC.md)`;
  const out = rewriteWikiLinks(md, {
    srcFile: "docs/architecture/ARCHITECTURE.md",
    wikiPages: new Set(["Architecture"]),
  });
  assert.equal(out, md);
});

test("rewriteWikiLinks: markdownOnly refreshes .md links on published wiki text and nothing else", () => {
  const wikiKeyMap = new Map([
    ["freetiers", "Free-Tiers"],
    ["resilienceguide", "Resilience-Guide"],
  ]);
  const published = [
    "[Tiers](../reference/FREE_TIERS.md#gemini)",
    "[Resilience](Resilience-Guide)",
    "[Core](../../src/lib/db/core.ts)",
    "![Diagram](../diagrams/flow.svg)",
    `[README](${GITHUB_REPO_URL}/blob/main/README.md)`,
  ].join("\n");
  const opts = {
    srcFile: "docs/architecture/ARCHITECTURE.md",
    wikiKeyMap,
    wikiPages: new Set(["Free-Tiers", "Resilience-Guide"]),
    markdownOnly: true,
  };
  const out = rewriteWikiLinks(published, opts);
  assert.equal(out, published.replace("../reference/FREE_TIERS.md#gemini", "Free-Tiers#gemini"));
  assert.equal(rewriteWikiLinks(out, opts), out, "a second refresh changes nothing");
});

test("rewriteWikiLinks: leaves .md links inside fenced code and inline code untouched", () => {
  const md = [
    "See [Tiers](../reference/FREE_TIERS.md) and `[Tiers](../reference/FREE_TIERS.md)`.",
    "",
    "```markdown",
    "[Tiers](../reference/FREE_TIERS.md)",
    "```",
    "",
    "~~~",
    "[Tiers](../reference/FREE_TIERS.md)",
    "~~~",
    "",
    "[`FREE_TIERS`](../reference/FREE_TIERS.md)",
  ].join("\n");
  const out = rewriteWikiLinks(md, {
    srcFile: "docs/architecture/ARCHITECTURE.md",
    wikiKeyMap: new Map([["freetiers", "Free-Tiers"]]),
    wikiPages: new Set(["Free-Tiers"]),
    markdownOnly: true,
  });
  const expected = md
    .replace("See [Tiers](../reference/FREE_TIERS.md)", "See [Tiers](Free-Tiers)")
    .replace("[`FREE_TIERS`](../reference/FREE_TIERS.md)", "[`FREE_TIERS`](Free-Tiers)");
  assert.equal(out, expected);
});

test("syncHomeCounts: rewrites the cover-page provider/strategy counts", () => {
  const home =
    "Connect every AI tool to 177 providers.\n**177 AI Providers** · **14 Routing Strategies**\n";
  const out = syncHomeCounts(home, { providers: 226, strategies: 15, mcpTools: null, locales: 42 });
  assert.ok(out.includes("226 providers"));
  assert.ok(out.includes("**226 AI Providers**"));
  assert.ok(out.includes("**15 Routing Strategies**"));
  assert.ok(!out.includes("177"));
});

test("syncHomeCounts: leaves text untouched when a count is null (best-effort MCP)", () => {
  const home = "| **MCP Server** | 87 tools |\n";
  const out = syncHomeCounts(home, {
    providers: null,
    strategies: null,
    mcpTools: null,
    locales: null,
  });
  assert.equal(out, home);
});

test("parseWikiPage: splits the locale prefix (U+2010) from the page name", () => {
  assert.deepEqual(parseWikiPage("Architecture"), { locale: null, name: "Architecture" });
  // U+2010 HYPHEN separator used by the localized mirrors (e.g. "pt-BR‐Architecture").
  assert.deepEqual(parseWikiPage("pt-BR‐Architecture"), { locale: "pt-BR", name: "Architecture" });
  assert.deepEqual(parseWikiPage("phi‐API-Reference"), { locale: "phi", name: "API-Reference" });
});

test("NEW_PAGE_EXCLUDE: internal reports/plans never become public wiki pages", () => {
  assert.ok(NEW_PAGE_EXCLUDE.has("DOCUMENTATION_AUDIT_REPORT"));
  assert.ok(NEW_PAGE_EXCLUDE.has("README"));
  assert.ok(!NEW_PAGE_EXCLUDE.has("SUPPLY_CHAIN"));
});
