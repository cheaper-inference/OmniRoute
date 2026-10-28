"use client";

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

export function IntegrationCard({
  kind,
  name,
  description,
  selected,
  onSelect,
  disabled,
  comingSoonLabel,
}: IntegrationCardProps) {
  // kit-exception: A multi-line choice tile (icon, name, description, "coming soon" badge, check mark): the kit
  // Button is a single-line pill, so this stays a native <button> on kit tokens, with aria-pressed.
  return (
    <button
      type="button"
      aria-pressed={!disabled ? selected : undefined}
      onClick={!disabled && onSelect ? () => onSelect(kind as WebhookKind) : undefined}
      disabled={disabled}
      className={`relative flex w-full flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
        disabled
          ? "border-border bg-surface"
          : selected
            ? "border-primary bg-primary/5 shadow-sm"
            : "border-border bg-surface hover:border-primary/40 hover:bg-primary/5"
      }`}
    >
      {comingSoonLabel && (
        <Badge size="sm" className="absolute right-2 top-2">
          {comingSoonLabel}
        </Badge>
      )}
      <Icon name={KIND_ICONS[kind]} size={28} className={KIND_COLORS[kind]} />
      <div>
        <p className="text-sm font-semibold text-text-main">{name}</p>
        <p className="mt-0.5 text-xs text-text-muted">{description}</p>
      </div>
      {selected && !disabled && (
        <span className="ml-auto mt-auto flex size-5 items-center justify-center rounded-full bg-primary">
          <Icon name="check" size={14} className="text-accent-foreground" />
        </span>
      )}
    </button>
  );
}
