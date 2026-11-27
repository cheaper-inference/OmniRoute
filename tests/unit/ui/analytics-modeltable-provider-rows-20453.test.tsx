// @vitest-environment jsdom
// Regression for #20453: byModel carries one row per (provider, model), so the Usage
// "Model Breakdown" table can receive two rows with the same model name. They must keep
// distinct React keys and show which provider each row belongs to.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const translate = (key: string) => key;
translate.has = () => true;

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => translate,
}));

const { ModelTable } = await import("@/shared/components/analytics/ModelTable");

let container: HTMLElement;
let root: Root;

beforeEach(() => {
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.restoreAllMocks();
});

describe("ModelTable per-provider rows (#20453)", () => {
  it("renders one distinct, provider-labelled row per provider for a shared model", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const shared = { model: "gpt-oss-120b", promptTokens: 100, completionTokens: 50, cost: 1 };

    act(() =>
      root.render(
        <ModelTable
          byModel={[
            { ...shared, provider: "cloudflare-ai", requests: 106, totalTokens: 150 },
            { ...shared, provider: "groq", requests: 2, totalTokens: 150 },
          ]}
          summary={{ totalTokens: 300 }}
        />
      )
    );

    const duplicateKeyWarnings = consoleError.mock.calls.filter((call) =>
      call.some((arg) => String(arg).includes("same key"))
    );
    expect(duplicateKeyWarnings).toEqual([]);
    const bodyRows = container.querySelectorAll("tbody tr");
    expect(bodyRows).toHaveLength(2);
    expect(bodyRows[0].textContent).toContain("cloudflare-ai");
    expect(bodyRows[1].textContent).toContain("groq");
  });
});
