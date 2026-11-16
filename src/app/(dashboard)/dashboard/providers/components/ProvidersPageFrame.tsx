"use client";

import { Suspense, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";

/**
 * Title of /dashboard/providers above the page content: the same title and description the
 * shell top bar shows for the route (hidden below 1024 px). It lives here, not in page.tsx
 * (whose size is frozen by tests/unit/deprecated-provider-banner-13067.test.ts), and outside
 * the Suspense boundary, so the title is on screen while the page reads its search params.
 */
export default function ProvidersPageFrame({ children }: { children: ReactNode }) {
  const tSidebar = useTranslations("sidebar");
  const tHeader = useTranslations("header");
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        compact
        title={tSidebar("providers")}
        description={tHeader("providerDescription")}
      />
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
}
