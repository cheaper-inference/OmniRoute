#!/usr/bin/env node
// scripts/check/check-openapi-routes.mjs
// Gate anti-alucinação (docs): toda `path` documentada em docs/openapi.yaml
// deve resolver para um route.ts real em src/app/api/. Pega endpoint INVENTADO/obsoleto
// na spec (a IA escreve docs descrevendo rota que não existe). Complementa
// check-openapi-coverage.mjs (que mede a direção inversa: % de rotas documentadas).
// Também verifica parâmetros path herdados/por operação e referências locais.
// Stale-enforcement (6A.3): entrada em KNOWN_STALE_SPEC que não suprime nenhum path
// órfão real → gate falha com instrução de remoção (evita furo de regressão silencioso).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import * as yaml from "js-yaml";
import { reportStaleEntries } from "./lib/allowlist.mjs";
import {
  apiRoot,
  collectApiRouteUrlPaths,
  collectOptionalCatchAllRoutes,
} from "./lib/apiRoutes.mjs";

const ROOT = process.cwd();
const OPENAPI_PATH = path.join(ROOT, "docs", "openapi.yaml");

// Entradas da spec sem rota real, congeladas para triagem (catraca: bloqueia NOVAS).
export const KNOWN_STALE_SPEC = new Set([
  // openapi.yaml documenta um state por-agente, mas a rota real é o state GLOBAL
  // (/api/tools/agent-bridge/state); por-agente só há /{id}, /{id}/detect, /mappings, /dns.
]);

/** Normaliza qualquer {param} para {} para casar independente do nome do parâmetro. */
export function normalizeParams(p) {
  return p.replace(/\{[^}]+\}/g, "{}");
}

/** Paths da spec que não casam com nenhuma rota implementada (param-insensitive). */
export function findSpecPathsWithoutRoute(specPaths, implPaths, optionalPrefixes = []) {
  const impl = new Set(implPaths.map(normalizeParams));
  const prefixes = optionalPrefixes.map(normalizeParams);
  return specPaths.filter((p) => {
    const normalized = normalizeParams(p);
    return (
      !impl.has(normalized) &&
      !prefixes.some((prefix) => normalized === prefix || normalized.startsWith(prefix + "/"))
    );
  });
}

const HTTP_METHODS = ["get", "put", "post", "delete", "options", "head", "patch", "trace"];

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

// This gate is offline: an unresolvable reference is missing evidence, not an
// empty declaration. Reference chains have their own visited set so ordinary
// reuse of the same component by different operations remains valid.
function resolveObject(document, input, context, mergePathItemSiblings = false) {
  let value = input;
  const visited = new Set();
  let siblings = {};
  while (isObject(value) && Object.hasOwn(value, "$ref")) {
    const reference = value.$ref;
    if (typeof reference !== "string" || !reference.startsWith("#/")) {
      throw new Error(`${context}: reference cannot be verified locally`);
    }
    if (visited.has(reference)) throw new Error(`${context}: cyclic reference ${reference}`);
    visited.add(reference);
    if (mergePathItemSiblings) {
      siblings = { ...value, ...siblings };
      delete siblings.$ref;
    }
    let target = document;
    for (const token of decodeURIComponent(reference.slice(2)).split("/")) {
      const key = token.replace(/~1/g, "/").replace(/~0/g, "~");
      if (target === null || typeof target !== "object" || !Object.hasOwn(target, key)) {
        throw new Error(`${context}: unresolved reference ${reference}`);
      }
      target = target[key];
    }
    value = target;
  }
  if (!isObject(value)) throw new Error(`${context}: expected an object`);
  return mergePathItemSiblings ? { ...value, ...siblings } : value;
}

function collectParameters(document, declarations, names, context) {
  const parameters = new Map();
  if (declarations === undefined) return parameters;
  if (!Array.isArray(declarations)) throw new Error(`${context}: parameters must be an array`);
  for (const declaration of declarations) {
    const parameter = resolveObject(document, declaration, context);
    if (
      typeof parameter.name !== "string" ||
      !parameter.name ||
      !["path", "query", "header", "cookie"].includes(parameter.in)
    ) {
      throw new Error(`${context}: parameter requires a valid name and location`);
    }
    const key = JSON.stringify([parameter.in, parameter.name]);
    if (parameters.has(key)) {
      throw new Error(`${context}: duplicate ${parameter.in} parameter ${parameter.name}`);
    }
    if (parameter.in === "path") {
      if (!names.has(parameter.name)) {
        throw new Error(`${context}: path parameter ${parameter.name} is absent from the URL`);
      }
      if (parameter.required !== true) {
        throw new Error(`${context}: path parameter ${parameter.name} must have required: true`);
      }
    }
    parameters.set(key, parameter);
  }
  return parameters;
}

