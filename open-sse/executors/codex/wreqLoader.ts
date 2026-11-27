import * as nodeModule from "node:module";

// #19285 — resolve native dependencies from the standalone server entrypoint.
const runtimeRequire = nodeModule.createRequire(process.argv[1] || process.cwd());

// #12491 — keep the module-name argument dynamic (never a literal string)
// when calling a createRequire()-returned function. Turbopack statically
// detects a literal specifier and rewrites the call to a hashed require()
// target that resolves only via a `.next`-relative symlink generated at
// build time, which is absent from the standalone Docker runtime. Mirrors
// open-sse/utils/browserProfiles.ts's loadRuntimeModule().
function loadDynamicModule(moduleName: string): unknown {
  return Reflect.apply(runtimeRequire, undefined, [moduleName]);
}

export function loadCodexWreqModule(): unknown {
  return loadDynamicModule("wreq-js");
}
