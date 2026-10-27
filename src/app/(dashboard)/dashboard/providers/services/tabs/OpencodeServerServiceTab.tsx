"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";

import OpencodeServerSettingsCard from "../../components/OpencodeServerSettingsCard";
import { ServiceStatusCard } from "../components/ServiceStatusCard";
import { useServiceStatus } from "../hooks/useServiceStatus";

const NAME = "opencode-server";

// Start/Stop only: the opencode CLI is installed and updated by the operator, so
// the install/update/restart buttons of ServiceLifecycleButtons do not apply.
// The executor never starts the server itself (the request path must not reach
// spawn, Hard Rules #15/#17); this tab, backed by the local-only
// /api/services/opencode-server/* routes, is the in-app way to launch it.
function OpencodeServerLifecycleButtons() {
  const t = useTranslations("embeddedServices");
  const { data, mutate } = useServiceStatus(NAME);
  const [pending, setPending] = useState<"start" | "stop" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const running = data?.state === "running";

  async function action(verb: "start" | "stop") {
    setPending(verb);
    setError(null);
    try {
      const res = await fetch(`/api/services/${NAME}/${verb}`, { method: "POST" });
      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as {
          error?: { message?: string };
        } | null;
        throw new Error(payload?.error?.message || `HTTP ${res.status}`);
      }
      mutate();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setPending(null);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" disabled={pending !== null || running} onClick={() => action("start")}>
          {pending === "start" ? t("starting") : t("start")}
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={pending !== null || !running}
          onClick={() => action("stop")}
        >
          {pending === "stop" ? t("stopping") : t("stop")}
        </Button>
      </div>
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}

// The same settings card is shown on the provider detail page; the binary to
// launch is env-only (OPENCODE_SERVER_BIN), never a dashboard setting.
export function OpencodeServerServiceTab() {
  return (
    <div className="space-y-4">
      <ServiceStatusCard name={NAME} />
      <OpencodeServerLifecycleButtons />
      <OpencodeServerSettingsCard />
    </div>
  );
}
