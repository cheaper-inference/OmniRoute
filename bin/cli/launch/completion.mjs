// bin/cli/launch/completion.mjs: word lists the shell completion scripts use for `launch` and
// `gateway`. Tool ids come from the manifest so they cannot drift.

import { listManifestTargets } from "../cli-manifest.mjs";

/** Space-joined launch tool ids, in manifest order. */
export function launchToolWords() {
  return listManifestTargets("launch").join(" ");
}

/** `omnirouter gateway <sub>` subcommands. */
export const GATEWAY_SUBCOMMANDS = "status keep stop";
