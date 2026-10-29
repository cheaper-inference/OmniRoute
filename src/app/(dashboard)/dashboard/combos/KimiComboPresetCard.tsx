"use client";

import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Icon from "@/shared/components/Icon";

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

  // Kimi partner-brand blue on purpose — a brand accent, not a semantic colour. The test pins the
  // #1783FF hex on the card border/background; the bolt's dark: tint is a legibility exception
  // (not pinned) so the glyph stays readable on the dark surface.
  return (
    <Card
      padding="sm"
      className="border-2 border-[#1783FF]/70 bg-[#1783FF]/[0.04] shadow-[0_2px_10px_-4px_rgba(23,131,255,0.45)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#1783FF]/10">
            <Icon name="bolt" size={20} className="text-[#1067CC] dark:text-[#7CB8FF]" />
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
