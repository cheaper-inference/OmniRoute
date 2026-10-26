"use client";

import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import Icon from "./Icon";
import Modal from "./Modal";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Input from "./Input";
import { cn } from "@/shared/utils/cn";
import {
  buildPassthroughAliasModels,
  buildNodeAliasModels,
  shouldConfirmSelectAll,
  parseHiddenModelsByProvider,
  isProviderModelHidden,
  buildProviderTestTargets,
  toggleProviderSelection,
  chunkItems,
  isProviderTestEntryWorking,
  formatProviderTestResults,
  collectWorkingModelsToSelect,
  hasWorkingTestResults,
  listVisibleProviderIds,
} from "./modelSelectModalHelpers";
import { getModelsByProviderId, PROVIDER_ID_TO_ALIAS } from "@/shared/constants/models";
import { getCompatibleFallbackModels } from "@/lib/providers/managedAvailableModels";
import {
  getModelCatalogSourceLabel,
  matchesModelCatalogQuery,
  normalizeModelCatalogSource,
} from "@/shared/utils/modelCatalogSearch";
import {
  OAUTH_PROVIDERS,
  NOAUTH_PROVIDERS,
  APIKEY_PROVIDERS,
  isOpenAICompatibleProvider,
  isAnthropicCompatibleProvider,
} from "@/shared/constants/providers";
import { hasEligibleConnectionForModel } from "@/domain/connectionModelRules";
import { useNotificationStore } from "@/store/notificationStore";

// Model/combo chips: compact pill on the kit outline Button (toggle via aria-pressed).
const CHIP_CLASS = "h-auto min-h-0 rounded-xl px-2 py-1 text-xs font-medium";

// Provider order: OAuth first, then no-auth, then API Key (matches dashboard/providers)
const PROVIDER_ORDER = [
  ...Object.keys(OAUTH_PROVIDERS),
  ...Object.keys(NOAUTH_PROVIDERS),
  ...Object.keys(APIKEY_PROVIDERS),
];

type ModelSelectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (model: unknown) => void;
  /**
   * Optional toggle callback — when set, clicking a model already in
   * `addedModelValues` invokes this instead of `onSelect`, so the modal acts
   * as an in-place add/remove toggle. Ported from upstream PR
   * decolua/9router#889 (Fajar Hidayat).
   */
  onDeselect?: (model: unknown) => void;
  /**
   * Batch add for "Select all" — callers that keep the modal open (combo
   * builder) must use this instead of looping `onSelect`, because each
   * single-add handler closes over the same models snapshot.
   */
  onSelectMany?: (models: unknown[]) => void;
  /**
   * Batch remove for "Unselect all" — same stale-state reason as onSelectMany.
   */
  onDeselectMany?: (models: unknown[]) => void;
  selectedModel?: string;
  selectedModels?: string[];
  activeProviders?: Array<{
    provider: string;
    id?: string | number;
    // Present on real connection objects (see fetchConnections() callers);
    // consumed by hasEligibleConnectionForModel() for the "configured only"
    // filter toggle below (#8219 dashboard-typecheck fix — the prop type was
    // too narrow for the field the new filter actually reads).
    providerSpecificData?: unknown;
  }>;
  title?: string;
  modelAliases?: Record<string, string>;
  addedModelValues?: string[];
  multiSelect?: boolean;
  showCombos?: boolean;
  alwaysIncludeProviders?: string[] | null;
  /**
   * When true, picking a model does NOT auto-close the modal — the caller must close
   * explicitly. A "Done" button is rendered in the modal footer so the user has a clear
   * way to confirm they are finished adding entries. Useful in combo creation, where the
   * user typically adds several models in a row. Mutually exclusive with `multiSelect`
   * (which renders its own Clear + Done footer driven by `selectedModels`).
   * Inspired by upstream PR decolua/9router#1031. Combined with `onDeselect`, this also
   * enables the toggle-style deselection from upstream PR decolua/9router#889.
   */
  keepOpenOnSelect?: boolean;
};

