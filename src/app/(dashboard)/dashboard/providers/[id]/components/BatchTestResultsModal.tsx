"use client";

import { Badge, Modal } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import { pickDisplayValue } from "@/shared/utils/maskEmail";

type BatchTestResultsModalProps = {
  batchTestResults: {
    error?: any;
    results?: Array<{
      connectionId?: string;
      connectionName?: string;
      valid?: boolean;
      latencyMs?: number;
      diagnosis?: { type?: string };
    }>;
    summary?: {
      passed: number;
      failed: number;
      total: number;
    };
  } | null;
  providerInfo: any;
  providerId: string;
  emailsVisible: boolean;
  onClose: () => void;
  t: any;
};

export default function BatchTestResultsModal({
  batchTestResults,
  providerInfo,
  providerId,
  emailsVisible,
  onClose,
  t,
}: BatchTestResultsModalProps) {
  if (!batchTestResults) return null;

  return (
    <Modal isOpen onClose={onClose} title={t("testResults")} maxWidth="600px">
      {batchTestResults.error &&
      (!batchTestResults.results || batchTestResults.results.length === 0) ? (
        <div className="text-center py-6">
          <Icon name="error" size={32} className="text-error mx-auto mb-2 block" />
          <p className="text-sm text-error">{String(batchTestResults.error)}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {batchTestResults.summary && (
            <div className="flex items-center gap-3 text-xs mb-1">
              <span className="text-text-muted">{providerInfo?.name || providerId}</span>
              <Badge variant="success" size="sm">
                {t("passedCount", { count: batchTestResults.summary.passed })}
              </Badge>
              {batchTestResults.summary.failed > 0 && (
                <Badge variant="error" size="sm">
                  {t("failedCount", { count: batchTestResults.summary.failed })}
                </Badge>
              )}
              <span className="text-text-muted ml-auto">
                {t("testedCount", { count: batchTestResults.summary.total })}
              </span>
            </div>
          )}
          {(batchTestResults.results || []).map((r: any, i: number) => (
            <div
              key={r.connectionId || i}
              className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-bg-subtle"
            >
              <Icon
                name={r.valid ? "check_circle" : "error"}
                size={16}
                className={r.valid ? "text-success" : "text-error"}
              />
              <div className="flex-1 min-w-0">
                <span className="font-medium">
                  {pickDisplayValue([r.connectionName], emailsVisible, r.connectionName)}
                </span>
              </div>
              {r.latencyMs !== undefined && (
                <span className="text-text-muted font-mono tabular-nums">
                  {t("millisecondsAbbr", { value: r.latencyMs })}
                </span>
              )}
              <Badge
                variant={r.valid ? "success" : "error"}
                size="sm"
                className="font-bold uppercase"
              >
                {r.valid ? t("okShort") : r.diagnosis?.type || t("errorShort")}
              </Badge>
            </div>
          ))}
          {(!batchTestResults.results || batchTestResults.results.length === 0) && (
            <div className="text-center py-4 text-text-muted text-sm">
              {t("noActiveConnectionsInGroup")}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
