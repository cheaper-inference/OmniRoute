"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import { CircleAlert, CircleCheck, Info, LoaderCircle, TriangleAlert, X } from "lucide-react";
import { Button } from "./button";
import { cn } from "./lib/utils";

export type ToastVariant = "default" | "accent" | "success" | "error" | "warning" | "info" | "loading";
export type ToasterPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

export interface ToastAction {
  label: ReactNode;
  onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
}

export interface ToastOptions {
  id?: string | number;
  description?: ReactNode;
  action?: ToastAction;
  variant?: ToastVariant;
  /** Hide the variant icon while preserving the selected Toast appearance. */
  showIcon?: boolean;
  duration?: number;
  /** Accessible name for this toast's close button; overrides the Toaster `closeLabel`. */
  closeLabel?: string;
  /** Show or hide this toast's close button; defaults to the Toaster `closeButton`. */
  dismissible?: boolean;
  /** Called with the toast id after its close button or action removes it. */
  onDismiss?: (id: string | number) => void;
  /** Called with the toast id after it expires on its own. */
  onAutoClose?: (id: string | number) => void;
}

interface ToastRecord extends ToastOptions {
  id: string | number;
  title: ReactNode;
  variant: ToastVariant;
}

const DEFAULT_CLOSE_LABEL = "Dismiss notification";
const ANNOUNCEMENT_CLEAR_MS = 5000;
const MAX_ANNOUNCEMENTS = 5;
const defaultAnnouncementLabel = (message: string) => `Notification: ${message}`;

let records: ToastRecord[] = [];
let counter = 0;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((listener) => listener());

function createToast(title: ReactNode, options: ToastOptions = {}, variant: ToastVariant = "default") {
  const resolvedVariant = options.variant ?? variant;
  const record: ToastRecord = {
    ...options,
    id: options.id ?? `ci-toast-${++counter}`,
    title,
    variant: resolvedVariant,
    duration: options.duration ?? (resolvedVariant === "loading" ? Infinity : undefined),
  };
  records = records.some((item) => item.id === record.id)
    ? records.map((item) => item.id === record.id ? record : item)
    : [record, ...records];
  emit();
  return record.id;
}

export function dismissToast(id?: string | number) {
  records = id === undefined ? [] : records.filter((item) => item.id !== id);
  emit();
}

type ToastFunction = (title: ReactNode, options?: ToastOptions) => string | number;
export const toast: ToastFunction & {
  success: ToastFunction;
  error: ToastFunction;
  warning: ToastFunction;
  info: ToastFunction;
  loading: ToastFunction;
  dismiss: (id?: string | number) => void;
} = Object.assign(
  (title: ReactNode, options?: ToastOptions) => createToast(title, options),
  {
    success: (title: ReactNode, options?: ToastOptions) => createToast(title, options, "success"),
    error: (title: ReactNode, options?: ToastOptions) => createToast(title, options, "error"),
    warning: (title: ReactNode, options?: ToastOptions) => createToast(title, options, "warning"),
    info: (title: ReactNode, options?: ToastOptions) => createToast(title, options, "info"),
    loading: (title: ReactNode, options?: ToastOptions) => createToast(title, options, "loading"),
    dismiss: dismissToast,
  },
);

export interface ToasterProps {
  position?: ToasterPosition;
  duration?: number;
  closeButton?: boolean;
  /** Accessible name for every close button. Defaults to "Dismiss notification". */
  closeLabel?: string;
  /** Text screen readers hear for each toast. Defaults to `Notification: ${message}`. */
  announcementLabel?: (message: string, variant: ToastVariant) => string;
}

export interface ToastProps extends Omit<ToastOptions, "id" | "dismissible" | "onDismiss" | "onAutoClose"> {
  title: ReactNode;
  closeButton?: boolean;
  onDismiss: () => void;
}

