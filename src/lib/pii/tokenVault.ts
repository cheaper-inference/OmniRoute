/**
 * Reversible PII Token Vault
 *
 * Provides bidirectional pseudonymization:
 * 1. Inbound: Replaces detected sensitive PII values with unique surrogate tokens (e.g. <<PII_EMAIL_1>>).
 * 2. Outbound: Speculatively buffers and detokenizes SSE chunks in real time (Zero-TTFT), and detokenizes
 *    non-streaming JSON payloads before sending them back to the client.
 *
 * Values are retained strictly in-memory with short TTL (default: 120s) and LRU eviction.
 * Zero PII is persisted to disk or upstream provider logs.
 *
 * @module lib/pii/tokenVault
 */

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
}

export class TokenVaultManager {
  private static instance: TokenVaultManager;
  private vault: Map<string, VaultItem>;
  private valToToken: Map<string, string>;
  private seq: number;
  private maxEntries: number;
  private ttlMs: number;

  constructor(options?: TokenVaultOptions) {
    this.vault = new Map();
    this.valToToken = new Map();
    this.seq = 0;
    const envMax = typeof process !== "undefined" ? process.env?.PII_VAULT_MAX_ENTRIES : undefined;
    const envTtl = typeof process !== "undefined" ? process.env?.PII_VAULT_TTL_MS : undefined;
    this.maxEntries = options?.maxEntries ?? (parseInt(envMax || "", 10) || 5000);
    this.ttlMs = options?.ttlMs ?? (parseInt(envTtl || "", 10) || 120000);

    // Periodic sweep for expired items without holding Node.js event loop
    const timer = setInterval(() => this.sweep(), 30000);
    if (typeof timer === "object" && timer !== null && typeof (timer as any).unref === "function") {
      (timer as any).unref();
    }
  }

  public static getInstance(): TokenVaultManager {
    const globalObj = globalThis as unknown as { __omniroute_token_vault_manager__?: TokenVaultManager };
    if (!globalObj.__omniroute_token_vault_manager__) {
      globalObj.__omniroute_token_vault_manager__ = new TokenVaultManager();
    }
    return globalObj.__omniroute_token_vault_manager__;
  }

  /**
   * Generates or retrieves an existing surrogate token for a given value.
   * If value is already tokenized, extends its TTL.
   */
  public getOrCreateToken(name: string, val: string): string {
    const existingToken = this.valToToken.get(val);
    if (existingToken) {
      const item = this.vault.get(existingToken);
      if (item) {
        item.exp = Date.now() + this.ttlMs;
        return existingToken;
      }
    }

    this.seq = (this.seq + 1) % 1000000000;
    const cleanName = name.replace(/[^A-Za-z0-9_]/g, "_").toUpperCase();
    const token = `<<PII_${cleanName}_${this.seq}>>`;

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

  public hasTokens(): boolean {
    return this.vault.size > 0;
  }

  public clear(): void {
    this.vault.clear();
    this.valToToken.clear();
    this.seq = 0;
  }

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
 * Escapes replacement strings so they remain valid inside JSON string fields.
 */
export function safeJsonEscape(val: string): string {
  return JSON.stringify(val).slice(1, -1);
}



/**
 * Creates a zero-TTFT speculatively buffered TransformStream for SSE detokenization.
 * Emits raw chunks immediately unless an opening '<' token marker prefix is detected.
 */
export function createDetokenizingStream(): TransformStream<Uint8Array | string, Uint8Array> {
  const dec = new TextDecoder("utf-8");
  const enc = new TextEncoder();
  const vault = TokenVaultManager.getInstance();
  let pending = "";
  const MAX_TOKEN_LEN = 48;

  return new TransformStream({
    transform(chunk, controller) {
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
      if (lastLt !== -1 && (pending.length - lastLt) < MAX_TOKEN_LEN && !pending.slice(lastLt).includes(">>")) {
        if (lastLt > 0 && pending[lastLt - 1] === "<") {
          lastLt--;
        }
        let toEmit = pending.slice(0, lastLt);
        pending = pending.slice(lastLt);

        if (toEmit.length > 0) {
          if (toEmit.includes("<<PII_") || toEmit.includes("<<RU_")) {
            toEmit = toEmit.replace(/(<<(?:PII|RU)_[A-Z0-9_]+_\d+>>)/g, (match) => {
              const val = vault.get(match);
              return val ? safeJsonEscape(val) : match;
            });
          }
          controller.enqueue(enc.encode(toEmit));
        }
      } else {
        let toEmit = pending;
        pending = "";
        if (toEmit.includes("<<PII_") || toEmit.includes("<<RU_")) {
          toEmit = toEmit.replace(/(<<(?:PII|RU)_[A-Z0-9_]+_\d+>>)/g, (match) => {
            const val = vault.get(match);
            return val ? safeJsonEscape(val) : match;
          });
        }
        controller.enqueue(enc.encode(toEmit));
      }
    },
    flush(controller) {
      if (pending.length > 0) {
        let toEmit = pending;
        if (toEmit.includes("<<PII_") || toEmit.includes("<<RU_")) {
          toEmit = toEmit.replace(/(<<(?:PII|RU)_[A-Z0-9_]+_\d+>>)/g, (match) => {
            const val = vault.get(match);
            return val ? safeJsonEscape(val) : match;
          });
        }
        controller.enqueue(enc.encode(toEmit));
        pending = "";
      }
    }
  });
}

/**
 * Detokenizes non-streaming JSON response payloads before sending to the client.
 */
export function detokenizeResponsePayload<T>(obj: T): T {
  const vault = TokenVaultManager.getInstance();
  if (!obj || !vault.hasTokens()) return obj;

  try {
    let str = JSON.stringify(obj);
    if (str.includes("<<PII_") || str.includes("<<RU_")) {
      str = str.replace(/(<<(?:PII|RU)_[A-Z0-9_]+_\d+>>)/g, (match) => {
        const val = vault.get(match);
        return val ? safeJsonEscape(val) : match;
      });
      return JSON.parse(str) as T;
    }
  } catch (err) {
    console.error("[VAULT-NONSTREAM] Detokenization error:", err);
  }
  return obj;
}
