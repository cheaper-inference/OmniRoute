// bin/cli/launch/core/pipeline/catalog-view.mjs: fetchCatalog and the connected providers
// (started together, consumed catalog first), then the view and the model pick.

import { LaunchError } from "../../contract.mjs";
import { fetchCatalog, fetchConnectedProviders } from "../catalog.mjs";
import { pickModel } from "../picker.mjs";
import { trace } from "../trace.mjs";
import { computeView, needsServerView, serverViewBody } from "../view.mjs";
import { settle, unwrap } from "./settle.mjs";

/**
 * Start the GET /api/launch/providers request without interpreting it (null for --all-models: no
 * request). `cancel()` aborts it when the catalog fails, so a dropped request never dangles.
 */
export function requestConnectedProviders({ flags, rootUrl, token, doFetch, deps }) {
  if (flags.allModels) return null;
  const controller = new AbortController();
  const fetchCancellable = (url, init = {}) =>
    doFetch(url, {
      ...init,
      signal: init.signal ? AbortSignal.any([init.signal, controller.signal]) : controller.signal,
    });
  const result = settle(() =>
    (deps.fetchConnectedProviders ?? fetchConnectedProviders)({
      rootUrl,
      token,
      fetch: fetchCancellable,
    })
  );
  return { result, cancel: () => controller.abort() };
}

/** Interpret a started providers request: prefixes, or undefined plus one warning line. */
export async function connectedProvidersFrom(request, warn) {
  if (!request) return undefined;
  const result = unwrap(await request.result);
  if (result?.ok) return result.prefixes;
  warn(`${result?.reason ?? "connected providers unknown"}; showing every catalog model`);
  return undefined;
}

/** Fetch the catalog and, concurrently, the connected providers; consumed catalog first. */
export function startCatalogAndProviders({ flags, rootUrl, token, doFetch, deps }) {
  const catalog = settle(() => fetchCatalog({ rootUrl, token, fetch: doFetch }));
  const providers = requestConnectedProviders({ flags, rootUrl, token, doFetch, deps });
  return { catalog, providers };
}

/** The error for a view that came out empty. */
function emptyViewError(tool, view, providers) {
  if (providers) {
    return new LaunchError(
      "NoProviders",
      `no model from a provider you have a key for fits ${tool} (view ${view.name})`,
      {
        hint: "add a provider key with `omniroute setup`, or pass --all-models to list every catalog model",
      }
    );
  }
  return new LaunchError("NoProviders", `no catalog model fits ${tool} (view ${view.name})`, {
    hint: "connect a provider with tool calling and enough context, see `omniroute setup`",
  });
}

/** The catalog rows; the providers request is cancelled when the catalog fails or is empty. */
async function catalogRows(fetched) {
  const catalogOutcome = await fetched.catalog;
  if (!catalogOutcome.ok || catalogOutcome.value?.length === 0) fetched.providers?.cancel();
  const rows = unwrap(catalogOutcome);
  trace("catalog fetch");
  if (rows.length === 0) {
    throw new LaunchError("NoProviders", "the gateway catalog is empty: no provider is connected", {
      hint: "connect a provider with `omniroute setup`",
    });
  }
  return rows;
}

/**
 * Catalog (session token) -> connected providers -> view -> [PATCH view] -> pickModel.
 * @returns {Promise<{ view: object, picked: object }>}
 */
export async function catalogViewStep(L, run, rootUrl) {
  const { adapter } = L;
  const fetched = startCatalogAndProviders({
    flags: L.flags,
    rootUrl,
    token: run.session.token,
    doFetch: L.doFetch,
    deps: L.deps,
  });
  const rows = await catalogRows(fetched);
  const providers = await connectedProvidersFrom(fetched.providers, L.warn);
  trace("connected providers");
  const { view } = computeView(rows, adapter, L.prefs, { pin: L.flagModel, providers });
  if (view.rows.length === 0) throw emptyViewError(L.tool, view, providers);
  trace("view compute");
  if (needsServerView(L.caps.modelList.strategy)) {
    await run.client.patchView(run.session, serverViewBody(view, adapter));
  }
  trace("view patch");
  const picked = await pickModel(L.pickInput(view));
  trace("model pick");
  return { view, picked };
}
