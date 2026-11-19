import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Issue #19620 ("Kept on purpose"): inline deletes used `variant="ghost"` with error ink until
// the kit had a quiet destructive style. Kit 0.0.110 added `variant="destructive-ghost"`
// (keak-ai/cheaper-inference-ui-kit#191), with its own AA-checked ink and the danger hover tint.
// This guard keeps the hand-made version from coming back: a ghost Button that draws error ink
// at rest is a destructive action and must use the kit variant. Every kept exception is listed
// with its reason; anything new fails.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!/node_modules|__tests__/.test(entry.name)) walk(p, out);
    } else if (/\.tsx$/.test(entry.name) && !/\.(test|spec)\./.test(entry.name)) out.push(p);
  }
  return out;
}

const rel = (p: string) => path.relative(ROOT, p).split(path.sep).join("/");

/** Opening tag of every `<Button`, up to the `>` / `/>` that closes it (JSX braces balanced). */
function buttonTags(source: string): Array<{ line: number; tag: string }> {
  return openingTags(source, /<Button\b/g);
}

/** Same, for the GuardedAction adapter (a Button with a `reason`). */
function guardedActionTags(source: string): Array<{ line: number; tag: string }> {
  return openingTags(source, /<GuardedAction\b/g);
}

function openingTags(source: string, re: RegExp): Array<{ line: number; tag: string }> {
  const out: Array<{ line: number; tag: string }> = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(source))) {
    let depth = 0;
    let quote: string | null = null;
    let i = m.index + 1;
    for (; i < source.length; i++) {
      const c = source[i];
      if (quote) {
        if (c === quote) quote = null;
        continue;
      }
      if (depth === 0 && (c === '"' || c === "'")) quote = c;
      else if (c === "{") depth++;
      else if (c === "}") depth--;
      else if (c === ">" && depth === 0) break;
    }
    out.push({ line: source.slice(0, m.index).split("\n").length, tag: source.slice(m.index, i) });
  }
  return out;
}

/** Error ink at rest: `text-error` (or `!text-error`) that is not a `hover:` variant. */
const REST_ERROR_INK = /(?<![\w:-])!?text-error\b/;

// Ghost buttons whose error ink is a status colour, not a destructive action.
const NOT_DESTRUCTIVE: Array<{ file: string; marker: string; reason: string }> = [
  {
    file: "src/app/(dashboard)/dashboard/providers/[id]/components/ModelRow.tsx",
    marker: "onToggleHidden(",
    reason: "Blacklist hides the model from the catalog and is undone from the same row.",
  },
  {
    file: "src/app/(dashboard)/dashboard/providers/[id]/components/ModelRow.tsx",
    marker: "onTestModel(",
    reason: "Test button: error ink is the last test result.",
  },
  {
    file: "src/app/(dashboard)/dashboard/providers/[id]/components/PassthroughModelRow.tsx",
    marker: "onToggleHidden(",
    reason: "Blacklist hides the model from the catalog and is undone from the same row.",
  },
  {
    file: "src/app/(dashboard)/dashboard/providers/[id]/components/PassthroughModelRow.tsx",
    marker: "onTestModel(",
    reason: "Test button: error ink is the last test result.",
  },
  {
    file: "src/app/(dashboard)/dashboard/radar/RadarCatalogTable.tsx",
    marker: "setTombstone(",
    reason: "Hide model is a reversible visibility toggle.",
  },
  {
    file: "src/app/(dashboard)/dashboard/usage/components/ProviderLimits/parts/QuotaCardHeader.tsx",
    marker: "onToggleActive(",
    reason: "Toggle: error ink marks an inactive quota.",
  },
  {
    file: "src/shared/components/NoAuthAccountCard.tsx",
    marker: "openProxyConfig(",
    reason: "Proxy shield: error ink marks an empty pool.",
  },
  {
    file: "src/app/(dashboard)/dashboard/api-manager/[id]/access/tabs/ModelsTab.tsx",
    marker: "onClick={deselectAllModels}",
    reason: "Tiny text link that clears an unsaved form selection, not a row action.",
  },
];

