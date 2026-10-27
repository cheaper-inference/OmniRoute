import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import routeNamespaces from "@/i18n/routeNamespaces.generated.json";
import { normalizeComplianceEventTypes } from "@/i18n/request";
import { pickMessages } from "@/i18n/pickMessages";
import { DashboardLayout } from "@/shared/components";

/**
 * Dashboard chrome i18n provider — serves only the namespaces the shared
 * shell (Header, Sidebar, CommandPalette, …) uses. Each dashboard section
 * re-scopes the catalog again with its own SectionI18nProvider layout
 * (generated — see scripts/i18n/generate-route-namespaces.mjs).
 *
 * The kit sidebar's collapsed state comes from its `ci_sidebar_state` cookie,
 * read here on the server, so the first paint already matches the persisted state.
 */
export default async function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  const messages = normalizeComplianceEventTypes(
    pickMessages((await getMessages()) as Record<string, unknown>, routeNamespaces.chrome)
  );
  const sidebarDefaultOpen = (await cookies()).get("ci_sidebar_state")?.value !== "0";
  return (
    <NextIntlClientProvider messages={messages}>
      <DashboardLayout sidebarDefaultOpen={sidebarDefaultOpen}>{children}</DashboardLayout>
    </NextIntlClientProvider>
  );
}
