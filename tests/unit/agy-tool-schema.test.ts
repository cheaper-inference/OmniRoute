/**
 * agyToolSchema.ts — the schema normalization the `agy acp` transport needs.
 *
 * Ported from magpie-community/plugins packages/agy-cli (tool-schema.mjs,
 * re2-pattern.mjs, array-items.mjs, tool-budget.mjs). The expectations here
 * were checked against those modules directly: a differential run over 43
 * patterns, 44 schemas and 5 budgets produced byte-identical output (231/231).
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  agyTokens,
  cut,
  ensureGeminiArrayItems,
  expandToolSchema,
  fitTools,
  normalizeAgyToolSchema,
  prepareAgyTools,
  sanitizeAgyInputSchema,
  sanitizePatternFields,
  sanitizePatternString,
  translateUnicodeEscapes,
  TOOL_TOKEN_BUDGET,
} from "../../open-sse/vendor/agy-cli/toolSchema.ts";

const plain = (value: unknown): unknown => JSON.parse(JSON.stringify(value));

/**
 * A schema node read back as a loose record: the assertions below check the
 * shape a transform produced, which is exactly what the types cannot say.
 */
interface SchemaNode {
  [key: string]: unknown;
  description?: string;
  items?: SchemaNode;
  anyOf?: SchemaNode[];
  properties?: Record<string, SchemaNode>;
  patternProperties?: Record<string, SchemaNode>;
  required?: string[];
}

const node = (value: unknown): SchemaNode => value as SchemaNode;

// ── expandToolSchema (tool-schema.mjs) ──────────────────────────────────────

test("expandToolSchema inlines $ref and drops the definition containers", () => {
  const out = plain(
    expandToolSchema({
      $defs: { item: { type: "string", enum: ["a", "b"] } },
      type: "object",
      properties: { value: { $ref: "#/$defs/item" } },
    })
  );
  assert.deepEqual(out, {
    type: "object",
    properties: { value: { type: "string", enum: ["a", "b"] } },
  });
});

test("expandToolSchema resolves definitions, escaped pointers and an unresolved ref", () => {
  const resolved = plain(
    expandToolSchema({
      definitions: { "a/b": { type: "integer" } },
      type: "object",
      properties: { n: { $ref: "#/definitions/a~1b" } },
    })
  );
  assert.equal((resolved as { properties: { n: { type: string } } }).properties.n.type, "integer");

  const missing = plain(
    expandToolSchema({ type: "object", properties: { n: { $ref: "#/nope" } } })
  );
  assert.match(
    (missing as { properties: { n: { description: string } } }).properties.n.description,
    /Unresolved schema reference: #\/nope/
  );
});

test("expandToolSchema intersects allOf instead of leaving it to agy", () => {
  const out = plain(
    expandToolSchema({
      allOf: [
        { type: "object", properties: { a: { type: "string" } } },
        { type: "object", required: ["a"], properties: { b: { type: "number" } } },
      ],
    })
  ) as { type?: string; allOf?: unknown; required?: string[]; properties: Record<string, unknown> };
  assert.equal(out.allOf, undefined, "allOf must be resolved before agy sees it");
  assert.equal(out.type, "object");
  assert.deepEqual(Object.keys(out.properties).sort(), ["a", "b"]);
  assert.deepEqual(out.required, ["a"]);
});

test("expandToolSchema lowers const, including null and the empty string", () => {
  assert.deepEqual(plain(expandToolSchema({ const: "x" })), { type: "string", enum: ["x"] });
  // A numeric const keeps `const` (only string consts become an enum) and only
  // gains the type the translator needs.
  assert.deepEqual(plain(expandToolSchema({ const: 7 })), { const: 7, type: "integer" });
  assert.deepEqual(plain(expandToolSchema({ const: null })), {
    description: "Must be null.",
  });
  // An empty string cannot become `enum: [""]` (agy reads it as an empty enum),
  // so the const stays and only a conflicting enum raises the hint.
  assert.deepEqual(plain(expandToolSchema({ const: "" })), { const: "", type: "string" });
  assert.match(
    (plain(expandToolSchema({ const: "", enum: ["a"] })) as { description: string }).description,
    /Conflicting const and enum/
  );
});

