"use client";

import { forwardRef, useId } from "react";
import type { ComponentProps, ReactNode } from "react";
import { AlignLeft, ArrowLeft, ArrowUp, Check, ChevronDown, Copy, History, Menu, MoreVertical, Pencil, Plus, RotateCcw, Square, SquarePen, ThumbsUp, Trash2, X } from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";
import { Textarea } from "./textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { cn } from "./lib/utils";

export interface ChatHeaderProps extends Omit<ComponentProps<"header">, "title"> {
  title: ReactNode;
  /** Decorative brand mark supplied by the application. */
  logo?: ReactNode;
  history?: boolean;
  onHistory?: () => void;
  onBack?: () => void;
  onNew?: () => void;
  onClose?: () => void;
  /** Permission-sensitive controls, such as Admin, belong to the caller. */
  accessory?: ReactNode;
  labels?: { history?: string; back?: string; newChat?: string; close?: string };
}

export function ChatHeader({ title, logo, history = false, onHistory, onBack, onNew, onClose, accessory, labels, className, ...props }: ChatHeaderProps) {
  const navigation = history ? onBack : onHistory;
  const navigationLabel = history ? labels?.back ?? "Back to chat" : labels?.history ?? "Recent chats";
  return <header className={cn("ci-chat-header", className)} data-history={history || undefined} {...props}>
    {navigation && <Button type="button" variant="ghost" size="icon-sm" aria-label={navigationLabel} title={navigationLabel} onClick={navigation}>
      {history ? <ArrowLeft aria-hidden size={18} /> : <Menu aria-hidden size={18} />}
    </Button>}
    <div className="ci-chat-header__identity">
      {!history && logo != null && <span className="ci-chat-header__logo" aria-hidden>{logo}</span>}
      <span className="ci-chat-header__title">{title}</span>
    </div>
    <div className="ci-chat-header__actions">
      {accessory}
      {onNew && <Button type="button" variant="ghost" size="icon-sm" aria-label={labels?.newChat ?? "New chat"} title={labels?.newChat ?? "New chat"} onClick={onNew}><SquarePen aria-hidden size={18} /></Button>}
      {onClose && <Button type="button" variant="ghost" size="icon-sm" aria-label={labels?.close ?? "Close assistant"} title={labels?.close ?? "Close assistant"} onClick={onClose}><X aria-hidden size={18} /></Button>}
    </div>
  </header>;
}

export interface ChatPrompt {
  id: string;
  label: ReactNode;
  /** Submitted immediately. This need not match the shortened visible label. */
  prompt: string;
  icon?: ReactNode;
  disabled?: boolean;
}
export interface ChatPromptListProps extends Omit<ComponentProps<"div">, "onSelect"> {
  prompts: readonly ChatPrompt[];
  onSelect: (prompt: string, item: ChatPrompt) => void;
  disabled?: boolean;
}
export function ChatPromptList({ prompts, onSelect, disabled, className, ...props }: ChatPromptListProps) {
  return <div className={cn("ci-chat-prompts", className)} {...props}>{prompts.map(item => <Button key={item.id} type="button" variant="outline" size="sm" disabled={disabled || item.disabled} onClick={() => onSelect(item.prompt, item)}>
    {item.icon != null && <span className="ci-chat-prompts__icon" aria-hidden>{item.icon}</span>}<span className="ci-chat-prompts__label">{item.label}</span>
  </Button>)}</div>;
}

export interface ChatWelcomeProps extends Omit<ComponentProps<"section">, "title"> {
  title: ReactNode;
  mark?: ReactNode;
  prompts?: readonly ChatPrompt[];
  onPrompt?: ChatPromptListProps["onSelect"];
  align?: "start" | "center";
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  disabled?: boolean;
}
export function ChatWelcome({ title, mark, prompts = [], onPrompt, align = "center", headingLevel = 2, disabled, className, children, ...props }: ChatWelcomeProps) {
  const id = useId();
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4" | "h5" | "h6";
  return <section aria-labelledby={id} className={cn("ci-chat-welcome", className)} data-align={align} {...props}>
    {mark != null && <span className="ci-chat-welcome__mark" aria-hidden>{mark}</span>}
    <Heading id={id} className="ci-chat-welcome__title">{title}</Heading>
    {onPrompt && <ChatPromptList prompts={prompts} onSelect={onPrompt} disabled={disabled} />}
    {children}
  </section>;
}

