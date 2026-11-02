// @vitest-environment node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * #18699: `/docs` pages never showed the translated mirror. `getDocsLocale()` called
 * `cookies()` without `await`, so on Next 16 `.get` threw, the `catch` swallowed it and the
 * locale was always the default. These tests drive the real page with a `cookies()` that is
 * async exactly like Next's, against a throwaway `docs/i18n` tree.
 */

const cookieJar = vi.hoisted(() => ({ value: undefined as string | undefined }));

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) =>
      name === "NEXT_LOCALE" && cookieJar.value !== undefined
        ? { name, value: cookieJar.value }
        : undefined,
  }),
}));

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

vi.mock("next-intl/server", () => ({ getTranslations: async () => (key: string) => key }));

vi.mock("fumadocs-ui/layouts/docs/page", () => ({
  DocsPage: ({ toc, children }: { toc: unknown; children: React.ReactNode }) => (
    <main data-toc={JSON.stringify(toc)}>{children}</main>
  ),
  DocsBody: ({ children }: { children: React.ReactNode }) => <article>{children}</article>,
}));

vi.mock("fumadocs-ui/mdx", () => ({ default: { a: (props: object) => <a {...props} /> } }));

// Hoisted above PAGES, but only read when the page calls getPage().
const englishPage = (title: string, slug: string[], toc: unknown[] = []) => ({
  file: { path: `${slug.join("/")}.md` },
  data: {
    title,
    toc,
    full: false,
    body: () => <p>English body of {title}</p>,
  },
});

const ENGLISH_TOC = [
  { title: "Step 1: Install", url: "#step-1-install", depth: 2 },
  { title: "Option A", url: "#option-a", depth: 3 },
];

const PAGES: Record<string, ReturnType<typeof englishPage>> = {
  "getting-started/QUICK-START": englishPage(
    "Quick Start",
    ["getting-started", "QUICK-START"],
    ENGLISH_TOC
  ),
  "architecture/RESILIENCE_GUIDE": englishPage("Resilience Guide", [
    "architecture",
    "RESILIENCE_GUIDE",
  ]),
  "frameworks/EVALS": englishPage("Evals", ["frameworks", "EVALS"]),
  "guides/UNMIRRORED": englishPage("Unmirrored", ["guides", "UNMIRRORED"]),
  "guides/CORRUPT": englishPage("Corrupt", ["guides", "CORRUPT"]),
  "guides/HOSTILE": englishPage("Hostile", ["guides", "HOSTILE"]),
  "guides/DRIFTED": englishPage("Drifted", ["guides", "DRIFTED"], ENGLISH_TOC),
};

vi.mock("@/lib/source", () => ({
  source: { getPage: (slug: string[]) => PAGES[slug.join("/")] ?? null },
}));

const QUICK_START_PT = [
  "# Quick Start (Português (Brasil))",
  "",
  "🌐 **Languages:** 🇺🇸 [English](../../../../getting-started/QUICK-START.md) · 🇪🇹 [am](../../../am/docs/getting-started/QUICK-START.md)",
  "",
  "---",
  "",
  "> **Resumo**: Instale e pronto.",
  "",
  "---",
  "",
  "## Etapa 1: Instale",
  "",
  "Veja o [roteamento](../routing/AUTO-COMBO.md#fatores) e o [código](../../src/lib/db/core.ts).",
  "",
  "![Pipeline](../diagrams/exported/request-pipeline.svg)",
  "",
  "### Opção A: `npm` & amigos",
  "",
  "```bash",
  "# não é um título",
  "npm install -g omniroute",
  "```",
].join("\n");

