import { cookies, headers } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import routeNamespaces from "@/i18n/routeNamespaces.generated.json";
import { normalizeComplianceEventTypes } from "@/i18n/request";
import { pickMessages } from "@/i18n/pickMessages";
import { resolveDashboardLocalAccess } from "@/lib/security/dashboardLocalAccess";
import { DashboardLayout } from "@/shared/components";
import { LocalOnlyAccessProvider } from "@/shared/hooks/useLocalOnlyAccess";

/**
 * Dashboard chrome i18n provider — serves only the namespaces the shared
 * shell (Header, Sidebar, CommandPalette, …) uses. Each dashboard section
 * re-scopes the catalog again with its own SectionI18nProvider layout
 * (generated — see scripts/i18n/generate-route-namespaces.mjs).
 *
 * The kit sidebar's collapsed state comes from its `ci_sidebar_state` cookie,
 * read here on the server, so the first paint already matches the persisted state.
 *
 * The same request also says whether the session is local or remote (the authz pipeline's
 * trusted peer-locality stamp), so pages know before their first request which local-only
 * features to replace with a notice (`useLocalOnlyBlocked`).
 */
export default async function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  const messages = normalizeComplianceEventTypes(
    pickMessages((await getMessages()) as Record<string, unknown>, routeNamespaces.chrome)
  );
  const sidebarDefaultOpen = (await cookies()).get("ci_sidebar_state")?.value !== "0";
  const localOnlyAccess = resolveDashboardLocalAccess(await headers());
  return (
    <NextIntlClientProvider messages={messages}>
      <LocalOnlyAccessProvider value={localOnlyAccess}>
        <DashboardLayout sidebarDefaultOpen={sidebarDefaultOpen}>{children}</DashboardLayout>
      </LocalOnlyAccessProvider>
    </NextIntlClientProvider>
  );
}