/** Error ink only on hover: `hover:text-error`, `hover:!text-error`, `hover:text-red-…`. */
const HOVER_ERROR_INK = /hover:!?text-(error|red-\d+|destructive)\b/;

// Owner decision 1 (2026-11-14), checked screen by screen in the browser: a destructive action
// that lives on a row or card (delete/remove/revoke an item, trash icon) uses
// `destructive-ghost`; a small icon among many (dropping a chip, an "x" that clears an input or
// a form row, a toolbar or nav action) keeps the quiet grey with error ink on hover. Every kept
// hover-red ghost/outline button is listed here with its reason; anything new fails.
const HOVER_ONLY_KEPT: Array<{ file: string; marker: string; reason: string }> = [
  ...[
    "removeClaudeCodeDefault",
    "blockClaudeCodeFamily(",
    "name: provider",
    "getModelDisplayName(modelId)",
  ].map((marker) => ({
    file: "src/app/(dashboard)/dashboard/api-manager/[id]/access/tabs/ModelsTab.tsx",
    marker,
    reason: "16px x on a selection chip.",
  })),
  ...(
    [
      ["KeyPolicyBehaviourTab.tsx", "groupIds.filter"],
      ["KeyPolicyCombosTab.tsx", "selectedCombos.filter"],
      ["KeyPolicyConnectionsTab.tsx", "selectedConnections.filter"],
      ["KeyPolicyGeneralTab.tsx", "extraScopes.filter"],
      ["KeyPolicyGeneralTab.tsx", "ipAllowlist.filter"],
      ["KeyPolicyLimitsTab.tsx", "allowedQuotas.filter"],
      ["KeyPolicyModelsTab.tsx", "selectedModels.filter"],
    ] as const
  ).map(([name, marker]) => ({
    file: `src/app/(dashboard)/dashboard/api-manager/components/${name}`,
    marker,
    reason: "16px x on a key-policy chip.",
  })),
  ...(
    [
      ["AntigravityToolCard.tsx", 'handleModelMappingChange(model.alias, "")'],
      ["ClaudeToolCard.tsx", 'onModelMappingChange(model.alias, "")'],
      ["CodexToolCard.tsx", 'setSelectedModel("")'],
      ["CodexToolCard.tsx", "delete next[defaultModel]"],
      ["DefaultToolCard.tsx", "handleModelValuesChange([])"],
      ["DroidToolCard.tsx", "removeModel(id)"],
      ["GrokBuildToolCard.tsx", 'setModel("")'],
      ["GrokBuildToolCard.tsx", "[type]: undefined"],
      ["OpenClawToolCard.tsx", 'setSelectedModel("")'],
    ] as const
  ).map(([name, marker]) => ({
    file: `src/app/(dashboard)/dashboard/cli-code/components/${name}`,
    marker,
    reason: "x that clears a model field next to its input (unsaved form value).",
  })),
  {
    file: "src/app/(dashboard)/dashboard/batch/components/UploadFileModal.tsx",
    marker: "setFile(null)",
    reason: "Clears the file picked in the upload form.",
  },
  {
    file: "src/app/(dashboard)/dashboard/combos/ResponseValidationEditor.tsx",
    marker: "rv-predicate-remove",
    reason: "x that drops one predicate line of the form, next to its inputs.",
  },
  {
    file: "src/app/(dashboard)/dashboard/combos/page.tsx",
    marker: "handleRemoveModel(index)",
    reason: "x at the end of a step line, among move up/down and test icons (unsaved builder).",
  },
  {
    file: "src/app/(dashboard)/dashboard/costs/quota-share/components/PoolSchedulesCard.tsx",
    marker: "patchReserve(index, ruleIndex, null)",
    reason: "24px x that drops a reserve rule next to its inputs.",
  },
  {
    file: "src/app/(dashboard)/dashboard/costs/quota-share/components/PoolWizard.tsx",
    marker: "removeDimension(i)",
    reason: "24px x that drops a dimension line of the wizard form.",
  },
  {
    file: "src/app/(dashboard)/dashboard/costs/quota-share/components/PoolWizard.tsx",
    marker: "removeAllocation(a.apiKeyId)",
    reason: "24px x that drops a key line of the wizard form.",
  },
  {
    file: "src/app/(dashboard)/dashboard/omni-skills/components/SkillInspectorPane.tsx",
    marker: "onUninstall(skill.id)",
    reason: "Outline button that already draws error ink at rest (inspector footer).",
  },
  {
    file: "src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx",
    marker: "onRemove(id)",
    reason: "x that closes a compare column, next to its copy icon.",
  },
  {
    file: "src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx",
    marker: "setUploadedImages([])",
    reason: "Small text button that clears the images attached to the request form.",
  },
  {
    file: "src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx",
    marker: "onClick={handleClear}",
    reason: "Toolbar icon beside Regenerate that resets the local chat, not an item row.",
  },
  {
    file: "src/app/(dashboard)/dashboard/providers/[id]/components/ModelCompatPopover.tsx",
    marker: "removeHeaderRow(row.id)",
    reason: "x that drops a header line next to its name/value inputs.",
  },
  {
    file: "src/shared/components/Header.tsx",
    marker: "handleLogout",
    reason: "Logout in the header toolbar (pinned below).",
  },
  {
    file: "src/shared/components/Sidebar.tsx",
    marker: "setShowShutdownModal(true)",
    reason: "Sidebar nav item; opens a confirmation dialog.",
  },
];

