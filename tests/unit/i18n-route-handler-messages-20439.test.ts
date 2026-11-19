/**
 * #20439: Turbopack compiles App Router route handlers in a server chunking context of their own,
 * so the one route.ts that used next-intl/server (/authorize) made the build emit every full
 * locale catalog a second time (67 chunks under .build/next/server/chunks/, ~79 MB unpacked in
 * npm 3.8.54 and in the Docker/Electron standalone). Route handlers now read the few strings they
 * render from src/i18n/route-handler-messages.json via src/i18n/routeHandlerTranslations.ts.
 *
 * Pins: (1) the compact catalog is exactly what the generator derives from the full catalogs;
 * (2) every locale renders the same string request.ts (deepMergeFallback over en) would give;
 * (3) the fallback rules; (4) no route handler reaches next-intl/server, request.ts or a full
 * catalog again, directly or through its imports.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  ROUTE_HANDLER_MESSAGE_KEYS,
  renderRouteHandlerMessages,
} from "../../scripts/i18n/generate-global-error-messages.mjs";
import {
  deepMergeFallback,
  getNormalizedLocaleMessages,
  PLACEHOLDER_PREFIX,
} from "../../src/i18n/request.ts";
import {
  ROUTE_HANDLER_MESSAGES,
  createRouteHandlerTranslator,
  resolveRouteHandlerLocale,
} from "../../src/i18n/routeHandlerTranslations.ts";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const CATALOGS = join(REPO_ROOT, "src/i18n/messages");

function readJson(path: string): Record<string, unknown> {
  return JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
}

const config = readJson(join(REPO_ROOT, "config/i18n.json")) as {
  locales: Array<{ code: string }>;
};
const english = readJson(join(CATALOGS, "en.json"));

function lookup(catalog: unknown, dottedKey: string): unknown {
  let cursor = catalog;
  for (const segment of dottedKey.split(".")) {
    if (!cursor || typeof cursor !== "object") return undefined;
    cursor = (cursor as Record<string, unknown>)[segment];
  }
  return cursor;
}

test("route-handler-messages.json is exactly what the generator derives from the catalogs", () => {
  const catalogsByCode = config.locales.map(({ code }) => [
    code,
    readJson(join(CATALOGS, `${code}.json`)),
  ]);
  const expected = renderRouteHandlerMessages(english, catalogsByCode);
  const committed = readFileSync(join(REPO_ROOT, "src/i18n/route-handler-messages.json"), "utf8");
  assert.equal(
    committed,
    expected,
    "stale src/i18n/route-handler-messages.json — run node scripts/i18n/generate-global-error-messages.mjs"
  );
  assert.ok(Buffer.byteLength(committed) < 100_000, "the route-handler catalog must stay small");
});

test("every locale renders what request.ts (deepMergeFallback over en) would give", () => {
  const enMessages = getNormalizedLocaleMessages(english);
  for (const { code } of config.locales) {
    const own = getNormalizedLocaleMessages(readJson(join(CATALOGS, `${code}.json`)));
    const merged =
      code === "en" ? enMessages : deepMergeFallback({ ...structuredClone(own) }, enMessages);
    for (const dotted of ROUTE_HANDLER_MESSAGE_KEYS) {
      const [namespace, ...rest] = dotted.split(".");
      const t = createRouteHandlerTranslator(ROUTE_HANDLER_MESSAGES, code, namespace);
      assert.equal(t(rest.join(".")), lookup(merged, dotted), `${code}: ${dotted}`);
    }
  }
});

test("translator falls back to English for missing or untranslated keys, then to namespace.key", () => {
  const catalog = {
    en: { auth: { ok: "Done", failed: "Failed" } },
    "pt-BR": { auth: { ok: "Feito", failed: `${PLACEHOLDER_PREFIX}Failed` } },
  };
  const t = createRouteHandlerTranslator(catalog, "pt-BR", "auth");
  assert.equal(t("ok"), "Feito");
  assert.equal(t("failed"), "Failed", "a __MISSING__ sentinel is never rendered");
  assert.equal(t("unknown"), "auth.unknown");
  assert.equal(t("__proto__"), "auth.__proto__");
  assert.equal(createRouteHandlerTranslator(catalog, "de", "auth")("ok"), "Done");
  assert.equal(createRouteHandlerTranslator(catalog, "en", "other")("ok"), "other.ok");
});

test("the generator drops sentinels, non-strings and empty locales", () => {
  const rendered = JSON.parse(
    renderRouteHandlerMessages(
      { auth: { a: "A", b: "B" }, other: { c: "C" } },
      [
        ["en", { auth: { a: "A", b: "B" } }],
        ["fr", { auth: { a: "Ah", b: `${PLACEHOLDER_PREFIX}B` } }],
        ["de", { auth: { a: { nested: true } } }],
        ["es", null],
      ],
      ["auth.a", "auth.b", "auth.missingInEnglish"]
    )
  );
  assert.deepEqual(rendered, {
    en: { auth: { a: "A", b: "B" } },
    fr: { auth: { a: "Ah" } },
  });
});

test("locale resolution matches request.ts: cookie, then x-locale, aliases, default", () => {
  assert.equal(resolveRouteHandlerLocale("pt-BR", "de"), "pt-BR");
  assert.equal(resolveRouteHandlerLocale("", "de"), "de");
  assert.equal(resolveRouteHandlerLocale(undefined, "PT-br"), "pt-BR");
  assert.equal(resolveRouteHandlerLocale(null, null), "en");
  assert.equal(resolveRouteHandlerLocale("xx-unknown", null), "en");
});

// ---------------------------------------------------------------------------
// Guard: no route handler may pull the full catalogs back into its chunking context.
// ---------------------------------------------------------------------------

const FORBIDDEN_SPECIFIERS = [/^next-intl\/server$/, /^next-intl\/config$/];
const FORBIDDEN_FILES = new Set([resolve(REPO_ROOT, "src/i18n/request.ts")]);
const FORBIDDEN_DIRS = [resolve(REPO_ROOT, "src/i18n/messages") + "/"];
const EXTENSIONS = [".ts", ".tsx", ".mts", ".js", ".mjs", ".jsx"];

function resolveSpecifier(fromFile: string, specifier: string): string | null {
  let base: string;
  if (specifier.startsWith("@/")) base = join(REPO_ROOT, "src", specifier.slice(2));
  else if (specifier.startsWith("@omniroute/open-sse/"))
    base = join(REPO_ROOT, "open-sse", specifier.slice("@omniroute/open-sse/".length));
  else if (specifier === "@omniroute/open-sse") base = join(REPO_ROOT, "open-sse", "index");
  else if (specifier.startsWith(".")) base = resolve(dirname(fromFile), specifier);
  else return null;
  if (existsSync(base) && statSync(base).isFile()) return base;
  for (const ext of EXTENSIONS) {
    if (existsSync(base + ext)) return base + ext;
    const swapped = base.replace(/\.(m?js|jsx)$/, "") + ext;
    if (swapped !== base + ext && existsSync(swapped)) return swapped;
  }
  for (const ext of EXTENSIONS) {
    const index = join(base, `index${ext}`);
    if (existsSync(index)) return index;
  }
  return null;
}

// Static imports/re-exports and import()/require() with a string literal.
const IMPORT_RE =
  /(?:import|export)\s[^"'`;]*?from\s*["']([^"']+)["']|import\s*["']([^"']+)["']|(?:import|require)\s*\(\s*["'`]([^"'`$]+)["'`]/g;

function specifiersOf(file: string): string[] {
  if (!/\.(m?[jt]sx?)$/.test(file)) return [];
  const source = readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\/|^\s*\/\/.*$/gm, "");
  const found: string[] = [];
  for (const match of source.matchAll(IMPORT_RE)) found.push(match[1] ?? match[2] ?? match[3]);
  return found;
}

const verdicts = new Map<string, string | null>();

/** Returns the import chain to a forbidden module, or null. */
function forbiddenChain(file: string, stack: Set<string>): string | null {
  if (verdicts.has(file)) return verdicts.get(file) ?? null;
  if (stack.has(file)) return null;
  stack.add(file);
  let chain: string | null = null;
  for (const specifier of specifiersOf(file)) {
    if (FORBIDDEN_SPECIFIERS.some((re) => re.test(specifier))) {
      chain = `${relative(REPO_ROOT, file)} -> ${specifier}`;
      break;
    }
    const target = resolveSpecifier(file, specifier);
    if (!target) continue;
    if (FORBIDDEN_FILES.has(target) || FORBIDDEN_DIRS.some((dir) => target.startsWith(dir))) {
      chain = `${relative(REPO_ROOT, file)} -> ${relative(REPO_ROOT, target)}`;
      break;
    }
    const deeper = forbiddenChain(target, stack);
    if (deeper) {
      chain = `${relative(REPO_ROOT, file)} -> ${deeper}`;
      break;
    }
  }
  stack.delete(file);
  verdicts.set(file, chain);
  return chain;
}

function routeHandlers(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) routeHandlers(full, out);
    else if (/^route\.(m?[jt]sx?)$/.test(entry.name)) out.push(full);
  }
  return out;
}

test("no route handler reaches next-intl/server, src/i18n/request.ts or a full catalog", () => {
  const handlers = routeHandlers(join(REPO_ROOT, "src/app"));
  assert.ok(handlers.length > 100, `expected the app's route handlers, found ${handlers.length}`);
  const offenders = handlers
    .map((file) => forbiddenChain(file, new Set()))
    .filter((chain): chain is string => chain !== null);
  assert.deepEqual(
    offenders,
    [],
    "route handlers must translate through src/i18n/routeHandlerTranslations.ts (#20439)"
  );
});

test("the guard detects the pre-fix /authorize import chain", () => {
  verdicts.clear();
  const routeHandlerModule = join(REPO_ROOT, "src/i18n/routeHandlerTranslations.ts");
  assert.equal(forbiddenChain(routeHandlerModule, new Set()), null);
  assert.match(
    forbiddenChain(join(REPO_ROOT, "src/i18n/SectionI18nProvider.tsx"), new Set()) ?? "",
    /next-intl\/server|src\/i18n\/request\.ts/
  );
});
