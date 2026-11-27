"use client";

import { useId, useState } from "react";
import { useFormatter, useTranslations } from "next-intl";

import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import SegmentedControl from "@/shared/components/SegmentedControl";
import {
  SELF_USAGE_RANGES,
  selfUsageResponseSchema,
  type SelfUsageRange,
} from "@/shared/schemas/selfUsage";

import { UPDATED_AT_FORMAT } from "../lib/quotaFormat";
import { usagePath } from "../lib/selfServiceClient";
import { useSelfServiceQuery } from "../lib/useSelfServiceQuery";
import { useStoredApiKey } from "../lib/useStoredApiKey";
import SpendByModelTable from "./SpendByModelTable";
import SpendDailyChart from "./SpendDailyChart";
import SpendSummary from "./SpendSummary";

const isRange = (value: string): value is SelfUsageRange =>
  (SELF_USAGE_RANGES as readonly string[]).includes(value);

/**
 * The key's own usage over a chosen period. Its query is separate from the quota one: a failure
 * here shows its own sentence and leaves the quota cards as they are.
 */
export default function MySpendSection() {
  const t = useTranslations("quotaSelf");
  const format = useFormatter();
  const titleId = useId();
  const { stored } = useStoredApiKey();
  const [range, setRange] = useState<SelfUsageRange>("30d");
  const { query, reload } = useSelfServiceQuery({
    path: usagePath(range),
    apiKey: stored?.key ?? null,
    // A module constant: the hook re-requests when the schema reference changes.
    schema: selfUsageResponseSchema,
  });
  const data = query.status === "ready" || query.status === "loading" ? query.data : null;
  const settledBadly = query.status === "refused" || query.status === "failed";

  return (
    <Card padding="md">
      <section aria-labelledby={titleId} className="min-w-0 space-y-4">
        <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-2">
          <h2 id={titleId} className="ci-heading break-words">
            {t("spendTitle")}
          </h2>
          {data ? (
            <span className="text-sm text-text-muted">
              {t("updatedAt", {
                time: format.dateTime(new Date(data.generatedAt), UPDATED_AT_FORMAT),
              })}
            </span>
          ) : null}
        </div>
        <SegmentedControl
          semantics="radio"
          // The small size keeps the four periods inside the card on a 390 px phone.
          size="sm"
          aria-label={t("spendRangeLabel")}
          options={SELF_USAGE_RANGES.map((value) => ({ value, label: t(`range${value}`) }))}
          value={range}
          onChange={(value) => {
            if (isRange(value)) setRange(value);
          }}
        />
        {data ? (
          <>
            {data.summary.requests === 0 ? (
              <p role="status" className="text-sm text-text-muted">
                {t("spendEmpty")}
              </p>
            ) : (
              <>
                <SpendSummary summary={data.summary} />
                <SpendDailyChart daily={data.daily} />
                <SpendByModelTable rows={data.byModel} truncated={data.byModelTruncated} />
              </>
            )}
            {data.coverage.truncatedByRetention ? (
              <p className="min-w-0 break-words text-sm text-text-muted">
                {t("spendTruncated", { days: data.coverage.retentionDays })}
              </p>
            ) : null}
          </>
        ) : null}
        {!data && query.status === "loading" ? (
          <p role="status" className="text-sm text-text-muted">
            {t("spendLoading")}
          </p>
        ) : null}
        {settledBadly ? (
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <p role="status" className="text-sm text-text-muted">
              {t("spendFailed")}
            </p>
            <Button variant="secondary" size="sm" onClick={reload}>
              {t("retry")}
            </Button>
          </div>
        ) : null}
      </section>
    </Card>
  );
}
