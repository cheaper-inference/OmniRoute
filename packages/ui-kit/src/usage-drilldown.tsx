"use client";

import type { ComponentProps, ReactNode, Ref } from "react";
import { Boxes, Check, Copy, Hash, HelpCircle, Layers3, ReceiptText, Shield, Timer } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Skeleton } from "./skeleton";
import { Table } from "./table";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { cn } from "./lib/utils";

/** Values are already formatted by the dashboard. Null means unavailable, never zero. */
export type UsageDetailValue = ReactNode;

export interface UsageInfoTooltipProps {
  label: string;
  children: ReactNode;
}
export function UsageInfoTooltip({ label, children }: UsageInfoTooltipProps) {
  return <Tooltip><TooltipTrigger asChild><button type="button" className="ci-usage-info" aria-label={label}><HelpCircle aria-hidden="true" /></button></TooltipTrigger><TooltipContent className="ci-usage-info__content">{children}</TooltipContent></Tooltip>;
}

export interface UsageDrilldownHeaderProps extends Omit<ComponentProps<"div">, "title"> {
  eyebrow: ReactNode;
  title: ReactNode;
  status?: ReactNode;
  description?: ReactNode;
  endpoint?: ReactNode;
  identity?: ReactNode;
  closeAction?: ReactNode;
  headingRef?: Ref<HTMLHeadingElement>;
}
/** Use as the header of DockedRail. The caller supplies a Badge and DockedRailClose. */
export function UsageDrilldownHeader({ eyebrow, title, status, description, endpoint, identity, closeAction, headingRef, className, ...props }: UsageDrilldownHeaderProps) {
  return <div data-slot="usage-drilldown-header" className={cn("ci-usage-drilldown-header", className)} {...props}>
    <div className="ci-usage-drilldown-header__top"><p className="ci-usage-drilldown-header__eyebrow">{eyebrow}</p>{closeAction}</div>
    <div className="ci-usage-drilldown-header__title-line"><h2 ref={headingRef} tabIndex={-1}>{title}</h2>{status}</div>
    {(description != null || endpoint != null || identity != null) && <div className="ci-usage-drilldown-header__description">{description}{endpoint != null && <span className="ci-usage-drilldown-header__endpoint">{endpoint}</span>}{identity}</div>}
  </div>;
}

export interface UsageRequestIdentityProps extends ComponentProps<"div"> {
  requestId: string;
  /** Clipboard access, success and failure state remain controlled by the caller. */
  onCopy?: () => void;
  copied?: boolean;
  copyError?: ReactNode;
  help?: ReactNode;
  timestamp?: ReactNode;
}
export function UsageRequestIdentity({ requestId, onCopy, copied = false, copyError, help = "Include this ID when contacting support so we can locate this exact request.", timestamp, className, ...props }: UsageRequestIdentityProps) {
  return <div data-slot="usage-request-identity" className={cn("ci-usage-request-identity", className)} {...props}>
    <span className="ci-usage-request-identity__label"><Hash size={14} aria-hidden="true" />Request ID</span><code>{requestId}</code>
    {onCopy && <Button type="button" variant="ghost" size="icon-xs" aria-label={copied ? "Request ID copied" : "Copy request ID"} onClick={onCopy}>{copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}</Button>}
    {help != null && <UsageInfoTooltip label="About request ID">{help}</UsageInfoTooltip>}
    {timestamp != null && <span className="ci-usage-request-identity__timestamp">{timestamp}</span>}
    <span className="ci-usage-request-identity__feedback" role="status">{copyError ?? (copied ? "Request ID copied" : null)}</span>
  </div>;
}

