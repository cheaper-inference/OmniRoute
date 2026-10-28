"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { DataTableShell } from "@omniroute/ui-kit/data-table-shell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";

interface CacheEntry {
  id: string;
  signature: string;
  model: string;
  hit_count: number;
  tokens_saved: number;
  created_at: string;
  expires_at: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function CacheEntriesTab() {
  const t = useTranslations("cache");
  const tc = useTranslations("common");
  const [entries, setEntries] = useState<CacheEntry[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ page: String(page), limit: String(pagination.limit) });
        if (search) params.set("search", search);

        const res = await fetch(`/api/cache/entries?${params}`);
        if (res.ok) {
          const data = await res.json();
          setEntries(data.entries);
          setPagination(data.pagination);
        } else {
          setEntries([]);
          setError(t("entriesLoadError"));
        }
      } catch {
        setEntries([]);
        setError(t("entriesLoadError"));
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit, search, t]
  );

  useEffect(() => {
    void (async () => {
      await fetchEntries();
    })();
  }, [fetchEntries]);

  const handleDelete = async (signature: string) => {
    setDeleting(signature);
    try {
      await fetch(`/api/cache/entries?signature=${encodeURIComponent(signature)}`, {
        method: "DELETE",
      });
      await fetchEntries(pagination.page);
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString();
  };

  return (
    <DataTableShell
      loading={loading}
      loadingLabel={t("loading")}
      filters={
        <div className="flex w-full items-end gap-3">
          <Input
            type="text"
            className="flex-1"
            aria-label={t("searchEntries")}
            placeholder={t("searchEntries")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchEntries()}
          />
          <Button variant="secondary" size="sm" onClick={() => fetchEntries()}>
            {t("search")}
          </Button>
        </div>
      }
      pagination={
        pagination.totalPages > 1 ? (
          <div className="flex items-center justify-center gap-2 py-3">
            <Button
              variant="secondary"
              size="sm"
              icon="chevron_left"
              aria-label={tc("previousPage")}
              onClick={() => fetchEntries(pagination.page - 1)}
              disabled={pagination.page <= 1}
            />
            <span className="text-sm text-text-muted">
              {pagination.page} / {pagination.totalPages}
            </span>
            <Button
              variant="secondary"
              size="sm"
              icon="chevron_right"
              aria-label={tc("nextPage")}
              onClick={() => fetchEntries(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
            />
          </div>
        ) : undefined
      }
    >
      {error ? (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-error/30 bg-error-bg px-4 py-3">
          <div className="text-sm text-error">{error}</div>
          <Button variant="secondary" size="sm" onClick={() => fetchEntries(pagination.page)}>
            {t("refresh")}
          </Button>
        </div>
      ) : !loading && entries.length === 0 ? (
        <div className="py-8 text-center text-sm text-text-muted">{t("noEntries")}</div>
      ) : (
        <Table className="text-sm" scrollbarLabel={t("entries")}>
          <TableHeader>
            <TableRow>
              <TableHead>{t("signature")}</TableHead>
              <TableHead>{t("model")}</TableHead>
              <TableHead>{t("hits")}</TableHead>
              <TableHead>{t("tokensSaved")}</TableHead>
              <TableHead>{t("created")}</TableHead>
              <TableHead>{t("expires")}</TableHead>
              <TableHead>{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-mono text-xs">
                  {entry.signature.slice(0, 12)}...
                </TableCell>
                <TableCell>{entry.model}</TableCell>
                <TableCell className="tabular-nums">{entry.hit_count}</TableCell>
                <TableCell className="tabular-nums text-success">
                  {(entry.tokens_saved ?? 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-xs text-text-muted">
                  {formatDate(entry.created_at)}
                </TableCell>
                <TableCell className="text-xs text-text-muted">
                  {formatDate(entry.expires_at)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    icon="delete"
                    className="text-error"
                    aria-label={tc("delete")}
                    title={tc("delete")}
                    onClick={() => handleDelete(entry.signature)}
                    disabled={deleting === entry.signature}
                    loading={deleting === entry.signature}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DataTableShell>
  );
}
