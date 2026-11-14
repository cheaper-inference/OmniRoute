// bin/cli/launch/core/view.mjs: the ONE launch view (section 3.2). PURE: wraps the shared
// selector (src/shared/launch/viewSelect.ts via contract.mjs) so inject and server-view agree.

import { LaunchError, deepFreeze, selectView, viewHash } from "../contract.mjs";

/**
 * The adapter's view spec with section 2 defaults applied: `filter.protocols` defaults to
 * `[capabilities.protocol]` (rows without declared protocols are kept by the selector anyway).
 * @param {import("../contract.d.ts").LaunchAdapter} adapter
 * @returns {import("../contract.d.ts").ViewSelectSpec}
 */
export function effectiveViewSpec(adapter) {
  const spec = adapter.capabilities.modelList.view;
  const filter = { ...(spec.filter || {}) };
  if (!filter.protocols && adapter.capabilities.protocol) {
    filter.protocols = [adapter.capabilities.protocol];
  }
  return { ...spec, filter };
}

/** Filter keys checked one at a time to name the filter a pinned model fails. */
const FILTER_KEYS = [
  "kinds",
  "combos",
  "protocols",
  "requireKnownContext",
  "minContextTokens",
  "capabilities",
  "includeIds",
  "excludeIds",
];

function describeFilter(key, value) {
  if (key === "kinds") return `kinds ${JSON.stringify(value ?? ["chat"])}`;
  if (key === "combos") return "combos false (no combo or auto rows)";
  if (key === "requireKnownContext") return "requireKnownContext (the context window is unknown)";
  if (key === "minContextTokens") return `minContextTokens ${value}`;
  return `${key} ${JSON.stringify(value)}`;
}

/**
 * The first view filter `row` fails, checked through the shared selector one filter at a time
 * (so the answer always matches what selectView did). Null when every single filter passes.
 */
function failingFilter(row, spec) {
  const filter = spec.filter || {};
  for (const key of FILTER_KEYS) {
    if (key !== "kinds" && filter[key] === undefined) continue;
    const only = { name: spec.name, filter: { kinds: filter.kinds, [key]: filter[key] } };
    if (selectView([row], only).ids.length === 0) return describeFilter(key, filter[key]);
  }
  return null;
}

/**
 * The default launch narrowing (contract 1.3): model rows of the connected providers only
 * (`providers` = their id prefixes and catalog `owned_by` ids), no built-in `auto` rows; user
 * combos stay. `--all-models` skips it.
 * @param {import("../contract.d.ts").ViewSelectSpec} spec
 * @param {ReadonlyArray<string>} providers
 */
export function connectedViewSpec(spec, providers) {
  return { ...spec, filter: { ...(spec.filter || {}), providers: [...providers], auto: false } };
}

/**
 * Compute the launch view from catalog rows.
 *
 * `options.providers` (the connected providers' prefixes) narrows the view with
 * `connectedViewSpec`; absent = the full catalog (`--all-models`, or an older gateway).
 *
 * `options.pin` (the explicit `--model`) is always kept, even from a provider outside
 * `options.providers`: when it is not selected (cut by `limit`, or filtered out by the connected
 * narrowing) the view becomes the pin first, then the other selected rows, up to `limit`.
 * A pin that exists in the catalog but fails an adapter view filter is a `ModelUnsuitable` error
 * naming the filter; a pin absent from the catalog is left to the picker (ModelNotFound +
 * suggestions).
 * @param {ReadonlyArray<import("../contract.d.ts").ViewCatalogRow>} rows
 * @param {import("../contract.d.ts").LaunchAdapter} adapter
 * @param {import("../contract.d.ts").ViewPreferences} [prefs]
 * @param {{ pin?: string, providers?: ReadonlyArray<string> }} [options]
 * @returns {{ view: import("../contract.d.ts").LaunchModelView, ids: string[] }}
 */
export function computeView(rows, adapter, prefs = {}, options = {}) {
  const base = effectiveViewSpec(adapter);
  const spec = options.providers ? connectedViewSpec(base, options.providers) : base;
  let selection = selectView(rows, spec, prefs);
  const pin = options.pin;
  if (pin && !selection.ids.includes(pin)) {
    const unlimited = selectView(rows, { ...base, limit: undefined }, prefs);
    const index = unlimited.ids.indexOf(pin);
    if (index >= 0) {
      const limit = typeof spec.limit === "number" ? Math.max(1, Math.floor(spec.limit)) : Infinity;
      const rest = selectView(
        (rows || []).filter((row) => row && row.id !== pin),
        { ...spec, limit: Number.isFinite(limit) ? limit - 1 : undefined },
        prefs
      );
      const ids = [pin, ...rest.ids];
      selection = { ids, rows: [unlimited.rows[index], ...rest.rows], hash: viewHash(ids) };
    } else {
      const raw = (rows || []).find((row) => row && row.id === pin);
      const failed = raw ? failingFilter(raw, base) : null;
      if (raw && failed) {
        throw new LaunchError(
          "ModelUnsuitable",
          `model ${pin} does not fit the ${adapter.id} launch view (${base.name}): it fails the ${failed} filter`
        );
      }
    }
  }
  const view = deepFreeze({ name: spec.name, hash: selection.hash, rows: selection.rows });
  return { view, ids: selection.ids };
}

/** True when the strategy needs the view PATCHed onto the session. */
export function needsServerView(strategy) {
  return strategy === "server-view" || strategy === "both";
}

/** PATCH body `view` for `/api/launch/sessions/:id`. */
export function serverViewBody(view, adapter) {
  const body = { hash: view.hash, ids: view.rows.map((row) => row.id) };
  const serve = adapter.capabilities.modelList.serve;
  if (serve && Object.keys(serve).length > 0) body.serve = { ...serve };
  return body;
}
