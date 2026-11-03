"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import EmptyState from "@/shared/components/EmptyState";
import Input from "@/shared/components/Input";
import { Spinner } from "@/shared/components/Loading";
import { ConfirmModal } from "@/shared/components/Modal";

interface DiscoveryResult {
  id: number;
  providerId: string;
  method: string;
  endpoint?: string | null;
  authType: string;
  models?: string[];
  rateLimit?: string | null;
  feasibility: number;
  riskLevel: string;
  status: string;
  notes?: string | null;
  discoveredAt?: string;
  verifiedAt?: string | null;
}

type Feedback = { type: "success" | "error"; message: string } | null;
type Translate = ReturnType<typeof useTranslations>;

type BadgeVariant = "default" | "success" | "warning" | "error";

const RISK_VARIANT: Record<string, BadgeVariant> = {
  none: "success",
  low: "success",
  medium: "warning",
  high: "error",
  critical: "error",
};

const STATUS_VARIANT: Record<string, BadgeVariant> = {
  verified: "success",
  testing: "warning",
  pending: "default",
  rejected: "error",
};

/** Run a fetch, surface a localized error via `setFeedback`, and report success. */
async function callApi(
  fn: () => Promise<Response>,
  t: Translate,
  failKey: string,
  setFeedback: (f: Feedback) => void
): Promise<boolean> {
  setFeedback(null);
  try {
    const res = await fn();
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error?.message || t(failKey));
    return true;
  } catch (err) {
    setFeedback({ type: "error", message: err instanceof Error ? err.message : t(failKey) });
    return false;
  }
}

/** Results list + loading + feedback state, plus the reload function. */
function useDiscoveryResults(t: Translate) {
  const [results, setResults] = useState<DiscoveryResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/discovery/results");
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error?.message || t("loadFailed"));
      setResults(Array.isArray(data.results) ? data.results : []);
    } catch (err) {
      setFeedback({ type: "error", message: err instanceof Error ? err.message : t("loadFailed") });
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void (async () => {
      await load();
    })();
  }, [load]);

  return { results, loading, feedback, setFeedback, load };
}

/** Scan / verify / delete actions and their transient state. */
function useDiscoveryActions(
  t: Translate,
  load: () => Promise<void>,
  setFeedback: (f: Feedback) => void
) {
  const [scanTarget, setScanTarget] = useState("");
  const [scanning, setScanning] = useState(false);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DiscoveryResult | null>(null);

  const scan = useCallback(async () => {
    const providerId = scanTarget.trim();
    if (!providerId) return;
    setScanning(true);
    const ok = await callApi(
      () =>
        fetch("/api/discovery/scan", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ providerId }),
        }),
      t,
      "scanFailed",
      setFeedback
    );
    setScanning(false);
    if (ok) {
      setScanTarget("");
      setFeedback({ type: "success", message: t("scanQueued", { provider: providerId }) });
      await load();
    }
  }, [scanTarget, t, load, setFeedback]);

  const verify = useCallback(
    async (row: DiscoveryResult) => {
      setBusyId(row.id);
      const ok = await callApi(
        () => fetch(`/api/discovery/verify/${row.id}`, { method: "POST" }),
        t,
        "verifyFailed",
        setFeedback
      );
      setBusyId(null);
      if (ok) await load();
    },
    [t, load, setFeedback]
  );

  const remove = useCallback(async () => {
    if (!deleteTarget) return;
    setBusyId(deleteTarget.id);
    const ok = await callApi(
      () => fetch(`/api/discovery/results/${deleteTarget.id}`, { method: "DELETE" }),
      t,
      "deleteFailed",
      setFeedback
    );
    setBusyId(null);
    if (ok) {
      setDeleteTarget(null);
      await load();
    }
  }, [deleteTarget, t, load, setFeedback]);

  return {
    scanTarget,
    setScanTarget,
    scanning,
    busyId,
    deleteTarget,
    setDeleteTarget,
    scan,
    verify,
    remove,
  };
}

/** State + data orchestration for the discovery page, kept out of the view. */
function useDiscovery() {
  const t = useTranslations("discovery");
  const { results, loading, feedback, setFeedback, load } = useDiscoveryResults(t);
  const actions = useDiscoveryActions(t, load, setFeedback);
  const tc = useTranslations("common");
  return { t, tc, results, loading, feedback, setFeedback, ...actions };
}

