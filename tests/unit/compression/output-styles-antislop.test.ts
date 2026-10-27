/**
 * Antislop output styles (`antislop-ui`, `antislop-copy`): two opt-in catalog
 * entries that steer generated UI and copy away from generic "AI slop".
 *
 * Verifies the catalog shape, the anchor rules of each prompt, the shared
 * craft boundary (deduped when both are on), the per-language translations,
 * that the copy filter never contains the em dash it bans, and the injection
 * into OpenAI-style and Anthropic-style bodies.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  OUTPUT_STYLE_IDS,
  outputStyleMeta,
} from "../../../open-sse/services/compression/outputStyles/catalog.ts";
import {
  applyOutputStyles,
  buildOutputStylesInstruction,
  type OutputStyleSelectionEntry,
} from "../../../open-sse/services/compression/outputStyles/apply.ts";
import { ANTISLOP_BOUNDARIES } from "../../../open-sse/services/compression/outputStyles/antislop.ts";

const IDS = ["antislop-ui", "antislop-copy"] as const;
const LEVELS = ["lite", "full", "ultra"] as const;
const LANGUAGES = ["pt-BR", "vi", "ja", "id", "es", "de", "fr", "it", "ru", "zh"];

const sel = (...entries: Array<[string, "lite" | "full" | "ultra"]>): OutputStyleSelectionEntry[] =>
  entries.map(([id, level]) => ({ id, level }));

function allTexts(id: string): Array<[string, string]> {
  const meta = outputStyleMeta(id);
  const out: Array<[string, string]> = [];
  for (const level of LEVELS) out.push([`en.${level}`, meta.levels[level]]);
  for (const [lang, levels] of Object.entries(meta.i18n ?? {})) {
    for (const level of LEVELS) out.push([`${lang}.${level}`, levels[level]]);
  }
  return out;
}

test("both antislop styles are registered, not locale-gated, with three levels", () => {
  for (const id of IDS) {
    assert.ok(OUTPUT_STYLE_IDS.includes(id), `${id} is in the catalog`);
    const meta = outputStyleMeta(id);
    assert.equal(meta.id, id);
    assert.equal(meta.locale, undefined, `${id} is offered under every language`);
    assert.ok(meta.label.startsWith("Antislop"));
    for (const level of LEVELS) {
      assert.equal(typeof meta.levels[level], "string");
      assert.ok(meta.levels[level].includes("Code blocks"), `${id}.${level} keeps boundaries`);
    }
  }
});

test("existing styles keep their catalog positions ahead of the antislop pair", () => {
  assert.deepEqual(OUTPUT_STYLE_IDS.slice(0, 5), [
    "terse-prose",
    "less-code",
    "ponytail",
    "i-have-adhd",
    "terse-cjk",
  ]);
  assert.deepEqual(OUTPUT_STYLE_IDS.slice(5), ["antislop-ui", "antislop-copy"]);
});

test("antislop-ui full carries the purpose test and the 1-2 element caps", () => {
  const full = outputStyleMeta("antislop-ui").levels.full;
  assert.match(full, /purpose test/);
  assert.match(full, /max 1-2 elements/);
  assert.match(full, /max 1-2 focus accents/);
  assert.match(full, /2-3 core colors plus 1 accent/);
  assert.match(full, /bento mosaic/);
  assert.doesNotMatch(full, /ACTIVE EVERY RESPONSE/, "drift line is covered by SHARED_BOUNDARIES");
});

test("antislop-copy full bans the em dash and pins WCAG AA contrast", () => {
  const full = outputStyleMeta("antislop-copy").levels.full;
  assert.match(full, /Never use the em dash character/);
  assert.match(full, /WCAG AA \(4\.5:1 normal, 3:1 large\)/);
  assert.match(full, /Get Started, Learn More/);
  assert.match(full, /Hope this helps/);
  assert.match(full, /tap targets at least 44px/);
  assert.match(full, /Never invent facts, names, numbers, or quotes/);
});

test("no antislop text in any language contains an em dash", () => {
  for (const id of IDS) {
    for (const [where, text] of allTexts(id)) {
      assert.ok(!text.includes("—"), `${id}.${where} contains an em dash`);
    }
    for (const [lang, clause] of Object.entries(outputStyleMeta(id).boundariesI18n ?? {})) {
      assert.ok(!clause.includes("—"), `${id}.boundariesI18n.${lang} contains an em dash`);
    }
  }
});

test("both styles share the craft boundary and its translations", () => {
  for (const id of IDS) {
    const meta = outputStyleMeta(id);
    assert.equal(meta.boundaries, ANTISLOP_BOUNDARIES);
    assert.match(ANTISLOP_BOUNDARIES, /no dead buttons/);
    assert.match(ANTISLOP_BOUNDARIES, /No fabricated statistics, testimonials/);
    for (const lang of LANGUAGES) {
      assert.ok(meta.i18n?.[lang], `${id} has a ${lang} translation`);
      assert.ok(meta.boundariesI18n?.[lang], `${id} has a ${lang} boundary translation`);
    }
  }
});

test("translations are written in their own language and keep the WCAG anchor", () => {
  const anchors: Record<string, RegExp> = {
    "pt-BR": /propósito|específica/,
    vi: /mục đích|cụ thể/,
    ja: /目的|具体的/,
    id: /tujuan|spesifik/,
    es: /propósito|específic/,
    de: /Zweck|konkret/i,
    fr: /finalité|précis/,
    it: /scopo|specific/,
    ru: /[А-Яа-яЁё]/,
    zh: /[一-鿿]/,
  };
  for (const id of IDS) {
    const meta = outputStyleMeta(id);
    for (const [lang, anchor] of Object.entries(anchors)) {
      for (const level of LEVELS) {
        const text = meta.i18n?.[lang]?.[level] ?? "";
        assert.match(text, anchor, `${id}.${lang}.${level} fails its language anchor`);
        if (id === "antislop-copy") {
          assert.match(text, /WCAG AA/, `${id}.${lang}.${level} keeps WCAG AA`);
          assert.match(text, /4\.5:1/, `${id}.${lang}.${level} keeps 4.5:1`);
        }
      }
    }
  }
});

test("instruction text is deterministic per (selection, language)", () => {
  for (const id of IDS) {
    for (const level of LEVELS) {
      for (const lang of ["en", ...LANGUAGES]) {
        const a = buildOutputStylesInstruction(sel([id, level]), lang);
        const b = buildOutputStylesInstruction(sel([id, level]), lang);
        assert.equal(a, b);
        assert.ok(a.length > 0);
      }
    }
  }
});

test("OpenAI shape: antislop-ui lands in a system message with the craft boundary", () => {
  const r = applyOutputStyles(
    { messages: [{ role: "user", content: "Build a landing page for a bakery." }] },
    sel(["antislop-ui", "full"])
  );
  assert.equal(r.applied, true);
  const system = r.body.messages?.find((m) => m.role === "system");
  const text = String(system?.content);
  assert.match(text, /purpose test/);
  assert.ok(text.includes(ANTISLOP_BOUNDARIES), "craft boundary appended");
  assert.deepEqual(r.appliedStyles, [{ id: "antislop-ui", level: "full" }]);
});

test("Anthropic shape: antislop-copy merges into the top-level system", () => {
  const r = applyOutputStyles(
    {
      system: "You are a copywriter.",
      messages: [{ role: "user", content: "Write the hero copy for a bakery." }],
    },
    sel(["antislop-copy", "full"])
  );
  assert.equal(r.applied, true);
  assert.match(String(r.body.system), /You are a copywriter\./);
  assert.match(String(r.body.system), /Never use the em dash character/);
  assert.equal(r.body.messages?.length, 1);
});

test("both on: catalog order, craft boundary injected once", () => {
  const text = buildOutputStylesInstruction(
    sel(["antislop-copy", "full"], ["antislop-ui", "full"])
  );
  const uiAt = text.indexOf("Antislop UI filter");
  const copyAt = text.indexOf("Antislop copy and human filter");
  assert.ok(uiAt >= 0 && copyAt > uiAt, "ui before copy (catalog order)");
  assert.equal(text.split(ANTISLOP_BOUNDARIES).length - 1, 1, "craft boundary deduped");
});

test("a localized selection gets the localized boundary, not the English one", () => {
  const text = buildOutputStylesInstruction(sel(["antislop-ui", "full"]), "pt-BR");
  assert.match(text, /teste de propósito/);
  assert.ok(text.includes(outputStyleMeta("antislop-ui").boundariesI18n?.["pt-BR"] ?? "\0"));
  assert.ok(!text.includes(ANTISLOP_BOUNDARIES));
});

test("opt-in: an empty selection injects nothing", () => {
  const body = { messages: [{ role: "user", content: "Build a landing page." }] };
  const r = applyOutputStyles(body, []);
  assert.equal(r.applied, false);
  assert.equal(r.body, body);
});
