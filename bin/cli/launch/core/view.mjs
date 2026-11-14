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
 * Compute the launch view from catalog rows.
 *
 * `options.pin` (the explicit `--model`) is always kept: when the adapter's `limit` would cut it,
 * the view becomes the pin first, then the other selected rows in normal order, up to `limit`.
 * A pin that exists in the catalog but fails a view filter is a `ModelUnsuitable` error naming
 * the filter; a pin absent from the catalog is left to the picker (ModelNotFound + suggestions).
 * @param {ReadonlyArray<import("../contract.d.ts").ViewCatalogRow>} rows
 * @param {import("../contract.d.ts").LaunchAdapter} adapter
 * @param {import("../contract.d.ts").ViewPreferences} [prefs]
 * @param {{ pin?: string }} [options]
 * @returns {{ view: import("../contract.d.ts").LaunchModelView, ids: string[] }}
 */
export function computeView(rows, adapter, prefs = {}, options = {}) {
  const spec = effectiveViewSpec(adapter);
  let selection = selectView(rows, spec, prefs);
  const pin = options.pin;
  if (pin && !selection.ids.includes(pin)) {
    const unlimited = selectView(rows, { ...spec, limit: undefined }, prefs);
    const index = unlimited.ids.indexOf(pin);
    if (index >= 0) {
      const limit = typeof spec.limit === "number" ? Math.max(1, Math.floor(spec.limit)) : Infinity;
      const order = [index, ...unlimited.ids.map((_, i) => i).filter((i) => i !== index)];
      const picked = order.slice(0, limit);
      const ids = picked.map((i) => unlimited.ids[i]);
      selection = { ids, rows: picked.map((i) => unlimited.rows[i]), hash: viewHash(ids) };
    } else {
      const raw = (rows || []).find((row) => row && row.id === pin);
      const failed = raw ? failingFilter(raw, spec) : null;
      if (raw && failed) {
        throw new LaunchError(
          "ModelUnsuitable",
          `model ${pin} does not fit the ${adapter.id} launch view (${spec.name}): it fails the ${failed} filter`
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
