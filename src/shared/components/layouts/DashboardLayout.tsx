"use client";

import { TooltipProvider } from "@omniroute/ui-kit/tooltip";
import DashboardShell from "./DashboardShell";
import KitLabelsProvider from "./KitLabelsProvider";

/** Dashboard chrome: the Keak CI UI Kit shell (KEA-7886). `sidebarDefaultOpen` comes from the
 *  server layout (`ci_sidebar_state` cookie) so the first paint matches the persisted state.
 *  One kit TooltipProvider serves every kit tooltip in the dashboard (Button `title`, Tooltip,
 *  InfoTooltip): after one closes, the next opens without delay. It renders no element. */
export default function DashboardLayout({
  children,
  sidebarDefaultOpen = true,
}: {
  children: React.ReactNode;
  sidebarDefaultOpen?: boolean;
}) {
  return (
    <KitLabelsProvider>
      <TooltipProvider>
        <DashboardShell sidebarDefaultOpen={sidebarDefaultOpen}>{children}</DashboardShell>
      </TooltipProvider>
    </KitLabelsProvider>
  );
}
