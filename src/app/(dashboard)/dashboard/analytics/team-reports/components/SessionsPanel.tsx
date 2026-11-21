"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import type { AgentSessionReportRow } from "@/lib/usage/agentSessionReports";
import { Button, Select } from "@/shared/components";

import { SESSION_SORT_FIELDS, type SessionOrder, type SessionSort } from "../reportFilters";
import { useSessionColumns } from "../sessionColumns";
import SessionDetailModal from "./SessionDetailModal";
import SessionsTable, { SessionColumnPicker } from "./SessionsTable";

const PAGE_SIZE = 25;

interface SessionsPanelProps {
  /** Report filters as a query string; paging and sorting are added here. */
  query: string;
  /** Bumped by the page's refresh button. */
  refreshToken: number;
  /** Owned by the page so the CSV export can follow the list order. */
  order: SessionOrder;
  onOrderChange: (order: SessionOrder) => void;
}

function SortControls({
  sort,
  desc,
  onSort,
  onToggleOrder,
}: {
  sort: SessionSort;
  desc: boolean;
  onSort: (sort: SessionSort) => void;
  onToggleOrder: () => void;
}) {
  const t = useTranslations("reports");
  return (
    <div className="flex items-end gap-2">
      <Select
        label={t("sortBy")}
        value={sort}
        onChange={(event) => onSort(event.target.value as SessionSort)}
        options={SESSION_SORT_FIELDS.map((field) => ({ value: field, label: t(`sort_${field}`) }))}
      />
      <Button variant="outline" onClick={onToggleOrder}>
        {desc ? t("sortDesc") : t("sortAsc")}
      </Button>
    </div>
  );
}

function Pager({
  page,
  pages,
  total,
  onPage,
}: {
  page: number;
  pages: number;
  total: number;
  onPage: (page: number) => void;
}) {
  const t = useTranslations("reports");
  return (
    <div className="flex items-center justify-between border-t border-border/30 pt-3 text-xs">
      <Button variant="outline" size="sm" disabled={page === 0} onClick={() => onPage(page - 1)}>
        {t("previous")}
      </Button>
      <span className="text-text-muted">{t("pageOf", { page: page + 1, pages, total })}</span>
      <Button
        variant="outline"
        size="sm"
        disabled={page + 1 >= pages}
        onClick={() => onPage(page + 1)}
      >
        {t("next")}
      </Button>
    </div>
  );
}

export default function SessionsPanel({
  query,
  refreshToken,
  order,
  onOrderChange,
}: SessionsPanelProps) {
  const t = useTranslations("reports");
  const { sort, desc } = order;
  // Paging is tied to the query it was chosen for, so a filter change starts again at page 1.
  const [paging, setPaging] = useState({ query, page: 0 });
  const page = paging.query === query ? paging.page : 0;
  const [data, setData] = useState<{ sessions: AgentSessionReportRow[]; total: number } | null>(
    null
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const columns = useSessionColumns();

  useEffect(() => {
    const params = new URLSearchParams(query);
    params.set("sort", sort);
    params.set("order", desc ? "desc" : "asc");
    params.set("limit", String(PAGE_SIZE));
    params.set("offset", String(page * PAGE_SIZE));
    const controller = new AbortController();
    fetch(`/api/reports/sessions?${params}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((next) => next && setData(next))
      .catch(() => {
        // Aborted by a newer query or a failed load; the last page stays visible.
      });
    return () => controller.abort();
  }, [query, sort, desc, page, refreshToken]);

  const total = data?.total ?? 0;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="text-xs text-text-muted">{t("sessionsWindowHintV2")}</p>
        <div className="flex flex-wrap items-end gap-2">
          <SortControls
            sort={sort}
            desc={desc}
            onSort={(next) => onOrderChange({ sort: next, desc })}
            onToggleOrder={() => onOrderChange({ sort, desc: !desc })}
          />
          <SessionColumnPicker visible={columns.visible} onToggle={columns.toggle} />
        </div>
      </div>

      {data && data.sessions.length === 0 ? (
        <p className="py-8 text-center text-sm text-text-muted">{t("noData")}</p>
      ) : (
        <SessionsTable
          sessions={data?.sessions ?? []}
          visible={columns.visible}
          onSelect={setSelectedId}
        />
      )}

      <Pager
        page={page}
        pages={pages}
        total={total}
        onPage={(next) => setPaging({ query, page: next })}
      />

      {selectedId && (
        <SessionDetailModal sessionId={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}
