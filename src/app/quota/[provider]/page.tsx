import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { resolveQuotaPanelPage } from "@/server/selfService/panelRoute";

import QuotaSelfClient from "./QuotaSelfClient";

/**
 * Public self-service quota page (outside the dashboard auth gate), off unless the
 * `QUOTA_SELF_PANEL` flag is on. `src/proxy.ts` already answers 404 for a missing page; the same
 * decision repeats here as a second barrier. Everything else depends on the API key, which only
 * exists in the browser, so the server only hands the canonical provider to the client.
 */
export const dynamic = "force-dynamic";

type QuotaSelfPageProps = { params: Promise<{ provider: string }> };

export async function generateMetadata({ params }: QuotaSelfPageProps): Promise<Metadata> {
  const page = resolveQuotaPanelPage((await params).provider);
  if (!page) return {};
  const t = await getTranslations("quotaSelf");
  return {
    title: t("metaTitle", { provider: page.providerName }),
    robots: { index: false, follow: false },
    referrer: "no-referrer",
  };
}

export default async function QuotaSelfPage({ params }: QuotaSelfPageProps) {
  const page = resolveQuotaPanelPage((await params).provider);
  if (!page) notFound();
  return <QuotaSelfClient provider={page.provider} providerName={page.providerName} />;
}