test("expandToolSchema keeps a mixed anyOf but describes it for the model", () => {
  const out = plain(expandToolSchema({ anyOf: [{ type: "string" }, { type: "number" }] })) as {
    anyOf?: unknown[];
    description: string;
  };
  // string|number has no single primitive family, so it survives as-is and the
  // description carries what the translator would otherwise drop.
  assert.equal(out.anyOf?.length, 2);
  assert.equal(out.description, "Accepts anyOf: string | number");
});

test("expandToolSchema turns nested boolean and additionalProperties schemas into hints", () => {
  // A boolean at the root is the whole schema and stays as it is; nested it
  // becomes the hint the translator can carry.
  assert.strictEqual(expandToolSchema(true), true);
  const nestedTrue = plain(expandToolSchema({ type: "object", properties: { a: true } })) as {
    properties: { a: { description: string } };
  };
  assert.deepEqual(nestedTrue.properties.a, { description: "Accepts any JSON value." });
  const nestedFalse = plain(expandToolSchema({ type: "object", properties: { a: false } })) as {
    properties: { a: { description: string } };
  };
  assert.deepEqual(nestedFalse.properties.a, {
    description: "No value is allowed by the original schema.",
  });
  assert.match(
    (
      plain(expandToolSchema({ type: "object", additionalProperties: true })) as {
        description: string;
      }
    ).description,
    /Accepts arbitrary additional key-value properties/
  );
  assert.match(
    (
      plain(expandToolSchema({ type: "object", additionalProperties: { type: "string" } })) as {
        description: string;
      }
    ).description,
    /Additional properties: string/
  );
});

test("expandToolSchema stops a self-referencing schema at the recursion guard", () => {
  const out = plain(
    expandToolSchema({
      $defs: { node: { type: "object", properties: { child: { $ref: "#/$defs/node" } } } },
      $ref: "#/$defs/node",
    })
  ) as { properties: { child: { description?: string } } };
  assert.match(out.properties.child.description ?? "", /Recursive schema/);
});

// ── RE2 patterns (re2-pattern.mjs) ──────────────────────────────────────────

test("translateUnicodeEscapes rewrites the forms RE2 can express", () => {
  assert.equal(translateUnicodeEscapes("\\u0041"), "\\x{0041}");
  assert.equal(translateUnicodeEscapes("\\u{1F600}"), "\\x{1F600}");
  // `\x41` is already RE2-native and is left exactly as written.
  assert.equal(translateUnicodeEscapes("\\x41"), "\\x41");
  // A surrogate pair collapses into one code point.
  assert.equal(translateUnicodeEscapes("\\uD83D\\uDE00"), "\\x{1F600}");
  assert.equal(translateUnicodeEscapes("\\uD83Dx"), "\\x{D83D}x");
  // A literal backslash-u stays literal.
  assert.equal(translateUnicodeEscapes("\\\\u0041"), "\\\\u0041");
});

test("sanitizePatternString keeps what RE2 and ECMA-262 mean the same", () => {
  for (const pattern of ["^[a-z]+$", "\\d{2,4}", "\\s+", "^\\u0041$", "\\p{L}", "(?:a)", "^a|b$"]) {
    const result = sanitizePatternString(pattern);
    assert.equal(result.ok, true, `${pattern} should be kept`);
    assert.equal(typeof result.pattern, "string");
  }
});

test("sanitizePatternString drops the constructs whose RE2 meaning differs", () => {
  // \z, \S, \Q…\E, \a and \A compile in RE2 but do not mean what JS means.
  for (const pattern of [
    "\\z",
    "\\S",
    "\\Qx\\E",
    "\\a",
    "\\A",
    "(?=x)",
    "(?!x)",
    "(?<=x)",
    "\\1",
  ]) {
    const result = sanitizePatternString(pattern);
    assert.equal(result.ok, false, `${pattern} should be dropped`);
    assert.equal(result.pattern, undefined);
    assert.equal(result.original, pattern);
  }
});

test("sanitizePatternString rejects the RE2 limits Go enforces", () => {
  for (const pattern of [
    "[[:alpha:]]",
    "[z-a]",
    "a*+",
    "a{2,1}",
    "(a{1000}){2}",
    "\\p{Script=Greek}",
  ]) {
    assert.equal(sanitizePatternString(pattern).ok, false, `${pattern} should be dropped`);
  }
  // Nested bounds whose product stays under 1000 are fine.
  assert.equal(sanitizePatternString("(a{10}){10}").ok, true);
});

