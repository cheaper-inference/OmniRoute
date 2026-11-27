"use client";

import { useId, type ComponentProps } from "react";
import { ArrowRight, Check, MousePointer2, RotateCcw, ThumbsUp } from "lucide-react";
import { Button } from "./button";
import { resolveLabels } from "./lib/labels";
import { cn } from "./lib/utils";

export interface ChatGuideCardLabels {
  /** Text of the eyebrow, before the step count. */
  eyebrow: string;
  /** Step count of the eyebrow, with its noun. */
  stepCount: (count: number) => string;
}

export const defaultChatGuideCardLabels: ChatGuideCardLabels = {
  eyebrow: "On-screen walkthrough",
  stepCount: (count) => `${count} ${count === 1 ? "step" : "steps"}`,
};

export interface ChatGuideCardProps extends Omit<ComponentProps<"section">, "title"> {
  title: string;
  stepCount: number;
  onStart: () => void;
  actionLabel?: string;
  description?: string;
  note?: string;
  disabled?: boolean;
  /** Localized text of the eyebrow; omitted or `undefined` keys fall back to defaultChatGuideCardLabels. */
  labels?: Partial<ChatGuideCardLabels>;
}

/** A discoverable invitation to an application-owned walkthrough. Starting it never submits a form. */
export function ChatGuideCard({ title, stepCount, onStart, actionLabel = "Guide me step by step", description = "Follow the highlights to see exactly where to click.", note = "You review and submit any changes.", disabled, labels: labelOverrides, className, ...props }: ChatGuideCardProps) {
  const id = useId();
  const labels = resolveLabels(defaultChatGuideCardLabels, labelOverrides);
  return <section {...props} aria-labelledby={id} className={cn("ci-chat-guide-card", className)}>
    <div className="ci-chat-guide-card__heading">
      <span className="ci-chat-guide-card__icon" aria-hidden="true"><MousePointer2 size={19} /></span>
      <div>
        <p className="ci-chat-guide-card__eyebrow">{labels.eyebrow} <span aria-hidden="true">·</span> {labels.stepCount(stepCount)}</p>
        <h2 id={id}>{title}</h2>
      </div>
    </div>
    <p className="ci-chat-guide-card__description">{description}</p>
    <Button type="button" variant="assistant" onClick={onStart} disabled={disabled} className="ci-chat-guide-card__action">{actionLabel}<ArrowRight size={17} aria-hidden="true" /></Button>
    <p className="ci-chat-guide-card__note">{note}</p>
  </section>;
}

export type ChatFeedbackStatus = "idle" | "pending" | "success" | "error";
export interface ChatFeedbackProps extends Omit<ComponentProps<"div">, "onChange"> {
  helpful?: boolean;
  status?: ChatFeedbackStatus;
  onHelpful: (helpful: boolean) => void;
  labels?: { helpful?: string; markedHelpful?: string; sending?: string; retry?: string; removeHelpful?: string; thanks?: string; cleared?: string; error?: string };
}

/** Controlled feedback with a visible selection, live confirmation and recoverable error. */
export function ChatFeedback({ helpful = false, status = "idle", onHelpful, labels = {}, className, ...props }: ChatFeedbackProps) {
  const messageId = useId();
  const { helpful: helpfulLabel = "Helpful", markedHelpful = "Marked helpful", sending = "Sending feedback…", retry = "Try again", removeHelpful = "Remove helpful feedback", thanks = "Thanks for your feedback.", cleared = "Feedback cleared.", error = "Couldn’t send feedback. Please try again." } = labels;
  const pending = status === "pending";
  const failed = status === "error";
  return <div {...props} className={cn("ci-chat-feedback", className)}>
    <Button type="button" variant="ghost" size="sm" loading={pending} disabled={pending} aria-pressed={helpful} aria-describedby={status === "idle" ? undefined : messageId} aria-label={helpful && !pending && !failed ? `${markedHelpful}. ${removeHelpful}` : undefined} data-selected={helpful || undefined} className="ci-chat-feedback__button" onClick={() => onHelpful(!helpful)}>
      {failed ? <RotateCcw size={15} aria-hidden="true" /> : <ThumbsUp size={15} aria-hidden="true" />}
      {pending ? sending : failed ? retry : helpful ? markedHelpful : helpfulLabel}
    </Button>
    <span id={messageId} role={failed ? "alert" : "status"} className="ci-chat-feedback__message" data-error={failed || undefined}>
      {status === "success" && <><Check size={14} aria-hidden="true" />{helpful ? thanks : cleared}</>}
      {failed && error}
    </span>
  </div>;
}
