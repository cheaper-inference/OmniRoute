type FalInput = Record<string, unknown>;
export type FalDraft = {
  endpoint_id: string;
  connection_id: string;
  transport: string;
  input: FalInput;
};
export type FalReceipt = {
  key: string;
  fingerprint: string;
  endpoint: string;
  connection: string;
  transport: string;
  jobId?: string;
  status: string;
};
export type FalSubmission = FalReceipt & { draft?: FalDraft };

export function parseFalEditor(text: string): { value: FalInput; valid: true } | { valid: false } {
  try {
    const value: unknown = JSON.parse(text);
    if (value && typeof value === "object" && !Array.isArray(value))
      return { valid: true, value: value as FalInput };
  } catch {
    // Keep the original editor text available for correction.
  }
  return { valid: false };
}

function stable(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stable).join(",")}]`;
  if (value && typeof value === "object")
    return `{${Object.entries(value)
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
      .map(([k, v]) => `${JSON.stringify(k)}:${stable(v)}`)
      .join(",")}}`;
  return JSON.stringify(value);
}
export async function falFingerprint(draft: FalDraft): Promise<string> {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(stable(draft)));
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, "0")).join("");
}

const receiptStorageSlot = "fal-submission-receipts-v2";
export function falReceiptSnapshot(): string {
  try {
    return sessionStorage.getItem(receiptStorageSlot) ?? "[]";
  } catch {
    return "[]";
  }
}
export function subscribeFalReceipts(listener: () => void) {
  window.addEventListener("fal-receipts", listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener("fal-receipts", listener);
    window.removeEventListener("storage", listener);
  };
}
export function readFalReceipts(snapshot = falReceiptSnapshot()): FalReceipt[] {
  try {
    const value: unknown = JSON.parse(snapshot);
    if (!Array.isArray(value)) return [];
    return value.filter(
      (r): r is FalReceipt =>
        r &&
        typeof r.key === "string" &&
        typeof r.fingerprint === "string" &&
        typeof r.endpoint === "string" &&
        typeof r.connection === "string" &&
        typeof r.transport === "string" &&
        typeof r.status === "string"
    );
  } catch {
    return [];
  }
}
export function persistFalReceipt(receipt: FalSubmission): FalReceipt[] {
  // Never persist the payload: it can contain private images, audio or signed references.
  const { key, fingerprint, endpoint, connection, transport, jobId, status } = receipt;
  const records = [
    { key, fingerprint, endpoint, connection, transport, jobId, status },
    ...readFalReceipts().filter((r) => r.key !== key),
  ].slice(0, 20);
  try {
    sessionStorage.setItem(receiptStorageSlot, JSON.stringify(records));
    window.dispatchEvent(new Event("fal-receipts"));
  } catch {
    // The in-memory snapshot still allows recovery when browser storage is unavailable.
  }
  return records;
}
