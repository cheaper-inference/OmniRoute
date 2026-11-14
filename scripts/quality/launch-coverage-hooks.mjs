// Coverage-pass load hook for the launch CRAP gate (docs/qa/LAUNCH-QA.md, "CRAP").
//
// Preloaded with `--import` AFTER `tsx/esm`, so this synchronous hook wraps tsx's loader. For
// the scope files listed in the JSON file named by this module's `?scope=` query parameter (an
// array of absolute paths; a query, not an env var, so spawned children never inherit it) it serves
// the file without tsx's rewriting:
//   - .mjs: the bytes on disk, as is (Node runs them natively).
//   - .ts: Node's native type stripping (`stripTypeScriptTypes`, mode "strip"), which replaces
//     type syntax with whitespace, so every offset and line stays where it is in the file.
// V8 coverage offsets then index the file on disk exactly and need no source map. Without this,
// tsx appends a `.then(...)` interop wrapper to every dynamic `import()` (and esbuild rewrites
// .ts), which shifts every V8 offset after it relative to the file.
// Resolution stays with tsx (`@/` aliases, extensionless specifiers). A .ts file that strip
// mode cannot run (enum, namespace, parameter properties) falls back to tsx.
import fs from "node:fs";
import { registerHooks, stripTypeScriptTypes } from "node:module";
import { fileURLToPath } from "node:url";

const listPath = new URL(import.meta.url).searchParams.get("scope");
const scope = new Set(listPath ? JSON.parse(fs.readFileSync(listPath, "utf8")) : []);

/** Source served for a scope file, or null to let tsx load it. */
export function nativeSource(file, text) {
  if (file.endsWith(".mjs")) return text;
  if (!file.endsWith(".ts") || file.endsWith(".d.ts")) return null;
  try {
    return stripTypeScriptTypes(text, { mode: "strip" });
  } catch {
    return null;
  }
}

if (scope.size) {
  registerHooks({
    load(url, context, nextLoad) {
      if (!url.startsWith("file:")) return nextLoad(url, context);
      const file = fileURLToPath(url);
      if (!scope.has(file)) return nextLoad(url, context);
      const source = nativeSource(file, fs.readFileSync(file, "utf8"));
      if (source === null) return nextLoad(url, context);
      return { format: "module", source, shortCircuit: true };
    },
  });
}
