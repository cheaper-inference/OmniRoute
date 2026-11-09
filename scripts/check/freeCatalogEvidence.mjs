import { createHash } from "node:crypto";

export const catalogKey = (row) => `${row.provider}/${row.modelId}`;

// Display names are editorial; changes to economics/eligibility need a new audit.
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
  return createHash("sha256")
    .update(JSON.stringify(fields.map((field) => row[field] ?? null)))
    .digest("hex");
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

function evidenceErrors(entry, row, today) {
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
  if (entry.claim !== "recurring-free-access") errors.push(`${key}: wrong evidence claim`);
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
  const active = uniqueMap(
    rows.filter((row) => row.freeType === "recurring-uncapped"),
    "catalog identity",
    errors
  );
  const seed = uniqueMap(options.seed, "seed identity", errors);
  const debt = uniqueMap(policy.debt, "debt", errors);
  const evidence = uniqueMap(policy.evidence, "evidence", errors);
  checkDebt(debt, seed, new Set(options.previousDebt), active, evidence, errors);
  for (const [key, entry] of evidence) {
    if (!active.has(key)) errors.push(`${key}: stale evidence; remove it`);
    else errors.push(...evidenceErrors(entry, active.get(key), options.today));
  }
  for (const [key, row] of active) {
    if (evidence.has(key)) continue;
    if (!debt.has(key)) errors.push(`${key}: missing evidence`);
    else if (seed.get(key)?.catalogHash !== catalogFingerprint(row))
      errors.push(`${key}: changed legacy economics require evidence`);
  }
  return errors;
}
