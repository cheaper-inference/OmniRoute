import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { ArrowUpRight, ChevronDown, Clock3 } from "lucide-react";
import { Card } from "./card";
import { Badge, type BadgeTone } from "./badge";
import { cn } from "./lib/utils";

export type NotificationCategory = "incident" | "maintenance" | "models" | "product" | "announcement";
const surfaceColors: Record<BadgeTone, string> = { neutral: "var(--ci-color-text-muted)", success: "var(--ci-color-success)", warning: "var(--ci-color-warning)", info: "var(--ci-color-info)", danger: "var(--ci-color-danger)", accent: "var(--ci-color-accent)" };
const categories: Record<NotificationCategory, { label: string; tone?: BadgeTone }> = {
  incident: { label: "Incidents", tone: "warning" }, maintenance: { label: "Maintenance", tone: "info" },
  models: { label: "Models" }, product: { label: "Product" },
  announcement: { label: "Announcements" },
};
export function NotificationCategoryBadge({ category, icon, children, className, ...props }: Omit<ComponentProps<typeof Badge>, "tone" | "variant"> & { category: NotificationCategory }) {
  const config = categories[category];
  return <Badge {...props} shape="pill" className={cn(`ci-notification-category--${category}`, className)} variant="default" tone={config.tone} icon={icon}>{children ?? config.label}</Badge>;
}
export interface NotificationCardUpdate {
  id: string;
  label: ReactNode;
  timestamp: ReactNode;
  dateTime?: string;
  body: ReactNode;
}
export interface NotificationCardProps extends Omit<ComponentProps<"div">, "title"> {
  title: ReactNode;
  icon?: ReactNode;
  message: ReactNode;
  /** Optional badge row. Status-page cards intentionally omit it. */
  badges?: ReactNode;
  /** Complete visible timestamp, for example “Updated 10:42 UTC”. */
  timestamp: ReactNode;
  dateTime?: string;
  /** Earlier updates only, newest first. The latest message is always visible. */
  updates?: readonly NotificationCardUpdate[];
  historyLabel?: ReactNode;
  historyDefaultOpen?: boolean;
  /** Caller-owned action preserves routing and read-state behavior. */
  action?: ReactNode;
  /** Full-surface semantic gradient for public status pages. */
  surfaceTone?: BadgeTone;
}
/** Width and column/list layout belong to the caller. No fetching or read-state side effects. */
export function NotificationCard({ title, icon, message, badges, timestamp, dateTime, updates = [], historyLabel, historyDefaultOpen = false, action, surfaceTone, className, style, ...props }: NotificationCardProps) {
  return <Card {...props} className={cn("ci-notification-card", surfaceTone && "ci-notification-card--tinted", className)} style={{ ...(surfaceTone ? { "--notification-card-tone": surfaceColors[surfaceTone] } : {}), ...style } as CSSProperties}>
    <div className="ci-notification-card__header">
      <div className="ci-notification-card__title">{icon && <span className="ci-notification-card__icon" aria-hidden="true">{icon}</span>}{title}</div>
      {badges && <div className="ci-notification-card__badges">{badges}</div>}
      <div className="ci-notification-card__message">{message}</div>
    </div>
    {updates.length > 0 && <details className="ci-notification-card__history" open={historyDefaultOpen || undefined}>
      <summary><ChevronDown aria-hidden="true" />{historyLabel ?? `${updates.length} earlier ${updates.length === 1 ? "update" : "updates"}`}</summary>
      <ol>{updates.map(update => <li key={update.id}><div className="ci-notification-card__update-heading"><strong>{update.label}</strong><time dateTime={update.dateTime}>{update.timestamp}</time></div><div className="ci-notification-card__message">{update.body}</div></li>)}</ol>
    </details>}
    <div className="ci-notification-card__footer"><time dateTime={dateTime}><Clock3 aria-hidden="true" />{timestamp}</time>{action}</div>
  </Card>;
}
/** Icon-only link with a required accessible destination label. */
export function NotificationCardLink({ label, target = "_blank", rel, className, ...props }: Omit<ComponentProps<"a">, "children" | "aria-label"> & { label: string }) {
  return <a {...props} target={target} rel={target === "_blank" ? `${rel ?? ""} noopener noreferrer`.trim() : rel} aria-label={label} className={cn("ci-notification-card__link", className)}><ArrowUpRight aria-hidden="true" /></a>;
}
