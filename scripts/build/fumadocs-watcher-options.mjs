import { resolve } from "node:path";

/**
 * The Fumadocs watcher only exists in development. Keep the caller option
 * equally explicit so production configuration remains unchanged.
 */
export function getFumadocsWatcherOptions(projectRoot, environment = process.env) {
  if (environment.NODE_ENV !== "development" || environment.OMNIROUTE_MDX_WATCH_I18N === "1") {
    return undefined;
  }

  return {
    ignored: [resolve(projectRoot, "docs", "i18n")],
  };
}
