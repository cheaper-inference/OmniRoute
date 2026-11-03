import { useState } from "react";

import { removeFailedComboSteps } from "./removeFailedComboModels";

type ComboRecordLike = { id: string; name: string; models?: unknown[] };

type Options = {
  /** The combo whose test results are open, if it is still loaded. */
  combo: ComboRecordLike | undefined;
  /** PUT the combo; resolves true when the server accepted it. */
  updateCombo: (id: string, data: ComboRecordLike) => Promise<boolean>;
  /** Called after a successful removal (closes the test results modal). */
  onRemoved: () => void;
  notify: { error: (message: string) => void; success: (message: string) => void };
  t: (key: string, values?: Record<string, string | number>) => string;
};

/** "Delete N failed model(s)" in the combo test results modal (#14944). */
export function useRemoveFailedComboModels({ combo, updateCombo, onRemoved, notify, t }: Options) {
  const [removing, setRemoving] = useState(false);

  const removeFailedModels = async (failedStepIds: string[]) => {
    if (!combo || failedStepIds.length === 0) return;
    const { models, removedCount } = removeFailedComboSteps(combo, failedStepIds);
    if (removedCount === 0) {
      notify.error(t("noErrorModelsFound"));
      return;
    }
    if (models.length === 0) {
      notify.error(t("cannotRemoveAllModels"));
      return;
    }
    if (!confirm(t("removeErrorModelsConfirm", { count: removedCount, name: combo.name }))) return;
    setRemoving(true);
    try {
      if (await updateCombo(combo.id, { ...combo, models })) {
        onRemoved();
        notify.success(t("errorModelsRemoved", { count: removedCount }));
      }
    } finally {
      setRemoving(false);
    }
  };

  return { removing, removeFailedModels };
}
