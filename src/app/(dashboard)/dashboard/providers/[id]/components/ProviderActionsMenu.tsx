"use client";
import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Popover, PopoverContent, PopoverTrigger } from "@omniroute/ui-kit/popover";
import { Button } from "@/shared/components";
import { providerText } from "../providerPageHelpers";

export default function ProviderActionsMenu({
  children,
  enabled = true,
}: {
  children: ReactNode;
  enabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("providers");
  const label = providerText(t, "itemActions", "Actions");
  if (!enabled) return <>{children}</>;
  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setMounted(true);
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon-sm" icon="more_vert" aria-label={label} title={label} />
      </PopoverTrigger>
      {mounted && (
        <PopoverContent
          forceMount
          hidden={!open}
          align="end"
          aria-label={label}
          style={{ display: open ? undefined : "none" }}
          className={`z-50 max-h-[min(32rem,80dvh)] w-72 max-w-[calc(100vw-2rem)] overflow-y-auto p-2 [&_button]:w-full [&_button]:justify-start [&_button]:min-h-9 [&_button]:text-sm [&_button]:text-left [&_button]:gap-2 [&_button_span.hidden]:inline`}
        >
          {children}
        </PopoverContent>
      )}
    </Popover>
  );
}
