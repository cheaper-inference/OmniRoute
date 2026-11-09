import Badge from "@/shared/components/Badge";
import Checkbox from "@/shared/components/Checkbox";
import type { ComboStep } from "@/lib/combos/steps";

type Translate = (key: string, fallback: string) => string;

type Props = {
  strategy: string;
  entry: ComboStep;
  index: number;
  hasPricing: boolean;
  translate: Translate;
  onCheckedChange: (index: number, enabled: boolean) => void;
};

export function ComboTargetOptions({
  strategy,
  entry,
  index,
  hasPricing,
  translate,
  onCheckedChange,
}: Props) {
  return (
    <>
      {strategy === "cost-optimized" && (
        <Badge
          size="sm"
          variant={hasPricing ? "success" : "warning"}
          className="uppercase font-semibold"
          title={translate(
            hasPricing ? "pricingAvailable" : "pricingMissing",
            hasPricing ? "Pricing available" : "No pricing"
          )}
        >
          {translate(
            hasPricing ? "pricingAvailableShort" : "pricingMissingShort",
            hasPricing ? "priced" : "no-price"
          )}
        </Badge>
      )}
      {strategy === "priority" && (entry.kind === "model" || entry.kind === "combo-ref") && (
        <Checkbox
          className="shrink-0 text-xs text-text-muted"
          checked={entry.fallbackOnlyOnQuotaExhaustion === true}
          onChange={(event) => onCheckedChange(index, event.target.checked)}
          aria-label={translate(
            "fallbackOnlyOnQuotaExhaustion",
            "Only advance on quota exhaustion"
          )}
          label={
            <span className="hidden lg:inline">
              {translate("fallbackOnlyOnQuotaExhaustionShort", "quota-only fallback")}
            </span>
          }
        />
      )}
    </>
  );
}
