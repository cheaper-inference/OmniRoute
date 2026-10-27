"use client";

import DashboardShell from "./DashboardShell";

/** Dashboard chrome: the Keak CI UI Kit shell (KEA-7886). `sidebarDefaultOpen` comes from the
 *  server layout (`ci_sidebar_state` cookie) so the first paint matches the persisted state. */
export default function DashboardLayout({
  children,
  sidebarDefaultOpen = true,
}: {
  children: React.ReactNode;
  sidebarDefaultOpen?: boolean;
}) {
  return <DashboardShell sidebarDefaultOpen={sidebarDefaultOpen}>{children}</DashboardShell>;
}
