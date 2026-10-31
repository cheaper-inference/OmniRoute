"use client";
import { useState } from "react";
import { Card, Button } from "@/shared/components";

type Connection = { id: string; name?: string };
export default function RosebudPanel({
  connections,
  refresh,
}: {
  connections: Connection[];
  refresh: () => unknown;
}) {
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
          `${result.status}: ${result.account?.display_name || "Rosebud account"} — ${result.account?.balance ?? "unavailable"} credits`
        );
      if (action === "models")
        setMessage(
          `${result.models?.length || 0} models discovered. Prices are in Rosebud credits.`
        );
      refresh();
    } catch {
      setMessage(
        "Unable to complete this request. Rosebud authorization runs on the OmniRoute server and requires local or LAN access."
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <Card className="p-4 space-y-3">
      <h2 className="font-semibold">Rosebud subscription</h2>
      <p>Authorize each account once. Generation uses its existing Rosebud credits.</p>
      <Button disabled={busy} onClick={() => call("connect")}>
        Connect Rosebud account
      </Button>
      {approval && (
        <a href={approval} target="_blank" rel="noreferrer" className="underline">
          Approve on Rosebud
        </a>
      )}
      {connections.map((connection) => (
        <div key={connection.id} className="flex flex-wrap items-center gap-3">
          <span>{connection.name || "Rosebud"}</span>
          <Button disabled={busy} variant="outline" onClick={() => call("account", connection.id)}>
            Check authorization and credits
          </Button>
          <Button
            disabled={busy}
            variant="outline"
            onClick={() => call("authorize", connection.id)}
          >
            Reauthorize
          </Button>
          <Button disabled={busy} variant="outline" onClick={() => call("models", connection.id)}>
            Refresh models
          </Button>
        </div>
      ))}
      {message && <p role="status">{message}</p>}
    </Card>
  );
}
