import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parseArgs } from "node:util";

import { isMainModule } from "../../lib/is-main-module.mjs";

export const ISSUE_LABEL = "catalog-drift";
export const ISSUE_TITLE_PREFIX = "catalog-drift: ";

const PROVIDER_ID = /^[a-z0-9][a-z0-9._-]*$/;
const FINGERPRINT = /^[a-f0-9]{16}$/;
const MONTH = /^\d{4}-(?:0[1-9]|1[0-2])$/;
const FIX_GUIDE =
  "https://github.com/cheaper-inference/OmniRoute/blob/main/CONTRIBUTING.md#fix-a-free-plan-in-10-minutes";
const STALE_BASELINE_COMMENT =
  "The probe still sees the old baseline: update scripts/quality/catalog-drift/manifest.json in the pull request that fixed the catalog.";

/** @typedef {{ number: number, state: "OPEN"|"CLOSED", stateReason: string|null, title: string, body: string }} IssueRef */
/** @typedef {{ type: "create"|"update"|"close"|"none"|"suppressed", provider: string, issueNumber?: number,
 *   title?: string, body?: string, comment?: string }} IssueAction */
/** @typedef {import("./report.mjs").DriftReport} DriftReport */

export function parseMarkers(body = "") {
  return {
    provider: body.match(/<!-- catalog-drift:provider=([a-z0-9][a-z0-9._-]*) -->/)?.[1] ?? null,
    fingerprint: body.match(/<!-- catalog-drift:fingerprint=([a-f0-9]{16}) -->/)?.[1] ?? null,
    staleBaseline: body.match(/<!-- catalog-drift:stale-baseline=([a-f0-9]{16}) -->/)?.[1] ?? null,
    scoreboardMonth:
      body.match(/<!-- catalog-scoreboard:month=(\d{4}-(?:0[1-9]|1[0-2])) -->/)?.[1] ?? null,
  };
}

