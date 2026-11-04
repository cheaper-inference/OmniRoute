"use client";

import { useId, type ReactNode } from "react";
import { ArrowRight, CheckCircle2, ChevronDown, ChevronRight, ChevronUp, Circle, Pencil, Sparkles, X } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { RadioGroupItem, type RadioGroupItemProps } from "./radio-group";
import { cn } from "./lib/utils";
import { Checkbox, type CheckboxProps } from "./checkbox";

export type ChoiceCardTone = "neutral" | "accent" | "info" | "success";
export interface ChoiceCardProps extends Omit<RadioGroupItemProps, "card" | "label" | "title"> {
  title: ReactNode;
  icon?: ReactNode;
  tone?: ChoiceCardTone;
}
/** Native radio semantics with a consistent icon, title, and description. */
export function ChoiceCard({ title, icon, tone = "neutral", className, ...props }: ChoiceCardProps) {
  return <RadioGroupItem {...props} card className={cn("ci-choice-card", `ci-choice-card--${tone}`, className)} label={
    <span className="ci-choice-card__heading">{icon && <span className="ci-choice-card__icon" aria-hidden>{icon}</span>}<span>{title}</span></span>
  } />;
}

/** Decorative product illustrations. All selection remains on the native checkbox. */
function ChoiceCardVisual({ visual }: { visual: "models" | "gpus" | "optimization" }) {
  return <span className={`ci-choice-visual ci-choice-visual--${visual}`} aria-hidden="true">
    {Array.from({ length: visual === "gpus" ? 9 : 5 }, (_, index) => <span className="ci-choice-visual__block" key={index} />)}
  </span>;
}

export interface MultiChoiceCardProps extends Omit<CheckboxProps, "label" | "title"> {
  title: ReactNode;
  icon?: ReactNode;
  /** Large product-selection tile with a decorative animated illustration. */
  variant?: "default" | "feature";
  visual?: "models" | "gpus" | "optimization";
}
/** A native checkbox card for independent, multi-select onboarding choices. */
export function MultiChoiceCard({ title, icon, variant = "default", visual, className, ...props }: MultiChoiceCardProps) {
  return <Checkbox {...props} card className={cn("ci-choice-card", "ci-multi-choice-card", variant === "feature" && "ci-multi-choice-card--feature", className)} label={<>{variant === "feature" && visual && <ChoiceCardVisual visual={visual} />}<span className="ci-choice-card__heading">{icon && <span className="ci-choice-card__icon" aria-hidden>{icon}</span>}<span>{title}</span></span></>} />;
}

export interface SetupLayoutProps { children: ReactNode; aside?: ReactNode; className?: string; /** Compact section headings for dense workspace and payment setup. */ headingVariant?: "default" | "compact"; /** Wider right column for embedded booking or configuration. */ asideSize?: "default" | "wide" | "booking"; }
/** Shared content/benefits layout for workspace setup and wallet payment summaries. */
export function SetupLayout({ children, aside, className, headingVariant = "default", asideSize = "default" }: SetupLayoutProps) {
  return <div className={cn("ci-setup-layout", asideSize !== "default" && `ci-setup-layout--${asideSize}`, headingVariant === "compact" && "ci-setup-layout--compact", className)}><div className="ci-setup-layout__main">{children}</div>{aside && <aside className="ci-setup-layout__aside">{aside}</aside>}</div>;
}

export interface SetupBenefitsProps { title: string; description?: string; items: readonly { title: string; description: string; icon?: ReactNode }[]; }
export function SetupBenefits({ title, description, items }: SetupBenefitsProps) {
  return <div className="ci-setup-benefits"><h2>{title}</h2>{description && <p>{description}</p>}<ul>{items.map(item => <li key={item.title}>{item.icon && <span aria-hidden>{item.icon}</span>}<div><strong>{item.title}</strong><p>{item.description}</p></div></li>)}</ul></div>;
}

