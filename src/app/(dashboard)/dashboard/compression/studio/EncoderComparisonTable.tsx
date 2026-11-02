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
import type { EncoderComparison } from "./compressionFlowModel";

const fmt = (n: number) => n.toLocaleString("en-US");

export function EncoderComparisonTable({ comparison }: { comparison: EncoderComparison }) {
  const t = useTranslations("compressionStudio");
  if (!comparison || comparison.arraysCompared === 0) return null;
  const rows: Array<{
    key: "gcf" | "toon" | "json";
    label: string;
    size: { bytes: number; tokens: number } | null;
  }> = [
    { key: "gcf", label: "GCF", size: comparison.gcf },
    { key: "toon", label: "TOON", size: comparison.toonAvailable ? comparison.toon : null },
    { key: "json", label: "JSON", size: comparison.json },
  ].sort((a, b) => (a.size?.tokens ?? Infinity) - (b.size?.tokens ?? Infinity));

  return (
    <section data-testid="encoder-comparison" className="rounded border border-border p-2 text-xs">
      <header className="mb-1 font-semibold">
        {t("encoderComparison", { count: comparison.arraysCompared })}{" "}
        <span data-testid="encoder-winner" className="font-mono">
          {t("encoderWinner", { winner: comparison.winner })}
        </span>
      </header>
      <Table persistentScrollbars={false} className="min-w-0 font-mono text-xs">
        <TableHeader>
          <TableRow>
            <TableHead className="h-8">{t("encoder")}</TableHead>
            <TableHead className="h-8">{t("bytes")}</TableHead>
            <TableHead className="h-8">{t("tokensCl100k")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.key} className={r.key === comparison.winner ? "font-bold" : ""}>
              <TableCell className="h-8">
                {r.label}
                {r.key === comparison.winner ? " ✓" : ""}
              </TableCell>
              {r.size ? (
                <>
                  <TableCell className="h-8">{fmt(r.size.bytes)}</TableCell>
                  <TableCell className="h-8">{fmt(r.size.tokens)}</TableCell>
                </>
              ) : (
                <TableCell colSpan={2} className="h-8" data-testid="encoder-toon-na">
                  n/a
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
