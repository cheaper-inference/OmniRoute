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

export function recoveredBody(seq: string, rows: readonly RecoveredTranscriptRow[]): string | null {
  const found = rows.find(
    (row) => row.seq === seq && typeof row.body === "string" && row.body !== ""
  );
  return found && typeof found.body === "string" ? found.body : null;
}

export async function fillOmittedBodies<T extends OmittedTranscriptRow>(
  rows: readonly T[],
  list: (query: { beforeSeq: string; limit: 1 }) => Promise<readonly RecoveredTranscriptRow[]>
): Promise<T[]> {
  const filled: T[] = [];
  for (const row of rows) {
    if (typeof row.body === "string" && row.body !== "") {
      filled.push(row);
      continue;
    }
    if (row.bodyOmitted !== true || typeof row.seq !== "string") {
      filled.push(row);
      continue;
    }
    const query = omittedRecoveryQuery(row.seq);
    if (!query) {
      filled.push(row);
      continue;
    }
    const recovered = await list(query);
    const body = recoveredBody(row.seq, recovered);
    filled.push(body ? { ...row, body, bodyOmitted: false } : row);
  }
  return filled;
}

export function blobReadPaths(hashes: readonly string[]): string[] {
  return [...new Set(hashes.filter((hash) => /^[A-Za-z0-9_-]{16,128}$/.test(hash)))].map(
    (hash) => `blobs/${hash}`
  );
}

export async function fillBlobBodies<T extends OmittedTranscriptRow>(
  rows: readonly T[],
  readBlob: (hash: string) => Promise<string | null>
): Promise<T[]> {
  const filled: T[] = [];
  for (const row of rows) {
    if (typeof row.body === "string" && row.body !== "") {
      filled.push(row);
      continue;
    }
    if (typeof row.blobHash !== "string") {
      filled.push(row);
      continue;
    }
    const body = await readBlob(row.blobHash);
    filled.push(body ? { ...row, body } : row);
  }
  return filled;
}
