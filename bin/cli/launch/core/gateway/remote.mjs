// bin/cli/launch/core/gateway/remote.mjs: the "remote" lifecycle strategy.
// Probe only: never start, stop or lease a remote gateway.

import { LaunchError } from "../../contract.mjs";
import { probeHealth } from "./process.mjs";

export function normalizeRootUrl(url) {
  let s = String(url || "").trim();
  while (s.endsWith("/")) s = s.slice(0, -1);
  if (s.endsWith("/v1")) s = s.slice(0, -3);
  while (s.endsWith("/")) s = s.slice(0, -1);
  return s;
}

export async function acquireRemote({ rootUrl, probe = probeHealth }) {
  const baseUrl = normalizeRootUrl(rootUrl);
  if (!baseUrl) throw new LaunchError("UsageError", "Remote target has no URL");
  if (!(await probe(baseUrl, { timeoutMs: 3000 }))) {
    throw new LaunchError("GatewayUnreachable", `OmniRoute is not reachable at ${baseUrl}`, {
      hint: "Check the --remote URL or the active context",
    });
  }
  return { baseUrl, owned: false, origin: "remote", release: async () => {} };
}
