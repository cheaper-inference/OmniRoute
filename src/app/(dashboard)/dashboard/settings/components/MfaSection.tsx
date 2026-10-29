"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Badge, Card, Button, Input } from "@/shared/components";
import Icon from "@/shared/components/Icon";

interface MfaStatus {
  enabled: boolean;
  backupCodesRemaining: number;
  recoverySwitchSet: boolean;
}

interface Enrollment {
  secret: string;
  qrCodeDataUri: string;
}

type Mode = "idle" | "start" | "verify" | "codes" | "disable";

async function postJson(url: string, body: Record<string, string>) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}

async function fetchMfaStatus(): Promise<MfaStatus | null> {
  try {
    const res = await fetch("/api/auth/mfa/status");
    return res.ok ? ((await res.json()) as MfaStatus) : null;
  } catch {
    // The card stays in its loading state; the rest of the tab keeps working.
    return null;
  }
}

function errorMessage(data: unknown, fallback: string): string {
  const error = (data as { error?: unknown } | null)?.error;
  if (typeof error === "string") return error;
  if (error && typeof (error as { message?: unknown }).message === "string") {
    return (error as { message: string }).message;
  }
  return fallback;
}
type Translate = ReturnType<typeof useTranslations>;

function useMfaStatus() {
  const [status, setStatus] = useState<MfaStatus | null>(null);

  const loadStatus = () => {
    void fetchMfaStatus().then((next) => {
      if (next) setStatus(next);
    });
  };

  useEffect(() => {
    let active = true;
    void fetchMfaStatus().then((next) => {
      if (active && next) setStatus(next);
    });
    return () => {
      active = false;
    };
  }, []);

  return { status, loadStatus };
}

/** Form state and the setup → enable → disable calls; every call shares one busy/error path. */
function useMfaFlow(t: Translate, loadStatus: () => void) {
  const [mode, setMode] = useState<Mode>("idle");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const reset = (next: Mode = "idle") => {
    setMode(next);
    setPassword("");
    setCode("");
    setError("");
    if (next === "idle") setEnrollment(null);
  };

  const submit = async (
    url: string,
    body: Record<string, string>,
    onOk: (data: Record<string, unknown>) => void
  ) => {
    setBusy(true);
    setError("");
    const { ok, data } = await postJson(url, body);
    setBusy(false);
    if (!ok) {
      setError(errorMessage(data, t("errorOccurred")));
      return;
    }
    onOk(data);
  };

  const startEnrollment = () =>
    submit("/api/auth/mfa/setup", { password }, (data) => {
      setEnrollment({
        secret: data.secret as string,
        qrCodeDataUri: data.qrCodeDataUri as string,
      });
      setCode("");
      setMode("verify");
    });

  const confirmEnrollment = async () => {
    if (!enrollment) return;
    await submit("/api/auth/mfa/enable", { password, secret: enrollment.secret, code }, (data) => {
      setBackupCodes(Array.isArray(data.backupCodes) ? (data.backupCodes as string[]) : []);
      setEnrollment(null);
      setPassword("");
      setCode("");
      setMode("codes");
      loadStatus();
    });
  };

  const disable = () =>
    submit("/api/auth/mfa/disable", { password, code }, () => {
      reset();
      loadStatus();
    });

  const dismissBackupCodes = () => {
    setBackupCodes([]);
    reset();
  };

  return {
    ...{ mode, password, setPassword, code, setCode, enrollment, backupCodes, error, busy },
    ...{ reset, startEnrollment, confirmEnrollment, disable, dismissBackupCodes },
  };
}

type MfaFlow = ReturnType<typeof useMfaFlow>;

async function copyToClipboard(lines: string[]) {
  try {
    await navigator.clipboard.writeText(lines.join("\n"));
  } catch {
    // Clipboard can be unavailable (http, permissions): the codes stay on screen.
  }
}

function FormActions({ flow, children }: { flow: MfaFlow; children: React.ReactNode }) {
  const tc = useTranslations("common");
  return (
    <div className="flex justify-end gap-2">
      <Button variant="ghost" onClick={() => flow.reset()} disabled={flow.busy}>
        {tc("cancel")}
      </Button>
      {children}
    </div>
  );
}

function PasswordInput({
  flow,
  t,
  autoFocus,
}: {
  flow: MfaFlow;
  t: Translate;
  autoFocus?: boolean;
}) {
  return (
    <Input
      label={t("currentPassword")}
      type="password"
      placeholder={t("enterCurrentPassword")}
      value={flow.password}
      onChange={(e) => flow.setPassword(e.target.value)}
      autoFocus={autoFocus}
      disabled={flow.busy}
    />
  );
}

