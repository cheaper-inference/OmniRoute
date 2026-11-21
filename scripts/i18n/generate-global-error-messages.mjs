#!/usr/bin/env node
/**
 * Generate the compact catalogs derived from the full translations:
 *   - src/i18n/global-error-messages/<locale>.json — the lazy-loaded error-boundary strings;
 *   - src/i18n/route-handler-messages.json — the few strings route handlers render (#20439).
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

/**
 * Pure core: the compact catalog of one locale, serialized, from its full catalog and the English
 * one (only the keys en.json defines under publicSystem.globalError, only string values).
 * Shared with syncUiKeys (sync-ui-keys.mjs), which needs it in memory for a dry run.
 */
export function renderGlobalErrorCatalog(english, source) {
  const keys = Object.keys(english.publicSystem.globalError);
  const translated = source?.publicSystem?.globalError ?? {};
  const globalError = Object.fromEntries(
    keys.filter((key) => typeof translated[key] === "string").map((key) => [key, translated[key]])
  );
  return `${JSON.stringify({ publicSystem: { globalError } }, null, 2)}\n`;
}

export function generateGlobalErrorMessages(root = REPO_ROOT) {
  const config = JSON.parse(readFileSync(join(root, "config/i18n.json"), "utf8"));
  const catalogs = join(root, "src/i18n/messages");
  const output = join(root, "src/i18n/global-error-messages");
  const english = JSON.parse(readFileSync(join(catalogs, "en.json"), "utf8"));
  mkdirSync(output, { recursive: true });
  for (const { code } of config.locales) {
    const source = JSON.parse(readFileSync(join(catalogs, `${code}.json`), "utf8"));
    writeFileSync(join(output, `${code}.json`), renderGlobalErrorCatalog(english, source));
  }
  return config.locales.length;
}

/**
 * Strings App Router route handlers (route.ts) render, as dotted catalog paths. Route handlers
 * read them from src/i18n/route-handler-messages.json through src/i18n/routeHandlerTranslations.ts
 * instead of next-intl/server: Turbopack compiles route handlers in their own server chunking
 * context, so a route.ts that reached the dynamic `import(\`./messages/${locale}.json\`)` in
 * src/i18n/request.ts emitted every full catalog a second time (67 chunks, ~79 MB, #20439).
 */
export const ROUTE_HANDLER_MESSAGE_KEYS = Object.freeze([
  "auth.traeAuthorizationSuccess",
  "auth.traeAuthorizationFailed",
  "auth.closeAuthorizationWindow",
  "auth.returnToDashboard",
]);

/** Same sentinel as PLACEHOLDER_PREFIX in src/i18n/request.ts (sync-ui-keys.mjs writes it). */
const UNTRANSLATED_PREFIX = "__MISSING__:";

function readPath(catalog, dottedKey) {
  let cursor = catalog;
  for (const segment of dottedKey.split(".")) {
    if (cursor === null || typeof cursor !== "object" || Array.isArray(cursor)) return undefined;
    cursor = Object.prototype.hasOwnProperty.call(cursor, segment) ? cursor[segment] : undefined;
  }
  return cursor;
}

function writePath(target, dottedKey, value) {
  const segments = dottedKey.split(".");
  let cursor = target;
  for (const segment of segments.slice(0, -1)) {
    cursor[segment] ??= {};
    cursor = cursor[segment];
  }
  cursor[segments[segments.length - 1]] = value;
}

/**
 * Pure core: the serialized route-handler catalog, `{ <locale>: { <namespace>: { key: value } } }`,
 * from the full catalogs in config order. Only keys en.json defines as strings; a locale keeps
 * its own value unless it is missing, not a string or an untranslated `__MISSING__:` sentinel —
 * those fall back to English at runtime, exactly like deepMergeFallback in request.ts. A locale
 * with nothing of its own is left out. Shared with syncUiKeys (sync-ui-keys.mjs).
 *
 * @param {Record<string, unknown>} english
 * @param {Array<[string, Record<string, unknown> | null]>} catalogsByCode
 * @param {readonly string[]} [keys]
 */
export function renderRouteHandlerMessages(
  english,
  catalogsByCode,
  keys = ROUTE_HANDLER_MESSAGE_KEYS
) {
  const sourceKeys = keys.filter((key) => typeof readPath(english, key) === "string");
  const out = {};
  for (const [code, catalog] of catalogsByCode) {
    if (!catalog) continue;
    const entry = {};
    let count = 0;
    for (const key of sourceKeys) {
      const value = readPath(catalog, key);
      if (typeof value !== "string" || value.startsWith(UNTRANSLATED_PREFIX)) continue;
      writePath(entry, key, value);
      count += 1;
    }
    if (count > 0) out[code] = entry;
  }
  return `${JSON.stringify(out, null, 2)}\n`;
}

export const ROUTE_HANDLER_MESSAGES_PATH = "src/i18n/route-handler-messages.json";

export function generateRouteHandlerMessages(root = REPO_ROOT) {
  const config = JSON.parse(readFileSync(join(root, "config/i18n.json"), "utf8"));
  const catalogs = join(root, "src/i18n/messages");
  const english = JSON.parse(readFileSync(join(catalogs, "en.json"), "utf8"));
  const catalogsByCode = config.locales.map(({ code }) => [
    code,
    JSON.parse(readFileSync(join(catalogs, `${code}.json`), "utf8")),
  ]);
  writeFileSync(
    join(root, ROUTE_HANDLER_MESSAGES_PATH),
    renderRouteHandlerMessages(english, catalogsByCode)
  );
  return catalogsByCode.length;
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  console.log(`Generated ${generateGlobalErrorMessages()} compact global-error catalogs.`);
  console.log(
    `Generated the route-handler catalog from ${generateRouteHandlerMessages()} locales.`
  );
}
