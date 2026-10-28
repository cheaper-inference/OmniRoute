import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  // Echo the key so translateUsageOrFallback() renders the English fallback.
  useTranslations: () => (key: string) => key,
}));

import QuotaCardExpanded from "../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/parts/QuotaCardExpanded";

const speed = {
  avgTps: 120,
  lastTps: 150,
  medianTps: 120,
  avgTtftMs: 800,
  samples: 5,
  byModel: [
    { model: "gpt-x", avgTps: 1234.4, lastTps: 150, medianTps: 120, avgTtftMs: 800, samples: 4 },
    { model: "gpt-y", avgTps: 50, lastTps: 50, medianTps: 50, avgTtftMs: null, samples: 1 },
  ],
};

function render(props: { speed?: unknown; error?: string | null }) {
  return renderToStaticMarkup(
    <QuotaCardExpanded
      providerId="codex"
      quotas={[{ name: "session", used: 10, total: 100, remainingPercentage: 90 }]}
      loading={false}
      error={props.error ?? null}
      hasStaleData={false}
      canEditCutoff={false}
      hasCutoffOverrides={false}
      onRefresh={() => {}}
      onOpenCutoff={() => {}}
      onOpenCost={() => {}}
      speed={props.speed}
    />
  );
}

describe("quota card speed line", () => {
  it("renders one line per model with tok/s, last and TTFT, omitting TTFT when unknown", () => {
    const html = render({ speed });
    expect(html).toContain("gpt-x: 1,234 tok/s avg · last 150 · TTFT 0.8s (n=4)");
    expect(html).toContain("gpt-y: 50 tok/s avg · last 50 (n=1)");
    expect(html).toContain("last 5 successful requests");
  });

  it("renders nothing without speed data or when the card is in error", () => {
    expect(render({})).not.toContain("tok/s");
    expect(render({ speed: { byModel: [] } })).not.toContain("tok/s");
    expect(render({ speed, error: "boom" })).not.toContain("tok/s");
  });
});
