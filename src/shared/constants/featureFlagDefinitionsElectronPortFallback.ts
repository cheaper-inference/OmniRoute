import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** C18 — kept in its own module so the definitions registry stays under the file-size cap. */
export const ELECTRON_LOCAL_PORT_FALLBACK_ENABLED_FLAG: FeatureFlagDefinition = {
  key: "ELECTRON_LOCAL_PORT_FALLBACK_ENABLED",
  label: "Desktop: Use the Next Free Port When 20128 Is Busy",
  description:
    "Let the desktop app start its embedded server on the next free port (20129 to 20133, tried in order) when the default port 20128 is already taken, instead of stopping at the first conflict. The window, tray, app info and client snippets use the port the embedded server itself confirmed; a different program answering on 20128 never opens a window. Only the local graphical desktop mode with the default port takes part: an explicit PORT/OMNIROUTE_PORT, a split API/dashboard port, a remote server, dev mode, headless mode and a legacy bundle keep the single-port startup. If every port in the range is busy the app reports it and quits, and there is no random-port fallback. The desktop main process reads this flag from its environment (the process environment, the data directory .env or server.env) before it starts the server, not from the dashboard override, so set the environment variable and restart the app. Off by default: the embedded server asks for 20128 only.",
  descriptionI18nKey: "featureFlagElectronLocalPortFallbackEnabledDescription",
  category: "runtime",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: true,
  warningLevel: "info",
};
