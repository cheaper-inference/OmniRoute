/**
 * Selective provider-account transfer between OmniRoute installs.
 *
 * Export picks provider connections by id, pulls in the custom provider nodes
 * they depend on (OpenAI/Anthropic-compatible endpoints), and seals the whole
 * payload under an operator passphrase (`sealedPayload.ts`). The cleartext part
 * of the file only carries counts.
 *
 * Import is two-step: preview (open the file, match every item against the
 * destination, report new / identical / conflict / unsupported) and apply
 * (per-item add / skip / replace). Every decision is validated before the first
 * write, a pre-import database backup is taken, and nothing in the destination
 * is ever deleted. Destination-local policy is kept: priority, global priority,
 * the active flag, proxy toggles and runtime health state never travel.
 *
 * All writes go through the provider DB modules (`createProviderConnection`,
 * `updateProviderConnection`, `createProviderNode`, `updateProviderNode`), so
 * credentials are re-encrypted at rest with the destination key and the
 * existing dedup / dashboard-password guards still apply.
 */
import { z } from "zod";
import { backupDbFile } from "@/lib/db/backup";
import {
  createProviderConnection,
  createProviderNode,
  getProviderConnections,
  getProviderNodes,
  stripCodexChildCooldownFields,
  updateProviderConnection,
  updateProviderNode,
} from "@/lib/db/providers";
import { isWebCookieProviderId, webSessionCredentialKey } from "@/lib/db/webSessionDedup";
import { resolveStaticProviderCatalogEntry } from "@/lib/providers/catalog";
import { isCommonChatGptWebRetiredProviderId } from "@/shared/constants/chatgptWebRetirement";
import { isMicrosoftDesignerWebRetiredProviderId } from "@/shared/constants/designerWebRetirement";
import { isRuntimeRetiredProviderId } from "@/shared/constants/providerRetirement";
import {
  isAnthropicCompatibleProvider,
  isClaudeCodeCompatibleProvider,
  isOpenAICompatibleProvider,
} from "@/shared/constants/providers";
import {
  MAX_TRANSFER_CONNECTIONS,
  PROVIDER_TRANSFER_FORMAT,
  PROVIDER_TRANSFER_VERSION,
  type ProviderTransferAction,
  type ProviderTransferBundle,
} from "@/shared/validation/schemas/providerTransfer";
import { openSealedJson, sealJson } from "./sealedPayload";

type JsonRecord = Record<string, unknown>;

const SEAL_ASSOCIATED_DATA = `${PROVIDER_TRANSFER_FORMAT}:v${PROVIDER_TRANSFER_VERSION}`;

/**
 * Connection fields that travel. An allowlist on purpose: priority,
 * globalPriority, isActive, proxyEnabled / perKeyProxyEnabled, timestamps and
 * every runtime field (testStatus, lastError*, rateLimitedUntil, backoffLevel,
 * consecutiveUseCount, lastUsedAt, ...) stay with the install that owns them.
 * The same allowlist is applied to imported entries, so a hand-edited file
 * cannot smuggle runtime or policy state in either.
 */
const PORTABLE_CONNECTION_FIELDS = [
  "provider",
  "authType",
  "name",
  "displayName",
  "email",
  "defaultModel",
  "apiKey",
  "accessToken",
  "refreshToken",
  "idToken",
  "expiresAt",
  "tokenExpiresAt",
  "expiresIn",
  "tokenType",
  "scope",
  "projectId",
  "rateLimitProtection",
  "group",
  "maxConcurrent",
  "quotaVisible",
  "quotaWindowThresholds",
  "rateLimitOverrides",
  "healthCheckInterval",
  "providerSpecificData",
] as const;

const PORTABLE_NODE_FIELDS = [
  "type",
  "name",
  "prefix",
  "apiType",
  "baseUrl",
  "chatPath",
  "modelsPath",
  "iconUrl",
  "customHeaders",
  "dailyQuotaResetTimezone",
  "dailyQuotaResetHour",
] as const;

