// @vitest-environment jsdom
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { NextIntlClientProvider } from "next-intl";
import { pickMessages } from "../../../src/i18n/pickMessages";
import routeNamespaces from "../../../src/i18n/routeNamespaces.generated.json";
import en from "../../../src/i18n/messages/en.json";
import ptBR from "../../../src/i18n/messages/pt-BR.json";
import viMessages from "../../../src/i18n/messages/vi.json";

// The shared harness supplies every English namespace through a translation mock.
// Disable it here: this regression needs the actual route-selected provider context.
vi.unmock("next-intl");
vi.mock("@/shared/components", () => ({
  Button: ({
    children,
    size: _size,
    variant: _variant,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & { size?: string; variant?: string }) => (
    <button {...props}>{children}</button>
  ),
  Select: ({
    children,
    label,
    ...props
  }: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) => (
    <label>
      {label}
      <select {...props}>{children}</select>
    </label>
  ),
}));
const { default: DecisionModelsSection } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/DecisionModelsSection");

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("the real provider route includes the model catalog namespace", () => {
  expect(routeNamespaces.sections.providers).toContain("modelCatalog");
});

it.each([
  ["en", en],
  ["pt-BR", ptBR],
  ["vi", viMessages],
] as const)("renders native model metadata with the selected %s route messages", (locale, full) => {
  const messages = pickMessages(full, routeNamespaces.sections.providers);
  const onError = vi.fn();
  const fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
  const { container } = render(
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC" onError={onError}>
      <DecisionModelsSection
        providerId="typesafe"
        connections={[
          {
            id: "fixture-connection",
            provider: "typesafe",
            isActive: true,
            name: "Fixture account",
          },
        ]}
        initialModels={[
          {
            id: "fixture-native-model",
            modelType: "decision",
            supportedEndpoints: ["systemone"],
            contextWindow: 32768,
            decisionPrimitives: ["choice"],
          },
        ]}
        onChanged={vi.fn()}
      />
    </NextIntlClientProvider>
  );
  expect(container.textContent).toContain(
    `${full.modelCatalog.context}: ${(32768).toLocaleString()}`
  );
  expect(container.textContent).toContain(
    full.modelCatalog.showingModels.replace(/\{(?:first|last|total)\}/g, "1")
  );
  expect(screen.getByText(/fixture-native-model/, { selector: "code" })).toBeTruthy();
  expect(
    (
      screen.getByRole("combobox", {
        name: full.providers.decisionSelectConnection,
      }) as HTMLSelectElement
    ).value
  ).toBe("fixture-connection");
  expect(container.textContent).not.toContain("modelCatalog.context");
  expect(container.textContent).not.toContain("modelCatalog.showingModels");
  expect(onError).not.toHaveBeenCalled();
  expect(fetchMock).not.toHaveBeenCalled();
});