/** The same toast surface as Toaster, with placement and visibility owned by its parent. */
export function Toast({ title, description, action, variant = "default", showIcon = true, duration = 5000, closeButton = true, closeLabel = DEFAULT_CLOSE_LABEL, onDismiss }: ToastProps) {
  const id = useId();
  const item = useMemo<ToastRecord>(
    () => ({ id, title, description, action, variant, showIcon, duration }),
    [id, title, description, action, variant, showIcon, duration],
  );
  return <ToastItem item={item} defaultDuration={duration} closeButton={closeButton} closeLabel={closeLabel} onDismiss={onDismiss} />;
}

type AnnouncementPoliteness = "polite" | "assertive";
interface ToastAnnouncement { key: number; message: string; variant: ToastVariant }
type ToastAnnouncements = Record<AnnouncementPoliteness, ToastAnnouncement[]>;
const NO_ANNOUNCEMENTS: ToastAnnouncements = { polite: [], assertive: [] };

export function Toaster({ position = "bottom-right", duration = 5000, closeButton = true, closeLabel = DEFAULT_CLOSE_LABEL, announcementLabel = defaultAnnouncementLabel }: ToasterProps) {
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState(records);
  const [announcements, setAnnouncements] = useState<ToastAnnouncements>(NO_ANNOUNCEMENTS);
  const announcementKey = useRef(0);
  const announced = useRef(new WeakSet<ToastRecord>());
  const pending = useRef<Array<{ politeness: AnnouncementPoliteness; announcement: ToastAnnouncement }>>([]);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const update = () => setItems(records);
    listeners.add(update);
    update();
    return () => { listeners.delete(update); };
  }, []);
  const announce = useCallback((item: ToastRecord, message: string) => {
    if (!message || announced.current.has(item)) return;
    announced.current.add(item);
    const politeness: AnnouncementPoliteness = item.variant === "error" ? "assertive" : "polite";
    pending.current.push({ politeness, announcement: { key: ++announcementKey.current, message, variant: item.variant } });
  }, []);
  // Runs after the ToastItem effects of the same commit, so toasts raised together are queued as one batch.
  useEffect(() => {
    if (pending.current.length === 0) return;
    // Newest toasts render (and announce) first; restore the order in which they were raised.
    const batch = pending.current.reverse();
    pending.current = [];
    setAnnouncements((current) => {
      const next: ToastAnnouncements = { polite: [...current.polite], assertive: [...current.assertive] };
      for (const { politeness, announcement } of batch) next[politeness].push(announcement);
      return { polite: next.polite.slice(-MAX_ANNOUNCEMENTS), assertive: next.assertive.slice(-MAX_ANNOUNCEMENTS) };
    });
  });
  useEffect(() => {
    if (announcements.polite.length === 0 && announcements.assertive.length === 0) return;
    const timer = window.setTimeout(() => setAnnouncements(NO_ANNOUNCEMENTS), ANNOUNCEMENT_CLEAR_MS);
    return () => window.clearTimeout(timer);
  }, [announcements]);
  if (!mounted) return null;
  return createPortal(
    <div className={cn("ci-toaster", `ci-toaster--${position}`)} data-slot="toaster">
      {(["polite", "assertive"] as const).map((politeness) => (
        // Each announcement is its own keyed addition, so toasts raised together are all read.
        <div key={politeness} className="ci-sr-only" data-slot="toaster-announcer" aria-live={politeness}>
          {announcements[politeness].map((announcement) => (
            <span key={announcement.key}>{announcementLabel(announcement.message, announcement.variant)}</span>
          ))}
        </div>
      ))}
      {items.map((item) => <ToastItem key={item.id} item={item} defaultDuration={duration} closeButton={closeButton} closeLabel={closeLabel} onAnnounce={announce} />)}
    </div>,
    document.body,
  );
}

