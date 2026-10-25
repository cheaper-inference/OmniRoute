"use client";

import { Suspense, useEffect, useInsertionEffect, useState } from "react";
import { Sidebar as KitSidebar, SidebarInset, SidebarProvider } from "@omniroute/ui-kit/sidebar";
import Sidebar, { useSidebarSide } from "../Sidebar";
import Header from "../Header";
import NotificationToast from "../NotificationToast";
import Breadcrumbs from "../Breadcrumbs";
import MaintenanceBanner from "../MaintenanceBanner";
import CommandPalette from "../CommandPalette";
import NavigationProgress from "../NavigationProgress";
import { useIsElectron } from "@/shared/hooks/useElectron";
import {
  installDashboardCsrfFetch,
  prefetchDashboardCsrfToken,
} from "@/shared/utils/dashboardCsrf";
import { installBasePathFetch } from "@/shared/utils/basePathFetch";
import { useTranslations } from "next-intl";

const isE2EMode = process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE === "1";

/**
 * Below this width the kit Sidebar becomes a Sheet (mobile drawer). 1024px keeps the legacy `lg`
 * drawer breakpoint and matches the Header, whose page title appears from `lg` up.
 */
const SIDEBAR_MOBILE_BREAKPOINT = 1024;

export default function DashboardShell({
  children,
  sidebarDefaultOpen = true,
}: {
  children: React.ReactNode;
  sidebarDefaultOpen?: boolean;
}) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const isElectron = useIsElectron();
  const t = useTranslations("sidebar");
  const isMacElectron =
    isElectron &&
    typeof globalThis.window !== "undefined" &&
    globalThis.electronAPI?.platform === "darwin";

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("electron-macos", isMacElectron);
    return () => {
      document.body.classList.remove("electron-macos");
    };
  }, [isMacElectron]);

  useInsertionEffect(() => {
    // basePath rewrite must wrap native fetch first so CSRF's originalFetch
    // chain (and bare `fetch("/api/...")` call sites) hit the subpath.
    const uninstallBasePathFetch = installBasePathFetch();
    const uninstallDashboardCsrfFetch = installDashboardCsrfFetch();
    void prefetchDashboardCsrfToken();
    return () => {
      uninstallDashboardCsrfFetch();
      uninstallBasePathFetch();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <SidebarProvider
      defaultOpen={sidebarDefaultOpen}
      mobileBreakpoint={SIDEBAR_MOBILE_BREAKPOINT}
      className="h-dvh min-h-0 w-full overflow-hidden border-t-0"
    >
      <Suspense fallback={null}>
        <NavigationProgress />
      </Suspense>
      {/* Skip link before the sidebar: below the mobile breakpoint the sidebar is only a closed
          Sheet, so a link inside it would not exist. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-3 focus:bg-primary focus:text-accent-foreground focus:rounded-md focus:m-2"
      >
        {t("skipToContent")}
      </a>
      {/* `rtl:order-none` cancels the kit's physical `[data-side="right"] { order: 2 }`, which in
          an RTL flex row would lay the aside out on the visual left (tests/e2e/sidebar-rtl.spec.ts). */}
      <KitSidebar
        className="rtl:order-none"
        collapsible="icon"
        side={useSidebarSide()}
        mobileLabel={t("mainNavigation")}
        style={{ paddingTop: isMacElectron ? "var(--desktop-safe-top)" : undefined }}
      >
        <Sidebar isMacElectron={isMacElectron} />
      </KitSidebar>
      <SidebarInset
        id="main-content"
        className="relative flex min-h-0 flex-1 min-w-0 flex-col overflow-hidden"
      >
        {/* Inside the SidebarProvider: the Header's SidebarTrigger is the shell's single sidebar
            toggle (collapse on desktop, opens the Sheet on mobile). */}
        <Header onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
        {!isE2EMode && <MaintenanceBanner />}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar p-4 sm:p-6 lg:p-10">
          {/* Fluid up to a 4K cap (3840px), centred beyond it. */}
          <div className="max-w-[3840px] mx-auto w-full h-full min-h-0 flex flex-col">
            <Breadcrumbs />
            <div className="flex-1 min-h-0">{children}</div>
          </div>
        </div>
      </SidebarInset>

      {/* Global notification toast system */}
      <NotificationToast />

      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
    </SidebarProvider>
  );
}
