import { contentHash, planCountState, strictMirrorBody } from "./count-state.mjs";

const INTEGER_FACTS = new Set([
  "providers",
  "migrations",
  "catalogEntries",
  "catalogMarkedFree",
  "freeForever",
  "freePools",
  "strategies",
  "cliTotal",
  "cliCode",
  "cliAgent",
  "chatNamespaces",
  "distinctProviderModelPairs",
  "uniqueRawModelIds",
]);
const GROUPED_FORMATS = Object.freeze({
  "grouped-comma": ",",
  "grouped-dot": ".",
  "grouped-space": " ",
  "grouped-nbsp": "\u00a0",
  "grouped-narrow-nbsp": "\u202f",
});
const DECIMAL_FACTS = new Set(["steadyBillions", "firstBillions", "gatedMillions"]);
const supportedFormat = (fact, format) =>
  format === undefined ||
  (Object.hasOwn(GROUPED_FORMATS, format) && INTEGER_FACTS.has(fact)) ||
  (format === "ten-thousands" && fact === "gatedMillions");
const NUMBER = "([\\p{Nd}]+(?:[.,][\\p{Nd}]+)*)";
const fail = (code, file = "registry") => {
  throw Object.assign(new Error(`${code}:${file}`), { code, path: file });
};
const safePath = (file) =>
  typeof file === "string" &&
  file.length > 0 &&
  !file.startsWith("/") &&
  !file.includes("\\") &&
  !file.includes("\0") &&
  !file.split("/").some((part) => part === ".." || part === "." || !part);
const literal = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/[ \t]+/g, "[ \\t]+");

function digitValue(character) {
  const point = character.codePointAt(0);
  let first = point;
  while (first > 0 && /\p{Nd}/u.test(String.fromCodePoint(first - 1))) first--;
  return (point - first) % 10;
}

export function spellCount(value, sample, fact, format) {
  if (!INTEGER_FACTS.has(fact) && !DECIMAL_FACTS.has(fact)) fail("COUNT_UNKNOWN_FACT", fact);
  if (INTEGER_FACTS.has(fact) && (!Number.isSafeInteger(value) || value < 0))
    fail("COUNT_INVALID_FACT", fact);
  let canonical = String(value);
  if (!/^\d+(?:\.\d+)?$/.test(canonical)) fail("COUNT_INVALID_FACT", fact);
  if (!supportedFormat(fact, format)) fail("COUNT_NUMBER_FORMAT", fact);
  const digits = [...sample].filter((character) => /\p{Nd}/u.test(character));
  const bases = new Set(
    digits.map((character) => character.codePointAt(0) - digitValue(character))
  );
  if (bases.size !== 1) fail("COUNT_MIXED_DIGIT_SCRIPT", fact);
  const zero = [...bases][0];
  if (Object.hasOwn(GROUPED_FORMATS, format)) {
    const separator = GROUPED_FORMATS[format];
    const normalized = [...sample]
      .map((character) => (/\p{Nd}/u.test(character) ? String(digitValue(character)) : character))
      .join("");
    const escapedSeparator = separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const grouped = new RegExp(`^[1-9]\\d{0,2}(?:${escapedSeparator}\\d{3})+$`);
    if (!/^(?:0|[1-9]\d*)$/.test(normalized) && !grouped.test(normalized))
      fail("COUNT_INTEGER_FORMAT", fact);
    return canonical
      .replace(/\B(?=(\d{3})+(?!\d))/g, separator)
      .replace(/\d/g, (character) => String.fromCodePoint(zero + Number(character)));
  }
  if (format === "ten-thousands") {
    if (!/^\p{Nd}+(?:[.,]\p{Nd}+)?$/u.test(sample)) fail("COUNT_DECIMAL_FORMAT", fact);
    // One million is 100 ten-thousands (万 / 萬 / 만). Shift the decimal
    // as text so fractional or large exact quantities never round through Number.
    const [integer, fraction = ""] = canonical.split(".");
    const padded = fraction.padEnd(2, "0");
    const whole = (integer + padded.slice(0, 2)).replace(/^0+(?=\d)/, "");
    const remainder = padded.slice(2).replace(/0+$/, "");
    canonical = whole + (remainder ? `.${remainder}` : "");
  }
  const separator = sample.includes(",") ? "," : ".";
  if (INTEGER_FACTS.has(fact) && !/^\p{Nd}+$/u.test(sample)) fail("COUNT_INTEGER_FORMAT", fact);
  return [...canonical]
    .map((character) =>
      character === "." ? separator : String.fromCodePoint(zero + Number(character))
    )
    .join("");
}

