/**
 * Differential validation of the agyToolSchema.ts port against the real
 * upstream modules (magpie-community/plugins packages/agy-cli).
 *
 * Ad-hoc: it needs the upstream .mjs files checked out somewhere, so it is not
 * part of the unit suite. Usage:
 *   node --import tsx/esm scripts/ad-hoc/agy-schema-diff.mjs <upstream-dir>
 */
import {
  expandToolSchema,
  sanitizePatternString,
  sanitizePatternFields,
  ensureGeminiArrayItems,
  fitTools,
  normalizeAgyToolSchema,
} from "../../open-sse/services/agyToolSchema.ts";

const upstreamDir = process.argv[2];
if (!upstreamDir) throw new Error("usage: agy-schema-diff.mjs <upstream agy-cli dir>");

/** Windows absolute paths need a file:// URL for import(). */
const fileUrl = (path) => `file:///${path.replaceAll("\\", "/").replace(/^\/+/, "")}`;

const { expandToolSchema: upExpand } = await import(fileUrl(`${upstreamDir}/tool-schema.mjs`));
const { sanitizePatternString: upPattern, sanitizePatternFields: upFields } = await import(
  fileUrl(`${upstreamDir}/re2-pattern.mjs`)
);
const { ensureGeminiArrayItems: upItems } = await import(fileUrl(`${upstreamDir}/array-items.mjs`));
const { fitTools: upFit } = await import(fileUrl(`${upstreamDir}/tool-budget.mjs`));

// sanitizeInputSchema lives inside upstream index.mjs (which imports the whole
// CLI), so lift the function out of the source and evaluate it on its own with
// the two helpers it closes over.
const upstreamSanitize = async () => {
  const { readFile, writeFile, mkdtemp } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const source = await readFile(join(upstreamDir, "index.mjs"), "utf8");
  const start = source.indexOf("function sanitizeInputSchema");
  const end = source.indexOf("function normalizeTools", start);
  if (start < 0 || end < 0) throw new Error("sanitizeInputSchema not found in index.mjs");
  const dir = await mkdtemp(join(tmpdir(), "agy-sanitize-"));
  const file = join(dir, "sanitize.mjs");
  await writeFile(
    file,
    `import { sanitizePatternFields } from ${JSON.stringify(
      fileUrl(join(upstreamDir, "re2-pattern.mjs"))
    )};
function appendSchemaHint(node, hint) {
  if (!hint) return;
  if (typeof node.description === "string" && node.description.trim()) {
    if (!node.description.includes(hint)) node.description = \`\${node.description} (\${hint})\`;
  } else {
    node.description = hint;
  }
}
${source.slice(start, end)}
export { sanitizeInputSchema };
`,
    "utf8"
  );
  return (await import(fileUrl(file))).sanitizeInputSchema;
};
const upSanitize = await upstreamSanitize();

let checks = 0;
let failures = 0;

function diff(label, mine, theirs) {
  checks++;
  const a = JSON.stringify(mine);
  const b = JSON.stringify(theirs);
  if (a === b) return;
  failures++;
  console.log(`MISMATCH ${label}`);
  console.log(`  mine  : ${a?.slice(0, 900)}`);
  console.log(`  theirs: ${b?.slice(0, 900)}`);
}

const PATTERNS = [
  "abc",
  "^[a-z]+$",
  "\\d{2,4}",
  "\\u0041",
  "\\u{1F600}",
  "[\\u00e9-\\u00ff]",
  "(?=x)",
  "(?!x)",
  "(?<=x)",
  "\\1",
  "\\z",
  "\\S",
  "\\Qx\\E",
  "\\a",
  "\\A",
  "[[:alpha:]]",
  "[z-a]",
  "a*+",
  "a{1000}{2}",
  "(a{1000}){2}",
  "\\p{L}",
  "\\p{Greek}",
  "\\p{Script=Greek}",
  "^\\x41$",
  "^\\u{110000}$",
  "^*",
  "a|",
  "|a",
  "()",
  "(?:a)",
  "(?i)a(?-i)b",
  "(?i:a)",
  "(?P<n>a)",
  "(?<n>a)",
  "[a-]",
  "[^a]",
  "a{2,1}",
  "a{0,}",
  "a{1,}",
  "\\.\\+\\*\\?\\(\\)\\[\\]\\{\\}\\|\\^\\$",
  "\\uD83D\\uDE00",
  "\\uD83Dx",
];

