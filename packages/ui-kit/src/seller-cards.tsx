"use client";

import type { ComponentProps, ReactNode } from "react";
import { AlertCircle, ArrowDown, Layers, MoreHorizontal, Pencil, Plus } from "lucide-react";
import { Badge, type BadgeTone } from "./badge";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { cn } from "./lib/utils";

export interface SellerCardAction {
  label: string;
  onSelect: () => void;
}

export interface SellerCardStatus {
  label: string;
  tone?: BadgeTone;
}

/** The dashboard supplies percentages and the localized description. */
export interface SellerCapUsageBarProps {
  label: string;
  segments: readonly number[];
  forecast?: number;
  calculating?: boolean;
}

interface SellerCardMetric {
  label: string;
  value: ReactNode;
}

export type SellerOfferVolume =
  | {
      kind: "capped";
      label: string;
      capName: string;
      onCapSelect?: () => void;
      usage: SellerCapUsageBarProps;
      totals: readonly SellerCardMetric[];
      explanation: ReactNode;
    }
  | {
      kind: "uncapped";
      onAdd?: () => void;
    };

export interface SellerKeyOfferCardProps extends Omit<ComponentProps<"article">, "children"> {
  provider: string;
  providerMark?: ReactNode;
  providerDetail: string;
  privateNote?: string;
  status: SellerCardStatus;
  onEdit?: () => void;
  onModels?: () => void;
  offer: {
    price: ReactNode;
    detail: ReactNode;
  };
  volume: SellerOfferVolume;
  earnings: {
    label: string;
    value: ReactNode;
    detail: ReactNode;
    models?: readonly string[];
  };
  capFooter: {
    label: string;
    name: string;
    detail?: ReactNode;
    action?: SellerCardAction;
  };
  expiry?: {
    title: string;
    detail: string;
  };
}

export interface SellerVolumeCapCardProps extends Omit<ComponentProps<"article">, "children"> {
  label: string;
  name: string;
  onNameSelect?: () => void;
  status: SellerCardStatus;
  actions?: readonly SellerCardAction[];
  amount: ReactNode;
  amountDetail: ReactNode;
  usage: SellerCapUsageBarProps;
  breakdown?: {
    members: readonly SellerCardMetric[];
    leftover: SellerCardMetric;
  };
  warning?: ReactNode;
  memberLabel: string;
  members: readonly string[];
  dates: ReactNode;
  footerAction?: SellerCardAction;
}

function SellerCapUsageBar({ label, segments, forecast = 0, calculating = false }: SellerCapUsageBarProps) {
  let remaining = 100;
  const widths = segments.map((segment) => {
    const width = Number.isFinite(segment) ? Math.min(remaining, Math.max(0, segment)) : 0;
    remaining -= width;
    return width;
  });
  return (
    <div
      className="ci-seller-cap-usage"
      data-calculating={calculating || undefined}
      role="img"
      aria-label={label}
    >
      {!calculating && widths.map((width, index) => (
        <span aria-hidden="true" key={index} style={{ width: width + "%" }} />
      ))}
      {!calculating && forecast > 0 && remaining > 0 && (
        <span
          aria-hidden="true"
          className="ci-seller-cap-usage__forecast"
          style={{ width: Math.min(remaining, forecast) + "%" }}
        />
      )}
    </div>
  );
}

function OfferVolume({ volume }: { volume: SellerOfferVolume }) {
  if (volume.kind === "uncapped") {
    return (
      <div className="ci-seller-offer-card__volume">
        <small>Volume cap</small>
        <h3>No volume cap</h3>
        <p>This key isn’t limited by a volume cap.</p>
        {volume.onAdd && (
          <Button type="button" size="sm" variant="outline" onClick={volume.onAdd}>
            <Plus size={14} />
            Add a cap
          </Button>
        )}
      </div>
    );
  }
  return (
    <div className="ci-seller-offer-card__volume">
      <small>
        {volume.label} ·{" "}
        {volume.onCapSelect ? (
          <button type="button" className="ci-seller-card__text-link" onClick={volume.onCapSelect}>
            {volume.capName}
          </button>
        ) : volume.capName}
      </small>
      <SellerCapUsageBar {...volume.usage} />
      <div className="ci-seller-offer-card__totals">
        {volume.totals.map(({ label, value }) => (
          <span key={label}>{label} <b>{value}</b></span>
        ))}
      </div>
      <p>{volume.explanation}</p>
    </div>
  );
}

