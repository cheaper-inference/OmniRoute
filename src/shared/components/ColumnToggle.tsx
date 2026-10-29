"use client";

/**
 * ColumnToggle — table column visibility menu over the kit `DropdownMenu` (KEA-7886).
 * Used by RequestLoggerV2, ProxyLogger, etc.
 *
 * Usage:
 *   <ColumnToggle
 *     columns={[{ key: 'model', label: 'Model' }, ...]}
 *     visible={{ model: true, provider: false, ... }}
 *     onToggle={(key) => setVisible({...visible, [key]: !visible[key]})}
 *   />
 */

import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@omniroute/ui-kit/dropdown-menu";
import Button from "./Button";

interface ColumnToggleProps {
  columns?: { key: string; label: string }[];
  visible?: Record<string, boolean>;
  onToggle?: (key: string) => void;
}

export default function ColumnToggle({ columns = [], visible = {}, onToggle }: ColumnToggleProps) {
  const t = useTranslations("common");
  return (
    // Non-modal like the legacy popover: the table behind stays readable and scrollable.
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          icon="view_column"
          aria-label={t("toggleColumns")}
          title={t("toggleColumns")}
        >
          {t("columns")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {columns.map((col) => (
          <DropdownMenuCheckboxItem
            key={col.key}
            checked={visible[col.key] ?? true}
            onCheckedChange={() => onToggle?.(col.key)}
            // Keep the menu open so several columns can be toggled in a row (legacy behaviour).
            onSelect={(event) => event.preventDefault()}
          >
            {col.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
