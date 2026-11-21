"use client";

import { useEffect, useMemo, useState } from "react";

import type { AgentSessionReportFacets } from "@/lib/db/agentSessionReports";
import type { AgentSessionReport } from "@/lib/usage/agentSessionReports";

import { toReportQuery, type ReportFilterState } from "./reportFilters";

async function loadJson<T>(path: string, query: string, signal: AbortSignal): Promise<T> {
  const res = await fetch(`${path}?${query}`, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/** The report and the dropdown facets for the current filters. */
export function useReportData(filters: ReportFilterState, refreshToken: number) {
  const [result, setResult] = useState<{ key: string; report?: AgentSessionReport } | null>(null);
  const [facets, setFacets] = useState<AgentSessionReportFacets | null>(null);

  const query = useMemo(() => toReportQuery(filters).toString(), [filters]);
  const requestKey = `${query}#${refreshToken}`;

  useEffect(() => {
    const controller = new AbortController();
    loadJson<AgentSessionReport>("/api/reports/summary", query, controller.signal)
      .then((report) => setResult({ key: requestKey, report }))
      .catch(() => {
        if (!controller.signal.aborted) setResult({ key: requestKey });
      });
    return () => controller.abort();
  }, [query, requestKey]);

  useEffect(() => {
    const controller = new AbortController();
    loadJson<AgentSessionReportFacets>("/api/reports/facets", query, controller.signal)
      .then(setFacets)
      .catch(() => {
        // Keep the previous options; the report itself surfaces load failures.
      });
    return () => controller.abort();
  }, [query, refreshToken]);

  const loading = result?.key !== requestKey;
  const report = result?.report;
  return { query, loading, report, failed: !loading && !report, facets };
}
