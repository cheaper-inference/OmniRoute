// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeAll, expect, it, vi } from "vitest";
import en from "../../src/i18n/messages/en.json";

vi.mock("next-intl", () => {
  const translators = new Map<string, (key: string, values?: Record<string, unknown>) => string>();
  return {
    useTranslations: (namespace = "") => {
      if (!translators.has(namespace))
        translators.set(namespace, (key: string, values?: Record<string, unknown>) => {
          const scope = (
            namespace ? (en as Record<string, Record<string, string>>)[namespace] : en
          ) as Record<string, string> | undefined;
          let message = scope?.[key] ?? key;
          for (const [name, value] of Object.entries(values ?? {})) {
            message = message.replace(`{${name}}`, String(value));
          }
          if (key === "modelsCount") message = `${values?.count} models`;
          return message;
        });
      return translators.get(namespace);
    },
  };
});

let EndpointPageClient: React.ComponentType<{ machineId: string }>;
let cleanup: (() => void) | undefined;

beforeAll(async () => {
  EndpointPageClient = (
    await import("../../src/app/(dashboard)/dashboard/endpoint/EndpointPageClient")
  ).default;
});

afterEach(() => {
  cleanup?.();
  vi.unstubAllGlobals();
});

it.each([
  { status: 200, models: [{ id: "liquid/d1" }, { id: "typesafe/jev-1.13" }], label: "2 models" },
  { status: 200, models: [], label: "0 models" },
  { status: 502, models: [], label: "—" },
])(
  "shows $label on both compact cards without lists or examples",
  async ({ status, models, label }) => {
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const path = String(input);
      if (path === "/v1/systemone/models") {
        return new Response(JSON.stringify({ data: models }), { status });
      }
      const data =
        path === "/api/settings"
          ? {
              cloudEnabled: false,
              hideEndpointCloudflaredTunnel: true,
              hideEndpointTailscaleFunnel: true,
              hideEndpointNgrokTunnel: true,
            }
          : path === "/v1/models"
            ? { data: [] }
            : path === "/api/search/providers"
              ? { providers: [] }
              : path === "/api/cli-tools/keys"
                ? { keys: [] }
                : {};
      return new Response(JSON.stringify(data));
    });
    vi.stubGlobal("fetch", fetchMock);
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    cleanup = () => {
      act(() => root.unmount());
      container.remove();
    };
    act(() => {
      root.render(<EndpointPageClient machineId="" />);
    });
    await vi.waitFor(() => {
      expect(
        container.querySelector('[aria-labelledby="systemone-endpoints-heading"]')
      ).not.toBeNull();
    });

    const section = container.querySelector('[aria-labelledby="systemone-endpoints-heading"]');
    await vi.waitFor(() => {
      expect(section?.textContent?.split(label)).toHaveLength(3);
    });
    expect(section).not.toBeNull();
    expect(Array.from(section!.querySelectorAll("code"), (node) => node.textContent)).toEqual([
      "/v1/systemone",
      "/v1/systemone/models",
    ]);
    expect(section?.querySelectorAll('button[title="Copy URL"]').length).toBe(2);
    expect(section?.querySelector("details, pre, ul, a")).toBeNull();
    expect(section?.textContent).not.toContain("OpenRouter");
    expect(section?.textContent).not.toContain("Example request");
    expect(section?.querySelectorAll(".grid-cols-2").length).toBe(1);
    expect(section?.querySelectorAll(".xl\\:grid-cols-4").length).toBe(1);
    expect(
      fetchMock.mock.calls.filter(([input]) => String(input) === "/v1/systemone/models")
    ).toHaveLength(1);
    expect(fetchMock.mock.calls.map(([input]) => String(input))).not.toContain(
      "/api/providers?provider=openrouter"
    );
    const text = container.textContent ?? "";
    expect(text.indexOf(en.endpoint.categorySystemOne)).toBeLessThan(
      text.indexOf(en.endpoint.categoryUtility)
    );
  }
);
