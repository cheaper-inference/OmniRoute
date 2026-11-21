"use client";

import { useTranslations } from "next-intl";

import Card from "@/shared/components/Card";
import type { Policy, QuotaUnit, QuotaWindow } from "@/lib/quota/dimensions";
import type {
  SelfQuotaBar,
  SelfQuotaMemberSlice,
  SelfQuotaShare,
} from "@/shared/schemas/selfQuota";

import { windowKey } from "../lib/quotaText";
import MemberBar from "./MemberBar";
import QuotaReading from "./QuotaReading";
import ShareReading from "./ShareReading";

interface WindowCardProps {
  window: QuotaWindow;
  unit: QuotaUnit;
  /** Scale of the whole reading: the pool's limit, or one account's plan limit. */
  limit: number;
  /** The whole pool's or account's use, when the key may see it. */
  reading?: SelfQuotaBar;
  /** Label of that reading ("Pool (everyone)" or "Account (everyone)"). */
  readingLabel: string;
  share: SelfQuotaShare;
  policy: Policy;
  /** Each member's use of this window, without names, when the pool sends it. */
  members?: SelfQuotaMemberSlice[];
}

/** One usage window: how full the pool or account is for everyone, and the key's own part. */
export default function WindowCard(props: WindowCardProps) {
  const { window, unit, limit, reading, readingLabel, share, policy, members } = props;
  const t = useTranslations("quotaSelf");

  return (
    <Card padding="sm" title={t(windowKey(window))} className="min-w-0">
      <div className="flex min-w-0 flex-col gap-3">
        {reading ? (
          <QuotaReading
            label={readingLabel}
            unit={unit}
            limit={limit}
            used={reading.used}
            status={reading.status}
            reason={reading.reason}
            resetAt={reading.resetAt}
          />
        ) : null}
        <ShareReading share={share} unit={unit} policy={policy} />
        {members ? <MemberBar members={members} unit={unit} limit={limit} /> : null}
      </div>
    </Card>
  );
}