const CREDENTIAL_FIELDS = ["apiKey", "accessToken", "refreshToken", "idToken"] as const;
/** providerSpecificData keys that tell two accounts behind one email apart. */
const IDENTITY_DISCRIMINATORS = [
  "workspaceId",
  "chatgptUserId",
  "organizationUUID",
  "profileArn",
  "username",
];

export type TransferItemStatus = "new" | "identical" | "conflict" | "unsupported";

export interface TransferPlanItem {
  key: string;
  kind: "connection" | "node";
  sourceId: string;
  targetId: string | null;
  provider: string;
  authType: string | null;
  label: string;
  email: string | null;
  status: TransferItemStatus;
  actions: ProviderTransferAction[];
  recommended: ProviderTransferAction;
}

export interface TransferPlan {
  format: typeof PROVIDER_TRANSFER_FORMAT;
  version: typeof PROVIDER_TRANSFER_VERSION;
  summary: {
    providerConnections: number;
    providerNodes: number;
    counts: Record<TransferItemStatus, number>;
    deletions: 0;
  };
  providerConnections: TransferPlanItem[];
  providerNodes: TransferPlanItem[];
}

export interface TransferPayload {
  providerConnections: JsonRecord[];
  providerNodes: JsonRecord[];
}

export interface TransferWrite {
  outcome: "created" | "updated";
  connection: JsonRecord;
}

export interface TransferApplyResult {
  success: true;
  applied: {
    providerConnections: number;
    providerNodes: number;
    skipped: number;
  };
  deletions: 0;
  items: Array<{ key: string; outcome: "added" | "replaced" | "merged" | "skipped" }>;
  writes: TransferWrite[];
}

/** A request the operator can fix (bad selection, bad decision, bad file contents). */
export class ProviderTransferInputError extends Error {
  readonly code = "PROVIDER_TRANSFER_INVALID" as const;

  constructor(message: string) {
    super(message);
    this.name = "ProviderTransferInputError";
  }
}

const sealedConnectionSchema = z
  .object({
    sourceId: z.string().min(1).max(200),
    provider: z.string().trim().min(1).max(200),
    authType: z.string().trim().min(1).max(40),
  })
  .passthrough();

const sealedNodeSchema = z
  .object({
    sourceId: z.string().min(1).max(200),
    type: z.string().trim().min(1).max(100),
    name: z.string().trim().min(1).max(200),
  })
  .passthrough();

