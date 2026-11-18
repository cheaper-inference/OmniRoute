"use client";

import { createContext, forwardRef, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject, ReactNode } from "react";
import { Button, type ButtonProps } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  type DialogContentProps,
  type DialogProps,
} from "./dialog";

export type AlertDialogTone = "default" | "destructive" | "warning";

interface AlertDialogContextValue {
  tone: AlertDialogTone;
  /** The control last pressed with a pointer, which is not always the focused one. */
  pressedRef: MutableRefObject<HTMLElement | null> | null;
}

const AlertDialogContext = createContext<AlertDialogContextValue>({ tone: "default", pressedRef: null });

export interface AlertDialogProps extends Omit<DialogProps, "modal"> {
  /**
   * Paints `AlertDialogAction`: `destructive` for what cannot be undone, `warning` for what is
   * risky but reversible. `AlertDialogCancel` stays neutral.
   */
  tone?: AlertDialogTone;
}

/** A modal confirmation: it interrupts, starts on the safe answer and only closes on an answer. */
export function AlertDialog({ tone = "default", ...props }: AlertDialogProps) {
  const pressedRef = useRef<HTMLElement | null>(null);
  // Safari does not focus a button on click, so a press is the only trace of who opened the dialog.
  useEffect(() => {
    function rememberPressed(event: PointerEvent) {
      pressedRef.current = event.target instanceof Element ? event.target.closest<HTMLElement>("button, a[href], [tabindex]") : null;
    }
    document.addEventListener("pointerdown", rememberPressed, true);
    return () => document.removeEventListener("pointerdown", rememberPressed, true);
  }, []);
  const context = useMemo(() => ({ tone, pressedRef }), [tone]);
  return (
    <AlertDialogContext.Provider value={context}>
      <Dialog {...props} modal />
    </AlertDialogContext.Provider>
  );
}

export const AlertDialogTrigger = DialogTrigger;
export const AlertDialogHeader = DialogHeader;
export const AlertDialogFooter = DialogFooter;
export const AlertDialogTitle = DialogTitle;
export const AlertDialogDescription = DialogDescription;

/**
 * Remembers what had focus. It renders inside the content, so it reads the opener during the
 * render that mounts the dialog: an `autoFocus` field moves focus in the commit right after, and
 * Radix then skips `onOpenAutoFocus`.
 */
function RememberOpener({ openerRef }: { openerRef: MutableRefObject<HTMLElement | null> }) {
  const { pressedRef } = useContext(AlertDialogContext);
  useState(() => {
    const active = document.activeElement;
    openerRef.current = active instanceof HTMLElement && active !== document.body ? active : pressedRef?.current ?? null;
  });
  return null;
}

export interface AlertDialogContentProps
  extends Omit<DialogContentProps, "showCloseButton" | "closeLabel" | "role" | "onPointerDownOutside" | "onInteractOutside"> {}

export const AlertDialogContent = forwardRef<HTMLDivElement, AlertDialogContentProps>(function AlertDialogContent(
  { onOpenAutoFocus, onCloseAutoFocus, children, ...props },
  ref,
) {
  const openerRef = useRef<HTMLElement | null>(null);
  return (
    <DialogContent
      {...props}
      ref={ref}
      role="alertdialog"
      aria-modal="true"
      data-slot="alert-dialog-content"
      showCloseButton={false}
      onPointerDownOutside={(event) => event.preventDefault()}
      onInteractOutside={(event) => event.preventDefault()}
      onOpenAutoFocus={(event) => {
        onOpenAutoFocus?.(event);
        if (event.defaultPrevented) return;
        // Radix would pick the first tabbable, which is the action when Cancel is disabled.
        event.preventDefault();
        const content = event.currentTarget as HTMLElement;
        const cancel = content.querySelector<HTMLElement>('[data-slot="alert-dialog-cancel"]:not(:disabled)');
        (cancel ?? content).focus({ preventScroll: true });
      }}
      onCloseAutoFocus={(event) => {
        onCloseAutoFocus?.(event);
        if (event.defaultPrevented) return;
        // Radix only returns focus to a trigger; a controlled confirmation usually has none.
        const opener = openerRef.current;
        if (!opener?.isConnected) return;
        event.preventDefault();
        opener.focus();
      }}
    >
      <RememberOpener openerRef={openerRef} />
      {children}
    </DialogContent>
  );
});

export interface AlertDialogActionProps extends Omit<ButtonProps, "asChild" | "variant" | "children"> {
  /** The visible label, in the words of the action ("Delete key"), translated by the host. */
  children: ReactNode;
}

/** Closes the dialog after `onClick`; call `event.preventDefault()` there to keep it open. */
export const AlertDialogAction = forwardRef<HTMLButtonElement, AlertDialogActionProps>(function AlertDialogAction(props, ref) {
  const { tone } = useContext(AlertDialogContext);
  return (
    <DialogClose asChild>
      <Button ref={ref} {...props} variant={tone} data-slot="alert-dialog-action" />
    </DialogClose>
  );
});

export interface AlertDialogCancelProps extends Omit<ButtonProps, "asChild" | "children"> {
  /** The visible label, translated by the host. */
  children: ReactNode;
}

/** The safe answer, and the element that takes focus when the dialog opens. */
export const AlertDialogCancel = forwardRef<HTMLButtonElement, AlertDialogCancelProps>(function AlertDialogCancel(
  { variant = "outline", ...props },
  ref,
) {
  return (
    <DialogClose asChild>
      <Button ref={ref} {...props} variant={variant} data-slot="alert-dialog-cancel" />
    </DialogClose>
  );
});
