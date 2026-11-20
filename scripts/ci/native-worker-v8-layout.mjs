import { readFileSync, realpathSync } from "node:fs";
import { createRequire, registerHooks } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { isInternalThread } from "node:worker_threads";

const cliEntry = new URL("../../bin/omniroute.mjs", import.meta.url);
const cliRoot = fileURLToPath(new URL("../../bin/cli/", import.meta.url));
const cliTsxBridge = new URL("native-cli-v8-tsx.mjs", import.meta.url).href;
// Node loads these worker, tray and standalone MCP modules as native TypeScript.
const nativeSources = new Set(
  [
    "src/lib/usage/callLogArtifactWorker.ts",
    "src/lib/usage/callLogArtifacts.ts",
    "src/lib/dataPaths.ts",
    "src/lib/logEnv.ts",
    "src/lib/db/booleanSetting.ts",
    "src/shared/constants/callLogSizeLimitMarkers.ts",
    "bin/cli/runtime/trayRuntime.ts",
    "src/shared/platform/windowsProcess.ts",
    "open-sse/utils/errorSanitization.ts",
    "open-sse/utils/errorPathRedaction.ts",
    "open-sse/utils/credentialPatterns.ts",
    "open-sse/utils/providerSafety.ts",
    "open-sse/utils/registeredFeatureFlag.ts",
  ].map((file) => fileURLToPath(new URL(`../../${file}`, import.meta.url)))
);

function isCliEntry(parentURL) {
  if (parentURL === cliEntry.href) return true;
  const entry = process.argv[1];
  if (!entry || !parentURL?.endsWith("/bin/omniroute.mjs")) return false;
  // The installed-layout fixture copies the executable and shares the CLI modules.
  // Check the bytes before substituting the bridge for a CLI outside the checkout.
  try {
    // Node can resolve symlinks for the module while argv keeps the supplied path.
    if (
      parentURL !== pathToFileURL(entry).href &&
      parentURL !== pathToFileURL(realpathSync(entry)).href
    ) {
      return false;
    }
    return readFileSync(entry).equals(readFileSync(cliEntry));
  } catch {
    return false;
  }
}

function loadNativeCoverageSource(url, context, nextLoad) {
  if (url.startsWith("file:")) {
    const filename = fileURLToPath(url);
    if (nativeSources.has(filename)) {
      return {
        format: "module-typescript",
        source: readFileSync(filename),
        shortCircuit: true,
      };
    }
    if (filename.startsWith(cliRoot) && filename.endsWith(".mjs")) {
      return { format: "module", source: readFileSync(filename), shortCircuit: true };
    }
  }
  return nextLoad(url, context);
}

export function registerNativeCliCoverage() {
  registerHooks({ load: loadNativeCoverageSource });
}

const tsxImport = ["tsx/esm", "tsx"].find((name) =>
  process.execArgv.some(
    (arg, index, args) =>
      arg === `--import=${name}` || (arg === "--import" && args[index + 1] === name)
  )
);

if (process.env.NODE_V8_COVERAGE && !isInternalThread) {
  const { extensions } = createRequire(import.meta.url);
  const nativeTypeScript = extensions[".ts"] ?? extensions[".js"];

  // NODE_OPTIONS preloads run before the existing --import tsx flag. Register
  // tsx first so this hook takes precedence. Its later CLI import is cached.
  if (tsxImport) await import(tsxImport);
  registerHooks({
    resolve(specifier, context, nextResolve) {
      // The CLI installs tsx after it has configured stdout. Apply the native
      // loader again at that import so it takes precedence over tsx.
      if (specifier === "tsx/esm" && isCliEntry(context.parentURL)) {
        return { url: cliTsxBridge, format: "module", shortCircuit: true };
      }
      return nextResolve(specifier, context);
    },
    load: loadNativeCoverageSource,
  });

  if (tsxImport === "tsx") {
    // The full tsx loader installs its own loader for TypeScript require().
    // Delegate these explicit files back to the original Node extension.
    const tsxTypeScript = extensions[".ts"];
    extensions[".ts"] = (module, filename) =>
      (nativeSources.has(filename) ? nativeTypeScript : tsxTypeScript)(module, filename);
  }
}