export interface ChatAttachment {
  id: string;
  name: string;
  icon?: ReactNode;
  status?: ReactNode;
}
export interface ChatComposerProps extends Omit<ComponentProps<"form">, "onChange" | "onSubmit"> {
  value: string;
  onValueChange: (value: string) => void;
  onSend: (value: string) => void;
  placeholder?: string;
  label?: string;
  sendLabel?: string;
  /** During a busy response, replace Send with a controlled cancellation action. */
  onStop?: () => void;
  stopLabel?: string;
  disabled?: boolean;
  busy?: boolean;
  /** Prevent sending while leaving the draft editable, e.g. while offline. */
  sendDisabled?: boolean;
  /** Enable only if the caller supports messages containing attachments alone. */
  allowEmpty?: boolean;
  onAttach?: () => void;
  attachLabel?: string;
  attachments?: readonly ChatAttachment[];
  onRemoveAttachment?: (id: string) => void;
  removeAttachmentLabel?: (attachment: ChatAttachment) => string;
  tools?: ReactNode;
  footer?: ReactNode;
  error?: ReactNode;
  textareaProps?: Omit<ComponentProps<typeof Textarea>, "value" | "defaultValue" | "onChange" | "disabled" | "placeholder" | "aria-label">;
}
/** A controlled editor. Transport, file selection/uploads and draft persistence stay in the app. */
export const ChatComposer = forwardRef<HTMLTextAreaElement, ChatComposerProps>(function ChatComposer({
  value, onValueChange, onSend, placeholder, label = "Ask a question", sendLabel = "Send question", onStop, stopLabel = "Stop response", disabled = false, busy = false, sendDisabled = false, allowEmpty = false,
  onAttach, attachLabel = "Attach file", attachments = [], onRemoveAttachment, removeAttachmentLabel = item => `Remove ${item.name}`, tools, footer, error, textareaProps, className, ...props
}, ref) {
  const errorId = useId();
  const canSend = !disabled && !busy && !sendDisabled && (allowEmpty || !!value.trim());
  function send() { if (canSend) onSend(value.trim()); }
  return <form className={cn("ci-chat-composer", className)} aria-busy={busy || undefined} {...props} onSubmit={event => { event.preventDefault(); send(); }}>
    {!!attachments.length && <ul className="ci-chat-composer__attachments" aria-label="Attachments">{attachments.map(item => <li key={item.id}>
      <Badge variant="outline" className="ci-chat-composer__attachment">
        {item.icon != null && <span aria-hidden>{item.icon}</span>}
        <span className="ci-chat-composer__filename" title={item.name}>{item.name}</span>
        {item.status && <span>{item.status}</span>}
        {onRemoveAttachment && <Button type="button" variant="ghost" size="icon-xs" aria-label={removeAttachmentLabel(item)} disabled={disabled || busy} onClick={() => onRemoveAttachment(item.id)}><X aria-hidden size={14} /></Button>}
      </Badge>
    </li>)}</ul>}
    <Textarea {...textareaProps} ref={ref} className={cn("ci-chat-composer__input", textareaProps?.className)} rows={textareaProps?.rows ?? 2}
      aria-label={label} aria-invalid={!!error || undefined} aria-describedby={[textareaProps?.["aria-describedby"], error ? errorId : null].filter(Boolean).join(" ") || undefined}
      value={value} disabled={disabled} placeholder={placeholder}
      onChange={event => onValueChange(event.target.value)}
      onKeyDown={event => {
        textareaProps?.onKeyDown?.(event);
        if (event.defaultPrevented || event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229) return;
        if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); send(); }
      }} />
    {error != null && <div role="alert" id={errorId} className="ci-chat-composer__error">{error}</div>}
    <div className="ci-chat-composer__footer">
      <div className="ci-chat-composer__tools">
        {onAttach && <Button type="button" variant="ghost" size="icon-sm" aria-label={attachLabel} title={attachLabel} disabled={disabled || busy} onClick={onAttach}><Plus aria-hidden size={16} /></Button>}
        {tools}
      </div>
      {footer != null && <div className="ci-chat-composer__hint">{footer}</div>}
      {busy && onStop ? <Button type="button" variant="ghost" size="icon-sm" className="ci-chat-composer__stop" aria-label={stopLabel} title={stopLabel} disabled={disabled} onClick={event => { event.preventDefault(); onStop(); }}><Square size={12} fill="currentColor" strokeWidth={0} aria-hidden="true" /></Button>
        : <Button type="submit" size="icon-sm" aria-label={sendLabel} title={sendLabel} disabled={!canSend}><ArrowUp aria-hidden size={16} /></Button>}
    </div>
  </form>;
});