test("sanitizePatternString is idempotent", () => {
  const once = sanitizePatternString("^\\u0041\\d+$");
  assert.equal(once.ok, true);
  const twice = sanitizePatternString(once.pattern);
  assert.equal(twice.ok, true);
  assert.equal(twice.pattern, once.pattern);
});

test("sanitizePatternFields moves a dropped pattern into the description", () => {
  const target = node({ type: "string", pattern: "\\Qx\\E", description: "A value." });
  sanitizePatternFields(target);
  assert.equal("pattern" in target, false);
  assert.match(target.description, /A value\. \(pattern: \\Qx\\E\)/);

  const props = node({
    type: "object",
    patternProperties: { "\\S": { type: "string" }, "^a$": { type: "string" } },
  });
  sanitizePatternFields(props);
  assert.deepEqual(Object.keys(props.patternProperties), ["^a$"]);
  assert.match(props.description, /dropped patternProperties: \\S/);
});

test("sanitizePatternFields lifts additionalProperties:false when every pattern is dropped", () => {
  const target = node({
    type: "object",
    patternProperties: { "\\S": { type: "string" } },
    additionalProperties: false,
  });
  sanitizePatternFields(target);
  assert.equal("patternProperties" in target, false);
  assert.equal("additionalProperties" in target, false);
  assert.match(target.description, /additionalProperties:false was lifted/);
});

// ── sanitizeInputSchema (index.mjs) ─────────────────────────────────────────

test("sanitizeAgyInputSchema collapses a union type and records the union", () => {
  const out = node(sanitizeAgyInputSchema({ type: ["string", "number"] }));
  assert.equal(out.type, "string");
  assert.equal(out.description, "Accepts types: string | number");
  assert.deepEqual(sanitizeAgyInputSchema({ type: ["string", "null"] }), {
    type: ["string", "null"],
  });
});

test("sanitizeAgyInputSchema drops keywords the resolved type cannot carry", () => {
  const out = sanitizeAgyInputSchema({
    type: "string",
    items: { type: "string" },
    properties: { a: {} },
    required: ["a"],
    minItems: 1,
  }) as Record<string, unknown>;
  assert.equal("items" in out, false);
  assert.equal("properties" in out, false);
  assert.equal("required" in out, false);
  assert.equal("minItems" in out, false);
});

test("sanitizeAgyInputSchema drops an enum or const the proto cannot carry", () => {
  const numeric = node(sanitizeAgyInputSchema({ type: "string", enum: [1, 2] }));
  assert.equal(numeric.enum, undefined);
  assert.equal(numeric.description, "Allowed values: 1, 2");

  const constant = node(sanitizeAgyInputSchema({ type: "number", const: 4 }));
  assert.equal(constant.const, undefined);
  assert.equal(constant.description, "Must equal: 4");
});

test("sanitizeAgyInputSchema filters a required key with no matching property", () => {
  assert.deepEqual(
    sanitizeAgyInputSchema({ type: "object", properties: { a: {} }, required: ["a", "zz"] }),
    { type: "object", properties: { a: {} }, required: ["a"] }
  );
  const none = sanitizeAgyInputSchema({
    type: "object",
    properties: { a: {} },
    required: ["zz"],
  }) as Record<string, unknown>;
  assert.equal("required" in none, false);
});

// ── ensureGeminiArrayItems (array-items.mjs) ────────────────────────────────

test("ensureGeminiArrayItems fills a typeless items so Gemini accepts the array", () => {
  const out = node(ensureGeminiArrayItems({ type: "array" }));
  assert.equal(Array.isArray(out.items.anyOf), true);
  assert.match(out.description, /array items were untyped/);
});

test("ensureGeminiArrayItems annotates a closed tuple instead of forbidding every element", () => {
  // `items: false` on a tuple reaches agy as a hint; upstream deliberately does
  // not rewrite it, because a closed tuple has no single element schema.
  const out = node(
    ensureGeminiArrayItems({
      type: "array",
      items: false,
      prefixItems: [{ type: "string" }, { type: "integer" }],
    })
  );
  assert.equal(out.items, false);
  assert.equal(out.maxItems, undefined);
  assert.match(out.description, /tuple items were left as a list/);
});

test("ensureGeminiArrayItems annotates a tuple it cannot collapse", () => {
  const out = node(ensureGeminiArrayItems({ type: "array", prefixItems: [{ type: "string" }] }));
  assert.equal(Array.isArray(out.items.anyOf), true);
  assert.match(out.description, /tuple items were left as a list/);
  assert.match(out.description, /array items were untyped/);
});

