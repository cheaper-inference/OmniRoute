import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** #18448 — kept in its own module so the definitions registry stays under the file-size cap. */
export const CRASH_STORM_BREAKER_ENABLED_FLAG: FeatureFlagDefinition = {
  key: "CRASH_STORM_BREAKER_ENABLED",
  label: "Combo: Crash-Storm Breaker",
  description:
    "Skip a provider's combo targets before dispatch (reason crash_storm) once the same self-inflicted failure (local execution error or executor contract violation, 5xx) repeats on it inside a sliding window: OMNIROUTE_CRASH_STORM_THRESHOLD (10) and OMNIROUTE_CRASH_STORM_WINDOW_MS (5 min). It never writes a cooldown or lock, and a genuine upstream 5xx never feeds it. Off by default: nothing is recorded and no target is skipped.",
  descriptionI18nKey: "featureFlagCrashStormBreakerEnabledDescription",
  category: "runtime",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "caution",
};
