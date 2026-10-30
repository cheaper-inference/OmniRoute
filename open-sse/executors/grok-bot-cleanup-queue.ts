import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * Persistent retry queue for remote Grok Bot agent cleanup (spec step 13).
 * Both the executor (producer: enqueue on delete failure / create timeout;
 * per-request drain before a new conversation) and the boot sweeper
 * (consumer: request-independent retry + terminal-resolution policy) share
 * this module so exactly one on-disk format exists.
 */

export type PendingCleanup = {
  connectionId?: string | null;
  agentId?: string;
  rowId?: string;
  createdAt: string;
};

export function queueFile(): string {
  const dir = process.env.DATA_DIR ?? os.tmpdir();
  return path.join(dir, "grok-bot-pending-cleanups.json");
}

export function readQueue(): PendingCleanup[] {
  try {
    const raw = fs.readFileSync(queueFile(), "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeQueue(items: PendingCleanup[]): void {
  const file = queueFile();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(items, null, 2));
}

export function removeFromQueue(target: PendingCleanup): void {
  // Synchronous read-filter-write: no await interleaves inside this section,
  // so a concurrent enqueue in the same process lands in the fresh read and
  // survives. Matching is by value (agentId + createdAt uniquely identify an
  // enqueued item; the on-disk copy is a deserialized clone, not a reference).
  const items = readQueue();
  const rest = items.filter(
    (i) => !(i.agentId === target.agentId && i.createdAt === target.createdAt)
  );
  if (rest.length !== items.length) {
    writeQueue(rest);
  }
}

export function enqueueCleanup(item: PendingCleanup): void {
  const q = readQueue();
  q.push(item);
  writeQueue(q);
}