// ── fitTools (tool-budget.mjs) ──────────────────────────────────────────────

const tools = [
  {
    name: "bash",
    description: "Run a shell command. ".repeat(40),
    inputSchema: {
      type: "object",
      properties: {
        command: { type: "string", description: "The command. ".repeat(30) },
        env: { type: "object", description: "Env. ".repeat(20), additionalProperties: true },
      },
      required: ["command"],
    },
  },
  {
    name: "write",
    description: "Write a file. ".repeat(50),
    inputSchema: {
      type: "object",
      properties: { path: { type: "string" } },
      required: ["path"],
    },
  },
];

test("fitTools leaves a list that already fits untouched", () => {
  assert.strictEqual(fitTools(tools), tools);
});

test("fitTools shortens descriptions instead of dropping tools", () => {
  const out = fitTools(structuredClone(tools), 400);
  assert.deepEqual(
    out.map((tool) => tool.name),
    ["bash", "write"]
  );
  for (const tool of out) {
    const schema = node(tool.inputSchema);
    assert.ok((tool.description as string).length < 40 * 18, "description must be shorter");
    assert.deepEqual(
      Object.keys(schema.properties).sort(),
      tool.name === "bash" ? ["command", "env"] : ["path"]
    );
    assert.ok(agyTokens(JSON.stringify(out)) <= 400);
  }
});

test("fitTools strips decorative keywords before it spends text budget", () => {
  const decorated = [
    {
      name: "t",
      description: "d".repeat(50),
      inputSchema: {
        type: "object",
        $schema: "https://json-schema.org/draft/2020-12/schema",
        title: "T",
        properties: {},
      },
    },
  ];
  const out = fitTools(structuredClone(decorated), 40);
  const schema = node(out[0].inputSchema);
  assert.equal("$schema" in schema, false);
  assert.equal("title" in schema, false);
});

test("cut keeps a sentence boundary and marks where it stopped", () => {
  const text = "First sentence. Second sentence. Third sentence.";
  const out = cut(text, 30);
  assert.ok(out !== null);
  assert.ok(out.endsWith("…"));
  assert.ok(Buffer.byteLength(out) <= 30);
  assert.equal(cut("short", 100), "short");
  assert.equal(cut("anything at all", 3), null);
});

test("the budget leaves room under agy's own 20,000-token ceiling", () => {
  assert.equal(TOOL_TOKEN_BUDGET, 18000);
});

// ── The pipeline agy runs ───────────────────────────────────────────────────

test("normalizeAgyToolSchema runs expand, sanitize and item-fill in agy's order", () => {
  const out = plain(
    normalizeAgyToolSchema({
      type: "object",
      properties: {
        list: { type: "array", items: { $ref: "#/$defs/entry" } },
        kind: { type: ["string", "number"] },
      },
      $defs: { entry: { type: "string", pattern: "\\S" } },
      required: ["kind", "absent"],
    })
  ) as {
    properties: {
      list: { items: { type: string; description: string; pattern?: string } };
      kind: { type: string; description: string };
    };
    required?: string[];
    $defs?: unknown;
  };
  // expand: the $ref is inlined and $defs is gone.
  assert.equal(out.$defs, undefined);
  // RE2: the pattern the executor would choke on became a hint, and it runs
  // before the item fill, so nothing downstream resurrects it.
  assert.equal("pattern" in out.properties.list.items, false);
  assert.match(out.properties.list.items.description, /pattern: \\S/);
  // sanitize: the union collapses and the phantom required key goes.
  assert.equal(out.properties.kind.type, "string");
  assert.equal(out.properties.kind.description, "Accepts types: string | number");
  assert.deepEqual(out.required, ["kind"]);
});

test("prepareAgyTools drops agy's own toolSummary requirement from run_command only", () => {
  const [run, other] = prepareAgyTools([
    {
      name: "run_command",
      inputSchema: {
        type: "object",
        properties: { toolSummary: { type: "string" }, cmd: { type: "string" } },
        required: ["cmd", "toolSummary"],
      },
    },
    {
      name: "other",
      inputSchema: {
        type: "object",
        properties: { toolSummary: { type: "string" } },
        required: ["toolSummary"],
      },
    },
  ]);
  assert.deepEqual(node(run.inputSchema).required, ["cmd"]);
  assert.deepEqual(node(other.inputSchema).required, ["toolSummary"]);
});
