"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ConfirmModal } from "@/shared/components/Modal";
import type { ButtonVariant } from "@/shared/components/Button";

/**
 * Promise-based replacement for the native `confirm()` (#19066 block 3).
 *
 * `const { requestConfirm, confirmDialog } = useConfirmDialog();` — render `{confirmDialog}`
 * once in the component, then `if (!(await requestConfirm({ message }))) return;` where the
 * native call used to be. The promise resolves `true` only when the confirm button is
 * pressed; Cancel, Escape and unmount all resolve `false`, so the guarded action keeps running
 * only after an explicit confirmation.
 */
export interface ConfirmDialogOptions {
  message: ReactNode;
  title?: ReactNode;
  confirmText?: ReactNode;
  cancelText?: ReactNode;
  /** Confirm button tone. Destructive by default, like `ConfirmModal`. */
  variant?: ButtonVariant;
}

type Pending = ConfirmDialogOptions & { resolve: (ok: boolean) => void };

export function useConfirmDialog() {
  // The last request's copy stays rendered while the dialog animates out, so only `open` flips.
  const [pending, setPending] = useState<Pending | null>(null);
  const [open, setOpen] = useState(false);
  const pendingRef = useRef<Pending | null>(null);

  const settle = useCallback((ok: boolean) => {
    const current = pendingRef.current;
    pendingRef.current = null;
    setOpen(false);
    current?.resolve(ok);
  }, []);

  const requestConfirm = useCallback(
    (options: ConfirmDialogOptions | string) =>
      new Promise<boolean>((resolve) => {
        // A second request while one is open cancels the first one.
        pendingRef.current?.resolve(false);
        const next: Pending = {
          ...(typeof options === "string" ? { message: options } : options),
          resolve,
        };
        pendingRef.current = next;
        setPending(next);
        setOpen(true);
      }),
    []
  );

  useEffect(
    () => () => {
      pendingRef.current?.resolve(false);
      pendingRef.current = null;
    },
    []
  );

  const confirmDialog = (
    <ConfirmModal
      isOpen={open}
      onClose={() => settle(false)}
      onConfirm={() => settle(true)}
      title={pending?.title}
      message={
        // Native confirm() messages used "\n" for paragraphs; keep them as line breaks.
        <span className="whitespace-pre-line">{pending?.message}</span>
      }
      confirmText={pending?.confirmText}
      cancelText={pending?.cancelText}
      variant={pending?.variant ?? "danger"}
    />
  );

  return { requestConfirm, confirmDialog };
}
