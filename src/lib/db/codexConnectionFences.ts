import { AsyncLocalStorage } from "node:async_hooks";
import { getDbInstance, rowToCamel } from "./core";
import { decryptConnectionFields } from "./encryption";

type RecordValue = Record<string, unknown>;
export interface CodexConnectionFence {
  readonly connectionId: string;
  readonly ownerEpoch: string;
  readonly credentialRevision: number;
  readonly failureRevision: number;
  readonly connectionBinding: string;
}
type Operation = Readonly<{ fence: CodexConnectionFence; recovery: boolean }>;
// Immutable per-operation scopes, never a mutable connection-id -> current-owner map.
const operations = new AsyncLocalStorage<Operation>();
const responses = new WeakMap<Response, Operation>();
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
export class StaleCodexOperationError extends Error {
  readonly status = 409;
  readonly code = "codex_connection_changed";
  constructor() {
    super(
      "Codex connection changed while the operation was in flight; retry with current credentials."
    );
  }
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
export function getCodexOperationFence(id: string): CodexConnectionFence | null {
  const operation = operations.getStore();
  return operation?.fence.connectionId === id ? operation.fence : null;
}
/** Call inside the SAME synchronous DB transaction as the associated mutation. */
export function mayWriteCodexConnection(id: string): boolean {
  const operation = operations.getStore();
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
export function runWithCodexConnectionFence<T>(
  fence: CodexConnectionFence | null,
  work: () => T,
  recovery = false
): T {
  return fence ? operations.run(Object.freeze({ fence, recovery }), work) : work();
}
export function bindCodexResponseFence(
  response: Response,
  fence: CodexConnectionFence | null
): void {
  if (fence && !responses.has(response))
    responses.set(response, Object.freeze({ fence, recovery: false }));
}
export function inheritCodexResponseFence(from: Response, to: Response): Response {
  const operation = responses.get(from);
  if (operation) responses.set(to, operation);
  return to;
}
export function runWithCodexResponseFence<T>(
  response: Response,
  work: () => T,
  recovery = false
): T {
  const operation = responses.get(response);
  return operation ? runWithCodexConnectionFence(operation.fence, work, recovery) : work();
}
export function bindCodexResponseCallbacks<T extends object>(response: Response, callbacks: T): T {
  return new Proxy(callbacks, {
    get(target, key, receiver) {
      const value: unknown = Reflect.get(target, key, receiver);
      if (typeof value !== "function") return value;
      return (...args: unknown[]) => {
        if (!isCodexResponseCurrent(response)) return;
        return runWithCodexResponseFence(response, () => Reflect.apply(value, target, args));
      };
    },
  });
}
export function isCodexResponseCurrent(response: Response, recovery = false): boolean {
  const operation = responses.get(response);
  return !operation || isCodexConnectionFenceCurrent(operation.fence, recovery);
}
