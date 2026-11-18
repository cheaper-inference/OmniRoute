"use client";

import { useState, useCallback, type ReactElement } from "react";
import { useTranslations } from "next-intl";
import { Popover, PopoverContent, PopoverTrigger } from "@omniroute/ui-kit/popover";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";

interface CustomRangePickerProps {
  /** The control that opens the picker; the panel is anchored to it. */
  children: ReactElement;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  start: string;
  end: string;
  onApply: (start: string, end: string) => void;
}

function toLocalDatetime(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromLocalDatetime(local: string): string {
  if (!local) return "";
  return new Date(local).toISOString();
}

function getPresetRange(preset: string): { start: string; end: string } {
  const now = new Date();
  const end = toLocalDatetime(now.toISOString());
  const s = new Date(now);

  switch (preset) {
    case "today":
      s.setHours(0, 0, 0, 0);
      break;
    case "yesterday": {
      s.setDate(s.getDate() - 1);
      s.setHours(0, 0, 0, 0);
      const e = new Date(s);
      e.setHours(23, 59, 59, 999);
      return { start: toLocalDatetime(s.toISOString()), end: toLocalDatetime(e.toISOString()) };
    }
    case "thisWeek":
      s.setDate(s.getDate() - s.getDay());
      s.setHours(0, 0, 0, 0);
      break;
    case "thisMonth":
      s.setDate(1);
      s.setHours(0, 0, 0, 0);
      break;
    case "last3d":
      s.setDate(s.getDate() - 3);
      break;
    case "last14d":
      s.setDate(s.getDate() - 14);
      break;
    default:
      s.setDate(s.getDate() - 7);
  }

  return { start: toLocalDatetime(s.toISOString()), end };
}

/**
 * Custom date-range panel on the kit Popover: body portal, collision-aware placement, Escape and
 * outside press to close, focus back on the trigger. The form mounts with the panel, so each
 * opening starts from the applied range.
 */
export default function CustomRangePicker({
  children,
  open,
  onOpenChange,
  start,
  end,
  onApply,
}: CustomRangePickerProps) {
  const t = useTranslations("analytics");
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="end" aria-label={t("customRange")} className="w-[340px]">
        <RangeForm start={start} end={end} onApply={onApply} onClose={() => onOpenChange(false)} />
      </PopoverContent>
    </Popover>
  );
}

function RangeForm({
  start,
  end,
  onApply,
  onClose,
}: {
  start: string;
  end: string;
  onApply: (start: string, end: string) => void;
  onClose: () => void;
}) {
  const t = useTranslations("analytics");
  const [localStart, setLocalStart] = useState(toLocalDatetime(start) || "");
  const [localEnd, setLocalEnd] = useState(toLocalDatetime(end) || "");

  const handleApply = useCallback(() => {
    if (localStart && localEnd) {
      onApply(fromLocalDatetime(localStart), fromLocalDatetime(localEnd));
    }
  }, [localStart, localEnd, onApply]);

  const handlePreset = useCallback((preset: string) => {
    const { start: s, end: e } = getPresetRange(preset);
    setLocalStart(s);
    setLocalEnd(e);
  }, []);

  const isValid = localStart && localEnd && new Date(localStart) <= new Date(localEnd);

  const presets = [
    { key: "today", label: t("rangeToday") },
    { key: "yesterday", label: t("rangeYesterday") },
    { key: "last3d", label: t("rangeLast3Days") },
    { key: "thisWeek", label: t("rangeThisWeek") },
    { key: "last14d", label: t("rangeLast14Days") },
    { key: "thisMonth", label: t("rangeThisMonth") },
  ];

  return (
    <>
      {/* Quick presets */}
      <div className="mb-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">
          {t("rangeQuickSelect")}
        </p>
        <div className="flex flex-wrap gap-1">
          {presets.map((p) => (
            <Button
              key={p.key}
              variant="outline"
              size="sm"
              onClick={() => handlePreset(p.key)}
              className="h-7 min-h-7 px-2.5 text-[11px]"
            >
              {p.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-px bg-border/30 mb-3" />

      {/* Date inputs */}
      <div className="flex flex-col gap-2.5">
        <Input
          type="datetime-local"
          label={t("rangeStart")}
          value={localStart}
          onChange={(e) => setLocalStart(e.target.value)}
        />
        <Input
          type="datetime-local"
          label={t("rangeEnd")}
          value={localEnd}
          onChange={(e) => setLocalEnd(e.target.value)}
        />
      </div>

      {/* Validation hint */}
      {localStart && localEnd && !isValid && (
        <p className="mt-1.5 text-xs text-error">{t("rangeErrorInvalid")}</p>
      )}

      {/* Actions */}
      <div className="mt-3 flex items-center justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onClose}>
          {t("rangeCancel")}
        </Button>
        <Button size="sm" disabled={!isValid} onClick={handleApply}>
          {t("rangeApply")}
        </Button>
      </div>
    </>
  );
}
