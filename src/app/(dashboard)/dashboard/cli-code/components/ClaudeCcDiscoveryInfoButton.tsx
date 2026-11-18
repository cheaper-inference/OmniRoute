"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Popover, PopoverContent, PopoverTrigger } from "@omniroute/ui-kit/popover";
import Icon from "@/shared/components/Icon";
import Button from "@/shared/components/Button";

/**
 * ClaudeCcDiscoveryInfoButton — informational entry point for the Claude Code
 * discovery-alias gate (`claude/<provider>/<model>` mirror ids, see
 * src/lib/db/ccDiscoveryAliases.ts). The actual on/off toggles live on each
 * provider's detail page (ProviderCcAliasSection) and the global flag lives
 * on the Feature Flags screen — this button just explains the feature and
 * links there, since Claude Code's tool card is where operators are already
 * looking when wiring the CLI's model discovery.
 *
 * The panel is the kit Popover: body portal, collision-aware placement, Escape and
 * outside press to close, focus back on the button.
 */
export default function ClaudeCcDiscoveryInfoButton() {
  const t = useTranslations("cliTools");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          title={t("ccDiscoveryInfoTooltip")}
          className="gap-1.5 text-[12px]"
        >
          <Icon name="help" size={16} />
          {t("ccDiscoveryInfoButton")}
        </Button>
      </PopoverTrigger>
      <PopoverContent aria-label={t("ccDiscoveryInfoButton")} className="w-80 p-3 text-xs">
        <p className="text-text-muted mb-2">{t("ccDiscoveryInfoTooltip")}</p>
        <Link
          href="/dashboard/settings/feature-flags"
          className="font-medium text-primary hover:underline"
        >
          {t("ccDiscoveryInfoLink")}
        </Link>
      </PopoverContent>
    </Popover>
  );
}
