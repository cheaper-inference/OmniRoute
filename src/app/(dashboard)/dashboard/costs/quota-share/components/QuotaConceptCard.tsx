"use client";

import { useTranslations } from "next-intl";
import Collapsible from "@/shared/components/Collapsible";
import Icon from "@/shared/components/Icon";

export default function QuotaConceptCard() {
  const t = useTranslations("quotaShare");

  // Kit Accordion (Collapsible adapter): collapsed by default, as before.
  return (
    <div data-testid="quota-concept-card">
      <Collapsible title={t("conceptTitle")} icon="info">
        <div className="space-y-2 text-xs leading-relaxed text-text-muted">
          <p>{t("conceptIntro")}</p>
          <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
            <ConceptItem icon="balance" text={t("conceptFairShare")} />
            <ConceptItem icon="trending_up" text={t("conceptBorrowing")} />
            <ConceptItem icon="lock" text={t("conceptGlobalCap")} />
            <ConceptItem icon="schedule" text={t("conceptWindows")} />
            <ConceptItemWithDesc
              icon="vpn_key"
              title={t("conceptKeyHowTitle")}
              desc={t("conceptKeyHowDesc")}
            />
            <ConceptItemWithDesc
              icon="block"
              title={t("conceptExclusiveTitle")}
              desc={t("conceptExclusiveDesc")}
            />
          </div>
        </div>
      </Collapsible>
    </div>
  );
}

function ConceptItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-start gap-1.5 rounded-md bg-bg-subtle p-2">
      <Icon name={icon} size={16} className="text-primary mt-0.5" />
      <span>{text}</span>
    </div>
  );
}

function ConceptItemWithDesc({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-1.5 rounded-md bg-bg-subtle p-2">
      <Icon name={icon} size={16} className="text-primary mt-0.5" />
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold text-text-main">{title}</span>
        <span className="text-text-muted">{desc}</span>
      </div>
    </div>
  );
}
