"use client";

import { useTranslations } from "next-intl";
import {
  EmptyState as KitEmptyState,
  type EmptyStateBorder,
  type EmptyStateLayout,
} from "@omniroute/ui-kit/empty-state";
import Button from "./Button";
import Icon from "./Icon";

/**
 * EmptyState — adapter over the kit `EmptyState` (KEA-7886).
 *
 * `icon` is either an ICON_MAP name (rendered through `<Icon>`, i.e. Lucide) or an
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
 *
 * The empty state of a short list, a field or a table cell is one line, not a panel:
 *   <EmptyState layout="inline" title="No rules yet" />
 *   <EmptyState layout="inline" border="dashed" title="No rules yet" actions={…} />
 */

interface EmptyStateProps {
  /** Defaults to `inbox` in the stacked panel; the inline layout has no icon unless one is named. */
  icon?: string;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: (() => void) | null;
  /** Ready-made controls for the kit actions slot. Wins over `actionLabel` / `onAction`. */
  actions?: React.ReactNode;
  /** Shorter panel (10rem instead of 16rem). No effect in the inline layout. */
  compact?: boolean;
  /**
   * `stacked` (default) is the centered panel. `inline` is one line with no minimum height: 14px
   * text, a small icon beside it and the actions at the end. Its title is a paragraph, not a heading.
   */
  layout?: EmptyStateLayout;
  /** Box around it. The kit default is `solid` for the panel and `none` for the inline layout. */
  border?: EmptyStateBorder;
  className?: string;
}

function emptyStateIcon(icon: string | undefined): React.ReactNode {
  if (!icon) return undefined;
  const usesMaterialSymbol = /^[a-z][a-z0-9_]*$/.test(icon);
  // The kit sizes the glyph: 20px in the panel's tile, 16px beside the inline text.
  if (usesMaterialSymbol) return <Icon name={icon} size={40} />;
  return (
    <span aria-hidden="true" className="text-2xl leading-none">
      {icon}
    </span>
  );
}

export default function EmptyState({
  icon,
  title,
  description = "",
  actionLabel = "",
  onAction = null,
  actions,
  compact,
  layout,
  border,
  className,
}: EmptyStateProps) {
  const t = useTranslations("common");
  const resolvedTitle = title ?? t("nothingHere");
  const inline = layout === "inline";
  const legacyAction =
    actionLabel && onAction ? (
      <Button variant="primary" size={inline ? "sm" : "md"} onClick={onAction}>
        {actionLabel}
      </Button>
    ) : undefined;
  return (
    <KitEmptyState
      className={className}
      compact={compact}
      layout={layout}
      border={border}
      icon={emptyStateIcon(icon ?? (inline ? undefined : "inbox"))}
      title={resolvedTitle}
      description={description || undefined}
      actions={actions ?? legacyAction}
    />
  );
}
