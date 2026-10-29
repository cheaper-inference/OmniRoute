"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@omniroute/ui-kit/dialog";
import { cn } from "@/shared/utils/cn";
import Button, { type ButtonVariant } from "./Button";
import Icon from "./Icon";

// #6265 — preset for content-heavy modals: caps height on the OUTERMOST dialog
// wrapper only (single scroll owner) and keeps the inner body plain (no
// independent max-h/overflow), avoiding a double height cap that clips content.
export const TALL_MODAL_PROPS = {
  className: "max-h-[90vh] overflow-y-auto",
  bodyClassName: "p-6",
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlay?: boolean;
  showCloseButton?: boolean;
  /** Applied to the outermost dialog element (`role="dialog"`), so `TALL_MODAL_PROPS` lands there. */
  className?: string;
  bodyClassName?: string;
  compactHeader?: boolean;
  /**
   * Accepted for API compatibility. Only a CSS length (`"640px"`, `"calc(…)"`) is applied
   * as an inline max-width; size names (`"lg"`, `"max-w-lg"`) stay inert as they always were.
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

const SIZES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-4xl",
} as const;

// The element focused right now, unless it is <body> (nothing to return to).
function currentFocus(): HTMLElement | null {
  if (typeof document === "undefined") return null;
  const active = document.activeElement;
  return active instanceof HTMLElement && active !== document.body ? active : null;
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
        showCloseButton={false}
        aria-modal="true"
        // No generated description: repeating the title as one made screen readers announce
        // it twice. An explicit undefined is Radix's documented opt-out of the warning.
        aria-describedby={undefined}
        // Box model (KEA-7886): the root keeps the kit's `calc(100vw - 3rem)` width (mobile
        // gutter, so no `w-full`) and does not pad (`p-0`) — header, body and footer pad
        // themselves as the legacy Modal did. Its cap sits above the default body cap, so the
        // body is the only scroll owner; `TALL_MODAL_PROPS` swaps in `max-h-[90vh]` (twMerge)
        // and a plain body, making the root the single scroll owner (#6265).
        className={cn("p-0 max-h-[calc(100vh-3rem)]", SIZES[size], className)}
        style={inlineMaxWidth ? { maxWidth: inlineMaxWidth } : undefined}
        onOpenAutoFocus={() => {
          const active = document.activeElement;
          openerRef.current = renderOpener ?? (active instanceof HTMLElement ? active : null);
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
            "flex items-center justify-between gap-3",
            compactHeader ? "px-4 py-2.5" : "px-6 pt-6",
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
          {showCloseButton && (
            <DialogClose asChild>
              {/* size="icon-sm" once track C's kit Button lands (F1 reconciles). */}
              <Button variant="ghost" size="sm" aria-label={t("close")} className="!p-1 shrink-0">
                <Icon name="close" size={18} />
              </Button>
            </DialogClose>
          )}
        </DialogHeader>
        <div
          data-slot="modal-body"
          className={bodyClassName ?? "p-6 max-h-[calc(80vh-140px)] overflow-y-auto"}
        >
          {children}
        </div>
        {footer && <DialogFooter className="mt-0 px-6 pb-6">{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}

// Confirm Modal helper
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title ?? t("confirmTitle")}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            {cancelText ?? t("cancel")}
          </Button>
          <Button variant={variant} onClick={() => void onConfirm()} loading={loading}>
            {confirmText ?? t("confirmAction")}
          </Button>
        </>
      }
    >
      <p className="text-text-muted">{message}</p>
    </Modal>
  );
}
