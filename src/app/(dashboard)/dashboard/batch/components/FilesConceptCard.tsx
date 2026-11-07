"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import { cn } from "@/shared/utils/cn";

const LS_KEY = "omniroute:concept-files-collapsed";

interface Props {
  className?: string;
}

const TYPE_PILLS: Array<{
  key: "filesConceptInput" | "filesConceptOutput" | "filesConceptError";
  tone: "info" | "success" | "error";
}> = [
  { key: "filesConceptInput", tone: "info" },
  { key: "filesConceptOutput", tone: "success" },
  { key: "filesConceptError", tone: "error" },
];

export default function FilesConceptCard({ className = "" }: Props) {
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
      // localStorage unavailable — keep default
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
          <span className="font-semibold text-sm text-text-main">{t("filesConceptTitle")}</span>
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
      <p className="text-sm text-text-muted">{t("filesConceptSubtitle")}</p>

      {/* 3 type pills — always visible */}
      <div className="flex flex-wrap gap-2">
        {TYPE_PILLS.map(({ key, tone }) => (
          <Badge key={key} variant={tone} size="sm">
            {t(key)}
          </Badge>
        ))}
      </div>

      {/* Expandable bullets */}
      {!collapsed && (
        <ul className="flex flex-col gap-2 pl-1">
          <li className="flex items-start gap-2 text-sm text-text-muted">
            <Icon name="upload_file" size={16} className="text-info mt-0.5" />
            <span>{t("filesConceptInput")}</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-text-muted">
            <Icon name="download" size={16} className="text-success mt-0.5" />
            <span>{t("filesConceptOutput")}</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-text-muted">
            <Icon name="error_outline" size={16} className="text-error mt-0.5" />
            <span>{t("filesConceptError")}</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-text-muted">
            <Icon name="event_available" size={16} className="text-warning mt-0.5" />
            <span>{t("filesConceptRetention")}</span>
          </li>
        </ul>
      )}
    </Card>
  );
}