export interface ChatThreadProps extends ComponentProps<"div"> { busy?: boolean; }
/** No scrolling side effects; callers choose when new messages should scroll into view. */
export function ChatThread({ busy, className, ...props }: ChatThreadProps) {
  return <div role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" aria-busy={busy || undefined} className={cn("ci-chat-thread", className)} {...props} />;
}
export interface ChatMessageProps extends ComponentProps<"article"> {
  kind: "user" | "assistant";
  author?: string;
  actions?: ReactNode;
  evidence?: ReactNode;
}
export function ChatMessage({ kind, author = kind === "user" ? "You" : "Assistant", actions, evidence, className, children, ...props }: ChatMessageProps) {
  const id = useId();
  return <article aria-labelledby={id} className={cn("ci-chat-message", className)} data-kind={kind} {...props}>
    <span id={id} className="ci-chat-message__author">{author}</span>
    <div className="ci-chat-message__content">{children}</div>
    {evidence != null && <div className="ci-chat-message__evidence">{evidence}</div>}
    {actions != null && <div className="ci-chat-message__actions">{actions}</div>}
  </article>;
}
export type ChatActivityState = "thinking" | "checking" | "streaming" | "complete" | "stopped" | "error" | "empty";
export interface ChatActivityProps extends Omit<ComponentProps<"div">, "children"> {
  state: ChatActivityState;
  children?: ReactNode;
  /** Customer-facing scope/check summary, not private model reasoning. */
  summary?: ReactNode;
  /** Optional accessible name for the disclosure; otherwise its visible label is used. */
  summaryLabel?: string;
  /** Caller-formatted elapsed time, e.g. "0:03". No clock is started or inferred here. */
  elapsed?: ReactNode;
  footer?: ReactNode;
  onStop?: () => void;
  onRetry?: () => void;
  stopLabel?: string;
  retryLabel?: string;
}
export function ChatActivity({ state, children, summary, summaryLabel, elapsed, footer, onStop, onRetry, stopLabel = "Stop response", retryLabel = "Try again", className, ...props }: ChatActivityProps) {
  const thinking = state === "thinking" || state === "checking";
  const active = thinking || state === "streaming";
  const labels: Record<ChatActivityState, ReactNode> = {
    thinking: "Thinking…", checking: "Thinking…",
    streaming: elapsed != null ? <>Worked for {elapsed}</> : "Activity",
    complete: elapsed != null ? <>Worked for {elapsed}</> : "Activity",
    stopped: "Response stopped", error: "Could not complete the response", empty: "No response received",
  };
  const activityLabel = <>
    <span className={thinking ? "ci-chat-activity__thinking" : "ci-chat-activity__label"} role={state === "error" ? "alert" : thinking || state === "stopped" || state === "empty" ? "status" : undefined}>{children ?? labels[state]}</span>
    {thinking && elapsed != null && <span className="ci-chat-activity__elapsed" title="Elapsed thinking time" aria-hidden="true">{elapsed}</span>}
  </>;
  return <div className={cn("ci-chat-activity", className)} data-state={state} data-has-summary={summary != null || undefined} {...props}>
    {summary != null ? <details className="ci-chat-activity__details">
      <summary className="ci-chat-activity__header" aria-label={summaryLabel}>{activityLabel}<ChevronDown size={18} strokeWidth={2} className="ci-chat-activity__chevron" aria-hidden="true" /></summary>
      <div className="ci-chat-activity__summary">{summary}</div>
    </details> : <div className="ci-chat-activity__header">{activityLabel}</div>}
    {footer != null && <small className="ci-chat-activity__note">{footer}</small>}
    {active && onStop && <Button type="button" variant="outline" size="sm" className="ci-chat-activity__action" onClick={onStop}>{stopLabel}</Button>}
    {(state === "error" || state === "stopped" || state === "empty") && onRetry && <Button type="button" variant="link" size="xs" className="ci-chat-activity__action ci-chat-activity__retry" onClick={onRetry}><RotateCcw size={14} aria-hidden="true" />{retryLabel}</Button>}
  </div>;
}
export interface ChatMessageActionsProps extends ComponentProps<"div"> {
  onCopy?: () => void;
  copied?: boolean;
  onHelpful?: (helpful: boolean) => void;
  helpful?: boolean;
  copyLabel?: string;
  helpfulLabel?: string;
  copiedLabel?: string;
}
export function ChatMessageActions({ onCopy, copied, onHelpful, helpful = false, copyLabel = "Copy response", helpfulLabel = "Helpful response", copiedLabel = "Response copied", className, children, ...props }: ChatMessageActionsProps) {
  return <div className={cn("ci-chat-message-actions", className)} {...props}>
    {onCopy && <Button type="button" variant="ghost" size="icon-sm" aria-label={copied ? copiedLabel : copyLabel} title={copyLabel} onClick={onCopy}>{copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}</Button>}
    {onHelpful && <Button type="button" variant="ghost" size="icon-sm" aria-label={helpfulLabel} title={helpfulLabel} aria-pressed={helpful} onClick={() => onHelpful(!helpful)}><ThumbsUp size={16} aria-hidden /></Button>}
    {children}
  </div>;
}

