import { Worker } from "node:worker_threads";

import { selectPath } from "./jsonPath.mjs";
import { byCodeUnit } from "./order.mjs";
import { classifyResponse, readId } from "./probes.mjs";

/** @typedef {{ status: "complete", httpStatus: number, checkedAt: string, ids: readonly string[] }
 *   | { status: "auth-required"|"unavailable"|"unsupported"|"partial"|"invalid",
 *       httpStatus: number|null, checkedAt: string }} ListingObservation */
/** @typedef {{ status: "compared", declaredOnly: string[], listedOnly: string[] }
 *   | { status: "inconclusive", reason: Exclude<ListingObservation["status"], "complete"> }} ModelListingDiff */
/** @typedef {{ ids: string[], aliases: {id: string, targetId: string}[],
 *   virtual: {id: string, targetIds: string[]}[] }} DeclaredListing */
/** @typedef {Pick<import("../../../open-sse/config/providerRegistry.ts").RegistryModel,
 *   "id"|"aliases"|"liveCatalogIds">} RegistryModel */
/** @typedef {import("./manifest.mjs").Probe} Probe */
/** @typedef {import("./fetchSource.mjs").SourceResult} SourceResult */

const NEXT_FIELDS = [
  "next",
  "next_page",
  "next_cursor",
  "next_page_token",
  "nextPage",
  "nextCursor",
  "nextPageToken",
];
const MORE_FIELDS = ["has_more", "hasMore"];
const PAGINATED_LINK =
  /;\s*rel\s*=\s*(?:"(?:[^"]*\s)?(?:next|prev|previous)(?:\s[^"]*)?"|(?:next|prev|previous)\b)/i;

/** @param {readonly string[]} declaredIds @param {ListingObservation} observation @returns {ModelListingDiff} */
export function compareProviderListing(declaredIds, observation) {
  if (observation.status !== "complete") {
    return { status: "inconclusive", reason: observation.status };
  }
  const declared = new Set(declaredIds);
  const listed = new Set(observation.ids);
  return {
    status: "compared",
    declaredOnly: [...declared].filter((id) => !listed.has(id)).sort(byCodeUnit),
    listedOnly: [...listed].filter((id) => !declared.has(id)).sort(byCodeUnit),
  };
}

/** @param {string[]} providers @returns {Promise<Record<string, RegistryModel[]>>} */
export function loadRegistryModels(providers) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL("./registrySnapshot.worker.mjs", import.meta.url), {
      workerData: providers,
      env: {},
    });
    worker.once("message", resolve);
    worker.once("error", reject);
    worker.once("exit", (code) => reject(new Error("Registry snapshot worker exited: " + code)));
  });
}

/** @param {Probe} probe @param {RegistryModel[]|undefined} models @returns {DeclaredListing} */
export function declareListing(probe, models) {
  if (!models) throw new Error(probe.id + ": unknown registry provider: " + probe.provider);
  const virtualIds = new Set(probe.registryVirtualIds);
  const registered = new Set(models.map(({ id }) => id));
  for (const id of virtualIds) {
    if (!registered.has(id)) throw new Error(probe.id + ": unknown registry virtual id: " + id);
  }

  const ids = new Set();
  const aliases = [];
  const virtual = [];
  for (const { id, aliases: names = [], liveCatalogIds = [] } of models) {
    const targets = [...new Set(liveCatalogIds)].sort(byCodeUnit);
    const localOnly = virtualIds.has(id) || (targets.length > 0 && !targets.includes(id));
    if (localOnly) virtual.push({ id, targetIds: targets });
    for (const targetId of targets.length ? targets : localOnly ? [] : [id]) ids.add(targetId);
    for (const name of names) aliases.push({ id: name, targetId: id });
  }
  return {
    ids: [...ids].sort(byCodeUnit),
    aliases: aliases.sort(
      (left, right) => byCodeUnit(left.id, right.id) || byCodeUnit(left.targetId, right.targetId)
    ),
    virtual: virtual.sort((left, right) => byCodeUnit(left.id, right.id)),
  };
}

function failureStatus({ status, failure }) {
  if (status === 401 || status === 403) return "auth-required";
  if (status === 404 || status === 405 || status === 410) return "unsupported";
  if (failure === "too-large") return "partial";
  return "unavailable";
}

function completePage(document, source, probe) {
  if (source.status === 206 || source.contentRange || PAGINATED_LINK.test(source.link ?? "")) {
    return false;
  }
  let terminal = false;
  for (const metadata of [document, document.pagination, document.meta?.pagination]) {
    if (!metadata || typeof metadata !== "object") continue;
    for (const field of MORE_FIELDS) {
      if (!Object.hasOwn(metadata, field)) continue;
      if (metadata[field] !== false) return false;
      terminal = true;
    }
    for (const field of NEXT_FIELDS) {
      if (!Object.hasOwn(metadata, field)) continue;
      if (metadata[field] !== null) return false;
      terminal = true;
    }
  }
  // A well-formed array by itself can still be one page of a paginated listing.
  return terminal || probe.unpaginated === true;
}

/** @param {Probe} probe @param {SourceResult} source @param {string} checkedAt @returns {ListingObservation} */
export function observeListing(probe, source, checkedAt) {
  const base = { httpStatus: source.status, checkedAt };
  if (!source.ok) return { ...base, status: failureStatus(source) };
  if (classifyResponse(probe, source) === "invalid-response") return { ...base, status: "invalid" };

  const document = JSON.parse(source.text);
  const entries =
    !probe.idsPath && Array.isArray(document)
      ? document
      : selectPath(document, probe.idsPath ?? "data");
  if (!Array.isArray(entries)) return { ...base, status: "invalid" };
  const ids = entries.map(readId);
  if (ids.includes(undefined)) return { ...base, status: "invalid" };
  if (!completePage(document, source, probe)) return { ...base, status: "partial" };
  return {
    status: "complete",
    httpStatus: source.status,
    checkedAt,
    ids: [...new Set(ids)].sort(byCodeUnit),
  };
}

/** @param {DeclaredListing} declared @param {ListingObservation} observation @returns {ModelListingDiff} */
export function compareDeclaredListing(declared, observation) {
  if (observation.status !== "complete") return compareProviderListing(declared.ids, observation);

  const targets = new Set(declared.ids);
  const labels = new Set([...declared.aliases, ...declared.virtual].map(({ id }) => id));
  return compareProviderListing(declared.ids, {
    ...observation,
    ids: observation.ids.filter((id) => targets.has(id) || !labels.has(id)),
  });
}
