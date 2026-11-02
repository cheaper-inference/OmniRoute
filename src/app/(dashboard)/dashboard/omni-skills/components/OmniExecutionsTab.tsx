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
import Button from "@/shared/components/Button";
import { Card } from "@/shared/components";

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
      <Table aria-label={t("executionsTab")} scrollbarLabel={t("executionsTab")}>
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
                <TableCell className="font-medium">{exec.skillName}</TableCell>
                <TableCell>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      exec.status === "success"
                        ? "bg-success/10 text-success"
                        : exec.status === "error"
                          ? "bg-error/10 text-error"
                          : "bg-warning/10 text-warning"
                    }`}
                  >
                    {exec.status}
                  </span>
                </TableCell>
                <TableCell className="text-text-muted">{exec.duration}ms</TableCell>
                <TableCell className="text-text-muted text-sm">
                  {new Date(exec.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <span className="text-sm text-text-muted">
          {t("pageInfo", { page: execPage, totalPages: execTotalPages, total: execTotal }) ||
            `Page ${execPage} of ${execTotalPages} (${execTotal} total)`}
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onPagePrev} disabled={execPage === 1}>
            {t("previous") || "Prev"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onPageNext}
            disabled={execPage === execTotalPages || execTotalPages === 0}
          >
            {t("next") || "Next"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default OmniExecutionsTab;
