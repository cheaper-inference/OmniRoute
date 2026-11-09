import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loader } from "fumadocs-core/source";
import { globSync } from "tinyglobby";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../..");
const CONFIG_PATH = path.join(REPO_ROOT, "source.config.ts");
const DOCS_META_PATH = path.join(REPO_ROOT, "docs/meta.json");

function readConfiguredGlobs(): string[] {
  const src = fs.readFileSync(CONFIG_PATH, "utf-8");
  const block = src.match(/files\s*:\s*\[([\s\S]*?)\]/);
  assert.ok(block, "source.config.ts must declare files: [...]");
  const globs = [...block[1].matchAll(/["'`]([^"'`]+)["'`]/g)].map((m) => m[1]);
  assert.ok(globs.length > 0, "source.config.ts must declare at least one glob");
  return globs;
}

test("source.config.ts compiles all documentation sections declared in docs/meta.json", () => {
  const meta = JSON.parse(fs.readFileSync(DOCS_META_PATH, "utf-8")) as {
    pages: string[];
  };
  const globs = readConfiguredGlobs();
  const compiledTopDirs = new Set(
    globs.filter((g) => !g.startsWith("!")).map((g) => g.replace(/^\.\//, "").split("/")[0])
  );

  for (const section of meta.pages) {
    assert.ok(
      compiledTopDirs.has(section),
      `docs/meta.json section "${section}" must be included in source.config.ts compiled globs`
    );
  }
});

test("featured documentation links on docs home point to compiled routes", () => {
  const globs = readConfiguredGlobs();
  const compiledTopDirs = new Set(
    globs.filter((g) => !g.startsWith("!")).map((g) => g.replace(/^\.\//, "").split("/")[0])
  );

  const home = fs.readFileSync(path.join(REPO_ROOT, "src/app/docs/page.tsx"), "utf-8");
  const featuredLinks = [...home.matchAll(/href:\s*["'](\/docs\/[^"']+)["']/g)].map(
    (match) => match[1]
  );
  assert.ok(featuredLinks.length > 0, "docs home must expose featured documentation links");

  for (const link of featuredLinks) {
    const segments = link.replace(/^\/docs\//, "").split("/");
    const section = segments[0];
    const fileSlug = segments[1];

    assert.ok(
      compiledTopDirs.has(section),
      `Section "${section}" for link "${link}" must be compiled in source.config.ts`
    );

    // Verify the underlying markdown file exists
    const dir = path.join(REPO_ROOT, "docs", section);
    const files = fs.readdirSync(dir);
    const matched = files.find(
      (f) => f.toLowerCase().replace(/\.md$/, "") === fileSlug.toLowerCase()
    );
    assert.ok(matched, `Markdown file for "${link}" must exist in docs/${section}`);
  }
});

test("featured links resolve through the real Fumadocs slug lookup", () => {
  const home = fs.readFileSync(path.join(REPO_ROOT, "src/app/docs/page.tsx"), "utf-8");
  const links = [...home.matchAll(/href:\s*["'](\/docs\/[^"']+)["']/g)].map((match) => match[1]);
  const source = loader({
    baseUrl: "/docs",
    source: {
      files: globSync(readConfiguredGlobs(), {
        cwd: path.join(REPO_ROOT, "docs"),
        onlyFiles: true,
      }).map((file) => ({ type: "page" as const, path: file, data: { title: file } })),
    },
  });
  assert.ok(links.length > 0);
  for (const link of links) {
    assert.ok(source.getPage(link.slice("/docs/".length).split("/")), `${link} must resolve`);
  }
});

test("every compiled markdown document in source.config.ts has valid frontmatter with a title", () => {
  const globs = readConfiguredGlobs();
  for (const g of globs) {
    if (g.startsWith("!")) continue;
    const cleaned = g.replace(/^\.\//, "");
    const topDir = cleaned.split("/**")[0];
    const dirPath = path.join(REPO_ROOT, "docs", topDir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath, { recursive: true }) as string[];
    for (const f of files) {
      if (typeof f === "string" && f.endsWith(".md")) {
        const fullPath = path.join(dirPath, f);
        const relativePath = path
          .relative(path.join(REPO_ROOT, "docs"), fullPath)
          .split(path.sep)
          .join("/");
        if (
          globs.some(
            (glob) =>
              glob.startsWith("!") &&
              path.matchesGlob(relativePath, glob.slice(1).replace(/^\.\//, ""))
          )
        )
          continue;
        if (!fs.statSync(fullPath).isFile()) continue;
        const text = fs.readFileSync(fullPath, "utf-8");
        assert.ok(text.startsWith("---"), `${fullPath} must have frontmatter starting with '---'`);
        const end = text.indexOf("\n---", 3);
        assert.ok(end !== -1, `${fullPath} must have closed frontmatter`);
        const frontmatter = text.slice(3, end);
        assert.match(
          frontmatter,
          /^\s*title\s*:\s*.+$/m,
          `${fullPath} must have a non-empty title in frontmatter`
        );
      }
    }
  }
});

for (const document of ["getting-started/FREE-TIERS-GUIDE.md", "providers/CHATPLAYGROUND.md"]) {
  test(`newly compiled ${document} supplies the required frontmatter title`, () => {
    const text = fs.readFileSync(path.join(REPO_ROOT, "docs", document), "utf-8");
    assert.match(text, /^---\r?\n[\s\S]*?^title:\s*\S.+[\s\S]*?^---/m);
  });
}
