"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@omniroute/ui-kit/sheet";

import { Button } from "@/shared/components";

import type { DrillKind } from "../breakdownTabs";
import type { FilterField } from "../reportFilters";
import { DIMENSION_INFO, isSessionsPage, isSummary } from "../reportViews";
import { useReportResource } from "../useReportResource";
import { DrillKpis, DrillSessions, DrillTopList } from "./DrillSections";
import TrendsSection from "./TrendsSection";

export interface DrillTarget {
  kind: DrillKind;
  /** The filter value: an API key id for a member, a project name for a project. */
  key: string;
  label: string;
}

const KIND_FIELD: Record<DrillKind, FilterField> = {
  member: DIMENSION_INFO.members.field,
  project: DIMENSION_INFO.projects.field,
};

interface DrillPanelProps {
  target: DrillTarget;
  /** The page's current report filters as a query string. */
  query: string;
  refreshToken: number;
  onClose: () => void;
  onApply: (field: FilterField, key: string) => void;
}

/** One member or project against the current filters, in a side panel. */
export default function DrillPanel({
  target,
  query,
  refreshToken,
  onClose,
  onApply,
}: DrillPanelProps) {
  const t = useTranslations("reports");
  const field = KIND_FIELD[target.kind];
  // The panel's own value replaces the page's filter on the same field.
  const drillQuery = useMemo(() => {
    const params = new URLSearchParams(query);
    params.delete(field);
    params.set(field, target.key);
    return params.toString();
  }, [query, field, target.key]);
  const sessionsQuery = useMemo(() => {
    const params = new URLSearchParams(drillQuery);
    params.set("sort", "lastSeen");
    params.set("order", "desc");
    params.set("limit", "5");
    return params.toString();
  }, [drillQuery]);

  const summary = useReportResource("/api/reports/summary", drillQuery, refreshToken, isSummary);
  const sessions = useReportResource(
    "/api/reports/sessions",
    sessionsQuery,
    refreshToken,
    isSessionsPage
  );
  const breakdowns = summary.data?.breakdowns;
  const isMember = target.kind === "member";

  return (
    <Sheet open onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        closeLabel={t("closePanel")}
        aria-describedby={undefined}
        className="w-full max-w-full bg-surface p-0 sm:w-[560px]"
      >
        <SheetHeader>
          <SheetTitle className="break-words text-xl">{target.label}</SheetTitle>
          <SheetDescription>
            {t(isMember ? "drillMemberHelp" : "drillProjectHelp")}
          </SheetDescription>
        </SheetHeader>
        <SheetBody className="space-y-5">
          <Button
            size="sm"
            variant="secondary"
            icon="filter_list"
            onClick={() => {
              onApply(field, target.key);
              onClose();
            }}
          >
            {t("applyAsFilter")}
          </Button>
          {summary.failed && <p className="text-sm text-error">{t("loadFailed")}</p>}
          {summary.data && (
            <div className={summary.loading ? "opacity-60 transition-opacity" : undefined}>
              <DrillKpis totals={summary.data.totals} />
            </div>
          )}
          {isMember ? (
            <DrillTopList
              title={t("drillTopProjects")}
              rows={breakdowns?.projects ?? []}
              fallback={t("noProject")}
            />
          ) : (
            <DrillTopList
              title={t("drillByMember")}
              rows={breakdowns?.members ?? []}
              fallback={t("unknownMember")}
            />
          )}
          <DrillTopList
            title={t("drillTopModels")}
            rows={breakdowns?.models ?? []}
            fallback={t("unknown")}
          />
          <TrendsSection
            query={drillQuery}
            dimension="members"
            refreshToken={refreshToken}
            compact
          />
          <DrillSessions sessions={sessions.data?.sessions ?? []} kind={target.kind} />
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}
