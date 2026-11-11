"use client";

/**
 * useModelImportHandlers — Issue #3501 Phase 1k
 *
 * Owns import-progress state and handlers that were previously inline in
 * ProviderDetailPageClient:
 *  - importingModels, showImportModal, importProgress, togglingAutoSync
 *  - handleImportModels, handleCompatibleImportWithProgress, handleToggleAutoSync
 *  - canImportModels (derived), isAutoSyncEnabled (derived)
 *
 * Every import of a connection's models runs through
 * `POST /api/providers/[id]/sync-models` (`runModelSync`), the writer the
 * scheduled sync uses; only a no-auth provider without a connection stores its
 * listing as imported custom rows from here.
 *
 * Cycle-safe: imports only from leaf modules and React.
 * No import from ProviderDetailPageClient.
 */

import React, { useState } from "react";
import { settleBoundedSyncRequests } from "@/lib/providerModels/immediateSyncBatch";
import { extractApiErrorMessage } from "@/shared/http/apiErrorMessage";
import { providerText, type ProviderMessageTranslator } from "../providerPageHelpers";
import {
  classifyModelImport,
  classifyModelSync,
  phaseOfModelSync,
  resolveNoNewModelsPhase,
} from "./modelImportWarning";

interface NotifyStore {
  success: (message: string, title?: string) => number;
  error: (message: string, title?: string) => number;
  warning: (message: string, title?: string) => number;
  info: (message: string, title?: string) => number;
}

// ──── types ──────────────────────────────────────────────────────────────────

export interface ImportProgress {
  current: number;
  total: number;
  phase: "idle" | "fetching" | "importing" | "done" | "warning" | "error";
  status: string;
  logs: string[];
  error: string;
  importedCount: number;
  /** The discovery fell back to the built-in catalog — the dialog says so. */
  degraded?: boolean;
  /** The reason of the fallback, when the server published one. */
  degradedCause?: string;
}

export interface UseModelImportHandlersParams {
  providerId: string;
  models: Array<{ id: string; name?: string }>;
  modelMeta: { customModels: Array<{ id: string }>; modelCompatOverrides?: unknown[] };
  modelAliases: Record<string, string>;
  connections: Array<{
    id?: string;
    isActive?: boolean;
    providerSpecificData?: Record<string, unknown>;
  }>;
  isFreeNoAuth: boolean;
  handleSetAlias: (modelId: string, alias: string, providerAlias: string) => Promise<void>;
  fetchAliases: () => Promise<void>;
  fetchProviderModelMeta: () => Promise<void>;
  fetchConnections: () => Promise<void>;
  notify: NotifyStore;
  t: ProviderMessageTranslator;
  providerStorageAlias: string;
}

export interface UseModelImportHandlersReturn {
  importingModels: boolean;
  showImportModal: boolean;
  importProgress: ImportProgress;
  togglingAutoSync: boolean;
  togglingAutoFetchModels: boolean;
  canImportModels: boolean;
  isAutoSyncEnabled: boolean;
  isAutoFetchModelsEnabled: boolean;
  setShowImportModal: (v: boolean) => void;
  setImportProgress: React.Dispatch<React.SetStateAction<ImportProgress>>;
  handleImportModels: () => Promise<void>;
  handleCompatibleImportWithProgress: (connectionId: string) => Promise<void>;
  handleToggleAutoSync: () => Promise<void>;
  handleToggleAutoFetchModels: () => Promise<void>;
}

/** Only successfully enabled connections need an immediate upstream discovery. */
function newlyEnabledAutoSyncIds(
  connections: UseModelImportHandlersParams["connections"],
  results: PromiseSettledResult<Response>[]
): string[] {
  return connections.flatMap((connection, index) => {
    const result = results[index];
    if (connection.providerSpecificData?.autoSync === true || !connection.id) return [];
    return result?.status === "fulfilled" && result.value.ok ? [connection.id] : [];
  });
}

// ──── hook ───────────────────────────────────────────────────────────────────

