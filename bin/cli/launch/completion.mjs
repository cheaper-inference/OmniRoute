// bin/cli/launch/completion.mjs: word lists the shell completion scripts use for `launch` and
// `gateway`. Tool ids come from the manifest so they cannot drift.

import { listManifestTargets } from "../cli-manifest.mjs";

/** Space-joined launch tool ids, in manifest order. */
export function launchToolWords() {
  return listManifestTargets("launch").join(" ");
}

/** Public long flags of `omnirouter launch` (reserved v1.x flags are deliberately absent). */
export const LAUNCH_FLAG_WORDS = [
  "--model",
  "--provider",
  "--pick",
  "--all-models",
  "--favorite",
  "--unfavorite",
  "--profile",
  "--port",
  "--remote",
  "--base-url",
  "--context",
  "--api-key",
  "--token",
  "--api-key-env",
  "--no-start",
  "--keep-gateway",
  "--start-timeout",
  "--inherit-env",
  "--dry-run",
  "--json",
  "--yes",
  "--doctor",
  "--cleanup",
  "--tag",
  "--no-summary",
  "--set-default",
  "--private",
  "--list",
].join(" ");

/** `omnirouter gateway <sub>` subcommands. */
export const GATEWAY_SUBCOMMANDS = "status keep stop";
