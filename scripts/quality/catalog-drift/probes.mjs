import { isDeepStrictEqual } from "node:util";

import { activeCatalogIds, catalogPoolValue } from "./catalog.mjs";
import { selectPath } from "./jsonPath.mjs";
import { extractExcerpt, htmlToText, normalizeForMatch, shortHash } from "./normalize.mjs";
import { byCodeUnit } from "./order.mjs";

/** @typedef {"ids-missing"|"ids-added"|"assertion-failed"|"phrase-missing"|"phrase-present"
 *   |"excerpt-changed"|"anchor-missing"|"unreachable"|"gone"|"invalid-response"|"manifest-out-of-sync"} FindingKind */
/** @typedef {{ provider: string, probeId: string, kind: FindingKind, severity: "drift"|"info",
 *   message: string, details: Record<string, unknown> }} Finding */
/** @typedef {{ liveIds: number, catalogIds: number, aliveCatalogIds: number }} ProbeStats */
/** @typedef {import("./manifest.mjs").Probe} Probe */

export const DRIFT_KINDS = Object.freeze(
  /** @type {FindingKind[]} */ ([
    "ids-missing",
    "assertion-failed",
    "phrase-missing",
    "phrase-present",
    "excerpt-changed",
    "anchor-missing",
    "unreachable",
    "gone",
    "invalid-response",
    "manifest-out-of-sync",
  ])
);

function finding(probe, kind, message, details) {
  return {
    provider: probe.provider,
    probeId: probe.id,
    kind,
    severity: kind === "ids-added" ? "info" : "drift",
    message,
    details,
  };
}

function readId(entry) {
  const id = typeof entry === "string" ? entry : entry?.id;
  return typeof id === "string" && id.trim() ? id : undefined;
}

function readIds(entries) {
  if (!Array.isArray(entries)) return [];
  return [...new Set(entries.map(readId).filter((id) => id !== undefined))].sort(byCodeUnit);
}

function isZeroPrice(value) {
  return value === 0 || (typeof value === "string" && value.trim() !== "" && Number(value) === 0);
}

function matchesFilter(entry, filter) {
  if (!filter) return true;
  if ("field" in filter) return selectPath(entry, filter.field) === filter.equals;
  if ("idEndsWith" in filter) return readId(entry)?.endsWith(filter.idEndsWith) === true;
  return filter.zeroPricing.every((path) => isZeroPrice(selectPath(entry, path)));
}

function modelListIds(document, probe) {
  const entries = selectPath(document, probe.idsPath ?? "data");
  const filtered = Array.isArray(entries)
    ? entries.filter((entry) => matchesFilter(entry, probe.filter))
    : [];
  return readIds(filtered);
}

function expectedIds(rows, probe) {
  const { stripPrefix, addPrefix = "" } = probe.idTransform ?? {};
  const ignored = new Set(probe.ignoreIds ?? []);
  return [
    ...new Set(
      activeCatalogIds(rows, probe.provider)
        .filter((id) => !ignored.has(id))
        .map(
          (id) =>
            addPrefix +
            (stripPrefix && id.startsWith(stripPrefix) ? id.slice(stripPrefix.length) : id)
        )
    ),
  ].sort(byCodeUnit);
}

function compareIds(catalogIds, liveIds) {
  const catalog = new Set(catalogIds);
  const live = new Set(liveIds);
  const missing = catalogIds.filter((id) => !live.has(id));
  return {
    missing,
    added: liveIds.filter((id) => !catalog.has(id)),
    stats: {
      liveIds: liveIds.length,
      catalogIds: catalogIds.length,
      aliveCatalogIds: catalogIds.length - missing.length,
    },
  };
}

export function measureText(probe, source) {
  return probe.type === "page-text" ? htmlToText(source.text).length : null;
}

export function classifyResponse(probe, source, prevTextChars = null) {
  if (probe.type === "page-text") {
    const plain = htmlToText(source.text);
    const match = normalizeForMatch(plain);
    if (
      plain.length < (probe.minTextChars ?? 200) ||
      /cf-chl/i.test(source.text) ||
      ["just a moment...", "attention required", "enable javascript and cookies"].some((marker) =>
        match.includes(marker)
      )
    ) {
      return "invalid-response";
    }
    if (
      prevTextChars !== null &&
      plain.length < prevTextChars * 0.5 &&
      probe.mustContain?.length &&
      probe.mustContain.every((phrase) => !match.includes(normalizeForMatch(phrase)))
    ) {
      return "invalid-response";
    }
    return "ok";
  }

  let document;
  try {
    document = JSON.parse(source.text);
  } catch {
    return "invalid-response";
  }
  if (
    document === null ||
    typeof document !== "object" ||
    document.error ||
    (Array.isArray(document.errors) && document.errors.length)
  ) {
    return "invalid-response";
  }
  if (probe.type === "model-list" && modelListIds(document, probe).length < probe.minIds) {
    return "invalid-response";
  }
  return "ok";
}