export function useModelImportHandlers({
  providerId,
  models,
  modelMeta,
  modelAliases,
  connections,
  isFreeNoAuth,
  handleSetAlias,
  fetchAliases,
  fetchProviderModelMeta,
  fetchConnections,
  notify,
  t,
  providerStorageAlias,
}: UseModelImportHandlersParams): UseModelImportHandlersReturn {
  const [importingModels, setImportingModels] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importProgress, setImportProgress] = useState<ImportProgress>({
    current: 0,
    total: 0,
    phase: "idle",
    status: "",
    logs: [],
    error: "",
    importedCount: 0,
  });
  const [togglingAutoSync, setTogglingAutoSync] = useState(false);
  const [togglingAutoFetchModels, setTogglingAutoFetchModels] = useState(false);

  // Derived
  const canImportModels = isFreeNoAuth || connections.some((conn) => conn.isActive !== false);
  const activeConnections = connections.filter((conn) => conn.isActive !== false);
  // Mixed-state semantics (design §6): the master toggle reads OFF if any active
  // connection has autoSync off; toggling from a mixed state turns all active ON.
  // No tri-state UI — the master toggle is a pure binary all-on switch.
  const isAutoSyncEnabled =
    activeConnections.length > 0 &&
    activeConnections.every((conn) => !!conn.providerSpecificData?.autoSync);
  // Discovery persists its response in the synced-model cache, so opt in on every
  // active connection before treating the provider-level control as enabled.
  const isAutoFetchModelsEnabled =
    activeConnections.length > 0 &&
    activeConnections.every((conn) => conn.providerSpecificData?.autoFetchModels === true);

  const handleImportModels = async () => {
    if (importingModels) return;
    const activeConnection = connections.find((conn) => conn.isActive !== false);
    if (!activeConnection && !isFreeNoAuth) return;
    if (activeConnection?.id) {
      // A connection's catalog is the scheduled sync's to keep: write it through
      // the same route, so the next sync does not undo the import.
      setImportingModels(true);
      try {
        await runModelSync(activeConnection.id, "import");
      } finally {
        setImportingModels(false);
      }
      return;
    }
    // A no-auth provider used without a connection has no synced catalog and no
    // scheduled sync: its listed models are stored as imported custom rows.
    const importTargetId = providerId;

    setImportingModels(true);
    setShowImportModal(true);
    setImportProgress({
      current: 0,
      total: 0,
      phase: "fetching",
      status: t("fetchingModels"),
      logs: [],
      error: "",
      importedCount: 0,
    });

    try {
      const res = await fetch(`/api/providers/${importTargetId}/models?refresh=true`);
      const data = await res.json();
      if (!res.ok) {
        setImportProgress((prev) => ({
          ...prev,
          phase: "error",
          status: t("failedFetchModels"),
          error: data.error || t("failedImportModels"),
        }));
        return;
      }
      const fetchedModels = data.models || [];
      // Discovery persists its result even when no new models need importing.
      // Refresh the active listing so removals take effect without a page reload.
      await fetchProviderModelMeta();
      const existingIds = new Set([
        ...(modelMeta.customModels || []).map((m: any) => m.id),
        ...models.map((m: any) => m.id),
      ]);
      const classification = classifyModelImport({
        modelsData: data,
        fetchedModels,
        isKnownModel: (id) => existingIds.has(id),
      });
      const importWarning = classification.warning;
      const degradedCause = classification.cause;
      const degraded = classification.degraded;
      // B-03 (#15159): when discovery fell back to a local/cache catalog the
      // headline must not read as an authoritative "nothing to import". The
      // banner at the top of the dialog now says so — with the reason — and the
      // server's own text moves down to the log, where the per-provider nuance
      // belongs. Only keys that already exist in all 66 locales are used; no new
      // translation is introduced.
      if (classification.outcome === "no-models") {
        setImportProgress((prev) => ({
          ...prev,
          phase: resolveNoNewModelsPhase(importWarning, degraded),
          status: t("noModelsFound"),
          degraded,
          ...(degradedCause ? { degradedCause } : {}),
          logs: [
            ...(degraded && importWarning ? [importWarning] : []),
            t("noModelsReturnedFromEndpoint"),
          ],
        }));
        return;
      }

      const newModels = classification.newModels;

      if (classification.outcome === "nothing-new") {
        // #15069: a degraded (local-catalog fallback) result is a terminal "warning", not a
        // success — the live provider API was never actually consulted.
        const noNewModelsPhase = resolveNoNewModelsPhase(importWarning, degraded);
        setImportProgress((prev) => ({
          ...prev,
          phase: noNewModelsPhase,
          status: t("allModelsAlreadyImported") || "All models already imported",
          degraded,
          ...(degradedCause ? { degradedCause } : {}),
          logs: [
            ...(importWarning ? [importWarning] : []),
            t("noNewModelsToImport") || "No new models to import",
          ],
          importedCount: 0,
          total: 0,
          current: 0,
        }));
        return;
      }

      setImportProgress((prev) => ({
        ...prev,
        phase: "importing",
        total: newModels.length,
        current: 0,
        status: t("importingModelsProgress", { current: 0, total: newModels.length }),
        degraded,
        ...(degradedCause ? { degradedCause } : {}),
        logs: [
          ...(importWarning ? [importWarning] : []),
          t("foundModelsStartingImport", { count: newModels.length }),
          ...(newModels.length < fetchedModels.length
            ? [
                t("skippingExistingModels", { count: fetchedModels.length - newModels.length }) ||
                  `Skipping ${fetchedModels.length - newModels.length} existing models`,
              ]
            : []),
        ],
      }));

      let importedCount = 0;
      const failures: string[] = [];
      for (let i = 0; i < newModels.length; i++) {
        const model = newModels[i];
        const rawId = model.id || model.name || model.model;
        // Same coercion classifyModelImport uses for the "already imported" check.
        const modelId = typeof rawId === "string" ? rawId : String(rawId ?? "");
        if (!modelId) continue;
        const parts = modelId.split("/");
        const baseAlias = parts[parts.length - 1];

        setImportProgress((prev) => ({
          ...prev,
          current: i + 1,
          status: t("importingModelsProgress", { current: i + 1, total: newModels.length }),
          logs: [...prev.logs, t("importingModelById", { modelId })],
        }));

        const createRes = await fetch("/api/provider-models", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: providerId,
            modelId,
            modelName: model.name || modelId,
            source: "imported",
            ...(typeof model.apiFormat === "string" ? { apiFormat: model.apiFormat } : {}),
            ...(Array.isArray(model.supportedEndpoints)
              ? { supportedEndpoints: model.supportedEndpoints }
              : {}),
            ...(typeof model.endpointCapabilitySource === "string"
              ? { endpointCapabilitySource: model.endpointCapabilitySource }
              : {}),
            ...(typeof model.dimensions === "number" && model.dimensions > 0
              ? { dimensions: model.dimensions }
              : {}),
            ...(Array.isArray(model.supportedInputTypes)
              ? { supportedInputTypes: model.supportedInputTypes }
              : {}),
            ...(typeof model.modelType === "string" ? { modelType: model.modelType } : {}),
            ...(typeof model.inputTokenLimit === "number" && model.inputTokenLimit > 0
              ? { max_input_tokens: model.inputTokenLimit }
              : {}),
            ...(typeof model.targetFormat === "string" ? { targetFormat: model.targetFormat } : {}),
          }),
        });
        // A rejected row was not stored: do not alias it or count it as imported,
        // otherwise the dialog reports success while nothing reached the catalog.
        if (!createRes.ok) {
          const reason = extractApiErrorMessage(
            await createRes.json().catch(() => null),
            `HTTP ${createRes.status}`
          );
          failures.push(reason);
          setImportProgress((prev) => ({
            ...prev,
            logs: [...prev.logs, `✗ ${modelId}: ${reason}`],
          }));
          continue;
        }
        if (!modelAliases[baseAlias]) {
          await handleSetAlias(modelId, baseAlias, providerStorageAlias);
        }
        importedCount += 1;
      }

      await fetchAliases();

      if (importedCount === 0 && failures.length > 0) {
        setImportProgress((prev) => ({
          ...prev,
          phase: "error",
          current: newModels.length,
          status: t("failedImportModels"),
          error: failures[0],
          importedCount: 0,
        }));
        return;
      }

      setImportProgress((prev) => ({
        ...prev,
        phase: "done",
        current: newModels.length,
        status:
          importedCount > 0
            ? t("importSuccessCount", { count: importedCount })
            : t("noNewModelsAddedExisting"),
        logs: [
          ...prev.logs,
          importedCount > 0
            ? t("importDoneCount", { count: importedCount })
            : t("noNewModelsAdded"),
          ...(failures.length > 0 ? [t("bulkFailedCount", { count: failures.length })] : []),
        ],
        importedCount,
      }));

      if (importedCount > 0 && (failures.length > 0 || degraded)) {
        // A reload would wipe the failure lines before they can be read, and it
        // would erase the degraded notice too: the list is refreshed in place.
        await fetchProviderModelMeta();
      } else if (importedCount > 0) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log("Error importing models:", error);
      setImportProgress((prev) => ({
        ...prev,
        phase: "error",
        status: t("importFailed"),
        error: error instanceof Error ? error.message : t("unexpectedErrorOccurred"),
      }));
    } finally {
      setImportingModels(false);
    }
  };

  /**
   * Import (`mode: "import"`) or re-sync a connection's models through
   * `POST /api/providers/[id]/sync-models` — the writer the scheduled sync uses,
   * so an import is never undone by the next sync and every import policy
   * (free-only, curated lists, degraded refusal, media-only rows) applies.
   */
  const runModelSync = async (connectionId: string, mode: "import" | "sync" = "import") => {
    setShowImportModal(true);
    setImportProgress({
      current: 0,
      total: 0,
      phase: "fetching",
      status: t("fetchingModels"),
      logs: [],
      error: "",
      importedCount: 0,
    });

    try {
      const syncUrl =
        mode === "sync"
          ? `/api/providers/${connectionId}/sync-models`
          : `/api/providers/${connectionId}/sync-models?mode=import`;
      const response = await fetch(syncUrl, {
        method: "POST",
        signal: AbortSignal.timeout(60_000),
      });
      const data = await response.json().catch(() => null);
      const outcome = classifyModelSync(response.ok, response.status, data);

      if (outcome.kind === "failed") {
        setImportProgress((prev) => ({
          ...prev,
          phase: phaseOfModelSync(outcome),
          status: t("importFailed"),
          error: outcome.error,
        }));
        return;
      }

      // B-03 (#15159) / #15069: discovery fell back to a stale catalog, which the
      // sync refuses to store. The dialog ends in "warning" with the reason — never
      // in a success — and the page does not reload under the operator.
      if (outcome.kind === "degraded") {
        setImportProgress((prev) => ({
          ...prev,
          phase: phaseOfModelSync(outcome),
          status: t("noNewModelsAdded"),
          degraded: true,
          ...(outcome.cause ? { degradedCause: outcome.cause } : {}),
          logs: outcome.warning ? [outcome.warning] : [],
        }));
        return;
      }

      await fetchProviderModelMeta();

      if (outcome.kind === "free-filter-empty") {
        await fetchAliases();
        setImportProgress((prev) => ({
          ...prev,
          phase: "done",
          status: t("noFreeModelsFound"),
          logs: [t("noFreeModelsFound")],
        }));
        return;
      }

      const added = outcome.addedModelIds;
      const removed = outcome.kind === "synced" ? outcome.removedModelIds : [];
      // A model the import adds keeps its bare-id alias, as the per-model import did.
      // Two added ids can share a last segment (`a/foo`, `b/foo`): the first one
      // keeps the alias, and the import never overwrites one it just set.
      const claimedAliases = new Set(Object.keys(modelAliases));
      for (const modelId of added) {
        const baseAlias = modelId.split("/").pop() || modelId;
        if (claimedAliases.has(baseAlias)) continue;
        claimedAliases.add(baseAlias);
        await handleSetAlias(modelId, baseAlias, providerStorageAlias);
      }
      await fetchAliases();

      const status =
        added.length > 0
          ? t("importSuccessCount", { count: added.length })
          : outcome.kind === "no-listing"
            ? t("providerPublishesNoModelList")
            : t("allModelsAlreadyImported");
      setImportProgress((prev) => ({
        ...prev,
        phase: "done",
        total: added.length,
        current: added.length,
        importedCount: added.length,
        status,
        logs: [
          ...(outcome.kind === "no-listing" && outcome.warning ? [outcome.warning] : []),
          ...added.map((modelId) => t("importingModelById", { modelId })),
          ...(removed.length > 0 ? [t("modelsNoLongerListed", { count: removed.length })] : []),
          ...removed.map((modelId) => `− ${modelId}`),
          added.length > 0 ? t("importDoneCount", { count: added.length }) : t("noNewModelsAdded"),
        ],
      }));

      if (added.length > 0 || removed.length > 0) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log("Error importing models:", error);
      setImportProgress((prev) => ({
        ...prev,
        phase: "error",
        status: t("importFailed"),
        error: error instanceof Error ? error.message : t("unexpectedErrorOccurred"),
      }));
    }
  };

  const handleCompatibleImportWithProgress = runModelSync;

  const handleToggleAutoSync = async () => {
    if (togglingAutoSync) return;
    if (activeConnections.length === 0) return;
    setTogglingAutoSync(true);
    try {
      const newValue = !isAutoSyncEnabled;
      const activeWithId = activeConnections.filter((conn) => conn.id);
      if (activeWithId.length === 0) return;
      const results = await Promise.allSettled(
        activeWithId.map((conn) =>
          fetch(`/api/providers/${conn.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              providerSpecificData: {
                ...(conn.providerSpecificData || {}),
                autoSync: newValue,
              },
            }),
          })
        )
      );
      // Only newly enabled connections need an immediate sync; existing
      // enabled accounts remain on their scheduler cadence.
      const syncIds = newValue ? newlyEnabledAutoSyncIds(activeWithId, results) : [];
      // A provider may have many accounts sharing one upstream/IP. Fan out
      // the setting writes as before, but cap *live* discovery calls at two
      // to avoid a burst that can trigger shared upstream rate limits.
      const syncResults = await settleBoundedSyncRequests(syncIds, async (id) => {
        const response = await fetch(`/api/providers/${id}/sync-models`, {
          method: "POST",
          signal: AbortSignal.timeout(60_000),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
      });
      await fetchConnections();
      if (syncIds.length > 0) await fetchProviderModelMeta();
      const syncFailed = syncResults.some((r) => r.status === "rejected");
      const fulfilled = results.filter((r) => r.status === "fulfilled" && r.value.ok).length;
      if (fulfilled === results.length && !syncFailed) {
        notify[newValue ? "success" : "info"](
          newValue ? t("autoSyncEnabled") : t("autoSyncDisabled")
        );
      } else if (fulfilled === 0) {
        notify.error(t("autoSyncToggleFailed"));
      } else {
        notify.warning(
          t(
            syncFailed && fulfilled === results.length
              ? "autoSyncImmediatePartialFailure"
              : "autoSyncPartialFailure"
          )
        );
      }
    } catch (error) {
      console.error("Error toggling auto-sync:", error);
      notify.error(t("autoSyncToggleFailed"));
    } finally {
      setTogglingAutoSync(false);
    }
  };

  const handleToggleAutoFetchModels = async () => {
    if (togglingAutoFetchModels) return;
    const activeWithId = activeConnections.filter((conn) => conn.id);
    if (activeWithId.length === 0) return;

    setTogglingAutoFetchModels(true);
    try {
      const newValue = !isAutoFetchModelsEnabled;
      const results = await Promise.allSettled(
        activeWithId.map((conn) =>
          fetch(`/api/providers/${conn.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              providerSpecificData: {
                ...(conn.providerSpecificData || {}),
                autoFetchModels: newValue,
              },
            }),
          })
        )
      );
      await fetchConnections();
      const fulfilled = results.filter((result) => {
        return result.status === "fulfilled" && result.value.ok;
      }).length;
      if (fulfilled === results.length) {
        notify[newValue ? "success" : "info"](
          newValue
            ? providerText(t, "autoFetchModelsEnabled", "Upstream model auto-fetch enabled")
            : providerText(t, "autoFetchModelsDisabled", "Upstream model auto-fetch disabled")
        );
      } else if (fulfilled === 0) {
        notify.error(
          providerText(
            t,
            "autoFetchModelsToggleFailed",
            "Failed to toggle upstream model auto-fetch"
          )
        );
      } else {
        notify.warning(
          providerText(
            t,
            "autoFetchModelsPartialFailure",
            "Some connections updated, but upstream model auto-fetch was not changed everywhere"
          )
        );
      }
    } catch (error) {
      console.error("Error toggling upstream model auto-fetch:", error);
      notify.error(
        providerText(t, "autoFetchModelsToggleFailed", "Failed to toggle upstream model auto-fetch")
      );
    } finally {
      setTogglingAutoFetchModels(false);
    }
  };

  return {
    importingModels,
    showImportModal,
    importProgress,
    togglingAutoSync,
    togglingAutoFetchModels,
    canImportModels,
    isAutoSyncEnabled,
    isAutoFetchModelsEnabled,
    setShowImportModal,
    setImportProgress,
    handleImportModels,
    handleCompatibleImportWithProgress,
    handleToggleAutoSync,
    handleToggleAutoFetchModels,
  };
}
