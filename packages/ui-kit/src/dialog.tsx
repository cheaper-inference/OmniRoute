"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { forwardRef } from "react";
import type { ComponentProps } from "react";
import { X } from "lucide-react";
import { cn } from "./lib/utils";

export type DialogProps = ComponentProps<typeof DialogPrimitive.Root>;

export function Dialog(props: DialogProps) {
  return <DialogPrimitive.Root {...props} />;
}

export interface DialogTriggerProps extends ComponentProps<typeof DialogPrimitive.Trigger> {}

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(function DialogTrigger(props, ref) {
  return <DialogPrimitive.Trigger ref={ref} data-slot="dialog-trigger" {...props} />;
});

/**
 * The width cap of the dialog: `default` 30rem, `wide` 36rem, `lg` 48rem, `xl` 64rem, and `full`,
 * which fills the viewport minus the dialog margin in both directions, whatever its content.
 * `checkout` (64rem) is the cap of the fixed-footer checkout dialogs.
 */
export type DialogSize = "default" | "wide" | "lg" | "xl" | "full" | "checkout";

export interface DialogContentProps extends Omit<ComponentProps<typeof DialogPrimitive.Content>, "asChild"> {
  showCloseButton?: boolean;
  /**
   * Wider surfaces for review forms, tables and editors. Every size is as wide as the viewport
   * minus the margin on a small screen, and content taller than the cap scrolls inside the dialog.
   */
  size?: DialogSize;
  /** Keep the header and footer visible while DialogBody scrolls. */
  layout?: "default" | "fixed-footer";
  /** Accessible name of the built-in close button. Defaults to "Close dialog". */
  closeLabel?: string;
  overlayClassName?: string;
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent({
  className,
  overlayClassName,
  showCloseButton = true,
  size = "default",
  layout = "default",
  closeLabel = "Close dialog",
  forceMount,
  children,
  ...props
}, ref) {
  return (
    <DialogPrimitive.Portal forceMount={forceMount}>
      <DialogPrimitive.Overlay
        forceMount={forceMount}
        data-slot="dialog-overlay"
        className={cn("ci-dialog__overlay", overlayClassName)}
      />
      <DialogPrimitive.Content
        ref={ref}
        forceMount={forceMount}
        data-slot="dialog-content"
        data-size={size}
        data-layout={layout === "fixed-footer" ? layout : undefined}
        className={cn("ci-dialog", className)}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <DialogPrimitive.Close className="ci-dialog__close" aria-label={closeLabel}>
            <X aria-hidden="true" />
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});

export interface DialogCloseProps extends ComponentProps<typeof DialogPrimitive.Close> {}

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(function DialogClose(props, ref) {
  return <DialogPrimitive.Close ref={ref} data-slot="dialog-close" {...props} />;
});

export function DialogHeader({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="dialog-header" className={cn("ci-dialog__header", className)} {...props} />;
}

export const DialogBody = forwardRef<HTMLDivElement, ComponentProps<"div">>(function DialogBody({ className, ...props }, ref) {
  return <div ref={ref} data-slot="dialog-body" className={cn("ci-dialog__body", className)} {...props} />;
});

export function DialogFooter({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="dialog-footer" className={cn("ci-dialog__footer", className)} {...props} />;
}

export const DialogTitle = forwardRef<HTMLHeadingElement, ComponentProps<typeof DialogPrimitive.Title>>(function DialogTitle({ className, ...props }, ref) {
  return <DialogPrimitive.Title ref={ref} data-slot="dialog-title" className={cn("ci-dialog__title", className)} {...props} />;
});

export const DialogDescription = forwardRef<HTMLParagraphElement, ComponentProps<typeof DialogPrimitive.Description>>(function DialogDescription({ className, ...props }, ref) {
  return <DialogPrimitive.Description ref={ref} data-slot="dialog-description" className={cn("ci-dialog__description", className)} {...props} />;
});
