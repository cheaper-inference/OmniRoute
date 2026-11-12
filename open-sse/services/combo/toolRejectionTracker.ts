/**
 * Soft memory of tool-request rejections per combo target (opt-in: OMNIROUTE_TOOL_REJECTION_DEFER).
 *
 * `supports_tools` is only a declaration. A target that answers 3 distinct tool requests
 * with a provider 400 inside 1 h goes to the back of the walk for tool requests for 6 h.
 * A served tool request clears it. Plain chat never reads this state. In memory only.
 */
import { createHash } from "node:crypto";
import type { ResolvedComboTarget } from "./types.ts";

const REJECTION_THRESHOLD = 3;
const WINDOW_MS = 60 * 60 * 1000;
const DEFER_MS = 6 * 60 * 60 * 1000;
const MAX_TARGETS = 500;

type Entry = { requests: Map<string, number>; deferredUntil: number };
const entries = new Map<string, Entry>();

export function isToolRejectionDeferEnabled(): boolean {
  return process.env.OMNIROUTE_TOOL_REJECTION_DEFER === "true";
}

function keyOf(target: ResolvedComboTarget): string {
  return `${target.provider}|${target.modelStr}`;
}

/** Tool requests only; the digest tells distinct requests apart without keeping content. */
function toolRequestId(body: Record<string, unknown>): string | null {
  const hasTools =
    (Array.isArray(body.tools) && body.tools.length > 0) ||
    (Array.isArray(body.functions) && body.functions.length > 0);
  if (!hasTools) return null;
  const text = JSON.stringify([body.messages ?? body.input ?? null, body.tools ?? body.functions]);
  return createHash("sha256").update(text).digest("hex").slice(0, 16);
}

export function recordToolRejection(target: ResolvedComboTarget, body: Record<string, unknown>) {
  if (!isToolRejectionDeferEnabled()) return;
  const id = toolRequestId(body);
  if (!id) return;
  const now = Date.now();
  const key = keyOf(target);
  const entry = entries.get(key) ?? { requests: new Map(), deferredUntil: 0 };
  for (const [seen, at] of entry.requests) if (now - at > WINDOW_MS) entry.requests.delete(seen);
  entry.requests.set(id, now);
  if (entry.requests.size >= REJECTION_THRESHOLD) entry.deferredUntil = now + DEFER_MS;
  entries.delete(key);
  entries.set(key, entry);
  if (entries.size > MAX_TARGETS) entries.delete(entries.keys().next().value as string);
}

export function recordToolServed(target: ResolvedComboTarget, body: Record<string, unknown>) {
  if (!isToolRejectionDeferEnabled() || !toolRequestId(body)) return;
  entries.delete(keyOf(target));
}

/** Stable reorder: deferred targets move behind the rest. Plain chat keeps its order. */
export function deferToolRejectingTargets<T extends ResolvedComboTarget>(
  targets: T[],
  body: Record<string, unknown>
): T[] {
  if (!isToolRejectionDeferEnabled() || !toolRequestId(body)) return targets;
  const now = Date.now();
  const deferred = (t: T) => (entries.get(keyOf(t))?.deferredUntil ?? 0) > now;
  const ready = targets.filter((t) => !deferred(t));
  return ready.length === targets.length ? targets : [...ready, ...targets.filter(deferred)];
}

export function __resetToolRejectionTrackerForTests(): void {
  entries.clear();
}
