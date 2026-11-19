import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, LOCALES, LOCALE_ALIASES, LOCALE_COOKIE } from "./config";
import { resolveRequestedLocale } from "./resolveRequestedLocale";
import routeHandlerMessages from "./route-handler-messages.json" with { type: "json" };

/**
 * Translations for App Router route handlers (`route.ts`).
 *
 * Route handlers must NOT call next-intl/server (`getTranslations`, `getMessages`, ...) nor import
 * `./request`: Turbopack compiles route handlers in a server chunking context of their own
 * (`.build/next/server/chunks/`, pages use `chunks/ssr/`), and the dynamic
 * `import(\`./messages/${locale}.json\`)` in request.ts made it emit every full locale catalog a
 * second time — 67 chunks, ~79 MB unpacked in the npm package, Docker image and Electron app
 * (#20439). The strings route handlers render are copied instead into the small
 * `route-handler-messages.json` by scripts/i18n/generate-global-error-messages.mjs
 * (ROUTE_HANDLER_MESSAGE_KEYS), regenerated on every build and by sync-ui-keys.
 *
 * Lookup order matches src/i18n/request.ts: the requested locale, then English for keys the
 * locale lacks or left as an untranslated `__MISSING__:` sentinel (the generator already drops
 * those), then the default locale. A key no catalog has renders as `namespace.key`, like
 * next-intl's default getMessageFallback.
 */

type NamespaceMessages = Record<string, string>;
type RouteHandlerCatalog = Record<string, Record<string, NamespaceMessages>>;

const FALLBACK_LOCALE = "en";
/** Same sentinel as PLACEHOLDER_PREFIX in ./request (not imported: see above). */
const UNTRANSLATED_PREFIX = "__MISSING__:";

export const ROUTE_HANDLER_MESSAGES = routeHandlerMessages as RouteHandlerCatalog;

/** Cookie first, then the `x-locale` header — the same precedence as src/i18n/request.ts. */
export function resolveRouteHandlerLocale(
  cookieLocale: string | undefined | null,
  headerLocale: string | undefined | null
): string {
  return resolveRequestedLocale(
    cookieLocale || headerLocale || "",
    LOCALES,
    LOCALE_ALIASES,
    DEFAULT_LOCALE
  );
}

export function createRouteHandlerTranslator(
  catalog: RouteHandlerCatalog,
  locale: string,
  namespace: string
): (key: string) => string {
  const chain = [locale, FALLBACK_LOCALE, DEFAULT_LOCALE]
    .filter((code, index, all) => all.indexOf(code) === index)
    .map((code) =>
      Object.prototype.hasOwnProperty.call(catalog, code) ? catalog[code]?.[namespace] : undefined
    );
  return (key: string) => {
    for (const messages of chain) {
      if (!messages || !Object.prototype.hasOwnProperty.call(messages, key)) continue;
      const value = messages[key];
      if (typeof value === "string" && !value.startsWith(UNTRANSLATED_PREFIX)) return value;
    }
    return `${namespace}.${key}`;
  };
}

/** Drop-in for `getTranslations(namespace)` inside a route handler. */
export async function getRouteHandlerTranslations(
  namespace: string
): Promise<(key: string) => string> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const headerLocale = cookieLocale ? null : (await headers()).get("x-locale");
  return createRouteHandlerTranslator(
    ROUTE_HANDLER_MESSAGES,
    resolveRouteHandlerLocale(cookieLocale, headerLocale),
    namespace
  );
}
