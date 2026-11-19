import { normalizeOutputIndex } from "./pureHelpers.ts";

interface Fragment {
  text: string;
  order: number;
}
interface TextPart {
  fragments: Fragment[];
  length: number;
  /** Its own output_text.done was seen. */
  closed?: boolean;
}
interface TextItem {
  id?: string;
  parts: Map<number | null, TextPart>;
  /** Its own output_item.done was seen. */
  closed?: boolean;
}
interface TextTracker {
  closed: boolean;
  sequence: number;
  items: Set<TextItem>;
  byId: Map<string, TextItem>;
  byIndex: Map<number, TextItem>;
  anonymous?: TextItem;
}
interface TextState {
  responsesTextSnapshots?: TextTracker;
  chatId?: string;
  created?: number;
  model?: string;
}
interface Identity {
  item_id?: unknown;
  output_index?: unknown;
  content_index?: unknown;
}
type Snapshot = Record<string, unknown>;
type SnapshotTexts = Map<number | null, string>;
/**
 * What an event says about its text, used to decide whether an unseen item_id on an
 * already-tracked output_index is the same item under a rotated id (GitHub Copilot
 * rotates item_id on every event) or a genuinely new item reusing the index.
 */
type RotationEvidence = { deltaContentIndex: unknown } | { snapshot: SnapshotTexts };

