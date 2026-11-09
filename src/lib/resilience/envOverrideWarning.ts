import { getSettings } from "@/lib/db/settings";
import { asRecord, parseFeatureFlagBoolean } from "./settings/normalize";

// Env toggles that only seed the default; a boolean saved in resilienceSettings wins (#18608).
const SEEDED_TOGGLES: ReadonlyArray<{ env: string; path: readonly string[] }> = [
  { env: "QUOTA_PREFLIGHT_CUTOFF_ENABLED", path: ["quotaPreflight", "enabled"] },
  { env: "PROVIDER_COOLDOWN_ENABLED", path: ["providerCooldown", "enabled"] },
  { env: "STREAM_RECOVERY_ENABLED", path: ["streamRecovery", "enabled"] },
  { env: "STREAM_RECOVERY_MIDSTREAM_ENABLED", path: ["streamRecovery", "continueMidStream"] },
  {
    env: "STREAM_THROUGHPUT_WATCHDOG_ENABLED",
    path: ["streamRecovery", "throughputWatchdog", "enabled"],
  },
];

export interface ResilienceEnvOverride {
  env: string;
  envValue: boolean;
  saved: boolean;
}

// null when the env value is not a boolean word (both fallbacks then disagree).
function parseEnvBoolean(raw: string): boolean | null {
  const asTrue = parseFeatureFlagBoolean(raw, true);
  return asTrue === parseFeatureFlagBoolean(raw, false) ? asTrue : null;
}

/** Env toggles the operator set explicitly that a saved boolean silently overrides. */
export function findResilienceEnvOverrides(
  settings: Record<string, unknown> | null | undefined
): ResilienceEnvOverride[] {
  const saved = asRecord(asRecord(settings).resilienceSettings);
  const found: ResilienceEnvOverride[] = [];
  for (const { env, path } of SEEDED_TOGGLES) {
    const envValue = parseEnvBoolean(process.env[env] ?? "");
    if (envValue === null) continue;
    const value = path.reduce<unknown>((node, key) => asRecord(node)[key], saved);
    if (typeof value === "boolean" && value !== envValue)
      found.push({ env, envValue, saved: value });
  }
  return found;
}

export async function warnResilienceEnvOverridesAtBoot(): Promise<void> {
  const found = findResilienceEnvOverrides(await getSettings());
  if (found.length === 0) return;
  console.warn(
    `[STARTUP] ${found.length} resilience env flag(s) are ignored because a saved Resilience ` +
      "setting overrides them (the saved setting wins; change it in Dashboard > Settings > " +
      `Resilience): ${found.map((f) => `${f.env}=${f.envValue} (saved: ${f.saved})`).join(", ")}`
  );
}
