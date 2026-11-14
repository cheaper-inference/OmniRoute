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
  const out: Array<{ line: number; tag: string }> = [];
  const re = /<Button\b/g;
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

const SOURCES = [
  ...walk(path.join(ROOT, "src/app")),
  ...walk(path.join(ROOT, "src/shared/components")),
];

test("ghost buttons with error ink at rest use the kit destructive-ghost variant", () => {
  const offenders: string[] = [];
  const usedExceptions = new Set<number>();
  for (const file of SOURCES) {
    const source = fs.readFileSync(file, "utf8");
    if (!source.includes("<Button")) continue;
    for (const { line, tag } of buttonTags(source)) {
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

test("destructive-ghost buttons do not re-add the hand-made error ink or tint", () => {
  const offenders: string[] = [];
  for (const file of SOURCES) {
    const source = fs.readFileSync(file, "utf8");
    if (!source.includes("destructive-ghost")) continue;
    for (const { line, tag } of buttonTags(source)) {
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
  ];
  for (const [file, marker] of expected) {
    const source = fs.readFileSync(path.join(ROOT, file), "utf8");
    const tag = buttonTags(source).find((b) => b.tag.includes(marker));
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