export function validateCountRegistry(registry) {
  if (
    registry?.version !== 1 ||
    !Array.isArray(registry.documents) ||
    !Array.isArray(registry.families) ||
    !Array.isArray(registry.generated)
  )
    fail("COUNT_REGISTRY_SCHEMA");
  const paths = new Set();
  for (const doc of registry.documents) {
    if (
      !safePath(doc.path) ||
      paths.has(doc.path) ||
      !Array.isArray(doc.groups) ||
      !doc.groups.length
    )
      fail("COUNT_REGISTRY_PATH", doc.path);
    paths.add(doc.path);
    const groups = new Set();
    for (const group of doc.groups) {
      if (
        !Array.isArray(group.parts) ||
        group.parts.length < 2 ||
        !group.parts.every((part) => typeof part === "string" && !/[\r\n]/.test(part)) ||
        !Array.isArray(group.claims) ||
        !group.claims.length
      )
        fail("COUNT_REGISTRY_GROUP", doc.path);
      const signature = JSON.stringify(group.parts);
      if (groups.has(signature)) fail("COUNT_REGISTRY_DUPLICATE_GROUP", doc.path);
      groups.add(signature);
      const slots = new Set();
      for (const claim of group.claims) {
        if (
          !Number.isInteger(claim.slot) ||
          claim.slot < 0 ||
          claim.slot >= group.parts.length - 1 ||
          slots.has(claim.slot)
        )
          fail("COUNT_REGISTRY_SLOT", doc.path);
        if (!INTEGER_FACTS.has(claim.fact) && !DECIMAL_FACTS.has(claim.fact))
          fail("COUNT_UNKNOWN_FACT", claim.fact);
        if (!supportedFormat(claim.fact, claim.format)) fail("COUNT_NUMBER_FORMAT", doc.path);
        slots.add(claim.slot);
      }
    }
  }
  // The state planner may advance provenance only after every translated
  // numeric surface has the same coverage as the canonical README. Missing
  // claims cannot leave old numbers behind while accepting a new source hash.
  if (registry.families.includes("README.md")) {
    if (!paths.has("README.md")) fail("COUNT_README_MODEL_BINDINGS", "README.md");
    const expected = { chatNamespaces: 1, distinctProviderModelPairs: 1, uniqueRawModelIds: 2 };
    for (const doc of registry.documents) {
      if (doc.path !== "README.md" && !/^docs\/i18n\/[^/]+\/README\.md$/.test(doc.path)) continue;
      const actual = { chatNamespaces: 0, distinctProviderModelPairs: 0, uniqueRawModelIds: 0 };
      for (const group of doc.groups)
        for (const claim of group.claims)
          if (Object.hasOwn(actual, claim.fact)) actual[claim.fact]++;
      if (Object.keys(expected).some((fact) => actual[fact] !== expected[fact]))
        fail("COUNT_README_MODEL_BINDINGS", doc.path);
    }
  }
  for (const generated of registry.generated) {
    if (!safePath(generated) || paths.has(generated))
      fail("COUNT_GENERATED_REGISTRY_OVERLAP", generated);
    paths.add(generated);
  }
  return registry;
}

export function planDocumentCounts(doc, content, facts) {
  if (typeof content !== "string") fail("COUNT_REQUIRED_FILE_MISSING", doc.path);
  const operations = [];
  for (const group of doc.groups) {
    const pattern = group.parts
      .map((part, slot) => {
        if (slot === group.parts.length - 1) return literal(part);
        const claim = group.claims.find((row) => row.slot === slot);
        const separator = GROUPED_FORMATS[claim?.format];
        const number =
          separator && /\s/u.test(separator) ? `([\\p{Nd}]+(?:${separator}[\\p{Nd}]+)*)` : NUMBER;
        return literal(part) + number;
      })
      .join("");
    const regex = new RegExp(`^${pattern}\\r?$`, "dgmu");
    const matches = [...content.matchAll(regex)];
    if (matches.length !== 1)
      fail(matches.length ? "COUNT_ANCHOR_AMBIGUOUS" : "COUNT_ANCHOR_MISSING", doc.path);
    const match = matches[0];
    for (const claim of group.claims) {
      if (!Object.hasOwn(facts, claim.fact)) fail("COUNT_FACT_UNAVAILABLE", claim.fact);
      const [start, end] = match.indices[claim.slot + 1];
      const old = content.slice(start, end);
      const updated = spellCount(facts[claim.fact], old, claim.fact, claim.format);
      if (old !== updated)
        operations.push({ start, end, before: old, after: updated, fact: claim.fact });
    }
  }
  operations.sort((a, b) => a.start - b.start);
  let cursor = 0;
  const chunks = [];
  for (const op of operations) {
    if (op.start < cursor) fail("COUNT_OVERLAPPING_UNITS", doc.path);
    chunks.push(content.slice(cursor, op.start), op.after);
    cursor = op.end;
  }
  return {
    path: doc.path,
    before: content,
    after: chunks.join("") + content.slice(cursor),
    operations,
  };
}

