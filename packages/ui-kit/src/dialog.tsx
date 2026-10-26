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

export interface DialogContentProps extends Omit<ComponentProps<typeof DialogPrimitive.Content>, "asChild"> {
  showCloseButton?: boolean;
  overlayClassName?: string;
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent({
  className,
  overlayClassName,
  showCloseButton = true,
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
        className={cn("ci-dialog", className)}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <DialogPrimitive.Close className="ci-dialog__close" aria-label="Close dialog">
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

export function DialogFooter({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="dialog-footer" className={cn("ci-dialog__footer", className)} {...props} />;
}

export const DialogTitle = forwardRef<HTMLHeadingElement, ComponentProps<typeof DialogPrimitive.Title>>(function DialogTitle({ className, ...props }, ref) {
  return <DialogPrimitive.Title ref={ref} data-slot="dialog-title" className={cn("ci-dialog__title", className)} {...props} />;
});

export const DialogDescription = forwardRef<HTMLParagraphElement, ComponentProps<typeof DialogPrimitive.Description>>(function DialogDescription({ className, ...props }, ref) {
  return <DialogPrimitive.Description ref={ref} data-slot="dialog-description" className={cn("ci-dialog__description", className)} {...props} />;
});
