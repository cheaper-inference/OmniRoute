"use client";

import Icon from "@/shared/components/Icon";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Card } from "@/shared/components";
import { useServiceStatus } from "../hooks/useServiceStatus";

const NAME = "9router";

/**
 * G-10: iframe points to our reverse proxy, NOT directly to 127.0.0.1:port.
 * CSP exception (`frame-ancestors 'self'`) is applied to this proxy path in next.config.mjs.
 */
export function NinerouterEmbedFrame() {
  const t = useTranslations("embeddedServices");
  const { data } = useServiceStatus(NAME);
  const [expanded, setExpanded] = useState(false);

  const isRunning = data?.state === "running";

  if (!isRunning) return null;

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="flex items-center justify-between gap-2 px-4 py-2">
        <div className="flex min-w-0 items-center gap-2 text-sm font-medium">
          <Icon name="web" size={16} className="text-text-muted" />
          {t("webUi")}
          <a
            href="/dashboard/providers/services/9router/embed/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-normal text-primary hover:underline"
          >
            {t("openNewTab")}
          </a>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          icon={expanded ? "expand_less" : "expand_more"}
          aria-label={t("webUi")}
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
        />
      </div>

      {expanded && (
        <iframe
          src="/dashboard/providers/services/9router/embed/"
          title={t("webUi")}
          className="h-[600px] w-full border-t border-border"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      )}
    </Card>
  );
}