/** Interface text for SetupProgressCard; `title` and `note` remain separate props. */
export interface SetupProgressCardLabels {
  /** Accessible name of the progress bar. */
  progress: (completed: number, total: number) => string;
  expand: string;
  minimize: string;
  dismiss: string;
  /** Accessible name of a completed step button. */
  reviewStep: (title: string) => string;
  /** Accessible name of an incomplete step button. */
  completeStep: (title: string) => string;
  resume: string;
}
export const defaultSetupProgressCardLabels: SetupProgressCardLabels = {
  progress: (completed, total) => `${completed} of ${total} setup steps complete`,
  expand: "Expand setup progress",
  minimize: "Minimize setup progress",
  dismiss: "Dismiss setup progress",
  reviewStep: (title) => `Review ${title}`,
  completeStep: (title) => `Complete ${title}`,
  resume: "Resume setup",
};
/** Copy only the defined overrides, so an omitted or `undefined` key keeps its English default. */
function resolveSetupProgressCardLabels(overrides: Partial<SetupProgressCardLabels> | undefined): SetupProgressCardLabels {
  const labels = { ...defaultSetupProgressCardLabels };
  if (overrides) for (const key of Object.keys(overrides) as (keyof SetupProgressCardLabels)[]) {
    if (overrides[key] !== undefined) Object.assign(labels, { [key]: overrides[key] });
  }
  return labels;
}
export interface SetupProgressCardStep {
  id: string;
  title: string;
  completed: boolean;
  /** Optional control beside the step, outside the step button. `true`/`false` count as absent; the caller owns its busy state. */
  action?: ReactNode;
}
export interface SetupProgressCardProps {
  steps: readonly SetupProgressCardStep[];
  onStepSelect: (index: number) => void;
  onResume: () => void;
  onDismiss?: () => void;
  title?: string;
  note?: ReactNode;
  busy?: boolean;
  /** Controlled collapse; provide the callback to show the minimize button. */
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Hide the numeric count in compact mobile placements. */
  showCount?: boolean;
  /** Localized interface text; omitted or undefined keys fall back to defaultSetupProgressCardLabels. */
  labels?: Partial<SetupProgressCardLabels>;
  className?: string;
}
/** Visibility, persistence, and the dismiss/undo toast belong to the caller. */
export function SetupProgressCard({ steps, onStepSelect, onResume, onDismiss, title = "Finish your setup", note = "Your progress is saved.", busy, collapsed = false, onCollapsedChange, showCount = true, labels: labelOverrides, className }: SetupProgressCardProps) {
  const labels = resolveSetupProgressCardLabels(labelOverrides);
  const detailsId = useId();
  const completed = steps.filter(step => step.completed).length;
  const next = steps.findIndex(step => !step.completed);
  return <Card className={cn("ci-setup-progress", className)} aria-label={title}><CardContent>
    <div className="ci-setup-progress__heading"><strong><Sparkles aria-hidden />{title}</strong>{showCount && <span>{completed}/{steps.length}</span>}
      {onCollapsedChange && <Button variant="ghost" size="icon-xs" aria-label={collapsed ? labels.expand : labels.minimize} aria-expanded={!collapsed} aria-controls={detailsId} disabled={busy} onClick={() => onCollapsedChange(!collapsed)}>{collapsed ? <ChevronDown aria-hidden /> : <ChevronUp aria-hidden />}</Button>}
      {onDismiss && <Button variant="ghost" size="icon-xs" aria-label={labels.dismiss} disabled={busy} onClick={onDismiss}><X aria-hidden /></Button>}</div>
    <progress className="ci-setup-progress__bar" value={completed} max={Math.max(steps.length, 1)} aria-label={labels.progress(completed, steps.length)} />
    <div id={detailsId} className="ci-setup-progress__details" hidden={collapsed}>
    <ol>{steps.map((step, index) => <li key={step.id}><button type="button" disabled={busy} onClick={() => onStepSelect(index)} aria-label={step.completed ? labels.reviewStep(step.title) : labels.completeStep(step.title)} data-complete={step.completed || undefined}>
      {step.completed ? <CheckCircle2 aria-hidden /> : <Circle aria-hidden />}<span>{step.title}</span>{index === next && <ChevronRight aria-hidden />}
    </button>{step.action != null && typeof step.action !== "boolean" && <span className="ci-setup-progress__step-action">{step.action}</span>}</li>)}</ol>
    <Button size="sm" disabled={busy} onClick={onResume}>{labels.resume}<ArrowRight aria-hidden /></Button>
    {note && <p>{note}</p>}
    </div>
  </CardContent></Card>;
}

export interface SaveChangesBarProps {
  dirty: boolean;
  onRevert: () => void;
  onSave?: () => void;
  form?: string;
  busy?: boolean;
  saveLabel?: string;
  revertLabel?: string;
  /** Visible status and accessible name of the bar. Defaults to "Unsaved changes". */
  statusLabel?: string;
  /** Save button text while busy. Defaults to "Saving…". */
  savingLabel?: string;
}
/** Place after a flexing scroll region. It stays outside the scrollable form. */
export function SaveChangesBar({ dirty, onRevert, onSave, form, busy, saveLabel = "Save changes", revertLabel = "Revert all changes", statusLabel = "Unsaved changes", savingLabel = "Saving…" }: SaveChangesBarProps) {
  if (!dirty) return null;
  return <footer className="ci-save-changes-bar" aria-label={statusLabel}><div>
    <Button type="button" variant="outline" disabled={busy} onClick={onRevert}>{revertLabel}</Button>
    <span role="status">{statusLabel}</span>
    <Button type={form ? "submit" : "button"} form={form} disabled={busy} onClick={onSave}>{busy ? savingLabel : saveLabel}</Button>
  </div></footer>;
}

export interface SetupSelectionSummaryProps {
  items: readonly { id: string; label: string; icon?: ReactNode }[];
  onEdit?: () => void;
  editLabel?: string;
  /** Accessible name of the selected-interest list. Defaults to "Selected interests". */
  listLabel?: string;
  disabled?: boolean;
}
/** Keeps selected interests in context; omit onEdit when the wizard owns Back. */
export function SetupSelectionSummary({ items, onEdit, editLabel = "Edit interests", listLabel = "Selected interests", disabled }: SetupSelectionSummaryProps) {
  return <div className="ci-setup-selection"><ul aria-label={listLabel}>{items.map(item => <li key={item.id}>{item.icon && <span aria-hidden>{item.icon}</span>}<span>{item.label}</span></li>)}</ul>{onEdit && <Button type="button" variant="ghost" size="sm" disabled={disabled} onClick={onEdit}><Pencil aria-hidden />{editLabel}</Button>}</div>;
}
