"use client";

import OpencodeServerSettingsCard from "../../components/OpencodeServerSettingsCard";

// Unlike the other tabs there is deliberately no ServiceStatusCard /
// ServiceLifecycleButtons here: the opencode server is owned by the executor,
// which autostarts it on demand and reuses it across requests. This tab only
// exposes where to reach it; the binary to launch is env-only (OPENCODE_SERVER_BIN). The same card is shown
// on the provider detail page.
export function OpencodeServerServiceTab() {
  return (
    <div className="space-y-4">
      <OpencodeServerSettingsCard />
    </div>
  );
}
