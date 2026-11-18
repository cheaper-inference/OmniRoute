"use client";

/**
 * ColumnToggle — table column visibility menu over the kit `DataTableColumnsMenu`.
 * Used by RequestLoggerV2, ProxyLogger, etc., which keep the visibility and persist it.
 *
 * Usage:
 *   <ColumnToggle
 *     columns={[{ key: 'model', label: 'Model' }, ...]}
 *     visible={{ model: true, provider: false, ... }}
 *     onToggle={(key) => setVisible({...visible, [key]: !visible[key]})}
 *   />
 */

import { useTranslations } from "next-intl";
import { DataTableColumnsMenu } from "@omniroute/ui-kit/data-table-shell";

interface ColumnToggleProps {
  columns?: { key: string; label: string }[];
  visible?: Record<string, boolean>;
  onToggle?: (key: string) => void;
}

export default function ColumnToggle({ columns = [], visible = {}, onToggle }: ColumnToggleProps) {
  const t = useTranslations("common");
  return (
    <DataTableColumnsMenu
      columns={columns}
      visible={visible}
      onVisibilityChange={(key) => onToggle?.(key)}
      labels={{ trigger: t("columns") }}
      aria-label={t("toggleColumns")}
      title={t("toggleColumns")}
    />
  );
}
