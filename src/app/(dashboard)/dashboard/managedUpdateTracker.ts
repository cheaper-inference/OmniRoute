// Follows a managed update (`MANAGED_UPDATE_ROLLBACK_ENABLED`) from the dashboard.
//
// The server is stopped during the swap, so the page cannot hold a stream open: it polls the
// authenticated `GET /api/system/version?operationId=<uuid>` verdict. While the server is
// down the last known phase stays on screen; the next answer after the restart carries the
// durable outcome (updated, rolled back, or manual recovery). Polling is bounded.

import type { UpdatePhase, UpdateStep } from "./UpdateProgressDialog";

export type ManagedUpdateState = {
  operationId: string;
  status: "running" | "updated" | "rolled-back" | "manual-recovery" | "unsupported";
  phase: string;
  previousVersion: string;
  targetVersion: string;
  runningVersion?: string | null;
  reason?: string;
  snapshotPath?: string;
  recovery?: { steps: string[] };
};

export const MANAGED_POLL_INTERVAL_MS = 3_000;
// Snapshot, npm install, start and a possible restore all fit well inside this.
export const MANAGED_POLL_DEADLINE_MS = 30 * 60_000;

type Translate = (key: string, values?: Record<string, string | number>) => string;

export type ManagedTrackResult =
  | { kind: "terminal"; state: ManagedUpdateState }
  | { kind: "timeout"; lastState: ManagedUpdateState | null };

export type TrackOptions = {
  operationId: string;
  /** Resolves the state; throws when the server cannot be reached or answers an error. */
  fetchState: (operationId: string) => Promise<ManagedUpdateState | null>;
  onState: (state: ManagedUpdateState) => void;
  /** Called while the server is unreachable, with the last state seen (if any). */
  onDisconnected?: (lastState: ManagedUpdateState | null) => void;
  wait?: (ms: number) => Promise<void>;
  now?: () => number;
  intervalMs?: number;
  deadlineMs?: number;
};

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function trackManagedUpdate(options: TrackOptions): Promise<ManagedTrackResult> {
  const wait = options.wait ?? sleep;
  const now = options.now ?? Date.now;
  const interval = options.intervalMs ?? MANAGED_POLL_INTERVAL_MS;
  const deadline = now() + (options.deadlineMs ?? MANAGED_POLL_DEADLINE_MS);
  let last: ManagedUpdateState | null = null;

  for (;;) {
    try {
      const state = await options.fetchState(options.operationId);
      if (state) {
        last = state;
        options.onState(state);
        if (state.status !== "running") return { kind: "terminal", state };
      }
    } catch {
      // The server is down or restarting: keep the last known phase and try again.
      options.onDisconnected?.(last);
    }
    if (now() >= deadline) return { kind: "timeout", lastState: last };
    await wait(interval);
  }
}

const PHASE_ORDER = ["stop", "snapshot", "install", "verify"] as const;
type ManagedStepKey = (typeof PHASE_ORDER)[number];

// Which forward step each durable phase belongs to.
const PHASE_TO_STEP: Record<string, ManagedStepKey> = {
  preflight: "stop",
  stopping: "stop",
  snapshot: "snapshot",
  installing: "install",
  starting: "verify",
  verifying: "verify",
};

const STEP_ID: Record<ManagedStepKey, string> = {
  stop: "managed-stop",
  snapshot: "managed-snapshot",
  install: "managed-install",
  verify: "managed-verify",
};

type StepContext = {
  state: ManagedUpdateState;
  restoring: boolean;
  activeIndex: number;
};

function baseStepStatus(index: number, { state, restoring, activeIndex }: StepContext): string {
  if (state.status === "updated") return "done";
  if (state.status === "unsupported") return index === 0 ? "failed" : "pending";
  if (restoring) return index < PHASE_ORDER.length - 1 ? "done" : "failed";
  if (index < activeIndex) return "done";
  return index === activeIndex ? "running" : "pending";
}

// A failure before the verify step means the later rows never ran.
function stepStatus(index: number, context: StepContext): string {
  const status = baseStepStatus(index, context);
  if (!context.restoring) return status;
  const failedAt = FAILED_STEP_BY_REASON[context.state.reason ?? ""];
  if (failedAt === undefined || index < failedAt) return status;
  return index === failedAt ? "failed" : "pending";
}

const FAILED_STEP_BY_REASON: Record<string, number> = { "snapshot-failed": 1, "install-failed": 2 };

function restoreRow(state: ManagedUpdateState, t: Translate): UpdateStep {
  const outcome =
    state.status === "rolled-back"
      ? "done"
      : state.status === "manual-recovery"
        ? "failed"
        : "running";
  return {
    step: "managed-restore",
    status: outcome,
    message: t(`managedUpdateMessage.restore.${outcome}`, { version: state.previousVersion }),
  };
}

