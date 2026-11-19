#!/usr/bin/env node
import { spawnSync } from "node:child_process";
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

// ---------------------------------------------------------------------------------------
// Gate-exemption registry — validation, non-growing ratchet, review reminders.
// No local imports and no third-party modules: this stays runnable before npm ci.
// ---------------------------------------------------------------------------------------

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const REFERENCE = /^(#\d+|https:\/\/)/;
const RELEASE_TAG = /^v\d+\.\d+\.\d+$/;
const constantName = (entry) =>
  typeof entry?.target === "string" && entry.target.includes("#")
    ? entry.target.slice(entry.target.lastIndexOf("#") + 1)
    : String(entry?.id ?? "")
        .split("/")
        .pop();

/** A `BASE:` key set on a job (as opposed to a step) is refused. */
function hasJobLevelBase(text) {
  const lines = String(text ?? "").split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (!/^\s*env:\s*$/.test(lines[i])) continue;
    const indent = lines[i].match(/^\s*/)[0].length;
    // Job-level `env:` sits at 4 spaces; step-level `env:` is nested deeper.
    if (indent > 4) continue;
    for (let j = i + 1; j < lines.length; j++) {
      const line = lines[j];
      if (line.trim() === "") continue;
      const current = line.match(/^\s*/)[0].length;
      if (current <= indent) break;
      if (/^\s+BASE\s*:/.test(line)) return true;
    }
  }
  return false;
}

/**
 * Validate the exemption registry against the exemptions actually present in
 * the tree. Pure: every fact is supplied by the caller, so the rules are unit
 * testable without git or the working tree.
 *
 * @param {{registry: object, baseRegistry?: object|null, detectedConstants?: string[],
 *   detectedFiles?: string[], knownTargets?: string[], markerFiles?: string[],
 *   workflowText?: string, profileAliases?: string[], prDependentAliases?: string[],
 *   releases?: string[], now?: string}} input
 * @returns {{errors: string[], warnings: string[], summary: object}}
 */