function DiscoveryScanForm({
  t,
  value,
  onChange,
  onScan,
  scanning,
}: {
  t: Translate;
  value: string;
  onChange: (v: string) => void;
  onScan: () => void;
  scanning: boolean;
}) {
  return (
    <Card className="p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Input
            id="discovery-scan-target"
            label={t("scanLabel")}
            value={value}
            placeholder={t("scanPlaceholder")}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onScan();
            }}
          />
        </div>
        <Button onClick={onScan} disabled={scanning || !value.trim()}>
          {scanning ? t("scanning") : t("scan")}
        </Button>
      </div>
      <p className="mt-2 text-xs text-text-muted">{t("localOnlyNote")}</p>
    </Card>
  );
}

function DiscoveryResultRow({
  t,
  row,
  busy,
  onVerify,
  onDelete,
}: {
  t: Translate;
  row: DiscoveryResult;
  busy: boolean;
  onVerify: () => void;
  onDelete: () => void;
}) {
  return (
    <TableRow>
      <TableCell className="font-medium text-text-main">{row.providerId}</TableCell>
      <TableCell>
        <Badge variant={STATUS_VARIANT[row.status] ?? "default"}>{row.status}</Badge>
      </TableCell>
      <TableCell>
        <Badge variant={RISK_VARIANT[row.riskLevel] ?? "default"}>
          {t("risk")}: {row.riskLevel}
        </Badge>
      </TableCell>
      <TableCell className="text-xs text-text-muted">
        {t("method")}: {row.method} · {t("auth")}: {row.authType} · {t("feasibility")}:{" "}
        {row.feasibility}/5
      </TableCell>
      <TableCell className="max-w-[24rem] text-xs text-text-muted">
        {row.endpoint && <div className="break-all">{row.endpoint}</div>}
        {row.models && row.models.length > 0 && (
          <div>
            {t("models")}: {row.models.join(", ")}
          </div>
        )}
      </TableCell>
      <TableCell>
        <div className="flex justify-end gap-2">
          {row.status !== "verified" && (
            <Button variant="secondary" size="sm" onClick={onVerify} disabled={busy}>
              {t("verify")}
            </Button>
          )}
          <Button variant="danger" size="sm" onClick={onDelete} disabled={busy}>
            {t("delete")}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function DiscoveryPageClient() {
  const d = useDiscovery();

  return (
    <div className="space-y-6">
      <PageHeader compact title={d.t("title")} description={d.t("subtitle")} />

      <DiscoveryScanForm
        t={d.t}
        value={d.scanTarget}
        onChange={d.setScanTarget}
        onScan={() => void d.scan()}
        scanning={d.scanning}
      />

      {d.feedback && (
        <Alert
          role="status"
          variant={d.feedback.type === "error" ? "critical" : "success"}
          description={d.feedback.message}
          dismissLabel={d.tc("dismissNotification")}
          onDismiss={() => d.setFeedback(null)}
        />
      )}

      {d.loading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : d.results.length === 0 ? (
        <EmptyState title={d.t("emptyTitle")} description={d.t("emptyDescription")} />
      ) : (
        <Table className="text-sm" scrollbarLabel={d.t("title")}>
          <TableHeader>
            <TableRow>
              <TableHead>{d.t("provider")}</TableHead>
              <TableHead>{d.t("status")}</TableHead>
              <TableHead>{d.t("risk")}</TableHead>
              <TableHead>{d.t("method")}</TableHead>
              <TableHead>{d.t("endpoint")}</TableHead>
              <TableHead className="text-right">{d.t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {d.results.map((row) => (
              <DiscoveryResultRow
                key={row.id}
                t={d.t}
                row={row}
                busy={d.busyId === row.id}
                onVerify={() => void d.verify(row)}
                onDelete={() => d.setDeleteTarget(row)}
              />
            ))}
          </TableBody>
        </Table>
      )}

      <ConfirmModal
        isOpen={d.deleteTarget !== null}
        title={d.t("deleteTitle")}
        message={d.t("deleteConfirm", { provider: d.deleteTarget?.providerId ?? "" })}
        confirmText={d.t("delete")}
        onConfirm={() => void d.remove()}
        onClose={() => d.setDeleteTarget(null)}
      />
    </div>
  );
}
