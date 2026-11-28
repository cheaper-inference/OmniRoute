/**
 * quotaWindowPing.ts — descriptor registry for quota window ping targets.
 *
 * Pure data plus pure predicates (safe for the client bundle). The registry is
 * the only extension path: a window is pingable only when the provider reports
 * a first-use window with a global, upstream resetAt. Providers without that
 * evidence are deliberately absent (telemetry only).
 */
import type { QuotaWindowDescriptor } from "@/shared/types/quotaWindowPing";

export const QUOTA_WINDOW_PING_SETTINGS_KEY = "quotaWindowPing";
export const QUOTA_WINDOW_PING_TICK_INTERVAL_MS = 30_000;
export const QUOTA_WINDOW_PING_PING_TIMEOUT_MS = 60_000;
export const QUOTA_WINDOW_PING_FAILURE_COOLDOWN_MS = 15 * 60_000;
// Legacy parity (quotaAutoPing minPingIntervalMs): never re-ping a target within
// this window of a successful ping, even when resetAt slides to a new fingerprint.
export const QUOTA_WINDOW_PING_MIN_SUCCESS_INTERVAL_MS = 10 * 60_000;
export const QUOTA_WINDOW_PING_WINDOW_ACTIVE_TOLERANCE_MS = 60_000;
export const QUOTA_WINDOW_PING_LEASE_MS = 75_000; // 60 s ping + 15 s read/refresh margin
export const QUOTA_WINDOW_PING_MAX_TARGETS = 100;
export const QUOTA_WINDOW_PING_MAX_RUNS = 200;
export const QUOTA_WINDOW_PING_MIN_INTERVAL_MINUTES = 5;
export const QUOTA_WINDOW_PING_MAX_INTERVAL_MINUTES = 10_080; // 7 days
export const QUOTA_WINDOW_PING_REQUEST_TYPE = "quota_window_ping";

// The ping body is deliberately tiny: it only warms the window. Codex uses the
// Responses body knobs; Claude uses a minimal non-streaming message body.
const CODEX_PING = {
  pingText: "hi",
  pingInstructions: "Reply with OK.",
  pingReasoningEffort: "none",
  pingMaxTokens: null,
} as const;

const CLAUDE_PING = {
  pingText: "hi",
  pingInstructions: null,
  pingReasoningEffort: null,
  pingMaxTokens: 1,
} as const;

export const QUOTA_WINDOW_PING_DESCRIPTORS: readonly QuotaWindowDescriptor[] = [
  {
    id: "codex:session",
    provider: "codex",
    model: null,
    modelFamily: null,
    scope: "connection",
    windowId: "session",
    displayName: "Session (5h)",
    kind: "first-use",
    durationSeconds: 18000,
    longerWindow: { descriptorId: "codex:weekly", windowId: "weekly" },
    policy: "scheduled",
    scheduledAllowed: true,
    resetAtSource: "upstream-window",
    globalResetAt: true,
    windowActiveEvidence: "reset-horizon",
    pingModelCandidates: [],
    ...CODEX_PING,
  },
  {
    id: "codex:weekly",
    provider: "codex",
    model: null,
    modelFamily: null,
    scope: "connection",
    windowId: "weekly",
    displayName: "Weekly",
    kind: "first-use",
    durationSeconds: 604800,
    longerWindow: null,
    policy: "scheduled",
    scheduledAllowed: true,
    resetAtSource: "upstream-window",
    globalResetAt: true,
    windowActiveEvidence: "none",
    pingModelCandidates: [],
    ...CODEX_PING,
  },
  {
    id: "claude:session",
    provider: "claude",
    model: null,
    modelFamily: null,
    scope: "connection",
    windowId: "session (5h)",
    displayName: "Session (5h)",
    kind: "first-use",
    durationSeconds: 18000,
    longerWindow: { descriptorId: "claude:weekly", windowId: "weekly (7d)" },
    policy: "manual",
    scheduledAllowed: true,
    resetAtSource: "upstream-window",
    globalResetAt: true,
    windowActiveEvidence: "none",
    pingModelCandidates: [],
    ...CLAUDE_PING,
  },
  {
    id: "claude:weekly",
    provider: "claude",
    model: null,
    modelFamily: null,
    scope: "connection",
    windowId: "weekly (7d)",
    displayName: "Weekly (7d)",
    kind: "first-use",
    durationSeconds: 604800,
    longerWindow: null,
    policy: "manual",
    scheduledAllowed: true,
    resetAtSource: "upstream-window",
    globalResetAt: true,
    windowActiveEvidence: "none",
    pingModelCandidates: [],
    ...CLAUDE_PING,
  },
  {
    id: "claude:weekly-scoped",
    provider: "claude",
    model: null,
    modelFamily: null,
    scope: "model",
    windowId: "weekly <model> (7d)",
    displayName: "Weekly <model> (7d)",
    kind: "first-use",
    durationSeconds: 604800,
    longerWindow: null,
    policy: "excluded",
    scheduledAllowed: false,
    resetAtSource: "upstream-per-model",
    globalResetAt: false,
    windowActiveEvidence: "none",
    pingModelCandidates: [],
    ...CLAUDE_PING,
  },
];

export function getQuotaWindowDescriptor(id: string): QuotaWindowDescriptor | undefined {
  return QUOTA_WINDOW_PING_DESCRIPTORS.find((descriptor) => descriptor.id === id);
}

export function listQuotaWindowDescriptors(provider?: string): readonly QuotaWindowDescriptor[] {
  if (!provider) return QUOTA_WINDOW_PING_DESCRIPTORS;
  return QUOTA_WINDOW_PING_DESCRIPTORS.filter((descriptor) => descriptor.provider === provider);
}

export function isTargetableDescriptor(descriptor: QuotaWindowDescriptor): boolean {
  return (
    descriptor.kind === "first-use" &&
    descriptor.globalResetAt &&
    descriptor.durationSeconds !== null &&
    descriptor.policy !== "excluded"
  );
}

export function isQuotaWindowPingEnabled(settings: Record<string, unknown>): boolean {
  const section = settings?.quotaWindowPing;
  return (
    typeof section === "object" &&
    section !== null &&
    !Array.isArray(section) &&
    (section as Record<string, unknown>).enabled === true
  );
}