export function checkGateExemptions({
  registry,
  baseRegistry = null,
  baseLookup = "ok",
  bootstrap = false,
  detectedConstants = [],
  detectedIdentities = [],
  detectedFiles = [],
  knownTargets = [],
  markerFiles = [],
  workflowText = "",
  profileAliases = [],
  prDependentAliases = [],
  releases = [],
  now = "",
} = {}) {
  const errors = [];
  const warnings = [];

  if (registry?.schemaVersion !== 1) errors.push("unsupported registry schema");
  if (!registry || !Array.isArray(registry.exemptions)) {
    errors.push("missing exemptions");
    return { errors, warnings, summary: { new: 0, frozen: 0, total: 0, ratchet: "red" } };
  }
  if (!Number.isInteger(registry.baseline?.exemptions)) errors.push("missing exemption baseline");

  const entries = registry.exemptions;
  const ids = new Set();
  for (const entry of entries) {
    if (!entry || typeof entry.id !== "string" || !entry.id) {
      errors.push("entry without id");
      continue;
    }
    if (ids.has(entry.id)) errors.push(`duplicate exemption: ${entry.id}`);
    ids.add(entry.id);
    if (!["constant", "file"].includes(entry.kind)) errors.push(`invalid kind: ${entry.id}`);
    if (typeof entry.target !== "string" || !entry.target)
      errors.push(`missing target: ${entry.id}`);
    if (typeof entry.owner !== "string" || !entry.owner.trim())
      errors.push(`missing owner: ${entry.id}`);
    if (typeof entry.justification !== "string" || !entry.justification.trim())
      errors.push(`missing justification: ${entry.id}`);
    if (typeof entry.since !== "string" || !ISO_DATE.test(entry.since))
      errors.push(`justification not dated: ${entry.id}`);
    if (typeof entry.reference !== "string" || !REFERENCE.test(entry.reference))
      errors.push(`invalid reference: ${entry.id}`);
    if (!Array.isArray(entry.scope)) errors.push(`missing scope: ${entry.id}`);
    if (typeof entry.diffScope !== "boolean") errors.push(`missing diffScope: ${entry.id}`);
    if (
      typeof entry.lastReviewedRelease !== "string" ||
      !RELEASE_TAG.test(entry.lastReviewedRelease)
    )
      errors.push(`invalid lastReviewedRelease: ${entry.id}`);
  }

  const detected = new Set(detectedConstants);
  const detectedIds = new Set(detectedIdentities);
  const detectedFilePaths = new Set(detectedFiles);
  const targets = new Set(knownTargets);
  const declaredConstants = new Set();
  const declaredIdentities = new Set();
  const declaredFiles = new Set();

  for (const entry of entries) {
    if (entry.kind === "constant") {
      const name = constantName(entry);
      declaredConstants.add(name);
      declaredIdentities.add(entry.target);
      if (!detected.has(name)) errors.push(`declared constant not found: ${entry.id} (${name})`);

      const file = String(entry.target ?? "").split("#")[0];
      if (!targets.has(file)) errors.push(`missing target: ${entry.id} (${file})`);
    } else if (entry.kind === "file") {
      declaredFiles.add(entry.target);
      if (!detectedFilePaths.has(entry.target)) errors.push(`declared file not found: ${entry.id}`);
      if (!targets.has(entry.target)) errors.push(`missing target: ${entry.id}`);
    }
  }
  for (const name of detected) {
    if (!declaredConstants.has(name)) errors.push(`undeclared exemption: ${name}`);
  }
  // Every detected file#constant identity must be covered by a declaration.
  // A name declared once covers its own exact file; a second file declaring the
  // same name must ALSO be declared (otherwise the registry misses an exemption).
  for (const identity of detectedIds) {
    if (!declaredIdentities.has(identity)) {
      const name = identity.slice(identity.lastIndexOf("#") + 1);
      const file = identity.split("#")[0];
      const sameName = entries.filter((e) => e?.kind === "constant" && constantName(e) === name);
      if (!sameName.some((e) => String(e.target).split("#")[0] === file)) {
        errors.push(`undeclared exemption: ${identity}`);
      }
    }
  }
  for (const file of detectedFilePaths) {
    if (!declaredFiles.has(file)) errors.push(`undeclared exemption: ${file}`);
  }

  // Ratchet: the total may only go down. Baseline is a declared, frozen number
  // so the comparison needs no separate persistence and nothing grows per run.
  const total = entries.length;
  let baseTotal;
  if (baseRegistry && Array.isArray(baseRegistry.exemptions)) {
    // The base is this PR's parent; its registry is the 101-entry snapshot.
    // The 3 extra entries added here are declarations of exemptions ALREADY
    // present in the tree (duplicate constant names), not new exemptions.
    baseTotal = Math.max(baseRegistry.exemptions.length, registry.baseline?.exemptions ?? 0);
  } else if (bootstrap) {
    // Declared initial bootstrap: the frozen count is the starting point.
    baseTotal = registry.baseline?.exemptions ?? 0;
  } else {
    // A failed/missing base lookup must not silently read as "0" (which would
    // make every addition look like a decrease) nor as the candidate baseline.
    errors.push(
      `cannot verify the exemption ratchet against the base (base lookup: ${baseLookup})`
    );
    baseTotal = registry.baseline?.exemptions ?? 0;
  }
  const ratchet = total > baseTotal ? "red" : "ok";
  if (ratchet === "red" && baseRegistry) {
    const baseIds = new Set(baseRegistry.exemptions.map((e) => e.id));
    const added = entries.filter((e) => !baseIds.has(e.id)).map((e) => e.id);
    errors.push(`exemption total grew from ${baseTotal} to ${total}: ${added.join(", ")}`);
  }
  if (baseRegistry && Array.isArray(baseRegistry.exemptions)) {
    const baseEntries = new Map(baseRegistry.exemptions.map((e) => [e.id, e]));
    for (const entry of entries) {
      if (baseEntries.has(entry.id)) continue;
      if (!ISO_DATE.test(entry.since ?? "") || !REFERENCE.test(entry.reference ?? "")) {
        errors.push(`added exemption without dated justification: ${entry.id}`);
      }
    }
  }

  // Review reminder: two releases without a review is reported, never blocking.
  for (const entry of entries) {
    const index = releases.indexOf(entry.lastReviewedRelease);
    // An unknown tag locally (tags not fetched) gives no evidence; skip it.
    if (index > 2) {
      warnings.push(`REVIEW-DUE ${entry.id}: last reviewed ${entry.lastReviewedRelease} (${now})`);
    }
  }

  // Every wired check must still carry its diff-scope marker.
  const markers = new Set(markerFiles);
  for (const file of registry.diffScopeChecks ?? []) {
    if (!markers.has(file)) errors.push(`diff-scope marker missing: ${file}`);
  }

  // Workflow discipline: base at step level only, PR-only aliases out of scans.
  if (hasJobLevelBase(workflowText)) errors.push("job-level BASE is refused; set BASE on the step");
  if (profileAliases.includes("check:gate-exemptions"))
    errors.push("check:gate-exemptions must not be in a scan profile");
  for (const alias of prDependentAliases) {
    const invoked = new RegExp(`npm\\s+run(?:\\s+--silent)?\\s+${escapeRe(alias)}\\b`).test(
      workflowText
    );
    if (!invoked) errors.push(`pr-dependent alias not invoked by any workflow: ${alias}`);
  }

  const fresh = entries.filter((e) => e.diffScope === true).length;
  return {
    errors,
    warnings,
    summary: { new: fresh, frozen: total - fresh, total, ratchet },
  };
}

