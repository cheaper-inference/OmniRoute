"use client";

import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";

/**
 * RequestCountDateFilter — title + single-date filter row for #4009's
 * request-count-by-provider-date table. Split out to keep the container
 * component under the max-lines-per-function complexity gate.
 */

interface RequestCountDateFilterProps {
  title: string;
  dateLabel: string;
  value: string;
  onChange: (value: string) => void;
}

export default function RequestCountDateFilter({
  title,
  dateLabel,
  value,
  onChange,
}: RequestCountDateFilterProps) {
  const tCommon = useTranslations("common");
  return (
    <div className="p-4 border-b border-border flex items-center justify-between flex-wrap gap-2">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">{title}</h3>
      <div className="flex items-center gap-2">
        <Input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={dateLabel}
          inputClassName="text-xs"
        />
        {value && (
          <Button
            variant="ghost"
            size="icon-sm"
            icon="close"
            aria-label={tCommon("clear")}
            onClick={() => onChange("")}
          />
        )}
      </div>
    </div>
  );
}
