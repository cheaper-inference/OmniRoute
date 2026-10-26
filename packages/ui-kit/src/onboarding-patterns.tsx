"use client";

import { useId, type ReactNode } from "react";
import { ArrowRight, CheckCircle2, ChevronDown, ChevronRight, ChevronUp, Circle, Sparkles, X } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { RadioGroupItem, type RadioGroupItemProps } from "./radio-group";
import { cn } from "./lib/utils";

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

export interface SetupProgressCardProps {
  steps: readonly { id: string; title: string; completed: boolean }[];
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
  className?: string;
}
/** Visibility, persistence, and the dismiss/undo toast belong to the caller. */
export function SetupProgressCard({ steps, onStepSelect, onResume, onDismiss, title = "Finish your setup", note = "Your progress is saved.", busy, collapsed = false, onCollapsedChange, showCount = true, className }: SetupProgressCardProps) {
  const detailsId = useId();
  const completed = steps.filter(step => step.completed).length;
  const next = steps.findIndex(step => !step.completed);
  return <Card className={cn("ci-setup-progress", className)} aria-label={title}><CardContent>
    <div className="ci-setup-progress__heading"><strong><Sparkles aria-hidden />{title}</strong>{showCount && <span>{completed}/{steps.length}</span>}
      {onCollapsedChange && <Button variant="ghost" size="icon-xs" aria-label={collapsed ? "Expand setup progress" : "Minimize setup progress"} aria-expanded={!collapsed} aria-controls={detailsId} disabled={busy} onClick={() => onCollapsedChange(!collapsed)}>{collapsed ? <ChevronDown aria-hidden /> : <ChevronUp aria-hidden />}</Button>}
      {onDismiss && <Button variant="ghost" size="icon-xs" aria-label="Dismiss setup progress" disabled={busy} onClick={onDismiss}><X aria-hidden /></Button>}</div>
    <progress className="ci-setup-progress__bar" value={completed} max={Math.max(steps.length, 1)} aria-label={`${completed} of ${steps.length} setup steps complete`} />
    <div id={detailsId} className="ci-setup-progress__details" hidden={collapsed}>
    <ol>{steps.map((step, index) => <li key={step.id}><button type="button" disabled={busy} onClick={() => onStepSelect(index)} aria-label={`${step.completed ? "Review" : "Complete"} ${step.title}`} data-complete={step.completed || undefined}>
      {step.completed ? <CheckCircle2 aria-hidden /> : <Circle aria-hidden />}<span>{step.title}</span>{index === next && <ChevronRight aria-hidden />}
    </button></li>)}</ol>
    <Button size="sm" disabled={busy} onClick={onResume}>Resume setup<ArrowRight aria-hidden /></Button>
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
}
/** Place after a flexing scroll region. It stays outside the scrollable form. */
export function SaveChangesBar({ dirty, onRevert, onSave, form, busy, saveLabel = "Save changes", revertLabel = "Revert all changes" }: SaveChangesBarProps) {
  if (!dirty) return null;
  return <footer className="ci-save-changes-bar" aria-label="Unsaved changes"><div>
    <Button type="button" variant="outline" disabled={busy} onClick={onRevert}>{revertLabel}</Button>
    <span role="status">Unsaved changes</span>
    <Button type={form ? "submit" : "button"} form={form} disabled={busy} onClick={onSave}>{busy ? "Saving…" : saveLabel}</Button>
  </div></footer>;
}
