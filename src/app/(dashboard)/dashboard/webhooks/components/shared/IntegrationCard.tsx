"use client";

import { Tile } from "@omniroute/ui-kit/tile";
import Badge from "@/shared/components/Badge";
import Icon from "@/shared/components/Icon";

export type WebhookKind = "slack" | "telegram" | "discord" | "custom";
export type ComingSoonKind = "email" | "pagerduty" | "teams";
type AnyKind = WebhookKind | ComingSoonKind;

const KIND_ICONS: Record<AnyKind, string> = {
  slack: "chat",
  telegram: "send",
  discord: "forum",
  custom: "webhook",
  email: "email",
  pagerduty: "notifications_active",
  teams: "groups",
};

const KIND_COLORS: Record<AnyKind, string> = {
  slack: "text-chart-1",
  telegram: "text-chart-2",
  discord: "text-chart-3",
  custom: "text-chart-4",
  email: "text-text-muted",
  pagerduty: "text-text-muted",
  teams: "text-text-muted",
};

interface IntegrationCardProps {
  kind: AnyKind;
  name: string;
  description: string;
  selected: boolean;
  onSelect?: (kind: WebhookKind) => void;
  disabled?: boolean;
  comingSoonLabel?: string;
}

/** Kind glyph. A component of its own so the icon-name scanner (icon-map-object-values) reads
 *  only KIND_ICONS as names in the Tile's `icon` slot, not the KIND_COLORS classes. */
function KindGlyph({ kind }: { kind: AnyKind }) {
  return <Icon name={KIND_ICONS[kind]} className={KIND_COLORS[kind]} />;
}

export function IntegrationCard({
  kind,
  name,
  description,
  selected,
  onSelect,
  disabled,
  comingSoonLabel,
}: IntegrationCardProps) {
  // Kit Tile as a toggle (aria-pressed + the kit check indicator); a "coming soon" kind is a
  // disabled tile with no pressed state, as before.
  return (
    <Tile
      layout="stacked"
      pressed={!disabled ? selected : undefined}
      onClick={!disabled && onSelect ? () => onSelect(kind as WebhookKind) : undefined}
      disabled={disabled}
      icon={<KindGlyph kind={kind} />}
      title={name}
      description={description}
      meta={comingSoonLabel ? <Badge size="sm">{comingSoonLabel}</Badge> : undefined}
    />
  );
}
