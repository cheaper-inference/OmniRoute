"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, Button } from "@/shared/components";

type Connection = { id?: string; name?: string };
function ConnectionRow({
  connection,
  busy,
  call,
}: {
  connection: Connection;
  busy: boolean;
  call: (action: string, connectionId?: string) => unknown;
}) {
  const t = useTranslations("providers.rosebudPanel");
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span>{connection.name || "Rosebud"}</span>
      <Button disabled={busy} variant="outline" onClick={() => call("account", connection.id)}>
        {t("checkAccount")}
      </Button>
      <Button disabled={busy} variant="outline" onClick={() => call("authorize", connection.id)}>
        {t("reauthorize")}
      </Button>
      <Button disabled={busy} variant="outline" onClick={() => call("models", connection.id)}>
        {t("refreshModels")}
      </Button>
    </div>
  );
}

export default function RosebudPanel({
  connections,
  refresh,
}: {
  connections: Connection[];
  refresh: () => unknown;
}) {
  const t = useTranslations("providers.rosebudPanel");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [approval, setApproval] = useState<string | null>(null);
  async function call(action: string, connectionId?: string) {
    setBusy(true);
    setMessage("");
    try {
      const csrfResponse = await fetch("/api/auth/csrf");
      const csrf = await csrfResponse.json();
      const response = await fetch("/api/rosebud/" + action, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-omniroute-csrf": csrf.token },
        body: JSON.stringify(connectionId ? { connectionId } : { name: "OmniRoute Rosebud" }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error("Rosebud request failed; check the server connection.");
      if (
        ["connect", "authorize"].includes(action) &&
        typeof result.approval_url === "string" &&
        new URL(result.approval_url).origin === "https://rosebud.ai"
      )
        setApproval(result.approval_url);
      if (action === "account")
        setMessage(
          t("accountStatus", {
            status: String(result.status),
            account: result.account?.display_name || t("defaultAccountName"),
            balance: String(result.account?.balance ?? t("balanceUnavailable")),
          })
        );
      if (action === "models")
        setMessage(t("modelsDiscovered", { count: result.models?.length || 0 }));
      refresh();
    } catch {
      setMessage(t("requestFailed"));
    } finally {
      setBusy(false);
    }
  }
  return (
    <Card className="p-4 space-y-3">
      <h2 className="font-semibold">{t("title")}</h2>
      <p>{t("description")}</p>
      <Button disabled={busy} onClick={() => call("connect")}>
        {t("connect")}
      </Button>
      {approval && (
        <a href={approval} target="_blank" rel="noreferrer" className="underline">
          {t("approve")}
        </a>
      )}
      {connections
        .filter((connection) => connection.id)
        .map((connection) => (
          <ConnectionRow key={connection.id} connection={connection} busy={busy} call={call} />
        ))}
      {message && <p role="status">{message}</p>}
    </Card>
  );
}
