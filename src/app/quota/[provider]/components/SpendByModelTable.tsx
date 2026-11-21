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

// The kit table keeps a 40rem minimum width and cells that never wrap. On a phone the four columns
// share the card instead: the model id breaks anywhere and the numbers stay on one line. From
// `sm` up the table keeps the kit's spacing.
const CELL = "max-sm:px-2";
// `wrap-anywhere` lets the column shrink and still prefers the id's own break points (hyphens).
const MODEL_CELL = `${CELL} whitespace-normal wrap-anywhere`;
const NUMBER_CELL = `${CELL} whitespace-nowrap text-right tabular-nums`;

interface SpendByModelTableProps {
  rows: SelfUsageResponse["byModel"];
  /** The answer's `byModelTruncated`: more pairs existed than the answer carries. */
  truncated: boolean;
}

/**
 * The period's usage per model (pairs of one model under several providers summed). When the
 * answer cut its list of pairs, one sentence says a model's totals may be partial.
 */
export default function SpendByModelTable({ rows, truncated }: SpendByModelTableProps) {
  const t = useTranslations("quotaSelf");
  const number = useFormatNumber();
  const models = mergeUsageByModel(rows);
  if (models.length === 0) return null;

  return (
    <div className="min-w-0 space-y-2">
      <h3 className="text-sm">{t("spendByModelTitle")}</h3>
      <Table
        scrollLabel={t("spendTableLabel")}
        aria-label={t("spendTableLabel")}
        maxHeight={320}
        containerClassName="border-0"
        className="min-w-0"
      >
        <TableHeader>
          <TableRow>
            <TableHead className={CELL}>{t("spendColModel")}</TableHead>
            <TableHead className={NUMBER_CELL}>{t("spendColRequests")}</TableHead>
            <TableHead className={NUMBER_CELL}>{t("spendColTokens")}</TableHead>
            <TableHead className={NUMBER_CELL}>{t("spendColListPrice")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {models.map((row) => (
            <TableRow key={row.model}>
              <TableCell className={MODEL_CELL}>{row.model}</TableCell>
              <TableCell className={NUMBER_CELL}>
                {number(row.requests, { maximumFractionDigits: 0 })}
              </TableCell>
              <TableCell className={NUMBER_CELL}>
                {number(row.totalTokens, { maximumFractionDigits: 0 })}
              </TableCell>
              <TableCell className={NUMBER_CELL}>
                {amountText("usd", row.listPriceUsd, t, number)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {truncated ? (
        <p className="min-w-0 break-words text-sm text-text-muted">{t("spendByModelTruncated")}</p>
      ) : null}
    </div>
  );
}
