"use client";

import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Icon from "@/shared/components/Icon";
import { KIMI_BRAND_COLOR } from "../providers/featuredProviders";

/**
 * Kimi Coding combo preset (2026-07 partnership) — card UI. See
 * kimiComboPreset.ts for the preset payload + why this exists instead of a
 * generic template picker (there isn't one that can pin named providers).
 * Styled with the Kimi accent, offered next to AutoComboCatalog on the
 * combos page. POSTs via the exact same handleCreate() path as every other
 * combo (mirrors handleDuplicate's directness — no separate confirmation
 * step).
 */
interface KimiComboPresetCardProps {
  /** True when a combo named KIMI_CODING_PRESET_NAME already exists — hides the card. */
  alreadyCreated: boolean;
  creating: boolean;
  onCreate: () => void;
}

export default function KimiComboPresetCard({
  alreadyCreated,
  creating,
  onCreate,
}: KimiComboPresetCardProps) {
  const t = useTranslations("combos");

  if (alreadyCreated) return null;

  // Kimi partner-brand blue on purpose: a brand tint, not a semantic colour. The kit derives the
  // border and the bolt's ink, which hold AA on the tint in every look.
  return (
    <Card
      padding="sm"
      brandColor={KIMI_BRAND_COLOR}
      className="border-2 shadow-[0_2px_10px_-4px_color-mix(in_srgb,var(--ci-brand)_45%,transparent)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface">
            <Icon name="bolt" size={20} className="text-[var(--ci-brand-ink)]" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-text-main">{t("kimiPresetTitle")}</p>
            <p className="mt-0.5 text-xs text-text-muted">{t("kimiPresetDescription")}</p>
          </div>
        </div>
        <Button size="sm" icon="add" loading={creating} onClick={onCreate} className="shrink-0">
          {t("kimiPresetCta")}
        </Button>
      </div>
    </Card>
  );
}
