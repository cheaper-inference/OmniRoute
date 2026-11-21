export type OmittedTranscriptRow = {
  seq?: unknown;
  body?: unknown;
  bodyOmitted?: unknown;
  blobHash?: unknown;
};

export type RecoveredTranscriptRow = {
  seq?: unknown;
  body?: unknown;
};

/** The 0.77.0 client re-lists an omitted row as `beforeSeq = seq + 1`, limit 1. */
export function omittedRecoveryQuery(seq: string): { beforeSeq: string; limit: 1 } | null {
  if (!/^(?:0|[1-9][0-9]*)$/.test(seq)) return null;
  try {
    const next = BigInt(seq) + BigInt(1);
    if (next > BigInt("18446744073709551615")) return null;
    return { beforeSeq: next.toString(), limit: 1 };
  } catch {
    return null;
  }
}

function recoveredBody(seq: string, rows: readonly RecoveredTranscriptRow[]): string | null {
  const found = rows.find(
    (row) => row.seq === seq && typeof row.body === "string" && row.body !== ""
  );
  return found && typeof found.body === "string" ? found.body : null;
}

/** How many recovery reads a frame keeps in flight. */
export const RECOVERY_CONCURRENCY = 6;

/**
 * Runs `run` over every item with at most `concurrency` in flight, preserving order.
 * A backlog is throttled by width, not truncated: recovering only part of a frame and
 * advancing the cursor past the rest loses those rows for good, because the service
 * never lists them again.
 */
async function mapLimited<T, R>(
  items: readonly T[],
  concurrency: number,
  run: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = Array.from({ length: items.length });
  let cursor = 0;
  const worker = async () => {
    for (;;) {
      const index = cursor++;
      if (index >= items.length) return;
      results[index] = await run(items[index]);
    }
  };
  const width = Math.max(1, Math.min(concurrency, items.length));
  await Promise.all(Array.from({ length: width }, worker));
  return results;
}

export async function fillOmittedBodies<T extends OmittedTranscriptRow>(
  rows: readonly T[],
  list: (query: { beforeSeq: string; limit: 1 }) => Promise<readonly RecoveredTranscriptRow[]>,
  /** Recovery costs one request per row, so a long backlog is read this many at a time. */
  concurrency = RECOVERY_CONCURRENCY
): Promise<T[]> {
  const filled = [...rows];
  const pending = rows
    .map((row, index) => ({ row, index }))
    .filter(
      ({ row }) =>
        !(typeof row.body === "string" && row.body !== "") &&
        row.bodyOmitted === true &&
        typeof row.seq === "string"
    );
  await mapLimited(pending, concurrency, async ({ row, index }) => {
    const seq = row.seq as string;
    const query = omittedRecoveryQuery(seq);
    if (!query) return;
    const body = recoveredBody(seq, await list(query));
    if (body) filled[index] = { ...row, body, bodyOmitted: false };
  });
  return filled;
}

export function blobReadPaths(hashes: readonly string[]): string[] {
  return [...new Set(hashes.filter((hash) => /^[A-Za-z0-9_-]{16,128}$/.test(hash)))].map(
    (hash) => `blobs/${hash}`
  );
}

export async function fillBlobBodies<T extends OmittedTranscriptRow>(
  rows: readonly T[],
  readBlob: (hash: string) => Promise<string | null>,
  concurrency = RECOVERY_CONCURRENCY
): Promise<T[]> {
  const filled = [...rows];
  const pending = rows
    .map((row, index) => ({ row, index }))
    .filter(
      ({ row }) => !(typeof row.body === "string" && row.body !== "") && typeof row.blobHash === "string"
    );
  await mapLimited(pending, concurrency, async ({ row, index }) => {
    const body = await readBlob(row.blobHash as string);
    if (body) filled[index] = { ...row, body };
  });
  return filled;
}
