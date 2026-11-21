#!/usr/bin/env node
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { CHANGE_DOMAINS } from "./classify-pr-changes.mjs";

const VALIDATION_ALIAS =
  /^(check(?::|$)|test(?::|$)|quality:|lint(?::|$)|typecheck:|audit:|i18n:check)/;
const DISPOSITIONS = new Set(["separately-invoked", "maintenance", "pr-dependent"]);
const isRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Shell and YAML comments are never executed. Drop full-line and trailing
// comments before resolving aliases or delegated scripts, so a documented
// invocation cannot satisfy a workflow requirement.
export function executableCommands(text) {
  return String(text)
    .split(/\r?\n/)
    .map((line) => {
      let quote = null;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (quote) {
          if (ch === quote && line[i - 1] !== "\\") quote = null;
          continue;
        }
        if (ch === "'" || ch === '"') {
          quote = ch;
          continue;
        }
        if (ch === "#" && (i === 0 || /\s/.test(line[i - 1]))) return line.slice(0, i);
      }
      return line;
    })
    .join("\n");
}

// Inventory membership does not imply execution, requiredness or acceptance.
// Profiles select executable aliases; other aliases remain explicitly separate.
export function validateManifest(manifest, scripts, opts = {}) {
  const errors = [];
  if (manifest?.schemaVersion !== 1) errors.push("unsupported manifest schema");
  if (!Array.isArray(manifest?.aliases)) return [...errors, "missing aliases"];
  const entries = new Map();
  for (const entry of manifest.aliases) {
    if (!entry || typeof entry.name !== "string" || !VALIDATION_ALIAS.test(entry.name)) {
      errors.push("invalid validation alias");
      continue;
    }
    if (entries.has(entry.name)) errors.push(`duplicate alias: ${entry.name}`);
    entries.set(entry.name, entry);
    if (!Object.hasOwn(scripts, entry.name)) errors.push(`removed alias: ${entry.name}`);
    else if (entry.command !== scripts[entry.name]) errors.push(`command drift: ${entry.name}`);
    if (!DISPOSITIONS.has(entry.disposition)) errors.push(`invalid disposition: ${entry.name}`);
  }
  for (const name of Object.keys(scripts).filter((name) => VALIDATION_ALIAS.test(name))) {
    if (!entries.has(name)) errors.push(`unmapped alias: ${name}`);
  }
  if (
    !manifest.profiles ||
    typeof manifest.profiles !== "object" ||
    Array.isArray(manifest.profiles)
  ) {
    return [...errors, "missing profiles"];
  }
  if (Object.keys(manifest.profiles).length === 0) errors.push("empty profiles");
  for (const [name, profile] of Object.entries(manifest.profiles)) {
    if (!profile || typeof profile.description !== "string" || !profile.description.trim()) {
      errors.push(`missing profile description: ${name}`);
    }
    if (!Array.isArray(profile?.aliases) || profile.aliases.length === 0) {
      errors.push(`empty profile: ${name}`);
      continue;
    }
    const seen = new Set();
    for (const alias of profile.aliases) {
      if (seen.has(alias)) errors.push(`duplicate profile member: ${name}/${alias}`);
      seen.add(alias);
      const entry = entries.get(alias);
      if (!entry) errors.push(`unknown profile member: ${name}/${alias}`);
      if (entry?.disposition === "maintenance")
        errors.push(`maintenance in scan: ${name}/${alias}`);
      if (entry?.disposition === "pr-dependent")
        errors.push(`pr-dependent in scan: ${name}/${alias}`);
    }
  }
  // A PR-dependent alias must be invoked from a workflow `run:` line. Passing
  // workflowSources is optional so scratch fixtures and resolveProfile keep
  // working without the workflow files; the committed inventory always supplies
  // them through readManifest().
  if (Array.isArray(opts.workflowSources)) {
    const sources = executableCommands(opts.workflowSources.join("\n"));
    for (const entry of manifest.aliases) {
      if (entry?.disposition !== "pr-dependent") continue;
      const invoked = new RegExp(`npm\\s+run(?:\\s+--silent)?\\s+${escapeRe(entry.name)}\\b`).test(
        sources
      );
      if (!invoked) errors.push(`pr-dependent alias not invoked by any workflow: ${entry.name}`);
    }
  }
  return errors;
}

