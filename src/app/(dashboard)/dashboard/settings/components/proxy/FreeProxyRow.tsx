"use client";

import { useTranslations } from "next-intl";
import { TableCell, TableRow } from "@omniroute/ui-kit/table";
import { Badge, Button, Checkbox } from "@/shared/components";

export interface FreeProxyRowData {
  id: string;
  source: string;
  host: string;
  port: number;
  type: string;
  countryCode: string | null;
  qualityScore: number | null;
  latencyMs: number | null;
  anonymity: string | null;
  inPool: boolean;
}

interface FreeProxyRowProps {
  proxy: FreeProxyRowData;
  selected: boolean;
  onToggleSelect: (id: string) => void;
  onAddToPool: (id: string) => void;
  adding: boolean;
}

export default function FreeProxyRow({
  proxy,
  selected,
  onToggleSelect,
  onAddToPool,
  adding,
}: FreeProxyRowProps) {
  const t = useTranslations("settings");
  const qualityColor =
    proxy.qualityScore == null
      ? "text-text-muted"
      : proxy.qualityScore >= 80
        ? "text-success"
        : proxy.qualityScore >= 50
          ? "text-warning"
          : "text-error";
  const endpoint = `${proxy.host}:${proxy.port}`;

  return (
    <TableRow>
      <TableCell className="w-8">
        <Checkbox
          checked={selected}
          onChange={() => onToggleSelect(proxy.id)}
          disabled={proxy.inPool}
          aria-label={t("proxyFreePoolSelectProxy", { endpoint })}
        />
      </TableCell>
      <TableCell className="text-text-muted text-xs">{proxy.source}</TableCell>
      <TableCell className="font-mono text-xs">{endpoint}</TableCell>
      <TableCell className="uppercase text-xs">{proxy.type}</TableCell>
      <TableCell className="text-xs">{proxy.countryCode || "—"}</TableCell>
      <TableCell className={`text-xs font-semibold ${qualityColor}`}>
        {proxy.qualityScore != null ? proxy.qualityScore : "—"}
      </TableCell>
      <TableCell className="text-xs">
        {proxy.latencyMs != null ? `${proxy.latencyMs}ms` : "—"}
      </TableCell>
      <TableCell>
        {proxy.inPool ? (
          <Badge variant="success" size="sm">
            {t("proxyFreePoolInPool")}
          </Badge>
        ) : (
          <Button
            variant="outline"
            size="icon-sm"
            icon="add"
            onClick={() => onAddToPool(proxy.id)}
            loading={adding}
            aria-label={t("proxyFreePoolAddProxy", { endpoint })}
            title={adding ? t("proxyFreePoolAdding") : undefined}
          />
        )}
      </TableCell>
    </TableRow>
  );
}