function ToastIcon({ variant }: { variant: ToastVariant }) {
  if (variant === "success") return <CircleCheck aria-hidden="true" />;
  if (variant === "error") return <CircleAlert aria-hidden="true" />;
  if (variant === "warning") return <TriangleAlert aria-hidden="true" />;
  if (variant === "info") return <Info aria-hidden="true" />;
  if (variant === "loading") return <LoaderCircle className="ci-toast__spinner" aria-hidden="true" />;
  return null;
}

function announcementText(...nodes: Array<HTMLElement | null>) {
  return nodes
    .map((node) => node?.textContent?.replace(/\s+/g, " ").trim() ?? "")
    .filter(Boolean)
    .map((text, index, parts) => index < parts.length - 1 && !/[.!?…:]$/.test(text) ? `${text}.` : text)
    .join(" ");
}

type ToastCloseReason = "dismiss" | "auto";

function ToastItem({ item, defaultDuration, closeButton, closeLabel, onDismiss, onAnnounce }: {
  item: ToastRecord;
  defaultDuration: number;
  closeButton: boolean;
  closeLabel: string;
  onDismiss?: () => void;
  /** Set by Toaster: the toast is announced through its persistent regions instead of being a live region itself. */
  onAnnounce?: (item: ToastRecord, message: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const leaveTimer = useRef<number | undefined>(undefined);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const paused = hovered || focusWithin;
  const close = useCallback((reason: ToastCloseReason) => {
    // Already leaving: keep the first reason and the scheduled removal.
    if (leaveTimer.current !== undefined) return;
    setLeaving(true);
    const closingRecord = item;
    leaveTimer.current = window.setTimeout(() => {
      leaveTimer.current = undefined;
      if (onDismiss) { onDismiss(); return; }
      // Skip a toast that was removed or replaced through the same id while it was leaving.
      if (records.find((record) => record.id === item.id) !== closingRecord) return;
      dismissToast(item.id);
      if (reason === "auto") closingRecord.onAutoClose?.(closingRecord.id);
      else closingRecord.onDismiss?.(closingRecord.id);
    }, 160);
  }, [item, onDismiss]);
  useEffect(() => {
    if (leaveTimer.current !== undefined) window.clearTimeout(leaveTimer.current);
    leaveTimer.current = undefined;
    setLeaving(false);
  }, [item]);
  useEffect(() => () => {
    if (leaveTimer.current !== undefined) window.clearTimeout(leaveTimer.current);
  }, []);
  useEffect(() => {
    const duration = item.duration ?? defaultDuration;
    if (paused || leaving || duration === Infinity || duration <= 0) return;
    const timer = window.setTimeout(() => close("auto"), duration);
    return () => window.clearTimeout(timer);
  }, [close, defaultDuration, item.duration, leaving, paused]);
  useEffect(() => {
    onAnnounce?.(item, announcementText(titleRef.current, descriptionRef.current));
  }, [item, onAnnounce]);
  const live = onAnnounce === undefined;
  return (
    <div
      role={live ? item.variant === "error" ? "alert" : "status" : undefined}
      aria-live={live ? item.variant === "error" ? "assertive" : "polite" : undefined}
      data-variant={item.variant}
      className={cn("ci-toast", leaving && "ci-toast--leaving")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusWithin(false);
      }}
    >
      {item.variant !== "default" && item.variant !== "accent" && item.showIcon !== false && <span className="ci-toast__icon"><ToastIcon variant={item.variant} /></span>}
      <div className="ci-toast__content">
        <div ref={titleRef} className="ci-toast__title">{item.title}</div>
        {item.description != null && <div ref={descriptionRef} className="ci-toast__description">{item.description}</div>}
      </div>
      {item.action != null && (
        <Button size="xs" variant="outline" onClick={(event) => { item.action?.onClick?.(event); close("dismiss"); }}>
          {item.action.label}
        </Button>
      )}
      {(item.dismissible ?? closeButton) && (
        <button type="button" className="ci-toast__close" aria-label={item.closeLabel ?? closeLabel} onClick={() => close("dismiss")}>
          <X aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
