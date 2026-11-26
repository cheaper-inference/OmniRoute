import { createHash } from "node:crypto";

export const catalogKey = (row) => `${row.provider}/${row.modelId}`;

// Display names are editorial; changes to economics/eligibility need a new audit.
// `gates` joins the hash only when a row has gates, so every hash recorded before gates
// existed (and the frozen legacy seed) stays valid.
export function catalogFingerprint(row) {
  const fields = [
    "freeType",
    "monthlyTokens",
    "creditTokens",
    "poolKey",
    "tos",
    "hardStopGuaranteed",
    "eligibilityGate",
    "trainsOnPrompts",
  ];
  const values = fields.map((field) => row[field] ?? null);
  if (Array.isArray(row.gates) && row.gates.length)
    values.push([...row.gates].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)));
  return createHash("sha256").update(JSON.stringify(values)).digest("hex");
}

const MAX_EXCERPT = 300;

/** The claim a row's evidence must make, from the row's own economics. */
export function requiredClaim(row) {
  if (row.monthlyTokens > 0) return "recurring-quota";
  if (row.creditTokens > 0) return "signup-credit";
  return "recurring-free-access";
}

function uniqueMap(entries, label, errors) {
  const result = new Map();
  for (const entry of entries) {
    const key = typeof entry === "string" ? entry : catalogKey(entry);
    if (result.has(key)) errors.push(`${key}: duplicate ${label}`);
    result.set(key, entry);
  }
  return result;
}

function validSource(url) {
  try {
    const source = new URL(url);
    return (
      source.protocol === "https:" &&
      !source.username &&
      !source.password &&
      source.hostname.includes(".")
    );
  } catch {
    return false;
  }
}

function evidenceErrors(entry, row, today, unitOf) {
  const errors = [];
  const key = catalogKey(entry);
  if (!validSource(entry.sourceUrl)) errors.push(`${key}: invalid source URL`);
  if (!["public-page", "api-public", "console-verified"].includes(entry.sourceType))
    errors.push(`${key}: invalid source type`);
  const date = entry.checkedAt;
  if (
    typeof date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !Number.isFinite(Date.parse(date)) ||
    new Date(date).toISOString().slice(0, 10) !== date ||
    date > today
  )
    errors.push(`${key}: invalid verification date`);
  const claim = requiredClaim(row);
  if (entry.claim !== claim) errors.push(`${key}: wrong evidence claim`);
  if (claim !== "recurring-free-access") {
    if (typeof entry.excerpt !== "string" || !entry.excerpt.trim())
      errors.push(`${key}: missing excerpt`);
    else if (entry.excerpt.length > MAX_EXCERPT)
      errors.push(`${key}: excerpt longer than ${MAX_EXCERPT} characters`);
  }
  if (claim === "recurring-quota" && (!entry.quotaUnit || entry.quotaUnit !== unitOf?.(row)))
    errors.push(`${key}: quota unit does not match`);
  for (const field of ["summary", "limitations", "verifiedBy"]) {
    if (typeof entry[field] !== "string" || !entry[field].trim())
      errors.push(`${key}: missing ${field}`);
  }
  if (entry.catalogHash !== catalogFingerprint(row))
    errors.push(`${key}: evidence does not match current economics`);
  return errors;
}

function checkDebt(debt, seed, previousDebt, active, evidence, errors) {
  for (const key of debt.keys()) {
    if (!seed.has(key)) errors.push(`${key}: outside frozen legacy seed`);
    if (!previousDebt.has(key)) errors.push(`${key}: legacy debt cannot grow or be reintroduced`);
    if (!active.has(key)) errors.push(`${key}: stale legacy debt; remove it`);
    if (evidence.has(key)) errors.push(`${key}: audited entry must leave legacy debt`);
  }
}

/**
 * Every row that grants free access and either has no published cap, has a quota, or is new
 * against the base (`options.baseKeys`; absent = no row is new) needs dated evidence.
 * `options.grantsFreeAccess(freeType)` defaults to "not discontinued"; `options.unitOf(row)`
 * names the unit a `recurring-quota` record must declare.
 */
export function validateCatalogEvidence(rows, policy, options) {
  const errors = [];
  if (policy?.schemaVersion !== 1 || !Array.isArray(policy.debt) || !Array.isArray(policy.evidence))
    return ["invalid evidence policy schema"];
  if (
    policy.debt.some((key) => typeof key !== "string") ||
    policy.evidence.some(
      (entry) => !entry || typeof entry.provider !== "string" || typeof entry.modelId !== "string"
    )
  )
    return ["invalid evidence entry identity"];
  const grants = options.grantsFreeAccess ?? ((freeType) => freeType !== "discontinued");
  const baseKeys = options.baseKeys;
  const isNew = (row) => baseKeys !== undefined && !baseKeys.has(catalogKey(row));
  const free = uniqueMap(
    rows.filter((row) => grants(row.freeType)),
    "catalog identity",
    errors
  );
  const required = new Map(
    [...free].filter(
      ([, row]) => row.freeType === "recurring-uncapped" || row.monthlyTokens > 0 || isNew(row)
    )
  );
  const seed = uniqueMap(options.seed, "seed identity", errors);
  const debt = uniqueMap(policy.debt, "debt", errors);
  const evidence = uniqueMap(policy.evidence, "evidence", errors);
  checkDebt(debt, seed, new Set(options.previousDebt), required, evidence, errors);
  for (const [key, entry] of evidence) {
    if (!free.has(key)) errors.push(`${key}: stale evidence; remove it`);
    else errors.push(...evidenceErrors(entry, free.get(key), options.today, options.unitOf));
  }
  for (const [key, row] of required) {
    if (evidence.has(key)) continue;
    if (!debt.has(key)) errors.push(`${key}: missing evidence`);
    else if (seed.get(key)?.catalogHash !== catalogFingerprint(row))
      errors.push(`${key}: changed legacy economics require evidence`);
  }
  return errors;
}
