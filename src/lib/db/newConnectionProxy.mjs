import { DEFAULT_NEW_CONNECTION_PROXY_ENABLED } from "../../shared/constants/newConnectionProxy.mjs";

/**
 * Read the committed creation policy at the insertion boundary. This leaf also
 * serves the standalone CLI writer, without loading the server/runtime graph.
 * Only a missing row means "use the compatibility default". Corrupt policy or
 * storage failures must never silently change the network policy of a new row.
 * @param {{ prepare: (sql: string) => { get: () => unknown } }} db
 * @returns {boolean}
 */
export function readNewConnectionProxyDefault(db) {
  try {
    const row = db
      .prepare(
        "SELECT value FROM key_value WHERE namespace = 'settings' AND key = 'defaultNewConnectionProxyEnabled'"
      )
      .get();
    if (row === undefined) return DEFAULT_NEW_CONNECTION_PROXY_ENABLED;
    if (
      row === null ||
      typeof row !== "object" ||
      !("value" in row) ||
      typeof row.value !== "string"
    ) {
      throw new Error("Invalid policy row");
    }
    const value = JSON.parse(row.value);
    if (typeof value !== "boolean") throw new Error("Invalid policy type");
    return value;
  } catch {
    // Do not expose database diagnostics or a malformed stored value to callers.
    throw new Error("Unable to read the new-connection proxy default. Check the saved setting.");
  }
}
