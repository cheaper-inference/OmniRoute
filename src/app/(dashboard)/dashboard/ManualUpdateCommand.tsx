"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import { copyToClipboard } from "@/shared/utils/clipboard";

/**
 * Copyable host command for installs the dashboard cannot update in place (a published Docker
 * image without `DOCKER_UPDATE_TRIGGER_FILE`). The command comes from `/api/system/version`.
 */
export default function ManualUpdateCommand({ command }: { command: string }) {
  const tc = useTranslations("common");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!(await copyToClipboard(command))) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-2 flex min-w-0 items-center gap-2">
      <code className="min-w-0 break-all rounded bg-surface-2 px-2 py-1 font-mono text-[11px]">
        {command}
      </code>
      <Button
        variant="ghost"
        size="sm"
        icon={copied ? "check" : "content_copy"}
        onClick={handleCopy}
        className="shrink-0 text-xs"
      >
        {copied ? tc("copied") : tc("copy")}
      </Button>
    </div>
  );
}