function validateAdmissionProfile(profile, name) {
  if (!isRecord(profile?.jobs) || !Object.keys(profile.jobs).length) {
    return [`invalid admission jobs: ${name}`];
  }
  return Object.entries(profile.jobs).flatMap(([id, rule]) => {
    const domains = rule?.domains;
    if (!Array.isArray(domains) || !domains.length) return [`missing domains: ${name}/${id}`];
    if (
      new Set(domains).size !== domains.length ||
      domains.some((domain) => !CHANGE_DOMAINS.includes(domain))
    ) {
      return [`invalid domains: ${name}/${id}`];
    }
    return [];
  });
}

// Domains annotate existing job groups; admission still uses its legacy conditions.
function validateAdmissionDomains(policy) {
  if (
    policy?.schemaVersion !== 1 ||
    !isRecord(policy.profiles) ||
    Object.keys(policy.profiles).sort().join(",") !== "ci,quality"
  ) {
    return ["invalid admission policy profiles/schema"];
  }
  return Object.entries(policy.profiles).flatMap(([name, profile]) =>
    validateAdmissionProfile(profile, name)
  );
}

// Workflow `run:` blocks may delegate to a local script (the PR detectors are
// grouped by a single sequencer). Collect those script bodies too, so every
// PR-dependent alias is checked against its real workflow entrypoint.
function workflowSources(root) {
  const dir = resolve(root, ".github/workflows");
  let files = [];
  try {
    files = readdirSync(dir).filter((f) => /\.ya?ml$/.test(f));
  } catch {
    return [];
  }
  const texts = files.map((f) => readFileSync(resolve(dir, f), "utf8"));
  const joined = executableCommands(texts.join("\n"));
  const delegated = new Set();
  // Direct `bash scripts/...` / `node scripts/...` calls inside run: blocks.
  for (const m of joined.matchAll(
    /\b(?:bash|sh|node)\s+(scripts\/[\w./-]+\.(?:sh|mjs|cjs|js))\b/g
  )) {
    delegated.add(m[1]);
  }
  // npm aliases are the other entrypoint: a workflow calls `npm run <alias>`,
  // and package.json maps it to a local script that may itself call more gates.
  let scripts = {};
  try {
    scripts = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8")).scripts ?? {};
  } catch {
    scripts = {};
  }
  for (const m of joined.matchAll(/\bnpm\s+run(?:\s+--silent)?\s+([\w:-]+)/g)) {
    const command = scripts[m[1]];
    if (!command) continue;
    for (const p of command.matchAll(/(scripts\/[\w./-]+\.(?:sh|mjs|cjs|js))/g))
      delegated.add(p[1]);
  }
  for (const rel of delegated) {
    const p = resolve(root, rel);
    if (existsSync(p)) texts.push(executableCommands(readFileSync(p, "utf8")));
  }
  return texts;
}

export function readManifest(root = process.cwd()) {
  const manifest = JSON.parse(
    readFileSync(resolve(root, "config/quality/gate-manifest.json"), "utf8")
  );
  const { scripts } = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
  const errors = validateManifest(manifest, scripts, { workflowSources: workflowSources(root) });
  if (errors.length) throw new Error(errors.join("\n"));
  if (manifest.admissionPolicy !== "config/quality/admission-policy.json") {
    throw new Error("invalid admission policy reference");
  }
  const policy = JSON.parse(readFileSync(resolve(root, manifest.admissionPolicy), "utf8"));
  const domainErrors = validateAdmissionDomains(policy);
  if (domainErrors.length) throw new Error(domainErrors.join("\n"));
  return { manifest, scripts };
}

export function resolveProfile(manifest, scripts, name) {
  const errors = validateManifest(manifest, scripts);
  if (errors.length) throw new Error(errors.join("\n"));
  if (!Object.hasOwn(manifest.profiles, name)) throw new Error(`unknown profile: ${name}`);
  return manifest.profiles[name].aliases.map((alias) => ({
    name: alias,
    cmd: [process.platform === "win32" ? "npm.cmd" : "npm", "run", "--silent", alias],
  }));
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  try {
    const { manifest } = readManifest();
    console.log(
      JSON.stringify(
        {
          schemaVersion: manifest.schemaVersion,
          aliases: manifest.aliases.length,
          profiles: Object.fromEntries(
            Object.entries(manifest.profiles).map(([name, profile]) => [
              name,
              profile.aliases.length,
            ])
          ),
          releaseAcceptance: false,
        },
        null,
        2
      )
    );
  } catch (error) {
    console.error(`[gate-manifest] ${error.message}`);
    process.exitCode = 1;
  }
}