const SOURCES = [
  ...walk(path.join(ROOT, "src/app")),
  ...walk(path.join(ROOT, "src/shared/components")),
];

test("ghost buttons with error ink at rest use the kit destructive-ghost variant", () => {
  const offenders: string[] = [];
  const usedExceptions = new Set<number>();
  for (const file of SOURCES) {
    const source = fs.readFileSync(file, "utf8");
    if (!source.includes("<Button") && !source.includes("<GuardedAction")) continue;
    for (const { line, tag } of [...buttonTags(source), ...guardedActionTags(source)]) {
      if (!/variant="ghost"/.test(tag) || !REST_ERROR_INK.test(tag)) continue;
      const idx = NOT_DESTRUCTIVE.findIndex((e) => e.file === rel(file) && tag.includes(e.marker));
      if (idx >= 0) {
        usedExceptions.add(idx);
        continue;
      }
      offenders.push(`${rel(file)}:${line}`);
    }
  }
  assert.deepEqual(offenders, [], 'use variant="destructive-ghost" instead of ghost + text-error');
  const stale = NOT_DESTRUCTIVE.filter((_, i) => !usedExceptions.has(i)).map(
    (e) => `${e.file} (${e.marker})`
  );
  assert.deepEqual(stale, [], "stale NOT_DESTRUCTIVE entries: remove them");
});

test("ghost buttons that only turn red on hover are destructive-ghost or a listed exception", () => {
  const offenders: string[] = [];
  const used = new Set<number>();
  for (const file of SOURCES) {
    const source = fs.readFileSync(file, "utf8");
    if (!source.includes("<Button") && !source.includes("<GuardedAction")) continue;
    const tags = [...buttonTags(source), ...guardedActionTags(source)];
    for (const { line, tag } of tags) {
      if (!/variant="(ghost|outline)"/.test(tag) || !HOVER_ERROR_INK.test(tag)) continue;
      const idx = HOVER_ONLY_KEPT.findIndex((e) => e.file === rel(file) && tag.includes(e.marker));
      if (idx >= 0) {
        used.add(idx);
        continue;
      }
      offenders.push(`${rel(file)}:${line}`);
    }
  }
  assert.deepEqual(
    offenders,
    [],
    'a row/card delete uses variant="destructive-ghost"; a kept hover-red icon needs an entry'
  );
  const stale = HOVER_ONLY_KEPT.filter((_, i) => !used.has(i)).map(
    (e) => `${e.file} (${e.marker})`
  );
  assert.deepEqual(stale, [], "stale HOVER_ONLY_KEPT entries: remove them");
});

