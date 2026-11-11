"use client";
import { useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
import Button from "@/shared/components/Button";
import { CardSkeleton } from "@/shared/components/Loading";
import type { Detail, Period, Report, Team, TeamKeyOption } from "./helpers";
import TeamBudgetCard from "./TeamBudgetCard";
import TeamReport from "./TeamReport";
import TeamMembership from "./TeamMembership";

export function Loading({ label }: { label: string }) {
  return (
    <div role="status" aria-label={label} className="space-y-4 motion-safe:animate-pulse">
      {[1, 2, 3].map((key) => (
        <CardSkeleton key={key} />
      ))}
      <span className="sr-only">{label}</span>
    </div>
  );
}

function TeamTitle({ detail, blocked, onEdit, onArchive }: TitleProps) {
  const t = useTranslations("teamCosts");
  const { team } = detail;
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <h2 className="text-xl font-semibold break-words">{team.name}</h2>
        <p className="text-xs mt-1 text-text-muted">{t(team.status)}</p>
        {team.description && (
          <p className="mt-2 text-sm text-text-muted break-words whitespace-pre-wrap">
            {team.description}
          </p>
        )}
      </div>
      {team.status === "active" && (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" disabled={blocked} onClick={() => onEdit(team)}>
            {t("edit")}
          </Button>
          <Button variant="ghost" size="sm" disabled={blocked} onClick={() => onArchive(team)}>
            {t("archive")}
          </Button>
        </div>
      )}
    </div>
  );
}

interface TitleProps {
  detail: Detail;
  blocked: boolean;
  onEdit: (team: Team) => void;
  onArchive: (team: Team) => void;
}

interface PaneProps extends TitleProps {
  report: Report;
  period: Period;
  keyOptions: TeamKeyOption[];
  onPeriod: (period: Period) => void;
  onAssign: (key: TeamKeyOption) => void;
  onRemove: (keyId: string) => void;
}

function TeamDetailContent({
  detail,
  report,
  period,
  keyOptions,
  blocked,
  onEdit,
  onArchive,
  onPeriod,
  onAssign,
  onRemove,
}: PaneProps) {
  return (
    <>
      <TeamTitle detail={detail} blocked={blocked} onEdit={onEdit} onArchive={onArchive} />
      <TeamBudgetCard detail={detail} />
      <TeamReport
        report={report}
        memberCount={detail.members.length}
        period={period}
        pending={blocked}
        onPeriod={onPeriod}
      />
      <TeamMembership
        key={detail.team.id}
        detail={detail}
        options={keyOptions}
        pending={blocked}
        onAssign={onAssign}
        onRemove={onRemove}
      />
    </>
  );
}

export default function TeamDetailPane({
  detailError,
  loading,
  content,
}: {
  detailError: string;
  loading: boolean;
  content: PaneProps | null;
}) {
  const t = useTranslations("teamCosts");
  let body = null;
  if (loading) body = <Loading label={t("loading")} />;
  else if (content) body = <TeamDetailContent {...content} />;
  else if (!detailError) {
    body = (
      <Card>
        <p className="text-text-muted">{t("selectHint")}</p>
      </Card>
    );
  }
  return (
    <main className="min-w-0 space-y-5">
      {detailError && (
        <p role="alert" className="text-error">
          {t(detailError)}
        </p>
      )}
      {body}
    </main>
  );
}
