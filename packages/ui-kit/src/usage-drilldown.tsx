"use client";

import type { ComponentProps, ReactNode, Ref } from "react";
import { Boxes, Check, Copy, Hash, HelpCircle, Layers3, ReceiptText, Shield, Timer } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Skeleton } from "./skeleton";
import { Table } from "./table";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { resolveLabels } from "./lib/labels";
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

/** Interface text of UsageRequestIdentity. `help` stays a separate prop. */
export interface UsageRequestIdentityLabels {
  requestId: string;
  /** Copy button accessible name. */
  copy: string;
  /** Copy button accessible name and status after a copy. */
  copied: string;
  /** Help button accessible name. */
  about: string;
}
export const defaultUsageRequestIdentityLabels: UsageRequestIdentityLabels = {
  requestId: "Request ID",
  copy: "Copy request ID",
  copied: "Request ID copied",
  about: "About request ID",
};
export interface UsageRequestIdentityProps extends ComponentProps<"div"> {
  requestId: string;
  /** Clipboard access, success and failure state remain controlled by the caller. */
  onCopy?: () => void;
  copied?: boolean;
  copyError?: ReactNode;
  help?: ReactNode;
  timestamp?: ReactNode;
  /** Localized interface text; missing or `undefined` keys fall back to defaultUsageRequestIdentityLabels. */
  labels?: Partial<UsageRequestIdentityLabels>;
}
export function UsageRequestIdentity({ requestId, onCopy, copied = false, copyError, help = "Include this ID when contacting support so we can locate this exact request.", timestamp, labels: labelOverrides, className, ...props }: UsageRequestIdentityProps) {
  const labels = resolveLabels(defaultUsageRequestIdentityLabels, labelOverrides);
  return <div data-slot="usage-request-identity" className={cn("ci-usage-request-identity", className)} {...props}>
    <span className="ci-usage-request-identity__label"><Hash size={14} aria-hidden="true" />{labels.requestId}</span><code>{requestId}</code>
    {onCopy && <Button type="button" variant="ghost" size="icon-xs" aria-label={copied ? labels.copied : labels.copy} onClick={onCopy}>{copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}</Button>}
    {help != null && <UsageInfoTooltip label={labels.about}>{help}</UsageInfoTooltip>}
    {timestamp != null && <span className="ci-usage-request-identity__timestamp">{timestamp}</span>}
    <span className="ci-usage-request-identity__feedback" role="status">{copyError ?? (copied ? labels.copied : null)}</span>
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
function ReceiptRow({ label, value, help, helpLabel, indent, strong, tone = "default", about }: UsageReceiptRow & { about: (label?: string) => string }) {
  return <div className={cn("ci-usage-receipt__row", indent && "ci-usage-receipt__row--indent", strong && "ci-usage-receipt__row--strong")}>
    <dt>{label}{help != null && <UsageInfoTooltip label={helpLabel ?? about(typeof label === "string" ? label : undefined)}>{help}</UsageInfoTooltip>}</dt>
    <span className="ci-usage-receipt__leader" aria-hidden="true" /><dd data-tone={tone}>{value ?? "—"}</dd>
  </div>;
}
/** Interface text of UsageCostBreakdown. `title` and `label` stay separate props. */
export interface UsageCostBreakdownLabels {
  /** Heading of the optimization rows. */
  optimizations: string;
  /** Help button name of the retention line. */
  aboutRetention: string;
  /** Help button name of a row without `helpLabel`; `label` is the row label when it is a string. */
  about: (label?: string) => string;
}
export const defaultUsageCostBreakdownLabels: UsageCostBreakdownLabels = {
  optimizations: "Optimizations",
  aboutRetention: "About data retention",
  about: (label) => `About ${label ? label.toLowerCase() : "this amount"}`,
};
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
  /** Localized interface text; missing or `undefined` keys fall back to defaultUsageCostBreakdownLabels. */
  labels?: Partial<UsageCostBreakdownLabels>;
}
/** Receipt presentation only: no currency conversion, discount calculation or clamping. */
export function UsageCostBreakdown({ title = "Cost breakdown", badge, rows, optimizations, optimizationTotal, totals, note, retention, retentionHelp, label = "Savings breakdown for this request", labels: labelOverrides, className, ...props }: UsageCostBreakdownProps) {
  const labels = resolveLabels(defaultUsageCostBreakdownLabels, labelOverrides);
  return <Card data-slot="usage-cost-breakdown" aria-label={label} className={cn("ci-usage-receipt", className)} {...props}>
    <div className="ci-usage-receipt__heading"><h3><ReceiptText aria-hidden="true" />{title}</h3>{badge}</div>
    <dl className="ci-usage-receipt__lines">{rows.map(row => <ReceiptRow key={row.id} {...row} about={labels.about} />)}</dl>
    {optimizations && optimizations.length > 0 && <><p className="ci-usage-receipt__group-label">{labels.optimizations}</p><dl className="ci-usage-receipt__lines">{optimizations.map(row => <ReceiptRow key={row.id} {...row} indent about={labels.about} />)}</dl></>}
    {optimizationTotal && <dl className="ci-usage-receipt__lines"><ReceiptRow {...optimizationTotal} about={labels.about} /></dl>}
    <dl className="ci-usage-receipt__totals">{totals.map(row => <ReceiptRow key={row.id} {...row} strong about={labels.about} />)}</dl>
    {note != null && <p className="ci-usage-receipt__note">{note}</p>}
    {retention != null && <div className="ci-usage-receipt__retention"><Shield aria-hidden="true" />{retention}{retentionHelp != null && <UsageInfoTooltip label={labels.aboutRetention}>{retentionHelp}</UsageInfoTooltip>}</div>}
  </Card>;
}

