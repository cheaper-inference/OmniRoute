"use client";

import { useMemo, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import {
  TableScrollAreaLabelsProvider,
  type TableScrollAreaLabels,
} from "@omniroute/ui-kit/table-scroll-area";

/**
 * Kit texts the dashboard sets once for every screen instead of prop by prop. Today that is the
 * sentence the kit builds around a table's `scrollbarLabel` to name its persistent scrollbar
 * (English "Top … horizontal scrollbar" by default). A `labels` prop on a table still wins.
 *
 * Mounted above the shell (DashboardLayout), inside the chrome NextIntlClientProvider: `common`
 * is one of the chrome namespaces, so the message is there on every dashboard route.
 */
export default function KitLabelsProvider({ children }: { children: ReactNode }) {
  const t = useTranslations("common");
  const tableLabels = useMemo<TableScrollAreaLabels>(
    () => ({ scrollbar: (name) => t("tableScrollbarLabel", { name }) }),
    [t]
  );
  return (
    <TableScrollAreaLabelsProvider labels={tableLabels}>{children}</TableScrollAreaLabelsProvider>
  );
}
