"use client";

import { Card } from "@/shared/components";
import Icon from "@/shared/components/Icon";

/** Loading / error / empty placeholder shared by the News and Changelog viewers. */
export function ViewerStatus({
  icon,
  message,
  tone = "muted",
  busy = false,
  children,
}: {
  icon: string;
  message: React.ReactNode;
  tone?: "muted" | "error";
  busy?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Card>
      <div
        role={busy ? "status" : undefined}
        aria-live={busy ? "polite" : undefined}
        className="flex flex-col items-center justify-center gap-4 py-20 text-center text-text-muted"
      >
        <Icon
          name={icon}
          size={busy ? 32 : 48}
          className={busy ? "animate-spin" : tone === "error" ? "text-error" : "opacity-60"}
        />
        <p className="text-sm">{message}</p>
        {children}
      </div>
    </Card>
  );
}