/** Dialog rows for a state. Pure: `t` supplies the (English-only) strings. */
export function managedStateToSteps(
  state: ManagedUpdateState,
  t: Translate,
  { disconnected = false }: { disconnected?: boolean } = {}
): UpdateStep[] {
  const restoring =
    state.phase === "restoring" ||
    state.status === "rolled-back" ||
    state.status === "manual-recovery";
  const activeIndex = PHASE_ORDER.indexOf(PHASE_TO_STEP[state.phase] ?? "verify");
  const context: StepContext = { state, restoring, activeIndex };

  const steps = PHASE_ORDER.map((key, index): UpdateStep => {
    const status = stepStatus(index, context);
    const message =
      status === "running" && disconnected
        ? t("managedUpdateReconnecting")
        : t(`managedUpdateMessage.${key}.${status}`, { version: state.targetVersion });
    return { step: STEP_ID[key], status, message };
  });
  if (restoring) steps.push(restoreRow(state, t));
  return steps;
}

export type ManagedOutcomeView = {
  phase: UpdatePhase;
  /** Extra row: prose outcome for a rollback, or the manual recovery instructions. */
  recovery?: UpdateStep;
  error?: UpdateStep;
  complete?: UpdateStep;
};

export function managedOutcomeView(state: ManagedUpdateState, t: Translate): ManagedOutcomeView {
  switch (state.status) {
    case "updated":
      return {
        phase: "done",
        complete: {
          step: "complete",
          status: "done",
          message: t("managedUpdateMessage.updated", {
            version: state.runningVersion ?? state.targetVersion,
          }),
        },
      };
    case "rolled-back":
      return {
        phase: "failed",
        recovery: {
          step: "recovery",
          status: "done",
          message: t("managedUpdateMessage.rolledBack", {
            target: state.targetVersion,
            version: state.runningVersion ?? state.previousVersion,
          }),
        },
      };
    case "manual-recovery": {
      const lines = [t("managedUpdateMessage.manualRecovery"), ...(state.recovery?.steps ?? [])];
      if (state.snapshotPath) {
        lines.push(t("managedUpdateMessage.snapshotAt", { path: state.snapshotPath }));
      }
      return {
        phase: "failed",
        recovery: { step: "recovery", status: "failed", message: lines.join("\n") },
      };
    }
    case "unsupported":
      return {
        phase: "failed",
        error: { step: "error", status: "failed", message: t("managedUpdateMessage.notApplied") },
      };
    default:
      return { phase: "running" };
  }
}

export function managedTimeoutView(t: Translate): ManagedOutcomeView {
  return {
    phase: "failed",
    error: { step: "error", status: "failed", message: t("managedUpdateMessage.timeout") },
  };
}

type FollowOptions = {
  operationId: string;
  targetVersion: string;
  currentVersion: string;
  t: Translate;
  setSteps: (steps: UpdateStep[]) => void;
  setPhase: (phase: UpdatePhase) => void;
  fetchFn?: typeof fetch;
} & Pick<TrackOptions, "wait" | "now" | "intervalMs" | "deadlineMs">;

/** Drives the progress dialog from the durable verdict until it is final or the deadline. */
export async function followManagedUpdate(options: FollowOptions): Promise<ManagedTrackResult> {
  const { t, setSteps, setPhase } = options;
  const fetchFn = options.fetchFn ?? fetch;
  const show = (state: ManagedUpdateState, disconnected = false) => {
    const view = managedOutcomeView(state, t);
    const rows = managedStateToSteps(state, t, { disconnected });
    for (const extra of [view.recovery, view.error, view.complete]) if (extra) rows.push(extra);
    setSteps(rows);
    setPhase(view.phase);
  };

  const initial: ManagedUpdateState = {
    operationId: options.operationId,
    status: "running",
    phase: "preflight",
    previousVersion: options.currentVersion,
    targetVersion: options.targetVersion,
  };
  show(initial);

  const result = await trackManagedUpdate({
    operationId: options.operationId,
    wait: options.wait,
    now: options.now,
    intervalMs: options.intervalMs,
    deadlineMs: options.deadlineMs,
    fetchState: async (id) => {
      const res = await fetchFn(`/api/system/version?operationId=${encodeURIComponent(id)}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Update state returned ${res.status}`);
      return (await res.json()) as ManagedUpdateState;
    },
    onState: (state) => show(state),
    onDisconnected: (last) => {
      if (last) show(last, true);
    },
  });

  if (result.kind === "timeout") {
    // No verdict in time: keep what was last known and say so, instead of a silent spinner.
    const rows = managedStateToSteps(result.lastState ?? initial, t);
    const timeout = managedTimeoutView(t).error;
    if (timeout) rows.push(timeout);
    setSteps(rows);
    setPhase("failed");
  }
  return result;
}

type FlowOptions = FollowOptions & {
  setUpdating: (updating: boolean) => void;
  notify: { success: (message: string) => void; error: (message: string) => void };
};

/** `followManagedUpdate` plus the end-of-update notice, so the page only makes one call. */
export async function runManagedUpdateFlow(options: FlowOptions): Promise<void> {
  const followed = await followManagedUpdate(options);
  options.setUpdating(false);
  const updated = followed.kind === "terminal" && followed.state.status === "updated";
  if (updated) {
    options.notify.success(options.t("updateCompleted", { version: options.targetVersion }));
  } else {
    options.notify.error(options.t("updateFailed"));
  }
}
