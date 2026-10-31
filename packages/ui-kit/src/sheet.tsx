"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { forwardRef } from "react";
import type { ComponentProps } from "react";
import { X } from "lucide-react";
import { cn } from "./lib/utils";

export type SheetSide = "top" | "right" | "bottom" | "left";
export type SheetProps = ComponentProps<typeof DialogPrimitive.Root>;

export function Sheet(props: SheetProps) {
  return <DialogPrimitive.Root {...props} />;
}

export interface SheetTriggerProps extends ComponentProps<typeof DialogPrimitive.Trigger> {}

export const SheetTrigger = forwardRef<HTMLButtonElement, SheetTriggerProps>(function SheetTrigger(props, ref) {
  return <DialogPrimitive.Trigger ref={ref} data-slot="sheet-trigger" {...props} />;
});

export interface SheetContentProps extends Omit<ComponentProps<typeof DialogPrimitive.Content>, "asChild"> {
  side?: SheetSide;
  showClose?: boolean;
  overlayClassName?: string;
}

export const SheetContent = forwardRef<HTMLDivElement, SheetContentProps>(function SheetContent({
  className,
  side = "right",
  showClose = true,
  overlayClassName,
  forceMount,
  children,
  ...props
}, ref) {
  return (
    <DialogPrimitive.Portal forceMount={forceMount}>
      <DialogPrimitive.Overlay
        forceMount={forceMount}
        data-slot="sheet-overlay"
        className={cn("ci-sheet__overlay", overlayClassName)}
      />
      <DialogPrimitive.Content
        ref={ref}
        forceMount={forceMount}
        data-slot="sheet-content"
        data-side={side}
        className={cn("ci-sheet", className)}
        {...props}
      >
        {children}
        {showClose ? (
          <DialogPrimitive.Close className="ci-sheet__close" aria-label="Close panel">
            <X aria-hidden="true" />
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});

export function SheetHeader({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="sheet-header" className={cn("ci-sheet__header", className)} {...props} />;
}

export const SheetTitle = forwardRef<HTMLHeadingElement, ComponentProps<typeof DialogPrimitive.Title>>(function SheetTitle({ className, ...props }, ref) {
  return <DialogPrimitive.Title ref={ref} data-slot="sheet-title" className={cn("ci-sheet__title", className)} {...props} />;
});

export const SheetDescription = forwardRef<HTMLParagraphElement, ComponentProps<typeof DialogPrimitive.Description>>(function SheetDescription({ className, ...props }, ref) {
  return <DialogPrimitive.Description ref={ref} data-slot="sheet-description" className={cn("ci-sheet__description", className)} {...props} />;
});

export function SheetBody({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="sheet-body" className={cn("ci-sheet__body", className)} {...props} />;
}

export function SheetFooter({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="sheet-footer" className={cn("ci-sheet__footer", className)} {...props} />;
}

export const SheetClose = forwardRef<HTMLButtonElement, ComponentProps<typeof DialogPrimitive.Close>>(function SheetClose(props, ref) {
  return <DialogPrimitive.Close ref={ref} data-slot="sheet-close" {...props} />;
});
