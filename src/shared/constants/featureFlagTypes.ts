// Shape of one feature-flag catalog entry. Split out of featureFlagDefinitions.ts to keep
// that catalog under the file-size cap; featureFlagDefinitions.ts re-exports it.
export interface FeatureFlagDefinition {
  key: string;
  label: string;
  description: string;
  descriptionI18nKey: string;
  category: "security" | "network" | "policies" | "runtime" | "cli" | "health";
  defaultValue: string;
  type: "boolean" | "enum";
  enumValues?: string[];
  requiresRestart: boolean;
  warningLevel?: "info" | "caution" | "danger";
  /**
   * The consumers of this key read the environment directly. A dashboard
   * override cannot reach them, so the API refuses one instead of storing a
   * value nothing reads.
   */
  envOnly?: boolean;
}
