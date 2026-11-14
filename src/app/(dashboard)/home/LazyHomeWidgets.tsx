"use client";

import dynamic from "next/dynamic";

export const LazyHomeUsageWidgets = dynamic(() => import("./HomeUsageWidgets"), { ssr: false });

export const LazyProviderQuotaWidget = dynamic(() => import("./ProviderQuotaWidget"), {
  ssr: false,
});
