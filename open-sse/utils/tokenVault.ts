/**
 * Reversible PII Token Vault
 *
 * Provides bidirectional pseudonymization:
 * 1. Inbound: Replaces detected sensitive PII values with unique surrogate tokens (e.g. <<PII_EMAIL_A1B2C3D4_1>>).
 * 2. Outbound: Speculatively buffers and detokenizes SSE chunks in real time (Zero-TTFT), and detokenizes
 *    non-streaming JSON payloads before sending them back to the client.
 *
 * Values are retained strictly in-memory with short TTL (default: 120s) and LRU eviction.
 * Zero PII is persisted to disk or upstream provider logs.
 *
 * @module lib/pii/tokenVault
 */

import { AsyncLocalStorage } from "node:async_hooks";
import crypto from "node:crypto";

/**
 * Checks whether Reversible PII Token Vault is enabled in settings or environment.
 */
export function isReversibleVaultEnabled(): boolean {
  if (typeof process !== "undefined" && process.env) {
    const val = process.env.PII_REVERSIBLE_VAULT_ENABLED;
    return val === "true" || val === "1";
  }
  return false;
}

export interface VaultItem {
  val: string;
  exp: number;
}

export interface TokenVaultOptions {
  maxEntries?: number;
  ttlMs?: number;
  nonce?: string;
  sweepIntervalMs?: number;
}

/**
 * Resolves an integer environment variable with fallback value.
 *
 * @param envVarName Name of the environment variable.
 * @param defaultValue Fallback value if variable is missing or invalid.
 */
export function resolveVaultEnvInt(envVarName: string, defaultValue: number): number {
  if (typeof process !== "undefined" && process.env) {
    const val = process.env[envVarName];
    if (val) {
      const parsed = parseInt(val, 10);
      if (!Number.isNaN(parsed) && parsed > 0) {
        return parsed;
      }
    }
  }
  return defaultValue;
}

/**
 * Safely unrefs a NodeJS or browser timer to avoid keeping the event loop alive.
 *
 * @param timer Timer object or numeric ID.
 */
export function unrefTimer(timer: unknown): void {
  if (timer && typeof timer === "object" && typeof (timer as { unref?: () => void }).unref === "function") {
    (timer as { unref: () => void }).unref();
  }
}

/**
 * Generates an 8-character uppercase hex nonce for per-instance token isolation.
 */
export function generateVaultNonce(): string {
  return crypto.randomBytes(4).toString("hex").toUpperCase();
}

/**
 * In-memory Reversible Token Vault with per-instance nonce, LRU eviction, and TTL sweep.
 */
export class TokenVault {
  protected vault: Map<string, VaultItem>;
  protected valToToken: Map<string, string>;
  protected seq: number;
  protected maxEntries: number;
  protected ttlMs: number;
  protected nonce: string;
  protected cleanupTimer?: ReturnType<typeof setInterval>;

  /**
   * Initializes a new TokenVault instance.
   *
   * @param options Configuration options.
   */
  constructor(options?: TokenVaultOptions) {
    this.vault = new Map();
    this.valToToken = new Map();
    this.seq = 0;
    this.maxEntries = options?.maxEntries ?? resolveVaultEnvInt("PII_VAULT_MAX_ENTRIES", 5000);
    this.ttlMs = options?.ttlMs ?? resolveVaultEnvInt("PII_VAULT_TTL_MS", 120000);
    this.nonce = options?.nonce || generateVaultNonce();

    const sweepInterval = options?.sweepIntervalMs ?? 30000;
    this.cleanupTimer = setInterval(() => this.sweep(), sweepInterval);
    unrefTimer(this.cleanupTimer);
  }

  /**
   * Returns the per-instance nonce string.
   */
  public getNonce(): string {
    return this.nonce;
  }