test("destructive-ghost buttons do not re-add the hand-made error ink or tint", () => {
  const offenders: string[] = [];
  for (const file of SOURCES) {
    const source = fs.readFileSync(file, "utf8");
    if (!source.includes("destructive-ghost")) continue;
    for (const { line, tag } of [...buttonTags(source), ...guardedActionTags(source)]) {
      if (!/variant="destructive-ghost"/.test(tag)) continue;
      if (/!?(hover:)?text-error\b|hover:!?bg-error/.test(tag))
        offenders.push(`${rel(file)}:${line}`);
    }
  }
  assert.deepEqual(offenders, []);
});

test("the destructive row actions from the #19620 list use destructive-ghost", () => {
  // One per surface the issue named (proxy, key, token, …): each must be the kit variant.
  const expected: Array<[string, string]> = [
    [
      "src/app/(dashboard)/dashboard/settings/components/ProxyRegistryManager.tsx",
      "handleDelete(item.id)",
    ],
    [
      "src/app/(dashboard)/dashboard/api-manager/ApiManagerPageClient.tsx",
      "handleDeleteKey(key.id)",
    ],
    ["src/app/(dashboard)/dashboard/tokens/page.tsx", "handleRevokeInvite(inv.id)"],
    ["src/app/(dashboard)/dashboard/relay/RelayProxyClient.tsx", "deleteToken(token.id)"],
    ["src/app/(dashboard)/dashboard/webhooks/components/WebhookCard.tsx", "onDelete(webhook)"],
    [
      "src/app/(dashboard)/dashboard/providers/[id]/components/ConnectionRow.tsx",
      "onClick={onDelete}",
    ],
    [
      "src/app/(dashboard)/dashboard/cache/components/CacheEntriesTab.tsx",
      "handleDelete(entry.signature)",
    ],
    ["src/app/(dashboard)/dashboard/acp-agents/page.tsx", "handleRemoveAgent(agent.id)"],
    // Decision 1 (2026-11-14): hover-only red row/card deletes, checked in the browser.
    ["src/app/(dashboard)/dashboard/batch/BatchListTab.tsx", "setDeletingId(batch.id)"],
    ["src/app/(dashboard)/dashboard/batch/FilesListTab.tsx", "handleDeleteFile(file)"],
    [
      "src/app/(dashboard)/dashboard/cli-code/components/CodexToolCard.tsx",
      "handleDeleteProfile(p.id)",
    ],
    [
      "src/app/(dashboard)/dashboard/costs/quota-share/QuotaSharePageClient.tsx",
      "handleDeleteGroup()",
    ],
    [
      "src/app/(dashboard)/dashboard/costs/quota-share/components/PoolCard.tsx",
      "onClick={onRemove}",
    ],
    [
      "src/app/(dashboard)/dashboard/costs/quota-share/components/PoolSchedulesCard.tsx",
      "setRows((prev) => prev.filter((_, i) => i !== index))",
    ],
    ["src/app/(dashboard)/dashboard/playground/components/PresetPicker.tsx", "remove(preset.id)"],
    ["src/app/(dashboard)/dashboard/playground/components/ToolsBuilder.tsx", "remove(idx)"],
    ["src/shared/components/NoAuthAccountCard.tsx", "handleRemoveAccount(id)"],
  ];
  for (const [file, marker] of expected) {
    const source = fs.readFileSync(path.join(ROOT, file), "utf8");
    const tag = [...buttonTags(source), ...guardedActionTags(source)].find((b) =>
      b.tag.includes(marker)
    );
    assert.ok(tag, `${file}: no Button with ${marker}`);
    assert.match(tag.tag, /variant="destructive-ghost"/, `${file}:${tag.line}`);
  }
});

test("the Header logout button keeps its ghost style", () => {
  const source = fs.readFileSync(path.join(ROOT, "src/shared/components/Header.tsx"), "utf8");
  const tag = buttonTags(source).find((b) => b.tag.includes("handleLogout"));
  assert.ok(tag);
  assert.match(tag.tag, /variant="ghost"/);
});
