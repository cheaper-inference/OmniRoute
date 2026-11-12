import { getDbInstance } from "../core";
import {
  getRawSyncedAvailableModelsByConnection,
  getActiveConnectionAdmissionRefs,
  admitSyncedModelsByConnection,
  SYNCED_AVAILABLE_MODELS_MALFORMED,
  type SyncedAvailableModelsByConnection,
  type ConnectionAdmissionRef,
} from "../models";
import { normalizeSyncedAvailableModels } from "./synced";
import { isOverrideHiddenForModality } from "./compat";
import { mergeCollection, record, modelIdentity, type Row } from "./kimiModelMerge";
import { isModelExcludedByConnection } from "@/domain/connectionModelRules";
import { isFreeModel } from "@/shared/utils/freeModels";
import { isChatSelectableModel } from "@omniroute/open-sse/services/modelEndpointPolicy.ts";

type NativeConnection = {
  id: string;
  defaultModel?: unknown;
  providerSpecificData?: unknown;
};
type NativeModel = Row & { id: string };

function supported(value: unknown, synced = false): value is unknown[] {
  return (
    Array.isArray(value) &&
    value.every((row) =>
      synced
        ? typeof row === "string" ||
          (record(row) && ["id", "name", "model"].some((key) => typeof row[key] === "string"))
        : record(row) && typeof row.id === "string"
    )
  );
}

function readFamilyCollection(namespace: string): unknown {
  const rows = getDbInstance()
    .prepare<{ key: string; value: string | null }>(
      "SELECT key,value FROM key_value WHERE namespace=? AND key IN ('moonshot','kimi')"
    )
    .all(namespace);
  const legacy = rows.find((row) => row.key === "moonshot");
  const canonical = rows.find((row) => row.key === "kimi");
  const parse = (row: typeof legacy) => (row?.value ? JSON.parse(row.value) : []);
  const read = () => {
    if (!canonical) return parse(legacy);
    const current = parse(canonical);
    let old: unknown;
    try {
      old = parse(legacy);
    } catch {
      return current;
    }
    return legacy && supported(old) && supported(current)
      ? mergeCollection(
          old,
          current,
          (row) => (record(row) && typeof row.id === "string" ? row.id : undefined),
          namespace === "customModels"
        )
      : current;
  };
  if (namespace === "customModels") return read();
  try {
    return read();
  } catch {
    return [];
  }
}

function modelRows(value: unknown): NativeModel[] {
  return Array.isArray(value)
    ? value.filter(
        (row): row is NativeModel => record(row) && typeof row.id === "string" && row.id.length > 0
      )
    : [];
}

function hiddenModels(custom: unknown, compat: unknown): Set<string> {
  const visibility = new Map<string, boolean>();
  for (const row of modelRows(compat)) {
    if (
      Object.hasOwn(row, "isHidden") ||
      (row.hiddenModalities && typeof row.hiddenModalities === "object")
    )
      visibility.set(
        row.id,
        isOverrideHiddenForModality(
          {
            isHidden: Boolean(row.isHidden),
            hiddenModalities: row.hiddenModalities as Record<string, boolean> | undefined,
          },
          "chat"
        )
      );
  }
  for (const row of modelRows(custom))
    if (Object.hasOwn(row, "isHidden")) visibility.set(row.id, Boolean(row.isHidden));
  return new Set([...visibility].filter(([, hidden]) => hidden).map(([id]) => id));
}