function tracker(state: TextState): TextTracker {
  return (state.responsesTextSnapshots ??= {
    closed: false,
    sequence: 0,
    items: new Set(),
    byId: new Map(),
    byIndex: new Map(),
  });
}
function object(value: unknown): Snapshot | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Snapshot) : null;
}
function index(value: unknown): number | undefined {
  if (typeof value !== "number" && (typeof value !== "string" || !value.trim())) return undefined;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed >= 0 ? normalizeOutputIndex(value) : undefined;
}
function mergeParts(target: TextPart, source: TextPart): void {
  // Fragments from aliases may interleave before an item event links their IDs.
  for (const fragment of source.fragments) target.fragments.push(fragment);
  target.fragments.sort((a, b) => a.order - b.order);
  target.length += source.length;
  target.closed ||= source.closed;
}
function mergeItems(t: TextTracker, target: TextItem, source: TextItem): void {
  for (const [key, part] of source.parts) {
    const existing = target.parts.get(key);
    if (existing) mergeParts(existing, part);
    else target.parts.set(key, part);
  }
  for (const [key, item] of t.byIndex) if (item === source) t.byIndex.set(key, target);
  for (const [key, item] of t.byId) if (item === source) t.byId.set(key, target);
  if (t.anonymous === source) t.anonymous = undefined;
  target.closed ||= source.closed;
  t.items.delete(source);
}
function trackedText(part: TextPart): string {
  return part.fragments.map((fragment) => fragment.text).join("");
}
function snapshotTextFor(
  texts: SnapshotTexts,
  key: number | null,
  partCount: number
): string | undefined {
  const exact = texts.get(key);
  if (exact !== undefined) return exact;
  // An unindexed side can only pair with the other side's sole part.
  const unindexed = key === null || texts.has(null);
  return unindexed && texts.size === 1 && partCount === 1 ? [...texts.values()][0] : undefined;
}
/** A snapshot proves continuity only when it extends text already tracked for the item. */
function continuesTrackedText(item: TextItem, texts: SnapshotTexts): boolean {
  let matched = false;
  for (const [key, part] of item.parts) {
    const text = snapshotTextFor(texts, key, item.parts.size);
    if (text === undefined) continue;
    if (!text.startsWith(trackedText(part))) return false;
    matched ||= part.length > 0;
  }
  return matched;
}
function isRotatedAlias(item: TextItem, evidence: RotationEvidence | undefined): boolean {
  if (!evidence) return false;
  if ("snapshot" in evidence) return continuesTrackedText(item, evidence.snapshot);
  // A delta continues the tracked item only while that item and part are still open.
  const part = item.parts.get(index(evidence.deltaContentIndex) ?? null);
  return !item.closed && !part?.closed;
}
function messageTexts(snapshot: Snapshot): SnapshotTexts {
  const texts: SnapshotTexts = new Map();
  if (!Array.isArray(snapshot.content)) return texts;
  snapshot.content.forEach((value, contentIndex) => {
    const part = object(value);
    const text = part?.type === "refusal" ? part.refusal : part?.text;
    if ((part?.type === "output_text" || part?.type === "refusal") && typeof text === "string") {
      texts.set(contentIndex, text);
    }
  });
  return texts;
}
function resolveItem(
  t: TextTracker,
  identity: Identity,
  allowAnonymous = false,
  evidence?: RotationEvidence
): TextItem {
  const id =
    typeof identity.item_id === "string" && identity.item_id ? identity.item_id : undefined;
  const outputIndex = index(identity.output_index);
  if (!id && outputIndex === undefined && t.anonymous) return t.anonymous;
  const byId = id ? t.byId.get(id) : undefined;
  const byIndex = outputIndex !== undefined ? t.byIndex.get(outputIndex) : undefined;
  // Explicit IDs are authoritative; a malformed reused output index must not merge them.
  // An unseen id on a tracked index is adopted only when the event proves it continues
  // that item (a rotated id), never merely because the index matches (#19218, #19575).
  const sameId = byIndex && (!id || !byIndex.id || byIndex.id === id);
  const rotatedId = byIndex && !sameId && !byId && isRotatedAlias(byIndex, evidence);
  const compatibleIndex = sameId || rotatedId ? byIndex : undefined;
  let item = byId ?? compatibleIndex;
  if (byId && compatibleIndex && byId !== compatibleIndex) mergeItems(t, byId, compatibleIndex);
  // Only a complete, single-message snapshot can prove where anonymous deltas belong.
  if (allowAnonymous && t.anonymous && t.items.size === (item ? 2 : 1)) {
    if (item) mergeItems(t, item, t.anonymous);
    else {
      item = t.anonymous;
      t.anonymous = undefined;
    }
  }
  if (!item) {
    item = { parts: new Map() };
    t.items.add(item);
  }
  if (id) {
    item.id = id;
    t.byId.set(id, item);
  }
  if (outputIndex !== undefined) t.byIndex.set(outputIndex, item);
  if (!id && outputIndex === undefined) t.anonymous = item;
  return item;
}
function resolvePart(
  item: TextItem,
  contentIndex: unknown,
  allowAnonymous: boolean,
  snapshot: string
): TextPart | null {
  const key = index(contentIndex) ?? null;
  if (key === null && [...item.parts.keys()].some((partKey) => partKey !== null)) return null;
  const anonymous = item.parts.get(null);
  if (key !== null && anonymous) {
    const existing = item.parts.get(key);
    if (!allowAnonymous || item.parts.size > (existing ? 2 : 1)) return null;
    const fragments = [...(existing?.fragments ?? []), ...anonymous.fragments].sort(
      (a, b) => a.order - b.order
    );
    if (!snapshot.startsWith(fragments.map((fragment) => fragment.text).join(""))) return null;
    if (existing) mergeParts(existing, anonymous);
    item.parts.delete(null);
    if (!existing) item.parts.set(key, anonymous);
  }
  let part = item.parts.get(key);
  if (!part) {
    part = { fragments: [], length: 0 };
    item.parts.set(key, part);
  }
  return part;
}
function reconcile(t: TextTracker, part: TextPart, snapshot: string): string {
  if (snapshot.length < part.length) return "";
  let offset = 0;
  for (const fragment of part.fragments) {
    if (!snapshot.startsWith(fragment.text, offset)) return "";
    offset += fragment.text.length;
  }
  const suffix = snapshot.slice(part.length);
  // Compact only at a snapshot, never on each streamed delta (linear retained text).
  part.fragments = snapshot ? [{ text: snapshot, order: t.sequence++ }] : [];
  part.length = snapshot.length;
  return suffix;
}
export function buildTextSnapshotChunk(
  state: TextState,
  text: string,
  field: "content" | "refusal" = "content"
): Record<string, unknown> {
  return {
    id: state.chatId,
    object: "chat.completion.chunk",
    created: state.created,
    model: state.model || "gpt-4",
    choices: [{ index: 0, delta: { [field]: text }, finish_reason: null }],
  };
}
export function recordResponsesTextDelta(state: TextState, identity: Identity, text: string): void {
  const t = tracker(state);
  if (t.closed) return;
  // Missing identity is provenance we do not know yet, not the sole item/part seen so far.
  const item = resolveItem(t, identity, false, { deltaContentIndex: identity.content_index });
  const key = index(identity.content_index) ?? null;
  let part = item.parts.get(key);
  if (!part) {
    part = { fragments: [], length: 0 };
    item.parts.set(key, part);
  }
  part.fragments.push({ text, order: t.sequence++ });
  part.length += text.length;
}
export function reconcileResponsesTextDone(
  state: TextState,
  identity: Identity,
  text: unknown
): string {
  const t = tracker(state);
  if (t.closed || typeof text !== "string" || !text) return "";
  const snapshot: SnapshotTexts = new Map([[index(identity.content_index) ?? null, text]]);
  const item = resolveItem(t, identity, false, { snapshot });
  if (t.anonymous && t.items.size > 1) return "";
  if (index(identity.content_index) === undefined && item.parts.size > 1) return "";
  const part = resolvePart(item, identity.content_index, false, text);
  if (!part) return "";
  part.closed = true;
  return reconcile(t, part, text);
}
export function bindResponsesTextItem(
  state: TextState,
  value: unknown,
  outputIndex: unknown
): void {
  const item = object(value);
  if (item?.type === "message" && item.role === "assistant") {
    resolveItem(tracker(state), { item_id: item.id, output_index: outputIndex });
  }
}
function recoverItem(
  t: TextTracker,
  item: TextItem,
  snapshot: Snapshot
): { text: string; field: "content" | "refusal" }[] {
  if (!Array.isArray(snapshot.content)) return [];
  const parts = snapshot.content
    .map((part, contentIndex) => ({ part: object(part), contentIndex }))
    .filter(
      ({ part }) =>
        (part?.type === "output_text" && typeof part.text === "string") ||
        (part?.type === "refusal" && typeof part.refusal === "string")
    );
  const recovered: { text: string; field: "content" | "refusal" }[] = [];
  for (const { part, contentIndex } of parts) {
    const text = (part.type === "refusal" ? part.refusal : part.text) as string;
    const tracked = resolvePart(item, contentIndex, parts.length === 1, text);
    if (!tracked) continue;
    const suffix = reconcile(t, tracked, text);
    if (suffix)
      recovered.push({ text: suffix, field: part.type === "refusal" ? "refusal" : "content" });
  }
  return recovered;
}
export function synthesizeTextItemSnapshot(
  state: TextState,
  value: unknown,
  outputIndex: unknown
): Record<string, unknown>[] {
  const t = tracker(state);
  const snapshot = object(value);
  if (t.closed || snapshot?.type !== "message" || snapshot.role !== "assistant") return [];
  const item = resolveItem(
    t,
    { item_id: snapshot.id, output_index: outputIndex },
    t.items.size === 1 && !!t.anonymous,
    { snapshot: messageTexts(snapshot) }
  );
  item.closed = true;
  if (t.anonymous && t.items.size > 1) return [];
  return recoverItem(t, item, snapshot).map(({ text, field }) =>
    buildTextSnapshotChunk(state, text, field)
  );
}
// Key by the original output position so callers can interleave text with tool snapshots.
export function recoverTextSnapshotsByOutputIndex(
  state: TextState,
  output: unknown
): Map<number, Record<string, unknown>[]> {
  const recovered = new Map<number, Record<string, unknown>[]>();
  const t = tracker(state);
  if (t.closed) return recovered;
  const items = (Array.isArray(output) ? output : [])
    .map((value, position) => ({
      snapshot: object(value),
      outputIndex: position,
    }))
    .filter(({ snapshot }) => snapshot?.type === "message" && snapshot.role === "assistant");
  // Bind all identities before recovering anything: an anonymous prefix cannot be
  // assigned to the first of multiple messages merely because it was visited first.
  const resolved = items.map(({ snapshot, outputIndex }) => ({
    snapshot,
    outputIndex,
    item: resolveItem(t, { item_id: snapshot.id, output_index: outputIndex }, items.length === 1, {
      snapshot: messageTexts(snapshot),
    }),
  }));
  if (t.anonymous && t.items.size > 1) return recovered;
  for (const { snapshot, item, outputIndex } of resolved) {
    recovered.set(
      outputIndex,
      recoverItem(t, item, snapshot).map(({ text, field }) =>
        buildTextSnapshotChunk(state, text, field)
      )
    );
  }
  return recovered;
}
export function closeResponsesTextSnapshots(state: TextState): void {
  const t = tracker(state);
  t.closed = true;
  t.items.clear();
  t.byId.clear();
  t.byIndex.clear();
  t.anonymous = undefined;
}
