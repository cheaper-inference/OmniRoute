"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { buttonVariants } from "@omniroute/ui-kit/button";
import { Card } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import { ViewerStatus } from "./ChangelogStates";
import {
  fetchNewsPayload,
  listActiveNews,
  type NewsAnnouncement,
} from "@/shared/utils/releaseNotes";

export default function NewsViewer() {
  const locale = useLocale();
  const t = useTranslations("changelogPage");
  const [news, setNews] = useState<NewsAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    void fetchNewsPayload(fetch, controller.signal)
      .then((payload) => {
        if (payload === null) {
          if (!controller.signal.aborted) setError(true);
          return;
        }
        setNews(listActiveNews(payload, locale));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [locale]);

  if (loading) {
    return <ViewerStatus busy icon="sync" message={t("loadingNews")} />;
  }

  if (error) {
    return (
      <ViewerStatus tone="error" icon="error_outline" message={t("announcementsLoadFailed")} />
    );
  }

  if (news.length === 0) {
    return <ViewerStatus icon="notifications_off" message={t("noAnnouncements")} />;
  }

  const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });

  return (
    <div className="flex flex-col gap-4">
      {news.map((announcement) => {
        const published = Date.parse(announcement.publishedAt);
        return (
          <Card key={announcement.id} padding="md">
            <article className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-control bg-bg-subtle text-text-main">
                <Icon name={announcement.icon} size={30} />
              </div>

              <div className="flex-1">
                {Number.isFinite(published) && (
                  <time className="ci-eyebrow" dateTime={announcement.publishedAt}>
                    {dateFormat.format(published)}
                  </time>
                )}
                <h2 className="ci-heading mt-1 mb-2 text-xl">{announcement.title}</h2>
                <p className="max-w-2xl text-sm leading-relaxed text-text-muted">
                  {announcement.message}
                </p>
              </div>

              {announcement.link && (
                <div className="shrink-0 md:ml-auto">
                  <a
                    href={announcement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "default" })}
                  >
                    {announcement.linkLabel ?? t("learnMore")}
                    <Icon name="arrow_forward" size={18} />
                  </a>
                </div>
              )}
            </article>
          </Card>
        );
      })}
    </div>
  );
}