function writeMirror(root: string, locale: string, rel: string, content: string) {
  const file = path.join(root, "docs", "i18n", locale, "docs", rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

async function renderDoc(slug: string[], cookie?: string) {
  cookieJar.value = cookie;
  const { default: Page } = await import("../../src/app/docs/[...slug]/page");
  const element = await Page({ params: Promise.resolve({ slug }) });
  return renderToStaticMarkup(element);
}

const tocOf = (html: string) =>
  JSON.parse(
    (html.match(/data-toc="([^"]*)"/)?.[1] ?? "[]")
      .replaceAll("&quot;", '"')
      .replaceAll("&amp;", "&")
      .replaceAll("&#x27;", "'")
  );

describe("translated /docs pages (#18699)", () => {
  let tmpRoot: string;

  beforeAll(() => {
    tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "docs-i18n-18699-"));
    writeMirror(tmpRoot, "pt-BR", "getting-started/QUICK-START.md", QUICK_START_PT);
    writeMirror(
      tmpRoot,
      "fa",
      "getting-started/QUICK-START.md",
      "# Quick Start (فارسی)\n\n🌐 **Languages:** x\n\n---\n\n## مرحله ۱\n\nمتن فارسی\n"
    );
    writeMirror(
      tmpRoot,
      "uk-UA",
      "getting-started/QUICK-START.md",
      "# Quick Start (Українська)\n\n🌐 **Languages:** x\n\n---\n\nУкраїнський текст\n"
    );
    writeMirror(
      tmpRoot,
      "pt-BR",
      "architecture/RESILIENCE_GUIDE.md",
      "# Resilience Guide (Português (Brasil))\n\n🌐 **Languages:** x\n\n---\n\n🌐 **Idiomas:** 🇺🇸 [Inglês](../../../../architecture/RESILIENCE_GUIDE.md)\n\nGuia de resiliência\n"
    );
    writeMirror(
      tmpRoot,
      "pl",
      "frameworks/EVALS.md",
      '---\ntitle: "Ewaluacje"\nversion: 3.8.40\n---\n\n# Ewaluacje\n\nTekst po polsku\n\n---\n\nWięcej tekstu\n'
    );
    writeMirror(
      tmpRoot,
      "pt-BR",
      "guides/HOSTILE.md",
      [
        "# Hostile (Português (Brasil))",
        "",
        "🌐 **Languages:** x",
        "",
        "---",
        "",
        "Texto <script>alert(1)</script> <img src=x onerror=alert(2)>",
        "",
        '<a href="javascript:alert(3)">clique</a>',
        "",
        "[outro](javascript:alert(4))",
      ].join("\n")
    );
    writeMirror(
      tmpRoot,
      "pt-BR",
      "guides/DRIFTED.md",
      "# Drifted (Português (Brasil))\n\n🌐 **Languages:** x\n\n---\n\n## Só um título\n\ntexto\n"
    );
    // A directory where the translated file should be: reading it must not 500 the page.
    fs.mkdirSync(path.join(tmpRoot, "docs", "i18n", "pt-BR", "docs", "guides", "CORRUPT.md"), {
      recursive: true,
    });
    vi.spyOn(process, "cwd").mockReturnValue(tmpRoot);
  });

  afterAll(() => {
    vi.restoreAllMocks();
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  });

  beforeEach(() => {
    cookieJar.value = undefined;
  });

  it("serves the translated mirror for a non-default locale cookie", async () => {
    const html = await renderDoc(["getting-started", "QUICK-START"], "pt-BR");
    expect(html).toContain("Instale e pronto");
    expect(html).not.toContain("English body");
  });

  it("serves an RTL mirror", async () => {
    const html = await renderDoc(["getting-started", "QUICK-START"], "fa");
    expect(html).toContain("متن فارسی");
    expect(html).not.toContain("English body");
  });

  it("resolves a cookie alias the same way <html lang> does (uk -> uk-UA)", async () => {
    const html = await renderDoc(["getting-started", "QUICK-START"], "uk");
    expect(html).toContain("Український текст");
  });

  it("serves mirrors whose file name has an underscore", async () => {
    const html = await renderDoc(["architecture", "RESILIENCE_GUIDE"], "pt-BR");
    expect(html).toContain("Guia de resiliência");
  });

  it("drops the mirror header but keeps a page title and later horizontal rules", async () => {
    const html = await renderDoc(["getting-started", "QUICK-START"], "pt-BR");
    expect(html).toContain("<h1>Quick Start</h1>");
    expect(html).not.toContain("Languages:");
    expect(html).toContain("<hr");
  });

  it("drops the language bar a mirror inherited from its English source", async () => {
    const html = await renderDoc(["architecture", "RESILIENCE_GUIDE"], "pt-BR");
    expect(html).toContain("Guia de resiliência");
    expect(html).not.toContain("Idiomas:");
    expect(html).not.toContain("blob/main/..");
  });

  it("strips front matter from mirrors that kept it, without doubling the title", async () => {
    const html = await renderDoc(["frameworks", "EVALS"], "pl");
    expect(html).not.toContain("version: 3.8.40");
    expect(html).toContain("Tekst po polsku");
    expect(html).toContain("Więcej tekstu");
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html).toMatch(/<h1[^>]*>Ewaluacje<\/h1>/);
  });

  it("builds the table of contents from the translated headings, keeping English anchors", async () => {
    const html = await renderDoc(["getting-started", "QUICK-START"], "pt-BR");
    expect(tocOf(html)).toEqual([
      { title: "Etapa 1: Instale", url: "#step-1-install", depth: 2 },
      { title: "Opção A: npm & amigos", url: "#option-a", depth: 3 },
    ]);
    expect(html).toContain('<h2 id="step-1-install">');
    expect(html).toContain('<h3 id="option-a">');
    // The bash comment in the fenced block is not a heading.
    expect(tocOf(html)).toHaveLength(2);
  });

  it("falls back to slugs of the translated text when the heading structure drifted", async () => {
    const html = await renderDoc(["guides", "DRIFTED"], "pt-BR");
    expect(tocOf(html)).toEqual([{ title: "Só um título", url: "#só-um-título", depth: 2 }]);
    expect(html).toContain('<h2 id="só-um-título">');
  });

  it("resolves doc links and image sources in the translated body", async () => {
    const html = await renderDoc(["getting-started", "QUICK-START"], "pt-BR");
    expect(html).toContain('href="/docs/routing/AUTO-COMBO#fatores"');
    expect(html).toContain(
      'href="https://github.com/cheaper-inference/OmniRoute/blob/main/src/lib/db/core.ts"'
    );
    expect(html).toContain(
      'src="https://raw.githubusercontent.com/cheaper-inference/OmniRoute/main/docs/diagrams/exported/request-pipeline.svg"'
    );
  });

  it("prefixes internal links with the deploy base path", async () => {
    vi.stubEnv("NEXT_PUBLIC_OMNIROUTE_BASE_PATH", "/omni");
    try {
      const html = await renderDoc(["getting-started", "QUICK-START"], "pt-BR");
      expect(html).toContain('href="/omni/docs/routing/AUTO-COMBO#fatores"');
      expect(html).toContain('href="https://github.com/cheaper-inference/OmniRoute/blob/main/');
    } finally {
      vi.unstubAllEnvs();
    }
  });

  it("sanitizes the rendered mirror", async () => {
    const html = await renderDoc(["guides", "HOSTILE"], "pt-BR");
    expect(html).toContain("Texto");
    expect(html).not.toContain("<script");
    expect(html).not.toContain("onerror");
    expect(html).not.toContain("javascript:");
  });

  it("falls back to English when the cookie is missing, default or unknown", async () => {
    for (const cookie of [undefined, "en", "xx", "../../../etc", "pt-BR/../.."]) {
      const html = await renderDoc(["getting-started", "QUICK-START"], cookie);
      expect(html, `cookie=${cookie}`).toContain("English body");
    }
  });

  it("falls back to English for a page or locale with no mirror", async () => {
    expect(await renderDoc(["guides", "UNMIRRORED"], "pt-BR")).toContain("English body");
    expect(await renderDoc(["getting-started", "QUICK-START"], "de")).toContain("English body");
  });

  it("falls back to English when the mirror cannot be read", async () => {
    expect(await renderDoc(["guides", "CORRUPT"], "pt-BR")).toContain("English body");
  });

  it("returns not found for a slug that is not a published page, even with a mirror on disk", async () => {
    writeMirror(tmpRoot, "pt-BR", "security/PUBLIC_CREDS.md", "# x\n\n🌐 x\n\n---\n\nsegredo\n");
    await expect(renderDoc(["security", "PUBLIC_CREDS"], "pt-BR")).rejects.toThrow(
      "NEXT_NOT_FOUND"
    );
  });
});
