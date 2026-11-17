"use client";

import { useTranslations } from "next-intl";
import { InfoTooltip as KitInfoTooltip } from "@omniroute/ui-kit/info-tooltip";
import type { TooltipSide } from "@omniroute/ui-kit/tooltip";

interface InfoTooltipProps {
  /** The help shown in the tooltip. */
  text: React.ReactNode;
  /** Accessible name of the trigger; defaults to the translated "More information". */
  label?: string;
  side?: TooltipSide;
  className?: string;
}

// The kit InfoTooltip: a real button (24 px target, 16 px icon), reachable by keyboard, whose
// tooltip (Radix) opens on hover and focus. The trigger has a short name and the help text is
// its description, so a screen reader does not hear the whole help text twice.
export default function InfoTooltip({ text, label, side, className }: InfoTooltipProps) {
  const t = useTranslations("common");
  return (
    <KitInfoTooltip
      content={text}
      label={label ?? t("moreInformation")}
      side={side}
      className={className}
    />
  );
}
