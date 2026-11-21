/**
 * Non-gating readiness checks (aegis-10). Three signals that used to be a log line only:
 *
 *  - hot_reload: the last runtime-config reload failed (a bad setting is not being applied);
 *  - guardrails_fail_open: a guardrail threw and the request went through unchecked, within
 *    the last 5 minutes (names only: the error text can hold request data and stays in the log);
 *  - injection_guard: the guard's mode or block threshold is set to a value nothing recognises,
 *    so the guard runs on a default the operator did not choose (a typo is the usual cause).
 *
 * They are reported, never gating: `/healthz` and `/readyz` keep their lifecycle answer, because
 * failing a probe for one typo would drop every replica at once. The report is exposed to
 * management callers on GET /api/monitoring/health under `readiness`. In memory, per process.
 */
import { resolveBlockThreshold } from "@/shared/utils/injectionSeverity";

const FAIL_OPEN_WINDOW_MS = 5 * 60 * 1000;
const MAX_NAMES = 8;
const VALID_MODES = new Set(["block", "warn", "log"]);
const VALID_THRESHOLDS = new Set(["low", "medium", "high"]);

let hotReloadFailed = false;
const failOpenAt = new Map<string, number>();

export function noteHotReload(ok: boolean): void {
  hotReloadFailed = !ok;
}

export function noteGuardrailFailOpen(name: string, now = Date.now()): void {
  if (failOpenAt.size >= MAX_NAMES && !failOpenAt.has(name)) {
    const oldest = [...failOpenAt.entries()].sort((a, b) => a[1] - b[1])[0];
    failOpenAt.delete(oldest[0]);
  }
  failOpenAt.set(name, now);
}

export function resetReadinessChecksForTests(): void {
  hotReloadFailed = false;
  failOpenAt.clear();
}

function unrecognised(value: string | undefined, valid: Set<string>): string | null {
  const text = (value ?? "").trim().toLowerCase();
  return text && !valid.has(text) ? text.slice(0, 40) : null;
}

function injectionGuardCheck(env: Record<string, string | undefined>): string {
  const mode = unrecognised(env.INJECTION_GUARD_MODE || env.INPUT_SANITIZER_MODE, VALID_MODES);
  if (mode) return `unreachable: mode "${mode}" is not block, warn or log; the guard runs in warn`;
  const threshold = unrecognised(
    env.INPUT_SANITIZER_BLOCK_THRESHOLD || env.INJECTION_GUARD_BLOCK_THRESHOLD,
    VALID_THRESHOLDS
  );
  if (threshold)
    return `unreachable: threshold "${threshold}" is not low, medium or high; the guard uses ${resolveBlockThreshold(null)}`;
  return "ok";
}

export type ReadinessReport = {
  checks: { hot_reload: string; guardrails_fail_open: string; injection_guard: string };
  degraded_checks: string[];
};

export function getReadinessChecks(
  now = Date.now(),
  env: Record<string, string | undefined> = process.env
): ReadinessReport {
  const recent = [...failOpenAt.entries()]
    .filter(([, at]) => now - at < FAIL_OPEN_WINDOW_MS)
    .map(([name]) => name);
  const checks = {
    hot_reload: hotReloadFailed ? "degraded: the last runtime-config reload failed" : "ok",
    guardrails_fail_open: recent.length ? `degraded: ${recent.join(", ")}` : "ok",
    injection_guard: injectionGuardCheck(env),
  };
  const degraded_checks = Object.entries(checks)
    .filter(([, value]) => value !== "ok")
    .map(([name]) => name);
  return { checks, degraded_checks };
}