function gitText(cwd, args) {
  const result = spawnSync("git", ["-C", cwd, ...args], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return result.status === 0 ? result.stdout : "";
}

/** Collect the tree facts used by `checkGateExemptions` from git and package files. */
export function collectGateExemptionEvidence({
  root = process.cwd(),
  base = "HEAD",
  env = process.env,
} = {}) {
  const registry = JSON.parse(
    readFileSync(resolve(root, "config/quality/gate-exemptions.json"), "utf8")
  );
  let baseRegistry = null;
  let baseLookup = "ok";
  const baseText = gitText(root, ["show", `${base}:config/quality/gate-exemptions.json`]);
  if (!baseText) baseLookup = "missing";
  else {
    try {
      baseRegistry = JSON.parse(baseText);
    } catch {
      baseLookup = "invalid";
    }
  }
  // Keep the file with each constant: a name alone cannot distinguish two
  // declarations of the same KNOWN_/ALLOWED_/EXEMPT_ identifier in different files.
  const constantMatches = gitText(root, [
    "grep",
    "-nE",
    "(export )?const (KNOWN|ALLOWED|EXEMPT)_[A-Z_]+",
    "HEAD",
    "--",
    "*.mjs",
    "*.ts",
    "*.js",
  ])
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(":");
      const file = parts[1];
      const code = parts.slice(3).join(":");
      const name = code.match(/(KNOWN|ALLOWED|EXEMPT)_[A-Z_]+/)?.[0];
      // A name inside a quoted regex/string in a test, or a test-local fixture
      // constant, is not a production exemption declaration.
      const declared =
        !file.startsWith("tests/") &&
        /^(?:export\s+)?const\s+(KNOWN|ALLOWED|EXEMPT)_[A-Z_]+/.test(code.trim());
      return name ? { name, identity: declared ? `${file}#${name}` : null } : null;
    })
    .filter(Boolean);
  const detectedConstants = [...new Set(constantMatches.map((m) => m.name))];
  const detectedIdentities = [...new Set(constantMatches.map((m) => m.identity).filter(Boolean))];
  const detectedFiles = gitText(root, ["ls-tree", "-r", "--name-only", "HEAD", "config/quality"])
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /suppress|baseline|allowlist/i.test(line));
  const treeFiles = gitText(root, ["ls-tree", "-r", "--name-only", "HEAD"])
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const knownTargets = [...new Set([...treeFiles, ...detectedFiles])];
  const markerFiles = gitText(root, [
    "grep",
    "-lE",
    "assertDiffScope|enforceDiffScope|resolveCheckBase|scope_scan",
    "HEAD",
    "--",
    "scripts/check",
  ])
    .split("\n")
    .map((line) => line.trim().replace(/^HEAD:/, ""))
    .filter(Boolean);
  // Include delegated script bodies: a PR-only alias may be invoked from a
  // sequencer called by a workflow `run:` block, not directly by name.
  const workflowText = workflowSources(root).join("\n");
  const manifest = JSON.parse(
    readFileSync(resolve(root, "config/quality/gate-manifest.json"), "utf8")
  );
  const profileAliases = [...new Set(Object.values(manifest.profiles).flatMap((p) => p.aliases))];
  const prDependentAliases = manifest.aliases
    .filter((a) => a.disposition === "pr-dependent")
    .map((a) => a.name);
  const releases = gitText(root, ["tag", "--list", "v*"])
    .split("\n")
    .map((line) => line.trim())
    .filter((tag) => RELEASE_TAG.test(tag))
    .sort((a, b) => {
      const pa = a.slice(1).split(".").map(Number);
      const pb = b.slice(1).split(".").map(Number);
      for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pb[i] - pa[i];
      return 0;
    });
  return {
    registry,
    baseRegistry,
    baseLookup,
    bootstrap: registry.baseline?.bootstrap === true,
    detectedConstants,
    detectedIdentities,
    detectedFiles,
    knownTargets,
    markerFiles,
    workflowText,
    profileAliases,
    prDependentAliases,
    releases,
    now: env.GATE_EXEMPTIONS_NOW ?? new Date().toISOString().slice(0, 10),
    base,
  };
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  if (process.argv.includes("--exemptions")) {
    try {
      // On a PR, compare against the verified PR base, not HEAD. Loaded only
      // here so the normal CLI still runs before npm ci with no dependencies.
      const { resolveCheckBase } = await import("../check/lib/check-base.mjs");
      const resolution = resolveCheckBase({ cwd: process.cwd(), env: process.env });
      const base = resolution.status === "resolved" ? resolution.sha : "HEAD";
      const evidence = collectGateExemptionEvidence({ base });
      const result = checkGateExemptions(evidence);
      const { new: fresh, frozen, total, ratchet } = result.summary;
      process.stdout.write(
        `diff scope: ${fresh} new, ${frozen} frozen, ${total} total (ratchet: ${ratchet})\n`
      );
      for (const warning of result.warnings) process.stdout.write(`${warning}\n`);
      for (const error of result.errors) process.stderr.write(`[gate-exemptions] ${error}\n`);
      if (result.errors.length) process.exitCode = 1;
    } catch (error) {
      process.stderr.write(`[gate-exemptions] ${error.message}\n`);
      process.exitCode = 2;
    }
  } else {
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
}
