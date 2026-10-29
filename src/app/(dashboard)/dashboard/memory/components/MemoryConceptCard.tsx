"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import { cn } from "@/shared/utils/cn";

export default function MemoryConceptCard() {
  const t = useTranslations("memory");
  const [open, setOpen] = useState(false);

  return (
    <Card padding="sm" className="bg-bg-subtle/50">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
          <Icon name="psychology" size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold text-text-main">{t("concept.title")}</h2>
          <p className="text-xs text-text-muted mt-1 leading-relaxed">{t("concept.description")}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-2 h-auto gap-1 px-0 text-xs font-medium text-primary hover:underline"
          >
            {t("concept.howWorksToggle")}
            <Icon
              name="expand_more"
              size={14}
              className={cn("transition-transform", open && "rotate-180")}
            />
          </Button>
          {open && (
            <div className="mt-3 p-3 rounded-lg bg-surface/50 border border-border/60 text-xs text-text-muted leading-relaxed space-y-1.5">
              {(t("concept.howWorksContent") as string).split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
