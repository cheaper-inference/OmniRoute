import test from "node:test";
import assert from "node:assert/strict";

import { readSrc } from "../_helpers/readSrc";

function assertInOrder(source: string, labels: string[]) {
  let lastIndex = -1;
  for (const label of labels) {
    const index = source.indexOf(label);
    assert.notEqual(index, -1, `Expected to find ${label}`);
    assert.ok(index > lastIndex, `Expected ${label} to appear after previous marker`);
    lastIndex = index;
  }
}

test("Appearance page keeps the theme selector above branding and removes sidebar item controls", () => {
  const source = readSrc("src/app/(dashboard)/dashboard/settings/components/AppearanceTab.tsx");

  assert.doesNotMatch(source, /SidebarVisibilitySetting/);
  // The light/dark/system selector stays above the whitelabeling block. The accent presets
  // (`themeAccent` / COLOR_THEMES / custom hex) were retired with the Keak kit (KEA-7886, D4):
  // the accent is the kit's token, not a per-user preference.
  assertInOrder(source, ['t("themeSelectionAria")', 't("whitelabeling")']);
  assert.doesNotMatch(source, /themeAccent|COLOR_THEMES|setColorTheme|customColor/);
});

test("Usage Token Buffer lives in AI settings instead of General storage", () => {
  const aiPage = readSrc("src/app/(dashboard)/dashboard/settings/ai/page.tsx");
  const generalStorage = readSrc(
    "src/app/(dashboard)/dashboard/settings/components/SystemStorageTab.tsx"
  );

  assert.match(aiPage, /UsageTokenBufferTab/);
  // Anchor: the storage tab component itself, so the negative guard below cannot
  // pass against a file that was moved, renamed, or split apart.
  assert.match(generalStorage, /export default function SystemStorageTab\(/);
  assert.doesNotMatch(generalStorage, /storageUsageTokenBuffer/);
});

test("Storage settings page uses the requested section order", () => {
  const source = readSrc("src/app/(dashboard)/dashboard/settings/components/SystemStorageTab.tsx");

  assertInOrder(source, [
    't("databasePath")',
    "{renderDatabaseStatistics()}",
    't("export")',
    't("maintenance")',
    't("lastBackup")',
    "{renderRetentionSettings()}",
    "{renderOptimizationSettings()}",
    "{renderCompressionAggregationSettings()}",
  ]);
  assert.doesNotMatch(source, /debugToggle/);
});

test("Debug mode moved to the top of Advanced settings", () => {
  const advancedPage = readSrc("src/app/(dashboard)/dashboard/settings/advanced/page.tsx");

  assertInOrder(advancedPage, ["<DebugModeCard", "<PayloadRulesTab"]);
});

test("Log Tool Sources toggle is mounted in Advanced settings next to Debug mode", () => {
  const advancedPage = readSrc("src/app/(dashboard)/dashboard/settings/advanced/page.tsx");

  assertInOrder(advancedPage, ["<DebugModeCard", "<LogToolSourcesCard", "<PayloadRulesTab"]);

  const card = readSrc("src/app/(dashboard)/dashboard/settings/components/LogToolSourcesCard.tsx");
  assert.match(card, /t\("logToolSourcesToggle"\)/);
  assert.match(card, /t\("logToolSourcesDescription"\)/);
  assert.match(card, /logToolSources: value/);

  const schema = readSrc("src/shared/validation/settingsSchemas.ts");
  assert.match(schema, /logToolSources: z\.boolean\(\)\.optional\(\)/);

  const en = readSrc("src/i18n/messages/en.json");
  assert.match(en, /"logToolSourcesToggle": "Log Tool Sources"/);
});

test("Proxy Logs table uses the same blue row hover emphasis as Logs", () => {
  const proxyLogger = readSrc("src/shared/components/ProxyLogger.tsx");
  const requestLogger = readSrc("src/shared/components/RequestLoggerV2.tsx");

  // KEA-7886: the blue (sky) hover is the kit info token, which resolves per theme.
  assert.match(proxyLogger, /hover:bg-info\/10/);
  assert.match(requestLogger, /hover:bg-info\/10/);
  assert.doesNotMatch(proxyLogger, /hover:bg-primary\/5/);
});

test("General settings navigation is labeled Storage in English", () => {
  const en = readSrc("src/i18n/messages/en.json");

  assert.match(en, /"settingsGeneral": "Storage"/);
  assert.match(en, /"systemStorage": "Storage"/);
});

test("Global Routing page renders top-level modules in the requested order", () => {
  const page = readSrc("src/app/(dashboard)/dashboard/settings/routing/page.tsx");
  const routingTab = readSrc("src/app/(dashboard)/dashboard/settings/components/RoutingTab.tsx");

  assertInOrder(page, [
    "<RoutingStrategyCard",
    "<ComboDefaultsTab",
    "<ModelAliasesUnified",
    "<FallbackChainsEditor",
    "<ModelRoutingSection",
    "<RoutingTab",
    "<BackgroundDegradationTab",
  ]);

  assertInOrder(routingTab, [
    't("routingZeroConfigTitle")',
    't("systemTransforms")',
    't("cliFingerprint")',
    't("routingClientCacheControlTitle")',
    't("routingAntigravitySignatureTitle")',
    't("lkgpToggleTitle")',
    't("adaptiveVolumeRouting")',
  ]);
});
