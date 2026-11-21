"use client";

import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";

import type { SelfUsageResponse } from "@/shared/schemas/selfUsage";

import { amountText } from "../lib/quotaText";
import { mergeUsageByModel } from "../lib/usageRows";
import { useFormatNumber } from "../lib/useFormatNumber";

interface SpendByModelTableProps {
  rows: SelfUsageResponse["byModel"];
}

/** The period's usage per model (pairs of one model under several providers summed). */
export default function SpendByModelTable({ rows }: SpendByModelTableProps) {
  const t = useTranslations("quotaSelf");
  const number = useFormatNumber();
  const models = mergeUsageByModel(rows);
  if (models.length === 0) return null;

  return (
    <div className="min-w-0 space-y-2">
      <h3 className="text-sm font-semibold">{t("spendByModelTitle")}</h3>
      <Table
        scrollLabel={t("spendTableLabel")}
        aria-label={t("spendTableLabel")}
        maxHeight={320}
        containerClassName="border-0"
      >
        <TableHeader>
          <TableRow>
            <TableHead>{t("spendColModel")}</TableHead>
            <TableHead>{t("spendColRequests")}</TableHead>
            <TableHead>{t("spendColTokens")}</TableHead>
            <TableHead>{t("spendColListPrice")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {models.map((row) => (
            <TableRow key={row.model}>
              <TableCell className="min-w-0 break-words">{row.model}</TableCell>
              <TableCell>{number(row.requests, { maximumFractionDigits: 0 })}</TableCell>
              <TableCell>{number(row.totalTokens, { maximumFractionDigits: 0 })}</TableCell>
              <TableCell>{amountText("usd", row.listPriceUsd, t, number)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
