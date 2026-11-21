"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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

/**
 * `epoch` moves on every change of path or key, `attempt` on every reload. An outcome is shown
 * only for the exact request it answers, and last good data only within the same epoch.
 */
type Request = { epoch: number; attempt: number };
/** The request the fetch effect last started, with its key and its controller. */
type Running = { request: Request; apiKey: string; controller: AbortController };
type Settled<T> = Exclude<SelfServiceQuery<T>, { status: "idle" } | { status: "loading" }>;
type QueryState<T> = {
  request: Request;
  outcome: Settled<T>;
  good: { epoch: number; data: T } | null;
};

const SERVER_FAILURE = { ok: false, failure: "server" } as const;

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
    return { request, outcome, good: { epoch: request.epoch, data: outcome.data } };
  }
  // A refused key loses its last answer: re-sending it must not bring old data back on screen.
  const good = outcome.status === "refused" ? null : previous?.good;
  return { request, outcome, good: good && good.epoch === request.epoch ? good : null };
}

/** "Loading" is the gap between the current request and the one the state answers. */
function deriveQuery<T>(state: QueryState<T> | null, request: Request | null): SelfServiceQuery<T> {
  if (!request) return { status: "idle" };
  const answered = state?.request;
  if (answered && answered.epoch === request.epoch && answered.attempt === request.attempt) {
    return state.outcome;
  }
  const good = state?.good;
  return { status: "loading", data: good && good.epoch === request.epoch ? good.data : null };
}

/** Moves the epoch during render when the path or the key changes (previous-props pattern). */
function useEpoch(path: string, apiKey: string | null): number {
  const [tracked, setTracked] = useState({ path, apiKey, epoch: 0 });
  if (tracked.path === path && tracked.apiKey === apiKey) return tracked.epoch;
  const epoch = tracked.epoch + 1;
  setTracked({ path, apiKey, epoch });
  return epoch;
}

/**
 * Reads one self-service route with the key held in this browser. `schema` must be a stable
 * reference (a module constant): a new object on each render starts a new request.
 * `adopt(data, forApiKey, forEpoch)` shows an answer obtained elsewhere (the view a write returned)
 * as the answer to the current request, only while `forApiKey` is still the key being read and,
 * when given, `forEpoch` is still the hook's `epoch`: a key forgotten and typed again is a new
 * epoch, so a write sent under the earlier one is dropped.
 */
export function useSelfServiceQuery<T>(input: {
  path: string;
  apiKey: string | null;
  schema: ResponseSchema<T>;
  refetchOnReturn?: boolean;
}): {
  query: SelfServiceQuery<T>;
  reload: () => void;
  adopt: (data: T, forApiKey: string, forEpoch?: number) => void;
  epoch: number;
} {
  const { path, apiKey, schema, refetchOnReturn = false } = input;
  const epoch = useEpoch(path, apiKey);
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<QueryState<T> | null>(null);
  const reload = useCallback(() => setAttempt((value) => value + 1), []);
  const running = useRef<Running | null>(null);

  const adopt = useCallback((data: T, forApiKey: string, forEpoch?: number) => {
    const current = running.current;
    if (!current || current.apiKey !== forApiKey) return;
    if (forEpoch !== undefined && current.request.epoch !== forEpoch) return;
    // A read still in flight may carry the view from before the write.
    current.controller.abort();
    const outcome: Settled<T> = { status: "ready", data, receivedAt: Date.now() };
    setState((previous) => nextState(previous, current.request, outcome));
  }, []);

  useEffect(() => {
    if (!apiKey) return;
    const controller = new AbortController();
    const request: Request = { epoch, attempt };
    const entry: Running = { request, apiKey, controller };
    running.current = entry;
    void requestSelfService({ path, apiKey, schema, signal: controller.signal })
      // Anything thrown after the fetch (a throwing schema, for example) is a server failure.
      .catch((): SelfServiceResult<T> => SERVER_FAILURE)
      .then((result) => {
        if (controller.signal.aborted) return;
        const outcome = settle(result, Date.now());
        if (outcome) setState((previous) => nextState(previous, request, outcome));
      });
    return () => {
      controller.abort();
      if (running.current === entry) running.current = null;
    };
  }, [path, apiKey, schema, epoch, attempt]);

  const query = deriveQuery(state, apiKey ? { epoch, attempt } : null);
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

  return { query, reload, adopt, epoch };
}
