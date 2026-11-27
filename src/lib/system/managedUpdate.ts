/**
 * Dashboard side of the managed update (`MANAGED_UPDATE_ROLLBACK_ENABLED`, default off).
 *
 * The coordinator that installs, starts, proves and, if needed, rolls back lives in
 * `bin/cli/updateTransaction.mjs` and runs detached from this server (the server is stopped
 * during the swap). This module launches it, after the same pre-flight the CLI uses, and reads
 * its durable verdict back by operation id once the server is up again.
 *
 * Scope: a global npm install on Linux under the CLI-managed service. Everything else
 * ("not-applicable" here) keeps the update flow it had before.
 */
import { randomUUID } from "node:crypto";
import path from "node:path";
import { z } from "zod";
import { resolveDataDir } from "@/lib/dataPaths";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { APP_CONFIG } from "@/shared/constants/appConfig";
import { createLogger } from "@/shared/utils/logger";
import {
  createDefaultPreflightContext,
  launchManagedUpdateCoordinator,
  preflightManagedUpdate,
  readManagedUpdateState as readStateFile,
  resolveGlobalNpmRoot,
} from "../../../bin/cli/updateTransaction.mjs";

const log = createLogger("system/managedUpdate");

export const MANAGED_UPDATE_FLAG = "MANAGED_UPDATE_ROLLBACK_ENABLED";

/** Time the new (or restored) process gets to prove itself ready. */
const READINESS_TIMEOUT_MS = 180_000;

const OPERATION_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EXACT_VERSION_PATTERN = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;

export const managedUpdateOperationIdSchema = z.string().regex(OPERATION_ID_PATTERN);
const targetVersionSchema = z.string().max(64).regex(EXACT_VERSION_PATTERN);

export type ManagedUpdateAccepted = { operationId: string; status: "accepted" };

export type ManagedUpdateOutcome = {
  operationId: string;
  status: "updated" | "rolled-back" | "manual-recovery" | "unsupported";
  runningVersion: string | null;
};

/** What the dashboard may know about an operation. Everything else in the file is dropped. */
const publicStateSchema = z.object({
  operationId: managedUpdateOperationIdSchema,
  status: z.enum(["running", "updated", "rolled-back", "manual-recovery", "unsupported"]),
  phase: z.string().max(40),
  previousVersion: z.string().max(64),
  targetVersion: z.string().max(64),
  runningVersion: z.string().max(64).nullable().optional(),
  reason: z.string().max(80).optional(),
  refused: z.boolean().optional(),
  startedAt: z.string().max(40).optional(),
  updatedAt: z.string().max(40).optional(),
  snapshotPath: z.string().max(1024).optional(),
  recovery: z.object({ steps: z.array(z.string().max(600)).max(10) }).optional(),
});
export type ManagedUpdatePublicState = z.infer<typeof publicStateSchema>;

type PreflightResult =
  | { kind: "ok"; runtime: unknown; environment: unknown }
  | { kind: "unsupported" | "refused"; reason: string };

type Plan = {
  operationId: string;
  previousVersion: string;
  targetVersion: string;
  readinessTimeoutMs: number;
};

export type ManagedUpdateHooks = {
  enabled?: () => boolean;
  preflight?: (plan: Plan) => Promise<PreflightResult>;
  launch?: (input: { plan: Plan; runtime: unknown; environment: unknown }) => Promise<unknown>;
  currentVersion?: () => string;
};

let testHooks: ManagedUpdateHooks | null = null;

/** Test seam: replaces the pre-flight, the launch, the version and the flag. */
export function setManagedUpdateHooksForTests(hooks: ManagedUpdateHooks | null): void {
  testHooks = hooks;
}

export class ManagedUpdateInputError extends Error {}

export class ManagedUpdateUnavailableError extends Error {
  constructor(
    readonly kind: "unsupported" | "refused",
    readonly reason: string
  ) {
    super(`Managed update ${kind}: ${reason}`);
  }
}

/** Fail closed: an unreadable flag store keeps today's update flow. */
export function isManagedUpdateRollbackEnabled(): boolean {
  try {
    return isFeatureFlagEnabled(MANAGED_UPDATE_FLAG);
  } catch {
    return false;
  }
}

