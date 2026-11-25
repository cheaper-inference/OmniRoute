import { summarizeCatalogRows } from "./catalog.mjs";
import { shortHash } from "./normalize.mjs";
import { byCodeUnit } from "./order.mjs";

/** @typedef {import("./probes.mjs").Finding} Finding */
/** @typedef {import("./probes.mjs").ProbeStats} ProbeStats */
/** @typedef {{ id: string, provider: string, type: string, url: string,
 *   status: "ok"|"drift"|"fetch-failed"|"invalid-response"|"skipped",
 *   httpStatus: number|null, textChars: number|null, detail?: string, findings: Finding[], stats: ProbeStats|null }} ProbeResult */
/** @typedef {{ findings: Finding[], fingerprint: string|null, allProbesFetched: boolean, consecutiveRuns: number,
 *   notInCatalog: boolean, catalogRows: Array<{ modelId: string, poolKey: string|null, monthlyTokens: number, freeType: string }> }} ProviderReport */
/** @typedef {{ schemaVersion: 1, runAt: string, catalogCuratedAt: string, manifestReviewedAt: string,
 *   only: string|null, probes: ProbeResult[], providers: Record<string, ProviderReport> }} DriftReport */

function stableKey({ kind, details }) {
  if (Array.isArray(details.ids)) return JSON.stringify([...details.ids].sort(byCodeUnit));
  if (kind === "assertion-failed") return JSON.stringify([details.path, details.op]);
  if (kind === "excerpt-changed") return details.actual;
  if (kind === "anchor-missing") return details.anchor;
  if (kind === "manifest-out-of-sync") {
    return JSON.stringify([
      details.provider,
      details.poolKey,
      details.modelId,
      details.expected,
      details.catalog,
    ]);
  }
  return details.phrase ?? "";
}

/** @param {Finding[]} findings @returns {string|null} */
export function providerFingerprint(findings) {
  const keys = findings
    .filter(({ severity }) => severity === "drift")
    .map((finding) => [finding.kind, finding.probeId, stableKey(finding)].join("|"))
    .sort(byCodeUnit);
  return keys.length ? shortHash(keys.join("\n")) : null;
}

function fetched({ status }) {
  return status === "ok" || status === "drift";
}

/** @returns {DriftReport} */
export function buildReport({
  runAt,
  catalogCuratedAt,
  manifest,
  probeResults,
  catalogRows,
  only = null,
}) {
  const probesByProvider = new Map();
  for (const probe of probeResults) {
    if (!probesByProvider.has(probe.provider)) probesByProvider.set(probe.provider, []);
    probesByProvider.get(probe.provider).push(probe);
  }
  const providers = Object.fromEntries(
    [...probesByProvider].map(([provider, probes]) => {
      const findings = probes.flatMap((probe) => probe.findings);
      const fingerprint = providerFingerprint(findings);
      const rows = summarizeCatalogRows(catalogRows, provider);
      return [
        provider,
        {
          findings,
          fingerprint,
          allProbesFetched: probes.every(fetched),
          consecutiveRuns: fingerprint ? 1 : 0,
          notInCatalog: rows.length === 0,
          catalogRows: rows,
        },
      ];
    })
  );

  return {
    schemaVersion: 1,
    runAt,
    catalogCuratedAt,
    manifestReviewedAt: manifest.reviewedAt,
    only,
    probes: probeResults,
    providers,
  };
}

function escapeMarkdown(value) {
  return String(value)
    .replace(/[\r\n]/g, " ")
    .replace(/[\\`*_[\]<>|]/g, "\\$&");
}

/** @param {DriftReport} report */
export function renderMarkdown(report) {
  const lines = [
    "# Catalog drift report",
    "",
    "Run at " + escapeMarkdown(report.runAt),
    "Catalog curated on " + escapeMarkdown(report.catalogCuratedAt),
    "Manifest reviewed on " + escapeMarkdown(report.manifestReviewedAt),
    "",
    "| provider | probes | drift | info | fetch failures |",
    "| --- | ---: | ---: | ---: | ---: |",
  ];
  const providers = Object.keys(report.providers).sort(byCodeUnit);
  for (const provider of providers) {
    const probes = report.probes.filter((probe) => probe.provider === provider);
    const { findings } = report.providers[provider];
    const drift = findings.filter(({ severity }) => severity === "drift").length;
    const failures = probes.filter(
      ({ status }) => status === "fetch-failed" || status === "invalid-response"
    ).length;
    lines.push(
      "| " +
        [escapeMarkdown(provider), probes.length, drift, findings.length - drift, failures].join(
          " | "
        ) +
        " |"
    );
  }

  for (const provider of providers) {
    const { findings } = report.providers[provider];
    if (!findings.length) continue;
    lines.push("", "## " + escapeMarkdown(provider), "");
    for (const { kind, probeId, message, details } of findings) {
      const detailText = JSON.stringify(details).replaceAll("`", "\\u0060");
      lines.push(
        "- **" +
          kind +
          "** (" +
          escapeMarkdown(probeId) +
          ") " +
          escapeMarkdown(message) +
          " `" +
          detailText +
          "`"
      );
    }
  }
  return lines.join("\n") + "\n";
}
