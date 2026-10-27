"use client";

import { useTranslations } from "next-intl";

/**
 * TokenHealthBadge — Batch G
 *
 * Small badge in the Header showing token health status.
 * Polls /api/token-health every 60s. The detail panel is the kit Popover (hover, click,
 * Escape and focus return come from Radix).
 */

import { useState, useEffect, useRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@omniroute/ui-kit/popover";
import Badge from "./Badge";
import Button from "./Button";
import Icon from "./Icon";

// Semantic text tones (kit tokens through the @theme bridge) — theme-aware in the header.
const STATUS_MAP = {
  healthy: {
    icon: "check_circle",
    tone: "text-success",
    badge: "success",
    tooltipKey: "allHealthy",
  },
  warning: {
    icon: "warning",
    tone: "text-warning",
    badge: "warning",
    tooltipKey: "needsAttention",
  },
  error: { icon: "error", tone: "text-error", badge: "error", tooltipKey: "refreshFailures" },
  unknown: { icon: "help", tone: "text-text-muted", badge: "default", tooltipKey: "unknown" },
} as const;

export default function TokenHealthBadge() {
  const t = useTranslations("stats");
  const [health, setHealth] = useState(null);
  const [open, setOpen] = useState(false);
  // A hover-opened panel is a passive summary: it must not take focus (the badge sits in every
  // dashboard header, next to inputs) and it closes when the pointer leaves. A click "pins" it
  // open instead of toggling the hover-opened panel shut.
  const openedByHover = useRef(false);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch("/api/token-health");
        if (res.ok) {
          const data = await res.json();
          setHealth(data);
        }
      } catch {
        // silent
      }
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!health || health.total === 0) return null;

  const status = STATUS_MAP[health.status] || STATUS_MAP.unknown;
  const label = t(`tokenHealthTooltips.${status.tooltipKey}`);

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        if (!next) openedByHover.current = false;
        setOpen(next);
      }}
    >
      <PopoverTrigger
        asChild
        onMouseEnter={() => {
          if (open) return;
          openedByHover.current = true;
          setOpen(true);
        }}
        onMouseLeave={() => {
          if (!openedByHover.current) return;
          openedByHover.current = false;
          setOpen(false);
        }}
        onClick={(event) => {
          // Radix skips its toggle when the click is default-prevented: pin the hover panel.
          if (openedByHover.current) {
            event.preventDefault();
            openedByHover.current = false;
          }
        }}
      >
        <Button variant="ghost" size="sm" className="gap-1 px-2" title={label} aria-label={label}>
          <Icon name={status.icon} size={18} className={status.tone} />
          {health.errored > 0 && (
            <Badge variant={status.badge} size="sm">
              {health.errored}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="min-w-[200px] p-3"
        onOpenAutoFocus={(event) => {
          if (openedByHover.current) event.preventDefault();
        }}
        onCloseAutoFocus={(event) => {
          // Closing never yanks focus to the trigger when the user's focus is elsewhere.
          if (document.activeElement && document.activeElement !== document.body) {
            event.preventDefault();
          }
        }}
      >
        <p className="text-xs font-medium text-text-main mb-2">{t("tokenHealth")}</p>
        <dl className="flex flex-col gap-1 text-xs">
          <div className="flex justify-between">
            <dt className="text-text-muted">{t("totalOAuth")}</dt>
            <dd className="text-text-main">{health.total}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-success">{t("healthy")}</dt>
            <dd className="text-text-main">{health.healthy}</dd>
          </div>
          {health.errored > 0 && (
            <div className="flex justify-between">
              <dt className="text-error">{t("errored")}</dt>
              <dd className="text-text-main">{health.errored}</dd>
            </div>
          )}
          {health.warning > 0 && (
            <div className="flex justify-between">
              <dt className="text-warning">{t("warning")}</dt>
              <dd className="text-text-main">{health.warning}</dd>
            </div>
          )}
          {health.lastCheckAt && (
            <div className="flex justify-between mt-1 pt-1 border-t border-border">
              <dt className="text-text-muted">{t("lastCheck")}</dt>
              <dd className="text-text-muted">
                {new Date(health.lastCheckAt).toLocaleTimeString()}
              </dd>
            </div>
          )}
        </dl>
      </PopoverContent>
    </Popover>
  );
}