export interface UsageReceiptRow {
  id: string;
  label: ReactNode;
  value: UsageDetailValue;
  help?: ReactNode;
  helpLabel?: string;
  indent?: boolean;
  strong?: boolean;
  tone?: "default" | "muted" | "positive";
}
function ReceiptRow({ label, value, help, helpLabel, indent, strong, tone = "default" }: UsageReceiptRow) {
  return <div className={cn("ci-usage-receipt__row", indent && "ci-usage-receipt__row--indent", strong && "ci-usage-receipt__row--strong")}>
    <dt>{label}{help != null && <UsageInfoTooltip label={helpLabel ?? `About ${typeof label === "string" ? label.toLowerCase() : "this amount"}`}>{help}</UsageInfoTooltip>}</dt>
    <span className="ci-usage-receipt__leader" aria-hidden="true" /><dd data-tone={tone}>{value ?? "—"}</dd>
  </div>;
}
export interface UsageCostBreakdownProps extends Omit<ComponentProps<"div">, "title"> {
  title?: ReactNode;
  badge?: ReactNode;
  rows: UsageReceiptRow[];
  /** Optional optimization rows are already calculated and attributed by the caller. */
  optimizations?: UsageReceiptRow[];
  optimizationTotal?: UsageReceiptRow;
  totals: UsageReceiptRow[];
  note?: ReactNode;
  retention?: ReactNode;
  retentionHelp?: ReactNode;
  label?: string;
}
/** Receipt presentation only: no currency conversion, discount calculation or clamping. */
export function UsageCostBreakdown({ title = "Cost breakdown", badge, rows, optimizations, optimizationTotal, totals, note, retention, retentionHelp, label = "Savings breakdown for this request", className, ...props }: UsageCostBreakdownProps) {
  return <Card data-slot="usage-cost-breakdown" aria-label={label} className={cn("ci-usage-receipt", className)} {...props}>
    <div className="ci-usage-receipt__heading"><h3><ReceiptText aria-hidden="true" />{title}</h3>{badge}</div>
    <dl className="ci-usage-receipt__lines">{rows.map(row => <ReceiptRow key={row.id} {...row} />)}</dl>
    {optimizations && optimizations.length > 0 && <><p className="ci-usage-receipt__group-label">Optimizations</p><dl className="ci-usage-receipt__lines">{optimizations.map(row => <ReceiptRow key={row.id} {...row} indent />)}</dl></>}
    {optimizationTotal && <dl className="ci-usage-receipt__lines"><ReceiptRow {...optimizationTotal} /></dl>}
    <dl className="ci-usage-receipt__totals">{totals.map(row => <ReceiptRow key={row.id} {...row} strong />)}</dl>
    {note != null && <p className="ci-usage-receipt__note">{note}</p>}
    {retention != null && <div className="ci-usage-receipt__retention"><Shield aria-hidden="true" />{retention}{retentionHelp != null && <UsageInfoTooltip label="About data retention">{retentionHelp}</UsageInfoTooltip>}</div>}
  </Card>;
}

export interface UsageTokenUsageProps extends ComponentProps<"div"> {
  originalInput?: UsageDetailValue;
  input: UsageDetailValue;
  output: UsageDetailValue;
  cachedInput?: UsageDetailValue;
  showOriginal?: boolean;
  showCached?: boolean;
}
const tokenHelp = {
  original: "Prompt tokens recorded before request optimization.",
  input: "Prompt tokens recorded for the model request after processing. This can differ from the original count because of formatting or token accounting.",
  cached: "Cached input is included in sent-to-model input tokens. Do not add it to the total again.",
  output: "Completion tokens reported for the generated response.",
};
export function UsageTokenUsage({ originalInput, input, output, cachedInput, showOriginal = true, showCached = false, className, ...props }: UsageTokenUsageProps) {
  const rows = [
    ...(showOriginal ? [{ id: "original", label: "Original input", value: originalInput, help: tokenHelp.original }] : []),
    { id: "input", label: "Sent to model", value: input, help: tokenHelp.input },
    ...(showCached || cachedInput !== undefined ? [{ id: "cached", label: "Of which cached", value: cachedInput, help: tokenHelp.cached }] : []),
    { id: "output", label: "Output", value: output, help: tokenHelp.output },
  ];
  return <Card data-slot="usage-token-usage" className={cn("ci-usage-section", className)} title={<h3 className="ci-usage-section__title"><Layers3 aria-hidden="true" />Token usage</h3>} {...props}>
    <dl className="ci-usage-token-rows">{rows.map(row => <div key={row.id} className={cn("ci-usage-token-row", row.id === "cached" && "ci-usage-token-row--cached")}><dt>{row.label}<UsageInfoTooltip label={`About ${row.id === "cached" ? "cached input" : row.label.toLowerCase()}`}>{row.help}{row.value == null && " This value is unavailable; it does not mean zero."}</UsageInfoTooltip></dt><dd>{row.value ?? "—"}</dd></div>)}</dl>
  </Card>;
}

