import { readFileSync } from "node:fs";
import { createRequire, registerHooks } from "node:module";
import { fileURLToPath } from "node:url";
import { isInternalThread } from "node:worker_threads";

const cliEntry = new URL("../../bin/omniroute.mjs", import.meta.url).href;
const cliRoot = fileURLToPath(new URL("../../bin/cli/", import.meta.url));
const cliTsxBridge = new URL("native-cli-v8-tsx.mjs", import.meta.url).href;

function loadCliSource(url, context, nextLoad) {
  if (url.startsWith("file:")) {
    const filename = fileURLToPath(url);
    if (filename.startsWith(cliRoot) && filename.endsWith(".mjs")) {
      return { format: "module", source: readFileSync(filename), shortCircuit: true };
    }
  }
  return nextLoad(url, context);
}

export function registerNativeCliCoverage() {
  registerHooks({ load: loadCliSource });
}

const tsxImport = ["tsx/esm", "tsx"].find((name) =>
  process.execArgv.some(
    (arg, index, args) =>
      arg === `--import=${name}` || (arg === "--import" && args[index + 1] === name)
  )
);

if (process.env.NODE_V8_COVERAGE && !isInternalThread) {
  // The real worker has execArgv: [] and keeps Node's native TypeScript path.
  // Use that same source layout for these files when the caller uses tsx.
  const nativeSources = new Set(
    [
      "src/lib/usage/callLogArtifactWorker.ts",
      "src/lib/usage/callLogArtifacts.ts",
      "src/lib/dataPaths.ts",
      "src/lib/logEnv.ts",
      "src/lib/db/booleanSetting.ts",
      "src/shared/constants/callLogSizeLimitMarkers.ts",
    ].map((file) => fileURLToPath(new URL(`../../${file}`, import.meta.url)))
  );
  const { extensions } = createRequire(import.meta.url);
  const nativeTypeScript = extensions[".ts"] ?? extensions[".js"];

  // NODE_OPTIONS preloads run before the existing --import tsx flag. Register
  // tsx first so this hook takes precedence. Its later CLI import is cached.
  if (tsxImport) await import(tsxImport);
  registerHooks({
    resolve(specifier, context, nextResolve) {
      // The CLI installs tsx after it has configured stdout. Re-register the
      // native CLI load hook at that same import, after tsx takes precedence.
      if (specifier === "tsx/esm" && context.parentURL === cliEntry) {
        return { url: cliTsxBridge, format: "module", shortCircuit: true };
      }
      return nextResolve(specifier, context);
    },
    load(url, context, nextLoad) {
      if (tsxImport && url.startsWith("file:")) {
        const filename = fileURLToPath(url);
        if (nativeSources.has(filename)) {
          return {
            format: "module-typescript",
            source: readFileSync(filename),
            shortCircuit: true,
          };
        }
      }
      return loadCliSource(url, context, nextLoad);
    },
  });

  if (tsxImport === "tsx") {
    // The full tsx loader installs its own loader for TypeScript require().
    // Delegate these explicit files back to the original Node extension.
    const tsxTypeScript = extensions[".ts"];
    extensions[".ts"] = (module, filename) =>
      (nativeSources.has(filename) ? nativeTypeScript : tsxTypeScript)(module, filename);
  }
}
