"use client";

import { Card } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import { Spinner } from "@/shared/components/Loading";

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
        {busy ? (
          <Spinner decorative size="lg" />
        ) : (
          <Icon name={icon} size={48} className={tone === "error" ? "text-error" : "opacity-60"} />
        )}
        <p className="text-sm">{message}</p>
        {children}
      </div>
    </Card>
  );
}
