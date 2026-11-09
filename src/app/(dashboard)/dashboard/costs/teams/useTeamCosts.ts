"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  readJson,
  errorKey,
  reportRange,
  type Detail,
  type Report,
  type Team,
  type TeamKeyOption,
  type Period,
} from "./helpers";

export function useTeamList() {
  const [list, setList] = useState<{ teams: Team[]; keyOptions: TeamKeyOption[] } | null>(null);
  const [listError, setListError] = useState("");
  const listGeneration = useRef(0);
  const invalidateList = useCallback(() => {
    listGeneration.current++;
  }, []);
  const refreshList = useCallback(async (signal?: AbortSignal) => {
    const current = ++listGeneration.current;
    try {
      const data = await readJson<{ teams: Team[]; keyOptions: TeamKeyOption[] }>(
        "/api/teams?includeArchived=true&includeKeyOptions=true",
        { signal }
      );
      if (current === listGeneration.current && !signal?.aborted) {
        setList(data);
        setListError("");
      }
    } catch (error) {
      if (current === listGeneration.current && !signal?.aborted) setListError(errorKey(error));
      throw error;
    }
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    void refreshList(controller.signal).catch(() => {});
    return () => {
      controller.abort();
      invalidateList();
    };
  }, [refreshList, invalidateList]);
  return { list, listError, refresh: refreshList };
}

export function useTeamCosts(id: string, period: Period) {
  const [result, setResult] = useState<{
    id: string;
    period: Period;
    detail: Detail;
    report: Report;
  } | null>(null);
  const [failure, setFailure] = useState<{ id: string; period: Period; key: string } | null>(null);
  const generation = useRef(0);
  const activeIdentity = useRef({ id, period });
  const invalidate = useCallback(() => {
    generation.current++;
  }, []);
  const reloadDetail = useCallback(
    async (signal?: AbortSignal) => {
      if (activeIdentity.current.id !== id || activeIdentity.current.period !== period) return;
      const current = ++generation.current;
      if (id) {
        await Promise.all([
          readJson<Detail>(`/api/teams/${id}`, { signal }),
          readJson<{ report: Report }>(`/api/teams/${id}/usage?${reportRange(period)}`, { signal }),
        ])
          .then(([detail, usage]) => {
            if (current === generation.current && !signal?.aborted) {
              setResult({ id, period, detail, report: usage.report });
              setFailure(null);
            }
          })
          .catch((error: unknown) => {
            if (current === generation.current && !signal?.aborted) {
              setFailure({ id, period, key: errorKey(error) });
              setResult(null);
            }
            throw error;
          });
      }
    },
    [id, period]
  );
  useEffect(() => {
    activeIdentity.current = { id, period };
    const controller = new AbortController();
    void reloadDetail(controller.signal).catch(() => {});
    return () => {
      controller.abort();
      invalidate();
    };
  }, [reloadDetail, invalidate, id, period]);
  const data = result?.id === id && result.period === period ? result : null;
  const detailError = failure?.id === id && failure.period === period ? failure.key : "";
  return { data, detailError, loading: Boolean(id && !data && !detailError), reloadDetail };
}
