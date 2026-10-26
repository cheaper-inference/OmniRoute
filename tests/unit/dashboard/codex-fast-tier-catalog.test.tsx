import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import CodexFastTierTab from "@/app/(dashboard)/dashboard/settings/components/CodexFastTierTab";
import { CODEX_FAST_TIER_DEFAULT_SUPPORTED_MODELS } from "@/lib/providers/codexFastTier";

// Load the real controls without importing unrelated dashboard features from the barrel.
vi.mock("@/shared/components", async () => ({
  Button: (await import("@/shared/components/Button")).default,
  Card: (await import("@/shared/components/Card")).default,
  Toggle: (await import("@/shared/components/Toggle")).default,
  Select: (await import("@/shared/components/Select")).default,
}));

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Codex Fast Tier model checklist", () => {
  it("offers every default with an older saved list and saves a newly selected GPT-6 model", async () => {
    const savedModels = ["gpt-5.6-sol", "gpt-5.6-terra", "gpt-5.6-luna", "gpt-5.5", "custom-codex"];
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValueOnce(
      Response.json({
        codexServiceTier: { enabled: true, tier: "priority", supportedModels: savedModels },
      })
    );
    fetchMock.mockResolvedValue(Response.json({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);

    render(<CodexFastTierTab />);
    fireEvent.click(await screen.findByRole("button", { name: /Fast-tier models/ }));

    for (const model of new Set([...CODEX_FAST_TIER_DEFAULT_SUPPORTED_MODELS, ...savedModels])) {
      const checkbox = screen.getByRole<HTMLInputElement>("checkbox", {
        name: `Enable Fast Tier for ${model}`,
      });
      expect(checkbox.checked).toBe(savedModels.includes(model));
      expect(checkbox.disabled).toBe(false);
    }
    expect(fetchMock).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("checkbox", { name: /gpt-6-astra$/ }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    const [url, request] = fetchMock.mock.calls[1];
    expect(url).toBe("/api/settings");
    expect(request?.method).toBe("PATCH");
    expect(JSON.parse(String(request?.body))).toEqual({
      codexServiceTier: {
        enabled: true,
        tier: "priority",
        supportedModels: [...savedModels, "gpt-6-astra"],
      },
    });
    await waitFor(() => {
      expect(screen.getByRole<HTMLInputElement>("checkbox", { name: /gpt-6-astra$/ }).checked).toBe(
        true
      );
      expect(
        screen.getByRole<HTMLInputElement>("checkbox", { name: /custom-codex$/ }).checked
      ).toBe(true);
    });
  });
});
