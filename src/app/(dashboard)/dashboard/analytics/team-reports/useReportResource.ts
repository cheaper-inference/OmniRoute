"use client";

import { useEffect, useState } from "react";

export interface ReportResource<T> {
  /** The last response that passed validation; kept while the next one loads. */
  data: T | undefined;
  loading: boolean;
  /** The latest request failed or returned something unusable. */
  failed: boolean;
}

/**
 * One read-only report endpoint. Fetches while `query` is a string and stays idle on null (a view
 * that is not visible), aborts the previous request when the query changes, and ignores anything
 * `validate` rejects, so a failed load never replaces the last good data.
 */
export function useReportResource<T>(
  path: string,
  query: string | null,
  refreshToken: number,
  validate: (value: unknown) => value is T
): ReportResource<T> {
  const requestKey = query === null ? null : `${path}?${query}#${refreshToken}`;
  const [state, setState] = useState<{ key: string; ok: boolean } | null>(null);
  const [data, setData] = useState<T | undefined>(undefined);

  useEffect(() => {
    if (requestKey === null || query === null) return;
    const controller = new AbortController();
    fetch(`${path}?${query}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((body: unknown) => {
        if (!validate(body)) throw new Error("unexpected response");
        setData(body);
        setState({ key: requestKey, ok: true });
      })
      .catch(() => {
        if (!controller.signal.aborted) setState({ key: requestKey, ok: false });
      });
    return () => controller.abort();
    // `validate` is a module-level guard; the request is identified by its key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestKey]);

  const settled = requestKey !== null && state?.key === requestKey;
  return {
    data,
    loading: requestKey !== null && !settled,
    failed: settled && !state?.ok,
  };
}
