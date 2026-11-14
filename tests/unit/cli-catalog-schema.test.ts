/**
 * F1: cli-catalog-schema.test.ts
 * Round-trip each CLI_TOOLS entry through CliCatalogEntrySchema;
 * verify ZodError on invalid payloads.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

const { CLI_TOOLS } = await import("../../src/shared/constants/cliTools.ts");
const { CliCatalogEntrySchema, CliCatalogSchema } =
  await import("../../src/shared/schemas/cliCatalog.ts");

test("Every CLI_TOOLS entry passes CliCatalogEntrySchema.parse() without error", () => {
  for (const [key, tool] of Object.entries(CLI_TOOLS)) {
    const result = CliCatalogEntrySchema.safeParse(tool);
    assert.equal(
      result.success,
      true,
      `Entry '${key}' failed schema validation: ${!result.success ? JSON.stringify(result.error.issues) : ""}`
    );
  }
});

// The catalog's Pi entry no longer ships a codeBlock title (#18603 dropped it),
// but the schema still accepts the optional field; a title on a manual
// configuration block must survive parsing instead of being stripped.
test("Pi manual configuration title survives catalog parsing", () => {
  const pi = CLI_TOOLS.pi;
  const parsed = CliCatalogEntrySchema.parse({
    ...pi,
    codeBlock: { ...pi.codeBlock, title: "~/.pi/agent/models.json" },
  });
  assert.equal(parsed.codeBlock?.title, "~/.pi/agent/models.json");
  assert.equal(parsed.codeBlock?.code, pi.codeBlock?.code);
});

test("CliCatalogSchema.parse() accepts the full CLI_TOOLS record", () => {
  const result = CliCatalogSchema.safeParse(CLI_TOOLS);
  assert.equal(
    result.success,
    true,
    result.success ? "" : `CliCatalogSchema failed: ${JSON.stringify(result.error.issues)}`
  );
});

test("CliCatalogEntrySchema throws ZodError for invalid category value", () => {
  const base = { ...CLI_TOOLS["claude"] };
  // @ts-expect-error — intentional invalid value for testing
  const invalid = { ...base, category: "invalid" };
  assert.throws(
    () => CliCatalogEntrySchema.parse(invalid),
    (err) => err instanceof z.ZodError
  );
});

test("CliCatalogEntrySchema throws ZodError for invalid color (not #RRGGBB)", () => {
  const base = { ...CLI_TOOLS["codex"] };
  const invalid = { ...base, color: "xyz" };
  assert.throws(
    () => CliCatalogEntrySchema.parse(invalid),
    (err) => err instanceof z.ZodError
  );
});

test("CliCatalogEntrySchema throws ZodError for invalid baseUrlSupport value", () => {
  const base = { ...CLI_TOOLS["cline"] };
  // @ts-expect-error — intentional invalid value for testing
  const invalid = { ...base, baseUrlSupport: "maybe" };
  assert.throws(
    () => CliCatalogEntrySchema.parse(invalid),
    (err) => err instanceof z.ZodError
  );
});

test("CliCatalogEntrySchema throws ZodError when required string fields are empty", () => {
  const base = { ...CLI_TOOLS["opencode"] };
  const invalid = { ...base, vendor: "" };
  assert.throws(
    () => CliCatalogEntrySchema.parse(invalid),
    (err) => err instanceof z.ZodError
  );
});

test("CliCatalogEntrySchema throws ZodError for invalid configType value", () => {
  const base = { ...CLI_TOOLS["custom"] };
  // @ts-expect-error — intentional invalid value for testing
  const invalid = { ...base, configType: "unknown-type" };
  assert.throws(
    () => CliCatalogEntrySchema.parse(invalid),
    (err) => err instanceof z.ZodError
  );
});

test("Optional fields absent from entry still parse successfully", () => {
  // 'codex' has no guideSteps, no envVars, no notes — minimal entry
  const result = CliCatalogEntrySchema.safeParse(CLI_TOOLS["codex"]);
  assert.equal(result.success, true);
});
