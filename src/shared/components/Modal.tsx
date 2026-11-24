"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  type AlertDialogTone,
} from "@omniroute/ui-kit/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  type DialogSize,
} from "@omniroute/ui-kit/dialog";
import { cn } from "@/shared/utils/cn";
import type { ButtonVariant } from "./Button";

// #6265 — preset for content-heavy modals: caps height on the OUTERMOST dialog
// wrapper only (single scroll owner) and keeps the inner body plain (no
// independent max-h/overflow), avoiding a double height cap that clips content.
export const TALL_MODAL_PROPS = {
  className: "max-h-[90vh] overflow-y-auto",
  bodyClassName: "p-6",
};

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  /**
   * Width cap, from the kit Dialog: `sm` 30rem (confirmations, short forms), `md` 36rem (the
   * default), `lg` 48rem, `xl` 64rem, and `full`, which fills the viewport minus the dialog
   * margin in width and in height whatever its content (editors, wide tables). On a phone every
   * size is the viewport width minus the margin.
   */
  size?: ModalSize;
  closeOnOverlay?: boolean;
  showCloseButton?: boolean;
  /** Applied to the outermost dialog element (`role="dialog"`), so `TALL_MODAL_PROPS` lands there. */
  className?: string;
  bodyClassName?: string;
  compactHeader?: boolean;
  /**
   * Accepted for API compatibility. Only a CSS length (`"640px"`, `"calc(…)"`) is applied
   * as an inline max-width; size names (`"lg"`, `"max-w-lg"`) stay inert as they always were.
   * It is also the way to narrow an `md` dialog: the kit rule for that size sits outside the
   * CSS layers, so a `max-w-*` class in `className` does not override it.
   */
  maxWidth?: string;
}

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: React.ReactNode;
  message: React.ReactNode;
  confirmText?: React.ReactNode;
  cancelText?: React.ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
}

// The kit Toaster is portaled to body, outside the dialog: Radix would treat a click on a
// toast (its close button, its action) as an outside interaction and dismiss the dialog.
const TOASTER_SELECTOR = '[data-slot="toaster"]';
const isFromToaster = (event: Event) =>
  event.target instanceof Element && event.target.closest(TOASTER_SELECTOR) !== null;

// The adapter's size names are the kit Dialog sizes: the width caps live in the kit CSS
// (`.ci-dialog[data-size]`), so the adapter adds no width class of its own. The kit keeps the
// `calc(100vw - 3rem)` width at every size, i.e. the viewport minus the mobile gutter.
const KIT_SIZES: Record<ModalSize, DialogSize> = {
  sm: "default",
  md: "wide",
  lg: "lg",
  xl: "xl",
  full: "full",
};

/** Root box: unpadded; a column for `full`, else a cap above the body's so only the body scrolls. */
function rootClass(isFull: boolean, closeInCompactHeader: boolean) {
  return cn(
    "p-0",
    isFull ? "flex flex-col" : "max-h-[calc(100vh-3rem)]",
    // The kit close button sits 1rem from the top, for the regular header: pull it into the
    // short one. It is the only <button> that is a direct child of the dialog (a class selector
    // would need its `__` escaped: Tailwind reads `_` as a space in a variant).
    closeInCompactHeader && "[&>button]:top-0.5 [&>button]:end-2"
  );
}

/**
 * Header row. With the close button it keeps room for it: the kit positions the button over the
 * header's end corner (also when there is no visible title, so the header keeps its height).
 */
function headerClass(compactHeader: boolean, showCloseButton: boolean) {
  if (compactHeader) {
    return cn("flex items-center gap-3 px-4 py-2.5", showCloseButton && "min-h-10 pe-12");
  }
  return cn("flex items-center gap-3 px-6 pt-6", showCloseButton && "min-h-13 pe-14");
}

/** Body: the scroll owner by default; in `full` it also takes the height the dialog has left. */
function bodyClass(isFull: boolean, bodyClassName: string | undefined) {
  if (bodyClassName === undefined) {
    return isFull
      ? "p-6 flex-1 min-h-0 overflow-y-auto"
      : "p-6 max-h-[calc(80vh-140px)] overflow-y-auto";
  }
  return isFull ? cn("flex-1", bodyClassName) : bodyClassName;
}

// A menu item leaves the DOM as soon as its menu closes, so it cannot take focus back. The kit
// DropdownMenu (Radix) labels its content with the trigger's id: climb to the trigger that
// opened the menu (and past submenu triggers, which unmount with their parent menu).
function menuTriggerFor(element: HTMLElement): HTMLElement {
  let target = element;
  for (let depth = 0; depth < 5; depth += 1) {
    const menu = target.closest<HTMLElement>('[role="menu"][aria-labelledby]');
    const trigger = menu && document.getElementById(menu.getAttribute("aria-labelledby") ?? "");
    if (!trigger || trigger === target) break;
    target = trigger;
  }
  return target;
}

// The element focused right now, unless it is <body> (nothing to return to).
function currentFocus(): HTMLElement | null {
  if (typeof document === "undefined") return null;
  const active = document.activeElement;
  if (!(active instanceof HTMLElement) || active === document.body) return null;
  return menuTriggerFor(active);
}

