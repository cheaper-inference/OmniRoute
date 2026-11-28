/**
 * freebuff/deviceKey.ts - Ed25519 request attestation of the official client.
 *
 * Every state-changing call the official Freebuff client makes carries
 * `x-freebuff-device-key`, `x-freebuff-device-ts` and `x-freebuff-device-sig`.
 * The signature covers a canonical payload:
 *
 *   freebuff-device-v1\n<METHOD>\n<pathname>\n<timestampMs>\n<sha256(body)>\n<fetchId>
 *
 * The format was verified against a captured HAR: recomputing it from the
 * request line, the `x-freebuff-catalog-fetch` header and the `x-freebuff-device-ts`
 * header reproduces the captured signatures with the public key stored in
 * `device-key.json`.
 *
 * Keys are Ed25519: public = base64url(raw 32 bytes), private = base64url(PKCS#8).
 * A key id is obtained with `POST /api/v1/freebuff/device-keys` and cached per
 * `origin + account` scope, mirroring the client's `registrations` map.
 */

import {
  createHash,
  createPrivateKey,
  generateKeyPairSync,
  randomUUID,
  sign as signEd25519,
  type KeyObject,
} from "node:crypto";
import { chmod, mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { opaqueTokenFingerprint } from "../../utils/opaqueTokenFingerprint.ts";
import { FREEBUFF_HEADERS } from "./identity.ts";

export const FREEBUFF_DEVICE_SIGNATURE_VERSION = "freebuff-device-v1";

export interface FreebuffDeviceRecord {
  version: 1;
  /** base64url of the raw Ed25519 public key (32 bytes). */
  publicKey: string;
  /** base64url of the PKCS#8 DER private key. */
  privateKey: string;
  /** `<origin> user:<id>` or `<origin> token:<hash>` -> key id. */
  registrations: Record<string, string>;
}

export interface FreebuffDeviceStore {
  readonly persistable: boolean;
  load(): Promise<FreebuffDeviceRecord | null>;
  save(record: FreebuffDeviceRecord): Promise<void>;
}

export type FreebuffDeviceRegistrar = (publicKey: string, token: string) => Promise<string | null>;

export function base64UrlEncode(value: Buffer): string {
  return value.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function base64UrlDecode(value: string): Buffer {
  return Buffer.from(value.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}

export function sha256Hex(value: string | Uint8Array): string {
  return createHash("sha256").update(value).digest("hex");
}

export function buildDeviceSignaturePayload(input: {
  method: string;
  path: string;
  timestampMs: number;
  bodySha256: string;
  fetchId?: string;
}): string {
  return [
    FREEBUFF_DEVICE_SIGNATURE_VERSION,
    input.method.toUpperCase(),
    input.path,
    String(input.timestampMs),
    input.bodySha256,
    input.fetchId ?? "",
  ].join("\n");
}

/** Scope a key id is registered under (client `scopeFor`). */
export function deviceScopeKey(origin: string, accountId?: string | null, token?: string): string {
  const host = origin.replace(/\/+$/, "");
  if (accountId?.trim()) return `${host} user:${accountId.trim()}`;
  return `${host} token:${opaqueTokenFingerprint(token ?? "", { length: 32 })}`;
}

/** First registration recorded for `origin`, regardless of account. */
export function pickOriginRegistration(
  record: FreebuffDeviceRecord,
  origin: string
): string | null {
  const prefix = `${origin.replace(/\/+$/, "")} `;
  for (const [scope, keyId] of Object.entries(record.registrations)) {
    if (scope.startsWith(prefix) && keyId) return keyId;
  }
  return null;
}

export function validateDeviceRecord(value: unknown): FreebuffDeviceRecord | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const raw = value as Record<string, unknown>;
  if (raw.version !== 1) return null;
  if (typeof raw.publicKey !== "string" || !raw.publicKey) return null;
  if (typeof raw.privateKey !== "string" || !raw.privateKey) return null;
  const registrations: Record<string, string> = {};
  if (
    raw.registrations &&
    typeof raw.registrations === "object" &&
    !Array.isArray(raw.registrations)
  ) {
    for (const [scope, keyId] of Object.entries(raw.registrations as Record<string, unknown>)) {
      if (typeof keyId === "string" && keyId) registrations[scope] = keyId;
    }
  }
  return { version: 1, publicKey: raw.publicKey, privateKey: raw.privateKey, registrations };
}

/** Generate a fresh Ed25519 key pair in the on-disk client format. */
export function createDeviceRecord(): FreebuffDeviceRecord {
  const { publicKey, privateKey } = generateKeyPairSync("ed25519");
  const rawPublic = publicKey.export({ type: "spki", format: "der" }).subarray(-32);
  const pkcs8 = privateKey.export({ type: "pkcs8", format: "der" });
  return {
    version: 1,
    publicKey: base64UrlEncode(Buffer.from(rawPublic)),
    privateKey: base64UrlEncode(Buffer.from(pkcs8)),
    registrations: {},
  };
}

function importPrivateKey(record: FreebuffDeviceRecord): KeyObject | null {
  try {
    return createPrivateKey({
      key: base64UrlDecode(record.privateKey),
      format: "der",
      type: "pkcs8",
    });
  } catch {
    return null;
  }
}

/** `x-freebuff-device-*` headers for one request, or `{}` when the key is unusable. */
export function signDeviceRequest(
  record: FreebuffDeviceRecord,
  keyId: string,
  request: { method: string; url: string; body?: string; timestampMs?: number; fetchId?: string }
): Record<string, string> {
  const privateKey = importPrivateKey(record);
  if (!privateKey) return {};
  const timestampMs = request.timestampMs ?? Date.now();
  const payload = buildDeviceSignaturePayload({
    method: request.method,
    path: new URL(request.url).pathname,
    timestampMs,
    bodySha256: sha256Hex(request.body ?? ""),
    fetchId: request.fetchId,
  });
  let signature: Buffer;
  try {
    signature = signEd25519(null, Buffer.from(payload, "utf8"), privateKey);
  } catch {
    return {};
  }
  return {
    [FREEBUFF_HEADERS.deviceKey]: keyId,
    [FREEBUFF_HEADERS.deviceTimestamp]: String(timestampMs),
    [FREEBUFF_HEADERS.deviceSignature]: base64UrlEncode(signature),
  };
}

// ------------------------------- stores -------------------------------

export function createMemoryDeviceStore(
  record: FreebuffDeviceRecord | null = null
): FreebuffDeviceStore {
  let current = record;
  return {
    persistable: true,
    async load() {
      return current;
    },
    async save(next) {
      current = next;
    },
  };
}

/** Read-only view over an existing key file (the official client's own key). */
export function createReadOnlyDeviceStore(filePath: string): FreebuffDeviceStore {
  return {
    persistable: false,
    async load() {
      return loadDeviceKeyFile(filePath);
    },
    async save() {
      throw new Error(`Freebuff device key file is read-only: ${filePath}`);
    },
  };
}

const fileWriteQueues = new Map<string, Promise<void>>();

export class FileDeviceStore implements FreebuffDeviceStore {
  readonly persistable = true;
  constructor(private readonly filePath: string) {}

  async load(): Promise<FreebuffDeviceRecord | null> {
    return loadDeviceKeyFile(this.filePath);
  }

  async save(record: FreebuffDeviceRecord): Promise<void> {
    const target = path.resolve(this.filePath);
    const previous = fileWriteQueues.get(target) ?? Promise.resolve();
    const next = previous
      .catch(() => undefined)
      .then(async () => {
        await mkdir(path.dirname(target), { recursive: true }).catch(() => undefined);
        const tmp = `${target}.${process.pid}.${randomUUID()}.tmp`;
        try {
          await writeFile(tmp, `${JSON.stringify(record)}\n`, { mode: 0o600, flag: "wx" });
          await rename(tmp, target);
          await chmod(target, 0o600).catch(() => undefined);
        } catch (err) {
          await unlink(tmp).catch(() => undefined);
          throw err;
        }
      });
    fileWriteQueues.set(target, next);
    try {
      await next;
    } finally {
      if (fileWriteQueues.get(target) === next) fileWriteQueues.delete(target);
    }
  }
}

export async function loadDeviceKeyFile(filePath: string): Promise<FreebuffDeviceRecord | null> {
  try {
    return validateDeviceRecord(JSON.parse(await readFile(filePath, "utf8")));
  } catch {
    return null;
  }
}

/** `DATA_DIR` / `OMNIROUTE_DATA_DIR`, falling back to `~/.omniroute`. */
export function resolveFreebuffDataDir(): string {
  const configured = process.env.DATA_DIR?.trim() || process.env.OMNIROUTE_DATA_DIR?.trim() || "";
  return configured ? path.resolve(configured) : path.join(os.homedir(), ".omniroute");
}

/** Writable key path used when no official client key is available. */
export function resolveFreebuffDeviceKeyPath(): string {
  return path.join(resolveFreebuffDataDir(), "freebuff", "device-key.json");
}

/** Path of an installed official client's key file (optional read-only reuse). */
export function officialDeviceKeyPath(): string {
  return path.join(os.homedir(), ".config", "manicode", "device-key.json");
}

export interface FreebuffDeviceSignerOptions {
  /** Read-only stores tried first (official client key), then the writable one. */
  externalStores?: FreebuffDeviceStore[];
  writableStore?: FreebuffDeviceStore;
  now?: () => number;
}

/**
 * Resolves the key id for a request scope, registering the key on first use and
 * signing with the correct key. Never throws: an unusable key yields no headers.
 */
export class FreebuffDeviceSigner {
  private readonly externalStores: FreebuffDeviceStore[];
  private readonly writableStore: FreebuffDeviceStore | null;
  private readonly now: () => number;
  private cached: { record: FreebuffDeviceRecord; store: FreebuffDeviceStore } | null = null;
  private loading: Promise<{
    record: FreebuffDeviceRecord;
    store: FreebuffDeviceStore;
  } | null> | null = null;
  private readonly registering = new Map<string, Promise<string | null>>();

  constructor(options: FreebuffDeviceSignerOptions = {}) {
    this.externalStores = options.externalStores ?? [];
    this.writableStore = options.writableStore ?? null;
    this.now = options.now ?? Date.now;
  }

  private async pick(): Promise<{
    record: FreebuffDeviceRecord;
    store: FreebuffDeviceStore;
  } | null> {
    if (this.cached) return this.cached;
    this.loading ??= (async () => {
      for (const store of this.externalStores) {
        const record = await store.load();
        if (record) return { record, store };
      }
      if (this.writableStore) {
        const existing = await this.writableStore.load();
        if (existing) return { record: existing, store: this.writableStore };
        return { record: createDeviceRecord(), store: this.writableStore };
      }
      return null;
    })().then((picked) => {
      this.cached = picked;
      return picked;
    });
    return this.loading;
  }

  private async keyIdFor(
    record: FreebuffDeviceRecord,
    store: FreebuffDeviceStore,
    scope: string,
    origin: string,
    token: string,
    register: FreebuffDeviceRegistrar
  ): Promise<string | null> {
    const existing = record.registrations[scope] ?? pickOriginRegistration(record, origin);
    if (existing) return existing;
    if (!store.persistable) return null;

    const pending = this.registering.get(scope);
    if (pending) return pending;

    const task = (async () => {
      const keyId = await register(record.publicKey, token);
      if (!keyId) return null;
      record.registrations[scope] = keyId;
      await store.save(record).catch(() => undefined);
      return keyId;
    })().finally(() => this.registering.delete(scope));
    this.registering.set(scope, task);
    return task;
  }

  async headers(input: {
    method: string;
    url: string;
    body?: string;
    fetchId?: string;
    origin: string;
    accountId?: string | null;
    token: string;
    register: FreebuffDeviceRegistrar;
  }): Promise<Record<string, string>> {
    try {
      const picked = await this.pick();
      if (!picked) return {};
      const scope = deviceScopeKey(input.origin, input.accountId, input.token);
      const keyId = await this.keyIdFor(
        picked.record,
        picked.store,
        scope,
        input.origin,
        input.token,
        input.register
      );
      if (!keyId) return {};
      return signDeviceRequest(picked.record, keyId, {
        method: input.method,
        url: input.url,
        body: input.body,
        timestampMs: this.now(),
        fetchId: input.fetchId,
      });
    } catch {
      return {};
    }
  }
}
