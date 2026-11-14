/**
 * Reversible PII token vault, scoped to one client request.
 *
 * With PII_REDACTION_ENABLED and PII_REVERSIBLE_VAULT_ENABLED both on, the request-side
 * pii-masker replaces each detected value with a surrogate token such as
 * `<<PII_EMAIL_QWERTYUI_1>>` instead of the irreversible `[EMAIL_REDACTED]` placeholder, and
 * the chat handler swaps the tokens back to the original values on the way out
 * (`requestTokenVaultScope.ts`). The provider, every log written inside the pipeline, the
 * fusion judge and the semantic/idempotency caches only ever see tokens.
 *
 * Design constraints (owner decisions, 2026-11-08):
 * - One vault per client request, created in `handleChat` and handed to the masker
 *   explicitly through the guardrail context. There is no global singleton, so a request can
 *   never resolve another request's token.
 * - A random per-request nonce of 8 uppercase letters. Letters only, so no built-in digit
 *   pattern (cards, phones, IDs) can match inside a token.
 * - Hard limits instead of eviction: once a limit is hit `tokenize()` returns null and the
 *   caller falls back to the irreversible placeholder. A mapping is never dropped mid-request.
 * - No timers. The vault lives until the response is drained, cancelled or errors, then
 *   `dispose()` clears it.
 * - Values never leave through logging: the maps are `#private`, and `toJSON()` / `inspect`
 *   only report the size.
 *
 * @module open-sse/utils/piiTokenVault
 */

import { AsyncLocalStorage } from "node:async_hooks";
import { randomInt } from "node:crypto";
import { inspect } from "node:util";

export const TOKEN_VAULT_LIMITS = Object.freeze({
  maxEntries: 1000,
  maxValueLength: 256,
  maxTotalBytes: 64 * 1024,
});

const NONCE_LENGTH = 8;
const NONCE_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const MAX_TYPE_LABEL = 20;

/** Longest token the grammar allows: `<<PII_` + 40 body characters + `>>`. */
export const MAX_TOKEN_LENGTH = 48;

/** A complete surrogate token. The body is the type label, the nonce and the sequence. */
export const PII_TOKEN_PATTERN = /<<PII_[A-Z0-9_]{1,40}>>/g;

// A string that could still grow into a token: `<`, `<<`, `<<P`, ... `<<PII_ABC>`.
const TOKEN_PREFIX_PATTERN = /^<(?:<(?:P(?:I(?:I(?:_[A-Z0-9_]{0,40}>?)?)?)?)?)?$/;

export type TokenVaultLimits = {
  maxEntries: number;
  maxValueLength: number;
  maxTotalBytes: number;
};

export type TokenVaultStats = {
  minted: number;
  restored: number;
  unresolved: number;
  rejected: number;
};

/** How a restored value is written back: as-is, or escaped for a JSON string fragment. */
export type TokenReplaceMode = "raw" | "json";

function generateNonce(): string {
  let nonce = "";
  for (let i = 0; i < NONCE_LENGTH; i++) nonce += NONCE_ALPHABET[randomInt(NONCE_ALPHABET.length)];
  return nonce;
}