export default function ModelSelectModal({
  isOpen,
  onClose,
  onSelect,
  onDeselect,
  onSelectMany,
  onDeselectMany,
  selectedModel,
  selectedModels = [],
  activeProviders = [],
  title,
  modelAliases = {},
  addedModelValues = [],
  multiSelect = false,
  showCombos = true,
  alwaysIncludeProviders = [],
  keepOpenOnSelect = false,
}: ModelSelectModalProps) {
  const t = useTranslations("common");
  const notify = useNotificationStore();
  const resolvedTitle = title ?? t("selectModel");
  const labelOrFallback = (key: string, fallback: string, values?: Record<string, unknown>) =>
    typeof (t as { has?: (k: string) => boolean }).has === "function" &&
    (t as { has: (k: string) => boolean }).has(key)
      ? (t as unknown as (k: string, v?: Record<string, unknown>) => string)(key, values)
      : fallback;
  const [searchQuery, setSearchQuery] = useState("");
  const [combos, setCombos] = useState<any[]>([]);
  const [providerNodes, setProviderNodes] = useState<any[]>([]);
  const [customModels, setCustomModels] = useState<Record<string, any>>({});
  // #9203: unified hidden-model map (customModels.isHidden +
  // modelCompatOverrides.isHidden) from `/api/provider-models`, normalized so
  // the picker hides every model source the operator flagged — not just custom
  // rows that carry their own `isHidden` flag.
  const [hiddenModelsByProvider, setHiddenModelsByProvider] = useState<Map<string, Set<string>>>(
    new Map()
  );
  // Models discovered live from a custom provider's upstream `/models` endpoint,
  // keyed by provider id. Merged into the alias/custom/fallback list below and
  // tagged with the `auto` source badge. Ported from upstream PR
  // decolua/9router#2018 (Hamsa_M).
  const [showConfiguredOnly, setShowConfiguredOnly] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("modelSelectShowConfiguredOnly") === "true";
  });

  useEffect(() => {
    localStorage.setItem("modelSelectShowConfiguredOnly", String(showConfiguredOnly));
  }, [showConfiguredOnly]);
  const [fetchedModels, setFetchedModels] = useState<Record<string, any[]>>({});
  // Provider-level selection for "Test Selected Providers" (combo builder only).
  const [selectedProviderIds, setSelectedProviderIds] = useState<Set<string>>(() => new Set());
  const [testingProviders, setTestingProviders] = useState(false);
  const [testProgress, setTestProgress] = useState<{ done: number; total: number } | null>(null);
  const [modelTestStatus, setModelTestStatus] = useState<Record<string, "ok" | "error">>({});

  useEffect(() => {
    if (!isOpen) return;
    const fetchCombos = async () => {
      try {
        const res = await fetch("/api/combos");
        if (!res.ok) throw new Error(`Failed to fetch combos: ${res.status}`);
        const data = await res.json();
        setCombos(data.combos || []);
      } catch (error) {
        console.error("Error fetching combos:", error);
        setCombos([]);
      }
    };
    fetchCombos();
  }, [isOpen]);

  // Reset provider-test bookkeeping whenever the modal closes so the next
  // open starts from a clean selection / progress state (render-time
  // adjustment per react.dev "You Might Not Need an Effect").
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setSelectedProviderIds(new Set());
      setTestingProviders(false);
      setTestProgress(null);
      setModelTestStatus({});
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    const fetchProviderNodes = async () => {
      try {
        const res = await fetch("/api/provider-nodes");
        if (!res.ok) throw new Error(`Failed to fetch provider nodes: ${res.status}`);
        const data = await res.json();
        setProviderNodes(data.nodes || []);
      } catch (error) {
        console.error("Error fetching provider nodes:", error);
        setProviderNodes([]);
      }
    };
    fetchProviderNodes();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const fetchCustomModels = async () => {
      try {
        const res = await fetch("/api/provider-models");
        if (!res.ok) throw new Error(`Failed to fetch custom models: ${res.status}`);
        const data = await res.json();
        setCustomModels(data.models || {});
        // #9203: keep the unified hidden-model map in sync with the model list.
        setHiddenModelsByProvider(parseHiddenModelsByProvider(data.hiddenModelsByProvider));
      } catch (error) {
        console.error("Error fetching custom models:", error);
        setCustomModels({});
      }
    };
    fetchCustomModels();
  }, [isOpen]);

  // Fetch the live model catalog for one custom provider from its connection's
  // upstream `/models` endpoint. Returns the model array, or null on any failure.
  const fetchProviderModels = async (providerId: string): Promise<any[] | null> => {
    try {
      // Find the connection id for this provider — the route is keyed by connection.
      const connection = activeProviders.find((p) => p.provider === providerId);
      if (!connection?.id) return null;

      // #9203: ask the live route to drop hidden models server-side too, so the
      // operator's visibility settings apply before the rows reach the picker,
      // while chatOnly excludes media and retired models from this chat surface.
      const res = await fetch(
        `/api/providers/${connection.id}/models?excludeHidden=true&chatOnly=true`
      );
      if (!res.ok) {
        console.warn(`Failed to fetch models for ${providerId}: ${res.status}`);
        return null;
      }
      const data = await res.json();
      return data.models || [];
    } catch (error) {
      console.error(`Error fetching models for ${providerId}:`, error);
      return null;
    }
  };

  // When the modal opens, dynamically load models for every connected custom
  // (openai-/anthropic-compatible) provider in parallel.
  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;

    const loadCustomProviderModels = async () => {
      const customProviderIds = activeProviders
        .filter(
          (p) => isOpenAICompatibleProvider(p.provider) || isAnthropicCompatibleProvider(p.provider)
        )
        .map((p) => p.provider);

      if (customProviderIds.length === 0) return;

      const fetched: Record<string, any[]> = {};
      await Promise.all(
        customProviderIds.map(async (providerId) => {
          const models = await fetchProviderModels(providerId);
          if (models && models.length > 1) {
            fetched[providerId] = models;
          }
        })
      );

      if (!cancelled) setFetchedModels(fetched);
    };

    loadCustomProviderModels();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, activeProviders]);

  const allProviders = useMemo(
    () => ({ ...OAUTH_PROVIDERS, ...NOAUTH_PROVIDERS, ...APIKEY_PROVIDERS }),
    []
  );
  const alwaysIncludeProvidersKey = Array.isArray(alwaysIncludeProviders)
    ? alwaysIncludeProviders
        .filter((providerId) => typeof providerId === "string" && providerId)
        .join("\0")
    : "";

  // Group models by provider with priority order
  const groupedModels = useMemo(() => {
    const groups: Record<string, any> = {};

    // Get all active provider IDs from connections
    const activeConnectionIds = activeProviders.map((p) => p.provider);
    const explicitProviderIds = alwaysIncludeProvidersKey
      ? alwaysIncludeProvidersKey.split("\0")
      : [];

    // Only show connected providers (including both standard and custom)
    const providerIdsToShow = new Set([
      ...activeConnectionIds, // Connected providers
      ...explicitProviderIds, // Zero-config providers required by specific clients
    ]);

    // Sort by PROVIDER_ORDER
    const sortedProviderIds = [...providerIdsToShow].sort((a, b) => {
      const indexA = PROVIDER_ORDER.indexOf(a);
      const indexB = PROVIDER_ORDER.indexOf(b);
      return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    });

    sortedProviderIds.forEach((providerId) => {
      const alias = PROVIDER_ID_TO_ALIAS[providerId] || providerId;
      const providerInfo = allProviders[providerId] || { name: providerId, color: "#666" };
      const isCustomProvider =
        isOpenAICompatibleProvider(providerId) || isAnthropicCompatibleProvider(providerId);

      // Get user-added custom models for this provider (if any), excluding
      // any explicitly hidden by the operator (#7156 — the legacy picker
      // must respect the same isHidden flag the Precision Builder and
      // /v1/models catalog already honor). #9203: the unified hidden map
      // additionally covers catalog-override hidden rows and is applied to
      // every source below, so a hidden passthrough alias / fallback /
      // auto-fetched model is filtered exactly like a hidden custom row.
      const providerCustomModels = (customModels[providerId] || []).filter((cm) => !cm.isHidden);
      const isHiddenForProvider = (modelId: string) =>
        isProviderModelHidden(hiddenModelsByProvider, providerId, modelId);

      if (providerInfo.passthroughModels) {
        // Passthrough aliases are stored prefixed by the canonical providerId
        // (e.g. "github/gpt-4"), not the public alias (e.g. "gh/"), so we must
        // filter/strip by providerId — matching the sibling custom-provider
        // branch below. (port: decolua/9router#485)
        const aliasModels = buildPassthroughAliasModels(
          modelAliases as Record<string, string>,
          providerId
        ).filter((am) => !isHiddenForProvider(am.id));

        // Merge custom models for passthrough providers
        const customEntries = providerCustomModels
          .filter((cm) => !aliasModels.some((am) => am.id === cm.id))
          .filter((cm) => !isHiddenForProvider(cm.id))
          .map((cm) => ({
            id: cm.id,
            name: cm.name || cm.id,
            value: `${alias}/${cm.id}`,
            isCustom: true,
            source: normalizeModelCatalogSource(cm.source) === "imported" ? "imported" : "custom",
          }));

        const allModels = [...aliasModels, ...customEntries];

        if (allModels.length > 0) {
          const matchedNode = providerNodes.find((node) => node.id === providerId);
          const displayName = matchedNode?.name || providerInfo.name;

          groups[providerId] = {
            name: displayName,
            alias: alias,
            color: providerInfo.color,
            models: allModels,
          };
        }
      } else if (isCustomProvider) {
        const matchedNode = providerNodes.find((node) => node.id === providerId);
        const displayName = matchedNode?.name || providerInfo.name;
        const nodePrefix = matchedNode?.prefix || providerId; // Consider a more user-friendly fallback if providerId is a UUID

        const nodeModels = buildNodeAliasModels(
          modelAliases as Record<string, string>,
          providerId,
          nodePrefix
        ).filter((nm) => !isHiddenForProvider(nm.id));

        const fallbackEntries = (
          getCompatibleFallbackModels(providerId, providerCustomModels) || []
        )
          .filter((fm) => !nodeModels.some((nm) => nm.id === fm.id))
          .filter((fm) => !isHiddenForProvider(fm.id))
          .map((fm) => ({
            id: fm.id,
            name: fm.name || fm.id,
            value: `${nodePrefix}/${fm.id}`,
            isFallback: true,
            source: "fallback",
          }));

        // Merge custom models for custom providers
        const customEntries = providerCustomModels
          .filter(
            (cm) =>
              !nodeModels.some((nm) => nm.id === cm.id) &&
              !fallbackEntries.some((fm) => fm.id === cm.id)
          )
          .filter((cm) => !isHiddenForProvider(cm.id))
          .map((cm) => ({
            id: cm.id,
            name: cm.name || cm.id,
            value: `${nodePrefix}/${cm.id}`,
            isCustom: true,
            source: normalizeModelCatalogSource(cm.source) === "imported" ? "imported" : "custom",
          }));

        // Models discovered live from the provider's upstream `/models` endpoint.
        // Deduped against alias, fallback, and user-added custom models; tagged
        // with the `auto` source so the badge reads "auto". #9203: the server
        // already filtered hidden rows via `excludeHidden=true`, but re-check the
        // unified map here so a hidden model is dropped even on the local-catalog
        // fallback path where the query param is not passed through.
        const fetchedEntries = (fetchedModels[providerId] || [])
          .map((m) => {
            const id = m.id || m.slug || m.model || m.name;
            return {
              id,
              name: m.name || m.displayName || id,
              value: `${nodePrefix}/${id}`,
              isFetched: true,
              source: "auto",
            };
          })
          .filter(
            (fm) =>
              fm.id &&
              !nodeModels.some((nm) => nm.id === fm.id) &&
              !fallbackEntries.some((fbm) => fbm.id === fm.id) &&
              !customEntries.some((cm) => cm.id === fm.id)
          )
          .filter((fm) => !isHiddenForProvider(fm.id));

        const allModels = [...nodeModels, ...fallbackEntries, ...customEntries, ...fetchedEntries];

        if (allModels.length > 0) {
          groups[providerId] = {
            name: displayName,
            alias: nodePrefix,
            color: providerInfo.color,
            models: allModels,
            isCustom: true,
            hasModels: true,
          };
        }
      } else {
        const systemModels = getModelsByProviderId(providerId);

        // Merge system models with user-added custom models
        const systemEntries = systemModels
          .map((m) => ({
            id: m.id,
            name: m.name,
            value: `${alias}/${m.id}`,
            source: "system",
          }))
          .filter((sm) => !isHiddenForProvider(sm.id));

        const customEntries = providerCustomModels
          .filter((cm) => !systemModels.some((sm) => sm.id === cm.id))
          .filter((cm) => !isHiddenForProvider(cm.id))
          .map((cm) => ({
            id: cm.id,
            name: cm.name || cm.id,
            value: `${alias}/${cm.id}`,
            isCustom: true,
            source: normalizeModelCatalogSource(cm.source) === "imported" ? "imported" : "custom",
          }));

        const allModels = [...systemEntries, ...customEntries];

        if (allModels.length > 0) {
          groups[providerId] = {
            name: providerInfo.name,
            alias: alias,
            color: providerInfo.color,
            models: allModels,
          };
        }
      }
    });

    return groups;
  }, [
    activeProviders,
    alwaysIncludeProvidersKey,
    modelAliases,
    allProviders,
    providerNodes,
    customModels,
    fetchedModels,
    hiddenModelsByProvider,
  ]);

  // Filter combos by search query
  const filteredCombos = useMemo(() => {
    if (!searchQuery.trim()) return combos;
    const query = searchQuery.toLowerCase();
    return combos.filter((c) => c.name.toLowerCase().includes(query));
  }, [combos, searchQuery]);

  // Filter models by search query
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return groupedModels;

    const query = searchQuery.toLowerCase();
    const filtered: Record<string, any> = {};

    Object.entries(groupedModels).forEach(([providerId, group]: [string, any]) => {
      const matchedModels = group.models.filter((model) =>
        matchesModelCatalogQuery(query, {
          modelId: model.id,
          modelName: model.name,
          source: model.source,
        })
      );

      const providerNameMatches = group.name.toLowerCase().includes(query);

      if (matchedModels.length > 0 || providerNameMatches) {
        filtered[providerId] = {
          ...group,
          models: matchedModels.length > 0 ? matchedModels : group.models,
        };
      }
    });

    return filtered;
  }, [groupedModels, searchQuery]);

  // Filter models by connection eligibility when toggle is on
  const connectionFilteredGroups = useMemo(() => {
    if (!showConfiguredOnly) return filteredGroups;

    const result: Record<string, any> = {};
    Object.entries(filteredGroups).forEach(([providerId, group]: [string, any]) => {
      const providerConnections = activeProviders.filter((p: any) => p.provider === providerId);
      if (providerConnections.length === 0) return;

      const eligibleModels = group.models.filter((model: any) =>
        hasEligibleConnectionForModel(providerConnections, model.id)
      );
      if (eligibleModels.length > 0) {
        result[providerId] = { ...group, models: eligibleModels };
      }
    });
    return result;
  }, [filteredGroups, showConfiguredOnly, activeProviders]);

  // Flat list of currently visible provider models (respects search + configured-only).
  // Used by Select all / Unselect all — does not include the Combos section.
  const visibleModels = useMemo(() => {
    const models: any[] = [];
    Object.values(connectionFilteredGroups).forEach((group: any) => {
      if (Array.isArray(group?.models)) {
        models.push(...group.models);
      }
    });
    return models;
  }, [connectionFilteredGroups]);

  const addedModelValueSet = useMemo(() => new Set(addedModelValues), [addedModelValues]);

  const allVisibleSelected =
    visibleModels.length > 0 &&
    visibleModels.every(
      (model) => typeof model?.value === "string" && addedModelValueSet.has(model.value)
    );

  const showSelectAllToggle =
    keepOpenOnSelect &&
    !multiSelect &&
    typeof onSelectMany === "function" &&
    typeof onDeselectMany === "function" &&
    visibleModels.length > 0;

  // Same combo-builder gate as Select All — CLI tool cards and other single-pick
  // callers should not grow provider checkboxes / a test toolbar.
  const showProviderTestControls = keepOpenOnSelect && !multiSelect;

  const workingModelsToSelect = useMemo(
    () =>
      collectWorkingModelsToSelect({
        models: visibleModels,
        modelTestStatus,
        addedModelValues,
        alreadyAdded: false,
      }),
    [visibleModels, modelTestStatus, addedModelValues]
  );

  const workingModelsToUnselect = useMemo(
    () =>
      collectWorkingModelsToSelect({
        models: visibleModels,
        modelTestStatus,
        addedModelValues,
        alreadyAdded: true,
      }),
    [visibleModels, modelTestStatus, addedModelValues]
  );

  const visibleProviderIds = useMemo(
    () => listVisibleProviderIds(connectionFilteredGroups),
    [connectionFilteredGroups]
  );

  const allProvidersChecked =
    visibleProviderIds.length > 0 && visibleProviderIds.every((id) => selectedProviderIds.has(id));

  const showSelectWorkingModels =
    showProviderTestControls &&
    typeof onSelectMany === "function" &&
    typeof onDeselectMany === "function" &&
    !testingProviders &&
    hasWorkingTestResults(modelTestStatus);

  const canAddWorking = workingModelsToSelect.length > 0;
  const canRemoveWorking = workingModelsToUnselect.length > 0;

  const handleToggleSelectAllVisible = () => {
    if (!showSelectAllToggle) return;
    if (allVisibleSelected) {
      const toRemove = visibleModels.filter(
        (model) => typeof model?.value === "string" && addedModelValueSet.has(model.value)
      );
      if (toRemove.length > 0) onDeselectMany!(toRemove);
      return;
    }
    const toAdd = visibleModels.filter(
      (model) => typeof model?.value === "string" && !addedModelValueSet.has(model.value)
    );
    if (toAdd.length === 0) return;
    // Guard against a single click adding hundreds of models (e.g. with
    // "Show configured only" off) — see modelSelectModalHelpers.ts (#8526).
    if (
      shouldConfirmSelectAll(toAdd.length) &&
      !confirm(
        labelOrFallback("selectAllConfirm", `Add ${toAdd.length} models to this combo?`, {
          count: toAdd.length,
        })
      )
    ) {
      return;
    }
    onSelectMany!(toAdd);
  };

  const handleToggleProviderForTest = (providerId: string) => {
    setSelectedProviderIds((prev) => toggleProviderSelection(prev, providerId));
  };

  const handleSelectAllProviders = () => {
    setSelectedProviderIds(new Set(visibleProviderIds));
  };

  const handleClearProviderSelection = () => {
    setSelectedProviderIds(new Set());
  };

  /** Add or remove models that passed the last Test providers run. */
  const handleToggleWorkingModels = () => {
    if (!showSelectWorkingModels) return;
    if (canAddWorking) {
      if (
        shouldConfirmSelectAll(workingModelsToSelect.length) &&
        !confirm(
          labelOrFallback(
            "selectAllConfirm",
            `Add ${workingModelsToSelect.length} models to this combo?`,
            { count: workingModelsToSelect.length }
          )
        )
      ) {
        return;
      }
      onSelectMany!(workingModelsToSelect);
      return;
    }
    if (canRemoveWorking && typeof onDeselectMany === "function") {
      onDeselectMany(workingModelsToUnselect);
    }
  };

  /**
   * Smoke-test every currently-visible model under the providers the user
   * checked — same /api/models/test-all + chunk-of-3 concurrency as the
   * provider detail page "Test all models" button.
   */
  const handleTestSelectedProviders = async () => {
    if (testingProviders) return;
    if (selectedProviderIds.size === 0) {
      notify.error(
        labelOrFallback("noProvidersSelectedToTest", "Select at least one provider to test")
      );
      return;
    }

    const groups: Array<[string, Array<{ value?: string | null; id?: string | null }>]> =
      Object.entries(connectionFilteredGroups).map(([providerId, group]: [string, any]) => [
        providerId,
        Array.isArray(group?.models) ? group.models : [],
      ]);

    const targets = buildProviderTestTargets({
      selectedProviderIds,
      groups,
      activeProviders,
    });

    const flat = targets.flatMap((target) =>
      target.modelIds.map((modelId) => ({
        providerId: target.providerId,
        connectionId: target.connectionId,
        modelId,
      }))
    );

    if (flat.length === 0) {
      notify.error(
        labelOrFallback(
          "noModelsToTestForProviders",
          "No models to test for the selected providers"
        )
      );
      return;
    }

    setTestingProviders(true);
    setTestProgress({ done: 0, total: flat.length });

    let ok = 0;
    let error = 0;

    for (const chunk of chunkItems(flat)) {
      await Promise.all(
        chunk.map(async ({ providerId, connectionId, modelId }) => {
          try {
            const result: {
              results?: Record<string, { status?: string | null }>;
            } = await fetch("/api/models/test-all", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                providerId,
                connectionId,
                modelIds: [modelId],
              }),
            }).then((r) => r.json());

            const entry = result.results?.[modelId];
            const working = isProviderTestEntryWorking(entry);
            if (working) ok++;
            else error++;
            setModelTestStatus((prev) => ({
              ...prev,
              [modelId]: working ? "ok" : "error",
            }));
          } catch {
            error++;
            setModelTestStatus((prev) => ({ ...prev, [modelId]: "error" }));
          }
          setTestProgress((prev) => (prev ? { done: prev.done + 1, total: prev.total } : null));
        })
      );
    }

    const total = ok + error;
    notify.info(
      labelOrFallback("testSelectedProvidersResults", formatProviderTestResults(ok, total), {
        ok,
        total,
      })
    );
    setTestingProviders(false);
    setTestProgress(null);
  };

  const resolvedSelectedModels = multiSelect
    ? selectedModels
    : selectedModel
      ? [selectedModel]
      : [];

  const isValueSelected = (value: string) => resolvedSelectedModels.includes(value);

  const handleSelect = (model: any) => {
    // Upstream PR decolua/9router#889: when the model is already in
    // `addedModelValues` AND a deselect callback was supplied, the click acts
    // as an in-place remove instead of a duplicate add.
    const candidateValue =
      typeof model?.value === "string"
        ? model.value
        : typeof model?.name === "string"
          ? model.name
          : typeof model === "string"
            ? model
            : "";
    const isAdded = candidateValue ? addedModelValues.includes(candidateValue) : false;

    if (isAdded && onDeselect) {
      onDeselect(model);
    } else {
      onSelect(model);
    }

    // Legacy single-pick auto-closes; multiSelect or keepOpenOnSelect keep the
    // modal open so the user can toggle several entries in a row.
    if (!multiSelect && !keepOpenOnSelect) {
      onClose();
      setSearchQuery("");
    }
  };

  // Footer "Done" button for single-select callers that opted out of auto-close
  // (e.g. combo creation, where users add several models in a row). Skipped when
  // `multiSelect` is on — that mode renders its own Clear + Done footer below the body.
  const doneFooter =
    keepOpenOnSelect && !multiSelect ? (
      <Button
        fullWidth
        onClick={() => {
          onClose();
          setSearchQuery("");
        }}
      >
        {t("done")}
      </Button>
    ) : null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setSearchQuery("");
      }}
      title={resolvedTitle}
      size="xl"
      className="p-4! max-w-2xl"
      footer={doneFooter}
    >
      {/* Search - compact */}
      <div className="mb-3">
        <Input
          type="text"
          icon="search"
          placeholder={t("search")}
          aria-label={t("search")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          inputClassName="text-xs"
        />
      </div>

      <div className="mt-1.5 mb-2 space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Checkbox
            checked={showConfiguredOnly}
            onChange={(e) => setShowConfiguredOnly(e.target.checked)}
            label={<span className="truncate">{t("showConfiguredOnly")}</span>}
            className="min-w-0 text-xs text-text-muted"
          />

          {showSelectAllToggle && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleSelectAllVisible}
              data-testid="model-select-toggle-all-visible"
              className="shrink-0 text-xs"
            >
              {allVisibleSelected
                ? labelOrFallback("unselectAll", "Unselect all")
                : labelOrFallback("selectAll", "Select all")}
              <span className="ml-1 text-[10px] text-text-muted font-normal">
                ({visibleModels.length})
              </span>
            </Button>
          )}
        </div>

        {showProviderTestControls && (
          <div
            className="rounded-lg border border-border bg-bg-subtle px-2.5 py-2 space-y-2"
            data-testid="model-select-provider-test-panel"
          >
            <p className="text-[11px] text-text-muted leading-snug">
              {labelOrFallback(
                "providerTestHint",
                "Tip: check a provider → Test → Add working (or Remove working to undo)."
              )}
            </p>

            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] text-text-muted">
                  {labelOrFallback(
                    "providersSelectedCount",
                    `${selectedProviderIds.size} providers checked`,
                    { count: selectedProviderIds.size }
                  )}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={
                    allProvidersChecked ? handleClearProviderSelection : handleSelectAllProviders
                  }
                  disabled={visibleProviderIds.length === 0 || testingProviders}
                  data-testid="model-select-toggle-all-providers"
                  className="text-[11px]"
                >
                  {allProvidersChecked
                    ? labelOrFallback("clearProviderSelection", "Uncheck providers")
                    : labelOrFallback("selectAllProviders", "Check all providers")}
                </Button>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleTestSelectedProviders}
                  disabled={testingProviders || selectedProviderIds.size === 0}
                  data-testid="model-select-test-selected-providers"
                  title={labelOrFallback("testSelectedProviders", "Test providers")}
                  className="gap-1 text-xs"
                >
                  <Icon
                    name={testingProviders ? "progress_activity" : "science"}
                    size={14}
                    className={testingProviders ? "animate-spin" : undefined}
                  />
                  <span>
                    {testingProviders && testProgress
                      ? labelOrFallback(
                          "testingSelectedProviders",
                          `Testing ${testProgress.done}/${testProgress.total}...`,
                          testProgress
                        )
                      : labelOrFallback("testSelectedProviders", "Test providers")}
                  </span>
                </Button>

                {showSelectWorkingModels && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleToggleWorkingModels}
                    disabled={!canAddWorking && !canRemoveWorking}
                    data-testid="model-select-working-models"
                    className={cn(
                      "shrink-0 text-xs",
                      canRemoveWorking && "border-success/40 bg-success/15 text-success"
                    )}
                  >
                    {canRemoveWorking
                      ? labelOrFallback("unselectWorkingModels", "Unselect working")
                      : labelOrFallback("selectWorkingModels", "Add working")}
                    <span
                      className={`ml-1 text-[10px] font-normal ${
                        canRemoveWorking ? "opacity-80" : "text-text-muted"
                      }`}
                    >
                      (
                      {canRemoveWorking
                        ? workingModelsToUnselect.length
                        : workingModelsToSelect.length}
                      )
                    </span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Models grouped by provider - compact */}
      <div className="max-h-[min(50vh,420px)] overflow-y-auto space-y-3 isolate">
        {/* Combos section - always first */}
        {showCombos && filteredCombos.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-1.5 sticky top-0 z-10 bg-surface py-1">
              <Icon name="layers" size={14} className="text-primary" />
              <span className="text-xs font-medium text-primary">{t("combos")}</span>
              <span className="text-[10px] text-text-muted">({filteredCombos.length})</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {filteredCombos.map((combo) => {
                const isSelected = isValueSelected(combo.name);
                return (
                  <Button
                    key={combo.id}
                    variant="outline"
                    size="sm"
                    aria-pressed={isSelected}
                    onClick={() =>
                      handleSelect({ id: combo.name, name: combo.name, value: combo.name })
                    }
                    className={cn(
                      CHIP_CLASS,
                      isSelected
                        ? "bg-primary text-accent-foreground border-primary hover:bg-primary"
                        : "hover:border-primary/50 hover:bg-primary/5"
                    )}
                  >
                    {combo.name}
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {/* Provider models */}
        {Object.entries(connectionFilteredGroups).map(([providerId, group]: [string, any]) => {
          const providerSelected = selectedProviderIds.has(providerId);
          return (
            <div key={providerId}>
              {/* Provider header — opaque sticky bg so model chips never bleed through */}
              <div
                className={`flex items-center gap-1.5 mb-2 sticky top-0 z-10 py-1.5 px-1 rounded bg-surface ${
                  providerSelected ? "ring-1 ring-inset ring-primary/35" : ""
                }`}
              >
                {showProviderTestControls ? (
                  <Checkbox
                    checked={providerSelected}
                    onChange={() => handleToggleProviderForTest(providerId)}
                    data-testid={`model-select-provider-checkbox-${providerId}`}
                    aria-label={`Check ${group.name} for testing`}
                    className="min-w-0 flex-1"
                    label={
                      <span className="flex items-center gap-1.5 min-w-0">
                        <span
                          aria-hidden="true"
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: group.color }}
                        />
                        <span className="text-xs font-medium text-primary truncate">
                          {group.name}
                        </span>
                        <span className="text-[10px] text-text-muted shrink-0">
                          ({group.models.length})
                        </span>
                      </span>
                    }
                  />
                ) : (
                  <>
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: group.color }}
                    />
                    <span className="text-xs font-medium text-primary">{group.name}</span>
                    <span className="text-[10px] text-text-muted">({group.models.length})</span>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {group.models.map((model) => {
                  const isSelected = isValueSelected(model.value);
                  const isAdded = addedModelValues.includes(model.value);
                  const testStatus = modelTestStatus[model.value];
                  return (
                    <Button
                      key={model.id}
                      variant="outline"
                      size="sm"
                      aria-pressed={isSelected}
                      onClick={() => handleSelect(model)}
                      className={cn(
                        CHIP_CLASS,
                        isSelected
                          ? "bg-primary text-accent-foreground border-primary hover:bg-primary"
                          : isAdded
                            ? "bg-success/15 border-success/30 text-success"
                            : testStatus === "ok"
                              ? "border-success/40"
                              : testStatus === "error"
                                ? "border-error/40"
                                : "hover:border-primary/50 hover:bg-primary/5"
                      )}
                    >
                      {isAdded && <span className="mr-0.5 opacity-70">✓</span>}
                      {model.name}
                      {model.source && (
                        <span className="ml-1 text-[10px] uppercase opacity-70">
                          {getModelCatalogSourceLabel(model.source)}
                        </span>
                      )}
                      {testStatus === "ok" && (
                        <span className="ml-1 rounded px-1 py-px text-[9px] font-semibold uppercase tracking-wide bg-success/20 text-success">
                          ok
                        </span>
                      )}
                      {testStatus === "error" && (
                        <span className="ml-1 rounded px-1 py-px text-[9px] font-semibold uppercase tracking-wide bg-error/20 text-error">
                          fail
                        </span>
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {Object.keys(connectionFilteredGroups).length === 0 && filteredCombos.length === 0 && (
          <div className="text-center py-4 text-text-muted">
            <Icon name="search_off" size={24} className="mb-1 block" />
            <p className="text-xs">{t("noModelsFound")}</p>
          </div>
        )}
      </div>
      {multiSelect && (
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3">
          <span className="text-xs text-text-muted">{resolvedSelectedModels.length} selected</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onSelect(null)}>
              {t("clear")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onClose();
                setSearchQuery("");
              }}
            >
              {t("done")}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
