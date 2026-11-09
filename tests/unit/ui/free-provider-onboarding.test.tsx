// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const translate = (key: string) => key;

vi.mock("next-intl", () => ({
  useTranslations: () => translate,
}));

describe("FreeProviderOnboardingCard", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          providers: [
            {
              id: "opencode",
              name: "OpenCode Free",
              website: "https://opencode.ai",
              caution: "Public endpoint. Rate limits apply.",
              defaultModel: "big-pickle",
            },
          ],
        }),
      })
    );
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("shows caution metadata and requires explicit confirmation before setup", async () => {
    const { FreeProviderOnboardingCard } =
      await import("../../../src/app/(dashboard)/dashboard/onboarding/steps/FreeProviderOnboardingCard");

    await act(async () => root.render(<FreeProviderOnboardingCard />));
    await act(async () => Promise.resolve());

    expect(container.textContent).toContain("OpenCode Free");
    expect(container.textContent).toContain("Public endpoint. Rate limits apply.");
    expect(container.querySelector('a[href="https://opencode.ai"]')).not.toBeNull();

    const setupButton = container.querySelector<HTMLButtonElement>(
      '[data-testid="setup-free-providers"]'
    );
    expect(setupButton?.disabled).toBe(true);

    const confirmation = container.querySelector<HTMLInputElement>(
      '[data-testid="free-provider-confirmation"]'
    );
    await act(async () => confirmation?.click());
    expect(setupButton?.disabled).toBe(false);
  });

  it("posts selected IDs only after confirmation and renders partial results for retry", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          providers: [
            {
              id: "opencode",
              name: "OpenCode Free",
              website: "https://opencode.ai",
              caution: "Rate limits apply.",
            },
            {
              id: "mimocode",
              name: "MiMoCode",
              website: "https://mimo.mi.com",
              caution: "Bootstrap authentication.",
            },
          ],
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [
            { providerId: "opencode", status: "created", connectionId: "one" },
            { providerId: "mimocode", status: "failed", reason: "Failed to create provider" },
          ],
        }),
      } as Response);
    const { FreeProviderOnboardingCard } =
      await import("../../../src/app/(dashboard)/dashboard/onboarding/steps/FreeProviderOnboardingCard");

    await act(async () => root.render(<FreeProviderOnboardingCard />));
    await act(async () => Promise.resolve());
    await act(async () =>
      container
        .querySelector<HTMLInputElement>('[data-testid="free-provider-confirmation"]')
        ?.click()
    );
    await act(async () =>
      container.querySelector<HTMLButtonElement>('[data-testid="setup-free-providers"]')?.click()
    );

    expect(fetchMock).toHaveBeenLastCalledWith(
      "/api/providers/free-onboarding",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ providerIds: ["mimocode", "opencode"], confirmed: true }),
      })
    );
    expect(container.textContent).toContain("result.created");
    expect(container.textContent).toContain("result.failed");
    expect(container.textContent).toContain("retryFailed");
  });
});
