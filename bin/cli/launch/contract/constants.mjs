// bin/cli/launch/contract/constants.mjs: contract versions, placeholders and fixed names.
// Part of the launcher contract; import it through ../contract.mjs (pure: no I/O).

// ---------- versions ----------

/** Adapter contract version. Minor bumps are additive only. */
// 1.1 (additive): launcher assets (TempFileSpec.asset, ${ASSET:...} tokens, assetRef).
// 1.2 (additive): LaunchPlan.tempDirs (directories core creates under ${TMP} / ${STATE}).
// 1.3 (additive): view filter `providers` and `auto`, view `spread` (viewSelect.ts), and
//   `ViewCatalogRow.provider`; core narrows the default view to connected providers.
export const ADAPTER_CONTRACT = Object.freeze({ major: 1, minor: 3 });
/** Alias of ADAPTER_CONTRACT (contract.d.ts `contractVersion`). */
export const contractVersion = ADAPTER_CONTRACT;
/** `LaunchPlan.planVersion`, also the top-level marker of `--dry-run --json`. */
export const PLAN_VERSION = 1;

// ---------- placeholders ----------

/**
 * The ONLY placeholders execute substitutes. Matching is exact (`${TMP}` and nothing else), so
 * tool-literal syntax such as `${OMNIROUTE_API_KEY:-omniroute-local}` (openclaw), `$VAR` (crush)
 * or `${{ secrets.X }}` (continue) passes through to the tool untouched.
 *
 * A fifth, non-secret token family references launcher assets (contract 1.1), valid ONLY inside
 * `TempFileSpec.contents`: `${ASSET:<relpath>}` (raw text) and `${ASSET:<relpath>:json}` (text as
 * a JSON string literal, quotes included). Build them with `assetRef`; see ASSET_ROOT.
 */
export const PLACEHOLDERS = Object.freeze({
  TMP: "${TMP}",
  STATE: "${STATE}",
  /** Never empty at execute time: core substitutes the minted olx_ session token, also when the
   *  gateway runs without auth. */
  TOKEN: "${TOKEN}",
  /** Resolved tool command; valid in TeardownStep.argv only. */
  TOOL: "${TOOL}",
});

/** Non-secret key for tools that hide a provider with an empty key (pi, codex env_key, qwen). */
export const NO_AUTH_SENTINEL = "omniroute-no-auth";

/** Platforms an adapter may declare. */
export const PLATFORMS = Object.freeze(["darwin", "linux", "win32"]);