export interface ChatHistoryItem {
  id: string;
  title: string;
  /** Caller-formatted Today/Yesterday/date, with the caller's timezone. */
  dateLabel?: string;
  dateTime?: string;
  icon?: ReactNode;
  disabled?: boolean;
}
export interface ChatHistoryGroup { id: string; label: string; items: readonly ChatHistoryItem[]; }
export interface ChatHistoryProps extends Omit<ComponentProps<"div">, "onSelect"> {
  groups: readonly ChatHistoryGroup[];
  activeId?: string;
  onSelect: (id: string) => void;
  /** Opens the caller's rename UI; no persistence or dialogs are imposed here. */
  onRename?: (id: string) => void;
  onDelete?: (id: string) => void;
  onNew?: () => void;
  feedback?: ReactNode;
  onUndo?: () => void;
  empty?: ReactNode;
  labels?: { open?: (item: ChatHistoryItem) => string; more?: (item: ChatHistoryItem) => string; rename?: string; delete?: string; undo?: string; emptyTitle?: string; emptyDescription?: string; newChat?: string };
}
export function ChatHistory({ groups, activeId, onSelect, onRename, onDelete, onNew, feedback, onUndo, empty, labels, className, ...props }: ChatHistoryProps) {
  const dateId = useId();
  const hasItems = groups.some(group => group.items.length);
  return <div className={cn("ci-chat-history", className)} {...props}>
    {feedback != null && <div className="ci-chat-history__feedback"><span role="status">{feedback}</span>{onUndo && <Button type="button" variant="ghost" size="sm" onClick={onUndo}>{labels?.undo ?? "Undo"}</Button>}</div>}
    {hasItems ? groups.filter(group => group.items.length).map(group => <section key={group.id} aria-label={group.label} className="ci-chat-history__group">
      <h3>{group.label}</h3>
      <ul>{group.items.map(item => <li key={item.id} className="ci-chat-history__item" data-active={item.id === activeId || undefined}>
        <Button type="button" variant="ghost" className="ci-chat-history__row" aria-label={labels?.open?.(item) ?? `Open chat: ${item.title}`} aria-describedby={item.dateLabel ? `${dateId}-${group.id}-${item.id}` : undefined} aria-current={item.id === activeId ? "true" : undefined} disabled={item.disabled} onClick={() => onSelect(item.id)}>
          <span className="ci-chat-history__icon" aria-hidden>{item.icon ?? <AlignLeft size={18} strokeWidth={1.75} />}</span>
          <span className="ci-chat-history__text"><span className="ci-chat-history__title" title={item.title}>{item.title}</span>
            {item.dateLabel && <time id={`${dateId}-${group.id}-${item.id}`} dateTime={item.dateTime}>{item.dateLabel}</time>}
          </span>
        </Button>
        {(onRename || onDelete) && <DropdownMenu><DropdownMenuTrigger asChild><Button type="button" variant="ghost" size="icon-sm" className="ci-chat-history__more" aria-label={labels?.more?.(item) ?? `More actions for ${item.title}`} disabled={item.disabled}><MoreVertical size={17} aria-hidden /></Button></DropdownMenuTrigger>
          <DropdownMenuContent className="ci-chat-history__menu" align="end" collisionPadding={12}>
            {onRename && <DropdownMenuItem icon={<Pencil size={15} />} onSelect={() => onRename(item.id)}>{labels?.rename ?? "Rename"}</DropdownMenuItem>}
            {onDelete && <DropdownMenuItem icon={<Trash2 size={15} />} onSelect={() => onDelete(item.id)}>{labels?.delete ?? "Delete"}</DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>}
      </li>)}</ul>
    </section>) : empty ?? <div className="ci-chat-history__empty">
      <History size={24} aria-hidden />
      <h3>{labels?.emptyTitle ?? "No conversations yet"}</h3>
      <p>{labels?.emptyDescription ?? "Your conversations will appear here after you start chatting."}</p>
      {onNew && <Button type="button" variant="outline" onClick={onNew}><SquarePen size={16} aria-hidden />{labels?.newChat ?? "New chat"}</Button>}
    </div>}
  </div>;
}
