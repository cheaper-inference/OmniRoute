"use client";

import Icon from "@/shared/components/Icon";

/**
 * ImportProgressModal — Issue #3501 Phase 1k
 *
 * Extracted from the inline Import Progress Modal JSX in ProviderDetailPageClient.
 * Pure presentational component driven entirely by props.
 *
 * Cycle-safe: no import from ProviderDetailPageClient.
 */

import { Progress } from "@omniroute/ui-kit/progress";
import { Button, Modal } from "@/shared/components";
import { DiscoveryDegradedNotice } from "@/shared/components/DiscoveryDegradedNotice";
import type { ImportProgress } from "../hooks/useModelImportHandlers";
import type { ProviderMessageTranslator } from "../providerPageHelpers";

interface ImportProgressModalProps {
  importProgress: ImportProgress;
  isOpen: boolean;
  onClose: () => void;
  t: ProviderMessageTranslator;
}

export default function ImportProgressModal({
  importProgress,
  isOpen,
  onClose,
  t,
}: ImportProgressModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("importingModelsTitle")}
      size="md"
      closeOnOverlay={false}
      showCloseButton={
        importProgress.phase === "done" ||
        importProgress.phase === "error" ||
        importProgress.phase === "warning"
      }
    >
      <div className="flex flex-col gap-4">
        {/* The fallback catalog notice comes first: it is the sign the operator
            reads before the status line, and it carries the reason. */}
        <DiscoveryDegradedNotice
          degraded={importProgress.degraded}
          cause={importProgress.degradedCause}
        />

        {/* Status text */}
        <div className="flex items-center gap-3">
          {importProgress.degraded ? (
            <Icon name="warning" className="text-warning" />
          ) : (
            <>
              {(importProgress.phase === "fetching" || importProgress.phase === "importing") && (
                <Icon name="progress_activity" className="animate-spin text-text-muted" />
              )}
              {importProgress.phase === "done" && (
                <Icon name="check_circle" className="text-success" />
              )}
              {importProgress.phase === "warning" && (
                <Icon name="warning" className="text-warning" />
              )}
              {importProgress.phase === "error" && <Icon name="error" className="text-error" />}
            </>
          )}
          <span className="text-sm font-medium text-text-main">{importProgress.status}</span>
        </div>

        {/* Progress bar */}
        {(importProgress.phase === "importing" || importProgress.phase === "done") &&
          importProgress.total > 0 && (
            <Progress
              value={importProgress.current}
              max={importProgress.total}
              label={`${importProgress.current} / ${importProgress.total}`}
              showValue
              animate={false}
              className={
                importProgress.phase === "done"
                  ? "[&_.ci-progress__indicator]:bg-none [&_.ci-progress__indicator]:bg-success"
                  : undefined
              }
            />
          )}

        {/* Fetching indeterminate bar */}
        {importProgress.phase === "fetching" && (
          // Decorative: the fetch has no measurable progress, so keep the bar out of the a11y
          // tree instead of announcing a fabricated value (the kit Progress has no indeterminate mode).
          <div aria-hidden="true" data-testid="import-fetching-bar">
            <Progress value={60} animate={false} className="animate-pulse" />
          </div>
        )}

        {/* Error message */}
        {importProgress.phase === "error" && importProgress.error && (
          <div className="p-3 rounded-lg bg-error/10 border border-error/20">
            <p className="text-sm text-error">{importProgress.error}</p>
          </div>
        )}

        {/* Log list */}
        {importProgress.logs.length > 0 && (
          <div className="max-h-48 overflow-y-auto rounded-lg bg-bg-subtle p-3 border border-border">
            <div className="flex flex-col gap-1">
              {importProgress.logs.map((log, i) => (
                <p
                  key={i}
                  className={`text-xs font-mono ${
                    typeof log === "string" && log.startsWith("✓")
                      ? "text-success font-semibold"
                      : "text-text-muted"
                  }`}
                >
                  {log}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Close button */}
        {(importProgress.phase === "done" || importProgress.phase === "warning") && (
          <div className="flex justify-center">
            <Button onClick={onClose}>{t("close")}</Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