function BackupCodesPanel({ flow, t }: { flow: MfaFlow; t: Translate }) {
  const tc = useTranslations("common");
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-warning-bg p-4">
      <p className="font-medium">{t("mfaBackupCodesTitle")}</p>
      <p className="text-sm text-text-muted">{t("mfaBackupCodesDesc")}</p>
      <div className="grid grid-cols-2 gap-2 font-mono text-sm">
        {flow.backupCodes.map((backupCode) => (
          <code key={backupCode} className="px-2 py-1 rounded bg-surface">
            {backupCode}
          </code>
        ))}
      </div>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          icon="content_copy"
          onClick={() => void copyToClipboard(flow.backupCodes)}
        >
          {tc("copy")}
        </Button>
        <Button variant="primary" size="sm" onClick={flow.dismissBackupCodes}>
          {tc("done")}
        </Button>
      </div>
    </div>
  );
}

function IdlePanel({ flow, t, status }: { flow: MfaFlow; t: Translate; status: MfaStatus }) {
  const enabled = status.enabled === true;
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-text-muted">
        {enabled
          ? t("mfaBackupCodesRemaining", { count: status.backupCodesRemaining })
          : t("mfaRecoveryHint")}
      </p>
      <Button
        variant={enabled ? "secondary" : "primary"}
        size="sm"
        onClick={() => flow.reset(enabled ? "disable" : "start")}
      >
        {enabled ? t("disable") : t("enable")}
      </Button>
    </div>
  );
}

function StartPanel({ flow, t }: { flow: MfaFlow; t: Translate }) {
  const tc = useTranslations("common");
  return (
    <div className="flex flex-col gap-3">
      <PasswordInput flow={flow} t={t} autoFocus />
      <FormActions flow={flow}>
        <Button
          variant="primary"
          onClick={flow.startEnrollment}
          loading={flow.busy}
          disabled={!flow.password}
        >
          {tc("continue")}
        </Button>
      </FormActions>
    </div>
  );
}

function VerifyPanel({
  flow,
  t,
  enrollment,
}: {
  flow: MfaFlow;
  t: Translate;
  enrollment: Enrollment;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-text-muted">{t("mfaScanQr")}</p>
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {/* eslint-disable-next-line @next/next/no-img-element -- server-rendered PNG data URI; next/image adds nothing for an inline QR */}
        <img
          src={enrollment.qrCodeDataUri}
          alt={t("mfaTitle")}
          width={180}
          height={180}
          className="rounded-lg bg-white p-2"
        />
        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-xs font-medium text-text-muted">{t("mfaManualKey")}</p>
          <code className="font-mono text-sm break-all select-all">{enrollment.secret}</code>
        </div>
      </div>
      <Input
        label={t("mfaCodeLabel")}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        placeholder="123456"
        value={flow.code}
        onChange={(e) => flow.setCode(e.target.value)}
        autoFocus
        disabled={flow.busy}
      />
      <FormActions flow={flow}>
        <Button
          variant="primary"
          onClick={flow.confirmEnrollment}
          loading={flow.busy}
          disabled={!flow.code}
        >
          {t("enable")}
        </Button>
      </FormActions>
    </div>
  );
}

function DisablePanel({ flow, t }: { flow: MfaFlow; t: Translate }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-text-muted">{t("mfaDisableDesc")}</p>
      <PasswordInput flow={flow} t={t} autoFocus />
      <Input
        label={t("mfaCodeLabel")}
        type="text"
        autoComplete="one-time-code"
        placeholder="123456"
        value={flow.code}
        onChange={(e) => flow.setCode(e.target.value)}
        disabled={flow.busy}
      />
      <FormActions flow={flow}>
        <Button
          variant="danger"
          onClick={flow.disable}
          loading={flow.busy}
          disabled={!flow.password || !flow.code}
        >
          {t("disable")}
        </Button>
      </FormActions>
    </div>
  );
}

/**
 * Settings → Security: opt-in TOTP two-factor login for the dashboard (and `omniroute
 * connect`). Enrollment is two-step — the secret is only stored once a code from the
 * authenticator verifies — and the recovery codes are shown exactly once.
 */
export default function MfaSection() {
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const { status, loadStatus } = useMfaStatus();
  const flow = useMfaFlow(t, loadStatus);
  const enabled = status?.enabled === true;

  return (
    <Card
      title={t("mfaTitle")}
      subtitle={t("mfaDesc")}
      icon="lock"
      action={
        status ? (
          <Badge variant={enabled ? "success" : "default"} size="sm">
            {enabled ? tc("enabled") : tc("disabled")}
          </Badge>
        ) : null
      }
    >
      <div className="flex flex-col gap-4">
        {status?.recoverySwitchSet && (
          <p className="text-xs text-warning flex items-center gap-1">
            <Icon name="warning" size={14} />
            {t("mfaRecoverySwitchActive")}
          </p>
        )}
        {flow.mode === "codes" && <BackupCodesPanel flow={flow} t={t} />}
        {flow.mode === "idle" && status && <IdlePanel flow={flow} t={t} status={status} />}
        {flow.mode === "start" && <StartPanel flow={flow} t={t} />}
        {flow.mode === "verify" && flow.enrollment && (
          <VerifyPanel flow={flow} t={t} enrollment={flow.enrollment} />
        )}
        {flow.mode === "disable" && <DisablePanel flow={flow} t={t} />}
        {flow.error && <p className="text-sm text-error">{flow.error}</p>}
      </div>
    </Card>
  );
}
