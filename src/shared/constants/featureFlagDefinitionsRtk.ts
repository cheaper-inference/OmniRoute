import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** RTK structural renderers — kept in its own module so the definitions registry stays under the file-size cap. */
export const RTK_STRUCTURAL_RENDERERS_ENABLED_FLAG: FeatureFlagDefinition = {
  key: "OMNIROUTE_RTK_STRUCTURAL_RENDERERS_ENABLED",
  label: "Compression: RTK Structural Renderers",
  description:
    "Let the RTK engine summarise a tool result by its format instead of cutting lines: a unified git diff keeps every file header, hunk header and changed line, notes created, deleted, renamed and mode-changed files, adds a +N -M count per file and drops blob ids and unchanged context. File listings are summarised the same way: `ls -l`, `find` and `tree` output and the path lists of the native Glob and directory-listing tools keep every name and path and drop only columns that carry no path information. It runs on the original output before any RTK filter, only for shell tool results (and diffs or trees recognised by their first lines) and for native Glob and directory-listing results, and only when RTK renderers (`enableRenderers`) and tool-result compression are on for the request. A diff or listing it cannot prove complete (merge or conflict diff, binary section, miscounted or truncated hunk, an unclassified listing line) is returned untouched, input over 512 KiB, 8192 lines or 16 KiB on one line uses the existing RTK filters, and a project or global filter that matches the command keeps precedence. Results marked `is_error` are never rewritten. Off by default: RTK output is byte-identical to before.",
  descriptionI18nKey: "featureFlagOmnirouteRtkStructuralRenderersEnabledDescription",
  category: "runtime",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "caution",
};
