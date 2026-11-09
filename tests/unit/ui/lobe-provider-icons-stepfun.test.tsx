import { describe, expect, it } from "vitest";

// The initial dynamic import of the icons registry (@lobehub/icons, hundreds of
// modules) is slow in a cold vitest run; match sibling tests' timeout for the
// transform/import overhead (see agent-card.test.tsx).
describe("lobeProviderIcons Stepfun fallback", { timeout: 30_000 }, () => {
  it("loads the icon registry and resolves the color slot to the Mono component", async () => {
    const { getLobeProviderIcon } = await import("@/shared/components/lobeProviderIcons");

    const monoIcon = getLobeProviderIcon("stepfun", "mono");
    const colorIcon = getLobeProviderIcon("stepfun", "color");

    expect(monoIcon).not.toBeNull();
    expect(colorIcon).toBe(monoIcon);
  });
});
