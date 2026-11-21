"use client";

import { useTranslations } from "next-intl";

import type { QuotaUnit } from "@/lib/quota/dimensions";
import type { SelfQuotaMemberSlice } from "@/shared/schemas/selfQuota";

import { memberColor } from "../lib/memberColors";
import { amountText, memberBarWidths } from "../lib/quotaText";
import { useFormatNumber } from "../lib/useFormatNumber";

interface MemberBarProps {
  /** One slice per pool member, without names: slot 1 is the asking key. */
  members: SelfQuotaMemberSlice[];
  unit: QuotaUnit;
  /** Scale of the track: the window's limit. Slices that add up past it share the whole track. */
  limit: number;
}

/**
 * How a window's use splits between the pool's members: one segmented bar in slot order, named
 * and valued as a progress bar, and a legend that says every value in words. The asking key is told apart by its place, its outline
 * and its label, never by colour alone. Nothing is drawn when the slices cannot be drawn honestly.
 */
export default function MemberBar({ members, unit, limit }: MemberBarProps) {
  const t = useTranslations("quotaSelf");
  const number = useFormatNumber();
  const slices = [...members].sort((a, b) => a.slot - b.slot);
  const widths = memberBarWidths(slices, limit);
  if (widths === null) return null;

  const title = t("membersTitle");
  const labels = slices.map((slice) =>
    t("memberValue", {
      name: slice.isYou ? t("memberYou") : t("memberOther", { number: number(slice.slot) }),
      amount: amountText(unit, slice.consumed, t, number),
    })
  );
  const total = slices.reduce((sum, slice) => sum + slice.consumed, 0);
  return (
    <div className="flex min-w-0 flex-col gap-2 text-xs">
      <p className="min-w-0 break-words font-semibold uppercase tracking-wide text-text-muted">
        {title}
      </p>
      {/* One segment per member. The spoken value is the members' total against the track's scale. */}
      <div
        role="progressbar"
        aria-label={t("membersBarLabel", { count: number(slices.length) })}
        aria-valuemin={0}
        aria-valuemax={Math.max(limit, total)}
        aria-valuenow={total}
        aria-valuetext={labels.join(", ")}
        className="flex h-2.5 min-w-0 gap-px overflow-hidden rounded-sm bg-border/60"
      >
        {slices.map((slice, index) => (
          <div
            key={slice.slot}
            className={slice.isYou ? "h-full ring-1 ring-inset ring-text-main" : "h-full"}
            style={{
              width: `${widths[index]}%`,
              backgroundColor: memberColor(slice.slot, slice.isYou),
            }}
          />
        ))}
      </div>
      <ul aria-label={title} className="flex min-w-0 flex-wrap gap-x-4 gap-y-1">
        {slices.map((slice, index) => (
          <li
            key={slice.slot}
            className={`flex min-w-0 items-center gap-1.5 ${
              slice.isYou ? "font-semibold text-text-main" : "text-text-muted"
            }`}
          >
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-sm"
              style={{ backgroundColor: memberColor(slice.slot, slice.isYou) }}
            />
            <span className="min-w-0 break-words">{labels[index]}</span>
          </li>
        ))}
      </ul>
      <p className="min-w-0 break-words text-text-muted">{t("membersNote")}</p>
      {unit === "percent" ? (
        <p className="min-w-0 break-words text-text-muted">{t("membersPercentNote")}</p>
      ) : null}
    </div>
  );
}
