"use client";

import { useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";

import {
  NEWS_DISMISS_EVENT,
  NEWS_DISMISS_STORAGE_NAME,
  parseDismissedNewsIds,
  selectVisibleNews,
  serializeDismissedNewsIds,
} from "@/shared/utils/releaseNotes";
import { useNewsFeed } from "@/shared/hooks/useNewsFeed";
import { Alert } from "@omniroute/ui-kit/alert";
import { buttonVariants } from "@omniroute/ui-kit/button";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import NewsSeverityBadge from "./NewsSeverityBadge";

function subscribeToDismissals(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(NEWS_DISMISS_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(NEWS_DISMISS_EVENT, callback);
  };
}

function readDismissedIds(): string {
  try {
    return localStorage.getItem(NEWS_DISMISS_STORAGE_NAME) ?? "";
  } catch {
    return "";
  }
}

function getServerDismissedIds(): string {
  return "";
}

/**
 * Generic, fail-silent reader for the public announcement feed. Fetching the
 * static JSON is GET-only and does not send product state or telemetry.
 */
export default function NewsBanner() {
  const locale = useLocale();
  const t = useTranslations("common");
  const feed = useNewsFeed();
  const dismissedSnapshot = useSyncExternalStore(
    subscribeToDismissals,
    readDismissedIds,
    getServerDismissedIds
  );
  const dismissedIds = parseDismissedNewsIds(dismissedSnapshot);
  const announcement = selectVisibleNews(feed.payload, locale, dismissedIds, {
    severityEnabled: feed.severityEnabled,
    now: feed.now,
  });

  if (!announcement) return null;

  const dismiss = () => {
    dismissedIds.add(announcement.id);
    try {
      localStorage.setItem(NEWS_DISMISS_STORAGE_NAME, serializeDismissedNewsIds(dismissedIds));
    } catch {
      // Storage is optional; the next announcement fetch remains functional.
    }
    window.dispatchEvent(new Event(NEWS_DISMISS_EVENT));
  };

  const link = announcement.link && (
    <a
      href={announcement.link}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonVariants({ size: "sm", className: "gap-1.5 whitespace-nowrap" })}
    >
      {announcement.linkLabel ?? announcement.title}
      <Icon name="open_in_new" size={14} />
    </a>
  );

  // A warning or critical announcement is a highlighted, dismissible alert; a critical one is
  // announced assertively. Informational announcements keep the plain banner.
  if (announcement.severity !== "info") {
    return (
      <Alert
        key={announcement.id}
        variant={announcement.severity}
        layout="inline"
        className="mb-4"
        icon={<Icon name={announcement.icon} size={18} />}
        title={
          <>
            <NewsSeverityBadge severity={announcement.severity} className="mr-2 align-middle" />
            {announcement.title}
          </>
        }
        description={announcement.message}
        actions={link}
        dismissLabel={t("dismissNotification")}
        onDismiss={dismiss}
      />
    );
  }

  return (
    <div
      role="complementary"
      aria-label={announcement.title}
      className="mb-4 flex flex-col gap-3 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Icon name={announcement.icon} size={22} className="text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text-main">{announcement.title}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-text-muted">{announcement.message}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 self-end sm:self-auto">
        {link}
        <Button
          variant="ghost"
          size="icon-sm"
          icon="close"
          onClick={dismiss}
          aria-label={t("dismissNotification")}
          className="text-text-muted hover:text-text-main"
        />
      </div>
    </div>
  );
}
