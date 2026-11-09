"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import Button from "@/shared/components/Button";

interface HeaderTableProps {
  headers: Record<string, string>;
}

export function HeaderTable({ headers }: HeaderTableProps) {
  const t = useTranslations("trafficInspector");
  const [masked, setMasked] = useState(true);
  const SENSITIVE = /authorization|cookie|x-api-key|bearer/i;

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs text-text-muted">{t("sensitiveHeaders")}</span>
        <Button
          variant="ghost"
          size="sm"
          icon={masked ? "visibility" : "visibility_off"}
          aria-pressed={!masked}
          onClick={() => setMasked((m) => !m)}
        >
          {masked ? t("show") : t("hide")}
        </Button>
      </div>
      <Table className="min-w-0 font-mono text-xs" scrollbarLabel={t("headersTable")}>
        <TableHeader>
          <TableRow>
            <TableHead>{t("name")}</TableHead>
            <TableHead>{t("value")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(headers).map(([name, value]) => {
            const isSensitive = SENSITIVE.test(name);
            const display = masked && isSensitive ? "••••••••" : value;
            return (
              <TableRow key={name}>
                <TableCell className="select-text text-text-muted">{name}</TableCell>
                <TableCell
                  className={`whitespace-normal break-all select-text ${isSensitive ? "text-warning" : "text-text-main"}`}
                >
                  {display}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