for (const p of PATTERNS) {
  diff(`pattern ${JSON.stringify(p)}`, sanitizePatternString(p), upPattern(p));
}

const SCHEMAS = [
  {},
  true,
  false,
  { type: "object", properties: {} },
  { type: ["string", "number"] },
  { type: ["string", "null"] },
  { type: "array", items: { type: "string" } },
  { type: "array" },
  { type: "array", prefixItems: [{ type: "string" }, { type: "integer" }] },
  { type: "array", items: false, prefixItems: [{ type: "string" }] },
  { type: "array", items: false },
  { type: "string", items: { type: "string" }, properties: { a: {} } },
  {
    $defs: { node: { type: "object", properties: { child: { $ref: "#/$defs/node" } } } },
    $ref: "#/$defs/node",
  },
  {
    definitions: { a: { type: "string" } },
    type: "object",
    properties: { x: { $ref: "#/definitions/a" } },
  },
  { allOf: [{ type: "string" }, { minLength: 3 }] },
  { allOf: [{ type: "object", properties: { a: { type: "string" } } }, { required: ["a"] }] },
  { anyOf: [{ type: "string" }, { type: "number" }] },
  { anyOf: [{ type: "string" }, { type: "null" }] },
  { oneOf: [{ const: "a" }, { const: "b" }] },
  {
    oneOf: [
      { type: "object", properties: { a: { type: "string" } } },
      { type: "object", properties: { b: { type: "number" } } },
    ],
  },
  { const: "x" },
  { const: null },
  { const: 5 },
  { const: "" },
  { enum: ["a", "b"] },
  { enum: [] },
  { enum: [1, 2], type: "string" },
  { type: "string", pattern: "^\\u0041\\z$" },
  { type: "string", pattern: "\\Qx\\E" },
  { type: "object", patternProperties: { "\\S": { type: "string" }, "^a$": { type: "string" } } },
  { type: "object", additionalProperties: true },
  { type: "object", additionalProperties: { type: "string" } },
  { type: "object", required: ["missing"], properties: { a: {} } },
  { type: "object", properties: { a: {} }, required: ["a", "b"] },
  { type: "array", items: {} },
  { type: "array", items: { anyOf: [{ type: "string" }, { type: "integer" }] } },
  { type: "array", items: [{ type: "string" }] },
  { type: "array", anyOf: [{ type: "array", items: { type: "string" } }] },
  { not: { type: "string" } },
  { propertyNames: { pattern: "\\z" } },
  { type: "object", dependentSchemas: { a: { type: "object" } } },
  { type: "number", minimum: 1, maximum: 10 },
  { type: "string", minLength: 0 },
  { $ref: "#/nope" },
  { $ref: "#" },
  { $id: "x", $schema: "y", type: "string" },
];

for (const [i, s] of SCHEMAS.entries()) {
  diff(`expand #${i}`, expandToolSchema(structuredClone(s)), upExpand(structuredClone(s)));
  diff(`items #${i}`, ensureGeminiArrayItems(structuredClone(s)), upItems(structuredClone(s)));
  diff(
    `normalize #${i}`,
    normalizeAgyToolSchema(structuredClone(s)),
    upItems(upSanitize(upExpand(structuredClone(s))))
  );

  const mineNode = structuredClone(s);
  const theirNode = structuredClone(s);
  sanitizePatternFields(mineNode);
  upFields(theirNode);
  diff(`fields #${i}`, mineNode, theirNode);
}

const bigTools = [
  {
    name: "bash",
    description: "Run a shell command. ".repeat(40),
    inputSchema: {
      type: "object",
      properties: {
        command: { type: "string", description: "The command. ".repeat(30) },
        cwd: { type: "string", description: "Working directory. ".repeat(20) },
        env: {
          type: "object",
          description: "Environment. ".repeat(20),
          additionalProperties: true,
        },
      },
      required: ["command"],
    },
  },
  {
    name: "write",
    description: "Write a file. ".repeat(50),
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string" },
        content: { type: "string", description: "Body. ".repeat(40) },
      },
      required: ["path", "content"],
    },
  },
];

for (const budget of [18000, 400, 120, 60, 10]) {
  diff(
    `fitTools budget=${budget}`,
    fitTools(structuredClone(bigTools), budget),
    upFit(structuredClone(bigTools), budget)
  );
}

console.log(`\n${checks - failures}/${checks} checks identical`);
if (failures) process.exitCode = 1;
