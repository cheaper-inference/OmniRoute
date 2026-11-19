import { readFileSync } from "node:fs";
import { createRequire, registerHooks } from "node:module";
import { fileURLToPath } from "node:url";
import { isInternalThread } from "node:worker_threads";

const tsxImport = ["tsx/esm", "tsx"].find((name) =>
  process.execArgv.some(
    (arg, index, args) =>
      arg === `--import=${name}` || (arg === "--import" && args[index + 1] === name)
  )
);

if (process.env.NODE_V8_COVERAGE && tsxImport && !isInternalThread) {
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
  await import(tsxImport);
  registerHooks({
    load(url, context, nextLoad) {
      if (!url.startsWith("file:")) return nextLoad(url, context);
      const filename = fileURLToPath(url);
      if (!nativeSources.has(filename)) return nextLoad(url, context);
      return { format: "module-typescript", source: readFileSync(filename), shortCircuit: true };
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