export async function getKimiAutoComboInputs(permittedIds?: ReadonlySet<string>) {
  const [legacy, canonical, legacyRefs, canonicalRefs] = await Promise.all([
    getRawSyncedAvailableModelsByConnection("moonshot"),
    getRawSyncedAvailableModelsByConnection("kimi"),
    getActiveConnectionAdmissionRefs("moonshot"),
    getActiveConnectionAdmissionRefs("kimi"),
  ]);
  const customModels = readFamilyCollection("customModels");
  const compatOverrides = readFamilyCollection("modelCompatOverrides");
  const syncedByConnection: SyncedAvailableModelsByConnection = {};
  const syncedMetadata = new Map<string, Map<string, Row>>();
  for (const id of new Set([...Object.keys(legacy), ...Object.keys(canonical)])) {
    if (permittedIds && !permittedIds.has(id)) continue;
    const old = legacy[id];
    const current = canonical[id];
    if (old?.malformed || current?.malformed)
      Object.defineProperty(syncedByConnection, SYNCED_AVAILABLE_MODELS_MALFORMED, {
        value: true,
        enumerable: false,
      });
    const selected = current ?? old;
    if (!selected || selected.malformed) continue;
    const value =
      old &&
      current &&
      !old.malformed &&
      supported(old.value, true) &&
      supported(current.value, true)
        ? mergeCollection(old.value, current.value, modelIdentity)
        : selected.value;
    try {
      syncedByConnection[id] = normalizeSyncedAvailableModels(value, "kimi");
    } catch {
      Object.defineProperty(syncedByConnection, SYNCED_AVAILABLE_MODELS_MALFORMED, {
        value: true,
        enumerable: false,
      });
      continue;
    }
    const metadata = new Map<string, Row>();
    if (Array.isArray(value))
      for (const row of value) {
        const modelId = modelIdentity(row);
        if (modelId && record(row)) metadata.set(modelId, row);
      }
    syncedMetadata.set(id, metadata);
  }
  const refs = new Map<string, ConnectionAdmissionRef>();
  for (const ref of [...legacyRefs, ...canonicalRefs])
    if (!permittedIds || permittedIds.has(ref.id)) refs.set(ref.id, ref);
  const admissionRefs = [...refs.values()];
  return {
    customModels,
    compatOverrides,
    syncedByConnection,
    syncedMetadata,
    admissionRefs,
    hiddenModels: hiddenModels(customModels, compatOverrides),
    admitted: admitSyncedModelsByConnection("kimi", syncedByConnection, admissionRefs),
  };
}

type KimiInputs = Awaited<ReturnType<typeof getKimiAutoComboInputs>>;

function nonChatModel(row: { id: string; modelType?: unknown; supportedEndpoints?: unknown }) {
  const supportedEndpoints = Array.isArray(row.supportedEndpoints)
    ? row.supportedEndpoints.filter((endpoint): endpoint is string => typeof endpoint === "string")
    : undefined;
  return (
    (typeof row.modelType === "string" && row.modelType !== "chat") ||
    !isChatSelectableModel("kimi", { id: row.id, supportedEndpoints })
  );
}

/** One inferred native model with only accounts that may actually serve it. */
export async function getKimiAutoComboCandidates(
  inputs: KimiInputs,
  connections: readonly NativeConnection[],
  registryModels: readonly { id: string }[],
  yieldIfDue: (() => Promise<void>) | null = null
): Promise<Array<{ modelId: string; allowedConnectionIds: string[] }>> {
  const custom = modelRows(inputs.customModels);
  const registry = new Map(registryModels.map((row) => [row.id, row]));
  const customById = new Map(custom.map((row) => [row.id, row]));
  const refs = new Map(inputs.admissionRefs.map((ref) => [ref.id, ref]));
  const visible = new Set<string>();
  const nonChat = new Set<string>();
  for (const row of [...Object.values(inputs.admitted.byConnection).flat(), ...custom]) {
    if (inputs.hiddenModels.has(row.id)) continue;
    visible.add(row.id);
    if (nonChatModel(row)) nonChat.add(row.id);
  }
  const hasUserModels = inputs.admitted.freeOnlyExhausted || visible.size > 0;
  const modelIds = hasUserModels
    ? [...visible]
    : [
        ...new Set([
          ...registry.keys(),
          ...connections.flatMap((conn) =>
            typeof conn.defaultModel === "string" && conn.defaultModel.trim()
              ? [conn.defaultModel.trim()]
              : []
          ),
        ]),
      ];
  const candidates: Array<{ modelId: string; allowedConnectionIds: string[] }> = [];
  for (const modelId of modelIds) {
    if (yieldIfDue) await yieldIfDue();
    if (
      inputs.hiddenModels.has(modelId) ||
      nonChat.has(modelId) ||
      (!hasUserModels && registry.has(modelId) && nonChatModel(registry.get(modelId)!))
    )
      continue;
    const allowedConnectionIds = connections
      .filter((connection) => {
        const synced = inputs.admitted.byConnection[connection.id] ?? [];
        const available =
          synced.some((row) => row.id === modelId) ||
          customById.has(modelId) ||
          (!hasUserModels && registry.has(modelId)) ||
          (typeof connection.defaultModel === "string" &&
            connection.defaultModel.trim() === modelId);
        if (!available || isModelExcludedByConnection(modelId, connection.providerSpecificData))
          return false;
        if (!refs.get(connection.id)?.freeOnly) return true;
        const evidence = inputs.syncedMetadata.get(connection.id)?.get(modelId) ??
          customById.get(modelId) ??
          registry.get(modelId) ?? { id: modelId };
        return isFreeModel("kimi", { ...evidence, id: modelId });
      })
      .map((connection) => connection.id);
    if (allowedConnectionIds.length) candidates.push({ modelId, allowedConnectionIds });
  }
  return candidates;
}