export interface UsageTokenUsageProps extends ComponentProps<"div"> {
  originalInput?: UsageDetailValue;
  input: UsageDetailValue;
  output: UsageDetailValue;
  cachedInput?: UsageDetailValue;
  showOriginal?: boolean;
  showCached?: boolean;
  /** Localized interface text; missing or `undefined` keys fall back to defaultUsageTokenUsageLabels. */
  labels?: Partial<UsageTokenUsageLabels>;
}
/** Interface text of UsageTokenUsage: the title, the four rows and their help. */
export interface UsageTokenUsageLabels {
  title: string;
  original: string;
  input: string;
  cached: string;
  output: string;
  originalHelp: string;
  inputHelp: string;
  cachedHelp: string;
  outputHelp: string;
  /** Help button name of the original, input and output rows, from the row label. */
  about: (label: string) => string;
  /** Help button name of the cached row. */
  aboutCached: string;
  /** Sentence added to a row's help when its value is null. */
  unavailable: string;
}
export const defaultUsageTokenUsageLabels: UsageTokenUsageLabels = {
  title: "Token usage",
  original: "Original input",
  input: "Sent to model",
  cached: "Of which cached",
  output: "Output",
  originalHelp: "Prompt tokens recorded before request optimization.",
  inputHelp: "Prompt tokens recorded for the model request after processing. This can differ from the original count because of formatting or token accounting.",
  cachedHelp: "Cached input is included in sent-to-model input tokens. Do not add it to the total again.",
  outputHelp: "Completion tokens reported for the generated response.",
  about: (label) => `About ${label.toLowerCase()}`,
  aboutCached: "About cached input",
  unavailable: "This value is unavailable; it does not mean zero.",
};
export function UsageTokenUsage({ originalInput, input, output, cachedInput, showOriginal = true, showCached = false, labels: labelOverrides, className, ...props }: UsageTokenUsageProps) {
  const labels = resolveLabels(defaultUsageTokenUsageLabels, labelOverrides);
  const rows = [
    ...(showOriginal ? [{ id: "original", label: labels.original, value: originalInput, help: labels.originalHelp }] : []),
    { id: "input", label: labels.input, value: input, help: labels.inputHelp },
    ...(showCached || cachedInput !== undefined ? [{ id: "cached", label: labels.cached, value: cachedInput, help: labels.cachedHelp }] : []),
    { id: "output", label: labels.output, value: output, help: labels.outputHelp },
  ];
  return <Card data-slot="usage-token-usage" className={cn("ci-usage-section", className)} title={<h3 className="ci-usage-section__title"><Layers3 aria-hidden="true" />{labels.title}</h3>} {...props}>
    <dl className="ci-usage-token-rows">{rows.map(row => <div key={row.id} className={cn("ci-usage-token-row", row.id === "cached" && "ci-usage-token-row--cached")}><dt>{row.label}<UsageInfoTooltip label={row.id === "cached" ? labels.aboutCached : labels.about(row.label)}>{row.help}{row.value == null && ` ${labels.unavailable}`}</UsageInfoTooltip></dt><dd>{row.value ?? "—"}</dd></div>)}</dl>
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
  /** Help button name of a row without `helpLabel`; `label` is the row label when it is a string. Defaults to "About …". */
  aboutLabel?: (label?: string) => string;
}
const defaultUsageDetailAboutLabel = (label?: string) => `About ${label ? label.toLowerCase() : "this detail"}`;
function DetailRows({ rows, about }: { rows: UsageDetailRow[]; about: (label?: string) => string }) {
  return <dl className="ci-usage-detail-rows">{rows.map(row => <div key={row.id}><dt>{row.icon}{row.label}{row.help != null && <UsageInfoTooltip label={row.helpLabel ?? about(typeof row.label === "string" ? row.label : undefined)}>{row.help}</UsageInfoTooltip>}</dt><dd>{row.value ?? "—"}</dd></div>)}</dl>;
}
/** Also supports approved optional Pricing rows. Caller supplies customer-safe fields. */
export function UsageDetailSection({ title, icon, description, rows, secondaryRows, aboutLabel = defaultUsageDetailAboutLabel, className, ...props }: UsageDetailSectionProps) {
  return <Card data-slot="usage-detail-section" className={cn("ci-usage-section", className)} title={<h3 className="ci-usage-section__title">{icon}{title}</h3>} description={description} {...props}><DetailRows rows={rows} about={aboutLabel} />{secondaryRows && secondaryRows.length > 0 && <div className="ci-usage-detail-rows__secondary"><DetailRows rows={secondaryRows} about={aboutLabel} /></div>}</Card>;
}
export type UsageTimingDeliveryProps = Omit<UsageDetailSectionProps, "title" | "icon"> & {
  /** Section heading. Defaults to "Timing & delivery". */
  title?: ReactNode;
};
export function UsageTimingDelivery({ title = "Timing & delivery", ...props }: UsageTimingDeliveryProps) {
  return <UsageDetailSection title={title} icon={<Timer aria-hidden="true" />} {...props} />;
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
/** Interface text of UsageModelsUsed: the title (also the table name) and the column headers. */
export interface UsageModelsUsedLabels {
  title: string;
  model: string;
  requests: string;
  spend: string;
  total: string;
}
export const defaultUsageModelsUsedLabels: UsageModelsUsedLabels = {
  title: "Models used",
  model: "Model",
  requests: "Requests",
  spend: "Spend",
  total: "Total",
};
export interface UsageModelsUsedProps extends ComponentProps<"div"> {
  models: UsageModelRow[];
  total?: { requests: UsageDetailValue; spend: UsageDetailValue };
  /** Localized interface text; missing or `undefined` keys fall back to defaultUsageModelsUsedLabels. */
  labels?: Partial<UsageModelsUsedLabels>;
}
export function UsageModelsUsed({ models, total, labels: labelOverrides, className, ...props }: UsageModelsUsedProps) {
  const labels = resolveLabels(defaultUsageModelsUsedLabels, labelOverrides);
  return <Card data-slot="usage-models-used" className={cn("ci-usage-section", className)} title={<h3 className="ci-usage-section__title"><Boxes aria-hidden="true" />{labels.title}</h3>} {...props}>
    <div className="ci-usage-models-scroll"><Table className="ci-usage-models" containerClassName="ci-usage-models-container" scrollbarLabel={labels.title} aria-label={labels.title}><thead><tr><th scope="col">{labels.model}</th><th scope="col">{labels.requests}</th><th scope="col">{labels.spend}</th></tr></thead><tbody>{models.map(model => <tr key={model.id}><th scope="row">{model.onSelect ? <Button variant="ghost" size="sm" aria-label={model.selectLabel} onClick={model.onSelect}>{model.model}</Button> : model.model}</th><td>{model.requests ?? "—"}</td><td>{model.spend ?? "—"}</td></tr>)}</tbody>{total && <tfoot><tr><th scope="row">{labels.total}</th><td>{total.requests ?? "—"}</td><td>{total.spend ?? "—"}</td></tr></tfoot>}</Table></div>
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