/** The visual summary of one seller key. Pricing, usage, and routing decisions are owned by the caller. */
export function SellerKeyOfferCard({
  provider, providerMark, providerDetail, privateNote, status, onEdit, onModels, offer,
  volume, earnings, capFooter, expiry, className, ...props
}: SellerKeyOfferCardProps) {
  return (
    <article data-ci-seller="" className={cn("ci-seller-card", "ci-seller-offer-card", className)} aria-label={provider + " key"} {...props}>
      <div className="ci-seller-offer-card__header">
        <div className="ci-seller-offer-card__inline">
          {providerMark}
          <div>
            <strong>{provider}</strong>{" "}
            <span className="ci-seller-card__muted">{providerDetail}</span>
            {privateNote && <small className="ci-seller-offer-card__private-note">{privateNote}</small>}
          </div>
        </div>
        <div className="ci-seller-offer-card__inline">
          <Badge tone={status.tone}>{status.label}</Badge>
          {onEdit && <Button type="button" size="sm" variant="outline" onClick={onEdit}><Pencil size={14} />Edit offer</Button>}
          {onModels && <Button type="button" size="sm" variant="outline" onClick={onModels}><Layers size={14} />Models</Button>}
        </div>
      </div>
      <div className="ci-seller-offer-card__body">
        <div>
          <small>Offer</small>
          <h3>{offer.price}</h3>
          <p>{offer.detail}</p>
          {onEdit && (
            <button type="button" className="ci-seller-card__text-link" onClick={onEdit}>
              What would another price mean?
            </button>
          )}
        </div>
        <OfferVolume volume={volume} />
        <div>
          <small>{earnings.label}</small>
          <h3>{earnings.value}</h3>
          <p>{earnings.detail}</p>
          {earnings.models?.map((model) => <p key={model}>{model}</p>)}
        </div>
      </div>
      <div className="ci-seller-offer-card__footer">
        <small>{capFooter.label}</small>
        <strong>{capFooter.name}</strong>
        {capFooter.detail && <span>{capFooter.detail}</span>}
        {capFooter.action && (
          <Button type="button" size="sm" variant="link" onClick={capFooter.action.onSelect}>
            {capFooter.action.label}<ArrowDown size={14} />
          </Button>
        )}
      </div>
      {expiry && (
        <div className="ci-seller-offer-card__expiry">
          <AlertCircle size={16} />
          <div><strong>{expiry.title}</strong><p>{expiry.detail}</p></div>
          {onEdit && <Button type="button" size="sm" variant="outline" onClick={onEdit}>Edit offer</Button>}
        </div>
      )}
    </article>
  );
}

/** The visual summary of one volume cap. The dashboard controls cap changes and membership. */
export function SellerVolumeCapCard({
  label, name, onNameSelect, status, actions, amount, amountDetail, usage, breakdown,
  warning, memberLabel, members, dates, footerAction, className, ...props
}: SellerVolumeCapCardProps) {
  return (
    <article data-ci-seller="" className={cn("ci-seller-card", "ci-seller-cap-card", className)} tabIndex={-1} {...props}>
      <header>
        <div>
          <small>{label}</small>
          {onNameSelect ? (
            <button type="button" className="ci-seller-cap-card__name" onClick={onNameSelect}>{name}</button>
          ) : <div className="ci-seller-cap-card__name">{name}</div>}
        </div>
        <Badge className="ci-seller-cap-card__status" tone={status.tone}>{status.label}</Badge>
        {actions && actions.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="ghost" size="sm" aria-label={"Actions for " + name}>
                <MoreHorizontal size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {actions.map(({ label, onSelect }) => (
                <DropdownMenuItem key={label} onSelect={onSelect}>{label}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </header>
      <div className="ci-seller-cap-card__total">
        <strong>{amount}</strong><span>{amountDetail}</span>
      </div>
      <SellerCapUsageBar {...usage} />
      {breakdown && (
        <div className="ci-seller-cap-card__breakdown">
          {breakdown.members.map(({ label, value }) => (
            <span key={label}><i aria-hidden="true" />{label} <b>{value}</b></span>
          ))}
          <span>{breakdown.leftover.label} <b>{breakdown.leftover.value}</b></span>
        </div>
      )}
      {warning && (
        <div className="ci-seller-cap-card__warning" role="status">
          <AlertCircle size={16} />
          <span>{warning}</span>
        </div>
      )}
      <div className="ci-seller-cap-card__members">
        <small>{memberLabel}</small>
        {members.map((member) => <span key={member}>{member}</span>)}
      </div>
      <footer>
        <small>{dates}</small>
        {footerAction && (
          <Button type="button" size="sm" variant="outline" onClick={footerAction.onSelect}>{footerAction.label}</Button>
        )}
      </footer>
    </article>
  );
}
