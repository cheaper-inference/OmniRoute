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
}

interface ToastRecord extends ToastOptions {
  id: string | number;
  title: ReactNode;
  variant: ToastVariant;
}

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
}

export interface ToastProps extends Omit<ToastOptions, "id"> {
  title: ReactNode;
  closeButton?: boolean;
  onDismiss: () => void;
}

/** The same toast surface as Toaster, with placement and visibility owned by its parent. */
export function Toast({ title, description, action, variant = "default", showIcon = true, duration = 5000, closeButton = true, onDismiss }: ToastProps) {
  const id = useId();
  const item = useMemo<ToastRecord>(
    () => ({ id, title, description, action, variant, showIcon, duration }),
    [id, title, description, action, variant, showIcon, duration],
  );
  return <ToastItem item={item} defaultDuration={duration} closeButton={closeButton} onDismiss={onDismiss} />;
}

export function Toaster({ position = "bottom-right", duration = 5000, closeButton = true }: ToasterProps) {
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState(records);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const update = () => setItems(records);
    listeners.add(update);
    update();
    return () => { listeners.delete(update); };
  }, []);
  if (!mounted) return null;
  return createPortal(
    <div className={cn("ci-toaster", `ci-toaster--${position}`)} data-slot="toaster">
      {items.map((item) => <ToastItem key={item.id} item={item} defaultDuration={duration} closeButton={closeButton} />)}
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

function ToastItem({ item, defaultDuration, closeButton, onDismiss }: { item: ToastRecord; defaultDuration: number; closeButton: boolean; onDismiss?: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const leaveTimer = useRef<number | undefined>(undefined);
  const paused = hovered || focusWithin;
  const close = useCallback(() => {
    if (leaveTimer.current !== undefined) window.clearTimeout(leaveTimer.current);
    setLeaving(true);
    const closingRecord = item;
    leaveTimer.current = window.setTimeout(() => {
      leaveTimer.current = undefined;
      if (onDismiss) onDismiss();
      else if (records.find((record) => record.id === item.id) === closingRecord) dismissToast(item.id);
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
    const timer = window.setTimeout(close, duration);
    return () => window.clearTimeout(timer);
  }, [close, defaultDuration, item.duration, leaving, paused]);
  return (
    <div
      role={item.variant === "error" ? "alert" : "status"}
      aria-live={item.variant === "error" ? "assertive" : "polite"}
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
        <div className="ci-toast__title">{item.title}</div>
        {item.description != null && <div className="ci-toast__description">{item.description}</div>}
      </div>
      {item.action != null && (
        <Button size="xs" variant="outline" onClick={(event) => { item.action?.onClick?.(event); close(); }}>
          {item.action.label}
        </Button>
      )}
      {closeButton && (
        <button type="button" className="ci-toast__close" aria-label="Dismiss notification" onClick={close}>
          <X aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