function markdownText(value) {
  return String(value)
    .replace(/[\r\n]+/g, " ")
    .replace(/[\\`*_\[\]<>&@|]/g, "\\$&");
}

function inlineCode(value) {
  return (
    "`" +
    String(value)
      .replace(/[\r\n]+/g, " ")
      .replaceAll("`", "'") +
    "`"
  );
}

function httpsLink(url) {
  const parsed = typeof url === "string" ? URL.parse(url) : null;
  return parsed?.protocol === "https:" && !parsed.username && !parsed.password
    ? "<" + parsed.href + ">"
    : null;
}

function renderFinding({ message, probeId, kind, details }, probes) {
  const url = httpsLink(probes.get(probeId));
  let line = "- " + markdownText(message) + (url ? " (" + url + ")" : "");
  if (typeof details.phrase === "string") line += " " + inlineCode(details.phrase);
  if (kind === "excerpt-changed" && typeof details.excerpt === "string") {
    line += "\n  Excerpt " + inlineCode(details.excerpt.slice(0, 280));
  }
  return line;
}

/** @param {{ provider: string, report: DriftReport, runUrl: string }} options */
export function renderIssueBody({ provider, report, runUrl }) {
  const { fingerprint, findings, catalogRows, notInCatalog } = report.providers[provider];
  if (!PROVIDER_ID.test(provider) || !fingerprint || !FINGERPRINT.test(fingerprint)) {
    throw new Error("Invalid catalog drift provider or fingerprint");
  }
  const probes = new Map(report.probes.map(({ id, url }) => [id, url]));
  const lines = [
    "<!-- catalog-drift:provider=" + provider + " -->",
    "<!-- catalog-drift:fingerprint=" + fingerprint + " -->",
    "",
    "## What changed",
    "",
    ...findings
      .filter(({ severity }) => severity === "drift")
      .map((finding) => renderFinding(finding, probes)),
    "",
    "## Catalog rows",
    "",
  ];
  if (notInCatalog) {
    lines.push("Not in the catalog yet: a candidate for the provider coverage waves.");
  } else {
    for (const { modelId, poolKey, monthlyTokens, freeType } of catalogRows.slice(0, 20)) {
      lines.push(
        "- " +
          inlineCode(modelId) +
          " · " +
          inlineCode(poolKey ?? modelId) +
          " · " +
          monthlyTokens +
          " tokens per month · " +
          inlineCode(freeType)
      );
    }
    if (catalogRows.length > 20) lines.push("- and " + (catalogRows.length - 20) + " more");
  }

  const info = findings.filter(({ severity }) => severity === "info");
  if (info.length)
    lines.push("", "## Also seen", "", ...info.map((finding) => renderFinding(finding, probes)));
  lines.push(
    "",
    "## How to fix",
    "",
    "In the same pull request, update the catalog and this provider's probe in `scripts/quality/catalog-drift/manifest.json`. Check the phrase, `excerpt.sha256_16`, or `backs`, as applicable.",
    "",
    "[Fix a free plan in 10 minutes](" + FIX_GUIDE + ")",
    "",
    "Run " + (httpsLink(runUrl) ?? markdownText(runUrl)),
    "",
    "This issue comes from the daily catalog drift check. The check never edits the catalog; a person fixes it in a pull request."
  );
  return lines.join("\n") + "\n";
}

/** @returns {IssueAction} */
function planProvider({ provider, report, runUrl, issues }) {
  const none = { type: "none", provider };
  if (!Object.hasOwn(report.providers, provider)) return none;

  const { fingerprint, allProbesFetched, consecutiveRuns, notInCatalog } =
    report.providers[provider];
  const open = issues.find(({ issue }) => issue.state === "OPEN");
  if (open) {
    const issueNumber = open.issue.number;
    if (!fingerprint) {
      return allProbesFetched
        ? { type: "close", provider, issueNumber, comment: "All probes ran and the drift is gone." }
        : none;
    }
    if (fingerprint === open.markers.fingerprint) return none;
    return {
      type: "update",
      provider,
      issueNumber,
      body: renderIssueBody({ provider, report, runUrl }),
      comment: "The latest run found a different change. The issue body has the new details.",
    };
  }
  if (!fingerprint) return none;

  const closed = issues.filter(
    ({ issue, markers }) => issue.state === "CLOSED" && markers.fingerprint === fingerprint
  );
  const notPlanned = closed.find(({ issue }) => issue.stateReason === "NOT_PLANNED");
  if (notPlanned) return { type: "suppressed", provider, issueNumber: notPlanned.issue.number };
  const completed = closed.find(({ issue }) => issue.stateReason === "COMPLETED");
  if (completed) {
    const suppressed = { type: "suppressed", provider, issueNumber: completed.issue.number };
    if (completed.markers.staleBaseline === fingerprint) return suppressed;
    return {
      ...suppressed,
      body:
        completed.issue.body.trimEnd() +
        "\n\n<!-- catalog-drift:stale-baseline=" +
        fingerprint +
        " -->\n",
      comment: STALE_BASELINE_COMMENT,
    };
  }
  return consecutiveRuns >= 2
    ? {
        type: "create",
        provider,
        title: ISSUE_TITLE_PREFIX + provider + (notInCatalog ? " (not listed)" : ""),
        body: renderIssueBody({ provider, report, runUrl }),
      }
    : none;
}

/** @param {{ report: DriftReport, issues: IssueRef[], runUrl: string, maxCreates?: number }} options
 *  @returns {IssueAction[]} */
export function planIssueActions({ report, issues, runUrl, maxCreates = 10 }) {
  const byProvider = new Map();
  for (const issue of issues) {
    const markers = parseMarkers(issue.body);
    if (!markers.provider) continue;
    if (!byProvider.has(markers.provider)) byProvider.set(markers.provider, []);
    byProvider.get(markers.provider).push({ issue, markers });
  }
  const providers = new Set([...Object.keys(report.providers), ...byProvider.keys()]);
  const actions = [...providers].map((provider) =>
    planProvider({ provider, report, runUrl, issues: byProvider.get(provider) ?? [] })
  );
  const creates = actions.filter(({ type }) => type === "create").length;
  if (creates > maxCreates)
    throw new Error("Catalog drift would open " + creates + " issues (limit " + maxCreates + ")");
  return actions;
}

/** @param {{ month: string, issues: IssueRef[] }} options @returns {IssueAction} */
export function planScoreboardReminder({ month, issues }) {
  if (!MONTH.test(month)) throw new Error("--month must be YYYY-MM");
  const provider = "catalog-scoreboard";
  if (issues.some(({ body }) => parseMarkers(body).scoreboardMonth === month)) {
    return { type: "none", provider };
  }
  return {
    type: "create",
    provider,
    title: "Monthly catalog scoreboard due: " + month,
    body: [
      "<!-- catalog-scoreboard:month=" + month + " -->",
      "",
      "The free-tier catalog scoreboard is due for " + month + ".",
      "",
      "1. Run `npm run quality:catalog-scoreboard -- --help` for the required inputs.",
      "2. Check the sampled providers and record the evidence.",
      "3. Generate the scoreboard and submit it in a pull request.",
      "",
    ].join("\n"),
  };
}

/** @param {IssueAction[]} actions @param {{ repo: string, gh: (args: string[]) => string }} options */
export function applyIssueActions(actions, { repo, gh }) {
  const dir = mkdtempSync(join(tmpdir(), "catalog-drift-issues-"));
  const file = join(dir, "body.md");
  const repoArgs = ["--repo", repo];
  function withBody(args, text) {
    writeFileSync(file, text);
    return gh([...args, "--body-file", file]);
  }
  try {
    for (const { type, issueNumber, title, body, comment } of actions) {
      const number = String(issueNumber);
      if (type === "create") {
        withBody(["issue", "create", ...repoArgs, "--title", title, "--label", ISSUE_LABEL], body);
      } else if (type === "close") {
        gh(["issue", "close", number, ...repoArgs, "--reason", "completed", "--comment", comment]);
      } else if (type === "update" || (type === "suppressed" && comment)) {
        withBody(["issue", "edit", number, ...repoArgs], body);
        withBody(["issue", "comment", number, ...repoArgs], comment);
      }
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function main() {
  const { values } = parseArgs({
    options: {
      repo: { type: "string" },
      report: { type: "string" },
      "run-url": { type: "string" },
      issues: { type: "string" },
      "dry-run": { type: "boolean" },
      apply: { type: "boolean" },
      "scoreboard-reminder": { type: "boolean" },
      month: { type: "string" },
    },
  });

  if (!values.repo || !/^[\w.-]+\/[\w.-]+$/.test(values.repo))
    throw new Error("--repo owner/name is required");
  if ([values.issues, values["dry-run"], values.apply].filter(Boolean).length !== 1) {
    throw new Error("Choose one of --issues <file>, --dry-run, or --apply");
  }
  if (values["scoreboard-reminder"]) {
    if (!MONTH.test(values.month ?? "") || values.report || values["run-url"]) {
      throw new Error("Use --scoreboard-reminder with --month YYYY-MM");
    }
  } else if (!values.report || !httpsLink(values["run-url"]) || values.month) {
    throw new Error("Use --report <file> with --run-url <https-url>");
  }

  const gh = (args) => execFileSync("gh", args, { encoding: "utf8" });
  const issues = JSON.parse(
    values.issues
      ? readFileSync(values.issues, "utf8")
      : gh([
          "issue",
          "list",
          "--repo",
          values.repo,
          "--label",
          ISSUE_LABEL,
          "--state",
          "all",
          "--limit",
          "300",
          "--json",
          "number,state,stateReason,title,body",
        ])
  );
  const actions = values["scoreboard-reminder"]
    ? [planScoreboardReminder({ month: values.month, issues })]
    : planIssueActions({
        report: JSON.parse(readFileSync(values.report, "utf8")),
        issues,
        runUrl: values["run-url"],
      });
  if (values.apply) applyIssueActions(actions, { repo: values.repo, gh });
  console.log(JSON.stringify(actions, null, 2));
}

if (isMainModule(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
