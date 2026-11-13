// bin/cli/launch/core/view.mjs: the ONE launch view (section 3.2). PURE: wraps the shared
// selector (src/shared/launch/viewSelect.ts via contract.mjs) so inject and server-view agree.

import { deepFreeze, selectView } from "../contract.mjs";

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

/**
 * Compute the launch view from catalog rows.
 * @param {ReadonlyArray<import("../contract.d.ts").ViewCatalogRow>} rows
 * @param {import("../contract.d.ts").LaunchAdapter} adapter
 * @param {import("../contract.d.ts").ViewPreferences} [prefs]
 * @returns {{ view: import("../contract.d.ts").LaunchModelView, ids: string[] }}
 */
export function computeView(rows, adapter, prefs = {}) {
  const spec = effectiveViewSpec(adapter);
  const selection = selectView(rows, spec, prefs);
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