// Initial focus, the focus trap, Escape, body scroll lock and the aria-labelledby
// wiring are Radix's (via the kit Dialog). Focus restoration is ours:
// Radix's modal content restores focus to its own DialogTrigger, which a controlled
// `isOpen` never uses, so we remember the opener and put focus back on it when the dialog
// closes (nothing happens if it left the DOM). The opener is captured while rendering the
// open transition, before the commit: a field with `autoFocus` takes focus during the commit,
// and Radix's FocusScope then skips onOpenAutoFocus (focus is already inside), so capturing
// there alone lost the opener and dropped focus on <body> (F1 checkpoint, "Create API Key").
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
  showCloseButton = true,
  className,
  bodyClassName,
  compactHeader = false,
  maxWidth,
}: ModalProps) {
  const t = useTranslations("common");
  const openerRef = useRef<HTMLElement | null>(null);
  // "Adjust state while rendering" (react.dev): runs before the commit that mounts the content.
  const [wasOpen, setWasOpen] = useState(isOpen);
  const [renderOpener, setRenderOpener] = useState<HTMLElement | null>(() =>
    isOpen ? currentFocus() : null
  );
  // Kept (not cleared) on close: the closing render still feeds onCloseAutoFocus.
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) setRenderOpener(currentFocus());
  }
  const inlineMaxWidth = maxWidth && /\d/.test(maxWidth) ? maxWidth : undefined;
  const isFull = size === "full";
  // Resolved only when a string title is missing, so a locale catalog that has not
  // received `common.dialogTitleFallback` yet is never asked for it needlessly.
  const fallbackTitle = () => t("dialogTitleFallback");

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        size={KIT_SIZES[size]}
        // The kit close button (top end corner, last in the tab order), with a translated name.
        showCloseButton={showCloseButton}
        closeLabel={t("close")}
        aria-modal="true"
        // No generated description: repeating the title as one made screen readers announce
        // it twice. An explicit undefined is Radix's documented opt-out of the warning.
        aria-describedby={undefined}
        // Box model (KEA-7886): the root keeps the kit's `calc(100vw - 3rem)` width (mobile
        // gutter, so no `w-full`) and does not pad (`p-0`) — header, body and footer pad
        // themselves as the legacy Modal did. Its cap sits above the default body cap, so the
        // body is the only scroll owner; `TALL_MODAL_PROPS` swaps in `max-h-[90vh]` (twMerge)
        // and a plain body, making the root the single scroll owner (#6265).
        // `full` is different: the kit gives it a fixed height and its own cap, so the root is
        // a column and the body takes what the header and the footer leave.
        className={cn(rootClass(isFull, compactHeader && showCloseButton), className)}
        style={inlineMaxWidth ? { maxWidth: inlineMaxWidth } : undefined}
        onOpenAutoFocus={() => {
          openerRef.current = renderOpener ?? currentFocus();
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          const opener = openerRef.current ?? renderOpener;
          openerRef.current = null;
          if (opener?.isConnected) opener.focus();
        }}
        onPointerDownOutside={(e) => {
          if (!closeOnOverlay || isFromToaster(e)) e.preventDefault();
        }}
        onInteractOutside={(e) => {
          if (!closeOnOverlay || isFromToaster(e)) e.preventDefault();
        }}
      >
        <DialogHeader
          className={cn(
            headerClass(compactHeader, showCloseButton),
            // No visible title and no close button: keep the (sr-only) title for the
            // accessible name without reserving header space.
            !title && !showCloseButton && "ci-sr-only"
          )}
        >
          <DialogTitle
            className={cn("truncate min-w-0", !title && "ci-sr-only", compactHeader && "text-sm")}
          >
            {title || fallbackTitle()}
          </DialogTitle>
        </DialogHeader>
        <div data-slot="modal-body" className={bodyClass(isFull, bodyClassName)}>
          {children}
        </div>
        {footer && <DialogFooter className="mt-0 px-6 pb-6">{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}

// The legacy variant vocabulary, read as the kit's confirmation tones.
const CONFIRM_TONES: Partial<Record<ButtonVariant, AlertDialogTone>> = {
  danger: "destructive",
  warning: "warning",
};

// The kit AlertDialog: role="alertdialog", focus starts on Cancel, an outside click does nothing
// and there is no close button. Focus goes back to the opener through the kit, not `Modal`.
export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  variant = "danger",
  loading = false,
}: ConfirmModalProps) {
  const t = useTranslations("common");
  const [confirming, setConfirming] = useState(false);
  const busy = loading || confirming;

  const handleConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
    // The kit action closes after onClick. Callers close through `isOpen`, and some keep the
    // dialog open on purpose when the work fails.
    event.preventDefault();
    const result = onConfirm();
    if (!(result instanceof Promise)) return;
    setConfirming(true);
    void result.finally(() => setConfirming(false));
  };

  return (
    <AlertDialog
      tone={CONFIRM_TONES[variant] ?? "default"}
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{title ?? t("confirmTitle")}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={busy}>{cancelText ?? t("cancel")}</AlertDialogCancel>
          <AlertDialogAction loading={busy} onClick={handleConfirm}>
            {confirmText ?? t("confirmAction")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
