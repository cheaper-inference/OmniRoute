"use client";

import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";

import type { SelfQuotaBlocks, SelfQuotaPool } from "@/shared/schemas/selfQuota";

import { describeDuration } from "../lib/quotaFormat";
import ModelCapList from "./ModelCapList";

type Schedule = SelfQuotaBlocks["schedules"][number];
type Translate = (key: string, values?: Record<string, string | number>) => string;

interface BlockNoticesProps {
  blocks: SelfQuotaBlocks;
  pools: SelfQuotaPool[];
}

/**
 * The catalog keys of a schedule that blocks the key right now, or null. Reserves and a budget
 * that is not known to be spent say nothing certain, so they are no notice.
 */
function noticeKeys(schedule: Schedule): { title: string; body: string } | null {
  if (schedule.state === "closed") {
    return schedule.reason === "outside-window"
      ? { title: "scheduleOutsideTitle", body: "scheduleOutsideBody" }
      : { title: "scheduleBlackoutTitle", body: "scheduleBlackoutBody" };
  }
  if (schedule.budget?.exhausted === true) {
    return { title: "scheduleBudgetTitle", body: "scheduleBudgetBody" };
  }
  return null;
}

/** "It reopens in about …", only for a closed schedule that says when. */
function reopensText(schedule: Schedule, t: Translate): string | null {
  const seconds = schedule.retryAfterSeconds;
  if (schedule.state !== "closed" || seconds === null || !(seconds > 0)) return null;
  const { unit, value } = describeDuration(seconds);
  const duration =
    unit === "minutes"
      ? t("durationMinutes", { minutes: value })
      : t("durationHours", { hours: value });
  return t("scheduleReopens", { duration });
}

/** What refuses this key's requests right now: closed schedules, spent budgets, model caps. */
export default function BlockNotices({ blocks, pools }: BlockNoticesProps) {
  const t = useTranslations("quotaSelf");
  // A notice for a pool this answer does not list has no name to show: it is dropped.
  const names = new Map(pools.map((pool) => [pool.ref, pool.name]));
  const notices = blocks.schedules.flatMap((schedule, index) => {
    const name = names.get(schedule.pool);
    const keys = noticeKeys(schedule);
    return name !== undefined && keys ? [{ schedule, name, keys, index }] : [];
  });
  const caps = blocks.modelCaps.filter((cap) => names.has(cap.pool));
  if (notices.length === 0 && caps.length === 0) return null;

  return (
    <div className="min-w-0 space-y-3">
      {notices.map(({ schedule, name, keys, index }) => {
        const label = schedule.state === "closed" ? schedule.label : null;
        const reopens = reopensText(schedule, t);
        return (
          <Alert
            key={`${schedule.pool}:${index}`}
            variant="warning"
            dismissible={false}
            title={t(keys.title)}
            description={
              <span className="flex min-w-0 flex-col gap-1 break-words">
                <span>{t(keys.body, { pool: name })}</span>
                {label !== null ? <span>{t("scheduleName", { label })}</span> : null}
                {reopens ? <span>{reopens}</span> : null}
              </span>
            }
          />
        );
      })}
      {caps.length > 0 ? <ModelCapList caps={caps} poolNames={names} /> : null}
    </div>
  );
}
