"use client";

import { Alert, type AlertProps } from "@omniroute/ui-kit/alert";
import Icon from "./Icon";

export interface NoticeProps extends Omit<
  AlertProps,
  | "size"
  | "icon"
  | "description"
  | "dismissible"
  | "dismissLabel"
  | "onDismiss"
  | "persistence"
  | "duration"
> {
  /** ICON_MAP name, drawn in the kit icon slot. */
  icon?: string;
  /** The message. */
  children?: React.ReactNode;
}

/**
 * Notice — the compact, permanent notice for dialogs, table rows and nested panels: the kit
 * `Alert` at `size="sm"` (12px text, reduced padding), never dismissible. Use it instead of a
 * hand-made tinted box (`rounded border bg-warning/10 p-3 text-xs`). For a page-level banner that
 * can be dismissed, use the kit `Alert` itself.
 *
 *   <Notice variant="warning" icon="warning">The proxy is unreachable.</Notice>
 *
 * `variant` is the kit one (`default`, `info`, `success`, `warning`, `critical`); `critical` is
 * announced as an alert, the others as a status. The message is always sent as the kit
 * `description`, because the kit does not draw `children` next to an `icon` or a `title`.
 */
export default function Notice({ icon, children, ...props }: NoticeProps) {
  return (
    <Alert
      {...props}
      size="sm"
      dismissible={false}
      icon={icon ? <Icon name={icon} size={16} /> : undefined}
      description={children}
    />
  );
}
