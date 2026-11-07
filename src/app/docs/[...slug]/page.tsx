import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_ALIASES, LOCALE_COOKIE, LOCALES } from "@/i18n/config";
import { resolveRequestedLocale } from "@/i18n/resolveRequestedLocale";
import { loadTranslatedDoc } from "@/lib/docsI18nRender";
import { resolveDocHref } from "@/lib/docsLinkResolver";
import { createLogger } from "@/shared/utils/logger";
import { getTranslations } from "next-intl/server";

const log = createLogger("docs/page");

// ── Locale detection ────────────────────────────────────────────────────────

async function getDocsLocale(): Promise<string> {
  try {
    const cookieStore = await cookies();
    // Same resolution as src/i18n/request.ts, so the article matches <html lang>.
    return resolveRequestedLocale(
      cookieStore.get(LOCALE_COOKIE)?.value ?? "",
      LOCALES,
      LOCALE_ALIASES,
      DEFAULT_LOCALE
    );
  } catch (err) {
    log.warn({ err }, "Could not read the locale cookie; serving the default locale");
    return DEFAULT_LOCALE;
  }
}

// ── Page component ──────────────────────────────────────────────────────────

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params;
  const { source } = await import("../../../lib/source");
  const [{ DocsPage, DocsBody }, { default: defaultMdxComponents }] = await Promise.all([
    import("fumadocs-ui/layouts/docs/page"),
    import("fumadocs-ui/mdx"),
  ]);
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const locale = await getDocsLocale();
  const translated = await loadTranslatedDoc(params.slug, locale, page.data.toc);

  if (translated) {
    // Render translated markdown (non-English locale with available translation)
    return (
      <DocsPage toc={translated.toc} full={page.data.full}>
        <DocsBody>
          {!translated.hasOwnTitle && <h1>{page.data.title}</h1>}
          <div className="prose-content" dangerouslySetInnerHTML={{ __html: translated.html }} />
        </DocsBody>
      </DocsPage>
    );
  }

  // Default: English MDX rendered natively by Fumadocs with resolved links
  const MDX = page.data.body;
  const docPath = page.file?.path || `${params.slug.join("/")}.md`;
  const DocsLink = (linkProps: React.ComponentProps<typeof defaultMdxComponents.a>) => {
    const resolved = linkProps.href ? resolveDocHref(linkProps.href, docPath) : linkProps.href;
    return <defaultMdxComponents.a {...linkProps} href={resolved} />;
  };

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents, a: DocsLink }} />
      </DocsBody>
    </DocsPage>
  );
}

// ── Runtime metadata ───────────────────────────────────────────────────────

// Keep the docs route dynamic. Fumadocs' generated source includes build-only
// metadata that Next's Bun page-data workers cannot reliably traverse during
// generateStaticParams; rendering on request preserves the docs while keeping
// the production build Bun-compatible.
export const dynamic = "force-dynamic";

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { source } = await import("../../../lib/source");
  const page = source.getPage(params.slug);
  if (!page) return {};
  const t = await getTranslations("docs");

  return {
    title: t("pageMetadataTitle", { title: page.data.title }),
    description: page.data.description ?? t("pageMetadataDescription", { title: page.data.title }),
  };
}