  /**
   * Generates or retrieves an existing surrogate token for a given value.
   * Refreshes TTL and performs an LRU touch on hit.
   *
   * @param name Entity type name (e.g. "EMAIL", "PHONE").
   * @param val Raw sensitive string value.
   */
  public getOrCreateToken(name: string, val: string): string {
    const existingToken = this.valToToken.get(val);
    if (existingToken) {
      const item = this.vault.get(existingToken);
      if (item) {
        item.exp = Date.now() + this.ttlMs;
        // LRU touch: delete and re-insert to move to the end of Map iteration order
        this.vault.delete(existingToken);
        this.vault.set(existingToken, item);
        return existingToken;
      }
    }

    this.seq = (this.seq + 1) % 1000000000;
    const cleanName = name.replace(/[^A-Za-z0-9_]/g, "_").toUpperCase();
    const token = `<<PII_${cleanName}_${this.nonce}_${this.seq}>>`;

    // LRU eviction if capacity exceeded
    if (this.vault.size >= this.maxEntries) {
      const oldestKey = this.vault.keys().next().value;
      if (oldestKey) {
        const oldestVal = this.vault.get(oldestKey)?.val;
        if (oldestVal) this.valToToken.delete(oldestVal);
        this.vault.delete(oldestKey);
      }
    }

    this.vault.set(token, { val, exp: Date.now() + this.ttlMs });
    this.valToToken.set(val, token);
    return token;
  }

  /**
   * Retrieves original value for a given token if not expired.
   *
   * @param token Surrogate token string.
   */
  public get(token: string): string | undefined {
    const item = this.vault.get(token);
    if (!item) return undefined;
    if (item.exp < Date.now()) {
      this.vault.delete(token);
      this.valToToken.delete(item.val);
      return undefined;
    }
    return item.val;
  }

  /**
   * Checks whether this vault contains any active tokens.
   */
  public hasTokens(): boolean {
    return this.vault.size > 0;
  }

  /**
   * Returns current count of stored tokens.
   */
  public get size(): number {
    return this.vault.size;
  }

  /**
   * Clears all stored tokens.
   */
  public clear(): void {
    this.vault.clear();
    this.valToToken.clear();
    this.seq = 0;
  }

  /**
   * Disposes of interval timers and clears internal maps to prevent memory leaks.
   */
  public dispose(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = undefined;
    }
    this.vault.clear();
    this.valToToken.clear();
  }

  /**
   * Sweeps expired items from vault.
   */
  public sweep(): void {
    const now = Date.now();
    for (const [k, v] of this.vault.entries()) {
      if (v.exp < now) {
        this.valToToken.delete(v.val);
        this.vault.delete(k);
      }
    }
  }
}

/**
 * Legacy TokenVaultManager singleton wrapper for backwards compatibility.
 */
export class TokenVaultManager extends TokenVault {
  public static getInstance(): TokenVaultManager {
    const globalObj = globalThis as unknown as {
      __omniroute_token_vault_manager__?: TokenVaultManager;
    };
    if (!globalObj.__omniroute_token_vault_manager__) {
      globalObj.__omniroute_token_vault_manager__ = new TokenVaultManager();
    }
    return globalObj.__omniroute_token_vault_manager__;
  }

  public static resetInstance(): void {
    const globalObj = globalThis as unknown as {
      __omniroute_token_vault_manager__?: TokenVaultManager;
    };
    if (globalObj.__omniroute_token_vault_manager__) {
      globalObj.__omniroute_token_vault_manager__.dispose();
      delete globalObj.__omniroute_token_vault_manager__;
    }
  }
}

/**
 * AsyncLocalStorage container for request-scoped TokenVault instances.
 */
export const tokenVaultStorage = new AsyncLocalStorage<TokenVault>();

/**
 * Runs a callback within the context of a scoped TokenVault.
 *
 * @param vault TokenVault instance for current execution context.
 * @param fn Callback function.
 */
export function runWithTokenVault<T>(vault: TokenVault, fn: () => T): T {
  return tokenVaultStorage.run(vault, fn);
}

/**
 * Gets the active request-scoped TokenVault from AsyncLocalStorage.
 */
export function getActiveTokenVault(): TokenVault | undefined {
  return tokenVaultStorage.getStore();
}

/**
 * Resolves the TokenVault to use: explicitVault if provided, otherwise active context vault.
 *
 * @param explicitVault Optional explicit TokenVault instance.
 */