const sealedPayloadSchema = z.object({
  providerConnections: z.array(sealedConnectionSchema).max(MAX_TRANSFER_CONNECTIONS),
  providerNodes: z.array(sealedNodeSchema).max(MAX_TRANSFER_CONNECTIONS),
});

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function str(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function stable(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stable).join(",")}]`;
  if (isRecord(value)) {
    return `{${Object.keys(value)
      .filter((key) => value[key] !== undefined && value[key] !== null)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stable(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value ?? null);
}

function pick(source: JsonRecord, fields: readonly string[]): JsonRecord {
  const out: JsonRecord = {};
  for (const field of fields) {
    const value = source[field];
    if (value !== undefined && value !== null) out[field] = value;
  }
  return out;
}

function toPortableConnection(connection: JsonRecord): JsonRecord {
  const out = pick(connection, PORTABLE_CONNECTION_FIELDS);
  if (isRecord(out.providerSpecificData)) {
    const psd = stripCodexChildCooldownFields({ ...out.providerSpecificData });
    if (Object.keys(psd).length > 0) out.providerSpecificData = psd;
    else delete out.providerSpecificData;
  } else {
    delete out.providerSpecificData;
  }
  return out;
}

function toPortableNode(node: JsonRecord): JsonRecord {
  return pick(node, PORTABLE_NODE_FIELDS);
}

function needsProviderNode(provider: string): boolean {
  return (
    isOpenAICompatibleProvider(provider) ||
    isAnthropicCompatibleProvider(provider) ||
    isClaudeCodeCompatibleProvider(provider)
  );
}

function isRetiredProvider(provider: string): boolean {
  return (
    isRuntimeRetiredProviderId(provider) ||
    isCommonChatGptWebRetiredProviderId(provider) ||
    isMicrosoftDesignerWebRetiredProviderId(provider)
  );
}

function isTransferableProvider(provider: string, availableNodeIds: Set<string>): boolean {
  if (isRetiredProvider(provider)) return false;
  if (needsProviderNode(provider)) return availableNodeIds.has(provider);
  return resolveStaticProviderCatalogEntry(provider) !== null;
}

function connectionLabel(connection: JsonRecord): string {
  return (
    str(connection.name) ||
    str(connection.displayName) ||
    str(connection.email) ||
    `${String(connection.provider)} account`
  );
}

// ──────────────── Catalog / export ────────────────

/** Every connection (lazy-decrypting rows) and provider node of this install. */
async function loadDestination() {
  const [connections, nodes] = await Promise.all([getProviderConnections(), getProviderNodes()]);
  return { connections: connections as JsonRecord[], nodes: nodes as JsonRecord[] };
}

/** Selectable accounts — identity and labels only, never a credential. */
export async function getProviderTransferCatalog() {
  const { connections, nodes } = await loadDestination();
  const nodeNames = new Map(nodes.map((node) => [String(node.id), str(node.name)]));
  return {
    providerConnections: connections.map((connection) => ({
      id: String(connection.id),
      provider: String(connection.provider),
      providerLabel: nodeNames.get(String(connection.provider)) ?? null,
      authType: str(connection.authType),
      name: str(connection.name),
      displayName: str(connection.displayName),
      email: str(connection.email),
      group: str(connection.group),
      isActive: connection.isActive !== false,
    })),
  };
}

export async function exportProviderTransferBundle(input: {
  connectionIds: string[];
  passphrase: string;
}): Promise<ProviderTransferBundle> {
  const wanted = new Set(input.connectionIds);
  const { connections, nodes } = await loadDestination();
  const selected = connections.filter((connection) => wanted.has(String(connection.id)));
  if (selected.length !== wanted.size) {
    throw new ProviderTransferInputError("One or more selected provider accounts no longer exist");
  }

  const providerConnections: JsonRecord[] = selected.map((connection) => ({
    sourceId: String(connection.id),
    ...toPortableConnection(connection),
  }));
  const nodeIds = new Set(
    providerConnections.map((connection) => String(connection.provider)).filter(needsProviderNode)
  );
  const providerNodes = nodes
    .filter((node) => nodeIds.has(String(node.id)))
    .map((node) => ({ sourceId: String(node.id), ...toPortableNode(node) }));

  const sealed = await sealJson(
    { providerConnections, providerNodes },
    input.passphrase,
    SEAL_ASSOCIATED_DATA
  );
  return {
    format: PROVIDER_TRANSFER_FORMAT,
    version: PROVIDER_TRANSFER_VERSION,
    exportedAt: new Date().toISOString(),
    summary: {
      providerConnections: providerConnections.length,
      providerNodes: providerNodes.length,
    },
    sealed,
  };
}

/** Open and validate a bundle. Throws `SealedPayloadError` on a wrong passphrase. */
export async function openProviderTransferBundle(
  bundle: ProviderTransferBundle,
  passphrase: string
): Promise<TransferPayload> {
  const raw = await openSealedJson(bundle.sealed, passphrase, SEAL_ASSOCIATED_DATA);
  const parsed = sealedPayloadSchema.safeParse(raw);
  if (!parsed.success) {
    throw new ProviderTransferInputError("The transfer file contents are not valid");
  }
  const providerConnections = parsed.data.providerConnections.map((connection) => ({
    sourceId: connection.sourceId,
    ...toPortableConnection(connection),
  }));
  const providerNodes = parsed.data.providerNodes.map((node) => ({
    sourceId: node.sourceId,
    ...toPortableNode(node),
  }));
  assertUnique(providerConnections, "provider account");
  assertUnique(providerNodes, "provider node");
  // Only custom (OpenAI/Anthropic-compatible) endpoints live in provider_nodes; a
  // hand-edited file must not plant a node under a built-in provider id.
  const strayNode = providerNodes.find((node) => !needsProviderNode(String(node.sourceId)));
  if (strayNode) {
    throw new ProviderTransferInputError(
      `Unexpected provider node in the file: ${strayNode.sourceId}`
    );
  }
  return { providerConnections, providerNodes };
}

function assertUnique(items: JsonRecord[], label: string) {
  const seen = new Set<string>();
  for (const item of items) {
    const id = String(item.sourceId);
    if (seen.has(id)) throw new ProviderTransferInputError(`Duplicate ${label} in the file: ${id}`);
    seen.add(id);
  }
}

// ──────────────── Matching / plan ────────────────

function specificData(connection: JsonRecord): JsonRecord {
  return isRecord(connection.providerSpecificData) ? connection.providerSpecificData : {};
}

function discriminatorsAgree(a: JsonRecord, b: JsonRecord): boolean {
  const pa = specificData(a);
  const pb = specificData(b);
  return IDENTITY_DISCRIMINATORS.every((key) => {
    const va = str(pa[key]);
    const vb = str(pb[key]);
    return !va || !vb || va === vb;
  });
}

function sharesCredential(a: JsonRecord, b: JsonRecord): boolean {
  return CREDENTIAL_FIELDS.some((field) => {
    const va = str(a[field]);
    return !!va && va === str(b[field]);
  });
}

/**
 * Find the destination connection a transferred account corresponds to. Mirrors
 * the identities `createProviderConnection` already dedups on (OAuth email +
 * account discriminators, API-key value or name, web-session credential), so an
 * "add" never silently lands on top of an existing account.
 */
export function findMatchingConnection(
  existing: JsonRecord[],
  source: JsonRecord
): JsonRecord | null {
  const provider = String(source.provider);
  const candidates = existing.filter((connection) => connection.provider === provider);
  const byId = candidates.find((connection) => connection.id === source.sourceId);
  if (byId) return byId;

  return (
    findByEmail(candidates, source) ||
    candidates.find((connection) => sharesCredential(connection, source)) ||
    findByWebSession(candidates, source, provider) ||
    findByApiKeyName(candidates, source, provider) ||
    findByCodexAccount(candidates, source, provider) ||
    null
  );
}

function findByEmail(candidates: JsonRecord[], source: JsonRecord): JsonRecord | undefined {
  const email = str(source.email);
  if (!email) return undefined;
  return candidates.find(
    (connection) =>
      connection.authType === source.authType &&
      str(connection.email) === email &&
      discriminatorsAgree(connection, source)
  );
}

function findByWebSession(
  candidates: JsonRecord[],
  source: JsonRecord,
  provider: string
): JsonRecord | undefined {
  const sessionKey = webSessionCredentialKey(specificData(source));
  if (!sessionKey) return undefined;
  if (source.authType !== "cookie" && !isWebCookieProviderId(provider)) return undefined;
  return candidates.find(
    (connection) => webSessionCredentialKey(specificData(connection)) === sessionKey
  );
}

function findByApiKeyName(
  candidates: JsonRecord[],
  source: JsonRecord,
  provider: string
): JsonRecord | undefined {
  const name = str(source.name);
  if (source.authType !== "apikey" || !name || isWebCookieProviderId(provider)) return undefined;
  return candidates.find(
    (connection) => connection.authType === "apikey" && str(connection.name) === name
  );
}

function findByCodexAccount(
  candidates: JsonRecord[],
  source: JsonRecord,
  provider: string
): JsonRecord | undefined {
  const chatgptUserId = str(specificData(source).chatgptUserId);
  if (provider !== "codex" || !chatgptUserId) return undefined;
  const workspaceId = str(specificData(source).workspaceId);
  return candidates.find(
    (connection) =>
      connection.authType === "oauth" &&
      str(specificData(connection).chatgptUserId) === chatgptUserId &&
      str(specificData(connection).workspaceId) === workspaceId
  );
}

function statusFor(target: JsonRecord | null, sameContent: boolean): TransferItemStatus {
  if (!target) return "new";
  return sameContent ? "identical" : "conflict";
}

function actionsFor(status: TransferItemStatus): {
  actions: ProviderTransferAction[];
  recommended: ProviderTransferAction;
} {
  if (status === "new") return { actions: ["add", "skip"], recommended: "add" };
  if (status === "unsupported") return { actions: ["skip"], recommended: "skip" };
  return { actions: ["skip", "replace"], recommended: "skip" };
}

function planNodes(payload: TransferPayload, existingNodes: JsonRecord[]) {
  const remap = new Map<string, string>();
  const items = payload.providerNodes.map((source): TransferPlanItem => {
    const sourceId = String(source.sourceId);
    const prefix = str(source.prefix);
    const target =
      existingNodes.find((node) => node.id === sourceId) ||
      (prefix ? existingNodes.find((node) => str(node.prefix) === prefix) : undefined) ||
      null;
    remap.set(sourceId, target ? String(target.id) : sourceId);
    const same = !!target && stable(toPortableNode(target)) === stable(toPortableNode(source));
    const status = statusFor(target, same);
    return {
      key: `node:${sourceId}`,
      kind: "node",
      sourceId,
      targetId: target ? String(target.id) : null,
      provider: sourceId,
      authType: null,
      label: str(source.name) || prefix || sourceId,
      email: null,
      status,
      ...actionsFor(status),
    };
  });
  return { items, remap };
}

/** Pure planner: match a payload against the destination's current rows. */
export function planProviderTransfer(
  payload: TransferPayload,
  existing: { connections: JsonRecord[]; nodes: JsonRecord[] }
): TransferPlan {
  const nodePlan = planNodes(payload, existing.nodes);
  const availableNodeIds = new Set([
    ...existing.nodes.map((node) => String(node.id)),
    ...nodePlan.remap.values(),
  ]);

  const connectionItems = payload.providerConnections.map((original): TransferPlanItem => {
    const sourceId = String(original.sourceId);
    const provider = nodePlan.remap.get(String(original.provider)) || String(original.provider);
    const source: JsonRecord = { ...original, provider };
    const supported = isTransferableProvider(provider, availableNodeIds);
    const target = supported ? findMatchingConnection(existing.connections, source) : null;
    const same =
      !!target &&
      stable(toPortableConnection(target)) === stable(toPortableConnection({ ...source }));
    const status = supported ? statusFor(target, same) : "unsupported";
    return {
      key: `connection:${sourceId}`,
      kind: "connection",
      sourceId,
      targetId: target ? String(target.id) : null,
      provider,
      authType: str(source.authType),
      label: connectionLabel(source),
      email: str(source.email),
      status,
      ...actionsFor(status),
    };
  });

  const counts: Record<TransferItemStatus, number> = {
    new: 0,
    identical: 0,
    conflict: 0,
    unsupported: 0,
  };
  for (const item of [...nodePlan.items, ...connectionItems]) counts[item.status]++;

  return {
    format: PROVIDER_TRANSFER_FORMAT,
    version: PROVIDER_TRANSFER_VERSION,
    summary: {
      providerConnections: connectionItems.length,
      providerNodes: nodePlan.items.length,
      counts,
      deletions: 0,
    },
    providerConnections: connectionItems,
    providerNodes: nodePlan.items,
  };
}

export async function previewProviderTransfer(
  bundle: ProviderTransferBundle,
  passphrase: string
): Promise<TransferPlan> {
  const payload = await openProviderTransferBundle(bundle, passphrase);
  return planProviderTransfer(payload, await loadDestination());
}

// ──────────────── Apply ────────────────

function resolveDecisions(
  plan: TransferPlan,
  decisions: Record<string, ProviderTransferAction>,
  existingNodeIds: Set<string>
): Map<string, ProviderTransferAction> {
  const items = [...plan.providerNodes, ...plan.providerConnections];
  const known = new Set(items.map((item) => item.key));
  for (const key of Object.keys(decisions)) {
    if (!known.has(key)) throw new ProviderTransferInputError(`Unknown transfer item: ${key}`);
  }

  const resolved = new Map<string, ProviderTransferAction>();
  for (const item of items) {
    const action = decisions[item.key] ?? item.recommended;
    if (!item.actions.includes(action)) {
      throw new ProviderTransferInputError(
        `"${action}" is not allowed for "${item.label}" (${item.status})`
      );
    }
    resolved.set(item.key, action);
  }

  const nodesAfter = new Set(existingNodeIds);
  for (const item of plan.providerNodes) {
    if (resolved.get(item.key) === "add") nodesAfter.add(item.sourceId);
  }
  for (const item of plan.providerConnections) {
    if (resolved.get(item.key) === "skip" || !needsProviderNode(item.provider)) continue;
    if (!nodesAfter.has(item.provider)) {
      throw new ProviderTransferInputError(
        `"${item.label}" needs its provider node; import the node too or skip the account`
      );
    }
  }
  return resolved;
}

function recordSkipped(item: TransferPlanItem, result: TransferApplyResult): void {
  result.applied.skipped++;
  result.items.push({ key: item.key, outcome: "skipped" });
}

async function applyNodeItem(
  item: TransferPlanItem,
  action: ProviderTransferAction | undefined,
  nodesById: Map<string, JsonRecord>,
  result: TransferApplyResult
): Promise<void> {
  const source = toPortableNode(nodesById.get(item.sourceId) || {});
  if (action === "add") {
    await createProviderNode({ id: item.sourceId, ...source });
  } else if (action === "replace" && item.targetId) {
    await updateProviderNode(item.targetId, { customHeaders: null, ...source });
  } else {
    recordSkipped(item, result);
    return;
  }
  result.applied.providerNodes++;
  result.items.push({ key: item.key, outcome: action === "add" ? "added" : "replaced" });
}

async function applyConnectionItem(
  item: TransferPlanItem,
  action: ProviderTransferAction | undefined,
  connectionsById: Map<string, JsonRecord>,
  existingConnectionIds: Set<string>,
  result: TransferApplyResult
): Promise<void> {
  const source = {
    ...toPortableConnection(connectionsById.get(item.sourceId) || {}),
    provider: item.provider,
  };
  if (action === "add") {
    const created = (await createProviderConnection({ ...source, isActive: true })) || {};
    const merged = existingConnectionIds.has(String(created.id));
    result.writes.push({ outcome: merged ? "updated" : "created", connection: created });
    result.items.push({ key: item.key, outcome: merged ? "merged" : "added" });
  } else if (action === "replace" && item.targetId) {
    const updated = (await updateProviderConnection(item.targetId, source)) || {};
    result.writes.push({ outcome: "updated", connection: updated });
    result.items.push({ key: item.key, outcome: "replaced" });
  } else {
    recordSkipped(item, result);
    return;
  }
  result.applied.providerConnections++;
}

export async function applyProviderTransfer(
  bundle: ProviderTransferBundle,
  passphrase: string,
  decisions: Record<string, ProviderTransferAction>
): Promise<TransferApplyResult> {
  const payload = await openProviderTransferBundle(bundle, passphrase);
  const destination = await loadDestination();
  const plan = planProviderTransfer(payload, destination);
  const existingNodeIds = new Set(destination.nodes.map((node) => String(node.id)));
  const resolved = resolveDecisions(plan, decisions, existingNodeIds);
  const existingConnectionIds = new Set(destination.connections.map((c) => String(c.id)));

  backupDbFile("pre-transfer-import");

  const result: TransferApplyResult = {
    success: true,
    applied: { providerConnections: 0, providerNodes: 0, skipped: 0 },
    deletions: 0,
    items: [],
    writes: [],
  };

  const nodesById = new Map(payload.providerNodes.map((node) => [String(node.sourceId), node]));
  for (const item of plan.providerNodes) {
    await applyNodeItem(item, resolved.get(item.key), nodesById, result);
  }

  const connectionsById = new Map(
    payload.providerConnections.map((connection) => [String(connection.sourceId), connection])
  );
  for (const item of plan.providerConnections) {
    await applyConnectionItem(
      item,
      resolved.get(item.key),
      connectionsById,
      existingConnectionIds,
      result
    );
  }
  return result;
}
