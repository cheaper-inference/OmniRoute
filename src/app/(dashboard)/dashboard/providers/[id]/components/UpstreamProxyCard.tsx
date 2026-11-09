"use client";

import Icon from "@/shared/components/Icon";

// Phase 1t.7 extraction — Issue #3501
import Link from "next/link";
import { buttonVariants } from "@omniroute/ui-kit/button";
import { Card } from "@/shared/components";
import { providerText } from "../providerPageHelpers";
import type { ProviderMessageTranslator } from "../providerPageHelpers";

interface UpstreamProxyCardProps {
  t: ProviderMessageTranslator;
}

export default function UpstreamProxyCard({ t }: UpstreamProxyCardProps) {
  return (
    <Card>
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-lg font-semibold">
            {providerText(t, "upstreamProxyManagedTitle", "Managed via Upstream Proxy Settings")}
          </h2>
          <p className="text-sm text-text-muted mt-1">
            {providerText(
              t,
              "upstreamProxyManagedDescription",
              "CLIProxyAPI is configured as an upstream proxy layer, not as a direct provider connection. Manage the binary/runtime in CLI Tools and enable proxy routing on each provider via the provider proxy controls."
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/dashboard/cli-code" className={buttonVariants({ variant: "outline" })}>
            <Icon name="terminal" size={16} />
            {t("openCliTools")}
          </Link>
          <Link href="/dashboard/settings" className={buttonVariants({ variant: "outline" })}>
            <Icon name="settings" size={16} />
            {t("openSettings")}
          </Link>
        </div>
      </div>
    </Card>
  );
}
