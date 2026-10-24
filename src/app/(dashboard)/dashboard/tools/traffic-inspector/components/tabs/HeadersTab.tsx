"use client";

import { useTranslations } from "next-intl";
import type { InterceptedRequest } from "@/mitm/inspector/types";
import { HeaderTable } from "../shared/HeaderTable";

interface HeadersTabProps {
  request: InterceptedRequest;
}

export function HeadersTab({ request }: HeadersTabProps) {
  const t = useTranslations("trafficInspector");
  return (
    <div className="space-y-4 overflow-auto h-full p-2">
      <section>
        <h3 className="ci-eyebrow mb-2">{t("requestHeaders")}</h3>
        <HeaderTable headers={request.requestHeaders} />
      </section>
      <section>
        <h3 className="ci-eyebrow mb-2">{t("responseHeaders")}</h3>
        <HeaderTable headers={request.responseHeaders} />
      </section>
    </div>
  );
}
