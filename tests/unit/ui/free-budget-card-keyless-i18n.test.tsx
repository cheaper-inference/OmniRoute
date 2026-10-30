// Regression guard: the keyless "No API key required" overview once hardcoded its
// count in Chinese (hardcoded Han text) inside a component served in 43 locales.
// The count now goes through the `freeBudget.keylessCount` ICU message, so these
// tests pin both halves: the component renders no CJK under locale `en`, and the
// count really is interpolated from the message catalog rather than hardcoded.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { describe, expect, it } from "vitest";

import {
  FreeBudgetView,
  type FreeBudgetData,
} from "../../../src/app/(dashboard)/dashboard/usage/components/FreeBudgetCard.tsx";
import messages from "../../../src/i18n/messages/en.json";

// Han, kana, CJK punctuation/symbols, compatibility ideographs and full/half-width
// forms. Built from escapes so this file stays ASCII-only. Deliberately excludes the
// Latin-1 middle dot (U+00B7) and the ellipsis (U+2026), which the catalog uses.
const CJK = new RegExp(
  "[\u3000-\u303f\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff00-\uffef]",
  "u"
);

const COMPONENT_PATH = resolve(
  process.cwd(),
  "src/app/(dashboard)/dashboard/usage/components/FreeBudgetCard.tsx"
);

// Two keyless providers, three keyless models between them. Every row is tos "ok"
// so the ToS-restricted callout stays out of the markup and cannot be mistaken for
// the keyless count.
function dataWithKeyless(noCredentialProviders: string[]): FreeBudgetData {
  const perModel: FreeBudgetData["perModel"] = [
    {
      provider: "pollinations",
      modelId: "openai-fast",
      displayName: "Pollinations Fast",
      monthlyTokens: 30_000_000,
      creditTokens: 0,
      freeType: "keyless",
      poolKey: "pollinations",
      tos: "ok",
    },
    {
      provider: "pollinations",
      modelId: "openai-large",
      displayName: "Pollinations Large",
      monthlyTokens: 10_000_000,
      creditTokens: 0,
      freeType: "keyless",
      poolKey: "pollinations",
      tos: "ok",
    },
    {
      provider: "llm7",
      modelId: "llm7",
      displayName: "LLM7 pool",
      monthlyTokens: 150_000_000,
      creditTokens: 0,
      freeType: "keyless",
      poolKey: "llm7",
      tos: "ok",
    },
    {
      provider: "mistral",
      modelId: "mistral-small",
      displayName: "Mistral Small",
      monthlyTokens: 1_000_000_000,
      creditTokens: 0,
      freeType: "recurring-monthly",
      poolKey: "mistral",
      tos: "ok",
    },
  ];
  return {
    steadyRecurringTokens: 1_190_000_000,
    steadyWithRecurringCreditsTokens: 1_190_000_000,
    firstMonthRealisticTokens: 1_300_000_000,
    usedThisMonth: 10_000_000,
    remaining: 1_180_000_000,
    modelCount: perModel.length,
    poolCount: 3,
    catalogUpdatedAt: null,
    noCredentialProviders,
    perModel,
  };
}

// Mirrors the label mapping in the FreeBudgetCard wrapper, so the rendered markup
// is driven by the real en.json catalog instead of the component's English fallbacks.
function LocalizedFreeBudget({ data }: { data: FreeBudgetData }) {
  const t = useTranslations("freeBudget");
  return (
    <FreeBudgetView
      data={data}
      labels={{
        title: t("title"),
        remaining: (remaining, percent, total) => t("remaining", { remaining, percent, total }),
        steadyMonth: t("steadyMonth"),
        firstMonth: t("firstMonth"),
        usedThisMonth: t("usedThisMonth"),
        segmentHint: t("segmentHint"),
        boost: (tokens) => t("boost", { tokens }),
        uncapped: t("uncapped"),
        gated: (tokens) => t("gated", { tokens }),
        tosRestricted: (count) => t("tosRestricted", { count }),
        provider: t("provider"),
        model: t("model"),
        type: t("type"),
        tokensMonth: t("tokensMonth"),
        credit: (tokens) => t("credit", { tokens }),
        noApiKey: t("noApiKeyRequired"),
        keylessCount: (models, providers) => t("keylessCount", { models, providers }),
        freeTypes: {
          "recurring-daily": t("freeType.daily"),
          "recurring-monthly": t("freeType.monthly"),
          "recurring-credit": t("freeType.creditMonthly"),
          "recurring-uncapped": t("freeType.uncapped"),
          "one-time-initial": t("freeType.signupCredit"),
          keyless: t("freeType.keyless"),
          discontinued: t("freeType.discontinued"),
        },
        tosTitles: {
          avoid: t("tosTitle.avoid"),
          caution: t("tosTitle.caution"),
          ok: t("tosTitle.ok"),
        },
      }}
    />
  );
}

const renderEn = (data: FreeBudgetData) =>
  renderToStaticMarkup(
    <NextIntlClientProvider locale="en" messages={{ freeBudget: messages.freeBudget }}>
      <LocalizedFreeBudget data={data} />
    </NextIntlClientProvider>
  );

describe("FreeBudgetCard — keyless count is localized, not hardcoded Chinese", () => {
  it("defines freeBudget.keylessCount in the English catalog", () => {
    // Pinpoints the failure if the key is dropped: every render assertion below
    // would otherwise fail with next-intl's opaque fallback output.
    expect(messages.freeBudget).toHaveProperty("keylessCount");
    expect(messages.freeBudget.keylessCount).not.toMatch(CJK);
  });

  it("renders the keyless count from the catalog, with no CJK under locale en", () => {
    const html = renderEn(dataWithKeyless(["pollinations", "llm7"]));

    expect(html).toMatch(/data-testid="keyless-section"/);
    expect(html).toMatch(/No API key required/);
    // 3 keyless models across 2 distinct providers, interpolated by the ICU message.
    expect(html).toMatch(/3 models · 2 providers/);

    // The actual regression: not one CJK character anywhere in the English render.
    expect(html).not.toMatch(CJK);
  });

  it("pluralizes a single model and a single provider", () => {
    const html = renderEn(dataWithKeyless(["llm7"]));
    expect(html).toMatch(/1 model · 1 provider/);
    expect(html).not.toMatch(/1 models|1 providers/);
    expect(html).not.toMatch(CJK);
  });

  it("falls back to English defaults with no CJK when no labels are supplied", () => {
    // The DEFAULT_LABELS path (what the SSR-only tests exercise) must stay English too.
    const html = renderToStaticMarkup(
      <FreeBudgetView data={dataWithKeyless(["pollinations", "llm7"])} />
    );
    expect(html).toMatch(/3 models · 2 providers/);
    expect(html).not.toMatch(CJK);
  });

  it("keeps the component source free of CJK literals", () => {
    // Cheapest guard against the whole bug class: a future hardcoded CJK string
    // anywhere in this component fails here even if no test renders that branch.
    const source = readFileSync(COMPONENT_PATH, "utf8");
    const offenders = source
      .split(/\r?\n/)
      .map((line, i) => ({ line, n: i + 1 }))
      .filter(({ line }) => CJK.test(line));
    expect(offenders.map((o) => `${o.n}: ${o.line.trim()}`)).toEqual([]);
  });
});
