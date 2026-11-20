import test, { describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

import { QuotaWindowSchema } from "../../src/lib/quota/dimensions.ts";
import type { SelfQuotaAccount } from "../../src/shared/schemas/selfQuota.ts";
import {
  amountText,
  hasAccountReading,
  modelWindowsRepeatReason,
  policyKey,
  reasonKey,
  shareFootnote,
  shareOverKey,
  windowKey,
} from "../../src/app/quota/[provider]/lib/quotaText.ts";

const catalog = JSON.parse(
  readFileSync(path.join(process.cwd(), "src/i18n/messages/en.json"), "utf8")
).quotaSelf as Record<string, string>;

const REASONS = [
  "store_unavailable",
  "percent_attribution_unavailable",
  "window_not_reported",
  "connection_lookup_failed",
  "not_supported",
  "fetch_failed",
  "not_available",
];

const fakeT = (key: string, values?: Record<string, string | number>) =>
  key + ":" + JSON.stringify(values);

function fakeNumber() {
  const calls: Array<[number, Intl.NumberFormatOptions | undefined]> = [];
  const number = (value: number, options?: Intl.NumberFormatOptions) => {
    calls.push([value, options]);
    return `n(${value})`;
  };
  return { calls, number };
}

function accountWith(over: Partial<SelfQuotaAccount>): SelfQuotaAccount {
  return { slot: 1, label: "Account 1", dimensions: [], ...over };
}

const unavailableShare = {
  fairShare: 50,
  consumed: null,
  remaining: null,
  status: "unavailable" as const,
  reason: "percent_attribution_unavailable",
};

describe("catalog keys", () => {
  test("each documented reason has its own catalog sentence", () => {
    const keys = REASONS.map(reasonKey);
    assert.equal(new Set(keys).size, REASONS.length);
    for (const key of keys) assert.ok(catalog[key], `${key} is in the catalog`);
    assert.ok(!keys.includes("reasonUnknown"));
  });

  test("an unknown or missing reason falls back to the generic sentence", () => {
    assert.equal(reasonKey("brand_new"), "reasonUnknown");
    assert.equal(reasonKey(undefined), "reasonUnknown");
    assert.ok(catalog.reasonUnknown);
  });

  test("every window has a catalog name", () => {
    for (const window of QuotaWindowSchema.options) {
      assert.ok(catalog[windowKey(window)], `${window} has a catalog key`);
    }
  });

  test("policies map to their own sentences", () => {
    assert.deepEqual((["hard", "soft", "burst"] as const).map(policyKey), [
      "policyHard",
      "policySoft",
      "policyBurst",
    ]);
    assert.deepEqual((["hard", "soft", "burst"] as const).map(shareOverKey), [
      "shareOverHard",
      "shareOverSoft",
      "shareOverBurst",
    ]);
  });
});

describe("amountText", () => {
  test("counts are rounded into the plural message of their unit", () => {
    const { number } = fakeNumber();
    assert.equal(amountText("tokens", 1000.4, fakeT, number), 'amountTokens:{"count":1000}');
    assert.equal(amountText("requests", 2.6, fakeT, number), 'amountRequests:{"count":3}');
  });

  test("dollars go through the number formatter as currency", () => {
    const { calls, number } = fakeNumber();
    assert.equal(amountText("usd", 3.5, fakeT, number), "n(3.5)");
    assert.equal(calls[0][0], 3.5);
    assert.equal(calls[0][1]?.style, "currency");
    assert.equal(calls[0][1]?.currency, "USD");
  });

  test("percentages keep one decimal in the percent message", () => {
    const { number } = fakeNumber();
    assert.equal(amountText("percent", 12.34, fakeT, number), 'amountPercent:{"value":12.3}');
  });
});

describe("shareFootnote", () => {
  const { number } = fakeNumber();
  const share = { fairShare: 500, consumed: 120, remaining: 380, status: "ok" as const };

  test("a key with no reserved share is told so, never that it ran out", () => {
    const none = { ...share, fairShare: 0, consumed: 0, remaining: 0 };
    assert.equal(shareFootnote(none, "tokens", "hard", fakeT, number), "shareNone:undefined");
  });

  test("going past the share is worded by policy", () => {
    const over = { ...share, consumed: 600, remaining: 0 };
    assert.equal(shareFootnote(over, "tokens", "soft", fakeT, number), "shareOverSoft:undefined");
  });

  test("otherwise it says what is left", () => {
    assert.equal(
      shareFootnote(share, "tokens", "hard", fakeT, number),
      'shareLeft:{"amount":"amountTokens:{\\"count\\":380}"}'
    );
  });

  test("an unread share has no footnote", () => {
    const unread = { ...share, consumed: null, remaining: null, status: "unavailable" as const };
    assert.equal(shareFootnote(unread, "tokens", "hard", fakeT, number), undefined);
  });
});

describe("account helpers", () => {
  const dimension = {
    unit: "percent" as const,
    window: "5h" as const,
    limit: 100,
    yourShare: unavailableShare,
  };

  test("an account reading is any dimension carrying the account bar", () => {
    assert.equal(hasAccountReading(accountWith({})), false);
    assert.equal(hasAccountReading(accountWith({ dimensions: [dimension] })), false);
    const read = { ...dimension, account: { used: 40, status: "ok" as const } };
    assert.equal(hasAccountReading(accountWith({ dimensions: [read] })), true);
  });

  test("unavailable model windows that repeat an account bar's reason are skipped", () => {
    const failed = {
      ...dimension,
      account: { used: null, status: "unavailable" as const, reason: "fetch_failed" },
    };
    const windows = { status: "unavailable" as const, reason: "fetch_failed", windows: [] };
    assert.equal(
      modelWindowsRepeatReason(accountWith({ dimensions: [failed], modelWindows: windows })),
      true
    );
  });

  test("model windows with their own reason, or readable ones, are kept", () => {
    const failed = {
      ...dimension,
      account: { used: null, status: "unavailable" as const, reason: "fetch_failed" },
    };
    const other = { status: "unavailable" as const, reason: "not_supported", windows: [] };
    const ok = { status: "ok" as const, windows: [] };
    assert.equal(
      modelWindowsRepeatReason(accountWith({ dimensions: [failed], modelWindows: other })),
      false
    );
    assert.equal(
      modelWindowsRepeatReason(accountWith({ dimensions: [failed], modelWindows: ok })),
      false
    );
    assert.equal(
      modelWindowsRepeatReason(
        accountWith({
          dimensions: [{ ...dimension, account: { used: 40, status: "ok" } }],
          modelWindows: { ...other, reason: "fetch_failed" },
        })
      ),
      false
    );
    assert.equal(modelWindowsRepeatReason(accountWith({ dimensions: [failed] })), false);
  });
});
