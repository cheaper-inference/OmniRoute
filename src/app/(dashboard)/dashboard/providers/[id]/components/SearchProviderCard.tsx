"use client";

// Phase 1t.7 extraction — Issue #3501
import { Card, Notice } from "@/shared/components";
import type { ProviderMessageTranslator } from "../providerPageHelpers";

interface SearchProviderCardProps {
  providerId: string;
  t: ProviderMessageTranslator;
}

export default function SearchProviderCard({ providerId, t }: SearchProviderCardProps) {
  return (
    <Card>
      <h2 className="text-lg mb-4">{t("searchProvider")}</h2>
      <p className="text-sm text-text-muted">{t("searchProviderDesc")}</p>
      {providerId === "perplexity-search" && (
        <Notice variant="info" icon="link" className="mt-3">
          {t("perplexitySearchSharedKeyInfo")}
        </Notice>
      )}
      {providerId === "google-pse-search" && (
        <Notice variant="warning" icon="tune" className="mt-3">
          {t("googlePseInfo")}
        </Notice>
      )}
      {providerId === "searxng-search" && (
        <Notice variant="success" icon="dns" className="mt-3">
          {t("searxngInfo")}
        </Notice>
      )}
    </Card>
  );
}
