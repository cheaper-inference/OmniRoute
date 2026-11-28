import { getCodexOperationScope } from "@omniroute/open-sse/services/codexAccount/fences.ts";
import {
  StaleCodexOperationError,
  type CodexConnectionFence,
} from "@omniroute/open-sse/services/codexAccount/fenceTypes.ts";
import { getDbInstance, rowToCamel } from "./core";
import { decryptConnectionFields } from "./encryption";

export {
  StaleCodexOperationError,
  STALE_CODEX_OPERATION_CODE,
  type CodexConnectionFence,
} from "@omniroute/open-sse/services/codexAccount/fenceTypes.ts";

export {
  getCodexOperationFence,
  runWithCodexConnectionFence,
  bindCodexResponseFence,
  runWithCodexResponseFence,
  isCodexResponseCurrent,
} from "@omniroute/open-sse/services/codexAccount/fences.ts";

type RecordValue = Record<string, unknown>;
function record(value: unknown): RecordValue {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as RecordValue) : {};
}
function currentRow(id: string): RecordValue | null {
  const row = getDbInstance()
    .prepare(
      `
    SELECT c.*, f.owner_epoch AS fence_owner_epoch,
      f.credential_revision AS fence_credential_revision, f.failure_revision AS fence_failure_revision
    FROM provider_connections c JOIN codex_connection_fences f ON f.connection_id = c.id
    WHERE c.id = ? AND c.provider = 'codex'
  `
    )
    .get(id);
  return row ? record(rowToCamel(row)) : null;
}
function fenceFor(row: RecordValue): CodexConnectionFence {
  return Object.freeze({
    connectionId: String(row.id),
    ownerEpoch: String(row.fenceOwnerEpoch),
    credentialRevision: Number(row.fenceCredentialRevision),
    failureRevision: Number(row.fenceFailureRevision),
    connectionBinding: JSON.stringify([row.isActive, row.proxyEnabled, row.perKeyProxyEnabled]),
  });
}
/** Capture BEFORE any resolver/network await and compare to the credentials actually used. */
export function captureCodexConnectionFence(
  credentials: RecordValue,
  id?: string
): CodexConnectionFence | null {
  const connectionId = id ?? String(credentials.connectionId ?? credentials.id ?? "");
  if (!connectionId) return null;
  const row = currentRow(connectionId);
  if (!row) return null; // non-persisted/synthetic credentials keep their existing contract
  const current = record(decryptConnectionFields({ ...row }));
  const suppliedData = record(credentials.providerSpecificData);
  const currentData = record(current.providerSpecificData);
  for (const key of ["accessToken", "refreshToken", "email", "authType", "projectId"] as const) {
    if (Object.hasOwn(credentials, key) && (credentials[key] ?? null) !== (current[key] ?? null)) {
      throw new StaleCodexOperationError();
    }
  }
  for (const key of ["workspaceId", "chatgptUserId"]) {
    if ((suppliedData[key] ?? null) !== (currentData[key] ?? null))
      throw new StaleCodexOperationError();
  }
  return fenceFor(row);
}
/** Owner-only preflight for passive reads; never authorizes a dispatch or write by itself. */
export function captureCodexConnectionOwnerFence(
  credentials: RecordValue,
  id?: string
): CodexConnectionFence | null {
  const owner = { ...credentials };
  delete owner.accessToken;
  delete owner.refreshToken;
  return captureCodexConnectionFence(owner, id);
}
/** Adopt only a current synchronized token for the same uninterrupted owner/binding. */
export function adoptCodexConnectionFence(
  previous: CodexConnectionFence | null,
  credentials: RecordValue,
  adopted: RecordValue,
  id?: string
): CodexConnectionFence | null {
  const current = captureCodexConnectionFence(adopted, id);
  if (
    previous &&
    (!current ||
      current.ownerEpoch !== previous.ownerEpoch ||
      current.failureRevision !== previous.failureRevision ||
      current.connectionBinding !== previous.connectionBinding ||
      (current.credentialRevision !== previous.credentialRevision &&
        (!adopted.accessToken || adopted.accessToken === credentials.accessToken)))
  )
    throw new StaleCodexOperationError();
  return current;
}
/** Internal durable version read; callers bind this to their own write inside its transaction. */
export function readCodexQuotaOwner(id: string): { epoch: string; replaced: boolean } | null {
  const row = getDbInstance()
    .prepare(
      "SELECT owner_epoch, owner_revision FROM codex_connection_fences WHERE connection_id = ?"
    )
    .get(id) as { owner_epoch: string; owner_revision: number } | undefined;
  return row ? { epoch: row.owner_epoch, replaced: row.owner_revision > 0 } : null;
}
export function readCodexConnectionFence(id: string): CodexConnectionFence | null {
  const row = currentRow(id);
  return row ? fenceFor(row) : null;
}
export function isCodexConnectionFenceCurrent(
  fence: CodexConnectionFence,
  recovery = false
): boolean {
  const row = currentRow(fence.connectionId);
  return (
    !!row &&
    row.fenceOwnerEpoch === fence.ownerEpoch &&
    Number(row.fenceCredentialRevision) === fence.credentialRevision &&
    (!recovery || Number(row.fenceFailureRevision) === fence.failureRevision)
  );
}
/** Call inside the SAME synchronous DB transaction as the associated mutation. */
export function mayWriteCodexConnection(id: string): boolean {
  const operation = getCodexOperationScope();
  return (
    !operation ||
    (operation.fence.connectionId === id &&
      isCodexConnectionFenceCurrent(operation.fence, operation.recovery))
  );
}
export function withCodexConnectionWrite<T>(id: string, write: () => T): T | null {
  return getDbInstance().transaction(() => (mayWriteCodexConnection(id) ? write() : null))();
}
export function assertCodexOperationCurrent(id: string): void {
  if (!mayWriteCodexConnection(id)) throw new StaleCodexOperationError();
}
