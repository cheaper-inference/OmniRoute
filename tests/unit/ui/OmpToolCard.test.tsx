// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// The Oh My Pi card reads and writes roles through /api/cli-tools/omp-settings
// (the #16523 modelRoles API); it must never call a second roles route.

// next-intl returns a stable translator per namespace; mirror that so effects keyed on it
// do not re-run on every render.
const translate = (key: string) => key;
vi.mock("next-intl", () => ({
  useTranslations: () => translate,
}));

vi.mock("@/shared/components", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Button: ({ children, onClick, disabled }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button type="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
}));

vi.mock("@/shared/components/Icon", () => ({ default: () => null }));

vi.mock("@/shared/components/Select", () => ({
  default: ({
    children,
    compact: _compact,
    nativeSize: _nativeSize,
    selectClassName: _selectClassName,
    ...props
  }: React.SelectHTMLAttributes<HTMLSelectElement> & Record<string, unknown>) => (
    <select {...props}>{children}</select>
  ),
}));

const fetchMock = vi.fn();
vi.stubGlobal("fetch", fetchMock);

const { default: OmpToolCard } =
  await import("@/app/(dashboard)/dashboard/cli-code/components/OmpToolCard");

const response = (body: unknown, ok = true) => ({ ok, json: async () => body });

let container: HTMLElement;
let root: Root;

const flush = async () => {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
};

const renderCard = async () => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => {
    root.render(
      <OmpToolCard
        tool={{ name: "Oh My Pi" }}
        isExpanded
        baseUrl="http://localhost:20128"
        availableModels={[
          { value: "cc/claude-sonnet-5", alias: "cc" },
          { value: "cx/gpt-5.6", alias: "cx" },
        ]}
      />
    );
    await flush();
  });
};

const roleSelect = (role: string) =>
  container.querySelector(`select[aria-label="${role}"]`) as HTMLSelectElement;

const choose = async (role: string, value: string) => {
  await act(async () => {
    const select = roleSelect(role);
    const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value")!.set!;
    setter.call(select, value);
    select.dispatchEvent(new Event("change", { bubbles: true }));
    await flush();
  });
};

const clickButton = async (label: string) => {
  await act(async () => {
    const button = Array.from(container.querySelectorAll("button")).find((b) =>
      b.textContent?.includes(label)
    ) as HTMLButtonElement;
    button.click();
    await flush();
  });
};

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  vi.stubGlobal("confirm", () => true);
  fetchMock.mockReset();
  fetchMock.mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url === "/api/cli-tools/omp-settings" && init?.method === "POST") {
      const body = JSON.parse(String(init.body));
      return Promise.resolve(
        response({
          success: true,
          modelRoles: { default: "cc/claude-sonnet-5", ...body.roles, tiny: undefined },
        })
      );
    }
    if (url === "/api/cli-tools/omp-settings") {
      return Promise.resolve(
        response({
          installed: true,
          config: {
            providers: { omniroute: { baseUrl: "http://127.0.0.1:20219/v1" } },
            modelRoles: { default: "cc/claude-sonnet-5", tiny: "cx/gpt-5.6" },
          },
        })
      );
    }
    return Promise.resolve(response({ error: "unexpected" }, false));
  });
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe("OmpToolCard", () => {
  it("shows the OmniRoute roles omp-settings reports, one select per official role", async () => {
    await renderCard();

    expect(fetchMock).toHaveBeenCalledWith("/api/cli-tools/omp-settings");
    expect(fetchMock.mock.calls.some(([url]) => String(url).includes("omp-roles"))).toBe(false);
    expect(container.querySelectorAll("select")).toHaveLength(10);
    expect(roleSelect("default").value).toBe("cc/claude-sonnet-5");
    expect(roleSelect("tiny").value).toBe("cx/gpt-5.6");
    expect(roleSelect("designer")).not.toBeNull();
    expect(roleSelect("memory")).toBeNull();
  });

  it("applies pending roles through omp-settings, keeping the provider baseUrl on disk", async () => {
    await renderCard();
    await choose("plan", "cx/gpt-5.6");
    await choose("tiny", "");
    await clickButton("ompApply");

    const post = fetchMock.mock.calls.find(([, init]) => init?.method === "POST");
    expect(post?.[0]).toBe("/api/cli-tools/omp-settings");
    expect(JSON.parse(String(post?.[1]?.body))).toEqual({
      baseUrl: "http://127.0.0.1:20219/v1",
      roles: { plan: "cx/gpt-5.6", tiny: null },
    });
    expect(container.textContent).toContain("ompSavedVerified");
  });
});
