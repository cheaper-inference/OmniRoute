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
import Pager from "@/shared/components/Pager";
import { Card } from "@/shared/components";
import type { JSX } from "react";
import Badge from "@/shared/components/Badge";

interface Execution {
  id: string;
  skillId: string;
  skillName: string;
  status: string;
  duration: number;
  createdAt: string;
}

interface OmniExecutionsTabProps {
  executions: Execution[];
  execPage: number;
  execTotalPages: number;
  execTotal: number;
  onPagePrev: () => void;
  onPageNext: () => void;
}

export function OmniExecutionsTab({
  executions,
  execPage,
  execTotalPages,
  execTotal,
  onPagePrev,
  onPageNext,
}: OmniExecutionsTabProps): JSX.Element {
  const t = useTranslations("skills");

  return (
    <Card>
      <Table variant="plain" aria-label={t("executionsTab")} scrollbarLabel={t("executionsTab")}>
        <TableHeader>
          <TableRow>
            <TableHead>{t("skill")}</TableHead>
            <TableHead>{t("status")}</TableHead>
            <TableHead>{t("duration")}</TableHead>
            <TableHead>{t("time")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {executions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="py-8 text-center text-text-muted">
                {t("noExecutions")}
              </TableCell>
            </TableRow>
          ) : (
            executions.map((exec) => (
              <TableRow key={exec.id}>
                <TableCell>{exec.skillName}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      exec.status === "success"
                        ? "success"
                        : exec.status === "error"
                          ? "error"
                          : "warning"
                    }
                    size="sm"
                  >
                    {exec.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-text-muted">{exec.duration}ms</TableCell>
                <TableCell className="text-text-muted">
                  {new Date(exec.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="flex justify-end mt-4 pt-4 border-t border-border">
        <Pager
          variant="summary"
          page={execPage}
          pageCount={Math.max(1, execTotalPages)}
          onPageChange={(next) => (next < execPage ? onPagePrev() : onPageNext())}
          labels={{
            previous: t("previous"),
            next: t("next"),
            summary: () =>
              t("pageInfo", { page: execPage, totalPages: execTotalPages, total: execTotal }),
          }}
        />
      </div>
    </Card>
  );
}

export default OmniExecutionsTab;
