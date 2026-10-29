"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";
import { validateJsonl } from "@/lib/batches/validateJsonl";
import type { ValidationResult } from "@/lib/batches/types";
import type { SupportedBatchEndpoint } from "@/lib/batches/types";

interface JsonlValidationStepProps {
  jsonl: string;
  endpoint: SupportedBatchEndpoint;
  onResult: (result: ValidationResult) => void;
}

export default function JsonlValidationStep({
  jsonl,
  endpoint,
  onResult,
}: JsonlValidationStepProps) {
  const t = useTranslations("common");
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Deferred to a microtask: the compiler bars synchronous setState in an
    // effect body; validation still lands before the next paint batch.
    void (async () => {
      await Promise.resolve();
      setLoading(true);
      setResult(null);
      try {
        const r = validateJsonl(jsonl, { endpoint });
        setResult(r);
        onResult(r);
      } catch (err) {
        console.error("[JsonlValidationStep] validate error:", err);
        // Provide a minimal failed result on exception
        const errResult: ValidationResult = {
          ok: false,
          totalLines: 0,
          sampledLines: 0,
          uniqueCustomIds: 0,
          duplicateCustomIds: [],
          errors: [{ lineNumber: 0, reason: t("wizardValidationParseFailed") }],
          preview: [],
          byteSize: 0,
        };
        setResult(errResult);
        onResult(errResult);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jsonl, endpoint]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <Icon name="progress_activity" size={30} className="text-accent animate-spin" />
        <span className="text-sm text-text-muted">{t("wizardValidating")}</span>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="flex flex-col gap-5">
      {/* OK / Error banner — spec §5 "campos OK" appended on success (A-7) */}
      {result.ok ? (
        <div className="flex items-center gap-3 rounded-xl border border-success/25 bg-success/10 px-4 py-3">
          <Icon name="check_circle" className="text-success" />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-success">{t("wizardValidationOk")}</span>
            <span className="text-xs text-text-muted">
              {t("wizardValidationSummary", {
                lines: result.totalLines,
                ids: result.uniqueCustomIds,
              })}{" "}
              · {t("wizardValidationFieldsOk")}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-xl border border-error/25 bg-error/10 px-4 py-3">
          <Icon name="error" className="text-error" />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-error">{t("wizardValidationErrors")}</span>
            <span className="text-xs text-text-muted">
              {t("wizardValidationErrorCount", { count: result.errors.length })}
            </span>
          </div>
        </div>
      )}

      {/* Sampling note */}
      {result.sampledLines < result.totalLines && (
        <div className="rounded-lg border border-warning/25 bg-warning/10 px-3 py-2 text-xs text-warning">
          {t("wizardValidationSamplingNote")}
        </div>
      )}

      {/* Duplicate IDs */}
      {result.duplicateCustomIds.length > 0 && (
        <div className="rounded-lg border border-error/25 bg-error/10 px-3 py-2 flex flex-col gap-1">
          <span className="text-xs font-medium text-error">
            {t("wizardValidationDuplicateIds")}
          </span>
          {result.duplicateCustomIds.slice(0, 10).map((id) => (
            <span key={id} className="text-xs text-error font-mono">
              {id}
            </span>
          ))}
        </div>
      )}

      {/* Error table */}
      {result.errors.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-text-muted">
            {t("wizardValidationFirstErrors", {
              count: Math.min(result.errors.length, 50),
            })}
          </span>
          <div className="max-h-60 overflow-auto rounded-lg border border-border divide-y divide-border">
            {result.errors.slice(0, 50).map((err) => (
              <div key={`${err.lineNumber}-${err.reason}`} className="px-3 py-2 flex gap-3 text-xs">
                <span className="text-text-muted min-w-[60px]">
                  {t("wizardValidationLine", { line: err.lineNumber })}
                </span>
                <span className="text-error flex-1">{err.reason}</span>
                {err.field && <span className="text-text-muted font-mono">{err.field}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview */}
      {result.preview.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-text-muted">
            {t("wizardValidationPreview")}
          </span>
          <pre className="max-h-40 overflow-auto rounded-lg border border-border bg-bg-alt p-3 text-xs text-text-main whitespace-pre-wrap break-all">
            {JSON.stringify(result.preview, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