function evaluateModelList(probe, document, catalogIds) {
  const { missing, added, stats } = compareIds(catalogIds, modelListIds(document, probe));
  const findings = [];
  if (missing.length) {
    const message =
      missing.length === 1
        ? "1 catalog model id is no longer listed as free"
        : missing.length + " catalog model ids are no longer listed as free";
    findings.push(finding(probe, "ids-missing", message, { ids: missing }));
  }
  if (added.length) {
    const message =
      added.length === 1
        ? "1 free model id is absent from the catalog"
        : added.length + " free model ids are absent from the catalog";
    findings.push(finding(probe, "ids-added", message, { ids: added }));
  }
  return { findings, stats };
}

function assertionMatches(op, actual, expected) {
  if (op === "equals" || op === "lengthEquals") return isDeepStrictEqual(actual, expected);
  return typeof actual === "number" && typeof expected === "number" && actual >= expected;
}

function evaluateJsonAssertions(probe, document, catalogIds) {
  const findings = [];
  let stats = null;
  for (const { path, op, value } of probe.assertions) {
    const selected = selectPath(document, path);
    const message = "JSON assertion failed at " + path + " (" + op + ")";
    if (op === "includesCatalogIds") {
      const liveIds = readIds(selected);
      const comparison = compareIds(catalogIds, liveIds);
      stats = comparison.stats;
      if (comparison.missing.length) {
        findings.push(
          finding(probe, "assertion-failed", message, {
            path,
            op,
            expected: catalogIds,
            actual: liveIds,
            missing: comparison.missing,
          })
        );
      }
      continue;
    }
    const actual = op.startsWith("length") ? selected?.length : selected;
    if (!assertionMatches(op, actual, value)) {
      findings.push(
        finding(probe, "assertion-failed", message, {
          path,
          op,
          expected: value ?? null,
          actual: actual ?? null,
        })
      );
    }
  }
  return { findings, stats };
}

function evaluatePageText(probe, text, catalogIds) {
  const plain = htmlToText(text);
  const match = normalizeForMatch(plain);
  const findings = [];
  for (const phrase of probe.mustContain ?? []) {
    if (!match.includes(normalizeForMatch(phrase))) {
      findings.push(finding(probe, "phrase-missing", "Expected phrase is missing", { phrase }));
    }
  }
  for (const phrase of probe.mustNotContain ?? []) {
    if (match.includes(normalizeForMatch(phrase))) {
      findings.push(finding(probe, "phrase-present", "Unexpected phrase is present", { phrase }));
    }
  }
  if (probe.mustContainCatalogIds) {
    const pageIds = new Set(plain.match(/[a-z0-9_]+(?:[./:+@-]+[a-z0-9_]+)*/gi));
    const ids = catalogIds.filter((id) => !pageIds.has(id));
    if (ids.length)
      findings.push(
        finding(probe, "phrase-missing", "Catalog model ids are missing from the page", { ids })
      );
  }
  if (probe.excerpt) {
    const { anchor, chars, sha256_16: expected } = probe.excerpt;
    const excerpt = extractExcerpt(match, anchor, chars);
    if (excerpt === null) {
      findings.push(finding(probe, "anchor-missing", "Excerpt anchor is missing", { anchor }));
    } else {
      const actual = shortHash(excerpt);
      if (actual !== expected) {
        findings.push(
          finding(probe, "excerpt-changed", "Page excerpt has changed", {
            expected,
            actual,
            excerpt: excerpt.slice(0, 280),
          })
        );
      }
    }
  }
  return { findings, stats: null };
}

/** @returns {{ findings: Finding[], stats: ProbeStats|null }} */
export function evaluateProbe(probe, source, { catalogRows }) {
  const catalogIds = expectedIds(catalogRows, probe);
  if (probe.type === "page-text") return evaluatePageText(probe, source.text, catalogIds);
  const document = JSON.parse(source.text);
  if (probe.type === "json-assert") return evaluateJsonAssertions(probe, document, catalogIds);
  return evaluateModelList(probe, document, catalogIds);
}

/** @returns {Finding[]} */
export function backsFindings(probe, catalogRows) {
  const findings = [];
  for (const { monthlyTokens: expected, ...back } of probe.backs ?? []) {
    const catalog = catalogPoolValue(catalogRows, back);
    if (catalog !== expected) {
      findings.push(
        finding(
          probe,
          "manifest-out-of-sync",
          "The catalog and the probe expectation disagree; one of the two is stale",
          { ...back, expected, catalog }
        )
      );
    }
  }
  return findings;
}