const REFUSED_MESSAGES: Record<string, string> = {
  "update-in-progress": "Another managed update is already running.",
  "insufficient-disk-space":
    "There is not enough free disk space for the data snapshot and the package copy. Nothing was changed.",
  "launch-failed": "The update coordinator could not be started. Nothing was changed.",
};

function describeRefusal(code: string): string {
  return (
    REFUSED_MESSAGES[code] ??
    "The managed update was refused before any change. Nothing was changed."
  );
}

async function defaultPreflight(plan: Plan): Promise<PreflightResult> {
  // The global package root is only known through npm; the pre-flight proves the running
  // server really belongs to it before accepting anything.
  const globalRoot = await resolveGlobalNpmRoot().catch(() => null);
  if (!globalRoot) return { kind: "unsupported", reason: "not-global-install" };
  const context = createDefaultPreflightContext({
    dataDir: resolveDataDir(),
    packageRoot: path.join(globalRoot, "omniroute"),
  });
  return (await preflightManagedUpdate(context, plan)) as PreflightResult;
}

export async function launchManagedUpdate(
  targetVersion: string,
  hooks: ManagedUpdateHooks = testHooks ?? {}
): Promise<ManagedUpdateAccepted> {
  const parsedVersion = targetVersionSchema.safeParse(targetVersion);
  if (!parsedVersion.success) throw new ManagedUpdateInputError("Invalid target version");

  const plan: Plan = {
    operationId: randomUUID(),
    previousVersion: (hooks.currentVersion ?? (() => APP_CONFIG.version))(),
    targetVersion: parsedVersion.data,
    readinessTimeoutMs: READINESS_TIMEOUT_MS,
  };
  const preflight = (await (hooks.preflight ?? defaultPreflight)(plan)) as PreflightResult;
  if (preflight.kind !== "ok") {
    throw new ManagedUpdateUnavailableError(preflight.kind, preflight.reason);
  }
  const launch =
    hooks.launch ??
    ((input: { plan: Plan; runtime: unknown; environment: unknown }) =>
      launchManagedUpdateCoordinator(input as never));
  await launch({ plan, runtime: preflight.runtime, environment: preflight.environment });
  return { operationId: plan.operationId, status: "accepted" };
}

export type MaybeManagedLaunch =
  | { kind: "not-applicable" }
  | { kind: "accepted"; operationId: string }
  | { kind: "refused"; code: string; message: string };

/**
 * The single decision `POST /api/system/version` makes. `not-applicable` means the route
 * continues exactly as it did before this feature existed.
 */
export async function maybeLaunchManagedUpdate(
  { mode, latest }: { mode: string; latest: string },
  hooks: ManagedUpdateHooks = testHooks ?? {}
): Promise<MaybeManagedLaunch> {
  if (!(hooks.enabled ?? isManagedUpdateRollbackEnabled)()) return { kind: "not-applicable" };
  if (mode !== "npm") return { kind: "not-applicable" };
  try {
    const accepted = await launchManagedUpdate(latest, hooks);
    return { kind: "accepted", operationId: accepted.operationId };
  } catch (err) {
    if (err instanceof ManagedUpdateInputError) return { kind: "not-applicable" };
    if (err instanceof ManagedUpdateUnavailableError) {
      if (err.kind === "unsupported") return { kind: "not-applicable" };
      return { kind: "refused", code: err.reason, message: describeRefusal(err.reason) };
    }
    // The server-side detail stays in the log; the response never carries it.
    log.error({ err }, "managed update launch failed");
    return { kind: "refused", code: "launch-failed", message: describeRefusal("launch-failed") };
  }
}

/** Public state of an operation, or null when unknown or unreadable. */
export function readManagedUpdateState(operationId: string): ManagedUpdatePublicState | null {
  if (!managedUpdateOperationIdSchema.safeParse(operationId).success) return null;
  const raw = readStateFile(resolveDataDir(), operationId);
  if (!raw) return null;
  const parsed = publicStateSchema.safeParse(raw);
  return parsed.success ? parsed.data : null;
}

/** The final verdict, or null while the operation is unknown or still running. */
export async function readManagedUpdateOutcome(
  operationId: string
): Promise<ManagedUpdateOutcome | null> {
  const state = readManagedUpdateState(operationId);
  if (!state || state.status === "running") return null;
  return { operationId, status: state.status, runningVersion: state.runningVersion ?? null };
}
