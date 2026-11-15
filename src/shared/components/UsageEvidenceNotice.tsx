"use client";
import { useTranslations } from "next-intl";
/** Catalogue prices are not an invoice, even when token counters were reported. */
export default function UsageEvidenceNotice({
  estimated = false,
  unknownEvidence = false,
}: {
  estimated?: boolean;
  unknownEvidence?: boolean;
}) {
  const t = useTranslations("common.usageEvidence");
  return (
    <div className="text-xs text-text-muted" role="note">
      {estimated && <p>{t("containsEstimates")}</p>}
      {unknownEvidence && <p>{t("historicalUnknown")}</p>}
      <p>{t("catalogueCost")}</p>
    </div>
  );
}
