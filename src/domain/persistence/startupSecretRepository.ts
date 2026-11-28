/**
 * Startup secrets persisted across restarts (JWT_SECRET / API_KEY_SECRET when the
 * environment does not provide them). Values cross this boundary as plaintext; how
 * they are stored at rest is the implementation's concern.
 *
 * Deliberately not a general key/value store: one secret per name, read once at
 * boot and written at most once.
 */
export interface StartupSecretRepository {
  /**
   * The stored secret, or null when there is none, the stored JSON is not a string,
   * or the value cannot be decrypted. Storage errors and malformed stored JSON are
   * thrown, not mapped to null.
   */
  find(name: string): Promise<string | null>;
  /**
   * Store the secret only if none exists under this name. An existing value is
   * never overwritten and losing the race is not an error.
   */
  insertIfAbsent(name: string, value: string): Promise<void>;
}