function findPathParameterErrors(document, specPaths) {
  const errors = [];
  for (const specPath of specPaths) {
    try {
      if (/[{}]/.test(specPath.replace(/\{[^{}]+\}/g, ""))) {
        throw new Error(`${specPath}: malformed path template`);
      }
      const item = resolveObject(document, document.paths[specPath], specPath, true);
      const names = new Set([...specPath.matchAll(/\{([^}]+)\}/g)].map((match) => match[1]));
      const inherited = collectParameters(document, item.parameters, names, specPath);
      for (const method of HTTP_METHODS) {
        if (!Object.hasOwn(item, method)) continue;
        const context = `${method.toUpperCase()} ${specPath}`;
        if (!isObject(item[method])) throw new Error(`${context}: expected an operation object`);
        const own = collectParameters(document, item[method].parameters, names, context);
        // Operation parameters override Path Item parameters by (in, name).
        const effective = new Map([...inherited, ...own]);
        for (const name of names) {
          if (!effective.has(JSON.stringify(["path", name]))) {
            throw new Error(`${context}: missing required path parameter ${name}`);
          }
        }
      }
    } catch (error) {
      errors.push(`${specPath}: ${error.message}`);
    }
  }
  return errors;
}

/**
 * @param {{ root?: string, openapiPath?: string, implPaths?: string[] }} [opts]
 * @returns {{ ok: boolean, exitCode: number, message: string }}
 */
export function runOpenapiRoutesCheck(opts = {}) {
  const root = opts.root || ROOT;
  const openapiPath = opts.openapiPath || path.join(root, "docs", "openapi.yaml");
  if (!fs.existsSync(openapiPath)) {
    return {
      ok: false,
      exitCode: 1,
      message: `[openapi-routes] FAIL — openapi.yaml não encontrado: ${openapiPath}`,
    };
  }
  if (!fs.existsSync(apiRoot(root))) {
    return {
      ok: false,
      exitCode: 1,
      message: `[openapi-routes] FAIL — API root not found: ${apiRoot(root)}`,
    };
  }

  const raw = yaml.load(fs.readFileSync(openapiPath, "utf-8"));
  const specPaths = Object.keys(raw.paths || {}).filter((p) => p.startsWith("/api"));
  const implPaths = opts.implPaths || collectApiRouteUrlPaths(root);
  const implemented = new Set(implPaths.map(normalizeParams));
  const optionalPrefixes = collectOptionalCatchAllRoutes(root)
    .filter((route) => implemented.has(normalizeParams(route.path)))
    .map((route) => route.prefix);

  const liveOrphans = findSpecPathsWithoutRoute(specPaths, implPaths, optionalPrefixes);
  const stale = reportStaleEntries(KNOWN_STALE_SPEC, liveOrphans, "openapi-routes");
  const orphans = liveOrphans.filter((p) => !KNOWN_STALE_SPEC.has(p));
  const parameterErrors = findPathParameterErrors(raw, specPaths);

  const parts = [];
  if (stale.length) {
    parts.push(
      `[openapi-routes] ${stale.length} entrada(s) obsoleta(s) na allowlist ` +
        `— a violação foi corrigida; REMOVA a entrada para travar a correção:\n` +
        stale.map((e) => `  ✗ ${e}`).join("\n")
    );
  }
  if (orphans.length) {
    parts.push(
      `[openapi-routes] ${orphans.length} path(s) documentado(s) sem rota real:\n` +
        orphans.map((p) => "  ✗ " + p).join("\n") +
        `\n  → crie a rota, corrija/remova a entrada na spec, ou adicione a KNOWN_STALE_SPEC com justificativa.`
    );
  }
  if (parameterErrors.length) {
    parts.push(
      `[openapi-routes] ${parameterErrors.length} path(s) com parâmetros inválidos ou não verificáveis:\n` +
        parameterErrors.map((error) => "  ✗ " + error).join("\n")
    );
  }
  if (parts.length) {
    return { ok: false, exitCode: 1, message: parts.join("\n") };
  }
  return {
    ok: true,
    exitCode: 0,
    message: `[openapi-routes] OK — ${specPaths.length} paths na spec, todos com rota real (${implPaths.length} rotas)`,
  };
}

function main() {
  // Keep assertNoStale side-effect path for CLI parity with other gates when
  // runOpenapiRoutesCheck is not used alone — here we print structured result.
  const result = runOpenapiRoutesCheck();
  if (result.ok) console.log(result.message);
  else console.error(result.message);
  process.exit(result.exitCode);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