function typeLabel(type: string): string {
  const label = String(type ?? "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, MAX_TYPE_LABEL)
    .replace(/_+$/, "");
  return label || "VALUE";
}

let liveVaults = 0;

/** Number of vaults created and not yet disposed (observability gauge). */
export function getLiveTokenVaultCount(): number {
  return liveVaults;
}

export class RequestTokenVault {
  readonly #nonce: string;
  readonly #limits: TokenVaultLimits;
  readonly #byToken = new Map<string, string>();
  readonly #byValue = new Map<string, string>();
  #seq = 0;
  #bytes = 0;
  #disposed = false;
  #restored = 0;
  #unresolved = 0;
  #rejected = 0;

  constructor(options: { nonce?: string; limits?: Partial<TokenVaultLimits> } = {}) {
    this.#nonce =
      typeof options.nonce === "string" && /^[A-Z]{8}$/.test(options.nonce)
        ? options.nonce
        : generateNonce();
    this.#limits = { ...TOKEN_VAULT_LIMITS, ...(options.limits ?? {}) };
    liveVaults++;
  }

  get size(): number {
    return this.#byToken.size;
  }

  get disposed(): boolean {
    return this.#disposed;
  }

  /**
   * Token for `value`, minting one on first sight. The same value always gets the same token
   * within this vault. Returns null when the vault is disposed or a limit would be exceeded;
   * the caller must then write the irreversible placeholder, never the raw value.
   */
  tokenize(type: string, value: string): string | null {
    if (this.#disposed || typeof value !== "string" || value.length === 0) return null;
    const existing = this.#byValue.get(value);
    if (existing) return existing;
    if (
      value.length > this.#limits.maxValueLength ||
      this.#byToken.size >= this.#limits.maxEntries ||
      this.#bytes + value.length > this.#limits.maxTotalBytes
    ) {
      this.#rejected++;
      return null;
    }
    this.#seq++;
    const token = `<<PII_${typeLabel(type)}_${this.#nonce}_${this.#seq}>>`;
    this.#byToken.set(token, value);
    this.#byValue.set(value, token);
    this.#bytes += value.length;
    return token;
  }

  /** Original value of a token minted by this vault, or undefined. */
  resolve(token: string): string | undefined {
    if (this.#disposed) return undefined;
    return this.#byToken.get(token);
  }

  /**
   * Replace every complete token in `text`. Tokens this vault did not mint (hallucinated,
   * forged, or from another request) stay literal. In `json` mode the value is escaped for a
   * position inside a JSON string, which is where tool-call argument fragments put it.
   */
  replaceTokens(text: string, mode: TokenReplaceMode = "raw"): string {
    if (typeof text !== "string" || !text.includes("<<PII_")) return text;
    return text.replace(PII_TOKEN_PATTERN, (token) => {
      const value = this.resolve(token);
      if (value === undefined) {
        this.#unresolved++;
        return token;
      }
      this.#restored++;
      return mode === "json" ? JSON.stringify(value).slice(1, -1) : value;
    });
  }

  stats(): TokenVaultStats {
    return {
      minted: this.#byToken.size,
      restored: this.#restored,
      unresolved: this.#unresolved,
      rejected: this.#rejected,
    };
  }

  dispose(): void {
    if (this.#disposed) return;
    this.#disposed = true;
    this.#byToken.clear();
    this.#byValue.clear();
    this.#bytes = 0;
    liveVaults--;
  }

  toJSON(): { size: number } {
    return { size: this.size };
  }

  [inspect.custom](): string {
    return `RequestTokenVault { size: ${this.size} }`;
  }
}

/**
 * Start of a suffix of `text` that could still become a token once more characters arrive,
 * or -1. Only that suffix has to be held back while streaming; `a < b` or `<<EOF` release
 * at once because they can no longer match the grammar.
 */
export function findTokenPrefixStart(text: string): number {
  if (typeof text !== "string" || text.length === 0) return -1;
  const from = Math.max(0, text.length - MAX_TOKEN_LENGTH);
  for (let i = text.indexOf("<", from); i !== -1; i = text.indexOf("<", i + 1)) {
    if (TOKEN_PREFIX_PATTERN.test(text.slice(i))) return i;
  }
  return -1;
}

const requestVaultStorage = new AsyncLocalStorage<RequestTokenVault>();

/** Run `callback` with `vault` as the request's active vault. */
export function runWithTokenVault<T>(vault: RequestTokenVault, callback: () => T): T {
  return requestVaultStorage.run(vault, callback);
}

/** The vault of the client request this code runs for, if the reversible vault is active. */
export function getActiveRequestTokenVault(): RequestTokenVault | undefined {
  const vault = requestVaultStorage.getStore();
  return vault && !vault.disposed ? vault : undefined;
}

/**
 * True when the current request minted at least one token. chatCore reads this once per
 * attempt to skip memory extraction and the idempotency / semantic cache writes: those would
 * store tokens that no later request can resolve.
 */
export function hasMintedPiiTokens(): boolean {
  return (getActiveRequestTokenVault()?.size ?? 0) > 0;
}
