"use client";

/**
 * NotificationToast — bridges the notification store into the kit Toaster (KEA-7886).
 *
 * The store API (`success/error/warning/info/addNotification/removeNotification/
 * clearAll`) is unchanged; every store entry is mirrored once into a kit toast
 * (id `oi-<id>`) and dismissed when it leaves the store. Roles come from the kit:
 * `role="alert"` (assertive) for errors, `role="status"` (polite) otherwise.
 *
 * Usage: Add <NotificationToast /> to your root layout (DashboardLayout does).
 */

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Toaster, dismissToast, toast } from "@omniroute/ui-kit/toast";
import { useNotificationStore } from "@/store/notificationStore";

/**
 * Coerce a toast title/message to a string. `message`/`title` are typed as
 * `string`, but callers occasionally pass a raw API error body (an object) —
 * rendering that object directly throws React #31 ("Objects are not valid as a
 * React child") and freezes the whole page. This keeps the toast resilient no
 * matter what a caller hands it.
 */
export function toToastText(value: unknown): string {
  if (typeof value === "string") return value;
  if (value == null) return "";
  if (typeof value === "object") {
    const message = (value as { message?: unknown }).message;
    if (typeof message === "string") return message;
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return String(value);
}

const VARIANT = {
  success: "success",
  error: "error",
  warning: "warning",
  info: "info",
} as const;

// While a modal is open, Radix hides everything outside it from assistive tech
// (`aria-hidden`), sparing only elements that already carry `aria-live` when the dialog
// opens. The kit Toaster root has none (pendência do kit: it should be a live region
// itself), so a toast raised under a Modal would be hidden. Once the Toaster portals its
// root (one render after mount, hence the observer), mark it as a polite live region, and
// keep it out of `aria-hidden` when a dialog that opened in the same render already hid it.
// Each toast keeps its own `role="alert"` / `role="status"`.
const TOASTER_SELECTOR = '[data-slot="toaster"]';

function useToasterLiveRegion() {
  useEffect(() => {
    let rootObserver: MutationObserver | null = null;
    const expose = (root: Element) => {
      if (root.getAttribute("aria-hidden") === "true") root.removeAttribute("aria-hidden");
    };
    const mark = () => {
      const root = document.querySelector(TOASTER_SELECTOR);
      if (!root) return false;
      if (!root.hasAttribute("aria-live")) root.setAttribute("aria-live", "polite");
      expose(root);
      rootObserver = new MutationObserver(() => expose(root));
      rootObserver.observe(root, { attributes: true, attributeFilter: ["aria-hidden"] });
      return true;
    };
    if (mark()) return () => rootObserver?.disconnect();
    const bodyObserver = new MutationObserver(() => {
      if (mark()) bodyObserver.disconnect();
    });
    bodyObserver.observe(document.body, { childList: true });
    return () => {
      bodyObserver.disconnect();
      rootObserver?.disconnect();
    };
  }, []);
}

function NotificationBridge() {
  const t = useTranslations("common");
  const notifications = useNotificationStore((s) => s.notifications);
  const shown = useRef(new Set<number>());
  useToasterLiveRegion();

  useEffect(() => {
    const live = new Set(notifications.map((n) => n.id));
    for (const n of notifications) {
      if (shown.current.has(n.id)) continue;
      shown.current.add(n.id);
      const title = toToastText(n.title) || toToastText(n.message);
      const description = n.title ? toToastText(n.message) : undefined;
      toast(title, {
        id: `oi-${n.id}`,
        description,
        variant: VARIANT[n.type] ?? "info",
        duration: n.duration > 0 ? n.duration : Number.POSITIVE_INFINITY,
        action: n.onClick ? { label: t("open"), onClick: n.onClick } : undefined,
      });
    }
    for (const id of shown.current) {
      if (!live.has(id)) {
        dismissToast(`oi-${id}`);
        shown.current.delete(id);
      }
    }
  }, [notifications, t]);

  return null;
}

export default function NotificationToast() {
  return (
    <>
      <Toaster position="top-right" />
      <NotificationBridge />
    </>
  );
}