export function resolveVault(explicitVault?: TokenVault): TokenVault | undefined {
  if (explicitVault) {
    return explicitVault;
  }
  return getActiveTokenVault();
}

/**
 * Escapes replacement strings so they remain valid inside JSON string fields.
 *
 * @param val String value to escape.
 */
export function safeJsonEscape(val: string): string {
  return JSON.stringify(val).slice(1, -1);
}

/**
 * Regex matching surrogate PII and RU tokens.
 */
const TOKEN_REGEX = /(<<(?:PII|RU)_[A-Za-z0-9_]+>>)/g;

/**
 * Replaces surrogate tokens in text with original values from vault.
 *
 * @param text Input text containing tokens.
 * @param vault Active TokenVault instance.
 */
function replaceTokensInText(text: string, vault: TokenVault): string {
  if (!text.includes("<<PII_") && !text.includes("<<RU_")) {
    return text;
  }
  return text.replace(TOKEN_REGEX, (match) => {
    const val = vault.get(match);
    return val !== undefined ? safeJsonEscape(val) : match;
  });
}

/**
 * Creates a zero-TTFT speculatively buffered TransformStream for SSE detokenization.
 * Emits raw chunks immediately unless an opening '<' token marker prefix is detected.
 *
 * @param explicitVault Optional explicit TokenVault instance.
 */
export function createDetokenizingStream(
  explicitVault?: TokenVault
): TransformStream<Uint8Array | string, Uint8Array> {
  const dec = new TextDecoder("utf-8");
  const enc = new TextEncoder();
  const vault = resolveVault(explicitVault);
  let pending = "";
  const MAX_TOKEN_LEN = 64;

  return new TransformStream({
    transform(chunk, controller) {
      if (!vault) {
        controller.enqueue(typeof chunk === "string" ? enc.encode(chunk) : chunk);
        return;
      }

      const text = typeof chunk === "string" ? chunk : dec.decode(chunk, { stream: true });
      pending += text;

      // Fast path: emit immediately if no surrogate prefix exists
      if (!pending.includes("<")) {
        controller.enqueue(enc.encode(pending));
        pending = "";
        return;
      }

      // Check if tail has unclosed '<' or '<<' that could be part of an incoming token
      let lastLt = pending.lastIndexOf("<");
      if (
        lastLt !== -1 &&
        pending.length - lastLt < MAX_TOKEN_LEN &&
        !pending.slice(lastLt).includes(">>")
      ) {
        if (lastLt > 0 && pending[lastLt - 1] === "<") {
          lastLt--;
        }
        let toEmit = pending.slice(0, lastLt);
        pending = pending.slice(lastLt);

        if (toEmit.length > 0) {
          toEmit = replaceTokensInText(toEmit, vault);
          controller.enqueue(enc.encode(toEmit));
        }
      } else {
        let toEmit = pending;
        pending = "";
        toEmit = replaceTokensInText(toEmit, vault);
        controller.enqueue(enc.encode(toEmit));
      }
    },
    flush(controller) {
      if (pending.length > 0) {
        let toEmit = pending;
        if (vault) {
          toEmit = replaceTokensInText(toEmit, vault);
        }
        controller.enqueue(enc.encode(toEmit));
        pending = "";
      }
    },
  });
}

/**
 * Detokenizes non-streaming JSON response payloads before sending to the client.
 *
 * @param obj Response body payload object.
 * @param explicitVault Optional explicit TokenVault instance.
 */
export function detokenizeResponsePayload<T>(obj: T, explicitVault?: TokenVault): T {
  const vault = resolveVault(explicitVault);
  if (!obj || !vault || !vault.hasTokens()) return obj;

  try {
    let str = JSON.stringify(obj);
    if (str.includes("<<PII_") || str.includes("<<RU_")) {
      str = str.replace(TOKEN_REGEX, (match) => {
        const val = vault.get(match);
        return val !== undefined ? safeJsonEscape(val) : match;
      });
      return JSON.parse(str) as T;
    }
  } catch (_err) {
    // Fail-closed: return unmodified payload on parsing or replacement error
  }
  return obj;
}
