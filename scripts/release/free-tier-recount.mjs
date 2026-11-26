#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { FACTS_SNAPSHOT_PATH, getFactAt, loadFactsSnapshot } from "./facts.mjs";

export const RECOUNT_KEYS = [
  "providers",
  "code.headlineSteady",
  "code.headlineSteadyLabel",
  "code.headlineFirstLabel",
  "code.rowSumLiveLabel",
  "code.rowSumTotalLabel",
  "code.rowSumRetiredShare",
  "code.freeProviders.total",
  "code.freeProviders.apiKey",
  "code.freeProviders.keyless",
  "code.freeProviders.toolAccount",
  "code.freeProviders.webChat",
  "code.freeModels",
  "code.freeAccessRows",
  "code.freePublishedPools",
  "code.hasFreeProviders",
  "code.freeForever",
  "code.catalogDate",
  "code.freeSearchProviders",
  "code.freeFetchProviders",
  "code.freeAudioProviders",
  "code.freeMediaProviders",
];

const TOKEN_CONTEXT = /tokens?|free|real|count/i;

export const RECOUNT_CONTEXT = {
  providers: /providers/i,
  "code.headlineSteady": TOKEN_CONTEXT,
  "code.headlineSteadyLabel": TOKEN_CONTEXT,
  "code.headlineFirstLabel": TOKEN_CONTEXT,
  "code.rowSumLiveLabel": TOKEN_CONTEXT,
  "code.rowSumTotalLabel": TOKEN_CONTEXT,
  "code.rowSumRetiredShare": TOKEN_CONTEXT,
  "code.freeProviders.total": /free access|providers with free|free providers/i,
  "code.freeProviders.apiKey": /api[-\s]*keys?/i,
  "code.freeProviders.keyless": /keyless|no[-\s]+(?:api[-\s]+)?key/i,
  "code.freeProviders.toolAccount": /tool[-\s]+accounts?/i,
  "code.freeProviders.webChat": /web[-\s]+chat/i,
  "code.freeModels": /free models?|models? (?:are )?free/i,
  "code.freeAccessRows": /\brows?\b|catalog(?:ed)? entries|free[-\s]+tier entries/i,
  "code.freePublishedPools": /pools?/i,
  "code.hasFreeProviders":
    /free offer|free[-\s]+(?:provider[-\s]+)?tiers?|marked[-\s]+free|hasFree|with a free/i,
  "code.freeForever": /free[-\s]+forever|permanently[-\s]+free/i,
  "code.catalogDate": /catalog|last (?:checked|updated)|as of/i,
  "code.freeSearchProviders": /search/i,
  "code.freeFetchProviders": /fetch/i,
  "code.freeAudioProviders": /audio|voice|speech|transcri(?:be|ption)/i,
  "code.freeMediaProviders": /media|images?|video/i,
};

export const LEGACY_SPELLINGS = {
  "code.hasFreeProviders": ["150+", "155", "153", "160"],
  "code.freeProviders.total": ["74", "67"],
  "code.freeAccessRows": ["465", "458", "359"],
  "code.freePublishedPools": ["34"],
  "code.freeModels": ["367", "295"],
};

export const MANUAL_SURFACES = [
  "README.md",
  "docs/reference/FREE_TIERS.md",
  "docs/getting-started/FREE-TIERS-GUIDE.md",
  "docs/getting-started/SELF_HOST_GUIDE.md",
  "docs/guides/FREE_PROVIDER_RANKINGS.md",
  "docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md",
  "llm.txt",
  "package.json",
  "news.json",
  "src/i18n/messages/en.json",
  "bin/cli/locales/en.json",
];

const EXTERNAL_SURFACES = [
  {
    surface: "GitHub description, topics, and homepage",
    check:
      "gh repo view cheaper-inference/OmniRoute --json description,repositoryTopics,homepageUrl",
  },
  { surface: "Translation mirrors", check: "npm run i18n:check" },
  { surface: "Site", check: "site sync script in the site repository, after a published release" },
];

function sortedJson(value) {
  return JSON.stringify(value, (_key, item) => {
    if (item === null || typeof item !== "object" || Array.isArray(item)) return item;
    return Object.fromEntries(
      Object.keys(item)
        .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
        .map((key) => [key, item[key]])
    );
  });
}

export function diffFacts(before, after) {
  const changes = [];
  for (const key of RECOUNT_KEYS) {
    const oldValue = getFactAt(before, key);
    const newValue = getFactAt(after, key);
    if (sortedJson(oldValue) !== sortedJson(newValue)) {
      changes.push({ key, before: oldValue, after: newValue });
    }
  }
  return changes;
}

