// @vitest-environment jsdom
// #18069: axe at 390 px on /dashboard/analytics (overview) reported 3 color-contrast nodes. The
// overview's CompactStatGrid has exactly three section titles (infra / perf / highlights), drawn
// at 10 px in `text-text-muted/50`: half-opacity muted text cannot reach AA 4.5:1 on the card.
// The titles keep the full muted token.
import React from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

const { CompactStatGrid } = await import("@/shared/components/analytics/charts");

afterEach(() => cleanup());

describe("CompactStatGrid section titles (#18069)", () => {
  it("render every section title in the full muted colour, without an opacity modifier", () => {
    const { getByText } = render(
      <CompactStatGrid
        sections={[
          { title: "Infra", items: [{ icon: "dns", label: "Providers", value: 3 }] },
          { title: "Perf", items: [{ icon: "speed", label: "Latency", value: "12ms" }] },
          { title: "Highlights", items: [{ icon: "star", label: "Top", value: "gpt" }] },
        ]}
      />
    );
    for (const title of ["Infra", "Perf", "Highlights"]) {
      const node = getByText(title);
      expect(node.className).toContain("text-text-muted");
      expect(node.className).not.toMatch(/text-text-muted\/\d+/);
    }
  });
});
