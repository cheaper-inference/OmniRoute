"use client";

import { Disclosure, DisclosureContent, DisclosureTrigger } from "@omniroute/ui-kit/disclosure";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";

type ConceptKey = "search" | "scrape" | "compare" | "rerank" | "auto";

interface ConceptItem {
  icon: string;
  key: ConceptKey;
  titleKey:
    | "searchConceptTitle"
    | "scrapeConceptTitle"
    | "compareConceptTitle"
    | "rerankConceptTitle"
    | "autoConceptTitle";
  descKey:
    | "searchConceptDesc"
    | "scrapeConceptDesc"
    | "compareConceptDesc"
    | "rerankConceptDesc"
    | "autoConceptDesc";
}

const CONCEPTS: ConceptItem[] = [
  { icon: "search", key: "search", titleKey: "searchConceptTitle", descKey: "searchConceptDesc" },
  {
    icon: "description",
    key: "scrape",
    titleKey: "scrapeConceptTitle",
    descKey: "scrapeConceptDesc",
  },
  {
    icon: "balance",
    key: "compare",
    titleKey: "compareConceptTitle",
    descKey: "compareConceptDesc",
  },
  {
    icon: "swap_vert",
    key: "rerank",
    titleKey: "rerankConceptTitle",
    descKey: "rerankConceptDesc",
  },
  { icon: "bolt", key: "auto", titleKey: "autoConceptTitle", descKey: "autoConceptDesc" },
];

interface SearchConceptCardProps {
  /** If true, the card starts collapsed. Default: false (expanded). */
  defaultCollapsed?: boolean;
}

export default function SearchConceptCard({ defaultCollapsed = false }: SearchConceptCardProps) {
  const t = useTranslations("search");
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <div
      className="bg-surface border border-border rounded-lg overflow-hidden"
      data-testid="search-concept-card"
    >
      <Disclosure open={!collapsed} onOpenChange={(open) => setCollapsed(!open)}>
        {/* Header */}
        <DisclosureTrigger className="rounded-none px-4">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider flex items-center gap-2">
            <span>ⓘ</span>
            <span>{t("modalitiesGuide")}</span>
          </span>
        </DisclosureTrigger>

        {/* Body (unmounted while collapsed, as before) */}
        <DisclosureContent>
          <div
            className="p-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 border-t border-border"
            data-testid="concept-card-content"
          >
            {CONCEPTS.map((c) => (
              <div
                key={c.key}
                className="flex gap-3 p-3 bg-bg-alt rounded-lg border border-border"
                data-testid={`concept-item-${c.key}`}
              >
                <Icon name={c.icon} size={20} className="text-primary" />
                <div>
                  <div className="text-xs font-semibold text-text-main mb-0.5">{t(c.titleKey)}</div>
                  <div className="text-xs text-text-muted leading-relaxed">{t(c.descKey)}</div>
                </div>
              </div>
            ))}
          </div>
        </DisclosureContent>
      </Disclosure>
    </div>
  );
}
