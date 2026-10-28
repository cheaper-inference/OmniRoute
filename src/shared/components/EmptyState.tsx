"use client";

import { useTranslations } from "next-intl";
import { EmptyState as KitEmptyState } from "@omniroute/ui-kit/empty-state";
import Button from "./Button";
import Icon from "./Icon";

/**
 * EmptyState — adapter over the kit `EmptyState` (KEA-7886).
 *
 * `icon` is either a Material Symbols name (rendered through `<Icon>`, i.e. Lucide) or an
 * emoji/glyph rendered as text. The action goes through the `Button` adapter.
 *
 * Usage:
 *   <EmptyState
 *     icon="inbox"
 *     title="No providers yet"
 *     description="Add your first API provider to get started."
 *     actionLabel="Add Provider"
 *     onAction={() => router.push('/providers/add')}
 *   />
 */

interface EmptyStateProps {
  icon?: string;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: (() => void) | null;
  className?: string;
}

export default function EmptyState({
  icon = "inbox",
  title,
  description = "",
  actionLabel = "",
  onAction = null,
  className,
}: EmptyStateProps) {
  const t = useTranslations("common");
  const resolvedTitle = title ?? t("nothingHere");
  const usesMaterialSymbol = /^[a-z][a-z0-9_]*$/.test(icon);
  return (
    <KitEmptyState
      className={className}
      icon={
        usesMaterialSymbol ? (
          <Icon name={icon} size={40} />
        ) : (
          <span aria-hidden="true" className="text-2xl leading-none">
            {icon}
          </span>
        )
      }
      title={resolvedTitle}
      description={description || undefined}
      actions={
        actionLabel && onAction ? (
          <Button variant="primary" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : undefined
      }
    />
  );
}
