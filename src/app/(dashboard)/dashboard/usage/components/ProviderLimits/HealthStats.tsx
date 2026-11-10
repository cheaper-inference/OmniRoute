"use client";
import Button from "@/shared/components/Button";
import {
  DISPLAY_COLORS,
  DISPLAY_LABELS,
  DISPLAY_KINDS,
  countDisplay,
  type DisplayAccount,
  type DisplayFilter,
} from "./availabilityDisplay";
import { useHealthText } from "./useHealthText";
export default function HealthStats({
  accounts,
  value,
  onChange,
}: {
  accounts: DisplayAccount[];
  value: DisplayFilter;
  onChange: (value: DisplayFilter) => void;
}) {
  const { t, all, format } = useHealthText();
  const counts = countDisplay(accounts);
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-7">
      {(["all", ...DISPLAY_KINDS] as const).map((kind) => {
        const color = kind === "all" ? "var(--color-text-main)" : DISPLAY_COLORS[kind];
        return (
          <Button
            key={kind}
            variant="outline"
            data-stat={kind}
            aria-pressed={value === kind}
            onClick={() => onChange(kind)}
            className="block h-auto min-h-0 min-w-0 rounded-lg px-3 py-2.5 text-start font-normal"
            style={{
              borderColor: value === kind ? color : "var(--color-border)",
              background:
                value === kind
                  ? `color-mix(in srgb, ${color} 10%, transparent)`
                  : "var(--color-surface)",
            }}
          >
            <span className="text-[11px] font-semibold text-text-muted">
              {kind === "all" ? t("statTotal") : all(DISPLAY_LABELS[kind])}
            </span>
            <div className="text-2xl font-bold tabular-nums" style={{ color }}>
              {format.number(counts[kind])}
            </div>
            {kind === "ok" && (
              <div className="text-[11px] text-text-muted">
                {t("healthIncluded", { count: counts.partial })}
              </div>
            )}
          </Button>
        );
      })}
    </div>
  );
}
