import { useState } from "react";

import { removeFailedComboSteps } from "./removeFailedComboModels";

type ComboRecordLike = {
  id: string;
  name: string;
  models?: unknown[];
  routes?: Record<string, { models?: unknown[]; strategy?: unknown; config?: unknown }>;
};

type Options = {
  /** The combo whose test results are open, if it is still loaded. */
  combo: ComboRecordLike | undefined;
  /** PUT the combo; resolves true when the server accepted it. */
  updateCombo: (id: string, data: ComboRecordLike) => Promise<boolean>;
  /** Called after a successful removal (closes the test results modal). */
  onRemoved: () => void;
  notify: { error: (message: string) => void; success: (message: string) => void };
  /** Kit confirmation dialog (`useConfirmDialog().requestConfirm`); resolves true on confirm. */
  requestConfirm: (message: string) => Promise<boolean>;
  t: (key: string, values?: Record<string, string | number>) => string;
};

/** "Delete N failed model(s)" in the combo test results modal (#14944). */
export function useRemoveFailedComboModels({
  combo,
  updateCombo,
  onRemoved,
  notify,
  requestConfirm,
  t,
}: Options) {
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
    const message = t("removeErrorModelsConfirm", { count: removedCount, name: combo.name });
    if (!(await requestConfirm(message))) return;
    setRemoving(true);
    try {
      const routes = combo.routes?.chat
        ? {
            ...combo.routes,
            chat: {
              ...combo.routes.chat,
              models,
            },
          }
        : combo.routes;
      if (await updateCombo(combo.id, { ...combo, models, ...(routes ? { routes } : {}) })) {
        onRemoved();
        notify.success(t("errorModelsRemoved", { count: removedCount }));
      }
    } finally {
      setRemoving(false);
    }
  };

  return { removing, removeFailedModels };
}