export function managedCountChecks(registry, facts) {
  validateCountRegistry(registry);
  return [
    {
      label: "Managed documentation numeric units",
      actual: "managed",
      strict: true,
      requiredFiles: true,
      files: registry.documents.map((doc) => doc.path),
      validate(content, file) {
        try {
          const doc = registry.documents.find((row) => row.path === file);
          if (!doc) fail("COUNT_REGISTRY_FILE_UNKNOWN", file);
          const plan = planDocumentCounts(doc, content, facts);
          return {
            ok: plan.operations.length === 0,
            detail: plan.operations.length
              ? `${plan.operations.length} stale managed count(s); run npm run docs:sync-counts`
              : "all managed numeric units match source",
          };
        } catch (error) {
          return { ok: false, detail: error.code ?? "COUNT_VALIDATION_ERROR" };
        }
      },
    },
  ];
}

export function planCountSync({
  registry,
  facts,
  files,
  generated = new Map(),
  locales,
  preserveState = false,
}) {
  validateCountRegistry(registry);
  if (!Array.isArray(locales) || new Set(locales).size !== locales.length)
    fail("COUNT_LOCALE_CONFIGURATION");
  const documents = new Map(registry.documents.map((doc) => [doc.path, doc]));
  for (const source of registry.families) {
    if (!documents.has(source)) fail("COUNT_FAMILY_SOURCE_MISSING", source);
    for (const locale of locales)
      if (!documents.has(`docs/i18n/${locale}/${source}`))
        fail("COUNT_LOCALE_REGISTRY_DRIFT", `${locale}/${source}`);
  }
  for (const doc of registry.documents) {
    const match = doc.path.match(/^docs\/i18n\/([^/]+)\//);
    if (match && !locales.includes(match[1])) fail("COUNT_LOCALE_REGISTRY_DRIFT", doc.path);
  }
  const before = new Map(files);
  const after = new Map(files);
  const changes = [];
  for (const doc of registry.documents) {
    const result = planDocumentCounts(doc, before.get(doc.path), facts);
    after.set(doc.path, result.after);
    if (result.operations.length) changes.push({ ...result, kind: "numeric" });
  }
  if (
    generated.size !== registry.generated.length ||
    [...generated.keys()].some((file) => !registry.generated.includes(file))
  )
    fail("COUNT_GENERATOR_OUTPUT_SET");
  for (const file of registry.generated) {
    if (!before.has(file) || typeof generated.get(file) !== "string")
      fail("COUNT_GENERATED_FILE_MISSING", file);
    after.set(file, generated.get(file));
    if (before.get(file) !== after.get(file))
      changes.push({
        path: file,
        before: before.get(file),
        after: after.get(file),
        kind: "generated",
        operations: [],
      });
  }
  if (registry.families.includes("llm.txt")) {
    for (const map of [before, after]) {
      const source = map
        .get("llm.txt")
        .replace(/^# .+\r?\n+/, "")
        .replace(/\r\n/g, "\n");
      for (const locale of locales)
        if (strictMirrorBody(map.get(`docs/i18n/${locale}/llm.txt`)) !== source.trimStart())
          fail("COUNT_STRICT_MIRROR_DRIFT", locale);
    }
  }
  let state = { text: before.get(".i18n-state.json"), leaves: [], affected: [] };
  let stateReviewRequired = false;
  if (preserveState)
    stateReviewRequired = changes.some(
      (change) =>
        registry.families.includes(change.path) ||
        change.path.startsWith("docs/i18n/") ||
        (registry.generated.includes(change.path) && /\.(?:md|txt)$/.test(change.path))
    );
  else
    state = planCountState({
      stateText: before.get(".i18n-state.json"),
      families: registry.families,
      locales,
      before,
      after,
      generatedPaths: registry.generated,
    });
  if (state.leaves.length)
    changes.push({
      path: ".i18n-state.json",
      before: before.get(".i18n-state.json"),
      after: state.text,
      kind: "state-leaves",
      operations: state.leaves,
    });
  return {
    changes: changes.map((change) => ({
      ...change,
      beforeHash: contentHash(change.before),
      afterHash: contentHash(change.after),
    })),
    stateLeaves: state.leaves,
    stateReviewRequired,
    status: changes.length
      ? stateReviewRequired
        ? "CHANGES_REQUIRE_STATE_REVIEW"
        : "CHANGES_PLANNED"
      : "COUNTS_CURRENT",
  };
}
