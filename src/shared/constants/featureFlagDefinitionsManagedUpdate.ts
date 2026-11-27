import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** Kept in its own module so the definitions registry stays under the file-size cap. */
export const MANAGED_UPDATE_ROLLBACK_FLAG: FeatureFlagDefinition = {
  key: "MANAGED_UPDATE_ROLLBACK_ENABLED",
  label: "Dashboard Update: Automatic Rollback",
  description:
    "Let the dashboard update button hand a global npm install on Linux, running as the CLI-managed service, to a detached coordinator that snapshots the data and the installed package, installs the exact new version, proves the new process ready, and restores the previous version and data once if it cannot. The service stops during the swap. The dashboard follows the operation by id and reports the result after the restart. Off by default: the update button keeps today's flow (install, then ask for a restart). Docker, Electron, Windows, source installs and services run by systemd or pm2 always keep today's flow.",
  descriptionI18nKey: "featureFlagManagedUpdateRollbackEnabledDescription",
  category: "runtime",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "caution",
};
