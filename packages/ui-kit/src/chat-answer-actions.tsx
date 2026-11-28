"use client";

import { useId, useState, type ComponentProps } from "react";
import { ArrowRight, Check, MousePointer2, RotateCcw, ThumbsDown, ThumbsUp } from "lucide-react";
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
  /** Confirmed Not helpful selection. Only rendered with `onNotHelpful`. */
  notHelpful?: boolean;
  status?: ChatFeedbackStatus;
  onHelpful: (helpful: boolean) => void;
  /** Adds a Not helpful button after Helpful. Without it the component renders Helpful alone. */
  onNotHelpful?: (notHelpful: boolean) => void;
  labels?: { helpful?: string; markedHelpful?: string; sending?: string; retry?: string; removeHelpful?: string; notHelpful?: string; markedNotHelpful?: string; removeNotHelpful?: string; thanks?: string; cleared?: string; error?: string };
}

/**
 * Controlled feedback with a visible selection, live confirmation and recoverable error.
 * The sending, retry and confirmation states belong to the button clicked last (before any click, to
 * Not helpful when it is the only selection, otherwise to Helpful); while pending, both are disabled.
 */
export function ChatFeedback({ helpful = false, notHelpful = false, status = "idle", onHelpful, onNotHelpful, labels = {}, className, ...props }: ChatFeedbackProps) {
  const messageId = useId();
  const [lastClicked, setLastClicked] = useState<"helpful" | "notHelpful" | null>(null);
  const { helpful: helpfulLabel = "Helpful", markedHelpful = "Marked helpful", sending = "Sending feedback…", retry = "Try again", removeHelpful = "Remove helpful feedback", notHelpful: notHelpfulLabel = "Not helpful", markedNotHelpful = "Marked not helpful", removeNotHelpful = "Remove not helpful feedback", thanks = "Thanks for your feedback.", cleared = "Feedback cleared.", error = "Couldn’t send feedback. Please try again." } = labels;
  const pending = status === "pending";
  const failed = status === "error";
  const owner = onNotHelpful ? lastClicked ?? (notHelpful && !helpful ? "notHelpful" : "helpful") : "helpful";
  const helpfulActive = owner === "helpful";
  const notHelpfulActive = !helpfulActive;
  return <div {...props} className={cn("ci-chat-feedback", className)}>
    <Button type="button" variant="ghost" size="sm" loading={pending && helpfulActive} disabled={pending} aria-pressed={helpful} aria-describedby={status === "idle" || !helpfulActive ? undefined : messageId} aria-label={helpful && !(helpfulActive && (pending || failed)) ? `${markedHelpful}. ${removeHelpful}` : undefined} data-selected={helpful || undefined} className="ci-chat-feedback__button" onClick={() => { setLastClicked("helpful"); onHelpful(!helpful); }}>
      {failed && helpfulActive ? <RotateCcw size={15} aria-hidden="true" /> : <ThumbsUp size={15} aria-hidden="true" />}
      {pending && helpfulActive ? sending : failed && helpfulActive ? retry : helpful ? markedHelpful : helpfulLabel}
    </Button>
    {onNotHelpful && <Button type="button" variant="ghost" size="sm" loading={pending && notHelpfulActive} disabled={pending} aria-pressed={notHelpful} aria-describedby={status === "idle" || !notHelpfulActive ? undefined : messageId} aria-label={notHelpful && !(notHelpfulActive && (pending || failed)) ? `${markedNotHelpful}. ${removeNotHelpful}` : undefined} data-selected={notHelpful || undefined} className="ci-chat-feedback__button" onClick={() => { setLastClicked("notHelpful"); onNotHelpful(!notHelpful); }}>
      {failed && notHelpfulActive ? <RotateCcw size={15} aria-hidden="true" /> : <ThumbsDown size={15} aria-hidden="true" />}
      {pending && notHelpfulActive ? sending : failed && notHelpfulActive ? retry : notHelpful ? markedNotHelpful : notHelpfulLabel}
    </Button>}
    <span id={messageId} role={failed ? "alert" : "status"} className="ci-chat-feedback__message" data-error={failed || undefined}>
      {status === "success" && <><Check size={14} aria-hidden="true" />{helpful || notHelpful ? thanks : cleared}</>}
      {failed && error}
    </span>
  </div>;
}
