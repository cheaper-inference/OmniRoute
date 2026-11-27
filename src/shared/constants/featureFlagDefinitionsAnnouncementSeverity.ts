import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** Kept in its own module so the definitions registry stays under the file-size cap. */
export const ANNOUNCEMENT_SEVERITY_ENABLED_FLAG: FeatureFlagDefinition = {
  key: "ANNOUNCEMENT_SEVERITY_ENABLED",
  label: "Announcement Severity",
  description:
    "Read the public announcement feed in its v3 form, where each entry carries a severity (info, warning or critical) and an optional expiry. On the Home page a warning or critical announcement is shown as a highlighted, dismissible banner ahead of informational ones, and the highlight expires on its own while the page stays open; the Changelog news tab names each entry's severity. A critical entry must carry an expiry. When the v3 feed is unavailable or invalid the reader falls back to the current v2 feed. Off by default: the dashboard reads only the v2 feed, as before. Needs no restart.",
  descriptionI18nKey: "featureFlagAnnouncementSeverityEnabledDescription",
  category: "runtime",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "info",
};
