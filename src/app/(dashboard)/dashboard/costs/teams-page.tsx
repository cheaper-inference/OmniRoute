"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";

import { useTeamCosts, useTeamList } from "./teams/useTeamCosts";
import { useTeamMutations } from "./teams/useTeamMutations";
import type { Team, Period } from "./teams/helpers";
import TeamDetailPane, { Loading } from "./teams/TeamDetailPane";
import TeamPicker from "./teams/TeamPicker";
import TeamConfirmModal from "./teams/TeamConfirmModal";
import TeamForm from "./teams/TeamForm";

/** The URL owns selection. A valid archived deep link is visible until the user filters. */
function filterTeams(teams: Team[], filter: string, requestedId: string, missingId: string) {
  return teams.filter(
    (team) =>
      team.id !== missingId &&
      (filter === "all" ||
        team.status === filter ||
        (requestedId === team.id && team.status === "archived" && filter === "active"))
  );
}

function TeamsHeader({
  blocked,
  createDisabled,
  onRefresh,
  onCreate,
}: {
  blocked: boolean;
  createDisabled: boolean;
  onRefresh: () => void;
  onCreate: () => void;
}) {
  const t = useTranslations("teamCosts");
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        <p className="mt-1 text-sm text-text-muted">{t("subtitle")}</p>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" icon="refresh" disabled={blocked} onClick={onRefresh}>
          {t("refresh")}
        </Button>
        <Button icon="add" disabled={createDisabled} onClick={onCreate}>
          {t("create")}
        </Button>
      </div>
    </div>
  );
}

function TeamsAlert({ error }: { error: string }) {
  const t = useTranslations("teamCosts");
  if (!error) return null;
  return (
    <p role="alert" className="text-sm text-red-600 dark:text-red-400">
      {t(error)}
    </p>
  );
}

function useTeamSelection() {
  const router = useRouter();
  const params = useSearchParams();
  const select = useCallback(
    (id: string, replace = false) => {
      const next = new URLSearchParams(params.toString());
      if (id) next.set("team", id);
      else next.delete("team");
      const url = `/dashboard/costs/teams${next.size ? "?" + next.toString() : ""}`;
      if (replace) router.replace(url);
      else router.push(url);
    },
    [params, router]
  );
  return { requestedId: params.get("team") ?? "", select };
}

function useTeamBrowser() {
  const { requestedId, select } = useTeamSelection();
  const [period, setPeriod] = useState<Period>("30d");
  const [filter, setFilter] = useState("active");
  const [missingId, setMissingId] = useState("");
  const preliminary = useTeamList();
  const refreshList = preliminary.refresh;
  const visible = filterTeams(preliminary.list?.teams ?? [], filter, requestedId, missingId);
  const selectedId = visible.some((team) => team.id === requestedId)
    ? requestedId
    : (visible[0]?.id ?? "");
  const data = useTeamCosts(selectedId, period);
  useEffect(() => {
    if (preliminary.list && requestedId !== selectedId) select(selectedId, true);
    // URL normalization only; no React state updates inside the effect.
  }, [preliminary.list, requestedId, selectedId, select]);
  useEffect(() => {
    if (data.detailError === "notFound") {
      select("", true);
      void Promise.resolve().then(() => setMissingId(selectedId));
      void refreshList().catch(() => {});
    }
  }, [data.detailError, selectedId, select, refreshList]);
  return { preliminary, data, visible, selectedId, filter, setFilter, period, setPeriod, select };
}

export default function TeamCostsPage() {
  const t = useTranslations("teamCosts");
  const { preliminary, data, visible, selectedId, filter, setFilter, period, setPeriod, select } =
    useTeamBrowser();
  const detail = data.data?.detail;
  const mutations = useTeamMutations({
    detail,
    // Each hook reports its own failure, so one failed read must not skip the other.
    reloadReads: () => Promise.allSettled([preliminary.refresh(), data.reloadDetail()]),
    select,
  });
  const { blocked, mutationError } = mutations;
  const alertError =
    preliminary.listError || (mutations.form || mutations.confirmation ? "" : mutationError);
  return (
    <div className="mx-auto max-w-[1440px] p-4 md:p-6 space-y-6 text-text-main">
      <TeamsHeader
        blocked={blocked}
        createDisabled={blocked || Boolean(preliminary.listError)}
        onRefresh={() => void mutations.refresh()}
        onCreate={() => mutations.openForm(null)}
      />
      <TeamsAlert error={alertError} />
      {!preliminary.list && !preliminary.listError ? (
        <Loading label={t("loading")} />
      ) : (
        <div className="space-y-5">
          <TeamPicker
            teams={visible}
            selectedId={selectedId}
            filter={filter}
            blocked={blocked}
            onSelect={(id) => select(id)}
            onFilter={(next) => {
              setFilter(next);
              select("", true);
            }}
          />
          <TeamDetailPane
            detailError={data.detailError}
            loading={data.loading}
            content={
              detail && data.data
                ? {
                    detail,
                    report: data.data.report,
                    period,
                    keyOptions: preliminary.list?.keyOptions ?? [],
                    blocked,
                    onEdit: (team) => mutations.openForm(team),
                    onArchive: (team) => mutations.ask({ kind: "archive", team }),
                    onPeriod: setPeriod,
                    onAssign: (key) => void mutations.assign(key),
                    onRemove: mutations.requestRemove,
                  }
                : null
            }
          />
        </div>
      )}
      {mutations.form && (
        <TeamForm
          team={mutations.form.team}
          pending={mutations.pending}
          error={mutationError}
          onClose={mutations.closeForm}
          onSave={mutations.save}
        />
      )}
      <TeamConfirmModal
        confirmation={mutations.confirmation}
        pending={mutations.pending}
        mutationError={mutationError}
        onClose={mutations.closeConfirmation}
        onConfirm={mutations.confirm}
      />
    </div>
  );
}
