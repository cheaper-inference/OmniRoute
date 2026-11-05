"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { JsonTree as KitJsonTree, type JsonTreeProps } from "@omniroute/ui-kit/json-tree";

/**
 * The kit `JsonTree` with its labels from i18n. Long strings stay whole: payloads are read here.
 * The labels stick to namespaces of the dashboard chrome, which reaches this file through the
 * shared barrel: any other namespace would ship on every dashboard page.
 */
export default function JsonTree(props: JsonTreeProps) {
  const t = useTranslations("requestLogger.detail");
  const tCommon = useTranslations("common");
  const tInspector = useTranslations("trafficInspector");
  const tProviders = useTranslations("providers");
  const labels = useMemo(
    () => ({
      expandAll: t("expandAllLevels"),
      collapseAll: t("collapseAllLevels"),
      copyValue: t("copyTitle", { title: tInspector("value") }),
      copyPath: t("copyTitle", { title: tProviders("proxySourceKey") }),
      copiedValue: t("copied"),
      copiedPath: t("copied"),
      copyError: `${t("copy")}: ${tCommon("failed")}`,
      showMore: tCommon("loadMore"),
      redacted: tInspector("maskSecrets"),
    }),
    [t, tCommon, tInspector, tProviders]
  );

  return <KitJsonTree labels={labels} maxStringLength={Number.POSITIVE_INFINITY} {...props} />;
}
