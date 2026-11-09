"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import { cn } from "@/shared/utils/cn";

const LS_KEY = "omniroute:concept-batch-collapsed";

interface Props {
  className?: string;
}

export default function BatchConceptCard({ className = "" }: Props) {
  const t = useTranslations("common");
  // Default: expanded (collapsed=false) on first visit
  const [collapsed, setCollapsed] = useState(false);

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (stored !== null) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage hydration, runs once
        setCollapsed(stored === "true");
      }
    } catch {
      // localStorage unavailable (SSR/private mode) — keep default
    }
  }, []);

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    try {
      localStorage.setItem(LS_KEY, String(next));
    } catch {
      // ignore
    }
  };

  return (
    <Card padding="sm" className={cn("flex flex-col gap-3", className)}>
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Icon name="info" size={20} className="text-accent" />
          <span className="font-semibold text-sm text-text-main">{t("batchConceptTitle")}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggle}
          className="gap-1 text-xs text-text-muted hover:text-text-main"
          aria-expanded={!collapsed}
        >
          {t("batchConceptHowItWorks")}
          <Icon name={collapsed ? "expand_more" : "expand_less"} size={14} />
        </Button>
      </div>

      {/* Subtitle — always visible */}
      <p className="text-sm text-text-muted">{t("batchConceptSubtitle")}</p>

      {/* Expandable bullets — keys from §3.5 */}
      {!collapsed && (
        <ul className="flex flex-col gap-2 pl-1">
          <li className="flex items-start gap-2 text-sm text-text-muted">
            <Icon name="savings" size={16} className="text-success mt-0.5" />
            <span>{t("batchConceptBenefit50pct")}</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-text-muted">
            <Icon name="schedule" size={16} className="text-info mt-0.5" />
            <span>{t("batchConceptAsync24h")}</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-text-muted">
            <Icon name="task_alt" size={16} className="text-primary mt-0.5" />
            <span>{t("batchConceptUseCases")}</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-text-muted">
            <Icon name="timer" size={16} className="text-warning mt-0.5" />
            <span>{t("batchConceptRetentionNote")}</span>
          </li>
        </ul>
      )}
    </Card>
  );
}