export function spellings(_key, value) {
  if (typeof value === "string") return [value];
  if (typeof value !== "number") return [];

  const forms = new Set([String(value)]);
  for (const step of [10, 50]) {
    if (value >= step) forms.add(`${Math.floor(value / step) * step}+`);
  }
  return [...forms];
}

export function findStaleClaims({ changes, files }) {
  const previous = new Map(changes.map(({ key, before }) => [key, before]));
  const patterns = [];
  for (const key of RECOUNT_KEYS) {
    const forms = new Set([...spellings(key, previous.get(key)), ...(LEGACY_SPELLINGS[key] ?? [])]);
    const alternatives = [...forms]
      .filter(Boolean)
      .map((form) => form.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    if (alternatives.length === 0) continue;

    // A decimal or version continues across a dot. Rounded forms carry a literal plus.
    const claim = new RegExp(
      `(?<![\\p{L}\\p{N}])(?<!\\p{N}\\.)(?:${alternatives.join("|")})(?![\\p{L}\\p{N}+]|\\.\\p{N})`,
      "u"
    );
    patterns.push({ key, claim });
  }

  const findings = new Map();
  for (const file of files) {
    const lines = file.content.split(/\r?\n/);
    for (const [index, line] of lines.entries()) {
      for (const { key, claim } of patterns) {
        if (!RECOUNT_CONTEXT[key].test(line) || !claim.test(line)) continue;
        const finding = { path: file.path, line: index + 1, key, text: line.trim() };
        findings.set(JSON.stringify([finding.path, finding.line, key]), finding);
      }
    }
  }
  return [...findings.values()];
}

function readSnapshot(root, ref, option) {
  try {
    const snapshot =
      option === "after" && ref === "working"
        ? loadFactsSnapshot(root)
        : JSON.parse(
            execFileSync(
              "git",
              [
                "show",
                "--no-ext-diff",
                "--no-textconv",
                "--end-of-options",
                `${ref}:${FACTS_SNAPSHOT_PATH}`,
              ],
              { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
            )
          );
    if (snapshot && typeof snapshot === "object" && !Array.isArray(snapshot)) return snapshot;
  } catch {
    // Report ref and snapshot read failures through the same CLI error.
  }
  throw new Error(`Cannot read ${FACTS_SNAPSHOT_PATH} for --${option}=${ref}`);
}

function readManualSurfaces(root) {
  const files = [];
  for (const surface of MANUAL_SURFACES) {
    try {
      files.push({ path: surface, content: readFileSync(path.join(root, surface), "utf8") });
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  return files;
}

function runCli(argv) {
  let options;
  try {
    const { values } = parseArgs({
      args: argv,
      options: {
        before: { type: "string" },
        after: { type: "string", default: "working" },
        json: { type: "boolean" },
      },
    });
    if (!values.before || !values.after) throw new Error("A Git ref is required");
    options = values;
  } catch {
    console.error(
      "Usage: node scripts/release/free-tier-recount.mjs " +
        "--before=<git-ref> [--after=working|<git-ref>] [--json]"
    );
    return 2;
  }

  try {
    const root = fileURLToPath(new URL("../../", import.meta.url));
    const before = readSnapshot(root, options.before, "before");
    const after = readSnapshot(root, options.after, "after");
    const changes = diffFacts(before, after);
    const findings = findStaleClaims({ changes, files: readManualSurfaces(root) });

    if (options.json) {
      console.log(
        JSON.stringify({ changes, findings, externalSurfaces: EXTERNAL_SURFACES }, null, 2)
      );
      return 0;
    }

    console.log(`Snapshot changes (${changes.length})`);
    for (const { key, before, after } of changes) {
      console.log(
        `${key}: ${sortedJson(before) ?? "(missing)"} → ${sortedJson(after) ?? "(missing)"}`
      );
    }
    console.log(`\nPotential stale claims (${findings.length})`);
    for (const { path, line, key, text } of findings)
      console.log(`${path}:${line} [${key}] ${text}`);
    console.log("\nExternal surfaces to check");
    for (const { surface, check } of EXTERNAL_SURFACES) console.log(`${surface}: ${check}`);
    return 0;
  } catch (error) {
    console.error(`[free-tier-recount] ${error.message}`);
    return 2;
  }
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  process.exitCode = runCli(process.argv.slice(2));
}
