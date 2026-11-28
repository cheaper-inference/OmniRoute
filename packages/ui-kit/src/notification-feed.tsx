"use client";

import { useId } from "react";
import type { ComponentProps, ComponentType, CSSProperties, ReactNode } from "react";
import { AlertTriangle, Bell, Boxes, ChevronDown, Megaphone, Rocket, Wrench } from "lucide-react";
import { Badge, type BadgeTone } from "./badge";
import { NotificationCategoryBadge, notificationToneColors, type NotificationCategory, type NotificationCardUpdate } from "./notification-card";
import { Switch } from "./switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { cn } from "./lib/utils";

export type NotificationFeedCategory = NotificationCategory | "all";
export interface NotificationFeedItem {
  id: string;
  category: NotificationCategory;
  title: ReactNode;
  message: ReactNode;
  unread?: boolean;
  /** Complete display text, including “Updated” when appropriate. */
  timestamp: ReactNode;
  dateTime?: string;
  /** Caller-owned routing/action: use NotificationCardLink or your router link. */
  action?: ReactNode;
  updates?: readonly NotificationCardUpdate[];
  historyLabel?: ReactNode;
}
export interface NotificationFeedGroup {
  id: string;
  label: ReactNode;
  items: readonly NotificationFeedItem[];
}
export interface NotificationFeedProps extends Omit<ComponentProps<"div">, "onChange"> {
  /** Groups and items stay in caller-provided order; the kit does not parse dates. */
  groups: readonly NotificationFeedGroup[];
  category: NotificationFeedCategory;
  onCategoryChange: (category: NotificationFeedCategory) => void;
  unreadOnly?: boolean;
  onUnreadOnlyChange?: (unreadOnly: boolean) => void;
  /** Optional totals for paginated feeds; otherwise derived before filtering. */
  counts?: Partial<Record<NotificationFeedCategory, number>>;
  categoryLabels?: Partial<Record<NotificationFeedCategory, string>>;
  filterLabel?: string;
  unreadLabel?: string;
  unreadOnlyLabel?: string;
  emptyMessage?: ReactNode;
  /** The tabs after "All", in order. Defaults to the built-in categories. */
  categories?: readonly NotificationFeedCategoryOption[];
}
/** One category tab. `tone` colours a category that has no built-in colour. */
export interface NotificationFeedCategoryOption {
  value: NotificationCategory;
  label: string;
  icon: ComponentType<{ "aria-hidden"?: boolean | "true" | "false" }>;
  tone?: BadgeTone;
}
export const DEFAULT_NOTIFICATION_CATEGORIES: readonly NotificationFeedCategoryOption[] = [
  { value: "incident", label: "Incidents", icon: AlertTriangle },
  { value: "maintenance", label: "Maintenance", icon: Wrench },
  { value: "models", label: "Models", icon: Boxes },
  { value: "product", label: "Product", icon: Rocket },
  { value: "announcement", label: "Announcements", icon: Megaphone },
];
const BUILT_IN = new Set<string>(DEFAULT_NOTIFICATION_CATEGORIES.map(option => option.value));

/** Controlled, presentation-only feed. No fetching, URL changes or read-state writes. */
export function NotificationFeed({ groups, category, onCategoryChange, unreadOnly = false, onUnreadOnlyChange, counts, categoryLabels, filterLabel = "Filter notifications", unreadLabel = "Unread", unreadOnlyLabel = "Unread only", emptyMessage = "No notifications to show.", categories = DEFAULT_NOTIFICATION_CATEGORIES, className, ...props }: NotificationFeedProps) {
  const id = useId();
  // "all" is the All tab, never a category.
  const tabs = [{ value: "all", label: "All", icon: Bell }, ...categories.filter(option => option.value !== "all")];
  const allItems = groups.flatMap(group => group.items);
  const visible = groups.map(group => ({ ...group, items: group.items.filter(item => (category === "all" || item.category === category) && (!unreadOnly || item.unread)) })).filter(group => group.items.length);
  return <div {...props} className={cn("ci-notification-feed", className)}>
    <Tabs variant="underline" value={category} onValueChange={value => onCategoryChange(value as NotificationFeedCategory)}>
      <div className="ci-notification-feed__filters">
        <TabsList className="ci-notification-feed__tabs" aria-label={filterLabel}>
          {tabs.map(({ value, label, icon: Icon }) => <TabsTrigger key={value} value={value} className="ci-notification-feed__tab"><Icon aria-hidden="true" />{categoryLabels?.[value] ?? label}<Badge variant="secondary" shape="pill" className="ci-notification-feed__count">{counts?.[value] ?? allItems.filter(item => value === "all" || item.category === value).length}</Badge></TabsTrigger>)}
        </TabsList>
        {onUnreadOnlyChange && <Switch size="sm" label={unreadOnlyLabel} checked={unreadOnly} onCheckedChange={onUnreadOnlyChange} />}
      </div>
      <TabsContent value={category} className="ci-notification-feed__panel">
        <div className="ci-notification-feed__list">
          {visible.map(group => <section key={group.id} aria-labelledby={`${id}-${group.id}`}>
            <h2 id={`${id}-${group.id}`} className="ci-notification-feed__group">{group.label}</h2>
            <ul>{group.items.map(item => {
              const option = categories.find(entry => entry.value === item.category);
              const Icon = option?.icon ?? Bell;
              // A category without built-in colours takes its tone's colour, else neutral.
              const fill = BUILT_IN.has(item.category) ? undefined : { "--category-fill": notificationToneColors[option?.tone ?? "neutral"] } as CSSProperties;
              return <li key={item.id} className={`ci-notification-feed__row ci-notification-category--${item.category}`} style={fill} data-unread={item.unread || undefined}>
                <span className="ci-notification-feed__marker" aria-hidden="true">{item.unread && <span />}</span>
                <span className="ci-notification-feed__icon" aria-hidden="true"><Icon /></span>
                <div className="ci-notification-feed__body">
                  <h3>{item.title}</h3><div className="ci-notification-feed__message">{item.message}</div>
                  <div className="ci-notification-feed__meta"><NotificationCategoryBadge category={item.category} tone={option?.tone}>{categoryLabels?.[item.category] ?? option?.label}</NotificationCategoryBadge>{item.unread && <Badge variant="outline" shape="pill">{unreadLabel}</Badge>}<time dateTime={item.dateTime}>{item.timestamp}</time></div>
                  {!!item.updates?.length && <details className="ci-notification-card__history ci-notification-feed__history"><summary><ChevronDown aria-hidden="true" />{item.historyLabel ?? `${item.updates.length} earlier ${item.updates.length === 1 ? "update" : "updates"}`}</summary><ol>{item.updates.map(update => <li key={update.id}><div className="ci-notification-card__update-heading"><strong>{update.label}</strong><time dateTime={update.dateTime}>{update.timestamp}</time></div><div className="ci-notification-feed__message">{update.body}</div></li>)}</ol></details>}
                </div>
                {item.action && <div className="ci-notification-feed__action">{item.action}</div>}
              </li>;
            })}</ul>
          </section>)}
          {!visible.length && <div className="ci-notification-feed__empty">{emptyMessage}</div>}
        </div>
      </TabsContent>
    </Tabs>
  </div>;
}
