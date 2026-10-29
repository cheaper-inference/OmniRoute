/**
 * OpenClaude (@gitlawb/openclaude) CLI tool guide card.
 *
 * DefaultToolCard renders a guide card straight from the catalog data, so the
 * registry entry is the whole feature. The command shape is pinned on purpose:
 * OpenClaude only reaches an OpenAI-compatible endpoint when started with
 * `--provider openai` — with the env vars alone it stops at "Not logged in".
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { CLI_TOOLS } from "../../../src/shared/constants/cliTools.ts";
import { CliCatalogEntrySchema } from "../../../src/shared/schemas/cliCatalog.ts";
import { CLI_INTEGRATION_MANIFEST } from "../../../src/shared/constants/cliIntegrationManifest.ts";
import en from "../../../src/i18n/messages/en.json" with { type: "json" };

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const tool = CLI_TOOLS.openclaude;

test("openclaude is registered separately from the existing openclaw entry", () => {
  assert.ok(tool, "CLI_TOOLS.openclaude must exist");
  assert.equal(tool.id, "openclaude");
  assert.equal(tool.name, "OpenClaude");
  assert.equal(CLI_TOOLS.openclaw.id, "openclaw");
  assert.notEqual(CLI_TOOLS.openclaw.name, tool.name);
});

test("openclaude entry satisfies the catalog schema as a visible code guide card", () => {
  assert.equal(CliCatalogEntrySchema.safeParse(tool).success, true);
  assert.equal(tool.configType, "guide");
  assert.equal(tool.category, "code");
  assert.equal(tool.baseUrlSupport, "full");
  assert.equal(tool.acpSpawnable, false);
  assert.equal(tool.defaultCommand, "openclaude");
});

test("openclaude icon points at a bundled public asset", () => {
  assert.equal(typeof tool.image, "string");
  assert.ok(fs.existsSync(path.join(repoRoot, "public", tool.image as string)));
});

test("openclaude guide offers the api key and model selectors the card renders", () => {
  assert.ok(Array.isArray(tool.guideSteps) && tool.guideSteps.length > 0);
  const types = (tool.guideSteps ?? []).map((s) => s.type).filter(Boolean);
  assert.ok(types.includes("apiKeySelector"));
  assert.ok(types.includes("modelSelector"));
  assert.ok((tool.guideSteps ?? []).some((s) => s.desc?.includes("@gitlawb/openclaude")));
});

test("openclaude code block exports the OPENAI_* env vars with card placeholders", () => {
  const code = tool.codeBlock?.code ?? "";
  assert.equal(tool.codeBlock?.language, "bash");
  assert.ok(code.includes('export OPENAI_BASE_URL="{{baseUrl}}"'));
  assert.ok(code.includes('export OPENAI_API_KEY="{{apiKey}}"'));
  assert.ok(code.includes('export OPENAI_MODEL="{{model}}"'));
});

test("openclaude is started with --provider openai, without which it ignores the env vars", () => {
  assert.ok((tool.codeBlock?.code ?? "").includes("openclaude --provider openai"));
  assert.ok((tool.notes ?? []).some((n) => n.text.includes("--provider openai")));
});

test("openclaude guide covers Windows PowerShell", () => {
  assert.ok((tool.codeBlock?.code ?? "").includes("$env:OPENAI_BASE_URL"));
});

test("openclaude is declared in the CLI integration manifest as a catalog-only target", () => {
  const entry = CLI_INTEGRATION_MANIFEST.openclaude;
  assert.ok(entry, "manifest must declare openclaude");
  assert.equal(entry.surfaces.catalog, true);
  assert.equal(entry.surfaces.run, false);
  assert.equal(entry.surfaces.configure, false);
  assert.equal(entry.surfaces.generate, false);
  assert.deepEqual(entry.binaries, ["openclaude"]);
});

test("openclaude has an English card description", () => {
  const descriptions = en.cliTools.toolDescriptions as Record<string, string>;
  assert.ok(descriptions.openclaude?.trim());
});
