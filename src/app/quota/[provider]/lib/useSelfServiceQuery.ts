"use client";

import { useCallback, useEffect, useState } from "react";

import {
  requestSelfService,
  type ResponseSchema,
  type SelfServiceResult,
} from "./selfServiceClient";

export type SelfServiceQuery<T> =
  | { status: "idle" } // no key
  | { status: "loading"; data: T | null } // data: last good answer for the same path and key
  | { status: "ready"; data: T; receivedAt: number }
  | { status: "refused"; reason: "invalid-key" | "missing-scope" }
  | { status: "failed"; reason: "network" | "server" | "invalid-response" };

// 60 s is the floor of the account readings cache: an earlier reload would show nothing new.
const REFRESH_ON_RETURN_MIN_AGE_MS = 60_000;

type Request = { path: string; apiKey: string; attempt: number };
type Settled<T> = Exclude<SelfServiceQuery<T>, { status: "idle" } | { status: "loading" }>;
/** The last outcome, kept with the request it answers, and the last good data. */
type QueryState<T> = {
  request: Request;
  outcome: Settled<T>;
  good: { path: string; apiKey: string; data: T } | null;
};

function sameRequest(a: Request, b: Request): boolean {
  return a.path === b.path && a.apiKey === b.apiKey && a.attempt === b.attempt;
}

function settle<T>(result: SelfServiceResult<T>, receivedAt: number): Settled<T> | null {
  // `in` narrows the union with or without strictNullChecks.
  if (!("failure" in result)) return { status: "ready", data: result.data, receivedAt };
  const { failure } = result;
  switch (failure) {
    case "aborted":
      return null;
    case "invalid-key":
    case "missing-scope":
      return { status: "refused", reason: failure };
    default:
      return { status: "failed", reason: failure };
  }
}

function nextState<T>(
  previous: QueryState<T> | null,
  request: Request,
  outcome: Settled<T>
): QueryState<T> {
  if (outcome.status === "ready") {
    return {
      request,
      outcome,
      good: { path: request.path, apiKey: request.apiKey, data: outcome.data },
    };
  }
  const good = previous?.good;
  const keep = good && good.path === request.path && good.apiKey === request.apiKey;
  return { request, outcome, good: keep ? good : null };
}

/** "Loading" is the gap between the current request and the one the state answers. */
function deriveQuery<T>(state: QueryState<T> | null, request: Request | null): SelfServiceQuery<T> {
  if (!request) return { status: "idle" };
  if (state && sameRequest(state.request, request)) return state.outcome;
  const good = state?.good;
  const keep = good && good.path === request.path && good.apiKey === request.apiKey;
  return { status: "loading", data: keep ? good.data : null };
}

/**
 * Reads one self-service route with the key held in this browser. `schema` must be a stable
 * reference (a module constant): a new object on each render starts a new request.
 */
export function useSelfServiceQuery<T>(input: {
  path: string;
  apiKey: string | null;
  schema: ResponseSchema<T>;
  refetchOnReturn?: boolean;
}): { query: SelfServiceQuery<T>; reload: () => void } {
  const { path, apiKey, schema, refetchOnReturn = false } = input;
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<QueryState<T> | null>(null);
  const reload = useCallback(() => setAttempt((value) => value + 1), []);

  useEffect(() => {
    if (!apiKey) return;
    const controller = new AbortController();
    const request: Request = { path, apiKey, attempt };
    void requestSelfService({ path, apiKey, schema, signal: controller.signal }).then((result) => {
      if (controller.signal.aborted) return;
      const outcome = settle(result, Date.now());
      if (outcome) setState((previous) => nextState(previous, request, outcome));
    });
    return () => controller.abort();
  }, [path, apiKey, schema, attempt]);

  const query = deriveQuery(state, apiKey ? { path, apiKey, attempt } : null);
  const readyAt = query.status === "ready" ? query.receivedAt : null;

  useEffect(() => {
    if (!refetchOnReturn || readyAt === null) return;
    const onVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;
      if (Date.now() - readyAt >= REFRESH_ON_RETURN_MIN_AGE_MS) reload();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [refetchOnReturn, readyAt, reload]);

  return { query, reload };
}
