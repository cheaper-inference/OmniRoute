"use client";

import { useState } from "react";
import { useConfirmDialog } from "@/shared/hooks/useConfirmDialog";
import { parseOptionalLimitInput, safeApiErrorMessage } from "../apiKeyDetailsData";
import type { KeyQuotaView } from "../apiKeyDetailsData";
import { sendJson } from "../useApiKeyDetails";

const toInput = (value: number | null) => (value === null ? "" : String(value));

/** State + save/clear handlers for {@link KeyQuotaEditor}, split out to keep the component small. */
export function useKeyQuotaEditor({
  keyId,
  quota,
  onSaved,
  saveFailedMessage,
  invalidAmountMessage,
}: {
  keyId: string;
  quota: KeyQuotaView;
  onSaved: () => Promise<void>;
  saveFailedMessage: string;
  invalidAmountMessage: string;
}) {
  const [tpm, setTpm] = useState(toInput(quota.tpmLimit));
  const [rpm, setRpm] = useState(toInput(quota.rpmLimit));
  const [monthly, setMonthly] = useState(toInput(quota.monthlyAmountUsd));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { requestConfirm, confirmDialog } = useConfirmDialog();

  const run = async (request: () => ReturnType<typeof sendJson>) => {
    setSaving(true);
    setError(null);
    const res = await request();
    if (res.ok) await onSaved();
    else setError(safeApiErrorMessage(res.body, saveFailedMessage));
    setSaving(false);
  };

  const save = () => {
    const tpmLimit = parseOptionalLimitInput(tpm);
    const rpmLimit = parseOptionalLimitInput(rpm);
    const monthlyAmountUsd = parseOptionalLimitInput(monthly);
    if (tpmLimit === undefined || rpmLimit === undefined || monthlyAmountUsd === undefined) {
      setError(invalidAmountMessage);
      return;
    }
    void run(() =>
      sendJson("/api/usage/key-quota", "POST", {
        apiKeyId: keyId,
        tpmLimit,
        rpmLimit,
        monthlyAmountUsd,
      })
    );
  };

  const clear = async (confirmMessage: string) => {
    if (!(await requestConfirm(confirmMessage))) return;
    void run(() =>
      sendJson(`/api/usage/key-quota?apiKeyId=${encodeURIComponent(keyId)}`, "DELETE")
    );
  };

  return {
    tpm,
    setTpm,
    rpm,
    setRpm,
    monthly,
    setMonthly,
    saving,
    error,
    save,
    clear,
    confirmDialog,
  };
}