export interface UsageDetailRow {
  id: string;
  label: ReactNode;
  value: UsageDetailValue;
  help?: ReactNode;
  helpLabel?: string;
  icon?: ReactNode;
}
export interface UsageDetailSectionProps extends Omit<ComponentProps<"div">, "title"> {
  title: ReactNode;
  icon?: ReactNode;
  description?: ReactNode;
  rows: UsageDetailRow[];
  secondaryRows?: UsageDetailRow[];
}
function DetailRows({ rows }: { rows: UsageDetailRow[] }) {
  return <dl className="ci-usage-detail-rows">{rows.map(row => <div key={row.id}><dt>{row.icon}{row.label}{row.help != null && <UsageInfoTooltip label={row.helpLabel ?? `About ${typeof row.label === "string" ? row.label.toLowerCase() : "this detail"}`}>{row.help}</UsageInfoTooltip>}</dt><dd>{row.value ?? "—"}</dd></div>)}</dl>;
}
/** Also supports approved optional Pricing rows. Caller supplies customer-safe fields. */
export function UsageDetailSection({ title, icon, description, rows, secondaryRows, className, ...props }: UsageDetailSectionProps) {
  return <Card data-slot="usage-detail-section" className={cn("ci-usage-section", className)} title={<h3 className="ci-usage-section__title">{icon}{title}</h3>} description={description} {...props}><DetailRows rows={rows} />{secondaryRows && secondaryRows.length > 0 && <div className="ci-usage-detail-rows__secondary"><DetailRows rows={secondaryRows} /></div>}</Card>;
}
export type UsageTimingDeliveryProps = Omit<UsageDetailSectionProps, "title" | "icon">;
export function UsageTimingDelivery(props: UsageTimingDeliveryProps) {
  return <UsageDetailSection title="Timing & delivery" icon={<Timer aria-hidden="true" />} {...props} />;
}

export interface UsageModelRow {
  id: string;
  /** Usually ModelIdentity; use the same identity as the dashboard table. */
  model: ReactNode;
  requests: UsageDetailValue;
  spend: UsageDetailValue;
  onSelect?: () => void;
  selectLabel?: string;
}
export interface UsageModelsUsedProps extends ComponentProps<"div"> {
  models: UsageModelRow[];
  total?: { requests: UsageDetailValue; spend: UsageDetailValue };
}
export function UsageModelsUsed({ models, total, className, ...props }: UsageModelsUsedProps) {
  return <Card data-slot="usage-models-used" className={cn("ci-usage-section", className)} title={<h3 className="ci-usage-section__title"><Boxes aria-hidden="true" />Models used</h3>} {...props}>
    <div className="ci-usage-models-scroll"><Table className="ci-usage-models" containerClassName="ci-usage-models-container" scrollbarLabel="Models used" aria-label="Models used"><thead><tr><th scope="col">Model</th><th scope="col">Requests</th><th scope="col">Spend</th></tr></thead><tbody>{models.map(model => <tr key={model.id}><th scope="row">{model.onSelect ? <Button variant="ghost" size="sm" aria-label={model.selectLabel} onClick={model.onSelect}>{model.model}</Button> : model.model}</th><td>{model.requests ?? "—"}</td><td>{model.spend ?? "—"}</td></tr>)}</tbody>{total && <tfoot><tr><th scope="row">Total</th><td>{total.requests ?? "—"}</td><td>{total.spend ?? "—"}</td></tr></tfoot>}</Table></div>
  </Card>;
}

export function UsageDrilldownBody({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="usage-drilldown-body" className={cn("ci-usage-drilldown-body", className)} {...props} />;
}
/** Slots accept real buttons/links supplied by the dashboard; the kit owns no navigation. */
export function UsageDrilldownActions({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="usage-drilldown-actions" className={cn("ci-usage-drilldown-actions", className)} {...props} />;
}
/** Only pass customer-safe copy. The kit never infers a cause from a request status. */
export function UsageRequestFailure({ className, ...props }: ComponentProps<"p">) {
  return <p data-slot="usage-request-failure" role="status" className={cn("ci-usage-request-failure", className)} {...props} />;
}
export interface UsageDrilldownLoadingProps extends ComponentProps<"div"> { label?: string; }
export function UsageDrilldownLoading({ label = "Loading request details", className, ...props }: UsageDrilldownLoadingProps) {
  return <div role="status" aria-busy="true" aria-label={label} className={cn("ci-usage-drilldown-loading", className)} {...props}><span className="ci-usage-sr-only">{label}</span>{[0, 1, 2].map(index => <Card key={index} className="ci-usage-drilldown-loading__card" aria-hidden="true"><Skeleton width="45%" height={16} animation="pulse" />{[0, 1, 2].map(row => <Skeleton key={row} width="100%" height={12} animation="pulse" />)}</Card>)}</div>;
}
