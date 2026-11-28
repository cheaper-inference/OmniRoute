"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

function RuleItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span aria-hidden="true" className="mt-0.5 shrink-0 text-success">
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

/** Explain feed access and the privacy boundary before opt-in. */
export function RadarAccessExplainer() {
  const t = useTranslations("radarPage");

  return (
    <section
      aria-labelledby="radar-access-scale-title"
      className="w-full rounded-xl border border-border bg-primary/5 p-4 text-left sm:p-5"
    >
      <h3 id="radar-access-scale-title" className="ci-heading" data-size="md">
        {t("accessScaleTitle")}
      </h3>
      <p className="mt-1 text-sm text-text-muted">{t("accessScaleIntro")}</p>

      <ul className="mt-4 grid gap-3 text-sm text-text-muted md:grid-cols-2">
        <RuleItem>{t("accessEveryoneRule")}</RuleItem>
        <RuleItem>{t("accessOffersRule")}</RuleItem>
      </ul>

      <section aria-labelledby="radar-privacy-title" className="mt-5 border-t border-border pt-4">
        <h4 id="radar-privacy-title" className="ci-heading" data-size="sm">
          {t("privacyTitle")}
        </h4>
        <ul className="mt-2 flex flex-col gap-2 text-sm text-text-muted">
          <RuleItem>{t("privacyDownloadsRule")}</RuleItem>
          <RuleItem>{t("privacySendsRule")}</RuleItem>
          <RuleItem>{t("privacyNeverRule")}</RuleItem>
        </ul>
      </section>
    </section>
  );
}
