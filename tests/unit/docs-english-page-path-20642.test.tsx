// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { beforeAll, describe, expect, it, vi } from "vitest";

/**
 * #20642: the English `/docs` page resolved its relative links against `page.file?.path`, a
 * property the fumadocs 16 page type does not have, so it always fell back to
 * `${slug.join("/")}.md`. That equals the real file only when the slugs spell the file path; an
 * `index.md` page (slugs drop the `index` segment) resolved every relative link one directory too
 * high. These tests build the docs source with the real fumadocs `loader()`, so the page objects
 * have exactly the shape the route sees in production.
 */

vi.mock("next/headers", () => ({
  cookies: async () => ({ get: () => undefined }),
}));

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

vi.mock("next-intl/server", () => ({ getTranslations: async () => (key: string) => key }));

vi.mock("fumadocs-ui/layouts/docs/page", () => ({
  DocsPage: ({ children }: { children: React.ReactNode }) => <main>{children}</main>,
  DocsBody: ({ children }: { children: React.ReactNode }) => <article>{children}</article>,
}));

vi.mock("fumadocs-ui/mdx", () => ({ default: { a: (props: object) => <a {...props} /> } }));

vi.mock("@/lib/source", async () => {
  const { loader } = await import("fumadocs-core/source");
  type LinkComponent = (props: { href: string; children: React.ReactNode }) => React.ReactNode;
  // An MDX body that renders the given hrefs through the page's `a` component, as compiled MDX does.
  const body = (hrefs: string[]) => {
    function MdxBody({ components }: { components: { a: LinkComponent } }) {
      const A = components.a;
      return (
        <p>
          {hrefs.map((href) => (
            <A key={href} href={href}>
              {href}
            </A>
          ))}
        </p>
      );
    }
    return MdxBody;
  };
  const page = (path: string, hrefs: string[]) => ({
    type: "page" as const,
    path,
    data: { title: path, toc: [], full: false, body: body(hrefs) },
  });
  return {
    source: loader({
      baseUrl: "/docs",
      source: {
        files: [
          page("routing/index.md", ["./AUTO-COMBO.md#factors", "../../src/lib/db/core.ts"]),
          page("routing/AUTO-COMBO.md", []),
          page("getting-started/QUICK-START.md", [
            "../routing/AUTO-COMBO.md",
            "./INSTALL.md",
            "../diagrams/exported/flow.svg",
          ]),
          page("getting-started/INSTALL.md", []),
        ],
      },
    }),
  };
});

async function renderDoc(slug: string[]) {
  const { default: Page } = await import("../../src/app/docs/[...slug]/page");
  const element = await Page({ params: Promise.resolve({ slug }) });
  return renderToStaticMarkup(element);
}

const hrefsOf = (html: string) => [...html.matchAll(/href="([^"]*)"/g)].map((m) => m[1]);

const BLOB = "https://github.com/cheaper-inference/OmniRoute/blob/main";

describe("English /docs page document path (#20642)", () => {
  beforeAll(async () => {
    await import("../../src/app/docs/[...slug]/page");
  }, 180_000);

  it("the fumadocs 16 page has `path` and no `file` — the shape the route must read", async () => {
    const { source } = await import("@/lib/source");
    const page = source.getPage(["routing"]);
    expect(page?.path).toBe("routing/index.md");
    expect(page).not.toHaveProperty("file");
  });

  it("resolves relative links of an index page against its own directory", async () => {
    const html = await renderDoc(["routing"]);
    expect(hrefsOf(html)).toEqual([
      "/docs/routing/AUTO-COMBO#factors",
      `${BLOB}/src/lib/db/core.ts`,
    ]);
  });

  it("resolves relative links of a mixed-case page against its real file path", async () => {
    const html = await renderDoc(["getting-started", "QUICK-START"]);
    expect(hrefsOf(html)).toEqual([
      "/docs/routing/AUTO-COMBO",
      "/docs/getting-started/INSTALL",
      `${BLOB}/docs/diagrams/exported/flow.svg`,
    ]);
  });
});
