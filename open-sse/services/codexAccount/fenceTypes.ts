export interface CodexConnectionFence {
  readonly connectionId: string;
  readonly ownerEpoch: string;
  readonly credentialRevision: number;
  readonly failureRevision: number;
  readonly connectionBinding: string;
}

export type CodexFenceOperation = Readonly<{ fence: CodexConnectionFence; recovery: boolean }>;

type Credentials = Record<string, unknown>;

/** The application injects durable checks; the engine never owns a second fence registry. */
export interface CodexFenceStore {
  captureCodexConnectionFence(credentials: Credentials, id?: string): CodexConnectionFence | null;
  captureCodexConnectionOwnerFence(
    credentials: Credentials,
    id?: string
  ): CodexConnectionFence | null;
  adoptCodexConnectionFence(
    previous: CodexConnectionFence | null,
    credentials: Credentials,
    adopted: Credentials,
    id?: string
  ): CodexConnectionFence | null;
  isCodexConnectionFenceCurrent(fence: CodexConnectionFence, recovery?: boolean): boolean;
}

export const STALE_CODEX_OPERATION_CODE = "codex_connection_changed";
export class StaleCodexOperationError extends Error {
  readonly status = 409;
  readonly code = STALE_CODEX_OPERATION_CODE;
  constructor() {
    super(
      "Codex connection changed while the operation was in flight; retry with current credentials."
    );
  }
}
