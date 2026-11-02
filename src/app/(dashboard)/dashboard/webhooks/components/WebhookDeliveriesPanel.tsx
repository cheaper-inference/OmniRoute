"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import { DeliveryStatusBadge } from "./shared/DeliveryStatusBadge";

interface Delivery {
  id: number;
  event_type: string;
  status: string;
  http_status: number | null;
  latency_ms: number | null;
  error: string | null;
  created_at: string;
}

interface WebhookDeliveriesPanelProps {
  webhookId: string;
  t: (key: string) => string;
}

export function WebhookDeliveriesPanel({ webhookId, t }: WebhookDeliveriesPanelProps) {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/webhooks/${webhookId}/deliveries?limit=5`);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || t("deliveries.loadFailed"));
      setDeliveries(Array.isArray(data.deliveries) ? data.deliveries : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("deliveries.loadFailed"));
    } finally {
      setLoading(false);
    }
  }, [webhookId, t]);

  useEffect(() => {
    void (async () => {
      await load();
    })();
  }, [load]);

  if (loading) {
    return <p className="py-4 text-center text-xs text-text-muted">{t("loading")}</p>;
  }

  if (error) {
    return <p className="py-4 text-center text-xs text-error">{error}</p>;
  }

  if (deliveries.length === 0) {
    return <p className="py-4 text-center text-xs text-text-muted">{t("deliveries.empty")}</p>;
  }

  return (
    <Table className="text-left text-xs" scrollbarLabel={t("deliveries.title")}>
      <TableHeader>
        <TableRow>
          <TableHead>{t("deliveries.status")}</TableHead>
          <TableHead>{t("deliveries.event")}</TableHead>
          <TableHead>{t("deliveries.latency")}</TableHead>
          <TableHead>{t("deliveries.at")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {deliveries.map((d) => (
          <TableRow key={d.id}>
            <TableCell>
              <DeliveryStatusBadge status={d.status} httpStatus={d.http_status} />
            </TableCell>
            <TableCell className="font-mono text-text-main">{d.event_type}</TableCell>
            <TableCell className="text-text-muted">
              {d.latency_ms != null ? `${d.latency_ms}ms` : "—"}
            </TableCell>
            <TableCell className="text-text-muted">
              {new Date(d.created_at).toLocaleString()}
              {d.error && (
                <p className="mt-0.5 truncate text-error" title={d.error}>
                  {d.error}
                </p>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
