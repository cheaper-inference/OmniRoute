"use client";

import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import { Spinner } from "@/shared/components/Loading";
import Modal from "@/shared/components/Modal";

export type UpdateStep = {
  step: string;
  status: string;
  message: string;
};

export type UpdatePhase = "idle" | "running" | "done" | "failed";

type UpdateProgressDialogProps = {
  phase: UpdatePhase;
  steps: UpdateStep[];
  /** Close (after a failure) or reload now (after success). */
  onDismiss: () => void;
  onRetry: () => void;
};

const STEP_ROW_TONES: Record<string, string> = {
  running: "border-primary/40 bg-primary/5",
  done: "border-success/30 bg-success/5",
  failed: "border-error/30 bg-error/5",
};

function StepStatusIcon({ status }: { status: string }) {
  if (status === "running") return <Spinner size="sm" />;
  if (status === "done") return <Icon name="check_circle" size={18} className="text-success" />;
  if (status === "failed") return <Icon name="error" size={18} className="text-error" />;
  return <Icon name="warning" size={18} className="text-warning" />;
}

function usePhaseCopy(phase: UpdatePhase) {
  const t = useTranslations("home");
  if (phase === "done") return { title: t("updateCompleteTitle"), notice: t("reloadNotice") };
  if (phase === "failed") return { title: t("updateFailedTitle"), notice: t("retryNotice") };
  return { title: t("updatingTitle"), notice: t("restartNotice") };
}

function UpdateStepRows({ steps }: { steps: UpdateStep[] }) {
  const t = useTranslations("home");
  const stepLabels: Record<string, string> = {
    install: t("stepInstallPackage"),
    rebuild: t("stepRebuildNativeModules"),
    restart: t("stepRestartService"),
    complete: t("stepComplete"),
    error: t("stepError"),
  };
  // "complete" and "error" are outcomes, drawn by UpdateOutcome.
  const rows = steps.filter((s) => s.step !== "complete" && s.step !== "error");
  return (
    <>
      {rows.map((s) => (
        <div
          key={s.step}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all ${
            STEP_ROW_TONES[s.status] ?? "border-border bg-bg-subtle"
          }`}
        >
          <StepStatusIcon status={s.status} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">{stepLabels[s.step] || s.step}</p>
            <p className="text-xs text-text-muted truncate">{s.message}</p>
          </div>
        </div>
      ))}
    </>
  );
}

function UpdateOutcome({ phase, steps }: { phase: UpdatePhase; steps: UpdateStep[] }) {
  const t = useTranslations("home");
  const error = steps.find((s) => s.step === "error");
  const complete = steps.find((s) => s.step === "complete");
  return (
    <>
      {error && (
        <div className="mt-1 px-3 py-2.5 rounded-lg border border-error/30 bg-error/5 text-error">
          <p className="text-xs font-mono break-all">{error.message}</p>
        </div>
      )}
      {phase === "done" && (
        <div className="mt-1 px-3 py-2.5 rounded-lg border border-success/30 bg-success/5">
          <p className="text-sm font-semibold text-success flex items-center gap-2">
            <Icon name="check_circle" size={18} />
            {complete?.message || t("updateComplete")}
          </p>
          <p className="text-xs text-text-muted mt-1">{t("reloadingPageAutomatically")}</p>
        </div>
      )}
    </>
  );
}

function UpdateActions({
  phase,
  onDismiss,
  onRetry,
}: Pick<UpdateProgressDialogProps, "phase" | "onDismiss" | "onRetry">) {
  const t = useTranslations("home");
  if (phase !== "failed" && phase !== "done") return null;
  return (
    <div className="flex gap-2 mt-4">
      <Button size="sm" fullWidth onClick={onDismiss}>
        {phase === "done" ? t("reloadNow") : t("closeUpdate")}
      </Button>
      {phase === "failed" && (
        <Button size="sm" variant="secondary" fullWidth onClick={onRetry}>
          {t("retryUpdate")}
        </Button>
      )}
    </div>
  );
}

// The home "update in progress" notice: a kit dialog (role, aria-modal, focus trap) through the
// `Modal` adapter. It has no close button and ignores outside clicks in every phase; Escape is
// a no-op while the update runs (and after success, when the page reloads by itself) and only
// closes a failed update, like the Close button does.
export default function UpdateProgressDialog({
  phase,
  steps,
  onDismiss,
  onRetry,
}: UpdateProgressDialogProps) {
  const { title, notice } = usePhaseCopy(phase);
  return (
    <Modal
      isOpen={phase !== "idle"}
      onClose={phase === "failed" ? onDismiss : () => {}}
      title={title}
      closeOnOverlay={false}
      showCloseButton={false}
      size="sm"
      maxWidth="28rem"
    >
      <div role="status" className="flex items-center gap-3 mb-5">
        <Spinner decorative size="md" className="text-primary" />
        <p className="text-xs text-text-muted">{notice}</p>
      </div>

      <div className="flex flex-col gap-2">
        <UpdateStepRows steps={steps} />
        <UpdateOutcome phase={phase} steps={steps} />
      </div>

      <UpdateActions phase={phase} onDismiss={onDismiss} onRetry={onRetry} />
    </Modal>
  );
}
