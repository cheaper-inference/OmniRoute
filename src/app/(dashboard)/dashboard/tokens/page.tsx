"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import { DataTableShell } from "@omniroute/ui-kit/data-table-shell";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import EmptyState from "@/shared/components/EmptyState";
import Input from "@/shared/components/Input";

interface TokenLedgerEntry {
  id: number;
  fromApiKeyId: string;
  toApiKeyId: string;
  amount: number;
  reason: string | null;
  idempotencyKey: string | null;
  createdAt: string;
}

interface InviteItem {
  id: string;
  code: string;
  serverUrl: string | null;
  maxUses: number;
  useCount: number;
  expiresAt: string | null;
  revokedAt: string | null;
  createdAt: string;
}

interface ServerConnection {
  id: string;
  name: string;
  url: string;
  status: string;
  lastSyncAt: string | null;
  errorMessage: string | null;
}

export default function TokensPage() {
  const t = useTranslations("common");
  const locale = useLocale();
  // Balance & History
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState<TokenLedgerEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  // Transfer form
  const [toApiKeyId, setToApiKeyId] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferMsg, setTransferMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Invites
  const [invites, setInvites] = useState<InviteItem[]>([]);
  const [inviteMaxUses, setInviteMaxUses] = useState("1");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [newInviteCode, setNewInviteCode] = useState<string | null>(null);
  const [inviteError, setInviteError] = useState("");

  // Redeem
  const [redeemCode, setRedeemCode] = useState("");
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [redeemMsg, setRedeemMsg] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  // Servers
  const [servers, setServers] = useState<ServerConnection[]>([]);
  const [serverName, setServerName] = useState("");
  const [serverUrl, setServerUrl] = useState("");
  const [serverApiKey, setServerApiKey] = useState("");
  const [serverLoading, setServerLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const [transferRes, inviteRes, serverRes] = await Promise.all([
        fetch("/api/gamification/transfer"),
        fetch("/api/gamification/invite"),
        fetch("/api/gamification/servers"),
      ]);

      if (transferRes.ok) {
        const data = await transferRes.json();
        setBalance(data.balance ?? 0);
        setHistory(data.history ?? []);
      }
      if (inviteRes.ok) {
        const data = await inviteRes.json();
        setInvites(data.invites ?? []);
      }
      if (serverRes.ok) {
        const data = await serverRes.json();
        setServers(data.servers ?? []);
      }
    } catch {
      // silent fail
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      void fetchData();
    }, 0);

    return () => window.clearTimeout(loadTimer);
  }, [fetchData]);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setTransferLoading(true);
    setTransferMsg(null);

    try {
      const res = await fetch("/api/gamification/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromApiKeyId: "current", // backend resolves from auth
          toApiKeyId,
          amount: Number(amount),
          reason: reason || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setTransferMsg({
          type: "success",
          text: t("tokensTransferSuccess", { idempotencyKey: data.idempotencyKey }),
        });
        setToApiKeyId("");
        setAmount("");
        setReason("");
        await fetchData();
      } else {
        setTransferMsg({ type: "error", text: data.error || t("tokensTransferFailed") });
      }
    } catch (err) {
      setTransferMsg({
        type: "error",
        text: err instanceof Error ? err.message : t("tokensTransferFailed"),
      });
    } finally {
      setTransferLoading(false);
    }
  };

  const handleCreateInvite = async () => {
    setInviteLoading(true);
    setNewInviteCode(null);
    setInviteError("");

    try {
      const res = await fetch("/api/gamification/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKeyId: "current",
          maxUses: Number(inviteMaxUses) || 1,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setNewInviteCode(data.code);
        await fetchData();
      } else {
        setInviteError(data.error || t("tokensCreateInviteFailed"));
      }
    } catch (error) {
      setInviteError(error instanceof Error ? error.message : t("tokensCreateInviteFailed"));
    } finally {
      setInviteLoading(false);
    }
  };

  const handleRevokeInvite = async (inviteId: string) => {
    setInviteError("");
    try {
      const response = await fetch(`/api/gamification/invite?id=${inviteId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(t("tokensRevokeInviteFailed"));
      await fetchData();
    } catch (error) {
      setInviteError(error instanceof Error ? error.message : t("tokensRevokeInviteFailed"));
    }
  };

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    setRedeemLoading(true);
    setRedeemMsg(null);

    try {
      const res = await fetch("/api/gamification/invite/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: redeemCode, apiKeyId: "current" }),
      });
      const data = await res.json();
      if (res.ok) {
        setRedeemMsg({
          type: "success",
          text: t("tokensRedeemSuccess", {
            server: data.serverUrl || t("connected"),
          }),
        });
        setRedeemCode("");
        await fetchData();
      } else {
        setRedeemMsg({ type: "error", text: data.error || t("tokensRedeemFailed") });
      }
    } catch (err) {
      setRedeemMsg({
        type: "error",
        text: err instanceof Error ? err.message : t("tokensRedeemFailed"),
      });
    } finally {
      setRedeemLoading(false);
    }
  };

  const handleConnectServer = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerLoading(true);
    setServerError("");

    try {
      const res = await fetch("/api/gamification/servers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: serverName, url: serverUrl, apiKey: serverApiKey }),
      });
      if (res.ok) {
        setServerName("");
        setServerUrl("");
        setServerApiKey("");
        await fetchData();
      } else {
        const data = await res.json().catch(() => null);
        setServerError(data?.error || t("tokensConnectServerFailed"));
      }
    } catch (error) {
      setServerError(error instanceof Error ? error.message : t("tokensConnectServerFailed"));
    } finally {
      setServerLoading(false);
    }
  };

  const handleDisconnectServer = async (serverId: string) => {
    setServerError("");
    try {
      const response = await fetch(`/api/gamification/servers?id=${serverId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(t("tokensDisconnectServerFailed"));
      await fetchData();
    } catch (error) {
      setServerError(error instanceof Error ? error.message : t("tokensDisconnectServerFailed"));
    }
  };

  const statusMessage = (
    message: { type: "success" | "error"; text: string } | null,
    onDismiss: () => void
  ) =>
    message ? (
      <Alert
        variant={message.type === "success" ? "success" : "critical"}
        dismissLabel={t("close")}
        onDismiss={onDismiss}
      >
        {message.text}
      </Alert>
    ) : null;

  const errorMessage = (text: string, onDismiss: () => void) =>
    text ? (
      <Alert variant="critical" dismissLabel={t("close")} onDismiss={onDismiss}>
        {text}
      </Alert>
    ) : null;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader compact title={t("tokensPageTitle")} description={t("tokensPageDescription")} />

      {/* Balance */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-muted">{t("tokensTokenBalance")}</p>
            <p className="text-4xl font-bold mt-1">{balance.toLocaleString(locale)}</p>
          </div>
          <div className="text-6xl opacity-20" aria-hidden="true">
            🪙
          </div>
        </div>
      </Card>

      {/* Transfer Form */}
      <Card title={t("tokensSendTokens")} icon="send">
        <form onSubmit={handleTransfer} className="grid gap-4">
          <Input
            label={t("tokensRecipientApiKeyId")}
            type="text"
            value={toApiKeyId}
            onChange={(e) => setToApiKeyId(e.target.value)}
            placeholder={t("tokensRecipientApiKeyIdPlaceholder")}
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={t("tokensAmount")}
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              min="1"
              required
            />
            <Input
              label={t("tokensReasonOptional")}
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={t("tokensReasonPlaceholder")}
            />
          </div>
          {statusMessage(transferMsg, () => setTransferMsg(null))}
          <Button
            type="submit"
            variant="primary"
            disabled={transferLoading || !toApiKeyId || !amount}
            className="justify-self-start"
          >
            {transferLoading ? t("tokensSending") : t("tokensSendTokens")}
          </Button>
        </form>
      </Card>

      {/* Transaction History */}
      <Card title={t("tokensTransactionHistory")} icon="history">
        {/* Kit DataTableShell owns the loading overlay; no filters/pagination on this ledger. */}
        <DataTableShell loading={historyLoading} loadingLabel={t("loading")}>
          {!historyLoading && history.length === 0 ? (
            <EmptyState icon="history" title={t("tokensNoTransactionsYet")} />
          ) : (
            <Table scrollbarLabel={t("tokensTransactionHistory")}>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("type")}</TableHead>
                  <TableHead>{t("tokensFrom")}</TableHead>
                  <TableHead>{t("tokensTo")}</TableHead>
                  <TableHead className="text-right">{t("tokensAmount")}</TableHead>
                  <TableHead>{t("tokensReason")}</TableHead>
                  <TableHead className="text-right">{t("tokensDate")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((entry) => {
                  const isSent = entry.fromApiKeyId !== "current";
                  return (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <Badge variant={isSent ? "error" : "success"} size="sm">
                          {isSent ? t("tokensSent") : t("tokensReceived")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm font-mono">
                        {entry.fromApiKeyId.slice(0, 8)}...
                      </TableCell>
                      <TableCell className="text-sm font-mono">
                        {entry.toApiKeyId.slice(0, 8)}...
                      </TableCell>
                      <TableCell
                        className={`text-right font-mono ${isSent ? "text-error" : "text-success"}`}
                      >
                        {isSent ? "-" : "+"}
                        {entry.amount.toLocaleString(locale)}
                      </TableCell>
                      <TableCell className="text-sm text-text-muted">
                        {entry.reason || "-"}
                      </TableCell>
                      <TableCell className="text-right text-sm text-text-muted">
                        {new Date(entry.createdAt).toLocaleDateString(locale)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </DataTableShell>
      </Card>

      {/* Invite Panel */}
      <Card title={t("tokensInviteCodes")} icon="mail">
        <div className="flex flex-col gap-4">
          <div className="flex items-end gap-3">
            <Input
              label={t("tokensMaxUses")}
              type="number"
              value={inviteMaxUses}
              onChange={(e) => setInviteMaxUses(e.target.value)}
              min="1"
              className="flex-1"
            />
            <Button variant="primary" onClick={handleCreateInvite} disabled={inviteLoading}>
              {inviteLoading ? t("tokensCreatingInvite") : t("tokensCreateInvite")}
            </Button>
          </div>

          {newInviteCode && (
            <Alert
              variant="success"
              dismissLabel={t("close")}
              onDismiss={() => setNewInviteCode(null)}
            >
              {t("tokensInviteCreated")}:{" "}
              <span className="font-mono font-bold">{newInviteCode}</span>
            </Alert>
          )}

          {errorMessage(inviteError, () => setInviteError(""))}

          {/* Redeem */}
          <form
            onSubmit={handleRedeem}
            className="flex items-end gap-3 border-t border-border pt-4"
          >
            <Input
              label={t("tokensRedeemCode")}
              type="text"
              value={redeemCode}
              onChange={(e) => setRedeemCode(e.target.value)}
              placeholder={t("tokensRedeemCodePlaceholder")}
              required
              className="flex-1"
            />
            <Button type="submit" variant="secondary" disabled={redeemLoading || !redeemCode}>
              {redeemLoading ? t("tokensRedeeming") : t("tokensRedeem")}
            </Button>
          </form>

          {statusMessage(redeemMsg, () => setRedeemMsg(null))}

          {/* Active Invites */}
          {invites.length > 0 && (
            <div className="border-t border-border pt-4">
              <p className="text-sm text-text-muted mb-3">{t("tokensYourActiveInvites")}</p>
              <div className="space-y-2">
                {invites.map((inv) => (
                  <div
                    key={inv.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-surface-2 border border-border"
                  >
                    <div>
                      <span className="font-mono font-bold">{inv.code}</span>
                      <span className="text-xs text-text-muted ml-3">
                        {t("tokensInviteUses", { used: inv.useCount, max: inv.maxUses })}
                      </span>
                      {inv.revokedAt && (
                        <Badge variant="error" size="sm" className="ml-2">
                          {t("tokensRevoked")}
                        </Badge>
                      )}
                    </div>
                    {!inv.revokedAt && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-error"
                        onClick={() => handleRevokeInvite(inv.id)}
                      >
                        {t("tokensRevoke")}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Server Panel */}
      <Card title={t("tokensCommunityServers")} icon="dns">
        <div className="flex flex-col gap-4">
          <form onSubmit={handleConnectServer} className="grid gap-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                type="text"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                placeholder={t("tokensServerNamePlaceholder")}
                aria-label={t("tokensServerNamePlaceholder")}
                required
              />
              <Input
                type="url"
                value={serverUrl}
                onChange={(e) => setServerUrl(e.target.value)}
                placeholder="https://server.example.com"
                aria-label={t("tokensServerUrlLabel")}
                required
              />
              <Input
                type="password"
                value={serverApiKey}
                onChange={(e) => setServerApiKey(e.target.value)}
                placeholder={t("tokensApiKeyPlaceholder")}
                aria-label={t("tokensApiKeyPlaceholder")}
                required
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              disabled={serverLoading || !serverName || !serverUrl || !serverApiKey}
              className="justify-self-start"
            >
              {serverLoading ? t("tokensConnecting") : t("tokensConnectServer")}
            </Button>
          </form>

          {errorMessage(serverError, () => setServerError(""))}

          {servers.length === 0 ? (
            <EmptyState icon="dns" title={t("tokensNoServersConnected")} />
          ) : (
            <div className="space-y-2">
              {servers.map((server) => (
                <div
                  key={server.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-surface-2 border border-border"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold truncate">{server.name}</p>
                      <Badge
                        size="sm"
                        variant={
                          server.status === "connected"
                            ? "success"
                            : server.status === "error"
                              ? "error"
                              : "default"
                        }
                      >
                        {t.has(`tokensServerStatus.${server.status}`)
                          ? t(`tokensServerStatus.${server.status}`)
                          : server.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-text-muted mt-1 truncate">{server.url}</p>
                    {server.errorMessage && (
                      <p className="text-xs text-error mt-1">{server.errorMessage}</p>
                    )}
                    {server.lastSyncAt && (
                      <p className="text-xs text-text-muted mt-1">
                        {t("tokensLastSync", {
                          date: new Date(server.lastSyncAt).toLocaleString(locale),
                        })}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-error ml-4"
                    onClick={() => handleDisconnectServer(server.id)}
                  >
                    {t("tokensDisconnect")}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
