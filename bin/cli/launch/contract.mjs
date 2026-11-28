// bin/cli/launch/contract.mjs: the frozen launcher contract.
//
// The ONLY module both core (bin/cli/launch/core/*) and adapters (bin/cli/launch/adapters/*)
// import. Types live in contract.d.ts (mirrored here as JSDoc typedefs); the constants and pure
// helpers live in the sibling modules under ./contract/ and are re-exported here: no I/O, no
// clock, no randomness, no process reads.
//
// Imports: only ./contract/<name>.mjs siblings (held to the same purity rule), plus exactly two
// documented exceptions. Both are pure, spawn-free modules re-exported so adapters never import
// anything but this file:
//   1. ../utils/claudeWindowEnv.mjs           (claudeWindowEnv)
//   2. ../../../src/shared/launch/viewSelect.ts (selectView, viewHash, the shared view selector)
// tests/unit/cli/launch/boundary.test.ts asserts no other import appears here.

export { claudeWindowEnv } from "../utils/claudeWindowEnv.mjs";
export {
  selectView,
  viewHash,
  globMatch,
  WIRE_PROTOCOLS,
  VIEW_CATALOG_KINDS,
} from "../../../src/shared/launch/viewSelect.ts";

/** @typedef {import("./contract.d.ts").LaunchAdapter} LaunchAdapter */
/** @typedef {import("./contract.d.ts").LaunchContext} LaunchContext */
/** @typedef {import("./contract.d.ts").LaunchPlan} LaunchPlan */
/** @typedef {import("./contract.d.ts").LaunchModelView} LaunchModelView */
/** @typedef {import("./contract.d.ts").TempFileSpec} TempFileSpec */
/** @typedef {import("./contract.d.ts").TempDirSpec} TempDirSpec */
/** @typedef {import("./contract.d.ts").PreflightCheck} PreflightCheck */
/** @typedef {import("./contract.d.ts").TeardownStep} TeardownStep */
/** @typedef {import("./contract.d.ts").PostExitCheck} PostExitCheck */
/** @typedef {import("./contract.d.ts").PassthroughRule} PassthroughRule */
/** @typedef {import("./contract.d.ts").LaunchErrorCode} LaunchErrorCode */

export {
  ADAPTER_CONTRACT,
  contractVersion,
  PLAN_VERSION,
  PLACEHOLDERS,
  NO_AUTH_SENTINEL,
  PLATFORMS,
} from "./contract/constants.mjs";
export {
  ASSET_ROOT,
  validateAssetPath,
  assetRef,
  findAssetRefs,
  expandAssetRefs,
} from "./contract/assets.mjs";
export {
  EXIT_CODES,
  ERROR_CODES,
  ADAPTER_ERROR_CODES,
  LaunchError,
  isLaunchError,
} from "./contract/errors.mjs";
export { stripTrailingSlash, ensureV1, tempPath, statePath } from "./contract/paths.mjs";
export { json } from "./contract/json.mjs";
export { tomlString, tomlKey, tomlValue, toml, tomlAssign } from "./contract/toml.mjs";
export { yaml, dotenv, isValidEnvKey } from "./contract/yaml.mjs";
export {
  deepMerge,
  deepFreeze,
  findFlag,
  hasFlag,
  rowLabel,
  injectRows,
} from "./contract/data.mjs";
export {
  createPlan,
  findTokenSites,
  defineAdapter,
  createContextUtil,
} from "./contract/builders.mjs";
